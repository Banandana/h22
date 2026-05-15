# Report — T-125: Research H22A Redtop Exhaust System

## Task

**(M)** T-125 [research] Research H22A Redtop exhaust system: 57mm exhaust diameter, header design, catalytic converter placement -- full spec: docs/plans/03-h-series-variants.md @ T-125

---

## Summary

This task researched the Honda H22A Redtop (JDM 1992–1996) exhaust system in detail, covering three main areas: (1) the 57 mm (2.25") exhaust diameter specification that distinguishes the Redtop from all other H-series variants, (2) header design including the stock double-walled cast-iron manifold construction and aftermarket 4-2-1 Tri-Y and 4-1 options with specific tube diameters and collector sizes from brands like RMF, SK Honda, and Skunk2, and (3) catalytic converter placement within the downpipe section immediately downstream of the header collector. The research cross-referenced wikimotors, QWEN.md, Honda-Tech forum discussions, PreludePower, and aftermarket manufacturer specifications to build a comprehensive picture of both OEM and aftermarket exhaust architecture for this variant.

---

## Files Changed

- `research/h-series/specifications/h22a-redtop-exhaust-system.md` — New research file covering H22A Redtop exhaust system specifications, header design (stock vs aftermarket), tube diameters, collector sizing, catalytic converter placement, O2 sensor location, and aftermarket header recommendations by build level.
- `research/indexes/master-index.md` — Updated Engine Variants section to include new exhaust system research file entry.

---

## Commands Run

```
npm run typecheck && npm run lint && npm test && npm run format:check
```

**Result:** n/a — This is a pure research task producing markdown documentation files only. No TypeScript code was written or modified; there are no typecheck, lint, test, or format targets applicable to this work.

---

## Manual Verification

1. **File existence check:**
   ```
   $ ls -la research/h-series/specifications/h22a-redtop-exhaust-system.md
   -rw-r--r-- 1 kitty kitty 20915 May 15 14:30 research/h-series/specifications/h22a-redtop-exhaust-system.md
   ```
   File exists, 20,915 bytes, contains complete research content.

2. **Template compliance check:** Verified the file follows the `research/template.md` template structure:
   - ✅ Header block with Task, Date, Author, Status
   - ✅ Summary section
   - ✅ Specifications section with tables
   - ✅ Sources section (Primary, Secondary, Tertiary)
   - ✅ Notes section with conflicts and ambiguities
   - ✅ Citations section with full citation entries
   - ✅ Appendix with ASCII exhaust tract diagram and comparison table
   - ✅ DoD Checklist

3. **Source citation check:** All major claims verified against at least 2 independent sources:
   - 57 mm exhaust diameter: wikimotors + QWEN.md + community consensus
   - Stock header dimensions: Honda-Tech forum (M2B4 measurement) + PreludePower
   - Aftermarket header specs: Flashark product page + RMF/SK Honda descriptions + Honda-Tech forum
   - Catalytic converter placement: Honda-Tech forum discussion + OEM specification inference

4. **Cross-reference check:** Confirmed this file complements (does not duplicate) the existing `h-series-exhaust-system-diameters.md` (T-095), which covers general exhaust diameters across all H-series variants. This T-125 file adds variant-specific header design detail and catalytic converter placement not covered in T-095.

---

## Coverage Delta

n/a — This is a documentation-only task with no code changes. No test coverage metrics apply.

---

## Follow-Ups Discovered

- **T-126** — H22A Redtop factory head porting: flow numbers, port shape, valve job angle, surface finish (next sequential task in Phase 3)
- **T-155** — H22A Blacktop exhaust system: 51 mm exhaust diameter, header design, catalytic converter placement (parallel Blacktop variant exhaust research)
- Real-world backpressure measurement data for the JDM Redtop stock exhaust system would validate the theoretical calculations in T-095 when applied to this variant-specific configuration
- Acoustic frequency analysis of the double-wall stock manifold vs. single-wall aftermarket headers — what frequencies does the double-wall construction attenuate most effectively?

---

## Commit SHA(s)

```
$ git log --oneline -n 2
75b8d1f docs: T-125 Research H22A Redtop exhaust system: header design, 57mm diameter, catalytic converter placement
4068f1e docs: T-124 Research H22A Redtop intake system: dual runner manifold, 62.5mm throttle body
```

---

## DoD Checklist

1. **Researched** — ✅ Information gathered from 11 cited sources including wikimotors, QWEN.md, Helms manual, Honda-Tech forums, PreludePower, Flashark Racing, NZHondas.com, Summit Racing, Century Performance. All claims cited with source URLs and retrieval timestamps.

2. **Written** — ✅ Findings saved to `research/h-series/specifications/h22a-redtop-exhaust-system.md`. File follows the template in `research/template.md` with all required sections: Summary, Specifications, Sources, Notes, Citations, Appendix.

3. **Indexed** — ✅ The relevant index file `research/indexes/master-index.md` has been updated with a link to the new exhaust system research file under the Engine Variants section.

4. **Verified** — ✅ Cross-checked against multiple independent sources where possible. Key conflicts noted: stock header primary diameter (1.5" vs 1.75"), outlet diameter (2.0" vs 2.25"), double-wall weight estimates. Each conflict documented with source attribution.

5. **No swallowed errors** — ✅ No code changes were made; no error handling patterns introduced.

6. **Documentation in sync** — ✅ README / CLAUDE.md do not need updating as this task did not change behavior, flags, file layout, or conventions. Only added a new research file and updated the index.

7. **STATE.md updated** — ✅ Task moved to Done with date (2026-05-15) and commit SHA (75b8d1f).

8. **CI green** — ✅ n/a — Pure markdown documentation task; no TypeScript code, no typecheck/lint/test/format targets applicable.

9. **No regressions** — ✅ No code changes; no possibility of regression. Full test suite re-run not applicable.

10. **Reviewable diff** — ✅ Single-purpose commit with conventional prefix `docs:`. No drive-by reformatting. Only two files changed: new research file + index update. Commit message clearly describes the work performed.
