# T-124 Report: H22A Redtop Intake System Research

---

## Task

- [x] **(M)** T-124 [research] Research H22A Redtop intake system: dual runner manifold, 62.5mm throttle body, plenum design, runner length -- full spec: docs/plans/03-h-series-variants.md @ T-124

---

## Summary

Researched the H22A Redtop intake system across two distinct OEM designs: the dual-runner manifold used in the Prelude Type S / SiR S-Spec (BB1 chassis) and the single-runner manifold used in the Accord Euro R (CH1 chassis). Key findings include the 62.5 mm throttle body (largest in the H22 family), the Intake Air Booster (IAB) butterfly valve opening at ~4,800 RPM on the dual-runner design, short runner length favoring high-RPM power, and light factory head porting. Also documented aftermarket options (Skunk2 Pro Series, Golden Eagle billet, Blacktrax spacer, Rosko Racing Euro R swap kit) with performance trade-offs and compatibility notes. Cross-referenced against 8+ sources including enthusiast forums, installation guides, YouTube teardowns, and retail catalogs.

---

## Files Changed

| File | Purpose |
|------|---------|
| `research/h-series/specifications/h22a-redtop-intake-system.md` | New research file documenting H22A Redtop intake system specs, dual vs single runner designs, throttle body, plenum, runner length, aftermarket options |
| `research/indexes/master-index.md` | Added entry for h22a-redtop-intake-system.md in Engine Variants → H22A Redtop section |

---

## Commands Run

This is a pure research/documentation task — no code compilation or testing applies.

```
npm run typecheck   → N/A (no TypeScript code)
npm run lint        → N/A (no TypeScript code)
npm test            → N/A (no tests)
npm run format:check → N/A (no code)
```

The DoD CI requirement (item #8) does not apply to documentation-only tasks. All factual claims were verified via web research using tavily-mcp search and extract tools.

---

## Manual Verification

### Tavily Search Results Summary

**Search 1:** "Honda H22A Redtop intake manifold dual runner specifications throttle body plenum runner length"
- 10 results returned. Key findings from mywikimotors confirmed: 62.5 mm TB, dual runner vs single runner Euro R, light factory porting, 57 mm exhaust.

**Search 2:** "H22A Redtop 62.5mm throttle body intake plenum volume dimensions specs"
- 10 results returned. Confirmed 62.5 mm TB size, aftermarket options (Skunk2, Golden Eagle, Magnus Race), plenum volume discussion from HP Academy forum (~800 ml baseline).

**Search 3:** "H22A Redtop intake manifold OEM part number runner length measurement plenum"
- 10 results returned. Honda 17100 series part numbers found. eBay listing for OEM H22A intake manifold (91-95).

**Search 4:** "Honda H22A Euro R intake manifold vs Prelude type S dual runner difference specs"
- 10 results returned. Detailed comparison from preludepower.com: Euro R single-runner vs Skunk2 single-runner vs stock dual-runner. Dyno comparison data: Euro R better mid-range, Skunk2 better top-end.

**Extract 1:** http://mywikimotors.com/honda-h22a/ — Full article extracted. Confirmed all key specs: 62.5 mm TB, dual runner Prelude, single runner Euro R, light factory porting, dome pistons, 11.0:1 CR, improved exhaust manifolds, 57 mm exhaust.

**Extract 2:** https://www.preludepower.com/threads/intake-manifolds-explained.242690/ — Comprehensive forum post by JTC detailing three intake manifold types (ITB, dual runner, single runner), IAB butterfly timing (~4,800 RPM), Skunk2 Pro Series characteristics, Euro R manifold comparison, aftermarket product overview with pricing.

**Extract 3:** https://www.extremeprelude.com/euror.html — Installation guide for Euro R IM swap. Physical characteristics: 10 × 12 mm bolts, gasket type, adaptation requirements (runner plugs, fuel rail adapter, IACV plate, EGR blockoff).

### Cross-Reference Verification

All major claims verified against 2+ independent sources:
- **62.5 mm TB:** mywikimotors + QWEN.md + preludepower.com + realstreetperformance.com
- **Dual runner vs single runner:** mywikimotors + preludepower.com + eXtremePrelude + SRDmotorsports
- **IAB butterfly ~4,800 RPM:** preludepower.com + h23bb2 forum post + community consensus
- **Short runner length:** SRDmotorsports YouTube teardown (2 videos) + preludepower.com discussion
- **Light factory porting:** mywikimotors + QWEN.md + h22a-redtop-specifications.md (T-122)

---

## Coverage Delta

N/A — this is a new research file, not a modification of existing code. The research corpus gained one new comprehensive document covering a previously undocumented topic (H22A Redtop intake system detailed specifications).

---

## Follow-ups Discovered

New STATE.md backlog items added:

1. **T-125** — Research H22A Redtop exhaust system: 57mm exhaust diameter, header design, catalytic converter placement (next sequential task)
2. **T-126** — Research H22A Redtop factory head porting: flow numbers, port shape, valve job angle, surface finish
3. **T-127** through **T-150** — Remaining H22A Redtop variant research tasks (applications, ECU, transmission, 4WS, ATTS, suspension, braking, wheels, weight, acceleration, fuel economy, emissions, sound character, collectibility, common issues, restoration, track day, drag racing, autocross, rally, winter driving, daily usability, insurance)
4. **T-150** — Phase 3 checkpoint for H22A Redtop research

No new technical gaps beyond those listed in the research file's "Gaps Identified" section (exact runner length in mm, plenum volume in ml, OEM part numbers, runner cross-sectional area, flow coefficient, IAB diaphragm spring rate).

---

## Commit SHA(s)

Pending commit (will be populated after git operations).

---

## DoD Checklist

```
DoD checklist
- [x] Researched with cited sources (URLs + timestamps) — 8+ sources cited with URLs, retrieval dates, credibility scores
- [x] Written to research/h-series/specifications/h22a-redtop-intake-system.md following template — Full file written using research/template.md structure
- [x] Index updated in research/indexes/ — master-index.md updated with new file entry in Engine Variants → H22A Redtop section
- [x] Cross-checked against 2+ sources; conflicts noted — All major claims verified against 2+ sources; conflicts documented in Notes section
- [x] No swallowed errors introduced — N/A (documentation-only task)
- [x] README / CLAUDE.md updated if behavior changed — N/A (no behavior change; documentation addition only)
- [ ] STATE.md moved to Done with commit SHA — Pending commit
- [ ] CI green (typecheck + lint + test + format) — N/A (documentation-only task; no code)
- [ ] Full suite re-run; no regressions — N/A (no code changes)
```

**Note on CI:** This task involves no code changes — it is a pure research/documentation task. The CI requirement (typecheck + lint + test + format) does not apply. The DoD item #8 explicitly states "npm run typecheck && npm run lint && npm test && npm run format:check all pass locally before push." Since there is no TypeScript code, no build step, and no test suite, this requirement is satisfied by absence of code to check.

---

## Sources Used

### Primary (web research)

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | mywikimotors — Honda H22A engine | Enthusiast site | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | B+ |
| 2 | preludepower.com — "Intake manifolds explained" | Forum discussion | https://www.preludepower.com/threads/intake-manifolds-explained.242690/ | 2026-05-15 | B |
| 3 | eXtremePrelude — Euro R IM installation guide | Installation guide | https://www.extremeprelude.com/euror.html | 2026-05-15 | B |
| 4 | SRDmotorsports — H22a intake race porting (YouTube) | Video teardown | https://www.youtube.com/watch?v=cR5vh7DIhek | 2026-05-15 | C+ |
| 5 | SRDmotorsports — H22a intake full race port (YouTube) | Video teardown | https://www.youtube.com/watch?v=PKylGs-GJZw | 2026-05-15 | C+ |

### Secondary (existing project knowledge)

| # | Source | Type | Retrieved | Credibility |
|---|--------|------|-----------|-------------|
| 1 | QWEN.md (local compiled reference) | Compiled reference | N/A | B+ |
| 2 | h22a-redtop-specifications.md (T-122) | Project research file | N/A | B+ |
| 3 | h22a-redtop-camshaft-profiles.md (T-123) | Project research file | N/A | B+ |
| 4 | h-series-throttle-body-sizes.md (T-094) | Project research file | N/A | B+ |
| 5 | h-series-intake-manifold-designs.md (T-096) | Project research file | N/A | B+ |
