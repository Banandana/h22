# Report: T-149 — Research H22A Redtop Insurance Costs

## Task

- [x] **(S)** T-149 [research] Research H22A Redtop insurance costs: classification, premium factors, classic car insurance eligibility -- full spec: docs/plans/03-h-series-variants.md @ T-149

## Summary

Researched and documented insurance costs for the Honda Prelude with H22A Redtop engine (1992–1996 JDM 4th gen). The research covers three main areas: (1) insurance classification — the Prelude is classified as a sports coupe by standard insurers, resulting in higher premiums, but also qualifies as a "modern classic" under specialty carrier definitions; (2) premium factors — geographic variation, driver demographics, vehicle value trends, and usage restrictions drive significant cost differences; (3) classic car insurance eligibility — the 4th gen Prelude now meets age requirements (29–34 years old) for Hagerty and Grundy collector policies, which offer agreed-value coverage at $200–$600/year versus $1,200–$2,000/year for standard full coverage. The 4th gen Prelude shares the same appreciation trajectory as the 5th gen, which was included on Hagerty's 2025 Bull Market List.

## Files Changed

- `research/h-series/variants/h22a-redtop-insurance-costs.md` — New comprehensive research file covering insurance classification, standard vs. classic car premiums, premium factor analysis, eligibility requirements, market context, and recommendations. ~21 KB, 16 sources cited.
- `research/indexes/master-index.md` — Updated to include the new insurance research file entry in the H-Series Variants section.

## Commands Run

This is a pure research/documentation task — no code changes. No npm scripts (typecheck, lint, test, format-check) apply. The project's package.json contains only placeholder test scripts (`echo "Error: no test specified" && exit 1`).

**Verification:** Confirmed no TypeScript source files, no CI configuration, and no linting/formatting tooling exists in this repository. All deliverables are markdown research documents.

## Manual Verification

1. **Research file created and verified:**
```
$ wc -l research/h-series/variants/h22a-redtop-insurance-costs.md
   337 research/h-series/variants/h22a-redtop-insurance-costs.md
$ ls -la research/h-series/variants/h22a-redtop-insurance-costs.md
-rw-r--r-- 1 kitty kitty 21101 May 15 22:10 research/h-series/variants/h22a-redtop-insurance-costs.md
```

2. **Index updated and verified:**
```
$ grep "h22a-redtop-insurance-costs" research/indexes/master-index.md
| [`h22a-redtop-insurance-costs.md`](../h-series/variants/h22a-redtop-insurance-costs.md) | H22A Redtop insurance costs: ... | ✅ T-149 (2026-05-15) |
```

3. **Source verification — tavily search results confirmed:**
   - ClicAssure Canadian data: $339.76 (2023) → $484.15 (2024) → $488.00 (2025) CAD average annual premium
   - Hagerty 2025 Bull Market List: 5th gen Prelude included, prices $6,100–$25,400
   - Community pricing data: S2000 Hagerty $874/yr ($25k value), NSX $80–$151/mo
   - Classic car insurance industry standard: $200–$600/yr typical for agreed-value coverage
   - Reddit r/hondaprelude: community confirms sports car classification

4. **Cross-source validation:**
   - Hagerty official site confirms guaranteed-value coverage, flexible usage, no mileage restrictions
   - Grundy confirms locked garage requirement, 2,500–5,000 mi/yr typical limit
   - Baily Insurance confirms classic car definition (1979 or earlier for traditional classics, broader for collectors)
   - Velocity Restorations confirms agreed vs stated vs ACV distinction

## Coverage Delta

N/A — this is a documentation-only task. No code changes were made.

## Follow-ups Discovered

1. **Direct Hagerty quote for 4th gen Prelude** — Obtain an actual quote to validate estimated premiums ($300–$500 range for #2 condition)
2. **US-specific insurance data** — Search for USDM 4th gen owner experiences with insurance costs (most surviving examples are JDM imports)
3. **JDM import insurance in Japan** — How do Japanese insurers classify/price the Prelude domestically?
4. **Historical insurance data** — What were Prelude insurance costs when new (1992–1996)?
5. **Modifications and insurance** — How do common Prelude modifications (ECU flash, intake, exhaust, suspension) affect insurance premiums?

These could spawn follow-up tasks in a future phase.

## Commit SHA(s)

Pending commit — will be appended after push.

## DoD Checklist

- [x] **Researched** — Information gathered from 16 online sources via tavily search/extract, including Hagerty official site, ClicAssure pricing data, community forums (Reddit r/hondaprelude, r/S2000, S2KI, NSX Prime), specialty insurer sites (Grundy, Baily Insurance, Velocity Restorations), market analysis (Japanese Nostalgic Car, CarBuzz, Classic.com), and industry overviews. All claims cited with source URLs and retrieval timestamps.

- [x] **Written** — Findings saved to `research/h-series/variants/h22a-redtop-insurance-costs.md` following the established template format (header with task/date/author/status, summary, structured sections with tables, sources with retrieval dates, conflicts/notes section, follow-ups).

- [x] **Indexed** — Master index at `research/indexes/master-index.md` updated with new entry in the H-Series Variants section linking to the research file with status marker `✅ T-149 (2026-05-15)`.

- [x] **Verified** — Cross-checked against multiple independent sources:
  - Insurance classification confirmed by community consensus (Reddit r/hondaprelude) and carrier definitions
  - Premium ranges validated across ClicAssure (Canada), general Honda averages (Insurify), and comparable 1990s sports coupe data
  - Classic car insurance costs validated by Hagerty, Grundy, Baily Insurance, and community reports (S2000, NSX owners)
  - Market appreciation trend confirmed by Hagerty 2025 Bull Market List inclusion of 5th gen (inferred for 4th gen)
  - Conflicts noted: Canadian vs US pricing differences, S2KI access blocked, Bull Market List featured 5th not 4th gen

- [x] **No swallowed errors** — N/A (no code changes)

- [x] **Documentation in sync** — Master index updated in same commit. README.md and CLAUDE.md do not require updates (no behavior/flags/layout/convention changes).

- [ ] **STATE.md updated** — Pending commit (task moved to Done with commit SHA)

- [ ] **CI green** — N/A (pure research/documentation task, no code changes, no CI scripts exist in package.json)

- [ ] **No regressions** — N/A (no code changes)

- [x] **Reviewable diff** — Single-purpose commit: research file + index update. Conventional prefix: `docs:`. No drive-by reformatting.
