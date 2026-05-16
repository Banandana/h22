# Honda H-Series Idle Speed Specifications

> **Task:** T-115 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the complete idle speed specification for the Honda H-series engine family (H22A, H22A1, H22A4, H23A): nominal idle RPM targets by variant and transmission type, IACV (Idle Air Control Valve) control range and operation, base idle setting procedures for OBD1 vs OBD2 systems, fast idle thermo valve (FITV) function, ECM idle learning / adaptation logic, and complete diagnostic procedures for idle-related trouble codes. OBD1 systems use a mechanical idle air bypass screw for base idle with the IACV providing load compensation; OBD2 systems use the IACV exclusively for idle control with the ECM adapting to throttle body wear via closed-loop learning.

---

## Nominal Idle Speed Targets

### OBD2 (1997–2001) — H22A4 / H22A5 / H22A8

| Condition | Specification | Source | Notes |
|-----------|---------------|--------|-------|
| **A/T idle (P or N, all accessories off)** | 700 ± 50 rpm | BB6 Helms manual (p. 2-5), ECM data list | Factory service specification; confirmed by PGM tester live data |
| **M/T idle (neutral, all accessories off)** | 700 ± 50 rpm | BB6 Helms manual (p. 2-5) | Same target as A/T; neutral switch confirms transmission state |
| **Fast idle (cold start)** | 1,400 ± 200 rpm | BB6 Helms manual (p. 2-5) | FITV opens to admit extra air; closes as coolant warms past ~80 °C |
| **Idle CO** | ≤ 0.1 % | BB6 Helms manual (p. 2-5) | Maximum carbon monoxide at idle; indicates proper A/F ratio |
| **MAP at idle** | 21–41 kPa (160–310 mmHg, 6.3–12.2 inHg) | BB6 Helms manual, ECM data list | Vacuum reference; higher MAP = less vacuum = higher idle airflow |

### OBD1 (1992–1996) — H22A / H22A1 / H22A2

| Condition | Specification | Source | Notes |
|-----------|---------------|--------|-------|
| **Warm idle target** | 650–750 rpm | QWEN.md basic engine data table | General H-series specification; no market-specific variance documented |
| **Base idle (IACV unplugged)** | 400–600 rpm | Fuelly Honda OBD training manual, d-series.org forum | Mechanical bypass screw sets minimum airflow; IACV adds air to reach target |
| **Fast idle (cold)** | ~1,400 rpm | Honda OBD training module (section 23) | FITV opens; some variants lack FITV (VX-type engines) |

### Idle Speed by Variant

| Variant | Market | Transmission | Warm Idle | Fast Idle | Notes |
|---------|--------|-------------|-----------|-----------|-------|
| **H22A Redtop** | JDM | M/T | 650–750 rpm | ~1,400 rpm | Closed deck (1992–1996); IACV + bypass screw |
| **H22A Blacktop** | JDM | M/T | 650–750 rpm | ~1,400 rpm | Closed deck → open deck transition (1997) |
| **H22A1** | USDM | M/T | 650–750 rpm | ~1,400 rpm | OBD1; P51 ECU; alloy oil sump |
| **H22A1** | USDM | A/T | 650–750 rpm | ~1,400 rpm | OBD1; P5M ECU; torque converter lockup logic |
| **H22A2** | EDM | M/T | 650–750 rpm | ~1,400 rpm | Euro 1/2 emissions; similar to H22A1 |
| **H22A4** | USDM | M/T | 700 ± 50 rpm | 1,400 ± 200 rpm | OBD2; P13 ECU; IACV-only idle control |
| **H22A4** | USDM | A/T | 700 ± 50 rpm | 1,400 ± 200 rpm | OBD2; P13 ECU; A/T gear position signal used |
| **H22A5** | EDM | M/T | 700 ± 50 rpm | 1,400 ± 200 rpm | OBD2; BB6 2WS/4WS; same as H22A4 calibration |
| **H22A8** | EDM | M/T | 700 ± 50 rpm | 1,400 ± 200 rpm | OBD2; late-production European; red valve cover |
| **H23A** | JDM | M/T | 650–750 rpm | ~1,400 rpm | Longer stroke (95mm); lower redline (7,200 rpm) |

---

## IACV (Idle Air Control Valve) — Operation & Control Range

### Valve Type and Architecture

| Parameter | Specification | Source | Notes |
|-----------|---------------|--------|-------|
| **Type** | 2-wire electromagnetic plunger valve | Honda OBD training manual (Fuelly), preludepower forum | Current through winding opens plunger against spring; ECM controls current via duty cycle ground |
| **Winding resistance** | ~11.5 Ω | Honda OBD training manual (Fuelly) | Measured between two connector pins; no continuity to case |
| **Control signal** | PWM duty cycle from ECM | Honda OBD training manual (Fuelly) | ECM switches ground on/off rapidly; plunger never fully closes or fully opens — held at intermediate position |
| **Supply voltage** | Battery (+) on one side, switched ground on other | Honda OBD training manual (Fuelly) | ECM provides electronically simulated ground |
| **Cooling** | Heated by engine coolant (two small hoses) | Honda OBD training manual (Fuelly) | Prevents ice buildup in cold operation; valve position independent of coolant temperature |
| **Inlet screen** | Some variants include mesh screen | Honda OBD training manual (Fuelly) | Can clog with debris, restricting bypass air even when valve is open |

### IACV Duty Cycle Behavior

| Engine State | Duty Cycle | IACV Position | Effect |
|--------------|-----------|---------------|--------|
| **Cold engine** | Ground time > No-ground time (~60–80% duty) | More open | Increases idle RPM for warm-up |
| **Warm engine** | Ground ≈ No-ground (~50% duty) | Intermediate | Maintains target idle speed |
| **Load applied (A/C on)** | Ground time increases | Opens further | Raises idle to compensate for compressor load |
| **Load removed** | Ground time decreases | Closes slightly | Drops idle back to target |

Source: Oscilloscope measurements from Mastertech scan tool with Honda/Acura software (Fuelly thread, GasSavers_TomO, 2008).

### IACV Full-Open / Full-Close Test Procedures

| Test | Procedure | Expected Result | Source |
|------|-----------|-----------------|--------|
| **Full close** | Unplug IACV connector | Idle drops to base idle (bypass screw only) | Honda OBD training manual (Fuelly) |
| **Full open** | Temporarily ground ECM-side IACV wire | Idle increases significantly | Honda OBD training manual (Fuelly) |
| **Resistance check** | Ohmmeter across two pins | ~11.5 Ω; no continuity to case | Honda OBD training manual (Fuelly) |

### IACV Diagnostic Trouble Codes

| DTC | Description | Probable Cause Page | System |
|-----|-------------|-------------------|--------|
| **P1259** | VTEC system malfunction | 11-58 | VTEC (related — low oil pressure prevents VTEC engagement, affects idle stability) |
| **Code 7** | Idle Air Control (IAC) Valve | 11-103 | PGM-FI |
| **Code 8** | Fast Idle Thermo Valve B | 11-114 | PGM-FI |
| **Code 9** | Idle Speed Adjustment | 11-115 | PGM-FI |
| **Code 10** | Throttle Body | 11-140 | PGM-FI |

Source: BB6 Helms manual, page 11-40 (probable cause list for erratic idle).

### IACV Common Failure Modes

| Symptom | Likely Cause | Remedy | Source |
|---------|-------------|--------|--------|
| **Idle too high** | IACV not closing down, FITV stuck open, throttle plate not fully closed, vacuum leak | Clean IACV, check FITV, inspect throttle stop screw, pressure-test vacuum system | Honda OBD training manual (Fuelly), d-series.org |
| **Idle too low / stalls** | IACV clogged, base idle set too low, dirty throttle body, low oil pressure (VTEC won't engage) | Clean IACV inlet screen, adjust bypass screw, clean throttle body, check oil pressure | Honda OBD training manual (Fuelly), preludeonline forum |
| **Idle fluctuates / bobbles** | RPM dips below 1,100 then fuel cut re-engages injectors (decel fuel cut cycling), vacuum leak, PSP switch not signaling | Lower base idle below 1,100 rpm, find and seal vacuum leak, verify PSP switch signal | Honda OBD training manual (Fuelly) |
| **Slow IACV response to load** | Blocked inlet screen, sticky plunger, missing PSP/brake/clutch switch signal | Clean IACV, replace if necessary, verify switch signals to ECM | Honda OBD training manual (Fuelly), preludeonline forum |
| **Rough idle after cleaning TB** | ECM has not relearned new throttle blade position | Perform ECM reset + idle learn procedure | preludepower forum, general Honda practice |

---

## Base Idle Setting — OBD1 vs OBD2

### OBD1 (1992–1996) — Mechanical Bypass Screw + IACV

| Step | Procedure | Notes |
|------|-----------|-------|
| **1** | Warm engine to normal operating temperature | Coolant fan must have cycled at least once |
| **2** | Turn off all electrical accessories (A/C, lights, radio) | Must be completely off for accurate reading |
| **3** | Disconnect IACV electrical connector | Unplugging sets a DTC — clear with scan tool to preserve adaptive learning |
| **4** | Adjust idle air bypass screw on throttle body | Brass screw with flat slot, usually sealed with factory paint; scrape paint to access |
| **5** | Target idle: 400–600 rpm (base idle, IACV disconnected) | This is the MINIMUM airflow; IACV will add air when connected to reach target |
| **6** | Reconnect IACV connector | Clear DTC with scan tool |
| **7** | Verify idle rises to 650–750 rpm with IACV active | IACV adds bypass air to reach target; if idle does not rise, IACV may be stuck closed |
| **8** | Apply loads (A/C on, steering lock) and verify idle boost | IACV should respond within milliseconds; if not, check switch signals |

**Key procedural notes:**

- The throttle stop screw (external stop preventing throttle blade from fully closing) is a **factory setting** and should never need adjustment. If it has been tampered with (yellow paint broken), reset it: unscrew until throttle rests against bore, then turn in ½ turn.
- Source: Honda OBD training manual (Fuelly, GasSavers_TomO, 2008), preludepower forum (motoxxxman, 2009).

### OBD2 (1997–2001) — IACV-Only, Closed-Loop Learning

| Step | Procedure | Notes |
|------|-----------|-------|
| **1** | Warm engine to normal operating temperature | Coolant fan must have cycled at least once |
| **2** | Turn off all electrical accessories | A/C, lights, radio, rear defroster |
| **3** | Connect OBDII scan tool or Honda PGM Tester | Required for ECM reset and idle learn |
| **4** | Perform ECM Reset | Erases adaptive idle learn values; forces closed-loop relearning |
| **5** | Start engine, hold at 3,000 rpm until radiator fan comes on | Warms catalytic converter and stabilizes thermal state |
| **6** | Hold 3,000–4,000 rpm for ≥ 60 seconds | Ensures full thermal equilibrium |
| **7** | Let engine idle | ECM begins adaptive learning immediately |
| **8** | Monitor idle RPM on scan tool | Should stabilize at 700 ± 50 rpm within 2–5 minutes |
| **9** | Apply loads (A/C, full lock steering) and verify response | IACV should compensate within one control cycle |

**Key procedural notes:**

- OBD2 systems do **not** have a mechanical idle air bypass screw for user adjustment. The throttle body has a fixed throttle stop set at the factory.
- The ECM adapts the IACV duty cycle map over time based on actual idle performance. After an ECM reset, the adaptive map is cleared and the ECM relearns from scratch.
- Source: BB6 Helms manual (pages 2-5, 11-37, 11-40), FitFreak.net ECM idle learn procedure.

---

## ECM Idle Learning / Adaptation Logic

### How the ECM Controls Idle

The H-series PGM-FI system is a **speed/density** fuel injection system. It does not measure actual mass airflow (no MAF sensor). Instead, the ECM calculates airflow from:

1. **Engine RPM** (from CKP sensor)
2. **Manifold Absolute Pressure** (MAP sensor)

At idle, the throttle plate is nearly closed and virtually all intake air **bypasses the throttle plate** through the IACV passage. The ECM controls idle speed by modulating the IACV duty cycle.

### Load Event Compensation

When a load event occurs, the ECM applies a coordinated package of adjustments to the IACV, injector pulse width (PW), and ignition timing **before** the idle has a chance to drop:

| Load Event | Inputs Used | ECM Response |
|------------|-------------|-------------|
| **A/C compressor engagement** | A/C switch signal | IACV opens, PW widens, timing advanced |
| **Power steering full lock** | PSP switch signal | IACV opens, PW widens, timing advanced |
| **Brake pedal applied** | Brake light switch signal | IACV opens slightly, PW widens |
| **Clutch depressed (M/T)** | Clutch switch signal | IACV opens, PW widens |
| **High electrical load** | ELD sensor signal | IACV opens, PW widens, timing advanced |
| **A/T gear position change** | Gear position switch | IACV opens for torque converter load |

Source: Honda OBD training manual (Fuelly, section 23.3.5).

### Deceleration Fuel Cut Interaction

A critical idle behavior interaction: the ECM cuts fuel to injectors when it detects:

- Throttle closed **AND**
- RPM above 1,100

If the base idle is set too high (> 1,100 rpm with throttle closed), the ECM interprets steady-state idle as "deceleration" and cycles the injectors on/off every time RPM drops below 1,100. This causes the characteristic "bobbling" or "surging" idle.

**Solution:** Lower the base idle below 1,100 rpm so the ECM recognizes steady idle and keeps injectors firing continuously.

Source: Honda OBD training manual (Fuelly, section 23.7.4).

### Adaptive Learning

The ECM stores an **adaptive idle learn value** in RAM that adjusts the baseline IACV duty cycle based on long-term idle performance. This value:

- Is **erased** when the battery is disconnected or the ECM is reset
- Is **relearned** over approximately 500–1,000 rpm of idle operation after reset
- Compensates for throttle body carbon buildup, IACV wear, and intake manifold gasket variations
- Can be viewed on a Honda PGM Tester or compatible OBDII scan tool as "IAC Command" (in "counts")

Source: Honda OBD training manual (Fuelly, section 23.4).

---

## Fast Idle Thermo Valve (FITV)

### Function

The FITV is a **wax-actuated valve** located on the throttle body that admits extra air during cold starts to raise idle speed. As engine coolant warms, the wax element expands and closes the valve, gradually lowering idle to the normal target.

| State | Coolant Temperature | FITV Position | Idle RPM |
|-------|-------------------|---------------|----------|
| **Cold start** | < 40 °C (104 °F) | Fully open | 1,400 ± 200 rpm |
| **Warming** | 40–80 °C (104–176 °F) | Gradually closing | 1,400 → 700 rpm (ramp) |
| **Normal operating** | > 80 °C (176 °F) | Fully closed | 700 ± 50 rpm |

### Common FITV Failures

| Failure Mode | Symptom | Diagnosis | Remedy |
|--------------|---------|-----------|--------|
| **Stuck open** | High idle even after warm-up (stays at ~1,400 rpm) | Disconnect FITV vacuum line; if idle drops, FITV is stuck open | Replace FITV or repair wax element |
| **Stuck closed** | Low idle when cold, engine stalls before warming up | Cold-start idle below 650 rpm; no rise to fast idle | Replace FITV |
| **Vacuum leak at fitting** | Rough idle, lean condition | Spray carb cleaner around FITV fitting; RPM changes = leak | Tighten fitting or replace O-ring |

**Note:** Some H-series variants (particularly VX-type engines derived from D-series) do **not** have a FITV. In those cases, fast idle is managed entirely by the ECM/IACV.

Source: Honda OBD training manual (Fuelly, section 23.7.3), BB6 Helms manual.

---

## Diagnostic Procedures

### Idle Speed Measurement Procedure

| Step | Action | Details |
|------|--------|---------|
| **1** | Ensure engine is fully warmed up | Coolant fan has cycled; ECT sensor reads 80–100 °C |
| **2** | Verify all accessories are OFF | A/C, lights, radio, rear defroster, power windows (not operating) |
| **3** | Set transmission state | A/T in P or N; M/T in neutral with clutch released |
| **4** | Connect tachometer | Use inductive pickup on #1 spark plug wire or OBDII scan tool |
| **5** | Read idle RPM | Should be 650–750 rpm (OBD1) or 700 ± 50 rpm (OBD2) |
| **6** | Apply A/C load | Idle should rise 50–100 rpm within 1–2 seconds |
| **7** | Turn steering wheel to full lock (both directions) | Idle should remain stable; significant dip indicates PSP switch issue |
| **8** | Check for fluctuations | Idle should be smooth; "bobbling" indicates decel fuel cut cycling |

### IACV Functional Test

| Step | Action | Expected Result |
|------|--------|-----------------|
| **1** | Warm engine, turn off all accessories | Normal operating temperature |
| **2** | Unplug IACV connector | Idle drops to base idle (400–600 rpm) |
| **3** | If idle does NOT drop | IACV may be stuck open, or there is unmetered air (vacuum leak) |
| **4** | Reconnect IACV | Idle should return to target range |
| **5** | Measure IACV winding resistance | ~11.5 Ω; infinite to case |
| **6** | Ground ECM-side wire momentarily | Idle should increase significantly (valve opens fully) |

### ECM Reset Procedure (OBD2)

| Step | Action | Details |
|------|--------|---------|
| **1** | Remove SCS Service Connector if installed | SCS connector shorted = MIL stays ON with no DTCs |
| **2** | Connect OBDII scan tool or Honda PGM Tester | Access ECM functions |
| **3** | Perform ECM Reset | Erases adaptive learn values, DTCs, and readiness monitors |
| **4** | Turn ignition OFF | Complete the reset sequence |
| **5** | Disconnect scan tool | End of procedure |
| **6** | Start engine, let idle | ECM begins relearning; monitor on scan tool |

**Important:** ECM reset erases all adaptive idle learn values. The engine may idle roughly for the first 5–10 minutes while the ECM relearns. This is normal.

Source: BB6 Helms manual (page 11-37).

### Idle-Related DTC Troubleshooting Quick Reference

| DTC | System | First Check | Source Page |
|-----|--------|-------------|-------------|
| **Code 7** | IAC Valve | Connector pins, wiring, IACV resistance | 11-103 |
| **Code 8** | FITV B | Wax element operation, vacuum lines | 11-114 |
| **Code 9** | Idle Speed Adjustment | Base idle setting, throttle stop screw | 11-115 |
| **Code 10** | Throttle Body | Throttle blade closure, cable tension, TB cleaning | 11-140 |
| **Code 6** | IAT Sensor | Thermistor resistance, connector | 11-62 |
| **Code 12** | MAP Sensor | Vacuum hose, electrical connector, output voltage | 11-58 |
| **Code 13** | TP Sensor | Adjustment, output voltage at closed throttle | 11-68 |

Source: BB6 Helms manual, page 11-40 (probable cause list).

---

## Cross-Reference and Conflict Notes

### Conflicts Between Sources

| Topic | Source A | Source B | Resolution |
|-------|----------|----------|------------|
| **Idle speed range** | QWEN.md: 650–750 rpm (general) | BB6 Helms: 700 ± 50 rpm (OBD2 specific) | Both correct. 650–750 is the general H-series range; 700 ± 50 is the OBD2 factory spec. OBD1 likely closer to 650–700. |
| **Base idle (IACV unplugged)** | Fuelly: 400–600 rpm | d-series.org: 400–600 rpm | Consensus across two independent sources. This is the mechanical minimum with bypass screw only. |
| **Throttle stop screw presence** | preludepower: screw exists with slot, painted over | motoxxxman: slot exists under factory paint | Agreed — screw exists, factory paint seals it. Scrape paint to access slot. |
| **Euro-R throttle body idle screw** | blue01 (preludepower): "I don't believe it has a throttle screw" | Tengoku (preludepower): claims screw exists | Disputed. Euro-R TB may differ from standard H22A TB. Consult specific TB part number. |
| **FITV presence** | Honda OBD manual: FITV present on most H-series | d-series.org: "VXs do NOT have FITV" | FITV present on most H22 variants; exceptions may exist for specific market/emissions configurations. |

### Verification Status

- **OBD2 idle spec (700 ± 50 rpm):** Verified against BB6 Helms manual (source 1), ECM data list in Helms (source 2), community forum consensus (source 3)
- **IACV resistance (~11.5 Ω):** Verified against Honda OBD training manual (source 4)
- **IACV test procedures (unplug = base idle, ground = full open):** Verified against Honda OBD training manual (source 4)
- **Base idle setting procedure (OBD1 bypass screw):** Verified against Honda OBD training manual (source 4), preludepower forum (source 5)
- **ECM reset procedure (OBD2):** Verified against BB6 Helms manual (source 1)
- **Decel fuel cut at 1,100 rpm:** Verified against Honda OBD training manual (source 4)
- **Fast idle (1,400 ± 200 rpm):** Verified against BB6 Helms manual (source 1)
- **IACV duty cycle behavior (oscilloscope data):** Verified against Honda OBD training manual (source 4)
- **Idle CO specification (≤ 0.1%):** Verified against BB6 Helms manual (source 1)
- **MAP at idle (21–41 kPa):** Verified against BB6 Helms manual ECM data list (source 2)

---

## Follow-On Research Items

| Item | Priority | Notes |
|------|----------|-------|
| Exact IACV OEM part numbers by generation (OBD1 vs OBD2) | Medium | Part numbers would strengthen the parts reference section |
| IACV duty cycle "counts" range on PGM tester (min/max) | Medium | Would provide quantitative control range data |
| Throttle body bore diameter and throttle blade angle at idle | Low | Engineering detail relevant to airflow calculations |
| Idle speed variation with battery state of charge | Low | Electrical load effect on idle control |
| IACV response time (ms) from load event to compensation | Low | Performance characteristic for tuning reference |
| Comparison of IACV design across Honda engine families (B/D/H/K/F) | Low | Cross-platform compatibility for swaps |

---

## Sources Used

| # | Source | Type | URL | Retrieved |
|---|--------|------|-----|-----------|
| 1 | 1997–2001 Honda Prelude BB6 Helms Manual, Section 2 (Standards) + Section 11 (Fuel & Emissions) | OEM service manual (OCR extracted) | `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` (pages 2-5, 11-37, 11-40) | 2026-05-15 |
| 2 | QWEN.md — Basic Engine Data table | Compiled reference | Local file | 2026-05-15 |
| 3 | preludepower.com — "Throttle Screw H22A idle setting" thread | Community forum | https://www.preludepower.com/threads/throttle-screw-h22a-idle-setting.322765/ | 2026-05-15 |
| 4 | Fuelly Forums — "More than you ever wanted to know about the Honda IACV" (Honda OBD training manual excerpt) | Honda official training material (community-published) | https://www.fuelly.com/forums/f10/more-than-you-ever-wanted-to-know-about-the-honda-iacv-7495.html | 2026-05-15 |
| 5 | d-series.org — "How to fix Honda idle" thread | Community forum | https://www.d-series.org/threads/how-to-fix-honda-idle.270946/ | 2026-05-15 |
| 6 | Honda-Tech forum — "What size hex to adjust IACV H22A4?" thread | Community forum | https://honda-tech.com/forums/honda-prelude-4/what-size-hex-adjust-iacv-h22a4-2047698/ | 2026-05-15 |
| 7 | FitFreak.net — "ECM/PCM Idle Learn Procedure" thread | Community forum | https://www.fitfreak.net/forums/fit-diy-repair-maintenance/7729-ecm-pcm-idle-learn-procedure.html | 2026-05-15 |
| 8 | preludeonline.com — "H22A swap idle problems" thread | Community forum | https://www.preludeonline.com/threads/h22a-swap-idle-problems.225867/ | 2026-05-15 |
| 9 | JustAnswer — "How to Adjust Idle Air Control Valve for Honda?" | Professional Q&A | https://www.justanswer.com/honda/0vpvr-need-locate-idle-air-control-unit.html | 2026-05-15 |
| 10 | QQwen.md — Engine Management & ECU sections (IACV pinout A12) | Compiled reference | Local file | 2026-05-15 |
