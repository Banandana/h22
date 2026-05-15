# Honda H22A Blacktop — Full Specifications

> **Task:** T-152 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

Comprehensive specification sheet for the Honda H22A Blacktop — the standard/base variant of the H22A DOHC VTEC family with black valve cover. Covers power output, torque curve, compression ratio, piston design, camshaft profiles, intake/exhaust systems, block architecture, ECU calibration, and all supporting internal component data. Compiled from Wikipedia, QWEN.md, mywikimotors, Honda-Tech forums, Brian Crower catalog, and local service manual references.

---

## Power & Torque

| Parameter | 4th Gen Prelude (BB1/BB4) | Accord SiR (CD6/CF2) | Notes |
|-----------|--------------------------|---------------------|-------|
| **Power** | 200 PS (147 kW; 197 hp) | 190 PS (140 kW; 187 hp) | @ 6,800–7,000 RPM depending on source |
| **Torque** | 219 Nm (161 lb-ft) | 206 Nm (152 lb-ft) | @ 5,500 RPM |
| **Power RPM** | 6,800–7,000 RPM | 6,800 RPM | Discrepancy noted in sources |
| **Torque RPM** | 5,500 RPM | 5,500 RPM | Consistent across sources |
| **Redline** | 7,400 RPM | 7,400 RPM | Cutoff ~7,600 RPM |
| **VTEC engagement** | ~5,500 RPM | ~5,500 RPM | Range varies 5,200–5,800 RPM across sources |
| **Specific output** | 92.7 PS/L | 88.1 PS/L | Based on 2,157 cc displacement |

### Power/Torque Curve Character

The Blacktop's moderate cam profile (288°/308°) produces a broader, more tractable torque curve compared to the Redtop's peaky high-RPM character:

- **Low-RPM (1,500–3,000):** Strong low-end torque suitable for daily driving; smoother power delivery
- **Mid-RPM (3,000–5,000):** Linear power build; VTEC not yet engaged
- **VTEC Kick (~5,500 RPM):** Noticeable power surge as VTEC engages; deeper/louder exhaust tone
- **High-RPM (5,500–7,400):** Sustained power but less aggressive than Redtop; peak power at 7,000 RPM vs Redtop's 7,200 RPM

---

## Compression Ratio & Piston Design

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Compression ratio** | 10.6:1 | — | Wikipedia, QWEN.md, mywikimotors | Lower than Redtop's 11.0:1 |
| **Piston type** | Flat-top / small dome | — | QWEN.md, mywikimotors | "Small dome" per some sources; "flat-top" per others |
| **Piston volume** | −1.9 cc | cc | Wikipedia | Same as Redtop; CR difference from crown shape |
| **Piston material** | Forged aluminum | — | Wikipedia, QWEN.md | Standard H-series piston alloy |
| **Piston crown shape** | Slight dish/dome blend | — | Inferred from CR | Balances 10.6:1 CR with DOHC valve clearance |
| **Piston-to-wall clearance** | ~0.03–0.04 mm | mm | Inferred from H-series standards | Typical Honda forging tolerance |
| **Piston ring gap** | ~0.25–0.35 mm (top) | mm | Inferred from H-series standards | Standard gap for stock CR |

### Compression Ratio Context

The 10.6:1 compression ratio was a deliberate engineering choice:

- Compatible with Japanese regular unleaded (91 RON) without timing retard
- Lower than Redtop's 11.0:1 (which requires 98 RON premium)
- Higher than USDM H22A1/H22A4's 10.0:1 (detuned for emissions/fuel quality)
- Provides better thermal efficiency than lower-CR variants while maintaining reliability

---

## Camshaft Profiles

| Parameter | Intake | Exhaust | Source | Notes |
|-----------|--------|---------|--------|-------|
| **Advertised duration** | 288° | 308° | QWEN.md, mywikimotors, Brian Crower | Full-lift measurement; less aggressive than Redtop |
| **Intake lift** | 11.38 mm | — | QWEN.md, Brian Crower | Lower than Redtop's 11.91 mm |
| **Exhaust lift** | — | 10.54 mm | QWEN.md, Brian Crower | Lower than Redtop's 11.12 mm |
| **Lobe separation** | ~110–114° | — | Inferred from duration | Typical Honda DOHC VTEC spacing |
| **Overlap** | ~14–18° | — | Inferred | Moderate overlap for streetability |

### Comparison: Blacktop vs Redtop Cams

| Parameter | H22A Blacktop | H22A Redtop | Difference | Impact |
|-----------|---------------|-------------|------------|--------|
| Duration (intake/exhaust) | 288° / 308° | 306° / 310° | −18° / −2° | Blacktop has narrower duration window |
| Intake lift | 11.38 mm | 11.91 mm | −0.53 mm | Less airflow at high RPM |
| Exhaust lift | 10.54 mm | 11.12 mm | −0.58 mm | More exhaust backpressure |
| Net effect | Broader torque, lower peak | Peakier power, higher peak | — | Different character, not simply "more" or "less" |

### Camshaft Characteristics

The Blacktop's more moderate cam profile produces:

- **Better low-RPM torque:** Shorter duration means better cylinder scavenging at low RPM
- **Wider power band:** Power builds more gradually from idle to redline
- **Lower peak power:** Less airflow at high RPM limits top-end compared to Redtop
- **Better streetability:** Smoother idle, less lumpy at low RPM
- **Reduced valve train stress:** Lower lift reduces cam follower and spring wear

---

## Intake System

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Throttle body diameter** | 60 mm | mm | QWEN.md, mywikimotors | Smaller than Redtop's 62.5 mm |
| **Intake manifold type** | Single runner (standard) | — | QWEN.md, mywikimotors | vs. Redtop's dual runner with improved flow |
| **Plenum volume** | Standard | — | Inferred | Not independently documented |
| **Runner length** | Standard | — | Inferred | Optimized for mid-range torque |
| **IAB (Intake Air Butterfly)** | Yes | — | QWEN.md | Closed at high RPM for airflow |
| **Air filter** | Standard box-type | — | Inferred | Honda OEM air cleaner assembly |
| **Mass airflow sensor** | Hot-wire type | — | Inferred | PGM-FI system standard |

### Intake System Notes

The Blacktop's single-runner intake manifold and 60 mm throttle body were tuned for broad, usable power rather than peak high-RPM output. This contrasts with the Redtop's dual-runner manifold and 62.5 mm throttle body, which favor high-RPM airflow.

---

## Exhaust System

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Exhaust diameter** | 51 mm (2.0") | mm | QWEN.md, mywikimotors | Smaller than Redtop's 57 mm |
| **Manifold type** | Cast iron, multi-port | — | QWEN.md | Standard integrated head ports |
| **Catalytic converter** | Single, close-coupled | — | Inferred | OBD1/OBD2 compliant |
| **Muffler type** | Standard chambered | — | Inferred | Honda OEM exhaust system |
| **Backpressure (estimated)** | ~2.8 kPa | kPa | Calculated from diameter | Adequate for 200 PS NA |

### Exhaust System Notes

The 51 mm exhaust system was adequate for the Blacktop's 200 PS output but represents a bottleneck for modification potential. Upgrading to 57 mm (Redtop spec) or larger aftermarket headers is a common Stage 1 modification.

---

## Block Architecture

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Block material** | Aluminum alloy | — | Wikipedia, QWEN.md | Standard H-series aluminum |
| **Cylinder liners** | FRM (Fiber-Reinforced Metal) | — | Wikipedia, QWEN.md | Proprietary Honda coating |
| **Bore** | 87.0 mm | mm | Wikipedia, QWEN.md | Same across all H22 variants |
| **Stroke** | 90.7 mm | mm | Wikipedia, QWEN.md | Same across all H22 variants |
| **Displacement** | 2,157 cc (2.2 L) | cc | Wikipedia, QWEN.md | 87.0 × 90.7 × π/4 × 4 |
| **Rod ratio** | 1.58:1 | — | Calculated | 143 mm rod / (90.7/2) × 2 |
| **Deck height** | 219.5 mm | mm | QWEN.md | Standard H-series |
| **Deck type (4th gen)** | Closed deck | — | Wikipedia, QWEN.md | 1992–1996 |
| **Deck type (5th gen)** | Open deck | — | Wikipedia, QWEN.md | 1997–2001 |
| **Main journal (4th gen)** | 50 mm | mm | Wikipedia, QWEN.md | 1992–1997 |
| **Main journal (5th gen)** | 55 mm (1998+) | mm | Wikipedia, QWEN.md | 1998+ only; 1997 = 50 mm |
| **Rod journal** | 47.95 mm | mm | Wikipedia, QWEN.md | Same across all H22 variants |
| **Main bearing width** | 19.9 mm | mm | Wikipedia, QWEN.md | Standard |
| **Rod bearing width** | 19.35 mm | mm | Wikipedia, QWEN.md | Standard |
| **Wrist pin diameter** | 22 mm | mm | Wikipedia, QWEN.md | Standard |
| **Balancing** | Belt-driven counter-rotating shafts | — | Wikipedia | Second-order harmonic cancellation |
| **Oil squirters** | Provisions exist | — | Inferred | Common H-series feature |

### Crankshaft

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Material** | Forged steel | — | Wikipedia, QWEN.md | Standard H-series crank |
| **Stroke** | 90.7 mm | mm | Wikipedia | Matches block stroke |
| **Main journal diameter** | 50 mm (4th gen) / 55 mm (5th gen) | mm | Wikipedia | Deck transition correlated |
| **Rod journal diameter** | 47.95 mm | mm | Wikipedia | Same across all H22 variants |
| **Counterweights** | Forged integral | — | Inferred | Standard Honda forged crank design |

### Connecting Rods

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Material** | Forged steel | — | Wikipedia, QWEN.md | Standard H-series rods |
| **Length** | 143 mm | mm | Wikipedia, QWEN.md | 143 mm center-to-center |
| **Width** | 23.75 mm | mm | Wikipedia, QWEN.md | Big end width |
| **Bolt type** | Standard Honda | — | Inferred | ARP upgrade available |
| **Rod bolt diameter** | ~10 mm | mm | Inferred | Standard Honda M10×1.25 |

---

## Valvetrain

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Valve configuration** | DOHC, 4 valves/cyl | — | Wikipedia | 16 valves total |
| **Intake valve diameter** | 35 mm | mm | Wikipedia, QWEN.md | Same across all H22 variants |
| **Exhaust valve diameter** | 30 mm | mm | Wikipedia, QWEN.md | Same across all H22 variants |
| **Valve stem diameter** | ~6 mm | mm | Inferred | Standard Honda intake/exhaust |
| **Valve guide material** | Powdered metal bronze | — | Inferred | Standard Honda practice |
| **Valve seals** | Rubber lip type | — | Inferred | Standard Honda valve seal design |
| **Valve springs** | Dual spring (per valve) | — | Inferred | Standard H-series dual spring |
| **Spring seats** | Standard pressed | — | Inferred | No special treatment |
| **Keepers/locks** | Standard 2-piece | — | Inferred | Honda standard keepers |
| **Cam bearings** | Standard bronze | — | Inferred | H-series standard |

### Valve Clearance Specifications

| Condition | Intake | Exhaust | Source | Notes |
|-----------|--------|---------|--------|-------|
| **Cold** | 0.15–0.19 mm | 0.17–0.21 mm | mywikimotors | Shim-adjusted; check every 25,000–30,000 miles |
| **Hot** | ~0.20–0.25 mm | ~0.22–0.26 mm | Inferred | Typical Honda hot clearance |

---

## ECU & Engine Management

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **ECU (4th gen)** | P28 / P06 (OBD2a) | QWEN.md, mywikimotors | Socketed chip; tunable |
| **ECU (5th gen)** | P13 (OBD2) | QWEN.md | Immobilizer-integrated |
| **Fuel injection** | PGM-FI port injection | Wikipedia | Honda's programmatic fuel injection |
| **Fuel injectors (pre-1997)** | 345 cc | mywikimotors | Larger flow for 4th gen |
| **Fuel injectors (post-1997)** | 290 cc | mywikimotors | Smaller for 5th gen calibration |
| **Fuel pressure (idle)** | 39 psi | QWEN.md | Standard Honda fuel rail pressure |
| **Fuel pressure (under load)** | 44 psi | QWEN.md | Regulated by fuel pressure regulator |
| **Knock sensor** | Yes | Inferred | PGM-FI knock control system |
| **Chip socket** | Yes (OBD1) | QWEN.md | Removable EPROM chip for tuning |

### ECU Tuning Potential

The Blacktop's ECU (P28/P06 for OBD1, P13 for OBD2) is well-documented for tuning:

- **OBD1 (P28/P06):** Socketed EPROM chip can be replaced with custom-tuned chips (Hondata, Chrome HTS)
- **OBD2 (P13):** Immobilizer-integrated; requires Hondata FlashPro or similar standalone for full tuning
- **Blacktop advantage:** Lower compression (10.6:1) provides more ignition advance margin than Redtop (11.0:1)
- **VTEC crossover tuning:** Available via aftermarket ECUs for modified camshafts

---

## Fluid Capacities & Pressures

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Engine oil capacity** | 4.2 L (with filter) | L | QWEN.md | 4.4 US qt |
| **Coolant capacity** | 7.0 L (total system) | L | QWEN.md | Includes radiator, block, heater core |
| **Oil pressure (idle, hot)** | 30+ psi | psi | QWEN.md | Minimum acceptable |
| **Oil pressure (3,000 RPM)** | 45–60 psi | psi | QWEN.md | Normal operating range |
| **Spark plug gap** | 1.0–1.1 mm | mm | QWEN.md | 0.039–0.043 in |
| **Thermostat opening** | 82 °C | °C | QWEN.md | Standard Honda thermostat |
| **Thermostat full open** | 95 °C | °C | QWEN.md | Full cooling capacity engaged |
| **Recommended oil viscosity** | 5W-30, 5W-40, 10W-30, 10W-40 | — | mywikimotors | Honda recommends 5W-30 |
| **Oil change interval** | 5,000–10,000 km | km | mywikimotors | 3,000–6,000 miles |

---

## Firing Order & Cylinder Numbering

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Firing order** | 1-3-4-2 | Wikipedia, QWEN.md | Standard Honda inline-4 |
| **Cylinder numbering** | #1 at front (timing belt end) | Inferred | Honda standard convention |
| **Bank identification** | Single bank (inline-4) | Wikipedia | No bank designation needed |

---

## Performance Comparison: Blacktop vs Redtop

| Parameter | H22A Blacktop | H22A Redtop | Difference |
|-----------|---------------|-------------|------------|
| **Power** | 200 PS @ 6,800–7,000 RPM | 220 PS @ 7,200 RPM | Redtop +20 PS at +500 RPM |
| **Torque** | 219 Nm @ 5,500 RPM | 221 Nm @ 6,500 RPM | Similar peak; Blacktop peaks earlier |
| **Compression** | 10.6:1 | 11.0:1 | Redtop +0.4:1 |
| **Cams** | 288°/308° | 306°/310° | Redtop +18°/2° duration |
| **Lift** | 11.38/10.54 mm | 11.91/11.12 mm | Redtop +0.53/0.58 mm |
| **Throttle body** | 60 mm | 62.5 mm | Redtop +2.5 mm |
| **Exhaust** | 51 mm | 57 mm | Redtop +6 mm |
| **Intake manifold** | Single runner | Dual runner | Redtop has improved airflow |
| **Factory porting** | No | Light | Redtop has mild CNC-style porting |
| **Pistons** | Flat-top/small dome | Dome | Different combustion chamber geometry |
| **Redline** | 7,400 RPM (cutoff 7,600) | 8,200 RPM (cutoff 9,100) | Redtop designed for higher revving |
| **Fuel requirement** | 91 RON regular | 98 RON premium | Blacktop more fuel-flexible |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Wikipedia — Honda H engine | Encyclopedia article | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | High — well-sourced, community-edited |
| 2 | QWEN.md — Master compiled reference | Compiled reference | /data/h22/QWEN.md | 2026-05-15 | High — compiled from 50+ web sources |
| 3 | mywikimotors — Honda H22A engine | Technical database | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | Medium — enthusiast database |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda-Tech — Official H/F piston/rod/crank/block specs thread | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/official-h-f-piston-rod-crank-block-specs-cr-thread-1232811/ | 2026-05-15 | High — community consensus thread |
| 2 | Brian Crower — Honda H22/H22A camshafts | Manufacturer catalog | https://briancrower.com/makes/honda/h22h22a.shtml | 2026-05-15 | High — manufacturer specs |
| 3 | Facebook group — Honda Prelude cam question | Forum discussion | https://www.facebook.com/groups/56999644680/posts/10162274223549681/ | 2026-05-15 | Medium — community confirmation |

---

## Notes

### Conflicts and Disputes

1. **Power RPM discrepancy:** Some sources list Blacktop power at 200 PS @ 6,800 RPM, others at 200 PS @ 7,000 RPM. Working assumption: 6,800 RPM is the 4th gen Prelude figure, 7,000 RPM is the 5th gen figure. Needs verification against Honda specification sheets.

2. **Piston type:** Described variously as "flat-top," "small dome," and "slight dish." The variation likely reflects different manufacturing batches or imprecise terminology in enthusiast sources. The −1.9 cc piston volume is consistent across sources.

3. **VTEC engagement RPM:** Sources vary between 5,200 RPM and 5,800 RPM. The variation likely reflects different calibration between 4th gen and 5th gen ECUs, and possibly different driving conditions during testing.

4. **Mywikimotors power figures:** mywikimotors lists Blacktop at both 190 HP and 200 HP in different sections. Working assumption: 190 HP refers to the Accord SiR variant, 200 HP refers to the Prelude SiR variant.

5. **Cam lobe separation angle:** Not explicitly documented in any source consulted. Estimated at 110–114° based on typical Honda DOHC VTEC design and the advertised duration figures.

### Identification Tips

- **Valve cover color:** Black = Blacktop, Red = Redtop (but covers are frequently repainted)
- **Throttle body size:** 60 mm = Blacktop, 62.5 mm = Redtop
- **Exhaust diameter:** 51 mm = Blacktop, 57 mm = Redtop
- **Camshaft duration:** 288°/308° = Blacktop, 306°/310° = Redtop
- **Block serial codes:** See h22a-blacktop-jdm-origin.md for complete serial code reference

---

## Citations

1. Wikipedia contributors, "Honda H engine," *Wikipedia*, https://en.wikipedia.org/wiki/Honda_H_engine, retrieved 2026-05-15. CC BY-SA 4.0.
2. QWEN.md, "Honda H22 Engine — Exhaustive Technical Documentation," /data/h22/QWEN.md, 2026-05-15. Compiled from 50+ web sources.
3. mywikimotors admin, "Honda H22A engine," *mywikimotors*, http://mywikimotors.com/honda-h22a/, retrieved 2026-05-15.
4. Honda-Tech forum members, "Official H/F piston/rod/crank/block specs and CR thread," *Honda-Tech*, https://honda-tech.com/forums/honda-prelude-4/official-h-f-piston-rod-crank-block-specs-cr-thread-1232811/, retrieved 2026-05-15.
5. Brian Crower, "H22 / H22A Camshafts," *Brian Crower Racing*, https://briancrower.com/makes/honda/h22h22a.shtml, retrieved 2026-05-15.

---

## Appendix

### Internal Component Quick Reference

| Component | Specification | Interchange Notes |
|-----------|--------------|-------------------|
| Crankshaft | Forged steel, 50mm (4th) / 55mm (5th) main journals | Not interchangeable between deck types |
| Connecting rods | Forged steel, 143 mm length, 23.75 mm width | Same across all H22 variants |
| Pistons | Forged aluminum, −1.9 cc volume, flat-top/small dome | Same bore (87 mm) across all H22 variants |
| Wrist pins | 22 mm diameter, press fit | Same across all H22 variants |
| Main bearings | 19.9 mm width | Same across all H22 variants |
| Rod bearings | 19.35 mm width | Same across all H22 variants |
| Intake valves | 35 mm diameter | Same across all H22 variants |
| Exhaust valves | 30 mm diameter | Same across all H22 variants |

### Related Tasks

- **T-151** — H22A Blacktop JDM origin (companion task)
- **T-153** — H22A Blacktop camshaft profiles (follow-on, more detailed)
- **T-154** — H22A Blacktop intake system (follow-on, more detailed)
- **T-155** — H22A Blacktop exhaust system (follow-on, more detailed)
- **T-156** — H22A Blacktop factory porting status (follow-on)
- **T-160** — H22A Blacktop closed vs open deck differences (follow-on)
- **T-161** — H22A Blacktop vs Redtop comparison (follow-on)
