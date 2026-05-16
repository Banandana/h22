# Honda H-Series Ignition System Specifications

> **Task:** T-114 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the complete ignition system architecture for the Honda H-series engine family
(H22A, H22A1, H22A4, H23A). The H-series uses two fundamentally different ignition architectures
across its production life: OBD1 models (1992–1996) employ a **distributor-based ignition system**
with an internal coil mounted inside the distributor body, while OBD2 models (1997–2001) transition
to a **distributorless wasted-spark system** with an external coil pack. Neither variant uses
coil-on-plug (COP) natively; COP conversions require aftermarket solutions such as the Hondata CPR
module. All specifications apply across the full H-series family within each generation.

---

## Architecture Overview

### OBD1 (1992–1996): Distributor-Based Ignition

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **System Type** | Distributor with internal coil | Civicforums H-specs FAQ (2026-05-15), Honda-Tech forum consensus | Single distributor serves all four cylinders via spark plug wires |
| **Distributor Part Number** | 30100-P13-006 | HondaPartsNow OEM catalog | Primary OBD1 part number; superseded by alternatives |
| **Aftermarket Replacements** | TD-60U, TD-60, D8033N, D8033, 31-17429, 3117429, 100-3117429, 30100P13006 | AIP Electronics, Burton-Racing product pages | Multiple supplier cross-reference; all physically interchangeable |
| **Ignition Module** | Integrated inside distributor body | AIP Electronics "Heavy Duty Stock Series" description | Complete unit includes cap, rotor, and coil |
| **ECU Connectors** | 2-pin rectangular + 8-pin rectangular (OBD1) | Burton-Racing product specs | Standard OBD1 ECU connector complement |
| **Trigger Signal** | Crankshaft position sensor (CKP) at crank | Honda-Tech forum (jonbar87, 2010) | Located at crank pulley end; provides timing reference to ECU |
| **Cam Sensor** | None required for ignition timing | Honda-Tech forum discussion | Distributor mechanically phased to cam; no CMP signal needed |

#### Distributor Internal Coil Specifications

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Type** | Internal coil (Hitachi or TEC manufactured) | — | eCtune tuning guide (Blake Barr, Authorized Tuner) | Two OEM suppliers; Hitachi and TEC both used |
| **Max Current Flow** | 5.5 – 7.5 | amps | eCtune dwell table analysis | ECU-controlled current limit; varies by supplier |
| **Total Dwell Time** | 3.6 – 4.1 | ms | eCtune dwell table analysis | Fixed range; ECU controls dwell via ramp slope |
| **Ramp Slope** | 1.7 – 2.0 | A/ms | eCtune dwell table analysis | Rate of current rise; Hitachi spec |
| **Primary Resistance** | ~0.07 – 0.08 | ohms | Honda-Tech forum (EE\_Chris, 2004; RedRacerCivic, 2004) | Measured on similar Honda internal coils (D16A6); typical Honda low-resistance coil |
| **Secondary Resistance** | 9,700 – 14,600 | ohms (9.7 – 14.6 kΩ) | Helms Manual per Honda-Tech (RedRacerCivic, 2004) | Forum post initially stated "9.7–14.6 ohms" — corrected to kiloohms by community member Chiovnidca |

### OBD2 (1997–2001): Distributorless Wasted-Spark System

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **System Type** | Distributorless Ignition System (DIS) — wasted spark | Wikipedia "Wasted spark system"; HP Academy forum | Coil fires two plugs simultaneously; one on compression stroke, one on exhaust stroke ("wasted") |
| **Coil Type** | External coil pack (single unit, not individual coils) | Swap Shop Racing NGK listing; Hondata CPR retrofit product page | Single coil pack replaces the distributor; drives all four plugs via high-tension wires |
| **NGK Replacement Part** | 49046 (HEI-style U1075 equivalent) | Swap Shop Racing product page | Fits all H22A/H23A/F-series OBD2 applications |
| **Coil Pack Configuration** | 1 coil → 4 spark plugs (2 pairs) | Wikipedia "Wasted spark system"; HP Academy forum | Pairs fire simultaneously: cylinder 1 & 4, cylinder 2 & 3 |
| **Firing Order** | 1-3-4-2 | PreludeOnline forum (marcucci, 2003); Honda-Tech consensus | Standard inline-4 firing order; cylinder 1 at timing-belt side |
| **Wasted Spark Pairs** | 1↔4, 2↔3 | Wikipedia "Wasted spark system" theory | Cylinder 1 & 4 share one coil output; 2 & 3 share the other |
| **Trigger Signals** | CKP at crank + CMP at cam | Wikipedia "Wasted spark system"; Honda-Tech forum | Unlike OBD1, OBD2 wasted spark requires cam position signal to determine which cylinder is on compression stroke (for knock control and fuel trim, though ignition itself can run on crank-only) |
| **Base Timing** | 15° ± 2° | Honda-Tech forum (jonbar87, 2010; quoting factory manual) | Set with timing light at idle; flywheel mark aligned to TDC indicator |

#### External Coil Pack Specifications (TEC-type)

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Type** | External coil (TEC manufactured) | eCtune tuning guide (Blake Barr) | Different from OBD1 internal coil; higher performance |
| **Max Current Flow** | 6.75 – 8.75 | amps | eCtune dwell table analysis | Higher than internal coil; supports wasted-spark duty cycle |
| **Total Dwell Time** | 3.6 – 4.1 | ms | eCtune dwell table analysis | Same range as internal coil despite higher current |
| **Ramp Slope** | 1.5 – 2.5 | A/ms | eCtune dwell table analysis | Wider range than internal coil; more ECU tunability |

---

## Distributor vs Coil-On-Plug (COP) Analysis

The H-series never used coil-on-plug from the factory. The evolution went from distributor →
external coil pack (wasted spark), but COP was never implemented by Honda for this engine.

### Why No Factory COP?

| Factor | Explanation | Source |
|--------|-------------|--------|
| **Cost** | COP requires 4 individual coils (vs 1 distributor or 1 coil pack); significantly higher BOM cost in the 1990s | General industry context; Wikipedia DIS history |
| **Packaging** | H-series head design accommodates distributor mounting boss or coil pack bracket; COP would require redesigned head and longer valve stems | Engineering inference; common knowledge in swap community |
| **Reliability** | Distributor was proven technology; wasted-spark DIS eliminated cap/rotor wear while keeping parts count low | Wikipedia "Wasted spark system"; NGK DIS history |
| **Performance** | Wasted spark provides adequate spark energy for NA applications; COP benefits (individual cylinder timing control) were unnecessary for stock H-series | HP Academy forum (Stephen Dean, 2024); DIYAutoTune "crank-fired wasted spark" article |

### Aftermarket COP Conversions

| Solution | Description | Compatibility | Source |
|----------|-------------|---------------|--------|
| **Hondata CPR (Coil Pack Retrofit)** | Electronic circuit module that converts distributor/dis coil pack signals to drive igniter-type individual coils (K-series style) | D, B, F, and H-series Honda engines; requires Hondata S300 + US OBD1 ECU | MAPerformance product page |
| **Dragon Fire Performance Stage 2 Kit** | High-performance distributor + spiral-wound plug wires (up to 80,000 VAC rating) | 1992–1996 H22 Redtop JDM; rated NA or boosted to 500 hp | JDM Ignition product page |
| **MSD Distributor/Cap/Rotor** | Aftermarket electronic ignition upgrade replacing stock distributor | Universal fitment for H-series; bypasses OEM ignition module | Swap Shop Racing catalog |

---

## Spark Energy and Dwell Time Analysis

### Theoretical Spark Energy

Spark energy stored in the coil primary winding is calculated as:

```
E = ½ × L × I²
```

Where E = energy (joules), L = primary inductance (henries), I = peak current (amps).

Using eCtune dwell parameters as reference:

| Configuration | Inductance (est.) | Peak Current | Stored Energy (est.) | Source |
|---------------|-------------------|--------------|---------------------|--------|
| **OBD1 Internal Coil** | ~3.5 mH (typical Honda HEI-class) | 5.5 – 7.5 A | 53 – 98 mJ | eCtune; Classic Gold Wing forum (Honda HEI coil: 3.5 mH primary) |
| **OBD2 External Coil** | ~3.5 mH (typical Honda HEI-class) | 6.75 – 8.75 A | 80 – 134 mJ | eCtune; Classic Gold Wing forum |

> **Note:** Exact inductance values for Honda H-series coils are not published by Honda or any
> supplier. The 3.5 mH figure is inferred from a comparable Honda HEI coil reported on the
> Classic Gold Wing forum (2023). Actual values may differ.

### Dwell Time at Operating RPM

In a wasted-spark system, the coil fires twice per engine cycle (once per revolution). At high RPM,
the available dwell time shrinks:

| RPM | Time per revolution | Min. dwell per spark (wasted spark, 2 sparks/rev) | Notes |
|-----|-------------------|--------------------------------------------------|-------|
| 1,000 | 60 ms | 30 ms min | Plenty of charging time |
| 3,000 | 20 ms | 10 ms min | Adequate for full charge |
| 5,000 | 12 ms | 6 ms min | Still adequate |
| 7,000 | 8.57 ms | 4.29 ms min | Approaching minimum dwell |
| 8,200 (H22A redline) | 7.32 ms | 3.66 ms min | Near eCtune minimum dwell range |
| 10,000 | 6 ms | 3 ms min | May exceed coil charging capability |

> **Implication:** At redline (~8,200 RPM for H22A Redtop), the wasted-spark system has approximately
> 3.66 ms minimum between sparks — right at the lower bound of the eCtune dwell specification
> (3.6–4.1 ms). This means the OBD2 coil pack operates near its limits at peak RPM. Individual
> COP systems avoid this constraint because each coil fires only once per cycle (every 2 revolutions),
> giving 7.32 ms at 8,200 RPM — double the available dwell time.
>
> This is one reason why aftermarket COP conversions (Hondata CPR) are popular on boosted H22 builds:
> they eliminate the high-RPM dwell limitation inherent in wasted-spark architecture.

### Dwell Control Strategy

| Generation | Dwell Control Method | Source |
|------------|---------------------|--------|
| **OBD1** | ECU calculates base dwell (in degrees of crank rotation) → applies adder table (eCtune) | eCtune tuning guide (xenocron, 2007) |
| **OBD2** | ECU manages dwell via coil pack driver circuit; dwell map in ECU ROM | Industry standard DIS operation; Wikipedia "Wasted spark system" |

The eCtune dwell table is described as a "dwell adder" — the ECU computes a base dwell value from
a lookup table indexed by RPM and load, then adds the table correction. This allows fine-tuning of
coil saturation without changing the fundamental dwell strategy.

---

## Ignition Timing Specifications

### Base Timing

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Base Timing (idle, OBD1)** | 15° ± 2° BTDC | Honda factory manual per Honda-Tech (jonbar87, 2010) | Set with timing light at idle with diagnostic connector jumpered |
| **Base Timing (idle, OBD2)** | 15° ± 2° BTDC | Honda-Tech forum (lakerschamp2000, 2007) | Same specification carried over to OBD2 H22A4 |

### Advance Curve (Stock ECU)

| RPM | Approximate Total Advance | Source | Notes |
|-----|--------------------------|--------|-------|
| Idle (~800 RPM) | ~18–20° | Honda-Tech (jonbar87, 2010; Scanguage data) | Includes base 15° + idle advance from ECU map |
| 1,000 RPM | ~6–8° | Honda-Tech (jonbar87, 2010) | ECU reduces advance slightly above idle |
| 2,000–3,000 RPM | ~20–24° | Honda-Tech (jonbar87, 2010) | Mid-range advance plateau |
| 4,000–5,000 RPM | ~24–28° | Honda-Tech (jonbar87, 2010) | Increasing advance with load |
| WOT (wide open throttle) | ~28–32° | Honda-Tech (jonbar87, 2010) | Maximum advance before knock limit; varies with load |

> **Source note:** Advance curve data from jonbar87's Scanguage logging (2010) recorded on a stock
> H22A with base timing set to 15°. The map was reverse-engineered by driving under various load/RPM
> conditions and recording ignition advance values. Verified by multiple forum participants.

---

## Common Ignition Components

### Spark Plug Wires (OBD1)

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Wire Type** | Spiral-wound alloy conductor, Kevlar core | JDM Ignition (Dragon Fire Performance Stage 2) | Low resistance, high-voltage rating (80,000 VAC) |
| **OEM Wire Set** | NGK spark plug wire sets | Swap Shop Racing catalog | Direct replacement; exact length matching distributor-to-plug routing |
| **Aftermarket** | MSD, NGK, Dragon Fire Sport Series | Various retailers | Upgraded insulation, lower resistance, higher temperature rating |

### Distributor Cap and Rotor

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Cap** | Replaceable; 4-tap distribution | HondaPartsNow OEM catalog | Multiple part numbers by model year; worn taps cause misfire |
| **Rotor** | Replaceable; contacts center tower to tap positions | HondaPartsNow OEM catalog | Worn contact point causes weak spark at specific cylinder |
| **Replacement Interval** | Every 60,000 miles (timing belt service) | General Honda maintenance practice | Often replaced together with timing belt; preventative maintenance |

### Ignition Module (OBD1)

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Location** | Inside distributor body | AIP Electronics, Burton-Racing | Integrated into distributor assembly; not serviceable separately |
| **Failure Mode** | Intermittent misfire, no-start, heat-related shutdown | Honda-Tech forum discussions | Common failure point; entire distributor often replaced rather than module alone |
| **Upgrade** | MSD electronic ignition module upgrade | Swap Shop Racing catalog | Popular performance upgrade; eliminates OEM module limitations |

---

## Troubleshooting Guide

### Symptoms of Ignition System Failure

| Symptom | Likely Cause | Diagnostic Step |
|---------|-------------|-----------------|
| Rough idle, misfire at low RPM | Worn distributor cap/rotor, degraded plug wires | Visual inspection of cap interior carbon tracking; resistance test on wires |
| Misfire under load / bogging | Weak coil, insufficient dwell at high RPM | Scan tool live data (ignition advance); spark tester under load |
| Hard starting (cranks but no fire) | Failed ignition module (OBD1), failed coil pack (OBD2) | Check for spark at plug wire/coil output; scan for P03xx codes |
| Check engine light, P0300–P0304 | Cylinder-specific misfire codes | Identify misfiring cylinder; check corresponding plug wire/coil pair |
| Poor high-RPM power | Wasted-spark dwell limitation approaching coil saturation | Compare actual advance to stock map; consider COP conversion for >8,000 RPM use |
| Oil on spark plugs | Distributor O-ring leak (OBD1) | Remove distributor; inspect O-ring for cracks/flattening; replace with new OEM O-ring |
| Intermittent spark loss when hot | Ignition module thermal shutdown (OBD1) | Cool distributor, test again; if works when cold, replace ignition module |

### Coil Testing Procedure

| Test | OBD1 Internal Coil | OBD2 External Coil | Source |
|------|-------------------|-------------------|--------|
| **Primary resistance** | ~0.07 – 0.08 Ω | ~0.07 – 0.08 Ω (similar Honda coil) | Honda-Tech (EE\_Chris, 2004) |
| **Secondary resistance** | 9,700 – 14,600 Ω (9.7 – 14.6 kΩ) | Same range expected | Helms Manual per Honda-Tech |
| **Spark test** | Pull wire, hold ¼" from ground, crank | Remove coil pack, test output | Visual confirmation of blue-white spark |
| **Voltage test** | N/A (integrated module) | Check coil supply voltage at connector | Multimeter: should read battery voltage (~12V) with key ON |

> **WARNING:** A coil that ohms out to spec does NOT guarantee it is functional. Honda-Tech forum
> reports multiple cases where coils passed resistance testing but failed under load (Honda-Tech,
> EE\_Chris, 2004). Always verify with a spark test.

---

## OBD1 vs OBD2 Ignition System Comparison

| Feature | OBD1 (1992–1996) | OBD2 (1997–2001) |
|---------|-----------------|-----------------|
| **Architecture** | Distributor with internal coil | Distributorless wasted-spark coil pack |
| **Components** | Distributor, cap, rotor, plug wires, internal coil | Coil pack, plug wires, CKP sensor, CMP sensor |
| **Parts Count** | Higher (cap, rotor, module separate from coil) | Lower (single coil pack replaces distributor assembly) |
| **Maintenance** | Periodic cap/rotor replacement; module can fail | Minimal; coil pack is sealed unit, plugs only |
| **Reliability** | Moderate (wear items: cap, rotor, module) | High (no moving parts, sealed coil pack) |
| **High-RPM Dwell** | Limited by distributor rotation speed | Limited by wasted-spark 2× firing rate |
| **Base Timing** | 15° ± 2° (mechanical timing light) | 15° ± 2° (mechanical timing light) |
| **Knock Control** | Basic (single knock sensor, limited adaptation) | Enhanced (OBD2 knock sensor integration, wider adaptation range) |
| **Swap Compatibility** | Requires distributor mounting; physical space for distributor | Requires coil pack bracket; no distributor boss needed |
| **Aftermarket Support** | MSD distributors, cap/rotor kits, ignition modules | Hondata CPR for COP conversion, aftermarket coil packs |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | eCtune tuning guide — dwell control tables | Community tuning documentation | https://ectune.hondatuningsuite.com/viewtopic.php?t=1263 | 2026-05-15 | High (authorized tuner, detailed technical analysis) |
| 2 | HondaPartsNow OEM distributor catalog | OEM parts catalog | https://www.hondapartsnow.com/oem-honda-prelude-distributor.html | 2026-05-15 | High (direct OEM part numbers) |
| 3 | AIP Electronics — Heavy Duty Stock Series Distributor | Aftermarket OEM replacement | https://aipelectronics.com/products/heavy-duty-stock-series-complete-electronic-ignition-distributor-for-1992-1996-honda-prelude-2-2l-jdm-h22-h22a-dohc-vtec-with-internal-coil-obd1 | 2026-05-15 | High (cross-references multiple OEM part numbers) |
| 4 | Burton-Racing — H22/H23 VTEC Distributor | Aftermarket OEM replacement | https://www.burton-racing.com/products/honda-prelude-92-96-2-2l-vtec-distributor | 2026-05-15 | Medium-High (OEM-equivalent replacement, lists part numbers) |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Swap Shop Racing — NGK Ignition Coil OE Honda Prelude/Accord H-Series | Retailer product page | http://www.swapshopracing.com/contents/en-us/p2768.html | 2026-05-15 | High (NGK official part #49046, full fitment list) |
| 2 | MAPerformance — Hondata Coil Pack Retrofit (CPR) | Retailer product page | https://www.maperformance.com/products/hondata-coil-pack-retrofit-honda-b16-b18-d16-f22-h22-cpr | 2026-05-15 | High (official Hondata distributor, specific to H-series) |
| 3 | Honda-Tech forum — "Bad coil? Checked Ohm resistance" | Community forum discussion | https://honda-tech.com/forums/tech-misc-15/bad-coil-checked-ohm-resistance-primary-secondary-814146/ | 2026-05-15 | Medium (community experience, practical testing data) |
| 4 | Honda-Tech forum — "Stock H22 ECU Ignition Values" (jonbar87) | Community forum discussion | https://www.preludepower.com/threads/stock-h22-ecu-ignition-values.329309/ | 2026-05-15 | Medium-High (Scanguage-verified advance curve, multiple corroborating posts) |
| 5 | Honda-Tech forum — "Timing advance on 97-01 h22a4" | Community forum discussion | https://honda-tech.com/forums/honda-prelude-4/timing-advance-97-01-h22a4-1111002/ | 2026-05-15 | Medium (community experience, OBD2 timing verification) |
| 6 | JDM Ignition — Dragon Fire Performance Stage 2 Ignition Kit | Retailer product page | https://jdmignition.com/products/stage-2-ignition-kit-1992-1996-honda-prelude-2-2l-i4-jdm-h22-red | 2026-05-15 | Medium (performance specs, product capabilities) |

### Tertiary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Wikipedia — "Wasted spark system" | Encyclopedia article | https://en.wikipedia.org/wiki/Wasted_spark_system | 2026-05-15 | Medium (general technical overview, no H-series specifics) |
| 2 | Wikipedia — "Honda H engine" | Encyclopedia article | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | Medium (specification tables, general engine info) |
| 3 | Civicforums — H-Series Engine Specifications FAQ | Community FAQ | https://www.civicforums.com/forums/241-engine-performance-modifications/366076-h-series-engine-specifications-swap-guides-faq.html | 2026-05-15 | Medium (confirms distributor ignition for H-series) |
| 4 | HP Academy Forum — "Wasted spark VS Coil per cylinder?" | Community forum discussion | https://www.hpacademy.com/forum/general-tuning-discussion/show/wasted-spark-vs-coil-per-cylinder/ | 2026-05-15 | Medium (technical analysis of wasted-spark dwell limitations) |
| 5 | DIYAutoTune — "The beauty of crank-fired Wasted Spark Ignition" | Technical blog | https://diyautotune.com/blogs/tech-corner/wasted-spark-ignition | 2026-05-15 | Medium (theoretical analysis of wasted-spark advantages) |
| 6 | Classic Gold Wing Forum — "Coil Dwell and Spark Duration" | Community forum discussion | https://classicgoldwings.com/threads/coil-dwell-and-spark-duration.15655/ | 2026-05-15 | Low-Medium (Honda HEI coil specs used for inductance estimation) |
| 7 | PreludePower Forum — "Ignition timing set with gun not correct on H22?" | Community forum discussion | https://www.preludepower.com/threads/ignition-timing-set-with-gun-not-correct-on-h22.328723/ | 2026-05-15 | Medium (community troubleshooting, timing verification) |
| 8 | eCtune — "Ignition Coil Dwell Calibration" | Technical documentation | https://dtec.net.au/Ignition%20Coil%20Dwell%20Calibration.htm | 2026-05-15 | Medium (general ignition theory, dwell calibration methodology) |

---

## Notes

### Key Findings

1. **Two Distinct Architectures:** The H-series spans two ignition architectures. OBD1 (1992–1996)
   uses a traditional distributor with an integrated internal coil (Hitachi or TEC). OBD2 (1997–2001)
   transitions to a distributorless wasted-spark system with a single external coil pack. Both use
   the same base timing specification (15° ± 2°).

2. **No Factory Coil-On-Plug:** Honda never implemented COP on the H-series. The evolution stopped
   at wasted-spark DIS. Aftermarket COP conversions (Hondata CPR) exist for forced induction and
   high-RPM applications where the wasted-spark dwell limitation becomes a factor.

3. **High-RPM Dwell Limitation:** At H22A redline (~8,200 RPM), the wasted-spark system has
   approximately 3.66 ms between sparks — right at the lower bound of the eCtune dwell specification
   (3.6–4.1 ms). This is a known architectural constraint that motivates COP upgrades on boosted
   builds targeting sustained >8,000 RPM operation.

4. **Coil Resistance Testing Is Incomplete:** A coil that passes resistance testing may still fail
   under load. This is documented in the Honda-Tech community (2004). Always verify with a spark
   test, especially for OBD1 internal coils which are prone to heat-related module failure.

5. **Distributor O-Ring Leak:** A common H-series issue is oil leaking past the distributor O-ring,
   contaminating spark plugs. This is listed in the H-series service bulletins (T-069) and is a
   simple O-ring replacement fix.

### Conflicts and Discrepancies

- **Secondary resistance: "9.7–14.6 ohms" vs "9,700–14,600 ohms."** The original Honda-Tech forum
  post (RedRacerCivic, 2004) quoted the Helms Manual as stating "9.7 and 14.6 ohms." Community
  member Chiovnidca correctly identified this as a typo — the spec is in kiloohms (9,700–14,600 Ω).
  The corrected value is consistent with typical automotive ignition coil secondary resistance
  ranges. This is the authoritative value.

- **Dwell time: fixed vs variable.** The eCtune guide presents dwell as a fixed range (3.6–4.1 ms)
  for both internal and external coils, but also describes the ECU dwell table as an "adder" that
  can be tuned. The fixed range represents the nominal ECU target; the adder table allows fine
  adjustment. At very high RPM, the ECU cannot extend dwell beyond the mechanical limit of the
  crankshaft rotation speed — this is a hard constraint regardless of ECU tuning.

- **OBD2 trigger signals.** Some sources suggest wasted spark can run on crank-only (Wikipedia),
  while others indicate OBD2 H22A4 uses both CKP and CMP sensors. The CMP signal is primarily used
  for fuel trim and knock control adaptation in OBD2, even though the ignition timing itself can
  function on crank position alone. For complete system diagnostics, both sensors should be checked.

### Implications for Building/Modding

- **Boosted builds (>10 psi):** Consider Hondata CPR COP conversion to eliminate wasted-spark dwell
  limitation at high RPM. Stock coil pack may not sustain adequate spark energy under boost + high
  RPM combined conditions.

- **Track builds (>8,000 RPM sustained):** Wasted-spark dwell approaches minimum at redline. COP
  conversion doubles available dwell time per spark (from ~3.66 ms to ~7.32 ms at 8,200 RPM).

- **Daily driver maintenance:** Replace distributor cap and rotor every 60,000 miles (coincides
  with timing belt service). Check distributor O-ring during any distributor removal. Replace
  spark plug wires if insulation shows cracking or carbon tracking.

- **Swap projects:** OBD1 swaps require distributor mounting space and plug wire routing. OBD2
  swaps require coil pack bracket and wiring for both CKP and CMP sensors. Hondata CPR enables
  COP conversion on any H-series swap with an Hondata S300 ECU.

---

## Citations

1. Blake Barr (xeCtune Authorized Tuner), "Dwell settings and ignition timing," eCtune forum thread, 2007. URL: https://ectune.hondatuningsuite.com/viewtopic.php?t=1263

2. HondaPartsNow, "Honda Prelude Distributor" OEM parts catalog. URL: https://www.hondapartsnow.com/oem-honda-prelude-distributor.html

3. AIP Electronics, "Heavy Duty Stock Series Complete Electronic Ignition Distributor For 1992-1996 Honda Prelude 2.2L JDM H22." URL: https://aipelectronics.com/products/heavy-duty-stock-series-complete-electronic-ignition-distributor-for-1992-1996-honda-prelude-2-2l-jdm-h22-h22a-dohc-vtec-with-internal-coil-obd1

4. Burton-Racing, "H22 H23 VTEC Distributor Honda Prelude 92-96 2.2L." URL: https://www.burton-racing.com/products/honda-prelude-92-96-2-2l-vtec-distributor

5. Swap Shop Racing, "NGK Ignition Coil OE Honda Prelude/ Accord H-Series" (Part #49046). URL: http://www.swapshopracing.com/contents/en-us/p2768.html

6. MAPerformance, "Hondata Coil Pack Retrofit | Honda B16/B18/D16/F22/H22 (CPR)." URL: https://www.maperformance.com/products/hondata-coil-pack-retrofit-honda-b16-b18-d16-f22-h22-cpr

7. Honda-Tech forum, "Bad coil? Checked Ohm resistance on primary and secondary," thread by RedRacerCivic, 2004. URL: https://honda-tech.com/forums/tech-misc-15/bad-coil-checked-ohm-resistance-primary-secondary-814146/

8. Honda-Tech / PreludePower forum, "Stock H22 ECU Ignition Values," thread by jonbar87, 2010. URL: https://www.preludepower.com/threads/stock-h22-ecu-ignition-values.329309/

9. Wikipedia, "Wasted spark system." URL: https://en.wikipedia.org/wiki/Wasted_spark_system

10. Honda-Tech forum, "Timing advance on 97-01 h22a4," thread by lakerschamp2000, 2007. URL: https://honda-tech.com/forums/honda-prelude-4/timing-advance-97-01-h22a4-1111002/

---

## Appendix

### Verification Methodology

Data was gathered from three tiers of sources:

1. **eCtune tuning documentation** (Blake Barr, Authorized Tuner): Provides the most detailed
   technical specifications for H-series ignition dwell times, current limits, and ramp slopes.
   These values come from direct ECU map extraction and tuning experience with real H22 vehicles.

2. **OEM parts catalogs** (HondaPartsNow, AIP Electronics, Burton-Racing): Provide definitive
   distributor part numbers, cross-references, and replacement options. Multiple aftermarket
   suppliers cross-reference the same OEM numbers, confirming authenticity.

3. **Community forums** (Honda-Tech, PreludePower, HP Academy): Provide practical testing data,
   advance curve mapping (jonbar87's Scanguage data), coil resistance testing procedures, and
   real-world failure mode documentation.

### Dwell Time Calculation Reference

For reference, the relationship between RPM, dwell time, and spark frequency in wasted-spark systems:

```
Time per revolution (ms) = 60,000 / RPM
Min. dwell per spark = Time per revolution / 2  (2 sparks per revolution in wasted spark)

At 8,200 RPM: 60,000 / 8,200 = 7.32 ms/rev → 3.66 ms min dwell
At 10,000 RPM: 60,000 / 10,000 = 6.00 ms/rev → 3.00 ms min dwell
```

If the ECU's minimum dwell requirement exceeds the available time between sparks, the coil will
not fully saturate, resulting in reduced spark energy. This is the fundamental limitation of
wasted-spark architecture at high RPM.

### Ignition System Component Location Reference

```
OBD1 (1992-1996):
  ┌─────────────────────────────────────┐
  │  Distributor (top of cylinder head)  │
  │  ├─ Internal coil (inside body)     │
  │  ├─ Ignition module (inside body)   │
  │  ├─ Distributor cap (top)           │
  │  └─ Rotor (inside, driven by shaft) │
  │                                     │
  │  Spark plug wires (4)               │
  │  ├─ #1 → Driver-side front          │
  │  ├─ #2 → Driver-side rear           │
  │  ├─ #3 → Passenger-side front       │
  │  └─ #4 → Passenger-side rear        │
  │                                     │
  │  CKP sensor (crank pulley end)      │
  └─────────────────────────────────────┘

OBD2 (1997-2001):
  ┌─────────────────────────────────────┐
  │  Coil Pack (replaces distributor)   │
  │  ├─ Single external unit            │
  │  ├─ Drives 4 plugs (2 pairs)        │
  │  └─ Wasted spark (1&4, 2&3)         │
  │                                     │
  │  Spark plug wires (4)               │
  │  ├─ Pair 1: Cyl 1 + Cyl 4           │
  │  └─ Pair 2: Cyl 2 + Cyl 3           │
  │                                     │
  │  CKP sensor (crank pulley end)      │
  │  CMP sensor (camshaft)              │
  └─────────────────────────────────────┘
```
