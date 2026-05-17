#!/usr/bin/env node
/**
 * curate-page-images.mjs — Filter + WebP-recompress source PNGs for git commit.
 *
 * Scans h22-torques.jsonl, h22-torques-disputed.jsonl, h22-torques-rejects.jsonl
 * to collect the union of (manual, page) tuples cited by any row. For each:
 *   - BB6 source: bb6_ocr/images/page-<NNN>.png (0-999) or page-<NNNN>.png (1000+)
 *   - OBD1 source: obd1_source/verify/page1-<NNNN>.png
 * Recompresses each PNG to WebP via sharp at quality=75, max-width=1200.
 * Outputs to research/raw-data/torque-specs/images/<manual>/p<page>.webp.
 *
 * Usage:
 *   node scripts/curate-page-images.mjs [--dry-run] [--base <path>]
 */

import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

// ── CLI parsing ──────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
let dryRun = false;
let baseDir = resolve(".");

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--dry-run") dryRun = true;
  else if (args[i] === "--base" && i + 1 < args.length) {
    baseDir = resolve(args[++i]);
  }
}

// ── Constants ────────────────────────────────────────────────────────────────

const TORQUES_PATH = join(baseDir, "research/raw-data/torque-specs/h22-torques.jsonl");
const DISPUTED_PATH = join(baseDir, "research/raw-data/torque-specs/h22-torques-disputed.jsonl");
const REJECTS_PATH = join(baseDir, "research/raw-data/torque-specs/h22-torques-rejects.jsonl");
const OUTPUT_DIR = join(baseDir, "research/raw-data/torque-specs/images");
const WEBP_QUALITY = 75;
const WEBP_MAX_WIDTH = 700;

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Resolve the source PNG path for a (manual, page) tuple. */
function resolveSourcePath(manual, page) {
  const p = String(page);
  if (manual === "BB6") {
    // page-NNN.png for 0-999, page-NNNN.png for 1000+
    const num = parseInt(p, 10);
    const src = num >= 1000 ? `bb6_ocr/images/page-${p}.png` : `bb6_ocr/images/page-${p.padStart(3, "0")}.png`;
    return join(baseDir, src);
  }
  if (manual === "OBD1") {
    // obd1_source/verify/page1-NNNN.png (4-digit zero-padded)
    return join(baseDir, `obd1_source/verify/page1-${p.padStart(4, "0")}.png`);
  }
  return null;
}

/** Resolve the output WebP path. */
function resolveOutputPath(manual, page) {
  return join(OUTPUT_DIR, manual.toLowerCase(), `p${page}.webp`);
}

/** Load JSONL file, return array of parsed objects (empty if file missing/empty). */
function loadJSONL(path) {
  if (!existsSync(path)) return [];
  const text = readFileSync(path, "utf8").trim();
  if (!text) return [];
  return text.split("\n").map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

/** Collect unique (manual, page) tuples from all JSONL sources. */
function collectCitedPages() {
  const set = new Set();

  // torques.jsonl — rows have source.manual + source.page
  for (const row of loadJSONL(TORQUES_PATH)) {
    if (row.source?.manual && row.source?.page) {
      set.add(`${row.source.manual}:${row.source.page}`);
    }
    // Also check sources[] array (cross-page dedup)
    if (Array.isArray(row.sources)) {
      for (const src of row.sources) {
        if (src.manual && src.page) {
          set.add(`${src.manual}:${src.page}`);
        }
      }
    }
  }

  // disputed.jsonl — same shape as torques
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

  // rejects.jsonl — wrapped in { invocation_record, ... }
  for (const entry of loadJSONL(REJECTS_PATH)) {
    const inv = entry.invocation_record || entry;
    if (inv.manual && inv.page) {
      set.add(`${inv.manual}:${inv.page}`);
    }
    // Also check direct fields (some rejects may not wrap)
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

// ── Core logic ───────────────────────────────────────────────────────────────

async function curatePageImage(manual, page) {
  const srcPath = resolveSourcePath(manual, page);
  const dstPath = resolveOutputPath(manual, page);

  if (!srcPath || !existsSync(srcPath)) {
    return { status: "missing_source", manual, page, srcPath };
  }

  if (existsSync(dstPath)) {
    // Already exists — verify it's valid WebP
    try {
      const meta = await sharp(dstPath).metadata();
      if (meta.format === "webp") {
        return { status: "skipped_existing", manual, page, dstPath };
      }
    } catch {
      // Corrupt — fall through to reprocess
    }
  }

  const srcStat = statSync(srcPath);

  if (dryRun) {
    // In dry-run mode, estimate compression ratio from a sample
    // rather than converting every file (avoids N sharp metadata calls)
    const estRatio = srcStat.size > 500_000 ? 15 : 40; // rough heuristic
    const estDst = Math.round(srcStat.size * estRatio / 100);
    return {
      status: "dry_run",
      manual,
      page,
      srcSize: srcStat.size,
      estDstSize: estDst,
      ratio: `${estRatio}%`,
    };
  }

  let pipeline = sharp(srcPath);

  // Resize if wider than max-width
  try {
    const meta = await sharp(srcPath).metadata();
    if (meta.width > WEBP_MAX_WIDTH) {
      pipeline = pipeline.resize(WEBP_MAX_WIDTH, null, { withoutEnlargement: true });
    }
  } catch {
    // If metadata fails, just convert as-is
  }

  const webpBuffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();

  // Ensure output directory exists
  const outDir = join(dstPath, "..");
  mkdirSync(outDir, { recursive: true });
  writeFileSync(dstPath, webpBuffer);

  return {
    status: "converted",
    manual,
    page,
    srcPath,
    dstPath,
    srcSize: srcStat.size,
    dstSize: webpBuffer.length,
    ratio: (webpBuffer.length / srcStat.size * 100).toFixed(1),
  };
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`[curate-page-images] base=${baseDir} dryRun=${dryRun}`);

  const citedPages = collectCitedPages();
  console.log(`[curate-page-images] Cited pages: ${citedPages.length}`);

  if (citedPages.length === 0) {
    console.warn("[curate-page-images] No pages cited in any JSONL. Nothing to do.");
    process.exit(0);
  }

  // Group by manual
  const byManual = new Map();
  for (const key of citedPages) {
    const [manual, page] = key.split(":");
    if (!byManual.has(manual)) byManual.set(manual, []);
    byManual.get(manual).push(parseInt(page, 10));
  }

  const results = [];
  let errors = 0;
  let skipped = 0;
  let converted = 0;
  let totalSrcBytes = 0;
  let totalDstBytes = 0;

  for (const [manual, pages] of byManual) {
    console.log(`[curate-page-images] Processing ${manual}: ${pages.length} pages`);

    for (const page of pages) {
      const result = await curatePageImage(manual, page);
      results.push(result);

      switch (result.status) {
        case "converted":
          converted++;
          totalSrcBytes += result.srcSize;
          totalDstBytes += result.dstSize;
          break;
        case "skipped_existing":
          skipped++;
          break;
        case "dry_run":
          converted++;
          totalSrcBytes += result.srcSize;
          totalDstBytes += result.estDstSize || 0;
          break;
        case "missing_source":
          errors++;
          console.warn(`[curate-page-images] MISSING: ${manual}:${page} → ${result.srcPath}`);
          break;
        default:
          errors++;
      }
    }
  }

  // Summary
  const compressionRatio = totalSrcBytes > 0 ? (totalDstBytes / totalSrcBytes * 100).toFixed(1) : "N/A";
  const savedMB = ((totalSrcBytes - totalDstBytes) / (1024 * 1024)).toFixed(1);

  console.log(`\n[curate-page-images] Done:`);
  console.log(`  Converted: ${converted}`);
  console.log(`  Skipped (existing): ${skipped}`);
  console.log(`  Missing source: ${errors}`);
  console.log(`  Total source size: ${(totalSrcBytes / (1024 * 1024)).toFixed(1)} MB`);
  console.log(`  Total output size: ${(totalDstBytes / (1024 * 1024)).toFixed(1)} MB`);
  console.log(`  Compression: ${compressionRatio}% (${savedMB} MB saved)`);

  if (errors > 0) {
    console.warn(`[curate-page-images] WARNING: ${errors} pages had missing sources.`);
  }

  // Verification: ensure every cited page has a WebP
  if (!dryRun) {
    let verificationFailures = 0;
    for (const key of citedPages) {
      const [manual, page] = key.split(":");
      const dstPath = resolveOutputPath(manual, parseInt(page, 10));
      if (!existsSync(dstPath)) {
        verificationFailures++;
        console.error(`[curate-page-images] VERIFICATION FAIL: ${dstPath} does not exist`);
      }
    }
    if (verificationFailures > 0) {
      console.error(`[curate-page-images] VERIFICATION FAILED: ${verificationFailures} pages missing WebP output.`);
      process.exitCode = 1;
    } else {
      console.log(`[curate-page-images] Verification passed: all ${citedPages.length} cited pages have WebP output.`);
    }
  }

  // Print total committed size estimate
  if (!dryRun) {
    let totalOutputBytes = 0;
    for (const key of citedPages) {
      const [manual, page] = key.split(":");
      const dstPath = resolveOutputPath(manual, parseInt(page, 10));
      if (existsSync(dstPath)) {
        totalOutputBytes += statSync(dstPath).size;
      }
    }
    console.log(`[curate-page-images] Total committed image set size: ${(totalOutputBytes / (1024 * 1024)).toFixed(1)} MB`);
    if (totalOutputBytes > 50 * 1024 * 1024) {
      console.warn(`[curate-page-images] WARNING: Committed size exceeds 50 MB limit.`);
    }
  }
}

main().catch((err) => {
  console.error("[curate-page-images] FATAL:", err.message);
  console.error(err.stack);
  process.exit(1);
});
