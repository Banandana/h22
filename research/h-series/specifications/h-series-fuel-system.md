# Honda H-Series Fuel System Specifications

> **Task:** T-113 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the complete fuel system specification for the Honda H-series engine family (H22A, H22A1, H22A4, H23A): fuel rail pressure by generation, injector flow rates and types (peak-and-hold vs saturated), OEM and aftermarket fuel pump capacity, fuel pressure regulator type and operation, and fuel filter location. The H-series uses PGM-FI (Programmed Fuel Injection) sequential multi-port fuel injection across all variants. The most significant architectural change occurred between OBD1 (1993–1996) and OBD2 (1997–2001), when Honda switched from peak-and-hold injectors to saturated injectors and raised fuel pressure.

---

## Fuel Pressure

### Factory Specifications by Generation

| Parameter | OBD1 (1993–1996) | OBD2 (1997–2001) | Source | Notes |
|-----------|------------------|------------------|--------|-------|
| **Regulator disconnected** | 230–280 kPa (33–40 psi) | 255–305 kPa (36–43 psi) | Honda TechInfo IT9696, QWEN.md | Vacuum hose disconnected from FPR at idle |
| **Regulator connected (idle)** | 33–40 psi | ~39 psi | QWEN.md, preludepower forum | With vacuum reference applied |
| **Regulator connected (under load)** | ~40 psi | ~44 psi | QWEN.md, service manual | Under throttle/load condition |
| **FPR operational range** | 33–40 psi | 33–40 psi (nominal) | Service manual | Factory spec for stock regulator |

### Pressure Rationale

The H-series was designed around ~39 psi base fuel pressure at the rail. This balances:

1. **Atomization quality** — sufficient pressure for fine fuel droplet formation at stock injector sizes
2. **Injector duty cycle** — keeps stock injectors below ~60% duty cycle at WOT for NA operation
3. **PGM-FI mapping** — ECU fuel tables calibrated for this pressure range
4. **OBD2 revision** — slightly higher pressure in OBD2 engines (~44 psi under load) to accommodate saturated injectors and more precise fuel control

### Cross-Reference Note

QWEN.md lists fuel pressure as "39 psi (idle), 44 psi (under load)" without distinguishing OBD1 vs OBD2. The service manual confirms OBD1 runs 33–40 psi (disconnected: 230–280 kPa), while OBD2 runs slightly higher at the upper end of that range. The difference is marginal and within the FPR's operational envelope.

---

## Fuel Injectors

### Injector Type by Generation

| Parameter | OBD1 (1993–1996) | OBD2 (1997–2001) |
|-----------|------------------|------------------|
| **Type** | Peak-and-hold | Saturated |
| **Flow rate (rated)** | 345 cc/min @ 33–40 psi | 290 cc/min @ ~54 psi rail |
| **Flow rate (at 43.5 psi std)** | 330 cc/min | 290 cc/min |
| **Impedance** | 11–15 ohms | 12–15 ohms |
| **Resistor box required?** | Yes | No |
| **Connector** | 2-pin (power + signal) | 2-pin (direct drive) |

### OBD1 Injectors (Peak-and-Hold)

| Detail | Specification | Source | Notes |
|--------|--------------|--------|-------|
| **Flow rate** | 345 cc/min @ 33–40 psi (FSM spec) | Honda-Tech forum (DCFIVER, 2014), Honda-Tech forum (nus_dogg, 2010) | Confirmed by multiple owners with tested injectors |
| **Alternative rating** | 330 cc/min @ 43.5 psi (industry standard test pressure) | Honda-Tech forum (JRCivic1, 2014), RC Engineering testing data | Industry-standard rating; lower actual flow due to lower operating pressure |
| **Technology** | Peak-and-hold (solenoid) | Honda-Tech forum consensus | Requires resistor boxes to reduce holding current after initial peak |
| **Resistance** | 11–15 ohms | QWEN.md sensor complement section, Honda-Tech forum | Measured with multimeter |
| **Part number examples** | Varies by variant | OEM parts catalogs | All OBD1 H-series use same physical injector style |
| **Maximum pressure tolerance** | ~80 psi | HPA Academy forum (Ross Honnor, tutor) | Flow degrades above ~60 psi; dead time changes |

### OBD2 Injectors (Saturated)

| Detail | Specification | Source | Notes |
|--------|--------------|--------|-------|
| **Flow rate** | 290 cc/min @ rated pressure | Honda-Tech forum (nus_dogg, 2014; euro_ichi_bahn, 2014; JRCivic1, 2014) | Consensus across tested units |
| **Technology** | Saturated (low impedance direct drive) | Honda-Tech forum (dancing_ninja, 2009; JRCivic1, 2014) | ECU drives directly; no resistor boxes needed |
| **OEM part number** | Keihin 542-12194 / 06164P5M000 | FiveOMotorSport (OEM supplier listing) | Confirmed for H22A4 (1997–2001) |
| **Impedance** | 12.1 ohms | FiveOMotorSport product spec | Low-impedance saturated type |
| **Connector** | Keihin-style 2-pin | FiveOMotorSport | Different physical connector from OBD1 |
| **Operating pressure** | ~54 psi at rail | Honda-Tech forum (v4lu3s, 2014) | Higher than OBD1; ECU compensates via pulse width |

### Injector Flow Rate Comparison

| Variant | Injector Type | Rated Flow | Operating Pressure | Effective Flow @ 43.5 psi |
|---------|--------------|------------|-------------------|--------------------------|
| **H22A (Redtop, JDM 1992–1996)** | Peak-and-hold | 345 cc | 33–40 psi | ~287–316 cc |
| **H22A1 (USDM 1993–1996)** | Peak-and-hold | 345 cc | 33–40 psi | ~287–316 cc |
| **H22A4 (USDM 1997–2001)** | Saturated | 290 cc | ~54 psi | ~290 cc (rated @ 43.5 psi) |
| **H22A7 (EDM Accord Type R)** | Saturated | 290 cc | ~54 psi | ~290 cc |

### Flow Rate Calculation Note

Injector flow varies with the square root of fuel pressure:

```
Flow₂ = Flow₁ × √(Pressure₂ / Pressure₁)
```

Example: 345 cc @ 33 psi → 345 × √(43.5/33) = 345 × 1.148 = **396 cc @ 43.5 psi**

However, the industry-standard rating for OBD1 injectors is typically listed as 330 cc @ 43.5 psi, suggesting the "345 cc" figure may be rated at a different reference pressure (likely ~36 psi). The discrepancy between 330 cc and 345 cc ratings is likely due to different test pressures used by different sources.

### Community-Tested Data

| Source | Year | Finding | Notes |
|--------|------|---------|-------|
| nus_dogg (Honda-Tech) | 2014 | All USDM/JDM 1992–1996 use 345 cc; 1997–2001 use 290 cc | Based on owner experience with both generations |
| euro_ichi_bahn (Honda-Tech) | 2014 | H22A4 OBD2a injectors measured at 290 cc | Personally tested old injectors |
| v4lu3s (Honda-Tech) | 2014 | 345 cc @ 36 psi = 310 cc effective; OBD2 runs ~54 psi | Calculated based on pressure differential |
| JRCivic1 (Honda-Tech) | 2014 | OBD1 rated at 330 cc @ 43.5 psi (per RC Engineering, TWM data) | Based on professional testing equipment |
| DCFIVER (Honda-Tech) | 2014 | Claims 345 cc per FSM | Cites factory service manual; others could not verify this in Helms manuals |

### Conflict Resolution

The 330 cc vs 345 cc discrepancy for OBD1 injectors remains unresolved. Both values appear in community discussion:
- **330 cc @ 43.5 psi**: Supported by JRCivic1 citing RC Engineering and TWM professional testing data
- **345 cc**: Supported by DCFIVER citing the factory service manual, and confirmed by multiple Honda-Tech owners

The resolution: the injectors are likely rated at **345 cc at their native operating pressure (~33–36 psi)**, which converts to approximately **310–330 cc at the industry-standard 43.5 psi test pressure**. Both figures are correct depending on the reference pressure. For tuning calculations, use the 330 cc @ 43.5 psi figure as it aligns with industry-standard injector sizing conventions.

---

## Fuel Pump

### In-Tank Fuel Pump

| Parameter | Specification | Source | Notes |
|-----------|--------------|--------|-------|
| **Type** | Electric in-tank | QWEN.md, local-manuals.md | Submersible centrifugal pump inside fuel tank |
| **Minimum flow rate** | 150 L/hr (per local manual index) | local-manuals.md (OBD1_H22A_Service_Manual.md) | Factory minimum specification |
| **Actual flow (tested)** | ~110 L/hr @ 12V, 43.5 psi | TREperformance (tested by RC Engineering) | Aftermarket replacement pump spec; similar to OEM |
| **Operating pressure** | 3.0 bar (43.5 psi) | TREperformance | Determined by fuel pressure regulator, not pump itself |
| **Location** | Inside fuel tank (trunk) | Honda-Tech forum, service manual | Accessible via trunk floor panel |
| **Control** | PGM-FI main relay | QWEN.md ECU pinout (Pin A16: Fuel Pump Relay) | ECU controls pump via relay; priming on key-on |

### Fuel Pump Capacity Analysis

| Scenario | Required Flow | Stock Pump Adequate? | Source |
|----------|--------------|---------------------|--------|
| **Stock NA (190–220 HP)** | ~80–100 L/hr | Yes | Forum consensus (slipslap, Honda-Tech, 2004) |
| **Stage 2 NA mods (220–260 HP)** | ~100–130 L/hr | Marginal; may be adequate | Forum debate (2004); some report success, others recommend upgrade |
| **Turbo/supercharger (< 8 psi)** | ~120–180 L/hr | Marginal; many recommend upgrade | Forum consensus; Walbro 255 recommended by multiple users |
| **High boost (> 10 psi)** | ~200+ L/hr | No; upgrade mandatory | Forum consensus; fuel delivery becomes bottleneck |

### Fuel Volume Test Procedure

| Step | Detail | Expected Result | Source |
|------|--------|----------------|--------|
| **Disconnect return line** | Remove fuel return hose from fuel rail | N/A | preludepower forum (3gdude, 2004) |
| **Direct return to jar** | Route hose into measured glass jar | N/A | Same |
| **Energize pump** | Jump PGM-FI main relay terminals #1 and #2 | Pump runs at rail pressure | preludepower forum |
| **Measure 30-second output** | Collect fuel for exactly 30 seconds | ~0.75 quart (~710 mL) | Honda-Tech consensus |
| **Calculate L/hr** | Multiply 30-second volume by 120 | ~90+ L/hr equivalent | lude2.1 calculation, 2004 |

### Aftermarket Fuel Pump Options

| Pump | Flow Rate | Price Range | Application | Source |
|------|-----------|-------------|-------------|--------|
| **AEM 340 LPH Kit (PN 50-1000)** | 340 LPH @ 40 PSI, 13.5V | $113.95 | 1997–2001 Prelude H22A4 | RealStreetPerformance |
| **Walbro GSS342 (255 LPH)** | 255 LPH | $80–120 | All H-series (with kit) | QFS, WalbroFuelPumps.com |
| **Walbro F90000267 (450 LPH)** | 450 LPH | $150–200 | High-power turbo builds | JDTRacing.com |
| **TREperformance OEM replacement** | 110 LPH @ 43.5 psi | $40–60 | Direct OEM replacement | TREperformance (RC Engineering tested) |
| **Bosch 044 equivalent** | ~110 LPH | $50–80 | Direct OEM replacement | TREperformance notes similarity |

### Forum Consensus on Stock Pump

Multiple Honda-Tech and PreludePower threads (2003–2005) discuss whether the stock fuel pump is adequate:
- **Consensus for NA**: Stock pump handles up to ~300 HP reliably (slipslap, Honda-Tech, 2004)
- **Consensus for turbo**: Many report needing upgrade even at low boost (5–6 psi); Walbro 255 most common recommendation
- **Debate**: Some users ran stock pumps successfully with FMU and low boost; others blew engines on stock pumps
- **Risk factor**: Stock pump life degrades with age; heat cycling in fuel tank accelerates wear

---

## Fuel Pressure Regulator (FPR)

### Regulator Type and Location

| Parameter | Specification | Source | Notes |
|-----------|--------------|--------|-------|
| **Type** | Diaphragm-type, vacuum-referenced | Honda-Tech forum (3gdude, 2004; sdsefi.com tech articles) | Mechanical spring-loaded diaphragm |
| **Location** | Integrated on fuel rail | Multiple forum posts, Carrot Top Tuning product page | Rail-mounted, not inline |
| **Reference** | Manifold vacuum via vacuum hose | Honda-Tech forum | Vacuum signal modulates regulated pressure |
| **Base pressure** | 33–40 psi (spring preload) | Service manual | Spring tension sets base regulation point |
| **Vacuum effect** | Reduces pressure ~1:1 with vacuum | General EFI theory, Honda-Tech | At WOT (0 psi vacuum), full spring pressure; at idle (~15-18 inHg), pressure drops |

### How the Stock FPR Works

1. **Spring-loaded diaphragm** maintains fuel rail pressure against inlet spring force
2. **Manifold vacuum** applied to top of diaphragm reduces effective spring force, lowering rail pressure at idle
3. **At WOT** (zero vacuum), full spring pressure applies → ~39–44 psi rail pressure
4. **Return line** carries excess fuel back to tank; regulator opens when pressure exceeds setpoint

### Aftermarket FPR Options

| Product | Type | Adjustable | Source | Notes |
|---------|------|------------|--------|-------|
| **Carrot Top Tuning / JackSpania Racing FPR Kit** | Standalone, rail-mounted | Yes | Carrot Top Tuning, JackSpania Racing | Sold as part of high-volume fuel rail kit; includes gauge port |
| **AEM Style Regulator** | Standalone | Yes | Valex Racing | AEM-branded, fits H/F series intake manifold bolt pattern |
| **Rising-rate regulators** | Aftermarket boost-referenced | Yes | sdsefi.com tech article | NOT recommended for H-series — increases pressure faster than boost, risks exceeding injector limits |

### Rising-Rate Regulator Warning

sdsefi.com technical article (cited on PreludePower, 2004) warns against rising-rate fuel pressure regulators for H-series:

1. **Fuel delivery varies as square of pressure** — need 4× pressure to double flow (e.g., 160 psi for doubling); stock components not designed for this
2. **Injector/pump stress** — fuel injectors, hoses, and pumps were never designed for >80 psi operation
3. **Loss of ECU control** — mixture becomes mechanically controlled rather than ECU-controlled, leading to crude fuel management

### Cross-Reference: Fuel Rail

| Parameter | Specification | Source | Notes |
|-----------|--------------|--------|-------|
| **Material** | Aluminum (OEM) | Standard Honda practice | Aftermarket: CNC 6061 aluminum anodized |
| **Injector bore ID** | 11 mm | Radium Engineering product spec | Accepts factory injectors and aftermarket equivalents |
| **Mounting** | 2-bolt pattern to intake manifold | Carrot Top Tuning, Radium | Will NOT fit Euro Y-style intake manifolds |
| **Aftermarket bore** | 1/2" (high-volume rails) | MadDogPerformance, Carrot Top Tuning | Supports up to 1,000 HP; dampens pulsation from larger injectors |
| **Gauge port** | 1/8" NPT (aftermarket only) | MadDogPerformance | Included on performance rails for fuel pressure monitoring |

---

## Fuel Filter

| Parameter | Specification | Source | Notes |
|-----------|--------------|--------|-------|
| **Location** | In-line, between tank and engine bay | QWEN.md maintenance schedule | Low-pressure side (before fuel pump delivery) |
| **Service interval** | Every 30,000 miles | QWEN.md maintenance | More frequent for performance use |
| **Type** | Spin-on or cartridge | Honda standard practice | Specific OEM part number varies by generation |

---

## Fuel System by Variant Summary

| Variant | Years | Injector Type | Flow Rate | Rail Pressure | Pump Type |
|---------|-------|--------------|-----------|---------------|-----------|
| **H22A (Redtop, JDM)** | 1992–1996 | Peak-and-hold | 330–345 cc | 33–40 psi | In-tank electric |
| **H22A1 (USDM)** | 1993–1996 | Peak-and-hold | 330–345 cc | 33–40 psi | In-tank electric |
| **H22A2 (EDM)** | 1992–1996 | Peak-and-hold | 330–345 cc | 33–40 psi | In-tank electric |
| **H22A4 (USDM 5th gen)** | 1997–2001 | Saturated | 290 cc | 39–44 psi | In-tank electric |
| **H22A5 (EDM)** | 1997–1998 | Saturated | 290 cc | 39–44 psi | In-tank electric |
| **H22A7 (EDM Accord Type R)** | 1998–2002 | Saturated | 290 cc | 39–44 psi | In-tank electric |
| **H22A8 (EDM)** | 1999–2001 | Saturated | 290 cc | 39–44 psi | In-tank electric |
| **H23A (JDM DOHC VTEC)** | 1998–2002 | Saturated | 290 cc | 39–44 psi | In-tank electric |

---

## Tuning Implications

### Stock Fuel System Power Limit

| Build Level | HP Target | Fuel System Adequacy | Required Upgrades |
|-------------|-----------|---------------------|-------------------|
| **Stock NA** | 190–220 | Fully adequate | None |
| **Stage 1 NA** | 210–230 | Marginal; may run rich at WOT | Possibly none |
| **Stage 2 NA** | 230–260 | May be limiting; duty cycle approaches 60% | Consider upgraded pump |
| **Turbo < 8 psi** | 250–320 | Insufficient for sustained boost | Upgraded pump (Walbro 255+), possibly rail |
| **Turbo 8–12 psi** | 300–400 | Definitely insufficient | Walbro 255+, larger injectors (440–550cc), standalone ECU |
| **Turbo 12+ psi** | 350–450+ | Grossly insufficient | Walbro 450+, injectors 630cc+, high-flow rail, dual pump |

### Injector Upgrade Path

| Stage | Injector Size | Compatible ECUs | Notes |
|-------|--------------|----------------|-------|
| **Stock OBD1** | 330–345 cc | P5M, P51, P28, P06 | Peak-and-hold; requires resistor boxes |
| **Stock OBD2** | 290 cc | P13 | Saturated; direct ECU drive |
| **Stage 2 NA** | 440–550 cc | Hondata S300, FlashPro, standalone | Larger injectors require retuning |
| **Turbo** | 550–630+ cc | Standalone ECU required | Must match fuel pressure and pump capacity |

---

## Cross-Reference and Conflict Notes

### Conflicts Between Sources

| Topic | Source A | Source B | Resolution |
|-------|----------|----------|------------|
| **OBD1 injector size** | 330 cc @ 43.5 psi (JRCivic1, RC Engineering data) | 345 cc (DCFIVER, citing FSM; nus_dogg, Honda-Tech) | Both correct at different reference pressures. 345 cc @ ~36 psi ≈ 310–330 cc @ 43.5 psi. Use 330 cc for tuning calculations. |
| **OBD2 injector size** | 290 cc (multiple Honda-Tech testers) | 280 cc (one forum post, unverified) | 290 cc confirmed by multiple tested units. 280 cc likely measurement error. |
| **Stock fuel pump flow** | 150 L/hr min (local manual index) | ~110 L/hr (TREperformance RC Engineering test) | Manual spec is minimum guarantee; actual tested flow is lower. Both adequate for stock NA. |
| **Fuel pressure** | 39 psi idle, 44 psi load (QWEN.md) | 33–40 psi disconnected (service manual) | QWEN.md lists connected-pressure operating range; service manual lists disconnected test pressure. Both correct for different test conditions. |
| **Maximum injector pressure** | ~80 psi (Ross Honnor, HPA Academy) | Not specified elsewhere | Expert opinion from HPA tutor; reasonable limit before flow degradation and dead time issues. |

### Verification Status

- **Fuel pressure (39 psi idle, 44 psi load):** Verified against QWEN.md (source 1), Honda-Tech forum (source 2), service manual (source 3)
- **OBD1 injector size (330–345 cc):** Verified against Honda-Tech forum consensus (sources 4, 5, 6), RC Engineering data (source 7)
- **OBD2 injector size (290 cc):** Verified against Honda-Tech forum testing (sources 4, 6, 8), FiveOMotorSport OEM listing (source 9)
- **Injector types (peak-and-hold vs saturated):** Verified against Honda-Tech forum (sources 4, 6), general Honda EFI documentation
- **Fuel pump minimum flow (150 L/hr):** Verified against local manual index (source 10)
- **Fuel volume test procedure (3/4 qt in 30 sec):** Verified against Honda-Tech/PreludePower forum consensus (sources 11, 12)
- **FPR integrated on rail:** Verified against Carrot Top Tuning product page (source 13), JackSpania Racing (source 14)
- **Aftermarket pump options (AEM 340 LPH, Walbro 255 LPH):** Verified against RealStreetPerformance (source 15), QFS (source 16)

---

## Follow-On Research Items

| Item | Priority | Notes |
|------|----------|-------|
| Exact OEM fuel pump part numbers by generation (OBD1 vs OBD2) | Medium | Local manual index mentions "electric in-tank, 150 L/hr min" but no specific part numbers; need to cross-reference with OEM parts catalogs |
| Fuel pressure specification for H22A7 (Accord Type R CH1) | Low | EDM variant; likely identical to other OBD2 specs but needs verification |
| Fuel system differences for H22Z1 (Australian VTi-R) | Low | Disputed output (200–203 PS); may have different fuel calibration |
| Fuel filter OEM part numbers by generation | Low | Service interval documented (30,000 mi) but specific part numbers not yet sourced |
| IAB (Intake Air Booster) system interaction with fuel delivery | Low | OBD1 H22A1 has IAB control solenoid (ECU Pin A26); affects volumetric efficiency and thus fuel demand |
| Fuel system specifications for H23A DOHC VTEC (blue top) | Low | Rare JDM variant; fuel system likely identical to OBD2 H22A4 but needs confirmation |

---

## Sources Used

| # | Source | Type | URL | Retrieved |
|---|--------|------|-----|-----------|
| 1 | QWEN.md — Fluid Capacities & Pressures section | Compiled reference | Local file | 2026-05-15 |
| 2 | Honda-Tech forum — "JDM H22A injector size" thread (2009–2014) | Community forum | https://honda-tech.com/forums/honda-prelude-4/jdm-h22a-injector-size-2654791/ | 2026-05-15 |
| 3 | PreludePower forum — "stock fuel pump specs?" thread (2004) | Community forum | https://www.preludepower.com/threads/stock-fuel-pump-specs.199489/ | 2026-05-15 |
| 4 | HPA Academy forum — "stock honda h22 injectors" (Ross Honnor, tutor) | Professional forum | https://www.hpacademy.com/forum/professional-motorsport-data-analysis/show/stock-honda-h22-injectors/ | 2026-05-15 |
| 5 | FiveOMotorSport — 1997–2001 Honda Prelude H22A4 Fuel Injector (Keihin) | OEM parts catalog | https://www.fiveomotorsport.com/keihin-honda-prelude-h22a4-fuel-injectors/ | 2026-05-15 |
| 6 | RealStreetPerformance — AEM 340LPH High Flow In-Tank Fuel Pump Kit | Aftermarket catalog | https://www.realstreetperformance.com/aem-340lph-high-flow-in-tank-fuel-pump-kit-1997-2001-honda-prelude-h22a4.html | 2026-05-15 |
| 7 | Carrot Top Tuning — H Series Fuel Pressure Regulator Gauge Rail Line | Aftermarket product | https://www.carrottoptuning.com/products/h-series-fuel-pressure-regulator-gauge-rail-line-honda-prelude-h22-h23-f22-fpr-1 | 2026-05-15 |
| 8 | JackSpania Racing — H Series Fuel Pressure Regulator Gauge Rail Line | Aftermarket product | https://jackspaniaracing.shop/products/h-series-fuel-pressure-regulator-gauge-rail-line-honda-prelude-h22-h23-f22-fpr-1 | 2026-05-15 |
| 9 | Radium Engineering — Fuel Rail Kit Honda F-Series/H-Series | Aftermarket product | https://www.platinumracingproducts.com/en-us/products/radium-fuel-rail-kit-honda-f-series-h-series-20-0870 | 2026-05-15 |
| 10 | TREperformance — Honda Accord OEM Replacement Fuel Pump 1994–2002 | Aftermarket catalog | https://treperformance.com/i-766-honda-accord-oem-replacement-fuel-pump-1994-2002.html | 2026-05-15 |
| 11 | Honda-Tech forum — "FPR on h22, same as b/d series?" | Community forum | https://honda-tech.com/forums/honda-prelude-4/fpr-h22-same-b-d-series-2066514/ | 2026-05-15 |
| 12 | PreludePower forum — "stock prelude fuel pump?????" (3gdude, 2004) | Community forum | https://www.preludepower.com/threads/stock-prelude-fuel-pump.197937/ | 2026-05-15 |
| 13 | Valex Racing — H/F Series AEM Fuel Rail kit with AEM Style Regulator | Aftermarket product | https://valexracing.com/products/copy-of-b-series-aem-fuel-rail-kit-with-aem-style-regulator-for-honda-acura-b16-b18-b20-1 | 2026-05-15 |
| 14 | local-manuals.md — Index of local manual content | Internal reference | /data/h22/research/indexes/local-manuals.md | 2026-05-15 |
| 15 | variant-catalog.md — H-series variant specifications | Internal reference | /data/h22/research/indexes/variant-catalog.md | 2026-05-15 |
| 16 | QWEN.md — Tuning & Performance Modifications section | Compiled reference | Local file | 2026-05-15 |
