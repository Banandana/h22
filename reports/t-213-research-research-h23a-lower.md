# Report: T-213 — H23A Lower Redline, Longer Stroke Impact & Piston Speed Calculations

## Task

- [ ] **(S)** T-213 [research] Research H23A lower redline: 7200 RPM vs H22's 7200-8200 RPM, longer stroke impact, piston speed calculations -- full spec: docs/plans/03-h-series-variants.md @ T-213

## Summary

This research task investigated the H23A VTEC "blue top" engine's 7,200 RPM redline in comparison to H22A variants, the mechanical impact of its longer 95 mm stroke (vs. H22A's 90.7 mm), and detailed piston speed calculations. Key finding: the commonly cited "H22A 8,200 RPM redline" is a myth — all verified H22A variants redline at 7,000–7,200 RPM. At 7,200 RPM, the H23A reaches 22.8 m/s mean piston speed vs. H22A's 21.7 m/s — a 5.1% increase translating to ~10.5% more reciprocating inertia force. The H23A's 1.50:1 rod ratio (vs. H22A's 1.58:1) places it at the upper boundary of suitability for sustained 7,200 RPM operation per HP Academy guidelines. Missing piston oil squirters further contribute to thermal limitations.

## Files Changed

- `research/h-series/specifications/h23a-lower-redline-stroke-piston-speed.md` — New comprehensive research file covering H23A redline fact vs. myth, mean piston speed calculations across RPM ranges, maximum safe RPM analysis, rod ratio engineering analysis with side-loading force estimation, complete H-series family redline comparison table, and tuning implications for NA and forced induction builds.
- `research/indexes/master-index.md` — Added entry for new h23a-lower-redline-stroke-piston-speed.md research file in the Technical Specifications section.

## Commands Run

```
npm run typecheck && npm run lint && npm test && npm run format:check
```

**Note:** This is a pure research task (no code changes). No TypeScript files were modified, so typecheck/lint/test/format are not applicable. The deliverable is a markdown research file following the template in `docs/plans/TEMPLATE.md`.

## Manual Verification

1. **Research file created and validated:**
   ```
   $ wc -l research/h-series/specifications/h23a-lower-redline-stroke-piston-speed.md
   537 research/h-series/specifications/h23a-lower-redline-stroke-piston-speed.md
   ```
   File contains 537 lines of structured research content with tables, calculations, sources, and citations.

2. **Index file updated:**
   ```
   $ grep h23a-lower-redline research/indexes/master-index.md
   | [`h23a-lower-redline-stroke-piston-speed.md`](../h-series/specifications/h23a-lower-redline-stroke-piston-speed.md) | H23A lower redline analysis: confirms 7,200 RPM redline...
   ```
   Entry present and correctly formatted in master index.

3. **Cross-reference verification:**
   - Compared against existing h23a-jdm-rare-blue-top.md (T-210) — no duplication, complementary depth added
   - Compared against h-series-stroke-dimensions.md (T-076) — T-213 adds variant-specific analysis, not covered by T-076
   - Compared against h23a-oil-squirter-provisions-and-retrofit.md (T-212) — T-213 covers redline/mechanical limits, T-212 covers oil squirters

4. **Source verification:**
   - Mean piston speed formula cross-checked against Wikipedia article and Firgelli Auto calculator
   - Rod ratio analysis sourced from HP Academy (Andre Simon, technical co-founder) and Motor Trend
   - H22A redline myth debunked via PreludePower forum consensus (multiple expert members), Honda-Tech, mywikimotors database
   - All calculations independently verified using standard formulas

## Coverage Delta

N/A — this is a pure research task producing markdown documentation, not code. No test suite exists or was affected.

## Follow-ups Discovered

1. **H23A VTEC cam profile specifics:** The PDE head used on the H23A VTEC is described as "very close to the H22A Euro R head" but exact cam lobe profiles, lift values, and duration specifications are not independently verified. A future task could target JDM service documentation or teardown data.
2. **H23A VTEC ECU calibration:** The PDE-type ECU chip used in the H23A VTEC (CH9/CL2) has not been identified by part number. Cross-referencing with Honda-Tech forum discussions may yield the specific chip code.
3. **H23A VTEC dyno data:** Real-world dyno results for the H23A VTEC are scarce. Community sources provide estimates but no published dynamometer sheets exist in accessible online archives.

## Commit SHA(s)

Pending — commit will be created after all DoD items are verified.

## DoD Checklist

From STATE.md Definition of Done:

1. **[x] Researched** — Information gathered from online sources (tavily search/extract) and local manuals. Sources include Wikipedia, mywikimotors, Goo-net, HP Academy, Motor Trend, K1 Technologies, Honda-Tech, PreludePower, and local H23A research file (T-210). All claims cited with source URLs and retrieval timestamps.

2. **[x] Written** — Findings saved to `research/h-series/specifications/h23a-lower-redline-stroke-piston-speed.md`. File follows the template in `docs/plans/TEMPLATE.md` with Summary, Specifications, Sources (Primary/Secondary/Tertiary), Notes (Conflicts & Uncertainties, Key Takeaways, Implications for Building/Modding), Citations, and Appendix sections.

3. **[x] Indexed** — The relevant index file `research/indexes/master-index.md` is updated with a link to the new research file in the Technical Specifications section, alongside other H-series specification files.

4. **[x] Verified** — Cross-checked against multiple independent sources:
   - H23A redline 7,200 RPM: confirmed by Wikipedia, mywikimotors, Goo-net (3 sources)
   - H22A redline myth debunked: confirmed by PreludePower forum consensus, Honda-Tech, mywikimotors (3 sources)
   - Piston speed calculations: verified against Wikipedia mean piston speed article and Firgelli Auto calculator (2 sources)
   - Rod ratio engineering: verified against HP Academy (Andre Simon) and Motor Trend (2 sources)
   - Conflicts noted: 8,200 RPM claim identified as myth; rod length discrepancy (141 mm vs 141.5 mm) noted as measurement tolerance

5. **[x] No swallowed errors** — N/A for research task. No code written.

6. **[x] Documentation in sync** — README.md and CLAUDE.md do not require updates (no behavior/flags/layout/conventions changed). This is a research document addition, not a system change.

7. **[ ] STATE.md updated** — Pending commit. Task will be moved to Done archive with date + commit SHA.

8. **[ ] CI green** — N/A. No TypeScript code modified. Deliverable is markdown research file.

9. **[ ] No regressions** — N/A. No code changes.

10. **[ ] Reviewable diff** — Single-purpose commits expected. Commit messages will use conventional prefix (`docs:`). No drive-by reformatting.

---

*Report generated: 2026-05-15*
*Task: T-213 [research] Research H23A lower redline*
