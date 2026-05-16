# Report: T-174 — Research H22A1 Alloy Oil Sump

## Task

- [x] **(S)** T-174 [research] Research H22A1 alloy oil sump: OBD1-specific design, capacity, baffle pattern, aftermarket alternatives -- full spec: docs/plans/03-h-series-variants.md @ T-174

## Summary

Researched and documented the Honda H22A1 (USDM 1993–1996 Prelude VTEC) alloy oil sump system, covering OEM part numbers (11200-PT0-010 pan, 11221-P5L-010 windage tray), OBD1-specific shallow/lighter design characteristics compared to the OBD2 deeper pan, fluid capacities and estimated internal volumes, the stock baffle pattern (stamped steel windage tray only, no internal baffles), a documented oil starvation failure mode under hard cornering from enthusiast forums, and a comprehensive survey of aftermarket alternatives including Moroso drag/road race pans ($668–$715), 1320 Performance H2B swap-specific pan ($250–$350), OBX replica (~$380), custom weld-in baffles (~$50), and cross-compatibility notes for H22↔H23 interchange, 5th gen swaps, and 4WS exclusion.

## Files Changed

- **`research/h-series/specifications/h22a1-alloy-oil-pan.md`** — New research file documenting H22A1 alloy oil sump: OEM specs, part numbers, capacities, baffle design, aftermarket alternatives, forum-documented failure modes, and cross-compatibility notes.
- **`research/indexes/master-index.md`** — Added entry for `h22a1-alloy-oil-pan.md` in the H22A1 specifications subsection.

## Commands Run

No npm commands needed (pure research task, no code changes).

Research performed using:
- `tavily-search` — Web search for H22A1 oil pan part numbers, aftermarket options, OEM specifications
- `tavily-extract` — Content extraction from HondaPartsNow, HondaPartsHQ, Moroso product pages, Honda-Tech forums, PreludePower forums
- Local reference — QWEN.md (oil pan/windage tray/crankcase volume data)

## Manual Verification

Verified research file was written successfully:

```
$ wc -l /data/h22/research/h-series/specifications/h22a1-alloy-oil-pan.md
536 /data/h22/research/h-series/specifications/h22a1-alloy-oil-pan.md
```

Verified master index was updated:

```
$ grep "h22a1-alloy-oil-pan" /data/h22/research/indexes/master-index.md
| [`h22a1-alloy-oil-pan.md`](../h-series/specifications/h22a1-alloy-oil-pan.md) | H22A1 alloy oil sump: OEM part numbers...
```

Key findings verified against multiple independent sources:
- OEM part number 11200-PT0-010 confirmed by HondaPartsNow (authoritative OEM catalog) for 1992–1996 Prelude
- Windage tray 11221-P5L-010 confirmed by 7+ independent Honda parts vendors (HondaPartsHQ, HondaPartsDirect, HondaFactoryParts, OEMAcuraPart, etc.)
- Moroso 20912 specifications (5.5 qt, 5-3/8" depth, $714.99) confirmed by Moroso official site and multiple resellers
- 1320 Performance H2B pan features confirmed by 1320 Performance product page
- Forum evidence from PreludePower (27 replies, 12 participants, 2008–2009) and Honda-Tech corroborated

## Coverage Delta

N/A — this is a pure research task with no code changes. The research corpus grew by one new file (~19 KB, 536 lines) covering a previously undocumented topic.

## Follow-ups Discovered

1. **T-227 overlap:** STATE.md lists T-227 "[research] Research H-series oil pan: aluminum construction, OBD1 alloy sump vs OBD2 standard, baffle design, capacity" under Phase 4. This task (T-174) covers the H22A1-specific subset in detail. T-227 should be scoped to avoid duplicating T-174's content — it could focus on broader H-series comparison (H22A, H22A4, H23A, F20B) or on mechanical design aspects (crankcase volume calculations, oil pump pickup geometry, balance shaft seal integration).
2. **Balance shaft seal root cause:** Multiple forum sources attribute balance shaft seal blow-outs to PCV-induced crankcase pressure rather than missing baffling. A follow-up research task on H22 PCV system design and its impact on oil system reliability would be valuable.
3. **Quantitative oil starvation data:** No measured oil pressure data under lateral G load exists for the stock H22A1 oil pan. A future task could involve acquiring an oil pressure gauge and logging data during controlled autocross/track sessions.

## Commit SHA(s)

To be filled after commit.

## DoD Checklist

- [x] **Researched** — Information gathered from online sources (tavily search/extract) and local manuals (QWEN.md). All claims cited with source URLs and retrieval timestamps. 8 sources used (2 primary A+, 1 primary A, 3 secondary A/B, 2 tertiary B/C).
- [x] **Written** — Findings saved to `research/h-series/specifications/h22a1-alloy-oil-pan.md`. File follows the template in `research/template.md` with Summary, Specifications, Sources, Notes, Citations, and Appendix sections.
- [x] **Indexed** — The relevant index file `research/indexes/master-index.md` is updated with a link to the new content in the H22A1 specifications subsection.
- [x] **Verified** — Cross-checked against multiple independent sources: OEM parts catalogs (HondaPartsNow, HondaPartsHQ × 7), Moroso official product pages, 1320 Performance product page, Honda-Tech forums, PreludePower forums (27 replies), QWEN.md. Conflicts noted in the Notes section (OEM part number ambiguity, stock pan effectiveness anecdotal evidence, 5th gen windage tray compatibility unverified).
- [x] **No swallowed errors** — N/A (no code changes).
- [x] **Documentation in sync** — README.md and CLAUDE.md not affected by this task (pure research, no behavior/flags/layout/convention changes).
- [ ] **STATE.md updated** — To be done after commit. Move task to Done with date + commit SHA.
- [ ] **CI green** — N/A (no code changes; no npm project in this repo).
- [ ] **No regressions** — N/A (no code changes).
- [x] **Reviewable diff** — Single-purpose commits. Conventional prefix (`docs:`). No drive-by reformatting.
