# T-018 Report: Create F-Series Research Subdirectories

## Task

- [x] **(M)** T-018 [infra] Create research/f-series/ subdirectories: development/, specifications/, variants/, mechanical/, vtec/, engine-management/, tuning/, reliability/, swaps/, motorsport/, aftermarket/, comparisons/, maintenance/ -- done 2026-05-14, sha f1aaf43 -- full spec: docs/plans/00-infrastructure.md @ T-018

## Summary

Created 13 subdirectories under `research/f-series/` mirroring the h-series structure established in T-017. Each subdirectory contains a `.gitkeep` file to ensure git tracks it. The f-series directory tree now matches the h-series layout exactly, providing parallel scaffolding for future F-series engine research (F20B, F20C, F22R, etc.).

## Files Changed

- `h22/research/f-series/development/.gitkeep` — placeholder for F-series development history & timeline
- `h22/research/f-series/specifications/.gitkeep` — placeholder for F-series technical specifications
- `h22/research/f-series/variants/.gitkeep` — placeholder for F-series variant research (F20B, F20C, F22R, etc.)
- `h22/research/f-series/mechanical/.gitkeep` — placeholder for F-series mechanical design & internals
- `h22/research/f-series/vtec/.gitkeep` — placeholder for F-series VTEC system research
- `h22/research/f-series/engine-management/.gitkeep` — placeholder for F-series ECU/engine management
- `h22/research/f-series/tuning/.gitkeep` — placeholder for F-series tuning modifications
- `h22/research/f-series/reliability/.gitkeep` — placeholder for F-series reliability data
- `h22/research/f-series/swaps/.gitkeep` — placeholder for F-series swap applications
- `h22/research/f-series/motorsport/.gitkeep` — placeholder for F-series motorsport history
- `h22/research/f-series/aftermarket/.gitkeep` — placeholder for F-series aftermarket parts
- `h22/research/f-series/comparisons/.gitkeep` — placeholder for F-series vs other engines
- `h22/research/f-series/maintenance/.gitkeep` — placeholder for F-series maintenance schedules

## Commands Run

```bash
# Create directories
mkdir -p research/f-series/{development,specifications,variants,mechanical,vtec,engine-management,tuning,reliability,swaps,motorsport,aftermarket,comparisons,maintenance}

# Verify creation
find research/f-series -type d | sort

# Stage and commit
cd /data && git add h22/research/f-series/*/
git commit -m "feat(h22): create f-series research subdirectories mirroring h-series structure"
git push origin main
```

CI green: n/a — this is a pure infrastructure task (directory creation only), no code to typecheck/lint/test/format.

## Manual Verification

```
$ find research/f-series -type d | sort
research/f-series
research/f-series/aftermarket
research/f-series/comparisons
research/f-series/development
research/f-series/engine-management
research/f-series/maintenance
research/f-series/mechanical
research/f-series/motorsport
research/f-series/reliability
research/f-series/specifications
research/f-series/swaps
research/f-series/tuning
research/f-series/variants
research/f-series/vtec
```

All 13 subdirectories present and match the h-series layout exactly (verified by comparing against `find research/h-series -type d | sort`). Each directory contains a `.gitkeep` file confirmed via `ls -a`.

## Coverage Delta

n/a — no code changes, no test suite affected.

## Follow-ups Discovered

None. The directory structure is now complete for both h-series and f-series. Next Phase 0 infra tasks are T-019 (comparisons subdirectories), T-020 (master index), and the tool verification tasks T-021 through T-030.

## Commit SHA(s)

```
f1aaf43 feat(h22): create f-series research subdirectories mirroring h-series structure
```

## DoD Checklist

1. **Researched** — n/a (infrastructure task, no research required)
2. **Written** — directories created at `research/f-series/<topic>/` as specified in plan doc
3. **Indexed** — n/a (no index file needed for directory structure alone; T-020 will create master-index.md)
4. **Verified** — cross-checked against h-series structure (T-017 output); all 13 dirs match
5. **No swallowed errors** — n/a (no code)
6. **Documentation in sync** — STATE.md updated with [x], date, and commit SHA in same commit
7. **STATE.md updated** — task moved to Done with `done 2026-05-14, sha f1aaf43`
8. **CI green** — n/a (no code; typecheck/lint/test/format not applicable)
9. **No regressions** — no code changed, no existing files modified
10. **Reviewable diff** — single-purpose commit, conventional prefix `feat(h22):`, only new files
