#!/usr/bin/env node
// render-torque-index.mjs — JSONL → markdown torque index views
// Reads h22-torques.jsonl + h22-torques-arp.jsonl, emits:
//   research/h-series/maintenance/torque-by-location.md
//   research/h-series/maintenance/torque-by-fastener.md

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ── helpers ────────────────────────────────────────────────────────────────

function loadJsonl(path) {
  // Support both relative (to ROOT) and absolute paths
  const resolved = path.startsWith("/") ? path : join(ROOT, path);
  const raw = readFileSync(resolved, "utf8").trim();
  if (!raw) return [];
  return raw.split("\n").map((l) => JSON.parse(l));
}

function badge(label, color) {
  // ANSI-ish badge text for markdown (renders as plain text in all viewers)
  return `[${label}]`;
}

function voteBadge(vs, singleSource) {
  if (singleSource) return badge("1×", "gray");
  if (vs >= 0.75) return badge(`${Math.round(vs * 100)}%`, "green");
  if (vs >= 0.5) return badge(`${Math.round(vs * 100)}%`, "yellow");
  return badge("split", "red");
}

function torqueStepsStr(steps) {
  if (!steps || steps.length === 0) return "—";
  return steps
    .map((s) => {
      let part = `Pass ${s.pass}`;
      if (s.nm != null) part += ` ${s.nm} N·m`;
      if (s.kgfm != null) part += ` (${s.kgfm} kgf·m)`;
      if (s.lbft != null) part += ` (${s.lbft} lbf·ft)`;
      if (s.angle_deg != null) part += ` + ${s.angle_deg}°`;
      return part;
    })
    .join("; ");
}

function threadStr(t) {
  if (!t) return "—";
  const parts = [];
  if (t.nominal_mm != null) parts.push(`${t.nominal_mm}mm`);
  if (t.pitch_mm != null) parts.push(`${t.pitch_mm}mm pitch`);
  if (t.grade != null) parts.push(`Grade ${t.grade}`);
  if (t.length_mm != null) parts.push(`${t.length_mm}mm long`);
  return parts.join(", ") || "—";
}

function conflictCallout(row) {
  if (!row.conflict_group_id) return "";
  return ` ⚠ [conflict:${row.conflict_group_id}]`;
}

// ── View 1: torque-by-location.md ──────────────────────────────────────────

function renderByLocation(oemRows, arpRows) {
  const lines = [];
  lines.push("# Torque Specifications by Location\n");
  lines.push(
    "> Auto-generated from `h22-torques.jsonl` + `h22-torques-arp.jsonl`. " +
      "Verify every value against the service manual before use.\n",
  );
  lines.push("");

  // Group OEM rows by system → assembly
  const groups = new Map();
  for (const r of oemRows) {
    const key = `${r.system}|||${r.assembly}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  }

  // System ordering
  const systemOrder = ["engine", "drivetrain", "chassis", "body", "electrical"];

  const sortedKeys = [...groups.keys()].sort((a, b) => {
    const [sa] = a.split("|||");
    const [sb] = b.split("|||");
    const ia = systemOrder.indexOf(sa);
    const ib = systemOrder.indexOf(sb);
    if (ia !== -1 && ib !== -1) return ia - ib;
    if (ia !== -1) return -1;
    if (ib !== -1) return 1;
    return a.localeCompare(b);
  });

  for (const key of sortedKeys) {
    const [system, assembly] = key.split("|||");
    const rows = groups.get(key);
    const sysLabel = system.charAt(0).toUpperCase() + system.slice(1);
    const assemLabel = assembly.replace(/-/g, " ");

    lines.push(`## ${sysLabel}`);
    lines.push(`### ${assemLabel}`);
    lines.push("");

    // Table header
    lines.push(
      "| Fastener | Thread | Qty | Torque | Lube | Reusable | PN | Vote | Notes |",
    );
    lines.push(
      "|----------|--------|-----|--------|------|----------|-----|------|-------|",
    );

    for (const r of rows) {
      const vs = r.corroboration?.vote_strength ?? 1;
      const ss = r.corroboration?.single_source ?? false;
      const vb = voteBadge(vs, ss);
      const pn = r.honda_part_number || "—";
      const notes = r.notes || "";
      const conflict = conflictCallout(r);

      lines.push(
        `| ${r.fastener_name} | ${threadStr(r.thread)} | ${r.qty} | ${torqueStepsStr(r.torque?.steps)} | ${r.lubrication || "—"} | ${r.reusable ? "Yes" : "No"} | ${pn} | ${vb} | ${notes}${conflict || ""} |`,
      );
    }

    lines.push("");
  }

  // ARP aftermarket subsection
  if (arpRows.length > 0) {
    lines.push("---");
    lines.push("");
    lines.push("## Aftermarket Equivalents (ARP)\n");
    lines.push(
      "> ARP hardware tagged `oem: false`. These are aftermarket upgrades; " +
        "OEM torque specs remain in the tables above.\n",
    );
    lines.push("");

    // Group ARP by assembly
    const arpGroups = new Map();
    for (const r of arpRows) {
      if (!arpGroups.has(r.assembly)) arpGroups.set(r.assembly, []);
      arpGroups.get(r.assembly).push(r);
    }

    for (const [assembly, rows] of arpGroups) {
      const label = assembly ? assembly.replace(/-/g, " ") : "unknown";
      lines.push(`### ${label}`);
      lines.push("");
      lines.push(
        "| Fastener | Thread | Qty | Torque | Lube | Reusable | ARP PN | Notes |",
      );
      lines.push(
        "|----------|--------|-----|--------|------|----------|--------|-------|",
      );

      for (const r of rows) {
        const arpPn = r.meta?.arp_pn || "—";
        const notes = r.notes || "";
        lines.push(
          `| ${r.fastener_name} | ${threadStr(r.thread)} | ${r.qty} | ${torqueStepsStr(r.torque?.steps)} | ${r.lubrication || "—"} | ${r.reusable ? "Yes" : "No"} | ${arpPn} | ${notes} |`,
        );
      }

      lines.push("");
    }
  }

  return lines.join("\n") + "\n";
}

// ── View 2: torque-by-fastener.md ──────────────────────────────────────────

function renderByFastener(oemRows, arpRows) {
  const lines = [];
  lines.push("# Torque Specifications by Fastener\n");
  lines.push(
    "> Auto-generated from `h22-torques.jsonl` + `h22-torques-arp.jsonl`. " +
      "Grouped by (thread, role) so you can find the right spec for any bolt.\n",
  );
  lines.push("");

  // Build (thread, role) groups from OEM rows
  const groups = new Map();
  for (const r of oemRows) {
    const t = r.thread || {};
    const key = `${t.nominal_mm ?? "?"}x${t.pitch_mm ?? "?"}_${r.role}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(r);
  }

  // Sort groups: numeric first, then alpha
  const sortedKeys = [...groups.keys()].sort((a, b) => {
    const [na, nb] = [a.split("x")[0], b.split("x")[0]];
    const naNum = Number(na);
    const nbNum = Number(nb);
    if (!isNaN(naNum) && !isNaN(nbNum)) return naNum - nbNum;
    return a.localeCompare(b);
  });

  for (const key of sortedKeys) {
    // key format: "nominal_mm x pitch_mm_role"
    const [threadSpec, role] = key.split("_", 2);
    const [nominal, pitch] = threadSpec.split("x");
    const label = `M${nominal} × ${pitch} — ${role.replace(/-/g, " ")}`;
    const rows = groups.get(key);

    lines.push(`## ${label}`);
    lines.push("");

    // Compute median + range
    const torques = rows
      .map((r) => r.torque?.steps?.[0]?.nm)
      .filter((v) => v != null);
    if (torques.length > 0) {
      const sorted = [...torques].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      const median =
        sorted.length % 2 === 0
          ? (sorted[mid - 1] + sorted[mid]) / 2
          : sorted[mid];
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      const rangeStr =
        min === max ? `${min} N·m` : `${min}–${max} N·m (median ${median})`;
      lines.push(`**Torque range:** ${rangeStr}`);
      lines.push("");
    }

    // Table
    lines.push(
      "| Application | System | Manual | Page | Torque | Lube | Reusable | Vote | PN |",
    );
    lines.push(
      "|-------------|--------|--------|------|--------|------|----------|------|-----|",
    );

    for (const r of rows) {
      const vs = r.corroboration?.vote_strength ?? 1;
      const ss = r.corroboration?.single_source ?? false;
      const vb = voteBadge(vs, ss);
      const manual = r.source?.manual || "—";
      const page = r.source?.page ?? "—";
      const pn = r.honda_part_number || "—";
      const notes = r.notes || "";
      const conflict = conflictCallout(r);

      lines.push(
        `| ${r.fastener_name} | ${r.system} | ${manual} | p.${page} | ${torqueStepsStr(r.torque?.steps)} | ${r.lubrication || "—"} | ${r.reusable ? "Yes" : "No"} | ${vb} | ${pn} |`,
      );
    }

    lines.push("");
  }

  // ARP aftermarket subsection
  if (arpRows.length > 0) {
    lines.push("---");
    lines.push("");
    lines.push("## Aftermarket (ARP)\n");
    lines.push(
      "> ARP equivalents grouped by (thread, role). These replace OEM fasteners.\n",
    );
    lines.push("");

    const arpGroups = new Map();
    for (const r of arpRows) {
      const t = r.thread || {};
      const key = `${t.nominal_mm ?? "?"}x${t.pitch_mm ?? "?"}_${r.role}`;
      if (!arpGroups.has(key)) arpGroups.set(key, []);
      arpGroups.get(key).push(r);
    }

    const arpSorted = [...arpGroups.keys()].sort();
    for (const key of arpSorted) {
      const [threadSpec, role] = key.split("_", 2);
      const [nominal, pitch] = threadSpec.split("x");
      const rows = arpGroups.get(key);
      const label = `M${nominal} × ${pitch} — ${role.replace(/-/g, " ")}`;

      lines.push(`### ${label}`);
      lines.push("");
      lines.push("| ARP Part | Fastener | Torque | Lube | Includes | Notes |");
      lines.push("|----------|----------|--------|------|----------|-------|");

      for (const r of rows) {
        const arpPn = r.meta?.arp_pn || "—";
        const includes = r.meta?.arp_includes || "—";
        const notes = r.notes || "";
        lines.push(
          `| ${arpPn} | ${r.fastener_name} | ${torqueStepsStr(r.torque?.steps)} | ${r.lubrication || "—"} | ${includes} | ${notes} |`,
        );
      }

      lines.push("");
    }
  }

  return lines.join("\n") + "\n";
}

// ── CLI ────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  let torquesPath = "research/raw-data/torque-specs/h22-torques.jsonl";
  let arpPath = "research/raw-data/torque-specs/h22-torques-arp.jsonl";
  let outDir = "research/h-series/maintenance";

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--torques" && args[i + 1]) torquesPath = args[++i];
    else if (args[i] === "--arp" && args[i + 1]) arpPath = args[++i];
    else if (args[i] === "--out-dir" && args[i + 1]) outDir = args[++i];
    else if (args[i] === "--help") {
      console.log(
        "Usage: node scripts/render-torque-index.mjs [--torques PATH] [--arp PATH] [--out-dir DIR]",
      );
      process.exit(0);
    }
  }

  const oemRows = loadJsonl(torquesPath);
  const arpRows = loadJsonl(arpPath);

  console.error(
    `Loaded ${oemRows.length} OEM rows, ${arpRows.length} ARP rows`,
  );

  mkdirSync(outDir.startsWith("/") ? outDir : join(ROOT, outDir), {
    recursive: true,
  });

  const locMd = renderByLocation(oemRows, arpRows);
  const fasMd = renderByFastener(oemRows, arpRows);

  const locPath = outDir.startsWith("/")
    ? join(outDir, "torque-by-location.md")
    : join(ROOT, outDir, "torque-by-location.md");
  const fasPath = outDir.startsWith("/")
    ? join(outDir, "torque-by-fastener.md")
    : join(ROOT, outDir, "torque-by-fastener.md");

  writeFileSync(locPath, locMd);
  writeFileSync(fasPath, fasMd);

  console.error(`Wrote ${locPath}`);
  console.error(`Wrote ${fasPath}`);
}

main();
