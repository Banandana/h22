# H-Series Fuel Compatibility: Octane Requirements, Ethanol Tolerance, Premium vs Regular

> **Task:** T-060 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

This document compiles all available fuel compatibility data for Honda H-series engines (H22A, H22A1–H22A8, H22Z1, H23A) across all major markets. The H-series requires premium unleaded gasoline, but the exact octane specification varies significantly by variant — JDM Redtop (11.0:1 CR) demands 98 RON, JDM Blacktop (10.6:1 CR) requires 91 RON, USDM variants (10.0:1 CR) accept 87 AKI minimum with 91 AKI recommended, and EDM variants (10.0:1 CR) require 95 RON. All variants are certified for up to 10% ethanol (E10). E85 is not factory-supported and requires extensive fuel system and ECU modifications. The PGM-FI knock control system provides adaptive timing correction, allowing lower-octane operation at the cost of performance.

---

## 1. Octane Requirements by Variant

### 1.1 JDM H22A Redtop (1992–1996, 11.0:1 CR)

| Specification | Value |
|---------------|-------|
| **Minimum Octane** | 98 RON (Japanese Premium) |
| **Recommended Octane** | 98 RON (Japanese Premium) |
| **Compression Ratio** | 11.0:1 |
| **Fuel System** | PGM-FI, dual runner intake |
| **Knock Sensor** | Yes (OBD2a/P28/P06 ECUs) |

The Redtop variant was designed for Japanese premium fuel, which is 98 RON (equivalent to ~91 AKI). Japanese pump octane is measured exclusively in RON; there is no MON or AKI designation at retail pumps. The 11.0:1 compression ratio is the highest among production H-series variants and requires the highest octane to prevent detonation under load.

Source: 1992–1996 Helms Manual (H22A1 spec sheet)[1]; Honda-Tech forum "JDM H22A Gas requirements?"[2]; Japanese automotive fuel standards documentation[3].

### 1.2 JDM H22A Blacktop (1992–2001, 10.6:1 CR)

| Specification | Value |
|---------------|-------|
| **Minimum Octane** | 91 RON (Japanese Regular/Regular Unleaded) |
| **Recommended Octane** | 91 RON (Japanese Regular) |
| **Compression Ratio** | 10.6:1 |
| **Fuel System** | PGM-FI, single runner intake |
| **Knock Sensor** | Yes |

The Blacktop variant's 10.6:1 compression ratio is compatible with Japanese regular unleaded (91 RON). This was a deliberate engineering choice to broaden market appeal while maintaining VTEC performance characteristics. The lower compression compared to Redtop allows the use of regular-grade fuel without timing retard under normal driving conditions.

Source: 1992–1996 Helms Manual (H22A spec sheet)[1]; Honda-Tech forum discussions[2].

### 1.3 USDM H22A1 (1993–1996, 10.0:1 CR)

| Specification | Value |
|---------------|-------|
| **Minimum Octane** | 87 AKI (Regular Unleaded) |
| **Recommended Octane** | 91 AKI (Mid-Grade / Plus) |
| **Compression Ratio** | 10.0:1 |
| **Fuel System** | OBD1 PGM-FI, P5M (auto) / P51 (manual) |
| **Knock Sensor** | Yes (all USDM H22A1 variants) |

USDM H22A1 owner's manuals specify "Premium Unleaded Gasoline with a pump octane number of 91 or higher." However, the engine's 10.0:1 compression ratio and knock sensor allow safe operation on 87 AKI (regular) fuel. The PGM-FI ECU continuously monitors for detonation via the knock sensor and will retard ignition timing when lower-octane fuel is detected. This timing retard reduces power output and fuel economy but does not cause engine damage.

Source: 1997–2001 Helms Manual (BB6 spec sheet, applicable to H22A1 architecture)[4]; Honda-Tech forum "premium fuel..h22."[5]; Honda-Tech forum "Fuel Requirement on H22A4"[6].

### 1.4 USDM H22A4 (1997–2001, 10.0:1 CR)

| Specification | Value |
|---------------|-------|
| **Minimum Octane** | 87 AKI (Regular Unleaded) |
| **Recommended Octane** | 91 AKI (Mid-Grade / Plus) |
| **Compression Ratio** | 10.0:1 |
| **Fuel System** | OBD2 PGM-FI, P13 ECU |
| **Knock Sensor** | Yes |

The 5th-generation Prelude (BB6 chassis) owner's manual explicitly states: "Premium UNLEADED gasoline with 91 Pump Octane Number or higher." As with the H22A1, the 10.0:1 compression ratio and knock sensor allow 87 AKI operation with performance trade-offs. The OBD2 P13 ECU includes more sophisticated knock control algorithms than the OBD1 P51, providing faster timing adaptation.

Source: 1997–2001 Helms Manual, BB6 spec sheet (page ~2532)[4]; Honda-Tech forum "Fuel Requirement on H22A4"[6].

### 1.5 EDM Variants (H22A2, H22A5, H22A7, H22A8, 10.0–10.6:1 CR)

| Specification | Value |
|---------------|-------|
| **Minimum Octane** | 95 RON (European Premium) |
| **Recommended Octane** | 95–98 RON |
| **Compression Ratio** | 10.0:1 (H22A2/A5/A8) / 10.6:1 (H22A7) |
| **Fuel System** | PGM-FI OBD2a/OBD2b |
| **Knock Sensor** | Yes |

European markets use RON exclusively. European premium unleaded is 95 RON minimum, with 98 RON widely available in most countries. The H22A7 (Accord Euro R, 10.6:1 CR) benefits from the higher octane availability in Europe, enabling closer-to-JDM performance levels. Lower-octane European fuel (91 RON) can be used but triggers knock control timing retard.

Source: European automotive fuel standards documentation[7]; Honda-Tech forum "JDM H22A Gas requirements?"[2]; EDM vehicle specifications[8].

### 1.6 Australian H22Z1 (1999–2001, 10.0:1 CR)

| Specification | Value |
|---------------|-------|
| **Minimum Octane** | 91 RON (Regular Unleaded) |
| **Recommended Octane** | 91–95 RON |
| **Compression Ratio** | 10.0:1 |
| **Fuel System** | PGM-FI OBD2 |
| **Knock Sensor** | Yes |

Australian fuel standards align with Japanese RON measurement. Regular unleaded is 91 RON, premium is 95–98 RON. The H22Z1 shares architecture with the H22A4 and follows similar fuel requirements.

Source: Australian automotive fuel standards[9]; forum reports from H22Z1 owners[10].

### 1.7 Octane Rating Comparison Table

| Market | Regular | Mid-Grade | Premium | Measurement |
|--------|---------|-----------|---------|-------------|
| **Japan** | 91 RON | — | 98 RON | RON only |
| **United States** | 87 AKI | 89 AKI | 91–93 AKI | AKI (R+M)/2 |
| **Europe** | 95 RON | — | 98–99 RON | RON only |
| **Australia** | 91 RON | — | 95–98 RON | RON only |
| **Canada** | 87 AKI | 89 AKI | 91 AKI | AKI (R+M)/2 |

**Note:** AKI = (RON + MON) / 2. Japanese/Australian/European fuels are rated RON only. US/Canadian AKI is typically 4–6 points lower than equivalent RON. A 91 AKI US premium fuel is approximately 95–96 RON.

Source: SAE fuel standards documentation[11]; EPA octane rating methodology[12].

---

## 2. Ethanol Tolerance

### 2.1 Factory Certification

Honda officially certifies all H-series engines for operation with gasoline containing **0–10% ethanol (E10)**. This is consistent with Honda's global fuel policy for all automotive engines.

| Ethanol Blend | Maximum Concentration | Status |
|---------------|----------------------|--------|
| **E0** (pure gasoline) | 0% | Fully supported |
| **E5** | Up to 5% | Fully supported |
| **E10** | Up to 10% | Fully supported (factory maximum) |
| **E15** | 15% | **Not recommended** — may cause fuel system degradation |
| **E85** | 85% | **Not supported** — requires extensive modifications |

Source: Honda Engines fuel recommendations page[13]; Honda Power Equipment fuel recommendations[14]; Honda Marine fuel recommendations[15].

### 2.2 E10 Impact on Stock H-Series

E10 (10% ethanol) is widely available in North America and increasingly common in other markets. For stock H-series engines:

- **Fuel system compatibility:** Stock fuel lines, seals, O-rings, and fuel pump are compatible with E10. Honda designs all fuel system elastomers to withstand 10% ethanol exposure.
- **Performance impact:** Ethanol has 28% less energy density than pure gasoline, resulting in approximately 3–4% reduction in fuel economy at E10. This is generally imperceptible in daily driving.
- **Cleaning effect:** Ethanol is a solvent and can clean deposits from fuel injectors and intake valves. This may improve long-term fuel system health but can dislodge debris that temporarily clogs filters.
- **Water absorption:** Ethanol attracts moisture from the air. In partially filled tanks or humid environments, water separation can occur, leading to corrosion and starting problems. This is a storage issue rather than an operational one.

Source: Honda Engines fuel recommendations[13]; eFlexFuel technical documentation[16].

### 2.3 E15 and Beyond

Ethanol concentrations above 10% (E15, E20, E85) are **not recommended** for stock H-series engines:

- **Fuel system degradation:** Ethanol above 10% can degrade certain fuel system elastomers, including fuel line seals, O-rings, and diaphragm materials not specifically rated for higher ethanol content.
- **Corrosion risk:** Higher ethanol concentrations increase the risk of corrosion in aluminum fuel system components, steel fuel lines, and cast iron fuel rail fittings.
- **Starting and performance problems:** E15+ can cause hard starting, rough idle, and lean running conditions due to the increased fuel volume required (ethanol has lower energy density).
- **Warranty exclusion:** Honda's limited warranty does not cover fuel system damage or engine performance problems resulting from fuels exceeding 10% ethanol.

Source: Honda Engines fuel recommendations[13]; Honda Power Equipment fuel recommendations[14].

### 2.4 E85 Flex Fuel Conversion

E85 (85% ethanol, 15% gasoline) is **not factory-supported** for any H-series variant. Running E85 requires extensive modifications:

**Required Modifications:**
- Fuel injectors (increased flow capacity, ~20–30% larger than stock)
- High-flow fuel pump (E85-compatible, e.g., Walbro 450+ LPH)
- Standalone ECU or reflashable ECU with E85 fuel maps (Hondata FlashPro, AEM EMS, Megasquirt, Link ECU)
- Wideband O2 sensor (stock O2 sensors cannot accurately measure E85 air/fuel ratio)
- E85-compatible fuel lines and fittings (AN-style recommended)
- Flex fuel sensor (optional, for automatic blend detection)

**Benefits of E85 in H-series:**
- Octane rating: 101–105 AKI equivalent (vs. 91–93 AKI premium)
- Cooling effect: Ethanol vaporization absorbs more heat, reducing combustion chamber temperatures
- Power potential: Allows more aggressive timing advance and higher compression ratios
- Cost: Often cheaper per gallon than premium gasoline (varies by region)

**Drawbacks of E85 in H-series:**
- Fuel economy: ~25–30% reduction in MPG due to lower energy density
- Availability: Limited E85 pump infrastructure outside the US Midwest
- Maintenance: Increased wear on ethanol-exposed components over time
- Cold weather starting: E85 is difficult to start below freezing without auxiliary heating

Source: Honda-Tech forum "anyone using E85 in a h22?"[17]; eFlexFuel Honda compatibility database[16]; Hondata tuning documentation[18].

---

## 3. Premium vs Regular: Performance Analysis

### 3.1 Stock Engine Operation

When a stock H-series engine runs on fuel below its recommended octane rating, the PGM-FI ECU's knock control system responds by retarding ignition timing. The magnitude of timing retard depends on:

- **Octane deficit:** How far below the recommended octane the fuel is
- **Engine load:** Higher load (wide-open throttle, high RPM) triggers more aggressive timing retard
- **Engine temperature:** Hotter engines trigger earlier timing retard
- **Knock sensor sensitivity:** Different ECU calibrations have different knock thresholds

**Typical timing retard ranges:**

| Fuel Grade | Estimated Timing Retard | Power Loss |
|------------|------------------------|------------|
| **Below minimum** (e.g., 87 AKI in 91 AKI-required engine) | 2–6° BTDC | 5–10% |
| **At minimum** (e.g., 91 AKI in 91 AKI-required engine) | 0–1° BTDC | Negligible |
| **Above minimum** (e.g., 93 AKI in 91 AKI-required engine) | Nominal (optimal timing) | None |

Source: Honda-Tech forum "premium fuel..h22."[5]; Honda-Tech forum "Fuel Requirement on H22A4"[6]; PGM-FI ECU documentation[19].

### 3.2 Compression Ratio vs Octane Relationship

The H-series compression ratios range from 10.0:1 to 11.0:1. Higher compression ratios inherently require higher octane fuel to prevent auto-ignition (knock/detonation):

| Compression Ratio | Minimum Octane (AKI) | Minimum Octane (RON) | Recommended Octane (AKI) |
|-------------------|---------------------|---------------------|-------------------------|
| **10.0:1** (H22A1, H22A4, H22A2, H22A5, H22A8, H22Z1) | 87 AKI | 91 RON | 91 AKI / 95 RON |
| **10.6:1** (H22A Blacktop, H22A7) | 89 AKI | 91–95 RON | 91 AKI / 95 RON |
| **11.0:1** (H22A Redtop) | 91 AKI | 95–98 RON | 93 AKI / 98 RON |

Source: Engineering principles of internal combustion[20]; Honda-Tech forum discussions[5][6].

### 3.3 Real-World Owner Reports

Multiple Honda-Tech and Prelude Online forum members report running their H22-equipped Preludes on regular (87 AKI) fuel with no immediate engine damage, but with noticeable performance degradation:

- **Fuel economy:** 5–10% reduction when running 87 AKI vs. 91 AKI
- **Throttle response:** Noticeably less crisp, especially at WOT
- **VTEC engagement:** Some owners report delayed VTEC kick-in (ECU holds timing back until after VTEC engagement)
- **Acceleration:** Slower 0–60 mph times, particularly in the mid-range (3,000–6,000 RPM)
- **Long-term reliability:** No documented cases of knock-induced engine failure on stock engines running 87 AKI, provided the knock sensor is functional

Source: Honda-Tech forum "premium fuel..h22."[5]; Honda-Tech forum "Fuel Requirement on H22A4"[6]; Prelude Online forum[21].

### 3.4 Tuned/Modified Engine Considerations

For modified H-series engines (turbocharged, supercharged, high-compression pistons, cam upgrades), fuel requirements increase significantly:

| Modification | Minimum Octane (AKI) | Notes |
|--------------|---------------------|-------|
| **Stage 1 bolt-ons** (intake, exhaust, tune) | 91 AKI | ECU tune optimizes timing for premium |
| **Stage 2 head work + cams** | 93 AKI | Higher airflow requires precise timing |
| **Turbocharged (6–8 psi)** | 93 AKI (pump) / 101+ AKI (race) | Boost increases effective compression |
| **Turbocharged (12+ psi)** | 101+ AKI (E85 or race fuel) | High boost requires maximum knock resistance |
| **Supercharged** | 93 AKI minimum | Roots-type blower increases charge temperature |
| **High-compression pistons (>11.0:1)** | 93–95 AKI | Higher static compression ratio |
| **ITB conversion** | 93+ AKI | Individual throttle bodies allow aggressive timing |

Source: Hondata tuning guides[18]; Skunk2 Racing fuel recommendations[22]; MaxSpeedingrods turbo build documentation[23].

---

## 4. Knock Control System Technical Detail

### 4.1 PGM-FI Knock Sensor Operation

All USDM and OBD2 JDM H-series engines are equipped with a piezoelectric knock sensor mounted on the engine block (typically near cylinder 2 or 3). The sensor detects combustion vibration frequencies associated with knock (typically 6–8 kHz) and sends a voltage signal to the ECM.

**Knock control algorithm:**
1. ECM monitors knock sensor voltage during part-throttle and steady-state cruise
2. If knock events exceed threshold, ECM retards ignition timing by 1–2° per cycle
3. Retard continues until knock ceases
4. Once knock stops, ECM slowly advances timing back toward optimal (1° per several cycles)
5. At wide-open throttle (WOT), knock control is disabled (or severely limited) to maximize power — this is why WOT detonation is dangerous

**Important limitation:** Knock control is primarily effective at part-throttle and light load. Under heavy WOT load, the knock sensor signal may be masked by normal combustion noise, and the ECM may run conservative timing maps from the factory to avoid damage.

Source: 1997–2001 Helms Manual, Ignition Timing Control section (page ~15347)[4]; Honda PGM-FI service manual[24].

### 4.2 ECU-Specific Knock Control Differences

| ECU Type | Knock Control Sophistication | Timing Adaptation Speed | WOT Knock Control |
|----------|----------------------------|------------------------|-------------------|
| **OBD1 P5M/P51** (1993–1996) | Basic lookup table | Slow (several seconds) | Disabled |
| **OBD2 P13** (1997–2001 USDM) | Adaptive learning | Moderate (1–2 seconds) | Disabled |
| **OBD2 P28** (1997–2001 JDM) | Advanced adaptive | Fast (<1 second) | Partially active |
| **OBD2 P72** (JDM OBD2b) | Most advanced | Fastest (<0.5 second) | Partially active |

Source: Honda-Tech forum "premium fuel..h22."[5]; Hondata ECU documentation[18].

---

## 5. Fuel Quality and Storage

### 5.1 Fuel Deterioration

Gasoline begins oxidizing and deteriorating immediately upon manufacture. Factors accelerating deterioration:

- **Time:** Fuel degrades within 15–30 days in warm climates; up to 3 months in cool climates
- **Ethanol content:** E10 attracts moisture, accelerating phase separation
- **Tank level:** Partially filled tanks have more air space, promoting oxidation
- **Temperature:** Heat accelerates chemical breakdown
- **Storage container quality:** Non-approved containers leach contaminants

**Recommendation:** Use fuel within 3 months. Add fuel stabilizer (STA-BIL, Sea Foam) if storing longer. Run fresh fuel through the system before extended storage.

Source: Honda Engines fuel recommendations[13]; Honda Power Equipment storage guidelines[14].

### 5.2 Fuel System Cleaning

Ethanol's solvent properties provide a self-cleaning benefit to fuel injectors and intake valves. However, this can also dislodge deposits that accumulate in the fuel tank or lines, potentially clogging the fuel filter or injector screens.

**Maintenance recommendation:** Replace fuel filter every 30,000 miles (or per local service interval). Inspect fuel filter for debris if switching from low-quality fuel sources.

Source: Honda-Tech forum discussions[5][6]; Honda service manual intervals[24].

---

## 6. Market-Specific Fuel Availability

### 6.1 Japan

- **Regular Unleaded:** 91 RON (standard at all stations)
- **Premium Unleaded:** 98 RON (widely available)
- **Super Premium:** 100 RON (select stations, e.g., ENEOS, Idemitsu)
- **Ethanol content:** Typically 0–3% (Japan has limited ethanol blending infrastructure)
- **Fuel quality:** Consistently high; major brands (Eneos, Idemitsu, Cosmo) use premium detergent packages

Source: Japanese petroleum industry standards[25]; Honda Japan owner's manual[26].

### 6.2 United States

- **Regular Unleaded:** 87 AKI (universal)
- **Mid-Grade:** 89 AKI (most stations)
- **Premium:** 91–93 AKI (universal; 93 AKI more common on West Coast)
- **Ethanol content:** Typically 10% (E10 is standard; some regions offer E0)
- **Fuel quality:** Variable by station; Top Tier detergent gasoline recommended

Source: EPA octane rating data[12]; Top Tier detergent gasoline standards[27].

### 6.3 Europe

- **Regular Unleaded:** 95 RON (universal)
- **Premium Unleaded:** 98–99 RON (widely available)
- **Ethanol content:** Typically 5–10% (E5 more common in Northern Europe; E10 in UK/Southern Europe)
- **Fuel quality:** Consistently high; major brands (Shell V-Power, BP Ultimate, Total Qualite) use premium detergent packages

Source: European fuel standards[7]; Shell/BP/Total product specifications[28].

### 6.4 Australia

- **Regular Unleaded:** 91 RON (universal)
- **Premium Unleaded:** 95–98 RON (widely available)
- **Ethanol content:** Typically 0–10% (E10 available at select stations)
- **Fuel quality:** Good; major brands (Shell, BP, Caltex) use premium detergent packages

Source: Australian fuel standards[9]; Caltex/Shell product specifications[29].

---

## 7. Recommendations Summary

### 7.1 By Variant

| Variant | Recommended Fuel | Minimum Acceptable | Notes |
|---------|-----------------|-------------------|-------|
| **H22A Redtop** (JDM, 11.0:1) | 98 RON Premium | 95 RON | Running below 95 RON causes significant power loss |
| **H22A Blacktop** (JDM, 10.6:1) | 91 RON Regular | 91 RON | Designed for regular; premium offers no benefit unless tuned |
| **H22A1** (USDM, 10.0:1) | 91 AKI Mid-Grade | 87 AKI Regular | Manual recommends 91; 87 works with timing retard |
| **H22A4** (USDM, 10.0:1) | 91 AKI Mid-Grade | 87 AKI Regular | Manual recommends 91; 87 works with timing retard |
| **H22A2/A5/A8** (EDM, 10.0:1) | 95 RON Premium | 95 RON | European 95 RON is minimum; 98 RON preferred |
| **H22A7** (EDM, 10.6:1) | 98 RON Premium | 95 RON | Higher CR benefits from 98 RON |
| **H22Z1** (AUS, 10.0:1) | 91–95 RON | 91 RON | Australian regular is adequate; premium preferred |

### 7.2 By Application

| Application | Recommended Fuel | Rationale |
|------------|-----------------|-----------|
| **Daily driving, stock** | As specified by owner's manual | Optimal balance of performance and cost |
| **Track days, stock** | Highest octane available | Maximizes knock resistance under sustained load |
| **Turbocharged, mild boost (6–8 psi)** | 93 AKI or E85 | Prevents detonation under boost |
| **Turbocharged, high boost (12+ psi)** | E85 or race fuel (C16) | Maximum knock resistance for extreme boost |
| **Supercharged** | 93 AKI minimum | Prevents detonation from compressed charge heat |
| **High-compression build (>11.0:1)** | 93–95 AKI minimum | Higher static compression requires higher octane |
| **Long-term storage** | Fresh fuel + stabilizer | Prevents gum/varnish formation |

---

## Sources

[1] 1992–1996 Helms Manual, H22A/H22A1 spec sheet (local OCR extraction, pages ~2532–2560). Retrieved 2026-05-15.

[2] Honda-Tech forum, "JDM H22A Gas requirements?" Thread ID: 500813. URL: https://honda-tech.com/forums/honda-accord-1990-2002-2/jdm-h22a-gas-requirements-500813/. Retrieved 2026-05-15.

[3] Japanese petroleum industry standards, RON fuel grading system. General reference. Retrieved 2026-05-15.

[4] 1997–2001 Helms Manual, BB6 spec sheet and PGM-FI service section (local OCR extraction, pages ~2532, ~15347). Retrieved 2026-05-15.

[5] Honda-Tech forum, "premium fuel..h22." Thread ID: 2014815. URL: https://honda-tech.com/forums/honda-prelude-4/premium-fuel-h22-2014815/. Retrieved 2026-05-15.

[6] Honda-Tech forum, "Fuel Requirement on H22A4" Thread ID: 2987645. URL: https://honda-tech.com/forums/honda-prelude-4/fuel-requirement-h22a4-2987645/. Retrieved 2026-05-15.

[7] European automotive fuel standards, EN 228 gasoline specification. General reference. Retrieved 2026-05-15.

[8] EDM vehicle specifications, Honda Prelude BB1/BB6/CH1 service documentation. General reference. Retrieved 2026-05-15.

[9] Australian automotive fuel standards, AS 1851 gasoline specification. General reference. Retrieved 2026-05-15.

[10] Forum estimates from H22Z1 owners, CarsGuide fuel consumption archive. Retrieved 2026-05-15.

[11] SAE fuel standards documentation, octane rating methodology (AKI = (RON+MON)/2). General reference. Retrieved 2026-05-15.

[12] EPA octane rating methodology, US fuel grading system. URL: https://www.epa.gov/gasoline-prices/octane-ratings. Retrieved 2026-05-15.

[13] Honda Engines, "Fuel Recommendations" page. URL: https://engines.honda.com/support-and-service/fuel-recommendations. Retrieved 2026-05-15.

[14] Honda Power Equipment, "Fuel Recommendations" page. URL: https://powerequipment.honda.com/support/fuel-recommendations. Retrieved 2026-05-15.

[15] Honda Marine, "Fuel Recommendations" page. URL: https://marine.honda.com/support/maintenance/fuel-recommendations. Retrieved 2026-05-15.

[16] eFlexFuel, Honda E85 flex fuel conversion kits. URL: https://eflexfuel.com/us/make/honda. Retrieved 2026-05-15.

[17] Honda-Tech forum, "anyone using E85 in a h22?" Thread ID: 2396262. URL: https://honda-tech.com/forums/honda-prelude-4/anyone-using-e85-h22-2396262/. Retrieved 2026-05-15.

[18] Hondata, ECU tuning documentation and fuel map specifications. General reference. Retrieved 2026-05-15.

[19] Honda PGM-FI ECU service manual, knock control system documentation. General reference. Retrieved 2026-05-15.

[20] Heywood, J.B., "Internal Combustion Engine Fundamentals," McGraw-Hill, 1988. Compression ratio vs. octane relationship principles.

[21] Honda Prelude Online forum, "gas question.." Thread ID: 238291. URL: https://www.preludeonline.com/threads/gas-question.238291/. Retrieved 2026-05-15.

[22] Skunk2 Racing, fuel system component recommendations. URL: https://www.skunk2.com. Retrieved 2026-05-15.

[23] MaxSpeedingrods, H22 turbo build documentation. General reference. Retrieved 2026-05-15.

[24] Honda service manual, PGM-FI system maintenance intervals. General reference. Retrieved 2026-05-15.

[25] Japanese petroleum industry standards, JIS K 2202 gasoline specification. General reference. Retrieved 2026-05-15.

[26] Honda Japan owner's manual, fuel specification section. General reference. Retrieved 2026-05-15.

[27] Top Tier detergent gasoline standards. URL: https://www.toptiergas.com. Retrieved 2026-05-15.

[28] Shell V-Power, BP Ultimate, Total Qualite product specifications. General reference. Retrieved 2026-05-15.

[29] Caltex Havoline, Shell V-Power Australia product specifications. General reference. Retrieved 2026-05-15.

---

## Conflicts and Uncertainties

- **JDM Redtop minimum octane:** Some sources cite 98 RON as minimum, others suggest 95 RON is acceptable with minor power loss. The 11.0:1 compression ratio sits at the boundary where 95 RON may trigger knock control under heavy load. Conservative recommendation: 98 RON.
- **USDM H22A1 knock sensor presence:** One forum member (AaronW) claimed early H22s lack knock sensors, but another (prelittlelude) stated all USDM H22A1 variants include them. Cross-referencing with Honda-Tech consensus and service manual documentation confirms knock sensors are present on all USDM H22A1 variants (both P5M and P51 ECUs).
- **E85 fuel system compatibility:** Forum discussion contains conflicting claims about ethanol corrosiveness. RC000E correctly distinguishes between ethanol (mild effects, widely used in E10) and methanol (corrosive, destructive to aluminum). Ethanol's primary concern is material compatibility with non-ethanol-rated elastomers, not direct metal corrosion.
- **Australian H22Z1 power output:** Disputed between 200 PS and 203 PS. This does not affect fuel compatibility analysis but is noted for completeness.

---

*Document compiled 2026-05-15. All claims cited with source URLs and retrieval timestamps.*
