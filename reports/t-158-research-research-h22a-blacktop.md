# Report: T-158 — Research H22A Blacktop ECU

## Task

- [ ] **(M)** T-158 [research] Research H22A Blacktop ECU: P28/P06/OBD2a, chip socket location, tuning potential, flash procedures -- full spec: docs/plans/03-h-series-variants.md @ T-158

## Summary

Comprehensive research on the Honda H22A Blacktop engine's ECU variants across both 4th-gen (1992–1996) and 5th-gen (1997–2001) applications. Documents two distinct ECU families: OBD1 P28/P06 ECUs used in 4th-gen Blacktop (same socketed EPROM architecture as Redtop but with different basemap calibrations tuned for the 10.6:1 compression ratio and single-runner intake), and OBD2 P13 ECUs used in 5th-gen Blacktop (immobilizer-integrated, Hondata S300 incompatible, severely limited tuning potential). Includes detailed chip socket location, pinout tables, tuning software platforms, OBD2-to-OBD1 conversion guide for 5th-gen owners, injector impedance mismatch warnings, and the rare P13-A12 (1996 only, non-immobilizer) variant analysis.

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/engine-management/h22a-blacktop-ecu-p28-p06-obd2a.md` | New — comprehensive Blacktop ECU research document covering P28/P06/OBD2a/P13 variants, chip socket architecture, tuning potential, flash procedures, compatibility matrix, and OBD2-to-OBD1 conversion guide |
| `research/indexes/ecu-references.md` | Updated — added Section 11 referencing the new Blacktop ECU research document |
| `QWEN.md` | Updated — added Blacktop vs Redtop basemap differences table, enhanced OBD2 ECU section with P13 tuning limitations and P13-A12 rarity notes, added FlashPro H22 P13 incompatibility note |

## Commands Run

### Web Research
```
tavily-search "Honda H22A Blacktop ECU P28 P06 tuning chip socket location" (depth: advanced, 10 results)
tavily-search "Honda H22A Blacktop OBD2 ECU P13 Hondata FlashPro tuning" (depth: advanced, 10 results)
tavily-extract https://hondaswap.com/threads/whats-the-real-deal-with-hondata-and-the-p13.37835/
tavily-extract https://www.torquecars.com/honda/h22-tuning.php
tavily-extract https://www.preludepower.com/threads/p13-vs-p28-hondata.357458/
tavily-search "Honda H22A Blacktop OBD1 ECU P28 P06 chip tuning 4th gen Prelude BB1 BB4" (depth: advanced, 5 results)
tavily-search "Honda H22 P13 ECU immobilizer OBD2 5th gen Prelude BB6 flashpro tuning limitations" (depth: advanced, 5 results)
```

### Git Operations
```
git add research/h-series/engine-management/h22a-blacktop-ecu-p28-p06-obd2a.md research/indexes/ecu-references.md QWEN.md
git commit -m "docs: T-158 Research H22A Blacktop ECU — P28/P06/OBD2a/P13 variants, chip socket, tuning potential, flash procedures"
git push origin main
```

Commit SHA: `325df27`

## Manual Verification

### Research File Validation
- Confirmed `research/h-series/engine-management/h22a-blacktop-ecu-p28-p06-obd2a.md` exists and is 39,073 bytes
- Verified all 10 key takeaways are present and cited
- Confirmed cross-references to companion tasks (T-128 Redtop ECU, T-169 H22A1 ECU, T-195 H22A4 ECU) are included
- Verified 20 sources with URLs and retrieval timestamps

### Index Update Validation
- Confirmed `research/indexes/ecu-references.md` includes new Section 11 referencing the Blacktop ECU document
- Verified Section 10 (Redtop ECU) remains intact

### QWEN.md Update Validation
- Confirmed Basemap Differences table added between Engine Management and Aftermarket sections
- Verified OBD2 ECU section enhanced with P13 tuning limitations
- Confirmed FlashPro incompatibility note added

### Cross-Source Consistency Check
- P13-S300 incompatibility confirmed across 3 independent sources: HondaSwap forum, PreludePower forum, 6th Gen Accord DIY forums
- P13-A12 rarity confirmed by 6th Gen Accord DIY owner ("hardest Honda ECU on the market to find")
- Injector impedance mismatch (OBD1 low-impedance peak-and-hold vs OBD2 high-impedance saturated) confirmed by Facebook group discussion
- Blacktop 10.6:1 CR advantage over Redtop 11.0:1 consistent with existing h22a-blacktop-specifications.md research

## Coverage Delta

N/A — this is a pure research task with no code changes. No test suite exists for this project's research files. The new research file adds ~39 KB of documented content covering topics not previously addressed in any existing research file.

## Follow-ups Discovered

1. **P13-A12 production numbers** — Community describes it as extremely rare but no official production count exists. Could be a future `[fix]` task to dig into Honda parts catalogs or JDM service bulletins.

2. **Exact factory ECU codes for stock Blacktop** — The P28/P06 are commonly used in swaps but may not be the exact factory codes for JDM Blacktop applications. JDM-specific ECU codes would require research into Japanese service manuals.

3. **P13 hex-editing community work** — One community member (radnulb on HondaSwap) claims to have reverse-engineered P13 fuel map formulas. Following up on this could uncover undocumented tuning capabilities.

4. **Blacktop-specific basemap comparison** — A direct side-by-side hex comparison of Redtop vs Blacktop P28 basemaps would quantify the exact calibration differences. This would be valuable for porting Redtop chips to Blacktop engines and vice versa.

## Commit SHA(s)

```
325df27 docs: T-158 Research H22A Blacktop ECU — P28/P06/OBD2a/P13 variants, chip socket, tuning potential, flash procedures
```

## DoD Checklist

1. **Researched** — ✅ Information gathered from 20+ online sources (tavily search/extract), local service manual references, and community forums. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **Written** — ✅ Findings saved to `research/h-series/engine-management/h22a-blacktop-ecu-p28-p06-obd2a.md` (39 KB, ~1,000 lines). Document follows the established template structure: summary, ECU variants, chip socket architecture, tuning potential, flash procedures, compatibility matrix, configuration parameters, conflicts/gaps, sources, key takeaways, appendix.

3. **Indexed** — ✅ `research/indexes/ecu-references.md` updated with Section 11 referencing the new Blacktop ECU research document. QWEN.md master reference updated with Blacktop vs Redtop basemap differences table and P13 tuning limitation notes.

4. **Verified** — ✅ Cross-checked against multiple independent sources where possible. Key findings verified:
   - P13-S300 incompatibility: confirmed by HondaSwap, PreludePower, 6th Gen Accord DIY (3 sources)
   - P13-A12 rarity: confirmed by 6th Gen Accord DIY owner reports
   - Injector impedance mismatch: confirmed by Facebook group discussion
   - Basemap differences: consistent with existing h22a-blacktop-specifications.md data
   - Conflicts noted: exact factory ECU codes for stock Blacktop remain unconfirmed; P13-A12 production numbers unknown.

5. **No swallowed errors** — ✅ No code changes made. Research documentation uses explicit uncertainty language where data is incomplete (e.g., "uncertain," "not publicly documented," "community consensus suggests").

6. **Documentation in sync** — ✅ QWEN.md master reference updated in the same commit. ECU references index updated. No README.md or CLAUDE.md changes needed (no behavior/flags/layout changes).

7. **STATE.md updated** — ✅ T-158 removed from Phase 3 backlog. Added to Done archive under "Phase 3: H-Series Engine Variants Detailed Research" with date (2026-05-15) and commit SHA (325df27).

8. **CI green** — ✅ N/A — this is a pure research task with no code changes. No npm typecheck/lint/test/format commands applicable.

9. **No regressions** — ✅ N/A — no code changes. Existing research files untouched. Only additions made to QWEN.md and ecu-references.md index.

10. **Reviewable diff** — ✅ Single-purpose commit with conventional prefix (`docs:`). Three files changed: one new research file, one updated index, one updated master reference. No drive-by reformatting.

---

*Report generated: 2026-05-15*
*Task completed and moved to Done archive in STATE.md*
