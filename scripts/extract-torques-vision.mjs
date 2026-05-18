#!/usr/bin/env node
/**
 * extract-torques-vision.mjs — Vision-based torque/fastener extraction pipeline.
 *
 * Extracts torque specifications from Honda service manual pages using
 * multimodal LLMs via Together AI and optionally Anthropic.
 *
 * Usage:
 *   node scripts/extract-torques-vision.mjs --manual=BB6 --matrix-profile=default
 *   node scripts/extract-torques-vision.mjs --manual=BB6 --chapter=engine-mechanical --max-pages=3 --dry-run
 *   node scripts/extract-torques-vision.mjs --manual=BB6 --model-id=together.kimi-k2-6-fp4 --runs=3 --temperature=0.3 --seed-base=1000
 */

import { createHash, randomUUID } from "node:crypto";
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  appendFileSync,
  readdirSync,
} from "node:fs";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Constants ──────────────────────────────────────────────────────────────

const PROMPT_VERSION = "v2";
const MAX_RETRIES = 4;
const BASE_DELAY_MS = 1000;

// ─── CLI parsing ────────────────────────────────────────────────────────────

/**
 * Parse command-line arguments into a flat key-value object.
 * Handles --flag=value, --flag value, and boolean --flag.
 * @param {string[]} argv - process.argv slice(2)
 * @returns {Record<string, string | boolean>}
 */
export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      // Handle --key=value format
      const eqIdx = arg.indexOf("=");
      let key, value;
      if (eqIdx !== -1) {
        key = arg.slice(2, eqIdx).replace(/-/g, "_");
        value = arg.slice(eqIdx + 1);
        args[key] = value === "true" ? true : value === "false" ? false : value;
      } else {
        key = arg.slice(2).replace(/-/g, "_");
        const next = argv[i + 1];
        if (next && !next.startsWith("--")) {
          args[key] = next === "true" ? true : next === "false" ? false : next;
          i++;
        } else {
          args[key] = true;
        }
      }
    }
  }
  return args;
}

// ─── Config loaders ─────────────────────────────────────────────────────────

/**
 * Load a JSON config file from the project root.
 * @param {string} relPath - Relative path from project root
 * @returns {unknown}
 */
function loadJSON(relPath) {
  return JSON.parse(readFileSync(join(ROOT, relPath), "utf-8"));
}

/**
 * Load the extraction prompt template from scripts/prompts/.
 * @returns {string}
 */
function loadPrompt() {
  return readFileSync(
    join(ROOT, "scripts/prompts/extract-torques-v2.md"),
    "utf-8",
  );
}

// ─── Matrix loader ──────────────────────────────────────────────────────────

/**
 * Load the extraction matrix and resolve a named profile.
 * @param {string} profileName - "default", "high-stakes", or "rescue"
 * @returns {{ model_id: string, runs: number, temperature: number, seed_base?: number }[]}
 */
export function loadMatrixProfile(profileName) {
  const matrix = loadJSON(
    "research/raw-data/torque-specs/extraction-matrix.json",
  );
  const profile = matrix[profileName];
  if (!profile) {
    throw new Error(`Unknown matrix profile: ${profileName}`);
  }
  return profile;
}

// ─── Provider abstraction ───────────────────────────────────────────────────

/**
 * Raw response from a provider API call.
 * @typedef {object} RawResponse
 * @property {string} content - The raw text/JSON content returned by the model
 * @property {number} [inputTokens] - Input token count
 * @property {number} [outputTokens] - Output token count
 * @property {number} [latencyMs] - Time taken in milliseconds
 */

/**
 * Provider interface — all provider implementations must implement this.
 * Hides SDK differences from the matrix-execution loop.
 */
class ProviderClient {
  /**
   * Extract torque data from a page image.
   * @param {Buffer} pageBytes - Raw PNG bytes of the page
   * @param {string} modelId - Model identifier from models.json
   * @param {number} temperature - Sampling temperature
   * @param {number} seed - Random seed for reproducibility
   * @param {object} prompt - System + user prompt objects
   * @returns {Promise<RawResponse>}
   */
  async extractFromPage(pageBytes, modelId, temperature, seed, prompt) {
    throw new Error("not implemented");
  }

  /**
   * Check if the provider is available (required env keys set).
   * @returns {{ available: boolean, reason?: string }}
   */
  preflight() {
    throw new Error("not implemented");
  }
}

/**
 * Together AI provider — uses the Together AI vision API.
 */
class TogetherProvider extends ProviderClient {
  /** @type {string} */
  baseUrl = "https://api.together.xyz/v1/chat/completions";

  async extractFromPage(pageBytes, modelId, temperature, seed, prompt) {
    const models = loadJSON("research/raw-data/torque-specs/models.json");
    const modelInfo = models[modelId];
    if (!modelInfo) {
      throw new Error(`Model not found in registry: ${modelId}`);
    }

    const apiKey = process.env.TOGETHER_API_KEY;
    if (!apiKey) {
      throw new Error("TOGETHER_API_KEY not set");
    }

    const base64Image = imageToBase64Temp(pageBytes);
    const userContent = [
      {
        type: "image_url",
        image_url: { url: `data:image/png;base64,${base64Image}` },
      },
      { type: "text", text: prompt.user },
    ];

    const requestBody = {
      model: modelInfo.model,
      messages: [
        { role: "system", content: prompt.system },
        { role: "user", content: userContent },
      ],
      max_tokens: 8192,
      temperature,
      seed,
      response_format: { type: "json_object" },
    };

    const startTime = Date.now();
    let lastError = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(this.baseUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (res.status === 429 || res.status >= 500) {
          lastError = new Error(`HTTP ${res.status}: ${res.statusText}`);
          if (attempt < MAX_RETRIES) {
            const delay = BASE_DELAY_MS * Math.pow(2, attempt);
            console.log(
              `  [retry] ${modelId} attempt ${attempt + 1}/${MAX_RETRIES} after ${delay}ms`,
            );
            await sleep(delay);
            continue;
          }
          throw lastError;
        }

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        const latencyMs = Date.now() - startTime;

        const content = data.choices?.[0]?.message?.content ?? "";
        const usage = data.usage || {};

        return {
          content,
          inputTokens: usage.prompt_tokens ?? 0,
          outputTokens: usage.completion_tokens ?? 0,
          latencyMs,
        };
      } catch (err) {
        lastError = err;
        if (attempt < MAX_RETRIES) {
          const delay = BASE_DELAY_MS * Math.pow(2, attempt);
          console.log(
            `  [retry] ${modelId} attempt ${attempt + 1}/${MAX_RETRIES} error: ${err.message} after ${delay}ms`,
          );
          await sleep(delay);
        }
      }
    }

    throw new Error(
      `Together API failed after ${MAX_RETRIES + 1} attempts: ${lastError?.message}`,
    );
  }

  preflight() {
    const key = process.env.TOGETHER_API_KEY;
    if (!key) return { available: false, reason: "TOGETHER_API_KEY not set" };
    return { available: true };
  }
}

/**
 * Anthropic provider — uses the Anthropic Messages API.
 * Only available when ANTHROPIC_API_KEY is set.
 */
class AnthropicProvider extends ProviderClient {
  /** @type {string} */
  baseUrl = "https://api.anthropic.com/v1/messages";

  async extractFromPage(pageBytes, modelId, temperature, seed, prompt) {
    const models = loadJSON("research/raw-data/torque-specs/models.json");
    const modelInfo = models[modelId];
    if (!modelInfo) {
      throw new Error(`Model not found in registry: ${modelId}`);
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error("ANTHROPIC_API_KEY not set");
    }

    const base64Image = imageToBase64Temp(pageBytes);

    const requestBody = {
      model: modelInfo.model,
      max_tokens: 8192,
      temperature,
      system: prompt.system,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: "image/png",
                data: base64Image,
              },
            },
            { type: "text", text: prompt.user },
          ],
        },
      ],
    };

    const startTime = Date.now();
    let lastError = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch(this.baseUrl, {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (res.status === 429 || res.status >= 500) {
          lastError = new Error(`HTTP ${res.status}: ${res.statusText}`);
          if (attempt < MAX_RETRIES) {
            const delay = BASE_DELAY_MS * Math.pow(2, attempt);
            console.log(
              `  [retry] ${modelId} attempt ${attempt + 1}/${MAX_RETRIES} after ${delay}ms`,
            );
            await sleep(delay);
            continue;
          }
          throw lastError;
        }

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        const latencyMs = Date.now() - startTime;

        const content =
          data.content?.find((c) => c.type === "text")?.text ?? "";
        const usage = data.usage || {};

        return {
          content,
          inputTokens: usage.input_tokens ?? 0,
          outputTokens: usage.output_tokens ?? 0,
          latencyMs,
        };
      } catch (err) {
        lastError = err;
        if (attempt < MAX_RETRIES) {
          const delay = BASE_DELAY_MS * Math.pow(2, attempt);
          console.log(
            `  [retry] ${modelId} attempt ${attempt + 1}/${MAX_RETRIES} error: ${err.message} after ${delay}ms`,
          );
          await sleep(delay);
        }
      }
    }

    throw new Error(
      `Anthropic API failed after ${MAX_RETRIES + 1} attempts: ${lastError?.message}`,
    );
  }

  preflight() {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) return { available: false, reason: "ANTHROPIC_API_KEY not set" };
    return { available: true };
  }
}

/**
 * Resolve a provider client by provider name string.
 * @param {string} providerName - "together" | "anthropic"
 * @returns {ProviderClient}
 */
export function createProvider(providerName) {
  if (providerName === "together") return new TogetherProvider();
  if (providerName === "anthropic") return new AnthropicProvider();
  throw new Error(`Unknown provider: ${providerName}`);
}

// ─── Prompt builder ─────────────────────────────────────────────────────────

/**
 * Build system + user prompt objects from the loaded prompt template.
 * @param {string} promptText - Contents of extract-torques-v1.md
 * @param {number} pageNum - Page number for context injection
 * @param {string} manual - Manual name (BB6, OBD1, ARP)
 * @returns {{ system: string, user: string }}
 */
export function buildPrompt(promptText, pageNum, manual = "BB6") {
  return {
    system:
      "You are an expert automotive technician extracting torque specifications from Honda service manual pages. Output valid JSON only.",
    user: promptText.replaceAll("{page}", String(pageNum)).replaceAll("{manual}", manual),
  };
}

// ─── Image helpers ──────────────────────────────────────────────────────────

/**
 * Find a page image file on disk given manual name and page number.
 * Looks in bb6_ocr/images/ or obd1_source/pages/ depending on manual.
 * @param {string} manual - "BB6" or "OBD1"
 * @param {number} pageNum - Page number
 * @returns {{ path: string, relative: string } | null}
 */
export function findPageImage(manual, pageNum) {
  const imagesDir = join(ROOT, "bb6_ocr", "images");
  const obd1Dir = join(ROOT, "obd1_source", "pages");

  // BB6: page-{page}.png pattern (single-page renders — real manual pages)
  // Files are zero-padded to 3 digits (page-055.png), so try both padded and unpadded.
  // Priority over p{page}-*.png because the latter are often tiny nav-link placeholders
  // from the OCR pipeline. Real manual pages are 100KB+; nav links are <2KB.
  if (manual === "BB6") {
    // Try zero-padded first (page-055.png), then unpadded (page-55.png)
    const paddedName = String(pageNum).padStart(3, "0");
    const singlePagePadded = join(imagesDir, `page-${paddedName}.png`);
    const singlePageUnpadded = join(imagesDir, `page-${pageNum}.png`);
    let foundPath = null;
    if (existsSync(singlePagePadded)) {
      foundPath = singlePagePadded;
    } else if (existsSync(singlePageUnpadded)) {
      foundPath = singlePageUnpadded;
    }
    if (foundPath) {
      const size = readFileSync(foundPath).length;
      if (size >= 5000) {
        const displayPath = foundPath === singlePagePadded
          ? `page-${paddedName}.png`
          : `page-${pageNum}.png`;
        return {
          path: foundPath,
          relative: `bb6_ocr/images/${displayPath}`,
        };
      }
    }
    // Fallback: p{page}-*.png pattern from bb6_ocr (multi-page OCR renders)
    // Also try zero-padded prefix (p055-*.png)
    const entries = existsSync(imagesDir) ? readdirSync(imagesDir) : [];
    const match = entries.find(
      (f) => f.startsWith(`p${paddedName}-`) && f.endsWith(".png"),
    ) || entries.find(
      (f) => f.startsWith(`p${pageNum}-`) && f.endsWith(".png"),
    );
    if (match) {
      return {
        path: join(imagesDir, match),
        relative: `bb6_ocr/images/${match}`,
      };
    }
  }

  // OBD1: p{page}.png or p{page}-*.png pattern from obd1_source
  if (manual === "OBD1") {
    const candidate = join(obd1Dir, `p${pageNum}.png`);
    if (existsSync(candidate)) {
      return { path: candidate, relative: `obd1_source/pages/p${pageNum}.png` };
    }
    const entries = existsSync(obd1Dir) ? readdirSync(obd1Dir) : [];
    const match = entries.find(
      (f) => f.startsWith(`p${pageNum}-`) && f.endsWith(".png"),
    );
    if (match) {
      return {
        path: join(obd1Dir, match),
        relative: `obd1_source/pages/${match}`,
      };
    }
  }

  return null;
}

/**
 * Convert a PNG file to base64 string.
 * @param {Buffer} pageBytes - Raw PNG bytes
 * @returns {string} base64 string
 */
function pageBytesToBase64(pageBytes) {
  return pageBytes.toString("base64");
}

// Temporary wrapper used by providers before page lookup is integrated
/**
 * Convert page bytes to base64 (temporary helper for provider calls).
 * @param {Buffer} pageBytes
 * @returns {string}
 */
function imageToBase64Temp(pageBytes) {
  return pageBytes.toString("base64");
}

// ─── Cache ──────────────────────────────────────────────────────────────────

/**
 * Content-hash cache: SHA256(image_bytes, prompt_version, provider, model, temp, seed) → response_path.
 * Implements retention guarantee #2 (content-hash cache).
 */
const CACHE_PATH = join(
  process.cwd(),
  "research/raw-data/torque-specs/cache/index.json",
);
let cache = {};

/**
 * Load the cache index from disk.
 */
export function loadCache() {
  try {
    cache = JSON.parse(readFileSync(CACHE_PATH, "utf-8"));
  } catch {
    cache = { version: 1, description: "", entries: {} };
  }
  if (!cache.entries) cache.entries = {};
}

/**
 * Persist the cache index to disk.
 */
export function saveCache() {
  const dir = dirname(CACHE_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");
}

/**
 * Compute the cache key for a given invocation.
 * @param {Buffer} imageBuf - Raw PNG bytes
 * @param {string} provider - Provider name
 * @param {string} modelId - Model identifier
 * @param {number} temperature - Sampling temperature
 * @param {number} seed - Random seed
 * @param {string} promptVersion - Prompt version tag (e.g. "v1")
 * @returns {string} SHA256 hex digest
 */
export function getCacheKey(
  imageBuf,
  provider,
  modelId,
  temperature,
  seed,
  promptVersion,
) {
  const hash = createHash("sha256");
  hash.update(imageBuf);
  hash.update(promptVersion);
  hash.update(provider);
  hash.update(modelId);
  hash.update(String(temperature));
  hash.update(String(seed));
  return hash.digest("hex");
}

/**
 * Check if a cached response exists for the given key.
 * @param {string} cacheKey
 * @returns {{ hit: boolean, record: unknown | null }}
 */
export function checkCache(cacheKey) {
  const entry = cache.entries?.[cacheKey];
  if (!entry) return { hit: false, record: null };

  const respPath = join(ROOT, entry.path);
  if (!existsSync(respPath)) return { hit: false, record: null };

  try {
    return { hit: true, record: JSON.parse(readFileSync(respPath, "utf-8")) };
  } catch {
    return { hit: false, record: null };
  }
}

/**
 * Store a new invocation record in the cache.
 * @param {string} cacheKey
 * @param {object} record - Per-invocation record with response_path
 */
export function setCache(cacheKey, record) {
  cache.entries[cacheKey] = {
    path: record.response_path,
    timestamp: Date.now(),
  };
}

// ─── Response store ─────────────────────────────────────────────────────────

/**
 * Generate a deterministic response file path for an invocation.
 * Follows the layout: responses/<manual>/<page>/<provider>__<model>__<run>__<ts>.json
 * Implements retention guarantee #1 (raw response on disk first).
 * @param {string} manual - "BB6" or "OBD1"
 * @param {number} pageNum
 * @param {string} provider
 * @param {string} modelId
 * @param {string} run - "r1", "r2", etc.
 * @returns {string} Absolute path to the response file
 */
export function getResponsePath(manual, pageNum, provider, modelId, run) {
  const safeModel = modelId.replace(/[\/\\:*?"<>|]/g, "_");
  const safeProvider = provider.replace(/[\/\\:*?"<>|]/g, "_");
  const ts = new Date().toISOString().replace(/[:.]/g, "-") + "Z";
  const fileName = `${safeProvider}__${safeModel}__${run}__${ts}.json`;
  // Return a relative path from ROOT so checkCache can join it correctly.
  // path.join on POSIX treats absolute second args as literal segments,
  // so we must store relative paths in the cache.
  const relDir = join(
    "research",
    "raw-data",
    "torque-specs",
    "responses",
    manual.toLowerCase(),
    String(pageNum),
  );
  return join(relDir, fileName);
}

/**
 * Write a per-invocation record to disk. Flushes immediately.
 * Implements retention guarantee #3 (stream-to-disk).
 * @param {object} record - Full per-invocation record
 */
export function writeInvocationRecord(record) {
  const dir = dirname(record.response_path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(record.response_path, JSON.stringify(record, null, 2), "utf-8");
}

/**
 * Append a row to the cost ledger.
 * Implements retention guarantee #9 (cost ledger).
 * @param {string} invocationId
 * @param {string} manual
 * @param {number} page
 * @param {string} provider
 * @param {string} modelId
 * @param {string} run
 * @param {number} temperature
 * @param {number} seed
 * @param {number} inputTokens
 * @param {number} outputTokens
 * @param {number} costUsd
 * @param {number} latencyMs
 */
export function appendLedger(
  invocationId,
  manual,
  page,
  provider,
  modelId,
  run,
  temperature,
  seed,
  inputTokens,
  outputTokens,
  costUsd,
  latencyMs,
) {
  const ledgerPath = join(
    ROOT,
    "research/raw-data/torque-specs/cost-ledger.jsonl",
  );
  const row = {
    invocation_id: invocationId,
    manual,
    page,
    provider,
    model_id: modelId,
    run,
    temperature,
    seed,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    cost_usd: costUsd,
    latency_ms: latencyMs,
    timestamp: new Date().toISOString(),
  };
  appendFileSync(ledgerPath, JSON.stringify(row) + "\n", "utf-8");
}

// ─── Schema parsing ─────────────────────────────────────────────────────────

/**
 * Attempt to parse the model's JSON response into canonical rows.
 * Uses the schema validator to validate each parsed row.
 * @param {string} rawContent - Raw text response from the model
 * @returns {{ rows: unknown[], parseError: string | null }}
 */
export function parseResponse(rawContent) {
  // Try direct JSON parse first
  try {
    const parsed = JSON.parse(rawContent);
    const rows = Array.isArray(parsed) ? parsed : [parsed];
    return { rows, parseError: null };
  } catch {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        const rows = Array.isArray(parsed) ? parsed : [parsed];
        return { rows, parseError: null };
      } catch {
        // fall through
      }
    }
    // Try to find JSON array anywhere in the text
    const arrayMatch = rawContent.match(/\[[\s\S]*\]/);
    if (arrayMatch) {
      try {
        const parsed = JSON.parse(arrayMatch[0]);
        const rows = Array.isArray(parsed) ? parsed : [parsed];
        return { rows, parseError: null };
      } catch {
        // fall through
      }
    }
    return {
      rows: [],
      parseError: `Failed to parse JSON: ${rawContent.slice(0, 200)}`,
    };
  }
}

// ─── Main extraction loop ───────────────────────────────────────────────────

/**
 * Extract torque rows from a single page using the configured matrix profile.
 * Handles cache lookup, provider dispatch, record writing, and ledger appending.
 * @param {string} manual - "BB6" or "OBD1"
 * @param {number} pageNum
 * @param {{ model_id: string, runs: number, temperature: number, seed_base?: number }} modelConfig
 * @param {string} promptText - Loaded prompt template
 * @param {boolean} dryRun - If true, skip actual API calls
 * @returns {Promise<object[]>} Parsed rows with _invocation_id attached
 */
export async function extractPage(
  manual,
  pageNum,
  modelConfig,
  promptText,
  dryRun = false,
) {
  const models = loadJSON("research/raw-data/torque-specs/models.json");
  const modelInfo = models[modelConfig.model_id];
  if (!modelInfo) {
    throw new Error(`Unknown model: ${modelConfig.model_id}`);
  }

  const provider = createProvider(modelInfo.provider);
  const prompt = buildPrompt(promptText, pageNum, manual);

  // Find page image
  const imgInfo = findPageImage(manual, pageNum);
  if (!imgInfo) {
    console.log(`  [skip] No page image found for ${manual} p.${pageNum}`);
    return [];
  }

  const pageBytes = readFileSync(imgInfo.path);

  const allRows = [];
  const runs = modelConfig.runs || 1;
  const seedBase = modelConfig.seed_base ?? 0;

  for (let runIdx = 0; runIdx < runs; runIdx++) {
    const runLabel = `r${runIdx + 1}`;
    const seed = seedBase + runIdx;
    const temperature = modelConfig.temperature;

    // Compute cache key
    const cacheKey = getCacheKey(
      pageBytes,
      modelInfo.provider,
      modelConfig.model_id,
      temperature,
      seed,
      PROMPT_VERSION,
    );

    // Check cache
    const cached = checkCache(cacheKey);
    if (cached.hit) {
      console.log(
        `  [cached] ${modelConfig.model_id} ${runLabel} page ${pageNum} (${cached.record.latency_ms ?? "?"}ms, $${(cached.record.cost_usd ?? 0).toFixed(4)})`,
      );
      // Enrich cached rows with invocation_id
      const invocationId = cached.record.invocation_id;
      if (
        cached.record.response_parsed &&
        Array.isArray(cached.record.response_parsed)
      ) {
        for (const row of cached.record.response_parsed) {
          allRows.push({ ...row, invocation_id: invocationId });
        }
      }
      continue;
    }

    if (dryRun) {
      console.log(
        `  [dry-run] ${modelConfig.model_id} ${runLabel} page ${pageNum} temp=${temperature} seed=${seed}`,
      );
      continue;
    }

    // Call provider
    console.log(
      `  [call] ${modelConfig.model_id} ${runLabel} page ${pageNum} temp=${temperature} seed=${seed}`,
    );
    const startTime = Date.now();
    const rawResponse = await provider.extractFromPage(
      pageBytes,
      modelConfig.model_id,
      temperature,
      seed,
      prompt,
    );
    const latencyMs = Date.now() - startTime;

    // Parse response
    const { rows: parsedRows, parseError } = parseResponse(rawResponse.content);

    // Build per-invocation record
    const invocationId = `${modelInfo.provider}.${modelConfig.model_id}.${runLabel}.${new Date().toISOString().replace(/[:.]/g, "-")}Z`;
    const responsePath = getResponsePath(
      manual,
      pageNum,
      modelInfo.provider,
      modelConfig.model_id,
      runLabel,
    );

    // Compute hashes
    const imageHash = createHash("sha256").update(pageBytes).digest("hex");
    const promptHash = createHash("sha256").update(promptText).digest("hex");

    const invocationRecord = {
      invocation_id: invocationId,
      manual,
      page: pageNum,
      model_id: modelConfig.model_id,
      provider: modelInfo.provider,
      model: modelInfo.model,
      run: runLabel,
      temperature,
      seed,
      prompt_version: PROMPT_VERSION,
      prompt_hash: promptHash,
      image_hash: imageHash,
      cache_key: cacheKey,
      timestamp_start: new Date(Date.now() - latencyMs).toISOString(),
      timestamp_end: new Date().toISOString(),
      latency_ms: rawResponse.latencyMs ?? latencyMs,
      tokens: {
        input: rawResponse.inputTokens ?? 0,
        output: rawResponse.outputTokens ?? 0,
      },
      cost_usd: 0, // TODO: compute from pricing table
      request: {}, // omitted for brevity
      response_raw: rawResponse.content,
      response_parsed: parsedRows,
      parse_error: parseError,
      response_path: responsePath,
    };

    // Retention guarantee #1: write raw response FIRST
    writeInvocationRecord(invocationRecord);

    // Retention guarantee #9: append ledger
    appendLedger(
      invocationId,
      manual,
      pageNum,
      modelInfo.provider,
      modelConfig.model_id,
      runLabel,
      temperature,
      seed,
      rawResponse.inputTokens ?? 0,
      rawResponse.outputTokens ?? 0,
      invocationRecord.cost_usd,
      invocationRecord.latency_ms,
    );

    // Update cache
    setCache(cacheKey, invocationRecord);

    console.log(
      `  [done] ${modelConfig.model_id} ${runLabel} page ${pageNum} (${invocationRecord.latency_ms}ms, ${parsedRows.length} rows, ${parseError ? "PARSE_ERR" : "OK"})`,
    );

    // Enrich parsed rows with invocation_id
    for (const row of parsedRows) {
      allRows.push({ ...row, invocation_id: invocationId });
    }
  }

  return allRows;
}

/**
 * Get the page range for a chapter from chapters.json.
 * @param {{ id?: string, name?: string, chapter_name?: string, manual?: string }} chapter
 * @returns {{ start: number, end: number } | null}
 */
export function getPageRangeForChapter(chapter) {
  if (chapter?.page_start != null && chapter?.page_end != null) {
    return { start: chapter.page_start, end: chapter.page_end };
  }
  return null;
}

// ─── Utility ────────────────────────────────────────────────────────────────

/**
 * Sleep for the given number of milliseconds.
 * @param {number} ms
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Entry point ────────────────────────────────────────────────────────────

export async function main() {
  const args = parseArgs(process.argv);
  const manual = (args.manual || "BB6").toUpperCase();
  const matrixProfile = args.matrix_profile || "default";
  const dryRun = args.dry_run || false;
  const maxPages = args.max_pages ? parseInt(args.max_pages) : null;
  const modelIdOverride = args.model_id || null;
  const runsOverride = args.runs ? parseInt(args.runs) : null;
  const temperatureOverride = args.temperature
    ? parseFloat(args.temperature)
    : null;
  const seedBaseOverride = args.seed_base ? parseInt(args.seed_base) : null;
  const noCache = args.no_cache || false;
  const chapterFilter = args.chapter || null;

  if (noCache) {
    cache = { version: 1, description: "", entries: {} };
  }

  loadCache();

  const matrix = loadMatrixProfile(matrixProfile);
  const chapters = loadJSON("research/raw-data/torque-specs/chapters.json");
  const promptText = loadPrompt();

  // Build list of pages to process
  let pages = [];
  if (chapterFilter) {
    const chaps = chapters[manual] || [];
    const filtered = chaps.filter(
      (c) => c.id === chapterFilter || c.chapter_name === chapterFilter,
    );
    for (const ch of filtered) {
      for (let p = ch.page_start; p <= ch.page_end; p++) {
        pages.push({ manual, page: p, chapter: ch });
      }
    }
  } else {
    const chaps = chapters[manual] || [];
    for (const ch of chaps) {
      for (let p = ch.page_start; p <= ch.page_end; p++) {
        pages.push({ manual, page: p, chapter: ch });
      }
    }
  }

  if (maxPages) {
    pages = pages.slice(0, maxPages);
  }

  console.log(`=== Torque Extraction Pipeline ===`);
  console.log(`Manual: ${manual}`);
  console.log(`Matrix profile: ${matrixProfile}`);
  console.log(`Pages to process: ${pages.length}`);
  console.log(`Models: ${matrix.map((m) => m.model_id).join(", ")}`);
  console.log(`Dry run: ${dryRun}`);
  console.log(`==============================\n`);

  // Preflight: check provider availability
  const models = loadJSON("research/raw-data/torque-specs/models.json");
  for (const modelConfig of matrix) {
    const modelInfo = models[modelConfig.model_id];
    if (!modelInfo) {
      console.error(`Unknown model in matrix: ${modelConfig.model_id}`);
      process.exit(1);
    }
    const provider = createProvider(modelInfo.provider);
    const status = provider.preflight();
    if (!status.available) {
      console.warn(
        `WARNING: ${modelInfo.provider} provider unavailable: ${status.reason}`,
      );
      console.warn(`  Skipping model ${modelConfig.model_id}`);
    }
  }

  let totalRows = 0;
  let totalPages = 0;
  let pagesSkipped = 0;
  const pageResults = new Map();

  /**
   * Check which models+runs still need processing for a page.
   * Returns list of (modelConfig, pageNum) tuples that haven't been fully processed.
   * Skips individual model+run combos that already have response files,
   * but processes any that are missing.
   */
  function getPendingRuns(manual, pageNum, matrixProfileModels) {
    const respDir = join(
      ROOT,
      "research/raw-data/torque-specs/responses",
      manual.toLowerCase(),
      String(pageNum),
    );
    if (!existsSync(respDir)) {
      // No responses at all — all pending
      return matrixProfileModels.map((mc) => ({ ...mc, pageNum }));
    }
    const existingFiles = readdirSync(respDir).filter(
      (f) => f.endsWith(".json") && f !== "test-record.json",
    );
    // Parse existing filenames to find which model+run combos exist
    // Filename format: {provider}__{model}__r{N}__{timestamp}.json
    const existingCombos = new Set();
    for (const f of existingFiles) {
      const match = f.match(/^(.+)__(.+)__r(\d+)__/);
      if (match) {
        existingCombos.add(`${match[1]}__${match[2]}__r${match[3]}`);
      }
    }
    // Check each model config
    const pending = [];
    for (const mc of matrixProfileModels) {
      const modelInfo = models[mc.model_id];
      if (!modelInfo) continue;
      const provider = modelInfo.provider;
      const safeProvider = provider.replace(/[\\/:*?"<>|]/g, "_");
      const safeModel = mc.model_id.replace(/[\\/:*?"<>|]/g, "_");
      for (let r = 1; r <= mc.runs; r++) {
        const combo = `${safeProvider}__${safeModel}__r${r}`;
        const hasRun = existingCombos.has(combo);
        if (!hasRun) {
          pending.push({ ...mc, pageNum });
          break; // Only need one pending run to process the whole model
        }
      }
    }
    return pending;
  }

  for (const page of pages) {
    const { manual: m, page: p, chapter } = page;

    // Check which model+run combos still need processing
    const pending = getPendingRuns(m, p, matrix);
    if (pending.length === 0) {
      pagesSkipped++;
      continue;
    }

    console.log(`\n--- Page ${p} (${chapter?.chapter_name || "unknown"}) ---`);

    if (dryRun) {
      for (const mc of pending) {
        const cfg = { ...mc };
        if (modelIdOverride && cfg.model_id !== modelIdOverride) continue;
        if (runsOverride) cfg.runs = runsOverride;
        if (temperatureOverride) cfg.temperature = temperatureOverride;
        if (seedBaseOverride) cfg.seed_base = cfg.seed_base ?? 0;
        console.log(
          `  [DRY RUN] ${cfg.model_id} run r1 page ${p} temp=${cfg.temperature} seed=${cfg.seed_base || 0}`,
        );
      }
      totalPages++;
      continue;
    }

    let pageRows = [];
    try {
      for (const mc of pending) {
        // Apply overrides
        const cfg = { ...mc };
        if (modelIdOverride && cfg.model_id !== modelIdOverride) continue;
        if (runsOverride) cfg.runs = runsOverride;
        if (temperatureOverride) cfg.temperature = temperatureOverride;
        if (seedBaseOverride) cfg.seed_base = cfg.seed_base ?? 0;

        const rows = await extractPage(m, p, cfg, promptText, dryRun);
        pageRows.push(...rows);
        totalRows += rows.length;
        totalPages++;
      }
    } catch (err) {
      console.error(
        `  [error] Page ${p}: ${err.message} — skipping page`,
      );
      // Continue to next page instead of crashing
      pageRows = [];
    }

    pageResults.set(p, pageRows);
    console.log(`Page ${p} total rows: ${pageRows.length}`);
  }

  console.log(`\n==============================`);
  console.log(`Extraction complete.`);
  console.log(`Pages processed: ${totalPages}`);
  console.log(`Pages skipped (already have responses): ${pagesSkipped}`);
  console.log(`Total rows extracted: ${totalRows}`);
  console.log(`==============================`);

  // Save intermediate results
  const outputPath = join(
    ROOT,
    "research/raw-data/torque-specs/h22-torques-flat.jsonl",
  );
  const allRows = [];
  for (const [, rows] of pageResults) {
    allRows.push(...rows);
  }
  writeFileSync(
    outputPath,
    allRows.length > 0
      ? allRows.map((r) => JSON.stringify(r)).join("\n") + "\n"
      : "",
  );

  saveCache();
}

// Run main only when executed directly (not when imported by tests)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error("FATAL:", err.message);
    console.error(err.stack);
    process.exit(1);
  });
}
