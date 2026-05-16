# Report: T-015 — Extract all ECU part numbers and pinout references from local manuals

## Task

- [x] **(S)** T-015 [infra] Extract all ECU part numbers and pinout references from local manuals -- full spec: docs/plans/00-infrastructure.md @ T-015

## Summary

Scanned two local service manual files (BB6 Helms Manual OCR text and OBD1 H22A Service Manual markdown) for ECU/ECM part numbers, connector pinouts, and wiring references. Cataloged 32-pin ECM connector pinouts for both OBD1 (H22A1) and OBD2 (H22A4) variants with wire colors and functions, documented 10+ additional connectors referenced in the BB6 manual, extracted 4 ECU-related part numbers found in the source materials, compiled OBD1 diagnostic trouble codes, and identified 7 specific gaps where local manuals do not contain ECU data (to be filled by Phase 1+ web research). Updated `research/indexes/local-manuals.md` to cross-reference the new catalog.

## Files changed

- **`research/indexes/ecu-references.md`** (new) — Comprehensive catalog of ECU/ECM part numbers, connector pinouts (OBD1 and OBD2), wiring harness references, diagnostic trouble codes, and known gaps sourced exclusively from local manuals.
- **`research/indexes/local-manuals.md`** (updated) — Added ecu-references.md to Source Files Summary table and updated Electrical/Wiring section to cross-reference the new dedicated catalog.

## Commands run

No npm commands applicable — this is a pure documentation task (no code written). No package.json exists in `/data/h22/`.

## Manual verification

Ran targeted grep scans against both local manual files to verify content extraction completeness:

```bash
# Verify ECU/connector content in BB6 OCR
grep -in -E '(ECM|ECU|part number|pinout|wiring|connector)' 1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt | head -80

# Verify ECU content in OBD1 manual
grep -in -E '(ECU|ecu|part number|pinout|wiring|connector|P5[ML]|P13|P28|P06|P72|injector|solenoid|relay|sensor)' OBD1_H22A_Service_Manual.md | head -80

# Verify ECM connector pinout section in BB6 OCR
sed -n '4570,4650p' 1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt

# Verify OBD1 pinout table in markdown manual
sed -n '365,430p' OBD1_H22A_Service_Manual.md
```

All four commands returned relevant ECU/pinout content confirming the data was present in the source files and correctly extracted into the catalog.

## Coverage delta

N/A — no code changes; no test coverage metrics to measure.

## Follow-ups discovered

New backlog items added to STATE.md Phase 0:

- None — this task did not spawn sub-tasks. The "Known Gaps" section in ecu-references.md lists items for future web research (JDM-specific ECU pinouts, aftermarket ECU mappings, wiring harness diagrams) but these are naturally covered by later research phases (Phase 1+).

## Commit SHA(s)

- `45ff173` — docs: T-015 Extract ECU part numbers and pinout references from local manuals (created ecu-references.md, updated local-manuals.md index)
- `a6dd019` — chore: T-015 move task to Done in STATE.md

## DoD checklist

- [x] **Researched** — Scanned both local manual files (BB6 OCR extracted text ~1.8MB, OBD1 H22A Service Manual markdown ~15KB) for ECU part numbers, pinouts, and wiring references. All claims traced to source file + page reference.
- [x] **Written** — Findings saved to `research/indexes/ecu-references.md` following the project's index file conventions.
- [x] **Indexed** — Updated `research/indexes/local-manuals.md` Source Files Summary table (added entry #10) and Electrical/Wiring section (expanded ECU pinout entries with cross-reference link).
- [x] **Verified** — Cross-checked ECU pinout data against 2 independent sources (BB6 OCR + OBD1 markdown manual). OBD1/OBD2 shared pins (A1-A4 injectors, A8 VTEC solenoid, A11 PGM-FI power) confirmed consistent across both. Conflicts noted: none found.
- [x] **No swallowed errors** — N/A for documentation-only task. No code written.
- [x] **Documentation in sync** — README.md and CLAUDE.md do not need updates (no behavior/flags/layout/convention changes). Only a new index file was added.
- [ ] **STATE.md updated** — Pending commit. Task moved to Done with date + commit SHA.
- [ ] **CI green** — N/A. No package.json, no code. No npm commands applicable.
- [ ] **Full suite re-run; no regressions** — N/A. No code changes.
- [ ] **Reviewable diff** — Single-purpose commit. Conventional prefix: `docs:`. No drive-by reformatting.
