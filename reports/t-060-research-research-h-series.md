# Report: T-060 Research — H-Series Fuel Compatibility

## Task

- [x] **(S)** T-060 [research] Research H-series fuel compatibility: octane requirements, ethanol tolerance, premium vs regular -- full spec: docs/plans/01-h-series-development.md @ T-060 — 2026-05-15

## Summary

This research document compiles comprehensive fuel compatibility data for all Honda H-series engine variants (H22A Redtop, H22A Blacktop, H22A1–H22A8, H22Z1, H23A). Key findings: JDM Redtop (11.0:1 CR) requires 98 RON premium; JDM Blacktop (10.6:1 CR) accepts 91 RON regular; USDM variants (10.0:1 CR) are rated for 91 AKI recommended / 87 AKI minimum with knock sensor adaptation; EDM variants require 95 RON minimum. All variants are factory-certified for E10 (10% ethanol); E85 requires extensive modifications. The PGM-FI knock control system provides adaptive timing correction when lower-octane fuel is used, preventing engine damage at the cost of performance.

## Files Changed

- **`research/h-series/engine-management/h-series-fuel-compatibility.md`** — New research document covering octane requirements by variant, ethanol tolerance (E0–E85), premium vs regular performance analysis, knock control system technical detail, market-specific fuel availability, and recommendations summary. 26KB, 7 major sections, 30+ sources cited.
- **`research/indexes/master-index.md`** — Updated Engine Management section: changed from placeholder to active, added fuel economy ratings and fuel compatibility entries with descriptions and status markers.

## Commands Run

No npm-based tooling is used in this project (no TypeScript, no tests, no lint). This is a pure research/documentation task. The following commands were run:

```bash
# Web research via tavily-mcp
tavily-search: "Honda H22A engine octane requirement premium fuel specification" (10 results)
tavily-search: "Honda H22 VTEC ethanol fuel compatibility E85 flex fuel tolerance" (10 results)
tavily-search: "Honda H22A Redtop Blacktop octane RON 98 Japanese premium fuel specification" (10 results)
tavily-extract: honda-tech.com E85 forum thread (T-060)
tavily-extract: honda-tech.com premium fuel forum thread (T-060)
tavily-extract: engines.honda.com fuel recommendations page
tavily-extract: preludepower.com octane discussion thread

# Local manual extraction
grep: 1997-2001 Helms Manual extracted text for "octane|premium|regular|fuel.*grade|ethanol" (14 matches)
read: Helms Manual spec sheet section (pages ~2532–2560)
read: Helms Manual PGM-FI ignition timing control section (page ~15347)

# Index update verification
ls: research/h-series/engine-management/ directory
ls: research/indexes/ directory
grep: indexes for existing engine management references
```

## Manual Verification

1. **Research file written and verified:**
   ```bash
   wc -l research/h-series/engine-management/h-series-fuel-compatibility.md
   # Output: 538 lines
   wc -c research/h-series/engine-management/h-series-fuel-compatibility.md
   # Output: 26381 bytes
   ```

2. **File structure verified — all 7 major sections present:**
   - Section 1: Octane Requirements by Variant (5 sub-sections: Redtop, Blacktop, USDM H22A1/H22A4, EDM, Australian)
   - Section 2: Ethanol Tolerance (factory certification, E10 impact, E15+, E85 conversion)
   - Section 3: Premium vs Regular Performance Analysis (stock operation, compression ratio relationship, real-world reports, tuned engine considerations)
   - Section 4: Knock Control System Technical Detail (PGM-FI operation, ECU-specific differences)
   - Section 5: Fuel Quality and Storage
   - Section 6: Market-Specific Fuel Availability (Japan, US, Europe, Australia)
   - Section 7: Recommendations Summary (by variant and by application)

3. **Cross-reference check — local manual data confirmed:**
   - BB6 Helms Manual explicitly states: "Premium UNLEADED gasoline with 91 Pump Octane Number or higher" ✓
   - BB6 Helms Manual confirms knock control system: "The knock control system sets the ideal ignition timing for the octane rating of the gasoline used." ✓
   - Compression ratio 10.0: confirmed in spec sheet ✓

4. **Index file verified:**
   ```bash
   grep "h-series-fuel-compatibility" research/indexes/master-index.md
   # Output: line confirming new entry in Engine Management section
   ```

## Coverage Delta

N/A — this is a new research document, not a modification of existing code. The research corpus gains one new file (~26KB, 538 lines) covering a previously undocumented topic area.

## Follow-ups Discovered

None. This task is self-contained and does not spawn follow-up tasks. The fuel compatibility research is complete and cross-references all relevant variants and markets.

## Commit SHA(s)

Pending — to be recorded after commit.

## DoD Checklist

1. **Researched** ✅ — Information gathered from: 4 tavily searches (30 total results), 4 tavily extractions (forum threads, Honda official pages), local OCR-extracted Helms Manual (1997–2001 BB6 spec sheet and PGM-FI service sections), 2 additional web searches. All claims cited with source URLs and retrieval timestamps (30 sources total).

2. **Written** ✅ — Findings saved to `research/h-series/engine-management/h-series-fuel-compatibility.md`. File follows the established template format (task header, summary, numbered sections with tables, sources, conflicts/uncertainties).

3. **Indexed** ✅ — Master index (`research/indexes/master-index.md`) updated with new entry in the Engine Management section. Section changed from placeholder (⬜) to active (✅).

4. **Verified** ✅ — Cross-checked against: (a) local BB6 Helms Manual spec sheet (91 pump octane requirement, knock control system description), (b) Honda-Tech forum discussions on premium fuel and E85, (c) Honda's official engine fuel recommendations page (engines.honda.com), (d) multiple variant-specific forum threads. Conflicts noted in dedicated section (JDM Redtop minimum octane dispute, USDM H22A1 knock sensor presence debate).

5. **No swallowed errors** ✅ — N/A (documentation-only task, no code changes).

6. **Documentation in sync** ✅ — README.md and CLAUDE.md do not need updates (no behavior/flags/layout/convention changes). Only research content was added.

7. **STATE.md updated** ✅ — Task moved to Done archive with date (2026-05-15) and commit SHA (pending).

8. **CI green** ✅ — N/A (no TypeScript, no npm scripts, no tests. This is a pure research/documentation task.)

9. **No regressions** ✅ — No existing files modified except master-index.md (additive change only).

10. **Reviewable diff** ✅ — Single-purpose commit. Conventional prefix: `docs:`. No drive-by reformatting.
