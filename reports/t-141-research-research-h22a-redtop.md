# Report: T-141 — Research H22A Redtop Common Issues

## Task

- [ ] **(S)** T-141 [research] Research H22A Redtop common issues: known failure modes, age-related wear, corrosion patterns -- full spec: docs/plans/03-h-series-variants.md @ T-141

## Summary

Comprehensive research on the Honda H22A Redtop (JDM 1992–1996) covering its documented failure modes, age-related wear patterns, and corrosion characteristics. The research identifies FRM (Fiber-Reinforced Metal) cylinder liner degradation as the single most critical issue — a design-era compromise that causes progressive oil consumption typically requiring full block resleeving. Eight additional failure modes were documented: VTEC solenoid gasket leaks (nearly universal on high-mileage examples), hydraulic timing belt auto-tensioner failure (acknowledged by Honda in service bulletin #01-010), valve stem seal deterioration, PCV system clogging, distributor O-ring leaks, head gasket failure (typically mod/heat-induced), coolant leaks via IACV, and cam/oil cooler gasket leaks. Age-related wear patterns were mapped across four mileage bands (0–80k km through 250k+ km), and corrosion patterns including internal coolant passage corrosion, external aluminum oxidation, and galvanic corrosion at dissimilar metal junctions were cataloged. The research includes a diagnostic decision tree, part numbers reference, and reliability assessment by application (stock NA: 8/10, boosted: 5/10, track/endurance: 7/10).

## Files Changed

- **`research/h-series/reliability/h22a-redtop-common-issues.md`** — New research file documenting H22A Redtop common issues: 10 failure modes with severity ratings, age-related wear progression tables, corrosion patterns, reliability assessment, diagnostic decision tree, and part numbers reference. Follows the template in `research/template.md`.
- **`research/indexes/master-index.md`** — Updated H-Series Reliability section to include link to new research file with description and status marker.

## Commands Run

This is a pure research task — no code changes. No typecheck/lint/test/format scripts exist in `package.json` (project is documentation-only).

```
$ cat package.json | grep -A5 '"scripts"'
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

No CI pipeline applies to this project. Verification was through manual cross-referencing of sources.

## Manual Verification

1. **Source verification:** Cross-checked all major claims against 10+ independent sources including MotorTrend professional technical analysis, Honda service bulletins (SB618958, #01-010), Honda-Tech forum consensus, Canadian Prelude Club technical guides, Grassroots Motorsports community discussion, BobIsTheOilGuy owner analyses, and QWEN.md master reference.

2. **Cross-reference consistency:** Verified that findings in the new file align with existing H-series reliability research:
   - T-052 (recall history): Confirms Honda used service bulletins instead of recalls — consistent with TSB data cited here.
   - T-053 (warranty periods): M6HA transmission warranty extension asymmetry noted in both files.
   - T-069 (service bulletins/TSBs): SB618958 honing procedure, #01-010 tensioner recognition, distributor O-ring leaks, VTEC solenoid gasket leaks, PCV system oil consumption — all confirmed and expanded upon in the new file.
   - QWEN.md §Block Materials (line 399–425): FRM composition and disadvantages match.
   - QWEN.md §Timing Belt Tensioner (line 894–903): Hydraulic auto-tensioner failure confirmed.

3. **Template compliance:** File follows `research/template.md` structure: Summary → Specifications (failure modes table) → Sources (primary/secondary) → Notes → Citations → Appendix (diagnostic decision tree, part numbers).

4. **Citation format:** All claims include source URL, retrieval timestamp (2026-05-15), and credibility assessment per `research/citations.md` standards.

## Coverage Delta

N/A — this is a documentation-only research project with no code changes. No measurable test coverage delta.

New content added to research corpus:
- 1 new research file (~27 KB)
- 10 documented failure modes with severity ratings
- 4 mileage-based wear progression bands
- 4 corrosion pattern categories
- 1 diagnostic decision tree
- 1 part numbers reference table
- 14 primary sources + 4 secondary sources cited

## Follow-ups Discovered

1. **H22A Blacktop common issues** — The same failure modes likely apply to the Blacktop variant but may differ in frequency/severity due to different operating parameters (lower RPM, lower compression). Should be researched separately as part of T-142's restoration context.

2. **H22A1 USDM common issues** — The US-market detuning (lower compression, different ECU) may affect failure mode profiles differently than JDM Redtop. Worth investigating for swap community relevance.

3. **FRM liner batch testing data** — No published data exists on which production batches had better/worse FRM quality. This remains an open question for the community. Could be a future research item if Honda manufacturing records become available.

4. **Aftermarket sleeve comparison** — RS Machine vs Darton vs Golden Eagle sleeves: no direct comparative testing data found. A future benchmark study would be valuable.

## Commit SHA(s)

Pending commit (will be recorded after push to origin/main).

## DoD Checklist

1. **[x] Researched** — Information gathered from 14 independent sources (tavily search/extract): MotorTrend, Honda service bulletins, Honda-Tech, Canadian Prelude Club, Grassroots Motorsports, BobIsTheOilGuy, Reddit r/hondaprelude, NZHondas.com, Facebook groups, mywikimotors, MOTOR Magazine, Center for Auto Safety, plus local QWEN.md cross-reference. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/reliability/h22a-redtop-common-issues.md` following the template in `research/template.md`. Structure: Summary → Specifications (failure modes) → Sources → Notes → Citations → Appendix.

3. **[x] Indexed** — `research/indexes/master-index.md` updated with link to new content in the H-Series Reliability section.

4. **[x] Verified** — Cross-checked against multiple independent sources where possible. Conflicts noted: e.g., VTEC engagement RPM varies 5,200–5,800 RPM across sources (noted in notes); FRM batch variance confirmed by multiple forum sources; oil consumption threshold debated (mywikimotors cites 0.5L/1000km as spec range, forum members report much higher consumption as normal).

5. **[x] No swallowed errors** — Not applicable (pure research, no code changes).

6. **[x] Documentation in sync** — README.md and CLAUDE.md do not need updates (no behavior/flags/layout/convention changes). STATE.md updated below.

7. **[ ] STATE.md updated** — Pending commit. Will move task to Done archive with date + commit SHA.

8. **[x] CI green** — Not applicable. This is a documentation-only research project. `package.json` contains no typecheck, lint, or format scripts. The placeholder test script will fail, but this is expected and documented.

9. **[x] No regressions** — No code changes; no regressions possible. Existing research files untouched.

10. **[x] Reviewable diff** — Single-purpose commit: two files changed (new research file + index update). Conventional prefix: `docs: add H22A Redtop common issues research (T-141)`. No drive-by reformatting.
