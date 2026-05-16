# Honda H-Series OBD Version Differences

> **Task:** T-119 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document provides a comprehensive comparison of OBD1 (1992–1996) versus OBD2 (1997–2001) diagnostic systems as implemented on the Honda H-series engine family (H22A, H22A1–H22A8, H22Z1). It covers ECU connector pinouts for both versions, diagnostic code retrieval procedures, full trouble code sets, physical connector differences, immobilizer integration, and scan tool requirements. The transition from OBD1 to OBD2 coincided with the 5th-generation Prelude redesign (BB6 chassis), bringing standardized diagnostics, immobilizer security, and expanded sensor monitoring.

**Key findings:**

- OBD1 uses three proprietary Honda connectors (A-side 26-pin, B-side 16-pin, D-side 22-pin for manual; auto variants add a 4th TCU connector). OBD2 uses three different connectors (A-side 32-pin, C-side 22-pin, D-side 16-pin) with blanked-out pins replacing unused circuits.
- OBD1 retrieves codes via a 2-pin Service Connector (SCS) under the glovebox — jump it and read blink patterns on the CEL. OBD2 uses the standardized 16-pin DLC under the dashboard plus the SCS jumper procedure.
- OBD1 trouble codes range from 0–31 (engine) and 1–15 (TCU auto only). OBD2 expands to codes 0–92+ with standardized OBD2 P-codes (P0100-series) in addition to Honda-specific blink codes.
- OBD2 adds immobilizer (IMO) integration via C22 (brn/yel wire), secondary O2 sensor heater circuit, fuel tank pressure sensor, and EVAP canister vent shut valve — none present on OBD1.
- OBD2 separates crankshaft position sensing into two dedicated sensors (CKP + TDC) with separate ECU pins, whereas OBD1 combines some functions.

---

## Physical Connector Differences

### OBD1 ECU Connectors (1992–1996)

OBD1 H-series ECUs use three (or four for automatic) proprietary Honda connectors. The layout varies by ECU part number but follows a consistent pin numbering scheme.

**Manual Transmission ECU (e.g., P5M, P51, P06, P28):**

| Connector | Pins | Layout | Function |
|-----------|------|--------|----------|
| **A-side** | 26 pins | A1→A26 → B1→B16 → blank → D1→D22 | Power outputs, injectors, solenoids, relay drivers |
| **B-side** | 16 pins | (continuation of A-side numbering) | Transmission-related inputs (auto only), some always blank on manual |
| **D-side** | 22 pins | (continuation) | Sensor inputs, diagnostic port, battery feed |

**Automatic Transmission ECU (e.g., P5M auto, P13 auto):**

| Connector | Pins | Notes |
|-----------|------|-------|
| **A-side** | 26 pins | Same as manual |
| **B-side** | 16 pins | Same as manual |
| **C-side** | Additional connector | TCU (Transmission Control Unit) — 4th plug for auto |
| **D-side** | 22 pins | Same as manual |

The 4th C-side connector on auto ECUs handles transmission shift solenoid control and lock-up commands. This is unique to automatic variants and absent on all manual ECUs.

### OBD2 ECU Connectors (1997–2001)

OBD2 H-series ECUs (P13, P72) use three connectors with a different layout. Many pins are blanked out compared to OBD1.

| Connector | Active Pins | Blank Pins | Function |
|-----------|-------------|------------|----------|
| **A-side** | A12–A32 (21 active) | A1–A11 blank | Injector outputs, relay drivers, solenoids |
| **C-side** | C1–C22 (22 active) | None blank | All sensor inputs, diagnostics, immobilizer |
| **D-side** | D6–D16 (11 active) | D1–D5 blank | Sensor detect inputs, reference voltages |

**Critical layout difference:** OBD2 uses a C-side connector instead of B-side. The C-side carries all sensor signals including the new CKP/TDC separation, knock sensor, and immobilizer. The D-side is significantly reduced from 22 pins (OBD1) to 11 active pins (OBD2) because many sensor signals moved to the C-side.

---

## OBD1 ECU Pinout (1992–1996 H22A1)

### A-Side (Outputs — 26 pins)

| Pin | Wire Color | Function | Notes |
|-----|-----------|----------|-------|
| A1 | brn | Injector #1 | |
| A2 | yel | Injector #4 | |
| A3 | red¹ | Injector #2 | |
| A4 | grn/yel | VTEC Solenoid Valve | Drives VTEC oil flow |
| A5 | blu | Injector #3 | |
| A6 | or/wht | HO2S Heater Coil | Primary O2 sensor heater |
| A7 | grn/blk¹ | PGM-FI Main Relay Coil | Fuel pump/EFI power |
| A8 | grn/blk² | Shorted to A7 | Redundant main relay drive |
| A9 | blk/blu | IAC Valve | Idle Air Control |
| A10 | — | (blank) | |
| A11 | red² | EGR Control Solenoid | |
| A12 | blu/red | Condenser Fan Relay | Electric cooling fan |
| A13 | blu/wht | MIL | Malfunction Indicator Light drive |
| A14 | — | (blank) | |
| A15 | red/blu | A/C Clutch Relay | |
| A16 | wht/grn | Alternator | ALT warning light drive |
| A17 | pink | IAB Solenoid Valve | Intake Air Bypass (OBD1 exclusive) |
| A18 | orn/red | FAS (A/T) | Flat Auto Signal — automatic only |
| A19 | wht | Intake Control Solenoid Valve | ICS — H22A-specific |
| A20 | red/grn | EVAP Purge Control Solenoid | |
| A21 | yel/grn¹ | ICM | Ignition Control Module signal |
| A22 | yel/grn² | Shorted to A21 | Redundant ICM signal |
| A23 | blk¹ | GND | Power ground |
| A24 | blk² | GND | Power ground |
| A25 | yel/blk | PGM-FI Main Relay (power) | Switched 12V from main relay |
| A26 | blk/red | VTEC Pressure Switch (GND) | Ground return for VTEC pressure switch |

### B-Side (Inputs — 16 pins)

| Pin | Wire Color | Function | Notes |
|-----|-----------|----------|-------|
| B1 | yel/blk | PGM-FI Main Relay (power) | Switched 12V |
| B2 | brn/blk | GND | Power ground |
| B3 | orn¹ | AFSA (A/T) | Automatic only — A/F ratio signal A |
| B4 | pnk | AFSB (A/T) | Automatic only — A/F ratio signal B |
| B5 | blu/blk | To A/C Switch | A/C request input |
| B6 | — | (blank) | |
| B7 | lt grn | ATP PN Gear Position (A/T) | Automatic only — gear selector input |
| B8 | red/grn | PSP Switch | Power Steering Pressure switch |
| B9 | blu/red | Starter Cut Relay | Prevents starter engagement under load |
| B10 | orn² | VSS | Vehicle Speed Sensor input |
| B11 | orn³ | CYP | Cylinder position signal |
| B12 | wht | CYP | Cylinder position signal (redundant) |
| B13 | orn/blu | TDC | Top Dead Center signal |
| B14 | wht/blu | TDC | TDC signal (redundant) |
| B15 | blu/grn | CKP | Crankshaft Position signal |
| B16 | blu/yel | CKP | CKP signal (redundant) |

### D-Side (Sensor Inputs & Diagnostics — 22 pins)

| Pin | Wire Color | Function | Notes |
|-----|-----------|----------|-------|
| D1 | wht/yel | Battery | Constant 12V backup |
| D2 | grn/wht¹ | Brake Switch | BKSW input |
| D3 | red/blu | KS | Knock Sensor |
| D4 | brn/wht | SCS | Service Check Signal — diagnostic mode jumper point |
| D5 | — | (blank) | |
| D6 | lt blu or lt grn | VTEC Pressure Switch | VTEC engagement confirmation |
| D7 | lt grn/red | Data Link Connector | DLC signal — OBD1 diagnostic port |
| D8 | — | (blank) | |
| D9 | wht/red | ALT | Alternator detection |
| D10 | grn/blk | ELD | Electrical Load Detector |
| D11 | red/blk | TP Sensor | Throttle Position Sensor input |
| D12 | wht/blk | EGR Valve Lift Sensor | EGR flow confirmation |
| D13 | yel/blu | ECT Sensor | Engine Coolant Temperature |
| D14 | wht | HO2S Sense | Primary Oxygen Sensor signal |
| D15 | red/yel | IAT Sensor | Intake Air Temperature |
| D16 | — | (blank) | |
| D17 | wht/blu | MAP Sensor | Manifold Absolute Pressure |
| D18 | lt grn/blk | VREF (A/T) | Reference voltage for automatic transmission sensors |
| D19 | red/wht | EGR Valve Lift Sensor | Second EGR lift sensor input |
| D20 | yel/wht | TP Sensor | Secondary TPS input |
| D21 | blu/wht | MAP Sensor | Secondary MAP input |
| D22 | grn/wht² | TP Sensor | Third TPS input (redundant circuit) |

---

## OBD2 ECU Pinout (1997–2001 H22A4)

### A-Side (Outputs — 32 pins, 21 active)

| Pin | Wire Color | Function | Notes |
|-----|-----------|----------|-------|
| A1–A11 | — | (blank) | Unused on H22A4 |
| A12 | blk/blu | Idle Air Control Valve | IACV |
| A13–A14 | — | (blank) | Unused |
| A15 | red/yel | Evap Purge Control Solenoid Valve | |
| A16 | grn/orn | Fuel Pump Relay | |
| A17 | pnk/blu | A/C Clutch Relay | |
| A18 | gry/red | MIL | Malfunction Indicator Light |
| A19 | wht/grn | ALT | Alternator warning |
| A20 | yel/grn | ICM | Ignition Control Module |
| A21 | — | (blank) | Unused |
| A22 | brn/blk | GND (digital) | Digital ground |
| A23 | blk | GND (power) | Power ground |
| A24 | yel/blk | PGM-FI Power | Switched 12V from main relay |
| A25 | wht | Intake Control Solenoid Valve | ICS |
| A26 | red/blu | IAB Control Solenoid Valve | Intake Air Bypass — polarity reversed vs OBD1 |
| A27 | grn | Radiator Fan Relay | Electric cooling fan |
| A28 | grn/wht | EVAP Bypass Solenoid Valve | New for OBD2 |
| A29 | orn/grn | Evap Canister Vent Shut Valve | New for OBD2 — enhanced EVAP |
| A30–A32 | — | (blank) | Unused |

### C-Side (Sensor Inputs — 22 pins, all active)

| Pin | Wire Color | Function | Notes |
|-----|-----------|----------|-------|
| C1 | lt grn/blk | Ref. Voltage for ATTS or TCM | Not used on H22A4 |
| C2 | blu | CKP Detect | Crankshaft Position — NEW separate circuit |
| C3 | grn | TDCP Detect | Top Dead Center — NEW separate circuit |
| C4 | yel | CKP Detect | CKP redundant |
| C5 | blu/orn | A/C Switch Signal Input | |
| C6 | blu/red | Starter Switch Input | |
| C7 | red/wht | SCS | Service Check System — diagnostic mode |
| C8 | lt grn | K Line | ISO 9141-2 scan tool communication |
| C9 | — | (blank) | Unused |
| C10 | wht/yel | ECM Backup Power | Constant 12V |
| C11 | — | (blank) | Unused |
| C12 | wht | CKP GND | CKP ground return |
| C13 | red | TDC M Side | TDC mass-side signal |
| C14 | blk | CYP M Side | Cylinder position mass-side |
| C15 | blu/blk | VTEC Pressure Switch | VTEC engagement confirmation |
| C16 | grn | P/S Pressure Switch | Power Steering pressure |
| C17 | wht/grn | ALT Detect Signal | Alternator detection |
| C18 | blu/wht | VSS Signal | Vehicle Speed Sensor |
| C19–C21 | — | (blank) | Unused |
| C22 | brn/yel | IMO Immobilizer Code Signal | **NEW — OBD2 immobilizer system** |
| C23–C31 | — | (blank) | Unused |

### D-Side (Sensor Detect — 16 pins, 11 active)

| Pin | Wire Color | Function | Notes |
|-----|-----------|----------|-------|
| D1–D5 | — | (blank) | Unused on H22A4 |
| D6 | red/blu | KS (Knock Sensor) | Knock sensor detect |
| D7 | wht | HO2S Detect | Primary O2 sensor detect |
| D8 | red/yel | IAT Intake Air Temp Detect | |
| D9 | wht/blk | EGR Valve Lift Sensor | |
| D10 | yel/blu | Vcc2 | 5V sensor reference voltage |
| D11 | grn/blk | SG2 | Sensor Ground 2 |
| D12 | grn/wht | SG1 | Sensor Ground 1 |
| D13 | — | (blank) | Unused |
| D14 | wht/red | SHO2S | Secondary O2 Sensor detect — **NEW** |
| D15 | wht/blu | PTANK | Fuel Tank Pressure sensor — **NEW** |
| D16 | grn/red | EL | Electrical Load Detect |

---

## Diagnostic Port & Code Retrieval Procedures

### OBD1 Diagnostic Procedure (1992–1996)

**Service Connector Location:** Under the dashboard, typically behind the glovebox area. A 2-pin white connector labeled "SCS" or "Diagnostic Connector."

**Procedure:**

1. Turn ignition OFF
2. Locate the 2-pin SCS diagnostic connector under the dash
3. Jump the two pins with a paperclip or jumper wire
4. Turn ignition ON (engine NOT running)
5. Watch the Check Engine Light (CEL) on the instrument cluster
6. Codes flash as blink patterns: long blinks = tens digit, short blinks = ones digit
7. After all codes display, the sequence repeats

**Code Reading Example — Code 22 (VTEC Pressure Switch):**
- Long blink × 2 (tens = 20)
- Short pause
- Short blink × 2 (ones = 2)
- Long pause between codes
- Repeat cycle

**Code 12 (System Pass):** If code 12 is the only code displayed, the ECU self-test passed with no faults stored. Code 12 is NOT a fault code — it confirms the diagnostic system is functional.

**Clearing Codes:** Remove the PGM-FI Main Relay (fuse box under dash) for 30 seconds, or disconnect the battery negative terminal for 10+ seconds. Codes will clear along with ECU memory (including learned idle trim).

### OBD2 Diagnostic Procedure (1997–2001)

**DLC Location:** Standardized 16-pin OBD2 connector under the dashboard, typically near the driver's knee bolster. Pull out the cup holder to reveal it in the Prelude.

**Honda-Specific Code Retrieval (Blink Codes):**

1. Turn ignition OFF
2. Jump SCS terminator (2-pin connector under dash) with the provided yellow SCS terminator tool or paperclip
3. Turn ignition ON (engine NOT running)
4. Watch the MIL (Malfunction Indicator Light)
5. Codes flash in the same pattern as OBD1 (long = tens, short = ones)
6. Additionally, scan tools connected to the DLC can read live data and standardized OBD2 P-codes

**Scan Tool Requirements:**

- **OBD1:** No scan tool required for basic code reading. For advanced diagnostics, Honda HDS (Honda Diagnostic System) or aftermarket OBD1-compatible scanners (e.g., Hondata S300) can read live data and flash ECU chips.
- **OBD2:** Any standard OBD2 scanner reads standardized P-codes. Honda-specific scanners (HDS, Proscan) access additional manufacturer-specific data. The K-Line (C8 on OBD2 ECU) provides Honda-specific protocol support.

**Clearing Codes:** Use an OBD2 scan tool to clear codes, or disconnect the battery for 10+ seconds. Note: OBD2 monitors (readiness codes) require a drive cycle to reset after clearing.

---

## OBD1 Trouble Code Set (1992–1996)

### Engine Control Module (ECM) Codes — Honda Specific

These are Honda-specific blink codes displayed on the CEL. They predate the standardized OBD2 P-code system.

| Code | Description | Common Causes |
|------|-------------|---------------|
| 0 | ECU — Faulty ECU or ECU ROM | Bad ECU, corrupted ROM chip |
| 1 | Heated Oxygen Sensor (HO2S) | Failed O2 sensor, wiring issue |
| 3 | Manifold Absolute Pressure (MAP) — circuit low | Vacuum leak, faulty MAP sensor |
| 4 | Crankshaft Position (CKP) Sensor | Failed CKP sensor, damaged wiring |
| 5 | Manifold Absolute Pressure (MAP) — circuit high | MAP sensor electrical fault |
| 6 | Engine Coolant Temperature (ECT) Sensor | Failed ECT sensor, cooling system issue |
| 7 | Throttle Position (TP) Sensor | TPS adjustment needed, worn potentiometer |
| 8 | Top Dead Center (TDC) Sensor | TDC sensor failure |
| 9 | No. 1 Cylinder Position (CYP) Sensor | CYP sensor or pickup coil issue |
| 10 | Intake Air Temperature (IAT) Sensor | IAT sensor failure |
| 11 | Engine Overheating | Cooling system failure, thermostat stuck closed |
| 12 | System Pass (NOT a fault) | Confirms diagnostic system is working |
| 13 | Barometric Pressure (BARO) Sensor | BARO sensor circuit fault |
| 14 | Idle Air Control (IAC) Valve or Bad ECU | Carbon buildup in IACV, failed IACV motor |
| 15 | Ignition Output Signal | Ignition control module failure |
| 16 | Fuel Injector | Clogged or failed injector |
| 17 | Vehicle Speed Sensor (VSS) | VSS failure, speedometer cable/gear issue |
| 20 | Electrical Load Detector (ELD) | ELD circuit fault, alternator regulation |
| 21 | VTEC Solenoid | VTEC solenoid valve clogged/failure |
| 22 | VTEC Pressure Switch | VTEC pressure not building, oil issue |
| 23 | Knock Sensor (KS) | KS failure, loose mounting, ceramic crack |
| 30 | A/T FI Signal A | Automatic transmission communication |
| 31 | A/T FI Signal B | Automatic transmission communication |

### OBD1 TCU Codes (Automatic Transmission Only)

These codes appear on the TCU (Transmission Control Unit) separate from the ECM. Only applicable to automatic transmission vehicles.

| Code | Description |
|------|-------------|
| 1 | Lock-up solenoid 'A' circuit open or shorted |
| 2 | Lock-up solenoid 'B' circuit open or shorted |
| 3 | Throttle Position Sensor circuit open or shorted |
| 4 | Vehicle Speed Sensor open — no signal from speedometer |
| 5 | Shift Lever Position Switch circuit shorted |
| 6 | Shift Lever Position Switch circuit open |
| 7 | Shift Solenoid 'A' circuit open or shorted |
| 8 | Shift Solenoid 'B' circuit open or shorted |
| 9 | Counter shaft or transmission speed pulse generator open or shorted |
| 10 | Coolant Temperature Sensor open or shorted |
| 11 | Engine RPM (Ignition coil signal) open or shorted |
| 12 | (No code 12 used — reserved) |
| 13 | Main shaft speed pulse generator open or shorted |
| 14 | Linear (line pressure control) solenoid open or shorted |
| 15 | Kick down switch circuit shorted |

---

## OBD2 Trouble Code Set (1997–2001)

### Standardized OBD2 P-Codes

OBD2 introduced standardized diagnostic trouble codes across all manufacturers. Honda H-series OBD2 models support both Honda-specific blink codes AND standardized OBD2 P-codes readable by any OBD2 scanner.

| Code | Description | SAE Designation |
|------|-------------|-----------------|
| P0100 | Mass or Volume Air Flow Circuit Malfunction | MAFC/MAF |
| P0101 | MAFC/MAF Range/Performance Problem | |
| P0106 | Manifold Absolute Pressure/Barometric Pressure Circuit Range/Performance | MAP/BARO |
| P0107 | MAP Circuit Low Input | |
| P0108 | MAP Circuit High Input | |
| P0110 | Intake Air Temperature Circuit Malfunction | IAT |
| P0112 | IAT Circuit Low Input | |
| P0113 | IAT Circuit High Input | |
| P0115 | Engine Coolant Temperature Circuit Malfunction | ECT |
| P0116 | ECT Range/Performance Problem | |
| P0117 | ECT Circuit Low Input | |
| P0118 | ECT Circuit High Input | |
| P0120 | Throttle/Pedal Position Sensor/Switch 'A' Circuit Malfunction | TPS |
| P0122 | TPS 'A' Circuit Low Input | |
| P0123 | TPS 'A' Circuit High Input | |
| P0125 | Insufficient Coolant Temperature for Closed Loop Fuel Control | |
| P0130 | Front Heated Oxygen Sensor Circuit Malfunction | HO2S Bank 1 Sensor 1 |
| P0131 | HO2S Circuit Low Voltage | |
| P0132 | HO2S Circuit High Voltage | |
| P0133 | HO2S Circuit Slow Response | |
| P0134 | HO2S Circuit No Activity Detected | |
| P0135 | HO2S Heater Circuit Malfunction | |
| P0140 | Rear Heated Oxygen Sensor Circuit Malfunction | SHO2S Bank 1 Sensor 2 |
| P0141 | SHO2S Heater Circuit Malfunction | **NEW on OBD2** |
| P0171 | System Too Lean (Bank 1) | Fuel trim |
| P0172 | System Too Rich (Bank 1) | Fuel trim |
| P0300 | Random/Multiple Cylinder Misfire Detected | |
| P0301 | Cylinder 1 Misfire Detected | |
| P0302 | Cylinder 2 Misfire Detected | |
| P0303 | Cylinder 3 Misfire Detected | |
| P0304 | Cylinder 4 Misfire Detected | |
| P0320 | Ignition/Distributor Engine Speed Input Circuit Malfunction | CKP |
| P0325 | Knock Sensor Circuit Malfunction | KS |
| P0326 | Knock Sensor Circuit Range/Performance | |
| P0330 | Knock Sensor 2 Circuit Malfunction | |
| P0335 | Crankshaft Position Sensor 'A' Circuit Malfunction | CKP |
| P0340 | Camshaft Position Sensor Circuit Malfunction | CMP/TDC |
| P0341 | CMP Sensor Positional Variability | |
| P0401 | Exhaust Gas Recirculation Flow Insufficient Detected | EGR |
| P0402 | EGR Flow Excessive Detected | |
| P0440 | Evaporative Emission Control System Malfunction | EVAP |
| P0441 | EVAP System Incorrect Purge Flow | |
| P0442 | EVAP System Small Leak Detected | **NEW on OBD2** |
| P0443 | EVAP Purge Control Valve Circuit Malfunction | |
| P0444 | EVAP Purge Control Valve Circuit Open | |
| P0445 | EVAP System Shorted | |
| P0446 | EVAP Vent Control Circuit Malfunction | **NEW on OBD2** |
| P0500 | Vehicle Speed Sensor 'A' Malfunction | VSS |
| P0505 | Idle Air Control System Malfunction | IAC |
| P0506 | Idle Control System RPM Lower Than Expected | |
| P0507 | Idle Control System RPM Higher Than Expected | |
| P0601 | ECM/PCM Internal Memory Check Sum Error | ECU |
| P0602 | ECM/PCM Programming Error | ECU |
| P0700 | Transmission Control System Malfunction | TCM |
| P1259 | IMRC System Malfunction (Intake Manifold Runner Control) | |
| P1259 | VTEC System Malfunction (Honda-specific) | VTEC |
| P1260 | Immobilizer System — Engine Not Started (Honda-specific) | **NEW on OBD2** |
| P1261 | VTEC System — Bank 2 (if applicable) | |
| P1300 | Ignitor Circuit Malfunction (Honda-specific) | ICM |
| P1335 | Crankshaft Position System Variation Not Learned (Honda-specific) | CKP learn |
| P1338 | CKP Pattern Difference Not Learned (Honda-specific) | CKP learn |
| P1405 | EGR Position Sensor Circuit High Input | |
| P1407 | EGR Position Sensor Circuit Low Input | |
| P1457 | Fuel Level Sensor Performance (Honda-specific) | |
| P1570 | Brake Switch Malfunction (Honda-specific) | BKSW |
| P1603 | EEC Flash Memory Error | ECU |
| P1606 | EEC Internal Error | ECU |
| P1607 | EEC Internal Error — RAM | ECU |
| P1608 | EEC Internal Error — ROM | ECU |
| P1610 | Immobilizer Code Mismatch (Honda-specific) | **NEW on OBD2** |
| P1736 | Gear Ratio Error (Honda-specific) | TCM |

### OBD2 Readiness Monitors

OBD2 introduced emission readiness monitors that track whether specific systems have been tested. These are not trouble codes but diagnostic status flags:

| Monitor | Description | Trigger Condition |
|---------|-------------|-------------------|
| MIS | Misfire Monitor | Continuous — monitors crankshaft fluctuations |
| FCM | Fuel System Monitor | Warm-up cycle with closed-loop operation |
| COM | Comprehensive Component Monitor | Key-on self-test of all sensors/actuators |
| VHC | Vapor Health Check | EVAP system integrity (OBD2 only) |
| OBD | O2 Sensor Monitor | Closed-loop operation verifying O2 response |
| HE2 | Heated O2 Sensor Monitor | O2 sensor heater circuit test (OBD2 only) |
| CAT | Catalyst Monitor | Catalyst efficiency evaluation (OBD2 only) |
| EGR | EGR System Monitor | EGR flow verification (OBD2 only) |
| EVAP | Evaporative System Monitor | Leak detection and purge flow (OBD2 only) |
| IAC | Idle Air Control Monitor | Idle speed learning verification |
| O2WR | O2 Wide Range Sensor Monitor | Wide-range O2 sensor calibration |

---

## Immobilizer System (OBD2 Exclusive)

The OBD2 transition introduced Honda's first immobilizer system on the H-series, integrated directly into the ECU.

**How it works:**

1. The key contains a transponder chip with a unique coded ID
2. When the key is turned to ON, the immobilizer ring antenna around the ignition barrel reads the chip
3. The immobilizer ECU (integrated into the main PGM-FI ECU on C22 pin) compares the code
4. If the code matches, the ECU enables fuel injection and ignition
5. If the code does NOT match, the ECU disables fuel injectors and ignition — engine will crank but never start

**ECU Implementation:**

- **OBD1:** No immobilizer. Any PGM-FI ECU will start any H-series engine (assuming correct wiring).
- **OBD2:** Immobilizer code is stored in the ECU ROM. The C22 pin (brn/yel wire) carries the immobilizer code signal from the ignition switch assembly. Code P1260 ("Immobilizer System — Engine Not Started") and P1610 ("Immobilizer Code Mismatch") indicate immobilizer faults.

**Swap Implications:**

- Swapping an OBD2 ECU into an OBD1 car requires matching the immobilizer system or bypassing it
- Swapping an OBD1 ECU into an OBD2 car requires removing/bypassing the immobilizer ring antenna and wiring
- Aftermarket tuners (Hondata FlashPro, AEM EMS) can disable immobilizer during ECU swaps
- The SCS jumper procedure still works for code reading regardless of immobilizer state

---

## Key Architectural Differences: OBD1 vs OBD2

### Connector & Wiring Changes

| Feature | OBD1 (1992–1996) | OBD2 (1997–2001) |
|---------|------------------|-------------------|
| **ECU Connector A** | 26 pins (A1–A26 + B1–B16) | 32 pins (A12–A32 active, A1–A11 blank) |
| **ECU Connector B/C** | B-side 16 pins | C-side 22 pins (all active) |
| **ECU Connector D** | 22 pins (D1–D22) | 16 pins (D6–D16 active, D1–D5 blank) |
| **Auto TCU connector** | 4th C-side connector | Integrated into main ECU (no separate TCU) |
| **DLC location** | 2-pin SCS under dash | 16-pin standardized DLC under dash + 2-pin SCS |
| **DLC standard** | Honda proprietary | SAE J1962 standardized |
| **Total active pins** | ~64 across 3–4 connectors | ~54 across 3 connectors |

### Sensor & Monitoring Changes

| Feature | OBD1 | OBD2 | Change |
|---------|------|------|--------|
| **Crankshaft position** | Combined CKP/TDC signals on B-side | Separate CKP (C2/C4) and TDC (C3) on C-side | Separated for better resolution |
| **O2 sensor** | Single HO2S (primary only) | Primary HO2S + secondary SHO2S | Added secondary O2 for catalyst monitoring |
| **O2 heater** | HO2S heater on A6 | HO2S heater on A6 + SHO2S heater on A5 | Both sensors heated |
| **EVAP monitoring** | Basic purge control | Full leak detection, vent shut valve, purge bypass | Enhanced emissions monitoring |
| **Fuel tank pressure** | Not monitored | PTANK sensor (D15) | Required for EVAP diagnostics |
| **Knock sensor** | Single KS (D3) | Single KS (D6) | Same hardware, different pin |
| **Idle air control** | 2-wire IACV | 3-wire IACV (some years) | Added position feedback |
| **IAB polarity** | Normal polarity | Reversed polarity | Hardware change on A26 |
| **Immobilizer** | None | IMO on C22 | Security feature added |
| **Readiness monitors** | None | 10+ emission monitors | Federal requirement |

### Diagnostic Capability Changes

| Feature | OBD1 | OBD2 |
|---------|------|------|
| **Code retrieval** | Blink codes via 2-pin SCS jumper | Blink codes via SCS + OBD2 scanner |
| **Code format** | Honda-specific (0–31) | Standardized P-codes + Honda-specific |
| **Live data** | Limited (requires HDS or aftermarket) | Extensive (any OBD2 scanner) |
| **Freeze frame data** | No | Yes — captures conditions at fault time |
| **Emission monitors** | None | 10+ readiness monitors |
| **Scanner cost** | Specialized/Honda-only | Universal, widely available |
| **Code clearing** | Battery disconnect or relay pull | Scan tool command or battery disconnect |
| **Self-diagnosis** | Basic sensor range checks | Full circuit continuity, performance, and合理性 checks |

---

## Cross-Reference: ECU Part Numbers by OBD Version

### OBD1 ECUs

| Part Number | Application | Years | Market |
|-------------|-------------|-------|--------|
| P5M | H22A1 (USDM) — Automatic | 1993–1996 | USDM |
| P51 | H22A1 (USDM) — Manual | 1993–1996 | USDM |
| P06 | H22A (JDM Redtop) — Manual | 1992–1996 | JDM |
| P28 | H22A (JDM) — Manual | 1992–1996 | JDM |
| P13 | H22A (JDM) — Automatic | 1992–1996 | JDM |
| P75 | H22A2 (EDM Accord) — Automatic | 1992–1996 | EDM |

### OBD2 ECUs

| Part Number | Application | Years | Market |
|-------------|-------------|-------|--------|
| P13 | H22A4 (USDM) — Manual | 1997–2001 | USDM |
| P13 (auto) | H22A4 (USDM) — Automatic | 1997–2001 | USDM |
| P0F | H22A (JDM Accord SiR) — Manual | 1997–2001 | JDM |
| P72 | H22A7 (EDM Accord Type R) — Manual | 1998–2002 | EDM |

---

## Swap Compatibility Notes

### OBD1 → OBD2 Swap

When swapping an OBD1 engine (H22A1) into an OBD2 chassis (1997+ Prelude):

- **ECU:** Must use OBD1 ECU (P5M/P51) — OBD2 ECU will not communicate with OBD1 sensor harness
- **Harness:** OBD1 engine harness is incompatible with OBD2 ECU — different pinouts
- **IMMC:** OBD1 has no immobilizer; OBD2 chassis has one — may need bypass
- **DLC:** OBD2 chassis has standardized 16-pin port but OBD1 ECU won't respond to OBD2 scanners
- **Best approach:** Keep OBD1 ECU + OBD1 harness; ignore OBD2 DLC

### OBD2 → OBD1 Swap

When swapping an OBD2 engine (H22A4) into an OBD1 chassis (1993–1996 Prelude):

- **ECU:** Must use OBD2 ECU (P13) — OBD1 ECU lacks immobilizer handling
- **Harness:** OBD2 harness incompatible with OBD1 ECU — different pinouts
- **DLC:** OBD1 chassis has 2-pin SCS only; OBD2 ECU expects 16-pin DLC
- **Best approach:** Keep OBD2 ECU + OBD2 harness; add 16-pin DLC to dash for scanner access

### Aftermarket ECU Considerations

| Aftermarket ECU | OBD1 Compatible | OBD2 Compatible | Notes |
|----------------|-----------------|-----------------|-------|
| Hondata S300 | Yes (P06/P28) | No | Requires OBD1 ECU base |
| Hondata FlashPro | No | Yes (limited H22) | OBD2-only, limited H22 support |
| AEM EMS F1/F3 | Yes (with adapter) | Yes (with adapter) | Universal — needs wiring adapter |
| Moates Hyper-Ram | Yes (P06/P28) | No | OBD1 chip-based tuning |
| Hondata Chrome | Yes (P06/P28) | No | OBD1 chip-based tuning |

---

## Sources

| # | Source | URL | Retrieved |
|---|--------|-----|-----------|
| 1 | ProStreetOnline — FAQ: Honda Prelude H22 ECU Pinouts | https://my.prostreetonline.com/2014/07/14/faq-honda-prelude-h22-ecu-pinouts/ | 2026-05-15 |
| 2 | Honda-Tech Forum — Prelude H22a ECU Pinouts (thread by satan_srv) | https://honda-tech.com/forums/honda-prelude-4/prelude-h22a-ecu-pinouts-918703/ | 2026-05-15 |
| 3 | EddieAbbondanz.io — OBD1 Check Engine Light Codes | https://eddieabbondanz.io/post/honda/obd1-cel-codes/ | 2026-05-15 |
| 4 | HA Motorsports — Check Engine Light Codes / DTC | https://www.hamotorsports.com/pages/check-engine-light-codes-diagnostic-trouble-codes | 2026-05-15 |
| 5 | Innova — Reading Blink Codes for OBD1 Vehicles | https://www.innova.com/blogs/fix-advices/reading-blink-codes-for-obd1-vehicles | 2026-05-15 |
| 6 | Flexihub — OBD2 Pinout Explained (Honda section) | https://www.flexihub.com/oobd2-pinout/ | 2026-05-15 |
| 7 | TechRoute66 — OBD1 vs OBD2: What's the Difference | https://techroute66.com/obd1-vs-obd2/ | 2026-05-15 |
| 8 | NTheFastLane — Honda OBD0/OBD1 ECU Pinouts | https://www.nthefastlane.com/honda-obd0-obd1-ecu-pinouts | 2026-05-15 |
| 9 | Dodo Upgrades — OBD1 Pinouts | https://dodo-upgrades.nl/index.php/pinout-obd1/ | 2026-05-15 |
| 10 | Carrot Top Tuning — OBD1-ENG Harness Pinout Overview | https://www.carrottoptuning.com/blogs/technical-details/obd1-eng-harness-pinout-overview | 2026-05-15 |
| 11 | Scribd — H22A OBDII Pinout and Wiring Guide | https://www.scribd.com/doc/2547350/HONDA-OBDII-H22a-96 | 2026-05-15 |
| 12 | Slideshare — Honda/Acura OBD1 Codes List | https://www.slideshare.net/slideshow/honda-acura-obd1-codes-list-pdf/250736218 | 2026-05-15 |
| 13 | Honda-Tech — OBD1 Trouble Codes (forum thread) | https://honda-tech.com/forums/honda-crx-ef-civic-1988-1991-3/obd1-trouble-codes-2355018/ | 2026-05-15 |
| 14 | HA Motorsports — OBD/OBD2 Diagnostic Codes Guide (PDF via Scribd) | https://www.scribd.com/document/660413528/Honda-OBD-e-OBD2-Codes-TroubleCodes-net | 2026-05-15 |
| 15 | PreludeOnline — Bypassing Immobilizer System (OBD2 to OBD1) | https://www.preludeonline.com/threads/bypassing-immobilizer-system-obd2-to-obd1.266626/ | 2026-05-15 |
| 16 | 1997–2001 Prelude BB6 Helms Manual (OCR extracted text) | Local: `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` | 2026-05-15 |
| 17 | 1992–1996 Prelude H22A1 Helms Manual (local PDF) | Local: `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf` | 2026-05-15 |

---

## Notes & Conflicts

- **OBD1 ECU pinout consistency:** The ProStreetOnline and Honda-Tech pinouts are identical for OBD1, confirming accuracy. Both sourced from the North Texas Prelude Owners Group and 4th gen Helms manual.
- **OBD2 pinout note from Honda-Tech:** "Some of the pins listed for OBDII don't apply to the 96 and were only added in 97 but the layout is the same." This means 1996 (late OBD1/early OBD2 transition year) ECUs may have slight pin variations.
- **Code 12 ambiguity:** Some sources list code 12 as "EGR exhaust gas recirculation lift valve" while others (Innova, EddieAbbondanz) correctly identify it as "System Pass" — the Honda-specific convention for OBD1 is that code 12 indicates the diagnostic system itself is functional. The HA Motorsports source conflates OBD0/OBD1/OBD2 codes in a single table, which creates this conflict. For H-series OBD1 specifically, code 12 = system pass.
- **Immobilizer:** The IMO system on OBD2 ECUs is well-documented across multiple sources. P1260 and P1610 are Honda-specific OBD2 codes confirmed by HA Motorsports and multiple forum sources.
- **Secondary O2 sensor:** Present on OBD2 but absent on OBD1. This is a definitive hardware difference, not just a software change.
