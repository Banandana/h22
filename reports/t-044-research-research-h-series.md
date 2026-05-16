# Report: T-044 — Research H-Series European Market Introduction

## Task

- [x] **(M)** T-044 [research] Research H-series European market introduction: UK/European Prelude, Accord Euro R -- full spec: docs/plans/01-h-series-development.md @ T-044

## Summary

Comprehensive research on Honda H-series engine's introduction to the European market (EDM), covering the UK/European Prelude across both generations (BB1 1992-1996 with H22A2, BB6 1997-2001 with H22A5/H22A8) and the Accord Type R (CH1 1998-2002 with H22A7). The research documents detuning measures for European emissions compliance, pricing history, dealer networks, manufacturing at Swindon UK, racing heritage through F3/BTCC, and current collector values. Key finding: the Accord Type R was Europe-exclusive, developed and built in Swindon, representing the performance pinnacle of the H-series at 212 PS.

## Files Changed

- `research/h-series/development/h-series-european-market-introduction.md` — New comprehensive research document covering EDM variants (H22A2, H22A5, H22A7, H22A8), European Prelude BB1/BB6 specifications, Accord Type R CH1 details, pricing, dealer networks, racing heritage, and current market values. 12.8 KB, 24 sources cited.
- `research/indexes/master-index.md` — Updated Development History table to include new research file entry.
- `QWEN.md` — Enhanced EDM Regional Market Differences section with detailed European variant specs, pricing, manufacturing location, and known issues.

## Commands Run

```
npm run typecheck && npm run lint && npm test && npm run format:check
```

**Result:** No applicable — this is a documentation-only task (markdown files, no TypeScript code). No package.json exists in this repository.

**Manual verification:** All markdown files written with consistent formatting, proper citations, and cross-references verified against source URLs.

## Manual Verification

1. **Research completeness check:** Verified all EDM variants covered (H22A2, H22A5, H22A7, H22A8) against Wikipedia Honda H Engine article, Honda Prelude Wikipedia page, and evo magazine review.
2. **Cross-source validation:** Accord Type R specs confirmed across 4 independent sources (Wikipedia, evo, AutoEvolution, Ultimate Specs) — all agree on 212 PS @ 7,200 RPM, 222 Nm @ 6,700 RPM, 11.0:1 CR, 1,306 kg weight, 7.2s 0-62 mph.
3. **Index consistency:** Master index updated with correct relative path (`../h-series/development/h-series-european-market-introduction.md`).
4. **QWEN.md integration:** EDM section enhanced from 6 lines to 15 lines with specific variant data, pricing, and manufacturing details.

## Coverage Delta

N/A — documentation-only task, no code changes. Added one new research file (12.8 KB) covering European market introduction, which was previously only briefly mentioned in QWEN.md's variant tables.

## Follow-ups Discovered

1. **T-045 [research]** Research H-series Japanese domestic market strategy: SiR models, Type S, premium positioning — next task in Phase 1 backlog.
2. **Rust/corrosion issue** — systemic problem affecting both Type R and standard Accord CH1 in UK climate. Warrants dedicated reliability research file.
3. **Accord Type R production numbers** — "less than 2,000 units" in UK is vague; further research into total European production would strengthen the record.
4. **H22A8 red valve cover anomaly** — unusual for non-JDM to have red valve cover; may indicate parts-sharing with JDM or Accord Type R. Worth noting in variant-specific research.

## Commit SHA(s)

Pending commit after all DoD items complete.

## DoD Checklist

- [x] **Researched** — Information gathered from 24+ online sources (tavily search/extract), local QWEN.md reference, and cross-validated against Wikipedia, evo magazine, AutoEvolution, Ultimate Specs, NetCarShow, CarThrottle, Honda News, MotorTrend, Auto-ABC, Car and Classic, RAC Drive, Honda-Tech Forums. All claims cited with source URLs and retrieval timestamps (2026-05-15).
- [x] **Written** — Findings saved to `research/h-series/development/h-series-european-market-introduction.md` following the template structure with summary, specifications, variant comparison tables, key findings, and sources sections.
- [x] **Indexed** — `research/indexes/master-index.md` updated with new file entry in Development History table.
- [x] **Verified** — Cross-checked against minimum 2 independent sources where possible. Accord Type R specs confirmed across 4 sources. Conflicts noted: H22A5 power listed as 200 PS in some sources vs 185 PS in others — resolved by noting 1997-1998 production had 185 PS, with 200 PS variant existing in limited markets.
- [x] **No swallowed errors** — N/A (documentation task, no code).
- [x] **Documentation in sync** — QWEN.md enhanced with detailed EDM section; master index updated. README.md and CLAUDE.md not affected by this change.
- [ ] **STATE.md updated** — Pending commit.
- [ ] **CI green** — N/A (no TypeScript code in this project).
- [ ] **No regressions** — N/A (documentation-only additions).
- [ ] **Reviewable diff** — Single-purpose commits with conventional prefix (`docs:`). No drive-by reformatting.
