/**
 * Backfill image-path tests — T-434.
 *
 * Verifies:
 *  (1) Every torque row in h22-torques.jsonl has source.image_path set
 *  (2) Every reject row in h22-torques-rejects.jsonl has invocation_record.image_path set
 *  (3) Image paths use correct format: images/<manual>/p<page>.webp (unpadded)
 *  (4) All referenced image paths resolve to existing WebP files on disk
 *  (5) build-torque-db.mjs uses unpadded page numbers (not padStart(4,"0"))
 */

import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..", "..", "..", "..");
const DB_DIR = join(ROOT, "research", "raw-data", "torque-specs");

// ─── Helpers ────────────────────────────────────────────────────────────────

function loadJsonl(filename) {
  const resolved = join(DB_DIR, filename);
  if (!existsSync(resolved)) return [];
  const raw = readFileSync(resolved, "utf8").trim();
  if (!raw) return [];
  return raw.split("\n").map((l) => JSON.parse(l));
}

/** Expected image path format (unpadded, matching curate-page-images.mjs output). */
function expectedImagePath(manual, page) {
  return `images/${manual.toLowerCase()}/p${page}.webp`;
}

/** Check that a file exists relative to DB_DIR. */
function imageExists(relativePath) {
  return existsSync(join(DB_DIR, relativePath));
}

// ─── Test suite ─────────────────────────────────────────────────────────────

describe("T-434: image_path backfill on h22-torques.jsonl", () => {
  const torques = loadJsonl("h22-torques.jsonl");

  it("has at least one torque row", () => {
    assert.ok(torques.length > 0, "h22-torques.jsonl should have rows");
  });

  it("every torque row has source.image_path set", () => {
    for (const row of torques) {
      assert.ok(
        row.source?.image_path,
        `Row ${row.id} missing source.image_path`,
      );
    }
  });

  it("image_path matches expected format images/<manual>/p<page>.webp", () => {
    for (const row of torques) {
      const manual = row.source?.manual || "BB6";
      const page = row.source?.page;
      const expected = expectedImagePath(manual, page);
      assert.strictEqual(
        row.source.image_path,
        expected,
        `Row ${row.id}: expected ${expected}, got ${row.source.image_path}`,
      );
    }
  });

  it("all torque image_paths resolve to existing WebP files", () => {
    for (const row of torques) {
      const exists = imageExists(row.source.image_path);
      assert.ok(
        exists,
        `Torque ${row.id}: ${row.source.image_path} should exist on disk`,
      );
    }
  });
});

describe("T-434: image_path backfill on h22-torques-disputed.jsonl", () => {
  const disputed = loadJsonl("h22-torques-disputed.jsonl");

  it("disputed rows (if any) have source.image_path set", () => {
    for (const row of disputed) {
      assert.ok(
        row.source?.image_path,
        `Disputed row ${row.id} missing source.image_path`,
      );
    }
  });

  it("disputed image_paths match expected format", () => {
    for (const row of disputed) {
      const manual = row.source?.manual || "BB6";
      const page = row.source?.page;
      const expected = expectedImagePath(manual, page);
      assert.strictEqual(
        row.source.image_path,
        expected,
        `Disputed ${row.id}: expected ${expected}, got ${row.source.image_path}`,
      );
    }
  });
});

describe("T-434: image_path backfill on h22-torques-rejects.jsonl", () => {
  const rejects = loadJsonl("h22-torques-rejects.jsonl");

  it("has reject rows", () => {
    assert.ok(rejects.length > 0, "h22-torques-rejects.jsonl should have rows");
  });

  it("every reject row has invocation_record.image_path set", () => {
    for (const row of rejects) {
      assert.ok(
        row.invocation_record?.image_path,
        `Reject row missing invocation_record.image_path (invocation_id=${row.invocation_record?.invocation_id})`,
      );
    }
  });

  it("reject image_paths match expected format", () => {
    for (const row of rejects) {
      const inv = row.invocation_record;
      const manual = inv?.manual || "BB6";
      const page = inv?.page;
      if (!page) continue;
      const expected = expectedImagePath(manual, page);
      assert.strictEqual(
        inv.image_path,
        expected,
        `Reject ${inv.invocation_id}: expected ${expected}, got ${inv.image_path}`,
      );
    }
  });

  it("sample of reject image_paths resolve to existing WebP files", () => {
    // Sample 20 random rejects to keep test fast
    const indices = new Set();
    while (indices.size < Math.min(20, rejects.length)) {
      indices.add(Math.floor(Math.random() * rejects.length));
    }
    for (const i of indices) {
      const row = rejects[i];
      const inv = row.invocation_record;
      const exists = imageExists(inv.image_path);
      assert.ok(
        exists,
        `Reject[${i}] ${inv.image_path} should exist on disk`,
      );
    }
  });
});

describe("T-434: build-torque-db.mjs uses unpadded page numbers", () => {
  it("build script does NOT use padStart(4,'0') for image paths", () => {
    const buildScriptPath = join(ROOT, "scripts", "build-torque-db.mjs");
    const content = readFileSync(buildScriptPath, "utf8");
    assert.ok(
      !content.includes('padStart(4, "0")'),
      "build-torque-db.mjs should not use padStart(4,'0') for image paths — " +
        "actual WebP files are unpadded (p136.webp, not p0136.webp)",
    );
  });

  it("build script uses unpadded page number format", () => {
    const buildScriptPath = join(ROOT, "scripts", "build-torque-db.mjs");
    const content = readFileSync(buildScriptPath, "utf8");
    assert.ok(
      content.includes("p${p}.webp"),
      "build-torque-db.mjs should use unpadded p${p}.webp format",
    );
  });
});

describe("T-434: cross-check — all unique pages in JSONL resolve to WebP", () => {
  const torques = loadJsonl("h22-torques.jsonl");
  const disputed = loadJsonl("h22-torques-disputed.jsonl");
  const rejects = loadJsonl("h22-torques-rejects.jsonl");

  it("every unique (manual, page) tuple referenced by a data row has an existing WebP", () => {
    // Data rows = torque rows + disputed rows + reject invocation_records.
    // Note: DB pages table may include pages from chapter ranges that have no
    // actual data rows (e.g. OBD1 pages when only BB6 images exist). We only
    // verify pages that are actually referenced by JSONL data rows.
    const seen = new Set();
    const missing = [];

    for (const row of torques) {
      const key = `${row.source.manual}:${row.source.page}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!imageExists(row.source.image_path)) {
        missing.push(row.source.image_path);
      }
    }

    for (const row of disputed) {
      const key = `${row.source.manual}:${row.source.page}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!imageExists(row.source.image_path)) {
        missing.push(row.source.image_path);
      }
    }

    for (const row of rejects) {
      const inv = row.invocation_record;
      if (!inv?.page) continue;
      const key = `${inv.manual}:${inv.page}`;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!imageExists(inv.image_path)) {
        missing.push(inv.image_path);
      }
    }

    assert.strictEqual(
      missing.length,
      0,
      `Missing WebP files for ${missing.length} pages: ${missing.slice(0, 10).join(", ")}`,
    );
  });

  it("all BB6 data rows resolve (OBD1 images not yet curated)", () => {
    const bb6Rows = [
      ...torques.filter((r) => r.source?.manual === "BB6"),
      ...disputed.filter((r) => r.source?.manual === "BB6"),
      ...rejects.filter((r) => r.invocation_record?.manual === "BB6"),
    ];
    const seen = new Set();
    let missing = 0;
    for (const row of bb6Rows) {
      const inv = row.invocation_record || row.source;
      const key = inv.image_path;
      if (seen.has(key)) continue;
      seen.add(key);
      if (!imageExists(key)) missing++;
    }
    assert.strictEqual(
      missing,
      0,
      `All BB6 image_paths should resolve; ${missing} missing`,
    );
  });
});
