# Phase 2 — H-Series Technical Specifications Deep-Dive

This phase covers detailed technical specifications for the Honda H-series engine family.
Each task gets a `### T-NNN` heading with full specification details.

---

## T-071: Research H-series block dimensions

**Description:** Research fundamental block dimensions of the Honda H-series engine family:
deck height, bore spacing, cylinder center-to-center distances, and related geometric
specifications. These dimensions are shared across all H-series variants (H22A, H22A1,
H22A4, H23A) and are identical to the F-series due to their common architecture.

**Output:** `research/h-series/specifications/h-series-block-dimensions.md`

**Depends on:** none

**DoD notes:** This is foundational data for all subsequent specification tasks. Ensure
all dimensions are cross-checked against at least 2 independent sources. Note any
discrepancies between sources. Include both metric and imperial units.

---

## T-072: Research H-series block materials

**Description:** Research H-series block materials: aluminum alloy grade, FRM liner
composition, casting process. Document the specific aluminum alloy used (likely A356-class),
the FRM (Fiber-Reinforced Metal) cylinder liner technology including Saffil alumina fiber
MMC composition, and the sand casting process parameters.

**Output:** `research/h-series/specifications/h-series-block-materials.md`

**Depends on:** T-071

**DoD notes:** FRM composition is proprietary — note this limitation. Cross-reference
with T-036 (FRM liner technology research from Phase 1).

---

## T-073: Research H-series closed deck vs open deck designs

**Description:** Research the structural differences between 1992-1996 closed-deck blocks
(H22A, H22A1) and 1997-2001 open-deck blocks (H22A4). Document the design rationale,
structural implications for boost applications, rigidity differences, and how the transition
coincided with the main journal diameter increase.

**Output:** `research/h-series/specifications/h-series-deck-designs.md`

**Depends on:** T-071

**DoD notes:** This connects to T-037 (aluminum block casting) and T-083 (head bolt specs).
Note that closed-deck blocks are preferred for forced induction.

---

## T-074: Research H-series main bearing support

**Description:** Research the 5-bolt cap main bearing support design, the journal diameter
evolution from 50mm (1992-1997) to 55mm (1998+), and the stiffness implications of each
configuration. Document bearing color/grade selection system.

**Output:** `research/h-series/specifications/h-series-main-bearing-support.md`

**Depends on:** T-071

**DoD notes:** The 55mm main journal upgrade is critical for boost applications. Include
bearing thickness/color charts from Honda-Tech measured data.

---

## T-075: Research H-series cylinder bore dimensions

**Description:** Research the 87.0mm bore specification, hone pattern, surface finish
specifications, and FRM liner wear characteristics. Document bore tolerance bands and
bore reconditioning procedures.

**Output:** `research/h-series/specifications/h-series-cylinder-bore.md`

**Depends on:** T-071

**DoD notes:** Cross-reference with T-072 (block materials) and T-216 (FRM liner tech).

---

## T-076: Research H-series stroke dimensions

**Description:** Research the 90.7mm stroke specification, rod ratio calculation (1.58:1),
piston velocity calculations, and the implications of the long-stroke design for piston
stability and side loading.

**Output:** `research/h-series/specifications/h-series-stroke-dimensions.md`

**Depends on:** T-071

**DoD notes:** The 1.58:1 rod/stroke ratio is favorable for piston stability. Compare
against competitor engines.

---

## T-077: Research H-series displacement calculation

**Description:** Research the 2,157cc displacement derivation, tolerance bands, actual
measured volumes, and the displacement difference between H22A (2,157cc) and H23A (2,259cc).

**Output:** `research/h-series/specifications/h-series-displacement.md`

**Depends on:** T-071, T-075, T-076

**DoD notes:** Show the mathematical derivation: π × (87/2)² × 90.7 × 4 = 2,157cc.

---

## T-078 through T-119: Remaining Phase 2 Tasks

These tasks cover additional specification topics including crankcase volume, block rigidity,
balancing system, oil gallery layout, water jacket design, head bolt specifications, engine
weight, external dimensions, power density, specific output, thermal efficiency, friction
losses, compression ratios, combustion chamber design, intake/exhaust port design, throttle
body sizes, exhaust system diameters, intake manifold designs, flywheel/clutch specs,
alternator/starter specs, accessory drive, sensor complement, firing order, timing marks,
oil/coolant/spark plug specs, valve spring specs, bearing clearances, piston-to-wall clearance,
camshaft bearing dimensions, oil/water pump specs, timing belt specs, fuel system specs,
ignition system specs, idle speed specs, redline specs, VTEC engagement parameters, ECU
processor/memory, and OBD version differences.

See STATE.md for the complete task list with descriptions.

---

## T-120: Phase 2 checkpoint

**Description:** Review all H-series specifications research completed in Phase 2. Verify
no stray `[~]` markers. Confirm all research files follow the template. Check that all
indexes are updated. Verify `git status` is clean.

**Depends on:** T-071 through T-119

**Spawns:** None expected. If drift is found, add `[fix]` tasks below this checkpoint.

**DoD notes:** Lightweight checkpoint — not a gate. Catch obvious issues before the stricter
gate in the next phase.
