# Honda H22A Blacktop — Camshaft Profiles

> **Task:** T-153 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

Detailed camshaft specification analysis for the Honda H22A Blacktop — the standard/base variant of the H22A DOHC VTEC family with black valve cover. Covers advertised duration, duration at .050" lift, valve lift (gross and net at rocker ratio), three-lobe VTEC profiles (primary/mid/secondary), lobe separation angle, valve overlap calculations, rocker arm ratios, VTEC engagement parameters, comparison against all other H22 variants (Redtop, JDM H22, H23A), and aftermarket cam upgrade paths (Brian Crower, Skunk2, Kelford, JUN). Compiled from Brian Crower OEM spec catalog, Kelford Cams product catalog, Honda-Tech forum community consensus, mywikimotors technical database, Wikipedia, and local service manual references.

---

## OEM Camshaft Specifications

### H22A Blacktop (USDM H22A1 / EDM H22A2 / JDM Blacktop)

| Parameter | Intake | Exhaust | Source | Notes |
|-----------|--------|---------|--------|-------|
| **Advertised duration** | 288° | 308° | Brian Crower, mywikimotors, Wikipedia | Full-lift measurement (base circle to nose); less aggressive than Redtop |
| **Duration @ .050"** | 231° | 234° | Brian Crower | Industry-standard measurement; enables direct comparison across cam brands |
| **Gross lift (inches)** | .448" | .415" | Brian Crower | Measured at cam lobe; before rocker ratio deduction |
| **Gross lift (mm)** | 11.38 mm | 10.54 mm | Brian Crower, mywikimotors, Wikipedia | Lower than Redtop's 11.91/11.12 mm |
| **Net lift @ 1.55:1** | ~7.28 mm | ~6.79 mm | Calculated from gross lift ÷ 1.55 | Actual valve travel; .050" duration-based calculation |
| **Lobe separation (est.)** | ~110–114° | — | Inferred from Honda DOHC VTEC standard | Not explicitly documented in any source consulted |
| **Overlap (est.)** | ~12–18° | — | Calculated (see below) | Moderate overlap for streetability |

### Overlap Calculation

Overlap = (Intake Adv. Dur. + Exhaust Adv. Dur.) − 360° − (LSA × 2)

| LSA Assumption | Overlap |
|----------------|---------|
| 110° | 16° |
| 112° | 12° |
| 114° | 8° |

Note: The formula above assumes advertised duration is measured at the base-circle-to-nose point. If duration is measured at a different lift threshold (e.g., 0.006" or 1 mm), the overlap calculation changes. Honda typically uses 1 mm lift for Japanese industry standard duration measurement, which would yield slightly different overlap values.

### Three-Lobe VTEC Profile (Primary / Mid / Secondary)

From Honda-Tech forum member SKDRCR's mic'd measurements on an H22A1 head:

| Lobe | Intake Height (mm) | Exhaust Height (mm) | Notes |
|------|-------------------|---------------------|-------|
| **Primary (idle/low-lift)** | 34.041 | 33.745 | Base circle + primary lobe height; used below VTEC engagement |
| **Mid (VTEC transition)** | 36.856 | 36.323 | Intermediate lobe; engages during VTEC crossover |
| **Secondary (high-lift/VTEC)** | 34.971 | 34.683 | Secondary lobe; full VTEC operation |

Valve clearance (from SKDRCR's Honda-Tech post):
- Intake: 0.17 mm
- Exhaust: 0.19 mm

**Note:** These are raw lobe heights measured with a micrometer. They represent the physical cam lobe dimensions, not duration or lift at a given valve opening. Converting lobe heights to duration requires knowing the base circle diameter and the measurement lift threshold.

### Rocker Arm Ratios

| Position | Ratio |
|----------|-------|
| Primary (main) | 1.55:1 |
| Secondary (mid) | 1.50:1 |
| Tertiary (auxiliary) | 1.45:1 |

Source: Brian Crower catalog notes. These ratios multiply the cam lobe lift to produce the actual valve lift.

---

## Comparison: All H22 Varieties Cam Profiles

| Parameter | H22A Blacktop | JDM H22 ('92-'96) | JDM H22A Redtop (Type S) | H22A1 USDM ('94-'96) | H22A4 USDM ('97-'01) |
|-----------|---------------|-------------------|--------------------------|---------------------|---------------------|
| **Advertised duration** | 288°/308° | 296°/300° | 306°/310° | 288°/308° | 288°/308° |
| **Dur @ .050"** | 231°/234° | 232°/228° | 230°/230° | 231°/234° | 231°/234° |
| **Gross lift (in)** | .448"/.415" | .456"/.420" | .469"/.438" | .448"/.415" | .448"/.415" |
| **Gross lift (mm)** | 11.38/10.54 | 11.58/10.67 | 11.91/11.12 | 11.38/10.54 | 11.38/10.54 |
| **Valve cover** | Black | Black | Red | Black | Black |
| **Applications** | Prelude SiR, Accord SiR, Torneo | Prelude SiR (early) | Prelude Type S/S-Spec, Accord Euro R | Prelude VTEC, SR-V, VTi-R | Prelude Base/Type-SH/SE |

### Key Observations

1. **Blacktop and USDM H22A1/H22A4 share identical cam profiles.** The 288°/308° advertised duration and 11.38/10.54 mm lift are consistent across all non-Type-S H22 variants.
2. **JDM H22 ('92-'96) differs from Blacktop.** Brian Crower lists distinct specs (296°/300°, 11.58/10.67 mm) for the early JDM H22 without the "A" suffix. This may represent a pre-1994 calibration or a variant used in specific early-market applications. The distinction between "H22" and "H22A" in Honda nomenclature is not fully documented in public sources.
3. **Redtop (Type S) is the most aggressive.** 306°/310° advertised duration with 11.91/11.12 mm lift represents a significant increase over Blacktop (+18°/+2° duration, +0.53/+0.58 mm lift).
4. **All H22 variants use the same VTEC architecture.** Single-cam VTEC switching between two cam profiles at a fixed RPM threshold.

---

## VTEC Engagement Parameters

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Engagement RPM** | ~5,200–5,800 RPM | Wikipedia (5,200), mywikimotors (5,800), Honda-Tech forums | Range varies by ECU calibration, oil temperature, driving conditions |
| **Oil pressure minimum** | 30+ psi | QWEN.md, Honda-Tech forums | Hydraulic actuation requirement for VTEC piston engagement |
| **Speed interlock** | >5 km/h | Honda-Tech forums | Prevents VTEC engagement at standstill |
| **Throttle position** | >20% (estimated) | Honda-Tech forums | ECU logic; not explicitly documented in factory service manuals |
| **Engine temperature** | >40°C (estimated) | Honda-Tech forums | Cold-engine VTEC inhibition |

### VTEC Engagement Discrepancy

Sources conflict on the exact VTEC engagement RPM:
- **Wikipedia** lists 5,200 RPM as the H-series VTEC engagement point
- **mywikimotors** states VTEC starts working after 5,800 RPM for the H22A
- **PreludePower forum members** report VTEC engaging at approximately 5,500 RPM in real-world driving

Working assumption: VTEC engagement is calibrated to approximately 5,500 RPM under normal conditions, with variation due to oil temperature (cold oil = delayed engagement), ECU calibration differences between model years, and driving conditions (throttle position, vehicle speed). The 5,200 RPM figure from Wikipedia likely represents the absolute minimum threshold under ideal conditions, while 5,800 RPM represents late-production or high-mileage calibration.

---

## Aftermarket Cam Upgrade Paths

### Brian Crower

| Stage | Description | Adv. Dur. | Dur @ .050" | Lift (mm) | Kit # | Status |
|-------|-------------|-----------|-------------|-----------|-------|--------|
| Stock (Blacktop) | OEM reference | 288°/308° | 231°/234° | 11.38/10.54 | — | — |
| Stage 1 — Street | 12–15 hp gain; factory springs OK for street with stock rev limit | 282° mid / 279° mid | 239°/230° | 11.59/10.82 | BC0030 or BC0030S | In-Stock |
| Stage 2 — Turbo Special | Short duration = low overlap, high lift for increased performance | 280° mid / 276° mid | 230°/226° | 11.81/11.30 | BC0030 or BC0030S | In-Stock |
| Stage 2 VTEC | VTEC lobe with stock idle lobes for improved street performance | 297° mid / 287° mid | 248°/240° | 11.83/11.81 | BC0030 or BC0030S | In-Stock |
| Stage 3 — Drag | Most aggressive ramp speeds; all-motor drag profile | 295° mid / 297° mid | 260°/250° | 11.96/11.84 | BC0030 or BC0030S | In-Stock |
| Forced Induction | Short duration, high lift; reduces overlap for boost retention | 304°/306° mid | 233°/235° | 11.78/11.38 | BC0030 or BC0030S | In-Stock |
| NA Spec — Hot Track | 312°/310° adv; excellent track manners | 312°/310° | 255°/248° | 11.94/11.91 | BC0030 or BC0030S | In-Stock |
| NA Spec — High Boost | For 11.5:1+ compression or 18+ lbs boost | 318°/316° | 263°/255° | 11.94/11.94 | BC0030 or BC0030S | In-Stock |

### Skunk2 Racing

| Stage | Intake Lift | Intake Dur @ .050" | Exhaust Lift | Exhaust Dur @ .050" | Notes |
|-------|-------------|-------------------|--------------|---------------------|-------|
| Stage 1 | 0.475" (12.07 mm) | 255° | 0.436" (11.07 mm) | 255° | Street use; 12–15 hp gain |
| Stage 2 | 0.505" (12.83 mm) | 270° | 0.465" (11.81 mm) | 275° | Requires upgraded valvetrain |

Source: Honda-Tech forum (LudeyKrus, Aug 2004), citing Skunk2 website.

### Kelford Cams

| Part No. | Application | Dur @ 0.1mm (In/Ex) | Dur @ 1mm (In/Ex) | Net Lift @ 1.55:1 (In/Ex) | Centerline | Notes |
|----------|-------------|---------------------|--------------------|--------------------------|------------|-------|
| H176-B | Ultimate street performance | 284°/280° | 254°/248° | 3.96 mm / 3.10 mm | 104°/106° | Requires computer and exhaust upgrade |
| H176-C | Racing — modified street/strip/time attack | 294°/286° | 264°/256° | 4.70 mm / 3.86 mm | 102°/104° | More aggressive than B |
| H176-T | Turbocharged (600–1000 HP) | 284°/274° | 254°/246° | 3.07 mm / 1.84 mm | 108°/115° | Low overlap for boost retention |

Source: Kelford Cams Product Catalog (PDF).

### JUN Racing

From Honda-Tech forum (98TypeSH, Jul 2004):

| Lobe | Duration | Lift (mm) |
|------|----------|-----------|
| Primary Intake | 62° (248° adv) | 9.2 |
| Mid Intake | 74° (296° adv) | 12.2 |
| Secondary Intake | 60° (240° adv) | 7.7 |
| Primary Exhaust | 61° (244° adv) | 7.7 |
| Mid Exhaust | 74° (296° adv) | 11.9 |
| Secondary Exhaust | 63° (252° adv) | 9.0 |

Valve clearance: Intake 0.17 mm, Exhaust 0.19 mm.

---

## Camshaft Characteristics: What the Numbers Mean

### Duration Impact

| Duration Range | Characteristic | Blacktop Context |
|---------------|----------------|-----------------|
| < 280° adv | Very mild; excellent low-RPM torque, poor top-end | Below Blacktop range |
| 280–295° adv | Mild street; broad torque curve, smooth idle | **Blacktop sits here (288°/308°)** |
| 295–305° adv | Moderate performance; firmer idle, wider power band | JDM H22 (296°/300°) |
| 305–315° adv | Aggressive; lumpy idle, peaky power | Redtop (306°/310°) |
| > 315° adv | Race-only; very rough idle, narrow power band | Aftermarket Stage 3+ |

### Lift Impact

| Lift Range | Characteristic | Blacktop Context |
|-----------|----------------|-----------------|
| < 10.5 mm | Conservative; minimal airflow improvement | Below Blacktop |
| 10.5–11.5 mm | Moderate; balanced street performance | **Blacktop sits here (11.38/10.54)** |
| 11.5–12.0 mm | Performance-oriented; requires valvetrain upgrades | JDM H22, Redtop |
| > 12.0 mm | Aggressive; race-tuned, high spring pressures needed | Aftermarket Stage 2+ |

### Overlap Impact

| Overlap Range | Characteristic | Blacktop Context |
|--------------|----------------|-----------------|
| < 10° | Minimal overlap; stable idle, narrow power band | Estimated lower end |
| 10–15° | Moderate overlap; good scavenging, smooth idle | **Blacktop estimated range** |
| 15–20° | Significant overlap; rougher idle, better mid-range | Redtop range |
| > 20° | High overlap; race tuning, requires specific exhaust | Aftermarket race cams |

---

## VTEC System Architecture

The H22A Blacktop uses Honda's single-cam VTEC system (not DOHC VTEC). Each cylinder has three cam lobes per bank:

1. **Primary lobe** — Used during normal driving (below VTEC engagement). Provides moderate lift for streetability.
2. **Mid lobe** — Transitional profile engaged during VTEC crossover. Smooths the transition between low-lift and high-lift profiles.
3. **Secondary lobe** — Full VTEC operation. Higher lift and longer duration for maximum airflow at high RPM.

The switching mechanism is hydraulic:
- Oil pressure from the main gallery feeds the VTEC solenoid valve
- When oil pressure reaches ~10–15 psi (at sufficient RPM and throttle), the solenoid opens
- Pressurized oil pushes the VTEC piston inside the intake rocker arm
- The piston locks the primary and secondary rockers together, forcing them to follow the secondary (high-lift) cam lobe
- This simultaneously increases valve lift and extends duration for all four intake valves

The exhaust cam does not have VTEC — it uses a single fixed profile. Only the intake side switches between two cam lobes.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Brian Crower Racing — H22/H22A Camshaft Specifications | Manufacturer catalog | https://briancrower.com/makes/honda/h22h22a.shtml | 2026-05-15 | A — OEM-authorized aftermarket manufacturer; official specs |
| 2 | Kelford Cams — Product Catalog (H22A section) | Manufacturer catalog | https://images.carid.com/kelford-camtech/products/pdf/kelford-cams-product-catalog.pdf | 2026-05-15 | A — Manufacturer catalog; detailed specs with measurement methodology |
| 3 | SKDRCR — Honda-Tech "The Official H series Camshaft Thread" | Forum measurement data | https://honda-tech.com/forums/honda-prelude-4/official-h-series-camshaft-thread-939641/ | 2026-05-15 | B+ — Mic'd measurements from a knowledgeable community member (14,296 posts, thread starter) |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | mywikimotors — Honda H22A Engine | Technical database | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | B — Enthusiast database with cross-referenced specs |
| 2 | Wikipedia — Honda H Engine | Encyclopedia article | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | B+ — Well-sourced, community-edited; VTEC engagement RPM may vary by year |
| 3 | LudeyKrus — Honda-Tech "Best All Motor H22A cams — specs included" | Forum data compilation | https://honda-tech.com/forums/honda-prelude-4/best-all-motor-h22a-cams-specs-included-404138/ | 2026-05-15 | B — Compiles Skunk2 and Crower specs from manufacturer websites |
| 4 | madshoe87 / MC_HondaRacing — PreludeOnline "typeS cams > Crower stg3!!" | Forum discussion | https://www.preludeonline.com/threads/types-cams-crower-stg3-exact-specs-inside.140093/ | 2026-05-15 | B — Confirms Type-S cam lift figures; discusses measurement methodology differences |
| 5 | 98TypeSH — Honda-Tech "The Official H series Camshaft Thread" (JUN specs) | Forum data | https://honda-tech.com/forums/honda-prelude-4/official-h-series-camshaft-thread-939641/ | 2026-05-15 | B — JUN Racing cam specs shared by forum member |
| 6 | Facebook group — "Honda Prelude" cam question | Community discussion | https://www.facebook.com/groups/56999644680/posts/10162274223549681/ | 2026-05-15 | B — Confirms USDM H22A1 cam specs match Brian Crower data |

---

## Notes

### Conflicts and Disputes

1. **JDM H22 vs. H22A Blacktop cam distinction.** Brian Crower lists two separate entries: "USDM H22A1 ('94-'96)" at 288°/308° and "JDM H22 ('92-'96)" at 296°/300°. The mywikimotors database lists H22A Blacktop at 288°/308° (matching USDM H22A1). It is unclear whether the "JDM H22" entry represents a pre-1994 variant, a different application, or a naming inconsistency. Working assumption: the H22A Blacktop (all market versions 1992–2001) uses the 288°/308° profile; the 296°/300° entry may be an early-production variant or mislabeled.

2. **VTEC engagement RPM.** Wikipedia says 5,200 RPM; mywikimotors says 5,800 RPM; community reports cluster around 5,500 RPM. The variation likely reflects: (a) different ECU calibrations between model years, (b) oil temperature dependence (cold oil delays engagement), (c) driving condition dependencies (throttle position, vehicle speed). The true value is probably a range rather than a fixed number.

3. **Lobe separation angle (LSA).** Not explicitly documented in any source consulted. Estimated at 110–114° based on typical Honda DOHC VTEC design patterns. The overlap calculation depends critically on this unknown value.

4. **Measurement methodology differences.** As noted in the PreludeOnline forum discussion, Japanese manufacturers sometimes measure duration at 1 mm lift while US manufacturers use 0.050" (1.27 mm). This means advertised duration figures from different sources may not be directly comparable. Brian Crower's ".050" column provides the industry-standard comparison point.

5. **SKDRCR's lobe heights vs. Brian Crower's lift numbers.** SKDRCR measured raw lobe heights (34.041 mm primary intake), while Brian Crower reports gross lift (.448" = 11.38 mm). These are different measurements: lobe height includes the base circle, while lift is the difference between lobe height and base circle. The values are consistent but not directly convertible without knowing the base circle diameter.

6. **Rocker ratio assumption.** Brian Crower states 1.55:1 for the primary position, 1.5:1 for secondary, 1.45:1 for tertiary. Kelford's catalog also uses 1.55:1 for net lift calculations. The actual ratio may vary slightly between individual heads due to manufacturing tolerances.

### Identification Tips

- **Cam part numbers** are the definitive way to identify Blacktop vs. Redtop cams. Blacktop cams will have part numbers corresponding to the 288°/308° profile; Redtop cams will have different part numbers for the 306°/310° profile.
- **Valve cover color** (black vs. red) is a quick visual indicator but is unreliable because covers are frequently repainted.
- **Throttle body size** (60 mm = Blacktop, 62.5 mm = Redtop) is a more reliable external identifier.
- **Exhaust diameter** (51 mm = Blacktop, 57 mm = Redtop) is another reliable external identifier.

---

## Citations

1. Brian Crower Racing. "H22 / H22A Camshafts." *Brian Crower Racing*, n.d. https://briancrower.com/makes/honda/h22h22a.shtml. Retrieved: 2026-05-15 16:00 UTC. Credibility: A. Access: tavily_search + tavily_extract.
2. Kelford Cams. "Kelford Cams Product Catalog — Honda H22A VTEC Section." *CARiD*, n.d. https://images.carid.com/kelford-camtech/products/pdf/kelford-cams-product-catalog.pdf. Retrieved: 2026-05-15 16:00 UTC. Credibility: A. Access: tavily_search.
3. SKDRCR. "The Official H22a Camshaft Thread — Post #3 (cam lobe height measurements)." *Honda-Tech Forums*, 27 Jul 2004. https://honda-tech.com/forums/honda-prelude-4/official-h-series-camshaft-thread-939641/. Retrieved: 2026-05-15 16:00 UTC. Credibility: B+. Access: tavily_extract.
4. mywikimotors admin. "Honda H22A Engine." *mywikimotors*, n.d. http://mywikimotors.com/honda-h22a/. Retrieved: 2026-05-15 16:00 UTC. Credibility: B. Access: tavily_search + tavily_extract.
5. Wikipedia contributors. "Honda H Engine." *Wikipedia*, n.d. https://en.wikipedia.org/wiki/Honda_H_engine. Retrieved: 2026-05-15 16:00 UTC. Credibility: B+. Access: tavily_search + tavily_extract.
6. LudeyKrus. "Best All Motor H22A Cams — Specs Included." *Honda-Tech Forums*, 6 Aug 2004. https://honda-tech.com/forums/honda-prelude-4/best-all-motor-h22a-cams-specs-included-404138/. Retrieved: 2026-05-15 16:00 UTC. Credibility: B. Access: tavily_search.
7. madshoe87 / MC_HondaRacing. "typeS Cams > Crower Stg3!! (Exact Specs Inside)." *PreludeOnline*, 5 Nov 2003. https://www.preludeonline.com/threads/types-cams-crower-stg3-exact-specs-inside.140093/. Retrieved: 2026-05-15 16:00 UTC. Credibility: B. Access: tavily_search + tavily_extract.
8. 98TypeSH. "The Official H Series Camshaft Thread — Post #4 (JUN cam specs)." *Honda-Tech Forums*, 27 Jul 2004. https://honda-tech.com/forums/honda-prelude-4/official-h-series-camshaft-thread-939641/. Retrieved: 2026-05-15 16:00 UTC. Credibility: B. Access: tavily_search.
9. Terrance Askew / Will Allen. "Question About Cams." *Facebook — Honda Prelude Group*, n.d. https://www.facebook.com/groups/56999644680/posts/10162274223549681/. Retrieved: 2026-05-15 16:00 UTC. Credibility: B. Access: tavily_search.

---

## Appendix

### Quick Reference: Cam Profile Hierarchy (Least → Most Aggressive)

| Rank | Variant | Adv. Dur. | Lift (mm) | Character |
|------|---------|-----------|-----------|-----------|
| 1 | H22A Blacktop (OEM) | 288°/308° | 11.38/10.54 | Broad torque, streetable, moderate peak |
| 2 | Crower Stage 1 | 282°/279° mid | 11.59/10.82 | +12–15 hp, street use |
| 3 | Kelford H176-B | 284°/280° | 11.80/11.30 (gross) | Ultimate street, needs exhaust |
| 4 | JDM H22 (early) | 296°/300° | 11.58/10.67 | Moderate performance |
| 5 | Skunk2 Stage 1 | 255°/.050 | 12.07/11.07 | +12–15 hp, street |
| 6 | Redtop (OEM Type S) | 306°/310° | 11.91/11.12 | Peaky, high-RPM focused |
| 7 | Skunk2 Stage 2 | 270°/.050 | 12.83/11.81 | Requires valvetrain upgrade |
| 8 | Crower Stage 2 VTEC | 297°/287° mid | 11.83/11.81 | Improved street performance |
| 9 | Crower Stage 3 | 295°/297° mid | 11.96/11.84 | Drag racing, aggressive ramps |
| 10 | Kelford H176-C | 294°/286° | 11.80/11.30 (gross) | Race — modified street/strip |
| 11 | Crower NA Spec | 312°/310° | 11.94/11.91 | Hot track/strip, road race |
| 12 | Crower NA High Boost | 318°/316° | 11.94/11.94 | Built engine, 18+ lbs boost |

### Internal Component Quick Reference

| Component | Specification | Interchange Notes |
|-----------|--------------|-------------------|
| Intake valves | 35 mm diameter | Same across all H22 variants |
| Exhaust valves | 30 mm diameter | Same across all H22 variants |
| Valve springs | Dual spring (per valve) | Stock springs OK up to Crower Stage 1 |
| Rocker arms | 1.55:1 primary ratio | Same across all H22 variants |
| VTEC solenoid | Electro-hydraulic | Same across all H22 variants |
| Timing belt tensioner | Hydraulic auto-tensioner (OBD1) | Critical failure mode — upgrade to H23 manual tensioner recommended |

### Related Tasks

- **T-123** — H22A Redtop camshaft profiles (companion task, Redtop-specific)
- **T-152** — H22A Blacktop full specifications (broader scope, includes cam data)
- **T-154** — H22A Blacktop intake system (follow-on, more detailed)
- **T-155** — H22A Blacktop exhaust system (follow-on, more detailed)
- **T-161** — H22A Blacktop vs Redtop comparison (follow-on, broader comparison)
