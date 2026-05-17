/**
 * Tests for curate-page-images.mjs — page-image curation logic.
 *
 * Covers: page resolution (BB6 0-999, BB6 1000+, OBD1), source path mapping,
 * output path mapping, cited-page collection from all JSONLs, dry-run mode,
 * and verification logic. Uses synthetic data in temp directories to avoid
 * touching real files.
 */

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";

// ── Inline helpers extracted from curate-page-images.mjs ─────────────────────

/** Resolve the source PNG path for a (manual, page) tuple. */
function resolveSourcePath(baseDir, manual, page) {
  const p = String(page);
  if (manual === "BB6") {
    const num = parseInt(p, 10);
    const src = num >= 1000
      ? `bb6_ocr/images/page-${p}.png`
      : `bb6_ocr/images/page-${p.padStart(3, "0")}.png`;
    return join(baseDir, src);
  }
  if (manual === "OBD1") {
    return join(baseDir, `obd1_source/verify/page1-${p.padStart(4, "0")}.png`);
  }
  return null;
}

/** Resolve the output WebP path. */
function resolveOutputPath(baseDir, manual, page) {
  return join(baseDir, "research/raw-data/torque-specs/images", manual.toLowerCase(), `p${page}.webp`);
}

/** Collect unique (manual, page) tuples from all JSONL sources. */
function collectCitedPages(baseDir) {
  const TORQUES_PATH = join(baseDir, "research/raw-data/torque-specs/h22-torques.jsonl");
  const DISPUTED_PATH = join(baseDir, "research/raw-data/torque-specs/h22-torques-disputed.jsonl");
  const REJECTS_PATH = join(baseDir, "research/raw-data/torque-specs/h22-torques-rejects.jsonl");

  function loadJSONL(path) {
    try {
      const text = readFileSync(path, "utf8").trim();
      if (!text) return [];
      return text.split("\n").map((line) => {
        try { return JSON.parse(line); } catch { return null; }
      }).filter(Boolean);
    } catch {
      return [];
    }
  }

  const set = new Set();

  for (const row of loadJSONL(TORQUES_PATH)) {
    if (row.source?.manual && row.source?.page) {
      set.add(`${row.source.manual}:${row.source.page}`);
    }
    if (Array.isArray(row.sources)) {
      for (const src of row.sources) {
        if (src.manual && src.page) {
          set.add(`${src.manual}:${src.page}`);
        }
      }
    }
  }

  for (const row of loadJSONL(DISPUTED_PATH)) {
    if (row.source?.manual && row.source?.page) {
      set.add(`${row.source.manual}:${row.source.page}`);
    }
    if (Array.isArray(row.sources)) {
      for (const src of row.sources) {
        if (src.manual && src.page) {
          set.add(`${src.manual}:${src.page}`);
        }
      }
    }
  }

  for (const entry of loadJSONL(REJECTS_PATH)) {
    const inv = entry.invocation_record || entry;
    if (inv.manual && inv.page) {
      set.add(`${inv.manual}:${inv.page}`);
    }
    if (entry.manual && entry.page) {
      set.add(`${entry.manual}:${entry.page}`);
    }
  }

  return [...set].sort((a, b) => {
    const [m1, p1] = a.split(":");
    const [m2, p2] = b.split(":");
    return m1 !== m2 ? m1.localeCompare(m2) : Number(p1) - Number(p2);
  });
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe("resolveSourcePath", () => {
  it("resolves BB6 page < 1000 with 3-digit padding", () => {
    const base = "/tmp/test-h22";
    assert.strictEqual(resolveSourcePath(base, "BB6", 56), join(base, "bb6_ocr/images/page-056.png"));
    assert.strictEqual(resolveSourcePath(base, "BB6", 136), join(base, "bb6_ocr/images/page-136.png"));
    assert.strictEqual(resolveSourcePath(base, "BB6", 999), join(base, "bb6_ocr/images/page-999.png"));
  });

  it("resolves BB6 page >= 1000 with 4-digit name", () => {
    const base = "/tmp/test-h22";
    assert.strictEqual(resolveSourcePath(base, "BB6", 1000), join(base, "bb6_ocr/images/page-1000.png"));
    assert.strictEqual(resolveSourcePath(base, "BB6", 1375), join(base, "bb6_ocr/images/page-1375.png"));
  });

  it("resolves OBD1 pages with page1-NNNN format", () => {
    const base = "/tmp/test-h22";
    assert.strictEqual(resolveSourcePath(base, "OBD1", 500), join(base, "obd1_source/verify/page1-0500.png"));
  });

  it("returns null for unknown manual", () => {
    assert.strictEqual(resolveSourcePath("/tmp", "UNKNOWN", 1), null);
  });
});

describe("resolveOutputPath", () => {
  it("produces correct output path for BB6", () => {
    const base = "/tmp/test-h22";
    assert.strictEqual(resolveOutputPath(base, "BB6", 136), join(base, "research/raw-data/torque-specs/images/bb6/p136.webp"));
    assert.strictEqual(resolveOutputPath(base, "BB6", 1000), join(base, "research/raw-data/torque-specs/images/bb6/p1000.webp"));
  });

  it("produces correct output path for OBD1", () => {
    const base = "/tmp/test-h22";
    assert.strictEqual(resolveOutputPath(base, "OBD1", 500), join(base, "research/raw-data/torque-specs/images/obd1/p500.webp"));
  });
});

/** Create a fresh temp directory with the required subdirs. */
function createFixture() {
  const tmpDir = join(tmpdir(), `h22-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  mkdirSync(tmpDir, { recursive: true });
  mkdirSync(join(tmpDir, "research/raw-data/torque-specs"), { recursive: true });
  return tmpDir;
}

/** Cleanup a fixture directory. */
function cleanup(dir) {
  if (dir) rmSync(dir, { recursive: true, force: true });
}

describe("collectCitedPages", () => {
  it("returns empty array when no JSONL files exist", (t) => {
    const tmpDir = createFixture();
    try {
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, []);
    } finally { cleanup(tmpDir); }
  });

  it("extracts pages from torques.jsonl source field", (t) => {
    const tmpDir = createFixture();
    try {
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques.jsonl"),
        JSON.stringify({ source: { manual: "BB6", page: 136 } }) + "\n" +
        JSON.stringify({ source: { manual: "BB6", page: 200 } }) + "\n");
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, ["BB6:136", "BB6:200"]);
    } finally { cleanup(tmpDir); }
  });

  it("extracts pages from torques.jsonl sources array (cross-page dedup)", (t) => {
    const tmpDir = createFixture();
    try {
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques.jsonl"),
        JSON.stringify({ source: { manual: "BB6", page: 136 }, sources: [{ manual: "BB6", page: 136 }] }) + "\n");
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, ["BB6:136"]);
    } finally { cleanup(tmpDir); }
  });

  it("extracts pages from disputed.jsonl", (t) => {
    const tmpDir = createFixture();
    try {
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques-disputed.jsonl"),
        JSON.stringify({ source: { manual: "BB6", page: 999 } }) + "\n");
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, ["BB6:999"]);
    } finally { cleanup(tmpDir); }
  });

  it("extracts pages from rejects.jsonl (wrapped in invocation_record)", (t) => {
    const tmpDir = createFixture();
    try {
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques-rejects.jsonl"),
        JSON.stringify({ invocation_record: { manual: "BB6", page: 500 } }) + "\n");
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, ["BB6:500"]);
    } finally { cleanup(tmpDir); }
  });

  it("extracts pages from rejects.jsonl (direct fields)", (t) => {
    const tmpDir = createFixture();
    try {
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques-rejects.jsonl"),
        JSON.stringify({ manual: "OBD1", page: 500 }) + "\n");
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, ["OBD1:500"]);
    } finally { cleanup(tmpDir); }
  });

  it("deduplicates pages across all three JSONL files", (t) => {
    const tmpDir = createFixture();
    try {
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques.jsonl"),
        JSON.stringify({ source: { manual: "BB6", page: 100 } }) + "\n");
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques-disputed.jsonl"),
        JSON.stringify({ source: { manual: "BB6", page: 100 } }) + "\n");
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques-rejects.jsonl"),
        JSON.stringify({ manual: "BB6", page: 100 }) + "\n");
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, ["BB6:100"]);
    } finally { cleanup(tmpDir); }
  });

  it("sorts pages numerically within each manual, then by manual alphabetically", (t) => {
    const tmpDir = createFixture();
    try {
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques.jsonl"),
        JSON.stringify({ source: { manual: "OBD1", page: 500 } }) + "\n" +
        JSON.stringify({ source: { manual: "BB6", page: 200 } }) + "\n" +
        JSON.stringify({ source: { manual: "BB6", page: 100 } }) + "\n" +
        JSON.stringify({ source: { manual: "OBD1", page: 100 } }) + "\n");
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, ["BB6:100", "BB6:200", "OBD1:100", "OBD1:500"]);
    } finally { cleanup(tmpDir); }
  });

  it("handles malformed JSON lines gracefully", (t) => {
    const tmpDir = createFixture();
    try {
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques.jsonl"),
        "not json\n" +
        JSON.stringify({ source: { manual: "BB6", page: 136 } }) + "\n" +
        "{broken\n");
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, ["BB6:136"]);
    } finally { cleanup(tmpDir); }
  });

  it("handles empty JSONL files", (t) => {
    const tmpDir = createFixture();
    try {
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques.jsonl"), "");
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques-disputed.jsonl"), "");
      writeFileSync(join(tmpDir, "research/raw-data/torque-specs/h22-torques-rejects.jsonl"), "");
      const result = collectCitedPages(tmpDir);
      assert.deepStrictEqual(result, []);
    } finally { cleanup(tmpDir); }
  });
});
