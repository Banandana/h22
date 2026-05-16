# Task T-164 Report — Research H22A Blacktop Reliability Record

## Task

- [ ] **(S)** T-164 [research] Research H22A Blacktop reliability record: compared to Redtop, known issues, longevity data -- full spec: docs/plans/03-h-series-variants.md @ T-164

## Summary

Comprehensive reliability research for the Honda H22A Blacktop (JDM 1992–2001), covering known failure modes, longevity data, and comparison to the Redtop variant. The research confirms that the Blacktop and Redtop are mechanically nearly identical in terms of reliability — they share the same FRM-lined block, forged bottom end, and all critical failure modes. The Blacktop's marginal advantages are lower compression (10.6:1 vs 11.0:1) providing ~3–5° more ignition advance margin before knock, a milder cam profile (288°/308° vs 306°/310°) reducing valve train stress, and regular-fuel compatibility (91 RON vs 98 RON premium). Key findings include: FRM oil consumption is universal across all H-series engines; the timing belt auto-tensioner is the single biggest catastrophic risk; community consensus from GRM/Honda-Tech/Attack Forums confirms 200,000+ km lifespans on stock examples; forced induction limits are ~6–8 psi on stock Blacktop bottom end.

## Files Changed

- **`research/h-series/reliability/h22a-blacktop-reliability.md`** (created) — Comprehensive reliability research file covering 8 known failure modes (FRM oil consumption, timing belt tensioner, VTEC solenoid gasket leaks, PCV system, cam seal leaks, valve adjustment, distributor O-ring leaks, water pump failures), longevity data (200k+ km stock, ChampCar endurance record), Blacktop vs Redtop reliability comparison table, forced induction boost limits, maintenance schedule, pre-purchase inspection checklist, and community consensus from 10+ sources.
- **`research/indexes/variant-catalog.md`** (updated) — Added new entry for h22a-blacktop-reliability.md in "New Research Files" section and updated H22A research file count from 3+ to 4+.
- **`research/indexes/master-index.md`** (updated) — Added h22a-blacktop-reliability.md entry to H-series reliability subsection.
- **`QWEN.md`** (updated) — Added entry 24l referencing the new reliability file in the Research Files section.

## Commands Run

No code compilation or test execution required — this is a pure research task (no code changes). Web research conducted via tavily-mcp search and extract against 10+ sources including GRM forum, Attack Forums, Honda-Tech, mywikimotors, MotorTrend, Facebook groups, PreludeOnline, NZHondas.com, and 6th Gen Accord DIY forum.

## Manual Verification

1. **Research file created and verified:**
   ```
   $ wc -l research/h-series/reliability/h22a-blacktop-reliability.md
   477 research/h-series/reliability/h22a-blacktop-reliability.md
   ```
   File contains 477 lines with 8 documented failure modes, 1 comparison table, longevity data, maintenance schedule, pre-purchase checklist, and 10 cited sources.

2. **Index files verified:**
   ```
   $ grep -c "h22a-blacktop-reliability" research/indexes/variant-catalog.md
   3
   $ grep -c "h22a-blacktop-reliability" research/indexes/master-index.md
   1
   $ grep -c "h22a-blacktop-reliability" QWEN.md
   1
   ```
   All three index files contain references to the new reliability file.

3. **Source cross-check:** All claims were verified against at least 2 independent sources where possible. Conflicts noted (e.g., oil consumption rate variance, timing belt tensioner lifespan range, boost limit estimates).

## Coverage Delta

N/A — this is a research task, not a code change. No test suite exists for markdown research files.

## Follow-ups Discovered

1. **T-165** — H22A Blacktop value proposition: used prices, cost of ownership, modification investment returns (already listed in STATE.md as next task)
2. **T-166** — Phase 3 checkpoint for H22A Blacktop research (already listed in STATE.md)
3. **Potential gap:** No dedicated research file on H22A Redtop longevity data (T-141 covers common issues but not lifespan statistics specifically). Could be spawned as a follow-on if needed.

## Commit SHA(s)

Pending — will be committed after task is moved to Done.

## DoD Checklist

- [x] **Researched** — Information gathered from 10+ online sources (tavily search/extract): GRM forum (ross2004, fidelity101, aw614, boxedfox, NickD, etc.), Attack Forums (Daemione), Honda-Tech (multiple threads), mywikimotors, MotorTrend FRM liner article, Facebook groups, PreludeOnline, NZHondas.com, 6th Gen Accord DIY forum. All claims cited with source URLs and retrieval timestamps.
- [x] **Written** — Findings saved to `research/h-series/reliability/h22a-blacktop-reliability.md` following the template in `research/template.md`. File includes Summary, Known Issues (8 failure modes), Longevity Data, Blacktop vs Redtop Comparison, Forced Induction Limits, Maintenance Schedule, Pre-Purchase Inspection Checklist, Community Consensus, Sources, Notes, Citations, and Appendix.
- [x] **Indexed** — The relevant index files under `research/indexes/` are updated: variant-catalog.md (new entry + H22A count update), master-index.md (reliability subsection entry).
- [x] **Verified** — Cross-checked against multiple independent sources where possible. Conflicts noted (oil consumption rate variance, tensioner lifespan range, boost limits). Blacktop vs Redtop reliability comparison confirmed as "essentially identical" across all sources.
- [x] **No swallowed errors** — N/A (research task, no code changes).
- [x] **Documentation in sync** — README.md and CLAUDE.md do not need updates (no behavior/flags/layout/convention changes). QWEN.md updated with new file reference. STATE.md will be updated with task completion.
- [ ] **STATE.md updated** — Pending commit. Will move task to Done archive with date + commit SHA.
- [ ] **CI green** — N/A (research task, no code changes. No typecheck/lint/test/format required.)
- [ ] **No regressions** — N/A (no code changes, no existing functionality affected.)
- [ ] **Reviewable diff** — Single-purpose commits. No drive-by reformatting. Commit messages follow conventional prefix (`docs:`, `chore:`).
