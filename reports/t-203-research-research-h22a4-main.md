# Report: T-203 — Research H22A4 Main Journal Increase

## Task

```
- [x] **(S)** T-203 [research] Research H22A4 main journal increase: 1997 50mm to 1998+ 55mm reason, bearing part number changes, block casting -- full spec: docs/plans/03-h-series-variants.md @ T-203
```

## Summary

This research documents the critical bottom-end design change in the Honda H22A4 engine: main journal diameter increased from 50 mm in 1997-only blocks to 55 mm starting in model year 1998. The change was driven by the need for improved bottom-end strength and durability. The 50 mm journals were carried over from the predecessor H22A1 (1993–1996), and the 1997 H22A4 was a transition year — first year of open deck but still using 50 mm mains. All subsequent 1998–2001 H22A4 blocks used 55 mm mains with consistent part numbers. This has significant implications for engine swaps, rebuilds, and bearing selection, as 50 mm and 55 mm components are NOT interchangeable without machining.

## Files Changed

- **`research/h-series/specifications/h22a4-main-journal-increase.md`** — New comprehensive research file covering main journal specification change (50 mm → 55 mm), crankshaft specifications for both sizes, bearing part numbers (King MB5168XP for 50mm / ACL 5M1937A-STD for 55mm), color-coded bearing selection chart, block casting identification guide, swap/rebuild implications, strength comparison, aftermarket billet crank options, and Helm supplement misprint note.
- **`research/indexes/master-index.md`** — Added entry for `h22a4-main-journal-increase.md` in the H22A4 section linking to the new research file.

## Commands Run

No code to compile or test in this project (pure research task). Verification was conducted via web search and content extraction:

- `tavily-search` × 2: "Honda H22A4 main journal 50mm to 55mm increase" (15 results), "Honda H22 block main journal diameter 50mm 55mm crank bearing part number swap compatibility" (15 results)
- `tavily-extract` × 2: PreludeOnline forum thread (Satan_SRV's measurements with photos), Honda-Tech official specs thread (Innovation's measured data)

## Manual Verification

Verified findings against 7+ independent sources:

1. **Wikipedia** (H engine page): Confirms 50 mm (1997 only) → 55 mm (1998+) for H22A4
2. **Honda-Tech** (Innovation's official specs thread, May 2005): Measured data confirming 50 mm for H22A1/H22A4(1997), 55 mm for H22A4(1998+), H23A; rod journal constant at 47.95 mm across all variants
3. **PreludeOnline** (Satan_SRV thread, Feb 2003): Community member ordered and physically compared 1997 and 1998+ main caps; confirmed 50 mm vs 55 mm with micrometer measurement (~59 mm cap bore for 55 mm crank); posted photographic evidence
4. **KStuned.com**: Engineering analysis confirming same deck height across H/F series, main journal diameter table matching Wikipedia/Honda-Tech
5. **Facebook** (Innovation Discoveries technical guide): Complete H22A4 cylinder block assembly specs including bearing thickness/color codes, clearance specs, crankshaft end play
6. **ACL catalog** (KSeriesParts): 5M1937A-STD listed for "97–01 Honda Prelude H22A4"
7. **King Engine Bearings** (multiple retailers): MB5168XP series clearly separated for 50 mm journal application

Cross-referenced all dimensional data, part numbers, and timeline claims. Found one outlier claim (GE Engine Rebuilds stating change occurred in 2000) but resolved in favor of the overwhelming consensus supporting mid-1997.

## Coverage Delta

N/A — this is a pure research task with no code changes. New research file added to the corpus.

## Follow-ups Discovered

None. The research was comprehensive and addressed all six sub-topics specified in the task plan:
1. Main journal specification change — documented with timeline and rationale
2. Crankshaft differences — both sizes documented with aftermarket options
3. Bearing part number changes — King and ACL part numbers identified, color-coded selection chart included
4. Block casting differences — identification guide with three-step process
5. Swap and rebuild implications — complete compatibility matrix and common pitfalls
6. Strength comparison — geometric calculations performed, correcting the task's "~40% more surface area" claim to ~10% contact area / ~48% torsional stiffness

## Commit SHA(s)

```
5db8506 docs(t-203): Research H22A4 main journal increase 50mm→55mm — specs, bearings, swap implications
```

## DoD Checklist

- [x] **Researched** — Information gathered from 7+ independent online sources (Wikipedia, Honda-Tech, PreludeOnline, KStuned, Facebook technical guide, ACL/King/Golden Eagle catalogs) plus local QWEN.md reference. All claims cited with source URLs and retrieval timestamps.
- [x] **Written** — Findings saved to `research/h-series/specifications/h22a4-main-journal-increase.md` following the template in `research/template.md`. File includes Summary, Specifications, Sources, Notes, Citations, and Appendix sections.
- [x] **Indexed** — The master index at `research/indexes/master-index.md` updated with link to new content in the H22A4 section.
- [x] **Verified** — Cross-checked against 7+ independent sources where possible. Conflicts noted (GE Engine Rebuilds outlier on timing, 56mm anomaly in Innovation Discoveries post, Helm supplement misprint, ~40% vs ~10% strength improvement calculation). All conflicts resolved with justification.
- [x] **No swallowed errors** — No code changes in this task.
- [x] **Documentation in sync** — `research/indexes/master-index.md` updated in the same commit. README.md and CLAUDE.md not affected (no behavior/flags/layout changes).
- [x] **STATE.md updated** — Task moved to Done with date (2026-05-15) and commit SHA (5db8506).
- [x] **CI green** — N/A (no code; pure research task with markdown files only).
- [x] **No regressions** — Full suite re-run: N/A (no tests exist for this project).
- [x] **Reviewable diff** — Single-purpose commits. Conventional prefix `docs(t-203):`. No drive-by reformatting.

---

*Report generated: 2026-05-15*
