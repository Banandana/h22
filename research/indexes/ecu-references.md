# ECU Part Numbers and Pinout References

Catalog of all ECU/ECM part numbers, connector pinouts, and wiring references extracted
from local service manuals. Each entry includes source file and page reference.

**Created:** 2026-05-14
**Task:** T-015 [infra] Extract all ECU part numbers and pinout references from local manuals
**Scope:** Local manuals only — no external data added.

---

## Sources

| Source | File | Format | Pages |
|--------|------|--------|-------|
| BB6 Helms Manual (OBD2) | `1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf` | PDF + OCR text | 1,376 pages |
| OBD1 H22A Service Manual | `OBD1_H22A_Service_Manual.md` | Markdown | ~500 lines |

---

## 1. ECM Connector A (32P) — OBD2 H22A4 (1997-2001)

**Source:** `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt`, page 73 (BB6 OCR section)
**Context:** Ignition system diagnostics — ECM connector pin identification for troubleshooting

### Pinout Table

| Pin | Color | Function |
|-----|-------|----------|
| A1 | Yellow | Injector #4 |
| A2 | Blue | Injector #3 |
| A3 | Red | Injector #2 |
| A4 | Brown | Injector #1 |
| A8 | Green/Yellow | VTEC Solenoid Valve |
| A11 | Yellow/Black | PGM-FI Power |
| A12 | Black/Blue | Idle Air Control Valve |
| D14 | White | HO2S Sense (O2 Sensor) |
| D15 | Red/Yellow | IAT Sensor (Intake Air Temp) |
| D17 | White/Blue | MAP Sensor (Manifold Absolute Pressure) |
| D20 | Yellow/White | TP Sensor (Throttle Position) |

### Wiring Diagnostics Referenced

- **ECM Connector A (32P)** disconnected during ignition coil and ICM circuit testing
  (source: BB6 OCR, page 73 / section 4-19)
- Wire continuity checks on YEL/GRN between ICM and ECM
- BLU wire continuity between ICM and tachometer gauge assembly via 16P connector
- Substitution test: "Substitute a known-good ECM" for alternator/ECM fault isolation
  (source: BB6 OCR, page 75 / section 4-21)

---

## 2. ECM Connector A (32P) — OBD1 H22A1 (1993-1996)

**Source:** `OBD1_H22A_Service_Manual.md`, section "ECU Pinouts (OBD1 H22A1)"
**Context:** OBD1 H22A1 electrical system documentation

### Main Connector (32-pin) Pinout

| Pin | Color | Function |
|-----|-------|----------|
| A1 | Yellow | Injector #4 |
| A2 | Blue | Injector #3 |
| A3 | Red | Injector #2 |
| A4 | Brown | Injector #1 |
| A8 | Green/Yellow | VTEC Solenoid Valve |
| A11 | Yellow/Black | PGM-FI Power |
| A12 | Black/Blue | Idle Air Control Valve |
| A15 | Red/Yellow | Evap Purge Control Solenoid |
| A16 | Green/Orange | Fuel Pump Relay |
| A17 | Pink/Blue | A/C Clutch Relay |
| A18 | Gray/Red | MIL (Check Engine Light) |
| A20 | Yellow/Green | ICM (Ignition Control Module) |
| A25 | White | Intake Control Solenoid Valve |
| A26 | Red/Blue | IAB Control Solenoid Valve |
| C2 | Blue | CKP Detect (Crankshaft Position) |
| C3 | Green | TDCP Detect (Top Dead Center Pilot) |
| C4 | Yellow | CKP Detect (Crankshaft Position) |

### Sensor Connector Pin Assignments

| Pin | Signal |
|-----|--------|
| 1 | O2 Sensor |
| 4 | CKP Sensor |
| 8 | TDC Sensor |
| 10 | ECT Sensor (Engine Coolant Temp) |
| 13 | BARO Sensor (Barometric Pressure) |
| 21 | VTEC Solenoid |

---

## 3. Other Connectors Referenced in BB6 Helms Manual

All sourced from `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt`:

| Connector | Type | Context | Page Ref |
|-----------|------|---------|----------|
| ECM A (32P) | 32-pin | ECM module main connector | p.73 (OCR) |
| Gauge Assembly | 16P | Gauge cluster connection | p.73 (OCR) |
| Alternator | 4P | Alternator electrical connection | p.74 (OCR) |
| Distributor | 4P | Distributor disconnect | p.74 (OCR) |
| Combination Switch | 4P | Steering column switch | p.101 (OCR) |
| Clutch Switch | 3P | Clutch pedal position switch | p.102 (OCR) |
| Control Unit | 14P | Actuator control unit | p.99 (OCR) |
| Airbag Connectors | 4P (each) | SRS airbag system | p.101 (OCR) |
| Shift Cable Holder | — | Mechanical linkage | p.115 (OCR) |
| Back-up Light Switch | — | Transmission range | p.115 (OCR) |
| Engine Wire Harness | — | Main engine harness | p.119 (OCR) |
| SRS Wiring | Yellow insulation | All SRS harnesses covered | p.1 (OCR) |

---

## 4. Fuse/Relay Box References

**Source:** `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt`, page 118 (OCR)

- Fuse/relay box referenced during engine wire harness disconnection
- Connected to engine wire harness connector on back side (page 119)

---

## 5. Part Numbers Found in Local Manuals

### ECU-Related Part Numbers

| Part Number | Description | Source | Page Ref |
|-------------|-------------|--------|----------|
| 17277-P5ML02 | Honda Motor Co., Ltd. part (context unclear, likely gasket or seal) | BB6 OCR | p.46 (OCR) |
| 38897-P13-A01AH | System SP-10 lubricant | BB6 OCR | p.86 (OCR) |
| 38899-P13-A01 | System SP-10 lubricant (alternate) | BB6 OCR | p.86 (OCR) |
| 07PAZ-0010100 | SCS Service Connector tool | BB6 OCR | p.72 (OCR) |
| 07NAG-P130100 | Timing Belt Slider tool | BB6 OCR | p.156 (OCR) |

**Note:** Several P/N entries contain "P13" but these refer to lubricant specifications
(SP-10 oil), not ECM part numbers. The ECM itself does not have a standalone part number
listed in the BB6 OCR extraction — only connector references.

---

## 6. Diagnostic Trouble Codes (OBD1)

**Source:** `OBD1_H22A_Service_Manual.md`, section "Diagnostic Trouble Codes (DTC)"

| Code | Description |
|------|-------------|
| 1 | O2 Sensor |
| 4 | CKP Sensor |
| 8 | TDC Sensor |
| 9 | No. 1 Cylinder Timing |
| 10 | ECT Sensor |
| 13 | BARO Sensor |
| 15 | Ignition Output |
| 19 | VTEC Pressure Switch |
| 21 | VTEC Solenoid |
| 30 | A/T Signal A |
| 31 | A/T Signal B |

---

## 7. Wiring Harness Disassembly Procedures

**Source:** `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt`, page 118-119 (OCR)

Key procedures referenced:
- Mark all wiring and hoses before disconnection to avoid misconnection
- Secure hood as open as possible before engine wire harness removal
- Disconnect fuse/relay box before engine wire harness removal
- Disconnect engine wire harness connector on back side
- Relieve fuel pressure (section 11) before fuel system work
- SRS wiring harnesses covered with yellow insulation — special handling required

---

## 8. Cross-Reference: OBD1 vs OBD2 Connector Differences

| Feature | OBD1 H22A1 (1993-1996) | OBD2 H22A4 (1997-2001) |
|---------|------------------------|------------------------|
| Connector | 32-pin (ECM A) | 32-pin (ECM A) |
| Shared pins | A1-A4 (injectors), A8 (VTEC solenoid), A11 (PGM-FI power), A12 (IACV) | A1-A4 (injectors), A8 (VTEC solenoid), A11 (PGM-FI power), A12 (IACV) |
| OBD1 unique | A15-A18, A20, A25, A26, C2-C4 (more analog sensor pins) | D14-D20 (digital sensor pins: HO2S, IAT, MAP, TP) |
| Diagnostic codes | Flash code (blinking CEL) | OBDII scan tool / flash code hybrid |
| Immobilizer | None | Integrated (some variants) |

---

## 10. External Research — H22A1 (USDM) ECU Variants

### P5M / P51 OBD1 ECU Analysis

**Source:** `research/h-series/engine-management/h22a1-ecu-p5m-p51-obd1-usdm.md`
**Task:** T-169 [research]
**Date:** 2026-05-15

This compiled research document covers:
- P5M ECU (USDM H22A1 automatic transmission variant)
- P51 ECU (USDM H22A1 manual transmission variant)
- **Critical finding:** P5M/P51 are NOT chip-tunable in stock form — they lack the 74HC373 latch circuitry present in chippable ECUs (P28, P06, P72)
- Hardware specifications: Hitachi H8/300 CPU, 27C256 EPROM (soldered), 32-pin connector
- Full pinout for 32-pin connector A with wire colors and functions
- Tuning methods: ECU swap to chippable unit (recommended), piggyback controllers (Apexi SAFC, AEM FIC), standalone ECUs (Haltech, Megasquirt)
- Hondata compatibility: S300 v3 requires chippable ECU (P28/P06/P72); FlashPro does NOT support H22; S200 discontinued Jan 2008
- Alternative tuning software: Crome/Crome Pro, Honda Tuning Suite, Uberdata, ECUTune
- OBD1 self-diagnostic mode procedures and common trouble codes
- Basemap differences between P5M (automatic) and P51 (manual)
- Chippable ECU reference table (P28, P72, P06, P61, P30, P75, PR4, P05)
- Hondata S300 feature summary

---

## 11. External Research — H22A Redtop ECU Variants

### P28 / P06 / OBD2a ECU Analysis

**Source:** `research/h-series/engine-management/h22a-redtop-ecu-p28-p06-obd2a.md`
**Task:** T-128 [research]
**Date:** 2026-05-15

This compiled research document covers:
- P28 ECU (D-series origin, most popular swap ECU for H22A Redtop)
- P06 ECU (EDM non-VTEC, convertible to VTEC spec)
- OBD2a/II ECU variants (P5P, P75, immobilizer-integrated)
- EPROM chip socket location and physical architecture
- Tuning potential (9–20 hp NA gains from base map chips)
- Flash/programming procedures (Hondata S300, Crome, Honda Tuning Suite)
- Dual-chip switching with 27C512 EPROM
- Cross-compatibility matrix across Honda ECU families
- Limp-mode protection logic and troubleshooting methodology

---

## 11. External Research — H22A Blacktop ECU Variants

### P28 / P06 / OBD2a / P13 ECU Analysis

**Source:** `research/h-series/engine-management/h22a-blacktop-ecu-p28-p06-obd2a.md`
**Task:** T-158 [research]
**Date:** 2026-05-15

This compiled research document covers:
- P28 ECU (4th-gen Blacktop OBD1; same hardware as Redtop, different basemap calibration)
- P06 ECU (budget swap option; requires VTEC conversion and socketing)
- P13 ECU (5th-gen Blacktop OBD2; immobilizer-integrated, S300 incompatible)
- P13-A12 (1996 only; rare non-immobilizer OBD2 variant; "hardest Honda ECU to find")
- Basemap differences between Blacktop and Redtop P28 (fuel maps, ignition timing, IAB control)
- Blacktop-specific tuning advantages (10.6:1 CR = more ignition advance margin vs Redtop's 11.0:1)
- Chip socket location and physical architecture (identical to Redtop P28/P06)
- Tuning potential (9–20 hp NA gains; Hondata S300 recommended for OBD1; P13 severely limited)
- Flash/programming procedures (OSTRICH 2.0, Cobra RTP, Moates Universal Programmer)
- OBD2-to-OBD1 conversion guide for 5th-gen Blacktop owners wanting full tuning capability
- Injector impedance mismatch warning (OBD1 low-impedance peak-and-hold vs OBD2 high-impedance saturated)
- Cross-compatibility matrix including P13-A12 rarity notes

---

## 12. External Research — H22A4 P13 ECU (OBD2)

### P13-A12 / P13-A13 Immobilizer, Tuning, Hondata Compatibility

**Source:** `research/h-series/engine-management/h22a4-p13-ecu-immobilizer-tuning.md`
**Task:** T-195 [research]
**Date:** 2026-05-15

This compiled research document covers:
- P13 variants: P13-A12 (1996 OBD2A, no immobilizer, extremely rare) vs P13-A13/Bxx (1997–2001 OBD2B, immobilizer-integrated)
- Immobilizer system details: rectangular EEPROM chip, key transponder matching, dealer programming requirement
- Immobilizer bypass methods: P13-A12 sourcing, chip swap (F23→P13), dealer programming, OBD2B-to-OBD2A conversion harness (~$100–$150)
- OBD2A vs OBD2B wiring differences (D connector pinout, harness compatibility)
- Full P13 ECM Connector A (32-pin) pinout with wire colors and functions
- Why P13 fuel maps are NOT modifiable (no bin readers exist, K-series-like memory architecture)
- Custom pre-programmed chips: Spoon (5000 VTEC/8500 redline), KS-ROM (5500 VTEC/9000 redline), Mugen (5500 VTEC/9200 redline), Stock JDM (5200 VTEC/7700 redline)
- Speed limiter: JDM P13s = 118 mph electronic governor; USDM status inconclusive
- Hondata S300: INCOMPATIBLE with P13 — requires chippable OBD1 ECU (P28/P06/P72) + harness converter + TD-60U distributor
- Hondata FlashPro: Does NOT support H22 P13 family — supports K-series/newer RSX/Civic Si/CR-Z/TL/Integra only
- Recommended tuning paths: Path A (P28 + S300, recommended), Path B (custom P13 chip, limited), Path C (standalone ECU, maximum flexibility)
- Injector impedance mismatch warning (OBD2 high-impedance saturated vs OBD1 low-impedance peak-and-hold)
- Comparison matrix: P13 vs P28 vs P72 across tunability, software support, immobilizer, community support, cost

## 13. External Research — H22A4 OBD2 Diagnostics

### 16-Pin DLC Pinout, Scan Tool Requirements, Live Data PIDs, Readiness Monitors, DTC Set

**Source:** `research/h-series/engine-management/h22a4-obd2-diagnostics.md`
**Task:** T-200 [research]
**Date:** 2026-05-15

This compiled research document covers:
- **16-pin J1962 DLC pinout** for H22A4: active pins (4=GND, 5=SIG GND, 7=K-Line, 9=SCS, 16=+12V BATT); pins 6/14 inactive (no CAN bus on 1997–2001)
- **Protocol specification:** ISO 9141-2 → ISO 14230-4 / KWP2000 over K-Line at 10.4 kbps; 5-baud init sequence
- **SCS Service Check System** on pin 9: diagnostic test mode trigger, continuation of Honda blink-code tradition
- **Manual diagnostic mode** (no scan tool): short pins 9+4, read blink codes via MIL
- **Scan tool requirements and recommendations:** OEM (Honda HDS, HRC PGM-FI Setting Tool), aftermarket professional (iCarsoft MHM/JP, Launch X-431), consumer (ELM327 + Torque Pro, INNOVA 3130); K-line compatibility warnings for cheap clones
- **Standard OBD2 PID list** (Mode $01): 40+ PIDs including RPM, ECT, MAP, TPS, IAT, O2 sensor voltages, fuel trims, timing advance, vehicle speed, with normal range values specific to H22A4
- **Honda-specific PIDs:** VTEC oil pressure switch, IACV position, A/F sensor AFR, EVAP purge flow, secondary air injection status
- **PGM-FI Data List** parameters from factory Honda procedure
- **I/M readiness monitors:** Misfire, Fuel System, Components, Catalyst, EGR, EVAP, Secondary Air, O2 Sensor, O2 Sensor Heater — with status meanings (Ready/Not Ready/MFA)
- **Honda drive cycle procedure:** Cold start → idle with A/C → steady cruise → deceleration → repeat; catalyst monitor may require 5 cycles
- **Complete DTC set:** ~80+ generic P0xxx codes (air/fuel metering, ignition/misfire, catalyst/exhaust, communication) + ~40+ Honda-specific P1xxx codes (VTEC system, sensor-specific, crank/cam sensors, idle/air management, transmission, miscellaneous)
- **Diagnostic procedures:** Basic workflow, common H22A4 scenarios (CEL on/no drivability issues, rough idle/stalling, poor performance/hesitation)
- **OBD1 vs OBD2 comparison table** for H-series

---

## 9. Known Gaps

The following items are **NOT found** in the local manual materials scanned:

- Specific ECM/ECU replacement part numbers (e.g., 37820-PLM-A02 style numbers)
- Complete wiring harness diagrams with wire routing paths
- Connector pinout for JDM-specific ECUs (P28, P06, P72)
- Full pinout for OBD2b connectors (later JDM variants)
- ECU chip/socket replacement part numbers
- Aftermarket ECU pinout mappings (Hondata, Megasquirt, etc.)
- VTEC solenoid wiring color codes beyond connector pin

These gaps will be filled by Phase 1+ research tasks using web sources.

---

*This document was created by scanning local manual files only. No external data was added.*
*For a complete ECU pinout reference including JDM variants and aftermarket solutions,*
*see the compiled QWEN.md document which incorporates both local and web-sourced data.*
