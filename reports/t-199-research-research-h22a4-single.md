# Report: T-199 — H22A4 Single Runner Intake Research

## Task

- [x] **(M)** T-199 [research] Research H22A4 single runner intake: vs dual runner, plenum volume, power band characteristics -- done 2026-05-15, sha 31136a6 -- full spec: docs/plans/03-h-series-variants.md @ T-199

## Summary

Completed comprehensive research on the H22A4 single runner intake manifold system used in 1997–2001 USDM/5th gen Honda Prelude (BB6). The research documents the single runner architecture (one large runner per cylinder feeding a common plenum) and compares it against the H22A Redtop dual runner design (two smaller runners per cylinder with divided plenum). Key findings include the H22A4's IAB (Intake Air Bypass) secondary butterflies opening at ~4,900 RPM, peak torque at 5,250 RPM (broader mid-range vs Redtop's 6,500 RPM), estimated ~800 ml plenum volume, and variant mapping showing three H-series engines using single runner design (H22A4, H22A7, H22Z1). Aftermarket options and tuning implications are documented with specific product data.

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h22a4-single-runner-intake.md` | **New** — Comprehensive research document covering H22A4 single runner intake architecture, dual runner comparison (H22A Redtop), plenum volume estimates, power band characteristics, variant mapping, tuning implications, and aftermarket options |
| `docs/plans/03-h-series-variants.md` | Added T-199 through T-204 task definitions to Phase 3 plan doc (T-199 as primary task, T-200–T-204 as follow-on tasks for H22A4 research) |
| `research/indexes/master-index.md` | Added entry for `h22a4-single-runner-intake.md` under H-Series Technical Specifications |
| `STATE.md` | Moved T-199 from `[ ]` open to `[x]` done with date + commit SHA |

## Commands Run

This is a pure research/documentation task — no code changes. No npm typecheck/lint/test/format commands applicable.

Research conducted via tavily_search and tavily_extract across multiple source categories:
- Community forums (Honda-Tech, PreludePower, HP Academy, Facebook Honda H22/Prelude groups)
- Manufacturer product pages (Skunk2, CNC Innovations, Golden Eagle Mfg)
- Technical documentation (StudioVRM race car development logs, YouTube technical demonstrations)

## Manual Verification

Verified research file exists and contains complete content:
```
$ wc -l research/h-series/specifications/h22a4-single-runner-intake.md
  429 research/h-series/specifications/h22a4-single-runner-intake.md
```

Verified master index updated:
```
$ grep h22a4-single-runner research/indexes/master-index.md
| [`h22a4-single-runner-intake.md`](../h-series/specifications/h22a4-single-runner-intake.md) | ...
```

Verified STATE.md updated:
```
$ grep T-199 STATE.md
- [x] **(M)** T-199 [research] Research H22A4 single runner intake: ... -- done 2026-05-15, sha 31136a6
```

Verified plan doc updated with T-199 section:
```
$ grep "### T-199" docs/plans/03-h-series-variants.md
### T-199
```

All four deliverables confirmed present and correct.

## Coverage Delta

N/A — This is a pure documentation/research task with no code changes. No test suite or coverage metrics applicable.

## Follow-ups Discovered

No new follow-up tasks discovered during this research. The existing T-200 through T-205 task chain in STATE.md covers remaining H22A4 research topics (OBD2 diagnostics, trim comparison, 5th gen redesign, main journal increase, market reception, checkpoint).

## Commit SHA(s)

```
31136a6 docs: T-199 H22A4 single runner intake research + plan doc entries T-199 through T-204
```

Full log:
```
$ git log --oneline -n 3
31136a6 docs: T-199 H22A4 single runner intake research + plan doc entries T-199 through T-204
07e84e3 docs: T-198 H22A4 ATTS research + plan doc entries T-196, T-198
f5e9146 docs: T-192 H22A3 collector status research completed
```

## DoD Checklist

From STATE.md Definition of Done:

1. **Researched** — ✅ Information gathered from online sources (tavily search/extract across 6+ searches covering Honda-Tech, PreludePower, HP Academy, manufacturer pages, Facebook community groups, StudioVRM). All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **Written** — ✅ Findings saved to `research/h-series/specifications/h22a4-single-runner-intake.md` (429 lines, 25,626 bytes). File follows the template in `docs/plans/TEMPLATE.md` with Summary, detailed sections with tables, Sources (Primary/Secondary/Tertiary with credibility ratings), Notes (Conflicts & Uncertainties, Key Takeaways, Implications for Building/Modding), Citations, and Appendix sections.

3. **Indexed** — ✅ Master index at `research/indexes/master-index.md` updated with link to new file under H-Series Technical Specifications section.

4. **Verified** — ✅ Cross-checked against multiple independent sources where possible:
   - Plenum volume (~800 ml): HP Academy forum + general H-series community references
   - IAB activation RPM (4,900 RPM): Honda-Tech spec sheet + PreludePower forum discussions
   - Power band data (200 PS @ 7,000 RPM / 212 Nm @ 5,250 RPM): Honda-Tech spec sheet + Wikipedia H engine chart + JM specifications chart
   - Physical differences (thinner profile): Facebook community photo discussion
   - Aftermarket options: Skunk2 product pages + CNC Innovations + Golden Eagle Mfg
   - Conflicts noted: Plenum volume figures are estimates (Honda does not publish official values); IAB activation RPM varies by source (4,800–4,900 RPM); H22A7/H22Z1 intake specifics poorly documented.

5. **No swallowed errors** — ✅ No code changes made; no error handling involved.

6. **Documentation in sync** — ✅ README.md and CLAUDE.md do not need updating (task does not change behavior, flags, file layout, or conventions). Only STATE.md, plan doc, and research files affected.

7. **STATE.md updated** — ✅ Task moved to Done with `[x]` marker, date (2026-05-15), and commit SHA (31136a6).

8. **CI green** — ✅ N/A — Pure documentation task, no code changes. No typecheck/lint/test/format commands applicable.

9. **No regressions** — ✅ N/A — No code changes; no regression risk.

10. **Reviewable diff** — ✅ Single-purpose commits. Conventional prefix (`docs:`). No drive-by reformatting. Three files changed with clear, focused purposes.

---

*Report generated: 2026-05-15*
*Task completed: T-199 [research] H22A4 single runner intake*
