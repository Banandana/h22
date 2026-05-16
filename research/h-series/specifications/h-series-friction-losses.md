# H-Series Friction Losses — Piston Ring, Bearing, Windage, and Pumping Losses

> **Task:** T-089 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

This document compiles all known data on internal friction losses in Honda H-series engines (H22A/H22A1/H22A4/H23A). Friction losses are divided into four categories: piston ring friction (the largest single contributor), bearing friction (main and rod journals), windage losses (crankcase aero drag from rotating crankshaft and counterweights churning oil/air mixture), and pumping losses (work required to draw air through the intake and push exhaust out). Total engine friction at full load typically represents 3–9% of fuel energy; at part load it rises to 7–10%. At idle, friction consumes 100% of brake output (zero useful power). For a typical inline-4, the piston assembly accounts for ~49% of total FMEP, the crankshaft system ~18%, the connecting rod system ~16%, and the valve train system ~17%.

---

## Piston Ring Friction

### Overview

Piston ring friction is the single largest contributor to engine mechanical friction, accounting for approximately **30–32% of total engine friction** in modern gasoline engines. In a detailed ASME study of a 2.7L opposed-piston diesel (Achates Power, ICEF2018-9610), piston rings consumed **30.7%** of total frictional power. The piston ring/cylinder liner contact is described as "a large contributor to mechanical friction losses" requiring careful optimization (Diva-Portal, 2018). Multiple research studies conclude that piston ring and cylinder wall interactions account for as much as **40% of all engine friction** (Engine Builder Magazine, 2021).

### H-Series Piston Ring Specifications

| Parameter | Specification | Source | Notes |
|-----------|---------------|--------|-------|
| **Top Ring** | Chromed molybdenum | QWEN.md | Standard Honda design |
| **Second Ring** | Cast iron | QWEN.md | Compression ring |
| **Oil Ring** | Three-piece steel (rails + expander) | QWEN.md | Standard 3-piece design |
| **Top Ring End Gap** | 0.25–0.40 mm | QWEN.md | Fresh build spec |
| **Second Ring End Gap** | 0.30–0.45 mm | QWEN.md | Fresh build spec |
| **Oil Ring End Gap** | 0.15–0.40 mm | QWEN.md | Fresh build spec |

From the Innovation Discoveries technical guide for the H22A4 rebuild:

| Parameter | Specification | Source | Notes |
|-----------|---------------|--------|-------|
| **Top Ring End Gap** | 0.25–0.40 mm | Innovation Discoveries H22A4 guide | Fresh build spec |
| **Second Ring End Gap** | 0.40–0.55 mm | Innovation Discoveries H22A4 guide | Slightly wider than QWEN.md |
| **Oil Ring End Gap** | 0.20–0.70 mm | Innovation Discoveries H22A4 guide | Wide range for three-piece design |

**Conflicts noted:** The second ring gap specification differs between sources (QWEN.md: 0.30–0.45 mm vs. Innovation Discoveries: 0.40–0.55 mm). The wider gap from the rebuild guide may reflect tighter tolerances for worn bores or a different variant specification. Both are within normal ranges for a 87.0 mm bore.

### Friction Reduction Methods

| Method | Mechanism | Estimated Benefit | Source |
|--------|-----------|-------------------|--------|
| **Low-tension rings** | Reduced radial force against cylinder wall | 10–20% reduction in ring pack friction | Engine Builder Magazine, 2021 |
| **Molybdenum coatings** | Lower coefficient of friction on ring face | 15–25% reduction in ring friction | Driven Racing Oil, 2026 |
| **Plasma-moly rings** | Thick homogeneous Mo coating via plasma spray | 15–25% reduction; improved heat dissipation | Smeding Performance |
| **Optimized hone pattern** | 220 grit intermediate → 400 grit final, 10–12 RA finish, 20–22° crosshatch | Reduces boundary friction during run-in | CP Carrillo instruction sheet |
| **ZDDP additives** | Anti-wear film reduces metal-to-metal contact | Trade-off: reduces wear but increases friction | SwRI / Engine Labs, 2026 |

### H-Series Specific Notes

- The FRM (Fiber-Reinforced Metal) cylinder liner surface has a hardness approaching **9 on the Mohs scale** (approaching sapphire), requiring diamond or BNB honing stones. This extreme hardness reduces abrasive wear but may increase sliding friction compared to cast iron liners.
- The FRM surface finish is critical: rougher hones increase friction but reduce wear; smoother finishes reduce friction but can accelerate ring wear. The optimal compromise for H-series is a **10–12 RA finish with a 20–22° crosshatch angle**.
- Some H22 engines exhibit oil consumption attributed to piston ring wear accelerated by the FRM liner's interaction with conventional ring materials. Aftermarket solutions include low-tension ring sets and moly-coated rings.
- The H22A/H22A1 uses dome pistons (higher compression variants) while H22A4/H22A5/H22A8 use flat-top pistons. Dome pistons have slightly different ring groove geometry and may exhibit marginally different friction characteristics.

---

## Bearing Friction

### Overview

Bearing friction encompasses main bearings, rod bearings, and cam bearings. In the Achates Power study, main bearings consumed **8.6%** and rod bearings **4.8%** of total frictional power. The U.S. Department of Energy's parasitic friction analysis attributes approximately **1.0%** of fuel energy to bearing friction broadly. In a typical inline-4 engine, the crankshaft system (including main bearings, seals, and front/rear bearing oil seals) accounts for **~18% of total FMEP**, while the connecting rod system (rod bearings plus big end friction) accounts for **~16%**.

### H-Series Main Bearing Specifications

| Parameter | Specification | Source | Notes |
|-----------|---------------|--------|-------|
| **Journal Diameter (1992–1996)** | 50.0 mm (2.0 in) | QWEN.md | Closed deck blocks |
| **Journal Diameter (1997–2001)** | 55.0 mm (2.2 in) | QWEN.md | Open deck blocks, 1998+ |
| **Bearing Width** | 19.9 mm (0.78 in) | QWEN.md | All variants |
| **Bearing Material** | Tri-metal (Cu-Pb-Sn) | ACL Race Series Guide | Standard Honda spec |
| **ACL Part Number (pre-1998)** | 4B1912H (STD) | ACL Race Series Guide | H22A/H22Z |
| **ACL Part Number (1998+)** | 5M1957H (STD) | ACL Race Series Guide | 55mm journal |
| **Bearing Colors** | Pink (thinnest), Black, Brown, Green, Yellow (thickest) | Innovation Discoveries | Alphanumeric coding system |
| **Torque Spec** | 74 Nm (54 lb-ft) + 90° turn | Innovation Discoveries | Torque-to-yield bolts |

### H-Series Rod Bearing Specifications

| Parameter | Specification | Source | Notes |
|-----------|---------------|--------|-------|
| **Journal Diameter** | 47.95 mm (1.888 in) | QWEN.md | All variants |
| **Bearing Width** | 19.35 mm (0.762 in) | QWEN.md | All variants |
| **Bearing Material** | Tri-metal (Cu-Pb-Sn) | ACL Race Series Guide | Standard Honda spec |
| **ACL Part Number** | 4B1912H (STD) | ACL Race Series Guide | H22A/H22Z/H22A1/H22A4 |
| **Torque Spec** | 20 Nm (14 lb-ft) + 90° turn | Innovation Discoveries | Torque-to-yield bolts |
| **Rod Bolts** | ARP-style, torque-to-yield | Innovation Discoveries | Replace every teardown |

### Bearing Clearance Specifications

| Bearing Type | Clearance Range | Measurement Method | Source |
|-------------|-----------------|-------------------|--------|
| **Main Bearings** | See color-coded selection chart | Plastigauge (Green range) | Innovation Discoveries |
| **Rod Bearings** | See color-coded selection chart | Plastigauge (Green range) | Innovation Discoveries |
| **Thrust Clearance** | Not explicitly published | Plastigauge on thrust washer | Honda service manual |

Honda uses an alphanumeric coding system for bearing selection on the H22A4. Codes stamped on crankshaft counterweights identify individual main and rod journal diameters. Codes stamped on the engine block identify main bore diameters. The combination of block code and crank code determines which bearing color/thickness to install. Using the wrong grade bearing will result in either too much clearance (causing knocking and low oil pressure) or too little clearance (causing seizure at high RPM). Clearance tolerances on the H22A4 are extremely tight by design due to its high-revving nature.

### Bearing Friction Characteristics

- **Oil viscosity effect:** Thinner oils reduce bearing friction; thicker oils increase friction but improve load-carrying capacity. The H22's high-revving design benefits from thinner oils (5W-30 or 10W-30 per Honda spec).
- **Clearance vs. friction trade-off:** Tighter clearances increase flow resistance and oil pressure but also increase viscous friction. Looser clearances reduce friction but risk metal-to-metal contact under high load.
- **Temperature sensitivity:** Bearing friction decreases with temperature as oil viscosity drops. Cold-start friction is significantly higher than hot operating friction.
- **Oil pressure relationship:** Oil pressure is the result of oil flow volume from the pump and oil flow resistance in the engine. Higher pressure comes from greater resistance (tighter clearances); lower pressure results from less resistance (looser clearances).

---

## Windage Losses

### Overview

Windage losses (also called crankcase aero drag) occur when the rotating crankshaft, counterweights, and connecting rod big ends churn the oil/air mixture in the crankcase. The Achates Power study measured windage at **7.7%** of total frictional power. The U.S. DOE analysis estimates viscous losses (including windage) at **1.35%** of fuel energy. At 7,200 RPM (H22 redline), the surface velocity of the crankshaft counterweights is significant:

| Component | Radius | RPM | Surface Velocity |
|-----------|--------|-----|-----------------|
| Crank counterweight tip | ~45 mm | 7,200 | ~34 m/s (122 km/h) |
| Crank counterweight tip | ~45 mm | 8,200 | ~39 m/s (140 km/h) |
| Rod big end orbit | ~71.5 mm | 7,200 | ~58 m/s (209 km/h) |

At these speeds, the crankcase becomes a two-phase flow environment (oil mist + air), and drag effects multiply. As noted by Speed-Talk forum expert ptuomov, "if the Mach number gets driven closer to the speed of the assembly the drag effects multiply."

### H-Series Crankcase and Windage Management

| Component | Specification | Source | Notes |
|-----------|---------------|--------|-------|
| **Oil Pan Type** | Aluminum (OBD1: alloy sump; OBD2: standard deep pan) | QWEN.md | OBD1 shallower/lighter |
| **Baffle Plate** | Stamped steel plate (OEM part 11221-P5L-010) | QWEN.md | Between oil pan and main bearing cap bridge |
| **Windage Tray** | OEM part 11221-RAA-A00 | QWEN.md | Reduces crank drag |
| **Oil Pan Torque Spec** | 7 ft-lb (9.5 Nm) | QWEN.md | Aluminum pan, over-torque causes leaks |
| **Estimated Crankcase Volume** | ~1.8–2.2 L (OBD1) / ~2.0–2.5 L (OBD2) | Engineering estimate | Below crank centerline |

### Windage Reduction Methods for H-Series

| Method | Mechanism | Cost | Source |
|--------|-----------|------|--------|
| **OEM baffle plate** | Reduces oil slosh and separates oil from rotating components | $29.33 | QWEN.md |
| **OEM windage tray** | Screens oil from crank/rods, reduces aero drag | $41.06 | QWEN.md |
| **Moroso Race Baffled Oil Pan** | Trap door assembly, anti-slosh baffle, vertical wall keeps oil in pickup area; extra capacity | ~$527 | Extreme PSI |
| **1320 Performance H2B Baffled Pan** | Flat-bottom design, extra ground clearance, baffling | ~$329 | 1320 Performance |
| **Dry sump conversion** | Eliminates oil sump entirely; crankcase runs at low pressure | $2,000–4,000+ | Aftermarket |

### Important Notes

- A common forum observation (PreludePower, 2012): some H22 owners discover the baffle plate was missing after an oil pan removal, and reinstalling it eliminates a dull knock around 2,500 RPM.
- Balance shaft seal failures are sometimes incorrectly blamed on missing baffling. The real cause is PCV-induced crankcase pressure blowing out seals regardless of baffle plate presence.
- The OBD1 alloy sump is shallower and lighter (weight reduction focus), while the OBD2 standard pan is deeper with ~0.2–0.3 L more capacity. The deeper OBD2 pan may create slightly more windage drag due to increased oil volume and larger counterweight sweep area.
- Oil distribution at operating condition: sump ~2.0–2.5 L, main galleries ~0.3–0.4 L, rod galleries ~0.2–0.3 L, head/VTEC galleries ~0.4–0.5 L, valve train splash ~0.2–0.3 L. The sump volume directly affects windage losses — more oil = more drag.

---

## Pumping Losses

### Overview

Pumping losses represent the work the piston must do to draw the air/fuel mixture into the cylinder during the intake stroke and push exhaust gases out during the exhaust stroke. At part load (typical driving conditions), pumping losses are the dominant loss mechanism, consuming **7% of fuel energy** (vs. only 1% at full load). At idle, pumping losses approach 100% of indicated power because the throttle is nearly closed, creating a deep vacuum in the intake manifold.

For the H-series, pumping losses are influenced by:

1. **Intake system design** — runner length, plenum volume, throttle body size
2. **Exhaust system design** — header design, pipe diameter, catalytic converter restriction
3. **Valve timing and lift** — VTEC engagement dramatically changes overlap and scavenging
4. **Throttle position** — the primary control variable for pumping loss magnitude

### H-Series Intake System and Pumping Losses

| Parameter | H22A Redtop | H22A Blacktop | H22A4 | Source |
|-----------|-------------|---------------|-------|--------|
| **Intake Manifold** | Dual runner (Prelude) / Single runner (Accord Euro R) | Single runner | Single runner | QWEN.md |
| **Throttle Body** | 62.5 mm | 60 mm | 57 mm | QWEN.md |
| **Runner Length** | ~280 mm (dual runner) | ~250 mm (single runner) | ~250 mm (single runner) | Forum estimates |
| **Plenum Volume** | ~2.8 L (dual runner) | ~2.2 L (single runner) | ~2.0 L (single runner) | Forum estimates |

### H-Series Exhaust System and Pumping Losses

| Parameter | H22A Redtop | H22A Blacktop | H22A4 | Source |
|-----------|-------------|---------------|-------|--------|
| **Exhaust Diameter** | 57 mm | 51 mm | 51 mm | QWEN.md |
| **Header Design** | 4-2-1 (redtop) | 4-2-1 | 4-2-1 | QWEN.md |
| **Catalytic Converter** | High-flow (JDM) | Standard | Standard (USDM/EU) | QWEN.md |
| **Backpressure (est.)** | ~1.2 psi (at redline) | ~1.5 psi (at redline) | ~1.8 psi (at redline) | Engineering estimates |

### VTEC Effect on Pumping Losses

The H-series VTEC system has a notable effect on pumping losses:

- **Below VTEC engagement (~5,500 RPM):** Standard cam profiles with moderate overlap. Throttle position heavily influences pumping loss. At light load, the nearly-closed throttle creates significant vacuum (high pumping loss).
- **Above VTEC engagement:** Higher-lift cam profiles increase valve overlap, improving scavenging efficiency. The increased overlap acts as a form of internal EGR, reducing the effective throttling loss at mid-range RPM. This is one reason why VTEC engines feel more responsive once VTEC engages — pumping losses drop as the engine breathes more freely.

As noted in Honda's own engineering documentation on i-VTEC (which builds on classic VTEC principles): "At high engine speeds and wide-open throttle, VTEC switches to the high-lift cam, while VTC reduces overlap as much as possible, reducing pumping losses." While the H-series does not have VTC (variable timing control), the principle holds: high-lift cams at high RPM reduce pumping losses relative to what they would be with the low-lift profile.

### Pumping Loss Estimates for H-Series

| Condition | Estimated Pumping FMEP | Notes |
|-----------|----------------------|-------|
| **Idle** | 0.8–1.2 bar | Deep vacuum; 100% of indicated power consumed |
| **Part load (cruise)** | 0.4–0.6 bar | Moderate vacuum; dominant loss at this point |
| **WOT at 3,000 RPM** | 0.1–0.2 bar | Minimal restriction; low pumping loss |
| **WOT at 7,200 RPM** | 0.05–0.1 bar | Very low restriction; minimal pumping loss |
| **Restricted exhaust** | 0.2–0.4 bar additional | Catalytic converter or muffler restriction adds 0.2–0.4 bar |

*Note: These are engineering estimates based on typical inline-4 SI engine data. No direct dyno measurements of H-series pumping FMEP were found in publicly available sources.*

---

## Total Engine Friction Summary

### Friction Breakdown for Typical Inline-4 SI Engine

| Component | % of Total FMEP | % of Fuel Energy (full load) | % of Fuel Energy (part load) |
|-----------|-----------------|------------------------------|------------------------------|
| **Piston assembly** (rings + skirt) | 49% | 2.8% | 7.0% |
| **Crankshaft system** (main bearings + seals) | 18% | 1.0% | 2.5% |
| **Connecting rod system** (rod bearings + big end) | 16% | 0.9% | 2.3% |
| **Valve train system** | 17% | 1.3% | 3.3% |
| **Pumping losses** | N/A | 1.0% | 7.0% |
| **Ancillary losses** (oil pump, water pump, alternator) | ~5% | 1.6% | 4.0% |
| **Total mechanical friction** | 100% | 6.6% | 26.1% |
| **Brake thermal efficiency** | — | 29% | 20% |

*Sources: x-engineer.org (Cummins data), U.S. DOE (Fenske 2008), FEV engine loss diagrams*

### H-Series Specific Friction Considerations

1. **High-revving design:** The H-series redlines at 7,200–8,200 RPM. Friction power increases roughly linearly with mean piston speed, so friction losses at redline are approximately 2× those at 3,600 RPM. This means friction consumes a larger share of power at high RPM, which is one reason why high-revving engines benefit disproportionately from friction-reduction modifications.

2. **FRM liner interaction:** The extreme hardness of the FRM liner surface reduces abrasive wear but may increase sliding friction compared to cast iron. The optimal surface finish (10–12 RA, 20–22° crosshatch) is critical to minimizing ring pack friction.

3. **VTEC oil circuit:** The H-series oil pump must supply both lubrication and VTEC hydraulic actuation. The VTEC solenoid requires minimum 30 psi oil pressure at idle. This creates a design tension: higher oil pressure improves VTEC response but increases oil pump drag and bearing friction. Honda's solution is a trochoid (gerotor) oil pump with a pressure relief valve set to deliver sufficient VTEC pressure without excessive flow at low RPM.

4. **Balancer shafts:** The H-series includes balancer shafts to reduce secondary vibration. These add parasitic losses estimated at 0.5–1.5% of brake power. Removal is possible but increases NVH (noise, vibration, harshness).

5. **Coolant pump:** Belt-driven centrifugal pump, estimated drag 0.5–1.0% of brake power. Aftermarket aluminum impeller pumps reduce drag marginally.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md — Honda H22 Engine Master Reference | Compiled reference | Local file | 2026-05-15 | High — compiled from multiple verified sources |
| 2 | Innovation Discoveries — H22A4 Technical Guide | Technical article | https://www.facebook.com/InnovationDiscoveries/posts/honda-prelude-h22a4-vtec-cylinder-block-assembly-1998complete-technical-guide-en/1421185270029439/ | 2026-05-15 | Medium — Facebook post, unverified author |
| 3 | ACL Race Series Application Guide 2023 | Bearing catalog | https://aclraceseries.com/wp-content/uploads/2023/09/85261_ACL_Bearing_Race_Series_Guide_US_Version_Web_Version.pdf | 2026-05-15 | High — manufacturer specification |
| 4 | Driven Racing Oil — Complete Guide to Engine Friction | Technical blog | https://www.drivenracingoil.com/blogs/news/a-complete-guide-to-engine-friction-and-how-to-reduce-it | 2026-05-15 | Medium — commercial source, generally accurate |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 5 | Achates Power — ICEF2018-9610rev7_final.pdf (ASME) | Peer-reviewed paper | https://achatespower.com/wp-content/uploads/2019/12/ICEF2018-9610rev7_final.pdf | 2026-05-15 | High — peer-reviewed ASME conference paper |
| 6 | x-engineer.org — Mechanical Efficiency and FMEP | Educational website | https://x-engineer.org/mechanical-efficiency-friction-mean-effective-pressure-fmep/ | 2026-05-15 | High — well-sourced educational content |
| 7 | DieselNet — Friction and Ancillary Losses | Technical reference | https://dieselnet.com/tech/engine_efficiency_friction.php | 2026-05-15 | High — authoritative technical reference |
| 8 | U.S. DOE — Merit 08 Fenske (Parasitic Friction) | Government report | https://www.energy.gov/sites/prod/files/2014/03/f11/merit08_fenske.pdf | 2026-05-15 | High — U.S. Department of Energy |
| 9 | MIT — Lecture Notes: Friction and Tribology | Academic lecture notes | https://web.mit.edu/2.61/www/Lecture%20notes/Lec.%2019%20Friction%20and%20tribology.pdf | 2026-05-15 | High — MIT course material |
| 10 | Engine Builder Magazine — Bigger Radiator or Thinner Piston Rings? | Industry magazine | https://www.enginebuildermag.com/2021/06/bigger-radiator-or-thinner-piston-rings/ | 2026-05-15 | Medium — industry publication |
| 11 | Diva-Portal — Friction in Piston Ring-Cylinder Liner Contacts | Academic paper | https://www.diva-portal.org/smash/get/diva2:1076831/FULLTEXT01.pdf | 2026-05-15 | High — peer-reviewed academic |
| 12 | Sathyabama.ac.in — Engine Friction and Lubrication | Academic course material | https://www.sathyabama.ac.in/sites/default/files/course-material/2020-10/UNIT-II_0.PDF | 2026-05-15 | Medium — academic course material |
| 13 | Honda-Tech Forums — Standard or Low Tension Rings | Community forum | https://honda-tech.com/forums/tech-misc-15/standard-low-tension-rings-2120957/ | 2026-05-15 | Low — community discussion, anecdotal |
| 14 | Honda-Tech Forums — Pumping & Windage Losses | Community forum | https://honda-tech.com/forums/all-motor-naturally-aspirated-44/so-when-ya-gonna-talk-about-pumping-windage-losses-1040680/page2/ | 2026-05-15 | Low — community discussion, anecdotal |
| 15 | PreludePower — H22a Bottom End Rebuild (Baffle Plate) | Community forum | https://www.preludepower.com/threads/h22a-bottom-end-rebuild-sump-off-no-baffle-plate.351304/ | 2026-05-15 | Low — community discussion |
| 16 | CP Carrillo — Determining Ring End Gap | Manufacturer instructions | https://www.cp-carrillo.com/files/cp_instructionsheet_2019final-web.pdf | 2026-05-15 | High — manufacturer specification |
| 17 | Speed-Talk Forum — Windage Tray Discussion | Community forum | https://www.speed-talk.com/forum/viewtopic.php?t=51996&start=45 | 2026-05-15 | Medium — experienced builders |
| 18 | Extreme PSI — Moroso Race Baffled Oil Pans | Retailer product page | https://www.extremepsi.com/Moroso-Race-Baffled-Oil-Pans-Honda-Prelude-H22-and-H23.html | 2026-05-15 | Medium — retailer product description |
| 19 | 1320 Performance — H2B Baffled Oil Pan | Retailer product page | https://1320performance.com/products/1320-performance-oil-pan-for-h2b-cars-eg-ek-civic-h23a-h22a4 | 2026-05-15 | Medium — retailer product description |
| 20 | Smeding Performance — Plasma-Moly Ring Technology | Technical blog | https://smedingperformance.com/blogs/news/plasma-moly-ring-technology-enhancing-performance-with-advanced-materials | 2026-05-15 | Medium — commercial source |

---

## Notes

### Conflicts and Discrepancies

1. **Second ring end gap:** QWEN.md states 0.30–0.45 mm; Innovation Discoveries H22A4 guide states 0.40–0.55 mm. The wider gap may reflect a different variant specification or worn-bore allowance. Both are within normal ranges for an 87.0 mm bore.

2. **Piston ring friction percentage:** Sources vary from 30.7% (Achates Power, specific to their opposed-piston diesel design) to 40% (general consensus for SI engines). The higher figure is more applicable to the H-series as a spark-ignition engine with conventional piston ring design.

3. **Windage loss quantification:** No direct measurements of H-series windage losses were found. All figures are extrapolated from general engine friction studies and forum discussions. The 7.7% figure from the Achates Power study is the closest available data point but applies to a fundamentally different engine architecture (opposed-piston diesel vs. inline-4 SI).

4. **Pumping loss FMEP values:** No published FMEP measurements for the H-series were found. All values are estimates based on typical inline-4 SI engine data from x-engineer.org and FEV.

### Assumptions

- Friction percentages from the Achates Power study (30.7% piston rings, 8.6% main bearings, 4.8% rod bearings, 7.7% windage) are applied to the H-series with the caveat that the Achates engine is a completely different architecture (opposed-piston, two-stroke diesel). The percentages are used as order-of-magnitude estimates rather than precise values.
- The 49%/18%/16%/17% breakdown (piston assembly/crankshaft/connecting rod/valve train) from x-engineer.org is based on Cummins data for a typical inline-4 and is more directly applicable to the H-series.
- Crankcase volume estimates (1.8–2.2 L OBD1 / 2.0–2.5 L OBD2) are engineering estimates, not published by Honda.
- Intake runner lengths, plenum volumes, and backpressure figures are forum estimates, not measured data.

### Open Questions

1. Have any H-series engines been tested on an engine dynamometer with a motoring mode to directly measure FMEP? If so, the data is not publicly available.
2. What is the exact friction contribution of the H-series balancer shafts? The 0.5–1.5% estimate is generic.
3. How does the FRM liner surface finish affect ring pack friction compared to traditional cast iron liners? No comparative studies were found.
4. What is the actual pumping FMEP of the H22A Redtop vs. Blacktop vs. H22A4 configurations? Different intake/exhaust designs should produce measurable differences.

---

## Citations

1. Achates Power, "ICEF2018-9610rev7_final.pdf: Friction/Wear – Parasitic Energy Losses in a 2.7L Opposed-Piston Diesel Engine," ASME Internal Combustion Engine Division Fall Technical Conference, 2018. URL: https://achatespower.com/wp-content/uploads/2019/12/ICEF2018-9610rev7_final.pdf. Retrieved: 2026-05-15. Credibility: High — peer-reviewed ASME conference paper.

2. x-engineer.org, "Mechanical efficiency and friction mean effective pressure (FMEP)," based on Cummins engine data and FEV loss diagrams. URL: https://x-engineer.org/mechanical-efficiency-friction-mean-effective-pressure-fmep/. Retrieved: 2026-05-15. Credibility: High — well-sourced educational content with cited sources.

3. DieselNet, "Friction and Ancillary Losses," in Technology — Engine Efficiency. URL: https://dieselnet.com/tech/engine_efficiency_friction.php. Retrieved: 2026-05-15. Credibility: High — authoritative technical reference.

4. U.S. Department of Energy, Fenske, "Potential of Candidate Surface Treatments and Additives to Reduce Boundary Friction," Merit 08 presentation. URL: https://www.energy.gov/sites/prod/files/2014/03/f11/merit08_fenske.pdf. Retrieved: 2026-05-15. Credibility: High — government report.

5. MIT Course 2.61, "Lecture Notes: Lec. 19 — Friction and Tribology." URL: https://web.mit.edu/2.61/www/Lecture%20notes/Lec.%2019%20Friction%20and%20tribology.pdf. Retrieved: 2026-05-15. Credibility: High — MIT course material.

6. ACL Bearings, "Race Series Application Guide 2023." URL: https://aclraceseries.com/wp-content/uploads/2023/09/85261_ACL_Bearing_Race_Series_Guide_US_Version_Web_Version.pdf. Retrieved: 2026-05-15. Credibility: High — manufacturer specification.

7. Driven Racing Oil, "A Complete Guide to Engine Friction and How To Reduce It." URL: https://www.drivenracingoil.com/blogs/news/a-complete-guide-to-engine-friction-and-how-to-reduce-it. Retrieved: 2026-05-15. Credibility: Medium — commercial source, generally accurate.

8. Engine Builder Magazine, "Bigger Radiator or Thinner Piston Rings?" June 2021. URL: https://www.enginebuildermag.com/2021/06/bigger-radiator-or-thinner-piston-rings/. Retrieved: 2026-05-15. Credibility: Medium — industry publication.

9. Diva-Portal, "Friction in Piston Ring-Cylinder Liner Contacts," 2018. URL: https://www.diva-portal.org/smash/get/diva2:1076831/FULLTEXT01.pdf. Retrieved: 2026-05-15. Credibility: High — peer-reviewed academic.

10. CP Carrillo, "Determining Ring End Gap — Instruction Sheet 2019." URL: https://www.cp-carrillo.com/files/cp_instructionsheet_2019final-web.pdf. Retrieved: 2026-05-15. Credibility: High — manufacturer specification.

11. Sathyabama University, "UNIT-II: Engine Friction and Lubrication." URL: https://www.sathyabama.ac.in/sites/default/files/course-material/2020-10/UNIT-II_0.PDF. Retrieved: 2026-05-15. Credibility: Medium — academic course material.

12. Smeding Performance, "Plasma-Moly Ring Technology: Enhancing Performance with Advanced Materials." URL: https://smedingperformance.com/blogs/news/plasma-moly-ring-technology-enhancing-performance-with-advanced-materials. Retrieved: 2026-05-15. Credibility: Medium — commercial source.

13. Speed-Talk Forum, "Windage Tray Discussion," thread ID 51996. URL: https://www.speed-talk.com/forum/viewtopic.php?t=51996&start=45. Retrieved: 2026-05-15. Credibility: Medium — experienced builders.

14. Extreme PSI, "Moroso Race Baffled Oil Pans: Honda Prelude H22 & H23." URL: https://www.extremepsi.com/Moroso-Race-Baffled-Oil-Pans-Honda-Prelude-H22-and-H23.html. Retrieved: 2026-05-15. Credibility: Medium — retailer product description.

15. 1320 Performance, "H2B Baffled Oil Pan for H22/H23/F20B/F22/F23." URL: https://1320performance.com/products/1320-performance-oil-pan-for-h2b-cars-eg-ek-civic-h23a-h22a4. Retrieved: 2026-05-15. Credibility: Medium — retailer product description.

---

## Appendix

### Calculation: Crankshaft Counterweight Tip Velocity

For a crankshaft counterweight with radius r = 45 mm at various RPM:

| RPM | Angular Velocity (rad/s) | Tip Velocity (m/s) | Tip Velocity (km/h) |
|-----|-------------------------|--------------------|--------------------|
| 3,600 | 377 | 17.0 | 61 |
| 5,500 (VTEC engage) | 576 | 25.9 | 93 |
| 7,200 (Redtop redline) | 754 | 33.9 | 122 |
| 8,200 (Blacktop redline) | 859 | 38.7 | 139 |

### Calculation: Piston Mean Speed

For stroke = 90.7 mm, mean piston speed = stroke × RPM / 30:

| RPM | Mean Piston Speed (m/s) |
|-----|------------------------|
| 3,600 | 10.9 |
| 5,500 | 16.6 |
| 7,200 | 21.8 |
| 8,200 | 24.8 |

Mean piston speed is a key indicator of engine stress and friction level. The H22's mean piston speed at redline (21.8–24.8 m/s) is comparable to modern high-performance engines, explaining the need for precision bearing clearances and robust piston ring design.

### Glossary

| Term | Definition |
|------|-----------|
| **FMEP** | Friction Mean Effective Pressure — normalized measure of friction loss |
| **IMEP** | Indicated Mean Effective Pressure — theoretical pressure if no friction |
| **BMEP** | Brake Mean Effective Pressure — actual output pressure at crankshaft |
| **HT** | High Tension (piston rings) |
| **LT** | Low Tension (piston rings) |
| **RA** | Roughness Average — surface finish measurement in microinches |
| **PCV** | Positive Crankcase Ventilation |
| **VTEC** | Variable Valve Timing and Lift Electronic Control |
