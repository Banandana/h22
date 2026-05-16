# Report: T-113 — Research H-Series Fuel System Specifications

## Task

- [x] **(S)** T-113 [research] Research H-series fuel system specifications: rail pressure, injector flow rates, pump capacity, regulator type -- done 2026-05-15, sha 27549bb -- full spec: docs/plans/02-h-series-specs.md @ T-113

## Summary

Comprehensive research on Honda H-series fuel system specifications covering four key areas: fuel rail pressure by generation (OBD1 vs OBD2), injector flow rates and technology types (peak-and-hold vs saturated), OEM and aftermarket fuel pump capacity, and diaphragm-type vacuum-referenced fuel pressure regulator operation. The research documents the significant architectural change between OBD1 (1993–1996) and OBD2 (1997–2001) when Honda switched from peak-and-hold injectors to saturated injectors and raised operating fuel pressure. All findings are cross-referenced against community-tested data from Honda-Tech and PreludePower forums, OEM parts catalogs, aftermarket supplier specifications, and internal project references.

## Files Changed

- `research/h-series/specifications/h-series-fuel-system.md` — New comprehensive fuel system specification document covering rail pressure, injector types/sizes/flow rates, fuel pump capacity and testing, FPR type and operation, fuel filter location, variant-by-variant summary table, tuning implications, and after-market upgrade paths
- `research/indexes/master-index.md` — Added entry for h-series-fuel-system.md in Technical Specifications section with full description and completion status

## Commands Run

No npm commands needed (research project, no code). Data gathered via:
- `tavily-search` × 4 queries (injector flow rates, fuel pump specs, fuel pressure regulator, OEM part numbers)
- `tavily-extract` × 3 URLs (HPA Academy forum, PreludePower forum, Honda-Tech forum)

## Manual Verification

Verified output by reading the generated file:
```
$ wc -l research/h-series/specifications/h-series-fuel-system.md
323 research/h-series/specifications/h-series-fuel-system.md
```

File contains 15 tables, 16 cited sources (12 external URLs + 4 internal references), 5 follow-on research items, and covers all four required topics:
1. ✅ Rail pressure: OBD1 33–40 psi, OBD2 39–44 psi
2. ✅ Injector flow rates: OBD1 330–345 cc (peak-and-hold), OBD2 290 cc (saturated)
3. ✅ Pump capacity: Stock 150 L/hr min, AEM 340 LPH, Walbro 255/450 LPH options
4. ✅ Regulator type: Diaphragm, vacuum-referenced, integrated on fuel rail

Cross-checked injector size discrepancy (330 cc vs 345 cc) by reviewing Honda-Tech forum thread with 25+ posts from multiple users with tested data. Resolution: both figures correct at different reference pressures (345 cc @ ~36 psi native ≈ 310–330 cc @ 43.5 psi industry standard).

## Coverage Delta

N/A — this is a new research file, not a modification of existing code. The qwen-gap-analysis.md previously flagged "Fuel system specs" as "Partial / Low" coverage with note "Fuel pressure given, no injector flow rates." This task fully addresses that gap.

## Follow-ups Discovered

| Item | Priority | Notes |
|------|----------|-------|
| Exact OEM fuel pump part numbers by generation | Medium | Local manual index mentions "electric in-tank, 150 L/hr min" but no specific part numbers; need OEM parts catalog cross-reference |
| Fuel pressure specification for H22A7 (Accord Type R CH1) | Low | EDM variant; likely identical to other OBD2 specs but needs verification |
| Fuel system differences for H22Z1 (Australian VTi-R) | Low | Disputed output (200–203 PS); may have different fuel calibration |
| Fuel filter OEM part numbers by generation | Low | Service interval documented (30,000 mi) but specific part numbers not yet sourced |
| IAB (Intake Air Booster) system interaction with fuel delivery | Low | OBD1 H22A1 has IAB control solenoid (ECU Pin A26); affects volumetric efficiency and thus fuel demand |
| Fuel system specifications for H23A DOHC VTEC (blue top) | Low | Rare JDM variant; fuel system likely identical to OBD2 H22A4 but needs confirmation |

## Commit SHA(s)

```
27549bb docs: T-113 Research H-series fuel system specifications (rail pressure, injector flow rates, pump capacity, regulator type)
```

## DoD Checklist

- [x] **Researched** — Information gathered from online sources (tavily search/extract from Honda-Tech, PreludePower, HPA Academy, FiveOMotorSport, RealStreetPerformance, Valex Racing, Radium Engineering, TREperformance) and local manuals (QWEN.md, local-manuals.md, variant-catalog.md). All claims cited with source URLs and retrieval timestamps.
- [x] **Written** — Findings saved to `research/h-series/specifications/h-series-fuel-system.md`. File follows the established template pattern used by prior tasks (T-103 oil spec, T-110 oil pump, T-111 water pump).
- [x] **Indexed** — Master index (`research/indexes/master-index.md`) updated with link to new content in Technical Specifications section.
- [x] **Verified** — Cross-checked against multiple independent sources where possible. Notable conflict resolved: OBD1 injector size 330 cc vs 345 cc discrepancy explained via reference pressure difference. Conflicts noted throughout in dedicated section.
- [x] **No swallowed errors** — No code written; N/A.
- [x] **Documentation in sync** — README.md and CLAUDE.md not affected by this task (no behavior/flags/layout changes). Only research files and index updated.
- [x] **STATE.md updated** — Task moved to Done with date (2026-05-15) and commit SHA (27549bb).
- [x] **CI green** — N/A (research project, no npm/typecheck/lint/test/format).
- [x] **No regressions** — No existing files modified except master-index.md (addition only).
- [x] **Reviewable diff** — Single-purpose commit. Conventional prefix `docs:`. No drive-by reformatting.
