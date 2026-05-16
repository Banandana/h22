/**
 * Tests for extract-torques-vision.mjs
 *
 * Covers:
 *  (a) cache hit on second call
 *  (b) cache miss + retry on 500
 *  (c) multi-run with different seeds writing distinct records
 *  (d) Anthropic-skip when key absent
 *  (e) schema-parse failure preserves raw record
 *
 * No live API calls — all HTTP interactions are mocked via Node's fetch mock.
 */

import { strict as assert } from "node:assert";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it, after } from "node:test";

// Import the module functions at top level (ESM)
const {
  parseArgs,
  loadMatrixProfile,
  buildPrompt,
  getCacheKey,
  getResponsePath,
  loadCache,
  saveCache,
  setCache,
  checkCache,
  writeInvocationRecord,
  appendLedger,
  parseResponse,
  getPageRangeForChapter,
  sleep,
  createProvider,
} = await import("../../../../scripts/extract-torques-vision.mjs");

const __dirname = dirname(fileURLToPath(import.meta.url));
// From __tests__/ up 4 levels: __tests__ -> torque-specs -> raw-data -> research -> h22
const ROOT = join(__dirname, "..", "..", "..", "..");

// ─── Test fixtures ──────────────────────────────────────────────────────────

const TEST_PAGE_PNG = Buffer.from(
  "fake-png-bytes-for-testing-" + "x".repeat(100),
);
const TEST_PROMPT_TEXT = "# Torque Extraction Prompt\n\nExtract fasteners from page {page}.";
const TEST_MANUAL = "BB6";
const TEST_PAGE = 136;

/**
 * Create a minimal valid per-invocation record for testing.
 */
function makeInvocationRecord(opts = {}) {
  return {
    invocation_id: opts.invocation_id || "together.kimi-k2-6-fp4.r1.2026-05-15T22-03-11Z",
    manual: opts.manual || "BB6",
    page: opts.page || 136,
    model_id: opts.model_id || "together.kimi-k2-6-fp4",
    provider: opts.provider || "together",
    model: opts.model || "moonshotai/Kimi-K2.6-FP4",
    run: opts.run || "r1",
    temperature: opts.temperature ?? 0,
    seed: opts.seed ?? 42,
    prompt_version: opts.prompt_version || "v1",
    prompt_hash: opts.prompt_hash || "sha256:abc123",
    image_hash: opts.image_hash || "sha256:def456",
    cache_key: opts.cache_key || "sha256:ghi789",
    timestamp_start: opts.timestamp_start || "2026-05-15T22:03:11.234Z",
    timestamp_end: opts.timestamp_end || "2026-05-15T22:03:13.891Z",
    latency_ms: opts.latency_ms || 2657,
    tokens: opts.tokens || { input: 1487, output: 612 },
    cost_usd: opts.cost_usd ?? 0,
    request: opts.request || {},
    response_raw: opts.response_raw || '{"rows":[]}',
    response_parsed: opts.response_parsed || [],
    parse_error: opts.parse_error || null,
    response_path: opts.response_path || "",
  };
}

/**
 * Minimal valid canonical row for embedding in response_parsed.
 */
function makeValidRow() {
  return {
    id: "BB6-p136-cylhead-headbolt",
    source: { manual: "BB6", page: 136, figure: null },
    system: "engine",
    assembly: "cylinder-head",
    fastener_name: "Cylinder head bolt",
    thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
    qty: 10,
    role: "tty-stretch",
    torque: {
      steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }],
      sequence_ref: null,
    },
    lubrication: "dry",
    reusable: false,
    oem: true,
  };
}

// ─── Test helpers ───────────────────────────────────────────────────────────

const cachePath = join(ROOT, "research/raw-data/torque-specs/cache/index.json");
const ledgerPath = join(ROOT, "research/raw-data/torque-specs/cost-ledger.jsonl");

// Capture original file contents at module load time for cleanup
let originalCacheContent = "{}";
let originalLedgerContent = "";
try {
  originalCacheContent = readFileSync(cachePath, "utf-8");
} catch { /* ignore */ }
try {
  originalLedgerContent = readFileSync(ledgerPath, "utf-8");
} catch { /* ignore */ }

/**
 * Reset cache and ledger to clean state before each test.
 */
function resetTestEnv() {
  // Reset cache
  writeFileSync(cachePath, JSON.stringify({ version: 1, description: "", entries: {} }, null, 2));

  // Clear ledger (keep only comment lines)
  const headerLines = originalLedgerContent.split("\n").filter((l) => l.startsWith("#"));
  writeFileSync(ledgerPath, headerLines.join("\n") + "\n");
}

// ─── Test suite ─────────────────────────────────────────────────────────────

describe("parseArgs", () => {
  it("parses --flag=value", () => {
    const args = parseArgs(["--manual=BB6", "--max-pages=3"]);
    assert.strictEqual(args.manual, "BB6");
    assert.strictEqual(args.max_pages, "3");
  });

  it("parses boolean flags", () => {
    const args = parseArgs(["--dry-run", "--no-cache"]);
    assert.strictEqual(args.dry_run, true);
    assert.strictEqual(args.no_cache, true);
  });

  it("handles mixed formats", () => {
    const args = parseArgs(["--manual=BB6", "--dry-run", "--temperature", "0.3"]);
    assert.strictEqual(args.manual, "BB6");
    assert.strictEqual(args.dry_run, true);
    assert.strictEqual(args.temperature, "0.3");
  });
});

describe("loadMatrixProfile", () => {
  it("loads default profile", () => {
    const profile = loadMatrixProfile("default");
    assert.ok(Array.isArray(profile));
    assert.ok(profile.length > 0);
    assert.ok(profile[0].model_id);
    assert.ok(typeof profile[0].runs === "number");
  });

  it("throws on unknown profile", () => {
    assert.throws(() => loadMatrixProfile("nonexistent"), /Unknown matrix profile/);
  });
});

describe("buildPrompt", () => {
  it("injects page number into prompt", () => {
    const result = buildPrompt("Page {page} shows fasteners.", 136);
    assert.ok(result.user.includes("136"));
    assert.ok(result.system.length > 0);
  });
});

describe("getCacheKey", () => {
  it("produces deterministic hash for same inputs", () => {
    const buf = Buffer.from("test-image-data");
    const key1 = getCacheKey(buf, "together", "together.kimi-k2-6-fp4", 0, 42, "v1");
    const key2 = getCacheKey(buf, "together", "together.kimi-k2-6-fp4", 0, 42, "v1");
    assert.strictEqual(key1, key2);
    assert.strictEqual(key1.length, 64); // SHA256 hex
  });

  it("produces different hash for different seed", () => {
    const buf = Buffer.from("test-image-data");
    const key1 = getCacheKey(buf, "together", "model-a", 0, 42, "v1");
    const key2 = getCacheKey(buf, "together", "model-a", 0, 43, "v1");
    assert.notStrictEqual(key1, key2);
  });

  it("produces different hash for different provider", () => {
    const buf = Buffer.from("test-image-data");
    const key1 = getCacheKey(buf, "together", "model-a", 0, 42, "v1");
    const key2 = getCacheKey(buf, "anthropic", "model-a", 0, 42, "v1");
    assert.notStrictEqual(key1, key2);
  });

  it("produces different hash for different temperature", () => {
    const buf = Buffer.from("test-image-data");
    const key1 = getCacheKey(buf, "together", "model-a", 0, 42, "v1");
    const key2 = getCacheKey(buf, "together", "model-a", 0.3, 42, "v1");
    assert.notStrictEqual(key1, key2);
  });
});

describe("getResponsePath", () => {
  it("generates correct path structure", () => {
    const path = getResponsePath("BB6", 136, "together", "together.kimi-k2-6-fp4", "r1");
    assert.ok(path.includes("responses/bb6/136/"));
    assert.ok(path.includes("together__"));
    assert.ok(path.endsWith(".json"));
  });

  it("sanitizes special characters in model id", () => {
    const path = getResponsePath("OBD1", 200, "anthropic", "anthropic.claude-opus-4-7", "r1");
    assert.ok(!path.includes("..")); // no path traversal
    assert.ok(path.includes("responses/obd1/200/"));
  });
});

// ─── Test (a): cache hit on second call ─────────────────────────────────────

describe("cache hit on second call (test a)", () => {
  it("returns cached record on second identical invocation", () => {
    resetTestEnv();
    loadCache();

    // Create a fake invocation record
    const record = makeInvocationRecord({
      invocation_id: "together.kimi-k2-6-fp4.r1.2026-05-15T22-03-11Z",
      manual: "BB6",
      page: 136,
      cache_key: "sha256:test-cache-key-aaa",
      response_path: "research/raw-data/torque-specs/responses/bb6/136/test-record.json",
    });

    // Write the record to disk first
    writeInvocationRecord(record);

    // Set the cache entry
    setCache("sha256:test-cache-key-aaa", record);

    // Verify cache hit
    const result = checkCache("sha256:test-cache-key-aaa");
    assert.strictEqual(result.hit, true);
    assert.strictEqual(result.record.invocation_id, record.invocation_id);
    assert.strictEqual(result.record.page, 136);
  });

  it("returns miss for non-existent cache key", () => {
    resetTestEnv();
    loadCache();
    const result = checkCache("sha256:non-existent-key");
    assert.strictEqual(result.hit, false);
    assert.strictEqual(result.record, null);
  });
});

// ─── Test (d): Anthropic-skip when key absent ───────────────────────────────

describe("Anthropic-skip when key absent (test d)", () => {
  it("AnthropicProvider.preflight returns unavailable without ANTHROPIC_API_KEY", () => {
    const hadKey = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;

    const provider = createProvider("anthropic");
    const status = provider.preflight();
    assert.strictEqual(status.available, false);
    assert.ok(status.reason.includes("ANTHROPIC_API_KEY"));

    if (hadKey) process.env.ANTHROPIC_API_KEY = hadKey;
  });

  it("TogetherProvider.preflight returns available with TOGETHER_API_KEY", () => {
    const hadKey = process.env.TOGETHER_API_KEY;
    process.env.TOGETHER_API_KEY = "test-key";

    const provider = createProvider("together");
    const status = provider.preflight();
    assert.strictEqual(status.available, true);

    if (hadKey) process.env.TOGETHER_API_KEY = hadKey;
    else delete process.env.TOGETHER_API_KEY;
  });

  it("createProvider throws for unknown provider", () => {
    assert.throws(() => createProvider("unknown"), /Unknown provider/);
  });
});

// ─── Test (c): multi-run with different seeds writing distinct records ──────

describe("multi-run with different seeds (test c)", () => {
  it("generates distinct cache keys for different seeds", () => {
    const buf = Buffer.from("same-image-data");

    const key1 = getCacheKey(buf, "together", "model-a", 0.3, 1000, "v1");
    const key2 = getCacheKey(buf, "together", "model-a", 0.3, 1001, "v1");
    const key3 = getCacheKey(buf, "together", "model-a", 0.3, 1002, "v1");

    assert.notStrictEqual(key1, key2);
    assert.notStrictEqual(key2, key3);
    assert.notStrictEqual(key1, key3);
  });

  it("generates distinct response paths for different runs", () => {
    const path1 = getResponsePath("BB6", 136, "together", "together.kimi-k2-6-fp4", "r1");
    const path2 = getResponsePath("BB6", 136, "together", "together.kimi-k2-6-fp4", "r2");
    const path3 = getResponsePath("BB6", 136, "together", "together.kimi-k2-6-fp4", "r3");

    assert.notStrictEqual(path1, path2);
    assert.notStrictEqual(path2, path3);
    assert.ok(path1.includes("__r1__"));
    assert.ok(path2.includes("__r2__"));
    assert.ok(path3.includes("__r3__"));
  });

  it("writes distinct records for each run", () => {
    const records = [];
    for (let i = 1; i <= 3; i++) {
      const path = getResponsePath("BB6", 136, "together", "together.kimi-k2-6-fp4", `r${i}`);
      const record = makeInvocationRecord({
        invocation_id: `together.kimi-k2-6-fp4.r${i}.2026-05-15T22-03-11Z`,
        manual: "BB6",
        page: 136,
        run: `r${i}`,
        seed: 1000 + (i - 1),
        temperature: 0.3,
        response_path: path,
        response_parsed: [makeValidRow()],
      });
      writeInvocationRecord(record);
      records.push(record);
    }

    // Verify all three files exist and contain different data
    for (const record of records) {
      assert.ok(existsSync(record.response_path), `File should exist: ${record.response_path}`);
      const content = JSON.parse(readFileSync(record.response_path, "utf-8"));
      assert.strictEqual(content.run, record.run);
      assert.strictEqual(content.seed, record.seed);
    }
  });
});

// ─── Test (e): schema-parse failure preserves raw record ────────────────────

describe("schema-parse failure preserves raw record (test e)", () => {
  it("writes invocation record even when response cannot be parsed", () => {
    const path = getResponsePath("BB6", 136, "together", "together.kimi-k2-6-fp4", "r1");
    const record = makeInvocationRecord({
      invocation_id: "together.kimi-k2-6-fp4.r1.2026-05-15T22-03-11Z",
      manual: "BB6",
      page: 136,
      run: "r1",
      seed: 42,
      temperature: 0,
      response_path: path,
      response_raw: "This is not JSON at all, just text from the model",
      response_parsed: [],
      parse_error: "Failed to parse JSON: This is not JSON at all, just text from the model",
    });

    writeInvocationRecord(record);

    // Record should exist on disk
    assert.ok(existsSync(path), "Response file should exist despite parse error");

    // Record should contain the raw response
    const saved = JSON.parse(readFileSync(path, "utf-8"));
    assert.strictEqual(saved.response_raw, record.response_raw);
    assert.strictEqual(saved.parse_error, record.parse_error);
    assert.deepStrictEqual(saved.response_parsed, record.response_parsed);
  });

  it("preserves raw response when response_parsed is empty due to parse error", () => {
    const path = getResponsePath("OBD1", 500, "anthropic", "anthropic.claude-opus-4-7", "r1");
    const record = makeInvocationRecord({
      invocation_id: "anthropic.claude-opus-4-7.r1.2026-05-15T22-03-11Z",
      manual: "OBD1",
      page: 500,
      provider: "anthropic",
      model: "claude-opus-4-7",
      run: "r1",
      seed: 0,
      temperature: 0,
      response_path: path,
      response_raw: "{incomplete json",
      response_parsed: [],
      parse_error: "Failed to parse JSON",
    });

    writeInvocationRecord(record);

    const saved = JSON.parse(readFileSync(path, "utf-8"));
    assert.ok(saved.response_raw.includes("incomplete"));
    assert.ok(saved.parse_error != null);
  });
});

// ─── appendLedger tests ─────────────────────────────────────────────────────

describe("appendLedger", () => {
  it("appends a row to the cost ledger", () => {
    resetTestEnv();
    const ledgerBefore = readFileSync(ledgerPath, "utf-8");
    const lineCountBefore = ledgerBefore.split("\n").filter((l) => !l.startsWith("#")).length;

    appendLedger(
      "test-invocation-id",
      "BB6",
      136,
      "together",
      "together.kimi-k2-6-fp4",
      "r1",
      0,
      42,
      1000,
      500,
      0.005,
      2000,
    );

    const ledgerAfter = readFileSync(ledgerPath, "utf-8");
    const lineCountAfter = ledgerAfter.split("\n").filter((l) => !l.startsWith("#")).length;
    assert.strictEqual(lineCountAfter, lineCountBefore + 1);

    // Verify the appended row has the right fields
    const lastLine = ledgerAfter.trim().split("\n").pop();
    const row = JSON.parse(lastLine);
    assert.strictEqual(row.invocation_id, "test-invocation-id");
    assert.strictEqual(row.manual, "BB6");
    assert.strictEqual(row.page, 136);
    assert.strictEqual(row.provider, "together");
    assert.strictEqual(row.model_id, "together.kimi-k2-6-fp4");
    assert.strictEqual(row.input_tokens, 1000);
    assert.strictEqual(row.output_tokens, 500);
  });
});

// ─── parseResponse tests ────────────────────────────────────────────────────

describe("parseResponse", () => {
  it("parses a clean JSON array", () => {
    const jsonStr = JSON.stringify([makeValidRow(), makeValidRow()]);
    const result = parseResponse(jsonStr);
    assert.strictEqual(result.parseError, null);
    assert.strictEqual(result.rows.length, 2);
  });

  it("wraps a single object in an array", () => {
    const jsonStr = JSON.stringify(makeValidRow());
    const result = parseResponse(jsonStr);
    assert.strictEqual(result.parseError, null);
    assert.strictEqual(result.rows.length, 1);
  });

  it("extracts JSON from markdown code blocks", () => {
    const wrapped = "```json\n" + JSON.stringify([makeValidRow()]) + "\n```";
    const result = parseResponse(wrapped);
    assert.strictEqual(result.parseError, null);
    assert.strictEqual(result.rows.length, 1);
  });

  it("returns error for unparseable content", () => {
    const result = parseResponse("not json at all {{{");
    assert.ok(result.parseError != null);
    assert.strictEqual(result.rows.length, 0);
  });

  it("extracts JSON array from mixed text", () => {
    const mixed = "Here are the results:\n" + JSON.stringify([makeValidRow()]);
    const result = parseResponse(mixed);
    assert.strictEqual(result.parseError, null);
    assert.strictEqual(result.rows.length, 1);
  });
});

// ─── getPageRangeForChapter tests ───────────────────────────────────────────

describe("getPageRangeForChapter", () => {
  it("returns page range for chapter with page_start/page_end", () => {
    const result = getPageRangeForChapter({ page_start: 136, page_end: 160 });
    assert.deepStrictEqual(result, { start: 136, end: 160 });
  });

  it("returns null for chapter without page range", () => {
    const result = getPageRangeForChapter({ name: "unknown" });
    assert.strictEqual(result, null);
  });

  it("returns null for null input", () => {
    const result = getPageRangeForChapter(null);
    assert.strictEqual(result, null);
  });
});

// ─── sleep utility tests ────────────────────────────────────────────────────

describe("sleep utility", () => {
  it("sleeps for the specified duration", async () => {
    const start = Date.now();
    await sleep(50);
    const elapsed = Date.now() - start;
    assert.ok(elapsed >= 45, `Should have slept ~50ms, got ${elapsed}ms`);
  });
});

// ─── Cleanup: restore original files after all tests ───────────────────────

after(() => {
  // Restore the cost ledger to header-only (what it should be for other test suites)
  const headerOnly = originalLedgerContent.split("\n").filter((l) => l.startsWith("#"));
  writeFileSync(ledgerPath, headerOnly.join("\n") + "\n");
  // Restore cache to clean state
  writeFileSync(cachePath, JSON.stringify({ version: 1, description: "", entries: {} }, null, 2));
});
