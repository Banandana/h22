# T-078 Research Report — H-Series Crankcase Volume, Oil Capacity & Windage Tray Design

## Task

- [x] **(M)** T-078 [research] Research H-series crankcase volume: oil capacity, windage tray design, scavenging efficiency -- full spec: docs/plans/02-h-series-specs.md @ T-078

## Summary

Completed comprehensive research on Honda H-series crankcase volume specifications, oil capacity across variants and service procedures, windage tray/baffle plate design, and scavenging efficiency. The research identified two coexisting oil capacity figures (3.8–4.0 L drain-and-refill vs 5.1 US qt practical fill), documented OEM baffle plate part numbers and function, confirmed that balance shaft seal failure is unrelated to baffle plate presence, and compared OBD1 alloy sump vs OBD2 standard pan geometries. All findings are cited with source URLs and retrieval timestamps.

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h-series-crankcase-volume.md` | New research file covering oil capacity specs, windage tray design, scavenging efficiency, crankcase volume estimation, and aftermarket options |
| `research/indexes/master-index.md` | Added reference to new h-series-crankcase-volume.md in Technical Specifications section |
| `QWEN.md` | Expanded Oil Pan section with detailed oil capacity specs, baffle plate part numbers, scavenging architecture, and aftermarket pan data |

## Commands Run

No npm-based tooling required for this research task (no code changes). Web research performed via tavily-mcp search and extract tools.

## Manual Verification

Research was verified by cross-checking multiple independent sources:
- Honda TechInfo IT9696 official service manual (3.8 L / 4.0 L factory specs)
- NZHondas.com forum thread (2006, 10+ independent confirmations of 4.25–5.0 L fills)
- Honda-Tech forum thread (2003, confirms 5.2 qt factory spec with filter)
- PreludePower forum case study (2012, real-world missing baffle plate assessment)
- Honda Parts Now catalog (OEM part numbers and pricing)
- Aftermarket product pages (Moroso, 1320 Performance)

All claims were cross-referenced against at least 2 independent sources where possible. Conflicts noted in the research file (oil capacity range variation explained by drain thoroughness, oil cooler equipment, ATTS model differences).

## Coverage Delta

N/A — this is a pure research/documentation task with no code changes.

## Follow-ups Discovered

None. The research was exhaustive within the scope defined by the task line. No new STATE.md backlog items were spawned.

## Commit SHA(s)

```
ce8ccac docs: T-078 Research H-series crankcase volume, oil capacity, windage tray design, scavenging efficiency
```

## DoD Checklist

- [x] **Researched** — Information gathered from Honda TechInfo official service manual, Honda Parts Now catalog, 3 enthusiast forums (NZHondas.com, Honda-Tech, PreludePower), and aftermarket manufacturer product pages. All claims cited with source URLs and retrieval timestamps (2026-05-15).

- [x] **Written** — Findings saved to `research/h-series/specifications/h-series-crankcase-volume.md` following the template format used by prior specification research files (h-series-displacement.md, h-series-stroke-dimensions.md, etc.).

- [x] **Indexed** — `research/indexes/master-index.md` updated with link to new content in the Technical Specifications section.

- [x] **Verified** — Cross-checked against 4+ independent sources where possible. Honda TechInfo + NZHondas.com + Honda-Tech + PreludePower all corroborate oil capacity figures. Conflicts noted (capacity range 4.25–5.5 L explained by drain thoroughness, oil cooler, ATTS model differences).

- [x] **No swallowed errors** — N/A (documentation-only task, no code changes).

- [x] **Documentation in sync** — QWEN.md updated with expanded crankcase/oil capacity/windage tray data in the same commit. README.md and CLAUDE.md did not require changes (no behavior/flags/layout changes).

- [x] **STATE.md updated** — Task moved to Done archive with date (2026-05-15) and commit SHA (ce8ccac).

- [x] **CI green** — N/A (no code changes; typecheck/lint/test/format not applicable to documentation-only task).

- [x] **No regressions** — N/A (no code changes).

- [x] **Reviewable diff** — Single-purpose commit with conventional prefix `docs:`. No drive-by reformatting. Three files changed with clear purpose.
