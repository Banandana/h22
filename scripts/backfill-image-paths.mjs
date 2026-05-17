#!/usr/bin/env node
// backfill-image-paths.mjs — Backfill source.image_path on every torque/disputed/reject row.
//
// Reads h22-torques.jsonl, h22-torques-disputed.jsonl, h22-torques-rejects.jsonl
// from research/raw-data/torque-specs/. Sets source.image_path (torques/disputed)
// or invocation_record.image_path (rejects) to images/<manual>/p<page>.webp.
//
// Also fixes the image_path format in build-torque-db.mjs pages table builder
// to use unpadded page numbers (matching what T-433 actually produced).
//
// Usage: node scripts/backfill-image-paths.mjs [--dry-run]

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DB_DIR = join(ROOT, "research", "raw-data", "torque-specs");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

// ── Helpers ────────────────────────────────────────────────────────────────

/** Build image path for a (manual, page) tuple. Uses unpadded page number
 *  to match the actual WebP files produced by T-433's curate-page-images.mjs. */
function imagePath(manual, page) {
  return `images/${manual.toLowerCase()}/p${page}.webp`;
}

/** Load JSONL (newline-delimited JSON). Returns array of objects. */
function loadJsonl(filename) {
  const resolved = join(DB_DIR, filename);
  if (!existsSync(resolved)) return [];
  const raw = readFileSync(resolved, "utf8").trim();
  if (!raw) return [];
  return raw.split("\n").map((l) => JSON.parse(l));
}

/** Save JSONL back to disk, compact format (one JSON object per line). */
function saveJsonl(filename, rows) {
  const resolved = join(DB_DIR, filename);
  writeFileSync(resolved, rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
}

// ── Load all sources ───────────────────────────────────────────────────────

const torques = loadJsonl("h22-torques.jsonl");
const disputed = loadJsonl("h22-torques-disputed.jsonl");
const rejects = loadJsonl("h22-torques-rejects.jsonl");

let totalBackfilled = 0;
let totalSkipped = 0;
let totalMissing = 0;
const missingPaths = [];

// ── Backfill torques ───────────────────────────────────────────────────────

for (const row of torques) {
  const manual = row.source?.manual || "BB6";
  const page = row.source?.page || 0;
  if (!page) {
    totalSkipped++;
    continue;
  }
  const expected = imagePath(manual, page);
  if (row.source.image_path === expected) {
    totalSkipped++; // already correct
    continue;
  }
  row.source.image_path = expected;
  totalBackfilled++;
}

// ── Backfill disputed ──────────────────────────────────────────────────────

for (const row of disputed) {
  const manual = row.source?.manual || "BB6";
  const page = row.source?.page || 0;
  if (!page) {
    totalSkipped++;
    continue;
  }
  const expected = imagePath(manual, page);
  if (row.source.image_path === expected) {
    totalSkipped++;
    continue;
  }
  row.source.image_path = expected;
  totalBackfilled++;
}

// ── Backfill rejects (image_path lives on invocation_record) ───────────────

for (const row of rejects) {
  const inv = row.invocation_record;
  if (!inv) continue;
  const manual = inv.manual || "BB6";
  const page = inv.page || 0;
  if (!page) {
    totalSkipped++;
    continue;
  }
  const expected = imagePath(manual, page);
  if (inv.image_path === expected) {
    totalSkipped++;
    continue;
  }
  inv.image_path = expected;
  totalBackfilled++;
}

// ── Write back ─────────────────────────────────────────────────────────────

if (!dryRun) {
  saveJsonl("h22-torques.jsonl", torques);
  saveJsonl("h22-torques-disputed.jsonl", disputed);
  saveJsonl("h22-torques-rejects.jsonl", rejects);
}

console.log(`Backfill complete:`);
console.log(`  Torques rows: ${torques.length}`);
console.log(`  Disputed rows: ${disputed.length}`);
console.log(`  Reject rows: ${rejects.length}`);
console.log(`  Backfilled: ${totalBackfilled}`);
console.log(`  Skipped (already set): ${totalSkipped}`);

// ── Verify: check that image paths resolve to existing files ───────────────

const baseDir = join(ROOT, "research", "raw-data", "torque-specs");
const allRows = [
  ...torques.map((r) => ({ manual: r.source?.manual, page: r.source?.page })),
  ...disputed.map((r) => ({ manual: r.source?.manual, page: r.source?.page })),
  ...rejects.map((r) => ({ manual: r.invocation_record?.manual, page: r.invocation_record?.page })).filter((r) => r.page),
];

// Deduplicate
const uniquePages = new Map();
for (const { manual, page } of allRows) {
  if (!page) continue;
  const key = `${manual}:${page}`;
  if (!uniquePages.has(key)) {
    uniquePages.set(key, { manual, page });
  }
}

let missingCount = 0;
for (const [, { manual, page }] of uniquePages) {
  const p = imagePath(manual, page);
  const fullPath = join(baseDir, p);
  if (!existsSync(fullPath)) {
    missingCount++;
    if (missingPaths.length < 20) {
      missingPaths.push(`${p} (manual=${manual}, page=${page})`);
    }
  }
}

console.log(`\nVerification:`);
console.log(`  Unique (manual,page) tuples: ${uniquePages.size}`);
console.log(`  Missing WebP files: ${missingCount}`);
if (missingPaths.length > 0) {
  console.log(`  First ${Math.min(missingPaths.length, 20)} missing:`);
  for (const mp of missingPaths.slice(0, 20)) {
    console.log(`    - ${mp}`);
  }
}

// ── Fix build-torque-db.mjs page image_path format ─────────────────────────

const buildScriptPath = join(ROOT, "scripts", "build-torque-db.mjs");
if (existsSync(buildScriptPath)) {
  let buildScript = readFileSync(buildScriptPath, "utf8");
  const oldLine = `image_path: \`images/\${ch.manual.toLowerCase()}/p\${String(p).padStart(4, "0")}.webp\`,`;
  const newLine = `image_path: \`images/\${ch.manual.toLowerCase()}/p\${p}.webp\`,`;
  if (buildScript.includes(oldLine)) {
    buildScript = buildScript.replace(oldLine, newLine);
    if (!dryRun) {
      writeFileSync(buildScriptPath, buildScript);
    }
    console.log(`\nFixed build-torque-db.mjs: changed padStart(4,"0") -> unpadded page number`);
  } else {
    console.log(`\nbuild-torque-db.mjs already has correct format (no change needed)`);
  }
}

process.exit(missingCount > 0 ? 1 : 0);
