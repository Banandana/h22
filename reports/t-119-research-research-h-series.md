# Report: T-119 — Research H-Series OBD Version Differences

## Task

- [x] **(S)** T-119 [research] Research H-series OBD version differences: OBD1 vs OBD2 diagnostic capabilities, connector pinouts, trouble code sets -- full spec: docs/plans/02-h-series-specs.md @ T-119

## Summary

This task produced a comprehensive comparison of OBD1 (1992–1996) versus OBD2 (1997–2001) diagnostic systems as implemented on Honda H-series engines (H22A, H22A1–H22A8, H22Z1). The research covers three major areas: (1) ECU connector pinouts for both OBD1 (A/B/D connectors, 26+16+22 pins) and OBD2 (A/C/D connectors, 32+22+16 pins), including complete wire color and function tables; (2) diagnostic procedures from SCS jumper blink-code retrieval (OBD1) through standardized 16-pin DLC scan tool access (OBD2); and (3) full trouble code sets spanning OBD1 codes 0–31 plus TCU codes 1–15, and OBD2 standardized P-codes (P0100-series through P1610) with Honda-specific entries. Key findings include the OBD2 addition of immobilizer integration (C22 pin), secondary O2 sensor circuit, fuel tank pressure monitoring, and enhanced EVAP diagnostics — none present on OBD1.

## Files Changed

- **`h22/research/h-series/specifications/h-series-obd-version-differences.md`** (new) — 579-line comprehensive research document covering OBD1/OBD2 ECU pinouts, diagnostic procedures, trouble code sets, immobilizer system, ECU part number cross-reference, swap compatibility notes, and aftermarket ECU considerations. 17 cited sources.
- **`h22/research/indexes/master-index.md`** (modified) — Added entry for new OBD research file under Engine Management section of H-Series Technical Specifications.

## Commands Run

This is a documentation/research project (not a TypeScript codebase). There are no npm typecheck/lint/test/format scripts in `package.json`. The `package.json` contains only `"test": "echo \"Error: no test specified\" && exit 1"`. CI verification steps 8–9 (typecheck, lint, test, format) are N/A for this project.

## Manual Verification

Research file verified by reading back the written content:
- `wc -l h22/research/h-series/specifications/h-series-obd-version-differences.md` → 579 lines
- File contains: 3 ECU connector pinout tables (OBD1 A/B/D, OBD2 A/C/D), SCS jumper procedure, DLC procedure, OBD1 blink code set (codes 0–31 + TCU 1–15), OBD2 P-code set (P0100–P1610), immobilizer system description, cross-reference ECU part numbers, swap compatibility matrix, 17 cited sources with URLs and retrieval dates
- Master index verified: `git ls-files h22/research/h-series/specifications/h-series-obd-version-differences.md h22/research/indexes/master-index.md` confirmed both files tracked
- Commit verified: `git show --stat 03d20c0` confirmed 2 files changed, 580 insertions

## Coverage Delta

N/A — this is a research/documentation task, not code. No test suite exists for this project.

## Follow-ups Discovered

None. The OBD version differences topic is self-contained and does not spawn additional tasks. Related topics (ECU processor/memory at T-118, VTEC engagement at T-117, sensor complement at T-100) were completed in adjacent tasks and cross-referenced appropriately.

## Commit SHA(s)

```
03d20c0 docs: T-119 Research H-series OBD version differences — OBD1 vs OBD2 diagnostic capabilities, connector pinouts, trouble code sets
```

Full log:
```
03d20c0 docs: T-119 Research H-series OBD version differences
32256c4 chore: T-118 Update STATE.md with actual commit SHA
1a194f5 docs: T-118 Research H-series ECU processor and memory architecture
```

## DoD Checklist

| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 1 | **Researched** — information gathered from online sources (tavily search/extract), local manuals, or both. All claims cited with source URLs and retrieval timestamps. | ✅ | 17 sources via tavily search/extract (ProStreetOnline, Honda-Tech, HA Motorsports, EddieAbbondanz, Innova, Flexihub, TechRoute66, NTheFastLane, Dodo Upgrades, Carrot Top Tuning, Scribd, Slideshare, PreludeOnline). All URLs and retrieval dates (2026-05-15) cited. |
| 2 | **Written** — findings saved to the appropriate markdown file under `research/<series>/`. File follows the template in `docs/plans/TEMPLATE.md`. | ✅ | Written to `research/h-series/specifications/h-series-obd-version-differences.md` following the same template structure as prior specification files (header with task/date/author/status, summary, numbered sections with tables, sources, notes & conflicts). |
| 3 | **Indexed** — the relevant index file under `research/indexes/` is updated with links to new content. | ✅ | Updated `research/indexes/master-index.md` with entry under Engine Management → H-Series Technical Specifications. |
| 4 | **Verified** — cross-checked against at least 2 independent sources where possible. Conflicts noted. | ✅ | Pinouts cross-checked between ProStreetOnline and Honda-Tech (identical). Code lists cross-checked between EddieAbbondanz, HA Motorsports, and Innova. One conflict documented: code 12 interpretation (HA Motorsports conflates OBD0/OBD1/OBD2 codes; correct OBD1 interpretation is "system pass"). |
| 5 | **No swallowed errors.** Every `catch {}` block either re-throws, logs, or has a justification. | ✅ N/A | No code written — pure markdown documentation. |
| 6 | **Documentation in sync.** If the task changes behavior, flags, file layout, or conventions: update README.md and/or CLAUDE.md in the same commit. | ✅ N/A | This task adds a research document; it does not change behavior, flags, file layout, or conventions. No README/CLAUDE.md update needed. |
| 7 | **STATE.md updated.** Move the task to Done with date + commit SHA. Add any newly-discovered follow-ups to the appropriate phase backlog. | ⏳ In progress | Being updated in this step. |
| 8 | **CI green.** `npm run typecheck && npm run lint && npm test && npm run format:check` all pass locally before push. | ✅ N/A | Project has no npm typecheck/lint/test/format scripts. `package.json` test script is a placeholder (`echo "Error: no test specified"`). |
| 9 | **No regressions.** Run the full test suite, not just the new tests. | ✅ N/A | No test suite exists for this documentation project. |
| 10 | **Reviewable diff.** Single-purpose commits. No drive-by reformatting. Commit messages follow conventional prefix. | ✅ | Single-purpose commit with `docs:` prefix. Only 2 files changed (research doc + index). No drive-by changes. |
