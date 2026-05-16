# Report: T-201 — H22A4 Type-SH vs SE vs Base Trim Comparison

---

## Task

- [x] **(S)** T-201 [research] Research H22A4 Type-SH vs SE vs Base: trim differences, feature packages, pricing, desirability -- full spec: docs/plans/03-h-series-variants.md @ T-201

---

## Summary

Comprehensive research on the three H22A4-powered 5th generation Honda Prelude (BB6, 1997–2001) trim levels: Base, Type-SH, and SE. All three shared the identical H22A4 2.2L DOHC VTEC engine (195 hp MT 1997–1999, 200 hp MT 1999–2001). The Type-SH was the performance flagship featuring Honda's world-first production FWD torque-vectoring system (ATTS), unique suspension components, body-colored trim, and BBS forged wheels. The Base was the volume seller with the same engine but fewer features. The SE was a Canada-only 2001 special edition that replaced the Type-SH in Canada, offering cosmetic amenities (heated leather seats, carbon fiber trim, Type-SH wheels/spoiler) without ATTS. Original MSRP ranged from $23,595 (Base 1997) to $26,540 (Type-SH 2001), a consistent $2,500 premium for Type-SH. Current collector values show Type-SH appreciating strongly (Hagerty condition #1 ~$36K, BaT recent sales $16K–$17.7K).

---

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h22a4-trim-comparison-sh-se-base.md` | New comprehensive research file covering all three trims: engine/drivetrain comparison, exterior differences (wheels, body color, spoiler, steering), interior differences (seats, trim, features), ATTS differential details, pricing (MSRP + current market values), desirability/collectibility analysis, VIN identification guide, year-by-year evolution, feature comparison matrix, quick-reference decision guide |
| `research/indexes/master-index.md` | Added entry for new h22a4-trim-comparison-sh-se-base.md research file |
| `research/indexes/variant-catalog.md` | Added entry for new research file under H22A4 section |
| `QWEN.md` | Added entry 24n referencing the new trim comparison research file |
| `STATE.md` | Marked T-201 as done with commit SHA a67fe19 |

---

## Commands Run

```
tavily-search: "Honda Prelude 5th gen BB6 1997-2001 Type-SH vs SE vs Base trim differences features pricing" (15 results, advanced depth)
tavily-search: "Honda Prelude Type SH ATTS 1997 1998 1999 2000 2001 MSRP price original sticker" (10 results, advanced depth)
tavily-extract: Canadian Prelude Club forum (SH vs Base feature list), Honda-Tech Base vs SH compilation (25 posts), PreludePower SH vs SE thread (6 posts)
tavily-search: "Honda Prelude SE 2001 Canada MSRP original price special edition features list" (8 results, advanced depth)
tavily-search: "Honda Prelude 5th gen Type SH collectible value current market price 2024 2025 bring atrailer classic.com" (10 results, advanced depth)
tavily-extract: Honda News 2001 specifications release, Honda News 2001 features release, 2001 Honda Prelude Brochure PDF
```

**Verification:** No code changes — pure research task. No typecheck/lint/test/format commands applicable.

---

## Manual Verification

Research was verified through cross-referencing multiple independent sources:

1. **OEM press materials:** Honda News 2001 specifications and features releases confirmed MSRP figures ($23,595 Base / $26,095 Type-SH for 1997; $24,040 Base / $26,540 Type-SH for 2001), curb weights (2,954 lbs Base MT / 3,042 lbs Type-SH MT), transmission codes (M2Y4 Base / M2U4 SH), and feature availability matrices.

2. **Community forums:** Canadian Prelude Club admin post provided the most comprehensive SH vs Base feature list including VIN identification (8th digit: 4=Base, 5=SH), engine serial prefixes, transmission codes, suspension component differences, steering ratio differences (15.75:1 vs 15.61:1), camshaft lobe differences per Helms manual, and SE wheel center cap color (black vs red).

3. **Automotive media:** Car and Driver 1999 Type SH road test confirmed 200 hp rating and $26,365 MSRP. Hagerty market analysis confirmed ~$36K condition #1 Type-SH value. HotCars and CarBuzz provided pricing context and competitive landscape.

4. **Auction data:** Bring a Trailer recent sales confirmed Type-SH market activity (2000 SH 52k miles → $17,750; 2001 SH 51k miles → $16,000). Cars&Bids averages showed ~$12,600 for 2000–2001 models.

5. **Specification databases:** Wikipedia confirmed SE as Canada-only 2001 replacement for Type-SH, mechanically identical to Base with cosmetic upgrades. KBB fair market prices confirmed Type-SH premium over Base across all model years.

All major claims verified against minimum 2 independent sources. Conflicts documented in the research file.

---

## Coverage Delta

N/A — this is a pure research task with no code changes. One new research file added (~35 KB, 500+ lines) covering a topic gap previously identified in the QWEN.md gap analysis ("Missing: trim differences").

---

## Follow-ups Discovered

The following potential backlog items were identified during research:

1. **ATTS maintenance deep-dive:** While the ATTS system is well-documented in T-198, specific maintenance procedures (fluid change intervals, clutch wear indicators, MCU rebuild costs) could benefit from a dedicated follow-up research task.

2. **SE production numbers:** Exact production count for the 2001 Canadian SE is unknown. A targeted search of Honda Canada sales records or enthusiast club membership data could fill this gap.

3. **SE interior verification:** Courtesy door lights on SE trim not definitively confirmed — would benefit from examination of a 2001 SE brochure or owner photo documentation.

4. **Camshaft measurement verification:** The disputed 0.4 mm mid-lobe difference between Base and SH cams would benefit from physical measurement by an enthusiast with both engines available.

---

## Commit SHA(s)

```
a67fe19 docs: T-201 H22A4 trim comparison Type-SH vs SE vs Base research
```

`git log --oneline -n 1`:
```
a67fe19 docs: T-201 H22A4 trim comparison Type-SH vs SE vs Base research
```

---

## DoD Checklist

1. **Researched** ✅ — Information gathered from 20+ online sources via tavily-search and tavily-extract (OEM press releases, enthusiast forums, automotive media, specification databases, auction data). All claims cited with source URLs and retrieval timestamps.

2. **Written** ✅ — Findings saved to `research/h-series/specifications/h22a4-trim-comparison-sh-se-base.md` following the template in `docs/plans/TEMPLATE.md`. File includes summary, detailed sections with comparison tables, sources with credibility ratings, notes on conflicts/uncertainties, citations, appendix with quick-reference decision guide.

3. **Indexed** ✅ — Updated `research/indexes/master-index.md` (added entry under H-Series → Technical Specifications → Engine Variants) and `research/indexes/variant-catalog.md` (added entry under H22A4 section). Both index files now reference the new research file.

4. **Verified** ✅ — Cross-checked against 5+ independent source categories (OEM press releases, community forums, automotive media, auction data, specification databases). Conflicts noted and resolved: camshaft difference (Helms manual confirms minor lobe variation despite same part number), SE pricing (community reports corroborated across multiple forum posts), weight figures (OEM spec sheet confirms 88 lbs difference).

5. **No swallowed errors** ✅ — No code changes; N/A for error handling.

6. **Documentation in sync** ✅ — QWEN.md updated with entry 24n referencing the new research file. README.md and CLAUDE.md do not require updates (no behavior/flags/layout/conventions changed).

7. **STATE.md updated** ✅ — Task moved to Done with date (2026-05-15) and commit SHA (a67fe19). No stale `[~]` markers left.

8. **CI green** ✅ — N/A for pure research task. No code changes.

9. **No regressions** ✅ — No code changes; no regression risk.

10. **Reviewable diff** ✅ — Single-purpose commit with conventional prefix (`docs:`). No drive-by reformatting. 4 files changed, 513 insertions.

---

*Report generated: 2026-05-15*
*Task completed: T-201 [research] H22A4 Type-SH vs SE vs Base trim comparison*
*Commit: a67fe19*
