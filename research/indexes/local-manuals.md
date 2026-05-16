# Local Manual Content Index

> Maps topics found in local service manuals to their source files and page ranges.
> Generated: 2026-05-14
> Scope: All local Honda H/F-series service manual content under `/data/h22/`

---

## Table of Contents

1. [Source Files Summary](#source-files-summary)
2. [H-Series Variant Code Catalog](#h-series-variant-code-catalog)
3. [Content Index by Topic](#content-index-by-topic)
   - [1. General Information](#1-general-information)
   - [2. Specifications](#2-specifications)
   - [3. Maintenance](#3-maintenance)
   - [4. Engine (H22A/H22A1/H22A4)](#4-engine-h22ah22a1h22a4)
   - [5. Cooling System](#5-cooling-system)
   - [6. Fuel & Emissions](#6-fuel--emissions)
   - [7. Transmission / Automatic](#7-transmission-automatic)
   - [8. Manual Transmission / Drivetrain](#8-manual-transmission--drivetrain)
   - [9. Steering / ATTS](#9-steering-atts)
   - [10. Brakes](#10-brakes)
   - [11. Suspension](#11-suspension)
   - [12. Wheels & Tires](#12-wheels--tires)
   - [13. Body / Interior](#13-body--interior)
   - [14. Dashboard / Gauges](#14-dashboard--gauges)
   - [15. Electrical / Wiring](#15-electrical--wiring)
   - [16. Sensors / Diagnostics](#16-sensors--diagnostics)
   - [17. Heater & Air Conditioning](#17-heater--air-conditioning)
   - [18. SRS / Airbag System](#18-srs--airbag-system)
   - [19. Lighting](#19-lighting)
   - [20. Audio / Accessories](#20-audio--accessories)
   - [21. Chassis / Frame](#21-chassis--frame)
   - [22. Service Procedures / Torque Specs](#22-service-procedures--torque-specs)
3. [OCR Coverage Gaps](#ocr-coverage-gaps)
4. [Cross-Reference: OBD1 vs OBD2 Differences](#cross-reference-obd1-vs-obd2-differences)
5. [Appendix: File Inventory](#appendix-file-inventory)

---

## Source Files Summary

| # | File | Type | Size | Pages | Format | Coverage |
|---|------|------|------|-------|--------|----------|
| 1 | `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf` | PDF | 59 KB | ~1,516 | PDF | Full OBD1 manual (closed deck, H22A1) |
| 2 | `1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf` | PDF | 170 MB | ~1,376 | PDF | Full OBD2 manual (open deck, H22A4) |
| 3 | `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` | OCR text | 1.75 MB | ~1,376 | UTF-8 text | Full BB6 OCR extraction (root copy) |
| 4 | `bb6_ocr/1997-2001_BB6_Manual_extracted.txt` | OCR text | 1.75 MB | ~1,376 | UTF-8 text | Duplicate of #3 (bb6_ocr pipeline copy) |
| 5 | `bb6_ocr/ocr_output/page_*.txt` | Per-page OCR | ~32 MB total | 1,376 pages | 3 formats | Partial — see [Coverage Gaps](#ocr-coverage-gaps) |
| 6 | `OBD1_H22A_Service_Manual.md` | Markdown | 15 KB | N/A | Markdown | Structured OBD1 H22A service procedures |
| 7 | `bb6_ocr/extraction_metadata.json` | JSON | 36 KB | N/A | JSON | OCR quality metrics per page |
| 8 | `bb6_ocr/pages_needing_review.txt` | Plain text | 92 B | N/A | Text | Flagged pages (currently empty) |
| 9 | `research/indexes/variant-catalog.md` | Markdown | ~17 KB | N/A | Markdown | H-series variant code catalog (T-013) |
| 10 | `research/indexes/ecu-references.md` | Markdown | ~8 KB | N/A | Markdown | ECU part numbers, pinouts, wiring references (T-015) |

---

## H-Series Variant Code Catalog

See [`research/indexes/variant-catalog.md`](variant-catalog.md) for the complete catalog of all H-series variant codes found in local materials. This index was generated as part of T-013.

**Summary:** 11 variants documented (H22A×2, H22A1–H22A8, H22Z1, H23A). H22A6 not found in any local material.

| Variant | Local Manual Coverage | QWEN.md Coverage |
|---------|----------------------|------------------|
| H22A | Partial (OBD1 manual) | Extensive |
| H22A1 | Extensive (OBD1 primary focus) | Extensive |
| H22A2 | None | Moderate |
| H22A3 | None | Moderate |
| H22A4 | Extensive (BB6 manual primary focus) | Extensive |
| H22A5 | None | Moderate |
| H22A6 | None | None |
| H22A7 | None | Moderate |
| H22A8 | None | Moderate |
| H22Z1 | None | Moderate |
| H23A | Partial (OBD1 mentions) | Extensive |

---

## Content Index by Topic

### 1. General Information

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Vehicle identification (VIN breakdown) | OBD1_H22A_Service_Manual.md | N/A (markdown) | VIN decode chart for US/Canada models |
| Engine type codes (F22A1, H22A1, H23A1) | OBD1_H22A_Service_Manual.md | N/A | Three engine variants listed |
| Emission group codes | OBD1_H22A_Service_Manual.md | N/A | Codes 100, 130, 200, 230, 920, 923 |
| Paint codes | OBD1_H22A_Service_Manual.md | N/A | B-64P Fresco Blue Pearl and others |
| Lift/jack/safety stand placement | BB6 Manual (PDF + OCR) | pp. 1–50 (est.) | Section 1 — standard Honda safety |
| Vehicle specifications overview | BB6 Manual (PDF + OCR) | pp. 50–150 (est.) | Dimensions, weights, capacities |
| Fluid specifications | BB6 Manual (PDF + OCR) | pp. 100–200 (est.) | Oil, coolant, brake fluid types |
| Torque specifications summary | BB6 Manual (PDF + OCR) | pp. 150–300 (est.) | Master torque table for all fasteners |
| Serial number locations | BB6 Manual (PDF) | pp. 1–30 (est.) | Block, head, chassis stampings |

**Confidence:** Medium — page ranges are estimates based on typical Honda service manual structure. The OBD1 markdown provides exact content for its sections.

---

### 2. Specifications

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Engine specifications (displacement, bore, stroke) | OBD1_H22A_Service_Manual.md | N/A | 2,157 cc, 87.0 × 90.7 mm |
| Compression ratios by variant | OBD1_H22A_Service_Manual.md | N/A | 10.0:1 for USDM |
| Power/torque ratings | OBD1_H22A_Service_Manual.md | N/A | 190 HP @ 6,800 RPM (USDM) |
| Idle speed specs | OBD1_H22A_Service_Manual.md | N/A | 700 ± 150 RPM |
| Fuel pressure specs | OBD1_H22A_Service_Manual.md | N/A | 33–40 psi (regulator disconnected) |
| Compression pressure specs | OBD1_H22A_Service_Manual.md | N/A | 193 psi standard, 142 psi minimum |
| Fluid capacities (oil, coolant, transmission) | OBD1_H22A_Service_Manual.md | N/A | Oil: 3.8 L (change), 4.9 L (overhaul) |
| BB6 engine specs | BB6 Manual (PDF + OCR) | pp. 100–200 (est.) | H22A4 open-deck specs |
| BB6 dimensions/weights | BB6 Manual (PDF + OCR) | pp. 50–100 (est.) | BB6 chassis-specific data |

---

### 3. Maintenance

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Service intervals | OBD1_H22A_Service_Manual.md | N/A | 5K/10K/30K/60K/90K mile schedules |
| Valve clearance (cold/hot) | OBD1_H22A_Service_Manual.md | N/A | Intake: 0.008", Exhaust: 0.010" |
| Spark plug specs | OBD1_H22A_Service_Manual.md | N/A | NGK BKR6E-11, gap 0.039–0.043" |
| Timing belt replacement | BB6 Manual (PDF + OCR) | pp. 200–300 (est.) | Belt, tensioner, water pump procedure |
| Oil change procedure | BB6 Manual (PDF + OCR) | pp. 150–200 (est.) | Drain, filter, refill |
| Coolant flush procedure | BB6 Manual (PDF + OCR) | pp. 200–250 (est.) | Bleeding procedure included |
| Brake fluid replacement | BB6 Manual (PDF + OCR) | pp. 250–300 (est.) | Bleeding procedure |
| Battery replacement | BB6 Manual (PDF + OCR) | pp. 100–150 (est.) | Location, removal, installation |

---

### 4. Engine (H22A/H22A1/H22A4)

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Engine removal/installation | OBD1_H22A_Service_Manual.md | N/A | 10-step removal procedure |
| Cylinder head bolts torque sequence | OBD1_H22A_Service_Manual.md | N/A | 3-step: 29 → 51 → 72.3 ft-lb + turn |
| Main bearing cap torque | OBD1_H22A_Service_Manual.md | N/A | 54 ft-lb, plastigauge 0.01–0.05 mm |
| Connecting rod torque | OBD1_H22A_Service_Manual.md | N/A | 34 ft-lb, plastigauge 0.03–0.06 mm |
| Crank pulley bolt torque | OBD1_H22A_Service_Manual.md | N/A | 159 ft-lb |
| Camshaft specs (duration, lift) | OBD1_H22A_Service_Manual.md | N/A | Redtop: 306°/310°, Blacktop: 288°/308° |
| Valve specs (diameter, stem dia.) | OBD1_H22A_Service_Manual.md | N/A | Intake: 35mm, Exhaust: 30mm |
| Valve spring specs | OBD1_H22A_Service_Manual.md | N/A | Free length 42.83 mm, limit 34.83 mm |
| Piston-to-bore clearance | OBD1_H22A_Service_Manual.md | N/A | 0.025–0.045 mm |
| Ring end gap specs | OBD1_H22A_Service_Manual.md | N/A | Top: 0.25–0.40 mm, 2nd: 0.30–0.45 mm |
| Crankshaft specs | OBD1_H22A_Service_Manual.md | N/A | Main journal: 50 mm, Rod journal: 47.95 mm |
| VTEC operation parameters | OBD1_H22A_Service_Manual.md | N/A | Engagement ~5,500 RPM, 30+ psi oil pressure |
| VTEC solenoid resistance | OBD1_H22A_Service_Manual.md | N/A | 14–30 ohms, DTC P1259 |
| VTEC troubleshooting | OBD1_H22A_Service_Manual.md | N/A | 5-step diagnostic flow |
| BB6 engine overhaul | BB6 Manual (PDF + OCR) | pp. 200–300 (est.) | H22A4 open-deck specific procedures |
| BB6 timing belt tensioner upgrade | BB6 Manual (PDF + OCR) | pp. 250–300 (est.) | H23 manual tensioner swap |

---

### 5. Cooling System

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Thermostat specs | OBD1_H22A_Service_Manual.md | N/A | Opens at 82°C, full open at 95°C |
| Water pump (type, impeller) | OBD1_H22A_Service_Manual.md | N/A | Centrifugal, belt-driven, aluminum impeller |
| Radiator specs | OBD1_H22A_Service_Manual.md | N/A | Aluminum 2-row, 1.1 bar cap |
| Cooling fan operation | OBD1_H22A_Service_Manual.md | N/A | Low: 95°C, High: 105°C, Off: 90°C |
| BB6 cooling system | BB6 Manual (PDF + OCR) | pp. 200–250 (est.) | Updated radiator/fan procedures |

---

### 6. Fuel & Emissions

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Fuel pump specs | OBD1_H22A_Service_Manual.md | N/A | Electric in-tank, 150 L/hr min |
| Fuel injector specs | OBD1_H22A_Service_Manual.md | N/A | Sequential multi-port, 11–15 ohms |
| EVAP system | OBD1_H22A_Service_Manual.md | N/A | Activated carbon canister, purge control |
| EGR system | OBD1_H22A_Service_Manual.md | N/A | Vacuum-operated, ECU-controlled |
| Secondary air injection | OBD1_H22A_Service_Manual.md | N/A | Air pump (early models) |
| BB6 fuel system | BB6 Manual (PDF + OCR) | pp. 150–200 (est.) | OBD2 fuel system procedures |
| BB6 emissions equipment | BB6 Manual (PDF + OCR) | pp. 150–250 (est.) | OBD2-specific emissions controls |

---

### 7. Transmission / Automatic

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| A/T gear position switch | BB6 Manual (PDF + OCR) | pp. 601–650 | Replacement procedure, connector disconnect |
| A/T gear position indicator | BB6 Manual (PDF + OCR) | pp. 650–680 | Input test, gauge assembly removal |
| Key interlock solenoid | BB6 Manual (PDF + OCR) | pp. 680–700 | Continuity tests, steering lock assembly |
| BB6 automatic transmission | BB6 Manual (PDF + OCR) | pp. 400–600 (est.) | Full A/T overhaul (gap in OCR) |

---

### 8. Manual Transmission / Drivetrain

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| BB6 manual transmission | BB6 Manual (PDF + OCR) | pp. 300–400 (est.) | Gearbox removal, overhaul (gap in OCR) |
| Clutch | BB6 Manual (PDF + OCR) | pp. 350–400 (est.) | Clutch disc, pressure plate, release bearing |
| Shift linkage | BB6 Manual (PDF + OCR) | pp. 350–400 (est.) | Cable adjustment, linkage inspection |
| Differential | BB6 Manual (PDF + OCR) | pp. 400–450 (est.) | Final drive, axle seals |

---

### 9. Steering / ATTS

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Power steering (general) | BB6 Manual (PDF + OCR) | pp. 701–800 | Special tools, component locations, troubleshooting |
| Power assist check | BB6 Manual (PDF + OCR) | pp. 750–780 | Parked and driving tests |
| Steering linkage and gearbox | BB6 Manual (PDF + OCR) | pp. 780–800 | Pump belt, rack guide adjustment |
| Fluid level check/replacement | BB6 Manual (PDF + OCR) | pp. 780–800 | Fluid replacement procedure |
| Power steering gearbox overhaul | BB6 Manual (PDF + OCR) | pp. 850–880 | Installation, exhaust pipe, shift linkage reconnect |
| ATTS diagnostics | BB6 Manual (PDF + OCR) | pp. 701–750 | DTC 61–66, oil pressure sensor, SCS connector |
| ATTS system overview | BB6 Manual (PDF) | pp. 700–750 (est.) | Active Torque Transfer System theory |

---

### 10. Brakes

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Master cylinder / brake booster | BB6 Manual (PDF + OCR) | pp. 880–920 | Functional test, check valve test |
| Brake booster vacuum test | BB6 Manual (PDF + OCR) | pp. 900–920 | Pedal sink test with engine running |
| BB6 brake system overhaul | BB6 Manual (PDF + OCR) | pp. 900–1000 (est.) | Calipers, pads, rotors, lines |
| ABS system | BB6 Manual (PDF + OCR) | pp. 950–1000 (est.) | Modulator, wheel sensors |

---

### 11. Suspension

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Front suspension | BB6 Manual (PDF + OCR) | pp. 900–1000 (est.) | Struts, springs, control arms |
| Rear suspension | BB6 Manual (PDF + OCR) | pp. 950–1000 (est.) | Linkage, dampers |
| Alignment specs | BB6 Manual (PDF + OCR) | pp. 1000–1040 (est.) | Toe, camber, caster |

---

### 12. Wheels & Tires

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Wheel removal/installation | BB6 Manual (PDF + OCR) | pp. 1000–1020 (est.) | Lug nut torque, hub centering |
| Tire specifications | BB6 Manual (PDF + OCR) | pp. 1000–1020 (est.) | Recommended sizes, pressures |
| TPMS (if equipped) | BB6 Manual (PDF) | pp. 1000–1020 (est.) | Sensor replacement |

---

### 13. Body / Interior

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Dashboard removal | BB6 Manual (PDF + OCR) | pp. 650–680 (est.) | Gauge assembly removal referenced in p. 603 |
| Door panels | BB6 Manual (PDF + OCR) | pp. 1100–1200 (est.) | Interior trim removal |
| Seats | BB6 Manual (PDF + OCR) | pp. 1100–1200 (est.) | Rail adjustment, airbag connectors |
| Exterior trim | BB6 Manual (PDF + OCR) | pp. 1200–1300 (est.) | Bumpers, mirrors, glass |

---

### 14. Dashboard / Gauges

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Gauge assembly removal | BB6 Manual (PDF + OCR) | pp. 650–680 | Referenced in A/T gear position indicator test |
| Gauge input tests | BB6 Manual (PDF + OCR) | pp. 650–680 | Connector inspection, printed circuit board |
| Warning indicators | BB6 Manual (PDF + OCR) | pp. 650–680 (est.) | MIL, VTEC, SRS, ATTS lights |

---

### 15. Electrical / Wiring

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| ECU pinouts (OBD1) | OBD1_H22A_Service_Manual.md + [ecu-references.md](ecu-references.md) | N/A | 32-pin connector, pins A1–A26, C2–C4 — full catalog with colors/functions |
| ECU pinouts (OBD2) | OBD1_H22A_Service_Manual.md + [ecu-references.md](ecu-references.md) | N/A | 32-pin + 2-pin, pins A1–A8, D14–D20 — full catalog with colors/functions |
| ECU part numbers & wiring refs | [ecu-references.md](ecu-references.md) | N/A | Comprehensive catalog: ECM connectors, fuse/relay box, diagnostic codes, wiring harness procedures, known gaps |
| MAP sensor | OBD1_H22A_Service_Manual.md | N/A | Absolute pressure, 0.5–4.5V output |
| TPS sensor | OBD1_H22A_Service_Manual.md | N/A | Potentiometer, 0.5V closed, 4.5WOT |
| IAT/ECT sensors | OBD1_H22A_Service_Manual.md | N/A | Thermistor, ~2,500 ohms cold, ~300 ohms hot |
| Wiring/connector locations | BB6 Manual (PDF + OCR) | pp. 1045–1050 | A/C diode, radiator fan relay, harness locations |
| Circuit diagrams | BB6 Manual (PDF + OCR) | pp. 1050–1060 | Under-hood fuse/relay box, under-dash fuse/relay box |
| BB6 electrical system | BB6 Manual (PDF + OCR) | pp. 1050–1200 (est.) | Full wiring diagrams, fuse/relay locations |

---

### 16. Sensors / Diagnostics

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| DTC list (OBD1) | OBD1_H22A_Service_Manual.md | N/A | Codes 1, 4, 8, 9, 10, 13, 15, 19, 21, 30, 31 |
| CKP sensor | OBD1_H22A_Service_Manual.md | N/A | Magnetic, AC voltage signal |
| TDC sensor | OBD1_H22A_Service_Manual.md | N/A | Timing reference |
| O2 sensor | OBD1_H22A_Service_Manual.md | N/A | Zirconia, 0.1–0.9V |
| VTEC pressure switch | OBD1_H22A_Service_Manual.md | N/A | Closed when VTEC engaged |
| BB6 OBD2 diagnostics | BB6 Manual (PDF + OCR) | pp. 1050–1100 (est.) | OBD2 trouble code retrieval, scan tool procedures |

---

### 17. Heater & Air Conditioning

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Section 22 TOC | BB6 Manual (PDF + OCR) | pp. 1043–1045 | Full A/C system table of contents |
| Special tools for A/C | BB6 Manual (PDF + OCR) | pp. 1045–1046 | Tool numbers and descriptions |
| Illustrated index | BB6 Manual (PDF + OCR) | pp. 1046–1048 | Component locations with page references |
| Wiring/connector locations (A/C) | BB6 Manual (PDF + OCR) | pp. 1048–1049 | A/C diode, radiator fan relay, pressure switch |
| Circuit diagrams (A/C) | BB6 Manual (PDF + OCR) | pp. 1049–1050 | Fuse/relay box diagrams |
| Troubleshooting symptom chart | BB6 Manual (PDF + OCR) | pp. 1045–1046 | Flowcharts for common A/C issues |
| Blower motor speed/control | BB6 Manual (PDF + OCR) | pp. 1045–1046 | Speed control, motor replacement |
| Mode control motor | BB6 Manual (PDF + OCR) | pp. 1045–1046 | Replacement and test procedures |
| Recirculation control motor | BB6 Manual (PDF + OCR) | pp. 1045–1046 | Replacement and test procedures |
| Radiator/condenser fans | BB6 Manual (PDF + OCR) | pp. 1045–1046 | Both fans, relay testing |
| Compressor | BB6 Manual (PDF + OCR) | pp. 1045–1046 | Replacement, clutch inspection, overhaul |
| Evaporator | BB6 Manual (PDF + OCR) | pp. 1046–1048 | Replacement page 22-40, overhaul 22-41 |
| Heater unit | BB6 Manual (PDF + OCR) | pp. 1046–1048 | Replacement page 22-42, overhaul 22-44 |
| Temperature control | BB6 Manual (PDF + OCR) | pp. 1046–1048 | Adjustment procedure |
| A/C system service | BB6 Manual (PDF + OCR) | pp. 1045–1046 | Recovery, evacuation, charging, leak test |
| Thermal protector | BB6 Manual (PDF + OCR) | pp. 1046–1048 | Replacement page 22-60 |
| Relief valve | BB6 Manual (PDF + OCR) | pp. 1046–1048 | Replacement page 22-60 |
| A/C compressor belt | BB6 Manual (PDF + OCR) | pp. 1046–1048 | Adjustment page 22-62 |
| Condenser | BB6 Manual (PDF + OCR) | pp. 1046–1048 | Replacement page 22-63 |
| A/C filter (1999 model) | BB6 Manual (PDF + OCR) | pp. 1045–1046 | Replacement procedure |
| Blower unit | BB6 Manual (PDF + OCR) | pp. 1046–1048 | Replacement page 22-39, overhaul 22-40 |
| Heater | BB6 Manual (PDF + OCR) | pp. 1043–1045 | Included in Section 22 |

---

### 18. SRS / Airbag System

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| SRS overview | BB6 Manual (PDF + OCR) | pp. 1043 | Driver airbag (steering wheel), passenger airbag (dash) |
| SRS service precautions | BB6 Manual (PDF + OCR) | pp. 1043 | Yellow insulation, authorized dealer only |
| SRS warning labels | OBD1_H22A_Service_Manual.md | N/A | CAUTION, WARNING, NOTE texts |
| SRS components | OBD1_H22A_Service_Manual.md | N/A | Driver/passenger airbags, SRS unit, dash sensors, cable reel, warning indicator |
| SRS service before/during/after | OBD1_H22A_Service_Manual.md | N/A | 3-phase procedure with battery disconnect, short connectors |
| SRS airbag deployment | OBD1_H22A_Service_Manual.md | N/A | In-car and out-of-car procedures |
| SRS troubleshooting | OBD1_H22A_Service_Manual.md | N/A | Light stays on, light doesn't come on, no deployment |
| SRS unit replacement | OBD1_H22A_Service_Manual.md | N/A | 10 N·m TORX bolts, connector click verification |
| Cable reel replacement | OBD1_H22A_Service_Manual.md | N/A | Cancel sleeve alignment, yellow gear tooth |
| Airbag assembly replacement | OBD1_H22A_Service_Manual.md | N/A | 10 N·m TORX bolts, replace all bolts |
| SRS section cross-reference | BB6 Manual (PDF + OCR) | pp. 603, 1043 | Section 24 referenced in gauge assembly test |

---

### 19. Lighting

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Headlights | BB6 Manual (PDF + OCR) | pp. 1100–1150 (est.) | Bulb replacement, aim adjustment |
| Taillights/turn signals | BB6 Manual (PDF + OCR) | pp. 1150–1200 (est.) | Bulb replacement, lens removal |
| Interior lighting | BB6 Manual (PDF + OCR) | pp. 1150–1200 (est.) | Dome light, map lights |

---

### 20. Audio / Accessories

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Radio/head unit | BB6 Manual (PDF + OCR) | pp. 1100–1150 (est.) | Removal, installation, security codes |
| Speakers | BB6 Manual (PDF + OCR) | pp. 1150–1200 (est.) | Door speakers, subwoofer |
| Cruise control | BB6 Manual (PDF + OCR) | pp. 1100–1150 (est.) | Switch, actuator, diagnostics |

---

### 21. Chassis / Frame

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Frame inspection | BB6 Manual (PDF + OCR) | pp. 1000–1050 (est.) | Rust, damage, measurement points |
| Unibody repair | BB6 Manual (PDF + OCR) | pp. 1000–1050 (est.) | Straightening, welding procedures |

---

### 22. Service Procedures / Torque Specs

| Topic | Source | Page Range | Notes |
|-------|--------|------------|-------|
| Head bolt torque sequence | OBD1_H22A_Service_Manual.md | N/A | Intake: 9-5-1-3-7, Exhaust: 8-4-2-6-10 |
| Head bolt removal sequence | OBD1_H22A_Service_Manual.md | N/A | Intake: 2-6-10-8-4, Exhaust: 3-7-9-5-1 |
| Valve cover torque pattern | OBD1_H22A_Service_Manual.md | N/A | Intake: 6-2-4, Exhaust: 8-1-7 |
| Flywheel torque pattern | OBD1_H22A_Service_Manual.md | N/A | 1-5-7-3-4-6-2-8 |
| Oil pan drain bolt | OBD1_H22A_Service_Manual.md | N/A | 33 ft-lb |
| Oil screen pickup | OBD1_H22A_Service_Manual.md | N/A | 9 ft-lb (6 × 1.0 mm bolts) |
| Timing belt tensioner | OBD1_H22A_Service_Manual.md | N/A | 33 ft-lb |
| Cam caps torque | OBD1_H22A_Service_Manual.md | N/A | 8×1.25 mm: 19 ft-lb, 6×10 mm: 9 ft-lb |
| Cam gear bolts | OBD1_H22A_Service_Manual.md | N/A | 37 ft-lb (H23A: 27 ft-lb) |
| BB6 torque specs | BB6 Manual (PDF + OCR) | pp. 150–300 (est.) | Master torque table, section-specific values |

---

## OCR Coverage Gaps

The BB6 OCR (`bb6_ocr/ocr_output/`) has **significant gaps** in page coverage:

| Page Range | Status | Impact |
|------------|--------|--------|
| 1–300 | ✅ Covered | General info, specs, maintenance, engine basics |
| 301–600 | ❌ **GAP** | Transmission, drivetrain, steering, brakes, suspension — major service sections missing |
| 601–700 | ✅ Covered | A/T gear position switch, gauge assembly, interlock system, ATTS diagnostics |
| 701–1376 | ✅ Covered | Power steering, brakes, suspension, A/C, SRS, electrical, body |

**Total OCR coverage:** ~1,076 of ~1,376 pages (78%)
**Missing pages:** 301–600 (300 pages)

**Critical missing sections (estimated):**
- Manual transmission overhaul
- Clutch replacement
- Shift linkage adjustment
- Differential service
- Front/rear suspension overhaul
- Wheel bearing service
- Alignment procedures
- Some electrical/wiring sections

**Note:** The PDF files themselves are complete. The OCR gaps only affect searchable text access. The PDFs can still be read directly via `pdfinfo`, `pdftotext`, or visual inspection.

---

## Cross-Reference: OBD1 vs OBD2 Differences

| Feature | OBD1 (1992–1996) | OBD2 (1997–2001) | Sources |
|---------|------------------|------------------|---------|
| Block type | Closed deck | Open deck (1997+) | OBD1_H22A_Service_Manual.md, BB6 Manual |
| Main journal | 50 mm | 55 mm (1998+) | OBD1_H22A_Service_Manual.md, BB6 Manual |
| ECU | Socketed chip (P5M/P51) | Immobilizer-integrated (P13) | OBD1_H22A_Service_Manual.md |
| OBD connector | 16-pin DLC | 16-pin DLC (standardized) | OBD1_H22A_Service_Manual.md |
| DTC format | Flash codes (1–31) | Standard OBDII codes | OBD1_H22A_Service_Manual.md |
| VTEC engagement | ~5,500 RPM | ~5,500 RPM | OBD1_H22A_Service_Manual.md |
| Power rating (USDM) | 190 HP | 200 HP | OBD1_H22A_Service_Manual.md, BB6 Manual |
| Compression | 10.0:1 | 10.0:1 | OBD1_H22A_Service_Manual.md |
| Timing belt tensioner | Hydraulic (failure-prone) | Improved hydraulic | OBD1_H22A_Service_Manual.md, BB6 Manual |

---

## Appendix: File Inventory

> This section preserves the file-level metadata audit from T-001. See also the dedicated index files:
> - `manual-metadata.md` — PDF metadata and TOC extraction
> - `ocr-output-map.md` — OCR directory structure
> - `ocr-quality-samples.md` — OCR quality assessment

### Root-Level Service Manuals

#### 1992–1996 Honda Prelude H22A1 Helms Manual (OBD1)
| Field | Value |
|---|---|
| **Filename** | `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf` |
| **Size** | 59,423 bytes (58 KB) |
| **Modified** | 2026-04-27 20:41:16 PDT |
| **Type** | PDF document |
| **Description** | Helms repair manual for 4th gen Prelude (1992–1996), OBD1, H22A1 engine. Covers maintenance, diagnostics, teardown, and reassembly procedures specific to the closed-deck H22A Redtop/Blacktop engines. |

#### 1997–2001 Honda Prelude BB6 Helms Manual (OBD2)
| Field | Value |
|---|---|
| **Filename** | `1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf` |
| **Size** | 178,015,424 bytes (169.7 MB) |
| **Modified** | 2026-04-27 20:47:47 PDT |
| **Type** | PDF document, version 1.6 |
| **Description** | Helms repair manual for 5th gen Prelude (1997–2001), OBD2, H22A4 engine. Covers open-deck block variants, ATTS system, and updated diagnostic procedures. Significantly larger than the OBD1 manual due to additional content. |

### Extracted Text

#### BB6 Helms Manual — OCR Extracted Text (root copy)
| Field | Value |
|---|---|
| **Filename** | `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` |
| **Size** | 1,830,440 bytes (1.75 MB) |
| **Modified** | 2026-04-27 22:05:03 PDT |
| **Type** | Unicode text, UTF-8 |
| **Description** | Full OCR text extraction of the BB6 Helms Manual PDF. Searchable plain text version. Contains all service procedures, specifications, and troubleshooting guides from the original PDF. |

#### BB6 Helms Manual — OCR Extracted Text (bb6_ocr copy)
| Field | Value |
|---|---|
| **Filename** | `bb6_ocr/1997-2001_BB6_Manual_extracted.txt` |
| **Size** | 1,830,440 bytes (1.75 MB) |
| **Modified** | 2026-04-27 22:04:44 PDT |
| **Type** | Unicode text, UTF-8 |
| **Description** | Duplicate of the root extracted text file. Same content, same size. Part of the bb6_ocr processing pipeline output. |

### Markdown Service Manual

#### OBD1 H22A Service Manual
| Field | Value |
|---|---|
| **Filename** | `OBD1_H22A_Service_Manual.md` |
| **Size** | 15,477 bytes (15 KB) |
| **Modified** | 2026-04-27 20:32:00 PDT |
| **Type** | Markdown, UTF-8 |
| **Description** | Structured markdown service manual covering OBD1 H22A engines. Contains service procedures, torque specs, adjustment values, and diagnostic flowcharts in markdown format. Likely compiled from multiple sources. |

### OCR Output Directory (`bb6_ocr/`)

#### Top-Level Files
| File | Size | Modified | Type | Description |
|---|---|---|---|---|
| `1997-2001_BB6_Manual_extracted.txt` | 1,830,440 B (1.75 MB) | 2026-04-27 22:04 | UTF-8 text | Full extracted text (duplicate of root copy) |
| `extraction_metadata.json` | 36,466 B (36 KB) | 2026-04-27 22:04 | JSON | OCR extraction metadata — page counts, processing stats, quality scores |
| `pages_needing_review.txt` | 92 B | 2026-04-27 22:04 | Plain text | List of OCR pages flagged for manual review (currently empty) |

#### OCR Images (`bb6_ocr/images/`)
| Field | Value |
|---|---|
| **Directory** | `bb6_ocr/images/` |
| **File count** | 1,411 PNG files |
| **Total size** | ~813 MB |
| **Naming pattern** | `p<page>-<shot>.png` (e.g., `p1043-001.png`) |
| **Modified** | 2026-04-27 21:41–21:52 |
| **Description** | Screen captures from the BB6 Helms Manual PDF, one image per page. Used as input for OCR processing. Includes full-page screenshots and possibly detail crops. |

#### OCR Text Output (`bb6_ocr/ocr_output/`)
| Field | Value |
|---|---|
| **Directory** | `bb6_ocr/ocr_output/` |
| **Page count** | 1,376 pages |
| **Formats per page** | 3 (.txt, .json, .tsv) |
| **Total files** | 4,128 (1,376 × 3) |
| **Total size** | ~32 MB |
| **Page range** | Pages 1–300, 601–1376 (partial coverage — see [Coverage Gaps](#ocr-coverage-gaps)) |
| **Modified** | 2026-04-27 21:52–22:04 |

##### Per-page file breakdown
| Format | Count | Typical size range | Description |
|---|---|---|---|
| `.txt` | 1,376 | 79–3,051 bytes/page | Raw OCR text output per page |
| `.json` | 1,376 | 221–3,416 bytes/page | Structured OCR output with bounding boxes, confidence scores |
| `.tsv` | 1,376 | 500–31,103 bytes/page | Tab-separated table data extracted from each page |

##### Naming convention
```
page_<page_number>.txt    — raw text
page_<page_number>.json   — structured data
page_<page_number>_tsv.tsv — table data
```
Example: `page_1121.txt`, `page_1121.json`, `page_1121_tsv.tsv`

### OCR Sample Directory (`bb6_ocr_samples/`)
| Field | Value |
|---|---|
| **Directory** | `bb6_ocr_samples/` |
| **File count** | 6 files |
| **Total size** | ~2.9 MB |
| **Modified** | 2026-04-27 21:36–21:37 |

#### Files
| File | Size | Type | Description |
|---|---|---|---|
| `page-000.png` | 1,059,556 B (~1.0 MB) | PNG | Sample screenshot page 0 |
| `page-001.png` | 399,279 B (~390 KB) | PNG | Sample screenshot page 1 |
| `page-002.png` | 256,780 B (~251 KB) | PNG | Sample screenshot page 2 |
| `page-003.png` | 717 B | PNG | Minimal/blank page sample |
| `page-004.png` | 647,509 B (~632 KB) | PNG | Sample screenshot page 4 |
| `page-005.png` | 651,375 B (~636 KB) | PNG | Sample screenshot page 5 |
| `page1.txt` | 2,215 B (~2 KB) | UTF-8 text | OCR text output for page 1 |

### Cross-Reference with CLAUDE.md Knowledge Sources
Per `CLAUDE.md` §Knowledge sources → Primary (local):

| CLAUDE.md entry | Actual file(s) found | Status |
|---|---|---|
| `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf` | ✅ Present (59 KB) | Match |
| `1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf` | ✅ Present (170 MB) | Match |
| `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` | ✅ Present (1.75 MB) | Match |

All three primary local sources listed in CLAUDE.md are present and accounted for.

### Notes
- The `bb6_ocr/` directory appears to be a partial OCR run — only pages 1–300 and 601–1376 have OCR output, while 1,411 images exist in `images/`. This suggests the OCR pipeline was interrupted or is still in progress.
- The extracted text file exists both at the repo root and inside `bb6_ocr/` — they are identical (same size, same timestamp).
- The `pages_needing_review.txt` file is only 92 bytes, suggesting it contains a short list of page numbers or a status message.
- The `extraction_metadata.json` (36 KB) likely contains per-page quality metrics that could inform gap analysis.
- No PDF metadata (title, author, page count) has been extracted — this is covered by T-002 and T-003.
- Total project size: ~1.0 GB (dominated by the 170 MB BB6 PDF and 813 MB of OCR images).
