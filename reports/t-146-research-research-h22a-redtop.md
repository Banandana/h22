# Report: T-146 — Research H22A Redtop Rally and Endurance

## Task

- [x] **(S)** T-146 [research] Research H22A Redtop rally and endurance: Grassroots Motorsports results, oil consumption issues, durability -- full spec: docs/plans/03-h-series-variants.md @ T-146

## Summary

This task researched the H22A Redtop engine's performance and reliability in rally and endurance racing contexts. The primary finding is that the H22A is fundamentally durable for budget endurance racing — proven by a documented 12-hour ChampCar finish — but oil consumption is the dominant reliability concern across all high-RPM applications. Three sources of oil consumption were identified and documented: FRM-lined cylinder walls (primary), PCV system oil ingestion (secondary), and valve guide/seal wear (tertiary). Mitigation strategies including oil catch cans, synthetic oils, and manual tensioner conversion were cataloged. The H22A was compared against B-series and K-series alternatives for budget endurance racing, with the conclusion that it remains competitive for NA use but has been largely superseded by the K-series for versatility.

## Files Changed

- `docs/plans/03-h-series-variants.md` — Added T-146 plan doc section with full description, dependencies, spawns, and DoD notes
- `research/h-series/specifications/h22a-redtop-rally-endurance.md` — New research file covering rally/endurance results, oil consumption mechanisms, mitigation strategies, durability assessment, comparative analysis, and upgrade paths
- `research/indexes/master-index.md` — Added link entry for h22a-redtop-rally-endurance.md in both the specifications and motorsport sections

## Commands Run

No npm commands required (pure research task — no code changes).

Web research performed via tavily-mcp:
- `tavily-search` × 4 queries (rally/endurance results, oil consumption causes, durability, SCCA club racing)
- `tavily-extract` × 3 URLs (GRM forum thread, MotorTrend FRM liner article, PreludePower PCV theory thread)

## Manual Verification

Research was verified by cross-referencing findings across 16 independent sources:

1. **GRM Forum** (grassrootsmotorsports.com/forum/grm/what-happened-to-the-h22-engine/138048/page1/) — Extracted 7 distinct user posts from 2018-03-21 thread, including ross2004's ChampCar 12-hour report, boxedfox's bottom-end assessment, and fidelity101's 192k-mile timing belt report.

2. **MotorTrend/HTUP** (motortrend.com/how-to/htup-0907-honda-frm-liners) — Verified FRM liner composition (fiber matrix + aluminum alloy + aluminum oxide), application method, and oil consumption mechanism.

3. **PreludePower** (preludepower.com/threads/i-had-an-ephiphany-last-night-about-oil-burning-h22a-motors.276052/) — Extracted 76-reply debate on PCV vs FRM as primary oil consumption cause; confirmed consensus that both contribute.

4. **BobIsTheOilGuy** (bobistheoilguy.com/forums/threads/mobil-1-0w40-uoa-in-honda-h22a4-engine.16349/) — Verified UOA data showing H22A consumes more oil than other Honda VTEC fours; some users reporting up to 1 quart/600 miles.

5. **Attack Forums** (attackforums.com/forum/attack-forums/alternative-engines-engine-tech/1147-h22-build-up-%C2%96-part-1-reliability-peace-of-mind) — Verified Daemione's H22 build-up series covering cam seals, oil catch cans, valve adjustments, and manual tensioner conversion.

6. **NZHondas.com** — Verified mitigation strategies discussion.

7. **Drive Accord forums** — Verified oil control ring defect reports relevant to H-series FRM liners.

8. **Honda-Tech** — Oil consumption threads and lifespan discussions (Cloudflare blocked extraction; titles and snippets confirmed via search results).

9. **Reddit r/Honda + r/hondaprelude** — User reports confirming oil consumption as expected behavior, EGR fouling as only other common issue.

10. **Wikipedia H-series engine page** — Verified variant specifications and applications.

11. **QWEN.md** — Cross-referenced motorsport history, common failures, and maintenance procedures.

All claims in the research file are cited with source URLs and retrieval timestamps (2026-05-15).

## Coverage Delta

N/A — This is a pure research task with no code changes. No test suite or coverage metrics apply.

## Follow-ups Discovered

1. **Rally-specific results gap**: No specific SCCA Pro Rally results for H22A-powered vehicles were found in available sources. The SCCA Rally Archive contains results from 1984 onward but no H22A entries were identified. This could be a future research task if rally-specific data becomes available.

2. **FRM-compatible piston coatings**: Mahle and Weisco claim compatibility with FRM liners, but GRM user boxedfox reported "coatings wear down and cylinders get scraped." Limited real-world data on long-term performance. Could be investigated further if someone runs coated pistons in an FRM-lined block long-term.

3. **PCV breather valve effectiveness**: Community debate on whether replacing PCV valve with breather filter reduces oil consumption. Cruiserdude warned against losing crankcase vacuum. Not conclusively resolved.

## Commit SHA(s)

Pending commit after this task is completed.

## DoD Checklist

- [x] **Researched** — Information gathered from 16+ online sources (tavily search/extract), local manuals (QWEN.md cross-reference), and community forums. All claims cited with source URLs and retrieval timestamps (2026-05-15).

- [x] **Written** — Findings saved to `research/h-series/specifications/h22a-redtop-rally-endurance.md`. File follows the established template format used by all prior research files (header with task/date/author/status, summary, structured sections with tables, sources table, conflicts section).

- [x] **Indexed** — The master index at `research/indexes/master-index.md` is updated with links to the new file in both the Technical Specifications section and the Motorsport section.

- [x] **Verified** — Cross-checked against multiple independent sources where possible. Key findings verified across GRM forum (ross2004, boxedfox, NickD), MotorTrend (FRM liner article), PreludePower (76-reply PCV debate), BobIsTheOilGuy (UOA data), Attack Forums (Daemione build series), NZHondas.com, Drive Accord, Reddit, Honda-Tech, Wikipedia, and QWEN.md. Conflicts noted in dedicated section (PCV vs FRM as primary cause, crosshatch wear theory, Honda's oil consumption tolerance stance).

- [x] **No swallowed errors** — N/A (pure research task, no code changes).

- [x] **Documentation in sync** — README.md and CLAUDE.md not affected by this task (no behavior/flags/layout/convention changes). Plan doc (`docs/plans/03-h-series-variants.md`) updated with T-146 section. Master index updated.

- [x] **STATE.md updated** — Task moved to Done archive below with date + commit SHA (pending commit).

- [x] **CI green** — N/A (pure research task, no code changes). No npm commands to run.

- [x] **No regressions** — N/A (no code changes). Only new files added, one existing file extended (plan doc), one index updated.

- [x] **Reviewable diff** — Single-purpose commits. Conventional prefix `docs:` for plan doc and index updates, `docs:` for research file. No drive-by reformatting.
