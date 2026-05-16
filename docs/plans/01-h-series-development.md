# Phase 1 — H-Series Development History & Timeline

Scaffold the knowledge base for H-series origins, engineering decisions, and production timeline.
This phase must be complete before any variant-specific or mechanical research begins.

## Task format

Each task line in STATE.md ends with `@ T-NNN` — that is the pointer to this section.
The task title in STATE.md is the summary; this doc provides the full spec.

---

## T-032: Research Honda H-series development timeline: 1989-1991

**Description:** Research the Honda H-series engine family development period from 1989 to 1991.
Cover the engineering decisions made during the design phase, prototype testing methodology,
and the path from concept to production. Key topics include:

- Honda's NCE (New Concept Engine) program (launched March 1984) and its evolution into the H-series
- The D-development project instituted November 1986 for the new DOHC/VTEC engine
- Ikuo Kajitani's role as LPL (Lead Project Leader) and the 100 hp/liter target set by Nobuhiko Kawamoto
- VTEC technology maturation from SOHC (1989 Integra) to DOHC application
- Engineering challenges: balancing low-end torque with high-RPM output, timing belt loads, camshaft surface pressure
- Prototype testing: "malicious tests" targeting 400,000 VTEC switching events, fail-safe validation
- Derivation from F-series architecture: what changed, what stayed the same
- Bore x stroke decisions (87mm x 90.7mm), FRM liner technology selection
- Integration with fourth-generation Prelude (BB1 chassis): 4WS pairing, weight distribution targets
- Production launch: September 19, 1991 JDM debut with H22A in Prelude Si VTEC / Si VTEC-4WS

**Output:** `research/h-series/development/h-series-development-timeline-1989-1991.md`

**Depends on:** T-031 (H-series engine family origins)

**DoD notes:** This is a foundational research task. All claims must be cited with source URLs
and retrieval timestamps. Cross-check against at least 2 independent sources where possible.
Note any conflicts between sources.

---

## T-033: Research H-series derivation from F-series architecture

**Description:** Research how the H-series was derived from the F-series engine family.
Cover shared components, architectural differences, and the evolution path from F to H.

**Output:** `research/h-series/development/h-series-f-series-derivation.md`

**Depends on:** T-032

**DoD notes:** Focus on technical comparison — bore spacing, block design, valvetrain,
cooling system, oil gallery layout. Note which F-series variants influenced H-series design.

---

## T-034: Research H-series position in Honda's engine strategy

**Description:** Research where the H-series fit within Honda's broader engine strategy in the
early 1990s. Compare against B-series, F-series, and early K-series planning.

**Output:** `research/h-series/development/h-series-engine-strategy.md`

**Depends on:** T-032, T-033

**DoD notes:** Contextualize the H-series within Honda's portfolio. When did K-series planning begin?
How did H-series complement rather than cannibalize other families?

---

## T-035: Research Honda's DOHC VTEC philosophy in the early 1990s

**Description:** Research Honda's VTEC philosophy in the early 1990s — market positioning,
technology race against competitors, and internal corporate strategy.

**Output:** `research/h-series/development/h-series-vtec-philosophy.md`

**Depends on:** T-032

**DoD notes:** Cover the competitive landscape (Toyota 2ZZ, Mazda rotary, Subaru EJ).
Include Honda's marketing of VTEC as a differentiator.

---

## T-036: Research FRM (Fiber-Reinforced Metal) cylinder liner technology

**Description:** Research FRM cylinder liner technology: development history, composition,
manufacturing process, benefits, limitations, and aftermarket solutions.

**Output:** `research/h-series/development/frm-liner-technology.md`

**Depends on:** T-032

**DoD notes:** OEM specs for FRM are proprietary. Note RS Machine sleeves as the known
aftermarket solution but acknowledge that exact OEM composition is not publicly documented.

---

## T-037: Research H-series aluminum block casting process and materials science

**Description:** Research the aluminum alloy grade used in H-series blocks, the casting process,
and materials science considerations.

**Output:** `research/h-series/development/h-series-aluminum-block.md`

**Depends on:** T-036

**DoD notes:** Focus on alloy composition, cooling channel design, porosity control.
Cross-reference with F-series block materials for comparison.

---

## T-038: Research H-series engineering targets

**Description:** Research the engineering targets set for the H-series: power density goals,
reliability requirements, emissions constraints, and cost targets.

**Output:** `research/h-series/development/h-series-engineering-targets.md`

**Depends on:** T-032, T-036, T-037

**DoD notes:** The 100 hp/liter target from Kawamoto/Kajitani is a key data point.
Document how H-series targets differed from B-series and F-series targets.

---

## T-039: Research H-series vs competitor engines in early 1990s

**Description:** Research how the H-series compared to competitor engines in the early 1990s:
Toyota 3S-GE, Mazda 13B-MSP rotary, Subaru EJ22.

**Output:** `research/h-series/development/h-series-vs-competitors.md`

**Depends on:** T-038

**DoD notes:** Side-by-side comparison of displacement, power, torque, redline, technology.
Note which engines competed in the same vehicle segments.

---

## T-040: Research Honda's four-wheel steering (4WS) integration with H-series

**Description:** Research why the H-series was paired with 4WS in the Prelude, the performance
impact of this combination, and the engineering rationale.

**Output:** `research/h-series/development/h-series-4ws-integration.md`

**Depends on:** T-032

**DoD notes:** Cover both mechanical 4WS (3rd gen) and electronic 4WS (4th gen).
Document the 80% buyer adoption rate for 4WS in the 3rd gen Prelude.

---

## T-052: Research H-series recall history: manufacturer recalls and safety campaigns

**Description:** Research the complete recall history of Honda H-series engines (H22A, H22A1–H22A8, H22Z1, H23A). Cover:

- All NHTSA safety recalls affecting vehicles equipped with H-series engines (Prelude, Accord Euro R, etc.)
- Manufacturer recall campaigns initiated by Honda (not just NHTSA-mandated)
- Safety campaign details: component affected, defect description, remedy, affected model years
- Service bulletins and warranty extensions that addressed known issues without formal recall status
- NHTSA complaint database statistics for H-series-equipped vehicles by model year
- FRM liner-related service actions (SB618958), timing belt tensioner service bulletins
- Automatic transmission warranty extensions (1999–2001 vs. 1997–1998 discrepancy)
- Cross-reference with local manual data where available

**Output:** `research/h-series/reliability/h-series-recall-history.md`

**Depends on:** None (standalone research task)

**DoD notes:** This is a safety-data research task. All NHTSA recall numbers must be cited with official URLs. Service bulletin numbers should be noted even if exact text is not publicly available. Note any discrepancies between U.S. and international recall coverage (e.g., Turkish market recalls not extended to North America).

---

## Phase 1 checkpoint (T-070 in STATE.md)

**Description:** Re-read all of STATE.md. Verify no stray `[~]` markers. Confirm all research
files are present and properly cited. Check that indexes are updated. Verify `git status` is clean.

**Depends on:** T-032 through T-069

**Spawns:** None expected. If drift is found, add `[fix]` tasks below this checkpoint.

**DoD notes:** Lightweight checkpoint — not a gate. Catch obvious issues before the stricter gate.

---

## Phase 1 gate

**Description:** Stricter verification. Every task in Phase 1 must be `[x] done`. All research
files present and properly cited. Index files updated. `git status` is clean. No `[~]` or `[B]`
markers remain in Phase 1.

**Depends on:** T-070

**Spawns:** None. If this gate fails, go back and fix the failing tasks.

**DoD notes:** This gate blocks all subsequent phases. Do not mark done until every box ticks.
