# Task T-112 Report — Research H-Series Timing Belt Specifications

## Task

- [x] **(S)** T-112 [research] Research H-series timing belt specifications: tooth count, width, material, tensioner type, replacement interval -- full spec: docs/plans/02-h-series-specs.md @ T-112

## Summary

Researched and documented complete timing belt specifications for the Honda H-series engine family (H22A, H22A1–H22A8, H22Z1, H23A). The H-series uses two separate belts: a 155-tooth main timing belt (24mm wide, urethane OEM) and a 70-tooth balance shaft belt (16mm wide, rubber). Documented OEM part numbers (14400-P13-014, 13405-PT0-004), Gates Racing aftermarket options (T226RB kit), both OBD1 hydraulic and OBD2 spring-loaded tensioner types, the H23 manual tensioner conversion procedure, 60K–90K mile replacement intervals, and cross-platform compatibility with B/D/F/K series engines. Notably confirmed that the H23A uses a completely different main timing belt with incompatible tooth pitch and length.

## Files Changed

- **`research/h-series/specifications/h-series-timing-belt-specifications.md`** (created) — Comprehensive timing belt specifications document covering main belt, balance shaft belt, tensioner systems, replacement intervals, compatibility matrix, and aftermarket alternatives. 28KB, ~600 lines.
- **`research/indexes/master-index.md`** (updated) — Added T-112 entry to Technical Specifications table linking to new timing belt file.

## Commands Run

No code to compile or test — this is a pure research/documentation task. No TypeScript project, no test suite, no linter. The DoD item "CI green" is not applicable to documentation-only tasks.

Verification:
```bash
cd /data/h22
cat package.json  # Confirms no test/typecheck/lint scripts exist
# Output: "test": "echo \"Error: no test specified\" && exit 1"
```

## Manual Verification

1. **Research completeness check:** Verified all five required specification areas from the task description are covered:
   - ✅ Tooth count: 155 (main), 70 (balance) — confirmed by HondaPartsNow, HondaSwap forum, AKR Performance
   - ✅ Width: 24mm (main), 16mm (balance) — confirmed by HondaPartsNow catalog codes (155Yu24, 70Ru16)
   - ✅ Material: Urethane (OEM main), Rubber (OEM balance), HNBR (Gates Racing) — confirmed by Honda catalog codes and Gates product pages
   - ✅ Tensioner type: Hydraulic auto (OBD1 1992–1996), spring-loaded manual (OBD2 1997–2001), H23 conversion kit — confirmed by Helms Manual, eXtremePrelude, QWEN.md
   - ✅ Replacement interval: 60,000–90,000 miles — confirmed by QWEN.md, Helms Manual (1997–2001 BB6 p. 6-13)

2. **Cross-source verification:** Key data points verified against 2+ independent sources:
   - 155 teeth: HondaPartsNow (155Yu24), HondaSwap forum (Mulepick), Hybrid Racing (1240mm length consistent with 155T)
   - 24mm width: HondaPartsNow (24 in 155Yu24), BadassTuning (24mm for F22B — same width, different tooth count)
   - 70 teeth: AKR Performance (70Ru16), eBay listing for 13405-PAA-A02
   - 16mm width: AKR Performance (16 in 70Ru16), eBay listing

3. **Conflict documentation:** Noted and documented discrepancies:
   - Belt length: 1240mm (Hybrid Racing) vs 49.25" (HondaSwap) — within manufacturing tolerance
   - F22B vs H22A belt confusion on BadassTuning — clarified as F22B-specific data (126T vs 155T)
   - Goodyear Gatorback listing error — 40216 wrong pitch, 40132 correct

4. **Index update verified:** Master index now includes T-112 entry in Technical Specifications table with link to new file.

5. **File format check:** New file follows the established template pattern used by all other specification files (T-102, T-103, T-105, etc.): header block with task/date/author/status, summary section, parameter tables with source attribution, notes with key findings/conflicts/implications, sources categorized by credibility, appendix with quick reference tables.

## Coverage Delta

N/A — this is a documentation-only task. No code was written or modified. The research corpus coverage increased by one new comprehensive specification document (~28KB, ~600 lines) covering a previously undocumented topic area.

## Follow-ups Discovered

1. **T-113 (Fuel System):** Timing belt service overlaps with fuel system inspection — consider noting fuel filter replacement interval alongside timing belt service in maintenance procedures.
2. **Water pump integration:** Water pump (T-111) is timing belt-driven — the new timing belt file references the water pump part number (19200-P13-003) but a dedicated water pump timing belt drive spec (impeller diameter, flow rate correlation with belt speed) could be added if needed.
3. **Balance shaft belt wear patterns:** The 70-tooth balance shaft belt has different wear characteristics than the main belt due to lower load but higher rotational speed (2× crank). A dedicated balance shaft belt wear analysis could be valuable for the reliability section.

## Commit SHA(s)

To be filled after commit.

## DoD Checklist

1. **✅ Researched** — Information gathered from 13+ online sources (tavily search/extract): HondaPartsNow OEM catalog, Hybrid Racing, SwapShopRacing, KStuned, AKR Performance, BadassTuning, HondaSwap forum, eXtremePrelude, Helms Manual OCR, QWEN.md, YouTube tutorials. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **✅ Written** — Findings saved to `research/h-series/specifications/h-series-timing-belt-specifications.md`. File follows the template pattern established by existing specification files (T-102, T-103, T-105, etc.) with header block, summary, parameter tables, sources by credibility tier, notes with key findings/conflicts/implications, and appendix.

3. **✅ Indexed** — The master index at `research/indexes/master-index.md` is updated with a new row in the Technical Specifications table linking to the timing belt file with T-112 attribution.

4. **✅ Verified** — Cross-checked against multiple independent sources where possible. Key specs verified against 2–3 sources each. Conflicts documented (belt length variance, F22B vs H22A belt confusion, Goodyear listing error). No source contradicts the fundamental specifications: 155 teeth, 24mm width, urethane main belt; 70 teeth, 16mm width, rubber balance belt.

5. **✅ No swallowed errors** — This is a documentation-only task. No code was written. No try/catch blocks, no error handling. N/A.

6. **✅ Documentation in sync** — README.md does not need updating (no behavior/flags/layout changes). CLAUDE.md does not need updating (no agent-visible changes). STATE.md will be updated in the same commit (see below).

7. **⏳ STATE.md updated** — Will be updated in the commit below by moving T-112 to Done with date + commit SHA.

8. **✅ CI green** — Not applicable. This is a documentation-only task. The project has no TypeScript code, no test suite, no linter. `npm run test` returns "no test specified" which is expected for this repo's current state.

9. **✅ No regressions** — No code changes. Only new file creation and one line addition to master index. Zero regression risk.

10. **✅ Reviewable diff** — Single-purpose commit. One new research file (~28KB) + one line in master index. No drive-by reformatting. Commit message: `docs: T-112 research H-series timing belt specifications`
