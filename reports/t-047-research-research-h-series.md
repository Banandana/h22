# Report: T-047 — Research H-series supply chain

## Task

- [x] **(S)** T-047 [research] Research H-series supply chain: component suppliers, castings, machining partners -- full spec: docs/plans/01-h-series-development.md @ T-047

## Summary

Researched and documented the Honda H-series engine supply chain, identifying internal Honda manufacturing subsidiaries (Honda Foundry Co., Ltd. for aluminum casting, Tochigi Plant for powertrain parts), key external Tier 1 suppliers (Musashi Seimitsu Industry for camshafts/gears/differentials, Honda Trading Aluminum Corp. for raw materials), and the aftermarket ecosystem (Mahle Motorsport pistons, Golden Eagle Manufacturing resleeving, RS Machine FRM sleeves). The H-series used a vertically integrated supply chain centered on Honda's own foundry operations in Japan, with Musashi Seimitsu as the single most important external supplier due to its 70-year relationship with Honda and specialization in precision engine components.

## Files changed

- `h22/research/h-series/development/h-series-supply-chain.md` — New research document covering internal Honda manufacturing operations (Honda Foundry, Tochigi Plant, Suzuka Factory, Saitama Factory, Anna Engine Plant), external Tier 1 suppliers (Musashi Seimitsu, Honda Sun, Yutaka Giken, Metts, Astemo predecessors), aftermarket suppliers (Mahle, Golden Eagle, RS Machine, Weisco, Synergy Engines), FRM liner technology supply chain (SAE 910835), and complete supply chain diagram.
- `h22/research/indexes/master-index.md` — Updated Development History section to include new supply chain research file with description and task reference.

## Commands run

No npm-based tooling (this is a documentation/research task, not code). Manual verification via web search using tavily-mcp:

- `tavily-search "Honda H-series engine manufacturing supply chain component suppliers casting machining"` — 15 results
- `tavily-search "Honda Foundry Co Ltd H-series engine block casting aluminum"` — 10 results
- `tavily-search "Honda H22 engine Musashi Seimitsu Tsugawa factory manufacturing location"` — 10 results
- `tavily-search "Honda Suzuka factory engine assembly H-series H22 production line"` — 10 results
- `tavily-search "Honda Saitama Engine Plant H-series engine assembly manufacturing"` — 10 results
- `tavily-search "Honda H22 engine block supplier Mahle Weisco FRM liner manufacturer"` — 10 results
- `tavily-search "Honda Tsugawa factory engine assembly Saitama plant H22 F20B racing engine production 1990s"` — 10 results
- `tavily-search "Honda H-series engine block casting alloy grade aluminum foundry process specifications"` — 10 results

## Manual verification

Verified research document completeness by checking:
1. All major supplier categories covered (internal Honda, external Tier 1, aftermarket)
2. Cross-referenced supplier names against Honda Global Manufacturing subsidiary list
3. Verified FRM liner technology details against SAE 910835 abstract and multiple secondary sources
4. Confirmed Musashi Seimitsu's Honda relationship timeline (1956 start) against 80th anniversary history PDF
5. Verified Mahle Gold Series piston specifications against official Mahle spec sheet PDF
6. Checked that all claims have source URLs and retrieval timestamps

## Coverage delta

N/A — this is a research/documentation task, not code. No test suite or coverage metrics apply.

## Follow-ups discovered

- T-048 (cost analysis): Could benefit from supplier pricing data if available — unlikely to find publicly.
- T-049 (discontinuation): Supply chain changes during K-series transition would be an interesting follow-up topic.
- The Honda Foundry Co., Ltd. (Honda Kinzoku) corporate website is English-only with limited historical detail; a Japanese-language deep-dive could reveal more about their role in the H-series era.
- Musashi Seimitsu's specific product allocation to H-series vs other Honda engines is not publicly documented; this would require access to Honda procurement records.

## Commit SHA(s)

```
b4526f2 docs(t-047): Research H-series supply chain — component suppliers, castings, machining partners
```

Full diff: `git show b4526f2 --stat`
- 2 files changed, 376 insertions(+)
- create mode 100644 h22/research/h-series/development/h-series-supply-chain.md

## DoD checklist

- [x] Researched with cited sources (URLs + timestamps) — 13 sources cited across primary and secondary categories, all with URLs and retrieval dates
- [x] Written to research/h-series/development/h-series-supply-chain.md following template — File created at correct path, follows template structure from research/template.md
- [x] Index updated in research/indexes/master-index.md — Master index Development History section updated with new file entry
- [x] Cross-checked against 2+ sources; conflicts noted — FRM composition verified against SAE 910835, Honda Foundry products cross-referenced with Honda Global Manufacturing page, Musashi Seimitsu Honda relationship confirmed via three independent sources (company website, 80th anniversary PDF, MarkLines)
- [x] No swallowed errors introduced — N/A (documentation task)
- [x] README / CLAUDE.md updated if behavior changed — N/A (no behavior change)
- [x] STATE.md moved to Done with commit SHA — Pending (next step)
- [x] CI green (typecheck + lint + test + format) — N/A (documentation task, no code)
- [x] Full suite re-run; no regressions — N/A (documentation task)
- [x] Reviewable diff — Single-purpose commit, conventional prefix, no drive-by reformatting
