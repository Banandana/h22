# STATE.md — Honda H/F-Series Engine Research Project

Live task tracker. The autonomous runner (`scripts/run-all.sh` -> `scripts/run-task.sh` -> `pi` on
the 35B toaster profile) reads this file, picks the first open `- [ ]` task top-to-bottom, and
drives it to Done.

**Detailed specs live in `docs/plans/<phase>.md`.** Every task line below ends
with `@ T-NNN` — that is the pointer to its authoritative spec section (`### T-NNN`) in the
plan doc. The plan doc is the source of truth for *how*; this file is the source of truth for
*what is open and in what order*.

Agents picking up work: **start here**, then read `CLAUDE.md`, `README.md`, and your task's
`### T-NNN` section in the plan doc.

## How this file works

- The project runs in phases (0 -> N). Phase order is execution order. A `[gate]` task at each
  phase boundary blocks the next phase until every task in the phase is Done.
- Task line format (pure ASCII; the runner's `make_slug` depends on the `**(S)**` prefix):
  `- [ ] **(S)** T-NNN [type] <title> -- full spec: docs/plans/<phase>.md @ T-NNN`
- `[type]` is one of: `[research]` (normal research task), `[audit]` (enumeration sweep),
  `[fix]` (one remediation spawned by an audit), `[checkpoint]` (every ~20 tasks — re-checks
  drift, identifies gaps, spawns new tasks), `[gate]` (phase boundary), `[infra]` (infrastructure).
- Markers: `[ ]` = open (pickable), `[x]` = done, `[~]` = in progress / blocked, `[B]` = blocked
  or not-actionable. Only `[ ]` is picked by the runner.
- To complete a task: tick every Definition-of-Done box, write `reports/<slug>.md`, then move the
  line to the Done archive (or flip `[ ]` -> `[x]`) with the date + commit SHA.

## Format conventions

- `[ ]` = not started, `[~]` = in progress / blocked, `[x]` = done, `[B]` = blocked / cancelled.
- Tasks are self-contained via their plan doc section — an agent with no prior session memory
  reads that section and can execute.
- Scope tag: **(S)** small (< 1 hr), **(M)** medium (1-4 hr), **(L)** large (> 4 hr).
- Dependencies are listed per-task in the plan doc (`Depends on:`).
- Do not add `### ` subsections inside a `## Backlog` heading — keep task lists flat so the runner
  hands the phase heading to `pi` as context.

## Definition of Done — applies to **every** task

A task is not `[x] done` until **all** of the following are true. No exceptions, no "ship it and
circle back":

1. **Researched** — information gathered from online sources (tavily search/extract), local manuals,
   or both. All claims cited with source URLs and retrieval timestamps.
2. **Written** — findings saved to the appropriate markdown file under `research/<series>/`.
   File follows the template in `docs/plans/TEMPLATE.md`.
3. **Indexed** — the relevant index file under `research/indexes/` is updated with links to new content.
4. **Verified** — cross-checked against at least 2 independent sources where possible. Conflicts noted.
5. **No swallowed errors.** Every `catch {}` block either re-throws, logs, or has a justification.
6. **Documentation in sync.** If the task changes behavior, flags, file layout, or conventions:
   update `README.md` (user-visible) and/or `CLAUDE.md` (agent-visible) in the **same commit**.
7. **STATE.md updated.** Move the task to Done with date + commit SHA. Add any newly-discovered
   follow-ups to the appropriate phase backlog. Don't leave stale `[~]` markers.
8. **CI green.** `npm run typecheck && npm run lint && npm test && npm run format:check` all pass
   locally before push.
9. **No regressions.** Run the full test suite, not just the new tests.
10. **Reviewable diff.** Single-purpose commits. No drive-by reformatting. Commit messages follow
    conventional prefix (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `perf:`).

**Verification checklist to paste into PRs / commit bodies:**

```
DoD checklist
- [ ] Researched with cited sources (URLs + timestamps)
- [ ] Written to research/<series>/<topic>.md following template
- [ ] Index updated in research/indexes/
- [ ] Cross-checked against 2+ sources; conflicts noted
- [ ] No swallowed errors introduced
- [ ] README / CLAUDE.md updated if behavior changed
- [ ] STATE.md moved to Done with commit SHA
- [ ] CI green (typecheck + lint + test + format)
- [ ] Full suite re-run; no regressions
```

If you can't tick every box, the task stays `[~]` in progress.

---

## Current focus

Exhaustive research on Honda H-series and F-series I4 engines. Phase 0 is infrastructure: index
local manuals, set up playwright for browser-based web navigation, create directory structure,
verify tools. Then proceed through H-series (Phase 1-5) and F-series (Phase 6-10) research.

Execution is strictly sequential, top-to-bottom: **Phase 0 (Infrastructure)** first.

Phases: 0 Infrastructure · 1 H-Series Development & Specs · 2 H-Series Variants · 3 H-Series Mechanical · 4 H-Series Systems · 5 H-Series Performance · 6 F-Series Development & Specs · 7 F-Series Variants · 8 F-Series Mechanical · 9 F-Series Systems · 10 F-Series Performance · 11 Synthesis & Cross-Reference

## In Progress

_(none)_

---

## Backlog — Phase 0: Infrastructure & Tooling

### Indexing & Local Data


- [x] **(M)** T-003 [infra] Parse 1997-2001 Helms Manual BB6 PDF metadata and table of contents — done 2026-05-14, sha 277ba50 -- full spec: docs/plans/00-infrastructure.md @ T-003
- [x] **(M)** T-005 [infra] Analyze bb6_ocr extracted text: page count, word count, section coverage — done 2026-05-14, sha 8363ccf -- full spec: docs/plans/00-infrastructure.md @ T-005
- [x] **(M)** T-006 [infra] Map OCR output directory: enumerate all 4128 page files, categorize by type (.txt, .json, .tsv) — done 2026-05-14, sha e373667 -- full spec: docs/plans/00-infrastructure.md @ T-006
- [x] **(S)** T-007 [infra] Sample OCR page files: read 5 representative pages to assess quality — done 2026-05-14, sha f3212d5 — full spec: docs/plans/00-infrastructure.md @ T-007
- [x] **(S)** T-008 [infra] Check bb6_ocr_samples: examine PNG screenshots and sample text output — done 2026-05-14, sha d0fbb43 — full spec: docs/plans/00-infrastructure.md @ T-008
- [x] **(S)** T-009 [infra] Check bb6_ocr/pages_needing_review.txt for flagged pages — done 2026-05-14, sha af73643 -- full spec: docs/plans/00-infrastructure.md @ T-009
- [x] **(M)** T-010 [infra] Build index of local manual content: create research/indexes/local-manuals.md mapping topics to source files and page ranges -- done 2026-05-14, sha 926bbbe -- full spec: docs/plans/00-infrastructure.md @ T-010
- [x] **(M)** T-011 [infra] Create QWEN.md content inventory: extract all topics, subtopics, and references from existing document -- done 2026-05-14, sha 5b674f0 -- full spec: docs/plans/00-infrastructure.md @ T-011
- [x] **(S)** T-012 [infra] Identify gaps in QWEN.md: compare against comprehensive H/F-series topic list, flag missing areas -- done 2026-05-14, sha 3b4d3ca -- full spec: docs/plans/00-infrastructure.md @ T-012
- [x] **(S)** T-013 [infra] Catalog all H-series variant codes mentioned in local materials: H22A, H22A1-H22A8, H22Z1, H23A -- done 2026-05-15, sha 43e187e -- full spec: docs/plans/00-infrastructure.md @ T-013
- [x] **(S)** T-014 [infra] Catalog all F-series variant codes mentioned in local materials: F20B, F20C, F22R, etc. — done 2026-05-15, sha 89281b7 -- full spec: docs/plans/00-infrastructure.md @ T-014
- [x] **(S)** T-015 [infra] Extract all ECU part numbers and pinout references from local manuals — done 2026-05-14, sha 45ff173 -- full spec: docs/plans/00-infrastructure.md @ T-015

### Directory Structure & Output Organization

- [x] **(M)** T-016 [infra] Create research/ directory structure: h-series/, f-series/, comparisons/, indexes/, raw-data/ -- done 2026-05-15, sha 40b3c74 -- full spec: docs/plans/00-infrastructure.md @ T-016
- [x] **(M)** T-017 [infra] Create research/h-series/ subdirectories: development/, specifications/, variants/, mechanical/, vtec/, engine-management/, tuning/, reliability/, swaps/, motorsport/, aftermarket/, comparisons/, maintenance/ -- done 2026-05-14, sha de19d62 -- full spec: docs/plans/00-infrastructure.md @ T-017
- [x] **(M)** T-018 [infra] Create research/f-series/ subdirectories: development/, specifications/, variants/, mechanical/, vtec/, engine-management/, tuning/, reliability/, swaps/, motorsport/, aftermarket/, comparisons/, maintenance/ -- done 2026-05-14, sha f1aaf43 -- full spec: docs/plans/00-infrastructure.md @ T-018
- [x] **(S)** T-019 [infra] Create research/comparisons/ subdirectories: h-vs-f/, h-vs-b16/, h-vs-k20/, h-vs-f20c/, f-vs-b16/, f-vs-k20/ -- done 2026-05-14, sha 5433d4e -- full spec: docs/plans/00-infrastructure.md @ T-019
- [x] **(S)** T-020 [infra] Create initial research/indexes/master-index.md with placeholder structure linking to all planned research files -- done 2026-05-14, sha N/A (no git repo) -- full spec: docs/plans/00-infrastructure.md @ T-020

### Tool Verification & Configuration

- [x] **(M)** T-021 [infra] Verify tavily-mcp availability and test search/extract with a sample query -- done 2026-05-14, sha e17ba05 -- full spec: docs/plans/00-infrastructure.md @ T-021
- [x] **(M)** T-022 [infra] Test tavily search with "Honda H22A Redtop specifications" and verify result quality -- done 2026-05-15, sha 462a67b -- full spec: docs/plans/00-infrastructure.md @ T-022
- [x] **(M)** T-023 [infra] Test tavily extract with a known Honda technical article URL and verify content extraction -- done 2026-05-15, sha 8418f72 -- full spec: docs/plans/00-infrastructure.md @ T-023
- [x] **(S)** T-024 [infra] Check playwright availability: npx playwright --version, verify Chromium installation -- full spec: docs/plans/00-infrastructure.md @ T-024 -- done 2026-05-15, sha 5293a4f
- [x] **(S)** T-025 [infra] Check if playwright is configured in ~/.pi/agent/extensions/ or ~/.pi/mcp.json -- done 2026-05-15, sha a1641f8 -- full spec: docs/plans/00-infrastructure.md @ T-025
- [x] **(M)** T-026 [infra] Add playwright MCP configuration to ~/.pi/agent/extensions/ or ~/.pi/mcp.json for browser-based web navigation -- done 2026-05-15, sha 4a5b207 -- full spec: docs/plans/00-infrastructure.md @ T-026
- [x] **(M)** T-027 [infra] Test playwright browser automation: navigate to a Honda forum, take screenshot, verify output -- done 2026-05-15, sha 10542fb -- full spec: docs/plans/00-infrastructure.md @ T-027
- [x] **(S)** T-028 [infra] Document available tools and their capabilities in research/indexes/tools-reference.md -- done 2026-05-15, sha 7e3662a -- full spec: docs/plans/00-infrastructure.md @ T-028
- [x] **(S)** T-029 [infra] Create research/template.md: standard template for all research markdown files with sections for summary, specifications, sources, notes, citations -- done 2026-05-15, sha c2f1ab9 -- full spec: docs/plans/00-infrastructure.md @ T-029
- [x] **(S)** T-030 [infra] Create research/citations.md: standard citation format and source tracking methodology -- done 2026-05-15, sha 7be7c44 -- full spec: docs/plans/00-infrastructure.md @ T-030

---

## Backlog — Phase 1: H-Series Development History & Timeline

### Origins & Architecture



- [x] **(S)** T-035 [research] Research Honda's DOHC VTEC philosophy in the early 1990s: market positioning, technology race -- full spec: docs/plans/01-h-series-development.md @ T-035 — 2026-05-15
- [x] **(S)** T-037 [research] Research H-series aluminum block casting process and materials science: alloy composition, manufacturing — done 2026-05-15, sha 3d2a467 — full spec: docs/plans/01-h-series-development.md @ T-037
- [x] **(M)** T-038 [research] Research H-series engineering targets: power density, reliability, emissions, cost constraints -- done 2026-05-15, sha 80a9634 -- full spec: docs/plans/01-h-series-development.md @ T-038
- [x] **(S)** T-039 [research] Research H-series vs competitor engines in early 1990s: Toyota 3S-GE, Mazda 13B-MSP rotary, Subaru EJ22 -- full spec: docs/plans/01-h-series-development.md @ T-039 — 2026-05-15, sha f9e544e
- [x] **(S)** T-040 [research] Research Honda's four-wheel steering (4WS) integration with H-series: why paired, performance impact -- full spec: docs/plans/01-h-series-development.md @ T-040 — 2026-05-15, sha 8e2d1a2

### Production & Market Introduction

- [x] **(M)** T-041 [research] Research H-series production timeline: start date, production volumes, end of production -- done 2026-05-15, sha cbc89d0 -- full spec: docs/plans/01-h-series-development.md @ T-041
- [x] **(M)** T-042 [research] Research 1991 4th gen Prelude launch: H22/H23 introduction, market reception, pricing -- done 2026-05-15, sha 995fb09 -- full spec: docs/plans/01-h-series-development.md @ T-042
- [x] **(M)** T-043 [research] Research H-series North American introduction: 1993 USDM Prelude VTEC, marketing, dealer training -- done 2026-05-15, sha c9d5045 -- full spec: docs/plans/01-h-series-development.md @ T-043
- [x] **(M)** T-044 [research] Research H-series European market introduction: UK/European Prelude, Accord Euro R -- full spec: docs/plans/01-h-series-development.md @ T-044 — done 2026-05-15, sha 4ca28a0
- [x] **(M)** T-045 [research] Research H-series Japanese domestic market strategy: SiR models, Type S, premium positioning -- done 2026-05-15, sha d389b7c -- full spec: docs/plans/01-h-series-development.md @ T-045
- [x] **(S)** T-046 [research] Research H-series production locations: Japan plants, any overseas production -- done 2026-05-15, sha 7fd900c -- full spec: docs/plans/01-h-series-development.md @ T-046
- [x] **(S)** T-047 [research] Research H-series supply chain: component suppliers, castings, machining partners -- full spec: docs/plans/01-h-series-development.md @ T-047 — done 2026-05-15, sha b4526f2
- [x] **(S)** T-048 [research] Research H-series cost analysis: BOM estimate, pricing vs B-series, margin strategy -- done 2026-05-15, sha 5bf1496 -- full spec: docs/plans/01-h-series-development.md @ T-048
- [x] **(S)** T-049 [research] Research H-series discontinuation: why replaced by K-series, market shifts, emissions pressures -- done 2026-05-15, sha 1bdf7ef — full spec: docs/plans/01-h-series-development.md @ T-049
- [x] **(S)** T-050 [research] Research H-series legacy: transition to K20/K24, technology carryover, enthusiast retention -- done 2026-05-15, sha 8400996 -- full spec: docs/plans/01-h-series-development.md @ T-050
- [x] **(S)** T-051 [research] Research H-series production numbers by variant and year: available sales data, registration stats -- done 2026-05-15, sha 94d6884 -- full spec: docs/plans/01-h-series-development.md @ T-051
- [x] **(S)** T-052 [research] Research H-series recall history: any manufacturer recalls, safety campaigns -- full spec: docs/plans/01-h-series-development.md @ T-052 — done 2026-05-15, sha a5ee81f
- [x] **(S)** T-053 [research] Research H-series warranty periods and common warranty claims: industry data, forum reports -- full spec: docs/plans/01-h-series-development.md @ T-053 — done 2026-05-15
- [x] **(S)** T-054 [research] Research H-series environmental compliance: emissions standards met, catalytic converter tech -- done 2026-05-15, sha 66199b1 -- full spec: docs/plans/01-h-series-development.md @ T-054
- [x] **(S)** T-055 [research] Research H-series fuel economy ratings by market and transmission: EPA, JC08, WLTP data -- done 2026-05-15, sha 07029b5 -- full spec: docs/plans/01-h-series-development.md @ T-055
- [x] **(S)** T-059 [research] Research H-series altitude performance: naturally aspirated power loss, ECU adaptation -- done 2026-05-15 -- full spec: docs/plans/01-h-series-development.md @ T-059
- [x] **(S)** T-060 [research] Research H-series fuel compatibility: octane requirements, ethanol tolerance, premium vs regular -- full spec: docs/plans/01-h-series-development.md @ T-060 — 2026-05-15
- [x] **(S)** T-062 [research] Research H-series patents and intellectual property: filed patents, proprietary technologies -- full spec: docs/plans/01-h-series-development.md @ T-062 — 2026-05-15, sha 0bd235d
- [x] **(S)** T-063 [research] Research H-series homologation requirements: racing series eligibility, special edition approvals -- full spec: docs/plans/01-h-series-development.md @ T-063 — done 2026-05-15, sha 942e807
- [x] **(S)** T-064 [research] Research H-series crash safety integration: engine mounting, collapse zones, pedestrian safety -- done 2026-05-15, sha a912369 -- full spec: docs/plans/01-h-series-development.md @ T-064
- [x] **(S)** T-065 [research] Research H-series service interval evolution: how maintenance schedules changed across production years -- done 2026-05-15, sha 1a100d9 -- full spec: docs/plans/01-h-series-development.md @ T-065
- [x] **(S)** T-066 [research] Research H-series tooling and factory equipment: special tools required, dealership updates -- done 2026-05-15, sha b037780 -- full spec: docs/plans/01-h-series-development.md @ T-066
- [x] **(S)** T-067 [research] Research H-series technician training: Honda training programs, certification requirements -- done 2026-05-15, sha e7284e3 -- full spec: docs/plans/01-h-series-development.md @ T-067
- [x] **(S)** T-068 [research] Research H-series diagnostic equipment: scan tools, oscilloscope patterns, factory procedures -- full spec: docs/plans/01-h-series-development.md @ T-068 — 2026-05-15, sha 15efc0c
- [x] **(S)** T-070 [checkpoint] Phase 1 checkpoint: review H-series development research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/01-h-series-development.md @ T-070 — 2026-05-15, sha d95fe1c

---

## Backlog — Phase 2: H-Series Technical Specifications Deep-Dive

### Block & Architecture

- [x] **(M)** T-071 [research] Research H-series block dimensions: deck height, bore spacing, cylinder center-to-center distances -- full spec: docs/plans/02-h-series-specs.md @ T-071 — 2026-05-15
- [x] **(M)** T-072 [research] Research H-series block materials: aluminum alloy grade, FRM liner composition, casting process -- full spec: docs/plans/02-h-series-specs.md @ T-072 — 2026-05-15, sha 0627884
- [x] **(M)** T-073 [research] Research H-series closed deck vs open deck designs: 1992-1996 vs 1997-2001 differences, structural analysis -- done 2026-05-15, sha 77dea2b -- full spec: docs/plans/02-h-series-specs.md @ T-073
- [x] **(M)** T-074 [research] Research H-series main bearing support: 5-bolt cap design, journal diameter changes (50mm to 55mm), stiffness — done 2026-05-15, sha 378ca57 — full spec: docs/plans/02-h-series-specs.md @ T-074
- [x] **(M)** T-075 [research] Research H-series cylinder bore dimensions: 87.0mm bore, hone pattern, surface finish specifications -- done 2026-05-15, sha 2c2b2cd -- full spec: docs/plans/02-h-series-specs.md @ T-075
- [x] **(M)** T-076 [research] Research H-series stroke dimensions: 90.7mm stroke, rod ratio (1.58:1), piston velocity calculations -- done 2026-05-15, sha aff8d80 -- full spec: docs/plans/02-h-series-specs.md @ T-076
- [x] **(M)** T-077 [research] Research H-series displacement calculation: 2157cc derivation, tolerance bands, actual measured volumes -- done 2026-05-15, sha 60fe877 -- full spec: docs/plans/02-h-series-specs.md @ T-077
- [x] **(M)** T-080 [research] Research H-series balancing system: balancer shafts, counterweights, vibration frequencies -- done 2026-05-15, sha f643fdb -- full spec: docs/plans/02-h-series-specs.md @ T-080
- [x] **(M)** T-081 [research] Research H-series oil gallery layout: main galley, VTEC passages, oil squirters, pressure drops -- done 2026-05-15, sha b9f2d5c -- full spec: docs/plans/02-h-series-specs.md @ T-081
- [x] **(M)** T-082 [research] Research H-series water jacket design: coolant flow paths, heating/cooling zones, hot spot management -- done 2026-05-15, sha 03f1da0 -- full spec: docs/plans/02-h-series-specs.md @ T-082
- [x] **(M)** T-083 [research] Research H-series head bolt specifications: torque sequence, stretch limits, yield point calculations -- done 2026-05-15, sha 24ff654 -- full spec: docs/plans/02-h-series-specs.md @ T-083
- [x] **(M)** T-084 [research] Research H-series engine weight: dry weight, fluid-filled weight, weight distribution, mounting points -- done 2026-05-15, sha 8773a62 -- full spec: docs/plans/02-h-series-specs.md @ T-084
- [x] **(M)** T-085 [research] Research H-series external dimensions: length, width, height, accessory packaging -- full spec: docs/plans/02-h-series-specs.md @ T-085 — done 2026-05-15, sha bf4f65d
- [x] **(M)** T-087 [research] Research H-series specific output by variant: HP/liter for Redtop, Blacktop, USDM, EDM variants -- done 2026-05-15, sha fddc238 (research file from T-086) -- full spec: docs/plans/02-h-series-specs.md @ T-087
- [x] **(S)** T-088 [research] Research H-series thermal efficiency: brake thermal efficiency figures, heat rejection percentages -- done 2026-05-15, sha 1fc68dd -- full spec: docs/plans/02-h-series-specs.md @ T-088
- [x] **(S)** T-089 [research] Research H-series friction losses: piston ring friction, bearing friction, windage losses, total pumping -- full spec: docs/plans/02-h-series-specs.md @ T-089 — done 2026-05-15, sha 59939a2
- [x] **(S)** T-090 [research] Research H-series compression ratio variations: 10.0:1, 10.6:1, 11.0:1 variants, piston crown shapes -- done 2026-05-15, sha 468f3d1 -- full spec: docs/plans/02-h-series-specs.md @ T-090
- [x] **(S)** T-091 [research] Research H-series combustion chamber design: pent-roof shape, valve angles, swirl ratio, tumble generation — done 2026-05-15, sha 432950f -- full spec: docs/plans/02-h-series-specs.md @ T-091
- [x] **(S)** T-092 [research] Research H-series intake port design: runner length, cross-section, flow coefficients, velocity profiles -- done 2026-05-15, sha 027d708 -- full spec: docs/plans/02-h-series-specs.md @ T-092
- [x] **(S)** T-093 [research] Research H-series exhaust port design: runner length, cross-section, flow coefficients, heat management -- done 2026-05-15, sha 806f531 -- full spec: docs/plans/02-h-series-specs.md @ T-093
- [x] **(S)** T-094 [research] Research H-series throttle body sizes: 57mm, 60mm, 62.5mm variants, airflow calculations -- done 2026-05-15, sha f744ab6 -- full spec: docs/plans/02-h-series-specs.md @ T-094
- [x] **(S)** T-095 [research] Research H-series exhaust system diameters: 51mm vs 57mm, backpressure calculations, muffler design -- done 2026-05-15, sha f7ac226 -- full spec: docs/plans/02-h-series-specs.md @ T-095

- [x] **(S)** T-097 [research] Research H-series flywheel and clutch specifications: diameter, weight, material, engagement characteristics -- done 2026-05-15, sha b15c005 -- full spec: docs/plans/02-h-series-specs.md @ T-097
- [x] **(S)** T-098 [research] Research H-series alternator and starter motor specs: amperage, torque, mounting, gear ratios -- full spec: docs/plans/02-h-series-specs.md @ T-098 — done 2026-05-15, sha e7709e0
- [x] **(S)** T-099 [research] Research H-series accessory drive: power steering pump, A/C compressor, bracket design, belt routing -- done 2026-05-15, sha 7acb268 -- full spec: docs/plans/02-h-series-specs.md @ T-099
- [x] **(S)** T-100 [research] Research H-series sensor complement: all sensors listed with part numbers, signal types, operating ranges -- done 2026-05-15, sha 4e4f941 -- full spec: docs/plans/02-h-series-specs.md @ T-100

- [x] **(S)** T-102 [research] Research H-series timing marks and alignment: cam timing, crank timing, tensioner reference positions -- done 2026-05-15, sha 0e77511 -- full spec: docs/plans/02-h-series-specs.md @ T-102
- [x] **(S)** T-103 [research] Research H-series oil specification: viscosity grades, capacity by variant, filter part numbers — done 2026-05-15, sha 4c922fe — full spec: docs/plans/02-h-series-specs.md @ T-103
- [x] **(S)** T-109 [research] Research H-series camshaft bearing dimensions: bore size, journal diameter, oil clearance specifications — done 2026-05-15, sha 93edd35 — full spec: docs/plans/02-h-series-specs.md @ T-109
- [x] **(S)** T-104 [research] Research H-series coolant specification: type, capacity, mixture ratio, thermostat opening temp — done 2026-05-15, sha 66b422f — full spec: docs/plans/02-h-series-specs.md @ T-104
- [x] **(S)** T-105 [research] Research H-series spark plug specifications: gap, heat range, thread size, torque, replacement interval — done 2026-05-15, sha 3f97799 — full spec: docs/plans/02-h-series-specs.md @ T-105
- [x] **(S)** T-106 [research] Research H-series valve spring specifications: open pressure, closed pressure, coil bind, surge frequency — done 2026-05-15, sha 7471998 — full spec: docs/plans/02-h-series-specs.md @ T-106
- [x] **(S)** T-107 [research] Research H-series bearing clearances: main bearing clearance, rod bearing clearance, thrust clearance specs -- done 2026-05-15, sha c38c09f -- full spec: docs/plans/02-h-series-specs.md @ T-107
- [x] **(S)** T-108 [research] Research H-series piston-to-wall clearance: skirt clearance, ring gap, crown-to-piston distance -- done 2026-05-15, sha 731c47b -- full spec: docs/plans/02-h-series-specs.md @ T-108
- [x] **(S)** T-110 [research] Research H-series oil pump specifications: gear type, rotor design, flow rate at various RPMs, pressure relief — done 2026-05-15, sha 25dfee1 -- full spec: docs/plans/02-h-series-specs.md @ T-110
- [x] **(S)** T-111 [research] Research H-series water pump specifications: impeller diameter, flow rate, bearing life, drive method -- done 2026-05-15, sha a2851e0 -- full spec: docs/plans/02-h-series-specs.md @ T-111
- [x] **(S)** T-112 [research] Research H-series timing belt specifications: tooth count, width, material, tensioner type, replacement interval — done 2026-05-15, sha cf7a151 — full spec: docs/plans/02-h-series-specs.md @ T-112
- [x] **(S)** T-113 [research] Research H-series fuel system specifications: rail pressure, injector flow rates, pump capacity, regulator type -- done 2026-05-15, sha 27549bb -- full spec: docs/plans/02-h-series-specs.md @ T-113
- [x] **(S)** T-114 [research] Research H-series ignition system specifications: coil type, spark energy, dwell time, distributor vs coil-on-plug -- done 2026-05-15, sha 29d24f2 -- full spec: docs/plans/02-h-series-specs.md @ T-114
- [x] **(S)** T-115 [research] Research H-series idle speed specifications: RPM targets by variant, IACV control range, learning procedures — done 2026-05-15, sha 681fe8f -- full spec: docs/plans/02-h-series-specs.md @ T-115
- [x] **(S)** T-116 [research] Research H-series redline specifications: rev limiter strategy, shift window, overrev protection — done 2026-05-15, sha 7600adf — full spec: docs/plans/02-h-series-specs.md @ T-116
- [x] **(S)** T-117 [research] Research H-series VTEC engagement parameters: RPM threshold, oil pressure minimum, speed interlock, throttle position -- full spec: docs/plans/02-h-series-specs.md @ T-117 — done 2026-05-15, sha 5af83a2
- [x] **(S)** T-118 [research] Research H-series ECU processor and memory: CPU type, RAM size, ROM capacity, lookup table resolution -- done 2026-05-15, sha 1a194f5 -- full spec: docs/plans/02-h-series-specs.md @ T-118
- [x] **(S)** T-119 [research] Research H-series OBD version differences: OBD1 vs OBD2 diagnostic capabilities, connector pinouts, trouble code sets -- done 2026-05-15, sha 03d20c0 -- full spec: docs/plans/02-h-series-specs.md @ T-119
- [x] **(S)** T-120 [checkpoint] Phase 2 checkpoint: review H-series specifications research, identify gaps, spawn new tasks if needed — done 2026-05-15 (no git repo yet) — full spec: docs/plans/02-h-series-specs.md @ T-120

---

## Backlog — Phase 3: H-Series Engine Variants Detailed Research

### H22A Redtop (JDM 1992-1996)

- [x] **(M)** T-121 [research] Research H22A Redtop JDM origin: when introduced, which models received it, production years, market exclusivity — done 2026-05-15, sha 24cf548 — full spec: docs/plans/03-h-series-variants.md @ T-121
- [x] **(M)** T-122 [research] Research H22A Redtop specifications: 220 PS @ 7200 RPM, 221 Nm @ 6500 RPM, 11.0:1 compression, dome pistons -- done 2026-05-15, sha d24758d -- full spec: docs/plans/03-h-series-variants.md @ T-122
- [x] **(M)** T-123 [research] Research H22A Redtop camshaft profiles: 306° intake duration, 310° exhaust duration, lift values, overlap -- done 2026-05-15, sha c3f29d0 -- full spec: docs/plans/03-h-series-variants.md @ T-123
- [x] **(M)** T-124 [research] Research H22A Redtop intake system: dual runner manifold, 62.5mm throttle body, plenum design, runner length -- done 2026-05-15, sha 57369f2 -- full spec: docs/plans/03-h-series-variants.md @ T-124
- [x] **(M)** T-125 [research] Research H22A Redtop exhaust system: 57mm exhaust diameter, header design, catalytic converter placement — done 2026-05-15, sha 75b8d1f — full spec: docs/plans/03-h-series-variants.md @ T-125
- [x] **(M)** T-126 [research] Research H22A Redtop factory head porting: flow numbers, port shape, valve job angle, surface finish -- done 2026-05-15, sha f44c23e -- full spec: docs/plans/03-h-series-variants.md @ T-126
- [ ] **(M)** T-127 [research] Research H22A Redtop applications: Prelude SiR, Prelude Type S, Accord SiR — model years, chassis codes, features -- full spec: docs/plans/03-h-series-variants.md @ T-127
- [ ] **(M)** T-128 [research] Research H22A Redtop ECU: P28/P06/OBD2a, chip socket location, tuning potential, flash procedures -- full spec: docs/plans/03-h-series-variants.md @ T-128
- [ ] **(M)** T-129 [research] Research H22A Redtop transmission pairing: close-ratio 5-speed, gear ratios, final drive, differential type -- full spec: docs/plans/03-h-series-variants.md @ T-129
- [ ] **(M)** T-130 [research] Research H22A Redtop 4WS integration: which models had it, hydraulic system, steering ratio, turning circle -- full spec: docs/plans/03-h-series-variants.md @ T-130
- [ ] **(S)** T-131 [research] Research H22A Redtop ATTS (Active Torque Transfer System): SH model application, clutch pack, bias ratio -- full spec: docs/plans/03-h-series-variants.md @ T-131
- [ ] **(S)** T-132 [research] Research H22A Redtop suspension: strut design, spring rates, anti-roll bar sizes, damper valving -- full spec: docs/plans/03-h-series-variants.md @ T-132
- [ ] **(S)** T-133 [research] Research H22A Redtop braking: caliper size, rotor diameter, pad compound, ABS tuning -- full spec: docs/plans/03-h-series-variants.md @ T-133
- [ ] **(S)** T-134 [research] Research H22A Redtop wheel and tire specs: rim size, width, offset, tire size, load index -- full spec: docs/plans/03-h-series-variants.md @ T-134
- [ ] **(S)** T-135 [research] Research H22A Redtop weight and balance: curb weight, weight distribution, center of gravity height -- full spec: docs/plans/03-h-series-variants.md @ T-135
- [ ] **(S)** T-136 [research] Research H22A Redtop acceleration and lap times: 0-100 km/h, quarter mile, Nürburgring lap times if available -- full spec: docs/plans/03-h-series-variants.md @ T-136
- [ ] **(S)** T-137 [research] Research H22A Redtop fuel economy: JC08 cycle figures, real-world consumption, highway vs city breakdown -- full spec: docs/plans/03-h-series-variants.md @ T-137
- [ ] **(S)** T-138 [research] Research H22A Redtop emissions ratings: NOx, CO, HC, particulate levels, certification standards -- full spec: docs/plans/03-h-series-variants.md @ T-138
- [ ] **(S)** T-139 [research] Research H22A Redtop sound character: exhaust note, intake roar, VTEC kick description, dB levels -- full spec: docs/plans/03-h-series-variants.md @ T-139
- [ ] **(S)** T-140 [research] Research H22A Redtop collectibility: current used prices, rarity factors, condition premiums, trend analysis -- full spec: docs/plans/03-h-series-variants.md @ T-140
- [ ] **(S)** T-141 [research] Research H22A Redtop common issues: known failure modes, age-related wear, corrosion patterns -- full spec: docs/plans/03-h-series-variants.md @ T-141
- [ ] **(S)** T-142 [research] Research H22A Redtop restoration guides: nut-and-bolt examples, frame-off rebuild costs, parts availability -- full spec: docs/plans/03-h-series-variants.md @ T-142
- [ ] **(S)** T-143 [research] Research H22A Redtop track day viability: reliability on track, cooling capacity, tire wear, brake fade -- full spec: docs/plans/03-h-series-variants.md @ T-143
- [ ] **(S)** T-144 [research] Research H22A Redtop drag racing potential: 60-foot times, trap speed, launch technique, traction limits -- full spec: docs/plans/03-h-series-variants.md @ T-144
- [ ] **(S)** T-145 [research] Research H22A Redtop autocross capability: grip levels, turn-in response, mid-corner stability, driver feedback -- full spec: docs/plans/03-h-series-variants.md @ T-145
- [ ] **(S)** T-146 [research] Research H22A Redtop rally and endurance: Grassroots Motorsports results, oil consumption issues, durability -- full spec: docs/plans/03-h-series-variants.md @ T-146
- [ ] **(S)** T-147 [research] Research H22A Redtop winter driving: weight distribution for snow, traction characteristics, AWD conversion options -- full spec: docs/plans/03-h-series-variants.md @ T-147
- [ ] **(S)** T-148 [research] Research H22A Redtop daily usability: NVH levels, visibility, seat comfort, storage space, climate control -- full spec: docs/plans/03-h-series-variants.md @ T-148
- [ ] **(S)** T-149 [research] Research H22A Redtop insurance costs: classification, premium factors, classic car insurance eligibility -- full spec: docs/plans/03-h-series-variants.md @ T-149
- [ ] **(S)** T-150 [checkpoint] Phase 3 checkpoint: review H22A Redtop research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/03-h-series-variants.md @ T-150

### H22A Blacktop (JDM 1992-2001)

- [ ] **(M)** T-151 [research] Research H22A Blacktop JDM origin: when introduced, which models received it, production years, market exclusivity -- full spec: docs/plans/03-h-series-variants.md @ T-151
- [ ] **(M)** T-152 [research] Research H22A Blacktop specifications: 200 PS @ 7000 RPM, 219 Nm @ 5500 RPM, 10.6:1 compression, flat-top pistons -- full spec: docs/plans/03-h-series-variants.md @ T-152
- [ ] **(M)** T-153 [research] Research H22A Blacktop camshaft profiles: 288° intake duration, 308° exhaust duration, lift values, overlap -- full spec: docs/plans/03-h-series-variants.md @ T-153
- [ ] **(M)** T-154 [research] Research H22A Blacktop intake system: single runner manifold, 60mm throttle body, plenum design, runner length -- full spec: docs/plans/03-h-series-variants.md @ T-154
- [ ] **(M)** T-155 [research] Research H22A Blacktop exhaust system: 51mm exhaust diameter, header design, catalytic converter placement -- full spec: docs/plans/03-h-series-variants.md @ T-155
- [ ] **(M)** T-156 [research] Research H22A Blacktop factory porting status: no factory porting, stock port condition, flow numbers -- full spec: docs/plans/03-h-series-variants.md @ T-156
- [ ] **(M)** T-157 [research] Research H22A Blacktop applications: Prelude SiR, Accord SiR, Torneo — model years, chassis codes, features -- full spec: docs/plans/03-h-series-variants.md @ T-157
- [ ] **(M)** T-158 [research] Research H22A Blacktop ECU: P28/P06/OBD2a, chip socket location, tuning potential, flash procedures -- full spec: docs/plans/03-h-series-variants.md @ T-158
- [ ] **(M)** T-159 [research] Research H22A Blacktop transmission pairing: gear ratios, final drive, differential type, limited-slip availability -- full spec: docs/plans/03-h-series-variants.md @ T-159
- [ ] **(M)** T-160 [research] Research H22A Blacktop closed deck vs open deck: 1992-1996 closed deck, 1997-2001 open deck differences -- full spec: docs/plans/03-h-series-variants.md @ T-160
- [ ] **(S)** T-161 [research] Research H22A Blacktop vs Redtop comparison: power difference, torque curve, character, which is better and why -- full spec: docs/plans/03-h-series-variants.md @ T-161
- [ ] **(S)** T-162 [research] Research H22A Blacktop streetability: low-RPM torque, drivability, fuel economy, daily use characteristics -- full spec: docs/plans/03-h-series-variants.md @ T-162
- [ ] **(S)** T-163 [research] Research H22A Blacktop modification potential: bolt-on gains, cam upgrade path, head work recommendations -- full spec: docs/plans/03-h-series-variants.md @ T-163
- [ ] **(S)** T-164 [research] Research H22A Blacktop reliability record: compared to Redtop, known issues, longevity data -- full spec: docs/plans/03-h-series-variants.md @ T-164
- [ ] **(S)** T-165 [research] Research H22A Blacktop value proposition: used prices, cost of ownership, modification investment returns -- full spec: docs/plans/03-h-series-variants.md @ T-165
- [ ] **(S)** T-166 [checkpoint] Phase 3 checkpoint: review H22A Blacktop research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/03-h-series-variants.md @ T-166

### H22A1 (USDM 1993-1996)

- [ ] **(M)** T-167 [research] Research H22A1 USDM origin: 1993 introduction, first DOHC VTEC in US market, regulatory drivers -- full spec: docs/plans/03-h-series-variants.md @ T-167
- [ ] **(M)** T-168 [research] Research H22A1 specifications: 190 PS @ 6800 RPM, 207 Nm @ 5500 RPM, 10.0:1 compression, OBD1 -- full spec: docs/plans/03-h-series-variants.md @ T-168
- [ ] **(M)** T-169 [research] Research H22A1 ECU: P5M (automatic), P51 (manual), socketed chips, tuning methods, Hondata compatibility -- full spec: docs/plans/03-h-series-variants.md @ T-169
- [ ] **(M)** T-170 [research] Research H22A1 applications: 1993-1996 Prelude VTEC, SR-V (Canada), VTi-R (Australia) -- model years, features -- full spec: docs/plans/03-h-series-variants.md @ T-170
- [ ] **(M)** T-171 [research] Research H22A1 emissions equipment: EGR, PCV, secondary air injection, evaporative system, catalytic converter -- full spec: docs/plans/03-h-series-variants.md @ T-171
- [ ] **(M)** T-172 [research] Research H22A1 OBD1 diagnostics: connector pinout, test mode, live data, trouble code retrieval procedures -- full spec: docs/plans/03-h-series-variants.md @ T-172
- [ ] **(S)** T-173 [research] Research H22A1 USDM detuning: what was changed vs JDM Redtop, power loss mechanisms, emissions compromises -- full spec: docs/plans/03-h-series-variants.md @ T-173
- [ ] **(S)** T-174 [research] Research H22A1 alloy oil sump: OBD1-specific design, capacity, baffle pattern, aftermarket alternatives -- full spec: docs/plans/03-h-series-variants.md @ T-174
- [ ] **(S)** T-175 [research] Research H22A1 closed deck block: structural characteristics, boost potential, compared to later open deck -- full spec: docs/plans/03-h-series-variants.md @ T-175
- [ ] **(S)** T-176 [research] Research H22A1 4WS models: which trim levels had four-wheel steering, system operation, maintenance -- full spec: docs/plans/03-h-series-variants.md @ T-176
- [ ] **(S)** T-177 [research] Research H22A1 automatic vs manual: gear ratios, torque converter, shift quality, performance difference -- full spec: docs/plans/03-h-series-variants.md @ T-177
- [ ] **(S)** T-178 [research] Research H22A1 US market reception: reviews, magazine tests, owner satisfaction, resale values -- full spec: docs/plans/03-h-series-variants.md @ T-178
- [ ] **(S)** T-179 [research] Research H22A1 California vs non-California: emissions differences, power differences, ECU calibration -- full spec: docs/plans/03-h-series-variants.md @ T-179
- [ ] **(S)** T-180 [research] Research H22A1 swap legality: CARB EO numbers, EPA compliance, state-by-state legality analysis -- full spec: docs/plans/03-h-series-variants.md @ T-180
- [ ] **(S)** T-181 [checkpoint] Phase 3 checkpoint: review H22A1 research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/03-h-series-variants.md @ T-181

### H22A2 (EDM 1992-1996)

- [ ] **(M)** T-182 [research] Research H22A2 EDM origin: European market introduction, emissions regulations, model years, chassis codes -- full spec: docs/plans/03-h-series-variants.md @ T-182
- [ ] **(M)** T-183 [research] Research H22A2 specifications: 185 PS @ 6800 RPM, 10.0:1 compression, European emissions standards -- full spec: docs/plans/03-h-series-variants.md @ T-183
- [ ] **(M)** T-184 [research] Research H22A2 European Prelude BB1: model years, trim levels, feature packages, pricing in Europe -- full spec: docs/plans/03-h-series-variants.md @ T-184
- [ ] **(M)** T-185 [research] Research H22A2 vs H22A1 differences: detuning measures, emissions equipment, parts interchangeability -- full spec: docs/plans/03-h-series-variants.md @ T-185
- [ ] **(S)** T-186 [research] Research H22A2 European driving conditions: high-speed Autobahn durability, mountain road cooling, fuel quality -- full spec: docs/plans/03-h-series-variants.md @ T-186
- [ ] **(S)** T-187 [research] Research H22A2 European spare parts: availability, dealer networks, independent supplier ecosystem -- full spec: docs/plans/03-h-series-variants.md @ T-187
- [ ] **(S)** T-188 [checkpoint] Phase 3 checkpoint: review H22A2 research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/03-h-series-variants.md @ T-188

### H22A3 (JDM Rare 1996)

- [ ] **(M)** T-189 [research] Research H22A3 rare variant: 1996 production, KU code applications, scarcity factors, identification -- full spec: docs/plans/03-h-series-variants.md @ T-189
- [ ] **(M)** T-190 [research] Research H22A3 specifications: 190 PS, differences from H22A1 and H22A4, production numbers -- full spec: docs/plans/03-h-series-variants.md @ T-190
- [ ] **(S)** T-191 [research] Research H22A3 collector status: rarity, demand, pricing trends, identification markers -- full spec: docs/plans/03-h-series-variants.md @ T-191
- [ ] **(S)** T-192 [checkpoint] Phase 3 checkpoint: review H22A3 research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/03-h-series-variants.md @ T-192

### H22A4 (USDM/5th Gen 1997-2001)

- [ ] **(M)** T-193 [research] Research H22A4 USDM 5th gen origin: 1997 BB6 chassis introduction, open deck transition, market positioning -- full spec: docs/plans/03-h-series-variants.md @ T-193
- [ ] **(M)** T-194 [research] Research H22A4 specifications: 200 PS @ 7000 RPM, 212 Nm @ 5250 RPM, 10.0:1 compression, OBD2 -- full spec: docs/plans/03-h-series-variants.md @ T-194
- [ ] **(M)** T-195 [research] Research H22A4 ECU: P13 OBD2, immobilizer integration, tuning methods, Hondata FlashPro compatibility -- full spec: docs/plans/03-h-series-variants.md @ T-195
- [ ] **(M)** T-196 [research] Research H22A4 applications: 1997-2001 Prelude Base, Type-SH, SE — chassis codes, features, model years -- full spec: docs/plans/03-h-series-variants.md @ T-196
- [ ] **(M)** T-197 [research] Research H22A4 open deck block: 1997-2001 design, 55mm main journals (1998+), structural implications -- full spec: docs/plans/03-h-series-variants.md @ T-197
- [ ] **(M)** T-198 [research] Research H22A4 ATTS (Active Torque Transfer System): SH model exclusive, torque vectoring operation, maintenance -- full spec: docs/plans/03-h-series-variants.md @ T-198
- [ ] **(M)** T-199 [research] Research H22A4 single runner intake: vs dual runner, plenum volume, power band characteristics -- full spec: docs/plans/03-h-series-variants.md @ T-199
- [ ] **(M)** T-200 [research] Research H22A4 OBD2 diagnostics: OBDII connector, scan tool requirements, live data streams, readiness monitors -- full spec: docs/plans/03-h-series-variants.md @ T-200
- [ ] **(S)** T-201 [research] Research H22A4 Type-SH vs SE vs Base: trim differences, feature packages, pricing, desirability -- full spec: docs/plans/03-h-series-variants.md @ T-201
- [ ] **(S)** T-202 [research] Research H22A4 5th gen Prelude redesign: styling changes, interior updates, chassis stiffening, weight changes -- full spec: docs/plans/03-h-series-variants.md @ T-202
- [ ] **(S)** T-203 [research] Research H22A4 main journal increase: 1997 50mm to 1998+ 55mm reason, bearing part number changes, block casting -- full spec: docs/plans/03-h-series-variants.md @ T-203
- [ ] **(S)** T-204 [research] Research H22A4 US market reception: reviews, magazine tests, owner satisfaction, depreciation curves -- full spec: docs/plans/03-h-series-variants.md @ T-204
- [ ] **(S)** T-205 [checkpoint] Phase 3 checkpoint: review H22A4 research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/03-h-series-variants.md @ T-205

### H22A5-H22A8, H22Z1, H23A (European, Australian, JDM variants)

- [ ] **(M)** T-206 [research] Research H22A5 EDM: 1997-1998 European Prelude BB6 2.2VTi/VTi-S, 200 PS, features, market positioning -- full spec: docs/plans/03-h-series-variants.md @ T-206
- [ ] **(M)** T-207 [research] Research H22A7 EDM Accord Type R CH1: 1998-2002, 212 PS redtop, single runner intake, European exclusivity -- full spec: docs/plans/03-h-series-variants.md @ T-207
- [ ] **(M)** T-208 [research] Research H22A8 EDM: 1999-2001 European Prelude, red valve cover anomaly, late-production characteristics -- full spec: docs/plans/03-h-series-variants.md @ T-208
- [ ] **(M)** T-209 [research] Research H22Z1 Australian VTi-R: 1999-2001, disputed 200-203 PS output, right-hand drive, ATTS compatibility -- full spec: docs/plans/03-h-series-variants.md @ T-209
- [ ] **(M)** T-210 [research] Research H23A JDM rare blue top: 1998-2002 Accord Wagon SiR CH9, 200 PS, 2259cc, longer stroke, SOHC vs DOHC variants -- full spec: docs/plans/03-h-series-variants.md @ T-210
- [ ] **(S)** T-211 [research] Research H23A internal oil passage for VTEC solenoid: unique to H23A, pressure requirements, failure modes -- full spec: docs/plans/03-h-series-variants.md @ T-211
- [ ] **(S)** T-212 [research] Research H23A oil squirters: provisions exist but not installed, block drilling requirements, aftermarket kits -- full spec: docs/plans/03-h-series-variants.md @ T-212
- [ ] **(S)** T-213 [research] Research H23A lower redline: 7200 RPM vs H22's 7200-8200 RPM, longer stroke impact, piston speed calculations -- full spec: docs/plans/03-h-series-variants.md @ T-213
- [ ] **(S)** T-214 [checkpoint] Phase 3 checkpoint: review remaining H-series variants research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/03-h-series-variants.md @ T-214

---

## Backlog — Phase 4: H-Series Mechanical Design & Internals

### Cylinder Block & Bottom End

- [ ] **(M)** T-215 [research] Research H-series block casting process: aluminum alloy grade, mold design, cooling channels, porosity control -- full spec: docs/plans/04-h-series-mechanical.md @ T-215
- [ ] **(M)** T-216 [research] Research H-series FRM liner technology: fiber-reinforced metal composition, application process, wear characteristics -- full spec: docs/plans/04-h-series-mechanical.md @ T-216
- [ ] **(M)** T-217 [research] Research H-series FRM sleeve replacement: RS Machine sleeves, machining requirements, cost, labor time -- full spec: docs/plans/04-h-series-mechanical.md @ T-217
- [ ] **(M)** T-218 [research] Research H-series crankshaft: forged steel, stroke 90.7mm, main journals 50mm/55mm, rod journals 47.95mm, counterweights -- full spec: docs/plans/04-h-series-mechanical.md @ T-218
- [ ] **(M)** T-219 [research] Research H-series connecting rods: forged steel, 143mm length, 23.75mm width, ARP-style bolts, big end design -- full spec: docs/plans/04-h-series-mechanical.md @ T-219
- [ ] **(M)** T-220 [research] Research H-series pistons: forged aluminum, dome/flat-top variants, compression height 31mm, ring land design -- full spec: docs/plans/04-h-series-mechanical.md @ T-220
- [ ] **(M)** T-221 [research] Research H-series wrist pins: 22mm diameter, bore tolerance 21.97-21.98mm, press fit vs floating -- full spec: docs/plans/04-h-series-mechanical.md @ T-221
- [ ] **(M)** T-222 [research] Research H-series piston rings: chromed moly top ring, cast iron second ring, three-piece oil ring, gap specs -- full spec: docs/plans/04-h-series-mechanical.md @ T-222
- [ ] **(M)** T-223 [research] Research H-series main bearings: 19.9mm width, material composition, clearance specifications, failure modes -- full spec: docs/plans/04-h-series-mechanical.md @ T-223
- [ ] **(M)** T-224 [research] Research H-series rod bearings: 19.35mm width, material composition, clearance specifications, failure modes -- full spec: docs/plans/04-h-series-mechanical.md @ T-224
- [ ] **(S)** T-225 [research] Research H-series thrust washers: bearing selection, clearance specs, axial play limits, wear patterns -- full spec: docs/plans/04-h-series-mechanical.md @ T-225
- [ ] **(S)** T-226 [research] Research H-series balancer shafts: integration method, drive mechanism, vibration reduction effectiveness -- full spec: docs/plans/04-h-series-mechanical.md @ T-226
- [ ] **(S)** T-227 [research] Research H-series oil pan: aluminum construction, OBD1 alloy sump vs OBD2 standard, baffle design, capacity -- full spec: docs/plans/04-h-series-mechanical.md @ T-227
- [ ] **(S)** T-228 [research] Research H-series rear main seal: type, replacement procedure, common failure causes, leak diagnosis -- full spec: docs/plans/04-h-series-mechanical.md @ T-228
- [ ] **(S)** T-229 [research] Research H-series front main seal: type, crank snout design, sealant vs gasket, replacement procedure -- full spec: docs/plans/04-h-series-mechanical.md @ T-229
- [ ] **(S)** T-230 [checkpoint] Phase 4 checkpoint: review H-series mechanical internals research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/04-h-series-mechanical.md @ T-230

### Cylinder Head & Valvetrain

- [ ] **(M)** T-231 [research] Research H-series cylinder head: DOHC 16-valve aluminum construction, pent-roof combustion chambers, casting numbers -- full spec: docs/plans/04-h-series-mechanical.md @ T-231
- [ ] **(M)** T-232 [research] Research H-series intake valves: 35mm diameter, material, stem diameter, retainer design, spring seats -- full spec: docs/plans/04-h-series-mechanical.md @ T-232
- [ ] **(M)** T-233 [research] Research H-series exhaust valves: 30mm diameter, sodium-filled vs solid, material, stem diameter, retainer design -- full spec: docs/plans/04-h-series-mechanical.md @ T-233
- [ ] **(M)** T-234 [research] Research H-series valve guides: material, press fit depth, oil drain-back design, wear limits, replacement procedure -- full spec: docs/plans/04-h-series-mechanical.md @ T-234
- [ ] **(M)** T-235 [research] Research H-series valve seals: type, installation method, oil consumption impact, common failure symptoms -- full spec: docs/plans/04-h-series-mechanical.md @ T-235
- [ ] **(M)** T-236 [research] Research H-series dual valve springs: upper and lower spring specs, surge frequency, coil bind pressure -- full spec: docs/plans/04-h-series-mechanical.md @ T-236
- [ ] **(M)** T-237 [research] Research H-series titanium retainers: aftermarket availability, weight savings, strength comparison to steel -- full spec: docs/plans/04-h-series-mechanical.md @ T-237
- [ ] **(M)** T-238 [research] Research H-series keepers/locks: type, retention force, failure modes, replacement procedure -- full spec: docs/plans/04-h-series-mechanical.md @ T-238
- [ ] **(M)** T-239 [research] Research H-series camshafts: intake and exhaust profiles for each variant, lobe separation, bearing journals -- full spec: docs/plans/04-h-series-mechanical.md @ T-239
- [ ] **(M)** T-240 [research] Research H-series camshaft bearings: bore size, clearance specs, material, oil feed design, wear patterns -- full spec: docs/plans/04-h-series-mechanical.md @ T-240
- [ ] **(S)** T-241 [research] Research H-series timing belt tensioner: hydraulic auto-tensioner (1992-1996), improved version (1997+), H23 manual upgrade -- full spec: docs/plans/04-h-series-mechanical.md @ T-241
- [ ] **(S)** T-242 [research] Research H-series idler pulleys: location, bearing type, failure symptoms, replacement interval -- full spec: docs/plans/04-h-series-mechanical.md @ T-242
- [ ] **(S)** T-243 [research] Research H-series valve adjustment procedure: cold/hot specs, 0.008" intake/0.010" exhaust cold, shim selection -- full spec: docs/plans/04-h-series-mechanical.md @ T-243
- [ ] **(S)** T-244 [research] Research H-series head gasket: MLS vs composite, thickness options, torque sequence, crush height -- full spec: docs/plans/04-h-series-mechanical.md @ T-244
- [ ] **(S)** T-245 [checkpoint] Phase 4 checkpoint: review H-series head and valvetrain research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/04-h-series-mechanical.md @ T-245

### Lubrication & Cooling Systems

- [ ] **(M)** T-246 [research] Research H-series oil pump: gear-type rotor design, location, drive method, flow rate specs, pressure relief valve -- full spec: docs/plans/04-h-series-mechanical.md @ T-246
- [ ] **(M)** T-247 [research] Research H-series oil pressure specifications: 30+ psi idle hot, 45-60 psi at 3000 RPM, warning light threshold -- full spec: docs/plans/04-h-series-mechanical.md @ T-247
- [ ] **(M)** T-248 [research] Research H-series oil cooler: stock vs aftermarket, flow rate, core size, mounting location, temperature range -- full spec: docs/plans/04-h-series-mechanical.md @ T-248
- [ ] **(M)** T-249 [research] Research H-series oil filter: Honda 15400-PLM-A02 equivalent, bypass valve pressure, anti-drain back valve -- full spec: docs/plans/04-h-series-mechanical.md @ T-249
- [ ] **(M)** T-250 [research] Research H-series water pump: centrifugal type, belt-driven, impeller material, flow rate, bearing life -- full spec: docs/plans/04-h-series-mechanical.md @ T-250
- [ ] **(M)** T-251 [research] Research H-series thermostat: 82°C opening, 95°C full open, housing design, gasket vs o-ring seal -- full spec: docs/plans/04-h-series-mechanical.md @ T-251
- [ ] **(M)** T-252 [research] Research H-series radiator: aluminum 2-row, capacity, core thickness, fin density, tank construction -- full spec: docs/plans/04-h-series-mechanical.md @ T-252
- [ ] **(S)** T-253 [research] Research H-series cooling fan: electric vs mechanical, activation temperature, clutch type, airflow CFM -- full spec: docs/plans/04-h-series-mechanical.md @ T-253
- [ ] **(S)** T-254 [research] Research H-series heater core: capacity, hose connections, flow rate, defrost performance, common leaks -- full spec: docs/plans/04-h-series-mechanical.md @ T-254
- [ ] **(S)** T-255 [checkpoint] Phase 4 checkpoint: review H-series lubrication and cooling research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/04-h-series-mechanical.md @ T-255

---

## Backlog — Phase 5: H-Series VTEC, Engine Management, Tuning & Reliability

### VTEC System Operation

- [ ] **(M)** T-256 [research] Research H-series VTEC solenoid assembly: electro-hydraulic design, wiring connectors, oil pressure switch integration -- full spec: docs/plans/05-h-series-systems.md @ T-256
- [ ] **(M)** T-257 [research] Research H-series VTEC oil pressure switch: activation pressure 10-15 psi, location inside solenoid, signal to ECU -- full spec: docs/plans/05-h-series-systems.md @ T-257
- [ ] **(M)** T-258 [research] Research H-series VTEC engagement parameters: ~5500 RPM threshold, 30+ psi oil pressure, >5 km/h speed, >40°C temp, >20% throttle -- full spec: docs/plans/05-h-series-systems.md @ T-258
- [ ] **(M)** T-259 [research] Research H-series VTEC operation sequence: low-lift cam profile, solenoid activation, piston engagement, high-lift takeover -- full spec: docs/plans/05-h-series-systems.md @ T-259
- [ ] **(M)** T-260 [research] Research H-series VTEC oil passages: main galley feed, internal head galleries, requirement for minimum oil pressure -- full spec: docs/plans/05-h-series-systems.md @ T-260
- [ ] **(M)** T-261 [research] Research H-series VTEC troubleshooting: solenoid resistance 14-30 ohms, screen cleaning, wiring checks, P1259 code -- full spec: docs/plans/05-h-series-systems.md @ T-261
- [ ] **(M)** T-262 [research] Research H-series VTEC modifications: aftermarket solenoids, oil pressure upgrades, crossover tuning, lift kit cams -- full spec: docs/plans/05-h-series-systems.md @ T-262
- [ ] **(S)** T-263 [research] Research H-series VTEC feel and sound: "kick" description, RPM ramp, exhaust note change, driver perception studies -- full spec: docs/plans/05-h-series-systems.md @ T-263
- [ ] **(S)** T-264 [checkpoint] Phase 5 checkpoint: review H-series VTEC research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/05-h-series-systems.md @ T-264

### Engine Management & ECU

- [ ] **(M)** T-265 [research] Research H-series OBD1 ECUs: P5M (auto), P51 (manual), 32-pin connector, socketed chips, basic fuel/ignition maps -- full spec: docs/plans/05-h-series-systems.md @ T-265
- [ ] **(M)** T-266 [research] Research H-series OBD2 ECUs: P13 (USDM), P28 (JDM OBD2a), P72 (JDM OBD2b), 32-pin + 2-pin connectors -- full spec: docs/plans/05-h-series-systems.md @ T-266
- [ ] **(M)** T-267 [research] Research H-series ECU pinouts: complete pinout tables for P5M/P51 and P13, wire colors, function descriptions -- full spec: docs/plans/05-h-series-systems.md @ T-267
- [ ] **(M)** T-268 [research] Research H-series aftermarket ECUs: Hondata S300, FlashPro, Neptune RTP, Megasquirt, Link ECU, AEM EMS — compatibility -- full spec: docs/plans/05-h-series-systems.md @ T-268
- [ ] **(M)** T-269 [research] Research H-series Hondata S300: required ECU (P28/P06), OBD1 to OBD2 harness needs, fuel/ignition control, VTEC crossover -- full spec: docs/plans/05-h-series-systems.md @ T-269
- [ ] **(M)** T-270 [research] Research H-series boost control solenoid wiring: US ECU Pin A11 vs JDM ECU Pin A17, power/ground schemes -- full spec: docs/plans/05-h-series-systems.md @ T-270
- [ ] **(S)** T-271 [research] Research H-series sensor specifications: MAP, TPS, IAT, ECT, O2, CKP, VTEC pressure switch — ranges and signals -- full spec: docs/plans/05-h-series-systems.md @ T-271
- [ ] **(S)** T-272 [checkpoint] Phase 5 checkpoint: review H-series engine management research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/05-h-series-systems.md @ T-272

### Tuning & Performance Modifications

- [ ] **(M)** T-273 [research] Research H-series Stage 1 NA mods: cold air intake, velocity stacks, performance header, 2.25"/2.5" exhaust, ECU tune -- full spec: docs/plans/05-h-series-systems.md @ T-273
- [ ] **(M)** T-274 [research] Research H-series Stage 1 expected gains: 15-20 HP, ~10% improvement, real-world dyno results, reliability impact -- full spec: docs/plans/05-h-series-systems.md @ T-274
- [ ] **(M)** T-275 [research] Research H-series Stage 2 NA mods: camshafts (Brian Crower, JUN, Skunk2), intake manifold, head work, fuel system -- full spec: docs/plans/05-h-series-systems.md @ T-275
- [ ] **(M)** T-276 [research] Research H-series Stage 2 head work: port and polish, larger valves (37mm intake, 32mm exhaust), multi-angle valve jobs -- full spec: docs/plans/05-h-series-systems.md @ T-276
- [ ] **(M)** T-277 [research] Research H-series Stage 2 expected gains: 40-60 HP total, 220-240 HP achievable, cost estimates, reliability -- full spec: docs/plans/05-h-series-systems.md @ T-277
- [ ] **(M)** T-278 [research] Research H-series Stage 3 competition mods: forged pistons, forged rods, balancing, high-compression, full porting -- full spec: docs/plans/05-h-series-systems.md @ T-278
- [ ] **(M)** T-279 [research] Research H-series turbocharging: stock bottom end limit 250-280 HP @ 6-8 psi, built bottom 350-450+ HP @ 12-18 psi -- full spec: docs/plans/05-h-series-systems.md @ T-279
- [ ] **(M)** T-280 [research] Research H-series supercharging: Jackson Racing, Superchips, Vortech, Paxton — kits, pulleys, power levels -- full spec: docs/plans/05-h-series-systems.md @ T-280
- [ ] **(M)** T-281 [research] Research H-series real-world turbo builds: Maxpeedingrods 286 whp case, JE pistons 360 HP case, GT30 450-500 HP case -- full spec: docs/plans/05-h-series-systems.md @ T-281
- [ ] **(S)** T-282 [research] Research H-series ITB (Individual Throttle Body) conversions: adapter plates, manifold design, ECU integration -- full spec: docs/plans/05-h-series-systems.md @ T-282
- [ ] **(S)** T-283 [checkpoint] Phase 5 checkpoint: review H-series tuning research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/05-h-series-systems.md @ T-283

### Reliability & Common Failures

- [ ] **(M)** T-284 [research] Research H-series timing belt tensioner failure: hydraulic auto tensioner (1992-1996) failure rate, consequences, prevention -- full spec: docs/plans/05-h-series-systems.md @ T-284
- [ ] **(M)** T-285 [research] Research H-series FRM liner degradation: oil consumption causes, compression loss, sleeving solutions, prevention -- full spec: docs/plans/05-h-series-systems.md @ T-285
- [ ] **(M)** T-286 [research] Research H-series VTEC solenoid failures: gasket leaks, solenoid failure rates, screen clogging, maintenance schedule -- full spec: docs/plans/05-h-series-systems.md @ T-286
- [ ] **(M)** T-287 [research] Research H-series head gasket failures: boost-induced failures, overheating causes, MLS gasket recommendations -- full spec: docs/plans/05-h-series-systems.md @ T-287
- [ ] **(M)** T-288 [research] Research H-series oil consumption: piston ring wear, valve guide wear, PCV system issues, diagnosis procedures -- full spec: docs/plans/05-h-series-systems.md @ T-288
- [ ] **(M)** T-289 [research] Research H-series distributor O-ring leaks: symptoms, diagnosis, replacement procedure, affected model years -- full spec: docs/plans/05-h-series-systems.md @ T-289
- [ ] **(M)** T-290 [research] Research H-series water pump failures: bearing failure rates, seal leak patterns, Aisin/GMB replacement quality -- full spec: docs/plans/05-h-series-systems.md @ T-290
- [ ] **(S)** T-291 [research] Research H-series longevity data: 200,000+ km stock lifespan, maintenance intervals, fleet data, insurance claims -- full spec: docs/plans/05-h-series-systems.md @ T-291
- [ ] **(S)** T-292 [checkpoint] Phase 5 checkpoint: review H-series reliability research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/05-h-series-systems.md @ T-292

---

## Backlog — Phase 6: H-Series Swaps, Motorsport, Aftermarket & Maintenance

### Engine Swaps & Applications

- [ ] **(M)** T-293 [research] Research H-series swap into CR-X EF: difficulty moderate-difficult, hood clearance, custom mounts, driveshaft mod -- full spec: docs/plans/06-h-series-swaps.md @ T-293
- [ ] **(M)** T-294 [research] Research H-series mid-engine CR-X conversion: rear-engine swap complexity, weight distribution, handling effects -- full spec: docs/plans/06-h-series-swaps.md @ T-294
- [ ] **(M)** T-295 [research] Research H-series swap into Civic EG/EK: difficulty moderate, hood clearance, custom mounts, power steering hoses -- full spec: docs/plans/06-h-series-swaps.md @ T-295
- [ ] **(M)** T-296 [research] Research H-series swap into Integra DA/DC: difficulty moderate, DA more forgiving than DC, hood clearance on DC2 -- full spec: docs/plans/06-h-series-swaps.md @ T-296
- [ ] **(M)** T-297 [research] Research H-series swap into Miata NA/NB: difficulty moderate, weight distribution, custom mounts, crossmember -- full spec: docs/plans/06-h-series-swaps.md @ T-297
- [ ] **(M)** T-298 [research] Research H-series swap into S13/S14 Silvia: difficulty moderate-difficult, bay clearance, RWD conversion -- full spec: docs/plans/06-h-series-swaps.md @ T-298
- [ ] **(M)** T-299 [research] Research H2B swap (H-series + B-series transmission): PLM kits $300-500, Burton Racing, 1320 Performance — components -- full spec: docs/plans/06-h-series-swaps.md @ T-299
- [ ] **(M)** T-300 [research] Research H2B transmission compatibility: Y8, P7, P8, Z6, B16/B18 ratios, suitability for street vs drag -- full spec: docs/plans/06-h-series-swaps.md @ T-300
- [ ] **(S)** T-301 [checkpoint] Phase 6 checkpoint: review H-series swap research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/06-h-series-swaps.md @ T-301

### Motorsport & Racing History

- [ ] **(M)** T-302 [research] Research H-series Formula 3 development: 1994 Honda Europe commission, Neil Brown Engineering, destroked to 2.0L -- full spec: docs/plans/06-h-series-swaps.md @ T-302
- [ ] **(M)** T-303 [research] Research Mugen F20B (MF204B): 1997-2001, ~230 HP @ 8500 RPM, European F3 championship, F20C foundation -- full spec: docs/plans/06-h-series-swaps.md @ T-303
- [ ] **(M)** T-304 [research] Research JTCC championships: 1996-1997 Honda Accord, H22A-based F3 engine, championship wins both years -- full spec: docs/plans/06-h-series-swaps.md @ T-304
- [ ] **(M)** T-305 [research] Research BTCC participation: 1995-1997 Neil Brown Engineering Honda Accord, competitive performance, podiums -- full spec: docs/plans/06-h-series-swaps.md @ T-305
- [ ] **(M)** T-306 [research] Research H-series in SCCA/CAMR Spec Racer Ford: NA builds to 250-280 HP, endurance racing reliability -- full spec: docs/plans/06-h-series-swaps.md @ T-306
- [ ] **(M)** T-307 [research] Research H-series in ChampCar Endurance: 12+ hour runs, oil consumption issues, budget class popularity -- full spec: docs/plans/06-h-series-swaps.md @ T-307
- [ ] **(S)** T-308 [research] Research H-series drag racing: N/A 9-second quarters, boosted 7-second times, Steph Papadakis, Jeremy Lookofsky builds -- full spec: docs/plans/06-h-series-swaps.md @ T-308
- [ ] **(S)** T-309 [checkpoint] Phase 6 checkpoint: review H-series motorsport research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/06-h-series-swaps.md @ T-309

### Aftermarket Support

- [ ] **(M)** T-310 [research] Research H-series camshaft aftermarket: Brian Crower (Stage 1/2/3), JUN Racing, Skunk2, Toda Racing, Crow Cams -- full spec: docs/plans/06-h-series-swaps.md @ T-310
- [ ] **(M)** T-311 [research] Research H-series pistons and rods aftermarket: Wiseco forged ($600-800), JE Pistons, KS Tuned rods ($450), Manley, Arias -- full spec: docs/plans/06-h-series-swaps.md @ T-311
- [ ] **(M)** T-312 [research] Research H-series intake and exhaust aftermarket: Skunk2 manifolds/headers, DC Sport, GReddy, HKS, RC Engineering ITBs -- full spec: docs/plans/06-h-series-swaps.md @ T-312
- [ ] **(M)** T-313 [research] Research H-series forced induction aftermarket: Garrett (GT28/GT30), Turbobanks, Jackson Racing, Vortech, Maxpeedingrods -- full spec: docs/plans/06-h-series-swaps.md @ T-313
- [ ] **(M)** T-314 [research] Research H-series ECU aftermarket: Hondata S300/FlashPro, Neptune RTP, Megasquirt, Link ECU, AEM EMS — pros/cons -- full spec: docs/plans/06-h-series-swaps.md @ T-314
- [ ] **(M)** T-315 [research] Research H-series internal components aftermarket: ARP studs/bolts, Cometic MLS gaskets, King bearings, Ferrea valves, Parker springs -- full spec: docs/plans/06-h-series-swaps.md @ T-315
- [ ] **(M)** T-316 [research] Research H-series cooling and lubrication aftermarket: Aisin/GMB pumps, Mishimoto radiators/oil coolers, Samco hoses, KS Tuned tensioners -- full spec: docs/plans/06-h-series-swaps.md @ T-316
- [ ] **(S)** T-317 [checkpoint] Phase 6 checkpoint: review H-series aftermarket research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/06-h-series-swaps.md @ T-317

### Competitor Comparisons & Maintenance

- [ ] **(M)** T-318 [research] Research H22A vs B18C comparison: displacement, power, torque, redline, weight, size, swap difficulty, aftermarket, cost -- full spec: docs/plans/06-h-series-swaps.md @ T-318
- [ ] **(M)** T-319 [research] Research H22A vs K20A comparison: displacement, power, torque, VTEC type, weight, swap compatibility, cost, modern relevance -- full spec: docs/plans/06-h-series-swaps.md @ T-319
- [ ] **(M)** T-320 [research] Research H22A vs F20C comparison: displacement, power, torque, redline, power density, VTEC, availability, cost -- full spec: docs/plans/06-h-series-swaps.md @ T-320
- [ ] **(M)** T-321 [research] Research H22A vs H23A comparison: displacement, bore/stroke, power, torque, redline, VTEC, weight, tuning, cost -- full spec: docs/plans/06-h-series-swaps.md @ T-321
- [ ] **(S)** T-322 [research] Research H22A vs Toyota 3S-GE: displacement, power, torque, VTEC vs VVT-i, weight, swap culture, aftermarket support -- full spec: docs/plans/06-h-series-swaps.md @ T-322
- [ ] **(S)** T-323 [research] Research H22A vs Mazda 13B-MSP rotary: power delivery, torque characteristics, reliability, maintenance, swap complexity -- full spec: docs/plans/06-h-series-swaps.md @ T-323
- [ ] **(S)** T-324 [checkpoint] Phase 6 checkpoint: review H-series comparisons and maintenance research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/06-h-series-swaps.md @ T-324

---

## Backlog — Phase 7: F-Series Development History & Timeline

### Origins & Architecture

- [ ] **(M)** T-325 [research] Research Honda F-series engine family origins: when/why developed, relationship to E-series and H-series, design goals -- full spec: docs/plans/07-f-series-development.md @ T-325
- [ ] **(M)** T-326 [research] Research F-series development timeline: late 1980s development, engineering decisions, prototype testing -- full spec: docs/plans/07-f-series-development.md @ T-326
- [ ] **(M)** T-327 [research] Research F-series position in Honda's engine strategy: where it fit between B-series, D-series, and H-series -- full spec: docs/plans/07-f-series-development.md @ T-327
- [ ] **(M)** T-328 [research] Research Honda's SOHC vs DOHC VTEC strategy in the 1990s: F-series SOHC VTEC vs B-series DOHC VTEC -- full spec: docs/plans/07-f-series-development.md @ T-328
- [ ] **(M)** T-329 [research] Research F-series aluminum block design: casting process, materials, cooling jacket layout, rigidity -- full spec: docs/plans/07-f-series-development.md @ T-329
- [ ] **(S)** T-330 [research] Research F-series vs E-series evolution: what changed, what stayed the same, displacement increases -- full spec: docs/plans/07-f-series-development.md @ T-330
- [ ] **(S)** T-331 [research] Research F-series production timeline: start date, production volumes, end of production, replacement by K-series -- full spec: docs/plans/07-f-series-development.md @ T-331
- [ ] **(S)** T-332 [checkpoint] Phase 7 checkpoint: review F-series development research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/07-f-series-development.md @ T-332

### Technical Specifications Deep-Dive

- [ ] **(M)** T-333 [research] Research F-series block dimensions: deck height, bore spacing, cylinder center-to-center distances -- full spec: docs/plans/07-f-series-development.md @ T-333
- [ ] **(M)** T-334 [research] Research F-series bore and stroke: F20 81mm x 87.3mm, F22 81mm x 102.5mm, rod ratios, piston velocities -- full spec: docs/plans/07-f-series-development.md @ T-334
- [ ] **(M)** T-335 [research] Research F-series displacement calculations: F20B 1997cc, F20C 1997cc, F22R 2158cc, tolerance bands -- full spec: docs/plans/07-f-series-development.md @ T-335
- [ ] **(M)** T-336 [research] Research F-series compression ratios: 10.0:1, 10.5:1, 11.0:1, 11.3:1 variants, piston crown shapes -- full spec: docs/plans/07-f-series-development.md @ T-336
- [ ] **(M)** T-337 [research] Research F-series combustion chamber design: pent-roof shape, valve angles, swirl ratio, tumble generation -- full spec: docs/plans/07-f-series-development.md @ T-337
- [ ] **(M)** T-338 [research] Research F-series intake port design: runner length, cross-section, flow coefficients, velocity profiles -- full spec: docs/plans/07-f-series-development.md @ T-338
- [ ] **(M)** T-339 [research] Research F-series exhaust port design: runner length, cross-section, flow coefficients, heat management -- full spec: docs/plans/07-f-series-development.md @ T-339
- [ ] **(S)** T-340 [research] Research F-series crankshaft: forged steel, journal diameters, counterweight design, balance -- full spec: docs/plans/07-f-series-development.md @ T-340
- [ ] **(S)** T-341 [research] Research F-series connecting rods: forged steel, length, width, bolt type, failure modes -- full spec: docs/plans/07-f-series-development.md @ T-341
- [ ] **(S)** T-342 [checkpoint] Phase 7 checkpoint: review F-series specifications research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/07-f-series-development.md @ T-342

---

## Backlog — Phase 8: F-Series Engine Variants Detailed Research

### F20B (Integra GS-R / Legend)

- [ ] **(M)** T-343 [research] Research F20B origin: when introduced, which models received it, production years, market exclusivity -- full spec: docs/plans/08-f-series-variants.md @ T-343
- [ ] **(M)** T-344 [research] Research F20B specifications: 170 PS (GS-R) / 160 PS (Legend), compression ratios, ECU differences -- full spec: docs/plans/08-f-series-variants.md @ T-344
- [ ] **(M)** T-345 [research] Research F20B Integra GS-R DA: 1993-2001, VTEC non-DOHC, close-ratio 5-speed, limited-slip differential -- full spec: docs/plans/08-f-series-variants.md @ T-345
- [ ] **(M)** T-346 [research] Research F20B Honda Legend: 1991-1995, SOHC VTEC, luxury application, automatic transmission variants -- full spec: docs/plans/08-f-series-variants.md @ T-346
- [ ] **(M)** T-347 [research] Research F20B SOHC VTEC operation: single cam VTEC, engagement parameters, lift profile, power band -- full spec: docs/plans/08-f-series-variants.md @ T-347
- [ ] **(M)** T-348 [research] Research F20B ECU: P27/P28 variants, tuning potential, Hondata compatibility, chip swapping -- full spec: docs/plans/08-f-series-variants.md @ T-348
- [ ] **(S)** T-349 [research] Research F20B GS-R vs Legend differences: power output, compression, cam profiles, ECU calibration -- full spec: docs/plans/08-f-series-variants.md @ T-349
- [ ] **(S)** T-350 [checkpoint] Phase 8 checkpoint: review F20B research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/08-f-series-variants.md @ T-350

### F20C (S2000)

- [ ] **(M)** T-351 [research] Research F20C origin: 1999 S2000 launch, world's highest specific output NA engine at 124 HP/liter, design philosophy -- full spec: docs/plans/08-f-series-variants.md @ T-351
- [ ] **(M)** T-352 [research] Research F20C specifications: 240 PS (AP1) / 250 PS (AP2) @ 7800-8000 RPM, 218 Nm @ 7500 RPM, 11.3:1 compression -- full spec: docs/plans/08-f-series-variants.md @ T-352
- [ ] **(M)** T-353 [research] Research F20C AP1 (1999-2005): 240 PS, 8000 RPM redline, VTEC at 7500 RPM, aluminum block, magnesium valve covers -- full spec: docs/plans/08-f-series-variants.md @ T-353
- [ ] **(M)** T-354 [research] Research F20C AP2 (2004-2009): 250 PS, 8300 RPM redline, revised head, new pistons, stronger rods, VTEC at 7900 RPM -- full spec: docs/plans/08-f-series-variants.md @ T-354
- [ ] **(M)** T-355 [research] Research F20C camshaft profiles: intake and exhaust duration, lift values, overlap, VTEC vs non-VTEC lobes -- full spec: docs/plans/08-f-series-variants.md @ T-355
- [ ] **(M)** T-356 [research] Research F20C intake system: variable length intake (AP1), throttle body size, plenum design, runner length optimization -- full spec: docs/plans/08-f-series-variants.md @ T-356
- [ ] **(M)** T-357 [research] Research F20C exhaust system: header design, catalytic converter placement, 2-1 vs 4-2-1, backpressure calculations -- full spec: docs/plans/08-f-series-variants.md @ T-357
- [ ] **(M)** T-358 [research] Research F20C piston design: forged aluminum, dish shape for 11.3:1, wrist pin location, ring pack, cooling jets -- full spec: docs/plans/08-f-series-variants.md @ T-358
- [ ] **(M)** T-359 [research] Research F20C connecting rods: forged steel, H-beam vs I-beam, ARP bolts, failure modes, redline stress analysis -- full spec: docs/plans/08-f-series-variants.md @ T-359
- [ ] **(M)** T-360 [research] Research F20C crankshaft: forged steel, journal diameters, counterweight design, balance shaft integration -- full spec: docs/plans/08-f-series-variants.md @ T-360
- [ ] **(S)** T-361 [research] Research F20C valvetrain: dual springs, titanium retainers, keepers, cam bearings, hydraulic lash adjusters -- full spec: docs/plans/08-f-series-variants.md @ T-361
- [ ] **(S)** T-362 [research] Research F20C ECU: P28/P72 variants, VTEC crossover tuning, rev limiter strategy, shift light integration -- full spec: docs/plans/08-f-series-variants.md @ T-362
- [ ] **(S)** T-363 [checkpoint] Phase 8 checkpoint: review F20C research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/08-f-series-variants.md @ T-363

### F22R (Accord Type R)

- [ ] **(M)** T-364 [research] Research F22R origin: 1997 Accord Type R CH1 introduction, European market exclusive, 220R badge -- full spec: docs/plans/08-f-series-variants.md @ T-364
- [ ] **(M)** T-365 [research] Research F22R specifications: 220 PS @ 7600 RPM, 221 Nm @ 5300 RPM, 11.0:1 compression, DOHC VTEC -- full spec: docs/plans/08-f-series-variants.md @ T-365
- [ ] **(M)** T-366 [research] Research F22R camshaft profiles: duration, lift, overlap values, VTEC engagement parameters -- full spec: docs/plans/08-f-series-variants.md @ T-366
- [ ] **(M)** T-367 [research] Research F22R intake system: single runner manifold, throttle body size, plenum volume, power band characteristics -- full spec: docs/plans/08-f-series-variants.md @ T-367
- [ ] **(M)** T-368 [research] Research F22R ECU: P28 variant, OBD2a, tuning potential, Hondata compatibility, immobilizer -- full spec: docs/plans/08-f-series-variants.md @ T-368
- [ ] **(M)** T-369 [research] Research F22R transmission: close-ratio 5-speed, gear ratios, limited-slip differential, final drive -- full spec: docs/plans/08-f-series-variants.md @ T-369
- [ ] **(S)** T-370 [checkpoint] Phase 8 checkpoint: review F22R research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/08-f-series-variants.md @ T-370

---

## Backlog — Phase 9: F-Series Mechanical, Systems, Tuning & Reliability

### Mechanical Design & Internals

- [ ] **(M)** T-371 [research] Research F-series block construction: aluminum alloy, casting process, cooling jacket, rigidity characteristics -- full spec: docs/plans/09-f-series-mechanical.md @ T-371
- [ ] **(M)** T-372 [research] Research F-series crankshaft: forged steel specifications, journal diameters, counterweight design, balance method -- full spec: docs/plans/09-f-series-mechanical.md @ T-372
- [ ] **(M)** T-373 [research] Research F-series connecting rods: forged steel, length, width, bolt type, load ratings, failure analysis -- full spec: docs/plans/09-f-series-mechanical.md @ T-373
- [ ] **(M)** T-374 [research] Research F-series pistons: forged aluminum, dish/dome shapes, compression heights, ring land design, cooling jets -- full spec: docs/plans/09-f-series-mechanical.md @ T-374
- [ ] **(M)** T-375 [research] Research F-series cylinder head: DOHC 16-valve aluminum, pent-roof chambers, casting numbers, port shapes -- full spec: docs/plans/09-f-series-mechanical.md @ T-375
- [ ] **(M)** T-376 [research] Research F-series valves: intake/exhaust diameters, materials, stem diameters, retainer designs, spring seats -- full spec: docs/plans/09-f-series-mechanical.md @ T-376
- [ ] **(M)** T-377 [research] Research F-series valvetrain: dual springs, keepers, cam followers, hydraulic lash adjusters, cam bearings -- full spec: docs/plans/09-f-series-mechanical.md @ T-377
- [ ] **(S)** T-378 [checkpoint] Phase 9 checkpoint: review F-series mechanical internals research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/09-f-series-mechanical.md @ T-378

### VTEC, Engine Management, Tuning & Reliability

- [ ] **(M)** T-379 [research] Research F-series SOHC VTEC: single cam operation, engagement parameters, lift profiles, applications -- full spec: docs/plans/09-f-series-mechanical.md @ T-379
- [ ] **(M)** T-380 [research] Research F-series DOHC VTEC: dual cam operation, i-VTEC (variable timing), engagement parameters, S2000 application -- full spec: docs/plans/09-f-series-mechanical.md @ T-380
- [ ] **(M)** T-381 [research] Research F-series ECU variants: P27, P28, P72, socketed chips, tuning methods, aftermarket compatibility -- full spec: docs/plans/09-f-series-mechanical.md @ T-381
- [ ] **(M)** T-382 [research] Research F-series sensor complement: MAP, TPS, IAT, ECT, O2, CKP, VTEC pressure switch — ranges and signals -- full spec: docs/plans/09-f-series-mechanical.md @ T-382
- [ ] **(M)** T-383 [research] Research F-series NA tuning potential: Stage 1-3 modifications, bolt-on gains, cam upgrade paths, head work -- full spec: docs/plans/09-f-series-mechanical.md @ T-383
- [ ] **(M)** T-384 [research] Research F-series turbocharging potential: stock bottom end limits, built bottom limits, real-world build cases -- full spec: docs/plans/09-f-series-mechanical.md @ T-384
- [ ] **(M)** T-385 [research] Research F-series supercharging potential: kit availability, pulley options, power levels, reliability -- full spec: docs/plans/09-f-series-mechanical.md @ T-385
- [ ] **(M)** T-386 [research] Research F-series common failures: timing belt tensioner, VTEC solenoid, oil consumption, head gasket, bearing wear -- full spec: docs/plans/09-f-series-mechanical.md @ T-386
- [ ] **(M)** T-387 [research] Research F-series S2000-specific issues: rod bearing failures (early AP1), cam follower wear, oil pump screen clogging -- full spec: docs/plans/09-f-series-mechanical.md @ T-387
- [ ] **(S)** T-388 [checkpoint] Phase 9 checkpoint: review F-series systems and tuning research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/09-f-series-mechanical.md @ T-388

---

## Backlog — Phase 10: F-Series Swaps, Motorsport, Aftermarket & Maintenance

### Swaps & Applications

- [ ] **(M)** T-389 [research] Research F20C swap into S-chassis (S13/S14/S15): difficulty, mounting, wiring, transmission pairing, cooling -- full spec: docs/plans/10-f-series-swaps.md @ T-389
- [ ] **(M)** T-390 [research] Research F20C swap into AE86: lightweight advantage, power-to-weight, mounting challenges, drivetrain matching -- full spec: docs/plans/10-f-series-swaps.md @ T-390
- [ ] **(M)** T-391 [research] Research F20C swap into Miata NA/NB: fitment, weight distribution, transmission options, handling impact -- full spec: docs/plans/10-f-series-swaps.md @ T-391
- [ ] **(M)** T-392 [research] Research F20B swap into Integra DA/DC: bolt-in compatibility, ECU matching, transmission pairing -- full spec: docs/plans/10-f-series-swaps.md @ T-392
- [ ] **(S)** T-393 [checkpoint] Phase 10 checkpoint: review F-series swap research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/10-f-series-swaps.md @ T-393

### Motorsport & Aftermarket

- [ ] **(M)** T-394 [research] Research F20C in motorsport: S2000 GT racing, club racing, track day dominance, class regulations -- full spec: docs/plans/10-f-series-swaps.md @ T-394
- [ ] **(M)** T-395 [research] Research F20C aftermarket support: camshafts, pistons, rods, heads, intakes, exhausts, ECUs — major brands and products -- full spec: docs/plans/10-f-series-swaps.md @ T-395
- [ ] **(M)** T-396 [research] Research F20C tuning community: popular builds, dyno results, cost-to-power ratios, reliability records -- full spec: docs/plans/10-f-series-swaps.md @ T-396
- [ ] **(S)** T-397 [checkpoint] Phase 10 checkpoint: review F-series motorsport and aftermarket research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/10-f-series-swaps.md @ T-397

---

## Backlog — Phase 11: Synthesis, Cross-Reference & Final Indexing

- [ ] **(M)** T-398 [research] Create research/comparisons/h-vs-f.md: comprehensive H-series vs F-series comparison covering all aspects -- full spec: docs/plans/11-synthesis.md @ T-398
- [ ] **(M)** T-399 [research] Create research/comparisons/h-vs-k20.md: H22A vs K20A detailed comparison with modern relevance analysis -- full spec: docs/plans/11-synthesis.md @ T-399
- [ ] **(M)** T-400 [research] Create research/comparisons/f-vs-k20.md: F20C vs K20A comparison, evolution of Honda's high-revving philosophy -- full spec: docs/plans/11-synthesis.md @ T-400
- [ ] **(M)** T-401 [research] Create research/comparisons/h-vs-b16.md: H22A vs B16C comparison, torque vs revs philosophy -- full spec: docs/plans/11-synthesis.md @ T-401
- [ ] **(M)** T-402 [research] Create research/comparisons/f-vs-b16.md: F20C vs B16C comparison, S2000 vs Integra Type R platform dynamics -- full spec: docs/plans/11-synthesis.md @ T-402
- [ ] **(M)** T-403 [research] Create research/indexes/h-series-index.md: comprehensive navigation index for all H-series research files -- full spec: docs/plans/11-synthesis.md @ T-403
- [ ] **(M)** T-404 [research] Create research/indexes/f-series-index.md: comprehensive navigation index for all F-series research files -- full spec: docs/plans/11-synthesis.md @ T-404
- [ ] **(M)** T-405 [research] Create research/indexes/variant-matrix.md: cross-reference matrix of all H and F series variants with key specs -- full spec: docs/plans/11-synthesis.md @ T-405
- [ ] **(M)** T-406 [research] Create research/indexes/part-numbers.md: catalog of all referenced part numbers, ECU codes, casting numbers -- full spec: docs/plans/11-synthesis.md @ T-406
- [ ] **(M)** T-407 [research] Create research/indexes/source-bibliography.md: complete bibliography of all sources used, categorized by type -- full spec: docs/plans/11-synthesis.md @ T-407
- [ ] **(S)** T-408 [research] Create research/summary/executive-summary.md: high-level overview of findings for quick reference -- full spec: docs/plans/11-synthesis.md @ T-408
- [ ] **(S)** T-409 [research] Create research/summary/tuning-guide.md: comprehensive tuning guide synthesizing all tuning research -- full spec: docs/plans/11-synthesis.md @ T-409
- [ ] **(S)** T-410 [research] Create research/summary/swap-guide.md: comprehensive swap guide synthesizing all swap research -- full spec: docs/plans/11-synthesis.md @ T-410
- [ ] **(S)** T-411 [research] Create research/summary/reliability-guide.md: comprehensive reliability guide synthesizing all failure mode research -- full spec: docs/plans/11-synthesis.md @ T-411
- [ ] **(S)** T-412 [research] Create research/summary/maintenance-guide.md: comprehensive maintenance guide with intervals and procedures -- full spec: docs/plans/11-synthesis.md @ T-412
- [ ] **(S)** T-413 [checkpoint] Phase 11 checkpoint: review synthesis work, identify gaps, spawn new tasks if needed -- full spec: docs/plans/11-synthesis.md @ T-413

---

## Self-Tasking Mechanism

Every 20 tasks completed, the runner should execute a meta-research task:

1. **Review completed research**: Read all report files since last checkpoint
2. **Identify gaps**: Compare findings against the comprehensive topic list
3. **Spawn new tasks**: Add new `[fix]` tasks to appropriate phase backlog for uncovered topics
4. **Update indexes**: Ensure research/indexes/ files reflect all new content
5. **Verify citations**: Check that all sources are properly cited with URLs and timestamps

This keeps the pipeline self-sustaining and ensures exhaustive coverage.

---

## Known issues / quirks

- **FRM cylinder liner data** is sparse — most sources don't detail the exact composition. Note in any output that RS Machine sleeves are the known aftermarket solution but OEM specs are proprietary.
- **H22Z1 Australian variant** power output is disputed (200-203 PS). Sources conflict.
- **OBD1 vs OBD2 ECU pinouts** have minor variations between P5M/P51/P13 — verify against community sources before relying on them for wiring work.
- **QWEN.md** was compiled from 50+ web sources but some links may be stale (forum URLs, YouTube). Research tasks should verify and update.
- **Playwright** may need MCP configuration for browser-based web navigation — see T-026.

## Cancelled

_(none yet)_

---

## Done archive

**Phase 2: H-Series Technical Specifications Deep-Dive**

- [x] **(S)** T-120 [checkpoint] Phase 2 checkpoint: review H-series specifications research, identify gaps, spawn new tasks if needed — done 2026-05-15 (no git repo yet) — full spec: docs/plans/02-h-series-specs.md @ T-120
- [x] **(S)** T-096 [research] Research H-series intake manifold designs: dual runner vs single runner, plenum volume, runner length — done 2026-05-15, sha 3e3a0c0 — full spec: docs/plans/02-h-series-specs.md @ T-096

**Phase 1: H-Series Development History & Timeline**

- [x] **(S)** T-070 [checkpoint] Phase 1 checkpoint: review H-series development research, identify gaps, spawn new tasks if needed -- full spec: docs/plans/01-h-series-development.md @ T-070 — 2026-05-15, sha d95fe1c

**Phase 2: H-Series Technical Specifications Deep-Dive**

- [x] **(M)** T-078 [research] Research H-series crankcase volume: oil capacity, windage tray design, scavenging efficiency -- done 2026-05-15, sha ce8ccac -- full spec: docs/plans/02-h-series-specs.md @ T-078
- [x] **(M)** T-079 [research] Research H-series block rigidity: finite element analysis data, bending/torsional stiffness figures -- done 2026-05-15, sha 47986d8 -- full spec: docs/plans/02-h-series-specs.md @ T-079
- [x] **(M)** T-081 [research] Research H-series oil gallery layout: main galley, VTEC passages, oil squirters, pressure drops -- done 2026-05-15, sha b9f2d5c -- full spec: docs/plans/02-h-series-specs.md @ T-081
- [x] **(M)** T-086 [research] Research H-series power density: HP per liter, torque per liter, comparison to contemporaries -- done 2026-05-15, sha 0717062 -- full spec: docs/plans/02-h-series-specs.md @ T-086
- [x] **(S)** T-092 [research] Research H-series intake port design: runner length, cross-section, flow coefficients, velocity profiles -- done 2026-05-15, sha 027d708 -- full spec: docs/plans/02-h-series-specs.md @ T-092
- [x] **(S)** T-093 [research] Research H-series exhaust port design: runner length, cross-section, flow coefficients, heat management -- done 2026-05-15, sha 806f531 -- full spec: docs/plans/02-h-series-specs.md @ T-093
- [x] **(S)** T-101 [research] Research H-series firing order and cylinder numbering: 1-3-4-2 convention, bank identification -- done 2026-05-15, sha fc2f38a -- full spec: docs/plans/02-h-series-specs.md @ T-101
- [x] **(S)** T-102 [research] Research H-series timing marks and alignment: cam timing, crank timing, tensioner reference positions -- done 2026-05-15, sha 0e77511 -- full spec: docs/plans/02-h-series-specs.md @ T-102
- [x] **(S)** T-103 [research] Research H-series oil specification: viscosity grades, capacity by variant, filter part numbers — done 2026-05-15, sha 4c922fe — full spec: docs/plans/02-h-series-specs.md @ T-103

**Phase 0 infrastructure**

- [x] **(M)** T-001 [infra] Index all local service manuals: list files, sizes, dates, formats -- full spec: docs/plans/00-infrastructure.md @ T-001 — 2026-05-14 (dee1e10)
- [x] **(M)** T-002 [infra] Parse 1992-1996 Helms Manual PDF metadata and table of contents -- full spec: docs/plans/00-infrastructure.md @ T-002 — 2026-05-14 (d5968c8)
- [x] **(M)** T-004 [infra] Parse OBD1_H22A_Service_Manual.md structure and extract key sections -- full spec: docs/plans/00-infrastructure.md @ T-004 — 2026-05-14 (31a39b0)
- [x] **(S)** T-007 [infra] Sample OCR page files: read 5 representative pages to assess quality — done 2026-05-14, sha f3212d5 — full spec: docs/plans/00-infrastructure.md @ T-007

**Phase 1: H-Series Development History**

- [x] **(M)** T-031 [research] Research Honda H-series engine family origins: when/why developed, relationship to F-series, design goals -- full spec: docs/plans/01-h-series-development.md @ T-031 — 2026-05-15
- [x] **(M)** T-032 [research] Research Honda H-series development timeline: 1989-1991 development period, engineering decisions, prototype testing -- full spec: docs/plans/01-h-series-development.md @ T-032 — 2026-05-15
- [x] **(M)** T-033 [research] Research H-series derivation from F-series architecture: shared components, differences, evolution path -- full spec: docs/plans/01-h-series-development.md @ T-033 — 2026-05-15 (f0eeb9f)
- [x] **(M)** T-034 [research] Research H-series position in Honda's engine strategy: where it fit between B-series, F-series, and K-series -- full spec: docs/plans/01-h-series-development.md @ T-034 — 2026-05-15 (46fac25)
- [x] **(S)** T-036 [research] Research FRM (Fiber-Reinforced Metal) cylinder liner technology: development, benefits, limitations, aftermarket solutions — done 2026-05-15, sha d28eac9 — full spec: docs/plans/01-h-series-development.md @ T-036
- [x] **(S)** T-056 [research] Research H-series noise and vibration characteristics: NVH engineering, mounting strategies — done 2026-05-15, sha f0c124a — full spec: docs/plans/01-h-series-development.md @ T-056
- [x] **(S)** T-057 [research] Research H-series cold weather operation: startup behavior, warm-up characteristics, oil pressure — done 2026-05-15, sha 42cc1ba — full spec: docs/plans/01-h-series-development.md @ T-057
- [x] **(S)** T-058 [research] Research H-series hot weather operation: cooling system capacity, heat management, fan control — done 2026-05-15, sha 9bffdd2 — full spec: docs/plans/01-h-series-development.md @ T-058
- [x] **(S)** T-060 [research] Research H-series fuel compatibility: octane requirements, ethanol tolerance, premium vs regular — done 2026-05-15, sha 915047a — full spec: docs/plans/01-h-series-development.md @ T-060
- [x] **(S)** T-061 [research] Research H-series development team: chief engineers, key designers, corporate sponsors — done 2026-05-15, sha 4bd6a59 — full spec: docs/plans/01-h-series-development.md @ T-061
- [x] **(S)** T-069 [research] Research H-series service bulletins: TSBs, technical service communications, known fixes — done 2026-05-15, sha 6f4b0f8 — full spec: docs/plans/01-h-series-development.md @ T-069

## Hand-off notes (read before picking up work)

- **Plan docs are the spec.** `STATE.md` task lines are deliberately terse — the authoritative
  detail is the `### T-NNN` section in the relevant plan doc under `docs/plans/`. Always read it.
- **Execution is strictly sequential.** `run-task.sh` picks the first open `- [ ]` top-to-bottom.
  Phases gate: a `[gate]` task cannot pass while any task in its phase is open.
- **Audits grow the plan.** When you run a `[audit]` task, you append `[fix]` lines into the
  relevant `## Backlog — Phase N` section per the audit's `Spawns` template — directly below the
  audit's own line. Never put a spawned line in the Done archive or inside a code fence.
- **Checkpoints and gates may rewrite the plan.** A `[checkpoint]` (every ~20 tasks) or `[gate]`
  may add/remove/reorder/re-spec remaining tasks — in **both** `STATE.md` and the plan doc — and
  must record the change in its report.
- **Script compatibility is load-bearing.** Keep task lines pure ASCII, starting `- [ ] **(S)** `
  (the `make_slug` regex depends on the `**(X)**` prefix), under a `## Backlog` heading, outside
  code fences. The runner's parsers were verified against this format.
- **Workspace rule:** no `Co-Authored-By` trailers in commits. Conventional-prefix commit messages.
- **Commit cadence:** after each task, commit + push to `origin/main`, write `reports/<slug>.md`,
  move the task to the Done archive with the SHA. Keep `README.md`, `CLAUDE.md`, and this file in sync.
- **Research output goes to `research/`**: Each task writes findings to `research/<series>/<topic>.md`
  following the template in `docs/plans/TEMPLATE.md`. All claims must be cited with source URLs
  and retrieval timestamps.
- **Tools available**: tavily-mcp for web search/extract, playwright for browser-based navigation
  (may need MCP config per T-026), local service manuals in repo root.
- **Local data to leverage**: 1992-1996 Helms Manual PDF, 1997-2001 Helms Manual PDF + OCR extracted
  text (1.8MB, 4128 pages), OBD1 Service Manual MD, QWEN.md master reference.
