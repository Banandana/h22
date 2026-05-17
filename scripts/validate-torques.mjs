#!/usr/bin/env node
/**
 * validate-torques.mjs — Walk per-invocation response records, run final schema
 * validation on every response_parsed array, and emit two intermediate JSONL files:
 *
 *   h22-torques-flat.jsonl     — one row per (invocation × fastener), enriched with invocation_id
 *   h22-torques-rejects.jsonl  — invocations whose response_parsed failed validation
 *
 * Also prints summary stats to stdout.
 *
 * Usage:
 *   node scripts/validate-torques.mjs [--base <dir>] [--dry-run]
 *
 * Default base dir is research/raw-data/torque-specs/.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { strict as assert } from "node:assert";
import {
  validateInvocationRecord,
  validateCanonicalRow,
  validateRejectRecord,
  validateSummaryStats,
} from "../research/raw-data/torque-specs/schema-validator.mjs";

// ===========================================================================
// CLI arg parsing
// ===========================================================================

let baseDir = resolve("research/raw-data/torque-specs");
let dryRun = false;

for (let i = 2; i < process.argv.length; i++) {
  switch (process.argv[i]) {
    case "--base":
      baseDir = resolve(process.argv[++i]);
      break;
    case "--dry-run":
      dryRun = true;
      break;
    default:
      console.error(`Unknown argument: ${process.argv[i]}`);
      process.exit(1);
  }
}

// ===========================================================================
// Helpers
// ===========================================================================

/**
 * Collect all .json files under a directory, recursively.
 * @param {string} dir
 * @returns {string[]}
 */
function collectJsonFiles(dir) {
  const results = [];
  function walk(d) {
    const entries = readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(d, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && entry.name.endsWith(".json")) {
        results.push(full);
      }
    }
  }
  walk(dir);
  return results.sort();
}

/**
 * Compute a stable hash string for a flat row (id + assembly + fastener_name + thread).
 * Used for dedup detection within a single invocation.
 * @param {object} row
 * @returns {string}
 */
function rowKey(row) {
  const t = row.thread || {};
  return `${row.id}|${row.assembly}|${row.fastener_name}|${t.nominal_mm}|${t.pitch_mm}`;
}

// ===========================================================================
// Main
// ===========================================================================

console.log(`Validation pipeline — base: ${baseDir}`);
console.log(`Manual mode: ${dryRun ? "DRY RUN (no writes)" : "WRITE"}`);

// Collect all invocation records
const bb6Dir = join(baseDir, "responses", "bb6");
const obd1Dir = join(baseDir, "responses", "obd1");

const bb6Files = statSync(bb6Dir).isDirectory() ? collectJsonFiles(bb6Dir) : [];
const obd1Files = statSync(obd1Dir).isDirectory() ? collectJsonFiles(obd1Dir) : [];
const allFiles = [...bb6Files, ...obd1Files].sort();

console.log(`Found ${allFiles.length} invocation record files (${bb6Files.length} BB6 + ${obd1Files.length} OBD1)`);

// Accumulators
const flatRows = [];
const rejectRecords = [];
let totalInvocations = 0;
let validInvocations = 0;       // invocations that produced at least one flat row
let emptyInvocations = 0;      // invocations with empty/null response_parsed
let nonConformantInvocations = 0; // invocations with parsed rows that failed schema validation
let perModelRowCount = {};
let confidenceDistribution = { high: 0, medium: 0, low: 0, unknown: 0 };

for (const filePath of allFiles) {
  let raw;
  try {
    raw = readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error(`  SKIP ${filePath}: ${err.message}`);
    continue;
  }

  let record;
  try {
    record = JSON.parse(raw);
  } catch (err) {
    // Not valid JSON at all — skip silently (could be a non-invocation file)
    continue;
  }

  totalInvocations++;

  // Validate the invocation record itself
  const invValidation = validateInvocationRecord(record);
  if (!invValidation.success) {
    // Invocation record doesn't conform — treat as reject
    const rejectRec = {
      invocation_record: record,
      validation_errors: [`Invocation record: ${invValidation.error}`],
      rejected_rows: [],
    };
    rejectRecords.push(rejectRec);
    continue;
  }

  const parsed = record.response_parsed;

  // Empty or null response_parsed — not a reject, just no data
  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    emptyInvocations++;
    continue;
  }

  // Validate each parsed row
  const modelId = record.model_id || "unknown";
  if (!perModelRowCount[modelId]) perModelRowCount[modelId] = 0;

  let rowsFromThisInvocation = 0;
  let rejectedRows = [];

  for (let i = 0; i < parsed.length; i++) {
    const rowResult = validateCanonicalRow(parsed[i]);
    if (rowResult.success) {
      const flatRow = /** @type {Record<string, unknown>} */ (rowResult.data);
      flatRow.invocation_id = record.invocation_id;

      // Dedup within this invocation: same row_key only kept once
      const key = rowKey(flatRow);
      const dupIndex = flatRows.findIndex((r) => r._dedup_key === key && r._dedup_invocation === record.invocation_id);
      if (dupIndex >= 0) {
        // Duplicate within same invocation — skip
        continue;
      }
      flatRow._dedup_key = key;
      flatRow._dedup_invocation = record.invocation_id;

      flatRows.push(flatRow);
      perModelRowCount[modelId]++;
      rowsFromThisInvocation++;

      // Confidence distribution
      const conf = flatRow.confidence || "unknown";
      if (confidenceDistribution[conf] !== undefined) {
        confidenceDistribution[conf]++;
      } else {
        confidenceDistribution.unknown++;
      }
    } else {
      rejectedRows.push({ index: i, errors: [rowResult.error] });
    }
  }

  if (rowsFromThisInvocation > 0) {
    validInvocations++;
  } else if (rejectedRows.length > 0) {
    nonConformantInvocations++;
  }

  if (rejectedRows.length > 0) {
    const rejectRec = {
      invocation_record: record,
      validation_errors: rejectedRows.flatMap((r) => r.errors),
      rejected_rows: rejectedRows,
    };
    rejectRecords.push(rejectRec);
  }
}

// Build summary stats
const summaryStats = {
  total_invocations: totalInvocations,
  total_flat_rows: flatRows.length,
  total_rejects: rejectRecords.length,
  per_model_row_count: perModelRowCount,
  confidence_distribution: confidenceDistribution,
};

const statsValidation = validateSummaryStats(summaryStats);
if (!statsValidation.success) {
  console.error(`WARNING: Summary stats failed validation: ${statsValidation.error}`);
}

// Print summary
console.log("\n=== Summary ===");
console.log(`Total invocation records scanned: ${totalInvocations}`);
console.log(`Valid invocations (with parsed rows → flat): ${validInvocations}`);
console.log(`Non-conformant invocations (parsed but failed schema): ${nonConformantInvocations}`);
console.log(`Empty/null response_parsed: ${emptyInvocations}`);
console.log(`Flat rows emitted: ${flatRows.length}`);
console.log(`Reject records: ${rejectRecords.length}`);
console.log(`Per-model row counts:`);
for (const [model, count] of Object.entries(perModelRowCount).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${model}: ${count}`);
}
console.log(`Confidence distribution:`);
for (const [level, count] of Object.entries(confidenceDistribution).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${level}: ${count}`);
}

// Deduplicate flat rows across invocations (same row_key, keep first seen)
const seenKeys = new Set();
const dedupedFlatRows = [];
const crossInvocationDups = [];
for (const row of flatRows) {
  const key = row._dedup_key;
  if (seenKeys.has(key)) {
    crossInvocationDups.push({ key, invocation_id: row.invocation_id });
  } else {
    seenKeys.add(key);
    // Strip internal dedup fields before writing
    const { _dedup_key, _dedup_invocation, ...cleanRow } = row;
    dedupedFlatRows.push(cleanRow);
  }
}

if (crossInvocationDups.length > 0) {
  console.log(`\nCross-invocation duplicates removed: ${crossInvocationDups.length}`);
}

// Write outputs
if (!dryRun) {
  const flatPath = join(baseDir, "h22-torques-flat.jsonl");
  const rejectsPath = join(baseDir, "h22-torques-rejects.jsonl");

  writeFileSync(flatPath, dedupedFlatRows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");
  writeFileSync(rejectsPath, rejectRecords.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");

  console.log(`\nWrote ${dedupedFlatRows.length} flat rows to ${flatPath}`);
  console.log(`Wrote ${rejectRecords.length} reject records to ${rejectsPath}`);
} else {
  console.log(`\nDRY RUN — would write ${dedupedFlatRows.length} flat rows and ${rejectRecords.length} rejects`);
}

// Exit code: non-zero if any rejects were found (signals downstream tasks to inspect)
if (rejectRecords.length > 0) {
  console.log(`\nNOTE: ${rejectRecords.length} reject records found. Inspect h22-torques-rejects.jsonl for details.`);
}

process.exit(0);
