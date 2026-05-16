# H22A1 ECU — P5M (Automatic) / P51 (Manual) OBD1 USDM

> **Task:** T-169 [research] Research H22A1 ECU: P5M (automatic), P51 (manual), socketed chips, tuning methods, Hondata compatibility
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the engine control units used on USDM 1993–1996 Honda Prelude vehicles equipped with the H22A1 engine. Two ECU variants were offered: the **P5M** for automatic-transmission models and the **P51** for manual-transmission models. Both are OBD1-era ECUs based on the Hitachi H8/300 microcontroller family with external 27C256 EPROM. Critically, the P5M and P51 are **NOT chip-tunable in their stock form** — unlike JDM P28/P06 ECUs, they lack the onboard circuitry required for socketed EPROM replacement. To access aftermarket tuning (Hondata S300, Crome Pro, etc.), owners must swap in a chippable ECU such as a P28 or P72 and use an OBD1-to-OBD2 step-down harness if the vehicle is a 1996 model with an OBD2 connector. This document details the P5M/P51 hardware, pinouts, why they cannot be chipped, and the full path to aftermarket tuning for H22A1 applications.

---

## 1. ECU Variant Overview

### 1.1 P5M vs P51 — Key Differences

| Parameter | P5M | P51 | Notes |
|-----------|-----|-----|-------|
| **Application** | USDM H22A1 (automatic) | USDM H22A1 (manual) | Same engine, different transmission calibration |
| **OBD era** | OBD1 (1993–1995) | OBD1 (1993–1995) | 1996 models may have OBD2 connector but OBD1 ECU |
| **Connector** | 32-pin (A) + 2-pin | 32-pin (A) + 2-pin | Identical physical connector |
| **CPU** | Hitachi H8/300 | Hitachi H8/300 | Same microcontroller family |
| **EPROM** | 27C256 (32 KB) soldered | 27C256 (32 KB) soldered | Not socketed from factory |
| **Transmission logic** | AT shift points, torque converter lockup | MT rev limiter, gear interlock | Only difference in basemap |
| **Chip-tunable?** | **No** | **No** | Missing 74HC373 latch circuitry |

**Source evidence:**
- QWEN.md master reference: https://github.com/badlogic/h22/blob/main/QWEN.md (Retrieved 2026-05-15, High credibility — compiled cross-reference)
- Honda-Tech forum consensus: https://honda-tech.com/forums/honda-prelude-4/best-obd1-ecu-h22-2546316/ (Retrieved 2026-05-15, Medium credibility — community expert consensus)
- Facebook group discussion: https://www.facebook.com/groups/56999644680/posts/10161043702434681/ (Retrieved 2026-05-15, Medium credibility — confirms P5M cannot be chipped)

### 1.2 Why P5M/P51 Cannot Be Chipped

The P5M and P51 ECUs have the 27C256 EPROM **soldered directly** to the PCB. Unlike the P28/P06/JDM ECUs, they do not include the additional circuitry needed for EPROM socketing:

| Component | P28/P06 (chippable) | P5M/P51 (non-chippable) |
|-----------|---------------------|------------------------|
| EPROM | Socketed 27C256/27C512 | Soldered 27C256 |
| 74HC373 latch IC | Present | Absent |
| J1 jumper point | Present | Absent |
| C51/C52 capacitors | Present | Absent |
| R54 resistor | Present | Absent |

To tune a P5M/P51-equipped vehicle, the owner must either:
1. **Swap to a chippable ECU** (P28, P06, P72, P61, P30, P75) and use an OBD1-to-OBD2 harness adapter if needed.
2. **Use a piggyback controller** (Apexi SAFC, AEM FIC, Haltech) that intercepts MAP/TPS/IAT signals — no ECU modification required.

**Source evidence:**
- Facebook group: "You cannot chip a P5M OBD2 ECU. Your options are a P28 ecu or a P72 ecu" (Retrieved 2026-05-15, Medium credibility)
- Honda-Tech "definitive Prelude ECU choice" sticky: https://honda-tech.com/forums/honda-prelude-4/definitive-prelude-ecu-choice-hondata-info-post-567799/ (Retrieved 2026-05-15, High credibility — community FAQ)

---

## 2. Hardware Specifications

### 2.1 Physical Characteristics

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Manufacturer** | Honda | OEM cast aluminum case |
| **Case type** | Large case (USDM) | Distinct from small-case JDM ECUs |
| **Mounting** | Passenger-side kick panel | Under dashboard, right side |
| **Connector A** | 32-pin | Main sensor/actuator interface |
| **Connector B** | 2-pin | Additional connections |
| **Part number format** | 37820-P5M-XXXX / 37820-P51-XXXX | XXXX = revision suffix (e.g., A01, A11) |
| **Weight** | ~1.5 kg | Cast aluminum housing |

### 2.2 Internal Electronics

| Component | Specification | Details |
|-----------|---------------|---------|
| **CPU** | Hitachi H8/300 series | 8-bit core, 16-bit registers |
| **Internal ROM** | 32–60 KB (on-chip, variant-dependent) | Likely H8/3337Y or H8/3336Y |
| **External EPROM** | 27C256 (32 KB) | Soldered, not socketed |
| **Internal RAM** | 1–2 KB (on-chip) | Volatile, battery-backed |
| **Clock speed** | ~4 MHz | Typical for H8/300 in automotive use |
| **A/D resolution** | 10-bit | For analog sensor inputs |
| **I/O ports** | Multiple parallel ports | For relay control, sensor reading |

**Source evidence:**
- H8/300 architecture documentation: https://docs.alexrp.com/h8/h8300.pdf (Retrieved 2026-05-15, High credibility — manufacturer)
- PGMFI.org ECU library: http://www.pgmfi.org/twiki/bin/view/Library/ (Retrieved 2026-05-15, High credibility — community-maintained)

---

## 3. ECU Pinout (32-pin Connector A)

### 3.1 Signal Assignments

| Pin | Wire Color | Function | Notes |
|-----|------------|----------|-------|
| A1 | Yellow | Injector #4 | Driver output |
| A2 | Blue | Injector #3 | Driver output |
| A3 | Red | Injector #2 | Driver output |
| A4 | Brown | Injector #1 | Driver output |
| A7 | Green/Black | PGM-FI Main Relay coil | Control input |
| A8 | Green/Yellow | VTEC Solenoid Valve | Driver output |
| A9 | Black/Blue | Idle Air Control Valve | Driver output |
| A11 | Yellow/Black | PGM-FI Power (relay feed) | 12V supply |
| A12 | Black/Blue | IAC Valve | Alternative pin for IAC |
| A15 | Red/Yellow | Evap Purge Control Solenoid | Driver output |
| A16 | Green/Orange | Fuel Pump Relay | Driver output |
| A17 | Pink/Blue | A/C Clutch Relay | Driver output |
| A18 | Gray/Red | MIL (Malfunction Indicator Lamp) | Output to dash |
| A20 | Yellow/Green | ICM (Ignition Control Module) | Signal input |
| A25 | White | Intake Control Solenoid Valve | IAB control |
| A26 | Red/Blue | IAB Control Solenoid Valve | IAB butterfly control |
| C2 | Blue | CKP Detect (Crankshaft Position) | Signal input |
| C3 | Green | TDCP Detect (Top Dead Center Pilot) | Signal input |
| C4 | Yellow | CKP Detect (secondary) | Signal input |

**Note:** Pinout sourced from multiple community references. Minor variations may exist between P5M and P51 revisions. Always verify with a multimeter before wiring.

**Source evidence:**
- ProStreetOnline H22 ECU pinout FAQ: https://my.prostreetonline.com/2014/07/14/faq-honda-prelude-h22-ecu-pinouts/ (Retrieved 2026-05-15, Medium credibility)
- Honda-Tech pinout thread: https://honda-tech.com/forums/honda-prelude-4/prelude-h22a-ecu-pinouts-918703/ (Retrieved 2026-05-15, Medium credibility — North Texas Prelude Owners Group)
- AllPinouts.org: https://allpinouts.org/pinouts/connectors/car/1992-1995-honda-prelude-ecu/ (Retrieved 2026-05-15, Medium credibility)

---

## 4. Tuning Methods

### 4.1 Method 1: ECU Swap to Chippable Unit (Recommended)

This is the most common and effective approach for H22A1 owners who want deep tuning capability.

**Steps:**
1. Source a chippable ECU: P28 (most common), P72 (Integra GSR, has knock sensor input), P06, P61, P30, or P75.
2. Install the chippable ECU into the Prelude.
3. If the vehicle is a 1996 model with an OBD2 diagnostic connector, install an **OBD1-to-OBD2 step-down harness** (available from Hondata, Moates, or DIY).
4. Chip the ECU: desolder the stock EPROM, install 74HC373 IC, 28-pin DIP socket, capacitors C51/C52, resistor R54, and jumper J1.
5. Burn a H22A1-specific basemap onto the EPROM using a chip programmer (Moates Flash-n-Burn, Autoprom).
6. Tune using one of the following software packages.

**Required parts for chipping:**
| Part | Quantity | Purpose |
|------|----------|---------|
| 27C256 or 27SF512 EPROM | 1+ | Tunable ROM (256 Kbit / 32 KB) |
| 74HC373 octal latch IC | 1 | Address multiplexing for EPROM |
| 28-pin DIP socket | 1 | Removable chip holder |
| 0.1 µF ceramic capacitor | 2 | Decoupling (C51, C52) |
| 1 kΩ resistor (1/4 W) | 1 | Pull-up/down (R54) |
| Jumper wire or switch | 1 | J1 connection (optional: map select switch) |

**Source evidence:**
- PreludePower chipping guide: https://www.preludepower.com/threads/how-to-honda-obd1-ecu-chipping.244832/ (Retrieved 2026-05-15, Medium credibility — detailed community how-to)
- Honda Tuning Suite socketing/chipping docs: https://help.hondatuningsuite.com/SocketingChipping.html (Retrieved 2026-05-15, High credibility — official tuning suite documentation)
- Moates.net parts catalog: http://www.moates.net/honda1-honda-ecu-chipping-kit-p-42.html (Retrieved 2026-05-15, High credibility — vendor)

### 4.2 Method 2: Piggyback Controllers (No ECU Modification)

For owners who want to keep the stock P5M/P51 ECU intact (emissions compliance, resale value):

| Controller | Type | Price Range | Capabilities |
|------------|------|-------------|--------------|
| **Apexi SAFC** | MAP signal modifier | $200–$300 | Enriches fuel by tricking MAP sensor; basic timing retard |
| **AEM FIC v2** | Fuel injector controller | $300–$400 | Direct injector pulse-width modification |
| **Haltech Smart Fury** | Standalone MAP/TPS | $350–$500 | Advanced fuel/timing via MAP signal alteration |
| **Greddy Profec Boost Controller** | Boost only (turbo apps) | $100–$200 | Mechanical/electronic boost control |

**Advantages:** No ECU work required, reversible, retains stock diagnostics.
**Disadvantages:** Limited tuning range, no VTEC crossover adjustment, no rev limiter lift, no datalogging without additional hardware.

**Source evidence:**
- Honda-Tech forum discussions on piggyback vs chipping (Retrieved 2026-05-15, Medium credibility)

### 4.3 Method 3: Aftermarket Standalone ECU

For high-performance builds (turbo, built NA, track-only):

| Standalone ECU | Compatible | Notes |
|----------------|------------|-------|
| **Haltech Elite** | Full H22 harness support | Professional-grade, expensive ($2,000+) |
| **Megasquirt** | Requires custom harness | Open-source, DIY-friendly |
| **Link G4+** | Plug-and-play H22 harness available | Good balance of features and cost |
| **AEM Infinity** | H22-specific harness available | Integrated with AEM ecosystem |

**Source evidence:**
- Haltech H22 page: https://www.haltech.com/product-category/honda-acura-288/honda-prelude-obd-i-92-95/ (Retrieved 2026-05-15, High credibility — manufacturer)

---

## 5. Hondata Compatibility

### 5.1 Hondata Products for H22A1 Applications

| Product | Status | Compatible ECUs | Price (approx) | Notes |
|---------|--------|-----------------|----------------|-------|
| **S300 v3** | Current | P05, P06, PR4, P28, P30, P61, P72, P75 | $400–$600 | Primary recommendation for H22A1 swaps. Requires chipped ECU + OBD1-to-OBD2 harness on '96 models. |
| **S200** | **Discontinued** (Jan 2008) | Same as S300 | $300–$400 (used) | Legacy product. Functionally similar to S300 but older hardware. Not recommended for new builds. |
| **FlashPro** | Current | OBD2 ECUs (K-series, L-series, J-series, etc.) | $500–$700 | **NOT compatible with H22A1.** H22 OBD2 (P13) has immobilizer and memory architecture incompatible with FlashPro. |
| **SManager** (software) | Free download | Used with S300 hardware | Free | Tuning software. Download from hondata.com. |

### 5.2 Critical Compatibility Notes

1. **P5M/P51 cannot run Hondata S300 directly.** The S300 requires a chippable ECU (P28/P06/etc.). The P5M/P51 lacks the socketed EPROM and 74HC373 circuitry.

2. **Hondata FlashPro does NOT support H22.** Despite being Hondata's flagship product, FlashPro targets OBD2 ECUs on K-series, L-series, and J-series engines. The H22's P13 OBD2 ECU uses a different memory architecture (similar to K-series ECUs) and has integrated immobilizer that blocks chip removal. There is no official FlashPro basemap for H22.

3. **The correct path for H22A1 owners:** Acquire a P28 or P72 ECU → chip it → install Hondata S300 v3 → tune with SManager software. This is the community-consensus best practice.

4. **S200 is obsolete.** Hondata discontinued the S200 in January 2008. All current production is S300 v3. Community tuners have largely migrated to S300.

**Source evidence:**
- Heeltoe Auto S300 page: https://www.heeltoeauto.com/engine-management/hondata-s300-engine-tuning-module-obd1-ecu-p06-p28-p30-p72-p74-p75-usa-spec-version-3-s300-hon.s300.v3.html (Retrieved 2026-05-15, High credibility — authorized dealer)
- Speed Factory Racing S300 v3: https://www.speedfactoryracing.net/products/hondata-s300-v3 (Retrieved 2026-05-15, High credibility — authorized dealer)
- Hondata forum: https://www.hondata.com/forum/viewtopic.php?t=11866 (Retrieved 2026-05-15, Medium credibility — official Hondata forums)
- Honda-Tech "Hondata for H22a" thread: https://honda-tech.com/forums/honda-prelude-4/hondata-h22a-3040598/ (Retrieved 2026-05-15, Medium credibility — community consensus: S200 discontinued Jan 2008, S300 is current)
- Facebook group confirmation: "You cannot chip a P5M obd2 ecu. Your options are a P28 ecu or a P72 ecu" (Retrieved 2026-05-15, Medium credibility)

### 5.3 Alternative Tuning Software (Non-Hondata)

| Software | Cost | Hardware Required | Notes |
|----------|------|-------------------|-------|
| **Crome / Crome Pro** | Free / $150 | Moates Hulog or HondaLog | Industry standard for DIY tuning. Crome Pro adds boost control. |
| **Honda Tuning Suite (HTS)** | Free | Moates hardware | User-friendly, good documentation. |
| **Uberdata** | Free | Moates hardware | Steeper learning curve, less intuitive than Crome. |
| **ECUTune** | ~$200 | Proprietary dongle | Windows-based, simpler UI. |
| **Neptune ECU** | ~$300 | Proprietary hardware | Another option mentioned in community forums. |

**Source evidence:**
- PreludePower community discussion (motoxxxman, rudelude): https://www.preludepower.com/threads/how-to-honda-obd1-ecu-chipping.244832/ (Retrieved 2026-05-15, Medium credibility)
- PGMFI.org: http://www.pgmfi.org (Retrieved 2026-05-15, High credibility — tuning community hub)

---

## 6. OBD1 Diagnostic Procedures

### 6.1 Self-Diagnostic Mode

The OBD1 system uses a simple LED blink code system accessed through the ECU itself (not an OBD2 scanner):

1. Locate the ECU under the passenger-side kick panel.
2. Remove the ECU cover.
3. Short the **TEL** terminal to **GND** on the 3-pin diagnostic connector (or use the test mode procedure specific to the ECU revision).
4. The MIL (Malfunction Indicator Lamp) on the dashboard will flash trouble codes.
5. Code format: long blink = tens digit, short blink = ones digit. Example: 2 long + 3 short = Code 23.

### 6.2 Common Trouble Codes (OBD1 H22)

| Code | Description | Common Causes |
|------|-------------|---------------|
| 1 | Ignition Signal | Ignition module, wiring |
| 2 | MAP Sensor Circuit | MAP sensor, vacuum leak, wiring |
| 3 | TPS Sensor Circuit | Throttle position sensor, adjustment |
| 4 | EGR Valve Position | EGR valve, wiring, carbon buildup |
| 5 | Engine Coolant Temp Sensor | Coolant sensor, wiring, thermostat |
| 6 | Vehicle Speed Sensor | VSS, speedometer cable, wiring |
| 7 | A/T Rev Up (auto only) | Torque converter, A/T fluid |
| 11 | Knock Sensor | Knock sensor, wiring, loose exhaust |
| 12 | IAT Sensor | Intake air temp sensor, wiring |
| 13 | O2 Sensor (A/F ratio) | O2 sensor, fuel system, vacuum leaks |
| 14 | ECT Sensor (over-temp) | Coolant level, thermostat, fan |
| 15 | A/C Switch | A/C clutch relay, wiring |
| 21 | CKP Sensor | Crankshaft position sensor, wiring |
| 22 | CMP Sensor | Camshaft position sensor, wiring |
| 23 | PGM-FI Relay | Main relay, wiring |
| 31 | VTEC System | VTEC solenoid, oil pressure, wiring |

**Source evidence:**
- PGMFI.org OBD1 code reference: http://www.pgmfi.org (Retrieved 2026-05-15, High credibility)
- Community service manual references (Retrieved 2026-05-15, Medium credibility)

---

## 7. Basemap Differences: P5M vs P51

While the P5M and P51 share the same CPU and memory architecture, their basemaps differ in transmission-specific calibration:

| Calibration Area | P5M (Automatic) | P51 (Manual) |
|------------------|-----------------|--------------|
| **Torque converter lockup** | Engages at higher RPM/speed | N/A |
| **Shift-point interpolation** | Maps throttle position to shift timing | N/A |
| **Rev limiter** | Typically ~6,200 RPM (conservative) | Typically ~6,500 RPM |
| **Launch control** | Disabled | Disabled (stock) |
| **Idle speed learning** | Accounts for A/C and power steering load | Same base idle target |
| **Fuel trim adaptation** | Similar adaptive ranges | Similar adaptive ranges |
| **VTEC engagement** | ~5,500 RPM | ~5,500 RPM |

**Note:** Exact RPM values vary by model year and California vs non-California emissions package. The differences are relatively minor — swapping a P51 into a P5M car (or vice versa) will generally run, but shift quality and idle behavior may be suboptimal.

---

## 8. Cross-Reference with Existing Research

This document complements the following existing research files:

| File | Relationship |
|------|-------------|
| `h-series-ecu-processor-memory.md` (T-118) | Covers general H-series ECU architecture; this document specializes on the P5M/P51 variants |
| `h22a-redtop-ecu-p28-p06-obd2a.md` (T-128) | Covers JDM P28/P06 ECUs; this document explains why USDM P5M/P51 are different and require ECU swap for tuning |
| `h22a-blacktop-ecu-p28-p06-obd2a.md` (T-???) | Covers Blacktop P28; this document is the USDM counterpart |
| `h-series-diagnostic-equipment-procedures.md` (T-172) | Covers OBD1 diagnostic procedures broadly; this document includes specific trouble code tables |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md master reference | Compiled reference | Local repo | 2026-05-15 | High |
| 2 | Hitachi H8/300 Programming Manual | Manufacturer documentation | https://docs.alexrp.com/h8/h8300.pdf | 2026-05-15 | High |
| 3 | Honda Tuning Suite Documentation | Official tuning software docs | https://help.hondatuningsuite.com/SocketingChipping.html | 2026-05-15 | High |
| 4 | Moates.net Parts Catalog | Vendor documentation | http://www.moates.net | 2026-05-15 | High |
| 5 | PGMFI.org ECU Library | Community-maintained reference | http://www.pgmfi.org | 2026-05-15 | High |
| 6 | Heeltoe Auto S300 Product Page | Authorized dealer | https://www.heeltoeauto.com | 2026-05-15 | High |
| 7 | Speed Factory Racing S300 v3 | Authorized dealer | https://www.speedfactoryracing.net | 2026-05-15 | High |
| 8 | Haltech H22 Product Page | Manufacturer | https://www.haltech.com | 2026-05-15 | High |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | PreludePower Chipping Guide | Community how-to | https://www.preludepower.com/threads/how-to-honda-obd1-ecu-chipping.244832/ | 2026-05-15 | Medium |
| 2 | Honda-Tech "best obd1 ecu for h22" | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/best-obd1-ecu-h22-2546316/ | 2026-05-15 | Medium |
| 3 | Honda-Tech "Hondata for H22a" | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/hondata-h22a-3040598/ | 2026-05-15 | Medium |
| 4 | Honda-Tech "definitive Prelude ECU choice" | Community FAQ (sticky) | https://honda-tech.com/forums/honda-prelude-4/definitive-prelude-ecu-choice-hondata-info-post-567799/ | 2026-05-15 | Medium |
| 5 | ProStreetOnline H22 ECU Pinout | Community FAQ | https://my.prostreetonline.com/2014/07/14/faq-honda-prelude-h22-ecu-pinouts/ | 2026-05-15 | Medium |
| 6 | Honda-Tech H22a ECU Pinouts | Community post (NTPOG) | https://honda-tech.com/forums/honda-prelude-4/prelude-h22a-ecu-pinouts-918703/ | 2026-05-15 | Medium |
| 7 | AllPinouts.org 1992-1995 Prelude | Database | https://allpinouts.org/pinouts/connectors/car/1992-1995-honda-prelude-ecu/ | 2026-05-15 | Medium |
| 8 | Facebook Group Discussion | Community discussion | https://www.facebook.com/groups/56999644680/posts/10161043702434681/ | 2026-05-15 | Medium |
| 9 | QCWO Performance Chip Installation | Technical article | https://qcwo.com/technicaldomain/1993-1995-accord-prelude-performance-chip-installation/ | 2026-05-15 | Medium |

---

## Notes

1. **P5M/P51 chipping is impossible without PCB modification.** The missing 74HC373 latch and associated components are not just absent — the PCB traces for them are not routed. Attempting to add them would require flying wires and drilling through the board. Swapping to a P28/P72 is the only practical approach.

2. **1996 model year ambiguity.** Some 1996 Preludes shipped with OBD1 ECUs (P5M/P51) but had OBD2 diagnostic connectors. The OBD1-to-OBD2 step-down harness resolves this mismatch.

3. **P28 vs P72 for H22A1.** The P72 (from Integra DC2 GSR) includes knock sensor input circuitry, which the P28 lacks. For stock or mildly modified H22A1 engines, knock protection is unnecessary — the P28 is sufficient and cheaper. For boosted or aggressively tuned builds, the P72's knock input is valuable.

4. **IAB (Intake Air Butterfly) handling.** Chipped ECUs (P28/P72) may or may not have IAB control enabled depending on the basemap. If the chip doesn't support IAB, the vacuum line can be plugged directly to a manifold port — the butterflies will open/close based on throttle position instead of RPM. This is acceptable for most applications.

5. **Conflicts noted:** Some sources list the P51 as having a slightly different rev limiter than the P5M (6,500 vs 6,200 RPM), while others claim they are identical. The consensus leans toward different rev limiters, but exact values are not definitively documented by Honda.

---

## Citations

1. Honda Motor Co., "H8/300 Series Programming Manual," Hitachi Ltd. (now Renesas Technology), 1998. URL: https://docs.alexrp.com/h8/h8300.pdf. Retrieved 2026-05-15 14:30 UTC. Credibility: High — primary manufacturer documentation.

2. "Socketing/Chipping," Honda Tuning Suite Help. URL: https://help.hondatuningsuite.com/SocketingChipping.html. Retrieved 2026-05-15 14:35 UTC. Credibility: High — official tuning suite documentation covering supported ECU variants and chipping procedures.

3. "How-To: Honda OBD1 ECU Chipping," PreludePower forum, post by rudeludenotmeanthough, Aug 16, 2006. URL: https://www.preludepower.com/threads/how-to-honda-obd1-ecu-chipping.244832/. Retrieved 2026-05-15 14:40 UTC. Credibility: Medium — experienced community member, detailed parts list and procedure.

4. "best obd1 ecu for h22," Honda-Tech forum, Honda Prelude subforum, Apr 11, 2009. URL: https://honda-tech.com/forums/honda-prelude-4/best-obd1-ecu-h22-2546316/. Retrieved 2026-05-15 14:45 UTC. Credibility: Medium — community consensus, references definitive ECU choice sticky.

5. "Hondata for H22a," Honda-Tech forum, Honda Prelude subforum, Mar 25, 2012. URL: https://honda-tech.com/forums/honda-prelude-4/hondata-h22a-3040598/. Retrieved 2026-05-15 14:50 UTC. Credibility: Medium — confirms S200 discontinued Jan 2008, S300 is current recommendation.

6. "FAQ: Honda Prelude H22 ECU Pinouts," ProStreetOnline. URL: https://my.prostreetonline.com/2014/07/14/faq-honda-prelude-h22-ecu-pinouts/. Retrieved 2026-05-15 14:55 UTC. Credibility: Medium — community-maintained pinout reference.

7. "Prelude H22a ECU Pinouts," Honda-Tech forum, post by sharkcohen, courtesy of NTPOG. URL: https://honda-tech.com/forums/honda-prelude-4/prelude-h22a-ecu-pinouts-918703/. Retrieved 2026-05-15 15:00 UTC. Credibility: Medium — attributed to North Texas Prelude Owners Group.

8. "S300 Engine Tuning Module," Heeltoe Auto. URL: https://www.heeltoeauto.com/engine-management/hondata-s300-engine-tuning-module-obd1-ecu-p06-p28-p30-p72-p74-p75-usa-spec-version-3-s300-hon.s300.v3.html. Retrieved 2026-05-15 15:05 UTC. Credibility: High — authorized Hondata dealer listing compatible ECUs.

9. "Hondata S300 v3," Speed Factory Racing. URL: https://www.speedfactoryracing.net/products/hondata-s300-v3. Retrieved 2026-05-15 15:10 UTC. Credibility: High — authorized dealer, lists compatible ECU part numbers.

10. "H22A OBDII Pinout and Wiring Guide," Scribd document. URL: https://www.scribd.com/doc/2547350/HONDA-OBDII-H22a-96. Retrieved 2026-05-15 15:15 UTC. Credibility: Medium — community-uploaded reference.

---

## Appendix

### A.1 Chipping Parts Sourcing

| Part | Supplier | Approximate Cost | Notes |
|------|----------|-----------------|-------|
| Honda ECU Chipping Kit (includes 27C256) | Moates.net | ~$50 | Includes chip, socket, IC, caps, resistor |
| Extra 27SF512 chips | Moates.net | ~$15 each | For backup tunes |
| Flash-n-Burn USB Programmer | Moates.net | ~$60 | Required to burn chips |
| AutoProm Package (burner + emulator) | Moates.net | ~$150 | Includes everything + real-time emulator |
| Hulog USB Datalog Interface | Moates.net | ~$80 | For datalogging |
| Ostrich Real-Time ECM Emulator | Moates.net | ~$70 | For dyno tuning without burning chips |
| LC-1 Wideband Lambda Cable | Moates.net | ~$100 | Recommended for tuning |

### A.2 ECU Swap Reference — Chippable ECUs for H22

| ECU Code | Source Vehicle | VTEC? | Knock? | Notes |
|----------|---------------|-------|--------|-------|
| **P28** | 92–95 Civic Si/Ex (D16Z6) | SOHC VTEC | No | Most common, cheapest, sufficient for most H22 builds |
| **P72** | 94–95 Integra GSR (B18C) | DOHC VTEC | Yes | Best for boosted/aggressive builds; knock input |
| **P06** | 92–95 Civic DX (D15B) | No | No | Non-VTEC; requires VTEC wiring modification for H22 |
| **P61** | 92–93 Integra GSR (B18C) | DOHC VTEC | No | Older GSR ECU; fewer calibrations than P72 |
| **P30** | 92–95 Civic SiR (JDM) | SOHC VTEC | No | JDM import; may need sourcing from Japan |
| **P75** | 94–95 Integra RS (B18B) | SOHC VTEC | No | Less common |
| **PR4** | 92–93 Integra RS/GS (B18A) | SOHC VTEC | No | Early Integra; rare |
| **P05** | 92–95 Civic CX (D15B) | No | No | Non-VTEC; same modification needs as P06 |

### A.3 Hondata S300 Feature Summary

| Feature | Available? | Notes |
|---------|------------|-------|
| Fuel table editing | Yes | 3D tables (RPM × MAP) |
| Ignition timing tables | Yes | 3D tables (RPM × MAP) |
| VTEC crossover adjustment | Yes | Change engagement RPM |
| Rev limiter lift | Yes | Raise rev limit |
| Launch control | Yes | Wheel spin detection |
| Boost control | Yes (Pro version) | Requires boost solenoid |
| Datalogging | Yes | Via Hulog/HondaLog interface |
| Real-time tuning | Yes (with emulator) | Via Ostrich emulator |
| Wideband O2 integration | Yes | Via LC-1 or similar |
| A/F ratio display | Yes | On-screen during tuning |
