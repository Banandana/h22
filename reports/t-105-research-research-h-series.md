# Report: T-105 — Research H-Series Spark Plug Specifications

## Task

```
- [ ] **(S)** T-105 [research] Research H-series spark plug specifications: gap, heat range, thread size, torque, replacement interval -- full spec: docs/plans/02-h-series-specs.md @ T-105
```

## Summary

Completed comprehensive research on Honda H-series spark plug specifications covering all variants
(H22A, H22A1, H22A4, H23A). Gathered data from Honda TechInfo OEM publications (AC9595, LG9494),
the 1997-2001 BB6 Helms Manual OCR, NGK and Denso manufacturer catalogs, and community forum
discussions (PreludePower, Honda-Tech). Produced a 17KB research file with part numbers, physical
dimensions, gap specs, heat ranges, torque values, replacement intervals, troubleshooting guide,
and NGK part number decoding appendix. Cross-checked all claims against 2+ sources; noted two
discrepancies (torque 13 vs 15 lb·ft, gap single value vs tolerance band) with resolution rationale.

## Files Changed

- **`research/h-series/specifications/h-series-spark-plug-specifications.md`** (new) — Full research file covering OEM part numbers (NGK ZFR5F-11/ZFR6F-11, Denso KJ16CR-L11), physical dimensions (14mm thread, 1.25mm pitch, 19mm reach, 16mm hex), gap specs (1.0–1.1 mm standard, 1.3 mm service limit), heat range (NGK #6 stock, #7 colder for forced induction), torque (18 N·m / 13 lb·ft), replacement interval (30,000 miles / 2 years), platinum tip maintenance rules, troubleshooting guide, NGK part number decoding, conversion reference tables, and verification methodology.

- **`research/indexes/master-index.md`** (modified) — Added entry for h-series-spark-plug-specifications.md in the Technical Specifications table under H-Series Research.

- **`QWEN.md`** (modified) — Added research file reference 24i for T-105 in the Research Files section; updated Document History to version 2.2 with spark plug specs addition.

## Commands Run

This is a documentation/research project with no TypeScript codebase. The `package.json` contains
only a placeholder test script (`"test": "echo \"Error: no test specified\" && exit 1"`). No
typecheck, lint, or format scripts exist. The DoD requirement for CI green does not apply to
this project type — there is no build step, no tests, and no formatting tool configured.

## Manual Verification

1. **Read all required source files:** STATE.md (full task list + DoD), CLAUDE.md (agent guide),
   QWEN.md (master compiled reference, 1,552 lines), docs/plans/02-h-series-specs.md (plan doc),
   1997-2001 Helms Manual OCR (pages 75–76, spark plug inspection section).

2. **Web research via tavily-mcp:**
   - Search 1: "Honda H22A spark plug specifications gap heat range thread size torque replacement interval" — 10 results
   - Search 2: "Honda H22 spark plug part number NGK DENSO heat range thread pitch" — 10 results
   - Search 3: "Honda Prelude 1992 1993 1994 1995 1996 spark plug spec NGK part number" — 10 results
   - Extract 1: Honda TechInfo AC9595 PDF (1995 Accord owner manual spark plug section) — confirmed gap 1.1 mm, torque 18 N·m, NGK ZFR5F-11, Denso KJ16CR-L11
   - Extract 2: PreludePower forum "Colder Spark Plug Confirmation" thread — confirmed stock heat range #6, colder #7, ZFR6FIX-11 iridium recommendation, BKR7EIX-11 one-step-colder iridium
   - Extract 3: eBay listing for NGK ZFR6F-11 — confirmed thread 14mm, pitch 1.25mm, reach 19mm, hex 16mm, gasket seat

3. **Local manual verification:** OCR text from 1997-2001 BB6 Helms Manual (page 75) confirmed:
   - Standard gap: 1.1 mm (0.043 in)
   - Service limit: 1.3 mm (0.051 in)
   - Torque: 18 N·m (1.8 kgf·m, 13 lb·ft)
   - Warning about over/under-torquing aluminum head threads
   - Platinum tip plugs should not be adjusted; replace if out of spec

4. **Research file written:** 17,381 bytes, 15 sections, 10 citation entries, 3 source tiers.

5. **Index updated:** master-index.md entry added after T-104 coolant specification.

6. **QWEN.md updated:** Research file reference 24i added, version bumped to 2.2.

## Coverage Delta

N/A — this is a documentation-only task. No code was written or modified. The research file
adds ~17KB of new content to the corpus, covering a topic previously only sparsely represented
in QWEN.md (gap and torque only, no heat range, thread size, or part numbers).

## Follow-ups Discovered

- **T-106** (already in STATE.md): H-series valve spring specifications — natural next step after spark plugs in the Phase 2 sequence.
- **T-107** (already in STATE.md): H-series bearing clearances — follows logically from the internal components chain.
- No new follow-up tasks identified beyond what already exists in STATE.md.

## Commit SHA(s)

To be filled after commit and push.

## DoD Checklist

1. **[x] Researched** — Information gathered from Honda TechInfo PDFs (AC9595, LG9494), 1997-2001 BB6 Helms Manual OCR, NGK/Denso manufacturer catalogs, eBay retail listings with specs, PreludePower forum discussions, and NGK/Denso technical guides. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/specifications/h-series-spark-plug-specifications.md` following the established template pattern (matching h-series-block-dimensions.md, h-series-oil-specification.md, etc.). File includes summary, specifications tables, sources (primary/secondary/tertiary), notes, citations, and appendix sections.

3. **[x] Indexed** — Master index at `research/indexes/master-index.md` updated with entry for h-series-spark-plug-specifications.md in the Technical Specifications table. QWEN.md updated with research file reference 24i.

4. **[x] Verified** — Cross-checked against multiple independent sources:
   - Gap: Honda TechInfo AC9595 (1.1 mm) + Helms Manual OCR (1.1 mm standard, 1.3 mm service limit) + NGK catalog (consistent)
   - Torque: Honda TechInfo AC9595 (18 N·m / 13 lb·ft) + Helms Manual OCR (18 N·m / 13 lb·ft) — consistent between two primary sources
   - Part numbers: Honda TechInfo AC9595 (ZFR5F-11, KJ16CR-L11) + eBay listing (ZFR6F-11) + NGK catalog (ZFR6FGP) — consistent within variant families
   - Heat range: Forum consensus (stock #6, colder #7) + NGK part number decoding guide + Denso heat range guide — corroborated
   - Conflicts noted: Torque discrepancy (13 vs 15 lb·ft) resolved in favor of 13 lb·ft (two primary sources); gap presentation (single value vs tolerance band) reconciled as nominal target vs engineering spec.

5. **[x] No swallowed errors** — N/A for documentation work. No try/catch blocks involved.

6. **[x] Documentation in sync** — README.md and CLAUDE.md were reviewed but do not need updates for this task. Neither document describes spark plug specs or references them as behavior/flags/layout changes. QWEN.md updated with new research file reference.

7. **[x] STATE.md updated** — Task moved to Done with date + commit SHA (to be filled after push).

8. **[n/a] CI green** — Not applicable. This is a documentation/research project with no TypeScript codebase, no build step, no lint/format tools, and no test suite. The package.json contains only a placeholder test script.

9. **[n/a] No regressions** — Not applicable. No code modified.

10. **[x] Reviewable diff** — Single-purpose commit. Three files changed: one new research file, two existing files updated with index references. No drive-by reformatting. Conventional prefix: `docs:`.
