# Report: T-111 — Research H-Series Water Pump Specifications

## Task

- [x] **(S)** T-111 [research] Research H-series water pump specifications: impeller diameter, flow rate, bearing life, drive method -- done 2026-05-15, sha a2851e0 -- full spec: docs/plans/02-h-series-specs.md @ T-111

## Summary

This task produced a comprehensive research document covering the Honda H-series water pump (H22A, H22A1, H22A4, H23A). The key discovery was the official Helms manual specification: **water pump displacement of 142.5 L/min at 6,000 engine RPM** — a figure completely absent from QWEN.md and all prior web-sourced documentation. The document covers pump architecture (centrifugal, timing belt-driven), OEM part numbers (19200-P13-003), aftermarket equivalents (GMB 135-1330, Gates 41046, Aisin), bearing construction (heavy-duty steel, sealed for life), failure modes (weep hole leaks, bearing noise, impeller corrosion), replacement intervals tied to timing belt service, and the critical coupling between water pump failure and timing belt catastrophic failure on this interference engine.

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h-series-water-pump.md` | New research file: complete water pump spec covering architecture, part numbers, flow rate (142.5 L/min from Helms manual), bearing type/life, drive method, failure modes, replacement intervals, cross-reference data |
| `research/indexes/master-index.md` | Added T-111 entry linking to new water pump research file in Technical Specifications section |

## Commands Run

```
# Research phase
tavily-search "Honda H22 water pump specifications impeller diameter flow rate bearing type"
tavily-search "Honda Prelude H22A water pump replacement part number Aisin GMB specs"
tavily-extract "https://www.hybrid-racing.com/products/honda-h22-h23-water-pump-19200-p13-003"
tavily-search "Honda H22 water pump bearing type seal failure symptoms replacement timing belt service"
tavily-search "Honda H22 water pump 19200-P13-003 impeller diameter shaft size bearing part number NPW"
tavily-search "Honda H22 water pump replacement interval timing belt service bearing life failure rate"

# Local data verification
grep -i "water pump" bb6_ocr/1997-2001_BB6_Manual_extracted.txt  # Found line 2531: 142.5 L/min @ 6,000 RPM

# Git operations
git add research/h-series/specifications/h-series-water-pump.md research/indexes/master-index.md
git commit -m "docs: T-111 Research H-series water pump specifications (flow rate, bearing, drive method)"
git push origin main
```

## Manual Verification

**Primary source verification:** Read `bb6_ocr/1997-2001_BB6_Manual_extracted.txt` lines 2520–2560 to confirm the water pump displacement spec appears in the official spec sheet section alongside oil pump displacement, bore/stroke, compression ratio, and other factory parameters. The extracted text reads:

```
Lubrication System Forced and wet sump, trochoid pump
Oil Pump Displacement at 6,000 engine rpm 59.10 (62.5 US qt, 52.0 Imp qt)/minute
Water Pump Displacement at 6,000 engine rpm | 142.5 (150.6 US qt, 125.4 Imp qt)/minute
```

This confirms the 142.5 L/min figure is from the manufacturer's own specification sheet, not an aftermarket claim or forum estimate.

**Cross-source verification:** Verified part number 19200-P13-003 against 5 independent sources (HondaPartsNow, HondaFactoryParts, Honda OEM Discount Parts, Hybrid Racing, SwapShopRacing). Verified aftermarket equivalents (GMB 135-1330, Gates 41046) against 3 sources each. Verified centrifugal design and aluminum impeller against Hybrid Racing, GMB, and Gates product descriptions. Verified bearing construction against GMB, Gates, and Industrias Dolz technical guides. Verified weep hole design feature against Midway Garage & Salvage diagnostic guide. Verified replacement interval against Honda TechInfo maintenance schedule PDF and Honda Civic owner's manual PDF.

## Coverage Delta

N/A — this is a new research file, not a modification of existing code or tests. The coverage delta is measured in knowledge gaps filled:

| Gap | Before | After |
|-----|--------|-------|
| Water pump flow rate | QWEN.md: "Optimized for H-series displacement" (vague) | 142.5 L/min @ 6,000 RPM (Helms manual primary spec) |
| Part numbers | Not present in QWEN.md | 19200-P13-003 (OEM), 135-1330 (GMB), 41046 (Gates) |
| Bearing type | Mentioned "bearing failure" generically | Heavy-duty steel bearing, sealed for life, unitized mechanical seal |
| Drive method | Implied but not stated | Timing belt-driven (mounted on front of engine) |
| Replacement interval | Not specified | Every timing belt service (100K–105K miles / 7 years) |
| Weep hole function | Not mentioned | Intentional diagnostic feature between dual seals |

## Follow-ups Discovered

| Item | Priority | Notes |
|------|----------|-------|
| Exact impeller diameter (mm) | Medium | Not published by Honda; would require physical measurement |
| Impeller blade count and profile angle | Medium | Honda proprietary geometry |
| Water pump pulley diameter and rib count | Medium | Needed for drive ratio understanding |
| OBD1 vs OBD2 water pump dimensional differences | Low | Part numbers appear identical but mounting details may vary |
| H22A7 (Accord Type R) water pump differences | Low | Likely identical given shared block |
| Net flow rate at system operating pressure | Low | Would require dynamometer testing |
| H-series vs B-series water pump comparison | Low | Useful for swap planning |

## Commit SHA(s)

```
a2851e0 docs: T-111 Research H-series water pump specifications (flow rate, bearing, drive method)
```

`git log --oneline -n 1`:
```
a2851e0 docs: T-111 Research H-series water pump specifications (flow rate, bearing, drive method)
```

## DoD Checklist

1. **Researched** — ✅ Information gathered from online sources (tavily search/extract from 8 sources including Hybrid Racing, GMB, Gates, HondaPartsNow, etc.) and local manuals (1997–2001 Helms Manual BB6 extracted text, line 2531 — primary manufacturer specification). All claims cited with source URLs and retrieval timestamps.

2. **Written** — ✅ Findings saved to `research/h-series/specifications/h-series-water-pump.md`. File follows the established template pattern used by all prior specification research files (T-071 through T-110): summary, detailed sections with tables, cross-reference/conflict notes, verification status, follow-up items, and source list with URLs and dates.

3. **Indexed** — ✅ The master index at `research/indexes/master-index.md` updated with a new row linking to the water pump file under the Technical Specifications section, with description and completion marker (✅ T-111 (2026-05-15)).

4. **Verified** — ✅ Cross-checked against multiple independent sources where possible. Primary data point (142.5 L/min flow rate) verified against Helms manual (primary source) + confirmed consistent with general automotive water pump expectations. Part numbers verified across 5+ sources. Conflicts noted in the Cross-Reference section (e.g., QWEN.md vague description vs. Helms manual precise spec).

5. **No swallowed errors** — ✅ N/A for this task type (documentation-only research, no code changes). No `catch {}` blocks introduced.

6. **Documentation in sync** — ✅ README.md and CLAUDE.md do not need updates — this task does not change behavior, flags, file layout, or conventions. It adds a new research file and updates the index.

7. **STATE.md updated** — ✅ Task line changed from `[ ]` to `[x]` with date (2026-05-15) and commit SHA (a2851e0).

8. **CI green** — ✅ N/A — this is a documentation-only task with no TypeScript code, no npm scripts, no typecheck/lint/test/format requirements. The project has no CI pipeline configured.

9. **No regressions** — ✅ N/A — no existing files modified except the master index (which only had one row appended). No functionality to regress.

10. **Reviewable diff** — ✅ Single-purpose commit with conventional prefix `docs:`. Two files changed: new research file (22,320 bytes) and master index update (one row added). No drive-by reformatting.
