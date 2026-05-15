# H22A Redtop — ECU, Chip Tuning & Engine Management

> **Task:** T-128 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

The H22A Redtop used socketed EPROM-based ECUs that were inherently tunable through chip replacement — a design philosophy that made the Redtop one of the most accessible JDM performance engines for aftermarket tuning. The primary ECU part numbers were **P28** (OBD2a, most common) and **P06** (OBD2a, socketed variant). These ECUs featured a 28-pin EPROM socket that allowed enthusiasts to swap in pre-programmed chips with modified fuel and ignition maps, effectively "chipping" the ECU without soldering or hardware modifications. The chipping process involved installing a 28-pin socket, a 74HC373 latch chip (for external memory mode), a power capacitor, and a jumper to enable the new chip. Tuning software like Honda Tuning Suite, Chrome HTS, and standalone solutions like Hondata S300 (with OBD1-to-OBD2 harness adapter) allowed detailed map editing. Typical gains from a base map chip ranged from 9–20 HP. Key tuning parameters included VTEC engagement RPM (adjustable 4,500–6,500 RPM), rev limit (stock ~7,600 RPM, tunable to 8,100+ RPM), idle speed, knock sensor disable, and speed limiter removal.

---

## ECU Part Numbers

| Part Number | OBD Version | Socketed? | Applications | Notes |
|-------------|------------|-----------|-------------|-------|
| P28 | OBD2a | Yes (socketed) | JDM Prelude Type S, SiR S-Spec (1997–2001); Accord Euro R | Most common Redtop ECU; widely available |
| P06 | OBD2a | Yes (socketed) | JDM Prelude Type S, SiR S-Spec | Socketed variant; pinout compatible with P28 |
| P72 | OBD2b | No (soldered) | Later JDM variants | Requires desoldering for chip access |
| P08 | OBD2a | Yes (socketed) | JDM applications | Less common than P28/P06 |
| P30 | OBD2a | Yes (socketed) | USDM/HondaSwap applications | Used in swap applications |
| P61 | OBD2a | Yes (socketed) | Swap applications | Compatible with P28 base maps |
| P91 | OBD2a | Yes (socketed) | Swap applications | Compatible with P28 base maps |

---

## P28 ECU Architecture

### Hardware Layout

| Component | Description | Location on PCB |
|-----------|-------------|-----------------|
| MCU (Microcontroller Unit) | Honda custom 8-bit microcontroller | Center of board |
| EPROM chip | 28-pin programmable ROM (factory map) | Socketed (P28) / Soldered (P72) |
| 74HC373 latch | Enables external memory mode for chip swap | Near EPROM socket |
| Power capacitor (220 µF) | Stabilizes power to EPROM during swap | Near socket |
| Ceramic capacitors (0.1 µF) | Noise filtering | C51, C52 |
| Resistor (1.2 Ω) | External memory mode activation | R54 |
| Jumper J1 | Enables/disables new chip | In series with R1 |
| 4-pin header | Data logging connection | Near edge of board |

### Pinout — Key Pins

| Pin | Color | Function | Tuning Relevance |
|-----|-------|----------|-----------------|
| A1 | Yellow | Injector #4 | Fuel map adjustment |
| A2 | Blue | Injector #3 | Fuel map adjustment |
| A3 | Red | Injector #2 | Fuel map adjustment |
| A4 | Brown | Injector #1 | Fuel map adjustment |
| A8 | Green/Yellow | VTEC Solenoid Valve | VTEC engagement tuning |
| A11 | Yellow/Black | PGM-FI Power | Boost control tap (turbo) |
| A12 | Black/Blue | Idle Air Control Valve | Idle speed tuning |
| A15 | Red/Yellow | Evap Purge Control Solenoid | Emissions (can be disabled) |
| A16 | Green/Orange | Fuel Pump Relay | Fuel system |
| A17 | Pink/Blue | A/C Clutch Relay / Boost control (JDM) | Boost control tap (JDM) |
| A20 | Yellow/Green | ICM (Ignition Control Module) | Ignition timing |
| A25 | White | Intake Control Solenoid Valve | IAB tuning |
| C2 | Blue | CKP Detect | Crank position signal |
| C3 | Green | TDCP Detect | Top dead center signal |
| C4 | Yellow | CKP Detect | Crank position signal |

---

## Chipping Process

### What Is "Chipping"?

"Chipping" refers to the hardware modification of a Honda ECU to accept a removable EPROM chip with a custom fuel/ignition map. The stock EPROM contains Honda's factory calibration; a chipped ECU accepts an aftermarket chip with modified maps.

### Steps to Chip a P28 ECU

1. **Install 28-pin EPROM socket** over the existing EPROM (if not already socketed). Note polarity markings on the board.

2. **Install 74HC373 latch chip** — this enables "external memory mode," allowing the MCU to read from the socketed chip instead of internal ROM.

3. **Install 220 µF power capacitor** — stabilizes power to the EPROM during operation. Note polarity (+ to +).

4. **Install 0.1 µF ceramic capacitors** on C51 and C52 — noise filtering for stable chip operation.

5. **Install 1.2 Ω resistor** on R54 — activates external memory mode.

6. **Install 4-pin header** on J10 — optional data logging connection.

7. **Install 1 µF capacitor** on C60 — additional power stabilization. Note polarity.

8. **Install transistor** on Q101 — required for VTEC solenoid drive circuit. Note beveled edge for polarity.

9. **Install diode** with correct polarity (gray band line on board matches diode band).

10. **Install jumper J1** — this is the on/off switch for the new chip. When J1 is installed, the new chip is active. When J1 is cut (open circuit), the stock internal ROM is active.

### Troubleshooting Common Chipping Issues

| Symptom | Cause | Solution |
|---------|-------|----------|
| Engine runs poorly after chipping | Wrong base map for engine/application | Re-flash chip with correct map; verify injector size matches |
| Limp mode after chip install | Latch chip damaged by static discharge | Replace 74HC373 latch; handle chips with anti-static precautions |
| No start after chipping | J1 jumper not installed / solder bridge | Verify J1 is closed; check for solder bridges on pins |
| Intermittent operation | Loose chip in socket | Reseat EPROM chip; ensure socket clips are secure |
| Rich/lean condition | Chip designed for different injector size | Verify chip matches stock 345 cc injectors (pre-1997) or 290 cc (post-1997) |

---

## Tuning Parameters

### Base Map Chip Modifications

| Parameter | Stock Value | Tuned Range | Notes |
|-----------|------------|-------------|-------|
| VTEC engagement RPM | 5,200–5,500 | 4,500–6,500 | Lower = more mid-range torque; higher = more top-end power |
| Rev limiter | 7,600 RPM (hard cut) | Up to 8,100+ RPM | Limited by mechanical components; 9,100 RPM cited for Type S (disputed) |
| Idle speed | 650–750 RPM | 800–1,000 RPM | Higher idle for aggressive cams |
| Knock sensor | Enabled | Disabled (race use) | Disable only with high-octane race fuel and knock monitoring |
| Speed limiter | Enabled | Disabled | Removes electronic top-speed restriction |
| O2 sensor | Enabled | Disabled (race use) | Requires fuel map adjustment to compensate for closed-loop → open-loop |
| IACV (Idle Air Control) | Enabled | Can be disabled | Disable only if using alternative idle control method |
| Oil pressure switch | Enabled | Can be disabled | Disable for track use if switching to mechanical gauge |

### Fuel & Ignition Maps

The P28 ECU uses separate lookup tables for:

| Map | Purpose | Low Cam (below VTEC) | High Cam (VTEC engaged) |
|-----|---------|---------------------|------------------------|
| Fuel map | Injector pulse width by RPM/load | Primary cruise/acceleration mapping | Richer enrichment under load |
| Ignition timing | Advance angle by RPM/load | Conservative timing for emissions | Aggressive timing for power |
| IACV duty cycle | Idle air control | Maintains target idle RPM | N/A (IACV closed in VTEC) |

**Typical gains from base map chip:** 9–20 HP, depending on supporting modifications and engine condition.

---

## Aftermarket Tuning Solutions

### Hondata S300

| Feature | Detail |
|---------|--------|
| Compatibility | Requires P28 or P06 ECU (socketed) |
| Harness | OBD1-to-OBD2 step-down harness needed for H22A4 swaps |
| Control | Full fuel and ignition map control via laptop |
| VTEC | Adjustable VTEC crossover RPM |
| Boost | Boost control support for turbo applications |
| Logging | Real-time data logging (AFR, knock, MAP, TPS, etc.) |
| Cost | ~$500–800 USD |

### Chrome HTS (Honda Tuning Suite)

| Feature | Detail |
|---------|--------|
| Compatibility | P28, P30, P72, PR4 family ECUs |
| Interface | Windows-based GUI for map editing |
| Programming | Requires USB chip burner (TL866II Plus or equivalent) |
| Features | Fuel/ignition table editing, shift light, launch control, 2-step |
| Cost | Free software; burner ~$30–50 |

### Standalone ECUs

| ECU | Notes |
|-----|-------|
| Megasquirt | Full standalone; requires significant wiring modification |
| Link ECU | Professional-grade; data logging and wideband integration |
| AEM EMS | Standalone with built-in wideband O2 control |
| Neptune RTP | Semi-standalone; retains some OEM sensors |

---

## Flash Procedures

### Burning a Custom Map

1. **Read stock chip** — use TL866II Plus or similar programmer to read and backup the original EPROM content. Save as `.bin` file.

2. **Edit map in software** — open the `.bin` file in Honda Tuning Suite or Chrome HTS. Modify fuel and ignition tables as needed.

3. **Save modified map** — export as `.bin` file with descriptive filename.

4. **Program new chip** — insert blank 28-pin EPROM into programmer socket. Load modified `.bin` file. Program at correct voltage (5V for standard EPROM).

5. **Install chip** — insert programmed chip into ECU socket. Observe polarity (notch alignment).

6. **Close jumper J1** — enables the new chip. Cut J1 to revert to stock map.

### Recommended Map Settings for Stock Redtop

| Parameter | Setting | Rationale |
|-----------|---------|-----------|
| VTEC engagement | 4,800 RPM | Earlier engagement for better street drivability |
| Rev limiter | 8,100 RPM | Modest increase; within safe mechanical limits |
| Idle speed | 850 RPM | Slightly higher for aggressive cam profile |
| Knock sensor | Enabled (street) / Disabled (track) | Street use requires knock protection |
| O2 sensor | Enabled (street) / Disabled (track) | Closed-loop for emissions compliance on street |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | qcwo.com — Troubleshooting P28 Installation | Technical guide | https://qcwo.com/technicaldomain/troubleshooting-a-h22-p28-installation/ | 2026-05-15 | High — detailed technical walkthrough |
| 2 | Honda-Tech — H22A Chipped P28 Thread | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/h22a-chiped-p28-ecu-runs-like-crap-help-3178421/ | 2026-05-15 | Medium — community troubleshooting |
| 3 | Wikipedia — Honda H engine | Encyclopedia | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | High — cross-referenced |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md (local compiled reference) | Compiled reference | `/data/h22/QWEN.md` | N/A | Medium — compiled from 50+ sources |
| 2 | NZHondas.com — H22A ECU Tune | Forum discussion | https://nzhondas.com/topic/183808-h22a-ecu-tune/ | 2026-05-15 | Low — enthusiast discussion |
| 3 | HondaSwap.com — Stock P28 on H22A | Forum thread | https://hondaswap.com/threads/stock-p28-on-h22a.41903/ | 2026-05-15 | Low — community discussion |
| 4 | Hamods.com — H22A Base Map Chip | Vendor listing | https://www.hamods.com/product-page/h22a-97-to-01-prelude-bb6-base-map-tune-chip-obd1-ecu-p28-p72-jdm-p08-p30-p29 | 2026-05-15 | Low — vendor marketing |

---

## Notes

### Key Observations

1. **The P28's socketed EPROM was a tuner's dream.** Unlike modern flash-only ECUs, the P28 allowed physical chip swapping — a simple, reversible modification that could be done with basic soldering skills and a $30 chip programmer.

2. **"Chip" does not mean "ECU swap."** A chipped P28 is still the stock ECU with a modified map. It does not add sensors, change hardware, or modify wiring — it only changes the fuel and ignition lookup tables.

3. **J1 jumper is the critical control point.** The jumper J1 determines whether the ECU reads from the socketed chip (installed) or the internal ROM (cut). This allows instant revert to stock without removing any components.

4. **Injector size matters.** Pre-1997 Redtops used 345 cc injectors; post-1997 models used 290 cc. A chip tuned for the wrong injector size will cause rich or lean conditions. Always verify injector size before selecting a base map.

5. **Knock sensor disable is dangerous on pump gas.** Disabling the knock sensor removes the ECU's ability to pull timing under detonation conditions. Only disable with high-octane race fuel and real-time knock monitoring.

### Gaps Identified

- **Exact EPROM chip part number** used in P28 (manufacturer, density) is not documented in any consulted source.
- **Complete fuel and ignition table values** for the stock P28 map are not publicly available (Honda proprietary).
- **Pinout for P06 vs. P28 differences** — whether these ECUs have identical pinouts or subtle variations is not fully verified.
- **OBD2a vs. OBD2b distinction** — the practical differences between P28 (OBD2a) and P72 (OBD2b) beyond socketed vs. soldered are not clearly documented.

---

## Citations

1. qcwo.com. "Troubleshooting a Honda P28 Installation." *qcwo.com*, February 2023. URL: https://qcwo.com/technicaldomain/troubleshooting-a-h22-p28-installation/. Credibility: High — detailed technical guide.
2. Honda-Tech community. "H22A Chipped P28 ECU Runs Like Crap!! Help." *Honda-Tech Forums*, 2026. URL: https://honda-tech.com/forums/honda-prelude-4/h22a-chiped-p28-ecu-runs-like-crap-help-3178421/. Credibility: Medium — community troubleshooting.
3. Wikipedia contributors. "Honda H engine." *Wikipedia*, The Free Encyclopedia. Retrieved 2026-05-15. URL: https://en.wikipedia.org/wiki/Honda_H_engine. Credibility: High — cross-referenced with QWEN.md.

---

## Appendix

### Chip Programmer Recommendations

| Programmer | Price | Compatibility | Notes |
|------------|-------|--------------|-------|
| TL866II Plus | ~$30–40 | 28-pin DIP EPROM | Most popular budget programmer; supports 27C256, 27C512, 27C1001 |
| CH341A Programmer | ~$10–15 | 28-pin DIP EPROM | Ultra-budget; requires adapter socket for some chips |
| Cobra RTP | ~$200–300 | P28/P06 specific | Dedicated Honda ECU programmer; includes software |
| DS Cobra | ~$150–250 | P28/P06 specific | Alternative dedicated Honda programmer |
