# Report: T-033 Research H-Series Derivation from F-Series Architecture

## Task

- [x] **(M)** T-033 [research] Research H-series derivation from F-series architecture: shared components, differences, evolution path -- full spec: docs/plans/01-h-series-development.md @ T-033

## Summary

Researched and documented how the Honda H-series engine family was derived from the F-series architecture. The H-series shared fundamental dimensions (bore spacing) with the F-series but introduced key innovations including FRM (Fiber-Reinforced Metal) cylinder liners instead of cast iron sleeves, DOHC VTEC valvetrain, and closed-deck block design (1992–1996). The F20B represents a notable reciprocal relationship — it is essentially a destroked, cast-iron-sleeved version of the H22A, developed by Honda for 2-liter racing classes. Foundational sources include Wikipedia's H-engine and F-engine articles, Honda-Tech community discussions confirming part interchangeability, and forum evidence of hybrid builds combining H-series and F-series components.

## Files Changed

- `research/h-series/development/h-series-f-series-derivation.md` — New research file covering H/F-series architectural comparison, shared components, evolution path, internal cross-reference tables, and racing legacy
- `research/indexes/master-index.md` — Added entry for h-series-f-series-derivation.md in Development History section

## Commands Run

No npm commands required (documentation-only task). Web research performed via tavily-mcp search and extract.

## Manual Verification

1. **File created**: `ls -la research/h-series/development/h-series-f-series-derivation.md` confirmed 16,863 bytes written
2. **Index updated**: Verified master-index.md contains new entry linking to the research file
3. **Source citation check**: All 10 sources verified as accessible URLs with retrieval timestamps
4. **Cross-check verification**: Data cross-referenced between Wikipedia (H-engine + F-engine pages), Honda-Tech (3 articles + multiple forum threads), AcuraZine, Grassroots Motorsports, and Devin's Honda Site — consistent across sources

## Coverage Delta

N/A — documentation-only task, no code changes.

## Follow-ups Discovered

None identified. The research is self-contained and does not spawn additional tasks.

## Commit SHA(s)

```
f0eeb9f docs: T-033 Research H-series derivation from F-series architecture
```

## DoD Checklist

- [x] Researched with cited sources (URLs + timestamps) — 10 sources cited with URLs and 2026-05-15 retrieval dates
- [x] Written to research/<series>/<topic>.md following template — `research/h-series/development/h-series-f-series-derivation.md` follows format established by T-031/T-032 files
- [x] Index updated in research/indexes/ — master-index.md updated with new file entry
- [x] Cross-checked against 2+ sources; conflicts noted — Wikipedia, Honda-Tech, AcuraZine, Grassroots Motorsports all confirm core facts; conflicts documented in Notes & Conflicts section (main journal discrepancy, F20B bore undersize)
- [x] No swallowed errors introduced — N/A (documentation only)
- [x] README / CLAUDE.md updated if behavior changed — N/A (no behavioral change)
- [x] STATE.md moved to Done with commit SHA — See below
- [x] CI green (typecheck + lint + test + format) — N/A (no code)
- [x] Full suite re-run; no regressions — N/A (no code)
- [x] Reviewable diff — Single-purpose commit with conventional prefix `docs:`
