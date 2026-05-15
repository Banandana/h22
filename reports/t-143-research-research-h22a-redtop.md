# T-143 Report: H22A Redtop Track Day Viability

## Task

- [x] **(S)** T-143 [research] Research H22A Redtop track day viability: reliability on track, cooling capacity, tire wear, brake fade -- done 2026-05-15, sha 6a7e9c0 -- full spec: docs/plans/03-h-series-variants.md @ T-143

## Summary

This research evaluates the Honda H22A Redtop engine and its host chassis (4th gen Prelude BB1/BB2/BB4, 1992–1996) for track day use across four dimensions: engine reliability under sustained high-RPM operation, cooling system adequacy, tire wear characteristics, and brake fade resistance. The H22A Redtop is fundamentally sound for moderate track use — proven in ChampCar endurance racing (12-hour runs documented), JTCC competition (1996–1997 championship-winning engine family), and HPDE track days — but requires specific upgrades for repeated hard use. Key findings: the FRM-lined block is reliable at stock power levels but oil consumption is inevitable; the stock cooling system handles occasional track sessions but an upgraded radiator and oil cooler are strongly recommended for regular use; the Prelude's balanced chassis with double-wishbone suspension provides excellent mechanical grip but 15" OEM wheels and 205/55R15 tires limit ultimate cornering potential; and the VTEC-model brake upgrade (11.1" front rotors, Vigor-derived calipers) is adequate for street-to-track but fades under repeated hard laps without track-grade fluid and pads.

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h22a-redtop-track-day-viability.md` | New research file — comprehensive track day viability analysis covering engine reliability, cooling capacity, tire wear, brake fade, real-world track data, failure modes, upgrade path, and final verdict |
| `research/indexes/master-index.md` | Added entry for h22a-redtop-track-day-viability.md in the Technical Specifications section |
| `docs/plans/03-h-series-variants.md` | Added T-143 section with full task description, dependencies, spawns, and DoD notes |

## Commands Run

This is a pure research task — no code changes. No typecheck/lint/test/format commands applicable.

Web research performed via tavily-mcp:
- `tavily-search "Honda H22A Redtop engine track day reliability cooling performance"` — 10 results
- `tavily-search "Honda H22A Redtop track day cooling system overheating endurance racing ChampCar endurance"` — 10 results
- `tavily-search "Honda Prelude H22 track day tire wear brake fade performance handling autocross"` — 10 results
- `tavily-search "Honda H22 engine oil cooling track racing reliability ChampCar Grassroots Motorsports endurance"` — 10 results
- `tavily-search "Honda Prelude BB1 BB6 track day cooling upgrade radiator oil cooler setup recommendation"` — 8 results
- `tavily-search "Honda Prelude 4th gen 5th gen track handling characteristics cornering grip tire wear pattern autocross"` — 8 results
- `tavily-extract` on GRM forum thread (Grassroots Motorsports — "What happened to the H22 engine?") — extracted full discussion including ChampCar 12-hour endurance report
- `tavily-extract` on Honda-Tech forum thread ("Prelude and H22 Reliability") — extracted 14 posts of owner experiences
- `tavily-extract` on PreludeOnline thread ("Prelude SH Set Up For Track") — extracted track setup advice

## Manual Verification

**Research file validation:**
```
$ wc -l research/h-series/specifications/h22a-redtop-track-day-viability.md
   546 research/h-series/specifications/h22a-redtop-track-day-viability.md
```

**Content verification — key sections present:**
- Summary: ✅ One-paragraph overview with key conclusions up front
- Engine Reliability on Track: ✅ Stock bottom end durability table, documented track endurance events (ChampCar 12-hour, JTCC, BTCC), oil consumption analysis, timing belt tensioner critical failure mode, oil system vulnerabilities
- Cooling System Capacity: ✅ Stock cooling system analysis table, cooling performance under track load, recommended upgrades by priority (aluminum radiator, oil cooler, silicone hoses, fan switch, race coolant), oil temperature management with/without oil cooler
- Tire Wear Characteristics: ✅ OEM tire specifications table, FWD wear pattern analysis, track tire recommendations by use case (HPDE vs autocross vs time attack), tire size upgrades for track use, chassis advantage documentation
- Brake Fade Resistance: ✅ Stock brake system for track use table, brake fade progression timeline with measured rotor temps (270–280°C after 30 min from Honda-Tech), brake upgrade cost-effective approach
- Real-World Track Performance Data: ✅ Acceleration/lap times table, endurance racing record, autocross capability evidence
- Track-Day Readiness Checklist: ✅ Pre-session inspection items, recommended upgrade path by stage (Stage 0 through Stage 3)
- Known Failure Modes Under Track Conditions: ✅ 8 failure modes with triggers, symptoms, and prevention
- Comparative Assessment: ✅ H22A Redtop vs B18C vs K20A for track use
- Overall Viability Assessment: ✅ Strengths (6), Weaknesses (6), Final Verdict with 5 requirements
- Sources: ✅ 15 sources (8 primary, 7 secondary) with URLs, retrieval dates, credibility assessments
- Citations: ✅ 10 full citation entries with author, title, publication, date, URL, timestamp, credibility
- Appendix: ✅ Track session temperature tracking template, upgrade priority decision tree, oil temperature estimation formula

**Source cross-reference verification:**
- ChampCar 12-hour endurance report confirmed via GRM forum (ross2004, 2018-03-21) — "never skipped a beat, although it did drink some oil"
- Honda-Tech brake temp measurements confirmed (270–280°C after 30 min)
- QWEN.md motorsport history cross-referenced (JTCC 1996–1997 championships, BTCC 1995–1997)
- PreludeOnline Big Brake Guide referenced for brake bias calculations and component data
- All numerical claims cited with source attribution

## Coverage Delta

n/a — This is a new research file, not a modification of existing code or tests. The research corpus coverage expanded by one new topic area (track day viability) within the H22A Redtop specifications subdirectory.

## Follow-ups Discovered

The following potential follow-up tasks were identified during research but not added to STATE.md as they are either covered by existing backlog items or require additional validation before formal task creation:

1. **T-144 (Drag racing potential)** — Research already touched on drag racing context (H22A was used in drag CRX builds by Steph Papadakis and Jeremy Lookofsky in the '90s, N/A 9-second quarter-mile times achievable). This is the next sequential task in STATE.md.

2. **Oil temperature instrumentation gap** — No published instrumentation data exists for actual oil temperatures during H22A track sessions. The report estimates using a coolant-temp proxy formula (Oil Temp ≈ Coolant Temp × 1.1 + 5°C). An actual oil temperature sender would provide accurate readings. This could be a future research task if quantified data becomes available.

3. **Lap-time delta study** — No published data exists comparing stock vs Stage 1 upgraded Preludes on track. A future empirical study (or compilation of community-reported lap times) could fill this gap.

4. **H22A7 cooling comparison** — The Accord Type R CH1 (H22A7, 212 PS) shares similar components with the Redtop. A direct cooling system comparison between the two variants would be valuable but was out of scope for this task.

## Commit SHA(s)

```
234467e docs: T-143 Move to Done in STATE.md (sha 6a7e9c0)
6a7e9c0 docs: T-143 Research H22A Redtop track day viability — reliability, cooling, tire wear, brake fade
```

## DoD Checklist

1. **Researched** — ✅ Information gathered from 15 sources (8 primary, 7 secondary) via tavily search/extract and local QWEN.md/manual references. All claims cited with source URLs and retrieval timestamps.

2. **Written** — ✅ Findings saved to `research/h-series/specifications/h22a-redtop-track-day-viability.md` (546 lines, ~33 KB). File follows the template in `research/template.md` with Summary, Specifications, Sources, Notes, Citations, and Appendix sections.

3. **Indexed** — ✅ The master index at `research/indexes/master-index.md` updated with link to new content in the Technical Specifications → H-Series Research section.

4. **Verified** — ✅ Cross-checked against multiple independent sources where possible. Conflicts noted in the Notes section (oil consumption severity variance, timing belt lifespan outlier, 4WS effectiveness split). QWEN.md motorsport history cross-referenced against GRM forum firsthand accounts.

5. **No swallowed errors** — ✅ No code changes introduced. Research methodology applied consistently. All uncertainties clearly labeled (inferred vs measured data).

6. **Documentation in sync** — ✅ README.md and CLAUDE.md do not need updates — this task does not change behavior, flags, file layout, or conventions. Only adds new research content.

7. **STATE.md updated** — ✅ Task moved to Done section with date (2026-05-15) and commit SHA (6a7e9c0). No stale `[~]` markers left.

8. **CI green** — ✅ Not applicable — this is a pure research task with no code changes. No npm scripts to run.

9. **No regressions** — ✅ No code changes means no possibility of regression. Only new files added, existing files modified only for index updates.

10. **Reviewable diff** — ✅ Single-purpose commits: (1) research file + index + plan doc update, (2) STATE.md update. Commit messages follow conventional prefix (`docs:`). No drive-by reformatting.

---

**Verification checklist for PRs / commit bodies:**

```
DoD checklist
- [x] Researched with cited sources (URLs + timestamps)
- [x] Written to research/h-series/specifications/h22a-redtop-track-day-viability.md following template
- [x] Index updated in research/indexes/master-index.md
- [x] Cross-checked against 2+ sources; conflicts noted
- [x] No swallowed errors introduced
- [x] README / CLAUDE.md updated if behavior changed — N/A (no behavior change)
- [x] STATE.md moved to Done with commit SHA
- [x] CI green (typecheck + lint + test + format) — N/A (pure research, no code)
- [x] Full suite re-run; no regressions — N/A (no code changes)
```
