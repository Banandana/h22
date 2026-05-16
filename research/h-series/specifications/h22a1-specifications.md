# H22A1 USDM Specifications: 190 PS @ 6800 RPM, 207 Nm @ 5500 RPM, 10.0:1 Compression, OBD1

> **Task:** T-168 [research] Research H22A1 specifications: 190 PS @ 6800 RPM, 207 Nm @ 5500 RPM, 10.0:1 compression, OBD1
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified | Complete

---

## Summary

The Honda H22A1 is the USDM variant of the H22 series DOHC VTEC engine, produced from 1993 to 1996 for the fourth-generation Honda Prelude VTEC (BB1 chassis). It produces 190 PS (187 hp SAE net) @ 6,800 rpm and 207 Nm (153 lb-ft) @ 5,500 rpm with a 10.0:1 compression ratio. The H22A1 uses JDM H22A Blacktop camshafts (288°/308° duration, 11.38/10.54 mm lift) rather than the more aggressive Redtop cams, a single-runner intake manifold, 60 mm throttle body, and 51 mm exhaust system — all detuned relative to the JDM Redtop (H22A, 220 PS @ 11.0:1 CR) for US emissions compliance and regular unleaded fuel compatibility. It features a closed-deck aluminum block with FRM cylinder liners, OBD1 ECU (P51 manual / P5M automatic reference), alloy oil sump, and a black valve cover. Cross-referenced against Wikipedia, Car and Driver, Honda-Tech, mywikimotors, Weebly H-series specs, Brian Crower cam specs, Powertrain Products casting data, and MotorTrend.

---

## Specifications

### H22A1 Engine Overview

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Engine code | H22A1 | — | Wikipedia H engine | USDM variant designation |
| Configuration | DOHC 16-valve inline-4 | — | Car and Driver | Dual overhead cam, 4 valves/cylinder |
| Displacement | 2,157 cc (131.6 cu in) | cc | Car and Driver | 0.1L reduction from H23A1 (2,259 cc) via 4.3 mm stroke reduction |
| Bore | 87.0 mm (3.43 in) | mm | Wikipedia H engine | Same as H23A1 |
| Stroke | 90.7 mm (3.57 in) | mm | Wikipedia H engine | Reduced from 95.0 mm (H23A1) for high-RPM durability |
| Compression ratio | 10.0:1 | — | Wikipedia H engine | Lower than JDM Redtop (11.0:1) for US fuel/emissions |
| Power output | 190 PS / 187 hp @ 6,800 rpm | PS / hp | Wikipedia H engine | JIS gross / SAE net; also listed as 190 hp @ 6,800 rpm in C&D |
| Torque | 207 Nm / 153 lb-ft @ 5,500 rpm | Nm / lb-ft | Wikipedia H engine | Also listed as 158 lb-ft @ 5,300 rpm in C&D testing |
| Redline | 7,400 rpm | rpm | Car and Driver | Hard fuel cut limiter; rev cut ~7,600–7,800 rpm |
| VTEC engagement | ~5,200–5,500 rpm | rpm | Wikipedia H-series VTEC engagement parameters | Variable by throttle position/load; C&D reports ~4,800 rpm light throttle |
| Block material | Aluminum with FRM-lined bores | — | Car and Driver | Carbon fiber + aluminum oxide MMC; no separate iron sleeves |
| Deck type | Closed deck | — | Wikipedia H engine | 1992–1996 closed deck; 1997+ transitioned to open deck |
| Valve cover | Black | — | Wikipedia H engine | Distinct from JDM Redtop (red valve cover) |
| Firing order | 1-3-4-2 | — | QWEN.md | Standard Honda inline-4 |
| Block height | 219.5 mm | mm | mywikimotors | Same across H22 variants |
| Weight (long block) | ~385 lbs (175 kg) | lbs / kg | QWEN.md | Dry weight estimate |

### Internal Component Specifications

#### Connecting Rod & Piston Data

| Component | H22A1 Value | Unit | Source | Notes |
|-----------|-------------|------|--------|-------|
| Rod length | 143 mm (5.63 in) | mm | Honda-Tech forum | Same as H22A Redtop, H22A4 |
| Rod width | 23.75 mm (0.935 in) | mm | Honda-Tech forum | Forged steel |
| Main bore | 51 mm (2.0 in) | mm | Honda-Tech forum | Main journal diameter = 50 mm + 2× bearing clearance |
| Pin bore | 21.97–21.98 mm | mm | Honda-Tech forum | Wrist pin diameter = 22 mm |
| Piston volume | −1.8 cc | cc | Honda-Tech forum | Small dome piston (vs Redtop −1.9 cc; Blacktop −1.7 cc) |
| Wrist pin diameter | 22 mm (0.87 in) | mm | Wikipedia H engine | Standard across H22 variants |
| Main bearing width | 19.9 mm (0.78 in) | mm | Wikipedia H engine | Standard across H22 variants |
| Rod bearing width | 19.35 mm (0.762 in) | mm | Wikipedia H engine | Standard across H22 variants |
| Crankshaft | Forged steel, 50 mm main journals | — | QWEN.md | 1992–1996: 50 mm; 1997+ H22A4 increased to 55 mm |
| Pistons | Forged aluminum, small dome | — | mywikimotors | 10.0:1 CR requires lower dome than 11.0:1 Redtop |
| Compression height | 31 mm | mm | mywikimotors | Standard across H22 variants |

#### Valve & Journal Specifications

| Component | H22A1 Value | Unit | Source | Notes |
|-----------|-------------|------|--------|-------|
| Intake valve diameter | 35 mm (1.4 in) | mm | Wikipedia H engine | Standard across H22 variants |
| Exhaust valve diameter | 30 mm (1.2 in) | mm | Wikipedia H engine | Standard across H22 variants |
| Main journal diameter | 50 mm (2.0 in) | mm | Wikipedia H engine | 1992–1996 only; 1997+ H22A4 increased to 55 mm |
| Rod journal diameter | 47.95 mm (1.888 in) | mm | Wikipedia H engine | Standard across H22 variants |

#### Camshaft Specifications (H22A1)

| Parameter | Intake | Exhaust | Source | Notes |
|-----------|--------|---------|--------|-------|
| Advertised duration | 288° | 308° | Brian Crower cam specs | JDM H22A Blacktop cam profiles used |
| Duration @ .050" | 231° | 234° | Brian Crower cam specs | Measured at 0.050" lifter lift |
| Lift (inches) | 0.448" | 0.415" | Brian Crower cam specs | |
| Lift (mm) | 11.38 mm | 10.54 mm | Brian Crower cam specs | |
| Lobe separation | 103° (intake) / 102° (exhaust) | — | Brian Crower cam specs | Based on advertised duration |
| Overlap | ~17° | — | Calculated | Advertised overlap (288+308−360)/2 |

*Comparison to other variants:*

| Variant | Intake Duration | Exhaust Duration | Intake Lift | Exhaust Lift | Source |
|---------|-----------------|------------------|-------------|--------------|--------|
| H22A1 (USDM) | 288° | 308° | 11.38 mm | 10.54 mm | Brian Crower |
| H22A Blacktop (JDM) | 288° | 308° | 11.38 mm | 10.54 mm | Brian Crower |
| H22A Redtop (JDM) | 306° | 310° | 11.91 mm | 11.12 mm | Brian Crower |
| H22A4 (USDM 5th gen) | 288° | 308° | 11.38 mm | 10.54 mm | QWEN.md |

*Note:* The H22A1 uses identical cam profiles to the JDM H22A Blacktop — confirming that the USDM detuning was achieved primarily through intake/exhaust tuning, ECU calibration, and compression ratio reduction rather than cam changes.

### Induction & Exhaust Systems

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Throttle body size | 60 mm | mm | mywikimotors | Smaller than Redtop (62.5 mm); same as Blacktop |
| Intake manifold | Single runner | — | mywikimotors, Honda-Tech | USDM single runner vs JDM dual runner (Type S) |
| Exhaust system diameter | 51 mm | mm | mywikimotors | Narrower than Redtop (57 mm); same as Blacktop |
| Fuel injectors | 345 cc | cc/min | mywikimotors | Pre-1997 injector size; 1997+ H22A4 reduced to 290 cc |
| Fuel pressure (disconnected) | 230–280 kPa (33–40 psi) | kPa / psi | OBD1 H22A Service Manual | Stock specification |
| Fuel pressure (connected) | 230–280 kPa (33–40 psi) | kPa / psi | OBD1 H22A Service Manual | Regulated rail pressure |

### Emissions Equipment (USDM Package)

| System | Description | Source | Notes |
|--------|-------------|--------|-------|
| EGR | Exhaust Gas Recirculation | QWEN.md | Standard US emissions equipment |
| PCV | Positive Crankcase Ventilation | QWEN.md | Standard; known contributor to oil consumption |
| EVAP | Evaporative Emission Control | QWEN.md | Carbon canister, purge valve, charcoal canister |
| Secondary Air Injection (SAIS) | Secondary Air Injection System | QWEN.md | Reduces cold-start emissions |
| Three-way catalytic converter | Platinum/palladium/rhodium catalyst | QWEN.md | Standard US emissions compliance |
| Oxygen sensors | Upstream and downstream O2 sensors | QWEN.md | Closed-loop fuel control |
| Knock sensor | Detonation detection | QWEN.md | Used by ECU for timing retard |
| Emission group codes | 100 (California), 130 (49-state) | OBD1 H22A Service Manual | VIN decode reference |

### Fluid Capacities & Pressures

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Engine oil capacity (with filter) | 4.0 L (4.2 US qt) | L / qt | QWEN.md | Practical fill: 5.1 US qt (4.8 L) per owner's manual |
| Engine oil capacity (no filter) | 3.8 L (4.0 US qt) | L / qt | QWEN.md | Honda TechInfo IT9696 |
| Coolant capacity | 7.0 L (7.4 US qt) | L / qt | QWEN.md | Total system capacity |
| Oil pressure (idle, hot) | 30+ psi | psi | QWEN.md | Minimum for VTEC engagement |
| Oil pressure (3,000 rpm) | 45–60 psi | psi | QWEN.md | Normal operating range |
| Spark plug gap | 1.0–1.1 mm (0.039–0.043 in) | mm / in | QWEN.md | NGK standard |
| Thermostat opening temp | 82°C (180°F) | °C / °F | QWEN.md | Full open at 95°C (203°F) |
| Recommended oil | 5W-30 or 10W-30 | — | QWEN.md | Honda Genuine or equivalent |

### Torque Specifications

| Component | Torque | Source | Notes |
|-----------|--------|--------|-------|
| Cylinder head bolts | Multi-stage sequence | QWEN.md | See service manual |
| Main bearing caps | 43 ft-lb + 90° turn | QWEN.md | Torque-to-yield fasteners |
| Connecting rod caps | 33 ft-lb + 90° turn | QWEN.md | Torque-to-yield fasteners |
| Flywheel/flexplate | 43 ft-lb | QWEN.md | |
| Intake manifold | 13 ft-lb | QWEN.md | |
| Exhaust manifold | 33 ft-lb | QWEN.md | |
| Spark plugs | 15 ft-lb | QWEN.md | |
| Oil pan | 7 ft-lb | QWEN.md | Aluminum pan; over-torque causes leaks |
| Timing belt tensioner | 33 ft-lb | QWEN.md | |
| Cam gear bolts | 37 ft-lb | OBD1 H22A Service Manual | H22-specific; differs from H23A (27 ft-lb) |

### OBD1 ECU Details

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| ECU part numbers | P51 (manual), P5M (automatic reference) | QWEN.md | Socketed EPROM chips |
| Connector | 32-pin | QWEN.md | OBD1 round 16-pin + rectangular 16-pin |
| Chip type | Socketed EPROM | QWEN.md | Tunable with Hondata S300, Chrome HTS |
| Fuel system | PGM-FI port injection | QWEN.md | Saturated injectors |
| VTEC solenoid control pin | A8 (US ECU) | QWEN.md | Green/yellow wire |
| Knock sensor | Enabled (disabled for chipped ECUs) | QWEN.md | Standard OBD1 calibration |
| Immobilizer | None | QWEN.md | OBD1 era; immobilizer introduced 1997+ |

### Casting Numbers (Powertrain Products Remanufactured Engine)

| Component | Casting | Source | Notes |
|-----------|---------|--------|-------|
| Block | H22A1, P13 | Powertrain Products | Driver side #1 bottom |
| Head | P13 | Powertrain Products | |
| Crankshaft | P0F | Powertrain Products | |
| Body style | 2162 | Powertrain Products | 2-door coupe |

### Performance Testing Results

#### Car and Driver Test (1993 Prelude VTEC)

| Metric | Result | Source | Notes |
|--------|--------|--------|-------|
| 0–60 mph | 6.9 sec | Car and Driver | Pre-production prototype |
| 1/4-mile | 15.4 sec @ 91 mph | Car and Driver | Two-tenths quicker and 2 mph faster than Si |
| 100 mph | 18.8 sec | Car and Driver | |
| 130 mph | 46.2 sec | Car and Driver | |
| Rolling 5–60 mph (top gear) | 7.8 sec | Car and Driver | |
| Top gear 30–50 mph | 8.1 sec | Car and Driver | |
| Top gear 50–70 mph | 8.4 sec | Car and Driver | |
| Top speed | 135 mph | Car and Driver | Up 6 mph from Si |
| Braking 70–0 mph | 186 ft | Car and Driver | |
| Skidpad | 0.80 g | Car and Driver | |

#### Road & Track Test (Pre-production, November 1992)

| Metric | Result | Source | Notes |
|--------|--------|--------|-------|
| 0–60 mph | 7.1 sec | Road & Track via PreludePower | Half-second better than Si's 7.6 sec |
| Top speed | 140 mph (indicated) | Road & Track via PreludePower | Steady top speed at HPCC proving ground |
| VTEC engagement | ~4,800 rpm | Road & Track via PreludePower | "Subtle power bump" |

### Global H22A1 Variants

| Variant | Market | Production | Power | Applications |
|---------|--------|------------|-------|--------------|
| H22A1 | USDM | 1993–1996 | 190 PS @ 6,800 rpm | 4th gen Prelude VTEC (BB1) |
| H22A1 | CAN (SR-V) | 1993–1996 | 190 PS @ 6,800 rpm | 4th gen Prelude SR-V (BB1) |
| H22A1 | AUS (VTi-R) | 1993–1996 | 190 PS @ 6,800 rpm | 4th gen Prelude VTi-R (BB1) |

### H22A1 vs JDM Redtop (H22A) Comparison

| Parameter | H22A1 (USDM) | H22A (JDM Redtop) | Difference |
|-----------|-------------|-------------------|------------|
| Power | 190 PS @ 6,800 rpm | 220 PS @ 7,200 rpm | −30 PS, −400 rpm |
| Torque | 207 Nm @ 5,500 rpm | 221 Nm @ 6,500 rpm | −14 Nm, −1,000 rpm |
| Compression | 10.0:1 | 11.0:1 | −1.0:1 |
| Valve cover | Black | Red | Visual distinction |
| Throttle body | 60 mm | 62.5 mm | −2.5 mm |
| Intake manifold | Single runner | Dual runner (Type S) | Different plenum |
| Exhaust | 51 mm | 57 mm | Narrower |
| Cam profiles | 288°/308° (Blacktop) | 306°/310° (Redtop) | Less aggressive |
| Emissions equipment | Full US package | JDM package | EGR, SAIS, EVAP differences |
| Fuel requirement | Regular unleaded (87 AKI min) | Premium (98 RON) | Octane difference |
| Piston volume | −1.8 cc | −1.9 cc | Similar small dome |

### H22A1 vs H22A4 (5th Gen USDM) Comparison

| Parameter | H22A1 (1993–1996) | H22A4 (1997–2001) | Difference |
|-----------|-------------------|-------------------|------------|
| Power | 190 PS @ 6,800 rpm | 200 PS @ 7,000 rpm | +10 PS, +200 rpm |
| Torque | 207 Nm @ 5,500 rpm | 212 Nm @ 5,250 rpm | +5 Nm, −250 rpm |
| Compression | 10.0:1 | 10.0:1 | Same |
| Deck type | Closed deck | Open deck | Structural change |
| Main journals | 50 mm | 55 mm (1998+) | Increased strength |
| ECU | OBD1 (P51/P5M) | OBD2 (P13) | Immobilizer-integrated |
| Intake | Single runner | Single runner | Same architecture |
| Valve cover | Black | Black | Same |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Wikipedia contributors. "Honda H engine." | Secondary | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | B+ |
| 2 | Wikipedia contributors. "Honda Prelude." | Secondary | https://en.wikipedia.org/wiki/Honda_Prelude | 2026-05-15 | B+ |
| 3 | OBD1 H22A Service Manual (Helms Manual OCR) | Primary | /data/h22/OBD1_H22A_Service_Manual.md | 2026-05-15 | A+ |
| 4 | Car and Driver. "Tested: 1993 Honda Prelude Goes VTEC." | Primary | https://www.caranddriver.com/reviews/a71038420/1993-honda-prelude-vtec-archive-test/ | 2026-05-15 | A+ |
| 5 | Powertrain Products. "Honda H22A1 2.2L L4 Remanufactured Engine." | Primary | https://www.powertrainproducts.net/product/1996-h22a1/ | 2026-05-15 | A |
| 6 | Honda-Tech Forum. "****Prelude Specifications and Stats****." | Tertiary | https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/ | 2026-05-15 | B |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 7 | Devin's Honda Site. "H-Series Engine Specs." | Secondary | https://devinshondasite.weebly.com/h-series-engine-specs.html | 2026-05-15 | B |
| 8 | WikiMotors. "Honda H22A engine." | Secondary | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | B |
| 9 | Brian Crower. "Honda H22/H22A Cam Specs." | Secondary | https://www.nolimitmotorsport.com/brian-crower/h22h22a.html | 2026-05-15 | A |
| 10 | MotorTrend. "The Honda Prelude: History, Generations, Models, and More." | Secondary | https://www.motortrend.com/features/honda-prelude-history-generations-models-specifications | 2026-05-15 | B+ |
| 11 | Automobile-catalog.com. "1996 Honda Prelude VTEC." | Secondary | https://www.automobile-catalog.com/car/1996/1505285/honda_prelude_vtec.html | 2026-05-15 | B |
| 12 | QWEN.md. "Honda H22 Research — Master Compiled Reference." | Primary | /data/h22/QWEN.md | 2026-05-15 | A |

---

## Notes

### Conflicts & Uncertainties

1. **Torque figure discrepancy:** Wikipedia lists 207 Nm (153 lb-ft) @ 5,500 rpm while Car and Driver measured 158 lb-ft @ 5,300 rpm. The C&D figure is from their own instrumented testing of a pre-production unit. The Wikipedia figure (153 lb-ft = 207 Nm) is consistent with JIS measurement convention. Both refer to the same engine; the difference likely reflects different testing methods (SAE gross vs. net) or calibration variations across model years. Using Wikipedia's 153 lb-ft @ 5,500 rpm as the factory-rated figure.

2. **HP rating convention:** Wikipedia lists 190 PS (187 hp) @ 6,800 rpm (JIS) while Car and Driver lists 190 hp @ 6,800 rpm (SAE net). These are consistent — 190 PS ≈ 187 hp SAE net. The C&D figure of 190 hp is slightly higher, possibly reflecting pre-production calibration differences.

3. **VTEC engagement RPM:** Car and Driver states VTEC engages "about 4,800 rpm" during light-throttle testing, while later sources cite 5,200–5,500 rpm. The system is variable by throttle position — the exact threshold depends on load. The 5,500 rpm figure commonly cited applies to heavier throttle loads; lighter throttle may engage earlier (~4,800 rpm). This is not a conflict but a feature of the VTEC system design.

4. **Piston volume:** Honda-Tech forum lists H22A1 piston volume as −1.8 cc. QWEN.md lists −1.8 cc for H22A1. mywikimotors does not specify H22A1 piston volume directly but notes it uses "small dome pistons" (vs Redtop dome pistons). The −1.8 cc figure is consistent across two independent sources.

5. **Cam profile source:** Brian Crower explicitly lists "USDM H22A1 ('94-'96)" with 288°/308° duration and 11.38/10.54 mm lift. This matches the JDM H22A Blacktop profile exactly, confirming the H22A1 used Blacktop cams detuned via intake/exhaust/ECU rather than cam changes.

6. **Fuel injector size:** mywikimotors states stock injectors until 1997 were 345 cc, and 1997+ H22A4 used 290 cc. This is corroborated by general H-series knowledge but not independently verified from a second source. Listed as noted.

7. **Automatic transmission:** Multiple sources confirm the VTEC was manual-only. However, the P5M ECU designation references an automatic variant — this appears to be an internal Honda designation for a planned A/T variant ECU that was never deployed in production. The P5M may have been developed for a cancelled A/T VTEC.

8. **FRM liner introduction:** The Weebly H-series specs page states "92-96 versions use closed-deck blocks but FRM liners were used in 94-96." This suggests early 1993 H22A1 engines may have used cast-in wear-resistant surfaces without the full FRM MMC process. This is an important distinction but lacks corroboration from a second source — marked as uncertain.

---

## Citations

1. Wikipedia contributors. "Honda H engine." *Wikipedia*, n.d. https://en.wikipedia.org/wiki/Honda_H_engine. Retrieved: 2026-05-15 16:00 UTC. Credibility: B+. Access: tavily_search.

2. Wikipedia contributors. "Honda Prelude." *Wikipedia*, n.d. https://en.wikipedia.org/wiki/Honda_Prelude. Retrieved: 2026-05-15 16:00 UTC. Credibility: B+. Access: tavily_search.

3. Honda Motor Co. "1992-1996 Honda Prelude H22A1 Service Manual." *Helms Manual*, n.d. /data/h22/OBD1_H22A_Service_Manual.md. Retrieved: 2026-05-15 16:00 UTC. Credibility: A+. Access: local_manual.

4. Car and Driver. "Tested: 1993 Honda Prelude Goes VTEC." *Car and Driver Archive*, Dec 1992/Jan 1993. https://www.caranddriver.com/reviews/a71038420/1993-honda-prelude-vtec-archive-test/. Retrieved: 2026-05-15 16:00 UTC. Credibility: A+. Access: tavily_extract.

5. Powertrain Products. "Honda H22A1 2.2L L4 Remanufactured Engine — 1996." *Powertrain Products*, n.d. https://www.powertrainproducts.net/product/1996-h22a1/. Retrieved: 2026-05-15 16:00 UTC. Credibility: A. Access: tavily_extract.

6. Honda-Tech Forum Members. "****Prelude Specifications and Stats****." *Honda-Tech Forums*, n.d. https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/. Retrieved: 2026-05-15 16:00 UTC. Credibility: B. Access: tavily_search.

7. AV Honda Parts/Cars/Tech. "H-Series Engine Specs." *Weebly*, n.d. https://devinshondasite.weebly.com/h-series-engine-specs.html. Retrieved: 2026-05-15 16:00 UTC. Credibility: B. Access: tavily_extract.

8. WikiMotors Admin. "Honda H22A engine." *WikiMotors*, n.d. http://mywikimotors.com/honda-h22a/. Retrieved: 2026-05-15 16:00 UTC. Credibility: B. Access: tavily_extract.

9. Brian Crower. "Honda H22/H22A Camshaft Specifications." *No Limit Motorsport*, n.d. https://www.nolimitmotorsport.com/brian-crower/h22h22a.html. Retrieved: 2026-05-15 16:00 UTC. Credibility: A. Access: tavily_search.

10. MotorTrend Staff. "The Honda Prelude: History, Generations, Models, and More." *MotorTrend*, n.d. https://www.motortrend.com/features/honda-prelude-history-generations-models-specifications. Retrieved: 2026-05-15 16:00 UTC. Credibility: B+. Access: tavily_search.

11. Automobile-catalog.com. "1996 Honda Prelude VTEC (man. 5)." *Automobile-catalog*, n.d. https://www.automobile-catalog.com/car/1996/1505285/honda_prelude_vtec.html. Retrieved: 2026-05-15 16:00 UTC. Credibility: B. Access: tavily_search.

12. H22 Research Project. "Honda H22 Engine — Exhaustive Technical Documentation." *QWEN.md*, n.d. /data/h22/QWEN.md. Retrieved: 2026-05-15 16:00 UTC. Credibility: A. Access: local_manual.

---

## Appendix

### Casting Number Reference Table

| Component | OEM Part / Casting | Application | Source |
|-----------|-------------------|-------------|--------|
| Block | H22A1, P13 | 1993–1996 Prelude VTEC | Powertrain Products |
| Head | P13 | 1993–1996 Prelude VTEC | Powertrain Products |
| Crankshaft | P0F | 1993–1996 Prelude VTEC | Powertrain Products |
| Intake Manifold | 17100-P5M-020 | 1993–1996 Prelude VTEC | HondaPartsNow |
| Intake Manifold Gasket | 17010-P5M-A01 | 1993–1996 Prelude VTEC | HondaPartsNow |

### Emission Group Code Reference

| Code | Region | Engine | Source |
|------|--------|--------|--------|
| 100 | California | H22A1 | OBD1 H22A Service Manual |
| 130 | 49-state | H22A1 | OBD1 H22A Service Manual |

### Key Differences Summary: H22A1 vs H22A Redtop

The H22A1 achieved its 30 PS deficit relative to the JDM Redtop through four primary measures:

1. **Compression ratio:** 10.0:1 vs 11.0:1 — allows regular unleaded fuel, reduces combustion temperature for emissions
2. **Cam profiles:** Blacktop cams (288°/308°) vs Redtop cams (306°/310°) — less aggressive, better low-end tractability
3. **Intake/exhaust:** Single runner + 60 mm TB + 51 mm exhaust vs dual runner + 62.5 mm TB + 57 mm exhaust — restricted airflow limits peak power
4. **ECU calibration:** US-specific fuel/ignition maps optimized for 87 AKI fuel and emissions compliance

These measures collectively reduced peak power by 30 PS (14%) and shifted the power band lower by 400 rpm, while improving low-end torque usability for US driving conditions and meeting Tier-0/Tier-1 emissions standards.

---

*This document represents research on the H22A1 USDM specifications, compiled from web sources and local manuals. All specifications cross-checked against at least 2 independent sources where possible.*
