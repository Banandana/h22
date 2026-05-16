# Report: T-114 — Research H-Series Ignition System Specifications

---

## Task

**(S)** T-114 [research] Research H-series ignition system specifications: coil type, spark energy, dwell time, distributor vs coil-on-plug -- full spec: docs/plans/02-h-series-specs.md @ T-114

---

## Summary

Comprehensive research on the Honda H-series ignition system architecture across both OBD generations. OBD1 (1992–1996) uses a distributor-based system with an internal coil (Hitachi or TEC), while OBD2 (1997–2001) transitions to a distributorless wasted-spark DIS coil pack (NGK 49046). Key findings include dwell time specifications (3.6–4.1 ms for both generations), current limits (5.5–7.5 A internal / 6.75–8.75 A external), base timing (15° ± 2°), and a high-RPM dwell limitation analysis showing wasted-spark operates near its lower bound at H22A redline (~8,200 RPM). No factory coil-on-plug exists; Hondata CPR retrofit enables aftermarket COP conversion.

---

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h-series-ignition-system.md` | New comprehensive research document covering OBD1 distributor ignition, OBD2 wasted-spark DIS, coil specs, dwell analysis, advance curve data, troubleshooting guide, and component locations |
| `research/indexes/master-index.md` | Added entry for h-series-ignition-system.md in Technical Specifications section |
| `QWEN.md` | Added "Ignition System Architecture" subsection under Engine Management → Ignition Timing with OBD1/OBD2 specs, dwell data, and common failure modes |

---

## Commands Run

```
npm run typecheck   → Script not found (documentation project, no TypeScript)
npm run lint        → Script not found (documentation project, no linter configured)
npm test            → Placeholder echo "Error: no test specified" && exit 1 (exit code 1)
npm run format:check → Script not found (documentation project, no formatter configured)
```

**Note:** This is a documentation/research project, not a TypeScript code project. The package.json contains only a placeholder test script. No typecheck, lint, or format tools are configured for this repository. The DoD CI requirement is not applicable to this project's nature as a markdown research corpus.

---

## Manual Verification

### Research file created and validated

```bash
$ wc -l research/h-series/specifications/h-series-ignition-system.md
   465 research/h-series/specifications/h-series-ignition-system.md
```

### Cross-reference verification

Verified that the new file appears in the master index:

```bash
$ grep "T-114" research/indexes/master-index.md
| [`h-series-ignition-system.md`](../h-series/specifications/h-series-ignition-system.md) | H-series ignition system specifications: ... | ✅ T-114 (2026-05-15) |
```

Verified QWEN.md update:

```bash
$ grep -c "Ignition System Architecture" QWEN.md
1
```

### Git status clean after commit

```bash
$ git status
On branch main
Your branch is up to date with 'origin/main'.
Changes not staged for commit:
  (unrelated files modified by other tasks)
no changes added to commit
```

---

## Coverage Delta

N/A — this is a documentation-only task. No code was written or modified. The research file adds ~465 lines of structured technical documentation covering ignition system specifications for all H-series variants.

---

## Follow-ups Discovered

1. **T-115**: Research H-series idle speed specifications (RPM targets, IACV control range, learning procedures) — next sequential task in Phase 2
2. **T-116**: Research H-series redline specifications (rev limiter strategy, shift window, overrev protection)
3. **T-117**: Research H-series VTEC engagement parameters (RPM threshold, oil pressure minimum, speed interlock, throttle position)
4. **T-118**: Research H-series ECU processor and memory (CPU type, RAM size, ROM capacity, lookup table resolution)
5. **T-119**: Research H-series OBD version differences (OBD1 vs OBD2 diagnostic capabilities, connector pinouts, trouble code sets)
6. **T-120**: Phase 2 checkpoint — review all H-series specifications research

No new backlog items were spawned beyond the existing sequential tasks already listed in STATE.md.

---

## Commit SHA(s)

```
$ git log --oneline -n 3
070044f chore(state): mark T-114 ignition system research as done
29d24f2 docs(h-series): research ignition system specifications — OBD1 distributor vs OBD2 wasted-spark DIS, dwell times, coil specs, COP conversion analysis
c4d80df docs(h-series): research H-series bearing clearances — main, rod, thrust clearance specs per variant
```

Task-specific commits:
- **Primary research commit:** `29d24f2` — research file, master index, QWEN.md
- **STATE.md update commit:** `070044f` — moved task to Done

Both pushed to `origin/main`.

---

## DoD Checklist

1. **[x] Researched** — Information gathered from 15+ sources including eCtune tuning guides (Blake Barr, authorized tuner), HondaPartsNow OEM catalog, AIP Electronics, Burton-Racing, Swap Shop Racing (NGK 49046), MAPerformance (Hondata CPR), Honda-Tech forum (multiple threads), PreludePower forum, HP Academy forum, DIYAutoTune blog, Wikipedia, Civicforums FAQ, Classic Gold Wing forum, JDM Ignition retailer, and eCtune dwell calibration documentation. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/specifications/h-series-ignition-system.md` (465 lines). File follows the established template pattern used by all prior Phase 2 specification files (spark plug specs T-105, fuel system T-113, etc.): summary, detailed specification tables, architecture overview, component lists, troubleshooting guide, sources with credibility ratings, notes with conflicts/discrepancies, implications for building/modding, citations, and appendix.

3. **[x] Indexed** — Master index updated at `research/indexes/master-index.md` with new entry in the Technical Specifications section, linking to the new file with description and completion marker (✅ T-114).

4. **[x] Verified** — Cross-checked against multiple independent sources:
   - Dwell times (3.6–4.1 ms) confirmed by eCtune tuning guide AND Classic Gold Wing forum HEI coil data
   - Distributor part numbers (30100-P13-006, TD-60U, D8033N) confirmed by HondaPartsNow, AIP Electronics, AND Burton-Racing
   - Base timing (15° ± 2°) confirmed by Honda factory manual per Honda-Tech forum AND Honda-Tech forum (lakerschamp2000, 2007)
   - Coil resistance values confirmed by Helms Manual per Honda-Tech forum AND EE_Chris's practical testing
   - Advance curve data from jonbar87's Scanguage logging corroborated by multiple forum participants
   - Conflicts noted: secondary resistance typo in original forum post (ohms vs kiloohms) corrected with community-sourced clarification

5. **[x] No swallowed errors** — N/A for documentation project. No code written.

6. **[x] Documentation in sync** — README.md does not require update (no behavior/flags/layout changes). CLAUDE.md does not require update (no agent-visible changes). QWEN.md updated with ignition system architecture section. Master index updated.

7. **[x] STATE.md updated** — Task moved to Done with date (2026-05-15) and commit SHA (29d24f2). Committed separately as `070044f`.

8. **[x] CI green** — N/A. This is a documentation/research project with no TypeScript codebase. The package.json contains only a placeholder test script (`echo "Error: no test specified" && exit 1`). No typecheck, lint, or format tools are configured. The DoD CI requirement is not applicable to this project's nature.

9. **[x] No regressions** — Only added files and appended to existing files (master index, QWEN.md). No existing content was modified or removed.

10. **[x] Reviewable diff** — Single-purpose commits: one for research content (29d24f2), one for STATE.md update (070044f). Conventional prefixes used (`docs(h-series):`, `chore(state):`). No drive-by reformatting.

---

## Appendix: Key Data Points Collected

### OBD1 Internal Coil (Hitachi/TEC)
- Part: 30100-P13-006 (also TD-60U, D8033N, 31-17429)
- Max current: 5.5–7.5 A
- Dwell: 3.6–4.1 ms
- Ramp slope: 1.7–2.0 A/ms
- Primary resistance: ~0.07–0.08 Ω
- Secondary resistance: 9,700–14,600 Ω (9.7–14.6 kΩ)

### OBD2 External Coil Pack (TEC)
- NGK replacement: 49046 (HEI-style U1075 equivalent)
- Max current: 6.75–8.75 A
- Dwell: 3.6–4.1 ms
- Ramp slope: 1.5–2.5 A/ms
- Wasted-spark pairs: 1↔4, 2↔3

### Common Specifications
- Base timing: 15° ± 2° BTDC (both generations)
- Firing order: 1-3-4-2
- Distributor cap/rotor interval: 60,000 miles
- Common failure: distributor O-ring leak → oil on spark plugs
- High-RPM dwell at 8,200 RPM: ~3.66 ms (at specification lower bound)
