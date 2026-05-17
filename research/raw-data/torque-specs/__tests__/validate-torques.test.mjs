/**
 * Tests for validate-torques.mjs pipeline logic.
 *
 * Each test creates its own isolated temp directory and cleans up after itself.
 * Tests run sequentially via concurrency:1 to avoid race conditions.
 */

import { strict as assert } from "node:assert";
import { describe, it, after } from "node:test";
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  validateInvocationRecord,
  validateCanonicalRow,
} from "../schema-validator.mjs";

let testDir;

function setupTestDir() {
  testDir = join(tmpdir(), `h22-val-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  const baseDir = join(testDir, "research", "raw-data", "torque-specs");
  const bb6Dir = join(baseDir, "responses", "bb6");
  const obd1Dir = join(baseDir, "responses", "obd1");

  mkdirSync(bb6Dir, { recursive: true });
  mkdirSync(obd1Dir, { recursive: true });

  return { testDir, baseDir, bb6Dir, obd1Dir };
}

function teardown() {
  if (testDir) {
    try { rmSync(testDir, { recursive: true, force: true }); } catch { /* ignore */ }
    testDir = null;
  }
}

function writeInv(dir, name, rec) {
  writeFileSync(join(dir, name), JSON.stringify(rec), "utf-8");
}

function mkInv(opts = {}) {
  return {
    invocation_id: opts.invocation_id || "test.kimi.r1.2026-01-01T00:00:00Z",
    manual: opts.manual || "BB6",
    page: opts.page || 136,
    model_id: opts.model_id || "together.kimi-k2-6-fp4",
    provider: opts.provider || "together",
    model: opts.model || "moonshotai/Kimi-K2.6-FP4",
    run: opts.run || "r1",
    temperature: opts.temperature ?? 0,
    seed: opts.seed ?? 42,
    prompt_version: opts.prompt_version || "v1",
    prompt_hash: opts.prompt_hash || "sha256:abc",
    image_hash: opts.image_hash || "sha256:def",
    cache_key: opts.cache_key || "sha256:ghi",
    timestamp_start: opts.timestamp_start || "2026-01-01T00:00:00.000Z",
    timestamp_end: opts.timestamp_end || "2026-01-01T00:00:01.000Z",
    latency_ms: opts.latency_ms || 1000,
    tokens: opts.tokens || { input: 100, output: 50 },
    cost_usd: opts.cost_usd || 0.001,
    request: opts.request || {},
    response_raw: opts.response_raw || "{}",
    response_parsed: opts.response_parsed || [],
    parse_error: null,
  };
}

function mkRow(opts = {}) {
  return {
    id: opts.id || "BB6-p136-cylhead-headbolt",
    source: opts.source || { manual: "BB6", page: 136, figure: null },
    system: opts.system || "engine",
    assembly: opts.assembly || "cylinder-head",
    fastener_name: opts.fastener_name || "Cylinder head bolt",
    thread: opts.thread || { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
    qty: opts.qty || 10,
    role: opts.role || "tty-stretch",
    torque: opts.torque || {
      steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }],
      sequence_ref: null,
    },
    lubrication: opts.lubrication || "dry",
    reusable: opts.reusable ?? false,
    oem: opts.oem ?? true,
  };
}

// Pipeline runner — mirrors validate-torques.mjs core logic
function collectJsonFiles(dir) {
  const results = [];
  function walk(d) {
    const entries = readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(".json")) results.push(full);
    }
  }
  walk(dir);
  return results.sort();
}

function runPipeline(baseDir) {
  let bb6Files = [];
  let obd1Files = [];
  try { bb6Files = collectJsonFiles(join(baseDir, "responses", "bb6")); } catch { /* skip */ }
  try { obd1Files = collectJsonFiles(join(baseDir, "responses", "obd1")); } catch { /* skip */ }
  const allFiles = [...bb6Files, ...obd1Files].sort();

  const flatRows = [];
  const rejectRecords = [];
  let totalInvocations = 0;
  let validInvocations = 0;
  let emptyInvocations = 0;
  let nonConformantInvocations = 0;
  let perModelRowCount = {};
  let confidenceDistribution = { high: 0, medium: 0, low: 0, unknown: 0 };

  for (const filePath of allFiles) {
    let raw;
    try { raw = readFileSync(filePath, "utf-8"); } catch { continue; }

    let record;
    try { record = JSON.parse(raw); } catch { continue; }

    totalInvocations++;

    const invVal = validateInvocationRecord(record);
    if (!invVal.success) {
      rejectRecords.push({
        invocation_record: record,
        validation_errors: [`Invocation record: ${invVal.error}`],
        rejected_rows: [],
      });
      continue;
    }

    const parsed = record.response_parsed;
    if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
      emptyInvocations++;
      continue;
    }

    const modelId = record.model_id || "unknown";
    if (!perModelRowCount[modelId]) perModelRowCount[modelId] = 0;

    let rowsFromThisInvocation = 0;
    let rejectedRows = [];

    for (let i = 0; i < parsed.length; i++) {
      const rowResult = validateCanonicalRow(parsed[i]);
      if (rowResult.success) {
        const flatRow = /** @type {Record<string, unknown>} */ (rowResult.data);
        flatRow.invocation_id = record.invocation_id;

        const t = flatRow.thread || {};
        const key = `${flatRow.id}|${flatRow.assembly}|${flatRow.fastener_name}|${t.nominal_mm}|${t.pitch_mm}`;
        const dupIndex = flatRows.findIndex((r) => r._dk === key && r._di === record.invocation_id);
        if (dupIndex >= 0) continue;
        flatRow._dk = key;
        flatRow._di = record.invocation_id;

        flatRows.push(flatRow);
        perModelRowCount[modelId]++;
        rowsFromThisInvocation++;

        const conf = flatRow.confidence || "unknown";
        if (confidenceDistribution[conf] !== undefined) confidenceDistribution[conf]++;
        else confidenceDistribution.unknown++;
      } else {
        rejectedRows.push({ index: i, errors: [rowResult.error] });
      }
    }

    if (rowsFromThisInvocation > 0) validInvocations++;
    else if (rejectedRows.length > 0) nonConformantInvocations++;

    if (rejectedRows.length > 0) {
      rejectRecords.push({
        invocation_record: record,
        validation_errors: rejectedRows.flatMap((r) => r.errors),
        rejected_rows: rejectedRows,
      });
    }
  }

  // Cross-invocation dedup
  const seenKeys = new Set();
  const dedupedFlatRows = [];
  let crossInvocationDups = 0;
  for (const row of flatRows) {
    if (seenKeys.has(row._dk)) {
      crossInvocationDups++;
    } else {
      seenKeys.add(row._dk);
      const { _dk, _di, ...cleanRow } = row;
      dedupedFlatRows.push(cleanRow);
    }
  }

  return {
    flatRows: dedupedFlatRows,
    rejectRecords,
    stats: {
      totalInvocations,
      validInvocations,
      nonConformantInvocations,
      emptyInvocations,
      totalFlatRows: dedupedFlatRows.length,
      totalRejects: rejectRecords.length,
      perModelRowCount,
      confidenceDistribution,
    },
    crossInvocationDups,
  };
}

// ===========================================================================
// Tests — each uses unique file names to avoid collisions
// ===========================================================================

describe("validate-torques pipeline", { concurrency: 1 }, () => {
  after(() => teardown());

  it("emits flat rows for invocations with valid canonical parsed rows", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      const validRow = mkRow({ id: "BB6-p100-bolt-001", assembly: "engine-mount", fastener_name: "Engine mount bolt" });
      writeInv(bb6Dir, "flat_valid_r1.json", mkInv({ invocation_id: "test.flat.valid.r1", manual: "BB6", page: 100, response_parsed: [validRow] }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 1);
      assert.strictEqual(result.flatRows[0].invocation_id, "test.flat.valid.r1");
      assert.strictEqual(result.flatRows[0].assembly, "engine-mount");
      assert.strictEqual(result.rejectRecords.length, 0);
    } finally { teardown(); }
  });

  it("emits reject records for invocations with non-conformant parsed rows", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "reject_bad_r1.json", mkInv({ invocation_id: "test.reject.bad.r1", manual: "BB6", page: 200, response_parsed: [{ analysis: "nothing here" }] }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 0);
      assert.strictEqual(result.rejectRecords.length, 1);
      assert.ok(result.rejectRecords[0].rejected_rows.length > 0);
    } finally { teardown(); }
  });

  it("skips invocations with empty response_parsed without rejecting", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "skip_empty_r1.json", mkInv({ invocation_id: "test.skip.empty.r1", manual: "BB6", page: 300, response_parsed: [] }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 0);
      assert.strictEqual(result.rejectRecords.length, 0);
      assert.strictEqual(result.stats.emptyInvocations, 1);
    } finally { teardown(); }
  });

  it("skips invocations with null response_parsed without rejecting", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "skip_null_r1.json", mkInv({ invocation_id: "test.skip.null.r1", manual: "BB6", page: 400, response_parsed: null }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 0);
      assert.strictEqual(result.rejectRecords.length, 0);
      assert.strictEqual(result.stats.emptyInvocations, 1);
    } finally { teardown(); }
  });

  it("handles mixed valid/invalid rows within one invocation", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "mixed_r1.json", mkInv({
        invocation_id: "test.mixed.r1", manual: "BB6", page: 500,
        response_parsed: [mkRow({ id: "BB6-p500-good" }), { analysis: "bad" }, mkRow({ id: "BB6-p500-good2" })],
      }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 2);
      assert.strictEqual(result.rejectRecords.length, 1);
      assert.strictEqual(result.rejectRecords[0].rejected_rows.length, 1);
    } finally { teardown(); }
  });

  it("deduplicates rows within the same invocation", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      const dupRow = mkRow({ id: "BB6-p600-dup", assembly: "same" });
      writeInv(bb6Dir, "dedup_same_r1.json", mkInv({ invocation_id: "test.dedup.same.r1", manual: "BB6", page: 600, response_parsed: [dupRow, dupRow] }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 1);
    } finally { teardown(); }
  });

  it("deduplicates across invocations — keeps first seen", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      const row1 = mkRow({ id: "BB6-p700-cross", assembly: "cross-dedup" });
      const row2 = mkRow({ id: "BB6-p700-cross", assembly: "cross-dedup" });
      writeInv(bb6Dir, "dedup_a_r1.json", mkInv({ invocation_id: "test.dedup.a.r1", manual: "BB6", page: 700, response_parsed: [row1] }));
      writeInv(bb6Dir, "dedup_b_r1.json", mkInv({ invocation_id: "test.dedup.b.r1", manual: "BB6", page: 701, response_parsed: [row2] }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 1);
      assert.strictEqual(result.flatRows[0].invocation_id, "test.dedup.a.r1");
      assert.strictEqual(result.crossInvocationDups, 1);
    } finally { teardown(); }
  });

  it("processes both BB6 and OBD1 response directories", () => {
    const { baseDir, bb6Dir, obd1Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "both_bb6_r1.json", mkInv({ invocation_id: "test.both.bb6.r1", manual: "BB6", page: 100, response_parsed: [mkRow({ id: "BB6-p100-bb6bolt" })] }));
      writeInv(obd1Dir, "both_obd1_r1.json", mkInv({ invocation_id: "test.both.obd1.r1", manual: "OBD1", page: 1200, response_parsed: [mkRow({ id: "OBD1-p1200-obdbolt", source: { manual: "OBD1", page: 1200, figure: null } })] }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 2);
      const bb6Rows = result.flatRows.filter((r) => r.source.manual === "BB6");
      const obd1Rows = result.flatRows.filter((r) => r.source.manual === "OBD1");
      assert.strictEqual(bb6Rows.length, 1);
      assert.strictEqual(obd1Rows.length, 1);
    } finally { teardown(); }
  });

  it("handles non-JSON files gracefully", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeFileSync(join(bb6Dir, "not-json.txt"), "this is not json", "utf-8");
      writeFileSync(join(bb6Dir, "broken.json"), "{ broken json }", "utf-8");

      const result = runPipeline(baseDir);

      assert.ok(Array.isArray(result.flatRows));
      assert.ok(Array.isArray(result.rejectRecords));
    } finally { teardown(); }
  });

  it("writes flat JSONL and rejects JSONL to base dir", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "write_r1.json", mkInv({ invocation_id: "test.write.r1", manual: "BB6", page: 900, response_parsed: [mkRow({ id: "BB6-p900-write-test" })] }));

      const flatPath = join(baseDir, "h22-torques-flat.jsonl");
      const rejectsPath = join(baseDir, "h22-torques-rejects.jsonl");

      const result = runPipeline(baseDir);
      writeFileSync(flatPath, result.flatRows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");
      writeFileSync(rejectsPath, result.rejectRecords.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");

      assert.ok(readFileSync(flatPath, "utf-8").length > 0);
      assert.strictEqual(readFileSync(rejectsPath, "utf-8").trim(), "");
    } finally { teardown(); }
  });

  it("computes correct summary stats", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "stats1.json", mkInv({ invocation_id: "test.stats1.r1", manual: "BB6", page: 100, response_parsed: [mkRow({ id: "BB6-p100-stats" })] }));
      writeInv(bb6Dir, "stats2.json", mkInv({ invocation_id: "test.stats2.r1", manual: "BB6", page: 200, response_parsed: [] }));
      writeInv(bb6Dir, "stats3.json", mkInv({ invocation_id: "test.stats3.r1", manual: "BB6", page: 300, response_parsed: [{ analysis: "bad" }] }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.stats.totalInvocations, 3);
      assert.strictEqual(result.stats.validInvocations, 1);
      assert.strictEqual(result.stats.nonConformantInvocations, 1);
      assert.strictEqual(result.stats.emptyInvocations, 1);
      assert.strictEqual(result.stats.totalFlatRows, 1);
      assert.strictEqual(result.stats.totalRejects, 1);
    } finally { teardown(); }
  });

  it("tracks per-model row counts correctly", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "model1.json", mkInv({ invocation_id: "test.m1.r1", model_id: "together.kimi-k2-6-fp4", response_parsed: [mkRow({ id: "BB6-p100-m1" })] }));
      writeInv(bb6Dir, "model2.json", mkInv({ invocation_id: "test.m2.r1", model_id: "together.qwen3-vl-235b", response_parsed: [mkRow({ id: "BB6-p200-m2a" }), mkRow({ id: "BB6-p200-m2b" })] }));

      const result = runPipeline(baseDir);

      assert.deepStrictEqual(result.stats.perModelRowCount, {
        "together.kimi-k2-6-fp4": 1,
        "together.qwen3-vl-235b": 2,
      });
    } finally { teardown(); }
  });

  it("strips internal dedup fields from output flat rows", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      const row = mkRow({ id: "BB6-p100-strip" });
      writeInv(bb6Dir, "strip_r1.json", mkInv({ invocation_id: "test.strip.r1", manual: "BB6", page: 100, response_parsed: [row, row] }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 1);
      assert.ok(!("_dk" in result.flatRows[0]));
      assert.ok(!("_di" in result.flatRows[0]));
      assert.ok("invocation_id" in result.flatRows[0]);
    } finally { teardown(); }
  });

  it("handles multi-row invocation with some rejects", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "multi_r1.json", mkInv({
        invocation_id: "test.multi.r1", manual: "BB6", page: 400,
        response_parsed: [mkRow({ id: "BB6-p400-valid1" }), { analysis: "missing everything" }, mkRow({ id: "BB6-p400-valid2" })],
      }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 2);
      assert.strictEqual(result.rejectRecords.length, 1);
      assert.strictEqual(result.rejectRecords[0].rejected_rows.length, 1);
      assert.strictEqual(result.rejectRecords[0].rejected_rows[0].index, 1);
    } finally { teardown(); }
  });

  it("handles invocation with parse_error but non-empty response_parsed", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "parseerr_r1.json", mkInv({
        invocation_id: "test.parseerr.r1", manual: "BB6", page: 100,
        parse_error: "Failed to parse JSON: unexpected token",
        response_parsed: [mkRow({ id: "BB6-p100-parse-error" })],
      }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 1);
    } finally { teardown(); }
  });

  it("handles invocation with response_parsed containing non-object entries", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      writeInv(bb6Dir, "nonobj_r1.json", mkInv({
        invocation_id: "test.nonobj.r1", manual: "BB6", page: 100,
        response_parsed: ["string entry", 42, null, mkRow({ id: "BB6-p100-good" })],
      }));

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 1);
      assert.strictEqual(result.rejectRecords.length, 1);
    } finally { teardown(); }
  });

  it("handles empty responses directory", () => {
    const { baseDir } = setupTestDir();
    try {
      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 0);
      assert.strictEqual(result.rejectRecords.length, 0);
      assert.strictEqual(result.stats.totalInvocations, 0);
    } finally { teardown(); }
  });


  it("handles invocation record that fails top-level schema validation", () => {
    const { baseDir, bb6Dir } = setupTestDir();
    try {
      const badRecord = {
        invocation_id: "test.badinv.r1", page: 100, model_id: "test", provider: "test",
        model: "test", run: "r1", temperature: 0, seed: 0, prompt_version: "v1",
        prompt_hash: "sha", image_hash: "sha", cache_key: "sha",
        timestamp_start: "2026-01-01T00:00:00.000Z", timestamp_end: "2026-01-01T00:00:01.000Z",
        request: {}, response_raw: "",
      };
      writeInv(bb6Dir, "badinv_r1.json", badRecord);

      const result = runPipeline(baseDir);

      assert.strictEqual(result.flatRows.length, 0);
      assert.strictEqual(result.rejectRecords.length, 1);
      assert.ok(result.rejectRecords[0].validation_errors.some((e) => e.includes("manual")));
    } finally { teardown(); }
  });
});
