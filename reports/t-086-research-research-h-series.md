# Report: T-086 Research H-Series Power Density

## Task

- [x] **(M)** T-086 [research] Research H-series power density: HP per liter, torque per liter, comparison to contemporaries -- full spec: docs/plans/02-h-series-specs.md @ T-086

## Summary

Researched and documented the power density (HP/L) and torque density (Nm/L) of the Honda H-series engine family across all variants, from the lowest-output H22A2 EDM (85.8 HP/L) to the peak-output H22A Redtop Type S (102.0 HP/L). Also compared these figures against key 1990s contemporaries including Honda's own K20A (100–110 HP/L), B16A/B18C (94–120 HP/L), F20C (120–125 HP/L), Toyota 3S-GE (80–93 HP/L), Subaru EJ20G (140 HP/L turbocharged), and BMW M3 S50B32 (100 HP/L inline-6). Key finding: the H-series sits in the upper tier of NA inline-4s of its era, distinguished by superior torque density (~102 Nm/L) compared to most competitors, a direct result of its long-stroke design (90.7 mm stroke on 87.0 mm bore).

## Files Changed

- **`research/h-series/specifications/h-series-power-density.md`** (created) — Comprehensive research document covering H-series power density by variant (11 variants), torque density calculations, cross-manufacturer comparisons (14 engines), specific output analysis, historical context, and 10 cited sources with retrieval timestamps.
- **`research/indexes/master-index.md`** (updated) — Added entry for `h-series-power-density.md` in the Technical Specifications table under H-Series Research section.

## Commands Run

```
$ npm run typecheck
npm error Missing script: "typecheck"

$ npm run lint
npm error Missing script: "lint"

$ npm test
> h22@1.0.0 test
> echo "Error: no test specified" && exit 1
Error: no test specified

$ npm run format:check
npm error Missing script: "format:check"
```

**Summary:** No npm scripts are configured for this project. This is a documentation-only research project with no TypeScript source code. The CI checklist items are n/a for this task.

## Manual Verification

1. **Research document written and verified:**
   ```
   $ wc -l research/h-series/specifications/h-series-power-density.md
   347 research/h-series/specifications/h-series-power-density.md
   ```
   Document contains 11 variant-specific power density entries, 14-engine comparison table, calculation methodology appendix, and 10 cited sources.

2. **Master index updated:**
   ```
   $ grep "power-density" research/indexes/master-index.md
   | [`h-series-power-density.md`](../h-series/specifications/h-series-power-density.md) | H-series power density: HP per liter (85.8–102.0 HP/L across variants)...
   ```
   Entry correctly placed after `h-series-external-dimensions.md` in the Technical Specifications table.

3. **Cross-reference verification:**
   - Verified HP/L calculations against wikimotors source data (85.8, 88.1, 92.7, 98.3, 102.0)
   - Verified displacement formula: π × (87/2)² × 90.7 × 4 = 2,157 cc ✓
   - Verified competitor data against Wikipedia H-engine page, AcuraZine forum, CivicForums spec sheets
   - Confirmed PS→HP conversion factor (1 PS = 0.9863 HP) applied where needed

4. **Template compliance:**
   - Document follows `research/template.md` structure: Summary → Specifications → Sources → Notes → Citations → Appendix
   - All claims cited with source URLs and retrieval timestamps (2026-05-15)
   - Cross-checked against 2+ independent sources where possible; conflicts noted in Notes section

## Coverage Delta

n/a — This is a documentation-only task. No code was added or modified. The research corpus coverage increased by 1 new file in `research/h-series/specifications/` and 1 index update.

## Follow-ups Discovered

1. **T-087** (next sequential task): Research H-series specific output by variant — HP/liter for Redtop, Blacktop, USDM, EDM variants. This task is more granular than T-086 and builds directly on the power density data compiled here.
2. **T-088**: Research H-series thermal efficiency — brake thermal efficiency figures, heat rejection percentages. Complementary thermodynamic analysis to the power density work.
3. **Potential future comparison task**: The BMW M3 S50B32 (100.3 HP/L) proved nearly identical to the H22A Redtop (102.0 HP/L) — could warrant a dedicated H22A vs BMW inline-6 comparison in Phase 6 (Competitor Comparisons & Maintenance).

## Commit SHA(s)

Pending commit. Will be recorded after push to origin/main.

## DoD Checklist

1. **[x] Researched** — Information gathered from tavily-mcp search/extract (wikimotors, Wikipedia, CivicForums, AcuraZine, Tagore Auto Parts, TopSpeed, Goodwood GRR, HotCars, JDM Supreme) plus local QWEN.md master reference. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/specifications/h-series-power-density.md`. File follows the template in `docs/plans/TEMPLATE.md` (research/template.md): Summary → Specifications → Sources → Notes → Citations → Appendix.

3. **[x] Indexed** — Updated `research/indexes/master-index.md` with link to new content in the Technical Specifications table under H-Series Research section.

4. **[x] Verified** — Cross-checked against multiple independent sources: wikimotors (HP/L figures), Wikipedia H-engine (variant specs), CivicForums (detailed spec sheets), AcuraZine (community-calculated HP/L), QWEN.md (compiled reference). Conflicts noted: H22A4 output disputed between 195 HP and 200 HP — reported as range (90.4–92.7 HP/L).

5. **[x] No swallowed errors** — N/A. No code changes made. Documentation task only.

6. **[x] Documentation in sync** — Master index updated in same commit. README.md and CLAUDE.md do not require updates (no behavior/flags/layout/convention changes).

7. **[ ] STATE.md updated** — Pending commit. Task will be moved to Done archive with commit SHA + date.

8. **[ ] CI green** — N/A. Project has no TypeScript source code; npm scripts are placeholders. No typecheck, lint, test, or format scripts exist.

9. **[ ] No regressions** — N/A. No code changes. Only new file created and one index entry added.

10. **[ ] Reviewable diff** — Single-purpose commits. Conventional prefix: `docs: research h-series power density`. No drive-by reformatting.
