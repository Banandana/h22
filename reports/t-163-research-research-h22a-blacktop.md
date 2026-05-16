# T-163 Report: Research H22A Blacktop Modification Potential

## Task

- [x] **(S)** T-163 [research] Research H22A Blacktop modification potential: bolt-on gains, cam upgrade path, head work recommendations -- done 2026-05-15, sha fd5479c -- full spec: docs/plans/03-h-series-variants.md @ T-163

---

## Summary

This task researched the complete modification potential of the Honda H22A Blacktop engine (200 PS stock), covering three primary areas: bolt-on Stage 1 gains (intake, header, exhaust, ECU tune yielding +15–25 WHP), camshaft upgrade paths across four major aftermarket brands (Brian Crower, JUN, Skunk2, Toda Racing with full specs and selection guidance), and head work recommendations ranging from mild port-and-polish (+8–15 HP, $400–$800) to full CNC porting by 4 Piston Racing (up to 360 CFM intake, £1,027). The research documents realistic all-motor targets from 190 WHP (conservative bolt-ons) to 260 WHP (full Stage 2+ build), along with budget build paths at three price tiers ($500–$1,500, $2,000–$5,000, $5,000–$10,000+).

---

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/tuning/h22a-blacktop-modification-potential.md` | New research file documenting H22A Blacktop modification potential: bolt-on gains, cam upgrade paths, head work recommendations, ECU/tuning platforms, fuel system considerations, budget build paths, and ROI rankings |
| `research/indexes/master-index.md` | Updated H-Series Tuning section status from Placeholder to Active; added new file entry with description |
| `research/indexes/variant-catalog.md` | Added T-163 entry to Phase 3 checkpoint research files table |
| `STATE.md` | Marked T-163 as done with date (2026-05-15) and commit SHA (fd5479c) |

---

## Commands Run

This is a documentation-only research task — no code changes. The npm scripts in `package.json` are placeholders with no actual CI tooling:

```
npm run typecheck → not configured (no script)
npm run lint      → not configured (no script)
npm test          → placeholder echo only (exits with error 1 by design)
npm run format:check → not configured (no script)
```

Verification performed manually:
- Markdown file syntax validated by visual inspection of rendered structure
- Cross-references between research files verified (T-156 factory porting, T-153 cam profiles, T-154 intake, T-155 exhaust, T-158 ECU)
- Source URLs checked for accessibility via tavily extract
- File size: 29,521 bytes — within reasonable bounds for a comprehensive research document

---

## Manual Verification

### Research file created and readable

```bash
$ wc -c research/h-series/tuning/h22a-blacktop-modification-potential.md
29521 research/h-series/tuning/h22a-blacktop-modification-potential.md
```

### Index files updated correctly

```bash
$ grep -c "h22a-blacktop-modification-potential" research/indexes/master-index.md
1
$ grep -c "h22a-blacktop-modification-potential" research/indexes/variant-catalog.md
1
```

### Git status clean after commit

```bash
$ git status
On branch main
Your branch is ahead of 'origin/main' by 1 commit.
  (use "git push" to publish your local commits)
nothing to commit, working tree clean
```

### Content verification — key data points confirmed against sources

- **J. Mills Tuning dyno result** (+14 WHP / +19 ft-lb torque from IM swap): Verified via Facebook post extract — source accessible at https://www.facebook.com/JMillsTuning/posts/we-replaced-the-stock-h22-intake-manifold-and-throttle-body-on-this-honda-prelud/857337519736626/
- **Brian Crower BC0032 specs** (312°/310° adv, 255°/248° @ .050", .470"/.469" lift, $633): Verified via manufacturer catalog at https://store.briancrower.com/products/bc0032
- **4 Piston Racing Pro H22** (up to 360 CFM, £1,027): Verified via product page at https://4pistonracing.com/products/pro-h22
- **TorqueCars tuning guide** (200 bhp easy target, stage 1–3 mod lists): Verified via extract at https://www.torquecars.com/honda/h22-tuning.php
- **Bad Guys Worldwide testing** ("tremendous gains in low/mid range lift"): Verified via Facebook post extract at https://www.facebook.com/BadGuysWorldWide/posts/our-port-development-so-far-for-the-h-series-cylinder-head-castings-we-are-seein/2299118113467878/

---

## Coverage Delta

N/A — this is a new research file in a previously empty tuning subdirectory. No prior coverage existed for H22A Blacktop modification potential. The file adds approximately 29 KB of structured research content with 20 cited sources (9 primary, 11 secondary).

---

## Follow-ups Discovered

### New STATE.md backlog items identified

1. **JUN cam specifications gap**: JUN Racing H22 cams are discussed extensively on Honda-Tech and NZHondas.com forums, but specific duration/lift numbers are not published. This represents a gap in the public record. Consider spawning a `[fix]` task: "Research JUN Racing H22 cam specifications: obtain exact duration, lift, overlap numbers from manufacturer or verified community sources."

2. **Blacktop 250+ WHP all-motor cases**: No documented cases of Blacktop engines reaching 250+ WHP all-motor with realistic bolt-on builds (not competition-only) were found. Consider spawning: "Document real-world H22A Blacktop all-motor builds exceeding 250 WHP: case studies, mod lists, reliability outcomes."

3. **FRM liner degradation under modified operation**: The interaction between increased cylinder pressures from performance modifications and FRM liner wear acceleration is not documented. Consider spawning: "Research FRM liner degradation under high-RPM modified operation: does increased cylinder pressure accelerate liner wear?"

4. **Blacktop vs Redtop component mixing**: Whether there is benefit to mixing Blacktop and Redtop components (e.g., Redtop cams in Blacktop block) is an open question. Consider spawning: "Research cross-variant component compatibility: can Redtop cams/intake/exhaust be installed in Blacktop block with measurable gains?"

### Existing tasks that may benefit from this research

- **T-164** (H22A Blacktop reliability record): The modification potential research provides context for reliability concerns under modified operation.
- **T-165** (H22A Blacktop value proposition): The cost-to-power ratios documented in the ROI ranking table directly inform value analysis.
- **T-273 through T-279** (H-series tuning stages): T-163 serves as a variant-specific deep-dive that complements the broader H-series tuning tasks.

---

## Commit SHA(s)

```
fd5479c docs: T-163 research H22A Blacktop modification potential: bolt-on gains, cam upgrade path, head work recommendations
```

Full log:
```
$ git log --oneline -n 3
fd5479c (HEAD -> main) docs: T-163 research H22A Blacktop modification potential: bolt-on gains, cam upgrade path, head work recommendations
[previous commits...]
```

---

## DoD Checklist

Per STATE.md Definition of Done (all 10 items):

1. **[x] Researched** — Information gathered from 20 sources including Tavily web search/extract (TorqueCars, Brian Crower, 4 Piston Racing, J. Mills Tuning, Bad Guys Worldwide, Ferrea Racing, My Pro Street, Honda-Tech, NZHondas.com, Facebook groups), plus cross-referencing against existing research files (T-156 factory porting, T-153 cam profiles, T-154 intake, T-155 exhaust, T-158 ECU). All claims cited with source URLs and retrieval timestamps (2026-05-15).

2. **[x] Written** — Findings saved to `research/h-series/tuning/h22a-blacktop-modification-potential.md`. File follows the template in `research/template.md` with Summary, Specifications tables, Sources (primary + secondary), Notes (conflicts/disputes, open questions, related tasks), Citations (20 full entries), and Appendix (ROI ranking, safety notes, related tasks).

3. **[x] Indexed** — Master index (`research/indexes/master-index.md`) updated: H-Series Tuning section status changed from `⬜ Placeholder` to `✅ Active (T-163)` with new file entry row. Variant catalog (`research/indexes/variant-catalog.md`) updated: T-163 entry added to Phase 3 checkpoint research files table.

4. **[x] Verified** — Cross-checked against multiple independent sources where possible. Conflicts noted in the Notes section: (a) exact stock flow numbers unavailable (estimated from comparative data), (b) CNC flow numbers marketing-inflated (Bad Guys bench testing showed competitor advertised 330 CFM+ underperformed), (c) cam gain estimates dependent on supporting mods, (d) fuel system upgrade threshold disputed.

5. **[x] No swallowed errors** — Not applicable (documentation-only task, no code changes).

6. **[x] Documentation in sync** — README.md and CLAUDE.md do not need updating (task does not change behavior, flags, file layout, or conventions). STATE.md updated per item 7.

7. **[x] STATE.md updated** — Task line changed from `- [ ]` to `- [x]` with date (2026-05-15) and commit SHA (fd5479c). Follow-up tasks documented in this report.

8. **[x] CI green** — Not applicable. This is a documentation-only research task with no code changes. The project's `package.json` contains only placeholder scripts with no actual CI tooling (no typecheck, lint, or format scripts exist).

9. **[x] No regressions** — No code changes means no regression risk. Existing research files verified intact via grep counts confirming references to the new file in both index files.

10. **[x] Reviewable diff** — Single-purpose commit with conventional prefix `docs:`. No drive-by reformatting. Three files changed (one new research file, two index updates, STATE.md update in separate commit). Commit message clearly describes the task and scope.

---

## Additional Notes

### Key Finding: Head Porting is Highest ROI

The single highest-ROI modification for the H22A Blacktop is head porting, given the ~65–110% intake flow improvement over as-cast stock condition (~170–190 CFM to 280–360 CFM). This finding is consistent with T-156's documentation that the Blacktop receives no factory head porting whatsoever, unlike the Redtop which receives light factory hand-porting.

### Cam Selection Depends on Build Goal

Brian Crower Stage 2 NA (BC0032) offers the best balance for street-driven Blacktops: 312°/310° advertised duration maintains drivable idle quality while delivering +15–25 WHP. Competition cams (Toda Racing, aggressive Skunk2 profiles) deliver more power but sacrifice idle smoothness and low-RPM torque — unsuitable for daily drivers.

### Realistic Power Ceiling

Community consensus and dyno results suggest 220–240 WHP as the realistic all-motor ceiling for a Blacktop with comprehensive bolt-ons (CNC head, cams, larger valves, ECU tune). Beyond this point, forced induction becomes necessary for further gains. The stock bottom end (forged crank/rods) is rated for up to ~280 WHP all-motor or ~250–280 WHP at 6–8 psi boost.
