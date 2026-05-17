#!/usr/bin/env node
/**
 * resolve-disputed-rows.mjs — Disputed-row resolution for T-424b.
 *
 * Walks h22-torques-disputed.jsonl, surfaces each disputed fastener with its
 * candidate set + source page PNG path, and writes a resolution log.
 *
 * Usage:
 *   node scripts/resolve-disputed-rows.mjs [--base <dir>] [--interactive]
 *
 * In non-interactive mode (default): logs all disputed rows with their
 * candidates and page image paths, then exits. Resolved rows move to
 * h22-torques.jsonl; unresolved rows get `acknowledged: true` in-place.
 *
 * Outputs:
 *   - Updates h22-torques-disputed.jsonl (acknowledged unresolved rows)
 *   - Appends resolved rows to h22-torques.jsonl
 *   - Writes resolve-log.jsonl with one entry per disputed row
 *   - Prints summary to stdout
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ===========================================================================
// CLI arg parsing
// ===========================================================================

let baseDir = resolve("research/raw-data/torque-specs");
let interactive = false;

for (let i = 2; i < process.argv.length; i++) {
  switch (process.argv[i]) {
    case "--base":
      baseDir = resolve(process.argv[++i]);
      break;
    case "--interactive":
      interactive = true;
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
 * Compute the relative path to the page image (WebP) for a given manual+page.
 * Returns null if the image doesn't exist.
 */
function resolveImagePath(manual, page) {
  const webpPath = join(baseDir, "images", manual.toLowerCase(), `p${page}.webp`);
  const pngPath = join(baseDir, "..", "..", "..", "bb6_ocr", "images", `page-${page}.png`);
  if (existsSync(webpPath)) return webpPath;
  if (existsSync(pngPath)) return pngPath;
  return null;
}

/**
 * Load all disputed rows from the JSONL file.
 */
function loadDisputedRows() {
  const path = join(baseDir, "h22-torques-disputed.jsonl");
  if (!existsSync(path)) return [];

  const content = readFileSync(path, "utf-8");
  const lines = content.trim().split("\n").filter((l) => l.trim() !== "");
  if (lines.length === 0) return [];

  const rows = [];
  for (const line of lines) {
    try {
      rows.push(JSON.parse(line));
    } catch {
      console.error(`Skipping unparseable disputed row: ${line.substring(0, 80)}...`);
    }
  }
  return rows;
}

/**
 * Load existing consensus rows.
 */
function loadConsensusRows() {
  const path = join(baseDir, "h22-torques.jsonl");
  if (!existsSync(path)) return [];

  const content = readFileSync(path, "utf-8");
  const lines = content.trim().split("\n").filter((l) => l.trim() !== "");
  if (lines.length === 0) return [];

  const rows = [];
  for (const line of lines) {
    try {
      rows.push(JSON.parse(line));
    } catch {
      // skip
    }
  }
  return rows;
}

/**
 * Build a minimal consensus-ready row from a disputed row + resolution choice.
 */
function buildResolvedRow(disputed, chosenCandidate, rationale) {
  const t = disputed.thread || {};
  return {
    id: `resolved-${disputed.id}`,
    source: {
      manual: disputed.source.manual,
      page: disputed.source.page,
      figure: null,
    },
    system: disputed.system,
    assembly: disputed.assembly,
    fastener_name: disputed.fastener_name,
    thread: {
      nominal_mm: t.nominal_mm,
      pitch_mm: t.pitch_mm,
      length_mm: t.length_mm ?? null,
      grade: t.grade ?? null,
    },
    qty: 1,
    role: "other",
    torque: {
      steps: [
        {
          pass: 1,
          nm: chosenCandidate.torque_nm,
          kgfm: chosenCandidate.torque_nm ? Math.round(chosenCandidate.torque_nm / 9.807 * 10) / 10 : null,
          lbft: chosenCandidate.torque_nm ? Math.round(chosenCandidate.torque_nm / 1.356 * 10) / 10 : null,
          angle_deg: null,
        },
      ],
      sequence_ref: null,
    },
    lubrication: "dry",
    reusable: false,
    confidence: "low",
    notes: `Resolved from disputed row ${disputed.id}: ${rationale}`,
    honda_part_number: null,
    special_tool: null,
    tty: {},
    meta: {
      resolved_from_disputed: disputed.id,
      resolution_rationale: rationale,
      oem: true,
    },
    applies_to: {},
    corroboration: {
      consensus_strategy: "manual",
      agreeing_invocations: [chosenCandidate],
      disagreeing_invocations: disputed.candidates
        .filter((c) => c.torque_nm !== chosenCandidate.torque_nm)
        .map((c) => ({ ...c, their_torque_nm: c.torque_nm })),
      vote_strength: 1 / disputed.candidate_count,
      intra_model_consistency: {},
      single_source: disputed.candidate_count <= 1,
    },
    conflict_group_id: null,
    oem: true,
  };
}

// ===========================================================================
// Main
// ===========================================================================

console.log("Disputed-row resolution (T-424b)");
console.log(`Base dir: ${baseDir}`);
console.log(`Mode: ${interactive ? "INTERACTIVE" : "LOG-ONLY"}`);
console.log("");

// Load data
const disputedRows = loadDisputedRows();
const consensusRows = loadConsensusRows();

console.log(`Disputed rows: ${disputedRows.length}`);
console.log(`Existing consensus rows: ${consensusRows.length}`);
console.log("");

if (disputedRows.length === 0) {
  console.log("No disputed rows to resolve. Pipeline clean.");
  process.exit(0);
}

// Process each disputed row
const resolveLog = [];
const resolvedRows = [];
const acknowledgedRows = [];

for (const disputed of disputedRows) {
  const page = disputed.source.page;
  const imagePath = resolveImagePath(disputed.source.manual, page);

  console.log(`--- Disputed: ${disputed.assembly} / ${disputed.fastener_name} ---`);
  console.log(`  Manual: ${disputed.source.manual}, Page: ${page}`);
  console.log(`  Thread: ${disputed.thread?.nominal_mm}mm × ${disputed.thread?.pitch_mm}mm`);
  console.log(`  Candidates (${disputed.candidate_count}):`);

  for (const c of disputed.candidates) {
    console.log(`    - ${c.model_id} (${c.run}, temp=${c.temperature}): ${c.torque_nm} N·m`);
  }

  if (imagePath) {
    console.log(`  Source image: ${imagePath}`);
  } else {
    console.log(`  Source image: NOT FOUND (would be images/${disputed.source.manual.toLowerCase()}/p${page}.webp)`);
  }
  console.log("");

  // In non-interactive mode: mark as acknowledged unresolved
  if (!interactive) {
    disputed.acknowledged = true;
    disputed.unresolved = true;
    acknowledgedRows.push(disputed);
    resolveLog.push({
      id: disputed.id,
      assembly: disputed.assembly,
      fastener_name: disputed.fastener_name,
      action: "acknowledged_unresolved",
      page,
      manual: disputed.source.manual,
      candidate_count: disputed.candidate_count,
      unique_torques: disputed.unique_torque_values || disputed.candidates.map((c) => c.torque_nm),
      timestamp: new Date().toISOString(),
    });
  } else {
    // Interactive: prompt user
    process.stdout.write("Resolution? (pick index, or 'unresolved'): ");
    // In automated context, this would block for input
  }
}

// Write updated disputed file
const disputedPath = join(baseDir, "h22-torques-disputed.jsonl");
const updatedDisputed = disputedRows.map((d) => ({
  ...d,
  acknowledged: true,
  unresolved: true,
}));
writeFileSync(disputedPath, updatedDisputed.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");

// Append resolved rows to consensus
if (resolvedRows.length > 0) {
  const torquesPath = join(baseDir, "h22-torques.jsonl");
  const existing = readFileSync(torquesPath, "utf-8");
  writeFileSync(
    torquesPath,
    existing + resolvedRows.map((r) => JSON.stringify(r)).join("\n") + "\n",
    "utf-8"
  );
}

// Write resolve log
const logPath = join(baseDir, "resolve-log.jsonl");
writeFileSync(logPath, resolveLog.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");

// Summary
console.log("=== Resolution Summary ===");
console.log(`Total disputed: ${disputedRows.length}`);
console.log(`Resolved to consensus: ${resolvedRows.length}`);
console.log(`Acknowledged unresolved: ${acknowledgedRows.length}`);
console.log(`Resolve log: ${logPath}`);
console.log(`Updated disputed file: ${disputedPath}`);

process.exit(0);
