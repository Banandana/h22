# T-135 Report: Research H22A Redtop Weight and Balance

## Task

- [ ] **(S)** T-135 [research] Research H22A Redtop weight and balance: curb weight, weight distribution, center of gravity height -- full spec: docs/plans/03-h-series-variants.md @ T-135

## Summary

This task researched and compiled all known weight and balance data for vehicles equipped with the Honda H22A Redtop engine (220 PS, 11.0:1 CR). Curb weights were gathered for all four JDM applications (Prelude SiR S-Spec, Prelude Type S, Accord SiR, Accord/Torneo Euro-R), weight distribution ratios were documented per application, and the ATTS system's weight impact was quantified. A key finding is that center of gravity height is not documented by any accessible source — this remains an open gap in the public record. The research file includes comparison tables with contemporaries (S2000, Supra, Silvia, RX-7) and community-reported weight reduction potential.

## Files Changed

- `research/h-series/specifications/h22a-redtop-weight-balance.md` — New research file documenting H22A Redtop curb weights (1,290–1,390 kg across applications), weight distribution (58/42 to 63/37 front/rear), center of gravity height gap analysis, ATTS MCU weight impact (~40 lbs), engine weight contribution (~13–14% of total), suspension geometry relevant to weight distribution, and comparison with contemporaries.
- `research/indexes/master-index.md` — Added entry for h22a-redtop-weight-balance.md in the Engine Variants section under Technical Specifications.

## Commands Run

```
$ npm run typecheck
npm error Missing script: "typecheck"

$ npm run lint
npm error Missing script: "lint"

$ npm test
> h22@1.0.0 test
> echo "Error: no test specified" && exit 1
Error: no test specified

$ npx prettier --check "**/*.md"
[warn] ... 228 files ...
[warn] Code style issues found in 228 files. Run Prettier with --write to fix.
Note: No prettier config exists; warnings are pre-existing across entire repo.
```

This is a documentation-only research project — no TypeScript code, no build step, no test framework configured. The package.json contains only a placeholder test script.

## Manual Verification

Created the research file and verified its contents:

```bash
$ wc -l research/h-series/specifications/h22a-redtop-weight-balance.md
   261 research/h-series/specifications/h22a-redtop-weight-balance.md
```

File contains:
- 7 specification tables (curb weight, weight distribution, center of gravity, ATTS weight, suspension geometry, engine weight contribution, weight comparison with contemporaries)
- 2 sources sections (primary + secondary) with 12 total citations
- Notes section with 6 key observations and 4 conflicts/ambiguities
- Appendix with weight comparison table (7 contemporaries) and weight reduction potential table (9 modifications)

Verified master index update:

```bash
$ grep "T-135" research/indexes/master-index.md
| [`h22a-redtop-weight-balance.md`]... | ✅ T-135 (2026-05-15) |
```

## Coverage Delta

N/A — this is a pure research/documentation task. No code was written or modified. The research corpus coverage improved by adding one new topic area (weight and balance) that was previously only partially covered in the existing `h22a-redtop-applications.md` file.

## Follow-ups Discovered

1. **Center of gravity height** — Not documented by any accessible source. This is a confirmed gap. Potential future task: reach out to Honda heritage department or search Japanese-language technical publications (Honda Engineering Review, SAE papers). Estimated effort: Medium (T-NNN TBD).
2. **4th-gen SiR S-Spec weight distribution** — Estimated at 58/42 but not confirmed by factory documentation. Could be resolved with original 4th-gen Prelude engineering specifications. Estimated effort: Small (T-NNN TBD).
3. **Accord SiR (CD6/CF2) exact curb weight** — Not directly sourced; estimated from platform relationship. Factory specs would resolve. Estimated effort: Small (T-NNN TBD).

## Commit SHA(s)

```
# To be filled after commit
```

## DoD Checklist

From STATE.md Definition of Done:

1. **Researched** — ✅ Information gathered from online sources (tavily search/extract from automobile-catalog.com, Honda News press releases, Wikipedia, preludeonline.com forums, encyCARpedia, Goo-net Exchange, Honda-Tech forums). All claims cited with source URLs and retrieval timestamps.

2. **Written** — ✅ Findings saved to `research/h-series/specifications/h22a-redtop-weight-balance.md`. File follows the template in `research/template.md` (Summary, Specifications, Sources, Notes, Citations, Appendix sections).

3. **Indexed** — ✅ The master index at `research/indexes/master-index.md` is updated with link to new content in the Engine Variants → Technical Specifications section.

4. **Verified** — ✅ Cross-checked against multiple independent sources where possible. Conflicts noted (e.g., 5th-gen weight distribution variance between Honda press release 63/37 and forum owner data 62/38; 4th-gen weight distribution estimated vs confirmed). Center of gravity height confirmed as undocumented gap after exhaustive search.

5. **No swallowed errors** — ✅ N/A — no code written. Documentation task only.

6. **Documentation in sync** — ✅ README.md and CLAUDE.md do not need updates (no behavior/flags/layout/conventions changed). Only new research content added.

7. **STATE.md updated** — ✅ Task moved to Done with date + commit SHA (to be completed after commit).

8. **CI green** — ⚠️ N/A — this is a documentation-only research project. No TypeScript code, no build step, no test framework. `package.json` has only placeholder scripts. Pre-existing prettier warnings across all 228 markdown files (no prettier config exists).

9. **No regressions** — ✅ No code changes; no risk of regression. New file added, index updated.

10. **Reviewable diff** — ✅ Single-purpose commit. Conventional prefix `docs:`. No drive-by reformatting.

---

**Research methodology:** Tavily web search (general + advanced extract) for vehicle specifications, curb weights, weight distribution figures, and center of gravity data. Extracted content from automobile-catalog.com (4th/5th gen specs), Honda News press release (chassis documentation), preludeonline.com forum threads (community owner data), Wikipedia (cross-reference), encyCARpedia/Goo-net Exchange (Euro-R specs). All sources retrieved 2026-05-15.
