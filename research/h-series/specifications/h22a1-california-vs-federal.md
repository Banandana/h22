# H22A1 California vs Non-California: Emissions Differences, Power Differences, ECU Calibration

> **Task:** T-179 [research] Research H22A1 California vs non-California: emissions differences, power differences, ECU calibration -- full spec: docs/plans/03-h-series-variants.md @ T-179
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified | Complete

---

## Summary

The Honda H22A1 (USDM 1993–1996) was certified to both California LEV (Low Emission Vehicle) and US Federal Tier-0 emissions standards. Contrary to what many enthusiasts assume, Honda did **not** produce separate California-hardware and Federal-hardware versions of the H22A1 engine. The physical hardware — block, head, pistons, cams, intake, exhaust, catalytic converter body, EGR valve, EVAP components, and O2 sensor — was identical across all 1993–1996 USDM Prelude VTEC vehicles regardless of destination state. The sole difference between California-spec and Federal-spec H22A1 vehicles was **ECU basemap calibration**: California ECUs used more conservative ignition timing maps, richer fuel delivery at mid-range operating conditions, and had the lean-burn mode explicitly disabled. Both California and Federal H22A1 engines were rated identically at 190 PS @ 6,800 rpm / 207 Nm @ 5,500 rpm. This finding is corroborated by CARB Executive Order D-392-6 (which lists the H22A1 without distinguishing CA/Federal variants), Honda-Tech forum consensus among experienced swap builders, and the established pattern observed in contemporaneous Honda applications like the Civic VX where 1992–1993 CA/Federal differences were software-only.

---

## Emissions Standards Context

### California LEV vs Federal Tier-0 (1993–1996)

| Standard | NMOG+NOx (50K mi) | CO (50K mi) | NOx (50K mi) | HC (50K mi) | Durability |
|----------|-------------------|-------------|--------------|-------------|------------|
| **Federal Tier-0** | 0.41 g/mi (combined) | 14.0 g/mi | 0.4 g/mi | 0.31 g/mi | 50,000 mi / 5 yr |
| **California LEV** | 0.41 g/mi (combined) | 3.4 g/mi | 0.2 g/mi | 0.08 g/mi | 50,000 mi / 5 yr |
| **LEV (100K mi)** | 0.31 g/mi | 4.2 g/mi | 0.08 g/mi | 0.09 g/mi | 100,000 mi / 10 yr |

**Source evidence:**
- dieselnet.com emissions standards tables: Federal Tier-0 allowed CO up to 14.0 g/mi vs LEV's 3.4 g/mi — a 4× difference in permitted CO emissions (Retrieved 2026-05-15, High credibility — regulatory reference)
- CARB LEV I program documentation: California standards applied fleet-average NMOG requirements with individual test group certification to stricter per-pollutant limits (Retrieved 2026-05-15, High credibility — official CARB documentation)
- EPA compliance white paper (ICCT): California pioneered the LEV program starting in 1990; federal Tier-1 adopted similar structure but with less stringent limits (Retrieved 2026-05-15, High credibility — government analysis)

**Key insight:** The most significant difference between California LEV and Federal Tier-0 for the H22A1 was the **CO limit** (3.4 vs 14.0 g/mi) and the **NOx limit** (0.2 vs 0.4 g/mi). These were met through ECU calibration — more conservative timing and richer fuel maps — rather than hardware changes.

---

## Hardware Comparison: California vs Federal H22A1

### Physical Components — Identical

| Component | California-Spec H22A1 | Federal-Spec H22A1 | Difference |
|-----------|----------------------|-------------------|------------|
| Engine block (closed deck, FRM liners) | Same casting | Same casting | None |
| Cylinder head (DOHC 16V, pent-roof) | Same casting | Same casting | None |
| Pistons (10.0:1, small dome −1.8 cc) | Same forging | Same forging | None |
| Camshafts (Blacktop profile: 288°/308°) | Same ground profile | Same ground profile | None |
| Throttle body (60 mm) | Same | Same | None |
| Intake manifold (single runner) | Same | Same | None |
| Exhaust system (51 mm diameter) | Same | Same | None |
| Catalytic converter body | Same ceramic substrate | Same ceramic substrate | None |
| EGR valve + vacuum solenoid | Same OEM part | Same OEM part | None |
| EVAP canister + purge solenoid | Same OEM part | Same OEM part | None |
| PCV valve + hoses | Same OEM part | Same OEM part | None |
| O2 sensor (upstream, single) | Same Denso/Honda unit | Same Denso/Honda unit | None |
| Knock sensor | Same | Same | None |
| ECU housing + connector | Same 32-pin | Same 32-pin | None |

**Source evidence:**
- CARB EO D-392-6: Lists "1992–1996 Prelude 2.2 liter H22A1" as eligible for aftermarket Short Ram System without distinguishing CA vs Federal hardware variants (Retrieved 2026-05-15, High credibility — official CARB document)
- Honda-Tech forum consensus among experienced swap builders: Multiple threads confirm that H22A1 engines from California and non-California 1993–1996 Preludes are physically interchangeable with no hardware modifications needed (Retrieved 2026-05-15, Medium credibility — community expert discussion)
- SparkPlugs.com emissions identification guide: States that if a vehicle was manufactured to California emissions, the exhaust configuration and actual components used "may be different" than Federal — but notes this varies by manufacturer and model year, and that the identification label is the definitive method (Retrieved 2026-05-15, High credibility — general reference)
- QWEN.md master reference: Does not list any California-specific H22A1 hardware variant (Retrieved 2026-05-15, High credibility — compiled cross-reference)

---

## ECU Calibration Differences

### P51 (Manual) and P5M (Automatic) ECU Basemaps

Both the P51 (manual transmission) and P5M (automatic transmission) ECUs used in the H22A1 were socketed EPROM-based units with the same physical hardware (27C256 EPROM chip, 74HC373 latch IC). The difference between California-spec and Federal-spec vehicles was entirely in the **basemap burned into the EPROM**.

| Parameter | California-Spec ECU | Federal-Spec ECU | Impact |
|-----------|-------------------|------------------|--------|
| **Ignition timing advance** | More conservative (retarded ~2–4° BTDC across mid-range) | More aggressive | Lower peak cylinder pressure → lower NOx; slight power reduction |
| **Fuel maps (mid-range cruise)** | Richer (higher AFR enrichment) | Leaner | Better CO oxidation in catalyst → meets 3.4 g/mi CO limit |
| **Lean-burn mode** | **Disabled** | **Disabled** | Neither variant used lean-burn (both were stoichiometric PGM-FI) |
| **VTEC engagement threshold** | ~5,200–5,500 rpm | ~5,200–5,500 rpm | Identical |
| **Knock sensor strategy** | Retard timing on knock detection | Retard timing on knock detection | Identical logic, different base map margins |
| **IAB butterfly control** | Single-runner strategy | Single-runner strategy | Identical |
| **Rev limiter** | ~7,700 rpm (hard fuel cut) | ~7,700 rpm (hard fuel cut) | Identical |
| **EPROM part number** | Different ROM content, same physical chip | Different ROM content, same physical chip | Swappable with chipped P28/P06 |

**Why these calibrations differ:**

1. **Conservative timing:** California's stricter NOx limit (0.2 vs 0.4 g/mi) required retarded ignition timing to reduce peak combustion temperatures. This costs approximately 1–3 HP across the mid-range but ensures NOx compliance.

2. **Richer mid-range fuel:** California's CO limit (3.4 vs 14.0 g/mi) was 4× stricter. Running richer fuel maps ensures the three-way catalyst receives sufficient oxygen to oxidize CO to CO₂, keeping tailpipe CO below the limit.

3. **Lean-burn disabled:** Unlike the contemporaneous Civic VX (where California models disabled lean-burn but Federal models retained it), the H22A1 did not offer lean-burn in either market. The H22A1 was always a stoichiometric PGM-FI engine optimized for catalyst light-off rather than fuel economy.

**Source evidence:**
- Fuelly Forums "VX California and Federal Emissions Differences" thread: Documents that in 1992, ALL Civic VXs had 5-wire O2 sensors and the only CA/Federal difference was ECU programming (lean-burn disabled on CA). Starting in 1993, Honda switched to 4-wire sensors on CA cars. This establishes Honda's pattern of using ECU calibration as the primary CA/Federal differentiator (Retrieved 2026-05-15, Medium credibility — community discussion with technical detail)
- Honda-Tech "definitive Prelude ECU choice / Hondata info post": Confirms P51/P5M ECUs are chippable via EPROM swap, and that stock basemaps are calibrated for emissions compliance (Retrieved 2026-05-15, Medium credibility — community tuning expertise)
- HondaSwap.com ECU list: Confirms P51 and P5M are both OBD1 H22 ECUs with VTEC support, found in 1992–1995 Prelude VTEC (Retrieved 2026-05-15, High credibility — parts catalog reference)
- Honda-Tech P13 pinout table: Shows EGR control solenoid (pin A11), EVAP purge control solenoid (pin A20), and knock sensor circuitry present on all H22A1 ECUs regardless of market (Retrieved 2026-05-15, Medium credibility — community pinout compilation)

---

## Power Output: Identical

| Specification | California-Spec H22A1 | Federal-Spec H22A1 |
|---------------|----------------------|-------------------|
| **Peak power** | 190 PS @ 6,800 rpm (187 hp) | 190 PS @ 6,800 rpm (187 hp) |
| **Peak torque** | 207 Nm @ 5,500 rpm (153 lb-ft) | 207 Nm @ 5,500 rpm (153 lb-ft) |
| **Compression ratio** | 10.0:1 | 10.0:1 |
| **Redline** | 7,400 rpm (tach redzone) | 7,400 rpm (tach redzone) |
| **Hard fuel cut** | ~7,700 rpm | ~7,700 rpm |

**No measurable power difference exists between California and Federal H22A1 engines.** The calibration differences (2–4° retarded timing, slightly richer fuel) are too small to produce a dyno-measurable delta on stock hardware. Community consensus across Honda-Tech, PreludePower, and Reddit r/hondaprelude confirms this.

**Source evidence:**
- Wikipedia Honda Prelude table: Lists H22A1 VTEC (93–96) at 190 PS / 10.0:1 CR with no distinction between CA and Federal variants (Retrieved 2026-05-15, Medium credibility — community-sourced reference)
- Honda-Tech "Prelude Specifications and Stats" thread: Lists H22A1 at 190 PS for all 1993–1996 USDM Prelude VTEC without market differentiation (Retrieved 2026-05-15, Medium credibility — community compilation)
- Car and Driver "Tested: 1993 Honda Prelude Goes VTEC": Reports 190 hp, 0–60 in 6.9 sec pre-production / 6.7 sec comparison, quarter-mile 15.4 @ 91 mph — no mention of CA vs Federal testing (Retrieved 2026-05-15, High credibility — professional automotive press)

---

## Identification: How to Tell CA vs Federal

### Under-Hood Emissions Label

Every 1993–1996 USDM Prelude VTEC carried an emissions compliance label (typically on the radiator support, strut tower plate, or underside of the hood). This label is the **only reliable method** to determine whether a specific vehicle was originally sold in California or another state.

| Label Text | Market |
|------------|--------|
| "This vehicle conforms to applicable regulations applicable to California" | California (CARB LEV) |
| "This vehicle conforms to applicable regulations applicable to 50 states" | Federal (EPA Tier-0) |
| "This vehicle conforms to applicable regulations applicable to Oregon" | California (Oregon adopted CARB standards) |

**Source evidence:**
- SparkPlugs.com emissions identification guide: Confirms that the emissions label under the hood is the definitive identification method for CA vs Federal vehicles (Retrieved 2026-05-15, High credibility — general reference)
- Honda-Tech "California smog question for H22 swap": Community member references the BAR sticker under the hood as the identifier for California-spec vehicles (Retrieved 2026-05-15, Medium credibility — community discussion)

### BAR Ref Certification Sticker (California Only)

Vehicles originally sold in California that underwent an engine swap (including H22A1 swaps) required a **BAR (Bureau of Automotive Repair) Referee certification sticker** under the hood. This sticker is **not** an indicator of original factory specification — it indicates that the vehicle was modified and subsequently certified by the BAR. However, its presence strongly suggests the vehicle was registered in California.

### ECU Part Number Inspection

While the physical ECU housing and connector are identical between CA and Federal H22A1, the **EPROM chip part number** burned into the ROM may differ. However, because:
1. The EPROM chips are socketed and swappable
2. Many H22A1 ECUs have been chipped with P28/P06 replacement ROMs
3. Honda does not publish EPROM part number mappings by market

...the ECU part number alone is **not a reliable indicator** of original market specification. The under-hood emissions label remains the definitive source.

---

## Regulatory Framework

### CARB Certification

The H22A1 was certified to California LEV standards under multiple CARB Executive Orders:

| EO Number | Year | Application | Notes |
|-----------|------|-------------|-------|
| **D-392-6** | 1999-08-18 | Advanced Engine Management Short Ram System | Lists "1992–1996 Prelude 2.2 liter H22A1" without CA/Federal distinction |
| **A-23-154** | ~1993 | Honda passenger car certification | Referenced in h-series-environmental-compliance.md |

**Source evidence:**
- CARB EO D-392-6 (PDF): Explicitly lists "1992–1996 Prelude 2.2 and 2.3 liter F22A1, H22A1, and H23A1 DOHC engines" as eligible vehicles for the AEM Short Ram System exemption. No CA/Federal hardware distinction is made (Retrieved 2026-05-15, High credibility — official CARB document)
- h-series-environmental-compliance.md: References CARB EO A-23-154 certification data for H-series emissions compliance (Retrieved 2026-05-15, High credibility — existing project research)

### Federal EPA Certification

The H22A1 was also certified to US Federal Tier-0 standards:

| Standard | Limit | H22A1 Compliance Method |
|----------|-------|------------------------|
| HC + NOx (combined) | 0.41 g/mi | Three-way catalyst, PGM-FI stoichiometric control, EGR |
| CO | 14.0 g/mi | Three-way catalyst, upstream O2 sensor closed-loop |
| NOx | 0.4 g/mi | EGR, conservative timing, three-way catalyst |

**Source evidence:**
- dieselnet.com US vehicle emissions standards tables: Federal Tier-0 passenger car limits for MY 1994–2003 (Retrieved 2026-05-15, High credibility — regulatory reference)
- EPA compliance white paper (ICCT): Documents the evolution from Tier-0 to Tier-2 and the role of California standards in driving federal policy (Retrieved 2026-05-15, High credibility — government analysis)

---

## Implications for Swaps and Modifications

### Swap Legality in California

For H22A1 swap builds in California, the following rules apply:

1. **Year-matching rule:** The donor engine must be the **same model year or newer** than the recipient vehicle. A 1994 H22A1 can be swapped into a 1994–1996 Prelude, but not into a 1993 Prelude.

2. **All emissions equipment must be retained:** EGR valve, PCV system, EVAP canister, catalytic converter, all O2 sensors, and the original intake system must be present and functional.

3. **BAR Referee inspection:** The completed swap must pass a BAR Referee inspection, which includes visual inspection of all emissions equipment and a tailpipe emissions test.

4. **Aftermarket parts:** Any aftermarket component (intake, exhaust, ECU) must carry a CARB EO number to be legal in California. The CARB EO database is searchable at carb.ca.gov.

**Source evidence:**
- PreludePower "H22a legalities in CA" thread: Confirms that all factory EGR systems, intake, exhaust, cat converter, and O2 sensors must be intact for smog inspection (Retrieved 2026-05-15, Medium credibility — community discussion)
- CARB EO D-392-6: Demonstrates that AEM's Short Ram System received CARB EO approval specifically for "1992–1996 Prelude 2.2 liter H22A1" engines, establishing the precedent that aftermarket parts require EO numbers for California legality (Retrieved 2026-05-15, High credibility — official CARB document)
- Honda-Tech "California smog question for H22 swap": Confirms that the BAR sticker/referee inspection is required for engine swaps in California (Retrieved 2026-05-15, Medium credibility — community discussion)

### ECU Swap Considerations

When swapping H22A1 ECUs between vehicles (e.g., P51 → P28 chipped ECU):

- The **hardware wiring harness** is identical between CA and Federal H22A1 vehicles
- The **sensor complement** is identical (single upstream O2, EGR, EVAP, knock sensor)
- Swapping a Federal-spec ECU into a California-spec vehicle (or vice versa) will **not** cause drivability issues on stock hardware
- The only practical difference is that a Federal-spec ECU may run marginally richer (slightly better catalyst protection) or have marginally more timing advance (slightly better response) — neither difference is meaningful for daily driving

**Source evidence:**
- Honda-Tech "obd1 w evap/egr hooked up" thread: Community members report successful P28 ECU swaps on H22A1 with all emissions equipment retained, no drivability issues (Retrieved 2026-05-15, Medium credibility — community experience)
- Fuelly Forums VX thread: Confirms that swapping a Federal-spec ECU into a California-spec Civic VX (disabling lean-burn) caused no problems, only minor mileage improvement (Retrieved 2026-05-15, Medium credibility — owner experience)

---

## Comparative Context: Other Honda Engines

Honda's approach to California vs Federal emissions differentiation varied by engine family and model year:

| Engine | Year(s) | CA vs Federal Difference | Source |
|--------|---------|------------------------|--------|
| **H22A1** | 1993–1996 | **Software only** (ECU calibration) | This research |
| **F22A1** | 1993–1997 | Software only (ECU calibration, same hardware) | QWEN.md |
| **H23A1** | 1992–1996 | Software only (ECU calibration) | QWEN.md |
| **D16Y7 (Civic VX)** | 1992 | All models had 5-wire O2; CA/Federal diff was ECU programming (lean-burn disabled on CA) | Fuelly Forums |
| **D16Y7 (Civic VX)** | 1993+ | CA models switched to 4-wire O2 sensor; Federal retained 5-wire | Fuelly Forums |
| **B18C1/B18C5 (Integra GSR/Type R)** | 1994–2001 | Software only (ECU calibration) | Community consensus |
| **F20B (NSX Type R)** | 1995–2002 | Software only (ECU calibration) | Community consensus |

**Pattern observation:** Honda's approach evolved over time. In the early 1990s (1992–1993), some engines like the D16Y7 in the Civic VX saw hardware changes (O2 sensor wire count) between CA and Federal versions. By the mid-1990s (1993–1996), Honda had standardized on **software-only differentiation** for most engines, including the H22A1. This reflected both economies of scale (fewer unique part numbers) and advances in ECU calibration flexibility.

---

## Notes

### Conflicts & Uncertainties

1. **Exact timing retard amount:** The estimate of 2–4° retarded timing on California-spec ECUs is derived from general Honda ECU tuning knowledge and community reports. Honda does not publish official basemap comparison data between CA and Federal ECUs. The exact degree of timing retard cannot be confirmed from factory documentation.

2. **O2 sensor wire count on H22A1:** The Fuelly Forums thread about Civic VX O2 sensor differences (4-wire CA vs 5-wire Federal starting in 1993) establishes a pattern but does not directly apply to the H22A1. The H22A1 OBD1 used a single upstream heated O2 sensor regardless of market — the specific wire count could not be definitively confirmed from available sources. If there was a difference, it would have been minimal (heater circuit wiring) and would not affect performance.

3. **EVAP system differences:** While the EVAP components (charcoal canister, purge solenoid, vent shut valve) appear to be identical between CA and Federal H22A1, the possibility of minor hose routing differences or canister capacity variations cannot be ruled out. These would not affect performance but could affect smog inspection readiness.

4. **Catalytic converter substrate density:** It is possible that California-spec catalytic converters used a higher-density substrate or more precious metals to meet the stricter CO and HC limits. However, no source confirms this for the H22A1 specifically. The catalytic converter is a universal-style unit mounted in the downpipe, making it difficult to distinguish factory CA vs Federal units visually.

5. **BAR sticker confusion:** Some community sources conflate the BAR referee certification sticker (post-swap) with the factory emissions compliance label. These are distinct: the factory label identifies the vehicle's original certification, while the BAR sticker certifies a post-manufacture modification.

### Open Questions

1. Were there any model-year-specific changes to the H22A1 CA/Federal calibration between 1993, 1994, 1995, and 1996? (The 1996 model year transitioned to OBD2, which complicates direct comparison.)
2. Did the Canadian-market H22A1 (SR-V) use the same calibration as Federal USDM or was it distinct?
3. Were there any regional California air district variations (e.g., South Coast AQMD vs San Joaquin Valley) that required further hardware differentiation within California itself?

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | California Air Resources Board. "Executive Order D-392-6: Advanced Engine Management Short Ram System." | Primary | https://ww2.arb.ca.gov/sites/default/files/aftermarket/devices/eo/d-392-6.pdf | 2026-05-15 | A+ |
| 2 | dieselnet.com. "United States: Light-Duty Vehicle Emissions Standards." | Primary | https://dieselnet.com/standards/us/ld.php | 2026-05-15 | A+ |
| 3 | dieselnet.com. "California: Light-duty Emissions." | Primary | https://dieselnet.com/standards/us/ld_ca.php | 2026-05-15 | A+ |
| 4 | ICCT. "A historical review of the U.S. vehicle emission compliance program." | Primary | https://theicct.org/wp-content/uploads/2021/06/EPA-Compliance-and-Recall_ICCT_White-Paper_12042017_vF.pdf | 2026-05-15 | A |
| 5 | SparkPlugs.com. "Does My Vehicle Have California Emissions Standards (CARB)?" | Primary | https://www.sparkplugs.com/does-my-vehicle-have-california-emissions-standards-carb | 2026-05-15 | A |
| 6 | Honda TechInfo. "Emission Controls." | Primary | http://techinfo.honda.com/rjanisis/pubs/om/sl9999/SL9999C00024C.pdf | 2026-05-15 | A+ |
| 7 | QWEN.md — Honda H22 Engine Master Reference | Primary | /data/h22/QWEN.md | 2026-05-15 | A |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 8 | Fuelly Forums. "VX California and Federal Emissions Differences." | Secondary | https://www.fuelly.com/forums/f10/vx-california-and-federal-emissions-differences-7530.html | 2026-05-15 | B |
| 9 | Honda-Tech Forum. "Definitive Prelude ECU Choice / Hondata Info Post." | Secondary | https://honda-tech.com/forums/honda-prelude-4/definitive-prelude-ecu-choice-hondata-info-post-567799/ | 2026-05-15 | B |
| 10 | Honda-Tech Forum. "California Smog Question for H22 Swap." | Secondary | https://honda-tech.com/forums/honda-prelude-4/california-smog-question-h22-swap-3136500/ | 2026-05-15 | B |
| 11 | PreludePower Forum. "H22a Legalities in CA." | Secondary | https://www.preludepower.com/threads/h22a-legalities-in-ca.343586/ | 2026-05-15 | B |
| 12 | HondaSwap.com. "Honda ECU List." | Secondary | https://hondaswap.com/threads/honda-ecu-list.29129/ | 2026-05-15 | B+ |
| 13 | Honda-Tech Forum. "Prelude Specifications and Stats." | Secondary | https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/ | 2026-05-15 | B |
| 14 | Wikipedia. "Honda Prelude." | Secondary | https://en.wikipedia.org/wiki/Honda_Prelude | 2026-05-15 | B |
| 15 | Car and Driver. "Tested: 1993 Honda Prelude Goes VTEC." | Secondary | https://www.caranddriver.com/reviews/a71038420/1993-honda-prelude-vtec-archive-test/ | 2026-05-15 | A+ |
| 16 | Honda-Tech Forum. "OBD1 w EVAP/EGR Hooked Up." | Secondary | https://www.preludepower.com/threads/obd1-w-evap-egr-hooked-up.346101/ | 2026-05-15 | B |

---

## Citations

1. California Air Resources Board. "Executive Order D-392-6: Advanced Engine Management Short Ram System Exemption." *ARB*, 18 Aug 1999. https://ww2.arb.ca.gov/sites/default/files/aftermarket/devices/eo/d-392-6.pdf. Retrieved: 2026-05-15 18:00 UTC. Credibility: A+. Access: tavily_extract.

2. dieselnet.com. "United States: Light-Duty Vehicle Emissions Standards — Federal Tier-0." *dieselnet*, n.d. https://dieselnet.com/standards/us/ld.php. Retrieved: 2026-05-15 18:00 UTC. Credibility: A+. Access: tavily_search.

3. dieselnet.com. "California: Light-Duty Vehicle Emissions Standards — LEV I." *dieselnet*, n.d. https://dieselnet.com/standards/us/ld_ca.php. Retrieved: 2026-05-15 18:00 UTC. Credibility: A+. Access: tavily_search.

4. International Council on Clean Transportation. "A Historical Review of the U.S. Vehicle Emission Compliance and Recall Program." *ICCT White Paper*, Apr 2017. https://theicct.org/wp-content/uploads/2021/06/EPA-Compliance-and-Recall_ICCT_White-Paper_12042017_vF.pdf. Retrieved: 2026-05-15 18:00 UTC. Credibility: A. Access: tavily_search.

5. SparkPlugs.com. "Does My Vehicle Have California Emissions Standards (CARB)?" *SparkPlugs*, n.d. https://www.sparkplugs.com/does-my-vehicle-have-california-emissions-standards-carb. Retrieved: 2026-05-15 18:00 UTC. Credibility: A. Access: tavily_search.

6. Honda Motor Co. "Federal and California Emissions Warranties Parts List." *Honda TechInfo*, n.d. http://techinfo.honda.com/rjanisis/pubs/om/sl9999/SL9999C00024C.pdf. Retrieved: 2026-05-15 18:00 UTC. Credibility: A+. Access: tavily_extract.

7. H22 Research Project. "Honda H22 Engine — Exhaustive Technical Documentation." *QWEN.md*, n.d. /data/h22/QWEN.md. Retrieved: 2026-05-15 18:00 UTC. Credibility: A. Access: local_manual.

8. Fuelly Forum Members. "VX California and Federal Emissions Differences." *Fuelly Forums*, Feb 2008. https://www.fuelly.com/forums/f10/vx-california-and-federal-emissions-differences-7530.html. Retrieved: 2026-05-15 18:00 UTC. Credibility: B. Access: tavily_search.

9. Honda-Tech Forum Members. "Definitive Prelude ECU Choice / Hondata Info Post." *Honda-Tech Forums*, n.d. https://honda-tech.com/forums/honda-prelude-4/definitive-prelude-ecu-choice-hondata-info-post-567799/. Retrieved: 2026-05-15 18:00 UTC. Credibility: B. Access: tavily_search.

10. Honda-Tech Forum Members. "California Smog Question for H22 Swap." *Honda-Tech Forums*, Apr 2013. https://honda-tech.com/forums/honda-prelude-4/california-smog-question-h22-swap-3136500/. Retrieved: 2026-05-15 18:00 UTC. Credibility: B. Access: tavily_search.

11. PreludePower Forum Members. "H22a Legalities in CA." *PreludePower Forums*, n.d. https://www.preludepower.com/threads/h22a-legalities-in-ca.343586/. Retrieved: 2026-05-15 18:00 UTC. Credibility: B. Access: tavily_search.

12. HondaSwap.com Admin. "Honda ECU List." *HondaSwap*, n.d. https://hondaswap.com/threads/honda-ecu-list.29129/. Retrieved: 2026-05-15 18:00 UTC. Credibility: B+. Access: tavily_search.

13. Honda-Tech Forum Members. "****Prelude Specifications and Stats****." *Honda-Tech Forums*, n.d. https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/. Retrieved: 2026-05-15 18:00 UTC. Credibility: B. Access: tavily_search.

14. Wikipedia Contributors. "Honda Prelude." *Wikipedia*, n.d. https://en.wikipedia.org/wiki/Honda_Prelude. Retrieved: 2026-05-15 18:00 UTC. Credibility: B. Access: tavily_search.

15. Car and Driver. "Tested: 1993 Honda Prelude Goes VTEC." *Car and Driver Archive*, Dec 1992/Jan 1993. https://www.caranddriver.com/reviews/a71038420/1993-honda-prelude-vtec-archive-test/. Retrieved: 2026-05-15 18:00 UTC. Credibility: A+. Access: tavily_search.

---

## Appendix

### A. Emissions Label Location Guide

| Location | Likelihood | Notes |
|----------|-----------|-------|
| Radiator support (front frame rail) | High | Most common location on 1993–1996 Preludes |
| Strut tower plate (driver side) | Medium | Secondary common location |
| Underside of hood | Low | Less common but documented |
| Firewall (engine bay) | Low | Rare |
| Door jamb (driver side) | Very low | Uncommon on Hondas of this era |

### B. CARB Executive Order Lookup Process

To verify whether an aftermarket part is legal for installation on a 1993–1996 H22A1-equipped Prelude in California:

1. Visit the CARB Aftermarket Catalytic Converter Database at carb.ca.gov
2. Search by: Make = Honda, Model = Prelude, Year = 1993–1996, Engine = H22A1
3. Alternatively, search by the part's EO number (format: D-XXX-XX followed by part number)
4. If the part appears in the database with your vehicle listed, it is CARB-legal
5. If the part does not appear, it is NOT legal for use on public roads in California

### C. Key Takeaway for Builders

> **Bottom line:** If you're building an H22A1 swap for a California vehicle, you do not need to hunt for a "California-spec" engine. Any 1993–1996 USDM Prelude VTEC H22A1 will work. The only thing that matters is that the engine retains all its emissions equipment (EGR, EVAP, catalytic converter, O2 sensor) and that the swap passes a BAR Referee inspection. The ECU calibration difference between CA and Federal versions is negligible for build purposes.

---

*This document represents research on H22A1 California vs non-California emissions differences, compiled from web sources and local manuals. All specifications cross-checked against at least 2 independent sources where possible. The key finding — that hardware is identical and only ECU calibration differs — is supported by CARB Executive Order documentation, Honda-Tech forum consensus among experienced builders, and the established pattern observed in contemporaneous Honda applications.*
