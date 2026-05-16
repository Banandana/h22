# Report: T-095 — Research H-Series Exhaust System Diameters

## Task

- [x] **(S)** T-095 [research] Research H-series exhaust system diameters: 51mm vs 57mm, backpressure calculations, muffler design -- full spec: docs/plans/02-h-series-specs.md @ T-095

## Summary

This task produced a comprehensive research document covering Honda H-series cat-back exhaust system geometry from the manifold collector flange through the catalytic converter, mid-pipe, and rear muffler. The document documents stock exhaust diameters by variant (51 mm Blacktop vs 57 mm Redtop/Euro R), aftermarket diameter recommendations across build levels (2.25" for stock bolt-ons through 3.0" for turbo/race applications), backpressure calculation methodology using Darcy-Weisbach fluid dynamics, muffler design type comparisons (straight-through, chambered, resonator-only), and material/bending considerations (mandrel vs crush bend, T-304 stainless vs aluminized steel). Cross-checked against 20 sources including community forums (NZHondas.com, PreludePower, PreludeOnline, Honda-Tech), manufacturer product pages (Yonaka, SR*S Tuning), and engineering calculators (FIRGELLI, HP Academy, Summit Racing).

## Files Changed

- **`research/h-series/specifications/h-series-exhaust-system-diameters.md`** — New research file (596 lines) covering stock exhaust diameters by variant, aftermarket recommendations, backpressure calculations, muffler design types, bend type analysis, and material selection
- **`research/indexes/master-index.md`** — Added entry for h-series-exhaust-system-diameters.md in Technical Specifications section

## Commands Run

No code compilation required (markdown research files only). Web research performed via tavily-mcp search and extract tools.

## Manual Verification

Web research conducted using tavily-mcp:
- `tavily-search "Honda H22 exhaust system diameter 51mm 57mm cat-back specifications"` — 10 results
- `tavily-search "H22A H22 exhaust backpressure calculations optimal pipe size naturally aspirated"` — 10 results
- `tavily-search "Honda H22 muffler design resonator exhaust system types straight through vs baffled"` — 10 results
- `tavily-extract` on 5 key URLs (NZHondas.com, PreludePower x2, PreludeOnline, Facebook group) — extracted detailed forum discussions with user measurements

Key verified data points:
- 5th gen stock exhaust measured with digital calipers: OD 2.0", ID 1.75" (Kahuna9889, PreludePower)
- Aftermarket shelf exhaust standard: 60 mm OD / 57 mm ID = 2.25" (98vtec, PreludePower)
- Apexi N1 actual diameter: 60 mm OD / 59 mm ID = 2.33" (not 2.5" as commonly misstated)
- NZHondas.com poll (20 voters): 60% running 3" mandrel, 20% running 2.5" mandrel, 5% running 2.5" crush

## Coverage Delta

n/a — no measurable change (new research file, not code).

## Follow-Ups Discovered

- **T-125** — H22A Redtop exhaust system (57 mm exhaust diameter, header design, catalytic converter placement) — variant-specific exhaust research building on this general analysis
- **T-155** — H22A Blacktop exhaust system (51 mm exhaust diameter, header design, catalytic converter placement) — variant-specific exhaust research building on this general analysis
- Real-world backpressure measurement data (using manometer or wideband O2 secondary lambda sensor) for stock and aftermarket H-series exhaust systems would validate the theoretical calculations
- Exhaust gas temperature profiles measured at multiple points along the cat-back system for different muffler types
- Acoustic frequency analysis of different muffler designs

## Commit SHA(s)

```
f7ac226 docs(h-series): exhaust system diameters 51mm vs 57mm, backpressure calculations, muffler design (T-095)
```

## DoD Checklist

- [x] Researched with cited sources (URLs + timestamps) — 20 sources cited including NZHondas.com, PreludePower, PreludeOnline, Honda-Tech, Magnaflow, RealTruck, BobIsTheOilGuy, Team Integra, FIRGELLI, HP Academy, Summit Racing, QWEN.md, wikimotors, Yonaka, SR*S Tuning, SK Honda, Studio VRM Racing, Private Label Mfg
- [x] Written to research/h-series/specifications/h-series-exhaust-system-diameters.md following template — 596-line document with summary, stock diameters by variant, aftermarke recommendations, backpressure calculations, muffler design types, bend type analysis, material selection, known conflicts, sources, follow-ups, and DoD checklist
- [x] Index updated in research/indexes/master-index.md — added entry in Technical Specifications section
- [x] Cross-checked against 2+ sources; conflicts noted — 5th gen stock ID (2.0" vs 1.75"), 4th gen stock ID (2.0" vs 2.25"), Apexi N1 actual diameter (2.33" not 2.5"), 3" vs 2.5" debate context
- [x] No swallowed errors introduced — n/a (markdown files only)
- [x] README / CLAUDE.md updated if behavior changed — n/a (research file only)
- [x] STATE.md moved to Done with commit SHA — done 2026-05-15, sha f7ac226
- [x] CI green (typecheck + lint + test + format) — n/a (markdown files only)
- [x] Full suite re-run; no regressions — n/a (no code changes)
- [x] Reviewable diff — single-purpose commit, conventional prefix (docs), no drive-by reformatting
