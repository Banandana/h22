#!/usr/bin/env node
/**
 * dedup-torques.mjs — Cross-page dedup + conflict-merge.
 *
 * Groups consensus rows by (assembly, fastener_name, thread.nominal_mm,
 * thread.pitch_mm) ACROSS pages. Within each group:
 *   - If torques agree → merge to one row with `sources` listing every page
 *     citation and widened `applies_to`.
 *   - If torques disagree → keep all rows, assign shared `conflict_group_id`,
 *     do NOT average.
 *
 * This is separate from the corroboration block (per-page model agreement).
 * Both fields coexist independently on each row.
 *
 * Output: rewrites h22-torques.jsonl in-place; archives previous version as
 * h22-torques.jsonl.preconflict.
 *
 * Usage:
 *   node scripts/dedup-torques.mjs [--base <dir>] [--dry-run]
 */

import { readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { strict as assert } from "node:assert";

const __dirname = dirname(fileURLToPath(import.meta.url));

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
 * Compute the stable grouping key for a fastener row.
 */
function groupKey(row) {
  const t = row.thread || {};
  return `${row.assembly}|${row.fastener_name}|${t.nominal_mm ?? "null"}|${t.pitch_mm ?? "null"}`;
}

/**
 * Extract the first-pass torque nm value from a canonical row.
 * Returns null if not available or invalid.
 */
function getTorqueNm(row) {
  try {
    const steps = row.torque?.steps;
    if (!Array.isArray(steps) || steps.length === 0) return null;
    const first = steps[0];
    const nm = first?.nm;
    if (nm === null || nm === undefined || typeof nm !== "number" || nm <= 0) return null;
    return nm;
  } catch {
    return null;
  }
}

/**
 * Compute the mean torque center of a cluster.
 */
function clusterCenter(cluster) {
  const sum = cluster.reduce((acc, c) => acc + c.nm, 0);
  return sum / cluster.length;
}

/**
 * Check if two torque values are within tolerance.
 * Tolerance: max(2 N·m, 5% of the larger value).
 */
function torquesAgree(a, b) {
  if (a === null || b === null) return false;
  const center = Math.max(a, b);
  const tol = Math.max(2, center * 0.05);
  return Math.abs(a - b) <= tol;
}

/**
 * Deep-merge applies_to objects, widening where conflicts exist.
 */
function widenAppliesTo(a, b) {
  const result = { ...a };

  // trans: widen to "both" if different
  if (a.trans && b.trans && a.trans !== b.trans) {
    result.trans = "both";
  } else if (b.trans && !a.trans) {
    result.trans = b.trans;
  }

  // trim: widen to "all" if different specific trims
  if (a.trim && b.trim && a.trim !== b.trim) {
    result.trim = "all";
  } else if (b.trim && !a.trim) {
    result.trim = b.trim;
  }

  // my: widen to range string if different
  if (a.my && b.my && a.my !== b.my) {
    result.my = `${a.my}-${b.my}`;
  } else if (b.my && !a.my) {
    result.my = b.my;
  }

  // engine_codes: union arrays
  const codesA = Array.isArray(a.engine_codes) ? a.engine_codes : [];
  const codesB = Array.isArray(b.engine_codes) ? b.engine_codes : [];
  result.engine_codes = [...new Set([...codesA, ...codesB])];

  return result;
}

/**
 * Merge sources arrays, deduplicating (manual, page) tuples.
 */
function mergeSources(sourcesA, sourcesB) {
  const map = new Map();
  for (const s of sourcesA) {
    map.set(`${s.manual}:${s.page}`, s);
  }
  for (const s of sourcesB) {
    const key = `${s.manual}:${s.page}`;
    if (!map.has(key)) {
      map.set(key, s);
    }
  }
  return [...map.values()];
}

/**
 * Generate a stable conflict_group_id from the group key.
 */
function conflictGroupId(key) {
  // Simple hash-like encoding: replace | with - for readability
  return `conflict-${key.replace(/\|/g, "-")}`;
}

// ===========================================================================
// Main
// ===========================================================================

const torquesPath = join(baseDir, "h22-torques.jsonl");

if (!existsSync(torquesPath)) {
  console.error(`Error: ${torquesPath} not found.`);
  process.exit(1);
}

// Read existing consensus rows
const raw = readFileSync(torquesPath, "utf-8").trim();
if (!raw) {
  console.log("Empty input — nothing to dedup.");
  process.exit(0);
}

const rows = raw.split("\n").map((line) => JSON.parse(line));
console.log(`Loaded ${rows.length} consensus rows from ${torquesPath}`);

// Group by composite key
const groups = {};
for (const row of rows) {
  const key = groupKey(row);
  if (!groups[key]) groups[key] = [];
  groups[key].push(row);
}

console.log(`Found ${Object.keys(groups).length} unique fastener groups`);

// Process each group
const mergedRows = [];
let mergedCount = 0;
let conflictCount = 0;
let singlePageCount = 0;

for (const [key, groupRows] of Object.entries(groups)) {
  // Collect sources from all rows
  const allSources = groupRows.flatMap((r) => {
    const src = r.source;
    return src ? [{ manual: src.manual, page: src.page }] : [];
  });

  // Deduplicate sources
  const sources = (() => {
    const map = new Map();
    for (const s of allSources) {
      map.set(`${s.manual}:${s.page}`, s);
    }
    return [...map.values()];
  })();

  // Check torque agreement across rows
  const torqueValues = groupRows.map(getTorqueNm).filter((v) => v !== null);
  const hasDisagreement = torqueValues.length >= 2 && !torqueValues.every((v) => torquesAgree(v, torqueValues[0]));

  if (groupRows.length === 1) {
    // Single-page row: just add sources, no merge needed
    singlePageCount++;
    const row = JSON.parse(JSON.stringify(groupRows[0]));
    row.sources = sources;
    if (row.conflict_group_id === undefined || row.conflict_group_id === null) {
      row.conflict_group_id = null;
    }
    mergedRows.push(row);
  } else if (!hasDisagreement) {
    // All agree: merge to one row
    mergedCount++;
    const merged = JSON.parse(JSON.stringify(groupRows[0]));

    // Add sources
    merged.sources = sources;

    // Widen applies_to
    let applied = merged.applies_to || {};
    for (let i = 1; i < groupRows.length; i++) {
      applied = widenAppliesTo(applied, groupRows[i].applies_to || {});
    }
    merged.applies_to = applied;

    // conflict_group_id stays null (agreement)
    merged.conflict_group_id = null;

    // Keep the corroboration from the first row (it's per-page, not cross-page)
    mergedRows.push(merged);
  } else {
    // Disagreement: keep all rows, assign shared conflict_group_id
    conflictCount++;
    const cgId = conflictGroupId(key);

    for (const row of groupRows) {
      const mergedRow = JSON.parse(JSON.stringify(row));
      mergedRow.sources = sources;
      mergedRow.conflict_group_id = cgId;
      mergedRows.push(mergedRow);
    }
  }
}

// Summary
console.log(`\n=== Dedup Summary ===`);
console.log(`Groups processed: ${Object.keys(groups).length}`);
console.log(`Merged (agreeing multi-page): ${mergedCount}`);
console.log(`Conflicts (disagreeing multi-page): ${conflictCount}`);
console.log(`Single-page (no merge needed): ${singlePageCount}`);
console.log(`Output rows: ${mergedRows.length}`);

// Print conflict details
if (conflictCount > 0) {
  console.log(`\nConflict groups:`);
  for (const [key, groupRows] of Object.entries(groups)) {
    const torqueValues = groupRows.map(getTorqueNm).filter((v) => v !== null);
    if (torqueValues.length >= 2 && !torqueValues.every((v) => torquesAgree(v, torqueValues[0]))) {
      console.log(`  ${conflictGroupId(key)}: ${groupRows.length} rows, torques: ${torqueValues.join(", ")}`);
    }
  }
}

if (!dryRun) {
  // Archive current file
  const archivePath = torquesPath + ".preconflict";
  copyFileSync(torquesPath, archivePath);
  console.log(`\nArchived previous version to ${archivePath}`);

  // Write merged output
  writeFileSync(torquesPath, mergedRows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");
  console.log(`Wrote ${mergedRows.length} rows to ${torquesPath}`);
} else {
  console.log(`\nDRY RUN — would write ${mergedRows.length} rows, archive to ${torquesPath}.preconflict`);
}

process.exit(0);
