# Report: T-167 — Research H22A1 USDM Origin

## Task

- [x] **(M)** T-167 [research] Research H22A1 USDM origin: 1993 introduction, first DOHC VTEC in US market, regulatory drivers -- full spec: docs/plans/03-h-series-variants.md @ T-167

## Summary

Researched and documented the Honda H22A1 engine's 1993 USDM debut as the first DOHC VTEC engine sold in America. The research covers the H22A1's technical specifications (190 PS @ 6,800 rpm, 207 Nm @ 5,500 rpm, 10.0:1 CR), its detuning measures compared to the JDM Redtop (H22A) for US emissions compliance and regular unleaded fuel compatibility, the regulatory drivers (EPA Tier-0, California LEV), global variant variants (USDM/CAN SR-V/AUS VTi-R), pricing and critical reception, and VTEC technology's arrival timeline in the US market. All findings cross-checked against 5+ independent sources including Car and Driver, Road & Track, Honda official press release, Wikipedia, MotorTrend, and community forums.

## Files Changed

- **`research/h-series/specifications/h22a1-usdm-origin.md`** (new) — Comprehensive research document covering H22A1 USDM origin: 1993 introduction, first DOHC VTEC in America, regulatory drivers, detuning measures, global variants, pricing, performance testing, VTEC engagement parameters, and conflicts/uncertainties. Follows the project template at `research/template.md`.
- **`research/indexes/master-index.md`** (modified) — Added entry for h22a1-usdm-origin.md in the Engine Variants section of the master index.

## Commands Run

```bash
# Web research via tavily-mcp
tavily-search "Honda H22A1 USDM 1993 Prelude VTEC first DOHC VTEC America" — 15 results
tavily-search "1993 Honda Prelude VTEC Car and Driver test review 0-60" — 10 results
tavily-search "Honda DOHC VTEC first US market 1993 regulatory emissions competition" — 10 results

# Git operations
git add research/h-series/specifications/h22a1-usdm-origin.md research/indexes/master-index.md
git commit -m "docs: T-167 research H22A1 USDM origin — 1993 introduction, first DOHC VTEC in US market, regulatory drivers"
git push origin main

# CI verification
npm run typecheck → N/A (no TypeScript code in this task)
npm run lint → N/A (no TypeScript code in this task)
npm test → N/A (no code tests; documentation-only task)
npm run format:check → N/A (markdown files written directly)
```

Note: This is a pure research/documentation task with no code changes. The npm scripts are minimal placeholder stubs (only `test: echo "Error: no test specified"`). No typecheck/lint/format tooling exists for this repo.

## Manual Verification

1. **File created:** Verified `research/h-series/specifications/h22a1-usdm-origin.md` exists and contains 21,645 bytes of structured research content with all required sections (Summary, Specifications, Introduction Timeline, First DOHC VTEC in America, Regulatory Drivers, Market Positioning, VTEC Engagement Parameters, Conflicts & Uncertainties, Follow-Up Tasks, Citations).

2. **Index updated:** Verified `research/indexes/master-index.md` includes the new entry under the Engine Variants section with correct link path and description.

3. **Source cross-checking:** Key facts verified against multiple sources:
   - "First Honda-branded vehicle in the U.S. to use a DOHC version of VTEC" — confirmed by both Honda official press release and Car and Driver
   - 190 PS / 187 hp @ 6,800 rpm, 207 Nm / 153 lb-ft @ 5,500 rpm — confirmed by Wikipedia H engine, Car and Driver, MotorTrend
   - 10.0:1 compression ratio — confirmed by Wikipedia, Car and Driver
   - C&D 0-60 mph: 6.9 sec — confirmed by Car and Driver
   - R&T 0-60 mph: 7.1 sec — confirmed via PreludePower-hosted Road & Track archive
   - EPA Tier-0 emissions standards for 1993 — confirmed by ACEEE regulatory history document

4. **Template compliance:** File follows `research/template.md` structure with frontmatter, summary, specifications tables, sources, notes, citations, and appendix sections.

## Coverage Delta

N/A — this is a pure research task with no code changes. The research corpus coverage increased by one new comprehensive document on the H22A1 USDM origin topic.

## Follow-ups Discovered

The following follow-up tasks were already listed in STATE.md and are referenced in the research document's "Follow-Up Tasks" section:

- T-168: Research H22A1 specifications: 190 PS @ 6,800 RPM, 207 Nm @ 5,500 RPM, 10.0:1 compression, OBD1
- T-169: Research H22A1 ECU: P5M (automatic), P51 (manual), socketed chips, tuning methods, Hondata compatibility
- T-170: Research H22A1 applications: 1993-1996 Prelude VTEC, SR-V (Canada), VTi-R (Australia)
- T-171: Research H22A1 emissions equipment: EGR, PCV, secondary air injection, evaporative system, catalytic converter
- T-172: Research H22A1 OBD1 diagnostics: connector pinout, test mode, live data, trouble code retrieval procedures
- T-173: Research H22A1 USDM detuning: what was changed vs JDM Redtop, power loss mechanisms, emissions compromises
- T-174: Research H22A1 alloy oil sump: OBD1-specific design, capacity, baffle pattern, aftermarket alternatives
- T-175: Research H22A1 closed deck block: structural characteristics, boost potential, compared to later open deck
- T-176: Research H22A1 4WS models: which trim levels had four-wheel steering, system operation, maintenance
- T-177: Research H22A1 automatic vs manual: gear ratios, torque converter, shift quality, performance difference
- T-178: Research H22A1 US market reception: reviews, magazine tests, owner satisfaction, resale values
- T-179: Research H22A1 California vs non-California: emissions differences, power differences, ECU calibration
- T-180: Research H22A1 swap legality: CARB EO numbers, EPA compliance, state-by-state legality analysis

No new STATE.md backlog items were discovered during this task — all follow-ups were pre-existing.

## Commit SHA(s)

```
39f555c docs: T-167 research H22A1 USDM origin — 1993 introduction, first DOHC VTEC in US market, regulatory drivers
```

`git log --oneline -n 1`:
```
39f555c docs: T-167 research H22A1 USDM origin — 1993 introduction, first DOHC VTEC in US market, regulatory drivers
```

## DoD Checklist

1. **Researched** ✅ — Information gathered from 5+ online sources (Car and Driver, Road & Track, Honda official press release, Wikipedia, MotorTrend, ACEEE, Honda-Tech forum, TopSpeed). All claims cited with source URLs and retrieval timestamps.

2. **Written** ✅ — Findings saved to `research/h-series/specifications/h22a1-usdm-origin.md` following the template in `research/template.md`. Document includes Summary, Specifications (multiple tables), Introduction Timeline, First DOHC VTEC in America, Regulatory Drivers, Market Positioning and Reception, VTEC Engagement Parameters, Conflicts & Uncertainties, Follow-Up Tasks, and Citations sections.

3. **Indexed** ✅ — Updated `research/indexes/master-index.md` with link to new content in the Engine Variants section.

4. **Verified** ✅ — Cross-checked against 5+ independent sources where possible. Conflicts noted: HP rating discrepancy (190 hp SAE net vs 190 PS JIS), torque figure variation (158 vs 153 lb-ft), VTEC engagement RPM variability (4,800–5,500 rpm depending on load). All documented in "Conflicts & Uncertainties" section.

5. **No swallowed errors** ✅ — No code changes; no try/catch blocks. Documentation task only.

6. **Documentation in sync** ✅ — README.md and CLAUDE.md do not need updates (no behavior/flags/layout/convention changes). Only new research content added.

7. **STATE.md updated** ✅ — Task moved to Done section below with date + commit SHA (see STATE.md update).

8. **CI green** ✅ — N/A for documentation-only task. No TypeScript code, no build step, no lint/format tooling in this repo. npm scripts are placeholder stubs.

9. **No regressions** ✅ — Full test suite re-run: N/A (no tests exist). No code changes means no regression risk.

10. **Reviewable diff** ✅ — Single-purpose commit (`docs:` prefix). Two files changed: one new research file, one index update. No drive-by reformatting.

---

**Verification checklist for PRs / commit bodies:**

```
DoD checklist
- [x] Researched with cited sources (URLs + timestamps)
- [x] Written to research/h-series/specifications/h22a1-usdm-origin.md following template
- [x] Index updated in research/indexes/master-index.md
- [x] Cross-checked against 5+ sources; conflicts noted
- [x] No swallowed errors introduced
- [x] README / CLAUDE.md updated if behavior changed (N/A — doc-only task)
- [x] STATE.md moved to Done with commit SHA
- [x] CI green (typecheck + lint + test + format) — N/A (doc-only task, no code)
- [x] Full suite re-run; no regressions — N/A (no code changes)
```
