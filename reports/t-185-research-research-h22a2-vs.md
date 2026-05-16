# Report: T-185 — Research H22A2 vs H22A1 Differences

## Task

- [x] **(M)** T-185 [research] Research H22A2 vs H22A1 differences: detuning measures, emissions equipment, parts interchangeability -- full spec: docs/plans/03-h-series-variants.md @ T-185

## Summary

This research documents the differences between the Honda H22A2 (EDM, European 4th-gen Prelude BB1, 1993–1996) and H22A1 (USDM, US/Canadian/Australian 4th-gen Prelude BB1, 1993–1996). Key finding: the two engines are mechanically near-identical — same closed-deck block with FRM liners, 50 mm main journals, standard cam profiles (288°/308°, 11.38/10.54 mm lift), 10.0:1 compression, 60 mm throttle body, 51 mm exhaust, forged crank/rods/pistons. The 5 PS power deficit (185 PS vs 190 PS) is achieved almost entirely through ECU calibration — richer fuel maps, more conservative ignition timing, and higher EGR duty cycle — not hardware changes. Primary hardware differences are in emissions equipment (more restrictive catalytic converter for Euro 2, downstream O2 sensor on Euro 2 models, EU EVAP calibration). Parts interchangeability is very high for mechanical components; the main incompatibilities involve ECU basemaps and emissions sensors.

## Files Changed

- **`research/h-series/specifications/h22a2-vs-h22a1-differences.md`** — New research file documenting H22A2 vs H22A1 differences: hardware comparison table, detuning measures analysis, emissions equipment differences, complete parts interchangeability matrix, swap feasibility assessment, identification guide
- **`research/indexes/master-index.md`** — Updated Engine Variants section to include new H22A2 vs H22A1 research file
- **`research/indexes/variant-catalog.md`** — Updated H22A2 entry to include new research file
- **`STATE.md`** — Marked T-185 as done

## Commands Run

```
npm run typecheck && npm run lint && npm test && npm run format:check
```

Result: No code changes — this is a pure research task (markdown files only). No TypeScript code, no tests, no build step. Typecheck/lint/test/format are N/A.

## Manual Verification

1. **Research file written and reviewed:** `research/h-series/specifications/h22a2-vs-h22a1-differences.md` — verified all sections present (Summary, Hardware Comparison, Detuning Measures, Emissions Equipment Differences, Parts Interchangeability, Identification Guide, Sources, Notes, Citations, Appendix)
2. **Cross-referenced against existing research:** Compared findings against `h22a2-edm-origin.md`, `h22a2-specifications.md`, `h22a1-specifications.md`, `h22a1-usdm-detuning.md`, `h22a1-emissions-equipment.md`, and QWEN.md — all consistent
3. **Web search verification:** Confirmed key findings via tavily-search queries for "Honda H22A2 vs H22A1 differences", "Honda Prelude 2.2i VTEC European H22A2 USDM H22A1 swap parts compatibility", "H-Series Parts Compatibility Honda-Tech" — results consistent with documented findings
4. **Index files updated:** Verified master-index.md and variant-catalog.md entries added correctly
5. **STATE.md updated:** Verified T-185 marked as done

## Coverage Delta

N/A — this is a pure research task (markdown files only). No code changes, no tests, no measurable coverage delta.

## Follow-ups Discovered

None identified. This task completes the H22A2 research cluster (T-182 through T-185). The next H22A2 task is T-186 (European driving conditions) which is independent.

## Commit SHA(s)

TBD — pending commit and push to origin/main.

## DoD Checklist

1. **[x] Researched** — Information gathered from web sources (tavily search/extract: Wikipedia H-engine, Auto-Data.net, Devin's Honda Site, Scribd engine comparison, TorqueCars tuning guide, TunerGenix parts catalog) and local materials (QWEN.md component tables, existing H22A2/H22A1 research files). All claims cited with source URLs and retrieval timestamps.

2. **[x] Written** — Findings saved to `research/h-series/specifications/h22a2-vs-h22a1-differences.md`. File follows the template in `docs/plans/TEMPLATE.md` with all required sections (Summary, detailed content with tables, Sources with credibility ratings, Notes with conflicts/uncertainties, Citations, Appendix).

3. **[x] Indexed** — The relevant index files updated: `research/indexes/master-index.md` (Engine Variants section) and `research/indexes/variant-catalog.md` (H22A2 entry) both include links to the new research file.

4. **[x] Verified** — Cross-checked against multiple independent sources: QWEN.md component tables, Wikipedia, Auto-Data.net, Devin's Honda Site, Scribd engine comparison document, TorqueCars, TunerGenix. Conflicts noted (torque figure discrepancy 215 Nm vs 212 Nm from Ultimate Specs — resolved by accepting Auto-Data.net figure).

5. **[x] No swallowed errors** — N/A (no code changes).

6. **[x] Documentation in sync** — README.md and CLAUDE.md do not need updates (this task does not change behavior, flags, file layout, or conventions — it adds new research content).

7. **[x] STATE.md updated** — T-185 marked as done with date (2026-05-15) and commit SHA (pending).

8. **[x] CI green** — N/A (pure research task, no code changes).

9. **[x] No regressions** — N/A (no code changes).

10. **[x] Reviewable diff** — Single-purpose commit adding one research file and updating three index/state files. Conventional prefix `docs:`. No drive-by reformatting.
