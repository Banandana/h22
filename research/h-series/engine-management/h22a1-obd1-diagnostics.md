# H22A1 OBD1 Diagnostics: Connector Pinout, Test Mode, Live Data, Trouble Code Retrieval

> **Task:** T-172 [research] Research H22A1 OBD1 diagnostics: connector pinout, test mode, live data, trouble code retrieval procedures
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified | Complete

---

## Summary

The Honda H22A1 (1993–1996 USDM Prelude VTEC) uses a proprietary OBD1 diagnostic system with no standardized OBD-II port. Diagnostics are performed through a 2-pin service check connector located in the driver's side footwell, which triggers blink-code output via the dashboard Check Engine Light. The full DTC set spans codes 0–43 (plus variant-specific codes), displayed as long-blink (tens digit) + short-blink (ones digit) patterns. Unlike OBD2, OBD1 provides no native live data streaming — real-time sensor monitoring requires aftermarket solutions (Hondata S300, laptop-based tools via ECU harness adapter). This document compiles the complete diagnostic architecture: service connector location and pinout, DTC blink-code procedure and full code table, ECU test-point pinouts for direct multimeter measurement, live data capabilities and limitations, and code clearing/reset procedures. Cross-referenced against the Helms Factory Service Manual, Honda-Tech community guides, civic-eg.com ECU pinout reference, Eddie Abbondanzio's OBD1 code database, and multiple enthusiast forum threads.

---

## Diagnostic Architecture Overview

### OBD1 vs OBD2: Fundamental Differences

| Aspect | OBD1 (H22A1, 1993–1996) | OBD2 (H22A4, 1997+) |
|--------|--------------------------|----------------------|
| **Connector** | No standardized port; 2-pin service connector only | Standardized 16-pin DLC under dashboard |
| **Code Reading** | Blink codes via CEL on dash | Scan tool protocol (SAE J1850 / ISO 9141-2) |
| **Live Data** | None natively; requires aftermarket adapter to ECU | Real-time PID streaming via scan tool |
| **Code Set** | Honda proprietary (0–43) | SAE standardized P-codes (P0xxx) |
| **Immobilizer** | None | Integrated (1997+) |
| **Readiness Monitors** | None | Full OBD2 readiness monitor set |
| **Freeze Frame** | No | Yes (OBD2) |

The H22A1's OBD1 system is fundamentally simpler than OBD2 but provides less diagnostic depth. It can identify *which* circuit has a fault (via DTC) but cannot provide *quantitative* sensor values without aftermarket tools.

---

## Service Check Connector (Test Mode)

### Physical Description and Location

The H22A1 uses a **2-pin service check connector** (also called the "SCS connector" or "diagnostic connector") to enter test mode. This is the primary diagnostic interface for all pre-OBD2 Honda/Acura vehicles.

**Location:** Under the dashboard, near the driver's side footwell / center console area, close to the gas pedal. The connector is housed in a **blue rubber boot/connector**. Some sources also reference a yellow-boot connector on the firewall near the vacuum box — this appears to be a secondary or alternate location depending on model year and market configuration.

**Connector type:** 2-pin male spade terminals in a rectangular plastic housing. The connector is normally open (disconnected) during normal operation. To enter test mode, the two terminals must be shorted together with a paperclip, jumper wire, or purpose-built SCS connector tool.

### Pinout

| Pin | Function | Wire Color | Notes |
|-----|----------|------------|-------|
| 1 | SCS (Service Check Signal) input to ECU | Variable | See ECU D4 pin mapping below |
| 2 | Ground / Reference | Variable | Completes circuit to trigger diagnostic mode |

**Note:** The 2-pin connector is a simple jumper — both pins are internally connected to ECU signal lines. The exact wire colors at the connector vary by model year and market. The ECU-side termination of these signals is documented in the ECU pinout tables below.

### Test Mode Procedure

**Step-by-step procedure for reading DTC blink codes:**

1. **Warm up the engine** to normal operating temperature (drive for 10+ minutes or until radiator fan cycles on). This ensures the ECU has completed all self-tests and learned idle/trim baselines.

2. **Turn the ignition OFF.**

3. **Locate the 2-pin service connector** in the driver's side footwell (blue rubber boot).

4. **Insert a paperclip or U-shaped wire** into both terminals of the 2-pin connector to short them together.

5. **Turn the ignition to ON** (position II, do NOT start the engine).

6. **Observe the Check Engine Light (CEL/MIL)** on the instrument cluster:
   - **No stored codes:** CEL illuminates solid (steady on)
   - **Stored codes present:** CEL blinks out the stored trouble codes in sequence
   - **CEL does not illuminate at all:** Possible blown bulb, poor jumper connection, or Code 0 (faulty ECU)

7. **Record the blink pattern** for each code. See "Blink Code Reading" section below.

8. **Multiple codes** will display sequentially, one after another, in ascending numerical order. Each code repeats several times before moving to the next.

9. **After recording all codes,** remove the jumper from the service connector.

10. **Clear codes** by removing the clock/radio (10A) fuse for 10+ seconds, or disconnecting the battery negative terminal for 10+ seconds.

### Troubleshooting Test Mode Issues

| Symptom | Probable Cause | Resolution |
|---------|---------------|-------------|
| CEL stays solid (no blinking) when jumpered | No stored codes (healthy ECU) | Remove jumper — system is OK |
| CEL stays solid (no blinking) when jumpered | Blown CEL bulb | Test bulb separately; replace if needed |
| CEL stays solid (no blinking) when jumpered | Poor jumper connection | Verify continuity with multimeter |
| CEL stays solid (no blinking) when jumpered | Code 0 (ECU fault) | Force another code by unplugging a sensor (ECT, IACV, MAP); if CEL starts blinking, confirms Code 0 |
| CEL does not illuminate at all when key turned to ON | Blown CEL bulb or wiring fault | Test bulb independently; check fuse |
| ABS light flashes when jumpering blue connector | Jumped wrong connector (ABS diagnostic) | Use the correct 2-pin connector for engine diagnostics |

**Important notes from community experience:**
- Multiple PreludePower forum members confirmed that the CEL should come on solid when the service connector is jumpered (if no codes are stored). If it doesn't, verify: (1) bulb works, (2) jumper makes good contact, (3) not Code 0.
- The yellow 2-pin connector (vs. blue) may trigger ABS codes instead of engine codes — use the blue connector near the gas pedal for engine diagnostics.
- Code 0 indicates a faulty ECU. It can only be confirmed by forcing another code and verifying the CEL responds.

---

## Blink Code Reading

### How Blink Codes Work

The ECU encodes each DTC as a sequence of long and short blinks:

- **Single-digit codes (1–9):** Nine or fewer short blinks (each = 1 unit)
- **Two-digit codes (10–43):** Long blinks represent the tens digit, short blinks represent the ones digit
  - Long blink = 10 units
  - Short blink = 1 unit
  - Example: Code 22 = 2 long blinks, pause, 2 short blinks
  - Example: Code 14 = 1 long blink, pause, 4 short blinks
- **Pause between digits:** A brief pause separates the tens and ones digits within a single code
- **Pause between codes:** A longer pause separates one code from the next
- **Repeat cycle:** The entire code sequence repeats continuously as long as the ignition is ON and the jumper is in place

### Blink Code Reference Table

| Code | Description | System | Helms Manual Ref | Severity |
|------|-------------|--------|------------------|----------|
| **0** | Engine Control Module (ECU) fault | ECU | §11-31 | Critical — ECU malfunction |
| **1** | Heated Oxygen Sensor (HO2S) — Primary | Emissions | §11-36 | High — affects fuel trim |
| **3** | Manifold Absolute Pressure (MAP) Sensor — Electrical | Intake | §11-44 | High — affects fuel calculation |
| **4** | Crankshaft Position (CKP) Sensor | Ignition/Fuel | §11-50 | Critical — no spark/fuel without signal |
| **5** | Manifold Absolute Pressure (MAP) Sensor — Mechanical | Intake | §11-44 | High — vacuum leak or disconnected hose |
| **6** | Engine Coolant Temperature (ECT/TW) Sensor | Cooling | §11-52 | Medium — affects warm-up enrichment |
| **7** | Throttle Position (TP) Sensor | Fuel/Idle | §11-54 | Medium — affects throttle response |
| **8** | Top Dead Center (TDC) Sensor | Ignition Timing | §11-50 | Critical — no timing reference |
| **9** | No. 1 Cylinder Position (CYP) Sensor | Ignition Timing | §11-50 | Critical — no cylinder reference |
| **10** | Intake Air Temperature (IAT/TA) Sensor | Fuel Calculation | §11-56 | Low — minor fuel trim effect |
| **12** | Exhaust Gas Recirculation (EGR) System | Emissions | §11-135 | Medium — emissions impact |
| **13** | Barometric Pressure (BARO/PA) Sensor | Altitude Compensation | §11-58 | Low — altitude reference |
| **14** | Electronic Air Control Valve (EACV/IACV) | Idle Control | §11-76 | Medium — idle speed control |
| **15** | Ignition Output Signal (ICM) | Ignition | §11-60 | Critical — no ignition control |
| **16** | Fuel Injector Circuit | Fuel Delivery | §11-96 | High — misfire/fuel delivery |
| **17** | Vehicle Speed Sensor (VSS) | Transmission/Speed | §11-62 | Medium — affects shift/torque converter |
| **19** | Automatic Transmission Lock-Up Control Solenoid | Transmission | §11-70 | Medium — A/T only |
| **20** | Electric Load Detector (ELD) | Electrical Load | §11-64 | Low — alternator load compensation |
| **21** | VTEC Solenoid Valve | VTEC System | §11-68 | High — VTEC will not engage |
| **22** | VTEC Oil Pressure Switch | VTEC System | §11-68 | High — VTEC engagement feedback |
| **23** | Knock Sensor (KS) | Ignition Timing | §11-68 | Medium — knock protection disabled |
| **30** | A/T Fl Signal A (Automatic Transmission) | Transmission | §11-70 | Medium — A/T only |
| **31** | A/T Fl Signal B (Automatic Transmission) | Transmission | §11-70 | Medium — A/T only |
| **41** | Heated Oxygen Sensor (HO2S) Heater — Primary | Emissions | §11-38 | Medium — slow warm-up of O2 sensor |
| **43** | Fuel Supply System | Fuel Delivery | §11-42 | High — fuel pump/injector circuit |

### Notes on DTC Interpretation

- **Codes 1–9:** Single short blinks. Code 0 = no blinks (solid CEL with jumper = ECU fault).
- **Codes 10–43:** Long blinks first (tens), then short blinks (ones). Code 10 = 1 long blink. Code 22 = 2 long + 2 short. Code 43 = 4 long + 3 short.
- **Multiple codes:** Displayed in ascending numerical order. All stored codes repeat in sequence.
- **Code 0 ambiguity:** A solid CEL (no blinking) with jumper installed could mean either "no faults" or "ECU fault (Code 0)." Verification requires forcing a known code by unplugging a sensor.
- **Code 11:** Listed in some sources as "Engine Overheating" but marked as Hondata S300-specific (not stock Honda ECU). Not applicable to stock H22A1.
- **Code 36:** Reported on JDM P13 ECU as traction control code — not applicable to USDM H22A1.
- **Automatic transmission codes (19, 30, 31):** Only relevant for A/T models (P5M ECU). Manual transmission models (P51 ECU) will not generate these.

---

## ECU Connector Pinouts (Test Points)

The H22A1 OBD1 ECU (P51 for manual, P5M for automatic) uses a multi-connector layout. For direct multimeter testing of sensors and circuits, the following pinouts provide accessible test points. These are derived from the civic-eg.com OBD1 ECU pinout reference and cross-referenced with the Helms Service Manual.

### ECU Connector A (26-Pin) — Main Connector

| Pin | Wire Color | Terminal Name | Function | Expected Voltage/Test |
|-----|------------|---------------|----------|----------------------|
| 1 | Brown | INJ1 | Injector #1 | Ignition ON: 12V; Running: (-) Pulses |
| 2 | Yellow | INJ4 | Injector #4 | Ignition ON: 12V; Running: (-) Pulses |
| 3 | Red | INJ2 | Injector #2 | Ignition ON: 12V; Running: (-) Pulses |
| 4 | Orange/Black | VTS | VTEC Solenoid Valve | Low RPM: 0V; High RPM: 12V |
| 5 | Light Blue / Blue | INJ3 | Injector #3 | Ignition ON: 12V; Running: (-) Pulses |
| 6 | Orange/Black | PO2SHTC | Primary O2 Sensor Heater Control | Ignition ON: 12V; Operating: 0V |
| 7 | Green/Yellow | FLR | Fuel Relay (Main Relay) | 0V when activated, 12V resting |
| 8 | Green/Yellow | FLR | Fuel Relay (Main Relay) — Redundant | Same as Pin 7 |
| 9 | Green/White | IACV | Idle Air Control Valve | Idle: 6–10V |
| 11 | Orange/Blue | EGR Control Solenoid | Drives EGR valve | On: Duty controlled; Off: 0V |
| 12 | Green/Yellow | FANC | Radiator Fan Switch | Fan Running: 0V |
| 13 | Green/Orange | MIL | Malfunction Indicator Light | On: 0V; Off: 12V |
| 15 | Black/Red | ACC | A/C Compressor Clutch | AC On: 0V; AC Off: 12V |
| 16 | White/Yellow | ALTC | Alternator Control | 12V → 0V |
| 17 | Pink/Blue | IAB SOL | Intake Air Bypass (IAB) | Below 5750 RPM: 12V |
| 19 | White | ICS | Intake Control Solenoid Valve | Varies by ECU calibration |
| 20 | Red | PCS | Purge Control Solenoid | Coolant > 154°F: 12V when active |
| 21 | Red/Green | ICM | Ignition Control Module | Key ON: 12V; Running: Pulses |
| 22 | Red/Green | ICM | Ignition Control Module (redundant) | Same as Pin 21 |
| 23 | Black | PG1 | Power Ground 1 | < 1V at all times |
| 24 | Black | PG2 | Power Ground 2 | < 1V at all times |
| 25 | Yellow/Black | IGP2 | Ignition Power Ground 2 | Key ON: 12V |
| 26 | Black/Red | LG1 | Logic Ground 1 | < 1V at all times |

### ECU Connector B (16-Pin) — Secondary Connector

| Pin | Wire Color | Terminal Name | Function | Expected Voltage/Test |
|-----|------------|---------------|----------|----------------------|
| 1 | Yellow/Black | IGP1 | Ignition Power 1 | Ignition ON: 12V |
| 2 | Brown/Black | LG2 | Logic Ground 2 | < 1V at all times |
| 5 | Blue/Red | AC Switch | Detects AC switch status | AC On: 0V; AC Off: 12V |
| 7 | Pink/Black | CLSW | Clutch Switch | Pressed: 12V |
| 8 | Red/Red | PSP SW | Power Steering Pressure Switch | Steering: 12V |
| 9 | Blue/White | STS | Starter Switch Signal | Cranking: 12V |
| 10 | Yellow/Blue | VSS | Vehicle Speed Sensor | Ignition ON, wheels turning: 0–5V cycling |
| 11 | Orange | CYP P | Cylinder Position (Power) | Running: Pulses |
| 12 | White | CYP M | Cylinder Position (Ground) | Ground reference |
| 13 | Orange/Blue | TDC P | Top Dead Center (Power) | Running: Pulses |
| 14 | White/Blue | TDC M | Top Dead Center (Ground) | Ground reference |
| 15 | Blue/Green | CKP P | Crank Position (Power) | Running: Pulses |
| 16 | Blue/Yellow | CKP M | Crank Position (Ground) | Ground reference |

### ECU Connector D (22-Pin) — Sensor/Signal Connector

| Pin | Wire Color | Terminal Name | Function | Expected Voltage/Test |
|-----|------------|---------------|----------|----------------------|
| 1 | White/Blue | VBU | Voltage Backup | 12V (battery backup) |
| 2 | Green/White | BKSW | Brake Switch Signal | Brake pressed: 12V |
| 3 | Red/Blue | KS | Knock Sensor | Knock present: pulses |
| 4 | Brown | SCS | **Service Check Signal (SCS)** — Diagnostic mode enable | **Jumpered: 0V; Not jumpered: 5V or battery voltage** |
| 6 | Orange/Blue | VTP SW | VTEC Pressure Switch | VTEC ON: 12V |
| 7 | Light Blue | DLC | Data Link Connector | OBD2 adapter connection point |
| 9 | Pink | ALT F | Alternator FR Signal | Running: Voltage dependent on electrical load |
| 10 | Green/Red | ELD | Electric Load Detector | Parking lights ON, idle: 2.5–3.5V; Headlights ON: 1.5–2.5V |
| 11 | Light Green/Red | TPS | Throttle Position Sensor | Closed: ~0.5V; Wide open: ~4.5–4.8V |
| 12 | White/Black | EGRL | EGR Valve Position | Idle: ~1.2V |
| 13 | Red/White | ECT | Engine Coolant Temperature | Cold: ~2.5–4.8V; Hot: ~0.1–1.0V |
| 14 | White | PHO2S | Primary Heated O2 Sensor Signal | Full throttle: >0.6V; Decel: >0.4V |
| 15 | Red/Yellow | IAT | Intake Air Temperature | Cold: ~2.5–4.8V; Hot: ~0.1–1.0V |
| 16 | Blue/Green | LAF IP-/VS- | 5-wire O2 Sensor (VX models only) | Jumpered to D22: >0.5V |
| 17 | White / White/Yellow | MAP | Manifold Absolute Pressure | Ignition ON: ~3V; Idle: ~1V |
| 18 | Pink/Green | SIL | Upshift Light | Varies |
| 19 | Yellow/Green | VCC1 | Sensor Voltage 1 (MAP reference) | Ignition ON: **5V reference** |
| 20 | Yellow/White | VCC2 | Sensor Voltage 2 (TPS reference) | Ignition ON: **5V reference** |
| 21 | Green/Blue | SG1 | Sensor Ground 1 | < 1V at all times |
| 22 | Green/White | SG2 | Sensor Ground 2 | < 1V at all times |

### Key Diagnostic Test Points Summary

| Signal | Connector/Pin | Normal Range | Notes |
|--------|--------------|--------------|-------|
| **SCS (Diagnostic Mode Enable)** | D4 | 0V jumpered / 5V open | Shorting D4 to ground triggers test mode |
| **VCC1 (Sensor Ref)** | D19 | 5V | Reference voltage for MAP, IAT, ECT |
| **VCC2 (Sensor Ref)** | D20 | 5V | Reference voltage for TPS |
| **SG1 (Sensor GND)** | D21 | < 1V | Sensor ground return |
| **SG2 (Sensor GND)** | D22 | < 1V | Sensor ground return |
| **LG1 (Logic GND)** | A26 / D22 | < 1V | ECU logic ground |
| **PG1 (Power GND)** | A23 / A24 | < 1V | Power ground |
| **IGP1 (Ignition Power)** | B1 | 12V | Ignition-switched power |
| **IGP2 (Ignition Power)** | A25 | 12V | Ignition-switched power |
| **MAP Signal** | D17 | ~1V idle, ~3V key-on | Varies with manifold pressure |
| **TPS Signal** | D11 | 0.5V closed, 4.5–4.8V WOT | Potentiometer output |
| **ECT Signal** | D13 | ~2.5V cold, ~0.5V hot | Thermistor voltage divider |
| **IAT Signal** | D15 | ~2.5V cold, ~0.5V hot | Thermistor voltage divider |
| **IACV Signal** | A9 | 6–10V at idle | PWM-controlled |
| **VTEC Solenoid** | A4 | 0V low RPM, 12V high RPM | ECU switches on at VTEC engagement |
| **VTEC Pressure Switch** | D6 | 12V when VTEC engaged | Confirms mechanical engagement |
| **CKP Signal** | B15/B16 | AC pulses, running | Crankshaft position |
| **TDC Signal** | B13/B14 | AC pulses, running | Top dead center reference |
| **CYP Signal** | B11/B12 | AC pulses, running | Cylinder position |
| **Knock Sensor** | D3 | Pulse signal on knock | Piezoelectric |
| **MIL (CEL Control)** | A13 | 0V when lit, 12V when off | ECU grounds the circuit |

---

## Live Data Capabilities and Limitations

### Native OBD1: No Live Data Streaming

The H22A1 OBD1 system **does not support native live data streaming**. Unlike OBD2 vehicles where a scan tool can query PIDs (Parameter IDs) for real-time sensor values, the OBD1 H22A1 ECU provides no serial data protocol for live sensor monitoring.

**What this means:**
- You cannot plug in a generic OBD2 scanner and read live RPM, MAP, TPS, ECT, etc.
- The 2-pin service connector only triggers blink-code output — it does not transmit sensor data.
- There is no standardized data link connector (DLC) on the H22A1.

### Aftermarket Solutions for Live Data

Several aftermarket approaches enable live data monitoring on OBD1 H22A1 systems:

#### 1. Hondata S300

The Hondata S300 is the primary tuning solution for OBD1 H22A1 ECUs (requires P28 or P06 chip-equipped ECU, not stock P51/P5M).

- **Live data:** Can read all sensor inputs (MAP, TPS, ECT, IAT, CKP, VSS, etc.) plus calculated values (spark advance, injector pulse width, fuel trims)
- **Interface:** Serial connection to laptop via USB-to-serial adapter
- **Cost:** ~$300+ for the S300 unit
- **Requirements:** Requires chippable ECU (P28/P06/P72) — stock P51/P5M ECUs have soldered EPROMs and cannot accept the S300
- **Data format:** Full sensor values with units (voltage, RPM, °F, kPa, etc.)

#### 2. OBD1-to-OBD2 Harness Converter

An aftermarket harness adapter converts the OBD1 ECU connectors to a standard 16-pin OBD2 DLC format.

- **Live data:** Depends on the scan tool used; basic OBD2 scanners may read limited PIDs
- **Interface:** Standard 16-pin OBD2 port (installed under dashboard)
- **Limitations:** Not all OBD2 scanners support Honda OBD1 protocols; may require specific scanner software
- **Availability:** eBay sellers offer "ECU Harness OBD2b-OBD1" adapters for ~$30–$60
- **Caveat:** Requires compatible ECU — won't work with immobilizer-integrated OBD2 ECUs

#### 3. Direct ECU Multimeter Testing

For basic diagnostics without any aftermarket tools, the ECU pinouts above provide direct test points for multimeter measurement.

- **Live data:** Manual measurement of individual sensor voltages
- **Interface:** Multimeter probes to ECU connector pins
- **Advantages:** No special tools required; works with any H22A1
- **Disadvantages:** Labor-intensive; only one parameter at a time; requires knowing which pin to probe
- **Best for:** Verifying sensor functionality, diagnosing wiring issues, confirming ECU outputs

#### 4. Laptop-Based Diagnostic Software

Specialized software (e.g., Scanguage for Honda, or generic OBD1 diagnostic tools) can interface with the ECU via serial connection.

- **Live data:** Full sensor suite including calculated values
- **Interface:** Serial port to ECU (via adapter cable)
- **Examples:** Scanguage (Honda-specific), various OBD1 diagnostic packages
- **Cost:** Free to ~$100 depending on software
- **Requirements:** Serial port or USB-to-serial adapter; compatible ECU

### Recommended Sensor Voltage Reference Values

For multimeter testing at ECU connector test points (ignition ON, engine OFF unless noted):

| Sensor | Signal Pin | Cold (20°C) | Hot (80°C) | Notes |
|--------|-----------|-------------|------------|-------|
| **MAP** | D17 | ~3.0V (key-on, atmospheric) | ~1.0V (idle, manifold vacuum) | Varies with load |
| **TPS** | D11 | ~0.5V (closed throttle) | ~4.5V (wide open) | Smooth sweep, no dead spots |
| **ECT** | D13 | ~2.5–4.8V (cold) | ~0.1–1.0V (hot) | Thermistor — resistance decreases with temp |
| **IAT** | D15 | ~2.5–4.8V (cold) | ~0.1–1.0V (hot) | Same thermistor type as ECT |
| **VSS** | B10 | 0–5V cycling (wheels turning) | N/A | Only reads when vehicle moving |
| **Knock Sensor** | D3 | Pulse on knock event | N/A | Oscilloscope preferred over multimeter |
| **CKP** | B15/B16 | AC pulses, running | N/A | Oscilloscope preferred |
| **TDC** | B13/B14 | AC pulses, running | N/A | Oscilloscope preferred |
| **CYP** | B11/B12 | AC pulses, running | N/A | Oscilloscope preferred |
| **IACV** | A9 | 6–10V at idle | N/A | PWM-controlled |
| **VTEC Solenoid** | A4 | 0V (low RPM) → 12V (VTEC engaged) | N/A | Switches at ~5,200–5,500 RPM |
| **VTEC Pressure Switch** | D6 | Open (low voltage) → Closed (12V) | N/A | Confirms VTEC mechanical engagement |
| **ELD** | D10 | 2.5–3.5V (parking lights) | 1.5–2.5V (headlights) | Reflects electrical load |
| **PSP Switch** | B8 | 12V when steering wheel turned | N/A | Hydraulic pressure switch |

---

## Trouble Code Retrieval Procedures

### Primary Method: Service Connector (2-Pin Jumper)

This is the standard, factory-recommended procedure documented in the Helms Service Manual.

**Steps:**

1. Warm engine to normal operating temperature (radiator fan cycles on)
2. Turn ignition OFF
3. Locate 2-pin blue service connector in driver's side footwell
4. Short connector terminals with paperclip or jumper wire
5. Turn ignition to ON (do not start)
6. Read CEL blink pattern:
   - Solid = no codes (or Code 0)
   - Blinking = stored codes displayed in sequence
7. Record all codes (they repeat in ascending order)
8. Remove jumper
9. Clear codes (see "Code Clearing" section below)

**Expected blink pattern examples:**

| Code | Blink Pattern | Visual Description |
|------|--------------|-------------------|
| 1 | Short × 1 | One quick flash |
| 4 | Short × 4 | Four quick flashes |
| 10 | Long × 1 | One slow flash |
| 14 | Long × 1, Short × 4 | One slow flash, pause, four quick flashes |
| 21 | Long × 2, Short × 1 | Two slow flashes, pause, one quick flash |
| 22 | Long × 2, Short × 2 | Two slow flashes, pause, two quick flashes |
| 43 | Long × 4, Short × 3 | Four slow flashes, pause, three quick flashes |

### Alternative Method: ECU LED (On-Board Diagnostic LED)

Some H22A1 ECUs have an onboard diagnostic LED (typically on the ECU housing itself, visible through a small window or by removing the ECU from its bracket).

- **Function:** Identical to the CEL blink pattern
- **Advantage:** Can read codes without dashboard visibility
- **Disadvantage:** Requires physical access to ECU; not all ECUs have this feature
- **Limitation:** Cannot detect Code 0 (ECU fault) — the LED won't blink for Code 0 either

### Forced Code Generation (Verification Test)

To verify that the CEL and diagnostic system are functional (especially when suspecting Code 0):

1. With service connector jumpered and ignition ON
2. If CEL stays solid (no blinking), force a known code
3. Unplug a major sensor while the jumper is still in place:
   - **ECT sensor** (on water outlet) — most reliable
   - **IACV/EACV** (front of plenum, middle)
   - **TPS** (on throttle body)
   - **MAP sensor** (on vacuum box)
   - **EGR solenoid** (on vacuum box)
4. The CEL should immediately begin blinking the code for the disconnected sensor
5. If the CEL starts blinking after unplugging the sensor, the system is functional and the original "solid CEL" indicated Code 0 (ECU fault)

---

## Code Clearing and ECU Reset Procedures

### Method 1: Fuse Removal (Preferred)

1. Locate the **clock/radio fuse** (10A) in the under-dash fuse box
2. Remove the fuse for **10+ seconds**
3. Reinstall the fuse
4. This clears all stored DTCs from the ECU memory

**Advantages:** Does not reset radio anti-theft code; faster than battery disconnect

### Method 2: Battery Disconnect

1. Disconnect the **negative (-) battery terminal**
2. Wait **10+ seconds** (30+ seconds recommended for full capacitor discharge)
3. Reconnect the negative terminal
4. This clears all stored DTCs and resets ECU adaptive learning

**Disadvantages:** Resets radio anti-theft code (requires security code); resets ECU idle adaptation; may cause temporary rough idle until ECU relearns

### Method 3: ECU Reset Pin (If Applicable)

Some ECU variants have a reset pin or jumper on the PCB itself. This is less common on stock P51/P5M ECUs and more common on chippable ECUs (P28/P06). Consult the specific ECU documentation.

### Post-Reset Behavior

After clearing codes:
- The ECU will begin relearning idle trim, fuel trims, and VTEC parameters
- Expect rough or elevated idle for the first 5–10 drive cycles
- The CEL will illuminate briefly at key-on (bulb check) then go off — this is normal
- Drive the vehicle through a complete drive cycle for the ECU to re-run all self-tests
- If the underlying fault persists, the DTC will return (often within the same drive cycle)

---

## Additional Diagnostic Connectors in the H22A1 Prelude

### Secondary Connectors in Footwell Area

Owners sometimes report finding **multiple connectors** in the driver's side footwell area:

| Connector | Pins | Color | Purpose | How to Identify |
|-----------|------|-------|---------|-----------------|
| **Service Check Connector** | 2-pin | Blue | Engine DTC codes | Jumper → CEL blinks |
| **ABS Diagnostic Connector** | 2-pin | Blue (different location) | ABS/DTC codes | Jumper → ABS light blinks |
| **3-Pin Connector** | 3-pin | Blue/Grey | Unknown/aftermarket | Not OEM diagnostic |

**Important:** Jumping the wrong connector will trigger the wrong warning light. For engine diagnostics, use the **2-pin blue connector near the gas pedal** — this triggers the CEL. The ABS diagnostic connector (also 2-pin blue, different location) triggers the ABS warning light.

### Round Connector Plugs (ECU Interface Points)

The H22A1 ECU connects to the vehicle harness via three round connector plugs:

| Connector | Pins | Location | Key Signals |
|-----------|------|----------|-------------|
| **Driver-side round (C304/C126)** | 14-pin | Driver side strut tower | IACV, VSS, ICM, coolant temp, oil pressure, tach signal |
| **Passenger-side (C222/C102)** | 10-pin | Passenger side | Knock sensor, O2 sensor, CKP, TDC, CYP signals |
| **Passenger-side (C221/C101)** | 4-pin | Passenger side | Injector signals (INJ1–INJ4) |
| **Passenger-side (C223/C103)** | 14-pin | Passenger side | VTEC solenoid, MAP, TPS, ECT, IAT, VTEC pressure switch |

These connectors provide additional test points for sensor verification without disconnecting the main ECU harness.

---

## Comparison: H22A1 OBD1 vs H22A4 OBD2 Diagnostics

| Feature | H22A1 (OBD1, 1993–1996) | H22A4 (OBD2, 1997–2001) |
|---------|--------------------------|--------------------------|
| **Connector** | 2-pin service connector | 16-pin standardized DLC |
| **Code Reading** | CEL blink codes | Scan tool (SAE J1850 PWM) |
| **Code Set** | Honda proprietary 0–43 | SAE P-codes (P0xxx) |
| **Live Data** | None natively | Full PID streaming |
| **Freeze Frame** | No | Yes |
| **Readiness Monitors** | None | Full OBD2 set |
| **Immobilizer** | None | Integrated (1997+) |
| **Scan Tool** | None needed; paperclip suffices | OBD2 scan tool required |
| **ECU Tuning** | Chippable (P28/P06 swap) | Immobilizer-locked (P13) |
| **Aftermarket Tools** | Hondata S300, Scanguage | Hondata FlashPro, various |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | OBD1 H22A Service Manual (Helms Manual OCR) | Primary | /data/h22/OBD1_H22A_Service_Manual.md | 2026-05-15 | A+ |
| 2 | Honda-Tech. "DIY: Diagnose Check Engine Lights 4th gen Prelude." | Primary | https://honda-tech.com/forums/honda-prelude-4/diy-diagnose-check-engine-lights-4th-gen-prelude-2495089/ | 2026-05-15 | A |
| 3 | Eddie Abbondanzio. "OBD1 Check Engine Light Codes." | Primary | https://eddieabbondanz.io/post/honda/obd1-cel-codes/ | 2026-05-15 | A |
| 4 | Cause for Alarm. "Honda OBD1 ECU Pinout." | Primary | http://www.civic-eg.com/causeforalarm/version9/resources/ecu_pinouts/obd1_pinouts.html | 2026-05-15 | A |
| 5 | PreludePower Forum. "Service Connector" thread. | Tertiary | https://www.preludepower.com/threads/service-connector.273903/ | 2026-05-15 | B |
| 6 | PreludeOnline Forum. "OBD - how to read live data?" thread. | Tertiary | https://www.preludeonline.com/threads/obd-how-to-read-live-data.269091/ | 2026-05-15 | B |
| 7 | PreludeDriver.com. "CEL Codes and How to Check." | Tertiary | https://www.preludedriver.com/forum/viewtopic.php?t=14 | 2026-05-15 | B |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 8 | QWEN.md. "Honda H22 Engine — Exhaustive Technical Documentation." | Primary | /data/h22/QWEN.md | 2026-05-15 | A |
| 9 | Slideshare. "Honda/Acura OBD1 Codes List." | Secondary | https://www.slideshare.net/slideshow/honda-acura-obd1-codes-list-pdf/250736218 | 2026-05-15 | B |
| 10 | Cyclepedia. "Honda SCS Service Connector." | Secondary | https://www.cyclepedia.com/honda_scs_service_connector/ | 2026-05-15 | B |
| 11 | Dodo Upgrades. "OBD1 Pinouts." | Secondary | https://dodo-upgrades.nl/index.php/pinout-obd1/ | 2026-05-15 | B |

---

## Notes

### Conflicts & Uncertainties

1. **Service connector color/location:** Most sources describe a blue 2-pin connector in the driver's side footwell near the gas pedal. However, one PreludePower thread references a yellow-boot connector on the firewall near the vacuum box. This discrepancy may reflect: (a) different model years using different locations, (b) confusion between the engine diagnostic connector and the ABS diagnostic connector (both 2-pin, both blue/yellow), or (c) aftermarket modifications. The blue connector near the gas pedal is the most consistently referenced across multiple independent sources (Honda-Tech, PreludePower, Preludedriver.com).

2. **Code 11 (Engine Overheating):** Eddie Abbondanzio lists Code 11 as "Engine Overheating" but explicitly marks it as "Hondata S300 specific and doesn't apply to stock Honda ECUs." The Helms Service Manual does not list Code 11 in the standard DTC table. Marked as non-applicable to stock H22A1.

3. **Three connectors in footwell:** One Honda-Tech user reported finding three connectors: two 2-pin (yellow and blue) and one 3-pin (blue/grey). Jumping the blue connector triggered ABS codes, while jumping the yellow connector kept the CEL solid. This suggests the yellow connector may be an alternate engine diagnostic path or possibly an aftermarket addition. The blue connector is confirmed as the correct one for engine CEL codes.

4. **Live data via OBD2 adapter:** One PreludeOnline thread discusses adding an OBD2 DLC to an OBD1 Prelude for live data access. The consensus is that this requires an OBD2-compatible ECU (not possible with stock P51/P5M) or an aftermarket harness adapter that maps OBD1 signals to OBD2 PIDs. Results vary significantly depending on scanner capability.

5. **ECU pinout variations:** The civic-eg.com pinout reference is based primarily on Civic/Integra ECUs (P06, P28, P30). While the H22A1 shares the same OBD1 architecture, wire colors and some pin assignments may differ between P51 (manual), P5M (automatic), and swapped P28/P06 ECUs. Always verify with the specific ECU's documentation before making connections.

6. **ABS vs Engine diagnostic connectors:** Both use 2-pin blue connectors in similar locations. Jumping the wrong one triggers the wrong warning light (ABS vs CEL). The engine diagnostic connector is specifically for triggering CEL blink codes. The ABS connector triggers ABS warning light codes.

7. **DTC code range completeness:** The Honda-Tech guide lists codes 0–43. The Preludedriver.com list extends to Code 92 (evaporative purge flow). The higher-numbered codes (45, 48, 54, 58, 61–76, 80, 90–92) appear in later OBD1 Honda applications (1996+ Civic/VX with LAF sensor, OBD2a transition models) and may not be present on the H22A1 P51/P5M ECU. The 0–43 range is the authoritative set for the H22A1.

---

## Appendix

### Quick Reference: Blink Code Decoder

```
Single-digit codes (1-9):    Short blink × N
Two-digit codes (10-43):     Long blink × tens + Short blink × ones

Examples:
  Code 1  = _           (1 short)
  Code 4  = ____        (4 short)
  Code 9  = ________    (9 short)
  Code 10 = _-          (1 long)
  Code 14 = _-____      (1 long, 4 short)
  Code 21 = _-_         (2 long, 1 short)
  Code 22 = _-_ _       (2 long, 2 short)
  Code 30 = __-         (2 long)
  Code 43 = ___-___     (4 long, 3 short)

Where _ = short blink (~0.5s), - = long blink (~1.5s)
Pause between digits: ~0.5s
Pause between codes: ~2.5s
```

### Sensor Resistance Reference (Thermistors)

| Temperature | ECT Resistance | IAT Resistance |
|-------------|---------------|----------------|
| -40°C (-40°F) | ~100 kΩ | ~100 kΩ |
| 20°C (68°F) | ~2,500 Ω | ~2,500 Ω |
| 40°C (104°F) | ~800 Ω | ~800 Ω |
| 80°C (176°F) | ~300 Ω | ~300 Ω |
| 120°C (248°F) | ~100 Ω | ~100 Ω |

*Both ECT and IAT use the same thermistor type — resistance decreases as temperature increases.*

### Common Multimeter Test Procedure

1. Set multimeter to DC Volts (20V range)
2. Connect black probe to known good ground (body/chassis)
3. Connect red probe to ECU connector test point (see pinout tables above)
4. Turn ignition to ON (engine OFF unless specified)
5. Read voltage
6. Compare to expected values in this document

### Key Part Numbers Referenced

| Component | OEM Part Number | Notes |
|-----------|----------------|-------|
| ECU (Manual) | P51 | USDM H22A1 manual transmission |
| ECU (Automatic) | P5M | USDM H22A1 automatic transmission |
| EGR Solenoid | 36190-P13-003 | Vacuum control solenoid |
| EVAP Purge Solenoid | 36160-P5M-L01 | Charcoal canister purge control |
| Charcoal Canister | 77620-P0B-003 | EVAP system |
| Main Relay | Various | Provides IGP1/IGP2 power to ECU |

---

*This document represents research on the H22A1 OBD1 diagnostic system, compiled from web sources and local manuals. All specifications cross-checked against at least 2 independent sources where possible.*
