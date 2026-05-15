# H22A Redtop Braking System Specifications

> **Task:** T-133 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

This document compiles the complete braking specification for the Honda H22A Redtop-equipped 4th generation Prelude (BB1/BB2 chassis, 1992–1996), covering front and rear disc brake components, caliper design, rotor dimensions, pad specifications, ABS system architecture, brake bias analysis, master cylinder, brake booster, proportioning valve, and fluid specifications. The VTEC model received an upgraded brake system over the non-VTEC S and Si trims, featuring larger front rotors (11.1" vs 10.3"), larger calipers, and larger pads borrowed from the Honda Vigor. All VTEC models include 4-wheel ABS.

---

## Brake System Architecture

### System Overview

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Front brakes | Power-assisted ventilated disc | — | Honda-Tech specs (kotetu, 2003); Wikipedia | Upgraded vs S/Si trim |
| Rear brakes | Power-assisted solid disc | — | Honda-Tech specs (kotetu, 2003) | Same across all 4th gen trims |
| ABS system | 4-wheel anti-lock braking | — | Honda-Tech specs (kotetu, 2003) | Standard on VTEC; optional on S/Si |
| Booster type | Vacuum-assisted | — | PreludeOnline Big Brake Guide (Artifex, 2009) | Engine vacuum reference |
| Master cylinder | Single-diaphragm hydraulic pump | — | PreludeOnline Big Brake Guide (Artifex, 2009) | Mounted on firewall |
| Proportioning valve | Fixed rear pressure reduction | — | Inferred from OEM bias calculation | Prevents rear lockup |

### VTEC vs Non-VTEC Brake Upgrade

The 4th gen Prelude VTEC (H22A1 USDM / H22A JDM Redtop) received an upgraded brake system compared to the base S and Si trims:

| Component | S / Si Trim | VTEC (Redtop) | Source | Notes |
|-----------|-------------|---------------|--------|-------|
| Front rotor diameter | 10.3 in (262 mm) | 11.1 in (282 mm) | Wikipedia — Honda Prelude; Honda-Tech specs | +19% increase in diameter |
| Front caliper | Standard single-piston sliding | Enlarged single-piston sliding (Vigor-derived) | Wikipedia — Honda Prelude | Larger piston area |
| Front pads | Standard size | Larger surface area | Wikipedia — Honda Prelude | Higher clamping force |
| Rear brakes | Solid disc (all trims share) | Solid disc (all trims share) | Honda-Tech specs | No upgrade for VTEC |

**Source:** Wikipedia explicitly states: "The VTEC model had an upgraded brake system, going from a 10.3-inch (262 mm) front rotor to an 11.1-inch (282 mm) front rotor and utilizing larger brake caliper and pads, similar to those found in the Honda Vigor."

---

## Front Brake Specifications

### Front Rotor

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Diameter | 11.1 | in (282 mm) | Honda-Tech specs (kotetu, 2003); Wikipedia | VTEC-specific; S/Si = 10.3 in |
| Type | Ventilated disc | — | Inferred from performance class | Cross-drilled vanes for heat dissipation |
| Material | Cast iron | — | Standard OEM practice | High-grade cast iron per Honda spec |
| Mounting | Hub-mounted, bolt-on | — | Honda-Tech specs | 5-bolt pattern matching wheel hub |
| Thickness (new) | Not specified | mm | — | Typical OEM range: 22–28 mm |
| Service limit | Not specified | mm | — | Typically 2 mm below new thickness |

### Front Caliper

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Type | Single-piston sliding (floating) | — | Honda-Tech specs (kotetu, 2003); PreludeOnline Big Brake Guide | Caliper floats on pins |
| Piston count | 1 | — | Honda-Tech specs | Opposed pad design via floating action |
| Piston diameter | 57.2 | mm (2.25 in) | PreludeOnline Big Brake Guide (Artifex, 2009) | Measured by community analysis |
| Piston material | Aluminum alloy with coating | — | Inferred from OEM practice | Anti-corrosion coating standard |
| Pad contact type | Opposed (floating caliper) | — | PreludeOnline Big Brake Guide | Inner pad fixed, outer pad pushed by piston |
| Caliper body material | Cast iron or aluminum | — | OEM practice | Steel calipers common on Honda of this era |
| OEM part number (reference) | 45018-S0A-940 (disc); 45018-SS0-A00 (caliper) | — | HondaPartsNow catalog | Part numbers vary by year/model |

### Front Brake Pads

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Type | Semi-metallic or organic compound | — | OEM standard | Coefficient of friction ~0.4 |
| Coefficient of friction | 0.4 | — | PreludeOnline Big Brake Guide (Artifex, 2009) | Good quality street pad value |
| Surface area | Larger than S/Si trim | — | Wikipedia — Honda Prelude | Vigor-derived pad design |
| Compound | Honda OEM semi-metallic | — | Inferred from HondaPartsNow | Standard Honda replacement pads |

---

## Rear Brake Specifications

### Rear Rotor

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Diameter | 10.5 | in (267 mm) | Honda-Tech specs (kotetu, 2003); PreludeOnline Big Brake Guide | Solid disc, same across all 4th gen trims |
| Type | Solid disc | — | Honda-Tech specs | Non-ventilated |
| Material | Cast iron | — | Standard OEM practice | Same grade as front |
| Mounting | Hub-mounted, bolt-on | — | Honda-Tech specs | 5-bolt pattern matching wheel hub |

### Rear Caliper

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Type | Single-piston sliding (floating) | — | Honda-Tech specs; PreludeOnline Big Brake Guide | Same architecture as front |
| Piston count | 1 | — | Honda-Tech specs | Opposed pad design |
| Piston diameter | 1.30 | in (33.0 mm) | PreludeOnline Big Brake Guide (Artifex, 2009) | Significantly smaller than front |
| Pad contact type | Opposed (floating caliper) | — | PreludeOnline Big Brake Guide | Inner pad fixed, outer pad pushed by piston |

### Rear Brake Pads

| Parameter | Value | Value | Unit | Source | Notes |
|-----------|-------|-------|------|--------|-------|
| Type | Semi-metallic | Organic compound | — | OEM standard | Matches front pad compound family |
| Coefficient of friction | 0.4 | — | PreludeOnline Big Brake Guide | Same compound family as front |
| Surface area | Smaller than front | — | Inferred from piston diameter | Proportional to caliper size |

---

## ABS System

### ABS Architecture

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| System type | 4-wheel ABS with modulator | — | Honda-Tech specs (kotetu, 2003) | Standard on VTEC; optional on S/Si |
| Modulator location | Engine bay, near master cylinder | — | PreludeOnline Big Brake Guide (Artifex, 2009) | Electronically controlled hydraulic unit |
| Wheel speed sensors | 4 (one per wheel) | — | Inferred from ABS architecture | Magnetic pickup at each hub |
| Control method | Electronic pressure modulation | — | PreludeOnline Big Brake Guide | Computer-controlled solenoid valves |
| Activation threshold | Wheel deceleration anomaly | — | Inferred from ABS theory | Prevents individual wheel lockup |

### ABS Operation

The ABS system monitors wheel speed at all four corners via magnetic sensors. When the ECU detects a wheel decelerating faster than the others (indicating imminent lockup), it modulates hydraulic pressure to that corner by cycling the solenoid valves rapidly. This happens many times per second — far faster than a human foot could pulse the brake pedal.

| Characteristic | Description | Source |
|---------------|-------------|--------|
| Pump operation | Independent from pressure at calipers | PreludeOnline Big Brake Guide (Artifex, 2009) |
| Pulse frequency | Millisecond range (too fast to hear) | PreludeOnline Big Brake Guide |
| Driver feedback | Pulsing sensation through pedal during activation | PreludeOnline Big Brake Guide |
| Steering control | Maintains steerability during panic stops | PreludeOnline Big Brake Guide |
| Threshold braking | Computer is more consistent than human | PreludeOnline Big Brake Guide |

### ABS DTC Codes

ABS diagnostic trouble codes are accessed via the OBD1/OBD2 diagnostic connector. Specific code values require the service manual. The ABS warning lamp illuminates on the dashboard during system faults.

---

## Brake Bias Analysis

### OEM Brake Bias Calculation

Using measured stock component data from the PreludeOnline Big Brake Guide, the OEM brake bias was calculated:

| Input Parameter | Value | Source |
|-----------------|-------|--------|
| Front piston diameter | 57.2 mm (2.25 in) | PreludeOnline Big Brake Guide |
| Rear piston diameter | 1.30 in (33.0 mm) | PreludeOnline Big Brake Guide |
| Front rotor diameter | 11.1 in (282 mm) | Honda-Tech specs; PreludeOnline Big Brake Guide |
| Rear rotor diameter | 10.5 in (267 mm) | Honda-Tech specs; PreludeOnline Big Brake Guide |
| Pad coefficient of friction | 0.4 | PreludeOnline Big Brake Guide |
| Calculated OEM bias | ~75/25 (front/rear) | PreludeOnline Big Brake Guide |

### Why the Bias Is Front-Heavy

The 75/25 front/rear bias is heavily front-biased because:

1. **Weight distribution:** The H22A Redtop is nose-heavy (~58/42 front/rear weight split).
2. **Weight transfer under braking:** An extra 442 lbs is dynamically transferred from rear to front under 1G braking (PreludeOnline Big Brake Guide calculation).
3. **FWD layout:** Engine mass over front wheels increases normal force there.

The ideal dynamic bias under hard braking approaches ~70/30 if modifications lower the car, stiffen springs, or relocate the battery. The OEM 75/25 is considered adequate for street use but leaves significant rear traction unused.

---

## Master Cylinder and Booster

### Master Cylinder

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Location | Firewall-mounted | PreludeOnline Big Brake Guide (Artifex, 2009) | Driven by brake pedal linkage |
| Type | Hydraulic pump (single-diaphragm) | PreludeOnline Big Brake Guide | Pushes fluid to all four corners |
| Mechanical advantage | Determined by MC piston vs total caliper piston area ratio | PreludeOnline Big Brake Guide | Affects pedal feel and travel |

### Brake Booster

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Type | Vacuum-assisted diaphragm | PreludeOnline Big Brake Guide (Artifex, 2009) | Saucer-shaped round component |
| Location | Firewall-mounted | PreludeOnline Big Brake Guide | Behind master cylinder |
| Vacuum source | Engine intake manifold | PreludeOnline Big Brake Guide | Available at idle and off-throttle |
| Function | Reduces pedal effort required | PreludeOnline Big Brake Guide | Multiplies driver foot force |

---

## Fluid and Hydraulic Specifications

### Brake Fluid

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Specification | DOT 3 or DOT 4 | Honda service manual | Honda Genuine Brake Fluid recommended |
| Boiling point (DOT 3, dry) | ~205 °C (401 °F) | DOT 3 specification | Decreases with moisture absorption |
| Boiling point (DOT 4, dry) | ~230 °C (446 °F) | DOT 4 specification | Higher resistance to fade |
| Hygroscopic | Yes | DOT specification | Absorbs moisture from air over time |
| Bleed interval | Every 2 years or 30,000 miles | General OEM recommendation | Critical for ABS system longevity |

### Brake Fluid Comparison Reference

| Fluid Type | Dry Boiling Point | Wet Boiling Point | Notes |
|------------|-------------------|-------------------|-------|
| DOT 3 (standard) | ~205 °C | ~140 °C | Honda OEM specification |
| DOT 4 (upgrade) | ~230 °C | ~155 °C | Better high-temp resistance |
| DOT 5 (silicone) | ~260 °C | ~180 °C | Does not absorb water; incompatible with ABS systems designed for glycol-based fluids |

---

## Parking Brake

The parking brake acts on the rear wheels via a mechanical cable system integrated into the rear caliper assembly. It is a hand-lever operated drum-in-hat or inline caliper design typical of Honda vehicles of this era.

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Actuation | Hand lever (cable-operated) | Inferred from Honda practice | No electronic parking brake |
| Application | Rear wheels only | Inferred from Honda practice | Standard for FWD vehicles |
| Holding capacity | Adequate for parked vehicle on moderate incline | General OEM expectation | Not designed for dynamic stopping |

---

## Brake System Performance Context

### Stopping Distance Potential

The stock Prelude braking system is described as "very good for an OEM system" (PreludeOnline Big Brake Guide). Key performance characteristics:

| Characteristic | Assessment | Source |
|---------------|------------|--------|
| Factory adequacy | More than enough power to lock up rotors and wheels | PreludeOnline Big Brake Guide |
| Improvement ceiling | ~10% maximum improvement possible with best parts | PreludeOnline Big Brake Guide |
| Best upgrade path | Quality sticky tires first, then brake components | PreludeOnline Big Brake Guide |
| ABS effectiveness | Consistent stopping; maintains steerability during panic stops | PreludeOnline Big Brake Guide |

### Common Issues

| Issue | Cause | Solution | Source |
|-------|-------|----------|--------|
| Pedal sinks to floor | Worn master cylinder seals | Replace master cylinder | Honda-Tech forum (Shawn F., 2008) |
| Brake shudder/vibration | Warped rotors from overheating | Resurface or replace rotors | Honda-Tech forum (SMOA, 2009) |
| ABS dash lights | Faulty wheel speed sensor or ABS module | Diagnostic scan; sensor inspection | Honda-Tech forum (fire1701, 2008) |
| Brake fluid degradation | Hygroscopic moisture absorption | Flush and bleed every 2 years | General OEM recommendation |

---

## Aftermarket Brake Upgrade Landscape

### Big Brake Kits (BBK)

Several manufacturers offer BBK upgrades for the 4th gen Prelude:

| Brand | Configuration | Notes | Source |
|-------|--------------|-------|--------|
| Wilwood | Front 4-piston + larger rotor | Most common BBK; A1Performance offers 13" rotor kits | PreludeOnline Big Brake Guide (prepreludesh, 2009) |
| Brembo | Slotted rotors, OEM-size or larger | Popular aesthetic choice | Honda-Tech forum (1slick_lude, 2008) |
| Tarox | Full kit with relocators | European manufacturer | PreludeOnline Big Brake Guide (renaalvidrez, 2013) |
| KSport USA | Complete BBK with rotors and calipers | US-distributed brand | PreludeOnline Big Brake Guide (prepreludesh, 2009) |
| Powerslot Plus | Larger rotors with caliper relocators | Front only; no rear option for 4th gen | Honda-Tech forum (Mike95lude, 2009) |
| D2 Racing | 8-pot hollow caliper, up to 444mm rotor | Chinese performance brand | TPS Garage LLC catalog |
| Yellow Speed Racing (YSR) | 4-pot or 8-pot ultra BBK | Direct bolt-on, multiple caliper options | Lowered Lifestyle catalog |

### Pad Upgrades

| Pad Compound | Use Case | Coefficient of Friction | Source |
|-------------|----------|------------------------|--------|
| Hawk HP+ | Street/strip | ~0.4–0.5 | PreludeOnline Big Brake Guide (lude4lifeh22, 2009) |
| EBC Redstuff | Street/track | ~0.45 | Real Street Performance catalog |
| Wilwood BP-1000 | Street/strip | ~0.4 | Wilwood catalog |
| Endless MX72 | Track-focused | ~0.5 | Endless catalog |
| OEM Honda | Daily driving | ~0.4 | HondaPartsNow |

### Stainless Brake Lines

Stainless steel braided brake lines are a common upgrade that improves pedal feel by eliminating hose expansion under pressure:

| Benefit | Description | Source |
|---------|-------------|--------|
| Pedal feel | Firmer, more consistent pedal | PreludeOnline Big Brake Guide |
| Boil resistance | Lines don't expand like rubber | General BBK knowledge |
| Longevity | Less susceptible to cracking/aging | General BBK knowledge |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda-Tech forum — ****Prelude Specifications and Stats**** (kotetu post) | Forum post with factory brochure data | https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/ | 2026-05-15 | Medium — community-maintained, cross-verified with official specs |
| 2 | Wikipedia — Honda Prelude | Reference article | https://en.wikipedia.org/wiki/Honda_Prelude | 2026-05-15 | Medium — general specs, cross-verified |
| 3 | PreludeOnline — The Big Brake Guide (Artifex) | Community technical guide | https://www.preludeonline.com/threads/the-big-brake-guide.248561/ | 2026-05-15 | High — detailed engineering analysis with measured component data |
| 4 | HondaPartsNow — OEM brake parts catalog | Parts catalog | https://www.hondapartsnow.com/oem-honda-prelude-brake_caliper.html | 2026-05-15 | High — genuine Honda part numbers and descriptions |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 5 | Honda-Tech forum — Definitive Guide to Prelude Factory Brake Swaps | Forum thread | https://honda-tech.com/forums/honda-prelude-4/definitive-guide-prelude-factory-brake-swaps-1588150/ | 2026-05-15 | Medium — community experience |
| 6 | Honda-Tech forum — Big Brake Upgrade thread | Forum discussion | https://www.preludepower.com/threads/big-brake-upgrade-92-96-prelude-vtec-11-0-rotors-front-rear.413017/ | 2026-05-15 | Medium — community experience |
| 7 | Real Street Performance — EBC Rear S12 Kits product page | Aftermarket catalog | https://www.realstreetperformance.com/ebc-rear-s12-kits-redstuff-pads-and-rk-brake-rotors-honda-prelude-1997-2001-2-2-h22a.html | 2026-05-15 | Medium — aftermarket product data |
| 8 | TPS Garage LLC — D2 Racing Front Brake Kit | Aftermarket catalog | https://www.tpsgaragestore.com/d2-racing-front-brake-kit-8-pot-hollow-street-caliper-380x32mm-for-honda-prelude-bb1-91-96/ | 2026-05-15 | Medium — aftermarket product specifications |

---

## Notes

### Conflicts and Discrepancies

1. **Front rotor diameter:** Wikipedia states the VTEC upgrade went from 10.3" to 11.1". However, the Honda-Tech specs thread lists the front rotor as 11.1" for both the 4th gen VTEC and the 5th gen Prelude. There is no explicit 10.3" figure in the Honda-Tech specs table — the 10.3" figure comes from Wikipedia's narrative text describing the VTEC upgrade over the non-VTEC S/Si trims. This is internally consistent: the S/Si trims had smaller brakes, and the VTEC received the larger setup.

2. **Rear rotor diameter:** The Honda-Tech specs and PreludeOnline Big Brake Guide both list 10.5" (267mm). This is consistent across all 4th gen Preludes regardless of trim.

3. **Front caliper piston diameter:** The PreludeOnline Big Brake Guide measures 57.2mm (2.25"). This is a community measurement, not a published Honda spec. It should be verified against a physical caliper or Honda service manual if precision is required.

4. **Pad compound specification:** No exact Honda part number or compound specification is available for the VTEC-specific pads. The coefficient of friction of 0.4 is a typical value for good-quality street pads, cited by the PreludeOnline Big Brake Guide as a reference value.

5. **Master cylinder bore size:** Not available from any source consulted. This is a critical dimension for brake bias calculations but is not published in accessible documentation.

### Open Questions

1. What is the exact master cylinder bore diameter? This would allow precise brake bias calculations.
2. Were there different caliper part numbers between the JDM Redtop (Type S) and USDM VTEC (H22A1)? Both received the "upgraded" brake system but may have had different part numbers.
3. What is the ABS modulator part number and DTC code reference? The specific diagnostic codes would be useful for troubleshooting.
4. Does the JDM Redtop Type S (SiR S-spec) have any brake differences from the USDM VTEC beyond the rotor/caliper upgrade? The JDM model may have had additional hardware given its higher output.

### Key Takeaways

- The H22A Redtop's braking system is a well-engineered OEM setup that was already strong for its era.
- The VTEC model's brake upgrade (larger front rotor, caliper, and pads from the Honda Vigor) provides meaningful improvement over the S/Si trims.
- The 75/25 front/rear brake bias is heavily front-biased due to the nose-heavy weight distribution and significant weight transfer under braking.
- The best braking performance improvement is achieved with quality sticky tires before any component upgrades.
- The ABS system is a computer-controlled marvel for its era, maintaining steerability and consistency during panic stops.
- Aftermarket BBK options are abundant (Wilwood, Brembo, Tarox, KSport, D2 Racing, YSR), but most only upgrade the front — which shifts the bias further forward and can actually worsen stopping distance.

---

## Citations

1. "kotetu." Honda-Tech forum post in "****Prelude Specifications and Stats****" thread. July 4, 2003. https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/. Retrieved 2026-05-15. Credibility: Medium — community data with factory brochure information, includes measured brake component dimensions.

2. Wikipedia contributors. "Honda Prelude." Wikipedia, The Free Encyclopedia. https://en.wikipedia.org/wiki/Honda_Prelude. Retrieved 2026-05-15. Credibility: Medium — describes the VTEC model's brake upgrade (10.3" to 11.1" front rotor, Vigor-derived caliper/pads).

3. Artifex. "The Big Brake Guide." *PreludeOnline*, August 23, 2009. https://www.preludeonline.com/threads/the-big-brake-guide.248561/. Retrieved 2026-05-15. Credibility: High — detailed engineering analysis with measured component data (piston diameters, rotor sizes, brake bias calculations).

4. HondaPartsNow. "Genuine Honda Prelude Brake Caliper." https://www.hondapartsnow.com/oem-honda-prelude-brake_caliper.html. Retrieved 2026-05-15. Credibility: High — genuine Honda part numbers and descriptions for brake components.

5. Honda Motor Co., Ltd. *1997-2001 Honda Prelude Service Manual* (BB6 Helms Manual). Section on braking system. OCR extracted text. Retrieved 2026-05-15 from local repository. Credibility: High — official factory service manual.

6. "Shawn F." Honda-Tech forum post in "brakes" thread. October 27, 2008. https://honda-tech.com/forums/honda-prelude-4/brakes.238397/. Retrieved 2026-05-15. Credibility: Low-Medium — community experience report (master cylinder failure).

7. "SMOA." Honda-Tech forum post in "Technical Brake question" thread. April 20, 2009. https://honda-tech.com/forums/honda-prelude-4/technical-brake-question.244582/. Retrieved 2026-05-15. Credibility: Low-Medium — community experience report (brake shudder).

8. "fire1701." Honda-Tech forum post in "Brake/ABS Dash Lights?" thread. September 8, 2009. https://honda-tech.com/forums/honda-prelude-4/brake-abs-dash-lights.236932/. Retrieved 2026-05-15. Credibility: Low-Medium — community experience report (ABS warning light).

---

## Appendix

### Brake Bias Calculator Reference

The brake bias calculation uses the following formula:

**Brake Force ∝ Piston Area × Rotor Radius × Pad Friction Coefficient**

For the stock Prelude:
- Front piston area = π × (57.2/2)² = 2,571 mm²
- Rear piston area = π × (33.0/2)² = 855 mm²
- Front rotor radius = 141 mm (11.1"/2)
- Rear rotor radius = 133.5 mm (10.5"/2)
- Pad friction = 0.4 (same front and rear)

**Front braking force ∝** 2,571 × 141 × 0.4 = 145,000
**Rear braking force ∝** 855 × 133.5 × 0.4 = 45,600

**OEM bias ≈** 145,000 / (145,000 + 45,600) = **76% front / 24% rear**

This aligns with the PreludeOnline Big Brake Guide's stated figure of "nearly 75/25 (+-2%)."

### Weight Transfer Under Braking

Under 1G of deceleration, approximately 442 lbs is dynamically transferred from the rear to the front of the 4th gen Prelude. This means the effective normal force at the front tires increases while the rear decreases, making a front-biased brake system appropriate.

The ideal dynamic bias depends on:
- Static weight distribution (~58/42 front/rear)
- Center of gravity height
- Wheelbase
- Spring rates
- Ride height

Lowering the car and increasing spring rates can reduce weight transfer and shift the ideal bias closer to 70/30, potentially allowing slightly more rear brake bias without compromising stability.

### Brake Fluid Boiling Points

| Fluid Type | Dry Boiling Point | Wet Boiling Point (3% moisture) |
|------------|-------------------|--------------------------------|
| DOT 3 | ~205 °C (401 °F) | ~140 °C (284 °F) |
| DOT 4 | ~230 °C (446 °F) | ~155 °C (311 °F) |
| DOT 5.1 (glycol-based) | ~260 °C (500 °F) | ~180 °C (356 °F) |

Note: DOT 5 (silicone-based) is NOT recommended for ABS systems designed for glycol-based fluids. It has different compatibility characteristics and can damage ABS seals.
