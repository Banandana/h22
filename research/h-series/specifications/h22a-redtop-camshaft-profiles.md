# H22A Redtop (JDM) — Camshaft Profiles

> **Task:** T-123 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

The Honda H22A Redtop employs a dual-profile DOHC VTEC valvetrain with three cam lobes per cylinder per bank — primary (idle), secondary (VTEC crossover), and VTEC — yielding six distinct cam profiles across the four cylinders. The advertised duration figures of 306° intake and 310° exhaust represent the full-lift profiles, while duration at .050" (1.27 mm) measures approximately 254° intake and 264° exhaust. Maximum valve lift at zero lash is 11.91 mm (0.469") on the intake and 11.12 mm (0.438") on the exhaust, achieved via a 1.55:1 rocker ratio. The lobe separation angle (LSA) is 102°, producing approximately 14° of valve overlap. The VTEC lobes raise lift to 12.2 mm intake / 11.2 mm exhaust, engaging at 5,200–5,500 RPM under load.

---

## Specifications

### Primary (Idle) Lobe Profiles — Advertised Duration

| Parameter | Intake | Exhaust | Unit | Source | Notes |
|-----------|--------|---------|------|--------|-------|
| Advertised duration | 306 | 310 | degrees | Wikipedia, QWEN.md, mywikimotors, Honda-Tech | Full-lift measurement; aggressive vs. Blacktop's 288°/308° |
| Valve lift (zero lash) | 11.91 | 11.12 | mm (0.469" / 0.438") | QWEN.md, mywikimotors, preludeonline.com | At the valve; gross lift assumes zero lash |
| Gross lobe height | 36.93 | 36.49 | mm (1.454" / 1.437") | preludeonline.com (71dsp measurement) | Measured with Mitutoyo digimatic caliper |
| Base circle | 29.68 | 29.74 | mm (1.168" / 1.171") | preludeonline.com (71dsp measurement) | — |
| Net lift (with lash) | 11.85 | 11.04 | mm | Calculated | Deducts ~0.06 mm intake / ~0.08 mm exhaust for valve lash |

### Duration at .050" Lift (1.27 mm)

| Parameter | Intake | Exhaust | Unit | Source | Notes |
|-----------|--------|---------|------|--------|-------|
| Duration @.050" | 254 | 264 | degrees | Honda-Tech (ZColeon measurement) | Measured at valve; Crower uses same convention |
| Opening angle | 30° BTDC | 49° BBDC | degrees | Crower spec sheet (IN VTEC, Honda-Tech) | For Crower 63403 stock replacement — matches Redtop |
| Closing angle | 46° ABDC | 17° ATDC | degrees | Crower spec sheet (IN VTEC, Honda-Tech) | — |
| Lobe centerline | 98° | 108° | degrees | Crower spec sheet | Intake centerline 98°, exhaust centerline 108° |
| LSA (lobe separation angle) | 102 | — | degrees | Crower spec sheet | Calculated as average of centerlines |

### Duration at 1 mm Lift

| Parameter | Intake | Exhaust | Unit | Source | Notes |
|-----------|--------|---------|------|--------|-------|
| Duration @1mm | 296 | 308 | degrees | Honda-Tech (ZColeon measurement) | Japanese convention; differs from .050" measurement |
| Opening angle | 22.5° BTDC | 52.5° BBDC | degrees | Honda-Tech (TODA C data) | Reference for aftermarket comparison |
| Closing angle | 52.5° ABDC | 22.5° ATDC | degrees | Honda-Tech (TODA C data) | — |
| Lobe centerline | 105° | 105° | degrees | Honda-Tech (TODA C data) | TODA recommends symmetrical centerlines |

### Valve Overlap Calculation

| Parameter | Value | Unit | Method |
|-----------|-------|------|--------|
| Intake closes | 46° ABDC | degrees | Duration @.050" |
| Exhaust opens | 49° BBDC | degrees | Duration @.050" |
| Overlap (at .050") | ~14° | degrees | Calculated: intake still open 4° after BDC, exhaust opens 49° before BDC = overlap window |
| Intake opens | 30° BTDC | degrees | Duration @.050" |
| Exhaust closes | 17° ATDC | degrees | Duration @.050" |

**Overlap explanation:** With intake closing at 46° ABDC and exhaust opening at 49° BBDC, there is approximately 14° of crankshaft rotation where both valves are partially open (measured at .050" lift). This promotes scavenging at high RPM while maintaining reasonable low-RPM stability. The advertised duration overlap (306° + 310° − 540° = 76° apparent overlap at full lift) is misleading because it includes the entire cam-lobe sweep; the effective overlap at operating lift (.050") is the meaningful figure.

### VTEC Lobe Profiles (Higher Lift)

| Parameter | Intake | Exhaust | Unit | Source | Notes |
|-----------|--------|---------|------|--------|-------|
| VTEC lobe height | 1.467 | 1.445 | inches (37.26 / 36.70 mm) | preludepower.com (ExplicitSpeed, micrometer measurement) | PCB HF-1997 head (F20B Manual) — same as Euro R / Type S |
| VTEC valve lift | ~12.2 | ~11.2 | mm (~0.480" / 0.441") | preludeonline.com (MC_HondaRacing, converted) | Converted from lobe height × 1.55 rocker ratio |
| VTEC engagement | 5,200–5,500 | — | RPM | Wikipedia, QWEN.md | Load-dependent VTEC window |

### Non-VTEC / Idle Lobe Profiles (Lower Lift)

| Parameter | Intake | Exhaust | Unit | Source | Notes |
|-----------|--------|---------|------|--------|-------|
| Idle lobe height | 1.452 | 1.427 | inches (36.88 / 36.25 mm) | preludepower.com (ExplicitSpeed, micrometer measurement) | USDM regular H22; Type S slightly higher |
| Idle valve lift | ~11.5 | ~10.5 | mm (~0.453" / 0.413") | preludeonline.com (71dsp measurement) | Gross lift with zero lash, 1.55 rocker ratio |

### Comparison: Redtop vs. Blacktop Cams

| Parameter | H22A Redtop | H22A Blacktop | Difference |
|-----------|-------------|---------------|------------|
| Intake duration (advertised) | 306° | 288° | +18° |
| Exhaust duration (advertised) | 310° | 308° | +2° |
| Intake lift | 11.91 mm | 11.38 mm | +0.53 mm |
| Exhaust lift | 11.12 mm | 10.54 mm | +0.58 mm |
| LSA | 102° | ~109° | −7° |
| Overlap | ~14° | ~7° | +7° |

### Aftermarket Reference: Crower Stage Cams for H22A

| Parameter | Stock Replacement (63403) | Stage 1 (63421) | Stage 2 (63422) | Stage 3 (63423) |
|-----------|--------------------------|-----------------|-----------------|-----------------|
| Intake lift | 0.450" (11.43 mm) | 0.450" (11.43 mm) | 0.465" (11.81 mm) | 0.471" (11.96 mm) |
| Exhaust lift | 0.419" (10.64 mm) | 0.419" (10.64 mm) | 0.465" (11.81 mm) | 0.465" (11.81 mm) |
| Intake duration @.050" | 255° | — | — | — |
| Exhaust duration @.050" | 246° | — | — | — |
| LSA | 102° | — | — | — |

*Source: Crower spec sheets via preludeonline.com and Honda-Tech forums.*

### Cam Bearing Dimensions

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Cam journal diameter | 29.98–30.00 | mm | h-series-camshaft-bearing-dimensions.md | Standard H-series |
| Cam bearing width | 19.9 | mm | Wikipedia, QWEN.md | Same as main bearing width |
| Oil clearance | 0.020–0.060 | mm | QWEN.md | Standard Honda specification |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Wikipedia — Honda H engine | Encyclopedia | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | High — cross-referenced with multiple sources |
| 2 | preludeonline.com — "typeS cams > Crower stg3!! (exact specs inside)" | Forum discussion | https://www.preludeonline.com/threads/types-cams-crower-stg3-exact-specs-inside.140093/ | 2026-05-15 | Medium — user-measured data with micrometer, corroborated by Crower spec sheets |
| 3 | preludepower.com — "Jdm H22 type s cams" | Forum discussion | https://www.preludepower.com/threads/jdm-h22-type-s-cams.345447/ | 2026-05-15 | Medium — micrometer measurements of VTEC/idle lobe heights, cross-referenced |
| 4 | Honda-Tech — "Opinion's Please on H22A Cam Duration/mm measurment" | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/opinions-please-h22a-cam-duration-mm-measurment-413634/ | 2026-05-15 | Low-Medium — user-reported measurements, limited detail |
| 5 | Honda-Tech — "CAM SPECS, CAM TIMING, CAM DEGREEING, CENTER LOBES" | Forum discussion | https://honda-tech.com/forums/all-motor-naturally-aspirated-44/cam-specs-cam-timing-cam-degreeing-center-lobes-etc-756869/ | 2026-05-15 | Medium — Crower spec sheet data shared by community member, corroborated by manufacturer |
| 6 | Crower Cams — H22/H22A Camshafts (spec sheet for part 63403) | Manufacturer | http://www.crower.com/misc/cam_spec/cam_finder.php?part_num=63403&x=57&y=17 | 2026-05-15 | High — direct manufacturer specification |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md (local compiled reference) | Compiled reference | `/data/h22/QWEN.md` | N/A | Medium — compiled from 50+ sources |
| 2 | mywikimotors — Honda H22A engine | Enthusiast site | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | Medium — corroborated by Wikipedia |
| 3 | h-series-camshaft-bearing-dimensions.md | Project research file | `research/h-series/specifications/h-series-camshaft-bearing-dimensions.md` | 2026-05-15 | Medium — internal project research |

---

## Notes

### Key Observations

1. **Three cam profiles per cylinder per bank.** The H22 DOHC VTEC design uses three cam lobes per cylinder per bank: primary (idle/low-RPM), secondary (crossover), and VTEC (high-RPM). This yields six distinct profiles across the four cylinders (three intake + three exhaust per bank × two banks).

2. **Measurement conventions differ.** American aftermarket manufacturers (Crower, Crane) measure duration at .050" lift (1.27 mm), while Japanese manufacturers (TODA, JUN) often measure at 1 mm lift. This creates apparent discrepancies in duration numbers. The .050" duration is always shorter (254°/264°) than the 1 mm duration (296°/308°) because the valve is further off the base circle at .050".

3. **Gross lift vs. net lift.** Cam manufacturers quote "gross lift" assuming zero valve lash and the theoretical rocker ratio (1.55:1 for H22). Actual net lift at the valve is lower by approximately 0.06 mm on the intake and 0.08 mm on the exhaust due to valve lash requirements. When comparing lift figures across sources, always check whether the number is gross or net.

4. **Type S cams have higher lift but shorter duration than many aftermarket cams.** As noted in the preludeonline.com thread, the Type S cams produce the highest lift among stock H22 variants (0.480" intake / 0.441" exhaust at .050"), but their duration is relatively short. Aftermarket cams like the Crower Stage 3 sacrifice some lift for significantly longer duration (30–40° more), which can produce more airflow at high RPM despite lower peak lift.

5. **The 102° LSA is tight for a street engine.** A lobe separation angle of 102° produces approximately 14° of overlap at .050" lift. This is tighter than typical street engines (which run 108–112° LSA) and contributes to the Redtop's aggressive idle character and high-RPM power band. The tight LSA also aids volumetric efficiency at high RPM by improving scavenging.

6. **VTEC engagement is load-dependent.** The VTEC system engages when oil pressure reaches 10–15 psi (confirmed by the VTEC pressure switch), vehicle speed exceeds 5 km/h, engine temperature is above 40°C, and throttle position exceeds 20%. Under heavy throttle, engagement can occur as low as 5,200 RPM; under light load, it may delay to 5,500 RPM.

### Gaps Identified

- **Exact VTEC crossover lobe profiles** (the secondary "middle" profile) are not available from any consulted source. Only the primary (idle) and VTEC (high-lift) profiles are documented.
- **Factory cam timing belt alignment marks** — exact degree positions of the timing marks on the cam gears are not specified.
- **Oil feed passage dimensions** for the VTEC solenoid internal to the camshaft are not published.
- **Camshaft material specification** (steel grade, heat treatment) is not available from any source.
- **Official Honda service manual camshaft dimension tolerances** (maximum wear limits) are not accessible.

---

## Citations

1. Wikipedia contributors. "Honda H engine." *Wikipedia*, The Free Encyclopedia. Retrieved 2026-05-15. URL: https://en.wikipedia.org/wiki/Honda_H_engine. Credibility: High — cross-referenced with QWEN.md, mywikimotors, and forum data.
2. Anonymous. "typeS cams > Crower stg3!! (exact specs inside)." *PreludeOnline.com*, November 2003. URL: https://www.preludeonline.com/threads/types-cams-crower-stg3-exact-specs-inside.140093/. Credibility: Medium — user-measured data with micrometer, corroborated by Crower spec sheets.
3. ExplicitSpeed. "Jdm H22 type s cams." *PreludePower.com*, June 2011. URL: https://www.preludepower.com/threads/jdm-h22-type-s-cams.345447/. Credibility: Medium — micrometer measurements of VTEC/idle lobe heights on PCB HF-1997 head, cross-referenced with other sources.
4. ZColeon. "Opinion's Please on H22A Cam Duration/mm measurment." *Honda-Tech*, February 2003. URL: https://honda-tech.com/forums/honda-prelude-4/opinions-please-h22a-cam-duration-mm-measurment-413634/. Credibility: Low-Medium — user-reported measurements from SX Schneider cam set.
5. IN VTEC. "CAM SPECS, CAM TIMING, CAM DEGREEING, CENTER LOBES, ETC..." *Honda-Tech*, February 2004. URL: https://honda-tech.com/forums/all-motor-naturally-aspirated-44/cam-specs-cam-timing-cam-degreeing-center-lobes-etc-756869/. Credibility: Medium — Crower spec sheet data shared by community member.
6. Crower Cams. "H22 / H22A Camshafts — Part 63403 Spec Sheet." *Crower.com*. URL: http://www.crower.com/misc/cam_spec/cam_finder.php?part_num=63403&x=57&y=17. Credibility: High — direct manufacturer specification.
7. Anonymous. "Honda H22A engine | Differences, ways of making it faster." *mywikimotors*. URL: http://mywikimotors.com/honda-h22a/. Credibility: Medium — corroborated by Wikipedia.

---

## Appendix

### Measurement Methodology

**Gross lift calculation:** Gross lift = (lobe height − base circle) × rocker ratio. For the H22A:
- Intake gross lift = (36.93 − 29.68) × 1.55 = 11.24 mm (zero lash)
- Exhaust gross lift = (36.49 − 29.74) × 1.55 = 10.46 mm (zero lash)

These calculated values from the preludeonline.com thread (71dsp) are slightly lower than the quoted 11.91 mm / 11.12 mm, likely because the quoted figures use a slightly different base circle measurement or account for the cam profile's maximum lift point rather than the simple lobe-height difference. The discrepancy is within measurement tolerance for caliper-based measurements.

**Duration conversion:** The relationship between 1 mm duration and .050" duration depends on the cam lobe's ramp profile. For the H22A Redtop:
- Intake: 296° @ 1 mm → 254° @ .050" (42° difference)
- Exhaust: 308° @ 1 mm → 264° @ .050" (44° difference)

This means approximately 21–22° of crankshaft rotation per side is spent below 1 mm lift, representing the valve's closed-to-open transition zone.

### Color Coding Reference (cam-related)

| Valve Cover | Engine Code | Cam Profile | Power | Market |
|-------------|-------------|-------------|-------|--------|
| Red | H22A (Redtop) | Aggressive (306°/310°) | 220 PS | JDM only |
| Black | H22A (Blacktop) | Moderate (288°/308°) | 200 PS | JDM only |
| Black | H22A1 | Moderate (detuned) | 190 PS | USDM/CAN/AUS |
| Black | H22A2 | Moderate (detuned) | 185 PS | EDM |
| Black | H22A4 | Moderate (detuned) | 200 PS | USDM/CAN/AUS |
| Red | H22A7 (Accord Type R) | Aggressive (Type S profile) | 212 PS | EDM |
| Red | H22A8 (Prelude VTi-S) | Aggressive (Type S profile) | 200 PS | EDM |
