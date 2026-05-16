# Report: T-049 — Research H-Series Discontinuation

## Task

- [ ] **(S)** T-049 [research] Research H-series discontinuation: why replaced by K-series, market shifts, emissions pressures -- full spec: docs/plans/01-h-series-development.md @ T-049

## Summary

The Honda H-series engine family (H22/H23) was discontinued in 2001 following the end of fifth-generation Prelude production. The K-series (K20/K24), introduced in 2001, replaced both the B-series and H-series as Honda's primary high-performance four-cylinder family. Five key factors drove the discontinuation: (1) FRM liner maintenance complexity and cost — oil consumption issues required specialized repair procedures and full block replacement for damaged liners; (2) i-VTEC technology gap in the K-series, which added continuous intake cam phasing for better low-end torque and efficiency; (3) tightening emissions regulations (EPA Tier 2-Bin 5, California ULEV) that the K-series was designed to meet more easily; (4) the H-series' large physical size limiting swap compatibility and platform versatility; and (5) market shifts toward the K-series' enormous tuning potential and aftermarket momentum. The F20C S2000 engine served as a technological bridge between the H-series and K-series.

## Files Changed

- **`research/h-series/development/h-series-discontinuation.md`** — New research document covering H-series end of production (2001), K-series introduction (2001), comparative performance specs, FRM liner maintenance challenges, i-VTEC technology advantages, emissions regulatory context, physical size limitations, market shifts, and timeline. 16 cited sources including Wikipedia, HP Academy, MotorTrend, Honda press releases, and community forums.
- **`research/indexes/master-index.md`** — Updated H-Series Development History table to include new `h-series-discontinuation.md` entry with description and completion marker.

## Commands Run

```bash
# Web research via tavily-mcp
tavily-search "Honda H-series engine discontinuation why replaced by K-series history" → 10 results
tavily-search "Honda K-series engine development why introduced 2001 Prelude Accord replacement" → 10 results
tavily-search "Honda Prelude 5th generation 2001 final year H22 engine discontinued why" → 10 results
tavily-search "Honda H-series FRM liner problems reliability issues discontinuation cast iron sleeves replacement" → 10 results
tavily-search "Honda K-series advantages over B H series i-VTEC emissions packaging 2001 development" → 10 results
tavily-extract "https://www.motortrend.com/how-to/htup-0907-honda-frm-liners" → MotorTrend FRM article content

# File operations
ls research/h-series/development/ → verified 19 existing files + new file
ls research/indexes/ → verified index directory structure
read docs/plans/01-h-series-development.md → read T-049 spec section
read research/template.md → template format reference
read QWEN.md → grep for existing discontinuation content (found 4 relevant lines)
```

Note: This is a research/documentation task with no TypeScript code. The npm scripts (`typecheck`, `lint`, `test`, `format:check`) are placeholder entries in `package.json` that do not perform meaningful checks. No regressions possible as no code was modified.

## Manual Verification

1. **Research file existence and structure:**
   ```
   $ ls -la research/h-series/development/h-series-discontinuation.md
   -rw-r--r-- 1 kitty kitty 17067 May 15 12:30 research/h-series/development/h-series-discontinuation.md
   ```
   File created successfully at 17,067 bytes. Structure follows template: Summary, Specifications (2 tables), Sources (7 primary + 9 secondary), Notes (6 detailed sections), Citations (16 entries), Appendix (3 subsections).

2. **Master index update verified:**
   ```
   $ grep "h-series-discontinuation" research/indexes/master-index.md
   | [`h-series-discontinuation.md`](../h-series/development/h-series-discontinuation.md) | ... | ✅ T-049 (2026-05-15) |
   ```
   Entry correctly added to H-Series Development History table.

3. **Source cross-checking:** Key claims verified against multiple independent sources:
   - H-series end of production 2001: Wikipedia H-engine, HP Academy, TopSpeed (3 sources)
   - K-series introduction 2001: Wikipedia K-engine, HP Academy, DRIFTED (3 sources)
   - FRM liner oil consumption: MotorTrend, 6th Gen Accord Forum, Honda-Tech (3 sources)
   - EPA Tier 2/California LEV: Honda News press releases (2 primary sources)
   - i-VTEC cam phasing: HP Academy, Jalopnik, MotorTrend (3 sources)

4. **Content quality check:** All specifications include source attribution in table columns. All claims cite URLs and retrieval dates. Conflicts and disputed points documented in Appendix C.

## Coverage Delta

N/A — this is a documentation-only task. No code was added or modified. The research corpus coverage improved by adding one new comprehensive research file covering the H-series discontinuation topic, which was previously only briefly mentioned (4 lines) in QWEN.md.

## Follow-ups Discovered

1. **T-050 (Legacy):** The next task in STATE.md covers "H-series legacy: transition to K20/K24, technology carryover, enthusiast retention" — this is closely related but distinct from discontinuation. The current research notes the F20C bridge role, which feeds into T-050.
2. **F20C bridge clarification:** Some enthusiasts argue the F20C directly led to K-series; others see them as parallel developments. Honda's corporate history suggests the K-series was developed as a "completely new engine" though it incorporated lessons from F20C/H-series experience. This could be a future research item if deeper analysis is needed.
3. **Prelude sales data:** Some sources suggest declining Prelude sales contributed to H-series discontinuation; others argue the engine would have been carried over regardless. Sales data is not readily available in consulted sources — may warrant dedicated research.

## Commit SHA(s)

Pending commit (will be recorded after git push to origin/main).

## DoD Checklist

From STATE.md Definition of Done:

1. **[x] Researched** — Information gathered from 16 sources across tavily search/extract, Wikipedia, HP Academy, MotorTrend, Honda press releases, and community forums. All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/development/h-series-discontinuation.md` following the template in `docs/plans/TEMPLATE.md` (via `research/template.md`). File includes Summary, Specifications tables, Sources (primary + secondary), Notes, Citations, and Appendix sections.

3. **[x] Indexed** — The master index file `research/indexes/master-index.md` has been updated with a new entry for `h-series-discontinuation.md` in the H-Series Development History table.

4. **[x] Verified** — Cross-checked against 2+ independent sources where possible:
   - H-series end of production: 3 sources (Wikipedia, HP Academy, TopSpeed)
   - K-series introduction: 3 sources (Wikipedia, HP Academy, DRIFTED)
   - FRM liner issues: 3 sources (MotorTrend, 6th Gen Accord Forum, Honda-Tech)
   - Emissions context: 2 primary Honda press releases
   - Conflicts noted in Appendix C of the research file

5. **[x] No swallowed errors** — N/A. This is a documentation-only task with no code modifications.

6. **[x] Documentation in sync** — `research/indexes/master-index.md` updated in the same commit. README.md and CLAUDE.md do not require updates as no behavior, flags, file layout, or conventions changed (this is research output, not tooling).

7. **[ ] STATE.md updated** — Pending (to be done in next edit before commit). Move task line to Done archive with date + commit SHA.

8. **[ ] CI green** — N/A. This is a research/documentation task. The npm scripts in `package.json` are placeholder entries (`"test": "echo \"Error: no test specified\" && exit 1"`) and do not perform meaningful checks. No TypeScript code was modified.

9. **[ ] No regressions** — N/A. No code was modified; no regressions possible.

10. **[ ] Reviewable diff** — Single-purpose commits pending. Commit messages will use conventional prefix `docs:`. No drive-by reformatting.

---

*Report generated: 2026-05-15*
*Author: auto-research (pi agent)*
