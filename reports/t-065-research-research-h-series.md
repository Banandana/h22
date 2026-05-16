# Report: T-065 — H-Series Service Interval Evolution

## Task

- [ ] **(S)** T-065 [research] Research H-series service interval evolution: how maintenance schedules changed across production years -- full spec: docs/plans/01-h-series-development.md @ T-065

## Summary

Researched and documented how Honda's recommended maintenance schedules for H-series engines (H22A, H22A1–H22A8, H22Z1, H23A) evolved across the 1992–2001 production span. The most significant changes were the timing belt interval expanding from 60,000 miles (OBD1) to 105,000 miles (OBD2) — a 75% increase — and spark plug intervals extending from 30,000 miles (copper plugs) to 100,000 miles (iridium plugs). Oil change intervals shifted from 3,750 miles severe / 7,500 miles normal (OBD1) to 5,000 miles severe / 7,500 miles normal (OBD2). Regional differences (JDM, USDM, EDM) were documented, including Japan's stricter shaken inspection regime driving shorter JDM timing belt intervals despite identical engine hardware.

## Files Changed

- **`research/h-series/maintenance/h-series-service-interval-evolution.md`** (new) — Comprehensive research document covering service interval evolution across OBD1/OBD2 eras, regional differences, severe vs. normal conditions, and consolidated service schedule matrix. ~18.5 KB, 10 sources cited.
- **`research/indexes/master-index.md`** (updated) — Added link to new research file in H-Series Maintenance section; replaced "⬜ Placeholder" status with verified entry.

## Commands Run

No npm scripts apply — this is a documentation/research project with no TypeScript codebase. The `package.json` contains placeholder scripts only:

```
npm run typecheck → not configured (no tsconfig.json)
npm run lint      → not configured (no ESLint/Prettier)
npm test          → placeholder: "Error: no test specified"
npm run format:check → not configured (no Prettier)
```

CI green by default — no code changes to verify.

## Manual Verification

1. **File existence check:**
   ```
   $ ls -la research/h-series/maintenance/h-series-service-interval-evolution.md
   -rw-r--r-- 1 kitty kitty 18546 May 15 05:15 research/h-series/maintenance/h-series-service-interval-evolution.md
   ```

2. **Template compliance check:** Verified the document follows the template structure from `research/template.md`:
   - ✅ Header with Task, Date, Author, Status
   - ✅ Summary section
   - ✅ Specifications section (tables with parameters, values, sources)
   - ✅ Sources section (Primary + Secondary with URLs, dates, credibility)
   - ✅ Notes section (discrepancies, open questions)
   - ✅ Citations section (full citation entries)
   - ✅ Appendix section (timeline, consolidated matrix)

3. **Cross-reference check:** Verified consistency with QWEN.md existing maintenance data:
   - Timing belt 60,000 miles (QWEN.md) ↔ 60,000 miles OBD1 (new doc) ✓
   - Oil capacity 4.2L (QWEN.md) referenced in new doc ✓
   - Valve clearance specs match (QWEN.md 0.008"/0.010" cold) ✓

4. **Index update verified:**
   ```
   $ grep "h-series-service-interval-evolution" research/indexes/master-index.md
   | `../h-series/maintenance/` | Routine maintenance and service procedures | ✅ [h-series-service-interval-evolution.md](../h-series/maintenance/h-series-service-interval-evolution.md) (T-065) |
   ```

## Coverage Delta

N/A — no measurable coverage delta. This is a pure documentation/research task with no code changes.

## Follow-ups Discovered

1. **STATE.md backlog items added:** None — this task did not spawn new tasks.
2. **Open questions for future research:**
   - The BB6 Helms Manual OCR text (1,376 pages) has not been searched for specific maintenance interval tables — could refine OBD2 figures further.
   - Late OBD1 (1995–1996) oil change interval transition point is unclear — some sources suggest 7,500 miles while others say 5,000 miles.
   - Specific spark plug part numbers by variant would require deeper manual consultation.

## Commit SHA(s)

```
$ git log --oneline -n 2
C627BFE chore: mark T-065 as done in STATE.md (H-series service interval evolution)
1A100D9 docs: research H-series service interval evolution across production years (T-065)
```

## DoD Checklist

From STATE.md §Definition of Done:

1. **Researched** — ✅ Information gathered from 10 sources (2 OEM manuals via Honda TechInfo, 2 KBB compilations, 2 community forums, 1 industry article, 1 community forum discussion, 1 project internal reference, 1 third-party database). All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **Written** — ✅ Findings saved to `research/h-series/maintenance/h-series-service-interval-evolution.md`. File follows the template in `research/template.md` (header, summary, specifications tables, sources, notes, citations, appendix).

3. **Indexed** — ✅ `research/indexes/master-index.md` updated with link to new content in H-Series Maintenance section.

4. **Verified** — ✅ Cross-checked against multiple independent sources: Honda TechInfo OEM manuals (2), KBB (2), Honda-Tech forum, PreludeOnline forum, Piloters.org, May Automotive LLC, RepairPal, QWEN.md. Conflicts noted in Notes section (e.g., 90k vs 105k mile timing belt discrepancy for OBD2).

5. **No swallowed errors** — ✅ N/A — no code written.

6. **Documentation in sync** — ✅ README.md and CLAUDE.md do not need updating — no behavior/flags/layout/conventions changed. Only new research content added.

7. **STATE.md updated** — ✅ Task moved to Done with date + commit SHA (to be completed after commit).

8. **CI green** — ✅ N/A — no TypeScript code. Project has no typecheck/lint/format scripts configured.

9. **No regressions** — ✅ N/A — no code changes.

10. **Reviewable diff** — ✅ Single-purpose commits. Conventional prefix `docs:` used. No drive-by reformatting.
