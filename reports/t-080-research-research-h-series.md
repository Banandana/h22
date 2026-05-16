# Report: T-080 — Research H-Series Balancing System

## Task

- [x] **(M)** T-080 [research] Research H-series balancing system: balancer shafts, counterweights, vibration frequencies -- full spec: docs/plans/02-h-series-specs.md @ T-080

## Summary

Comprehensive research on the Honda H-series engine balancing system, covering three interrelated subsystems: belt-driven counter-rotating balance shafts that cancel secondary inline-4 imbalance, crankshaft counterweight design optimized for windage reduction, and harmonic balancer specification. Documented the Lanchester balance shaft theory, complete OEM parts reference with 14 part numbers, aftermarket eliminator kits from three manufacturers (KS Tuned, KaizenSpeed, 1320 Performance), and the popular balance shaft removal performance mod (7–10 HP gain, ~8 lbs weight reduction). Analyzed vibration frequency characteristics across the RPM range and compared H-series balance quality against other Honda engines (B-series, F-series, K-series). Cross-referenced findings with QWEN.md master reference which had only 5 sparse mentions of balancing topics.

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h-series-balancing-system.md` | New research file — comprehensive analysis of H-series balancing system covering balance shaft architecture, crankshaft counterweights, harmonic balancer, vibration frequency analysis, balance shaft removal mod, F-series compatibility, and complete parts reference |
| `research/indexes/master-index.md` | Updated Technical Specifications section to include link to new balancing system research file |

## Commands Run

```
# CI checks — N/A for this project
cd /data/h22 && npm run typecheck 2>&1 | tail -5
# Output: npm error Missing script: "typecheck"
# This is a documentation-only project with no TypeScript codebase.
# No typecheck/lint/test/format scripts exist. See package.json.

cd /data/h22 && npm run 2>&1 | head -10
# Output: Only script is "test": "echo \"Error: no test specified\" && exit 1"
# Confirms no CI pipeline exists for this project.

# Web research via tavily-mcp
tavily-search "Honda H22A engine balancing system balancer shafts counterweights" (15 results)
tavily-search "Honda inline 4 cylinder secondary imbalance Lanchester balance shaft theory" (10 results)
tavily-search "Honda H22 crankshaft counterweight design harmonic balancer damper specs" (10 results)
tavily-extract KS Tuned balance shaft eliminator kit page
tavily-extract Honda-Tech balance shafts questions thread
tavily-extract Civic EG forum balance shaft thread
tavily-search "Honda H22A H22A1 H22A4 balance shaft drive belt timing mark oil pump housing" (10 results)
```

## Manual Verification

**Research completeness check:**
- Read QWEN.md §Technical Specifications → Crankshaft section (line ~464) — confirmed only sparse mention ("Counterweights: Balanced for high-RPM operation")
- Read QWEN.md §Cylinder Block Design (line ~407) — confirmed only brief mention ("Balancer Shafts: Integrated to reduce vibration")
- Read QWEN.md §Oil Pan & Crankcase Volume (line ~512) — confirmed only balance shaft seal note
- Searched all existing research files in `research/h-series/specifications/` — no prior balancing system research existed
- Verified new file follows template format from `research/template.md` — Summary, Specifications tables, Sources (Primary + Secondary), Notes, Citations, Appendix sections all present
- Verified cross-references: T-071 (block dimensions), T-074 (main bearing support), T-078 (crankcase volume), T-056 (NVH characteristics) all cite or are cited by new document
- Verified 14 primary/secondary sources with URLs, retrieval dates, and credibility assessments
- Verified 3 conflict/discrepancy notes documented (interference engine claim, HP gain variance, oil pressure impact)
- Verified 4 open questions identified for future research

**Index update verification:**
- Confirmed master-index.md Technical Specifications section now includes h-series-balancing-system.md entry with description and status tag
- Entry placed after h-series-block-rigidity.md (T-079) maintaining sequential numbering order

## Coverage Delta

N/A — this is a documentation-only research project with no codebase, tests, or coverage metrics. The research file adds ~27.7 KB of new technical content covering 14 topics not previously documented in the project.

## Follow-ups Discovered

1. **Balance shaft offset weight specification** — No published data exists for the mass or radial offset of balance shaft weights. Could be measured by disassembly.
2. **Secondary force magnitude quantification** — No published quantitative data on actual secondary force amplitude (in Newtons) for H-series. Would require dynamic simulation or engine dynamometer vibration measurement.
3. **Long-term bearing life impact of balance shaft removal** — No systematic study exists. Anecdotal reports are mixed; some owners report 100K+ miles without issues, others warn of reduced lifespan.
4. **F-series balance shaft belt part number** — Exact belt part number for F-series not independently verified. Assumed shared architecture based on aftermarket kit compatibility lists.
5. **Balance shaft timing gear tooth count** — Not documented anywhere found. Would require physical measurement.
6. **New STATE.md backlog item** — Consider adding T-??? [fix] Research exact balance shaft weight and offset specifications — to address follow-up #1.

## Commit SHA(s)

Pending commit (not yet created).

## DoD Checklist

From STATE.md Definition of Done:

1. **Researched** — ✅ Information gathered from 14 sources including manufacturer product pages (KS Tuned, ATI Performance, Brian Crower, 1320 Performance), community forums (Honda-Tech, Civic EG, PreludePower), engineering analysis (Tony Foale PDF, Wikipedia Engine Balance), video documentation (KL Imports, TunerZen YouTube), and internal reference (QWEN.md). All claims cited with source URLs and retrieval timestamps.

2. **Written** — ✅ Findings saved to `research/h-series/specifications/h-series-balancing-system.md` (27,746 bytes). File follows the template in `research/template.md` with Summary, Specifications tables, Sources (Primary + Secondary), Notes, Citations, and Appendix sections.

3. **Indexed** — ✅ `research/indexes/master-index.md` updated with entry for new file in Technical Specifications section, maintaining sequential numbering order after T-079.

4. **Verified** — ✅ Cross-checked against 14 independent sources where possible. Conflicts noted: interference engine claim treated as incorrect (balance shafts don't affect valve-to-piston clearance); HP gain variance (3–10 HP) documented with context; oil pressure impact direction depends on installation method. QWEN.md comparison confirmed only 5 sparse mentions existed prior to this research.

5. **No swallowed errors** — ✅ N/A — no code written for this task.

6. **Documentation in sync** — ✅ README.md and CLAUDE.md do not need updates — no behavior, flags, file layout, or conventions changed. Only new research file added.

7. **STATE.md updated** — ⏳ Pending — will move task to Done archive with date + commit SHA after commit.

8. **CI green** — ✅ N/A — this is a documentation-only project with no TypeScript codebase. `npm run typecheck`, `npm run lint`, `npm test`, `npm run format:check` are all unavailable. package.json contains only `"test": "echo \"Error: no test specified\" && exit 1"`. No CI pipeline exists for this project.

9. **No regressions** — ✅ N/A — no code changes, only new research file and index update.

10. **Reviewable diff** — ✅ Single-purpose commits planned: one commit for research file + index update, one commit for STATE.md update. Conventional prefix `docs:` used. No drive-by reformatting.

**Verification checklist for PR/commit body:**

```
DoD checklist
- [x] Researched with cited sources (URLs + timestamps)
- [x] Written to research/h-series/specifications/h-series-balancing-system.md following template
- [x] Index updated in research/indexes/master-index.md
- [x] Cross-checked against 14 sources; conflicts noted
- [x] No swallowed errors introduced (N/A — no code)
- [x] README / CLAUDE.md updated if behavior changed (N/A — no behavior change)
- [ ] STATE.md moved to Done with commit SHA (pending commit)
- [x] CI green (N/A — documentation-only project, no CI pipeline)
- [x] Full suite re-run; no regressions (N/A — no code changes)
```
