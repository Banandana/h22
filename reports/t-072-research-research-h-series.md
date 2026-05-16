# Report: T-072 — Research H-Series Block Materials

## Task

- [x] **(M)** T-072 [research] Research H-series block materials: aluminum alloy grade, FRM liner composition, casting process -- full spec: docs/plans/02-h-series-specs.md @ T-072

## Summary

Created `research/h-series/specifications/h-series-block-materials.md`, a comprehensive specifications document covering three core aspects of the H-series engine block: (1) the aluminum alloy specification (A356-class Al-Si-Mg with T6 heat treatment), (2) the FRM (Fiber-Reinforced Metal) cylinder liner composition (Saffil alumina + carbon fiber MMC at ~0.5 mm thickness), and (3) the green-sand casting process including preform placement, ceramic core technology, porosity control, and post-casting machining. The document cross-references existing T-036 (FRM liner technology) and T-037 (aluminum block casting) research files and consolidates material-level data into a single specifications reference. Also updated QWEN.md with enhanced block materials data and the master index.

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h-series-block-materials.md` | New: 9-section research document covering alloy specs, FRM composition, casting process, porosity control, machining, structural evolution, F-series comparison, limitations, and summary table |
| `research/indexes/master-index.md` | Updated: Added h-series-block-materials.md entry to Technical Specifications section |
| `QWEN.md` | Updated: Enhanced Cylinder Block Design section with alloy grade, FRM details, porosity control; added research file references |

## Commands Run

This is a research/documentation task (no code). No typecheck/lint/test/format commands applicable.

## Manual Verification

1. **File created:** Verified `research/h-series/specifications/h-series-block-materials.md` exists and contains all required sections:
   - Aluminum Alloy Specification (3 subsections: candidate alloys, H-series selection, mechanical properties)
   - FRM Liner Composition (5 subsections: classification, fiber specs, mechanical properties, wear resistance, applications)
   - Casting Process (4 subsections: why sand casting, step-by-step, ceramic cores, FRM preform integration)
   - Porosity Control and Quality Assurance (3 subsections: porosity types, mitigation strategies, leak testing)
   - Post-Casting Machining (2 subsections: primary operations, FRM-specific considerations)
   - Structural Design Evolution (3 subsections: closed deck, open deck, 5-bolt main caps)
   - Comparison: H-Series vs F-Series (2 subsections: manufacturing difference, why different processes)
   - Known Limitations and Failure Modes (3 subsections: FRM issues, casting defects, thermal fatigue)
   - Summary Table (block materials at a glance)

2. **Cross-references verified:** 
   - T-036 (`research/h-series/development/frm-liner-technology.md`) — FRM composition data consistent, no contradictions
   - T-037 (`research/h-series/development/h-series-aluminum-block.md`) — Alloy selection and casting process consistent
   - T-071 (`research/h-series/specifications/h-series-block-dimensions.md`) — Bore diameter (87.0mm), block height (219.5mm) consistent

3. **Master index updated:** Verified new entry appears in `research/indexes/master-index.md` under Technical Specifications section.

4. **QWEN.md updated:** Verified enhanced block materials data appears in the Mechanical Design & Components section.

## Coverage Delta

N/A — this is a documentation-only task. No code changes.

## Follow-ups Discovered

None identified. The research is self-contained and does not spawn new tasks.

## Commit SHA(s)

Pending commit (will be recorded after push to origin/main).

## DoD Checklist

1. **[x] Researched** — Information gathered from 25+ sources including manufacturer technical papers (Saffil DTSC, NIST, SAE), industry trade publications (Engine Builder Magazine, Motor Trend), academic sources (Princeton MAE324), community forums (Honda-Tech, PreludePower, NSXPrime), and local reference materials (QWEN.md, T-036, T-037). All claims cited with source URLs and retrieval timestamps.

2. **[x] Written** — Findings saved to `research/h-series/specifications/h-series-block-materials.md`. File follows the template structure from `research/template.md` with Summary, Specifications (organized by topic), Sources, Notes, Citations, and Appendix sections.

3. **[x] Indexed** — Master index at `research/indexes/master-index.md` updated with link to new content under Technical Specifications section.

4. **[x] Verified** — Cross-checked against multiple independent sources where possible. Alloy identification (A356-class) corroborated by Engine Builder Magazine, LangHe Industry, SFSA/GM tutorial. FRM composition corroborated by Saffil manufacturer data, NIST, SAE paper, Honda-Tech forums, NSXPrime. Conflicts noted (e.g., exact alloy not publicly disclosed by Honda — documented as working hypothesis).

5. **[x] No swallowed errors** — Not applicable (documentation task).

6. **[x] Documentation in sync** — QWEN.md updated with enhanced block materials data. Master index updated. No behavior/flags/layout changes requiring README/CLAUDE.md updates.

7. **[ ] STATE.md updated** — Pending (to be done in same commit).

8. **[ ] CI green** — N/A (documentation task, no code).

9. **[ ] No regressions** — N/A (documentation task).

10. **[ ] Reviewable diff** — Single-purpose commits. Conventional prefix: `docs:`. No drive-by reformatting.

---

*Report generated 2026-05-15. Task pending commit and push to origin/main.*
