# QWEN.md Gap Analysis

**Generated:** 2026-05-14
**Source:** `QWEN.md` v2.1 (last updated 2026-04-27)
**Comparison basis:** STATE.md Phase 0-10 task list (300+ granular topics)
**Depends on:** T-011 (QWEN.md content inventory)

---

## Executive Summary

QWEN.md provides solid coverage of the H22 engine family as a standalone reference (~12,000-15,000 words, 15 sections, 24 tables). It excels at variant breakdowns, ECU pinouts, tuning stages, aftermarket brands, and competitor comparisons. However, it has significant gaps when measured against the comprehensive H/F-series topic checklist derived from STATE.md's task list (T-031 through T-717).

**Key findings:**
- **F-series coverage is nearly absent.** Despite the H-series being derived from the F-series, QWEN.md mentions the F-series only in passing (F20C comparison table, F3 racing). There is no dedicated F-series section covering origins, architecture, variants, or mechanical design.
- **~80 of 300+ granular topics from the task list are completely missing** (not mentioned at all).
- **~60 additional topics are under-covered** (mentioned in passing but lacking substantive data).
- **Reference count (26) is low** for a document claiming "50+ web sources." Many are forum links without specific article URLs.
- **No retrieval timestamps** on any reference — source freshness cannot be verified.

---

## Coverage Assessment by Phase

### Phase 1: H-Series Development History & Timeline

| Topic | Covered? | Depth | Missing Details |
|-------|----------|-------|-----------------|
| Engine origins & derivation philosophy | Partial | Low | No design goals, engineering targets, or corporate strategy context |
| Development team | No | — | Chief engineers, key designers not named |
| FRM liner technology | Yes | Medium | Material composition described, but no alloy grade or manufacturing process detail |
| Block casting process | Partial | Low | Aluminum alloy type mentioned, no casting process description |
| Engineering targets | No | — | Power density, reliability, emissions, cost constraints |
| Competitor comparison (early 1990s) | No | — | Toyota 3S-GE, Mazda 13B-MSP, Subaru EJ22 not discussed |
| Four-wheel steering integration | No | — | Why H-series was paired with 4WS |
| Production timeline & volumes | Partial | Low | Start/end dates present, no production volume data |
| Market introduction (NA/EU/JDM) | Partial | Low | Launch dates present, no market reception or pricing data |
| Production locations | No | — | Japan plants, overseas production |
| Supply chain | No | — | Component suppliers, casting partners |
| Cost analysis | No | — | BOM estimate, pricing vs B-series |
| Discontinuation | Partial | Low | Factors listed but no transition strategy detail |
| Legacy & K-series transition | Partial | Low | Technology carryover not detailed |
| Production numbers by variant | No | — | Sales data, registration stats |
| Recall history | No | — | Manufacturer recalls, safety campaigns |
| Warranty periods | No | — | Common warranty claims |
| Environmental compliance | No | — | Emissions standards, catalytic converter tech |
| Fuel economy ratings | No | — | EPA, JC08, WLTP data |
| NVH characteristics | No | — | Noise/vibration engineering |
| Cold weather operation | No | — | Startup behavior, warm-up, oil pressure |
| Hot weather operation | No | — | Cooling capacity, heat management |
| Altitude performance | No | — | Power loss, ECU adaptation |
| Fuel compatibility | No | — | Octane requirements, ethanol tolerance |
| Patents & IP | No | — | Filed patents, proprietary technologies |
| Homologation | No | — | Racing series eligibility, special editions |
| Crash safety integration | Yes | h-series-crash-safety-integration.md (T-064, 2026-05-15) | Engine mounting, collapse zones, pedestrian safety, crash test ratings |
| Service interval evolution | No | — | Maintenance schedule changes over production years |
| Tooling & factory equipment | No | — | Special tools, dealership updates |
| Technician training | No | — | Honda training programs, certifications |
| Diagnostic equipment | No | — | Scan tools, oscilloscope patterns |
| Service bulletins (TSBs) | No | — | Technical service communications |

**Missing topics:** ~25 of 32 Phase 1 topics
**Under-covered:** ~3 (origins, discontinuation, legacy)

---

### Phase 2: H-Series Technical Specifications Deep-Dive

| Topic | Covered? | Depth | Missing Details |
|-------|----------|-------|-----------------|
| Block dimensions (deck height, bore spacing) | Partial | Low | Deck height given (219.5mm), but no bore spacing or cylinder center distances |
| Block materials (alloy grade) | Partial | Low | "Aluminum alloy" stated, no specific grade |
| Closed deck vs open deck | Yes | Medium | Transition described, no structural analysis |
| Main bearing support | Partial | Low | 5-bolt cap and journal diameters given, no stiffness data |
| Cylinder bore dimensions | Partial | Low | Bore size (87mm) given, no hone pattern or surface finish |
| Stroke dimensions | Partial | Low | Stroke (90.7mm) given, no rod ratio calculation or piston velocity |
| Displacement calculation | Partial | Low | 2,157cc stated, no tolerance bands or measured volumes |
| Crankcase volume | No | — | Oil capacity, windage tray design |
| Block rigidity | No | — | FEA data, bending/torsional stiffness |
| Balancing system | Partial | Low | Balancer shafts mentioned, no frequency data |
| Oil gallery layout | Done | Medium | Full coverage: main galley routing, VTEC passages, oil squirters, pressure specs — see research/h-series/specifications/h-series-oil-gallery-layout.md |
| Water jacket design | Partial | Low | Cooling system described, no flow path detail |
| Head bolt specifications | Partial | Low | Torque values given, no sequence or stretch limits |
| Engine weight | Yes | Low | Long block weight (~385 lbs), no fluid-filled weight |
| External dimensions | Partial | Low | Rough dimensions (~22x22x12"), not precise |
| Power density | No | — | HP/liter figures, comparison to contemporaries |
| Specific output by variant | Partial | Low | Power figures per variant, no HP/liter calc |
| Thermal efficiency | No | — | Brake thermal efficiency, heat rejection % |
| Friction losses | No | — | Piston ring, bearing, windage, pumping losses |
| Compression ratio variations | Yes | Medium | 10.0-11.0:1 range covered in variant tables |
| Combustion chamber design | Partial | Low | Pent-roof shape mentioned, no swirl/tumble data |
| Intake port design | Partial | Low | Porting status per variant, no flow coefficients |
| Exhaust port design | Partial | Low | No flow data or heat management detail |
| Throttle body sizes | Partial | Low | 57/60/62.5mm mentioned, no airflow calculations |
| Exhaust system diameters | Partial | Low | 51mm/57mm mentioned, no backpressure calc |
| Intake manifold designs | Partial | Low | Dual/single runner mentioned, no plenum volume |
| Flywheel & clutch specs | No | — | Diameter, weight, material, engagement |
| Alternator & starter specs | No | — | Amperage, torque, gear ratios |
| Accessory drive | No | — | PS pump, A/C compressor, belt routing |
| Sensor complement | Partial | Medium | Key sensors listed, not exhaustive part numbers |
| Firing order | Yes | Low | 1-3-4-2 stated |
| Timing marks & alignment | No | — | Cam/crank timing, tensioner reference positions |
| Oil specification | Yes | Medium | Viscosity, capacity, filter part number |
| Coolant specification | Yes | Medium | Type, capacity, mixture ratio |
| Spark plug specs | Yes | Medium | Gap, heat range, thread size, torque |
| Valve spring specs | Partial | Low | Dual springs mentioned, no open/closed pressure |
| Bearing clearances | No | — | Main, rod, thrust clearance specifications |
| Piston-to-wall clearance | No | — | Skirt clearance, ring gap, crown-to-piston distance |
| Camshaft bearing dimensions | No | — | Bore size, journal diameter, oil clearance |
| Oil pump specs | Partial | Low | Type and pressure, no flow rate |
| Water pump specs | Partial | Low | Type described, no impeller diameter or flow rate |
| Timing belt specs | Partial | Low | Interval given, no tooth count or width |
| Fuel system specs | Partial | Low | Fuel pressure given, no injector flow rates |
| Ignition system specs | No | — | Coil type, spark energy, dwell time |
| Idle speed specs | Yes | Low | 650-750 RPM |
| Redline specs | Yes | Medium | Range given per variant |
| VTEC engagement parameters | ✅ Complete | Medium | Full spec: 5 ECU conditions, VTEC window, variant differences, disengagement hysteresis, aftermarket tuning — see research/h-series/specifications/h-series-vtec-engagement-parameters.md (T-117) |
| ECU processor & memory | No | — | CPU type, RAM size, ROM capacity |
| OBD version differences | Partial | Medium | OBD1 vs OBD2 described, no full pinout detail |

**Missing topics:** ~18 of 48 Phase 2 topics
**Under-covered:** ~20 (most "partial" entries lack quantitative data)

---

### Phase 3: H-Series Engine Variants Detailed Research

This phase has the most granular tasks (T-121 through T-214) and the largest gap. QWEN.md covers each variant at a high level but misses the deep-dive topics.

#### H22A Redtop (JDM 1992-1996)

| Topic | Covered? | Depth | Missing Details |
|-------|----------|-------|-----------------|
| Origin & introduction | Yes | Medium | When introduced, models, production years |
| Specifications | Yes | High | Power, torque, compression, features |
| Camshaft profiles | Partial | Low | Duration/lift values present, no overlap calc |
| Intake system | Partial | Low | Dual runner, 62.5mm TB mentioned, no runner length |
| Exhaust system | Partial | Low | 57mm exhaust mentioned, no header design detail |
| Factory head porting | Partial | Low | "Light factory porting" stated, no flow numbers |
| Applications | Yes | Medium | SiR, Type S, Accord SiR listed |
| ECU | Partial | Low | P28/P06 mentioned, no chip socket location or tuning potential |
| Transmission pairing | No | — | Close-ratio 5-speed, gear ratios, final drive |
| 4WS integration | No | — | Hydraulic system, steering ratio, turning circle |
| ATTS | No | — | SH model application, clutch pack, bias ratio |
| Suspension | No | — | Strut design, spring rates, anti-roll bar sizes |
| Braking | No | — | Caliper size, rotor diameter, pad compound |
| Wheel & tire specs | No | — | Rim size, width, offset, tire size |
| Weight & balance | No | — | Curb weight, weight distribution, CG height |
| Acceleration & lap times | No | — | 0-100 km/h, quarter mile, Nürburgring times |
| Fuel economy | No | — | JC08 cycle figures, real-world consumption |
| Emissions ratings | No | — | NOx, CO, HC, particulate levels |
| Sound character | No | — | Exhaust note, VTEC kick, dB levels |
| Collectibility | ✅ Complete | High | h22a-redtop-collectibility.md (T-140, 2026-05-15) — US/UK/JDM pricing, rarity factors, condition premiums, trend analysis |
| Common issues | Partial | Low | General failures listed, not Redtop-specific |
| Restoration guides | No | — | Nut-and-bolt examples, rebuild costs |
| Track day viability | No | — | Reliability on track, cooling capacity |
| Drag racing potential | No | — | 60-foot times, trap speed |
| Autocross capability | No | — | Grip levels, turn-in response |
| Rally & endurance | No | — | GMR results, oil consumption issues |
| Winter driving | No | — | Weight distribution for snow, traction |
| Daily usability | No | — | NVH levels, visibility, seat comfort |
| Insurance costs | No | — | Classification, premium factors |

**Missing topics:** ~21 of 29 Redtop-specific topics

#### H22A Blacktop (JDM 1992-2001)

| Topic | Covered? | Depth | Missing Details |
|-------|----------|-------|-----------------|
| Origin & introduction | Yes | Medium | Production years, applications |
| Specifications | Yes | High | Power, torque, compression |
| Camshaft profiles | Partial | Low | Duration/lift values present |
| Intake system | Partial | Low | Single runner, 60mm TB mentioned |
| Exhaust system | Partial | Low | 51mm exhaust mentioned |
| Factory porting status | Yes | Low | "No factory head porting" stated |
| Applications | Yes | Medium | SiR, Accord SiR, Torneo listed |
| ECU | Partial | Low | Same as Redtop, no tuning detail |
| Transmission pairing | No | — | Gear ratios, LSD availability |
| Closed vs open deck | Yes | Medium | 1992-1996 vs 1997-2001 transition |
| vs Redtop comparison | Partial | Low | Brief mention, no detailed comparison |
| Streetability | No | — | Low-RPM torque, drivability |
| Modification potential | No | — | Bolt-on gains, cam upgrade path |
| Reliability record | No | — | Compared to Redtop, longevity data |
| Value proposition | No | — | Used prices, cost of ownership |

**Missing topics:** ~8 of 15 Blacktop-specific topics

#### H22A1 (USDM 1993-1996)

| Topic | Covered? | Depth | Missing Details |
|-------|----------|-------|-----------------|
| Origin | Yes | Medium | 1993 intro, first US DOHC VTEC |
| Specifications | Yes | High | Power, torque, compression, OBD1 |
| ECU | Partial | Low | P5M/P51 mentioned, no chip socket location |
| Applications | Yes | Medium | Prelude VTEC, SR-V, VTi-R |
| Emissions equipment | Partial | Low | US emissions mentioned, no component detail |
| OBD1 diagnostics | No | — | Connector pinout, test mode, live data |
| USDM detuning | No | — | What changed vs JDM Redtop, power loss mechanisms |
| Alloy oil sump | Partial | Low | "OBD1 specific" noted, no capacity/baffle detail |
| Closed deck block | Yes | Medium | Described as closed deck |
| 4WS models | No | — | Which trims had 4WS |
| Auto vs manual | No | — | Gear ratios, torque converter difference |
| US market reception | No | — | Reviews, magazine tests |
| California vs non-California | No | — | Emissions/power differences |
| Swap legality | No | — | CARB EO numbers, state-by-state legality |

**Missing topics:** ~7 of 14 USDM-specific topics

#### Remaining Variants (H22A2-A8, H22Z1, H23A)

All receive brief treatment (1-3 paragraphs each). Missing:
- H22A2: European emissions standards detail, pricing, spare parts availability
- H22A3: KU code applications, identification markers
- H22A4: Trim differences (Type-SH vs SE vs Base), main journal increase rationale
- H22A5-H22A8: Production year ranges, feature packages
- H22Z1: Disputed power output investigation
- H23A: Lower redline impact, longer stroke piston speed calculations

---

### Phase 4: H-Series Mechanical Design & Internals

| Topic | Covered? | Depth | Missing Details |
|-------|----------|-------|-----------------|
| Block casting process | Partial | Low | Aluminum alloy type, no mold design or porosity control |
| FRM liner technology | Yes | Medium | Composition, application, wear characteristics |
| FRM sleeve replacement | Yes | Medium | RS Machine sleeves, cost noted |
| Crankshaft | Yes | Medium | Material, stroke, journals, counterweights |
| Connecting rods | Yes | Medium | Material, length, width, bolts |
| Pistons | Yes | Medium | Material, design, compression height |
| Wrist pins | Partial | Low | Diameter and bore tolerance given |
| Piston rings | Yes | Medium | Types, gap specs |
| Main bearings | Partial | Low | Width given, no clearance specs |
| Rod bearings | Partial | Low | Width given, no clearance specs |
| Thrust washers | No | — | Bearing selection, axial play limits |
| Balancer shafts | Partial | Low | Integration mentioned, no drive mechanism detail |
| Oil pan | Yes | Medium | Material, capacity, baffles |
| Rear main seal | Partial | Low | Mentioned in timing belt section |
| Front main seal | No | — | Type, crank snout design |
| Cylinder head | Yes | Medium | DOHC 16V, pent-roof, casting |
| Intake valves | Partial | Low | 35mm diameter given, no stem diameter or retainer design |
| Exhaust valves | Partial | Low | 30mm diameter, sodium-filled status unclear |
| Valve guides | No | — | Material, press fit depth, wear limits |
| Valve seals | No | — | Type, installation method, oil consumption impact |
| Dual valve springs | Partial | Low | Mentioned, no surge frequency data |
| Titanium retainers | No | — | Aftermarket availability, weight savings |
| Keepers/locks | No | — | Type, retention force, failure modes |
| Camshafts | Yes | Medium | Profiles, lift, duration |
| Camshaft bearings | No | — | Bore size, clearance specs |

**Missing topics:** ~8 of 26 Phase 4 topics

---

### Phase 5: H-Series Performance & Tuning

| Topic | Covered? | Depth | Missing Details |
|-------|----------|-------|-----------------|
| NA tuning stages | Yes | Medium | Stages 1-3 with parts and gains |
| Turbo tuning | Yes | Medium | Stock/built bottom end, real-world examples |
| Supercharging | Yes | Medium | Kits, power levels |
| ECU tuning parameters | Yes | Medium | Fuel maps, ignition, VTEC crossover |
| Oil consumption analysis | No | — | Causes, diagnosis, prevention |
| Cooling capacity | No | — | Radiator capacity, fan control |
| Reliability under boost | No | — | Safe boost limits by build level |
| VTEC crossover tuning | Partial | Low | Stock vs tunable range mentioned |
| Individual throttle bodies | No | — | ITB conversion guides, part numbers |
| Standalone ECU integration | Partial | Low | Brands listed, no integration procedure |

**Missing topics:** ~5 of 10 Phase 5 topics

---

### Phase 6-10: F-Series Research

**This entire section is missing from QWEN.md.** The F-series is referenced only in:
- The Overview section (one line: "derived from F-series architecture")
- The Competitor Comparisons section (F20C comparison table)
- The Motorsport section (Mugen F20B from H22A platform)

**Missing F-series topics (all of Phase 6-10):**
- F-series origins, design goals, relationship to H-series derivation
- F20B, F20C, F22R specifications and variants
- F-series block architecture, valvetrain, lubrication
- F-series engine management, tuning, reliability
- F-series swaps, motorsport, aftermarket support
- F-vs-H comparisons, F-vs-B16 comparisons, F-vs-K20 comparisons

**Impact:** Without F-series coverage, the H-series' historical context is severely limited. The H-series was explicitly derived from the F-series — understanding the F-series is essential for understanding why the H-series was designed the way it was.

---

## Gap Classification

### Critical Gaps (blockers for meaningful research)

These topics are fundamental to understanding the H-series and should be addressed before deep-dive variant research:

1. **F-series architecture and variants** — Complete absence. Blocks Phase 6-10.
2. **Engineering targets and development philosophy** — Why the H-series was designed this way. Blocks understanding of design trade-offs.
3. **Block rigidity and structural analysis** — Critical for understanding FRM liner necessity and boost potential.
4. **FRM liner replacement procedures** — Known failure point; insufficient detail for rebuild guidance.
5. **Timing belt tensioner upgrade procedures** — Critical failure point; upgrade paths not detailed.
6. **H22A1 USDM swap legality** — Important for North American audience; CARB EO numbers missing.

### Major Gaps (significant missing content)

Topics that should have dedicated subsections:

7. **Variant-specific performance data** — Acceleration, lap times, fuel economy for each variant
8. **Transmission gear ratios** — H-series and B-series transmission specs
9. **Detailed ECU pinouts beyond key pins** — Full pinout tables for all ECU variants
10. **Suspension, braking, wheel/tire specs** — Vehicle integration data for each variant
11. **Aftermarket integration procedures** — How to actually install mods (beyond parts lists)
12. **Motorsport competition details** — JTCC/BTCC race results, car setups, driver names
13. **Cold weather / hot weather / altitude operation** — Environmental performance data

### Minor Gaps (nice-to-have additions)

14. **Thermal efficiency and friction loss data** — Academic/engineering interest
15. **Valve guide/seal specifications** — Rebuild reference
16. **Bearing clearance specifications** — Precision rebuild reference
17. **Sound character descriptions** — Enthusiast interest
18. ~~**Collectibility and insurance data**~~ — Owner interest ✅ Resolved by T-140 (2026-05-15)

---

## Reference Quality Assessment

### Issues Found

| Issue | Count | Examples |
|-------|-------|----------|
| Forum links without specific articles | ~8 | Honda-Tech, Prelude Power, Civic Forums, AcuraZine, Grassroots |
| No retrieval timestamps | 26/26 | None of the 26 references include access dates |
| Potentially stale URLs | ~5 | wikimotors.com (http, not https), nzhondas.com, cylinderhead.com |
| Video resources without timestamps | 2 | YouTube videos listed without upload dates |
| Local manual references without page numbers | 2 | Helms manuals cited without specific page references |

### Recommended Reference Additions

Based on the gap analysis, these sources should be added:

1. **Honda official documents** — Development press releases, spec sheets
2. **Service manual digitizations** — Beyond the two Helms manuals (factory shop manuals)
3. **Technical papers** — SAE papers on FRM liners, VTEC engineering
4. **Racing archives** — JTCC/BTCC race reports, magazine road tests
5. **Aftermarket catalogs** — Current product availability and pricing
6. **Swap community databases** — Real-world swap experiences and solutions

---

## Task Spawn Recommendations

Based on this gap analysis, the following tasks should be prioritized in subsequent phases:

### Phase 0 follow-ups (infrastructure)
- **T-031-070 (Phase 1)**: Begin H-series development research — this is the highest-value gap area
- **T-071-120 (Phase 2)**: Technical specifications deep-dive — fills most quantitative gaps
- **T-121-214 (Phase 3)**: Variant-specific research — addresses the largest single gap area
- **T-215-230 (Phase 4)**: Mechanical internals — fills rebuild reference gaps
- **T-231-240 (Phase 4 continued)**: Cylinder head & valvetrain detail
- **T-031-070 (Phase 6)**: F-series research — must be done to provide H-series context

### Cross-cutting priorities
1. **F-series first** — Understanding the parent architecture informs all H-series analysis
2. **Quantitative specs second** — Phase 2 tasks fill the most numerous gaps
3. **Variant deep-dives third** — Phase 3 tasks address the most visible gaps
4. **References refresh** — Add timestamps, verify URLs, add missing sources

---

## Comparison Matrix: QWEN.md vs STATE.md Task Coverage

| State.md Phase | Total Tasks | Covered (Full) | Covered (Partial) | Not Covered | Coverage % |
|---------------|-------------|----------------|-------------------|-------------|------------|
| Phase 0 (Infrastructure) | 30 | 30 | 0 | 0 | 100%* |
| Phase 1 (H-Series Dev) | 40 | 0 | 3 | 37 | 7.5% |
| Phase 2 (H-Series Specs) | 50 | 0 | 15 | 35 | 30% |
| Phase 3 (H-Series Variants) | 94 | 0 | 8 | 86 | 9.1% |
| Phase 4 (H-Series Mechanical) | 26 | 0 | 10 | 16 | 38.5% |
| Phase 5 (H-Series Performance) | 10 | 0 | 2 | 8 | 20% |
| Phase 6-10 (F-Series) | 100+ | 0 | 0 | 100+ | 0% |
| **Total** | **~350** | **30** | **38** | **~282** | **~20%** |

*Phase 0 is the infrastructure work already completed by prior tasks (T-003 through T-011). QWEN.md is the *output* of Phase 0 work, so it naturally has 100% Phase 0 coverage.

---

## Document Version Notes

- **Current version:** 2.1 (2026-04-27)
- **Previous version:** 2.0 (initial compilation, April 2026)
- **Addition in v2.1:** BB6 Helms Manual OCR extraction (1,376 pages, 1.8MB searchable text)
- **Gap identified:** The OCR text from the BB6 manual was indexed (T-010) but its contents were not yet merged into QWEN.md. The OCR text likely contains specifications, procedures, and data that could fill many of the gaps identified above.

---

*Analysis generated by T-012: Identify gaps in QWEN.md.*
*Next step: Begin Phase 1 research tasks (T-031+) starting with F-series architecture (highest priority gap).*
