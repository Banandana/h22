# Master Index — Honda H/F-Series Engine Research

> Entry point for navigating the research corpus.
> Generated: 2026-05-14
> Task: T-020 [infra] Create initial master index with placeholder structure
> Status: Placeholder — links will be populated as research progresses

---

## Table of Contents

1. [Local Manual Content](#local-manual-content)
2. [OCR & Extraction Data](#ocr--extraction-data)
3. [Variant Code Catalogs](#variant-code-catalogs)
4. [ECU & Wiring References](#ecu--wiring-references)
5. [Tooling & Configuration](#tooling--configuration)
6. [H-Series Research](#h-series-research)
   - [Development History](#development-history)
   - [Technical Specifications](#technical-specifications)
   - [Engine Variants](#engine-variants)
   - [Mechanical Design & Internals](#mechanical-design--internals)
   - [VTEC System](#vtec-system)
   - [Engine Management](#engine-management)
   - [Tuning](#tuning)
   - [Reliability](#reliability)
   - [Swaps](#swaps)
   - [Motorsport](#motorsport)
   - [Aftermarket](#aftermarket)
   - [Comparisons](#comparisons)
   - [Maintenance](#maintenance)
7. [F-Series Research](#f-series-research)
   - [Development History](#development-history-1)
   - [Technical Specifications](#technical-specifications-1)
   - [Engine Variants](#engine-variants-1)
   - [Mechanical Design & Internals](#mechanical-design--internals-1)
   - [VTEC System](#vtec-system-1)
   - [Engine Management](#engine-management-1)
   - [Tuning](#tuning-1)
   - [Reliability](#reliability-1)
   - [Swaps](#swaps-1)
   - [Motorsport](#motorsport-1)
   - [Aftermarket](#aftermarket-1)
   - [Comparisons](#comparisons-1)
   - [Maintenance](#maintenance-1)
8. [Cross-Engine Comparisons](#cross-engine-comparisons)
   - [H-Series vs F-Series](#h-series-vs-f-series)
   - [H-Series vs B16](#h-series-vs-b16)
   - [H-Series vs K20](#h-series-vs-k20)
   - [H-Series vs F20C](#h-series-vs-f20c)
   - [F-Series vs B16](#f-series-vs-b16)
   - [F-Series vs K20](#f-series-vs-k20)
9. [Raw Data](#raw-data)
10. [Templates & Standards](#templates--standards)

---

## Local Manual Content

| Index File | Description | Status |
|------------|-------------|--------|
| [`local-manuals.md`](local-manuals.md) | Maps topics found in local service manuals to source files and page ranges | ✅ Complete (T-010) |
| [`manual-metadata.md`](manual-metadata.md) | PDF metadata, TOC extraction, page counts for all manual files | ✅ Complete (T-002, T-003, T-004) |
| [`qwen-content-inventory.md`](qwen-content-inventory.md) | Structured inventory of all topics, subtopics, and references from QWEN.md | ✅ Complete (T-011) |
| [`qwen-gap-analysis.md`](qwen-gap-analysis.md) | Gap analysis comparing QWEN.md against comprehensive H/F-series topic checklist | ✅ Complete (T-012) |

---

## OCR & Extraction Data

| Index File | Description | Status |
|------------|-------------|--------|
| [`ocr-output-map.md`](ocr-output-map.md) | Enumerates all OCR output files by type, page range, and storage | ✅ Complete (T-006) |
| [`ocr-quality-samples.md`](ocr-quality-samples.md) | Quality assessment from sampled OCR pages and PNG screenshots | ✅ Complete (T-007, T-008, T-009) |

---

## Variant Code Catalogs

| Index File | Description | Status |
|------------|-------------|--------|
| [`variant-catalog.md`](variant-catalog.md) | All H-series variant codes (H22A–H22A8, H22Z1, H23A) and F-series codes (F22A1, F20B, F20C) found in local materials | ✅ Complete (T-013, T-014) |

---

## ECU & Wiring References

| Index File | Description | Status |
|------------|-------------|--------|
| [`ecu-references.md`](ecu-references.md) | ECU part numbers, connector pinouts, wiring harness references from local manuals | ✅ Complete (T-015) |

---

## Tooling & Configuration

| Item | Description | Status |
|------|-------------|--------|
| Tavily MCP | Web search and content extraction tool | ⏳ Pending (T-021 – T-023) |
| Playwright MCP | Browser automation for JS-rendered sites | ⏳ Pending (T-024 – T-027) |
| Tools Reference | Comprehensive tool capabilities document | ⏳ Pending (T-028) |

---

## H-Series Research

Research files for Honda H-series engines (H22A, H22A1–H22A8, H22Z1, H23A).
Each subdirectory below will contain one or more research markdown files following the template in `research/template.md`.

### Development History

> Planned topics: origins, design goals, FRM technology, engineering targets, market introduction, production timeline, discontinuation.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/development/` | H-series development history and timeline | ✅ Complete (T-031) |

| File | Description | Status |
|------|-------------|--------|
| [`h-series-origins-architecture.md`](../h-series/development/h-series-origins-architecture.md) | Honda H-series engine family origins, F-series derivation, design goals, timeline, racing heritage | ✅ T-031 (2026-05-15) |
| [`h-series-development-timeline-1989-1991.md`](../h-series/development/h-series-development-timeline-1989-1991.md) | H-series development timeline 1989–1991: NCE program, VTEC maturation, Kajitani's 100hp/liter target, prototype testing, FRM liner selection, fourth-gen Prelude integration | ✅ T-032 (2026-05-15) |
| [`h-series-f-series-derivation.md`](../h-series/development/h-series-f-series-derivation.md) | H-series derivation from F-series architecture: shared components, bore spacing, FRM vs cast iron sleeves, H22A vs F20B/F22B comparison, evolution path, racing legacy | ✅ T-033 (2026-05-15) |
| [`h-series-engine-strategy.md`](../h-series/development/h-series-engine-strategy.md) | H-series position in Honda's engine strategy: comparison against B-series, F-series, and K-series; portfolio positioning matrix; non-cannibalization strategy; K-series planning timeline | ✅ T-034 (2026-05-15) |
| [`h-series-vtec-philosophy.md`](../h-series/development/h-series-vtec-philosophy.md) | Honda's DOHC VTEC philosophy in the early 1990s: market positioning, technology race against Toyota VVTL-i / Nissan SR20DET / Mazda rotary / Subaru boxer, VTEC as brand identity, NA vs turbo corporate strategy | ✅ T-035 (2026-05-15) |
| [`frm-liner-technology.md`](../h-series/development/frm-liner-technology.md) | FRM (Fiber-Reinforced Metal) cylinder liner technology: Saffil alumina fiber MMC composition, 1990 B21A1 origin, technical properties, benefits, oil consumption limitations, aftermarket resleeving solutions (RS Machine, Darton, Golden Eagle) | ✅ T-036 (2026-05-15) |
| [`h-series-aluminum-block.md`](../h-series/development/h-series-aluminum-block.md) | H-series aluminum block casting process and materials science: sand casting vs HPDC, A356-class alloy, T6 heat treatment, cooling channel design, porosity control, closed-deck to open-deck evolution, F-series comparison, FRM in-situ formation | ✅ T-037 (2026-05-15) |
| [`h-series-engineering-targets.md`](../h-series/development/h-series-engineering-targets.md) | H-series engineering targets: 100 hp/liter mandate from Kawamoto, power density by variant, VTEC durability testing (400K switching events), emissions compliance by market (Euro 1/2, US Tier 1, Japan New Long-Term), cost positioning vs B-series, reliability requirements and materials | ✅ T-038 (2026-05-15) |
| [`h-series-vs-competitors.md`](../h-series/development/h-series-vs-competitors.md) | H-series vs competitor engines in early 1990s: Toyota 3S-GE (Gen 2/3), Mazda 13B rotary family (DEI/T/REW), Subaru EJ22 (E/T variants); side-by-side spec comparison, technology leadership assessment, strategic analysis of competitive advantages and weaknesses | ✅ T-039 (2026-05-15) |
| [`h-series-4ws-integration.md`](../h-series/development/h-series-4ws-integration.md) | Honda four-wheel steering (4WS) integration with H-series: mechanical 3rd-gen vs electronic 4th/5th-gen systems, why paired with H-series, performance impact (C&D test data), 80% JDM adoption rate, turning radius reduction, lane-change stability, fail-safe operation, DTC codes | ✅ T-040 (2026-05-15) |
| [`h-series-production-timeline.md`](../h-series/development/h-series-production-timeline.md) | H-series production timeline: start date (Sept 1991), production volumes (157,000+ total across all variants), end of production (2001 H22 / 2002 H23 VTEC), manufacturing location (Tochigi Plant Japan), discontinuation factors (price creep, Accord Coupe competition, S2000 arrival, K-series transition) | ✅ T-041 (2026-05-15) |
| [`h-series-4th-gen-prelude-launch-1991.md`](../h-series/development/h-series-4th-gen-prelude-launch-1991.md) | 1991 4th gen Prelude launch: H22/H23 introduction (Si VTEC 200 PS, Type S 220 PS, Si 160 PS, base 135 PS), USDM pricing ($15,205–$18,750), market reception (Car and Driver Ten Best 1992–1998, sales decline from 160,909 to 98,627 units), electronic 4WS, fixed headlights, Tokyo skyline dash design | ✅ T-042 (2026-05-15) |
| [`h-series-north-american-introduction.md`](../h-series/development/h-series-north-american-introduction.md) | 1993 USDM Prelude VTEC: H22A1 first DOHC VTEC in America, marketing strategy, dealer training context, performance testing (C&D 6.9s 0-60, R&T 7.1s), pricing (~$23,000), critical reception, VTEC system architecture, transmission gear ratios, features comparison vs Si | ✅ T-043 (2026-05-15) |
| [`h-series-european-market-introduction.md`](../h-series/development/h-series-european-market-introduction.md) | H-series European market introduction (EDM): UK/European Prelude BB1/H22A2 (185 PS, 1992-1996), BB6/H22A5-H22A8 (185-200 PS, 1997-2001), Accord Type R CH1/H22A7 (212 PS, 1998-2002), pricing, dealer networks, emissions detuning, Swindon UK manufacturing, current values | ✅ T-044 (2026-05-15) |
| [`h-series-jdm-market-strategy.md`](../h-series/development/h-series-jdm-market-strategy.md) | H-series Japanese domestic market strategy: SiR model hierarchy (Si → Si VTEC → Si R S-spec → Type S), Honda Verno/Clio/Primo three-channel dealership system, Type S as performance apex (220 PS Redtop, 11.0:1 CR, Dynamic Chambering intake), Accord Euro R/Torneo Euro R extension, JDM-exclusive features vs USDM/EDM, serial code identification guide | ✅ T-045 (2026-05-15) |
| [`h-series-production-locations.md`](../h-series/development/h-series-production-locations.md) | H-series production locations: Tochigi Plant Japan (primary), Swindon UK HUM (vehicle assembly + engine casting capability, H22A7 origin uncertain), Anna Engine Plant Ohio (2.2L Accord engine milestone but likely F22B not H-series), Suzuka Factory Japan (no confirmed H-series production) | ✅ T-046 (2026-05-15) |
| [`h-series-supply-chain.md`](../h-series/development/h-series-supply-chain.md) | H-series supply chain: component suppliers (Honda Foundry Co. Ltd., Musashi Seimitsu Industry, Honda Trading Aluminum Corp.), casting methods (GDC/LPDC/HPDC), internal manufacturing (Tochigi Plant, Suzuka Factory, Saitama Factory), external Tier 1 suppliers, aftermarket ecosystem (Mahle, Golden Eagle, RS Machine), FRM liner technology supply chain (SAE 910835) | ✅ T-047 (2026-05-15) |
| [`h-series-cost-analysis.md`](../h-series/development/h-series-cost-analysis.md) | H-series cost analysis: estimated BOM ($1,599-$2,485 long block + accessories), pricing vs B-series ($5,000-$8,000 vehicle premium), aftermarket/engine pricing history, Honda margin strategy (3-7% operating margin in 1990s, lean manufacturing advantage, volume-driven profitability), per-unit cost differential H vs B series (+$140-$210) | ✅ T-048 (2026-05-15) |
| [`h-series-discontinuation.md`](../h-series/development/h-series-discontinuation.md) | H-series discontinuation: why replaced by K-series (K20/K24), FRM liner maintenance costs, i-VTEC technology gap, EPA Tier 2/California LEV emissions pressures, physical size limitations, F20C as technological bridge, timeline 1991–2001 | ✅ T-049 (2026-05-15) |
| [`h-series-legacy-transition-to-k-series.md`](../h-series/development/h-series-legacy-transition-to-k-series.md) | H-series legacy: transition to K20/K24, technology carryover via F20C bridge, VTEC→i-VTEC evolution, enthusiast retention through forums/JDM imports/aftermarket, Honda Heritage Works 2026 OEM recognition, cultural impact on import scene | ✅ T-050 (2026-05-15) |
| [`h-series-production-numbers-by-variant.md`](../h-series/development/h-series-production-numbers-by-variant.md) | H-series production numbers by variant and year: 4th gen (98,627), 5th gen (58,118), CH1 Accord Type R (3,789 total / 2,081 UK), CL1 Euro R (<2,000), US sales data (2002: 1,966 / 2003: 10), engine block serial code ranges, registration statistics, survival rates | ✅ T-051 (2026-05-15) |
| [`h-series-environmental-compliance.md`](../h-series/development/h-series-environmental-compliance.md) | H-series environmental compliance: emissions standards met (Japan 10-15 mode, EPA Tier-0/Tier-1, Euro 1/Euro 2), three-way catalytic converter technology (Pt/Pd/Rh composition, substrate design, light-off temperature, metallic vs ceramic), engine-integrated emissions systems (EGR, PCV, EVAP, SAIS), regional hardware variations by market and OBD version, CARB Executive Order A-23-154 certification data | ✅ T-054 (2026-05-15) |
| [`h-series-fuel-economy-ratings.md`](../h-series/development/h-series-fuel-economy-ratings.md) | H-series fuel economy ratings by market and transmission: EPA data (USDM 1993–2001), JC08/10-15 mode (JDM), EU cycle (EDM), Australian combined cycle; manual vs automatic transmission impact (15–25% penalty); real-world owner reports vs official ratings; testing standard comparison (EPA vs JC08 vs EU cycle vs WLTP); H22A7 Accord Euro R anomaly — best economy despite highest output | ✅ T-055 (2026-05-15) |
| [`h-series-nvh-characteristics.md`](../h-series/development/h-series-nvh-characteristics.md) | H-series noise and vibration characteristics: balance shaft system design (belt-driven, 2× crank speed, second-order harmonic cancellation), engine mount strategy (multi-point hydraulic/polyurethane, subframe two-stage isolation), acoustic treatment (hood blanket, pillar foam, door panel damping), exhaust NVH by variant (Redtop 57mm vs Blacktop 51mm), VTEC engagement sound character, intake noise management, cabin refinement rating, K-series comparison | ✅ T-056 (2026-05-15) |
| [`h-series-cold-weather-operation.md`](../h-series/development/h-series-cold-weather-operation.md) | H-series cold weather operation: startup behavior (oil pressure spike 60-100 psi cold, decay to 15-25 psi warm), service manual specs (10 psi idle / 50 psi @ 3K rpm at 80°C), VTEC engagement in cold conditions (30 psi oil / 40°C coolant thresholds), warm-up procedure recommendations (30 sec idle + gentle driving), block heater guidance, FRM liner thermal characteristics, oil viscosity recommendations (5W-30 standard), cold-start maintenance intervals | ✅ T-057 (2026-05-15) |
| [`h-series-hot-weather-operation.md`](../h-series/development/h-series-hot-weather-operation.md) | H-series hot weather operation: cooling system capacity (7.0L total, 2-row aluminum radiator 27.4×17.8×2.47in), thermostat specs (82°C opening / 95°C full open, part 19300-PB2-013), dual electric fan control (puller + pusher, activation 92-98°C, temp switch M16-1.50), normal operating temperature (80-95°C / 175-205°F), overheating causes and diagnostics, safe bleeding procedure, hot climate maintenance intervals, aftermarket cooling upgrades | ✅ T-058 (2026-05-15) |
| [`h-series-altitude-performance.md`](../h-series/development/h-series-altitude-performance.md) | H-series altitude performance: naturally aspirated power loss (~3% per 1,000 ft elevation gain), Honda ECU adaptation via MAP + BARO dual-sensor compensation, fuel octane considerations at altitude, aftermarket tuning solutions (chip tuning, standalone ECUs, forced induction), practical impact by variant (Redtop, Blacktop, USDM, EDM) at Denver/Leadville/Pikes Peak elevations | ✅ T-059 (2026-05-15) |
| [`h-series-development-team.md`](../h-series/development/h-series-development-team.md) | H-series development team: chief engineers (Ikuo Kajitani "Father of VTEC" LPL, Nobuhiko Kawamoto R&D President), key designers (Yukio Kurosu 4th-gen Prelude), corporate sponsors (Mugen Motorsports Hirotoshi Honda/Masao Kimura, Neil Brown Engineering BTCC/JTCC partner), organizational structure, known gaps in documentation | ✅ T-061 (2026-05-15) |
| [`h-series-patents-ip.md`](../h-series/development/h-series-patents-ip.md) | H-series patents and intellectual property: VTEC patent family (US 5,103,809 / 5,239,998 / 5,383,417 / 5,787,863 / 6,968,819), FRM liner trade secret status, ATTS trademark protection, PGM-FI proprietary management, competitor VVT systems comparison, trademark enforcement history, IP protection strategy summary | ✅ T-062 (2026-05-15) |
| [`h-series-homologation-racing-eligibility.md`](../h-series/development/h-series-homologation-racing-eligibility.md) | H-series homologation requirements: racing series eligibility (NASA Honda Challenge H2/H4, SCCA TT/Solo, FIA Historic, SVRA Group 12, HSR GTU), factory-backed racing (European F3, BTCC, JTCC), special edition approvals (JDM SiR.S spec, Type S, USDM Type SH, EDM VTi-S, Accord Type R), emissions compliance by market, modern Prelude special editions (2024+ ON Limited Edition, Limited Edition), FIA homologation forms (5837, 5357, 5351, 5291, 5153, 307, 308) | ✅ T-063 (2026-05-15) |
| [`h-series-crash-safety-integration.md`](../h-series/development/h-series-crash-safety-integration.md) | H-series crash safety integration: engine mounting (longitudinal subframe/crossmember layout, front/rear/transmission mounts, traction bar), collapse zones (4th gen 4440mm vs 5th gen 4520mm dimensions, crumple zone evolution, pop-up to fixed headlight transition), pedestrian safety (Honda POLAR II dummy, 1998+ fender-to-frame spacing, breakaway wiper pivot, hood hinge redesign), crash test ratings (Australia RTA "average" → "significantly better than average", NHTSA no formal tests, IIHS no tests), airbag deployment issues (NHTSA complaint database, premature and failure-to-deploy), ball joint recall 99V069000, ignition switch recalls 02V120000/05V025000 | ✅ T-064 (2026-05-15) |

### Technical Specifications

> Planned topics: block dimensions, bore/stroke, displacement, compression ratios, power density, external dimensions, sensor complement.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/specifications/` | Detailed technical specifications by parameter | ✅ Active (T-071+) |

| File | Description | Status |
|------|-------------|--------|
| [`h-series-block-dimensions.md`](../h-series/specifications/h-series-block-dimensions.md) | H-series block dimensions: deck height (219.5mm), bore spacing (90mm), cylinder center-to-center distances, bore (87mm), stroke (90.7mm), rod length (143mm), piston compression height (31mm), main journal evolution (50mm→55mm), bearing dimensions, closed-deck vs open-deck transition | ✅ T-071 (2026-05-15) |
| [`h-series-block-materials.md`](../h-series/specifications/h-series-block-materials.md) | H-series block materials: aluminum alloy grade (A356-class), FRM liner composition (Saffil alumina + carbon fiber MMC), sand casting process, porosity control, T6 heat treatment, closed-deck to open-deck evolution, F-series comparison | ✅ T-072 (2026-05-15) |
| [`h-series-deck-designs.md`](../h-series/specifications/h-series-deck-designs.md) | H-series closed deck vs open deck designs: 1992–1996 closed deck (H22A/H22A1/H22A2), 1997–2001 open deck (H22A4/H22A5/H22A8), structural implications for boost, rigidity differences, engineering rationale for transition, main journal correlation (50mm→55mm), community perspectives, failure mode analysis | ✅ T-073 (2026-05-15) |
| [`h-series-main-bearing-support.md`](../h-series/specifications/h-series-main-bearing-support.md) | H-series main bearing support: 5-bolt cap design, main journal diameter evolution (50mm 1992–1997 → 55mm 1998+), bearing thickness/color selection system (Blue through Red), bearing clearance calculation formula, thrust washer specs, stiffness implications (52% increase in flexural rigidity), aftermarket bearing options (King, ACL, Mahle), block-to-crank compatibility matrix | ✅ T-074 (2026-05-15) |
| [`h-series-cylinder-bore.md`](../h-series/specifications/h-series-cylinder-bore.md) | H-series cylinder bore dimensions: 87.0mm nominal bore, manufacturing tolerance band (87.010–87.020mm), service limit (87.07mm), taper/out-of-round limits (0.25mm), 60° cross-hatch honing pattern, FRM-specific honing procedure (The Wrench service pub), surface finish targets (Ra 15–25 µin moly rings), reconditioning procedures, oversize piston options, piston-to-wall clearance | ✅ T-075 (2026-05-15) |
| [`h-series-stroke-dimensions.md`](../h-series/specifications/h-series-stroke-dimensions.md) | H-series stroke dimensions: 90.7mm stroke, rod ratio 1.58:1, piston velocity calculations at operating speeds (mean and peak), competitor comparison table (14 engines), side loading analysis, implications for boosting and stroking, H22A vs H23A stroke comparison | ✅ T-076 (2026-05-15) |
 | [`h-series-displacement.md`](../h-series/specifications/h-series-displacement.md) | H-series displacement calculation: 2,157cc mathematical derivation (π × r² × S × 4), tolerance bands (±0.5 cc bore, ±1.2 cc stroke, combined ±1.5 cc), actual measured piston volumes (86.97–86.99 mm), dome volumes by variant (−9.9 cc to +4.3 cc), H22A vs H23A differential (102.2 cc), theoretical airflow comparisons vs B18C/K20A/F20C | ✅ T-077 (2026-05-15) |
 | [`h-series-crankcase-volume.md`](../h-series/specifications/h-series-crankcase-volume.md) | H-series crankcase volume: oil capacity specs (3.8 L drain-and-refill / 4.0 L with filter / 5.1 US qt practical fill / 6.2 L total capacity), windage tray/baffle plate design (OEM part 11221-P5L-010), scavenging efficiency (wet-sump architecture), OBD1 alloy sump vs OBD2 standard pan differences, aftermarket baffled pans (Moroso, 1320 Performance), crankcase volume estimation, oil distribution at operating condition | ✅ T-078 (2026-05-15) |
 | [`h-series-block-rigidity.md`](../h-series/specifications/h-series-block-rigidity.md) | H-series block rigidity: structural stiffness analysis, FEA data availability (Honda proprietary — no published values), general aluminum block FEA material properties (A356: E=70–72 GPa, G=26–27 GPa), closed vs open deck rigidity comparison, FRM liner strength contribution, real-world boost limits from community testing, reinforcement methods (sleeving, block guards, ARP head studs), competitor block comparison (4G63, EJ25, N54/N55) | ✅ T-079 (2026-05-15) |
| [`h-series-balancing-system.md`](../h-series/specifications/h-series-balancing-system.md) | H-series balancing system: belt-driven counter-rotating balance shafts (2× crank speed), crankshaft counterweight design (profiled for windage reduction), harmonic balancer (OEM rubber damper / ATI Super Damper 918468), secondary imbalance theory (Lanchester solution), inline-4 vibration frequency analysis, balance shaft removal mod analysis (7–10 HP gain, ~8 lbs weight reduction), aftermarket eliminators (KS Tuned, KaizenSpeed, 1320 Performance), F-series compatibility, complete parts reference with OEM part numbers | ✅ T-080 (2026-05-15) |
| [`h-series-oil-gallery-layout.md`](../h-series/specifications/h-series-oil-gallery-layout.md) | H-series oil gallery layout: main galley routing from sump through block to head, VTEC-specific oil passages including solenoid assembly and internal head galleries, piston oil squirters (cooling jets) and their locations/orifices, oil pressure specifications with expected pressure drops across the system, oil orifice function and failure modes | ✅ T-081 (2026-05-15) |
| [`h-series-water-jacket-design.md`](../h-series/specifications/h-series-water-jacket-design.md) | H-series water jacket design: coolant flow paths from water pump through block and head jackets to thermostat and radiator, heating/cooling zone stratification, hot spot management strategies, complete cooling system component complement (water pump, thermostat, radiator, fans, heater core), bleed procedure, known failure modes | ✅ T-082 (2026-05-15) |
| [`h-series-head-bolt-specifications.md`](../h-series/specifications/h-series-head-bolt-specifications.md) | H-series head bolt specifications: M10 × 1.25 mm torque-to-yield bolts, three-step torque sequence (29 → 51 → 72 lb-ft), center-out spiral pattern, ARP aftermarket head stud kits (252-6201 through 252-6205), stretch specs, yield point calculations, cylinder head warpage limit (0.05 mm) | ✅ T-083 (2026-05-15) |
| [`h-series-engine-weight.md`](../h-series/specifications/h-series-engine-weight.md) | H-series engine weight: dry weight (long block ~385 lbs / 175 kg), fluid-filled weight estimate (~408 lbs with oil + coolant), fully dressed installed weight (MotorTrend HaSport 485 lbs complete drivetrain), component weight breakdown (transmission 102 lbs, flywheel 20-22 lbs, alternator 10-12 lbs), vehicle-level weight distribution (4th gen 58/42, 5th gen 62-63/37-38), engine mounting points (three-point system with bolt sizes/parts numbers), external dimensions | ✅ T-084 (2026-05-15) |
| [`h-series-external-dimensions.md`](../h-series/specifications/h-series-external-dimensions.md) | H-series external dimensions: core block/head dimensions (block height 219.5 mm, bore spacing 98 mm), overall engine envelope (20.5" × 14" × 21" core / 22" × 22" × 12" accessorized), accessory packaging details (alternator, starter, PS pump, A/C compressor locations), transverse-mount layout analysis, hood clearance considerations, cross-reference dimension comparison with B-series/K-series/F20C engines | ✅ T-085 (2026-05-15) |
| [`h-series-power-density.md`](../h-series/specifications/h-series-power-density.md) | H-series power density: HP per liter (85.8–102.0 HP/L across variants), torque per liter (95.5–102.5 Nm/L), complete variant-by-variant breakdown (H22A2 through H22A Redtop Type S), comparison to contemporaries (K20A, B16A/B18C, F20C, 3S-GE, EJ20G, BMW M3 S50B32), specific output analysis, historical context in 1990s engine development | ✅ T-086 (2026-05-15) |
| [`h-series-thermal-efficiency.md`](../h-series/specifications/h-series-thermal-efficiency.md) | H-series thermal efficiency: brake thermal efficiency (28–32% peak BTE), heat rejection breakdown (exhaust ~31%, cooling ~18%, friction ~7%), BSFC estimation methodology, variant-by-variant BTE comparison, contemporary NA inline-4 comparisons, theoretical Otto cycle vs actual efficiency analysis | ✅ T-088 (2026-05-15) |
| [`h-series-friction-losses.md`](../h-series/specifications/h-series-friction-losses.md) | H-series friction losses: piston ring friction (30–40% of total FMEP), bearing friction (main 8.6% + rod 4.8%), windage losses (7.7%), pumping losses (7% part load / 1% full load); complete specs for ring gaps, bearing clearances, baffle plates, VTEC effect on pumping; total friction breakdown table with per-component percentages | ✅ T-089 (2026-05-15) |
| [`h-series-compression-ratios.md`](../h-series/specifications/h-series-compression-ratios.md) | H-series compression ratio variations: 10.0:1, 10.6:1, 11.0:1 variants mapped to piston crown shapes (dish -1.8 cc, small dome ~+0.1 cc, dome +4.2 cc); market strategy behind CR differentiation; fuel octane requirements by variant; effective volume vs physical shape; conflicts and ambiguities (H22Z1 Australian variant owner's manual discrepancy) | ✅ T-090 (2026-05-15) |
| [`h-series-combustion-chamber-design.md`](../h-series/specifications/h-series-combustion-chamber-design.md) | H-series combustion chamber design: pent-roof shape architecture, valve angles (35 mm intake / 30 mm exhaust, inferred 30-45-60° three-angle valve job), tumble generation mechanism (four-valve opposing flow fields), swirl characteristics (secondary to tumble in 4V design), squish/quench area design (recessed pads to bore OD), spark plug placement (central apex), factory porting differences (Redtop light porting vs Blacktop as-cast), thermal efficiency impact (+1–2% vs hemi), competitor comparison table | ✅ T-091 (2026-05-15) |
| [`h-series-intake-port-design.md`](../h-series/specifications/h-series-intake-port-design.md) | H-series intake port design: runner length by manifold type (dual-runner stock ~140–150 mm primary, single-runner Redtop/Euro R ~145–160 mm), cross-sectional area progression (throttle body 28.3–30.7 cm² → runner exit ~20–22 cm² → bowl 28–32 cm²), flow coefficients (OEM ~180–200 CFM at .500" lift, CNC aftermarket up to 360 CFM), mean flow velocity profiles (optimal ~240 ft/sec at peak torque), butterfly valve operation (~4800 RPM), center divider role, surface finish effects | ✅ T-092 (2026-05-15) |
| [`h-series-exhaust-port-design.md`](../h-series/specifications/h-series-exhaust-port-design.md) | H-series exhaust port design: runner length by variant (Redtop improved OEM, Blacktop standard, Euro R 4-2-1), cross-sectional area progression from exhaust valve through port entry to flange, flow coefficients (OEM ~100–120 CFM at .400" lift, CNC aftermarket 280+ CFM), heat management characteristics (catalyst light-off proximity, thermal properties, exhaust gas temperature profiles), manifold comparison table | ✅ T-093 (2026-05-15) |
| [`h-series-throttle-body-sizes.md`](../h-series/specifications/h-series-throttle-body-sizes.md) | H-series throttle body sizes: 60 mm stock (all variants except Redtop), 62.5 mm Redtop-specific, aftermarket upgrade path (68/70/74 mm billet), airflow calculations (CFM formulas, mean flow velocity), cross-sectional area analysis, OEM part numbers, community tuning recommendations, 57 mm clarification (exhaust system diameter, not TB size) | ✅ T-094 (2026-05-15) |
| [`h-series-exhaust-system-diameters.md`](../h-series/specifications/h-series-exhaust-system-diameters.md) | H-series exhaust system diameters: 51 mm Blacktop vs 57 mm Redtop/Euro, backpressure calculations by pipe diameter, muffler design types (straight-through vs chambered vs resonator), mandrel vs crush bend analysis, material selection (stainless vs aluminized steel), aftermarket diameter recommendations by build level | ✅ T-095 (2026-05-15) |
| [`h-series-intake-manifold-designs.md`](../h-series/specifications/h-series-intake-manifold-designs.md) | H-series intake manifold designs: dual runner vs single runner architecture comparison, plenum volume specifications (stock ~3.5–4.0 L to aftermarket 5–7 L), runner length data (OEM ~140–160 mm, Skunk2 ~285–298 mm), performance trade-offs, aftermarket options (Skunk2 Pro Series, Golden Eagle, Rosko Racing modified Euro R, K-series RBC/RRC), IAB butterfly system detail, thermal management considerations | ✅ T-096 (2026-05-15) |
| [`h-series-flywheel-clutch-specifications.md`](../h-series/specifications/h-series-flywheel-clutch-specifications.md) | H-series flywheel and clutch specifications: OEM steel flywheel (~15-18 lbs), lightweight aftermarket options (JUN 11.5 lbs, CompClutch 9-11.5 lbs, ACT 12.6 lbs, Action Clutch 11.5 lbs), bolt pattern 6-bolt, pilot bearing 91006-634-008, torque specs (76 ft-lb flywheel / 19 ft-lb pressure plate), Exedy OEM/Stage 1/Stage 2 clutch kits, ACT/Competition Clutch/SPEC/RPM/OSGIKEN aftermarket options, engagement characteristics by material, application compatibility matrix, SFI certifications, supplier directory | ✅ T-097 (2026-05-15) |
| [`h-series-alternator-starter.md`](../h-series/specifications/h-series-alternator-starter.md) | H-series alternator and starter motor specs: Denso alternator 95–100 A stock rating (OBD1: 31100-P14-A01/A02, OBD2: 31100-PK1-014), aftermarket 135–200 A options (Mr. Alternator, Power Bastards); Mitsuba PMOSGR starter ~1.4 kW with 9-tooth pinion (OBD1: 31200-P13-903/904/905/906, OBD2: 31200-P5M-901/31200-P13-905→907), mounting details, gear reduction architecture, swap relocator brackets | ✅ T-098 (2026-05-15) |
| [`h-series-accessory-drive.md`](../h-series/specifications/h-series-accessory-drive.md) | H-series accessory drive: power steering pump (OBD1: 56110-P11-010/020, OBD2: 56100-PK1-050 / 06561-P5M-505RM), A/C compressor (OBD1: 38810-P13-006, OBD2: 38810-P5M-006 / 38810-PK1-024), bracket design differences between generations, belt routing (two-belt OBD1 vs single serpentine OBD2), crank pulley rib count (5 vs 6), cross-generation compatibility matrix | ✅ T-099 (2026-05-15) |
| [`h-series-sensor-complement.md`](../h-series/specifications/h-series-sensor-complement.md) | H-series sensor complement: all 18+ sensors listed with OEM part numbers (TPS 16046, MAP 22694, IAT 37410, ECT 32690, CKP 37500/37840, CMP 33500, knock 30530, HO2S 34520/34550, VSS 33730), signal types, operating ranges, ECU connector pinouts (OBD1 24-pin + 14-pin round / OBD2 32-pin A + 31-pin C + 16-pin D), cross-platform compatibility with B/D/F/K series | ✅ T-100 (2026-05-15) |
 | [`h-series-firing-order-and-cylinder-numbering.md`](../h-series/specifications/h-series-firing-order-and-cylinder-numbering.md) | H-series firing order 1-3-4-2, cylinder numbering front-to-rear (cylinder 1 at timing-belt side), single-bank inline-4 configuration, distributor rotation clockwise, four-stroke cycle analysis, header pairing implications, comparison with other Honda inline-4 families (B/D/Z/H/K/F) | ✅ T-101 (2026-05-15) |
 | [`h-series-timing-marks-and-alignment.md`](../h-series/specifications/h-series-timing-marks-and-alignment.md) | H-series timing marks and alignment: crankshaft pulley TDC mark location and torque (245 N·m / 181 lb-ft), camshaft sprocket "t" marks at 12 o'clock, balance shaft pulley alignment (front groove + rear 6×100mm bolt), timing belt tensioner reference positions (auto vs H23 manual conversion), complete installation sequence per Helms manual, valve adjustment "t"/"t*" mark sequencing, comparison with B/D/K/F series timing conventions | ✅ T-102 (2026-05-15) |
 | [`h-series-oil-specification.md`](../h-series/specifications/h-series-oil-specification.md) | H-series oil specification: viscosity grades (10W-30 standard, 5W-30 cold), capacity by variant and generation (OBD1 4.8L / OBD2 4.8–5.1L), OEM filter part numbers (15400-PLM-A02), aftermarket equivalents (WIX 51334/51344, AMSOIL EA15K20, Hamp HP10Z), drain plug torque (33 ft-lb), performance oil recommendations | ✅ T-103 (2026-05-15) |
 | [`h-series-coolant-specification.md`](../h-series/specifications/h-series-coolant-specification.md) | H-series coolant specification: Honda Type 2 blue non-silicate ethylene glycol, cooling system capacity (~6.05–7.5 L), mixture ratio (50/50 pre-mixed), thermostat opening (82 °C / 180 °F), full open (90–95 °C / 194–203 °F), normal operating temp (190–210 °F stock), radiator cap pressure (1.1 bar / 16 psi), electric fan control, bleeding procedure, service interval | ✅ T-104 (2026-05-15) |
 | [`h-series-spark-plug-specifications.md`](../h-series/specifications/h-series-spark-plug-specifications.md) | H-series spark plug specifications: OEM part numbers (NGK ZFR5F-11/ZFR6F-11, Denso KJ16CR-L11), physical dimensions (14mm thread, 1.25mm pitch, 19mm reach, 16mm hex), gap specs (1.0–1.1 mm standard, 1.3 mm service limit), heat range (NGK #6 stock, #7 colder for boost), torque (18 N·m / 13 lb·ft), replacement interval (30,000 miles / 2 years), platinum tip maintenance, troubleshooting guide | ✅ T-105 (2026-05-15) |
| [`h-series-valve-spring-specifications.md`](../h-series/specifications/h-series-valve-spring-specifications.md) | H-series valve spring specifications: free length (OBD1: 42.83 mm; OBD2 IN outer 45.16 mm, IN inner 41.78 mm, EX outer 46.72 mm), installed height (OBD1: 38.53 mm; OBD2 IN 36.96–38.18 mm, EX 37.97–39.24 mm), coil bind (Honda-Tech measured: outer 23.37 mm, inner 18.67 mm), seat/open pressure data (none measured on stock — critical gap documented), aftermarket comparison matrix (Manley, Brian Crower, Supertech, Skunk2), spring orientation note (close-wound end toward head), surge frequency data completely absent from all sources | ✅ T-106 (2026-05-15) |
| [`h-series-bearing-clearances.md`](../h-series/specifications/h-series-bearing-clearances.md) | H-series bearing clearances: main bearing-to-journal oil clearance per journal position (No. 1–5), rod bearing-to-journal clearance by variant (F22A1 vs H22A4), crankshaft thrust clearance/end play, thrust washer color selection, Plastigage measurement procedure, aftermarket HX clearance options, cross-series compatibility (B/D/H/K/F) | ✅ T-107 (2026-05-15) |
| [`h-series-piston-to-wall-clearance.md`](../h-series/specifications/h-series-piston-to-wall-clearance.md) | H-series piston-to-wall clearance: skirt clearance (0.010–0.040 mm standard), ring gap specs (top 0.20–0.35 mm, second 0.40–0.55 mm, oil 0.20–0.70 mm), crown-to-piston geometry (compression height 31mm, crown volumes −1.9cc to +4.3cc), piston taper/ovality, skirt coatings, aftermarket ring gap recommendations by application | ✅ T-108 (2026-05-15) |
| [`h-series-camshaft-bearing-dimensions.md`](../h-series/specifications/h-series-camshaft-bearing-dimensions.md) | H-series camshaft bearing dimensions: direct-fit architecture (no replaceable half-shells), oil clearance 0.020–0.050 mm / 0.0008–0.0020 in, service limit 0.060 mm / 0.0024 in, cap bolt torque specs (27 N·m / 9.8 N·m), Plastigage measurement procedure, head repair methods (shaving + align-hone, custom inserts) | ✅ T-109 (2026-05-15) |
| [`h-series-oil-pump.md`](../h-series/specifications/h-series-oil-pump.md) | H-series oil pump specifications: gerotor (internal gear) design, OEM part numbers by generation (15100-P13-SSR OBD1 / 15100-P5M-A01 OBD2), rotor geometry, pressure relief valve assembly (15231-PE0-000 / 15232-R70-A01), factory oil pressure specs (10 psi idle min / 50 psi @ 3K RPM), aftermarket upgrades (ProDrive billet gear, ACL Race, 4P ported pump), known failure modes (gear shatter, cavitation, oil starvation) | ✅ T-110 (2026-05-15) |
| [`h-series-water-pump.md`](../h-series/specifications/h-series-water-pump.md) | H-series water pump specifications: centrifugal design, timing belt-driven, OEM part number 19200-P13-003, flow rate 142.5 L/min @ 6,000 RPM (Helms manual primary spec), aluminum impeller, steel bearing sealed for life, replacement interval tied to timing belt service, weep hole diagnostic feature, aftermarket equivalents (GMB 135-1330, Gates 41046, Aisin) | ✅ T-111 (2026-05-15) |
| [`h-series-timing-belt-specifications.md`](../h-series/specifications/h-series-timing-belt-specifications.md) | H-series timing belt specifications: main belt (155 teeth, 24mm width, urethane OEM 14400-P13-014), balance shaft belt (70 teeth, 16mm width, rubber 13405-PT0-004), Gates Racing T226RB aftermarket, OBD1 hydraulic vs OBD2 spring-loaded tensioner, H23 manual conversion kit, replacement interval 60K–90K miles, cross-platform compatibility matrix | ✅ T-112 (2026-05-15) |
| [`h-series-fuel-system.md`](../h-series/specifications/h-series-fuel-system.md) | H-series fuel system specifications: rail pressure by generation (OBD1 33–40 psi / OBD2 39–44 psi), injector flow rates and types (OBD1 peak-and-hold 330–345 cc @ 33–40 psi / OBD2 saturated 290 cc @ ~54 psi), OEM and aftermarket fuel pump capacity (stock 150 L/hr min / AEM 340 LPH / Walbro 255 LPH), diaphragm-type vacuum-referenced FPR integrated on rail, fuel filter location and service interval, tuning implications and power limit analysis, injector upgrade path by build stage | ✅ T-113 (2026-05-15) |
| [`h-series-ignition-system.md`](../h-series/specifications/h-series-ignition-system.md) | H-series ignition system specifications: OBD1 distributor-based ignition (internal coil Hitachi/TEC, part 30100-P13-006, dwell 3.6–4.1 ms, current 5.5–7.5 A) vs OBD2 distributorless wasted-spark coil pack (NGK 49046, external TEC coil, dwell 3.6–4.1 ms, current 6.75–8.75 A), base timing 15° ± 2°, no factory COP, Hondata CPR retrofit for COP conversion, high-RPM dwell limitation analysis, spark energy calculations, advance curve from Scanguage data | ✅ T-114 (2026-05-15) |
| [`h-series-idle-speed.md`](../h-series/specifications/h-series-idle-speed.md) | H-series idle speed specifications: RPM targets by variant and transmission (OBD1 650–750 rpm / OBD2 700 ± 50 rpm), IACV control range and duty cycle operation, base idle setting procedures (OBD1 bypass screw vs OBD2 closed-loop learning), fast idle thermo valve (FITV) function, ECM idle adaptation logic, decel fuel cut interaction, diagnostic procedures and DTC reference | ✅ T-115 (2026-05-15) |
 | [`h-series-redline-specifications.md`](../h-series/specifications/h-series-redline-specifications.md) | H-series redline specifications: rev limiter strategy (hard fuel cut), shift window recommendations, overrev protection mechanisms including stationary speed-based limiter (6,500 rpm M/T / 5,500 rpm A/T when stationary), variant-specific redline figures (7,200–8,000 rpm), tachometer accuracy at high RPM, aftermarket ECU modifications | ✅ T-116 (2026-05-15) |
 | [`h-series-vtec-engagement-parameters.md`](../h-series/specifications/h-series-vtec-engagement-parameters.md) | H-series VTEC engagement parameters: five ECU conditions (RPM 5,200–5,500, oil pressure 30+ psi, vehicle speed >5 km/h, coolant >40°C, throttle >20%), VTEC window concept (load-dependent variable crossover), variant-specific differences (OBD1 ~5,200 vs OBD2 ~5,500 rpm), disengagement hysteresis, aftermarket modification range, troubleshooting checklist, P1259 diagnostics | ✅ T-117 (2026-05-15) |

### Engine Variants

> Planned topics: H22A Redtop, H22A Blacktop, H22A1 (USDM), H22A2 (EDM), H22A3 (JDM rare), H22A4 (USDM 5th gen), H22A5–H22A8, H22Z1, H23A.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/variants/` | Per-variant research files (one per variant code) | ✅ T-121 (origin), T-122 (specifications), T-129 (transmission pairing) |

| File | Description | Status |
|------|-------------|--------|
| [`h22a-redtop-jdm-origin.md`](../h-series/variants/h22a-redtop-jdm-origin.md) | H22A Redtop JDM origin: when introduced, which models received it, production years, market exclusivity, applications across Prelude/Accord/Torneo, serial code ranges | ✅ T-121 (2026-05-15) |
| [`h22a-redtop-specifications.md`](../h-series/specifications/h22a-redtop-specifications.md) | H22A Redtop full specifications: 220 PS @ 7200 RPM, 221 Nm @ 6500 RPM, 11.0:1 CR, dome pistons, cam profiles, induction/exhaust, ECU, applications, block serial codes | ✅ T-122 (2026-05-15) |
| [`h22a-redtop-fuel-economy.md`](../h-series/specifications/h22a-redtop-fuel-economy.md) | H22A Redtop fuel economy: JC08 cycle figures (11.6 km/L = 8.6 L/100km for BB6 Type S), real-world consumption data from USDM proxy owners, highway vs city breakdown by market (EPA, JC08, EU cycle, Australian), factors affecting economy (compression ratio, intake design, VTEC engagement) | ✅ T-137 (2026-05-15) |
| [`h22a-redtop-emissions-ratings.md`](../h-series/specifications/h22a-redtop-emissions-ratings.md) | H22A Redtop emissions ratings: NOx, CO, HC, particulate levels across regulatory frameworks (Japan 1991 New Long-Term, Euro 1/2, EPA Tier 0/CARB LEV), emissions control equipment (three-way catalyst, O2 sensors, EGR, PCV, EVAP, secondary air injection), estimated actual emissions vs regulatory limits, certification standards comparison, CO2 context | ✅ T-138 (2026-05-15) |
| [`h22a-redtop-camshaft-profiles.md`](../h-series/specifications/h22a-redtop-camshaft-profiles.md) | H22A Redtop camshaft profiles: 306° intake / 310° exhaust duration, lift values (11.91 mm IN / 11.12 mm EX), overlap (~14°), VTEC vs idle lobe heights, aftermarket comparison (Crower stages) | ✅ T-123 (2026-05-15) |
| [`h22a-redtop-intake-system.md`](../h-series/specifications/h22a-redtop-intake-system.md) | H22A Redtop intake system: dual runner manifold (Prelude Type S/SiR), single runner (Accord Euro R), 62.5 mm throttle body, plenum design, runner length characteristics, IAB butterfly timing (~4,800 RPM), factory porting, aftermarket options | ✅ T-124 (2026-05-15) |
| [`h22a-redtop-exhaust-system.md`](../h-series/specifications/h22a-redtop-exhaust-system.md) | H22A Redtop exhaust system: 57 mm exhaust diameter, header design (stock double-wall cast iron vs aftermarket 4-2-1/4-1), primary/secondary tube diameters, collector sizing, catalytic converter placement in downpipe, O2 sensor location, aftermarket header recommendations by build level | ✅ T-125 (2026-05-15) |
| [`h22a-redtop-head-porting.md`](../h-series/specifications/h22a-redtop-head-porting.md) | H22A Redtop factory head porting: flow numbers (stock ~190–210 CFM intake), port shape (round-to-oval transition, mild short-turn blend), valve job angles (30-45-60° intake / 45° exhaust), surface finish (hand-deburred cast-aluminum), comparison vs Blacktop (no factory porting), aftermarket CNC landscape (4 Piston Racing up to 360 CFM) | ✅ T-126 (2026-05-15) |
| [`h22a-redtop-applications.md`](../h-series/variants/h22a-redtop-applications.md) | H22A Redtop applications: Prelude SiR S-Spec (BB1/BB4 1992–1996), Prelude Type S (BB6 1997–2001), Accord SiR Sedan/Wagon (CD6/CF2 1994–1997), Accord Euro-R/Torneo Euro-R (CL1 1999–2001) — model years, chassis codes, features, sub-trims, cross-application comparison, block serial codes | ✅ T-127 (2026-05-15) |
| [`h22a-redtop-transmission-pairing.md`](../h-series/variants/h22a-redtop-transmission-pairing.md) | H22A Redtop transmission pairing: M2B4/M2A4/M2F4 close-ratio 5-speed gear ratios, final drive (4.266:1), viscous LSD vs helical LSD types, factory and aftermarket LSD options, transmission identification, speed calculations, common issues (5th gear synchro wear), complete H-series transmission code reference table | ✅ T-129 (2026-05-15) |
| [`h22a-redtop-4ws-integration.md`](../h-series/specifications/h22a-redtop-4ws-integration.md) | H22A Redtop four-wheel steering integration: definitive finding that Redtop was never offered with 4WS in any market; Honda 4WS system evolution (mechanical gen 3 → electronic Super 4WS gen 4+); steering ratios (15.75:1 standard, 15.61:1 Type SH); turning circles (4WS ~0.5m improvement); ATTS vs 4WS distinction; chassis code mapping for all 4WS Prelude models | ✅ T-130 (2026-05-15) |
| [`h22a-redtop-atts.md`](../h-series/specifications/h22a-redtop-atts.md) | H22A Redtop Active Torque Transfer System (ATTS): world's first FWD torque-vectoring system on 1997 Prelude Type SH; triple-pinion planetary gear assembly with two hydraulic multi-disc wet clutches; 80:20 max bias ratio, ~15% outer wheel overdrive; MCU architecture, control sensors, ECU communication; fluid specs (1.4 L overhaul / 0.95 L change), DTC codes 61–66; suspension integration (double-joint lower arm, reduced offset 43.7→25 mm); engineering heritage from 1987 test mule to SH-AWD successor | ✅ T-131 (2026-05-15) |
| [`h22a-redtop-suspension.md`](../h-series/specifications/h22a-redtop-suspension.md) | H22A Redtop suspension specifications: strut design (independent double wishbone front/rear, shock fork mounting), spring rates (10.0 kg/mm front, 4.0 kg/mm rear OEM), anti-roll bar sizes (25.4mm front, 23.0mm rear), damper valving (KYB telescopic nitrogen gas-filled, velocity-sensitive fixed), alignment settings, motion ratios, bushings, ATTS integration | ✅ T-132 (2026-05-15) |
| [`h22a-redtop-braking.md`](../h-series/specifications/h22a-redtop-braking.md) | H22A Redtop braking system specifications: caliper design (single-piston sliding, 57.2mm front piston), rotor dimensions (11.1" front ventilated / 10.5" rear solid), pad compound (semi-metallic, ~0.4 CoF), ABS architecture (4-wheel modulator), brake bias analysis (~75/25 front/rear), master cylinder, booster, fluid specs, aftermarket BBK landscape | ✅ T-133 (2026-05-15) |
| [`h22a-redtop-track-day-viability.md`](../h-series/specifications/h22a-redtop-track-day-viability.md) | H22A Redtop track day viability: engine reliability on track (ChampCar 12-hour endurance, JTCC championship), cooling capacity (stock vs upgraded radiator/oil cooler), tire wear patterns (FWD characteristics, track tire recommendations), brake fade resistance (measured rotor temps, upgrade path), real-world track performance data, failure modes under track conditions, track-day readiness checklist | ✅ T-143 (2026-05-15) |
| [`h22a-redtop-autocross-capability.md`](../h-series/specifications/h22a-redtop-autocross-capability.md) | H22A Redtop autocross capability: grip levels (double-wishbone camber control, tire contact patch management, lateral G estimates by setup), turn-in response (15.75:1 steering ratio, torque-sensitive power assist, low 58mm roll center), mid-corner stability (ATTS torque-vectoring, chassis rigidity +55% bending/+24% torsional, suspension compliance bushings), driver feedback (steering feel, VTEC engagement cue, pedal modulation, visibility advantage), documented SCCA Super Touring Under results, upgrade path by stage (Novice → Competitive), failure modes under autocross conditions, comparative assessment vs B18C Integra GS-R and K20A Integra Type R | ✅ T-145 (2026-05-15) |
| [`h22a-redtop-rally-endurance.md`](../h-series/specifications/h22a-redtop-rally-endurance.md) | H22A Redtop rally and endurance performance: Grassroots Motorsports forum reports (ross2004 ChampCar 12-hour run), oil consumption mechanisms (FRM liners, PCV system), mitigation strategies (catch cans, synthetic oils, manual tensioner), overall engine durability assessment, comparative vs B-series/K-series for budget endurance racing, upgrade path by stage | ✅ T-146 (2026-05-15) |
| [`h22a-redtop-wheel-tire-specs.md`](../h-series/specifications/h22a-redtop-wheel-tire-specs.md) | H22A Redtop wheel and tire specifications: rim size (15×6.5JJ ET55 standard / 16×7.5JJ ET50 optional), tire size (205/55R15 87V), load index (87 = 545 kg), speed rating (V = 240 km/h), bolt pattern (4×114.3), center bore (64.1 mm), lug thread (M12×1.5), tightening torque (110 Nm), trim-level comparison (S/Si/VTEC/EDM), aftermarket wheel options, tire pressure recommendations | ✅ T-134 (2026-05-15) |
| [`h22a-redtop-weight-balance.md`](../h-series/specifications/h22a-redtop-weight-balance.md) | H22A Redtop weight and balance: curb weight by application (4th-gen SiR S-Spec ~1,290–1,310 kg through Torneo Euro-R 1,390 kg), weight distribution (58/42 to 63/37 front/rear), center of gravity height (not documented — confirmed gap), ATTS MCU weight impact (~40 lbs), engine weight contribution (~13–14% of total), suspension geometry relevant to weight distribution | ✅ T-135 (2026-05-15) |
| [`h22a-redtop-acceleration-lap-times.md`](../h-series/specifications/h22a-redtop-acceleration-lap-times.md) | H22A Redtop acceleration and lap times: 0–60 mph, 0–100 km/h, quarter mile, Tsukuba Circuit (1:12.03 / 1:12.13), Nürburgring (no data found); covers JDM Redtop (220 PS), USDM Si VTEC (190–197 hp), EDM 2.2i VTEC (185 PS), Type SH (200 hp), Accord Type R CH1 (212 PS); Best Motoring Tsukuba Battle data, C/D instrumented tests, FastestLaps user submissions | ✅ T-136 (2026-05-15) |
| [`h22a-redtop-sound-character.md`](../h-series/specifications/h22a-redtop-sound-character.md) | H22A Redtop sound character: exhaust note (raspy idle → deeper/louder at VTEC), intake roar (62.5 mm TB, dual-runner IAB), VTEC crossover (~5,500 RPM — "fireworks" per MotorTrend), dB level estimates (stock ~90–95 dB WOT, aftermarket +5–20 dB), NVH assessment, comparison to B16/F20C crossovers | ✅ T-139 (2026-05-15) |
| [`h22a-redtop-collectibility.md`](../h-series/specifications/h22a-redtop-collectibility.md) | H22A Redtop collectibility: current used prices by market (US $11k avg / UK £6,137 / JDM ¥1.6–3.3M), rarity factors (production numbers, attrition, 25-year import rule, ATTS uniqueness), condition premiums (under 10k miles = 2–3×, under 5k miles = 3–5×), trend analysis (71% gain since mid-2022 for Type SH, mint 4th gen VTEC $16k→$45k), demand drivers (millennial nostalgia, new Prelude announcement, end of manual Hondas), risk factors (FRM degradation, economic sensitivity) | ✅ T-140 (2026-05-15) |
| [`h22a-redtop-restoration.md`](../h-series/specifications/h22a-redtop-restoration.md) | H22A Redtop restoration guide: nut-and-bolt rebuild procedures from Honda-Tech forums and YouTube teardowns, frame-off rebuild cost breakdowns ($2,500–$3,500 DIY parts / $6,500–$9,500 with shop labor), complete parts list with OEM part numbers, gasket kit pricing ($99–$199), bearing sets ($350–$425), piston/ring options (Wiseco $684, Arias $741–$892), ARP fastener kits ($214 head studs / $144 mains), cylinder sleeving solutions (RS Machine, Darton, LA Sleeve Co.), remanufactured long-block pricing ($3,599–$3,792 Spartan), used engine sourcing via eBay/JDM dealers ($900–$4,000), aftermarket supplier landscape (SpeedFactory Racing, Brian Crower, King Motorsports, Yonaka, Engine Part Store/VAPENGINES) | ✅ T-142 (2026-05-15) |
| [`h22a-redtop-winter-driving.md`](../h-series/variants/h22a-redtop-winter-driving.md) | H22A Redtop winter driving: weight distribution for snow (58–63% front bias implications), traction characteristics (LSD vs ATTS vs open diff performance in snow/ice), AWD conversion options (S1Built kit, 1FunRyd development, Hub City Performance), recommended winter tire sizes and models, driving techniques, known winter-specific issues (ABS limitations, low ground clearance, salt corrosion) | ✅ T-147 (2026-05-15) |

### Mechanical Design & Internals

> Planned topics: block casting, FRM liners, crankshaft, connecting rods, pistons, bearings, valvetrain, cylinder head.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/mechanical/` | Bottom end, top end, and internal component research | ⬜ Placeholder |

### VTEC System

> Planned topics: VTEC operation parameters, cam profiles, solenoid specs, engagement logic, troubleshooting.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/vtec/` | VTEC system research and diagnostics | ✅ Active (T-117 in specifications/) |

| File | Description | Status |
|------|-------------|--------|
| [`h-series-vtec-engagement-parameters.md`](../h-series/specifications/h-series-vtec-engagement-parameters.md) | Complete VTEC engagement specification: five ECU conditions (RPM, oil pressure, speed, temperature, load), VTEC window concept, variant-specific differences, disengagement hysteresis, aftermarket tuning, troubleshooting | ✅ T-117 (2026-05-15) |

### Engine Management

> Planned topics: ECU variants, OBD1/OBD2 differences, sensor maps, fuel/trig tables, tuning potential, fuel compatibility, octane requirements, ethanol tolerance.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/engine-management/` | ECU, sensors, and engine management research | ✅ Active (T-055, T-060) |

| File | Description | Status |
|------|-------------|--------|
| [`h-series-fuel-economy-ratings.md`](../h-series/development/h-series-fuel-economy-ratings.md) | H-series fuel economy ratings by market and transmission: EPA data (USDM 1993–2001), JC08/10-15 mode (JDM), EU cycle (EDM), Australian combined cycle; manual vs automatic transmission impact (15–25% penalty); real-world owner reports vs official ratings; testing standard comparison (EPA vs JC08 vs EU cycle vs WLTP); H22A7 Accord Euro R anomaly — best economy despite highest output | ✅ T-055 (2026-05-15) |
| [`h-series-fuel-compatibility.md`](../h-series/engine-management/h-series-fuel-compatibility.md) | H-series fuel compatibility: octane requirements by variant (JDM Redtop 98 RON, Blacktop 91 RON, USDM 91 AKI rec/87 AKI min, EDM 95 RON min), ethanol tolerance (E10 certified, E15+ not recommended, E85 requires extensive mods), premium vs regular performance analysis with knock control system detail, PGM-FI knock sensor operation, market-specific fuel availability, compression ratio vs octane relationship | ✅ T-060 (2026-05-15) |
| [`h-series-diagnostic-equipment-procedures.md`](../h-series/engine-management/h-series-diagnostic-equipment-procedures.md) | H-series diagnostic equipment: OEM scan tools (HDS Tablet Tester $7,795 + $840/yr software), OBD1 flash-code procedure via B1/B2 jumper, oscilloscope testing procedures for CKP/CMP/KS/VTEC sensors, factory diagnostic connector pinouts (ECU A/B/D), live data parameters (OBD2 PGM-FI data list), aftermarket scan tools (Launch X431, Autel MX808S), VTEC system diagnostic procedures, swap scenario diagnostics | ✅ T-068 (2026-05-15) |
| [`h-series-ecu-processor-memory.md`](../h-series/engine-management/h-series-ecu-processor-memory.md) | H-series ECU processor and memory architecture: Hitachi H8/300 series microcontroller (8-bit core, 16-bit registers, 10–16 MHz clock), external EPROM (27C256 stock 4 KB / 27C512 aftermarket 8 KB), 74HC373 address multiplexing latch, on-chip RAM (1–2 KB), calibration table resolution (16×16 fuel/ignition maps), ECU variants (P13, P5M, P5P), cross-platform memory layout incompatibility | ✅ T-118 (2026-05-15) |
| [`h-series-obd-version-differences.md`](../h-series/specifications/h-series-obd-version-differences.md) | H-series OBD version differences: OBD1 vs OBD2 diagnostic capabilities, connector pinouts (OBD1: A/B/D 26+16+22 pins vs OBD2: A/C/D 32+22+16 pins), trouble code sets (OBD1 blink codes 0–31 + TCU 1–15 vs OBD2 standardized P-codes + Honda-specific), immobilizer integration, scan tool requirements, swap compatibility | ✅ T-119 (2026-05-15) |

### Tuning

> Planned topics: bolt-on gains, head work, cam upgrades, forced induction, standalone ECUs, dyno results.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/tuning/` | Performance modification and tuning research | ⬜ Placeholder |

### Reliability

> Planned topics: common failure modes, FRM liner issues, timing belt failures, oil consumption, bearing wear, manufacturer recalls.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/reliability/` | Known issues, failure modes, and longevity data | ✅ Active (T-052) |

| File | Description | Status |
|------|-------------|--------|
| [`h-series-recall-history.md`](../h-series/reliability/h-series-recall-history.md) | H-series recall history: NHTSA safety recalls (99V069000 ball joint, 02V120000 ignition switch, 05V025000 interlock), service bulletins (SB618958 FRM honing, #01-010 tensioner), transmission warranty extensions, complaint statistics by model year, key finding: no engine-specific recalls — Honda used service bulletins instead | ✅ T-052 (2026-05-15) |
| [`h-series-warranty-periods-and-claims.md`](../h-series/reliability/h-series-warranty-periods-and-claims.md) | H-series warranty periods and common warranty claims: Honda factory warranty structure (3yr/36K bumper-to-bumper, 5yr/60K powertrain), 2002 automatic transmission extension (M6HA), oil consumption forum reports and dealer threshold disputes, timing belt tensioner service bulletin #01-010, industry competitive comparison, goodwill repair program | ✅ T-053 (2026-05-15) |
| [`h-series-service-bulletins-tsb-known-fixes.md`](../h-series/reliability/h-series-service-bulletins-tsb-known-fixes.md) | H-series service bulletins, TSBs, and known fixes: SB618958 FRM honing procedure, #01-010 tensioner recognition, M6HA transmission warranty extension asymmetry, distributor O-ring leaks, VTEC solenoid gasket leaks, PCV system oil consumption, water pump weep hole design feature, sticking piston rings, auto-tensioner-to-manual conversion, diagnosis hierarchy, community fixes vs official TSBs | ✅ T-069 (2026-05-15) |
| [`h22a-redtop-common-issues.md`](../h-series/reliability/h22a-redtop-common-issues.md) | H22A Redtop common issues: known failure modes (FRM liner degradation, VTEC solenoid leaks, timing belt tensioner failure, valve seal wear, PCV clogging, distributor O-ring leak, head gasket), age-related wear patterns with mileage-based progression table, corrosion patterns (coolant passage, aluminum oxidation, galvanic), reliability assessment by application, diagnostic decision tree, part numbers reference | ✅ T-141 (2026-05-15) |

### Swaps

> Planned topics: H22 into CB/CD/CG chassis, H22 into S2000, H22 into Civic/CRX, swap legality, fabrication.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/swaps/` | Engine swap guides and compatibility research | ⬜ Placeholder |

### Motorsport

> Planned topics: F3 racing, BTCC, JTCC, track day builds, autocross, drag racing.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/motorsport/` | Racing heritage and motorsport applications | ✅ Active (T-143, T-144+) |

| File | Description | Status |
|------|-------------|--------|
| [`h22a-redtop-track-day-viability.md`](../h-series/specifications/h22a-redtop-track-day-viability.md) | H22A Redtop track day viability: engine reliability on track, cooling capacity, tire wear, brake fade, upgrade path by stage, known failure modes under track conditions | ✅ T-143 (2026-05-15) |
| [`h22a-redtop-drag-racing-potential.md`](../h-series/motorsport/h22a-redtop-drag-racing-potential.md) | H22A Redtop drag racing potential: 60-foot times, quarter-mile ETs, trap speeds, launch technique, traction management, wheel hop mitigation, LSD benefits, suspension upgrades, power-to-weight analysis, FWD-specific tuning strategies | ✅ T-144 (2026-05-15) |
| [`h22a-redtop-autocross-capability.md`](../h-series/specifications/h22a-redtop-autocross-capability.md) | H22A Redtop autocross capability: grip levels, turn-in response, mid-corner stability, driver feedback, SCCA Super Touring Under results, upgrade path by stage, failure modes under autocross conditions, comparative assessment vs B18C/K20A | ✅ T-145 (2026-05-15) |
| `../h-series/development/h-series-homologation-racing-eligibility.md` | H-series homologation requirements and racing series eligibility (NASA Honda Challenge, SCCA TT/Solo, FIA Historic, SVRA Group 12, European F3, BTCC, JTCC) | ✅ T-063 (2026-05-15) |

### Aftermarket

> Planned topics: RS Machine sleeves, aftermarket cams, performance parts suppliers, catalog reference.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/aftermarket/` | Aftermarket parts and supplier research | ⬜ Placeholder |

### Comparisons

> Planned topics: Redtop vs Blacktop, H22A vs H23A, H22A vs B18C, H22A vs K20.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/comparisons/` | Intra-H-series and H-series vs other engine comparisons | ⬜ Placeholder |

### Maintenance

> Planned topics: service intervals, fluid specs, adjustment procedures, seasonal care.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../h-series/maintenance/` | Routine maintenance and service procedures | ✅ [h-series-service-interval-evolution.md](../h-series/maintenance/h-series-service-interval-evolution.md) (T-065)
✅ [h-series-tooling-factory-equipment.md](../h-series/development/h-series-tooling-factory-equipment.md) (T-066)
✅ [h-series-technician-training.md](../h-series/development/h-series-technician-training.md) (T-067) |

---

## F-Series Research

Research files for Honda F-series engines (F20B, F20C, F20A, F22R, etc.).
Each subdirectory below will contain one or more research markdown files following the template in `research/template.md`.

### Development History

> Planned topics: origins, design goals, evolution from B-series, position in Honda's strategy.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/development/` | F-series development history and timeline | ⬜ Placeholder |

### Technical Specifications

> Planned topics: block dimensions, bore/stroke, displacement, compression ratios, power density.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/specifications/` | Detailed technical specifications by parameter | ⬜ Placeholder |

### Engine Variants

> Planned topics: F20A, F20B, F20C, F22R, and any other F-series variants.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/variants/` | Per-variant research files (one per variant code) | ⬜ Placeholder |

### Mechanical Design & Internals

> Planned topics: block construction, crankshaft, connecting rods, pistons, valvetrain.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/mechanical/` | Bottom end, top end, and internal component research | ⬜ Placeholder |

### VTEC System

> Planned topics: SOHC VTEC (F20B), DOHC VTEC (F20C), cam profiles, engagement logic.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/vtec/` | VTEC system research and diagnostics | ⬜ Placeholder |

### Engine Management

> Planned topics: ECU variants, OBD versions, sensor maps, tuning potential.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/engine-management/` | ECU, sensors, and engine management research | ⬜ Placeholder |

### Tuning

> Planned topics: bolt-on gains, head work, forced induction, standalone ECUs.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/tuning/` | Performance modification and tuning research | ⬜ Placeholder |

### Reliability

> Planned topics: common failure modes, known issues, longevity data.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/reliability/` | Known issues, failure modes, and longevity data | ⬜ Placeholder |

### Swaps

> Planned topics: F20C into S2000, F20B into Integra, swap legality.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/swaps/` | Engine swap guides and compatibility research | ⬜ Placeholder |

### Motorsport

> Planned topics: Mugen F3, Super GT, track day applications.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/motorsport/` | Racing heritage and motorsport applications | ⬜ Placeholder |

### Aftermarket

> Planned topics: performance parts suppliers, catalog reference.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/aftermarket/` | Aftermarket parts and supplier research | ⬜ Placeholder |

### Comparisons

> Planned topics: F20C vs B16, F20C vs K20, F20B vs F20C.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/comparisons/` | Intra-F-series and F-series vs other engine comparisons | ⬜ Placeholder |

### Maintenance

> Planned topics: service intervals, fluid specs, adjustment procedures.

| Subdirectory | Purpose | Files |
|--------------|---------|-------|
| `../f-series/maintenance/` | Routine maintenance and service procedures | ⬜ Placeholder |

---

## Cross-Engine Comparisons

| Comparison Directory | Purpose | Files |
|---------------------|---------|-------|
| `../comparisons/h-vs-f/` | H-series vs F-series general comparison | ⬜ Placeholder |
| `../comparisons/h-vs-b16/` | H22A vs B16C/B18C comparison | ⬜ Placeholder |
| `../comparisons/h-vs-k20/` | H22A vs K20A/K20A2 comparison | ⬜ Placeholder |
| `../comparisons/h-vs-f20c/` | H22A vs F20C comparison | ⬜ Placeholder |
| `../comparisons/f-vs-b16/` | F20C vs B16C comparison | ⬜ Placeholder |
| `../comparisons/f-vs-k20/` | F20C vs K20A comparison | ⬜ Placeholder |

---

## Raw Data

> Unprocessed or intermediate data files go here.

| Directory | Purpose | Contents |
|-----------|---------|----------|
| `../raw-data/` | Raw extraction outputs, intermediate files | ⬜ Empty |

---

## Templates & Standards

| File | Purpose | Status |
|------|---------|--------|
| `../template.md` | Standard template for all research markdown files | ✅ Complete (T-029) |
| `../citations.md` | Citation format, credibility scale, and source tracking methodology | ✅ Complete (T-030) |

---

## Directory Structure Overview

```
research/
├── h-series/
│   ├── development/       # Origins, timeline, engineering decisions
│   ├── specifications/    # Bore, stroke, displacement, dimensions
│   ├── variants/          # H22A, H22A1–H22A8, H22Z1, H23A per-variant
│   ├── mechanical/        # Block, crank, rods, pistons, bearings
│   ├── vtec/              # VTEC operation, cams, solenoids
│   ├── engine-management/ # ECU, sensors, OBD1/OBD2
│   ├── tuning/            # Bolt-ons, head work, forced induction
│   ├── reliability/       # Failure modes, known issues
│   ├── swaps/             # Engine swap guides
│   ├── motorsport/        # Racing history
│   ├── aftermarket/       # Parts suppliers
│   ├── comparisons/       # Intra-H-series comparisons
│   └── maintenance/       # Service intervals, fluid specs
├── f-series/
│   ├── development/       # Origins, timeline, engineering decisions
│   ├── specifications/    # Bore, stroke, displacement, dimensions
│   ├── variants/          # F20A, F20B, F20C, F22R per-variant
│   ├── mechanical/        # Block, crank, rods, pistons, bearings
│   ├── vtec/              # VTEC operation, cams, solenoids
│   ├── engine-management/ # ECU, sensors, OBD versions
│   ├── tuning/            # Bolt-ons, head work, forced induction
│   ├── reliability/       # Failure modes, known issues
│   ├── swaps/             # Engine swap guides
│   ├── motorsport/        # Racing history
│   ├── aftermarket/       # Parts suppliers
│   ├── comparisons/       # Intra-F-series comparisons
│   └── maintenance/       # Service intervals, fluid specs
├── comparisons/
│   ├── h-vs-f/            # H-series vs F-series
│   ├── h-vs-b16/          # H22A vs B16
│   ├── h-vs-k20/          # H22A vs K20
│   ├── h-vs-f20c/         # H22A vs F20C
│   ├── f-vs-b16/          # F20C vs B16
│   └── f-vs-k20/          # F20C vs K20
├── indexes/               # ← You are here
│   ├── local-manuals.md   # Topic-to-source mapping
│   ├── manual-metadata.md # PDF metadata and TOCs
│   ├── ocr-output-map.md  # OCR file enumeration
│   ├── ocr-quality-samples.md # OCR quality assessment
│   ├── qwen-content-inventory.md # QWEN.md topic inventory
│   ├── qwen-gap-analysis.md     # QWEN.md gap analysis
│   ├── variant-catalog.md   # H/F-series variant codes
│   ├── ecu-references.md  # ECU part numbers and pinouts
│   └── master-index.md    # ← This file
├── raw-data/              # Raw/unprocessed data
├── template.md            # Research file template
└── citations.md           # Citation standards
```

---

## Notes

- This master index is a **placeholder** created as part of Phase 0 infrastructure setup.
- Existing index files (under `indexes/`) are complete and linked above.
- H-series and F-series research directories exist but are empty — populated during Phases 1–10.
- Cross-comparison directories exist but are empty — populated during comparative research tasks.
- Template (`template.md`, T-029) and citations (`citations.md`, T-030) are now complete.
- Tool verification (tavily, playwright) is pending T-021 through T-028.
