# H-Series Service Bulletins, TSBs, and Known Fixes

## Summary

Research into Honda dealer service bulletins, technical service communications (TSCs), and community-documented known fixes for the H-series engine family (H22A, H22A1–H22A8, H22Z1, H23A). Unlike recall campaigns, which are regulatory actions tracked by NHTSA, service bulletins are manufacturer-initiated documents sent to authorized dealers with diagnostic procedures and repair instructions. Honda consistently preferred the service bulletin approach over formal recalls for H-series engine-related issues, allowing the company to address problems without triggering formal recall reporting requirements.

This research covers all publicly documented Honda service bulletions affecting H-series engines, community-verified known fix patterns, and the distinction between dealer-level TSBs and broader warranty extensions.

## Honda Dealer Service Bulletions Affecting H-Series Engines

### SB618958 — FRM Cylinder Liner Honing Procedure

- **Bulletin number:** SB618958
- **Topic:** Honing Fiber-Reinforced Metal (FRM) cylinder liners to address oil consumption
- **Affected vehicles:** 1990–2001 Prelude (all H-series variants with FRM-lined blocks), 2000–2001 S2000
- **Procedure:** Use a rigid hone (not ball hone) with GC-600-J or finer stones for nonferrous metals. Honing pressure should be 200–300 kPa (2–3 kg-cm², 29–43 psi). Use oil-type honing oil. Do not stroke the hone more than 20 cycles. After honing, thoroughly clean the engine block of all metal particles by washing with hot soapy water, then dry and oil immediately. Never use solvent — it redistributes the grit. Light vertical scoring and scratching is acceptable if not deep enough to catch a fingernail and does not run the full length of the bore.
- **Key guidance:** "FRM honing is not required unless the cylinder has deep vertical scratches that run the length of the bore. Cylinders with light colored spots or flaking cannot be corrected by honing and must be replaced."
- **Status:** Active dealer bulletin. Honda-Tech forum thread references exact bulletin text but is Cloudflare-blocked.
- **Sources:** [Honda-Tech forum thread](https://honda-tech.com/forums/honda-prelude-4/honing-frm-sleeves-service-bulletin-sb618958-18939-a-405266/) (accessed 2026-05-15, Cloudflare-blocked); [PreludeOnline rebuild thread quoting SB618958](https://www.preludeonline.com/threads/h22a4-rebuild.252297/page-2) (accessed 2026-05-15); [MotorTrend — Honda FRM Liners](https://www.motortrend.com/how-to/htup-0907-honda-frm-liners) (accessed 2026-05-15)

### Service Bulletin #01-010 — Timing Belt Auto-Tensioner Recognition

- **Bulletin number:** #01-010
- **Topic:** Recognition of auto-tensioner failure as a known issue
- **Affected vehicles:** H-series equipped vehicles (1992–2001 Prelude)
- **Issue:** Hydraulic auto-tensioner failing before recommended 105,000-mile inspection interval. Documented case: tensioner failed at 79,000 miles, causing timing jump, valve-to-piston damage, and complete engine overhaul ($2,300 cost to consumer).
- **Remedy:** Dealer-level inspection and replacement under service bulletin coverage
- **Status:** Active bulletin acknowledged by Honda. Consumer NHTSA complaint specifically cited receipt of service bulletin covering this issue.
- **Sources:** [Center for Auto Safety — 1998 Honda Prelude complaint](https://www.autosafety.org/vehicle-safety-check/1998-honda-prelude/) (accessed 2026-05-15)

### Automatic Transmission Warranty Extension — M6HA SportShift

- **Bulletin topic:** Automatic transmission warranty extension
- **Affected vehicles:** 1999–2001 Honda Prelude (H22A4-equipped)
- **Issue:** Widespread M6HA SportShift automatic transmission failures at low mileage (40,000–80,000 miles). Honda acknowledged the problem.
- **Remedy:** Extended warranty coverage for 1999–2001 models only
- **Critical asymmetry:** 1997–1998 models excluded from warranty extension despite identical M6HA SportShift transmission design. Multiple complainants noted Honda recalled preludes in Turkey for the same transmission issue and replaced with updated MH6A units, but did not extend remedy to U.S. market.
- **Sources:** [Center for Auto Safety — 1997 Honda Prelude](https://www.autosafety.org/vehicle-safety-check/1997-honda-prelude/) (accessed 2026-05-15); [Center for Auto Safety — 1998 Honda Prelude](https://www.autosafety.org/vehicle-safety-check/1998-honda-prelude/) (accessed 2026-05-15)

### Front Rocker Arm Oil Control Valve — TSB 20-023

- **Bulletin number:** 20-023 (March 5, 2020)
- **Topic:** Front rocker arm oil control valve (spool valve) leaks
- **Affected vehicles:** 2008–2012 Accord V6 A/T, 2010–2012 Crosstour, 2008–2010 Odyssey EX-L+, 2011–2017 Odyssey, 2009–2015 Pilot
- **Note:** This bulletin affects later Honda engines using similar VTEC/VTC oil control valve architecture. While not directly H-series, the front rocker arm oil control valve (part 15810-R70-A04) uses the same spool valve/gasket design principle as H-series VTEC solenoid assemblies. The gasket deterioration mechanism is analogous to H-series VTEC solenoid gasket leaks.
- **Remedy:** Replace entire front rocker arm oil control valve assembly (not just gasket — replacing only the gasket can result in continued leaks). Torque bolts to 8 N·m (6 lb-ft).
- **Sources:** [NHTSA TSB PDF](https://static.nhtsa.gov/odi/tsbs/2020/MC-10172366-0001.pdf) (accessed 2026-05-15)

## Community-Documented Known Fixes (Non-Official TSBs)

### Distributor O-Ring Seal Leaks

- **Affected variant:** Primarily 5th generation H22A4 (1997–2001 BB6 chassis)
- **Symptom:** Oil seepage/leakage around distributor base, oil level dropping between changes
- **Cause:** Distributor O-ring degrades over time, especially with heat cycling
- **Fix:** Replace distributor O-ring with OEM part. YouTube tutorial exists for replacement procedure on H22A4.
- **Community consensus:** Well-documented recurring issue. Multiple Honda-Tech and PreludeOnline threads confirm pattern.
- **Sources:** [Honda-Tech — Distributor seal leak](https://honda-tech.com/forums/honda-prelude-4/distributor-seal-leak-2421048/) (accessed 2026-05-15); [YouTube — How to Replace Distributor Seals Honda H-Series](https://www.youtube.com/watch?v=2e47yrIk18c) (accessed 2026-05-15); [PreludePower — Distributor oil seal replacement](https://www.preludepower.com/threads/distributor-oil-seal-replacement.347649/) (accessed 2026-05-15)

### VTEC Solenoid / Oil Pressure Switch Gasket Leaks

- **Affected variants:** All H-series (H22A, H22A1–H22A8, H22Z1, H23A)
- **Symptom:** Oil leak from VTEC solenoid area on cylinder head, oil level slowly dropping
- **Cause:** VTEC solenoid gasket deteriorates; VTEC oil pressure switch O-ring degrades
- **Fix:** Replace VTEC solenoid gasket and/or oil pressure switch O-ring. Simple bolt-off/bolt-on repair.
- **Community consensus:** Extremely common. Frequently confused with FRM-related oil consumption. Pre-diagnosis step: check VTEC solenoid area before assuming FRM liner issue.
- **Sources:** [PreludeOnline — Small oil leak from VTEC solenoid area](https://www.preludeonline.com/threads/small-oil-leak-from-vtec-solenoid-area.100124/) (accessed 2026-05-15); [Facebook group discussion](https://www.facebook.com/groups/365216770236517/posts/9752664648158302/) (accessed 2026-05-15); [Honda-Tech — H22A VTEC pressure switch issues](https://www.facebook.com/groups/626141350776348/posts/2290306117693188/) (accessed 2026-05-15)

### PCV System Oil Consumption Contributor

- **Affected variants:** All H-series
- **Symptom:** Excessive oil consumption, oil in intake manifold past throttle body
- **Cause:** Worn PCV valve allows excessive blow-by gases into crankcase, increasing pressure and forcing oil past rings into combustion chamber
- **Fix:** Replace PCV valve at ~10,000-mile intervals (more frequent than standard service manual recommendation). Install oil catch-can on PCV system.
- **Community consensus:** One experienced H22 owner reported that replacing worn PCV at 10K-mile intervals made "a big difference" on oil consumption compared to 15K+ intervals. Oil in intake manifold (visible when pulling stock intake) confirms blow-by contribution.
- **Sources:** [PreludeOnline — Why do H22s burn oil?](https://www.preludeonline.com/threads/why-do-h22s-burn-oil.223412/) (accessed 2026-05-15); [Honda-Tech — Mysterious oil loss in H22A4](https://honda-tech.com/forums/honda-prelude-4/mysterious-oil-loss-h22a4-3004984/) (accessed 2026-05-15)

### Water Pump Weep Hole — Design Feature, Not Failure

- **Affected variants:** All H-series (belt-driven water pump)
- **Symptom:** Coolant dripping from small hole on water pump body
- **Cause:** The weep hole is a **designed vent passage** positioned between the pump's primary coolant seal and bearing seals. It allows coolant to escape if the internal seal begins to wear, preventing coolant from entering the bearing assembly.
- **Interpretation:** Minor seepage = normal early warning. Continuous dripping/streaming = seal failure, replace water pump.
- **Fix:** Replace water pump if weep hole shows continuous coolant flow. Check bearing play and shaft rotation for roughness. Listen for chirping/grinding noises.
- **Sources:** [US Motor Works — Water Pump Leak Technical Bulletin](https://www.usmotorworks.com/wp-content/uploads/2025/10/WPLEAKS-FLYER_FINAL-WEB.pdf) (accessed 2026-05-15); [Honda-Tech — Methods to stop coolant leak from water pump weep hole](https://honda-tech.com/forums/honda-accord-1990-2002-2/methods-stop-coat-leak-water-pump-weep-hole-2973757/) (accessed 2026-05-15)

### Sticking Piston Rings — Oil Consumption

- **Affected variants:** All H-series (contributing factor alongside FRM liners)
- **Symptom:** Blue smoke from exhaust, oil consumption, low compression
- **Cause:** Carbon deposits on oil control rings prevent proper sealing against FRM liner walls
- **Fix:** Chemical cleaning (Gumout Regane additive in fuel tank) can free stuck rings and restore compression. Persistent cases require piston ring replacement or short block replacement.
- **Community note:** One documented case showed compression recovery and reduced oil consumption after Gumout Regane treatment, confirming sticking ring hypothesis.
- **Sources:** [PreludeOnline — Why do H22s burn oil?](https://www.preludeonline.com/threads/why-do-h22s-burn-oil.223412/) (accessed 2026-05-15)

### Auto-Tensioner to Manual Tensioner Conversion

- **Affected variants:** All H-series (1992–2001)
- **Issue:** Hydraulic auto-tensioner failure rate significantly above expectations. Honda's own service bulletin (#01-10) acknowledges the problem.
- **Aftermarket solution:** Manual tensioner conversion kits widely available. Parts include:
  - Manual tensioner assembly (14510-PT0-004)
  - Tensioner spring (14516-PT2-000)
  - Tensioner plate (14521-P14-A00)
  - Adjuster bolt kit (90014-P14-A00, 90015-PT0-000, 90016-PT0-000)
  - Washer (90140-P14-A00)
- **Community consensus:** Highly recommended preventative measure. Many owners convert during routine timing belt service regardless of current tensioner condition.
- **Sources:** [ExtremePrelude — Timing Belt Procedure](https://www.extremeprelude.com/timingbelt.html) (accessed 2026-05-15); [PreludePower — H22 Auto-Tensioner Rebuild Write-up](https://www.preludepower.com/threads/h22-auto-tensioner-rebuild-write-up.276048/) (accessed 2026-05-15)

### Oil Consumption Test and Short Block Replacement Threshold

- **Affected variants:** All H-series (dealer-level diagnostic procedure)
- **Procedure:** Honda dealers perform standardized oil consumption test. If consumption exceeds threshold, disassemble and inspect engine. Most cases require replacement of pistons, piston pins, rings, and spark plugs. In severe cases, short block replacement.
- **Tools required:** Piston ring compressor (SCP1473 or equivalent), engine hanger (AART1256)
- **Labor time:** Approximately 8.4 hours for piston/ring replacement; additional 0.5 hours for head work if needed
- **Sources:** [NHTSA Service Bulletin PDFs](https://static.nhtsa.gov/odi/tsbs/) (accessed 2026-05-15); [Honda-Tech — H22A4 rebuild thread](https://www.preludeonline.com/threads/h22a4-rebuild.252297/page-2) (accessed 2026-05-15)

## Cross-Reference with Recall History (T-052)

The following table maps service bulletins to related recall items for context:

| Service Bulletin | Related Recall | Relationship |
|---|---|---|
| SB618958 (FRM honing) | None (no engine-specific recall) | Honda chose dealer bulletin over recall for FRM oil consumption |
| #01-010 (tensioner) | None (no engine-specific recall) | Same pattern — bulletin-only approach |
| M6HA transmission extension | 99V069000 (ball joint recall) | Both 1997–1999 Prelude; transmission extension was warranty action, not recall |
| Distributor seal leaks | None | Community-documented fix, no official bulletin found |
| VTEC solenoid gasket leaks | None | Community-documented fix, no official bulletin found |

## Key Findings

1. **No engine-specific NHTSA recalls.** Honda consistently used dealer-level service bulletins (SB618958 for FRM, #01-010 for tensioner) rather than formal recalls for H-series engine issues. This allowed Honda to address problems without triggering NHTSA reporting requirements.

2. **FRM liner oil consumption is the dominant issue.** SB618958 is the only officially documented Honda service bulletin directly addressing an H-series engine block characteristic. The FRM liner's material properties make it prone to oil consumption as mileage increases, a well-documented phenomenon across all H-series variants.

3. **Transmission warranty extension was asymmetric.** Honda extended warranty for 1999–2001 Prelude M6HA transmissions but excluded 1997–1998 models with the same transmission. The same issue was recalled in Turkey but not the U.S. market.

4. **Community fixes outnumber official TSBs.** The most common H-series fixes (distributor O-rings, VTEC solenoid gaskets, PCV valves, auto-tensioner conversions) are community-documented rather than officially covered by Honda service bulletins.

5. **Water pump weep hole is a design feature.** Not a defect — it is an intentional vent passage that serves as an early warning indicator of seal wear. Only continuous dripping indicates actual failure.

6. **Oil consumption diagnosis hierarchy.** Community best practice: (1) check VTEC solenoid gasket first (simplest fix), (2) check distributor O-ring, (3) check/replace PCV valve, (4) chemical ring cleaning attempt, (5) FRM honing per SB618958, (6) short block replacement as last resort.

7. **Preventative maintenance recommendations.** Community consensus strongly recommends auto-tensioner-to-manual-tensioner conversion during timing belt service, PCV valve replacement at 10K-mile intervals, and regular oil level checks.

## Conflicts and Limitations

- **Honda TechInfo access blocked.** The primary Honda-Tech forum thread referencing SB618958 is behind Cloudflare protection, preventing full extraction of the complete bulletin text.
- **Service bulletin details incomplete.** Without direct access to Honda's dealer communication system (TechInfo.honda.com), exact wording and scope of many service bulletions cannot be fully verified.
- **Turkish recall discrepancy.** Multiple complainants reported Honda recalled preludes in Turkey for transmission issues but did not extend the remedy to North America. This claim is difficult to independently verify without Turkish regulatory records.
- **Community fixes unverified by Honda.** Distributor seal leaks, VTEC solenoid gasket leaks, and PCV-related oil consumption are well-documented in enthusiast communities but no official Honda service bulletin was found specifically addressing these issues.
- **Oil consumption thresholds disputed.** Honda dealer oil consumption test thresholds and enforcement vary by dealership. Some owners report being denied coverage even when consumption exceeded stated thresholds.

## Sources

| Source | URL | Access Date |
|--------|-----|-------------|
| Honda-Tech — FRM Service Bulletin SB618958 | https://honda-tech.com/forums/honda-prelude-4/honing-frm-sleeves-service-bulletin-sb618958-18939-a-405266/ | 2026-05-15 (Cloudflare-blocked) |
| Honda-Tech — Distributor seal leak | https://honda-tech.com/forums/honda-prelude-4/distributor-seal-leak-2421048/ | 2026-05-15 |
| Honda-Tech — Mysterious oil loss in H22A4 | https://honda-tech.com/forums/honda-prelude-4/mysterious-oil-loss-h22a4-3004984/ | 2026-05-15 |
| Honda-Tech — H22A VTEC pressure switch issues | https://www.facebook.com/groups/626141350776348/posts/2290306117693188/ | 2026-05-15 |
| Center for Auto Safety — 1997 Honda Prelude | https://www.autosafety.org/vehicle-safety-check/1997-honda-prelude/ | 2026-05-15 |
| Center for Auto Safety — 1998 Honda Prelude | https://www.autosafety.org/vehicle-safety-check/1998-honda-prelude/ | 2026-05-15 |
| Center for Auto Safety — 1999 Honda Prelude | https://www.autosafety.org/vehicle-safety-check/1999-honda-prelude/ | 2026-05-15 |
| MotorTrend — Honda FRM Liners | https://www.motortrend.com/how-to/htup-0907-honda-frm-liners | 2026-05-15 |
| NHTSA TSB — Front Rocker Arm Oil Control Valve (20-023) | https://static.nhtsa.gov/odi/tsbs/2020/MC-10172366-0001.pdf | 2026-05-15 |
| PreludeOnline — H22A4 rebuild (quoting SB618958) | https://www.preludeonline.com/threads/h22a4-rebuild.252297/page-2 | 2026-05-15 |
| PreludeOnline — Why do H22s burn oil? | https://www.preludeonline.com/threads/why-do-h22s-burn-oil.223412/ | 2026-05-15 |
| PreludeOnline — Small oil leak from VTEC solenoid | https://www.preludeonline.com/threads/small-oil-leak-from-vtec-solenoid-area.100124/ | 2026-05-15 |
| PreludeOnline — Distributor oil seal replacement | https://www.preludepower.com/threads/distributor-oil-seal-replacement.347649/ | 2026-05-15 |
| ExtremePrelude — Timing Belt Procedure | https://www.extremeprelude.com/timingbelt.html | 2026-05-15 |
| PreludePower — H22 Auto-Tensioner Rebuild | https://www.preludepower.com/threads/h22-auto-tensioner-rebuild-write-up.276048/ | 2026-05-15 |
| US Motor Works — Water Pump Leak Technical Bulletin | https://www.usmotorworks.com/wp-content/uploads/2025/10/WPLEAKS-FLYER_FINAL-WEB.pdf | 2026-05-15 |
| YouTube — How to Replace Distributor Seals Honda H-Series | https://www.youtube.com/watch?v=2e47yrIk18c | 2026-05-15 |
| VinItel — Honda Prelude Reliability | https://vinitel.com/stats/nhtsa-complaints/honda/prelude | 2026-05-15 |
| Honda Problems — Prelude Recalls | https://www.hondaproblems.com/models/prelude/recalls/ | 2026-05-15 |
| NHTSA.gov Recalls | https://www.nhtsa.gov/recalls | 2026-05-15 |
