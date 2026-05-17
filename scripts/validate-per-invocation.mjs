#!/usr/bin/env node
/**
 * Validate per-invocation response records and emit intermediate files.
 *
 * Walks responses/{bb6,obd1}/<page>/*.json, runs final schema validation on
 * every response_parsed array, and emits:
 *   - h22-torques-flat.jsonl — one row per (invocation × fastener) with
 *     invocation_id provenance
 *   - h22-torques-rejects.jsonl — invocation records whose response_parsed
 *     failed validation
 *
 * Also computes summary stats printed to stdout.
 *
 * Usage:
 *   node scripts/validate-per-invocation.mjs [--base <path>]
 *
 * Default base path: research/raw-data/torque-specs/
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import {
  validateInvocationRecord,
  validateInvocationParsedRows,
} from "../research/raw-data/torque-specs/schema-validator.mjs";

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { base: null };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--base" && i + 1 < argv.length) {
      args.base = argv[++i];
    }
  }
  return args;
}

// ---------------------------------------------------------------------------
// Core logic
// ---------------------------------------------------------------------------

/**
 * Recursively find all .json files under a directory.
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
async function findJsonFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...(await findJsonFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Process a single invocation record file.
 * Returns { flatRows, rejects, invocationId }.
 *
 * @param {string} filePath
 * @returns {Promise<{ flatRows: Array<object>, rejects: Array<object>, invocationId: string, ok: boolean }>}
 */
async function processInvocationFile(filePath) {
  const raw = await readFile(filePath, "utf-8");
  let record;
  try {
    record = JSON.parse(raw);
  } catch {
    // Not valid JSON — skip silently (could be a partial write)
    return { flatRows: [], rejects: [], invocationId: "unknown", ok: false };
  }

  // Validate the per-invocation record itself
  const invResult = validateInvocationRecord(record);
  if (!invResult.success) {
    // The entire invocation record fails schema validation
    return {
      flatRows: [],
      rejects: [
        {
          invocation_record: record,
          validation_errors: [invResult.error],
          rejected_rows: [],
        },
      ],
      invocationId: record.invocation_id || "unknown",
      ok: false,
    };
  }

  // Validate each parsed row within the invocation
  const { flatRows, rejects } = validateInvocationParsedRows(invResult.data);

  return {
    flatRows,
    rejects,
    invocationId: record.invocation_id,
    ok: true,
  };
}

/**
 * Main validation pipeline.
 *
 * @param {string} baseDir - Base directory containing responses/
 * @returns {Promise<{ flatRows: Array<object>, rejects: Array<object>, stats: object }>}
 */
async function validateAll(baseDir) {
  const responsesDir = join(baseDir, "responses");

  if (!(await fileExists(responsesDir))) {
    console.error(`No responses directory found at ${responsesDir}`);
    return {
      flatRows: [],
      rejects: [],
      stats: buildEmptyStats(),
    };
  }

  // Find all invocation record files
  const jsonFiles = await findJsonFiles(responsesDir);

  if (jsonFiles.length === 0) {
    console.log("No invocation records found. Emitting empty output files.");
    return {
      flatRows: [],
      rejects: [],
      stats: buildEmptyStats(),
    };
  }

  console.log(`Found ${jsonFiles.length} invocation record(s).`);

  const allFlatRows = [];
  const allRejects = [];
  let totalInvocations = 0;
  let validInvocations = 0;
  let failedInvocations = 0;

  // Per-model tracking
  const perModelRowCount = {};
  const confidenceDist = { high: 0, medium: 0, low: 0, unknown: 0 };

  for (const filePath of jsonFiles) {
    const result = await processInvocationFile(filePath);
    totalInvocations++;

    if (!result.ok) {
      failedInvocations++;
      allRejects.push(...result.rejects);
      continue;
    }

    validInvocations++;

    // Track per-model counts
    for (const row of result.flatRows) {
      allFlatRows.push(row);
      const modelId = row.invocation_id.split(".")[0] || "unknown";
      perModelRowCount[modelId] = (perModelRowCount[modelId] || 0) + 1;

      // Track confidence distribution
      const conf = row.confidence || "unknown";
      if (conf in confidenceDist) {
        confidenceDist[conf]++;
      } else {
        confidenceDist.unknown++;
      }
    }

    // If this invocation had rejects, add them too
    if (result.rejects.length > 0) {
      allRejects.push(...result.rejects);
    }
  }

  const stats = {
    total_invocations: totalInvocations,
    valid_invocations: validInvocations,
    failed_invocations: failedInvocations,
    total_flat_rows: allFlatRows.length,
    total_rejects: allRejects.length,
    per_model_row_count: perModelRowCount,
    confidence_distribution: confidenceDist,
  };

  return { flatRows: allFlatRows, rejects: allRejects, stats };
}

/**
 * Build empty stats object when no data exists.
 */
function buildEmptyStats() {
  return {
    total_invocations: 0,
    valid_invocations: 0,
    failed_invocations: 0,
    total_flat_rows: 0,
    total_rejects: 0,
    per_model_row_count: {},
    confidence_distribution: { high: 0, medium: 0, low: 0, unknown: 0 },
  };
}

/**
 * Check if a path exists as a file or directory.
 * @param {string} path
 * @returns {Promise<boolean>}
 */
async function fileExists(path) {
  try {
    await readFile(path);
    return true;
  } catch {
    try {
      const stat = await import("node:fs").then((m) => m.promises.stat(path));
      return stat.isDirectory() || stat.isFile();
    } catch {
      return false;
    }
  }
}

/**
 * Write JSONL content to a file.
 * @param {string} filePath
 * @param {Array<object>} rows
 */
async function writeJsonl(filePath, rows) {
  const lines = rows.map((row) => JSON.stringify(row));
  await writeFile(filePath, lines.join("\n") + (lines.length > 0 ? "\n" : ""), "utf-8");
}

/**
 * Print summary stats to stdout.
 * @param {object} stats
 */
function printStats(stats) {
  console.log("");
  console.log("=== Validation Summary ===");
  console.log(`Total invocations scanned: ${stats.total_invocations}`);
  console.log(`Valid invocations:         ${stats.valid_invocations}`);
  console.log(`Failed invocations:        ${stats.failed_invocations}`);
  console.log(`Total flat rows emitted:   ${stats.total_flat_rows}`);
  console.log(`Total rejects:             ${stats.total_rejects}`);
  console.log("");
  console.log("Per-model row counts:");
  for (const [model, count] of Object.entries(stats.per_model_row_count)) {
    console.log(`  ${model}: ${count}`);
  }
  console.log("");
  console.log("Confidence distribution:");
  console.log(`  high:    ${stats.confidence_distribution.high}`);
  console.log(`  medium:  ${stats.confidence_distribution.medium}`);
  console.log(`  low:     ${stats.confidence_distribution.low}`);
  console.log(`  unknown: ${stats.confidence_distribution.unknown}`);
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  const baseDir = args.base || resolve(process.cwd(), "research/raw-data/torque-specs");

  console.log(`Validation base directory: ${baseDir}`);
  console.log("");

  const { flatRows, rejects, stats } = await validateAll(baseDir);

  // Write output files
  const flatPath = join(baseDir, "h22-torques-flat.jsonl");
  const rejectsPath = join(baseDir, "h22-torques-rejects.jsonl");

  await writeJsonl(flatPath, flatRows);
  await writeJsonl(rejectsPath, rejects);

  console.log(`Wrote ${flatRows.length} flat row(s) to ${flatPath}`);
  console.log(`Wrote ${rejects.length} reject(s) to ${rejectsPath}`);

  printStats(stats);

  // Exit non-zero if there are rejects (indicates data quality issues)
  if (stats.total_rejects > 0) {
    console.log("");
    console.warn("WARNING: Some invocation records failed validation. Check rejects file.");
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  console.error(err.stack);
  process.exit(1);
});
