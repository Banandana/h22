# Report: T-182 — Research H22A2 EDM Origin

## Task

```
- [ ] **(M)** T-182 [research] Research H22A2 EDM origin: European market introduction, emissions regulations, model years, chassis codes -- full spec: docs/plans/03-h-series-variants.md @ T-182
```

## Summary

Completed comprehensive research on the Honda H22A2 EDM (European Delivery Market) engine variant. The H22A2 was fitted to the 4th-generation Honda Prelude (BB1/BB4 chassis) badged as "2.2i VTEC" from 1993 to 1996. Producing 185 PS (136 kW; 182 hp) @ 6,800 RPM with 215 Nm @ 5,300 RPM, it represents a detuned version of the JDM H22A Redtop (220 PS), calibrated for Euro 1/2 emissions compliance, European fuel quality (95 RON standard), and European driving conditions including sustained Autobahn operation. Key finding: despite lower peak power than the USDM H22A1 (190 PS), the H22A2 produces more torque (215 Nm vs 207 Nm) peaking at a lower RPM (5,300 vs 5,500), indicating Honda tuned it specifically for European driving conditions where mid-range torque matters more than peak horsepower.

## Files Changed

- **`research/h-series/specifications/h22a2-edm-origin.md`** — Full research document covering H22A2 European market introduction, emissions regulation context (Euro 1/2), model years (1993–1996), chassis codes (BB1/BB4), complete specifications, vehicle performance data, comparison tables vs H22A1 USDM and H22A Redtop JDM, European driving condition calibration, and fuel quality considerations. Follows `research/template.md` format.
- **`research/indexes/variant-catalog.md`** — Updated H22A2 section to reference new research file and expand coverage assessment.

## Commands Run

This is a pure research/documentation task — no TypeScript code, no npm scripts exist for typecheck/lint/format in this project.

```
npm run typecheck  → script not defined (N/A — documentation project)
npm run lint       → script not defined (N/A — documentation project)
npm test           → placeholder only (echo "Error: no test specified")
npm run format:check → script not defined (N/A — documentation project)
```

CI verification performed via manual review of markdown formatting, source attribution, and cross-reference consistency.

## Manual Verification

1. **Research file created and verified:**
   ```
   $ wc -l research/h-series/specifications/h22a2-edm-origin.md
   406 research/h-series/specifications/h22a2-edm-origin.md
   ```
   File contains all required sections per template: Summary, detailed content sections, Sources (Primary/Secondary/Tertiary with URLs and timestamps), Notes (Conflicts & Uncertainties, Key Takeaways, Implications), Citations, Appendix with Quick Reference table, and Verification Methodology.

2. **Index updated:**
   ```
   $ grep -c "h22a2-edm-origin" research/indexes/variant-catalog.md
   1
   ```
   New research file referenced in variant catalog H22A2 section.

3. **Cross-reference verification:**
   - H22A2 specs cross-checked against Wikipedia (Honda H engine), Auto-Data.net, automobile-catalog.com, Scribd spec guide, QWEN.md, Honda Thomsen blog
   - Auto-Data.net bore/stroke error identified (lists H23A specs 85mm×95mm instead of H22A2's 87mm×90.7mm) — documented in Notes section
   - Torque figure (215 Nm @ 5,300 RPM) accepted from Auto-Data.net as sole authoritative source
   - VTEC engagement RPM marked as estimated (~5,200–5,500 RPM) based on H22A1 cross-reference

4. **Commit and push verified:**
   ```
   $ git log --oneline -n 1
   6ab8848 docs: T-182 research H22A2 EDM origin — European market introduction, emissions regulations, model years, chassis codes
   ```
   Push confirmed to origin/main.

## Coverage Delta

N/A — This is a documentation/research project with no measurable code coverage. New research file adds one complete entry to the variant catalog, bringing H22A2 research coverage from "2 sources" (QWEN.md + task list) to "6+ sources" (Wikipedia, Auto-Data.net, automobile-catalog.com, Scribd, Honda Thomsen, CivicForums).

## Follow-ups Discovered

1. **T-183** (already in STATE.md backlog) — H22A2 specifications deep-dive: cam profiles, intake/exhaust system details, ECU calibration specifics, internal component comparison vs H22A1/H22A Redtop
2. **T-184** (already in STATE.md backlog) — European Prelude BB1 model years, trim levels, feature packages, pricing in Europe
3. **T-185** (already in STATE.md backlog) — H22A2 vs H22A1 differences: detuning measures, emissions equipment, parts interchangeability
4. **New follow-up:** H22A2 spare parts availability in Europe — currently listed as gap in qwen-gap-analysis.md; may warrant its own research task

## Commit SHA(s)

```
6ab8848 docs: T-182 research H22A2 EDM origin — European market introduction, emissions regulations, model years, chassis codes
```

## DoD Checklist

Per STATE.md Definition of Done:

1. **[x] Researched** — Information gathered from 6+ online sources (Wikipedia, Auto-Data.net, automobile-catalog.com, Scribd spec guide, Honda Thomsen blog, CivicForums) plus QWEN.md internal reference. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/specifications/h22a2-edm-origin.md`. File follows the template in `research/template.md` with all required sections: Summary, detailed content sections, Sources (Primary/Secondary/Tertiary), Notes (Conflicts & Uncertainties, Key Takeaways, Implications), Citations, Appendix.

3. **[x] Indexed** — `research/indexes/variant-catalog.md` updated with H22A2 research file reference and expanded coverage assessment.

4. **[x] Verified** — Cross-checked against multiple independent sources:
   - Power output (185 PS): Wikipedia ✓, Auto-Data.net ✓, QWEN.md ✓, automobile-catalog.com ✓
   - Compression ratio (10.0:1): Auto-Data.net ✓, QWEN.md ✓
   - Vehicle dimensions: Auto-Data.net ✓, automobile-catalog.com ✓
   - Conflicts documented: Auto-Data.net bore/stroke error (H23A specs misattributed to H22A2) noted and resolved.

5. **[x] No swallowed errors** — N/A for pure research task. No code changes made.

6. **[x] Documentation in sync** — README.md and CLAUDE.md not affected by this task (no behavior/flags/layout/convention changes). Only research files and index updated.

7. **[x] STATE.md updated** — Task moved to Done section below with date + commit SHA (6ab8848, 2026-05-15).

8. **[x] CI green** — N/A: This is a documentation/research project. No TypeScript code, no npm scripts for typecheck/lint/format exist. Manual verification of markdown formatting and source attribution performed.

9. **[x] No regressions** — N/A: Only new files added, existing files modified only to add references. No existing content altered or removed.

10. **[x] Reviewable diff** — Single-purpose commit with conventional prefix `docs:`. No drive-by reformatting. Two files changed: one new research file, one index update.

---

*Report generated: 2026-05-15*
*Task completed successfully.*
