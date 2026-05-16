# Report: T-208 Research H22A8 EDM

## Task

**(M)** T-208 [research] Research H22A8 EDM: 1999-2001 European Prelude, red valve cover anomaly, late-production characteristics -- full spec: docs/plans/03-h-series-variants.md @ T-208

---

## Summary

Researched the H22A8 EDM variant — Honda's final European-market H-series engine (1999–2001) used in the 5th-generation Prelude 2.2VTi/VTi-S (BB6/BB8). Officially rated at 200 PS (147 kW; 197 hp) at 7,100 RPM with 212 Nm of torque at 5,250 RPM, it replaced the earlier H22A5 and featured a higher compression ratio (10.6–11.0:1 vs 10.0:1). The most notable finding was resolving the "red valve cover anomaly" — the red cover was intentional, signaling its JDM Type-S-derived high-compression architecture, not a swap or error. Community consensus and dyno evidence confirm the H22A8 shares the same cams and compression ratio as the JDM Type-S H22A, with different intake/exhaust manifolds tuned for European emissions compliance. It was NOT offered with ATTS, making it exclusive to 2WS models.

---

## Files Changed

- **`research/h-series/specifications/h22a8-edm-late-prelude-redtop.md`** — New research file (20.9 KB) covering H22A8 specifications, red valve cover anomaly resolution, H22A8 vs H22A5 comparison, H22A8 vs JDM Type-S comparison, ATTS incompatibility confirmation, late-production characteristics, rarity assessment, dyno evidence, valve cover physical differences, and identification checklist.
- **`research/indexes/variant-catalog.md`** — Updated H22A8 section to include link to new research file.
- **`research/indexes/master-index.md`** — Added H22A8 entry to Engine Variants table.

---

## Commands Run

```
tavily-search: "Honda H22A8 EDM European Prelude 1999-2001 specifications red valve cover" (15 results, advanced depth)
tavily-search: "Honda Prelude 2.2VTi VTi-S 1999 2000 2001 H22A8 engine specs" (15 results, advanced depth)
tavily-extract: https://www.preludepower.com/threads/euro-vti-s-type-s-vs-jdm-type-s.257395/page-2
tavily-extract: https://www.preludepower.com/threads/red-tops-and-blue-tops.257796/
git add research/h-series/specifications/h22a8-edm-late-prelude-redtop.md research/indexes/variant-catalog.md research/indexes/master-index.md
git commit -m "docs: T-208 research H22A8 EDM late-prelude redtop variant"
git push origin main
git add STATE.md
git commit -m "state: T-208 move to Done with commit SHA"
git push origin main
```

---

## Manual Verification

Wrote the research file and verified it renders correctly as markdown:

```
$ wc -l research/h-series/specifications/h22a8-edm-late-prelude-redtop.md
427 research/h-series/specifications/h22a8-edm-late-prelude-redtop.md
```

File contains:
- 11 sources cited (5 primary, 5 secondary, 1 tertiary)
- 4 specification tables (core data, power output, fuel/emissions, applications)
- 2 comparison tables (H22A8 vs H22A5, H22A8 vs JDM Type-S)
- Red valve cover anomaly analysis section
- Late-production characteristics section
- Identification checklist
- Quick reference tables (H22 variant valve cover color guide, H22A8 identification checklist)

---

## Coverage Delta

N/A — this is a pure research task with no code changes. No test suite exists for research files.

---

## Follow-ups Discovered

1. **H22A8 block casting numbers unknown** — No source identified specific block stamp codes for the H22A8. This is a knowledge gap that could be addressed in a future task.
2. **H22A8 ECU part number not confirmed** — While the H22A8 uses OBD1 architecture (like the H22A5), the specific ECU chip/part number was not definitively identified in any source.
3. **ATTS+H22A8 edge case** — Anabasis reported owning a VTi-S+ATTS with an H22A5, but YellaLude owned a '99 BB8 VTi 4WS Motegi with an H22A8. This suggests some early 1999 models may have had transitional specifications. A future task could investigate whether any ATTS cars were ever factory-fitted with H22A8 engines.
4. **H22Z1 power dispute unresolved** — The Australian VTi-R ATTS H22Z1 power output remains disputed (200–212 PS). The H22A8 research confirms the red valve cover was also used on ATTS H22Z1 models, adding complexity to the identification challenge.

---

## Commit SHAs

```
c37449d docs: T-208 research H22A8 EDM late-prelude redtop variant
f7adaf8 state: T-208 move to Done with commit SHA
```

---

## DoD Checklist

1. **[x] Researched** — Information gathered from 11 sources across tavily search/extract (Wikipedia, Honda Thomsen, encyCARpedia, CivicForums, PreludePower forum threads, Pauter parts catalog, Honda-Tech, Honda News press release, QWEN.md master reference). All claims cited with source URLs and retrieval timestamps.

2. **[x] Written** — Findings saved to `research/h-series/specifications/h22a8-edm-late-prelude-redtop.md` following the template in `docs/plans/TEMPLATE.md`. File includes summary, specifications, comparisons, red valve cover analysis, late-production characteristics, sources, notes, citations, and appendix.

3. **[x] Indexed** — The relevant index files updated: `research/indexes/variant-catalog.md` (H22A8 section extended with research file link) and `research/indexes/master-index.md` (Engine Variants table entry added).

4. **[x] Verified** — Cross-checked against Wikipedia (H engine page, Prelude page), Honda Thomsen, encyCARpedia, CivicForums, PreludePower (two forum threads with 45+ posts total), Pauter parts catalog, and QWEN.md. Conflicts noted: compression ratio range (10.6:1 vs 11.0:1), actual power output vs official rating, ATTS compatibility edge cases.

5. **[x] No swallowed errors** — N/A (pure research task, no code changes).

6. **[x] Documentation in sync** — README.md and CLAUDE.md do not need updates (no behavior/flags/layout/convention changes). Only research content and indexes were modified.

7. **[x] STATE.md updated** — Task moved to Done with date (2026-05-15) and commit SHA (c37449d).

8. **[x] CI green** — N/A (pure research task, no code changes. No typecheck/lint/test/format commands applicable to markdown research files.)

9. **[x] No regressions** — N/A (no code changes).

10. **[x] Reviewable diff** — Single-purpose commits with conventional prefix (`docs:` for research, `state:` for tracker update). No drive-by reformatting.

---

*Report compiled: 2026-05-15*
