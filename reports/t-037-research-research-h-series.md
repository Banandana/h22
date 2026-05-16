# T-037 Report: H-Series Aluminum Block Casting Process and Materials Science

## Task

- [x] **(S)** T-037 [research] Research H-series aluminum block casting process and materials science: alloy composition, manufacturing -- full spec: docs/plans/01-h-series-development.md @ T-037

## Summary

Comprehensive research document on the Honda H-series engine block's aluminum casting process and materials science. Covers alloy composition (A356-class Al-Si-Mg), sand casting methodology versus F-series high-pressure die casting, T6 heat treatment, cooling channel design, porosity control strategies, closed-deck to open-deck structural evolution, FRM liner in-situ formation during casting, post-casting machining considerations, and a detailed H-series vs F-series material comparison. The key finding is that despite sand casting being traditionally considered inferior to die casting for dimensional accuracy, the H-series achieves higher strength and ductility than the F-series through T6 heat treatment enabled by sand casting's lower inherent porosity.

## Files Changed

- **`research/h-series/development/h-series-aluminum-block.md`** (new) — Full research document covering H-series aluminum block alloy composition, sand casting process, cooling channel design, porosity control, structural evolution (closed deck → open deck), F-series comparison, FRM liner integration, post-casting machining, and known failure modes. 10 sections, ~15 references.
- **`research/indexes/master-index.md`** (modified) — Added entry for `h-series-aluminum-block.md` in the Development History table under H-Series Research.
- **`STATE.md`** (modified) — Moved T-037 from `[ ]` open to `[x]` done with date + commit SHA.

## Commands Run

This is a documentation-only research project with no TypeScript codebase. The following npm commands were executed and confirmed not applicable:

```
$ npm run typecheck
npm error Missing script: "typecheck"

$ npm run lint
npm error Missing script: "lint"

$ npm test
> h22@1.0.0 test
> echo "Error: no test specified" && exit 1
Error: no test specified

$ npm run format:check
npm error Missing script: "format:check"
```

**Summary:** No typecheck, lint, test, or format scripts exist in this project. All work is markdown research documents. No CI pipeline is configured for this repository.

## Manual Verification

1. **File written and readable:**
   ```
   $ wc -l research/h-series/development/h-series-aluminum-block.md
   466 research/h-series/development/h-series-aluminum-block.md
   ```
   File is 466 lines, 30,314 bytes — comprehensive coverage of all topic areas specified in the plan doc.

2. **Index updated:** Verified `master-index.md` contains the new entry for `h-series-aluminum-block.md` under the Development History section.

3. **Cross-reference integrity:** The document references T-036 (FRM liner technology, already completed) as a dependency and cross-links to QWEN.md, Honda-Tech forums, Wikipedia F-engine page, Engine Builder Magazine, Princeton composite materials notes, JSTOR SAE paper, and RS Machine technical documentation.

4. **Git status clean after commits:**
   ```
   $ git status
   On branch main
   Your branch is up to date with 'origin/main'.
   nothing to commit, working tree clean
   ```

5. **Push verified:** Both commits pushed successfully to `origin/main`:
   - `3d2a467` — docs: T-037 research H-series aluminum block casting process and materials science
   - `a531114` — chore: T-037 update STATE.md with actual commit SHA

## Coverage Delta

n/a — This task produces research documentation, not code. No test suite exists for this project. The research document adds approximately 466 lines of structured technical content covering 10 major sections with 15 cited sources.

## Follow-ups Discovered

1. **T-072** (Phase 2) — "Research H-series block materials: aluminum alloy grade, FRM liner composition, casting process" — overlaps partially with T-037 but focuses on specifications-level detail rather than the development/history context covered here. T-037 provides strong foundation for T-072.
2. **T-079** (Phase 2) — "Research H-series block rigidity: finite element analysis data, bending/torsional stiffness figures" — T-037 mentions FEM was used for F-series rib/wall optimization; similar data for H-series would be valuable follow-up.
3. **Unconfirmed alloy designation** — Honda does not publicly disclose the exact alloy used for H-series blocks. The A356-class hypothesis is well-supported by engineering context but remains unverified by primary Honda documentation. Future tasks could pursue this confirmation.

## Commit SHA(s)

```
git log --oneline -n 2
a531114 chore: T-037 update STATE.md with actual commit SHA
3d2a467 docs: T-037 research H-series aluminum block casting process and materials science
```

Primary research commit: **3d2a467**
STATE.md update commit: **a531114**

## DoD Checklist

From STATE.md Definition of Done:

1. **[x] Researched** — Information gathered from 15+ online sources (Engine Builder Magazine, Wikipedia, Princeton MAE324, JSTOR SAE paper, LangHe Industry, Bremer Manufacturing, Sunrise Metal, GM/SFSA tutorials, Honda-Tech forums, Grassroots Motorsports). All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/development/h-series-aluminum-block.md` following the established template pattern (summary, numbered sections, reference table, references). File is 466 lines / 30KB.

3. **[x] Indexed** — `research/indexes/master-index.md` updated with new entry in the Development History table under H-Series Research section, linking to the new file with one-line description and ✅ T-037 marker.

4. **[x] Verified** — Cross-checked against multiple independent sources:
   - Alloy composition: Engine Builder Magazine + LangHe Industry + SFSA/GM tutorial agree on A319/A356/A357 as standard cast aluminum block alloys.
   - Sand casting vs HPDC: Wikipedia F-engine + LangHe Industry + Sunrise Metal confirm process differences.
   - T6 heat treatment: Bremer Manufacturing + LangHe Industry + GM tutorial confirm three-step process details.
   - FRM in-situ formation: Princeton MAE324 + JSTOR Hayashi 1989 + T-036 research file corroborate preform placement method.
   - Conflicts noted: Honda does not publish exact alloy designation; A356-class is inferred hypothesis clearly labeled as such in Section 1.2.

5. **[x] No swallowed errors** — No code written; no try/catch blocks. All research findings are presented with appropriate uncertainty language ("likely," "inferred," "unconfirmed by primary documentation").

6. **[x] Documentation in sync** — README.md and CLAUDE.md do not require updates (no behavior/flags/layout/convention changes). Only research content added.

7. **[x] STATE.md updated** — T-037 moved from `[ ]` to `[x]` in Phase 1 Backlog → Done archive with date (2026-05-15) and commit SHA (3d2a467).

8. **[x] CI green** — Not applicable. This is a documentation-only project with no TypeScript codebase, no lint/typecheck/test/format scripts configured. No CI pipeline exists for this repository.

9. **[x] No regressions** — No code changes; no risk of regression. Only new file added (`h-series-aluminum-block.md`) and existing index updated.

10. **[x] Reviewable diff** — Single-purpose commit adding research document. Conventional prefix `docs:` used. No drive-by reformatting. Second commit (`chore:`) only updates STATE.md with SHA.

---

*Report generated: 2026-05-15*
