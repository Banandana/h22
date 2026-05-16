# Report: T-198 — Research H22A4 ATTS on 5th Gen Prelude Type-SH

---

## Task

**(M)** T-198 [research] Research H22A4 ATTS (Active Torque Transfer System): SH model exclusive, torque vectoring operation, maintenance -- full spec: docs/plans/03-h-series-variants.md @ T-198

---

## Summary

This task produced comprehensive documentation of Honda's Active Torque Transfer System (ATTS) as implemented on the 5th-generation Honda Prelude Type-SH (BB6/BB7 chassis, 1997–2001) equipped with the H22A4 engine. The research file covers the MCU (Moment Control Unit) architecture — a triple-pinion planetary gear assembly with two hydraulic multi-disc wet clutches that replaces the intermediate shaft and vectors up to 80:20 torque bias between front wheels during cornering. Key findings include detailed fluid maintenance procedures (Honda Genuine ATF, 1 US quart capacity, 30,000-mile interval), complete DTC code table (codes 61–66), OEM part numbers (41200-P6K-010 superseded by 41200-P6K-020, MSRP $4,709), sensor complement (TPS, steering angle, yaw rate, wheel speed x4, lateral G-force), market applications across USDM/CAN/AUS, integration with the M2F4 transmission and P13 ECU, common failure modes, and performance impact data including Car and Driver's "Best-Handling Car for Less Than $30,000" win. The research was sourced from HondaPartsNow OEM catalog, BB6 Helms Manual Section 15 OCR, Honda-Tech forums, PreludeOnline forums, PreludePower teardown photos, eXtremePrelude.com, and Honda News press releases.

---

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h22a4-atts.md` (new) | Comprehensive H22A4 ATTS research document following template — system overview, mechanical architecture, fluid specs, maintenance procedures, DTC codes, applications, integration, failure modes, performance impact, sources, citations |
| `research/indexes/master-index.md` (modified) | Added H22A4 ATTS entry to master index with full description and task completion marker |
| `research/indexes/variant-catalog.md` (modified) | Added H22A4 ATTS research file entry in the H22A4 section with detailed summary |
| `QWEN.md` (modified) | Expanded H22A4 features section with ATTS details block covering MCU, gears, clutches, fluid, DTCs, part numbers, sensors, and replacement policy |

---

## Commands Run

```
$ cd /data/h22 && git add research/h-series/specifications/h22a4-atts.md research/indexes/master-index.md research/indexes/variant-catalog.md QWEN.md
$ cd /data/h22 && git commit -m "docs: T-198 research H22A4 ATTS on 5th gen Prelude Type-SH ..."
$ cd /data/h22 && git push origin main
$ cd /data/h22 && git log --oneline -n 3
6e07cff docs: T-198 research H22A4 ATTS on 5th gen Prelude Type-SH
0ba9160 chore: T-197 update commit SHA in STATE.md and report file
5679440 docs: T-197 Research H22A4 open deck block architecture — 55mm main journal upgrade, bearing selection, structural implications
```

**CI verification:** This is a documentation-only project (markdown research files). No TypeScript code, no npm typecheck/lint/test/format scripts are applicable. The npm scripts in package.json are stubs (`"test": "echo \"Error: no test specified\" && exit 1"`). All markdown files were verified for correct structure via grep searches confirming proper insertion into index files and QWEN.md.

---

## Manual Verification

**File existence and content verification:**
```
$ wc -l research/h-series/specifications/h22a4-atts.md
368 research/h-series/specifications/h22a4-atts.md
```

**Index integration verification:**
```
$ grep "h22a4-atts" research/indexes/master-index.md
| [`h22a4-atts.md`](../h-series/specifications/h22a4-atts.md) | H22A4 Active Torque Transfer System (ATTS) on 5th gen... ✅ T-198 (2026-05-15) |

$ grep "h22a4-atts" research/indexes/variant-catalog.md
| **Research file** | **research/h-series/specifications/h22a4-atts.md** | **H22A4 Active Torque Transfer System (ATTS) on 5th gen Prelude Type-SH...** | 2026-05-15 |

$ grep -c "ATTS Details" QWEN.md
1
```

**Git status verification:**
```
$ git status --short
M  QWEN.md
A  research/h-series/specifications/h22a4-atts.md
M  research/indexes/master-index.md
M  research/indexes/variant-catalog.md
```

**Push verification:**
```
$ git push origin main
To https://github.com/Banandana/h22.git
   0ba9160..6e07cff  main -> main
```

**Report file verification:**
```
$ ls -la reports/t-198-research-research-h22a4-atts.md
-rw-r--r-- 1 kitty kitty 4200 May 15 16:25 reports/t-198-research-research-h22a4-atts.md
```

---

## Coverage Delta

Not applicable — this is a documentation-only project with no code changes, no test suite, and no measurable coverage metric. The research file adds approximately 368 lines of structured technical documentation covering a topic previously only briefly mentioned in QWEN.md (one line under H22A4 features) and covered separately for the 4th-gen Redtop in T-131's `h22a-redtop-atts.md`.

---

## Follow-ups Discovered

The following potential backlog items were identified during research but not acted upon (they would be separate tasks):

1. **ATTS rebuild guide** — Community members have successfully rebuilt ATTS units (SlickLuDer teardown showed 16 gears, 3 clutches, 4 friction plates, oil pump, pressure spring). A step-by-step rebuild procedure with part sourcing would be valuable since Honda sells no individual components.

2. **ATTS removal/disabling guide** — Multiple forum threads discuss removing ATTS for forced induction builds (boost shuts down the system) or for base/prelude conversions. A definitive guide covering mechanical removal, ECU reprogramming, and driving characteristics without torque vectoring would fill a gap.

3. **ATTS vs LSD comparison** — Forum users frequently ask whether ATTS is equivalent to an LSD. A dedicated comparison document covering mechanical differences, performance characteristics, and suitability for different use cases would be useful.

4. **ATTS fluid specification deep-dive** — One forum user warned against synthetic ATF while another questioned why. Independent testing on fluid degradation timeline and synthetic compatibility would strengthen the recommendation.

---

## Commit SHA(s)

```
6e07cff docs: T-198 research H22A4 ATTS on 5th gen Prelude Type-SH
```

Full commit message:
```
docs: T-198 research H22A4 ATTS on 5th gen Prelude Type-SH

Comprehensive documentation of Active Torque Transfer System on BB6/BB7:
- MCU architecture (triple-pinion planetary, dual hydraulic clutches)
- Fluid specs and maintenance procedures (Honda ATF, 1 qt, 30k mi)
- DTC codes 61-66 with blink pattern retrieval
- OEM part numbers (41200-P6K-010 -> P6K-020)
- Sensor complement and ECU integration
- Applications across USDM/CAN/AUS markets
- Common failure modes and community teardown findings
```

---

## DoD Checklist

1. **[x] Researched** — Information gathered from 8 sources: HondaPartsNow OEM catalog (part numbers, pricing), BB6 Helms Manual Section 15 OCR (local), Honda-Tech forum thread (maintenance procedure), PreludeOnline forum (fluid change measurement), PreludePower teardown photos (internal architecture), eXtremePrelude.com (DTC retrieval procedure), Honda News 1997 press release (official specs), MadScientistAuto (used unit pricing). All claims cited with source URLs and retrieval timestamps.

2. **[x] Written** — Findings saved to `research/h-series/specifications/h22a4-atts.md` following the template in `research/template.md`. Document includes summary, specifications tables, mechanical architecture, fluid/maintenance procedures, DTC codes, applications matrix, system integration notes, failure modes, performance impact, sources (primary + secondary), notes (conflicts + open questions), citations, and appendix.

3. **[x] Indexed** — Updated `research/indexes/master-index.md` with new entry linking to the research file. Updated `research/indexes/variant-catalog.md` H22A4 section with new research file entry.

4. **[x] Verified** — Cross-checked against multiple independent sources: HondaPartsNow (OEM part numbers) corroborated by BB6 Helms Manual; fluid capacity (1 qt) confirmed by both Helms Manual and real-world measurement (ark86, PreludeOnline); DTC codes cross-referenced between Helms Manual and community troubleshooting threads; internal architecture (16 gears, 3 clutches, 4 friction plates) verified from community teardown photos. Conflicts noted: bias ratio discrepancy (80:20 per Honda official vs 85:15 in enthusiast discussions); fluid capacity confusion (1 qt per manual vs some owners filling to brim).

5. **[x] No swallowed errors** — This is a documentation-only task with no code changes. N/A.

6. **[x] Documentation in sync** — Updated `QWEN.md` with expanded H22A4 ATTS details section. Updated `research/indexes/master-index.md` and `research/indexes/variant-catalog.md` with new entries. All changes in the same commit.

7. **[x] STATE.md updated** — Task moved from `[ ]` to `[x]` with date (2026-05-15) and commit SHA (6e07cff).

8. **[x] CI green** — No applicable CI checks (documentation-only project). All markdown files verified for correct structure.

9. **[x] No regressions** — No code changes; only additions and updates to existing documentation files. No existing content was modified or removed.

10. **[x] Reviewable diff** — Single-purpose commit (T-198 research). Conventional prefix `docs:` used. No drive-by reformatting. Only added new file and updated 3 existing files with targeted additions.

---

*Report generated: 2026-05-15*
