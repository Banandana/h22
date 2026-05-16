# Report: T-117 — Research H-Series VTEC Engagement Parameters

## Task

```
- [x] **(S)** T-117 [research] Research H-series VTEC engagement parameters: RPM threshold, oil pressure minimum, speed interlock, throttle position -- full spec: docs/plans/02-h-series-specs.md @ T-117 — done 2026-05-15, sha 5af83a2
```

## Summary

This task researched the complete VTEC engagement specification for the Honda H-series engine family (H22A, H22A1, H22A4, H23A). The research documented all five ECU-monitored conditions required for VTEC activation (RPM threshold, oil pressure minimum, vehicle speed interlock, engine temperature, and throttle position/load), variant-specific differences in engagement points across OBD1/OBD2 ECUs, the VTEC window concept (load-dependent variable crossover based on MAP readings), disengagement hysteresis, aftermarket modification ranges, and a systematic troubleshooting checklist including P1259 diagnostics. Findings were written to `research/h-series/specifications/h-series-vtec-engagement-parameters.md` with 20+ cited sources from manufacturer documentation (Hondata), community forums (Honda-Tech, preludeonline.com, preludepower.com), encyclopedic references (Wikipedia), and local compiled data (QWEN.md).

## Files Changed

- **`research/h-series/specifications/h-series-vtec-engagement-parameters.md`** (new) — Comprehensive VTEC engagement specification covering all five ECU conditions, variant-specific RPM thresholds, VTEC window/load-dependent logic, disengagement hysteresis, aftermarket tuning solutions, and diagnostic procedures. 29KB, 20+ sources.
- **`research/indexes/master-index.md`** (updated) — Added entry for new VTEC engagement parameters file in Technical Specifications section; updated VTEC System subsection to show active status with link to the new file.
- **`research/indexes/qwen-gap-analysis.md`** (updated) — Marked "VTEC engagement parameters" gap as resolved with link to completed research file.

## Commands Run

No npm commands needed — this is a pure research/documentation task with no code. All verification was done via web search/extract using tavily-mcp.

## Manual Verification

Web research performed via tavily-mcp:
1. `tavily-search` for "Honda H22A VTEC engagement RPM threshold oil pressure throttle position speed interlock specifications" — returned 10 results from Wikipedia, Hondata, Honda-Tech, preludepower.com
2. `tavily-search` for "Honda H-series VTEC crossover activation parameters ECU map 5500 rpm oil pressure switch" — returned Hondata documentation, Honda-Tech forum threads
3. `tavily-extract` from `hondata.com/help/flashpro/vtec_parameters.htm` — extracted VTEC window, RPM window, and conditions documentation
4. `tavily-extract` from `honda-tech.com/forums/honda-prelude-4/how-many-you-have-set-vtec-earlier-rpm-649594/` — extracted community consensus on VTEC crossover settings (4,400–5,100 rpm range, optimal ~4,700–4,800 rpm)
5. `tavily-search` for "Honda H22 VTEC engage minimum speed km/h throttle percentage MAP vacuum condition ECU requirements" — confirmed speed interlock (>5 km/h), temperature threshold (>40°C), load requirements
6. Cross-checked all findings against QWEN.md local compiled reference (VTEC System section) for consistency
7. Verified no conflicting data between sources; noted minor discrepancies (OBD1 ~5,200 vs OBD2 ~5,500 rpm) and documented them as calibration differences rather than errors

## Coverage Delta

N/A — this is a new research file, not a modification of existing code or tests. The qwen-gap-analysis.md was updated to mark the "VTEC engagement parameters" gap as resolved.

## Follow-ups Discovered

| Item | Priority | Notes |
|------|----------|-------|
| Exact ECU VTEC engagement tables (P28, P13, P51, P5M) — raw lookup values from ROM dumps | Medium | Would provide definitive engagement RPM per RPM sensor count and MAP value |
| VTEC engagement timing — exact milliseconds from condition satisfaction to piston engagement | Low | Dyno-data analysis needed; interesting for performance tuning |
| Comparison of H-series VTEC engagement vs. K-series (i-VTEC) engagement parameters | Low | K-series uses VTC (variable cam timing) in addition to VTEC; different logic |
| H-series VTEC engagement vs. F20C (S2000) — 7,500–7,900 rpm comparison | Low | F20C engages much higher; reflects its 8,000+ rpm redline design philosophy |
| Effect of oil temperature (separate from coolant temp) on VTEC engagement delay | Low | Does hot oil (120°C) engage faster than warm oil (60°C) at the same RPM? |
| VTEC engagement on cold starts after overnight soak — real-world observations | Low | How long does the 40°C threshold take to reach in winter vs. summer? |

## Commit SHA(s)

```
5af83a2 docs: T-117 Research H-series VTEC engagement parameters — RPM, oil pressure, speed interlock, throttle position
```

## DoD Checklist

1. **Researched** — ✅ Information gathered from online sources (tavily search/extract from Hondata, Honda-Tech, preludeonline.com, preludepower.com, Wikipedia) and local manuals (QWEN.md cross-reference). All claims cited with source URLs and retrieval timestamps.

2. **Written** — ✅ Findings saved to `research/h-series/specifications/h-series-vtec-engagement-parameters.md`. File follows the established template pattern used by previous tasks (T-116, T-115, etc.) with Summary, detailed sections, tables, cross-reference/conflict notes, follow-on items, and sources list.

3. **Indexed** — ✅ Updated `research/indexes/master-index.md` with entry in Technical Specifications section (after T-116 redline) and in VTEC System subsection. Updated `research/indexes/qwen-gap-analysis.md` to mark VTEC engagement parameters gap as resolved.

4. **Verified** — ✅ Cross-checked against 5+ independent sources where possible. Conflicts noted (e.g., Wikipedia 5,200 rpm vs preludepower.com 5,500 rpm — resolved as OBD1 vs OBD2 calibration difference). Source credibility assessed using established citation methodology.

5. **No swallowed errors** — ✅ No code changes; all research findings presented with source attribution. No assumptions made without noting them as engineering inferences.

6. **Documentation in sync** — ✅ README.md and CLAUDE.md do not need updates — this task adds research content but does not change behavior, flags, file layout, or conventions. Only STATE.md and index files were updated.

7. **STATE.md updated** — ✅ Task moved to Done with date (2026-05-15) and commit SHA (5af83a2). No stale `[~]` markers left.

8. **CI green** — ✅ N/A — no code changes. This is a pure documentation/research task.

9. **No regressions** — ✅ N/A — no code changes. Full index verification performed (master-index.md entries consistent, qwen-gap-analysis.md gap resolution accurate).

10. **Reviewable diff** — ✅ Single-purpose commit. Conventional prefix `docs:`. No drive-by reformatting. Three focused file changes: new research file + two index updates.
