# Report: T-162 — Research H22A Blacktop Streetability

## Task

- [x] **(S)** T-162 [research] Research H22A Blacktop streetability: low-RPM torque, drivability, fuel economy, daily use characteristics -- full spec: docs/plans/03-h-series-variants.md @ T-162

## Summary

This research evaluates the Honda H22A Blacktop's suitability as a daily driver across four dimensions: low-RPM torque availability, overall drivability characteristics, real-world fuel economy, and everyday usability. The Blacktop's moderate cam profile (288°/308° vs. Redtop's 306°/310°), 10.6:1 compression ratio, single-runner intake, and 60 mm throttle body produce a broader, more tractable power band than the Redtop — at the cost of ~20 PS peak output. Real-world owner reports from multiple enthusiast forums confirm the Blacktop is fully daily-drivable, achieving 22–30+ mpg depending on driving style, with adequate low-end torque for stop-and-go traffic when paired with proper gear selection. The engine's lower compression also allows 91 RON regular unleaded fuel, making it more practical for daily use than the Redtop's 98 RON requirement. Overall streetability score: ★★★★☆ (4 out of 5).

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h22a-blacktop-streetability.md` | New research file covering low-RPM torque characteristics, drivability analysis, fuel economy data (EPA + real-world), daily-use scoring, swap viability, maintenance schedule, and Blacktop vs. Redtop comparison tables |
| `research/indexes/variant-catalog.md` | Added entry for h22a-blacktop-streetability.md in the Phase 3 Checkpoint new research files table |
| `STATE.md` | Marked T-162 as `[x] done` with commit SHA 9310c42 |

## Commands Run

This is a pure research task — no code changes. No npm commands applicable.

- **tavily-search:** 2 queries ("Honda H22A Blacktop streetability" and "Honda H22A Blacktop fuel economy") — 20 results total
- **tavily-extract:** 6 URLs extracted (Honda-Tech daily driver thread, SuperHonda low RPM thread, PreludeOnline HP/torque without VTEC thread, PreludeOnline MPG thread, PreludePower gas mileage thread, Honda-Tech gas mileage thread)
- **Web search cross-reference:** Wikipedia, mywikimotors, QWEN.md, Brian Crower catalog, Reddit r/hondaprelude, Reddit r/Honda
- **Local manual reference:** OBD1_H22A_Service_Manual.md (cross-referenced for fuel pressure specs, emission codes), BB6 Helms Manual OCR (cross-referenced for H22A4 specifications)

## Manual Verification

Research file written to `research/h-series/specifications/h22a-blacktop-streetability.md` (27,268 bytes). Verified by:

1. **Source count:** 12 unique sources cited (6 primary, 6 secondary) with URLs and retrieval timestamps
2. **Cross-source agreement:** Low-RPM torque estimates corroborated by 3 independent forum threads (Honda-Tech, SuperHonda, PreludeOnline). Fuel economy data corroborated by 8 independent owner reports spanning 2002–2014.
3. **Conflict documentation:** 5 conflicts/disputes explicitly noted in the Notes section (low-RPM torque quantification, H23 vs. Blacktop comparison, VTEC engagement RPM, fuel economy variance, power loss without VTEC)
4. **Template compliance:** File follows `research/template.md` format with Summary, Specifications (tables), Sources, Notes, Citations, and Appendix sections
5. **Index update:** variant-catalog.md updated with new file entry in the Phase 3 Checkpoint table
6. **Cross-references:** File references existing research files (h22a-blacktop-specifications.md, h22a-blacktop-camshaft-profiles.md, h22a-redtop-specifications.md) for comparative data

## Coverage Delta

N/A — this is a new research file, not a modification to existing code or documentation. The file adds approximately 27 KB of new content covering a previously undocumented topic (Blacktop streetability).

## Follow-ups Discovered

The following potential backlog items were identified during research but not acted upon in this task:

1. **Dyno data gap:** No published dynamometer data isolates the Blacktop's torque curve below VTEC engagement. All low-RPM torque figures are reconstructed from forum consensus. A formal dyno session (or finding one that already exists) would strengthen the data significantly.
2. **JC08 fuel economy data:** EPA figures are available for USDM variants, but JC08 cycle data for JDM Blacktop-equipped Preludes was not found in any consulted source. This would be valuable for Japanese market context.
3. **Owner survey:** No systematic owner survey exists for Blacktop daily-driving satisfaction. Anecdotal evidence from forums is useful but not statistically robust.
4. **H22A Blacktop reliability record (T-164):** This follow-on task should examine oil consumption rates, timing belt tensioner failure frequency, and FRM liner longevity specific to Blacktop examples.

## Commit SHA(s)

```
9310c42 docs: T-162 Research H22A Blacktop streetability — low-RPM torque, drivability, fuel economy, daily use characteristics
```

`git log --oneline -3`:
```
9310c42 docs: T-162 Research H22A Blacktop streetability — low-RPM torque, drivability, fuel economy, daily use characteristics
0169f66 docs: T-161 H22A Blacktop vs Redtop comparison — power, torque, character, which is better
43e187e infra: T-013 Catalog all H-series variant codes mentioned in local materials
```

## DoD Checklist

From STATE.md Definition of Done:

1. **Researched** — ✅ Information gathered from online sources (tavily search/extract from 6+ URLs across Honda-Tech, SuperHonda, PreludeOnline, PreludePower, Reddit), local manuals (OBD1_H22A_Service_Manual.md, BB6 Helms Manual OCR), and compiled reference (QWEN.md). All claims cited with source URLs and retrieval timestamps.

2. **Written** — ✅ Findings saved to `research/h-series/specifications/h22a-blacktop-streetability.md`. File follows the template in `research/template.md` with Summary, Specifications (tables), Sources, Notes, Citations, and Appendix sections.

3. **Indexed** — ✅ The relevant index file `research/indexes/variant-catalog.md` is updated with a link to the new content in the Phase 3 Checkpoint new research files table.

4. **Verified** — ✅ Cross-checked against 6+ independent sources where possible. Conflicts noted in the Notes section (5 conflicts documented with working assumptions). Low-RPM torque estimates corroborated by 3 independent forum threads. Fuel economy data corroborated by 8 independent owner reports.

5. **No swallowed errors** — ✅ N/A for research task. No code changes made.

6. **Documentation in sync** — ✅ README / CLAUDE.md not updated — task does not change behavior, flags, file layout, or conventions. Only adds new research content.

7. **STATE.md updated** — ✅ Task moved to Done with date (2026-05-15) and commit SHA (9310c42). Follow-up items noted in the report's "Follow-ups Discovered" section.

8. **CI green** — ✅ N/A — no code changes. No npm commands to run.

9. **No regressions** — ✅ N/A — no code changes. Full test suite not applicable to research-only task.

10. **Reviewable diff** — ✅ Single-purpose commit with conventional prefix (`docs:`). No drive-by reformatting. Only 3 files changed with focused additions.

---

**Blocker:** None. Task completed successfully.
