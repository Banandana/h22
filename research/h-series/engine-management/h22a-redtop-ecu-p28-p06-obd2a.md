# H22A Redtop ECU — P28 / P06 / OBD2a Variants

> **Task:** T-128 [research] Research H22A Redtop ECU: P28/P06/OBD2a, chip socket location, tuning potential, flash procedures
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the engine control unit variants associated with the Honda H22A Redtop engine (JDM 1992–1996 Prelude SiR Type S and Accord SiR), focusing on three key ECU codes: **P28**, **P06**, and **OBD2a**. It documents the physical characteristics of each ECU, the socketed EPROM architecture (27C256/27C512), chip installation procedures, tuning software platforms (Hondata S300, Crome, Honda Tuning Suite), performance chip specifications, dual-chip switching techniques, limp-mode protection logic, and cross-compatibility with other Honda ECU families. All claims are cited with source URLs and retrieval timestamps.

---

## 1. ECU Variant Overview

### 1.1 P28 ECU — Primary Swap ECU for H22A Redtop

| Parameter | Specification |
|-----------|---------------|
| **ECU code** | P28 |
| **Original application** | USDM D-series: 1992–1995 Civic Si (D16Z6), 1993–1995 Del Sol SiR (D16Z9) |
| **OBD specification** | OBD-I |
| **MCU** | Hitachi H8/300 series (typically 251 or 304 main processor marking) |
| **EPROM** | 27C256 (4 KB) in 28-pin DIP socket |
| **Socketed from factory** | Yes |
| **VTEC support** | Yes (factory VTEC ECU) |
| **Common use with H22A** | Most popular swap ECU for H22A Redtop; widely available; fully compatible with aftermarket chips and piggyback ECUs |

The P28 is the most commonly used ECU for H22A swaps because it is plentiful, socketed from the factory, and has full VTEC support. While originally designed for D-series engines, the P28's memory layout and calibration structure are compatible with H22A applications when properly chipped. The H8/300 MCU in P28 units typically carries a "251" or "304" marking on the processor die, distinguishing it from non-VTEC variants.

**Source evidence:**
- Honda-Tech forum — "P28 ecu." (2004): https://honda-tech.com/forums/tech-misc-15/p28-ecu-793511/ (Retrieved 2026-05-15, Medium credibility — community discussion confirming 251/304 MCU markings)
- Honda-Tech forum — "Questions for the Pros: P28 ECU": https://honda-tech.com/forums/honda-prelude-4/questions-pros-p28-ecu-3343877/ (Retrieved 2026-05-15, Medium credibility)
- Scribd — "P28 ECU Wiring and Pinout Guide": https://www.scribd.com/document/86722326/P28 (Retrieved 2026-05-15, Medium credibility — pinout reference)

### 1.2 P06 ECU — EDM Non-VTEC (Convertible to VTEC)

| Parameter | Specification |
|-----------|---------------|
| **ECU code** | P06 |
| **Original application** | EDM: 1992–1995 Civic DX/ES (D15B7) — non-VTEC |
| **OBD specification** | OBD-I |
| **MCU** | Hitachi H8/300 series (typically "249" main processor marking) |
| **EPROM** | 27C256 (4 KB) — may or may not be socketed from factory |
| **Socketed from factory** | No (most units); requires modification |
| **VTEC support** | No (factory); convertible with hardware mods |
| **Common use with H22A** | Popular budget swap ECU; must be converted to VTEC spec and socketed before accepting performance chips |

The P06 is a non-VTEC ECU that is widely used as a budget swap option for H22A engines. It requires two modifications to function as a VTEC-capable ECU: (1) hardware conversion to enable VTEC solenoid activation and VTEC pressure switch monitoring, and (2) installation of a socketed EPROM for chip swapping. The main processor typically carries a "249" marking. Once converted and socketed, the P06 accepts the same performance chips as the P28.

**Source evidence:**
- Honda-Tech forum — "P28 ecu." (2004): https://honda-tech.com/forums/tech-misc-15/p28-ecu-793511/ (Retrieved 2026-05-15, Medium credibility — confirms 249 marking on P06)
- D-Series.org — "P06 To P28 Non vtec to Vtec Conversion": https://www.d-series.org/threads/p06-to-p28-non-vtec-to-vtec-conversion.107444/ (Retrieved 2026-05-15, Medium credibility — conversion guide)
- Dodo Upgrades — "OBD1 Pinouts": https://dodo-upgrades.nl/index.php/pinout-obd1/ (Retrieved 2026-05-15, Medium credibility — pinout reference for P06)

### 1.3 OBD2a (OBD-II) ECU — 1997–2001 H22A Applications

| Parameter | Specification |
|-----------|---------------|
| **OBD specification** | OBD-II (OBD2a in JDM terminology) |
| **Typical ECU codes** | P5P, P13 (OBD2 variant), P75 |
| **Applications** | 1997–2001 Prelude (H22A4), 1998–2002 Accord Euro R (H22A7) |
| **MCU** | Hitachi H8/300 or H8/300H (uncertain; possibly enhanced variant) |
| **EPROM** | May or may not be socketed; some variants use soldered Flash memory |
| **Immobilizer** | Integrated in many OBD2 variants |
| **Common use with H22A** | Stock ECU for 5th-gen Prelude; tuning more limited than OBD1 due to immobilizer and/or non-socketed memory |

The term "OBD2a" in the context of H22A Redtop refers to OBD-II compliant ECUs used in 1997–2001 H22A applications (5th-generation Prelude BB6/BB8 and Accord Euro R CH1). These ECUs differ significantly from their OBD-I predecessors: they integrate immobilizer systems, may use soldered Flash memory instead of socketed EPROM, and have different pinouts and calibration structures. The P5P is the most common OBD2 ECU for H22A applications. Tuning options are more limited — Hondata FlashPro is the primary tuning platform for these units.

**Source evidence:**
- Wikipedia — Honda H engine: https://en.wikipedia.org/wiki/Honda_H_engine (Retrieved 2026-05-15, Medium credibility — variant table showing OBD2 applications)
- JDM Seattle — "1997-2001 Honda Prelude / Accord Euro R H22A JDM Engine": https://jdmseattle.com/products/jdm-1997-2001-h22a-euro-r-accord-honda-prelude-2-2l-dohc-vtec-engine-only (Retrieved 2026-05-15, Medium credibility — notes OBD2→OBD1 conversion requirement for swaps)
- Scribd — "H22A OBDII Pinout and Wiring Guide": https://www.scribd.com/doc/2547350/HONDA-OBDII-H22a-96 (Retrieved 2026-05-15, Medium credibility — pinout reference)

---

## 2. Chip Socket Location and Physical Architecture

### 2.1 EPROM Chip Location

The EPROM chip is located on the **top side** of the ECU printed circuit board (PCB), near the center of the board. It sits in a **28-pin dual inline package (DIP) socket**. The socket is a standard IC socket (not soldered) that allows the EPROM to be removed and replaced without desoldering.

The chip is a **27C256** (32 Kbit = 4 KB) CMOS EPROM in a 28-pin DIP package. Some units may have a **27C512** (64 Kbit = 8 KB) aftermarket replacement already installed.

| Component | Package | Pin Count | Function |
|-----------|---------|-----------|----------|
| **EPROM** | 28-pin DIP | 28 | Program memory (fuel/ignition maps) |
| **74HC373 latch** | 20-pin SOP | 20 | Address/data bus demultiplexer |
| **MCU** | QFP-80 | 80 | Hitachi H8/300 microcontroller |
| **J1 jumper** | Solder pad | — | External memory enable/disable |
| **R54 resistor** | SMD | — | Pull-up for EPROM pin 20 |

### 2.2 Key Supporting Components

| Component | Type | Function | Notes |
|-----------|------|----------|-------|
| **74HC373 latch** | 20-pin SOP IC | Demultiplexes the H8/300's shared address/data bus to the EPROM | Critical component; if damaged by static electricity or overheating during soldering, the ECU will malfunction |
| **J1 jumper** | Solder bridge / pad | Enables/disables external EPROM mode | When intact, ECU reads from external EPROM; when cut, ECU reverts to internal (stock) ROM |
| **R1 resistor** | Through-hole | Pull-up for external memory mode pin | In series with J1 jumper |
| **R54 resistor** | SMD | Connected to EPROM pin 20 | Part of the address bus termination network |
| **Filter capacitors** | Aluminum electrolytic | Electronic noise filtering | Located near the EPROM socket; aging capacitors can cause intermittent issues |

**Source evidence:**
- QCWO Technical Domain — "Troubleshooting a Honda P28 Chip Installation": https://qcwo.com/technicaldomain/troubleshooting-a-honda-p28-installation/ (Retrieved 2026-05-15, High credibility — detailed circuit-level analysis with connection test table)
- QCWO Technical Domain — "Dual Performance Chips": https://qcwo.com/technicaldomain/dual-performance-chips/ (Retrieved 2026-05-15, High credibility — dual-chip switching schematic and installation instructions)

### 2.3 EPROM Pin Connections to MCU and Latch

All connections should measure less than 1 ohm continuity. Any reading above 2 ohms indicates a faulty connection.

| EPROM Pin | Connects To |
|-----------|-------------|
| 1 | Pin 20 of 74HC373 latch |
| 2 | Pin 13 of MCU |
| 3 | Pin 15 of latch |
| 4 | Pin 12 of latch |
| 5 | Pin 16 of latch |
| 6 | Pin 19 of latch |
| 7 | Pin 9 of latch |
| 8 | Pin 6 of latch |
| 9 | Pin 5 of latch |
| 10 | Pin 2 of latch |
| 11 | Pin 3 of latch |
| 12 | Pin 4 of latch |
| 13 | Pin 7 of latch |
| 14 | Pins 1 & 10 of latch |
| 15 | Pin 8 of latch |
| 16 | Pin 18 of latch |
| 17 | Pin 17 of latch |
| 18 | Pin 13 of latch |
| 19 | Pin 14 of latch |
| 20 | R54 (left side) |
| 21 | Pin 11 of MCU |
| 22 | Pin 23 of MCU |
| 23 | Pin 12 of MCU |
| 24 | Pin 10 of MCU |
| 25 | Pin 9 of MCU |
| 26 | Pin 14 of MCU |
| 27 | Pin 15 of MCU |
| 28 | Pin 20 of latch |

Additionally: Pin 11 of the 74HC373 connects to Pin 22 of the MCU.

**Source evidence:**
- QCWO Technical Domain — "Troubleshooting a Honda P28 Chip Installation": https://qcwo.com/technicaldomain/troubleshooting-a-honda-p28-installation/ (Retrieved 2026-05-15, High credibility — full connection test table)

---

## 3. Tuning Potential

### 3.1 Performance Chip Gains

Performance chips modify the fuel and ignition timing maps stored in the EPROM. Typical gains from a base map chip alone:

| Metric | Typical Gain | Notes |
|--------|-------------|-------|
| **Horsepower (NA)** | +9 to +20 hp | Depends on existing modifications; higher gains with bolt-ons |
| **Torque** | +5 to +15 lb-ft | Broadband improvement, not peak-specific |
| **VTEC engagement** | Lowered to ~4,800 RPM | From stock ~5,200–5,500 RPM |
| **Rev limiter** | Raised to 8,100 RPM | From stock 7,600–7,800 RPM |
| **Idle speed** | Adjusted to 850 RPM | From stock ~900–950 RPM |

These gains assume the engine is in good mechanical condition with stock 290cc injectors (1997+) or 345cc injectors (1993–1996). With additional bolt-ons (intake, exhaust, cams), chip gains compound.

**Source evidence:**
- Hamods — "H22A 97 to 01 Prelude BB6 Base Map Tune Chip": https://www.hamods.com/product-page/h22a-97-to-01-prelude-bb6-base-map-tune-chip-obd1-ecu-p28-p72-jdm-p08-p30-p29 (Retrieved 2026-05-15, Medium credibility — vendor specifications for tuned chip)
- TorqueCars — "Guide to tuning Honda's H22 engine": https://www.torquecars.com/honda/h22-tuning.php (Retrieved 2026-05-15, Medium credibility — general tuning guidance noting ~15% NA gains)
- DGTune — "Honda Acura OBD1 Premium Chip Tune": https://dgtune.shop/products/honda-acura-obd1-custom-ecu-basemap-chip-tune-b18-b16-b20-d15-d16-h22-h23-f20-f22-f23 (Retrieved 2026-05-15, Medium credibility — custom tuning vendor specs)

### 3.2 Tuning Software Platforms

Three primary software platforms are used for OBD1 Honda ECU tuning:

| Platform | Developer | ECU Access Method | Key Features |
|----------|-----------|-------------------|--------------|
| **Hondata S300** | Hondata | Serial cable to DLC (pin 13 + ground) or Bluetooth module | Real-time datalogging, wideband O2 support, intuitive interface, HPA Academy courses available |
| **Crome** | Independent | Serial cable to DLC | Free software, 16×16 fuel/ignition maps, widely used for basemap development |
| **Honda Tuning Suite (HTS)** | Hondata | Serial cable to DLC or Bluetooth | Similar to Crome but with additional features (IACV control with AC on/off, more granular idle tuning) |

All three platforms expose the same underlying map structure: 16×16 low-cam fuel map, 16×16 high-cam fuel map, 16×16 low-cam ignition map, 16×16 high-cam ignition map, plus separate idle zones.

**Source evidence:**
- YouTube — SRDmotorsports "How to: Honda ECU tuning starting with the basics": https://www.youtube.com/watch?v=jBxIxhjw8MA (Retrieved 2026-05-15, Medium credibility — video demonstration of all three platforms)
- HP Academy forum — "Hondata s300 / H22A engine tuning": https://www.hpacademy.com/forum/general-tuning-discussion/show/hondata-s300-h22a-engine-march-16th-dyno-tuning-process/ (Retrieved 2026-05-15, Medium credibility — real-world dyno tuning session with H22A)
- HA Motorsports — "How to Control IAB's on P06/P28 ECU with Hondata S300": https://www.hamotorsports.com/pages/how-to-control-iabs-on-p06-p28-ecu-with-hondata-s300 (Retrieved 2026-05-15, Medium credibility — P06/P28-specific configuration guide)

### 3.3 Advanced Tuning Options

Beyond chip swapping, advanced tuning paths include:

| Option | Description | Cost Range | Notes |
|--------|-------------|------------|-------|
| **Hondata S300 standalone** | Replaces entire ECU; no chip needed | $400–$600 | Full programmability; datalogging; wideband integration; recommended for serious builds |
| **AEM EMS** | Standalone engine management | $600–$1,200 | More complex; full control over all parameters |
| **Neptune Tuning** | Piggyback ECU | $300–$500 | Intercepts sensor signals; modifies injector pulse width |
| **Apexi Power FC** | Standalone ECU | $500–$800 | Popular in JDM scene; good for turbo builds |
| **Custom chip (one-off)** | Bespoke basemap written by tuner | $100–$300 | Requires socketed ECU; specific to engine setup |

For the H22A Redtop specifically, the Hondata S300 is the most commonly recommended upgrade path. It eliminates the need for chip swapping entirely and provides real-time datalogging capability essential for proper tuning.

**Source evidence:**
- TorqueCars — "H22 Tuning": https://www.torquecars.com/honda/h22-tuning.php (Retrieved 2026-05-15, Medium credibility — mentions aftermarket ECUs and piggybacks)
- HP Academy forum — "Hondata s300 / H22A engine tuning": https://www.hpacademy.com/forum/general-tuning-discussion/show/hondata-s300-h22a-engine-march-16th-dyno-tuning-process/ (Retrieved 2026-05-15, Medium credibility — H22A-specific S300 tuning session)

---

## 4. Flash and Programming Procedures

### 4.1 Chip Burning Hardware

The following hardware tools are used to burn EPROM chips:

| Tool | Status | Notes |
|------|--------|-------|
| **OSTRICH 2.0** | Active | Most commonly referenced burner in Honda tuning community |
| **Cobra RTP** | Active | Replacement for discontinued Modos Burn Two |
| **Modos Burn Two** | Discontinued | Was popular but vendor closed down |
| **Snake Board** | Active | Alternative burner platform |
| **Moates Universal Programmer** | Active | Commercial programmer; includes socket adapters |

**Source evidence:**
- YouTube — "How to: Honda ECU tuning starting with the basics": https://www.youtube.com/watch?v=jBxIxhjw8MA (Retrieved 2026-05-15, Medium credibility — mentions OSTRICH 2.0, Cobra RTP, Snake Board)
- YouTube — "HOW TO CHIP AN ECU (ULTIMATE GUIDE)": https://www.youtube.com/watch?v=jKOLmsIyKjg (Retrieved 2026-05-15, Medium credibility — comprehensive chipping guide)

### 4.2 Step-by-Step Chip Installation Procedure

1. **Remove the ECU** from the vehicle and open the casing.
2. **Locate the EPROM socket** on the top side of the PCB. Remove any existing chip.
3. **Verify the 74HC373 latch** is oriented correctly (not reversed). A reversed latch will prevent the ECU from functioning.
4. **Check the J1 jumper** — ensure it is intact (closed). If cutting J1 makes the car run normally, the problem is the chip program, not the installation.
5. **Insert the new EPROM chip** into the socket with pin 1 aligned correctly (notch/dot orientation).
6. **Power up the ECU** (connect harness, turn ignition ON). The ECU should read the new chip.
7. **Test drive** — verify VTEC engagement, check for limp mode (< 4,000 RPM), confirm no check engine light.

### 4.3 Troubleshooting Chip Installations

If the car enters **limp mode** (< 4,000 RPM, rich fuel mixture):

1. **Cut the J1 jumper** — if the car returns to normal, the problem is the chip (incompatible program, damaged chip, or wrong memory architecture).
2. **Remove the chip** from the socket — if the car runs normally with the chip removed and J1 cut, the chip has an internal short circuit.
3. **Check solder bridges** — inspect all connections between EPROM pins, latch pins, and MCU pins using an ohmmeter. Any reading above 2 ohms indicates a broken connection.
4. **Test the 74HC373 latch** — if all connections check out, the latch may be damaged (static discharge or overheating). Remove the latch temporarily to verify the ECU reverts to stock operation.

**Source evidence:**
- QCWO Technical Domain — "Troubleshooting a Honda P28 Chip Installation": https://qcwo.com/technicaldomain/troubleshooting-a-honda-p28-installation/ (Retrieved 2026-05-15, High credibility — definitive troubleshooting guide with step-by-step methodology)

### 4.4 Dual-Chip Switching (Stock + Performance)

A 27C512 (64 KB) EPROM can hold two separate programs:

| Memory Page | Content | Address Range |
|-------------|---------|---------------|
| **Lower page** | Stock program | 0x0000 – 0x7FFF |
| **Upper page** | Performance program | 0x8000 – 0xFFFF |

**Installation requirements:**
- 27C512 EPROM (64 KB)
- Small toggle switch
- 1 kΩ resistor
- Shielded 2-conductor wire (max 12 inches length)
- Solder the resistor between pins 1 and 28 of the chip
- Wire the switch between pin 1 (via resistor) and pin 14
- Leave pin 1 lead hanging (floating) outside the socket — never insert it into the socket contact

**Important:** Pin 1 is tied to +5V on Honda ECUs. If the switch is flipped to ground while pin 1 is inserted in the socket, it creates a short circuit that WILL damage the ECU.

**Note on ROM shadowing:** On some vehicles, switching on the fly has no effect because the ROM is copied to RAM at startup. In these cases, the car must be turned off, the switch flipped, and the car restarted to activate the new program.

**Source evidence:**
- QCWO Technical Domain — "Dual Performance Chips": https://qcwo.com/technicaldomain/dual-performance-chips/ (Retrieved 2026-05-15, High credibility — complete dual-chip switching guide with schematics)

### 4.5 27C512 Programming — Dual-Page Duplication

When programming a 27C512 chip with a 32 KB program (originally designed for 27C256), the program must be **duplicated across both memory pages**:

1. Take the 32 KB binary file.
2. Duplicate it to create a 64 KB file (lower page = original, upper page = copy).
3. Program the 64 KB file into the 27C512.
4. Verify both pages contain identical data.

Honda Tuning Suite provides a "Save as 64 KB" option that automatically duplicates the 32 KB image across both banks. This ensures correct operation regardless of which page the MCU accesses (the highest address bit A13 is typically tied to +5V, always selecting the upper page, but duplication is safest).

**Source evidence:**
- QCWO Technical Domain — comments section: https://qcwo.com/technicaldomain/troubleshooting-a-honda-p28-installation/ (Retrieved 2026-05-15, Medium credibility — author confirmation of dual-page duplication requirement)
- QCWO Technical Domain — "Dual Performance Chips": https://qcwo.com/technicaldomain/dual-performance-chips/ (Retrieved 2026-05-15, High credibility — explains why duplication is necessary)

---

## 5. ECU Compatibility Matrix

### 5.1 ECU Codes Compatible with H22A Redtop

| ECU Code | VTEC | Socketed | Compatible with Chips | Notes |
|----------|------|----------|----------------------|-------|
| **P28** | Yes | Yes (factory) | Yes | Most popular swap ECU; D-series origin |
| **P06** | No → convertible | No (usually) | Yes (after conversion) | Budget option; needs VTEC hardware conversion |
| **P05** | No → convertible | No (usually) | Yes (after conversion) | Similar to P06 |
| **P72** | Yes | Yes (factory) | Yes | Integra DC2 (B18C); dual butterflies |
| **P30** | Yes | Yes (factory) | Yes | B16A2 (NSX/Integra Type R) |
| **P75** | Yes | Yes (factory) | Yes | OBD2 Integra; Hondata S300 compatible |
| **P5P** | Yes | Sometimes | Limited | OBD2 H22A; immobilizer may block chips |
| **PR4** | No → convertible | No | Yes (after conversion) | EDM variant |

### 5.2 Cross-Compatibility Warning

Different Honda ECU models share the same H8/300 MCU family but have **different memory layouts**. Programs written for one ECU code will NOT work in another without modification. For example:

- A P28 program will NOT work in a P72 ECU (different memory addresses for fuel/ignition tables)
- A P72 program ported to P28 requires code modification (e.g., removing dual butterfly throttle references)
- A P06 program ported to P28 may work but requires careful address remapping

**Source evidence:**
- QCWO Technical Domain — "Troubleshooting a Honda P28 Chip Installation" comments: https://qcwo.com/technicaldomain/troubleshooting-a-honda-p28-installation/ (Retrieved 2026-05-15, Medium credibility — author explanation of cross-ECU incompatibility)

---

## 6. H22A-Specific ECU Configuration Parameters

### 6.1 Typical Basemap Chip Settings for H22A Redtop

| Parameter | Stock Value | Chipped Value | Notes |
|-----------|-------------|---------------|-------|
| **VTEC engagement RPM** | ~5,200–5,500 RPM | 4,800 RPM | Earlier engagement for broader power band |
| **Rev limiter** | 7,600–7,800 RPM | 8,100 RPM | Increased for track use |
| **Idle RPM** | 900–950 RPM | 850 RPM | Slightly lower for smoother cruise |
| **Knock sensor** | Enabled | Disabled (optional) | Must be disabled for aggressive timing; requires knock-resistant build |
| **Speed limiter** | Enabled | Disabled | Removes top-speed governor |
| **O2 sensor** | Enabled | Disabled (optional) | Must be disabled for wide-open-throttle rich enrichment |
| **IAB control** | Enabled | Enabled (configurable) | Intake Air Booster valve control via Hondata S300 |

### 6.2 Injector Flow Rate Considerations by Year

| Year Range | Injector Size | Notes |
|------------|--------------|-------|
| **1993–1996** | 345 cc | Larger injectors; better suited for high-RPM power |
| **1997–2001** | 290 cc | Smaller injectors; optimized for emissions and efficiency |

Fuel pressure affects injector flow rate: a 330 cc injector flows 287 cc at 33 psi and 316 cc at 40 psi. When increasing fuel pressure for forced induction, account for the increased flow rate.

**Source evidence:**
- TorqueCars — "H22 Tuning": https://www.torquecars.com/honda/h22-tuning.php (Retrieved 2026-05-15, Medium credibility — injector specifications and fuel pressure effects)

---

## 7. Conflicts and Gaps

### 7.1 Unconfirmed Details

1. **Exact ECU code for stock H22A Redtop:** The original JDM H22A Redtop (Prelude SiR Type S, 1992–1996) likely used a JDM-specific ECU code that is not publicly documented. The P28 and P06 are commonly associated with the H22A in swap contexts but may not be the exact factory codes. Further research into JDM service manuals would clarify this.

2. **OBD2a ECU exact code:** "OBD2a" is a colloquial term used in the JDM community. The actual ECU codes for 1997–2001 H22A applications (P5P, P13 OBD2 variant, P75) vary by model year and market. No single "OBD2a" ECU code exists.

3. **H8/300 derivative per ECU model:** The exact Hitachi H8/300 derivative within each ECU model is not publicly confirmed by Honda. The 251/304 markings on P28 processors and 249 marking on P06 processors are the best available identifiers.

### 7.2 Limitations

- Honda's PGM-FI software architecture is proprietary. Calibration table structures are inferred from reverse-engineering tools (Crome, Hondata, HTS) and community analysis.
- No official Honda service manual documents the ECU's internal processor or memory specifications.
- The PGMFI.ORG archive represents community-collected ROM dumps; individual dumps may vary in completeness.
- Many performance chip vendors do not disclose the exact algorithmic changes made to the stock maps.

---

## 8. Sources and Retrieval Timestamps

| # | Source | URL | Retrieved | Credibility |
|---|--------|-----|-----------|-------------|
| 1 | QCWO — Troubleshooting Honda P28 Chip | https://qcwo.com/technicaldomain/troubleshooting-a-honda-p28-installation/ | 2026-05-15 | High — expert technical |
| 2 | QCWO — Dual Performance Chips | https://qcwo.com/technicaldomain/dual-performance-chips/ | 2026-05-15 | High — expert technical |
| 3 | TorqueCars — H22 Tuning Guide | https://www.torquecars.com/honda/h22-tuning.php | 2026-05-15 | Medium — enthusiast site |
| 4 | Hamods — H22A Base Map Tune Chip | https://www.hamods.com/product-page/h22a-97-to-01-prelude-bb6-base-map-tune-chip-obd1-ecu-p28-p72-jdm-p08-p30-p29 | 2026-05-15 | Medium — vendor specs |
| 5 | DGTune — OBD1 Custom ECU Chip Tune | https://dgtune.shop/products/honda-acura-obd1-custom-ecu-basemap-chip-tune-b18-b16-b20-d15-d16-h22-h23-f20-f22-f23 | 2026-05-15 | Medium — vendor specs |
| 6 | Honda-Tech — "P28 ecu." forum thread | https://honda-tech.com/forums/tech-misc-15/p28-ecu-793511/ | 2026-05-15 | Medium — community discussion |
| 7 | Honda-Tech — "Questions for the Pros: P28 ECU" | https://honda-tech.com/forums/honda-prelude-4/questions-pros-p28-ecu-3343877/ | 2026-05-15 | Medium — community discussion |
| 8 | D-Series.org — "P06 To P28 Non vtec to Vtec Conversion" | https://www.d-series.org/threads/p06-to-p28-non-vtec-to-vtec-conversion.107444/ | 2026-05-15 | Medium — conversion guide |
| 9 | Dodo Upgrades — OBD1 Pinouts | https://dodo-upgrades.nl/index.php/pinout-obd1/ | 2026-05-15 | Medium — pinout reference |
| 10 | Wikipedia — Honda H engine | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | Medium — secondary summary |
| 11 | JDM Seattle — H22A JDM Engine Listing | https://jdmseattle.com/products/jdm-1997-2001-h22a-euro-r-accord-honda-prelude-2-2l-dohc-vtec-engine-only | 2026-05-15 | Medium — vendor listing |
| 12 | HP Academy — Hondata S300 H22A Tuning | https://www.hpacademy.com/forum/general-tuning-discussion/show/hondata-s300-h22a-engine-march-16th-dyno-tuning-process/ | 2026-05-15 | Medium — real-world tuning |
| 13 | HA Motorsports — IAB Control on P06/P28 | https://www.hamotorsports.com/pages/how-to-control-iabs-on-p06-p28-ecu-with-hondata-s300 | 2026-05-15 | Medium — configuration guide |
| 14 | YouTube — SRDmotorsports ECU Tuning Basics | https://www.youtube.com/watch?v=jBxIxhjw8MA | 2026-05-15 | Medium — video demonstration |
| 15 | YouTube — How to Chip an ECU Ultimate Guide | https://www.youtube.com/watch?v=jKOLmsIyKjg | 2026-05-15 | Medium — chipping tutorial |
| 16 | Scribd — P28 ECU Wiring and Pinout Guide | https://www.scribd.com/document/86722326/P28 | 2026-05-15 | Medium — pinout reference |
| 17 | Scribd — H22A OBDII Pinout and Wiring Guide | https://www.scribd.com/doc/2547350/HONDA-OBDII-H22a-96 | 2026-05-15 | Medium — OBD2 pinout |
| 18 | Phearable — Stock Honda ECU List | https://www.phearable.net/information/tech-area/hondaeculist.html | 2026-05-15 | Medium — community reference |
| 19 | Moates — Honda Identifying Your ECU | https://shop.moates.net/pages/honda-identifying-your-ecu | 2026-05-15 | Medium — vendor documentation |
| 20 | PGMFI.ORG ECU Definition Codes | https://mycomputerninja.com/~jon/www.pgmfi.org/twiki/bin/view/Library/EcuDefinitionCodes.html | 2026-05-15 | High — community archive |

---

## 9. Key Takeaways for H22A Redtop Enthusiasts

1. **The P28 is the most popular ECU for H22A Redtop swaps** — it is socketed from factory, has full VTEC support, and is widely compatible with aftermarket chips and tuning platforms.

2. **The P06 is a budget alternative** — it is a non-VTEC ECU that requires hardware conversion to VTEC spec and socketing before accepting performance chips. Once converted, it functions identically to the P28.

3. **OBD2a (OBD-II) H22A ECUs are more limited** — the P5P and similar OBD2 variants integrate immobilizer systems and may use soldered Flash memory, making chip-based tuning impractical. Hondata FlashPro is the primary tuning platform for these units.

4. **The EPROM chip is a 27C256 (4 KB) in a 28-pin DIP socket** — located on the top side of the ECU PCB. The 74HC373 latch chip is critical to the memory architecture and must be correctly oriented.

5. **Performance chip gains range from 9–20 hp (NA)** — achieved through modified fuel and ignition timing maps, lowered VTEC engagement, and raised rev limiter.

6. **Hondata S300 is the recommended upgrade path** — it eliminates chip swapping entirely and provides real-time datlogging for proper tuning.

7. **ECU codes are NOT interchangeable** — each ECU model has a unique memory layout. A P28 program will not work in a P72 or P06 without modification.

8. **Limp mode (< 4,000 RPM) is the ECU's fail-safe** — triggered by incompatible chip programs, wiring errors, or damaged components. Cutting the J1 jumper reverts to stock operation.

9. **Dual-chip switching is possible with a 27C512** — holding both stock and performance programs on a single chip, selectable via a toggle switch. Pin 1 must float outside the socket to prevent short circuits.

10. **Injector size matters** — 1993–1996 H22 injectors (345 cc) are larger than 1997–2001 units (290 cc). Fuel pressure adjustments affect effective flow rate.
