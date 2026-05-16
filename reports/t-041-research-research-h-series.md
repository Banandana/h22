# T-041 Report: Research H-Series Production Timeline

## Task

- [ ] **(M)** T-041 [research] Research H-series production timeline: start date, production volumes, end of production -- full spec: docs/plans/01-h-series-development.md @ T-041

## Summary

Researched and documented the complete Honda H-series engine production timeline from September 1991 through 2002. The H22 variant (2.2L) was produced from 1991–2001 as the signature engine for the 4th and 5th generation Honda Prelude, while the H23 variant extended production to 2002 in the rare JDM Accord Wagon SiR (CH9). Total estimated production across all variants is approximately 157,000+ units, driven primarily by the 4th gen Prelude (98,627 units, 1992–1996) and 5th gen Prelude (58,118 units, 1997–2001). The engine was manufactured at Honda's Tochigi Plant in Japan. Sales declined sharply in the 5th generation due to rising prices (~$18K to ~$25K), competition from the Accord Coupe and Integra Type R, and the S2000's arrival. The H-series was ultimately replaced by the K-series (K20/K24) engines.

## Files Changed

- **`research/h-series/development/h-series-production-timeline.md`** — New research file documenting H-series production timeline, volumes, end-of-production factors, and variant-by-variant production data with sourced citations
- **`research/indexes/master-index.md`** — Updated Development History section to include link to new production timeline file

## Commands Run

```
$ npm run typecheck
npm error Missing script: "typecheck"
→ Not configured for this research project (markdown files, not TypeScript)

$ npm run lint
npm error Missing script: "lint"
→ Not configured for this research project

$ npm test
> h22@1.0.0 test
> echo "Error: no test specified" && exit 1
→ No tests configured for research project

$ npm run format:check
npm error Missing script: "format:check"
→ Not configured for this research project
```

**Note:** This is a documentation-only research project with markdown files. No TypeScript code, build system, linter, or test framework is configured in `package.json`. The CI green requirement (DoD #8) is not applicable to this project's current configuration.

## Manual Verification

### File existence check
```
$ ls -la research/h-series/development/h-series-production-timeline.md
-rw-r--r-- 1 kitty kitty 8250 May 15 09:42 research/h-series/development/h-series-production-timeline.md
```

### Content verification (first 20 lines)
```
$ head -20 research/h-series/development/h-series-production-timeline.md
# Honda H-Series Production Timeline: 1991–2002

> **Task:** T-041 [research] Research H-series production timeline: start date, production volumes, end of production
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Draft | Verified | Complete

---

## Summary

The Honda H-series engine family was produced from September 1991 through 2002, spanning roughly a decade of continuous manufacturing. The H22 variant (2.2L) ran from 1991 to 2001 as the signature engine for the 4th and 5th generation Honda Prelude, while the H23 variant (2.3L) extended production to 2002 in the rare JDM Accord Wagon SiR (CH9). Total H-series production across all variants is estimated at approximately 157,000+ units, driven primarily by the 4th gen Prelude (98,627 units, 1992–1996) and 5th gen Prelude (58,118 units, 1997–2001). The engine was manufactured at Honda's Tochigi Plant in Tochigi Prefecture, Japan. Sales declined sharply in the 5th generation due to rising prices (from ~$18K to ~$25K), competition from the Accord Coupe and Acura Integra Type R, and the S2000's arrival. The H-series was ultimately replaced by the K-series (K20/K24) engines as Honda shifted toward more compact, efficient designs with better power-to-weight ratios.

---
```

### Index update verification
```
$ grep "h-series-production-timeline" research/indexes/master-index.md
| [`h-series-production-timeline.md`](../h-series/development/h-series-production-timeline.md) | H-series production timeline: start date (Sept 1991), production volumes (157,000+ total across all variants), end of production (2001 H22 / 2002 H23 VTEC), manufacturing location (Tochigi Plant Japan), discontinuation factors (price creep, Accord Coupe competition, S2000 arrival, K-series transition) | ✅ T-041 (2026-05-15) |
```

### Cross-reference verification against QWEN.md
Verified consistency with existing QWEN.md data:
- Production period 1991–2001 matches QWEN.md §Development History & Timeline
- Displacement 2,157 cc matches QWEN.md §Basic Engine Data
- All variant codes (H22A–H22A8, H22Z1, H23A) match QWEN.md §Engine Variants & Regional Differences
- Production locations (Tochigi Plant) consistent with known Honda manufacturing data

## Coverage Delta

N/A — This is a new research document, not a code change. No measurable coverage delta applies.

## Follow-ups Discovered

1. **T-051 (production numbers by variant and year):** This task references registration stats and sales data by specific variant/year that could benefit from deeper research beyond vehicle-level totals.
2. **H-series supply chain (T-047):** Manufacturing at Tochigi Plant raises questions about component suppliers and casting partners that warrant separate research.
3. **H-series environmental compliance (T-054):** Emissions standards evolution across production years (Euro 1 → Euro 2 → US Tier 1) would complement this timeline.

## Commit SHA(s)

Pending push to origin/main.

## DoD Checklist

- [x] **Researched** — Information gathered from Wikipedia (Honda H engine, Honda Prelude), MotorTrend, PreludePower forum, and cross-checked against QWEN.md. All claims cited with source URLs and retrieval timestamps.
- [x] **Written** — Findings saved to `research/h-series/development/h-series-production-timeline.md` following the established template format (Summary, Specifications tables, Sources, Notes sections).
- [x] **Indexed** — Master index updated at `research/indexes/master-index.md` with link to new content in the Development History section.
- [x] **Verified** — Cross-checked against 3+ independent sources: Wikipedia H engine page, Wikipedia Prelude page, MotorTrend historical article, PreludePower forum thread. Conflicts noted (forum post suggesting ~40K/year vs consensus ~12K/year).
- [x] **No swallowed errors** — N/A (documentation-only task, no code changes).
- [x] **Documentation in sync** — README.md and CLAUDE.md do not need updates (no behavior/flags/layout/conventions changed; this is purely additive research content).
- [ ] **STATE.md updated** — Task moved to Done with commit SHA + date (pending commit).
- [ ] **CI green** — npm scripts (typecheck, lint, test, format) are not configured for this research project (markdown files only). No TypeScript code exists.
- [ ] **No regressions** — N/A (new file only, no modifications to existing code or research files except index update).
- [x] **Reviewable diff** — Single-purpose commits. No drive-by reformatting. Commit messages follow conventional prefix (`docs:`).

**Note on CI:** This project (`/data/h22`) is a documentation/research repository containing only markdown files and PDFs. The `package.json` has no typecheck, lint, or format scripts defined. The test script simply echoes an error. The CI green requirement (DoD #8) is not applicable to this project's current configuration. Future phases may introduce TypeScript tooling if automation is needed.
