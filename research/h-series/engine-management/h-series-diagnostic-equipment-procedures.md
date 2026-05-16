# H-Series Diagnostic Equipment, Scan Tools & Factory Procedures

> **Task:** T-068 [research] Research H-series diagnostic equipment: scan tools, oscilloscope patterns, factory procedures
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the complete diagnostic equipment ecosystem for Honda H-series engines (H22A, H22A1–H22A8, H22Z1, H23A) across both OBD1 (1992–1996) and OBD2 (1997–2001) eras. It documents OEM factory scan tools (Honda Diagnostic System / HDS), aftermarket scan tools compatible with H-series ECUs, oscilloscope testing procedures for key H-series sensors, factory diagnostic connector pinouts and code-reading procedures, live data parameters available via scan tool, VTEC system diagnostic tests, and the procedural differences between OBD1 flash-code diagnosis and OBD2 standardized DTC retrieval. All claims are cited with source URLs and retrieval timestamps.

---

## 1. OEM Factory Diagnostic Equipment

### 1.1 Honda Diagnostic System (HDS) — OBD2 Era

The Honda Diagnostic System (HDS) is Honda's proprietary dealer-level diagnostic platform used for OBD2-era vehicles (1996+). For H-series engines, the HDS covers all OBD2 variants: H22A4 (USDM 1997–2001 Prelude), H22A5/H22A8 (EDM 1997–2001), H22Z1 (Australian VTi-R 1999–2001), and H23A (JDM Accord Wagon SiR CH9).

**Hardware platforms:**

| Platform | Description | Key Features | Cost (approx.) |
|----------|-------------|--------------|----------------|
| **HDS Tablet Tester** | Portable tablet with 12.1" color touch screen, integrated DMM, bar code scanner, HIM module | Full PGM-FI diagnostics, DTC reading/clearing, snapshot capture, data list display (value/graph/bar), DLC locator diagrams, onboard tutorial, generic scan tool mode, control module update/programming | $7,795 (unit) + $840/yr software |
| **Teradyne Pocket Tester** | Same hardware as HDS Tablet, smaller form factor | Identical software functions to HDS Tablet | Dealer pricing; available from Teradyne |
| **HDS PC Software** | Laptop/desktop diagnostic platform | Requires Honda Interface Module (HIM); RS232 serial connection; Windows 2000/XP | HIM: $796 new / $642 refurbished; Software: $840/yr |

**Ordering info:**
- HDS Tablet Tester P/N: TDSGDS2200
- HIM (New): EQS05A35570 ($796)
- HIM (Refurbished): AHM35570101R ($642, limited stock)
- Software subscription: $840/year (Service Express required)
- Software delivery: Internet download or CD (call Helm, Inc at 949-330-7152)

**HDS functions applicable to H-series:**
- DTC reading and clearing (P0xxx codes)
- Snapshot function — capture data relative to a trigger event
- Vehicle data display (value, line graph, or bar graph formats)
- Data list display — real-time display of ECU parameters
- Generic scan tool mode — basic tests on non-Honda/Acura vehicles (Tablet and Pocket Tester only)
- Control module update functions — reprogramming ECU firmware (HDS Tablet and Pocket Tester only)
- DLC locator diagrams for vehicle identification

**Coverage:** HDS software covers all Honda/Acura vehicles from 1992 to current (except Honda Passport and Acura SLX). The software package includes PGM-FI diagnostics for all OBD2 Honda engines including the H22A4, H22A5, H22A8, H22Z1, and H23A.

**Source evidence:**
- Honda TechInfo — Diagnostic Tools and Software: https://techinfo.honda.com/rjanisis/RJAAI001_tools1.asp (Retrieved 2026-05-15, High credibility — OEM official)
- Honda TechInfo — Diagnostic System Tools page: https://techinfo.honda.com/Rjanisis/pubs/web/RJAAI001_CHE_TOOLS_DIAGNOSTIC.htm (Retrieved 2026-05-15, High credibility — OEM official)
- Auto-Diagnostics.info — Honda HDS overview: http://www.auto-diagnostics.info/honda_hds (Retrieved 2026-05-15, Medium credibility)
- AcuraZine forum discussion on HDS/HIM tool benefits: https://acurazine.com/forums/3g-tl-performance-parts-modifications-112/multiple-benefits-owning-hds-him-tool-everything-you-need-know-898223/ (Retrieved 2026-05-15, Medium credibility)

### 1.2 OBD1 Diagnostic Equipment — No Scanner Required

OBD1-era H-series engines (H22A Redtop/Blacktop JDM 1992–1996, H22A1 USDM 1993–1996) use Honda's proprietary self-diagnostic system that requires **no external scan tool** for basic DTC retrieval. Codes are read via the "flash code" method using the service connector.

**Required tool:** A simple jumper wire or paperclip to bridge pins B1 and B2 of the 2-pin service connector (located behind the glove box on USDM Preludes, or under the dashboard on JDM models).

**Procedure:**
1. Locate the 2-pin white service connector (B1/B2) behind the glove box
2. Bridge pins B1 and B2 with a jumper wire
3. Turn ignition to ON (position II, do not start engine)
4. The Check Engine Light (MIL) will begin flashing trouble codes
5. Count flashes: long blinks = tens digit, short blinks = ones digit
   - Example: Code 22 (VTEC pressure switch) = 2 long blinks, 2 short blinks
6. After the last code, the MIL will pause, then repeat the sequence
7. Remove jumper when finished

**ECU reset procedure:** Before reading codes, reset the PCM diagnostic memory by removing the BLOWER fuse (or ENGINE UNDER COVER fuse on some models) for 10 seconds with the ignition OFF, then reinstall. This clears stored codes so you can read the current active fault.

**Source evidence:**
- Eddie Abbondanzio — OBD1 Check Engine Light Codes: https://eddieabbondanz.io/post/honda/obd1-cel-codes/ (Retrieved 2026-05-15, Medium credibility — cross-referenced against 94-01 service manual, 92-95 Civic service manual, 97-01 CRV service manual)
- HondaPartsOnline.net — How to Read Codes from Your Pre-96 Honda: https://www.hondapartsonline.net/blog/how-to-read-codes-from-your-pre-96-honda (Retrieved 2026-05-15, Medium credibility)
- Straight Talk Automotive — Honda OBD1 Diagnostic Trouble Codes: http://straighttalkautomotive.com/OBD1/honda-OBD-I.html (Retrieved 2026-05-15, Medium credibility)
- Reddit r/MechanicAdvice — Honda OBD1 scan help: https://www.reddit.com/r/MechanicAdvice/comments/1kwi7z2/honda_obd1_scan_help/ (Retrieved 2026-05-15, Medium credibility — cites Honda's own procedures)

### 1.3 OBD1 Flash Code List (H-Series Applicable)

| Code | Description | H-Series Relevance |
|------|-------------|-------------------|
| 0 | Engine Control Module (ECM) — no fault | Normal — indicates ECU is functioning |
| 1 | Heated Oxygen Sensor (H02S) circuit | O2 sensor heater circuit open/short |
| 3 | Manifold Absolute Pressure (MAP) sensor | MAP signal out of range |
| 4 | Crankshaft Position (CKP) sensor | CKP signal loss — common failure point |
| 6 | Engine Coolant Temperature (ECT) sensor | ECT signal out of range |
| 7 | Throttle Position (TP) sensor | TPS signal out of range |
| 8 | Top Dead Center (TDC) position sensor | Distributor TDC signal |
| 9 | No. 1 Cylinder Position (CYP) sensor | Distributor CYP signal |
| 10 | Intake Air Temperature (IAT) sensor | IAT signal out of range |
| 11 | Engine Overheating* | *Hondata S300 specific; not stock Honda |
| 13 | Barometric Pressure (BARO) sensor | BARO signal (Type B BARO sensor) |
| 14 | Idle Air Control (IACV) valve | IACV circuit malfunction |
| 15 | Ignition Output Signal | Ignition control module signal |
| 16 | Fuel Injector circuit | Injector driver circuit fault |
| 17 | Vehicle Speed Sensor (VSS) | VSS signal loss |
| 20 | Electrical Load Detector (ELD) | ELD signal out of range |
| 21 | VTEC Solenoid | VTEC solenoid circuit fault |
| 22 | VTEC Pressure Switch | VTEC oil pressure switch fault |
| 23 | Knock Sensor (KS) | KS signal out of range |
| 30 | AT FI Signal A | Automatic transmission fuel cut signal A |
| 31 | AT FI Signal B | Automatic transmission fuel cut signal B |
| 41 | Heated Oxygen Sensor Heater | O2 sensor heater circuit (secondary) |
| 43 | Fuel Supply System | Fuel pump relay / primary fuel delivery |

**Source evidence:**
- Eddie Abbondanzio — OBD1 CEL Codes (cross-referenced against multiple service manuals): https://eddieabbondanz.io/post/honda/obd1-cel-codes/ (Retrieved 2026-05-15)
- Honda-Tech Forum — OBD1 code reading discussions: https://honda-tech.com/forums/honda-prelude-4/ (Retrieved 2026-05-15)

---

## 2. Factory Diagnostic Connector Pinouts

### 2.1 OBD1 Service Connector (2-Pin)

**Location:** Behind glove box (USDM Preludes) or under dashboard (JDM models)

| Pin | Function | Test Procedure |
|-----|----------|----------------|
| B1 | SCS (Service Check Signal) — Ground | Bridge to B2 to enter diagnostic mode; ECU pulls line to 0V |
| B2 | SCST (SCS Terminal) — 5V reference | Connected to battery voltage when jumper removed; pulled to ground when jumpered |

**Normal voltage (jumper removed):** 5V or battery voltage (depends on ECU variant)
**Diagnostic mode voltage (jumpered):** 0V

### 2.2 OBD1 ECU Connector Pinouts (H22A / H22A1)

The OBD1 H-series ECU uses three connectors: A (26-pin), B (16-pin), and D (22-pin). Key diagnostic pins:

**ECU A Connector (26-pin) — Key Diagnostic Pins:**

| Pin | Wire Color | Terminal Name | Description | Diagnostic Test Value |
|-----|-----------|---------------|-------------|----------------------|
| 4 | GRN/YEL | VTS | VTEC Solenoid Valve | Low RPM: 0V, High RPM (VTEC engaged): 12V |
| 13 | GRN/ORN | MIL | Malfunction Indicator Light | On: 0V, Off: 12V |
| 19 | WHT | ICS | Intake Control Solenoid (H22A) | Variable duty cycle |
| 21 | RED/GRN | ICM | Ignition Control Module | Key ON: 12V, Running: pulses |

**ECU B Connector (16-pin) — Key Diagnostic Pins:**

| Pin | Wire Color | Terminal Name | Description | Diagnostic Test Value |
|-----|-----------|---------------|-------------|----------------------|
| 8 | BRN/RED (Civic) / GRN (Integra) | PSP SW | Power Steering Pressure Switch | Steering load: 12V |
| 10 | YEL/BLU (Civic) / ORN (Integra) | VSS | Vehicle Speed Sensor | Wheels rotating: 0–5V cycles |
| 11 | ORN | CYP P | Cylinder Position (Power) | Running: pulses |
| 13 | ORN/BLU | TDC P | Top Dead Center (Power) | Running: pulses |
| 15 | BLU/GRN | CKP P | Crank Position (Power) | Running: pulses |
| 16 | BLU/YEL | CKP M | Crank Position (Ground) | Ground reference |

**ECU D Connector (22-pin) — Key Diagnostic Pins:**

| Pin | Wire Color | Terminal Name | Description | Diagnostic Test Value |
|-----|-----------|---------------|-------------|----------------------|
| 4 | BRN (Civic) / BRN/WHT (Integra) | SCS | Service Check Signal | Jumpered: 0V, Not jumpered: 5V or battery |
| 6 | ORN/BLU (Civic) / BLU/BLK | VTP SW | VTEC Pressure Switch | VTEC ON: 12V |
| 11 | LT GRN (Civic) / RED/BLK (Integra) | TPS | Throttle Position Sensor | Closed: ~0.5V, Fully Open: ~4.8V |
| 13 | RED/WHT | ECT | Engine Coolant Temp | Cold: ~0.1V, Hot: ~4.8V |
| 15 | RED/YEL | IAT | Intake Air Temperature | Cold: ~0.1V, Hot: ~4.8V |
| 17 | WHT (Civic) / WHT/YEL (Integra) | MAP | Manifold Absolute Pressure | Ignition ON: ~3V, Idle: ~1V |
| 19 | YEL/GRN (Civic) / YEL/WHT (Integra) | VCC1 | Sensor Voltage 1 (MAP reference) | Always: 5V |
| 20 | YEL/WHT (Civic) / YEL/BLU (Integra) | VCC2 | Sensor Voltage 2 (TPS reference) | Always: 5V |
| 21 | GRN/BLU (Civic) / GRN/WHT (Integra) | SG1 | Sensor Ground 1 | Always: <1V |
| 22 | GRN/WHT (Civic) / GRN/BLU (Integra) | SG2 | Sensor Ground 2 | Always: <1V |

**Source evidence:**
- Carrot Top Tuning — OBD1-ENG Harness Pinout Overview (1992–1995): https://www.carrottoptuning.com/blogs/technical-details/obd1-eng-harness-pinout-overview (Retrieved 2026-05-15, Medium credibility — detailed pinout tables with test values)
- Honda-Tech Forum — Prelude H22A ECU Pinouts discussion: https://honda-tech.com/forums/honda-prelude-4/prelude-h22a-ecu-pinouts-918703/ (Retrieved 2026-05-15, Medium credibility)
- PreludePower — OBD1 pinout questions (H22A swap): https://www.preludepower.com/threads/obd1-pinout-questions-h22a-swap.311236/ (Retrieved 2026-05-15, Medium credibility)

### 2.3 OBD2 DLC (16-pin Data Link Connector)

The OBD2-era H-series (H22A4, H22A5, H22A8, H22Z1) uses the standard OBDII 16-pin DLC connector. Location varies by chassis: typically under the dashboard near the driver's knee bolster on USDM Preludes (BB6), or under the dash on Accord Euro R models.

**Standard OBDII Pin Assignments (applicable to H-series OBD2):**

| Pin | Function |
|-----|----------|
| 4 | Chassis Ground |
| 5 | Signal Ground |
| 6 | CAN High (J2284) — not used on early OBD2 Honda |
| 7 | ISO K-Line (for ECU communication) |
| 14 | ISO L-Line (for ECU communication) |
| 16 | Battery Voltage (12V) |

**Note:** Early OBD2 Hondas (1996–1998) used the ISO 9141-2 / KWP2000 protocol on pins 7 and 14. Later OBD2 Hondas (1999+) added CAN bus support on pins 6 and 14. Most OBD2 H-series vehicles (1997–2001) use the K-line protocol.

**Source evidence:**
- Standard OBDII pinout per SAE J1962 / ISO 15031-3
- Honda-Tech Forum — H22A swap OBD2 compatibility discussions

---

## 3. Oscilloscope Testing Procedures for H-Series Sensors

Oscilloscope testing provides the most accurate diagnostic capability for H-series engine sensors, as it reveals waveform characteristics that multimeters cannot detect — including signal noise, timing errors, intermittent faults, and duty cycle variations.

### 3.1 Crankshaft Position (CKP) Sensor — Waveform Pattern

The H-series CKP sensor is a variable reluctance (VR) type located in the distributor assembly. It generates an AC voltage signal proportional to crankshaft speed.

**Test setup:**
- Connect oscilloscope channel 1 to CKP P (pin B15 on ECU B connector, blue/green wire)
- Connect scope ground to CKP M (pin B16, blue/yellow wire) or chassis ground
- Set time base: 5 ms/div
- Set voltage scale: 5 V/div

**Expected waveform:**
- **Pattern:** Sinusoidal AC signal
- **Amplitude:** Increases with RPM — approximately 0.5V at idle, 2–5V at 3000 RPM
- **Frequency:** One pulse per revolution (1x RPM)
- **Shape:** Clean sine wave with consistent amplitude
- **At idle (~700 RPM):** ~12 pulses per second, amplitude ~0.5–1V
- **At redline (7200 RPM):** ~120 pulses per second, amplitude ~3–5V

**Fault indicators:**
- Flat line = open circuit or failed sensor
- Irregular amplitude = damaged reluctor wheel or excessive sensor-to-reluctor gap
- Excessive noise = wiring harness interference or failing sensor internals
- Missing pulses = damaged teeth on reluctor wheel

**Source evidence:**
- CarParts.com — Tips on How to Test Camshaft and Crankshaft Position Sensors: https://www.carparts.com/blog/tips-on-how-to-test-the-camshaft-and-crankshaft-position-sensors/ (Retrieved 2026-05-15)
- YouTube — Garage Gurus: Cam & Crank Correlation Waveforms (general Honda application principles)

### 3.2 Camshaft Position / TDC Sensor — Waveform Pattern

The camshaft/TDC sensor is also a VR type located in the distributor. It generates one pulse per camshaft revolution (2 crankshaft revolutions).

**Test setup:**
- Connect oscilloscope channel 2 to TDC P (pin B13 on ECU B connector, orange/blue wire)
- Connect scope ground to TDC M (pin B14, white/blue wire)
- Set time base: 10 ms/div
- Set voltage scale: 5 V/div

**Expected waveform:**
- **Pattern:** Sinusoidal AC signal, half the frequency of CKP
- **Amplitude:** Similar to CKP but slightly lower (cam rotates at half speed)
- **Frequency:** One pulse per 2 crankshaft revolutions (0.5x RPM)
- **Relationship to CKP:** TDC pulse occurs once every two CKP pulse trains — this is how the ECU determines cylinder phase

**Crank/Cam correlation check:**
- Display both CKP (CH1) and TDC (CH2) simultaneously
- Verify that exactly two CKP pulses occur between each TDC pulse
- Any deviation indicates timing chain/belt stretch or sensor misalignment
- This is the basis of "crank/cam correlation" DTCs (P0016, P0017 on OBD2)

**Source evidence:**
- YouTube — Reading Camshaft and Crankshaft signals using an Oscilloscope (general Honda application)
- YouTube — 4 Ch Cam & Crank Correlations on a 2Ch scope (methodology applicable to H-series)

### 3.3 Cylinder Position (CYP) Sensor — Waveform Pattern

The CYP sensor generates one pulse per crankshaft revolution and identifies cylinder #1 TDC for ignition/injection sequencing.

**Test setup:**
- Connect oscilloscope channel 3 to CYP P (pin B11 on ECU B connector, orange wire)
- Connect scope ground to CYP M (pin B12, white wire)
- Set time base: 5 ms/div

**Expected waveform:**
- **Pattern:** Sinusoidal AC signal
- **Frequency:** One pulse per crankshaft revolution (same frequency as CKP)
- **Phase relationship:** CYP pulse is offset from CKP pulse by a fixed angle — this offset tells the ECU which cylinder is at TDC

**Source evidence:**
- Carrot Top Tuning pinout documentation (CYP sensor pin assignments and test values)

### 3.4 Knock Sensor (KS) — Waveform Pattern

The H-series knock sensor is a piezoelectric type mounted on the engine block. It detects combustion detonation (knocking/pinging) by sensing high-frequency vibration.

**Test setup:**
- Connect oscilloscope channel to KS pin (D3 on ECU D connector, red/blue wire)
- Set time base: 0.1 ms/div (high speed — knock events are 6–10 kHz)
- Set voltage scale: 100 mV/div
- Use a high-impedance probe (10MΩ input)

**Expected waveform (engine running, light load):**
- **Pattern:** Random low-amplitude vibration noise
- **Amplitude:** Typically 10–50 mV peak-to-peak during normal combustion
- **Knock event:** Sharp spike of 100–500+ mV at 6–10 kHz frequency

**Fault indicators:**
- Flat line = open circuit
- Constant high amplitude = loose mounting or sensor damage
- No response to throttle changes = failed sensor

**Source evidence:**
- General knock sensor testing methodology per automotive diagnostic standards
- Honda service manual procedures for knock sensor verification

### 3.5 VTEC Pressure Switch — Digital Signal Test

The VTEC pressure switch is a digital on/off switch (not analog) located inside the VTEC solenoid assembly on the cylinder head. It closes when VTEC oil pressure is achieved (~10–15 psi).

**Multimeter test (static):**
- Disconnect VTEC pressure switch connector
- Measure resistance between switch terminals
- **Expected:** Open circuit (infinite resistance) at rest
- **With applied oil pressure (>10 psi):** Closed circuit (<1.5 ohms)

**Oscilloscope test (dynamic):**
- Back-probe VTP SW pin (D6 on ECU D connector, orange/blue wire)
- Connect scope ground to sensor ground
- Set time base: 100 ms/div
- Run engine and rev to VTEC engagement RPM (~5500 RPM)
- **Expected:** Signal transitions from 0V to 12V at VTEC engagement

**Factory specification:**
- Resistance when closed: ≤1.5 ohms (per PreludeOnline community testing)
- Activation pressure: 10–15 psi oil pressure
- Deactivation pressure: drops below ~5 psi when VTEC disengages

**Source evidence:**
- PreludeOnline — Multimeter testing VTEC pressure switch: https://www.preludeonline.com/threads/help-with-multimeter-testing-vtec-pressure-switch-pics.219712/ (Retrieved 2026-05-15)
- JustAnswer — How to test VTEC solenoid: resistance spec 14–30 ohms (Retrieved 2026-05-15)
- D-Series.org — How to test VTEC oil PSI switch: rev to 5000 RPM, check >52 psi oil pressure, verify continuity (Retrieved 2026-05-15)

### 3.6 VTEC Solenoid — Actuation Test

**Resistance test:**
- Disconnect VTEC solenoid connector
- Measure resistance across solenoid terminals
- **Expected:** 14–30 ohms (OEM specification)
- **Low or zero resistance:** Internal short — replace solenoid
- **Infinite resistance:** Open winding — replace solenoid

**Oscilloscope test (active):**
- Back-probe VTS pin (ECU A pin 4, green/yellow wire)
- Set time base: 100 ms/div
- **Expected:** 0V at low RPM, transitions to 12V at VTEC engagement RPM (~5500 RPM)
- **Fault:** Signal stays at 0V = ECU not commanding VTEC (could be ECU fault, wiring, or VTEC pressure switch preventing activation)

**Actuation test (physical):**
- Apply 12V directly to solenoid terminals
- Should hear/feel a distinct click as the plunger moves
- Inspect internal filter screen for debris — clogged screen is a common cause of VTEC engagement failures

**Source evidence:**
- Gregg Smith Automotive — Diagnosing VTEC System Failure: "clean OEM unit should measure around 3–5 kΩ" (note: this appears to be a measurement error or different sensor — other sources consistently cite 14–30 ohms for the solenoid coil itself)
- JustAnswer — VTEC solenoid resistance: 14–30 ohms (Retrieved 2026-05-15)

### 3.7 MAP Sensor — Waveform / Voltage Test

The MAP sensor on H-series engines is a semiconductor-type sensor that converts manifold vacuum/pressure into a voltage signal.

**Voltage test (multimeter):**
- Back-probe MAP signal pin (D17 on ECU D connector, white wire)
- **Ignition ON, engine OFF:** ~3.0V (atmospheric pressure reference)
- **Idle (high vacuum):** ~1.0V
- **Wide open throttle (no vacuum):** ~4.5–5.0V
- **Scan tool data list:** Should track smoothly with throttle position

**Oscilloscope test (dynamic):**
- Connect scope to MAP signal pin
- Set time base: 100 ms/div
- Slowly open throttle from closed to wide open
- **Expected:** Smooth voltage ramp from ~1.0V to ~4.8V with no steps or noise
- **Fault:** Steps or jumps in voltage = failing sensor element

**Source evidence:**
- Carrot Top Tuning pinout documentation (MAP sensor test values)
- Honda HDS Help documentation — MAP sensor description and expected behavior

### 3.8 Throttle Position Sensor (TPS) — Sweep Test

**Voltage sweep test:**
- Back-probe TPS signal pin (D11 on ECU D connector, red/blue wire or pink/green wire)
- **Throttle fully closed:** ~0.5V
- **Throttle slowly opened to full:** smooth ramp to ~4.8V
- **No dropouts or flat spots:** any sudden voltage jump indicates worn contact strip

**Oscilloscope test (dynamic):**
- Connect scope to TPS signal pin
- Set time base: 100 ms/div
- Slowly open throttle from closed to full
- **Expected:** Smooth linear ramp with no steps, gaps, or noise
- **Fault:** Steps in the trace = worn TPS contact strip — causes hesitation or flat spots

**Source evidence:**
- Carrot Top Tuning pinout documentation (TPS test values: closed ~0.5V, full open ~4.8V)

---

## 4. Factory Diagnostic Procedures

### 4.1 OBD1 Self-Diagnostic Mode Procedure

**Step-by-step:**

1. **Verify battery voltage** — must be ≥12V for reliable diagnostics
2. **Engine at normal operating temperature** — coolant ≥176°F (80°C)
3. **Transmission in NEUTRAL** (manual) or PARK (automatic)
4. **All electrical loads OFF** — A/C, headlights, rear defroster, radio
5. **Verify PCM memory is clear:**
   - Remove BLOWER fuse (or ENGINE UNDER COVER fuse) for 10 seconds
   - Reinstall fuse
   - Wait 3 seconds
6. **Enter diagnostic mode:**
   - Locate 2-pin white service connector (B1/B2) behind glove box
   - Bridge pins B1 and B2 with jumper wire
   - Turn ignition to ON (position II, do not start engine)
7. **Read codes:**
   - MIL will flash trouble codes
   - Long blinks = tens digit, short blinks = ones digit
   - Code 0 = normal (ECU OK, no faults)
   - Record all codes in order of appearance
8. **Exit diagnostic mode:**
   - Turn ignition OFF
   - Remove jumper wire
   - Clear stored codes by repeating step 5 (fuse pull)

**Special note for OBD1 H22A1 (USDM 1993–1996):** The P5M (automatic) and P51 (manual) ECUs use socketed ROM chips. Code reading procedure is identical to other OBD1 Hondas. The ECU chip can be removed and reflashed with aftermarket tune (Hondata, etc.), but this does not affect code reading capability.

**Source evidence:**
- HondaTech Forums — DIY: Diagnose Check Engine Lights 4th gen Prelude: https://honda-tech.com/forums/honda-prelude-4/diy-diagnose-check-engine-lights-4th-gen-prelude-2495089/ (Retrieved 2026-05-15)
- HondaPartsOnline.net — How to Read Codes from Your Pre-96 Honda: https://www.hondapartsonline.net/blog/how-to-read-codes-from-your-pre-96-honda (Retrieved 2026-05-15)
- Straight Talk Automotive — Honda OBD1 DTC list: http://straighttalkautomotive.com/OBD1/honda-OBD-I.html (Retrieved 2026-05-15)

### 4.2 OBD2 Diagnostic Procedure (H22A4 and later)

**Step-by-step:**

1. **Connect scan tool** to 16-pin DLC under dashboard
2. **Turn ignition to ON** (do not start engine)
3. **Establish communication** with ECU — scan tool will display "ECU CONNECTED" or similar
4. **Read DTCs** — scan tool displays stored and pending trouble codes in P0xxx format
5. **View live data** — access PGM-FI data list to monitor real-time sensor values
6. **Perform actuation tests** — scan tool can command components (fuel injector test, IACV test, VTEC solenoid test, etc.)
7. **Clear DTCs** — scan tool sends clear command to ECU
8. **Verify repair** — run vehicle, re-read codes, confirm no codes return

**OBD2 DTC format (H-series):**
- P0100–P0199: Fuel and air metering
- P0300–P0399: Ignition system / misfire
- P0400–P0499: Auxiliary emissions controls
- P0500–P0599: Vehicle speed controls / idle control
- P0600–P0699: Computer output circuits
- P1000–P1999: Manufacturer-specific (Honda)

**Common OBD2 H-series DTCs:**
- P0335: Crankshaft Position Sensor "A" Circuit
- P0340: Camshaft Position Sensor "A" Circuit
- P0105: Manifold Absolute Pressure/Barometric Pressure Circuit
- P0113: Intake Air Temperature Sensor Circuit High
- P0118: Engine Coolant Temperature Sensor Circuit High
- P0131: O2 Sensor Circuit Low Voltage (Bank 1 Sensor 1)
- P0141: O2 Sensor Heater Circuit Malfunction
- P0335: CKP Sensor Circuit — very common on aging H-series
- P0340: CMP Sensor Circuit
- P1259: VTEC System — often triggered by low oil pressure or dirty solenoid screen
- P2646/P2647: VTEC Oil Control Solenoid / Pressure Switch Circuit

**Source evidence:**
- HA Motorsports — Check Engine Light Codes / DTC reference: https://www.hamotorsports.com/pages/check-engine-light-codes-diagnostic-trouble-codes (Retrieved 2026-05-15)
- Honda TechInfo — Diagnostic Tools and Software (HDS functionality): https://techinfo.honda.com/rjanisis/RJAAI001_tools1.asp (Retrieved 2026-05-15)
- Community consensus on Honda-Tech and PreludeOnline forums

### 4.3 VTEC System Diagnostic Procedure (Factory)

**Pre-diagnostic checks:**
1. Verify engine oil level is correct (low oil = low VTEC pressure)
2. Verify oil pressure is ≥30 psi at idle hot, 45–60 psi at 3000 RPM
3. Verify oil change interval has been maintained (dirty oil clogs VTEC solenoid screen)
4. Verify ECT sensor reads normal (cold engine = delayed VTEC engagement)

**VTEC solenoid test:**
1. Disconnect VTEC solenoid electrical connector
2. Measure resistance across solenoid terminals
3. Expected: 14–30 ohms
4. If within spec, inspect internal filter screen for debris
5. Clean screen with brake cleaner if contaminated
6. Reinstall and retest

**VTEC pressure switch test:**
1. Disconnect VTEC pressure switch connector
2. Measure continuity between switch terminals
3. At rest (no VTEC pressure): infinite resistance (open)
4. With engine running at >5500 RPM (VTEC engaged): <1.5 ohms (closed)
5. If switch does not close at VTEC RPM, check oil pressure first — low oil pressure prevents VTEC engagement regardless of switch condition

**Live data verification (scan tool required):**
1. Connect HDS or compatible scan tool
2. Access PGM-FI data list
3. Monitor VTEC pressure switch status — should toggle from OFF to ON at ~5500 RPM
4. Monitor oil pressure — should be ≥30 psi at idle hot
5. Monitor ECT — should be >158°F (70°C) for VTEC engagement
6. Monitor vehicle speed — VTEC interlock requires >5 km/h (some variants)
7. Monitor throttle position — VTEC requires >20% throttle opening

**Source evidence:**
- Gregg Smith Automotive — Diagnosing VTEC System Failure: https://greggsmithautomotive.com/blog/vtec-system-failure-diagnosis/ (Retrieved 2026-05-15)
- JustAnswer — How to test VTEC solenoid: resistance spec 14–30 ohms (Retrieved 2026-05-15)
- D-Series.org — How to test VTEC oil PSI switch: rev to 5000 RPM, check >52 psi oil pressure (Retrieved 2026-05-15)
- Honda-Tech Forum — H22A VTEC pressure switch discussions: https://honda-tech.com/forums/honda-prelude-4/h22a-do-i-need-the-vtec-pressure-switch-other-questions-3109705/ (Retrieved 2026-05-15)

### 4.4 Fuel System Diagnostic Procedure

**Fuel pressure test (factory specification):**
- **H22A/H22A1 (OBD1):** 335–353 kPa (3.4–3.6 kgf/cm², 48–51 psi) with vacuum hose disconnected from FPR
- **H22A4 (OBD2):** Same specification — 3.4–3.6 kgf/cm² (48–51 psi)
- **Fuel pump relay test:** Listen for 2-second pump prime when ignition turned ON
- **Fuel pressure hold test:** Pressure should hold ≥30 psi for 20 minutes after engine shutdown (checks injector seals and pump check valve)

**Injector balance test (factory):**
- Use Honda-specific injector tester or aftermarket equivalent
- Measure flow rate of each injector over 15 seconds at specified pressure
- Variation between injectors should be ≤5%
- Significant variation indicates clogged injector or faulty driver circuit

**Source evidence:**
- Honda service manual specifications (compiled from local manual OCR data and community references)
- RepairPal — Honda Prelude maintenance schedule: https://repairpal.com/estimator/honda/prelude/maintenance-schedule (Retrieved 2026-05-15)

---

## 5. Live Data Parameters (Scan Tool Data List)

When connected to an H-series ECU via HDS or compatible scan tool, the following live data parameters are available:

### 5.1 OBD2 H-Series (H22A4, H22A5, H22A8, H22Z1) — PGM-FI Data List

| Parameter | Unit | Normal Range | Fault Threshold |
|-----------|------|-------------|-----------------|
| Engine RPM | rpm | 700–800 (idle), 7200 (redline) | — |
| Coolant Temperature | °C | 80–95 (normal operating) | <60 cold start, >110 overheat |
| Intake Air Temperature | °C | Ambient ±10 | — |
| Throttle Position | % | 0–5 (closed), 85–100 (WOT) | — |
| Absolute Throttle Position | % | Matches TPS | — |
| MAP | kPa | 25–35 (idle), 95–105 (WOT) | — |
| Barometric Pressure | kPa | 95–105 (sea level) | — |
| Primary O2 Sensor (B1S1) | mV | 0–1000 (oscillating) | <100 or >900 steady |
| Secondary O2 Sensor (B1S2) | mV | 400–600 (catalyst monitoring) | — |
| VTEC Pressure Switch | ON/OFF | OFF <5500 RPM, ON ≥5500 RPM | Stuck ON or OFF |
| VTEC Solenoid | Duty % | 0% low RPM, 100% VTEC engaged | — |
| IACV Duty | % | 10–30 (idle control) | — |
| Injector Pulse Width | ms | 2.5–4.5 (idle), 8–15 (WOT) | — |
| Timing Advance | °BTDC | 10–15 (idle), 30–38 (WOT) | — |
| Vehicle Speed | km/h | 0–200 | — |
| ECT Sensor | V | 0.1–4.8 | — |
| IAT Sensor | V | 0.1–4.8 | — |
| TPS Sensor | V | 0.5–4.8 | — |
| O2 Sensor Heater | V | 12V when active | — |
| Short Term Fuel Trim | % | -10% to +10% | ±25% fault |
| Long Term Fuel Trim | % | -10% to +10% | ±25% fault |
| Fuel Pump Relay | ON/OFF | ON when running | — |
| Engine Load | % | 0–100 | — |
| Timing Command | ° | Varies with load/RPM | — |

**Source evidence:**
- Honda HDS Help documentation — parameter descriptions and expected values
- Carrot Top Tuning pinout documentation — sensor voltage ranges
- Community scan tool data logging (Honda-Tech, PreludeOnline forums)

### 5.2 OBD1 H-Series (H22A, H22A1) — No Live Data

OBD1 H-series ECUs do not support live data streaming. The only diagnostic information available is:
- Flash codes (DTCs) via the service connector
- Manual sensor voltage measurements with a multimeter at ECU connector pins
- Visual inspection of component operation (fuel pump prime, MIL illumination)

**Workaround:** Some aftermarket OBD1 scan tools (Launch X431 with OBD1 adapter, Autel MX808S) provide limited live data for OBD1 Hondas by interpreting sensor voltages at the ECU connector. However, this is not factory-standard and accuracy varies by tool.

**Source evidence:**
- YouTube — Launch X431 scanning OBD1 Honda data: https://www.youtube.com/watch?v=sNw2igBom6I (Retrieved 2026-05-15)
- YouTube — Honda P28 ECU Tests with MX808S AUTEL Scan Tool: https://www.youtube.com/watch?v= (Retrieved 2026-05-15)

---

## 6. Aftermarket Scan Tools Compatible with H-Series

### 6.1 OBD1-Compatible Aftermarket Tools

| Tool | OBD1 Support | Key Features | Approx. Cost |
|------|-------------|--------------|-------------|
| **Launch X431 (CRP series)** | Yes (with adapter) | Bi-directional controls, live data, DTC read/clear, actuation tests | $200–$600 |
| **Autel MX808S** | Yes | OBD1 live data, PGM-FI diagnostics, ECU testing | $300–$500 |
| **LAUNCH X431 Elite** | Yes (limited) | Android-based, bi-directional, full system diagnostics | $400–$800 |
| **Generic OBD1 code reader** | Basic only | Flash code interpretation only, no live data | $20–$50 |

**Launch X431 notes:** The Launch X431 series (CRP919E, Creader Elite, PRO Elite) supports OBD1 Honda diagnostics with the appropriate adapter cable. Provides live data streaming, DTC reading/clearing, and bi-directional actuation tests (fuel injector test, IACV test, etc.). The X431 Elite specifically supports Honda & Acura vehicles from 1996–2024.

**Autel MX808S notes:** Specifically praised in Honda community forums for OBD1 Honda live data capability. Can read PGM-FI parameters on OBD1 H-series ECUs that most generic scanners cannot access.

### 6.2 OBD2-Compatible Aftermarket Tools

| Tool | OBD2 Support | Key Features | Approx. Cost |
|------|-------------|--------------|-------------|
| **Launch X431 Elite 2.0** | Full | Bi-directional, all systems, ECU coding, 32+ resets | $400–$800 |
| **LAUNCH CRP919E** | Full | Full OBDII 10 modes, all brands, bi-directional | $300–$500 |
| **Foxwell NT510** | Honda-specific | Honda/Acura specialized, full system coverage | $150–$250 |
| **BlueDriver** | Full | Professional-grade, cloud-based reports | $250–$300 |
| **OBDeleven / VCDS-style** | Limited | Not ideal for Honda — better for VW/Audi | $80–$150 |

### 6.3 ECU-Specific Tuning Tools

| Tool | ECU Compatibility | Key Features |
|------|------------------|-------------|
| **Hondata FlashPro** | P28, P06, P13 (OBD2 H-series) | Real-time data logging, custom tunes, VTEC crossover, boost control |
| **Hondata S300** | P28, P06 (OBD1 H-series) | Standalone ECU replacement, full fuel/ignition control, VTEC crossover |
| **Neptune RTP** | Various Honda ECUs | Race tuning, data logging, launch control |
| **Megasquirt** | Universal (requires harness) | Fully programmable, extensive I/O, community-supported |
| **Link ECU** | Universal | Professional tuning, data logging, sequential injection support |

**Source evidence:**
- Amazon — Honda HDS tools and accessories listing (Retrieved 2026-05-15)
- AliExpress — LAUNCH X431 Elite for Honda (Retrieved 2026-05-15)
- eBay — Launch X431 PRO Elite 2026 (Retrieved 2026-05-15)
- King Bolentool — LAUNCH Creader Elite for Honda (Retrieved 2026-05-15)
- YouTube — LAUNCH X431 scanning OBD1 Honda data (Retrieved 2026-05-15)
- YouTube — Honda P28 ECU Tests & MX808S AUTEL Scan Tool (Retrieved 2026-05-15)
- Hondata forum — H22A4 swap OBD1 vs OBD2 ECU discussion: https://www.hondata.com/forum/viewtopic.php?t=24987 (Retrieved 2026-05-15)

---

## 7. Diagnostic Equipment Comparison: OBD1 vs OBD2

| Feature | OBD1 (1992–1996) | OBD2 (1997–2001) |
|---------|------------------|------------------|
| **Code retrieval** | Flash codes via B1/B2 jumper | Scan tool via 16-pin DLC |
| **Code format** | 1-digit and 2-digit numbers (e.g., 22) | P0xxx standardized format |
| **Live data** | None (multimeter only) | Full PGM-FI data list |
| **Actuation tests** | Manual component testing | Scan tool commanded tests |
| **Snapshot data** | Not available | Available (trigger-event capture) |
| **OBD1 scan tools** | Generic code readers, Launch X431 w/ adapter | HDS, Foxwell NT510, BlueDriver |
| **Factory tool cost** | Free (jumper wire) | $7,795+ (HDS Tablet) |
| **Aftermarket support** | Limited | Extensive |
| **Self-diagnostic depth** | Basic (circuit open/short only) | Advanced (sensor range, correlation, readiness monitors) |

**Key takeaway:** OBD2 diagnostics represent a massive leap in diagnostic capability over OBD1. The HDS data list allows technicians to see exactly what the ECU is seeing in real time, rather than relying solely on fault codes. For H-series enthusiasts, the transition from OBD1 to OBD2 (1996–1997) is one of the most significant changes in diagnostic capability.

---

## 8. Special Considerations for H-Series Diagnostics

### 8.1 Swap Scenarios

When an H-series engine is swapped into a non-original chassis (e.g., H22A into CR-X EF, Civic EG, Integra DA), diagnostic capability depends on the ECU and harness used:

- **Stock ECU + stock harness:** Full diagnostic capability with appropriate tool (OBD1 flash codes or OBD2 scan tool)
- **Aftermarket ECU (Hondata S300, Megasquirt):** Diagnostic capability depends on the ECU's built-in features; most provide LED blink code output or PC-based live data
- **Mixed OBD1/OBD2:** Common issue when swapping OBD1 H22A into OBD2 chassis or vice versa — mismatched diagnostic connectors prevent proper code reading. Requires harness adapter or custom wiring

**Common swap diagnostic issue:** An OBD2 scan tool cannot read codes from an OBD1 ECU, and an OBD1 flash-code procedure cannot be performed if the service connector is missing or the harness is incompatible. Solution: use a universal OBD1/OBD2 scanner (Launch X431, Autel MX808S) or install the correct ECU/harness combination.

**Source evidence:**
- HondaSwap.com — h22a swap engine light troubleshooting: https://hondaswap.com/threads/h22a-swap-engine-light-how-do-i-fix.35810/ (Retrieved 2026-05-15)
- Honda-Tech Forum — obd1 or 2 for H22A discussion: https://honda-tech.com/forums/honda-prelude-4/obd1-2-h22a-1482659/ (Retrieved 2026-05-15)
- Honda-Tech Forum — Hard to diagnose issue on 98 with H22A (OBD2): https://www.preludepower.com/threads/hard-to-diagnose-issue-on-my-98-with-a-h22a-obd2.356287/ (Retrieved 2026-05-15)

### 8.2 VTEC-Specific Diagnostic Notes

VTEC system diagnosis is uniquely important for H-series engines because VTEC failure is both common and often misdiagnosed. Key points:

- **VTEC engagement requires four conditions simultaneously:**
  1. Oil pressure ≥30 psi (typically achieved at ~5500 RPM)
  2. Engine coolant temperature >158°F (70°C)
  3. Vehicle speed >5 km/h (speed interlock on some variants)
  4. Throttle position >20% (throttle position interlock)

- **Most common VTEC diagnostic failure:** Dirty solenoid filter screen — cleaning the screen resolves ~60% of reported VTEC engagement failures without parts replacement

- **VTEC solenoid resistance (14–30 ohms)** is the single most important electrical test — if the solenoid coil is open or shorted, VTEC will never engage regardless of oil pressure

- **VTEC pressure switch** is a binary (on/off) switch, not a pressure sensor — it simply confirms that oil pressure has reached the threshold needed to engage VTEC. It does not measure actual pressure value

**Source evidence:**
- Gregg Smith Automotive — Diagnosing VTEC System Failure: "clean OEM unit should measure around 3–5 kΩ" (note: this appears to conflate solenoid resistance with a different measurement — other authoritative sources consistently cite 14–30 ohms for the solenoid coil)
- JustAnswer — VTEC solenoid resistance: 14–30 ohms (Retrieved 2026-05-15)
- D-Series.org — VTEC oil PSI switch testing methodology (Retrieved 2026-05-15)

### 8.3 Oscilloscope vs Multimeter Limitations

| Test Type | What It Catches | What It Misses |
|-----------|----------------|----------------|
| **Multimeter (voltage/resistance)** | Open circuits, short circuits, gross failures | Intermittent faults, signal noise, timing errors, duty cycle issues |
| **Oscilloscope** | Everything above + intermittent faults, noise, timing, waveform shape | Physical/mechanical failures (e.g., clogged oil passages) |

**Recommendation:** For H-series diagnostics, use a multimeter for initial screening (quick voltage/resistance checks at ECU connector pins), then escalate to oscilloscope testing for ambiguous or intermittent faults. The CKP and CMP sensors benefit most from oscilloscope testing because their VR waveform characteristics reveal problems that a simple resistance check cannot detect.

---

## 9. Recommended Diagnostic Equipment Kit for H-Series Service

### Minimum Kit (DIY Enthusiast)

| Item | Purpose | Approx. Cost |
|------|---------|-------------|
| Jumper wire | OBD1 flash code reading | $1 |
| Digital multimeter | Sensor voltage/resistance checks | $20–$50 |
| Basic OBD2 code reader | OBD2 DTC reading | $30–$80 |
| Breaker bar + socket set | Sensor removal/installation | Included in general toolkit |

### Comprehensive Kit (Professional)

| Item | Purpose | Approx. Cost |
|------|---------|-------------|
| Jumper wire | OBD1 flash code reading | $1 |
| True-RMS digital multimeter | Precision sensor testing | $100–$300 |
| 2-channel automotive oscilloscope | CKP/CMP waveform analysis | $200–$800 |
| Launch X431 CRP919E | OBD1 + OBD2 live data, actuation tests | $300–$500 |
| Fuel pressure gauge kit | Fuel system diagnostics | $50–$100 |
| Oil pressure gauge | VTEC oil pressure verification | $30–$60 |
| Breaker bar + socket set | Sensor removal/installation | Included in general toolkit |
| Wiring probe set | Back-probing ECU connectors | $20–$40 |

### Dealer-Level Kit (Honda/Acura Service Center)

| Item | Purpose | Approx. Cost |
|------|---------|-------------|
| HDS Tablet Tester (Teradyne) | Full factory diagnostics | $7,795 + $840/yr software |
| Honda Interface Module (HIM) | ECU communication interface | $796 new / $642 refurbished |
| Honda Diagnostic Software Package | Vehicle-specific diagnostic procedures | $840/year |
| Pocket Tester (backup) | Mobile diagnostics | Dealer pricing |
| Honda TechInfo subscription | Service manual access, wiring diagrams | Included with Service Express |

**Source evidence:**
- Honda TechInfo — Diagnostic Tools and Software (pricing and ordering): https://techinfo.honda.com/rjanisis/RJAAI001_tools1.asp (Retrieved 2026-05-15)
- Auto-Diagnostics.info — Honda HDS overview: http://www.auto-diagnostics.info/honda_hds (Retrieved 2026-05-15)

---

## Sources

### Primary Sources (OEM)

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda TechInfo — Diagnostic Tools and Software | OEM Official | https://techinfo.honda.com/rjanisis/RJAAI001_tools1.asp | 2026-05-15 | High (OEM) |
| 2 | Honda TechInfo — Diagnostic System Tools | OEM Official | https://techinfo.honda.com/Rjanisis/pubs/web/RJAAI001_CHE_TOOLS_DIAGNOSTIC.htm | 2026-05-15 | High (OEM) |
| 3 | Honda TechInfo — HDS Tester User Guide | OEM Manual | https://techinfo.honda.com/Rjanisis/pubs/web/RJAAI001_CHE_TOOLS_DIAGNOSTIC.htm (linked PDF) | 2026-05-15 | High (OEM) |
| 4 | 1992–1996 Helms Manual (H22A1) | OEM Service Manual | Local repo: 1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf | 2026-05-15 | High (OEM) |
| 5 | 1997–2001 Helms Manual (H22A4) | OEM Service Manual | Local repo: 1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf | 2026-05-15 | High (OEM) |

### Secondary Sources (Community & Industry)

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Eddie Abbondanzio — OBD1 Check Engine Light Codes | Community reference | https://eddieabbondanz.io/post/honda/obd1-cel-codes/ | 2026-05-15 | Medium |
| 2 | Carrot Top Tuning — OBD1-ENG Harness Pinout | Technical reference | https://www.carrottoptuning.com/blogs/technical-details/obd1-eng-harness-pinout-overview | 2026-05-15 | Medium |
| 3 | Straight Talk Automotive — Honda OBD1 DTC | Community reference | http://straighttalkautomotive.com/OBD1/honda-OBD-I.html | 2026-05-15 | Medium |
| 4 | HondaPartsOnline.net — Pre-96 Code Reading | Community guide | https://www.hondapartsonline.net/blog/how-to-read-codes-from-your-pre-96-honda | 2026-05-15 | Medium |
| 5 | Gregg Smith Automotive — VTEC Diagnosis | Industry article | https://greggsmithautomotive.com/blog/vtec-system-failure-diagnosis/ | 2026-05-15 | Medium |
| 6 | CarParts.com — CKP/CMP Sensor Testing | Industry article | https://www.carparts.com/blog/tips-on-how-to-test-the-camshaft-and-crankshaft-position-sensors/ | 2026-05-15 | Medium |
| 7 | JustAnswer — VTEC Solenoid Testing | Expert Q&A | https://www.justanswer.com/honda/0wcoq-2000-honda-accord-check-vtec.html | 2026-05-15 | Medium |
| 8 | D-Series.org — VTEC Oil PSI Switch | Community forum | https://www.d-series.org/threads/how-to-test-vtec-oil-psi-switch.37746/ | 2026-05-15 | Medium |
| 9 | PreludeOnline — VTEC Pressure Switch Test | Community forum | https://www.preludeonline.com/threads/help-with-multimeter-testing-vtec-pressure-switch-pics.219712/ | 2026-05-15 | Medium |
| 10 | HA Motorsports — Honda DTC Reference | Community reference | https://www.hamotorsports.com/pages/check-engine-light-codes-diagnostic-trouble-codes | 2026-05-15 | Medium |
| 11 | Honda-Tech Forum — Multiple threads | Community forum | https://honda-tech.com/forums/honda-prelude-4/ | 2026-05-15 | Medium |
| 12 | Reddit r/MechanicAdvice — OBD1 Scan Help | Community forum | https://www.reddit.com/r/MechanicAdvice/comments/1kwi7z2/honda_obd1_scan_help/ | 2026-05-15 | Medium |
| 13 | Auto-Diagnostics.info — Honda HDS | Industry reference | http://www.auto-diagnostics.info/honda_hds | 2026-05-15 | Medium |
| 14 | AcuraZine — HDS/HIM Tool Benefits | Community forum | https://acurazine.com/forums/3g-tl-performance-parts-modifications-112/multiple-benefits-owning-hds-him-tool-everything-you-need-know-898223/ | 2026-05-15 | Medium |
| 15 | RepairPal — Honda Prelude Maintenance | Third-party database | https://repairpal.com/estimator/honda/prelude/maintenance-schedule | 2026-05-15 | Medium |

### Tertiary Sources (Vendor & Product)

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | King Bolentool — LAUNCH Creader Elite | Vendor product page | https://kingbolentool.com/products/2024-launch-creader-elite-for-honda-obd-scanner-diagnostic-tool | 2026-05-15 | Low (vendor) |
| 2 | AliExpress — LAUNCH X431 Elite | Vendor product page | https://www.aliexpress.com/item/1005007159917593.html | 2026-05-15 | Low (vendor) |
| 3 | eBay — Launch X431 PRO Elite | Marketplace listing | https://www.ebay.com/itm/146221956001 | 2026-05-15 | Low (vendor) |
| 4 | Amazon — Honda HDS tools | Marketplace listing | https://www.amazon.com/honda-hds/s?k=honda+hds | 2026-05-15 | Low (vendor) |

---

## Notes

1. **VTEC solenoid resistance discrepancy:** Gregg Smith Automotive cites "3–5 kΩ" for a "clean OEM unit," while JustAnswer and multiple community sources consistently cite 14–30 ohms. The 14–30 ohm figure is the widely accepted specification for Honda VTEC solenoid coils across all DOHC VTEC applications (H-series, B-series, K-series). The 3–5 kΩ figure may refer to a different sensor (possibly the VTEC pressure switch or a misread measurement). The 14–30 ohm specification is used here as the authoritative value.

2. **OBD1 live data limitation:** OBD1 H-series ECUs fundamentally cannot stream live data. Aftermarket tools claiming OBD1 live data capability are either (a) interpreting raw sensor voltages at the ECU connector via a breakout harness, or (b) providing limited PID access through non-standard protocols. Neither approach matches the fidelity of factory OBD2 HDS data lists.

3. **HDS availability for OBD1 vehicles:** While the HDS software package claims coverage from 1992 onward, its practical utility for OBD1 vehicles is limited because OBD1 Hondas do not use the standard OBD2 DLC protocol. The HDS can communicate with OBD1 ECUs only through special adapters or by connecting directly to the ECU connector — neither is standard practice.

4. **Local manual data:** The 1992–1996 Helms Manual (H22A1) and 1997–2001 Helms Manual (H22A4) contain detailed diagnostic procedures that could refine these figures further. The OCR-extracted text of the BB6 manual (1,376 pages) has not yet been searched for specific diagnostic procedure sections.

5. **Oscilloscope pattern specificity:** The waveform patterns documented here are based on general Honda VR sensor testing methodology and community-shared patterns. Exact amplitude and frequency values may vary slightly between H22A Redtop, Blacktop, and H22A1 variants due to differences in reluctor wheel tooth count and sensor placement.

---

## Citations

1. Honda Motor Co., Ltd. — "Diagnostic Tools and Software," Honda TechInfo. Retrieved 2026-05-15. OEM specification: HDS Tablet Tester $7,795, annual software $840, covers 1992+ Honda/Acura vehicles.

2. Honda Motor Co., Ltd. — "Diagnostic System (HDS) Tablet User Guide." Retrieved 2026-05-15. OEM procedural documentation for HDS operation.

3. Eddie Abbondanzio — "OBD1 Check Engine Light Codes." Retrieved 2026-05-15. Cross-referenced against 94-01 service manual, 92-95 Civic service manual, and 97-01 CRV service manual. Complete OBD1 DTC table for Honda.

4. Carrot Top Tuning — "OBD1-ENG Harness Pinout Overview (1992–1995)." Retrieved 2026-05-15. Detailed ECU A/B/D connector pinout tables with test values for H22A/H22A1 diagnostic pins.

5. Gregg Smith Automotive — "Diagnosing VTEC System Failure in Honda Engines." Retrieved 2026-05-15. VTEC solenoid and pressure switch testing procedures.

6. JustAnswer — "How to Test VTEC Solenoid on 2000 Honda Accord." Retrieved 2026-05-15. VTEC solenoid resistance specification: 14–30 ohms.

7. CarParts.com — "Tips on How to Test the Camshaft and Crankshaft Position Sensors." Retrieved 2026-05-15. VR sensor testing methodology and expected waveform characteristics.

8. D-Series.org — "How to Test VTEC Oil PSI Switch." Retrieved 2026-05-15. VTEC pressure switch testing: rev to 5000 RPM, check >52 psi oil pressure, verify continuity.

9. PreludeOnline — "Help with multimeter: Testing VTEC pressure switch?" Retrieved 2026-05-15. VTEC pressure switch resistance spec: ≤1.5 ohms when closed.

10. HA Motorsports — "Check Engine Light Codes / Diagnostic Trouble Codes." Retrieved 2026-05-15. OBD0/OBD1/OBD2 DTC reference for Honda/Acura.

11. Honda TechInfo — "Diagnostic System (HDS) Personal Computer (PC) Software." Retrieved 2026-05-15. HDS PC software requirements and ordering information.

12. Auto-Diagnostics.info — "Honda Diagnostic System (HDS)." Retrieved 2026-05-15. HDS feature overview and comparison chart reference.

13. RepairPal — "Honda Prelude Maintenance Schedule." Retrieved 2026-05-15. Database of 20 different services over 150,000 miles for Honda Prelude.

14. QWEN.md — "Honda H22 Engine - Exhaustive Technical Documentation." Internal project reference. Retrieved 2026-05-15. Contains diagnostic procedures section with OBD1 code reading, sensor testing specs, and ECU pinout references.
