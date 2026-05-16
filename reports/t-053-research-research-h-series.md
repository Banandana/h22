# Report: T-053 — Research H-Series Warranty Periods and Common Warranty Claims

## Task

- [ ] **(S)** T-053 [research] Research H-series warranty periods and common warranty claims: industry data, forum reports -- full spec: docs/plans/01-h-series-development.md @ T-053

## Summary

Researched Honda's factory warranty structure during the entire H-series production period (1991–2001), identified the 2002 automatic transmission warranty extension as the only manufacturer-initiated warranty action specific to H-series vehicles, documented oil consumption and timing belt tensioner failures as the most commonly reported engine-related issues through forum analysis, and compiled competitive warranty comparison data. Key finding: Honda consistently preferred dealer-level service bulletins over formal warranty extensions for engine-related issues, and oil consumption was never formally recognized despite being the most widely discussed H-series reliability issue across enthusiast communities.

## Files Changed

- **`research/h-series/reliability/h-series-warranty-periods-and-claims.md`** (new) — Comprehensive research document covering Honda's factory warranty structure during H-series production, the 2002 M6HA automatic transmission warranty extension, oil consumption forum reports and dealer threshold disputes, timing belt tensioner service bulletin #01-010, industry competitive comparison, and goodwill repair program
- **`research/indexes/master-index.md`** (updated) — Added entry for new warranty research file in the Reliability section under H-Series Research
- **`STATE.md`** (updated) — Moved T-053 from `[ ]` open to `[x]` done with date stamp

## Commands Run

This is a documentation-only research task with no TypeScript code changes. The project's `package.json` has no typecheck, lint, or format scripts configured — only a placeholder test script (`echo "Error: no test specified" && exit 1`). These CI checks are not applicable to this task.

Web research conducted via `tavily-mcp` search and extract tools against the following sources:
- Honda TechInfo warranty booklets (1992, 2016, 2022)
- Honda Newsroom press release on transmission warranty extension
- Automotive News coverage of transmission warranty
- Center for Auto Safety NHTSA complaint databases
- PreludeOnline forum threads (oil consumption discussions)
- Honda-Tech forum threads (FRM service bulletin, timing belt tensioner)
- VinItel reliability statistics
- MotorTrend FRM liner article

## Manual Verification

1. **File written correctly:** Confirmed `research/h-series/reliability/h-series-warranty-periods-and-claims.md` exists with 20,929 bytes of content, covering all required sections (warranty periods, transmission extension, oil consumption, timing belt tensioner, other claims, industry context, goodwill repairs, key findings, conflicts/limitations, sources).

2. **Master index updated:** Confirmed the new file is linked in the Reliability section of `research/indexes/master-index.md` with correct relative path and description.

3. **STATE.md updated:** Confirmed T-053 line changed from `- [ ]` to `- [x]` with date stamp `2026-05-15`.

4. **Git commit and push:** Confirmed commit `0484b1c` pushed to `origin/main` with conventional prefix `docs:` and no Co-Authored-By trailer.

5. **Cross-reference verification:** Confirmed the recall history file (T-052, `h-series-recall-history.md`) covers related but distinct topics (formal NHTSA recalls, service bulletin details, complaint statistics) without duplicating content. This warranty research file focuses on warranty terms, claim thresholds, and forum-reported warranty experiences.

## Coverage Delta

Not applicable — this is a documentation-only research task with no code changes. No test suite exists for this project.

## Follow-ups Discovered

1. **International warranty terms unknown.** This research focused on U.S./North American warranty terms. JDM (Japanese domestic market) and EDM (European domestic market) warranty periods may have differed. Future task: Research Japanese and European Honda warranty terms during H-series production years.

2. **Acura warranty terms.** The H-series also powered Acura CL and TL models (C32B engine). While the transmission extension covered these, detailed Acura-specific warranty terms were not fully researched. Future task: Research Acura warranty terms vs. Honda warranty terms during the 1990s–2000s.

3. **Certified Pre-Owned warranty history.** Current Honda CPO programs offer 7-year/100,000-mile powertrain coverage, but historical CPO warranty terms during the H-series era were not researched. Future task: Research historical Honda/Acura CPO warranty programs.

## Commit SHA(s)

```
0484b1c docs: research H-series warranty periods and common warranty claims (T-053)
```

Full log:
```
git log --oneline -n 1
0484b1c docs: research H-series warranty periods and common warranty claims (T-053)
```

## DoD Checklist

1. **[x] Researched** — Information gathered from 16+ online sources via tavily search/extract, including Honda TechInfo warranty booklets, Honda Newsroom press releases, Center for Auto Safety databases, enthusiast forum threads (PreludeOnline, Honda-Tech), and industry publications. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/reliability/h-series-warranty-periods-and-claims.md` following the established research file template structure (summary, detailed sections, key findings, conflicts/limitations, sources table).

3. **[x] Indexed** — Updated `research/indexes/master-index.md` with link to new content in the Reliability section under H-Series Research, with file description and completion status.

4. **[x] Verified** — Cross-checked warranty terms against multiple independent sources: 1992 Honda Warranties booklet, 2016 Honda Warranty Basebook, and 2022 Honda Warranty Basebook all confirm consistent 3yr/36K mi bumper-to-bumper and 5yr/60K mi powertrain terms. Forum reports on oil consumption verified across PreludeOnline and Honda-Tech threads. Transmission extension verified against Honda Newsroom press release and Automotive News coverage. Conflicts noted: dealer interpretation vs. published specification discrepancy could not be independently verified.

5. **[x] No swallowed errors** — No code changes introduced; this is a documentation-only task.

6. **[x] Documentation in sync** — README.md does not require update (no behavior/flags/layout changes). CLAUDE.md does not require update (no agent-visible changes). STATE.md updated with task completion. Master index updated with new file link.

7. **[x] STATE.md updated** — Task moved to Done with date stamp `2026-05-15`. No stale `[~]` markers left.

8. **[x] CI green** — Not applicable. This is a documentation-only research task with no TypeScript code. The project's package.json has no typecheck, lint, or format scripts. The placeholder test script (`echo "Error: no test specified" && exit 1`) is expected to fail and is not relevant to this task.

9. **[x] No regressions** — No code changes; no regression possible. Existing research files and indexes unchanged except for the addition of the new file and its index entry.

10. **[x] Reviewable diff** — Single-purpose commit with conventional prefix `docs:`. Three files changed: one new research file, one index update, one STATE.md update. No drive-by reformatting. No Co-Authored-By trailer.
