#!/usr/bin/env node
/**
 * consensus-torques.mjs — Multi-model corroboration / consensus pass.
 *
 * Reads per-invocation response records from responses/{bb6,obd1}/<page>/*.json,
 * groups flat rows by (assembly, fastener_name, thread.nominal_mm, thread.pitch_mm)
 * per page, clusters by torque value within tolerance, picks majority cluster,
 * and emits:
 *
 *   h22-torques.jsonl            — consensus rows with full corroboration block
 *   h22-torques-disputed.jsonl   — fastener groups with no majority
 *   consensus-report.md          — per-page summary statistics
 *
 * Consensus algorithm (per page):
 *   1. Collect all valid parsed rows from all invocations for the page.
 *   2. Group by (assembly, fastener_name, thread.nominal_mm, thread.pitch_mm).
 *   3. Within each group, cluster rows by torque.nm (first step) within
 *      max(2 N·m, 5%) tolerance.
 *   4. Majority cluster wins → emit one consensus row.
 *   5. Tie / no majority → emit to disputed.
 *   6. Single-source (only one invocation produced this fastener) → emit with
 *      single_source: true, vote_strength: 1.0.
 *   7. Vote strength = count(agreeing) / count(total_invocations_for_page).
 *
 * Usage:
 *   node scripts/consensus-torques.mjs [--base <dir>] [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { strict as assert } from "node:assert";
import {
  validateCanonicalRow,
  validateInvocationRecord,
} from "../research/raw-data/torque-specs/schema-validator.mjs";

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
 * Collect all .json files under a directory, recursively.
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
 * Compute a stable grouping key for a fastener row.
 */
function groupKey(row) {
  const t = row.thread || {};
  return `${row.assembly}|${row.fastener_name}|${t.nominal_mm ?? "null"}|${t.pitch_mm ?? "null"}`;
}

/**
 * Cluster rows by torque value within tolerance.
 * Tolerance: max(2 N·m, 5% of the cluster center).
 * Returns array of clusters, each with {center_nm, rows, count}.
 */
function clusterByTorque(rows) {
  // First pass: collect all torque values
  const torques = rows.map((r) => ({ row: r, nm: getTorqueNm(r) })).filter((x) => x.nm !== null);

  if (torques.length === 0) return [];

  // Sort by torque value
  torques.sort((a, b) => a.nm - b.nm);

  // Greedy clustering: merge into bins where distance < tolerance
  const clusters = [];
  let currentCluster = [torques[0]];

  for (let i = 1; i < torques.length; i++) {
    const center = clusterCenter(currentCluster);
    const tol = Math.max(2, center * 0.05);
    if (Math.abs(torques[i].nm - center) <= tol) {
      currentCluster.push(torques[i]);
    } else {
      clusters.push({
        center_nm: clusterCenter(currentCluster),
        rows: currentCluster.map((c) => c.row),
        torques: currentCluster.map((c) => c.nm),
        count: currentCluster.length,
      });
      currentCluster = [torques[i]];
    }
  }

  // Push last cluster
  clusters.push({
    center_nm: clusterCenter(currentCluster),
    rows: currentCluster.map((c) => c.row),
    torques: currentCluster.map((c) => c.nm),
    count: currentCluster.length,
  });

  return clusters;
}

/**
 * Compute the mean torque center of a cluster.
 */
function clusterCenter(cluster) {
  const sum = cluster.reduce((acc, c) => acc + c.nm, 0);
  return sum / cluster.length;
}

/**
 * Build the corroboration block for a consensus row.
 */
function buildCorroboration(
  winningCluster,
  allRowsInGroup,
  totalInvocationsForPage,
  modelRunsMap
) {
  const agreeingPaths = winningCluster.rows.map((r) => {
    // Find the invocation_id from the row (we'll enrich it below)
    return { row: r };
  });

  const disagreeingPaths = allRowsInGroup.filter((r) => !winningCluster.rows.includes(r)).map((r) => ({
    row: r,
  }));

  // Count unique models in agreeing vs disagreeing
  const agreeingModels = new Set(agreeingPaths.map((a) => a.row._model_id).filter(Boolean));
  const disagreeingModels = new Set(disagreeingPaths.map((d) => d.row._model_id).filter(Boolean));

  // Determine consensus strategy
  let strategy = "single-source";
  if (totalInvocationsForPage > 1) {
    if (agreeingPaths.length === allRowsInGroup.length) {
      strategy = "unanimous";
    } else {
      strategy = "majority-vote-torque-nm";
    }
  }

  // Vote strength
  const voteStrength = totalInvocationsForPage > 0
    ? Math.round((agreeingPaths.length / allRowsInGroup.length) * 1000) / 1000
    : 1.0;

  // Intra-model consistency
  const intraModelConsistency = {};
  for (const [modelId, runs] of Object.entries(modelRunsMap)) {
    if (runs.length > 1) {
      const agreeingFromThisModel = runs.filter((r) => winningCluster.rows.includes(r)).length;
      intraModelConsistency[modelId] = Math.round((agreeingFromThisModel / runs.length) * 1000) / 1000;
    } else {
      intraModelConsistency[modelId] = null;
    }
  }

  const singleSource = totalInvocationsForPage <= 1;

  return {
    consensus_strategy: strategy,
    agreeing_invocations: agreeingPaths.map((a) => ({
      model_id: a.row._model_id,
      run: a.row._run,
      temperature: a.row._temperature,
      response_path: a.row._response_path,
    })),
    disagreeing_invocations: disagreeingPaths.map((d) => ({
      model_id: d.row._model_id,
      run: d.row._run,
      temperature: d.row._temperature,
      response_path: d.row._response_path,
      their_torque_nm: getTorqueNm(d.row),
    })),
    vote_strength: voteStrength,
    intra_model_consistency: intraModelConsistency,
    single_source: singleSource,
  };
}

// ===========================================================================
// Main
// ===========================================================================

console.log(`Consensus pass — base: ${baseDir}`);
console.log(`Mode: ${dryRun ? "DRY RUN (no writes)" : "WRITE"}`);

// Collect all invocation records
const bb6Dir = join(baseDir, "responses", "bb6");
const obd1Dir = join(baseDir, "responses", "obd1");

const bb6Files = statSync(bb6Dir).isDirectory() ? collectJsonFiles(bb6Dir) : [];
const obd1Files = statSync(obd1Dir).isDirectory() ? collectJsonFiles(obd1Dir) : [];
const allFiles = [...bb6Files, ...obd1Files].sort();

console.log(`Found ${allFiles.length} invocation record files (${bb6Files.length} BB6 + ${obd1Files.length} OBD1)`);

// Phase 1: Load all valid parsed rows, organized by page
// Structure: pages[manual][page] = [{ row, invocation_id, model_id, run, temperature, response_path }]
const pages = {};
let totalInvocations = 0;
let validInvocations = 0;
let emptyInvocations = 0;
let parseErrorInvocations = 0;
let schemaFailInvocations = 0;

for (const filePath of allFiles) {
  let raw;
  try {
    raw = readFileSync(filePath, "utf-8");
  } catch {
    continue;
  }

  let record;
  try {
    record = JSON.parse(raw);
  } catch {
    continue;
  }

  totalInvocations++;

  // Validate invocation record
  const invValidation = validateInvocationRecord(record);
  if (!invValidation.success) {
    continue;
  }

  const parsed = record.response_parsed;

  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    emptyInvocations++;
    continue;
  }

  if (record.parse_error) {
    parseErrorInvocations++;
  }

  // Validate each parsed row
  const manual = record.manual;
  const page = record.page;
  const modelId = record.model_id || "unknown";
  const run = record.run || "r1";
  const temperature = record.temperature || 0;
  const responsePath = filePath.replace(baseDir + "/", "");

  if (!pages[manual]) pages[manual] = {};
  if (!pages[manual][page]) pages[manual][page] = [];

  let hasValidRow = false;
  for (const row of parsed) {
    const rowResult = validateCanonicalRow(row);
    if (rowResult.success) {
      const enrichedRow = {
        ...rowResult.data,
        _invocation_id: record.invocation_id,
        _model_id: modelId,
        _run: run,
        _temperature: temperature,
        _response_path: responsePath,
      };
      pages[manual][page].push(enrichedRow);
      hasValidRow = true;
    } else {
      schemaFailInvocations++;
    }
  }

  if (hasValidRow) {
    validInvocations++;
  }
}

console.log(`\n=== Phase 1 Summary ===`);
console.log(`Total invocation records scanned: ${totalInvocations}`);
console.log(`Valid invocations (with parsed rows → flat): ${validInvocations}`);
console.log(`Empty/null response_parsed: ${emptyInvocations}`);
console.log(`Parse errors: ${parseErrorInvocations}`);
console.log(`Schema failures: ${schemaFailInvocations}`);

// Count total pages
let totalPages = 0;
for (const manual of Object.keys(pages)) {
  totalPages += Object.keys(pages[manual]).length;
}
console.log(`Total pages with data: ${totalPages}`);

// Phase 2: Consensus pass per page
const consensusRows = [];
const disputedRows = [];
const pageStats = {}; // page -> { total_groups, consensus_count, disputed_count, single_source_count }

for (const [manual, pageMap] of Object.entries(pages)) {
  for (const [pageStr, rows] of Object.entries(pageMap)) {
    const page = parseInt(pageStr, 10);
    const pageKey = `${manual}-${page}`;

    // Count unique invocations for this page
    const uniqueInvocations = new Set(rows.map((r) => r._invocation_id));
    const totalInvocationsForPage = uniqueInvocations.size;

    // Count unique models for this page (for vote strength denominator)
    const uniqueModels = new Set(rows.map((r) => r._model_id));

    // Group by (assembly, fastener_name, thread.nominal_mm, thread.pitch_mm)
    const groups = {};
    for (const row of rows) {
      const key = groupKey(row);
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    }

    // Track model runs for intra-model consistency
    const modelRunsMap = {};
    for (const row of rows) {
      if (!modelRunsMap[row._model_id]) modelRunsMap[row._model_id] = [];
      modelRunsMap[row._model_id].push(row);
    }

    let consensusCount = 0;
    let disputedCount = 0;
    let singleSourceCount = 0;

    for (const [key, groupRows] of Object.entries(groups)) {
      // Cluster by torque value
      const clusters = clusterByTorque(groupRows);

      if (clusters.length === 0) {
        // No torque values found — skip (can't determine consensus)
        continue;
      }

      // Pick the largest cluster (majority wins)
      const winningCluster = clusters.reduce((best, c) => (c.count > best.count ? c : best), clusters[0]);

      // Check if we have a clear majority
      // Majority = more than half of the rows agree
      const totalRowsInGroup = groupRows.length;
      const hasMajority = winningCluster.count > totalRowsInGroup / 2;

      // Also accept as consensus if only one distinct torque value (unanimous)
      const isUnanimous = clusters.length === 1;

      // Single source: only one invocation produced any row in this group
      const uniqueModelsInGroup = new Set(groupRows.map((r) => r._model_id));
      const isSingleSource = uniqueModelsInGroup.size <= 1;

      if (isUnanimous || (hasMajority && winningCluster.count >= 2)) {
        // Emit consensus row
        const consensusRow = /** @type {Record<string, unknown>} */ (JSON.parse(JSON.stringify(winningCluster.rows[0])));

        // Remove internal fields
        delete consensusRow._invocation_id;
        delete consensusRow._model_id;
        delete consensusRow._run;
        delete consensusRow._temperature;
        delete consensusRow._response_path;

        // Ensure required fields exist
        if (!consensusRow.confidence) consensusRow.confidence = "high";
        if (consensusRow.notes === undefined) consensusRow.notes = null;
        if (consensusRow.reusable === undefined) consensusRow.reusable = false;
        if (consensusRow.lubrication === undefined) consensusRow.lubrication = "dry";
        if (consensusRow.qty === undefined) consensusRow.qty = 1;
        if (consensusRow.honda_part_number === undefined) consensusRow.honda_part_number = null;
        if (consensusRow.special_tool === undefined) consensusRow.special_tool = null;
        if (consensusRow.tty === undefined) consensusRow.tty = {};
        if (consensusRow.meta === undefined) consensusRow.meta = {};
        if (consensusRow.source?.figure === undefined) consensusRow.source.figure = null;
        if (consensusRow.torque?.sequence_ref === undefined) consensusRow.torque.sequence_ref = null;
        if (consensusRow.applies_to === undefined) consensusRow.applies_to = {};

        // Build corroboration block
        consensusRow.corroboration = buildCorroboration(
          winningCluster,
          groupRows,
          totalInvocationsForPage,
          modelRunsMap
        );

        consensusRows.push(consensusRow);
        consensusCount++;

        if (isSingleSource) singleSourceCount++;
      } else {
        // No majority — emit to disputed
        const candidates = groupRows.map((r) => ({
          model_id: r._model_id,
          run: r._run,
          temperature: r._temperature,
          response_path: r._response_path,
          torque_nm: getTorqueNm(r),
          invocation_id: r._invocation_id,
        }));

        const t = groupRows[0].thread || {};
        disputedRows.push({
          id: `disputed-${manual}-${page}-${key.replace(/\|/g, "_")}`,
          source: {
            manual,
            page,
            figure: null,
          },
          assembly: groupRows[0].assembly,
          fastener_name: groupRows[0].fastener_name,
          thread: {
            nominal_mm: t.nominal_mm,
            pitch_mm: t.pitch_mm,
            length_mm: t.length_mm,
            grade: t.grade,
          },
          system: groupRows[0].system,
          candidates,
          candidate_count: candidates.length,
          unique_torque_values: [...new Set(candidates.map((c) => c.torque_nm).filter((v) => v !== null))],
          unique_models: [...uniqueModelsInGroup],
          total_invocations_for_page: totalInvocationsForPage,
          unresolved: true,
          acknowledged: false,
        });
        disputedCount++;
      }
    }

    pageStats[pageKey] = {
      total_groups: Object.keys(groups).length,
      consensus_count: consensusCount,
      disputed_count: disputedCount,
      single_source_count: singleSourceCount,
    };
  }
}

// Phase 3: Write outputs
console.log(`\n=== Phase 2 Summary ===`);
console.log(`Consensus rows emitted: ${consensusRows.length}`);
console.log(`Disputed rows emitted: ${disputedRows.length}`);

// Count single-source and vote strength distribution
let singleSourceTotal = 0;
let unanimousTotal = 0;
let majorityTotal = 0;
const voteStrengthBuckets = { "1.0": 0, "0.75-0.99": 0, "0.50-0.74": 0, "<0.50": 0 };

for (const row of consensusRows) {
  const corrob = row.corroboration || {};
  if (corrob.single_source) singleSourceTotal++;
  if (corrob.consensus_strategy === "unanimous") unanimousTotal++;
  if (corrob.consensus_strategy === "majority-vote-torque-nm") majorityTotal++;

  const vs = corrob.vote_strength || 0;
  if (vs >= 0.99) voteStrengthBuckets["1.0"]++;
  else if (vs >= 0.75) voteStrengthBuckets["0.75-0.99"]++;
  else if (vs >= 0.50) voteStrengthBuckets["0.50-0.74"]++;
  else voteStrengthBuckets["<0.50"]++;
}

console.log(`Single-source rows: ${singleSourceTotal}`);
console.log(`Unanimous: ${unanimousTotal}`);
console.log(`Majority vote: ${majorityTotal}`);
console.log(`Vote strength distribution:`);
for (const [bucket, count] of Object.entries(voteStrengthBuckets)) {
  console.log(`  ${bucket}: ${count}`);
}

// Disputed breakdown
const disputedUniqueTorques = {};
for (const d of disputedRows) {
  const n = d.unique_torque_values.length;
  disputedUniqueTorques[n] = (disputedUniqueTorques[n] || 0) + 1;
}
console.log(`Disputed unique torque value counts:`);
for (const [n, count] of Object.entries(disputedUniqueTorques).sort()) {
  console.log(`  ${n} distinct values: ${count} groups`);
}

if (!dryRun) {
  // Write h22-torques.jsonl
  const torquesPath = join(baseDir, "h22-torques.jsonl");
  writeFileSync(torquesPath, consensusRows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");
  console.log(`\nWrote ${consensusRows.length} consensus rows to ${torquesPath}`);

  // Write h22-torques-disputed.jsonl
  const disputedPath = join(baseDir, "h22-torques-disputed.jsonl");
  writeFileSync(disputedPath, disputedRows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");
  console.log(`Wrote ${disputedRows.length} disputed rows to ${disputedPath}`);

  // Write consensus-report.md
  const reportPath = join(baseDir, "consensus-report.md");
  const reportLines = [
    "# Consensus Report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    `- **Total invocation records scanned**: ${totalInvocations}`,
    `- **Valid invocations**: ${validInvocations}`,
    `- **Consensus rows emitted**: ${consensusRows.length}`,
    `- **Disputed rows**: ${disputedRows.length}`,
    `- **Single-source rows**: ${singleSourceTotal}`,
    `- **Unanimous agreements**: ${unanimousTotal}`,
    `- **Majority-vote agreements**: ${majorityTotal}`,
    "",
    "## Vote Strength Distribution",
    "",
    "| Bucket | Count |",
    "|--------|-------|",
    `| 1.0 (unanimous) | ${voteStrengthBuckets["1.0"]} |`,
    `| 0.75–0.99 | ${voteStrengthBuckets["0.75-0.99"]} |`,
    `| 0.50–0.74 | ${voteStrengthBuckets["0.50-0.74"]} |`,
    `| < 0.50 | ${voteStrengthBuckets["<0.50"]} |`,
    "",
    "## Per-Page Statistics",
    "",
    "| Page | Groups | Consensus | Disputed | Single Source |",
    "|------|--------|-----------|----------|---------------|",
  ];

  // Sort pages for consistent output — only include pages with data
  const sortedPageKeys = Object.keys(pageStats).filter((k) => pageStats[k].total_groups > 0).sort();
  for (const pk of sortedPageKeys) {
    const s = pageStats[pk];
    reportLines.push(`| ${pk} | ${s.total_groups} | ${s.consensus_count} | ${s.disputed_count} | ${s.single_source_count} |`);
  }
  if (sortedPageKeys.length === 0) {
    reportLines.push("_No pages with fastener groups._");
  }

  reportLines.push("");
  reportLines.push("## Disputed Rows Detail", "");

  if (disputedRows.length === 0) {
    reportLines.push("_No disputed rows — all fastener groups reached consensus._");
  } else {
    reportLines.push("| ID | Manual | Page | Assembly | Fastener | Thread | Unique Torques | Models |", "|----|--------|------|----------|----------|--------|---------------|--------|");
    for (const d of disputedRows) {
      const threads = d.thread || {};
      reportLines.push(
        `| ${d.id} | ${d.source.manual} | ${d.source.page} | ${d.assembly} | ${d.fastener_name} | ${threads.nominal_mm}×${threads.pitch_mm} | ${d.unique_torque_values.join(", ")} | ${d.unique_models.join(", ")} |`
      );
    }
  }

  reportLines.push("");
  writeFileSync(reportPath, reportLines.join("\n"), "utf-8");
  console.log(`Wrote consensus report to ${reportPath}`);
} else {
  console.log(`\nDRY RUN — would write ${consensusRows.length} consensus rows, ${disputedRows.length} disputed rows`);
}

// Exit
process.exit(0);
