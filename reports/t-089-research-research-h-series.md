# Report: T-089 — Research H-Series Friction Losses

## Task

- [x] **(S)** T-089 [research] Research H-series friction losses: piston ring friction, bearing friction, windage losses, total pumping -- full spec: docs/plans/02-h-series-specs.md @ T-089 — done 2026-05-15

## Summary

This task researched internal friction losses in Honda H-series engines across four categories: piston ring friction (~30–40% of total FMEP), bearing friction (main bearings 8.6%, rod bearings 4.8%), windage losses (crankcase aero drag ~7.7%), and pumping losses (work to move air through intake/exhaust, 7% part load / 1% full load). The research compiled data from peer-reviewed ASME papers, U.S. DOE reports, MIT course materials, manufacturer specifications (ACL Bearings, CP Carrillo), and community sources (Honda-Tech, PreludePower, Speed-Talk). Key findings include complete bearing clearance specifications with color-coded selection charts for H22A/H22A4, piston ring end gap specs, windage tray/baffle plate OEM part numbers, and VTEC's effect on pumping losses. Total engine friction breakdown table provided for typical inline-4 SI engine applied to H-series context.

## Files Changed

- **`research/h-series/specifications/h-series-friction-losses.md`** — New research document covering piston ring friction, bearing friction, windage losses, and pumping losses for H-series engines. 372 lines, follows `research/template.md` format with Summary, Specifications tables, Sources (20 entries), Notes (conflicts/discrepancies/open questions), Citations, and Appendix with calculations.
- **`research/indexes/master-index.md`** — Added entry for `h-series-friction-losses.md` under Technical Specifications section with description and completion marker.

## Commands Run

```
npm run typecheck   → Missing script (documentation-only project)
npm run lint        → Missing script (documentation-only project)
npm test            → "Error: no test specified" (documentation-only project)
npm run format:check → Missing script (documentation-only project)
```

**Note:** This is a documentation-only research project with no TypeScript code, build scripts, or CI pipeline. The `package.json` contains only `"test": "echo \"Error: no test specified\" && exit 1"`. No typecheck, lint, or format scripts exist. The "CI green" DoD requirement applies to code projects; this deliverable is a markdown research document.

## Manual Verification

```bash
$ wc -l research/h-series/specifications/h-series-friction-losses.md
372 research/h-series/specifications/h-series-friction-losses.md

$ head -5 research/h-series/specifications/h-series-friction-losses.md
# H-Series Friction Losses — Piston Ring, Bearing, Windage, and Pumping Losses

> **Task:** T-089 [research]
> **Date:** 2026-05-15
> **Author:** auto-research

$ grep -c "^##" research/h-series/specifications/h-series-friction-losses.md
38 sections found
```

File structure verified: follows template with Summary, Specifications tables (multiple), Sources (20 entries: 4 primary, 16 secondary), Notes (conflicts, assumptions, open questions), Citations (15 detailed entries), Appendix (velocity calculations, glossary). Master index updated with new entry.

## Coverage Delta

N/A — this is a new research document, not a code change. The research covers all four topics specified in the task line:
- ✅ Piston ring friction (specifications, reduction methods, H-series specifics)
- ✅ Bearing friction (main + rod specs, clearances, material, torque values)
- ✅ Windage losses (crankcase volume, baffle plates, windage trays, aftermarket solutions)
- ✅ Pumping losses (intake/exhaust specs, VTEC effect, FMEP estimates by condition)

## Follow-ups Discovered

1. **Direct FMEP measurement data missing** — No published dyno motoring tests of H-series engines were found. Future task: identify if any H-series have been tested on an engine dynamometer in motoring mode to directly measure FMEP.
2. **FRM liner vs cast iron friction comparison** — No comparative studies found between FRM liner sliding friction and traditional cast iron liners. Potential research gap.
3. **Balancer shaft parasitic loss quantification** — The 0.5–1.5% estimate is generic; no H-series-specific data found.
4. **Pumping FMEP by variant** — Different intake/exhaust designs (Redtop dual runner vs Blacktop single runner) should produce measurable pumping differences; no published data.

## Commit SHA(s)

Pending commit after all DoD items are satisfied.

## DoD Checklist

1. **[x] Researched** — Information gathered from 20 online sources (tavily search/extract): peer-reviewed ASME paper (Achates Power ICEF2018-9610), U.S. DOE report, MIT lecture notes, x-engineer.org, DieselNet, ACL Bearings catalog, CP Carrillo instructions, Engine Builder Magazine, Diva-Portal academic paper, Sathyabama course material, Honda-Tech forums, PreludePower forums, Speed-Talk forums, retailer product pages (Extreme PSI, 1320 Performance), Smeding Performance blog, Driven Racing Oil blog, Innovation Discoveries Facebook post. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/specifications/h-series-friction-losses.md`. File follows the template in `research/template.md`: includes Summary, Specifications tables (multiple), Sources (primary and secondary with credibility assessment), Notes (conflicts, assumptions, open questions), Citations (15 detailed entries), and Appendix (calculations, glossary).

3. **[x] Indexed** — `research/indexes/master-index.md` updated with entry for `h-series-friction-losses.md` under Technical Specifications section with description and completion marker (T-089, 2026-05-15).

4. **[x] Verified** — Cross-checked against multiple independent sources where possible. Notable conflicts documented: second ring end gap specification differs between QWEN.md (0.30–0.45 mm) and Innovation Discoveries (0.40–0.55 mm); piston ring friction percentage varies from 30.7% (Achates diesel) to 40% (general SI consensus). Both discrepancies noted with explanations.

5. **[x] No swallowed errors** — N/A for documentation-only project. No code written.

6. **[x] Documentation in sync** — README.md and CLAUDE.md do not need updates (no behavior/flags/layout/conventions changed; this is a new research document added to existing structure).

7. **[ ] STATE.md updated** — Pending commit. Will move task to Done with date + commit SHA.

8. **[ ] CI green** — N/A. This is a documentation-only project with no typecheck, lint, format, or test scripts. The `package.json` contains only a placeholder test command that exits with error.

9. **[ ] No regressions** — N/A. No code changes; only new files added.

10. **[ ] Reviewable diff** — Single-purpose commits planned: (1) add research document + update index, (2) update STATE.md + write report. Conventional prefix: `docs:`. No drive-by reformatting.
