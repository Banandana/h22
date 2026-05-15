# Report: T-148 — Research H22A Redtop Daily Usability

## Task

- [x] **(S)** T-148 [research] Research H22A Redtop daily usability: NVH levels, visibility, seat comfort, storage space, climate control -- full spec: docs/plans/03-h-series-variants.md @ T-148

## Summary

This research task evaluated the Honda H22A Redtop engine and its host chassis (4th gen Prelude BB1/BB2/BB4, 1992–1996) as a daily driver across five dimensions: NVH levels, visibility, seat comfort, storage space, and climate control. The 4th gen Prelude is widely regarded by owners as an exceptional compromise between driver's car engagement and daily usability, but as a 1990s sports coupe it inherits inherent compromises including elevated wind/road noise, limited rear visibility, Recaro sport seats that polarize users, modest 278L trunk capacity, and basic manual climate control (with JDM digital upgrade available). Cross-referenced against Automobile Magazine, Preludedriver.com, Honda-Tech forums, PreludePower, Reddit r/hondaprelude, CarsGuide, KBB, Edmunds, Automoli, QWEN.md, and YouTube reviews.

## Files Changed

- **`docs/plans/03-h-series-variants.md`** — Added T-148 authoritative spec section with detailed description of all five daily usability dimensions, dependencies, spawns, and DoD notes.
- **`research/h-series/specifications/h22a-redtop-daily-usability.md`** — New research file covering NVH assessment (cabin noise profile, engine vibration isolation, balance shaft effectiveness, acoustic treatment), visibility assessment (forward sightlines, A-pillar blind spots, rearward visibility, side visibility, competitor comparison), seat comfort assessment (Recaro-designed front sport seats, comfort by user profile, rear seat usability), storage space assessment (278L trunk, interior storage evolution by model year, cargo practicality), climate control assessment (manual standard, JDM DCC upgrade path, heater/A/C performance, common issues), and overall daily usability verdict with strengths/weaknesses/use cases.
- **`research/indexes/master-index.md`** — Updated Technical Specifications → Engine Variants table with new entry for h22a-redtop-daily-usability.md.

## Commands Run

No npm commands required — this is a pure research/documentation task with no code changes.

## Manual Verification

1. **Research file created:** `ls research/h-series/specifications/h22a-redtop-daily-usability.md` confirmed file exists (28,085 bytes).
2. **Plan doc updated:** Grep confirmed T-148 section added to `docs/plans/03-h-series-variants.md` with correct format matching existing T-NNN sections.
3. **Master index updated:** Grep confirmed new entry appears in `research/indexes/master-index.md` under Technical Specifications → Engine Variants table.
4. **Source verification:** All major claims cross-checked against 2+ independent sources where possible. Key data points verified:
   - Trunk volume 278L: confirmed by both Automoli and Honda.drive.place
   - Recaro seat design: confirmed by multiple Honda-Tech forum posts
   - KBB 95% recommendation rate: from KBB consumer reviews page
   - Automobile Magazine wind/road noise quote: from MotorTrend retro drive review
   - JDM DCC components: from comprehensive PreludePower conversion write-up

## Coverage Delta

N/A — this is a documentation-only task with no code changes. One new research file added to the corpus.

## Follow-ups Discovered

- **Visibility quantification gap:** No published quantitative visibility data (blind spot angles, sightline measurements) for the 4th gen Prelude. Could be addressed in a future audit or comparison task.
- **NVH measurement gap:** No formal dB(A) measurements exist for the 4th gen Prelude at various speeds. Community members have not published calibrated measurements.
- **Rear seat ergonomics:** Limited data on rear seat dimensions (legroom, headroom measurements). Could be measured from physical vehicles or sourced from OEM brochures.

## Commit SHA(s)

Pending commit (to be recorded after push to origin/main).

## DoD Checklist

- [x] **Researched** — Information gathered from online sources (tavily search/extract) and local QWEN.md. 8 primary sources + 7 secondary sources cited with URLs and retrieval timestamps.
- [x] **Written** — Findings saved to `research/h-series/specifications/h22a-redtop-daily-usability.md` following the template in `research/template.md`. All sections populated: summary, specifications (tables), sources, notes, citations, appendix.
- [x] **Indexed** — Master index at `research/indexes/master-index.md` updated with new entry linking to the research file.
- [x] **Verified** — Cross-checked against 2+ independent sources where possible. Trunk volume confirmed by Automoli + Honda.drive.place. Seat design confirmed by multiple Honda-Tech posts. NVH observations corroborated by Automobile Magazine + owner reports. Conflicts noted (leather availability debate, seat designer attribution).
- [x] **No swallowed errors** — N/A for documentation task. No code written.
- [x] **Documentation in sync** — README.md and CLAUDE.md do not need updates (no behavior/flags/layout/convention changes). Plan doc updated with T-148 spec section.
- [ ] **STATE.md updated** — Task moved to Done with date + commit SHA (pending commit).
- [ ] **CI green** — N/A for documentation-only task. No typecheck/lint/test/format required.
- [ ] **No regressions** — N/A for documentation-only task.
- [x] **Reviewable diff** — Single-purpose commits planned. Conventional prefix: `docs:`. No drive-by reformatting.
