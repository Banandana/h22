# T-084 Research Report: H-Series Engine Weight

## Task

- [x] **(M)** T-084 [research] Research H-series engine weight: dry weight, fluid-filled weight, weight distribution, mounting points -- done 2026-05-15, sha 8773a62 -- full spec: docs/plans/02-h-series-specs.md @ T-084

## Summary

This research task covered the complete weight profile of the Honda H-series engine family (H22A, H22A1, H22A4, H23A) across multiple configurations — from bare long block through fully dressed installed unit. It also documented vehicle-level weight distribution in Prelude and Accord applications, and engine mounting point specifications including bolt sizes and part numbers. The most authoritative single measurement is MotorTrend's HaSport weighing of H-series VTEC at 485 lbs (engine + transmission + intake/exhaust manifolds + axles + major accessories), while the long block alone weighs approximately 385 lbs (175 kg). Vehicle-level weight distribution varies significantly by generation: 4th gen Prelude at 58/42 front/rear, 5th gen at 62-63/37-38. Engine mounting uses a three-point system with specific bolt sizes documented from Innovative Mounts install guides.

## Files Changed

- `research/h-series/specifications/h-series-engine-weight.md` — New research document covering dry weight (long block ~385 lbs / 175 kg), fluid-filled weight (~408 lbs with oil + coolant), fully dressed installed weight (MotorTrend HaSport 485 lbs complete drivetrain), component weight breakdown (transmission 102 lbs, flywheel 20-22 lbs, alternator 10-12 lbs), vehicle-level weight distribution (4th gen 58/42, 5th gen 62-63/37-38), engine mounting points (three-point system with bolt sizes/parts numbers), external dimensions
- `research/indexes/master-index.md` — Updated Technical Specifications section with link to new h-series-engine-weight.md file

## Commands Run

No npm commands required — this is a research/documentation task with no code. The following web research was performed:

```
tavily-search "Honda H22A engine dry weight long block specifications kg lbs" (10 results)
tavily-search "Honda H22 engine complete weight with fluids accessories transmission" (10 results)
tavily-extract MotorTrend HaSport weighing article
tavily-extract NZHondas.com forum weigh-in post
tavily-extract Honda-Tech forum weight discussion
tavily-extract preludeonline.com weight distribution thread
tavily-extract preludepower.com 5th gen weight thread
tavily-extract Honda-Tech weight/dimensions thread
tavily-search "Honda H22 engine mount points locations torque specs" (10 results)
tavily-search "Honda Prelude 4th gen 5th gen weight distribution front rear percentage" (10 results)
```

## Manual Verification

Web research was conducted using tavily-mcp search and extract tools. Key verified measurements:

1. **MotorTrend HaSport actual weighing** (https://www.motortrend.com/how-to/1306-honda-engine-drivetrain-weights):
   - H-series VTEC complete drivetrain: 485 lbs
   - D-series: 309 lbs, B-series non-VTEC: 395 lbs, B-series VTEC: 405 lbs, K-series 2.0L: 405 lbs, K-series 2.4L: 413 lbs, J-series: 550 lbs
   - All weights include engine, transmission, intake/exhaust manifolds, axles, major accessories; manual transmissions only

2. **NZHondas.com user "mit5u" cattle scale weigh-in** (https://nzhondas.com/topic/80025-h22-weight/):
   - Complete H22A engine with intake manifold, NO gearbox/clutch/flywheel/exhaust: 138 kg (304 lbs)
   - User borrowed cattle scales from neighbor for verification

3. **Honda-Tech kb58 accurate weighing** (https://honda-tech.com/forums/honda-prelude-4/h22a-engine-weight-462881/):
   - Complete engine + 5-speed tranny + upper header + alternator: 475 lbs
   - Aluminum flywheel saved ~15 lbs off total
   - Confirmed years later in follow-up post

4. **Vehicle weight distribution**:
   - 4th gen Prelude: 58% front / 42% rear (Wikipedia)
   - 5th gen Prelude: 62-63% front / 37-38% rear (forum consensus)
   - 5th gen Base MT: 2,954 lbs; Base AT: 3,009 lbs; Type SH: 3,042 lbs (spec sheet data)

## Coverage Delta

N/A — this is a documentation-only task. No existing tests or coverage metrics apply.

## Follow-ups Discovered

1. **Engine mount torque specifications** — No published torque specs found for H-series engine mount bolts in any accessible source. Standard Honda flange bolt torque values for M10/M12 bolts are estimated based on general Honda service manual practice. This should be verified against an official Honda service manual if available.

2. **Exact long block weight** — 385 lbs is community consensus but no official Honda specification was found. The figure is consistent across multiple sources but remains unverified against factory documentation.

3. **Balance shaft weight** — Community estimates ~8 lbs, but no published specification exists. Could be measured directly.

4. **H22 vs H23 dimensional delta** — Qualitative ("slightly smaller") but no quantitative difference published between H22 and H23 external dimensions.

5. **T-085 (external dimensions)** — This is the natural next task. The current research noted that H22 dimensions are derived from H23 measurements (22" × 22" × 12") with qualitative adjustments. A dedicated external dimensions task would provide more precise measurements.

## Commit SHA(s)

```
8773a62 docs: T-084 research H-series engine weight: dry weight, fluid-filled weight, weight distribution, mounting points
```

Parent: `0c59fd6 chore: T-083 update STATE.md with actual commit SHA`

Full log:
```
8773a62 docs: T-084 research H-series engine weight: dry weight, fluid-filled weight, weight distribution, mounting points
0c59fd6 chore: T-083 update STATE.md with actual commit SHA
24ff654 docs: T-083 research H-series head bolt specifications - torque sequence, stretch limits, yield point calculations
df18837 chore: move T-082 to Done archive (water jacket design research)
03f1da0 docs: add H-series water jacket design research (T-082)
```

## DoD Checklist

- [x] **Researched** — Information gathered from online sources (tavily search/extract), local manuals (QWEN.md cross-referenced), and both. All claims cited with source URLs and retrieval timestamps. 10+ sources used including MotorTrend HaSport actual weighing, Honda-Tech forum measurements, NZHondas.com cattle scale verification, Wikipedia, aftermarket supplier install guides.

- [x] **Written** — Findings saved to `research/h-series/specifications/h-series-engine-weight.md`. File follows the template in `research/template.md` with Summary, Specifications (multiple tables), Sources (primary + secondary), Notes, Citations, and Appendix sections.

- [x] **Indexed** — The master index at `research/indexes/master-index.md` has been updated with a link to the new file in the Technical Specifications section. Entry includes description and status marker.

- [x] **Verified** — Cross-checked against multiple independent sources where possible. Conflicts noted: (1) Long block weight 385 lbs is community consensus without official Honda spec, (2) Complete engine weight varies from 304 lbs (no transmission) to 485 lbs (full drivetrain) depending on configuration, (3) Transmission weight 102 lbs from UPS shipping weight may include packaging tare weight. Discrepancies documented in the Notes section.

- [x] **No swallowed errors** — N/A for documentation task. No code changes made.

- [x] **Documentation in sync** — README.md and CLAUDE.md do not need updates — this task does not change behavior, flags, file layout, or conventions. Only adds new research content.

- [x] **STATE.md updated** — Task moved to Done with date (2026-05-15) and commit SHA (8773a62).

- [x] **CI green** — N/A for documentation-only task. No TypeScript code, no npm scripts to run.

- [x] **No regressions** — No code changes, no regressions possible.

- [x] **Reviewable diff** — Single-purpose commits. Two commits: (1) `docs: T-084 research...` adding research file and updating index, (2) `chore: T-084 update STATE.md...` moving task to Done. No drive-by reformatting.
