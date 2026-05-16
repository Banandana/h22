#!/usr/bin/env node
/**
 * extract-torques-vision.mjs — Vision-based torque/fastener extraction pipeline.
 *
 * Skeleton interface for extracting torque specifications from Honda service
 * manual pages using multimodal LLMs via Together AI and optionally Anthropic.
 *
 * Usage:
 *   node scripts/extract-torques-vision.mjs --manual=BB6 --matrix-profile=default
 *   node scripts/extract-torques-vision.mjs --manual=BB6 --chapter=engine-mechanical --max-pages=3 --dry-run
 *   node scripts/extract-torques-vision.mjs --manual=BB6 --model-id=together.kimi-k2-6-fp4 --runs=3 --temperature=0.3 --seed-base=1000
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── CLI parsing ────────────────────────────────────────────────────────────

/**
 * Parse command-line arguments into a flat key-value object.
 * Handles --flag=value, --flag value, and boolean --flag.
 * @param {string[]} argv - process.argv slice(2)
 * @returns {Record<string, string | boolean>}
 */
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2).replace(/-/g, "_");
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        args[key] = next === "true" ? true : next === "false" ? false : next;
        i++;
      } else {
        args[key] = true;
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
    join(ROOT, "scripts/prompts/extract-torques-v1.md"),
    "utf-8",
  );
}

// ─── Matrix loader ──────────────────────────────────────────────────────────

/**
 * Load the extraction matrix and resolve a named profile.
 * @param {string} profileName - "default", "high-stakes", or "rescue"
 * @returns {{ model_id: string, runs: number, temperature: number, seed_base?: number }[]}
 */
function loadMatrixProfile(profileName) {
  const matrix = loadJSON(
    "research/raw-data/torque-specs/extraction-matrix.json",
  );
  const profile = matrix[profileName] || matrix["default"];
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
   * @param {RawResponse} _prompt - System + user prompt objects
   * @returns {Promise<RawResponse>}
   */
  async extractFromPage(pageBytes, modelId, temperature, seed, _prompt) {
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
  async extractFromPage(pageBytes, modelId, temperature, seed, prompt) {
    throw new Error("not implemented");
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
  async extractFromPage(pageBytes, modelId, temperature, seed, prompt) {
    throw new Error("not implemented");
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
function createProvider(providerName) {
  if (providerName === "together") return new TogetherProvider();
  if (providerName === "anthropic") return new AnthropicProvider();
  throw new Error(`Unknown provider: ${providerName}`);
}

// ─── Prompt builder ─────────────────────────────────────────────────────────

/**
 * Build system + user prompt objects from the loaded prompt template.
 * @param {string} promptText - Contents of extract-torques-v1.md
 * @param {number} pageNum - Page number for context injection
 * @returns {{ system: string, user: string }}
 */
function buildPrompt(promptText, pageNum) {
  return {
    system:
      "You are an expert automotive technician extracting torque specifications from Honda service manual pages. Output valid JSON only.",
    user: promptText.replace("{page}", String(pageNum)),
  };
}

// ─── Image helpers ──────────────────────────────────────────────────────────

/**
 * Find a page image file on disk given manual name and page number.
 * @param {string} manual - "BB6" or "OBD1"
 * @param {number} pageNum - Page number
 * @returns {{ path: string, relative: string } | null}
 */
function findPageImage(manual, pageNum) {
  throw new Error("not implemented");
}

/**
 * Convert a PNG file to base64 string.
 * @param {string} filePath - Absolute path to PNG file
 * @returns {string}
 */
function imageToBase64(filePath) {
  throw new Error("not implemented");
}

// ─── Cache ──────────────────────────────────────────────────────────────────

/**
 * Content-hash cache: SHA256(image_bytes, prompt_version, provider, model, temp, seed) → response_path.
 * Implements retention guarantee #2 (content-hash cache).
 */
const CACHE_PATH = join(
  ROOT,
  "research/raw-data/torque-specs/cache/index.json",
);
let cache = {};

/**
 * Load the cache index from disk.
 */
function loadCache() {
  try {
    cache = JSON.parse(readFileSync(CACHE_PATH, "utf-8"));
  } catch {
    cache = {};
  }
}

/**
 * Persist the cache index to disk.
 */
function saveCache() {
  const dir = dirname(CACHE_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
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
function getCacheKey(
  imageBuf,
  provider,
  modelId,
  temperature,
  seed,
  promptVersion,
) {
  throw new Error("not implemented");
}

/**
 * Check if a cached response exists for the given key.
 * @param {string} cacheKey
 * @returns {{ hit: boolean, record: unknown | null }}
 */
function checkCache(cacheKey) {
  throw new Error("not implemented");
}

/**
 * Store a new invocation record in the cache.
 * @param {string} cacheKey
 * @param {object} record - Per-invocation record with response_path
 */
function setCache(cacheKey, record) {
  cache[cacheKey] = { path: record.response_path, timestamp: Date.now() };
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
function getResponsePath(manual, pageNum, provider, modelId, run) {
  throw new Error("not implemented");
}

/**
 * Write a per-invocation record to disk. Flushes immediately.
 * Implements retention guarantee #3 (stream-to-disk).
 * @param {object} record - Full per-invocation record
 */
function writeInvocationRecord(record) {
  throw new Error("not implemented");
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
function appendLedger(
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
  throw new Error("not implemented");
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
async function extractPage(
  manual,
  pageNum,
  modelConfig,
  promptText,
  dryRun = false,
) {
  throw new Error("not implemented");
}

/**
 * Get the page range for a chapter from chapters.json.
 * @param {{ id?: string, name?: string, manual?: string }} chapter
 * @returns {{ start: number, end: number } | null}
 */
function getPageRangeForChapter(chapter) {
  throw new Error("not implemented");
}

// ─── Entry point ────────────────────────────────────────────────────────────

async function main() {
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
    cache = {};
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
  const pageResults = new Map();

  for (const page of pages) {
    const { manual: m, page: p, chapter } = page;
    console.log(`\n--- Page ${p} (${chapter?.chapter_name || "unknown"}) ---`);

    if (dryRun) {
      for (const modelConfig of matrix) {
        const cfg = { ...modelConfig };
        if (modelIdOverride && cfg.model_id !== modelIdOverride) continue;
        if (runsOverride) cfg.runs = runsOverride;
        if (temperatureOverride) cfg.temperature = temperatureOverride;
        if (seedBaseOverride) cfg.seed_base = seedBaseOverride;
        console.log(
          `  [DRY RUN] ${cfg.model_id} run r1 page ${p} temp=${cfg.temperature} seed=${cfg.seed_base || 0}`,
        );
      }
      totalPages++;
      continue;
    }

    const pageRows = [];
    for (const modelConfig of matrix) {
      // Apply overrides
      const cfg = { ...modelConfig };
      if (modelIdOverride && cfg.model_id !== modelIdOverride) continue;
      if (runsOverride) cfg.runs = runsOverride;
      if (temperatureOverride) cfg.temperature = temperatureOverride;
      if (seedBaseOverride) cfg.seed_base = seedBaseOverride;

      const rows = await extractPage(m, p, cfg, promptText, dryRun);
      pageRows.push(...rows);
      totalRows += rows.length;
      totalPages++;
    }

    pageResults.set(p, pageRows);
    console.log(`Page ${p} total rows: ${pageRows.length}`);
  }

  console.log(`\n==============================`);
  console.log(`Extraction complete.`);
  console.log(`Pages processed: ${totalPages}`);
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
    allRows.map((r) => JSON.stringify(r)).join("\n") + "\n",
  );

  saveCache();
}

main().catch((err) => {
  console.error("FATAL:", err.message);
  console.error(err.stack);
  process.exit(1);
});
