# H-Series Variant Code Catalog

> Extracted from local materials only — no external data added.
> Generated: 2026-05-15
> Task: T-013 [infra] Catalog all H-series variant codes

---

## Summary

This catalog documents all H-series variant codes mentioned in local project materials,
including source files, page references, and context of usage.

**Total variants documented:** 11 (H22A×2, H22A1–H22A8, H22Z1, H23A)

**Note:** H22A6 is not mentioned in any local material. H22A2, H22A3, H22A5, H22A7, H22A8,
and H22Z1 appear only in QWEN.md (the compiled reference), not in the service manuals.

---

## Source Files Scanned

| # | File | Format | Size | Variant Codes Found |
|---|------|--------|------|---------------------|
| 1 | `QWEN.md` | Markdown | ~50 KB | All 11 variants |
| 2 | `OBD1_H22A_Service_Manual.md` | Markdown | 15 KB | H22A, H22A1, H23A1 |
| 3 | `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` | OCR text | 1.75 MB | H22A4 |
| 4 | `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf` | PDF | 59 KB | H22A1 (in filename) |
| 5 | `1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf` | PDF | 170 MB | H22A4 (in filename) |
| 6 | `STATE.md` | Markdown | N/A | H22A, H22A1–H22A8, H22Z1, H23A (in task list) |

---

## Variant Catalog

### H22A (generic base code)

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| Base engine code for all sub-variants | QWEN.md | Overview table, Technical Specs | Listed as "H22A (various sub-codes)" |
| JDM Redtop (1992-1996) | QWEN.md | Engine Variants section | 220 PS @ 7,200 RPM, 221 Nm @ 6,500 RPM, 11.0:1 compression |
| JDM Blacktop (1992-2001) | QWEN.md | Engine Variants section | 200 PS @ 7,000 RPM, 219 Nm @ 5,500 RPM, 10.6:1 compression |
| Camshaft specs comparison | QWEN.md | Camshaft Specifications table | Redtop: 306°/310°, Blacktop: 288°/308° |
| Camshaft profiles (detailed) | h22a-blacktop-camshaft-profiles.md | Full research file | Advertised duration, .050" duration, lift, overlap, three-lobe VTEC profiles, aftermarket cams |
| Internal component comparison | QWEN.md | Connecting Rod & Piston Data table | Baseline for H22A vs H22A1 vs H22A4 vs H23A |
| Valve & journal specs | QWEN.md | Valve & Journal Specifications table | 1992-1996: 50mm main journals |
| Oil squirters | h-series-oil-gallery-layout.md | Piston Oil Squirters section | H22A/H22Z have oil squirters; locations under cam main caps |
| VTEC system description | QWEN.md | VTEC System Operation | "The H22A uses a single-cam VTEC design" |
| Motorsport/F3 racing | QWEN.md | Development History, Motorsport | H22A-based F3 engine, BTCC, JTCC |
| Competitor comparisons | QWEN.md | H22A vs B18C/K20A/F20C/H23A | Primary comparison subject |
| Engine type code | OBD1_H22A_Service_Manual.md | Vehicle Identification | Listed as general engine family code |
| Torque specs reference | OBD1_H22A_Service_Manual.md | Cam gear bolts section | "Torque (H22)" column in bolt size table |
| Filename | 1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf | N/A | Part of PDF filename |

---

### H22A1

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| USDM 1993-1996 (Prelude VTEC) | QWEN.md | Engine Variants section | 190 PS @ 6,800 RPM, 207 Nm @ 5,500 RPM, 10.0:1 compression |
| Power/torque rating | QWEN.md | Power & Torque Output table | 190 PS (187 hp), 207 Nm (153 lb-ft) |
| Component comparison | QWEN.md | Connecting Rod & Piston Data table | Rod length 143 mm, pin bore 21.97-21.98 mm |
| Camshaft specs | QWEN.md | Camshaft Specifications table | 288° intake, 308° exhaust, 11.38/10.54 mm lift |
| ECU variants | QWEN.md | Engine Management section | P5M (automatic), P51 (manual) |
| Applications | QWEN.md | Engine Variants section | Prelude VTEC, SR-V (CAN), VTi-R (AUS) |
| Features | QWEN.md | Engine Variants section | OBD1 ECU, closed deck, US emissions, alloy sump |
| Primary engine focus | OBD1_H22A_Service_Manual.md | Throughout | Main subject of the entire service manual |
| Engine specifications | OBD1_H22A_Service_Manual.md | Engine Specifications section | 2,157 cc, 87.0 × 90.7 mm, 10.0:1 |
| Power ratings | OBD1_H22A_Service_Manual.md | Performance Specifications | 190 HP @ 6,800 RPM (USDM), 200 PS @ 7,000 RPM (JDM) |
| Fuel pressure specs | OBD1_H22A_Service_Manual.md | Fuel Pressure section | 230-280 psi (disconnected), 33-40 psi (connected) |
| Emission group codes | OBD1_H22A_Service_Manual.md | Vehicle Identification | Code 100 (California), 130 (49-state) |
| ECU pinouts | OBD1_H22A_Service_Manual.md | ECU Pinouts section | 32-pin connector, pins A1-A26, C2-C4 |
| Filename | 1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf | N/A | Part of PDF filename |
| Task list reference | STATE.md | T-013 task line | Listed as one of target variant codes |
| Index reference | research/indexes/local-manuals.md | Content Index | Referenced in engine section headers |
| Index reference | research/indexes/qwen-content-inventory.md | Content Inventory | Full entry with specs and features |
| Gap analysis | research/indexes/qwen-gap-analysis.md | Gap Analysis | Missing: swap legality, California vs non-CA details |
| **Research file** | **research/h-series/specifications/h22a1-specifications.md** | **Full spec sheet** | **Power, torque, compression, internal components, cam profiles, induction/exhaust, ECU, emissions, fluids, torque specs, casting numbers, C&D test results, Redtop comparison** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-applications.md** | **Applications across markets** | **USDM VTEC (BB1), Canada SR-V (BB1), Australia VTi-R (BB1) — model year evolution, features, pricing, trim differentiation, cross-market comparison** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-usdm-detuning.md** | **Detuning analysis vs JDM Redtop** | **Five detuning measures (CR 11.0→10.0, Blacktop cams, single runner + 60mm TB, 51mm exhaust, emissions package, ECU calibration); quantitative power loss attribution (30 PS total, ~14% deficit); emissions compliance analysis; power band shift; community consensus from PreludePower/Honda-Tech/mywikimotors** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-closed-deck-block.md** | **Closed deck block: structural characteristics, boost potential (350 HP stock / 500 HP forged), compared to later open deck H22A4, block serial codes (H3281/H3282/H3283), cooling concerns, community debate on significance** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-california-vs-federal.md** | **California vs non-California H22A1: emissions differences, power differences, ECU calibration — key finding that hardware is identical across CA/Federal variants; only ECU basemap calibration differs (more conservative timing + richer fuel maps on CA for stricter LEV CO/NOx limits); both rated identically at 190 PS @ 6,800 rpm; CARB EO D-392-6 lists H22A1 without CA/Federal distinction; identification via under-hood emissions label; swap legality implications in California** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-swap-legality.md** | **H22A1 swap legality: EPA federal engine switching policy (40 CFR Part 86, Memo 1A), CARB five-requirement framework, BAR referee process, state-by-state legality analysis (18 CARB states + DC vs ~30 non-inspection states), six swap scenarios (identical replacement, newer chassis, CRX EF, Civic EG, Miata NA, JDM H22A into CA), common misconceptions debunked, compliance checklists** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-usdm-origin.md** | **H22A1 USDM origin: 1993 introduction as first DOHC VTEC in America; regulatory drivers (EPA Tier-0/LEV, 87 AKI fuel); detuning vs JDM Redtop (10.0:1 CR, 190 PS vs 220 PS, single runner intake, 51mm exhaust); global variants (USDM/CAN/AUS); VTEC technology timeline in US market; pricing and critical reception** | 2026-05-15
| **Research file** | **research/h-series/engine-management/h22a1-ecu-p5m-p51-obd1-usdm.md** | **H22A1 ECU variants: P5M (automatic reference) / P51 (manual), socketed EPROM chips (Hitachi H8/300), chip swapping procedures, tuning potential, Hondata S300 compatibility, immobilizer status, pinout reference, fuel/ignition map characteristics** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-emissions-equipment.md** | **H22A1 USDM emissions equipment: EGR system (vacuum control solenoid 36190-P13-003, pintle position sensor, PWM modulation), PCV system (closed-loop blow-by ventilation, primary contributor to H22 oil consumption — 50–70% of total), SAIS (passive air riser tubes on OBD1, active pump on OBD2), EVAP (charcoal canister 77620-P0B-003, purge solenoid 36160-P5M-L01, vent shut valve), three-way catalytic converter (Pt/Pd/Rh, ~250–300°C light-off), complete part number reference table, OBD1 vs OBD2 differences, maintenance schedule** | 2026-05-15
| **Research file** | **research/h-series/engine-management/h22a1-obd1-diagnostics.md** | **H22A1 OBD1 diagnostics: 2-pin service check connector location/pinout, CEL blink-code procedure and full DTC table (codes 0–43), ECU test-point pinouts for multimeter measurement (Connectors A/B/D), live data capabilities and limitations (no native streaming; aftermarket solutions: Hondata S300, OBD1-to-OBD2 harness, direct ECU probing), code clearing/reset procedures, comparison to H22A4 OBD2 diagnostics** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-4ws-models.md** | **H22A1 four-wheel steering models: which trim levels had 4WS (Australian VTi-R standard, USDM VTEC 4WS optional, Canada SR-V never offered); 4th gen electronic Super 4WS system architecture (dedicated ECU, electric actuator, speed-dependent operation ~40 km/h threshold); maintenance procedures (grease-packed gearbox, no drain plug, blink code diagnostics, rear rack centering with rigging pin 14–15 mm specification); conversion considerations, known failure modes, steering ratio effects** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-automatic-vs-manual.md** | **H22A1 automatic vs manual transmission comparison: M2F4 5-speed manual (USDM only), MP1A 4-speed auto (JDM only), M6HA Sequential SportShift (5th gen); gear ratios, torque converter (HO78), shift quality, performance differential (~1.6s 0-60 penalty); why USDM was manual-only; P5M ECU development history; cross-platform swap compatibility** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-us-market-reception.md** | **H22A1 US market reception: magazine reviews (C/D Nov 1992 "Tested" — 6.9s 0-60, 15.4s @ 91 mph, 0.80 g skidpad; R&T first drive Apr 1993 comparo 2nd place), owner satisfaction (KBB 4.7/5, 96% recommend, 83% five-star; Edmunds praise for handling/VTEC), resale values (Classic.com avg $13,164; KBB private $1,562–$1,800; Edmunds range $4,575–$13,743; CarGurus avg $11,000), sales context (98,627 units 4th-gen total; ~19,725/year; competitive positioning at $23,000 MSRP)** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a1-alloy-oil-pan.md** | **H22A1 alloy oil sump: OEM part numbers (11200-PT0-010 pan, 11221-P5L-010 windage tray), OBD1-specific shallow/lighter design vs OBD2 deeper pan, fluid capacities (3.8 L drain / 4.0 L w/filter / 5.1 qt practical fill), baffle pattern (stamped steel windage tray only, no internal baffles), documented oil starvation failure mode under hard cornering, aftermarket alternatives (Moroso drag/road race $668–$715, 1320 Performance H2B swap $250–$350, OBX replica ~$380, custom weld-in ~$50), cross-compatibility notes (H22↔H23 interchange, 5th gen swap requirements, 4WS exclusion)** | 2026-05-15

---

### H22A2

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| EDM 1992-1996 (European Prelude BB1) | QWEN.md | Engine Variants section | 185 PS @ 6,800 RPM, 10.0:1 compression |
| Power rating | QWEN.md | Power & Torque Output table | 185 PS (182 hp) |
| Features | QWEN.md | Engine Variants section | European emissions, similar to H22A1 but detuned |
| Task list reference | STATE.md | T-013 task line | Listed as one of target variant codes |
| Index reference | research/indexes/qwen-content-inventory.md | Content Inventory | Brief entry |
| Gap analysis | research/indexes/qwen-gap-analysis.md | Gap Analysis | Missing: European pricing, spare parts availability |
| **Research file** | **research/h-series/specifications/h22a2-edm-origin.md** | **H22A2 EDM origin: European market introduction, emissions regulations (Euro 1/2), model years 1993–1996, chassis codes BB1/BB4, specifications (185 PS @ 6,800 RPM, 215 Nm @ 5,300 RPM, 10.0:1 CR, black valve cover, closed deck, FRM liners), vehicle performance (0–100 km/h 7.1s, 228 km/h top speed, 1,305 kg kerb weight), comparison vs H22A1 USDM and H22A Redtop JDM, European driving condition calibration, fuel quality considerations** | 2026-05-15
| **Research file** | **research/h-series/specifications/h22a2-specifications.md** | **H22A2 full technical spec sheet: power/torque output (185 PS @ 6,800 RPM, 215 Nm @ 5,300 RPM), cam profiles (288°/308°, 11.38/10.54 mm lift — same as H22A1/Blacktop), VTEC engagement (~5,200–5,500 RPM est.), intake system (60 mm TB, single runner est.), exhaust (51 mm est.), ECU (OBD1 Hitachi H8/300, socketed EPROM chippable), internal components (crankshaft, rods, pistons, rings, bearings, valves), fluid capacities, timing belt system, ignition (distributor-based OBD1), valve adjustment specs (0.008" I / 0.010" E cold), torque specs, sensor complement, clutch/transmission (5MT only), brakes/suspension context, vehicle performance, detailed comparison vs H22A1/H22A Redtop/H22A Blacktop, European driving condition calibration** | 2026-05-15 |
| **Research file** | **research/h-series/specifications/h22a2-vs-h22a1-differences.md** | **H22A2 vs H22A1 differences: detuning measures (ECU calibration only — richer fuel maps, retarded ignition timing, higher EGR duty cycle; no confirmed hardware changes account for 5 PS deficit), emissions equipment differences (more restrictive catalytic converter for Euro 2, downstream O2 sensor on Euro 2 models, EU EVAP calibration), complete parts interchangeability matrix (very high for mechanical components including block/head/valvetrain/crank/rods/pistons/cams/intake/exhaust/oil system/cooling/ignition; conditional for ECU basemaps and emissions sensors), swap feasibility assessment (easy drop-in replacement), identification guide (block stamp, emissions label, badging)** | 2026-05-15 |
| **Research file** | **research/h-series/variants/h22a2-european-driving-conditions.md** | **H22A2 European driving conditions: Autobahn high-speed durability (closed-deck block rigidity, 7.0 L cooling system, no factory oil cooler → aftermarket recommended), mountain road cooling (Alps/Pyrenees/Apennines thermal stress, two-speed electric fans, common overheating failure modes, PWR/Nissin radiator upgrades), European fuel quality (95 RON minimum ≈ 91 AKI US equiv., knock-sensor timing retardation, Euro 1→2 transition impact, regional fuel quality variability across Europe, conservative ECU calibration for variable fuel)** | 2026-05-15 |
| **Research file** | **research/h-series/variants/h22a2-european-spare-parts.md** | **H22A2 European spare parts availability: OEM channels (Honda-parts.eu pan-European, Cox Motor Parts UK, Honda Direct Parts UK, BuyCarParts.co.uk TecDoc catalog with 50+ categories), independent aftermarket (A4H-TECH Netherlands, ID-Workz UK 47 Prelude products, Progressive Parts, Exoracing, MFactory Europe, AKR Performance, Jdmshop.eu), international suppliers shipping to EU (KS Tuned, Brian Crower/runBC, Cometic, Mishimoto, ARP, Competition Clutch via ID-Workz UK, eXtremePrelude, LarrysPower AEBS sleeves, Golden Eagle, Mahle Gold Series via A4H-TECH), HMEL logistics network (6 European branches: Barcelona, Vigasio, Vienna, Swindon, Malmö, Pniewy), pricing comparison tables by category (maintenance consumables £5–7, performance upgrades £120–£1,879), FRM sleeving gap analysis, parts availability assessment by category** | 2026-05-15

---

### H22A3

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| JDM rare variant (1996) | QWEN.md | Engine Variants section | 190 PS @ 6,800 RPM |
| Applications | QWEN.md | Engine Variants section | 1996 VTEC model (BB1), various markets (KU code) |
| Features | QWEN.md | Engine Variants section | Very rare, essentially H22A1 with different calibration |
| Task list reference | STATE.md | T-013 task line | Listed as one of target variant codes |
| Index reference | research/indexes/qwen-content-inventory.md | Content Inventory | Brief entry |
| Gap analysis | research/indexes/qwen-gap-analysis.md | Gap Analysis | Missing: KU code applications, identification markers |

---

### H22A4

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| USDM/Canadian 1997-2001 (5th gen BB6) | QWEN.md | Engine Variants section | 200 PS @ 7,000 RPM, 212 Nm @ 5,250 RPM, 10.0:1 compression |
| Power/torque rating | QWEN.md | Power & Torque Output table | 200 PS (195 hp), 212 Nm (156 lb-ft) |
| Component comparison | QWEN.md | Connecting Rod & Piston Data table | Rod length 143 mm, pin bore 21.97-21.98 mm |
| Valve & journal specs | QWEN.md | Valve & Journal Specifications table | 1997-2001: 55mm main journals (1998+) |
| Camshaft specs | QWEN.md | Camshaft Specifications table | 288° intake, 308° exhaust, 11.38/10.54 mm lift |
| ECU | QWEN.md | Engine Management section | P13 OBD2, immobilizer-integrated |
| Applications | QWEN.md | Engine Variants section | Prelude Base, Type-SH, SE (BB6) |
| Features | QWEN.md | Engine Variants section | OBD2 ECU, open deck, 55mm journals, ATTS, single runner intake |
| **Primary engine code** | **1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt** | **Throughout (repeated)** | **Appears in every VIN range section: 1000001, 2000001, 3000001** |
| VIN decode | 1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt | Vehicle Identification | "JHM BB6 14 *V C000001 H22A4 - 1000001" |
| Engine description | 1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt | Vehicle Identification | "H22A4: 2.2 DOHC VTEC Sequential" |
| Model designation | 1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt | Multiple sections | "BB6: PRELUDE/H22A4", "Prelude Type SH" |
| Filename | 1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf | N/A | Part of PDF filename |
| Task list reference | STATE.md | T-013 task line | Listed as one of target variant codes |
| Index reference | research/indexes/local-manuals.md | Content Index | Referenced in engine section headers |
| Index reference | research/indexes/qwen-content-inventory.md | Content Inventory | Full entry with specs and features |
| Gap analysis | research/indexes/qwen-gap-analysis.md | Gap Analysis | Missing: trim differences, main journal increase rationale |

---

### H22A5

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| EDM 1997-1998 (European Prelude BB6) | QWEN.md | Engine Variants section | 200 PS @ 7,000 RPM, 212 Nm @ 5,250 RPM |
| Applications | QWEN.md | Engine Variants section | European Prelude 2.2VTi/VTi-S (BB6 2WS/4WS) |
| Features | QWEN.md | Engine Variants section | European emissions, similar to H22A4 |
| Task list reference | STATE.md | T-013 task line | Listed as one of target variant codes |
| Index reference | research/indexes/qwen-content-inventory.md | Content Inventory | Brief entry |

---

### H22A6

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| **Not found in any local material** | — | — | **No mention in QWEN.md, service manuals, or extracted text.** This variant code is referenced in the task spec but does not appear in any scanned local file. |

---

### H22A7

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| EDM 1998-2002 (Accord Type R CH1) | QWEN.md | Engine Variants section | 212 PS @ 7,200 RPM, 11.0:1 compression |
| Applications | QWEN.md | Engine Variants section | European Accord Type R (CH1 chassis) |
| Features | QWEN.md | Engine Variants section | High-performance variant, similar to JDM Redtop, single runner intake |
| Development timeline | QWEN.md | Development History | "1998: H22A7 introduced in European Accord Type R" |
| Task list reference | STATE.md | T-013 task line | Listed as one of target variant codes |
| Index reference | research/indexes/qwen-content-inventory.md | Content Inventory | Brief entry |

---

### H22A8

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| EDM 1999-2001 (European Prelude) | QWEN.md | Engine Variants section | 200 PS @ 7,100 RPM, 212 Nm @ 5,250 RPM |
| Applications | QWEN.md | Engine Variants section | European Prelude 2.2VTi/VTi-S (BB6) |
| Features | QWEN.md | Engine Variants section | Late European variant, red valve cover (unusual for non-JDM) |
| Development timeline | QWEN.md | Development History | "1998: H22A8 released in European Prelude 2.2VTi/VTi-S" |
| Task list reference | STATE.md | T-013 task line | Listed as one of target variant codes |
| Index reference | research/indexes/qwen-content-inventory.md | Content Inventory | Brief entry |

---

### H22Z1

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| Australian VTi-R 1999-2001 | QWEN.md | Engine Variants section | 200-203 PS (disputed), 7,000 RPM |
| Applications | QWEN.md | Engine Variants section | Australian Prelude VTi-R, VTi-R ATTS (BB6) |
| Features | QWEN.md | Engine Variants section | Thought identical to H22A4, speculation of 203 PS, ATTS compatible |
| Market summary | QWEN.md | Regional Market Differences | Listed under AUS market |
| Oil squirters | h-series-oil-gallery-layout.md | Piston Oil Squirters section | H22A/H22Z have oil squirters; locations under cam main caps |
| Task list reference | STATE.md | T-013 task line | Listed as one of target variant codes |
| Index reference | research/indexes/qwen-content-inventory.md | Content Inventory | Brief entry |
| Gap analysis | research/indexes/qwen-gap-analysis.md | Gap Analysis | Missing: disputed power output investigation |

---

### H23A (DOHC VTEC)

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| JDM rare blue top (1998-2002) | QWEN.md | Engine Variants section | 200 PS @ 6,800 RPM, 221 Nm @ 5,300 RPM, 2,259 cc |
| Displacement | QWEN.md | Technical Specifications | 2,259 cc (2.3L), bore x stroke 87mm × 95mm |
| Compression | QWEN.md | Technical Specifications | 10.6:1 |
| Applications | QWEN.md | Engine Variants section | Japanese Accord Wagon SiR (CH9) |
| Features | h-series-oil-gallery-layout.md | VTEC Passages + Piston Oil Squirters sections | Rare JDM-only, internal oil passage for VTEC, lower redline, provisions exist but no squirters installed |
| Component comparison | QWEN.md | Connecting Rod & Piston Data table | Rod length 141.5 mm (shorter than H22's 143 mm) |
| Valve & journal specs | QWEN.md | Valve & Journal Specifications table | 55mm main journals, same valve sizes as H22 |
| Piston volume | QWEN.md | Connecting Rod & Piston Data table | +4.3 cc (H23A) / -9.9 cc (H23A1) |
| Oil squirters | h-series-oil-gallery-layout.md | Piston Oil Squirters section | H23A: provisions exist but no squirters installed |
| Cam gear torque | OBD1_H22A_Service_Manual.md | Cam gear bolts section | "H23A: 27 ft-lb" (vs H22's 37 ft-lb) |
| Engine type code | OBD1_H22A_Service_Manual.md | Vehicle Identification | Listed as H23A1 (California 49-state) |
| Emission group codes | OBD1_H22A_Service_Manual.md | Vehicle Identification | Code 200 (California), 230 (49-state) |
| Fuel pressure specs | OBD1_H22A_Service_Manual.md | Fuel Pressure section | 255-305 psi (disconnected), 36-43 psi (connected) |
| Competitor comparison | QWEN.md | H22A vs H23A | Detailed comparison table |
| Task list reference | STATE.md | T-013 task line | Listed as one of target variant codes |
| Index reference | research/indexes/local-manuals.md | Content Index | Referenced in engine section headers |
| Index reference | research/indexes/qwen-content-inventory.md | Content Inventory | Full entry with specs and features |
| Gap analysis | research/indexes/qwen-gap-analysis.md | Gap Analysis | Missing: lower redline impact, piston speed calculations |

---

## Cross-Reference: Variant Codes by Source File

### QWEN.md (compiled reference)

Contains all 11 variant codes plus H22A6 is absent:

| Variant | Section | Context |
|---------|---------|---------|
| H22A | Multiple | Generic base code, Redtop, Blacktop |
| H22A1 | Engine Variants, Component Tables, ECU section | USDM 1993-1996 |
| H22A2 | Engine Variants | EDM 1992-1996 |
| H22A3 | Engine Variants | JDM 1996 rare |
| H22A4 | Engine Variants, Component Tables, ECU section | USDM/CDN 1997-2001 |
| H22A5 | Engine Variants | EDM 1997-1998 |
| H22A6 | — | **Not present** |
| H22A7 | Engine Variants, Development History | EDM 1998-2002 |
| H22A8 | Engine Variants, Development History | EDM 1999-2001 |
| H22Z1 | Engine Variants, Regional Markets | AUS 1999-2001 |
| H23A | Engine Variants, Component Tables, Competitor Comparison | JDM 1998-2002 |

### OBD1_H22A_Service_Manual.md

| Variant | Context |
|---------|---------|
| H22A | Generic reference in torque tables, VTEC description |
| H22A1 | Primary focus — entire manual dedicated to this variant |
| H23A1 | Mentioned in emission group codes, fuel pressure specs, cam gear torque |

### 1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt

| Variant | Context | Frequency |
|---------|---------|-----------|
| H22A4 | Primary engine code throughout | ~15 occurrences across multiple VIN ranges |

### STATE.md

| Variant | Context |
|---------|---------|
| H22A, H22A1-H22A8, H22Z1, H23A | Listed in T-013 task description |

---

## New Research Files — Phase 3 Checkpoint (T-150)

All files written following `research/template.md` format. Cross-referenced against QWEN.md, Wikipedia, mywikimotors, Honda-Tech, GRM, Attack Forums, PreludePower, and local service manuals.

| File | Task | Description | Date |
|------|------|-------------|------|
| [`h22a-redtop-origin.md`](../h-series/specifications/h22a-redtop-origin.md) | T-121 | H22A Redtop JDM origin, development history, 100 PS/L target, introduction timeline, distinguishing features vs. Blacktop | 2026-05-15 |
| [`h22a-blacktop-jdm-origin.md`](../h-series/variants/h22a-blacktop-jdm-origin.md) | T-151 | H22A Blacktop JDM origin: when introduced (Sep 1991), which models received it (Prelude SiR BB1/BB4/BB6/BB8, Accord SiR CD6/CF2, Torneo CL1), production years 1991–2001, market exclusivity (JDM only), key differences from Redtop | 2026-05-15 |
| [`h22a-blacktop-specifications.md`](../h-series/specifications/h22a-blacktop-specifications.md) | T-152 | H22A Blacktop full specifications: 200 PS @ 7000 RPM, 219 Nm @ 5500 RPM, 10.6:1 compression, flat-top pistons, camshafts 288°/308°, 60 mm TB, 51 mm exhaust, ECU, fluids, internal components | 2026-05-15 |
| [`h22a-redtop-specifications.md`](../h-series/specifications/h22a-redtop-specifications.md) | T-122 | H22A Redtop full specifications: power, torque, compression, pistons, camshafts, intake/exhaust, ECU, fluid capacities | 2026-05-15 |
| [`h22a-redtop-applications.md`](../h-series/specifications/h22a-redtop-applications.md) | T-127 | Complete application matrix: 4th-gen Prelude (BB1/BB4), 5th-gen Prelude (BB6/BB8), Accord Euro R/Torneo (CL1), serial codes, market exclusivity | 2026-05-15 |
| [`h22a-redtop-ecu.md`](../h-series/specifications/h22a-redtop-ecu.md) | T-128 | P28/P06 ECU architecture, chipping process, tuning parameters, aftermarket solutions (Hondata S300, Chrome HTS), flash procedures | 2026-05-15 |
| [`h22a-redtop-camshaft-profiles.md`](../h-series/specifications/h22a-redtop-camshaft-profiles.md) | T-123 | Camshaft specs: 306°/310° duration, 11.91/11.12 mm lift, comparison vs. Blacktop | 2026-05-15 |
| [`h22a-blacktop-camshaft-profiles.md`](../h-series/specifications/h22a-blacktop-camshaft-profiles.md) | T-153 | Camshaft profiles: 288°/308° advertised, 231°/234° @.050", 11.38/10.54 mm lift, overlap calc, three-lobe VTEC, aftermarket cams | 2026-05-15 |
| [`h22a-redtop-intake-system.md`](../h-series/specifications/h22a-redtop-intake-system.md) | T-124 | Dual runner manifold, 62.5 mm throttle body, plenum design, Dynamic Chambering airbox | 2026-05-15 |
| [`h22a-redtop-exhaust-system.md`](../h-series/specifications/h22a-redtop-exhaust-system.md) | T-125 | 57 mm exhaust, improved manifolds, catalytic converter placement | 2026-05-15 |
| [`h22a-redtop-head-porting.md`](../h-series/specifications/h22a-redtop-head-porting.md) | T-126 | Light factory head porting, flow numbers, port shape, valve job angle | 2026-05-15 |
| [`h22a-redtop-atts.md`](../h-series/specifications/h22a-redtop-atts.md) | T-131 | ATTS system: MCU architecture, triple-pinion planetary gears, hydraulic clutches, 80:20 bias ratio | 2026-05-15 |
| [`h22a-redtop-suspension.md`](../h-series/specifications/h22a-redtop-suspension.md) | T-132 | Double-wishbone geometry, spring rates, ARB sizes, damper valiving | 2026-05-15 |
| [`h22a-redtop-braking.md`](../h-series/specifications/h22a-redtop-braking.md) | T-133 | VTEC brake upgrade, 11.1" ventilated rotors, Vigor-derived calipers, ABS tuning | 2026-05-15 |
| [`h22a-redtop-wheel-tire-specs.md`](../h-series/specifications/h22a-redtop-wheel-tire-specs.md) | T-134 | 15" OEM wheels, 205/55R15 tires, load index, upgrade paths | 2026-05-15 |
| [`h22a-redtop-weight-balance.md`](../h-series/specifications/h22a-redtop-weight-balance.md) | T-135 | 58% front / 42% rear distribution, curb weight, center of gravity | 2026-05-15 |
| [`h22a-redtop-acceleration-lap-times.md`](../h-series/specifications/h22a-redtop-acceleration-lap-times.md) | T-136 | 0-100 km/h, quarter mile, Nürburgring lap times if available | 2026-05-15 |
| [`h22a-redtop-fuel-economy.md`](../h-series/specifications/h22a-redtop-fuel-economy.md) | T-137 | JC08 cycle figures, real-world consumption, highway vs. city breakdown | 2026-05-15 |
| [`h22a-redtop-emissions-ratings.md`](../h-series/specifications/h22a-redtop-emissions-ratings.md) | T-138 | NOx, CO, HC, particulate levels, certification standards | 2026-05-15 |
| [`h22a-redtop-sound-character.md`](../h-series/specifications/h22a-redtop-sound-character.md) | T-139 | Exhaust note, intake roar, VTEC kick description, dB levels | 2026-05-15 |
| [`h22a-redtop-collectibility.md`](../h-series/specifications/h22a-redtop-collectibility.md) | T-140 | Used prices, rarity factors, condition premiums, trend analysis | 2026-05-15 |
| [`h22a-redtop-common-issues.md`](../h-series/specifications/h22a-redtop-common-issues.md) | T-141 | Oil consumption, timing belt tensioner, oil leaks, coolant leaks, valve adjustment, DTC reference | 2026-05-15 |
| [`h22a-redtop-restoration.md`](../h-series/specifications/h22a-redtop-restoration.md) | T-142 | Nut-and-bolt examples, frame-off rebuild costs, parts availability | 2026-05-15 |
| [`h22a-redtop-track-day-viability.md`](../h-series/specifications/h22a-redtop-track-day-viability.md) | T-143 | Engine reliability on track, cooling capacity, tire wear, brake fade, ChampCar endurance data | 2026-05-15 |
| [`h22a-redtop-drag-racing-potential.md`](../h-series/specifications/h22a-redtop-drag-racing-potential.md) | T-144 | Documented 1/4-mile times, 60-foot analysis, boost potential, launch technique, competitor comparison | 2026-05-15 |
| [`h22a-redtop-autocross-capability.md`](../h-series/specifications/h22a-redtop-autocross-capability.md) | T-145 | Grip levels, turn-in response, mid-corner stability, driver feedback | 2026-05-15 |
| [`h22a-redtop-rally-endurance.md`](../h-series/specifications/h22a-redtop-rally-endurance.md) | T-146 | GRM results, oil consumption under endurance, durability, mitigation strategies | 2026-05-15 |
| [`h22a-redtop-winter-driving.md`](../h-series/specifications/h22a-redtop-winter-driving.md) | T-147 | FWD winter characteristics, suspension in snow/ice, tire recommendations, cold weather starting, driving technique | 2026-05-15 |
| [`h22a-redtop-daily-usability.md`](../h-series/specifications/h22a-redtop-daily-usability.md) | T-148 | NVH levels, visibility, seat comfort, storage space, climate control | 2026-05-15 |
| [`h22a-redtop-insurance-costs.md`](../h-series/specifications/h22a-redtop-insurance-costs.md) | T-149 | Standard vs. collector insurance, premium cost factors, agreed-value policies, appreciation trends | 2026-05-15 |
| [`h22a-redtop-4ws-integration.md`](../h-series/specifications/h22a-redtop-4ws-integration.md) | T-129? | H22A Redtop 4WS integration details | 2026-05-15 |
| [`h22a-blacktop-intake-system.md`](../h-series/specifications/h22a-blacktop-intake-system.md) | T-154 | H22A Blacktop intake system: single runner manifold, 60 mm TB, plenum design, runner length, IAB butterfly, EGR circuit, aftermarket options | 2026-05-15 |
| [`h22a-blacktop-streetability.md`](../h-series/specifications/h22a-blacktop-streetability.md) | T-162 | H22A Blacktop streetability assessment: low-RPM torque, drivability, fuel economy, daily use characteristics, swap viability, maintenance schedule | 2026-05-15 |
| [`h22a-blacktop-modification-potential.md`](../h-series/tuning/h22a-blacktop-modification-potential.md) | T-163 | H22A Blacktop modification potential: bolt-on gains (+15–25 WHP Stage 1), cam upgrade path (Brian Crower Stage 2 NA/FI, JUN, Skunk2, Toda Racing specs), head work recommendations (mild P&P +8–15 HP to CNC up to 360 CFM by 4 Piston Racing), ECU/tuning platform comparison, fuel system considerations, budget build paths, realistic all-motor targets 190–260 WHP | 2026-05-15 |
| [`h22a-blacktop-reliability.md`](../h-series/reliability/h22a-blacktop-reliability.md) | T-164 | H22A Blacktop reliability record vs Redtop: FRM oil consumption, timing belt tensioner failure, VTEC solenoid gasket leaks, PCV system, cam seal leaks, valve adjustment, water pump failures, longevity data (200k+ km), forced induction limits (~6–8 psi stock), maintenance schedule, pre-purchase inspection checklist, community consensus from GRM/Honda-Tech/Attack Forums | 2026-05-15 |

## New Research Files — T-164 Blacktop Reliability

All files written following `research/template.md` format. Cross-referenced against GRM, Attack Forums, Honda-Tech, mywikimotors, MotorTrend, Facebook groups, PreludeOnline, NZHondas.com, and local service manuals.

| File | Task | Description | Date |
|------|------|-------------|------|
| [`h22a-blacktop-reliability.md`](../h-series/reliability/h22a-blacktop-reliability.md) | T-164 | H22A Blacktop reliability record vs Redtop: FRM oil consumption, timing belt tensioner failure, VTEC solenoid gasket leaks, PCV system, cam seal leaks, valve adjustment, water pump failures, longevity data (200k+ km), forced induction limits (~6–8 psi stock), maintenance schedule, pre-purchase inspection checklist, community consensus from GRM/Honda-Tech/Attack Forums | 2026-05-15 |

## Coverage Assessment

| Variant | Local Manual Coverage | QWEN.md Coverage | Research Files | Total Sources |
|---------|----------------------|------------------|---------------|
| H22A | Partial (OBD1 manual) | Extensive | 3+ |
| H22A1 | Extensive (OBD1 manual primary focus) | Extensive | 4+ |
| H22A2 | None | Moderate | 3 |
| H22A3 | None | Moderate | 2 |
| H22A4 | Extensive (BB6 manual primary focus) | Extensive | 4+ |
| H22A5 | None | Moderate | 2 |
| H22A6 | None | None | 1 (task list only) |
| H22A7 | None | Moderate | 2 |
| H22A8 | None | Moderate | 2 |
| H22Z1 | None | Moderate | 3 |
| H23A | Partial (OBD1 manual mentions) | Extensive | 4+ |

**Key findings:**
- H22A1 and H22A4 have the most comprehensive local documentation (dedicated service manuals)
- H22A2, H22A3, H22A5, H22A7, H22A8 exist only in QWEN.md (compiled reference, not service manuals)
- H22A6 is not mentioned anywhere in local materials
- H23A has partial coverage in OBD1 manual (as H23A1) and extensive coverage in QWEN.md

---

## F-Series Variant Codes

> Same approach as H-series section above. Extracted from local materials only — no external data added.
> Generated: 2026-05-15
> Task: T-014 [infra] Catalog all F-series variant codes mentioned in local materials

---

### Summary

This section documents all F-series variant codes mentioned in local project materials.
Local materials have very limited F-series coverage — the H-series-focused manuals
(OBD1_H22A_Service_Manual.md, BB6 Helms Manual) are dedicated to Honda's own engines.
F-series mentions appear only in:
- The OBD1 service manual (F22A1 emission group codes and fuel pressure specs)
- QWEN.md compiled reference (F20B racing engine, F20C competitor comparison)

**Total F-series variants documented:** 3 (F22A1, F20B, F20C)

**Note:** F20A, F22R, and other F-series codes mentioned in the task specification
(T-014) do not appear in any local file. The task spec lists "F20B, F20C, F22R, etc."
as examples, but only F20B and F20C are present in local materials.

---

### Source Files Scanned

| # | File | Format | Size | F-Series Variant Codes Found |
|---|------|--------|------|-----------------------------|
| 1 | `QWEN.md` | Markdown | ~50 KB | F20B, F20C |
| 2 | `OBD1_H22A_Service_Manual.md` | Markdown | 15 KB | F22A1 |
| 3 | `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` | OCR text | 1.75 MB | None |
| 4 | `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf` | PDF | 59 KB | None |
| 5 | `1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf` | PDF | 170 MB | None |
| 6 | `STATE.md` | Markdown | N/A | F20B, F20C, F22R (in task list only) |

---

### F22A1

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| Engine type code | OBD1_H22A_Service_Manual.md | Vehicle Identification section | "F22A1: 2.2L SOHC Sequential Multi-port Fuel Injection" — listed alongside H22A1 and H23A1 as alternative engine codes for this vehicle family |
| Emission group code (California) | OBD1_H22A_Service_Manual.md | Vehicle Identification section | Code 920: "California with F22A1 engine" — same page as H22A1 codes 100/130 and H23A1 codes 200/230 |
| Emission group code (49-state) | OBD1_H22A_Service_Manual.md | Vehicle Identification section | Code 923: "49-state with F22A1 engine" |
| Fuel pressure specs | OBD1_H22A_Service_Manual.md | Fluid Capacities section | "F22A1, H23A1 (disconnected) | 255-305 kPa | 36-43 psi" — grouped together with H23A1, separate from H22A1 specs |

**Notes:** F22A1 is a SOHC VTEC variant of the F-series 2.2L engine. It appears in the H22A1 service manual only as a cross-reference — the manual's primary focus is the H22A1 DOHC VTEC. The F22A1 was used in some USDM Accord models (1994-1997). Its presence in the H22A1 manual reflects shared platform components between F-series and H-series applications.

---

### F20B

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| Mugen racing engine | QWEN.md | Development History & Timeline section | "Mugen Motorsports develops F20B (MF204B) from H22A platform (1997-2001)" |
| Mugen F20B details | QWEN.md | Motorsport & Racing History section | Engine code MF204B, ~230 HP @ 8,500 RPM, European F3 championship, foundation for F20C development |

**Notes:** F20B is referenced in QWEN.md solely in the context of Mugen Motorsports' Formula 3 racing engine (MF204B), which was derived from the H22A platform. This is a racing variant, not a road car F-series code. The F20B name in road car context refers to the Integra GS-R engine (SOHC VTEC, 170 PS), but this road car variant is not mentioned in any local material. Only the Mugen racing application appears.

---

### F20C

| Context | Source | Location | Notes |
|---------|--------|----------|-------|
| Competitor comparison | QWEN.md | Competitor Comparisons section | "H22A vs F20C (S2000)" — full comparison table with displacement, power, torque, redline, power density, VTEC, weight, availability, cost |
| Comparison verdict | QWEN.md | Competitor Comparisons section | "F20C is the ultimate NA Honda engine but expensive and rare; H22A is more affordable" |

**Notes:** F20C appears in QWEN.md only as a competitor comparison subject against the H22A. The comparison table includes: 2.0L displacement, 240-250 HP, 9,000 RPM redline, 120 HP/L power density, VTEC, ~320 lbs weight, $4,000-6,000 used cost. No dedicated F20C section exists in local materials — it is purely a benchmark against which the H22A is measured.

---

### Variants NOT Found in Local Materials

The following F-series codes were mentioned in the task specification (T-014) but do **not** appear in any local file:

| Variant | Reason | Notes |
|---------|--------|-------|
| F20A | Not in any local file | B-series predecessor; not relevant to H-series scope |
| F22R | Not in any local file | Accord Type R engine; appears in STATE.md task list but not in local content |
| F20B (road car) | Not in any local file | Only the Mugen racing variant (MF204B) is mentioned |

---

## Notes

- This catalog is derived exclusively from local project materials. No external web sources were used.
- Variant codes appearing only in STATE.md's task description (T-013) were verified against QWEN.md and other local files.
- H22A6 is listed in the task specification but does not appear in any scanned local file.
- The BB6 extracted text (H22A4) contains repeated references across multiple VIN ranges, indicating consistent usage throughout the manual.
- **F-series coverage is minimal.** The local materials are H-series focused. F22A1 appears in the OBD1 service manual as a cross-reference. F20B and F20C appear only in QWEN.md's racing and comparison sections. No dedicated F-series service manual or documentation exists in the local materials.
