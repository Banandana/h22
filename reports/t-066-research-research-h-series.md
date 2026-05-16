# Report: T-066 — Research H-Series Tooling and Factory Equipment

## Task

- [ ] **(S)** T-066 [research] Research H-series tooling and factory equipment: special tools required, dealership updates -- full spec: docs/plans/01-h-series-development.md @ T-066

## Summary

This task produced a comprehensive research document covering Honda H-series special service tools (SST), factory manufacturing equipment at the Tochigi Plant, aftermarket tooling development, and dealership diagnostic equipment evolution. The research identified key SSTs for valve adjustment, timing belt service, oil pump installation, and cylinder head work; documented the 2,000-tonne alloy casting presses and FRM liner application equipment used in H-series production; traced the evolution from OBD1 code readers to the HDS scan tool platform; and cataloged aftermarket tooling from KS Tuned and 4 Piston Racing that fills gaps in Honda's OEM SST coverage.

## Files Changed

- **`research/h-series/development/h-series-tooling-factory-equipment.md`** — New research document (30KB) covering factory manufacturing equipment, Honda SSTs for H-series engines, aftermarket tooling development, dealership equipment and updates, service bulletin information, and quick-reference tables for common service tasks.
- **`research/indexes/master-index.md`** — Updated maintenance section to include link to new h-series-tooling-factory-equipment.md file.

## Commands Run

```
# Web research via tavily-mcp
tavily-search "Honda H-series H22A special service tools SST factory equipment" (15 results)
tavily-search "Honda dealership service tools H22 engine maintenance equipment update" (15 results)
tavily-search "Honda H22 special service tool SST part numbers valve adjustment tappet cam timing" (10 results)

# File operations
write research/h-series/development/h-series-tooling-factory-equipment.md (30,407 bytes)
edit research/indexes/master-index.md (added T-066 entry to maintenance section)
```

No npm typecheck/lint/test/format commands applicable — this is a pure documentation task with no TypeScript code.

## Manual Verification

### Research completeness check
- Verified research document follows template format from `research/template.md`:
  - ✅ Has task header with T-NNN, date, author, status
  - ✅ Has Summary section
  - ✅ Has Specifications tables
  - ✅ Has Sources section with Primary/Secondary/Internal references
  - ✅ Has Notes section with observations and conflicts
  - ✅ Has Citations section with full citation entries
  - ✅ Has Appendix with quick-reference tables

### Cross-source verification
- **Valve adjustment procedure**: Confirmed across 3 independent sources (NZ Performance Car, Attack Forums, eXtremePrelude.com). All agree on: cold engine requirement, 0.15-0.19mm intake / 0.17-0.21mm exhaust cold clearances, 8 ft-lbs valve cover torque.
- **Factory equipment**: Confirmed across 2 sources (Honda Global 75 Years History PDF, Just Auto Swindon plant tour). Both confirm 2,000-tonne high-pressure presses for block casting.
- **Aftermarket tools**: Confirmed across 2 manufacturer websites (4 Piston Racing, KS Tuned) with pricing and product details.
- **Dealer diagnostic equipment**: Confirmed across Nashua CC training curriculum PDF and ToolSource specialty tool catalog.

### No conflicts found
- All sources are consistent on valve clearance specs, torque values, and tool requirements.
- One ambiguity noted: Honda's official SST part numbers are not publicly available online. This is documented as a gap in the research.

## Coverage Delta

n/a — this is a documentation-only task. No code was added or modified.

## Follow-ups Discovered

1. **Obtain Honda official SST catalog**: A copy of Honda's Special Service Tool catalog for 1992–2001 Honda passenger cars would provide definitive part numbers for all H-series SSTs. This is a known gap documented in the research notes.
2. **Document specific SST part numbers**: Once the official catalog is obtained, individual SST entries should be created with Honda part numbers for reference.
3. **FRM liner service procedures**: The FRM liner technology creates unique service challenges that warrant a dedicated research file (possibly spawned as a `[fix]` task from the Phase 1 checkpoint T-070).

## Commit SHA(s)

Pending commit — will be recorded after push to origin/main.

## DoD Checklist

From STATE.md Definition of Done:

1. **[x] Researched** — Information gathered from 15+ web sources via tavily search, including Honda corporate archives (75 Years History PDF), automotive training curricula (Nashua CC), specialty tool catalogs (ToolSource, Amazon), aftermarket manufacturers (KS Tuned, 4 Piston Racing), community forums (Attack Forums, Honda-Tech, Facebook groups), and automotive journalism (NZ Performance Car, TorqueCars). All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/development/h-series-tooling-factory-equipment.md` following the template in `research/template.md`. Document includes Summary, Specifications tables, Sources (Primary/Secondary/Internal), Notes, Citations, and Appendix sections.

3. **[x] Indexed** — Updated `research/indexes/master-index.md` maintenance section with link to new h-series-tooling-factory-equipment.md file.

4. **[x] Verified** — Cross-checked against multiple independent sources where possible. Valve adjustment specs confirmed by 3 sources. Factory equipment confirmed by 2 sources. Aftermarket tools confirmed by 2 manufacturer websites. No conflicts found; one ambiguity noted (official SST part numbers unavailable publicly).

5. **[x] No swallowed errors** — N/A for documentation task. No code changes made.

6. **[x] Documentation in sync** — README.md and CLAUDE.md not affected by this change (no behavior/flags/layout changes). Only research files and index updated.

7. **[ ] STATE.md updated** — Pending commit. Will move T-066 to Done with date + commit SHA.

8. **[ ] CI green** — N/A. No TypeScript code added or modified. This is a pure documentation task.

9. **[ ] No regressions** — N/A. No existing files modified except adding an entry to the master index.

10. **[ ] Reviewable diff** — Single-purpose commits planned: (1) add research file + update index, (2) update STATE.md. Conventional prefix `docs:` for documentation changes.

## Blocker

None. Task completed successfully. All research gathered, written, indexed, and verified. Only remaining steps are: update STATE.md, commit, and push to origin/main.
