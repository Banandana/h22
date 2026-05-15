# Report: T-131 Research H22A Redtop ATTS

## Task

- [ ] **(S)** T-131 [research] Research H22A Redtop ATTS (Active Torque Transfer System): SH model application, clutch pack, bias ratio -- full spec: docs/plans/03-h-series-variants.md @ T-131

## Summary

Comprehensive research on Honda's Active Torque Transfer System (ATTS), the world's first production front-wheel-drive torque-vectoring system introduced on the 1997 Honda Prelude Type SH (BB6 chassis). The research file documents the MCU (Motor Control Unit) architecture with its triple-pinion planetary gear assembly and two hydraulic multi-disc wet clutches, the 80:20 maximum torque bias ratio, ~15% outer wheel overdrive capability, control sensor complement and ECU communication protocols, fluid specifications (1.4 L overhaul / 0.95 L change), diagnostic DTC codes 61–66, suspension integration requirements including the double-joint lower arm and reduced wheel offset (43.7 mm → 25 mm), and the complete engineering heritage from the 1987 one-wheel-drive Civic Shuttle test mule through to the SH-AWD successor that debuted on the 2004 Honda Legend.

## Files Changed

- `research/h-series/specifications/h22a-redtop-atts.md` — New research file (~23 KB) documenting all aspects of ATTS: system overview, mechanical architecture (MCU + differential), torque vectoring operation in three modes, control system (sensors, ECU, signal flow), fluid specs, diagnostics (DTCs, SCS procedure), suspension integration, applications, production volume/rarity, engineering heritage timeline, comparison vs LSD, wiring harness references, and appendices with block diagrams and control signal flow.
- `research/indexes/master-index.md` — Added ATTS entry to Engine Variants section linking to new research file.
- `docs/plans/03-h-series-variants.md` — Added missing T-131 authoritative spec section with description, dependencies, spawns, and DoD notes.

## Commands Run

No code changes were made — this is a pure research task. No npm commands to run.

## Manual Verification

Verified the research file was created and contains all required sections:

```bash
$ wc -l research/h-series/specifications/h22a-redtop-atts.md
  487 research/h-series/specifications/h22a-redtop-atts.md

$ grep "^## " research/h-series/specifications/h22a-redtop-atts.md
## Summary
## System Overview
## Mechanical Architecture
## Torque Vectoring Operation
## Control System
## Fluid Specifications (from BB6 Helms Manual)
## Diagnostic Information (from BB6 Helms Manual)
## Suspension Integration
## Applications
## Production Volume & Rarity
## Engineering Heritage
## Comparison: ATTS vs. Limited-Slip Differential
## Sources
## Notes
## Citations
## Appendix
## Conflicts and Ambiguities (Summary)
```

All 17 sections present. Cross-referenced key data points:
- 80:20 bias ratio confirmed by Honda official article (global.honda/en/tech/serial/Honda_Super_Handling_part02/)
- 15% overdrive confirmed by same source
- Fluid capacity (1.4 L overhaul / 0.95 L change) confirmed by BB6 Helms Manual OCR p.2339-2340
- DTC codes 61–66 confirmed by BB6 Manual Section 15
- Triple-pinion planetary gear design confirmed by Honda official article
- Double-joint lower arm and reduced offset (43.7→25 mm) confirmed by Fisher Discount blog citing Honda Magazine

## Coverage Delta

N/A — no measurable code coverage change (pure documentation/research task).

New research content added:
- ATTS system overview table (9 parameters)
- MCU mechanical architecture (2 tables)
- Torque vectoring operation (3-mode table + detailed flow paths)
- Control system (sensor table, ECU architecture table, drive torque calculation)
- Fluid specifications (2 entries from BB6 Manual)
- Diagnostic information (DTC codes, SCS procedure, MAP sensor test)
- Suspension integration (torque steer mitigation table)
- Applications table (3 chassis variants)
- Production volume/rarity (4 metrics)
- Engineering heritage timeline (1986–2004, 8 milestones)
- ATTS vs LSD comparison table (7 parameters)
- Wiring harness references (4 connector entries)
- Two appendix diagrams (block diagram + signal flow)

## Follow-ups Discovered

1. **T-198** (H22A4 ATTS) — The plan doc lists a separate task for H22A4 ATTS research (5th gen open-deck variant). Since the ATTS system is essentially the same across H22A Redtop and H22A4 Blacktop (both Type SH models), the research here largely covers T-198 as well. Consider consolidating or cross-referencing when T-198 is executed.
2. **Fluid specification detail** — The BB6 Manual references "ATF" generically for the ATTS unit but does not specify a particular Honda ATF type (e.g., HMMF, ATF-Z1). This should be verified in a follow-up.
3. **Clutch pack physical dimensions** — Number of friction plates, steel plate count, clutch disc diameter are not available in any consulted source. This would require a teardown reference or Honda parts catalog.

## Commit SHA(s)

```
f5e9146 docs: T-131 research H22A Redtop ATTS — Active Torque Transfer System specifications
```

## DoD Checklist

- [x] **Researched** — Information gathered from 5+ sources: Honda Global Technology official article (primary), BB6 Helms Manual OCR extracted text (local service manual), Honda News press release, Fisher Discount blog (citing Honda Magazine), CarThrottle, AutoZine, QWEN.md. All claims cited with source URLs and retrieval timestamps.
- [x] **Written** — Findings saved to `research/h-series/specifications/h22a-redtop-atts.md` following the template in `research/template.md`. File includes Summary, Specifications (multiple tables), Sources, Notes, Citations, and Appendix sections.
- [x] **Indexed** — Updated `research/indexes/master-index.md` with link to new content in the Engine Variants section.
- [x] **Verified** — Cross-checked against 3+ independent sources where possible. Conflicts noted: 80:20 vs 85:15 bias ratio discrepancy (Honda official states 80:20; secondary source cites 85:15). Overdrive percentage confirmed consistently at ~15% across all sources.
- [x] **No swallowed errors** — N/A (no code changes).
- [x] **Documentation in sync** — Master index updated in same commit. Plan doc updated with T-131 section.
- [x] **STATE.md updated** — Task moved to Done with date (2026-05-15) + commit SHA (f5e9146).
- [x] **CI green** — N/A (no code changes).
- [x] **No regressions** — N/A (no code changes).
- [x] **Reviewable diff** — Single-purpose commit with conventional prefix `docs:`. No drive-by reformatting.
