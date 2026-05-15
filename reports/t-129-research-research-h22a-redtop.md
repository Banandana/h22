# Report: T-129 — Research H22A Redtop Transmission Pairing

## Task

- [x] **(M)** T-129 [research] Research H22A Redtop transmission pairing: close-ratio 5-speed, gear ratios, final drive, differential type -- full spec: docs/plans/03-h-series-variants.md @ T-129

## Summary

Completed comprehensive research on Honda H22A Redtop transmission pairing. The H22A Redtop was paired exclusively with close-ratio 5-speed manual transmissions. The primary factory transmission for JDM SiR/S-Spec models was the M2B4 (with viscous LSD), while non-SiR variants used the M2A4 (open diff). Both share identical gear ratios (3.307 / 1.950 / 1.360 / 1.034 / 0.787) with a 4.266:1 final drive. The USDM H22A1 received the M2F4, which has slightly taller 4th (1.071) and 5th (0.870) gears. All H-series M-prefix transmissions are interchangeable, though ATTS-equipped units require modification. The research documents factory transmission codes, complete gear ratio comparison tables, LSD types (viscous vs helical), aftermarket LSD options, final drive specs, speed calculations, common issues, and a comprehensive H-series transmission code reference appendix.

## Files Changed

- `research/h-series/variants/h22a-redtop-transmission-pairing.md` — New research file covering H22A Redtop transmission pairing: M2B4/M2A4/M2F4 transmission codes, close-ratio 5-speed gear ratios, 4.266:1 final drive, viscous LSD vs helical LSD differential types, factory and aftermarket LSD options, transmission identification, speed calculations, common issues (5th gear synchro wear), oil specifications, and complete H-series transmission code reference table.
- `research/indexes/master-index.md` — Updated Engine Variants section to include new transmission pairing file and added T-129 to subdirectory status line.

## Commands Run

This is a pure research task (no code changes). No typecheck/lint/test/format commands applicable.

Research commands executed:
```bash
tavily-search "Honda H22A Redtop transmission gear ratios close-ratio 5-speed final drive differential" (max_results=10)
tavily-search "Honda Prelude BB1 BB2 H22A transmission T20 T22 gear ratios specifications JDM" (max_results=10)
tavily-extract "https://honda-tech.com/forums/honda-prelude-4/prelude-h-series-transmission-codes-ratios-master-list-2548441/"
tavily-extract "https://nzhondas.com/topic/77840-h22a-gearboxes-m2f5-what-are-the-ratios/"
tavily-extract "https://www.preludepower.com/threads/what-is-the-best-transmission-that-hooks-up-to-the-h22a.342863/"
tavily-extract "https://www.preludeonline.com/threads/which-transmission-to-get.263789/"
tavily-extract "https://honda-tech.com/forums/honda-prelude-4/prelude-h-series-transmission-codes-ratios-master-list-2548441/page3/"
tavily-extract "https://md-jdmmotors.com/honda/engines/98-02-accord-prelude-f20b-sir-h23a-h22a-h22a4-euro-r/687/jdm-honda-prelude-h22a-dohc-vtec-2-2l-engine-5-speed-manual-lsd-transmission-m2b4-md-jdm-motors/"
tavily-search "Honda H22A Redtop M2B4 M2A4 transmission complete gear ratios LSD" (max_results=10)
```

## Manual Verification

Verified all claims against multiple independent sources:

1. **Gear ratios cross-checked:** M2B4/M2A4 ratios (3.307/1.950/1.360/1.034/0.787, FD 4.266) confirmed by NZHondas service manual reference (Pdu-NZ), Honda-Tech Kronn master list, Honda-Tech Bense post, and Honda Prelude Online TypeT/Kronn posts — all four sources agree.

2. **M2F4 USDM ratios verified:** Honda-Tech Bense post lists M2F4 as 3.307/1.950/1.360/1.071/0.871/4.266 — matches Honda Prelude Online data (0.870 vs 0.871 is rounding difference).

3. **LSD type confirmed:** Viscous LSD for M2B4 confirmed by preludepower.com Cruiserdude post ("all of the Prelude transmissions that have an LSD use a viscous type") and Reddit r/HondaPrelude comment ("The 4th gen (M2B4) is the most common, but uses a viscous diff"). Helical LSD for T2W4/U2Q7 confirmed by same sources.

4. **Final drive consistency:** All H-series M-prefix transmissions use 4.266:1 final drive per Honda-Tech Kronn/Bense master lists and HondaSwap.com specs.

5. **Conflicting M2A4 3rd gear noted:** SuperHonda forum lists M2A4 3rd as 1.160, but all other sources (PreludeOnline, Honda-Tech, NZHondas) list it as 1.360 identical to M2B4. Weight of evidence supports 1.360 — documented as a conflict in the research file.

## Coverage Delta

N/A — this is a new research file, not a modification to existing code or tests.

## Follow-ups Discovered

- **T-159 (H22A Blacktop transmission):** The H22A Blacktop variant has its own transmission pairing task (T-159) that should reference this Redtop research for comparison. The Blacktop likely uses similar transmissions but may have different LSD configuration.
- **Transmission rebuild procedures:** Not covered in this research. A future task could document complete transmission rebuild procedures for M2B4/M2A4 including synchro replacement, bearing inspection, and fluid specification.
- **ATTS removal procedure:** The ATTS removal from M2U4/T2W4 transmissions for swap applications is mentioned but not detailed. A future task could cover the mechanical procedure for ATTS removal.

## Commit SHA(s)

Pending commit (will be populated after push to origin/main).

## DoD Checklist

- [x] **Researched** — Information gathered from 7+ online sources via tavily search/extract, including Honda-Tech forums (Kronn master list, Bense corrections), NZHondas (service manual reference), Honda Prelude Online (TypeT/Kronn community data), HondaSwap.com, MD JDM Motors, Reddit r/HondaPrelude. All claims cited with source URLs and retrieval timestamps.
- [x] **Written** — Findings saved to `research/h-series/variants/h22a-redtop-transmission-pairing.md` following the template in `research/template.md`. Includes Summary, Specifications (tables), Sources, Notes, Citations, and Appendix sections.
- [x] **Indexed** — The master index at `research/indexes/master-index.md` updated with link to new content and T-129 added to subdirectory status line.
- [x] **Verified** — Cross-checked against 4+ independent sources where possible. Conflicts noted (M2A4 3rd gear discrepancy: 1.160 vs 1.360). LSD type confirmed by multiple community sources. Gear ratios confirmed by Honda-Tech master list + NZHondas + PreludeOnline + HondaSwap.
- [x] **No swallowed errors** — No code changes; no try/catch blocks introduced.
- [x] **Documentation in sync** — README.md and CLAUDE.md do not need updating (no behavior/flags/layout/conventions changes). Only research files and index updated.
- [ ] **STATE.md updated** — Moving task to Done with commit SHA (pending commit).
- [ ] **CI green** — N/A: This is a pure research task with no code changes. No typecheck/lint/test/format commands applicable.
- [ ] **No regressions** — N/A: No code changes.
- [x] **Reviewable diff** — Single-purpose commits. No drive-by reformatting. Commit messages follow conventional prefix (`docs:`).

---

**Blocker:** None. Task completed successfully.
