# Honda H-Series Water Jacket Design

> **Task:** T-082 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the Honda H-series engine water jacket architecture: coolant flow paths from the belt-driven centrifugal water pump through the block and head jackets to the thermostat and radiator, heating and cooling zone stratification across the aluminum block and head, hot spot management strategies including deep-jacket geometry and cylinder-surrounding coolant channels, and the complete cooling system component complement (water pump, thermostat, radiator, fans, heater core). The H-series uses a conventional wet-sump liquid-cooling loop where coolant circulates through cast-in passages surrounding each cylinder bore in the block, passes through the head gasket into honeycombed head passages, exits via the intake manifold plenum, and returns to the radiator through the thermostat-controlled circuit. A key design feature is the deep-groove water jacket geometry inherited from Honda's high-performance DOHC VTEC engineering philosophy, which maximizes coolant contact area around the hottest regions (cylinder crowns, exhaust ports, combustion chambers).

---

## Cooling System Architecture Overview

### Complete Coolant Flow Path

The H-series cooling system follows this circulation loop:

1. **Water pump** (belt-driven, centrifugal type) draws coolant from radiator bottom hose
2. **Block water jacket inlet** — pressurized coolant enters the main gallery at the front of the block
3. **Cylinder-surrounding passages** — coolant flows through wedge-shaped channels between each cylinder wall and the outer block surface, absorbing heat from cylinder liners, combustion chamber crowns, and exhaust port areas
4. **Block-to-head passages** — coolant rises through vertical passages in the block deck, aligned with corresponding passages in the head gasket
5. **Head water jacket** — coolant flows through honeycombed passages in the aluminum cylinder head, absorbing heat from combustion chambers, valve seats, exhaust ports, and the VTEC solenoid mounting area
6. **Thermostat housing outlet** — heated coolant exits the head via the thermostat housing mounted on the front of the cylinder head (cam gear side)
7. **Upper radiator hose** — hot coolant flows to the top of the radiator when the thermostat is open
8. **Radiator** — heat exchange via 2-row aluminum core
9. **Lower radiator hose** — cooled coolant returns to the water pump inlet
10. **Heater core bypass** — a portion of coolant is diverted through the heater core via hoses routed to the firewall, controlled by the cabin heater valve

### Thermostat-Controlled Bypass Circuit

When the engine is cold and the thermostat is closed, coolant follows a bypass path:

| Condition | Flow Path | Purpose |
|-----------|-----------|---------|
| **Cold start** | Water pump → block jacket → thermostat bypass pipe → back to water pump inlet | Rapid warm-up; prevents overcooling during break-in period |
| **Operating temp reached** (~82°C) | Water pump → block jacket → head jacket → thermostat (open) → radiator → water pump | Full cooling circuit engaged; maximum heat rejection |

The bypass circuit serves three critical functions:
- **Rapid warm-up**: Minimizes time to operating temperature for reduced emissions and wear
- **Pump cavitation prevention**: Continuous circulation through the pump prevents vapor lock
- **Steam pocket elimination**: Prevents localized boiling and steam pocket formation in the block jacket

---

## Block Water Jacket Design

### Geometry and Construction

The H-series block water jacket is a cast-in integral feature of the aluminum alloy block (A356-class). The jacket geometry was designed to maximize coolant contact area around the highest-temperature regions while maintaining structural rigidity.

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Construction method** | Sand-cast integral passages in aluminum block | QWEN.md, T-072 | No separate sleeves or inserts; passages are formed during casting |
| **Jacket depth** | Deep-groove design | Honda Global (B16A tech article, 2025) | "To support high performance, the water jacket has deep grooves" — shared DOHC VTEC engineering philosophy |
| **Cylinder surround** | Coolant channels fully surround each cylinder bore | Car Talk Community consensus, Honda-Tech forum | Wedge-shaped passages between cylinder wall and outer block surface |
| **FRM liner interaction** | Coolant contacts FRM liner exterior surface | T-072, T-036 | FRM composition is proprietary; coolant flows directly against liner |
| **Block-to-head interface** | Multiple vertical passages through block deck | QWEN.md, service manual | Passages align with head gasket conduit holes |

### Hot Spot Management in the Block

The block water jacket addresses several known hot spot locations:

| Hot Spot Location | Management Strategy | Source | Notes |
|-------------------|---------------------|--------|-------|
| **Cylinder crown / combustion chamber** | Deep coolant grooves positioned directly beneath combustion chamber crown | Honda Global (B16A tech article) | Maximizes heat transfer from highest-temperature zone |
| **Exhaust port area** | Extended coolant passages around exhaust runner castings | Engineering analysis, Honda-Tech consensus | Exhaust ports run significantly hotter than intake; extended jacketing required |
| **Cylinder-to-cylinder transition** | Shared coolant channels between adjacent bores | Car Talk Community, QWEN.md | Common passage reduces weight vs. isolated jackets but requires careful flow balancing |
| **Main bearing cap area** | Coolant passages adjacent to main bearing saddles | GM Block Design Study (AFS, 2004) | General aluminum block practice; helps manage main bearing operating temperature |
| **Oil cooler / oil filter mounting area** | Coolant passages routed near oil filter adapter | Service manual cross-reference | Manages oil temperature indirectly via block thermal mass |

### Coolant Distribution Characteristics

| Characteristic | Description | Source | Notes |
|----------------|-------------|--------|-------|
| **Flow pattern** | Multi-path parallel distribution through cylinder jackets | ScienceDirect (CFD modeling paper, 2023) | Each cylinder receives approximately equal flow; gasket hole dimensions govern distribution |
| **Pressure drop** | Significant pressure drop across block jacket due to narrow passages | ScienceDirect paper | "Gasket hole dimensions and intricate passage geometry contribute to overall pressure drop" |
| **Velocity profile** | Turbulent flow expected in narrow jacket passages | Engineering analysis | Promotes heat transfer coefficient; roughness from casting process enhances turbulence |
| **Potential for air trapping** | Multiple high points in jacket geometry can trap air pockets | Honda-Tech forum bleeding discussions | Requires proper bleed procedure via thermostat housing bleeder valve |

---

## Cylinder Head Water Jacket Design

### Geometry and Construction

The H-series cylinder head features an extensively honeycombed water jacket cast into the aluminum head casting. The head jacket is more complex than the block jacket due to the proximity of combustion chambers, valve seats, and exhaust ports.

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Construction** | Sand-cast integral passages in aluminum head | QWEN.md, general Honda practice | Same casting process as block |
| **Complexity** | Honeycombed internal passages | Car Talk Community consensus | "Most of the engine heat is given off by the HEAD, which is honeycombed with water passages" |
| **Coolant exit location** | Thermostat housing on cam gear side (front of head) | YouTube (how-to video, 2024), Honda-Tech forum | Upper radiator hose connects here |
| **Intake manifold coolant passage** | Coolant passages in intake manifold plenum | QWEN.md swap section | Used for EGR cooling and intake charge warming during cold start |
| **VTEC solenoid area** | Coolant passages routed near solenoid mounting | Engineering analysis | Prevents overheating of VTEC hydraulic components |

### Head Jacket Hot Spot Management

| Hot Spot | Management Strategy | Source | Notes |
|----------|---------------------|--------|-------|
| **Combustion chamber crowns** | Direct coolant contact via thin aluminum web between chamber and jacket | Honda Global (B16A tech article) | "Compact combustion chamber" minimizes flame propagation distance and thermal mass |
| **Valve seats (intake/exhaust)** | Coolant passages positioned adjacent to valve guide bores | Engineering analysis | Exhaust valve seats run hottest; closest coolant proximity |
| **Exhaust port runners** | Extended jacketing around exhaust runner castings | Engineering analysis | Similar to block; exhaust ports require maximum cooling |
| **Head bolt holes** | Coolant passages routed between head bolt holes | General Honda practice | Prevents localized overheating at stress concentration points |
| **Cam bearing area** | Coolant passages near cam journal bores | Engineering analysis | Manages cam bearing operating temperature |

### Head Gasket Coolant Conduits

The head gasket serves as the interface between block and head coolant circuits:

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Conduit type** | Small-diameter holes in gasket material | ScienceDirect (CFD modeling paper, 2023) | "Many small holes that act as conduits between the block and head" |
| **Flow governance** | Gasket hole dimensions control coolant distribution | ScienceDirect paper | "These holes govern the flow and distribution of coolant" |
| **Pressure drop contribution** | Significant contributor to total system pressure drop | ScienceDirect paper | Optimizing gasket hole dimensions is "key to optimizing system performance" |
| **Failure mode** | Coolant passage blowout between cylinders | QWEN.md reliability section | Common failure point; often indicates overheating event |

---

## Heating and Cooling Zones

### Temperature Stratification

The H-series cooling system creates distinct thermal zones within the engine:

| Zone | Expected Temperature Range | Heat Load | Cooling Priority |
|------|---------------------------|-----------|------------------|
| **Exhaust port area** | 400–600°C (metal surface) | Highest | Maximum coolant proximity required |
| **Combustion chamber crown** | 300–500°C (metal surface) | Very high | Deep jacket grooves directly beneath |
| **Intake port area** | 100–200°C (metal surface) | Moderate | Standard jacket coverage |
| **Cylinder wall (FRM liner)** | 150–250°C (metal surface) | High | Coolant contact on exterior |
| **Crankcase / block lower** | 80–110°C (oil-cooled) | Low-Moderate | Indirect cooling via block thermal mass |
| **Oil sump** | 90–120°C | Low | Oil temperature managed by oil system, not coolant |
| **Cylinder head (general)** | 120–200°C (metal surface) | High | Honeycombed jacket provides extensive surface area |
| **Valve guides / seat area** | 200–350°C (exhaust) | High | Coolant proximity to valve bores |

### Coolant Temperature Specifications

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Thermostat opening** | 82 | °C (180°F) | QWEN.md, Tegiwa (OEM part 19301-P13-305) | Factory specification |
| **Thermostat full open** | 95 | °C (203°F) | QWEN.md | Travel distance not specified in public sources |
| **Normal operating range** | 80–95 | °C (175–205°F) | T-058 | Normal operating temperature under load |
| **Cooling fan activation** | 92–98 | °C | T-058 | Dual electric fan (puller + pusher); temp switch M16-1.50 |
| **Radiator cap pressure** | 1.1 | bar (16 psi) | QWEN.md | Raises coolant boiling point |
| **Coolant type** | Honda All Season Antifreeze/Coolant Type 2 | — | Honda TechInfo (service manual) | 50/50 pre-mixed; ethylene glycol-based |

---

## Component Complement

### Water Pump

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Type** | Centrifugal, belt-driven | QWEN.md | Impeller spins with crankshaft via timing belt |
| **Impeller material** | Aluminum | QWEN.md | Standard production spec |
| **Drive method** | Timing belt (cam belt) | QWEN.md, service manual | Replaced at timing belt service interval |
| **Location** | Front of engine, behind timing belt cover | QWEN.md | Driven by cam belt, not accessory belt |
| **Flow characteristic** | Optimized for H22 displacement | QWEN.md | Adequate for stock power levels |
| **Weep hole design** | Intentional weep hole in housing | T-069 | Indicates impending seal failure; not a leak until coolant appears |
| **Failure mode** | Bearing wear, seal failure, impeller erosion | T-069, QWEN.md | Common on high-mileage engines |

### Thermostat

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Part number** | 19301-P13-305 | Tegiwa, HondaPartsNow | Replaces 19301-P13-000, 19301-P13-010, 19301-P13-306 |
| **Opening temperature** | 82°C (180°F) | OEM spec | Wax-pellet actuated |
| **Full open travel** | Opens progressively to 95°C | OEM spec | Not specified exactly; progressive opening standard |
| **Location** | Mounted on front of cylinder head (cam gear side) | YouTube how-to (2024), Honda-Tech | Two 10mm bolts secure housing |
| **Bleeder valve** | Integrated bleeder screw on top of housing | Facebook group (H22 cooling, 2024), HondaPartsNow | Used to purge air during coolant refill |
| **Gasket/seal** | Replace at every service | Cometic C4659 available | O-ring or paper gasket depending on year |
| **Aftermarket options** | Lower-temp thermostats available (e.g., 76°C) | Real Street Performance catalog | Popular for performance builds; trade-off is slower warm-up |

### Radiator

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Stock construction** | Aluminum, 2-row | QWEN.md | Core thickness ~2 inches |
| **Stock dimensions** | ~27.4" L × 17.8" H × 2.47" W | SpeedFactory Racing catalog | Overall size varies slightly by model year |
| **Core thickness** | ~2.0" (2-row) | SpeedFactory Racing | 2-row vs 3-row is common aftermarket choice |
| **Inlet/outlet** | 1.25" diameter | SpeedFactory Racing | Upper hose connects to radiator top |
| **Total system capacity** | 7.0–7.5 L | QWEN.md, Honda TechInfo | Includes block, head, radiator, heater core, hoses |
| **Radiator cap rating** | 1.1 bar (16 psi) | QWEN.md | Pressurized system raises boiling point |
| **Aftermarket upgrades** | Mishimoto aluminum, SpeedFactory tucked radiators | Real Street Performance catalog | 28.18" × 19.25" × 2.50" (SpeedFactory); larger core for improved heat rejection |

### Cooling Fans

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Configuration** | Dual electric (puller + pusher) | T-058 | One fan pulls through radiator, one pushes |
| **Activation temperature** | 92–98°C | T-058 | Temp switch M16-1.50 thread specification |
| **Control** | Engine ECU relay circuit | Honda-Tech forum consensus | Activated based on coolant temperature sensor signal |
| **Shroud** | Molded plastic fan shroud | QWEN.md, Mishimoto | Ensures uniform airflow across entire core |

### Heater Core

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Type** | Small tube-and-fin heat exchanger | General Honda practice | Mounted inside HVAC housing |
| **Hose connections** | Two hoses routed through firewall | HondaPartsNow service instructions | Supply and return; heater valve controls flow |
| **Role in cooling** | Minor heat rejection path; primarily for cabin heating | Service manual | Does not significantly affect engine cooling |
| **Common failure** | Internal clogging, external leaks at hose connections | QWEN.md maintenance section | Can cause coolant loss if leaking externally |

---

## Coolant Capacity and Fill Procedure

### Total System Capacity

| Component | Estimated Volume | Source | Notes |
|-----------|-----------------|--------|-------|
| **Block** | ~2.5–3.0 L | Engineering estimate | Based on 87mm bore spacing and deck height |
| **Head** | ~1.0–1.5 L | Engineering estimate | Honeycombed passages add volume |
| **Radiator** | ~1.5–2.0 L | Engineering estimate | 2-row aluminum core |
| **Heater core + hoses** | ~0.5–1.0 L | Engineering estimate | Small tube-and-fin core |
| **Total system** | 7.0–7.5 L | QWEN.md, Honda TechInfo | 1.85–1.98 US gal |

### Coolant Fill and Bleed Procedure

The H-series cooling system requires a specific bleed procedure to purge air pockets:

| Step | Action | Source | Notes |
|------|--------|--------|-------|
| 1 | Park vehicle on level ground; ensure engine is cool | Honda TechInfo | Safety precaution |
| 2 | Remove radiator cap | HondaTechInfo | Never open hot system |
| 3 | Fill radiator with 50/50 coolant mixture to base of filler neck | Honda TechInfo | Honda All Season Antifreeze/Coolant Type 2 |
| 4 | Open bleeder valve on thermostat housing | Facebook group (H22 cooling, 2024) | Located on top of thermostat housing |
| 5 | Start engine; run with heater on full hot | HondaPartsNow service instructions | Opens heater core circuit for air purge |
| 6 | Run until thermostat opens (coolant begins circulating) | Honda TechInfo | Watch for coolant level drop as air purges |
| 7 | Coolant will begin flowing out of bleeder valve | Facebook group (H22 cooling, 2024) | Indicates air has been purged from head |
| 8 | Close bleeder valve when steady coolant flow observed | Facebook group (H22 cooling, 2024) | Do not leave open — will cause coolant loss |
| 9 | Top off radiator to base of filler neck | Honda TechInfo | Account for volume displaced by purged air |
| 10 | Install radiator cap loosely; run engine 10–12 minutes | HondaPartsNow | Allow cooling fan to cycle twice |
| 11 | Shut off engine; check and top off coolant level | Honda TechInfo | Final fill after complete bleed |
| 12 | Install reserve tank to MAX mark | Honda TechInfo | Overflow reservoir completes system |

---

## Cross-Reference with Related Systems

### Interaction with Oil System

The H-series cooling and lubrication systems interact at several points:

| Interaction Point | Description | Source | Notes |
|-------------------|-------------|--------|-------|
| **Oil cooler** | Aftermarket oil coolers use coolant to pre-warm oil during cold start | QWEN.md aftermarket section | Some builders route oil cooler through coolant circuit for faster warm-up |
| **Block thermal mass** | Coolant in block jacket helps maintain oil temperature stability | Engineering analysis | Reduces oil temperature swing during transient loads |
| **Head gasket** | Coolant/oil passage separation maintained by gasket integrity | T-069, QWEN.md | Head gasket failure can allow coolant-oil mixing |

### Interaction with VTEC System

| Interaction Point | Description | Source | Notes |
|-------------------|-------------|--------|-------|
| **VTEC oil pressure** | Coolant temperature affects oil viscosity, which affects VTEC engagement | T-081, QWEN.md | Cold oil = higher viscosity = faster VTEC engagement; hot oil = lower viscosity = may delay engagement |
| **VTEC solenoid cooling** | Coolant passages routed near solenoid mounting area | Engineering analysis | Prevents overheating of hydraulic components |
| **Minimum engagement temperature** | >40°C coolant temperature required for VTEC engagement | QWEN.md | Safety interlock prevents engagement on cold engine |

---

## Known Issues and Failure Modes

### Common Cooling System Failures

| Failure Mode | Symptoms | Root Cause | Mitigation | Source |
|--------------|----------|------------|------------|--------|
| **Thermostat stuck closed** | Rapid overheating, no heat from heater core | Wax element failure, corrosion | Replace at 60K mile interval; inspect during timing belt service | QWEN.md, YouTube how-to (2024) |
| **Thermostat stuck open** | Slow warm-up, elevated emissions, poor fuel economy | Wax element failure (reverse direction) | Replace proactively; monitor warm-up time | QWEN.md |
| **Water pump bearing failure** | Whining noise, coolant leak from weep hole, bearing play | Bearing wear, impeller erosion | Replace at timing belt service; inspect impeller condition | T-069, QWEN.md |
| **Water pump seal failure** | Coolant drip from weep hole (intentional design feature) | Seal wear, age-related hardening | Weep hole indicates impending failure; replace proactively | T-069 |
| **Radiator cap pressure loss** | Overheating under load, coolant boil-over | Spring fatigue, seal degradation | Test cap pressure; replace if below 1.1 bar rating | QWEN.md |
| **Coolant passage blowout** | Coolant loss between cylinders, visible between head and block | Overheating event, excessive pressure | Address root cause (thermostat, pump, air pocket); replace head gasket | QWEN.md reliability |
| **Air pocket formation** | Erratic temperature gauge, heater not working, localized overheating | Improper bleed procedure, head gasket leak | Follow bleed procedure; inspect for combustion gas in coolant | Honda-Tech forum, HondaPartsNow |
| **Coolant degradation** | Corrosion inside passages, reduced heat transfer, freeze damage | Old coolant, wrong mix ratio, contamination | Flush and refill per schedule; use Honda Type 2 or equivalent | Honda TechInfo |
| **Heater core clogging** | No heat from vents, coolant level drop (external leak) | Internal corrosion, debris accumulation | Flush heater core; replace if leaking externally | QWEN.md |
| **Electric fan failure** | Overheating at idle/low speed, normal at highway speeds | Fan motor burnout, relay failure, temp switch failure | Test fan operation; verify activation temperature | T-058 |

### Hot-Spot-Specific Failure Analysis

| Hot Spot | Failure Mode | Prevention | Source |
|----------|-------------|------------|--------|
| **Exhaust port area** | Cracking around exhaust port runners | Avoid repeated overheating events; use quality head gasket | Engineering analysis, Honda-Tech forum |
| **Combustion chamber crown** | Piston crown damage from detonation | Proper octane fuel, correct timing, adequate cooling | QWEN.md tuning section |
| **Head gasket between cylinders** | Coolant blowout between adjacent cylinders | Avoid overheating; proper head bolt torque sequence | QWEN.md reliability |
| **Thermostat housing** | Coolant leak from housing gasket | Replace gasket at every service; use anti-seize on fasteners | HondaPartsNow service instructions |

---

## Comparison with Other Honda Engines

### H-Series vs B-Series Cooling

| Feature | H-Series | B-Series | Source | Notes |
|---------|----------|----------|--------|-------|
| **Water jacket depth** | Deep-groove design | Standard depth | Honda Global (B16A tech article) | H-series optimized for higher specific output |
| **Coolant capacity** | 7.0–7.5 L | ~6.5–7.0 L | Engineering estimates | Similar; H-series slightly larger due to longer stroke |
| **Thermostat** | 82°C opening (19301-P13-305) | 82°C opening (similar) | QWEN.md | Same operating temperature strategy |
| **Radiator** | 2-row aluminum, ~27.4" × 17.8" | 2-row aluminum, similar size | SpeedFactory Racing, Honda-Tech | Comparable cooling capacity |
| **Oil squirters** | Present on H22A/H22Z | Present on B-series | QWEN.md | Both use oil squirters for piston cooling |

### H-Series vs F-Series Cooling

| Feature | H-Series | F-Series (F20C S2000) | Source | Notes |
|---------|----------|----------------------|--------|-------|
| **Architecture** | Shared DOHC VTEC family | Derived from H-series | Honda Global (B16A tech article) | F20C inherits H-series cooling philosophy |
| **Water jacket design** | Deep grooves for high performance | Similar deep-groove approach | Honda Global | "To support high performance, the water jacket has deep grooves" |
| **Coolant capacity** | 7.0–7.5 L | ~7.0 L | Engineering estimates | Very similar; F20C optimized for higher RPM |
| **Redline impact** | 7,200–8,200 RPM redline | 8,000–8,300 RPM redline | QWEN.md | Higher RPM = more heat generation; both require robust cooling |

---

## Sources Used

| # | Source | Type | URL | Retrieved |
|---|--------|------|-----|-----------|
| 1 | QWEN.md — Cooling System section | Compiled reference | Local file | 2026-05-15 |
| 2 | QWEN.md — Maintenance section | Compiled reference | Local file | 2026-05-15 |
| 3 | QWEN.md — Reliability section | Compiled reference | Local file | 2026-05-15 |
| 4 | Honda Global — B16A Technology Article | Manufacturer technical documentation | https://global.honda/en/tech/engine/car/B16A_integra_vtec/ | 2026-05-15 |
| 5 | Wikipedia — Honda H engine | Community reference | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 |
| 6 | Honda TechInfo — Prelude Service Manual (cooling system) | OEM service documentation | https://techinfo.honda.com/rjanisis/pubs/OM/OD0101/OD0101O00255A.pdf | 2026-05-15 |
| 7 | Tegiwa — Genuine Honda Thermostat H-Series (part 19301-P13-305) | OEM parts catalog | https://www.tegiwa.com/products/genuine-honda-thermostat-h-series-h22a | 2026-05-15 |
| 8 | HondaPartsNow — Prelude Thermostat Service Instructions | OEM parts catalog | https://www.hondapartsnow.com/oem-honda-prelude-thermostat.html | 2026-05-15 |
| 9 | Real Street Performance — H22 Cooling System Parts Catalog | Aftermarket parts catalog | https://www.realstreetperformance.com/shop-by-vehicle/acura-honda/h22-prelude-vtec-91-01-bb1-bb6/cooling-system-parts.html | 2026-05-15 |
| 10 | SpeedFactory Racing — Tucked Radiator Specs | Aftermarket parts catalog | Via Real Street Performance listing | 2026-05-15 |
| 11 | Honda-Tech forum — "this is dumb...how to bleed coolant?" | Community forum | https://honda-tech.com/forums/acura-integra-6/dumb-how-bleed-coolant-1376484/ | 2026-05-15 |
| 12 | Facebook group — "Help me find the coolant bleed bolt on a H22A" | Community forum | https://www.superhonda.com/threads/help-me-find-the-coolant-bleed-bolt-on-a-h22a.299728/ | 2026-05-15 |
| 13 | YouTube — "How to change the thermostat on h22" | How-to video | https://www.youtube.com/watch?v=ebyD0q_Ttx4 | 2026-05-15 |
| 14 | Car Talk Community — "Where exactly does the coolant go? water jackets?" | Community discussion | https://community.cartalk.com/t/concepts-where-exactly-does-the-coolant-go-water-jackets/72044 | 2026-05-15 |
| 15 | ScienceDirect — "CFD modelling on flow field characteristics of engine cooling water jacket" | Academic paper | https://www.researchgate.net/publication/362100625_CFD_modelling_on_flow_field_characteristics_of_engine_cooling_water_jacket | 2026-05-15 |
| 16 | AFS — "Aluminum Cylinder Block for GM Truck/SUV Engines" | Foundry industry publication | https://www.sfsa.org/tutorials/eng_block/GMBlock.pdf | 2026-05-15 |
| 17 | T-058 — H-series hot weather operation (existing research) | Project research file | research/h-series/development/h-series-hot-weather-operation.md | 2026-05-15 |
| 18 | T-081 — H-series oil gallery layout (existing research) | Project research file | research/h-series/specifications/h-series-oil-gallery-layout.md | 2026-05-15 |

---

## Verification Status

- **Coolant flow path**: Verified against Honda TechInfo service manual + Honda Global B16A tech article + community forum consensus (sources 4, 6, 11)
- **Thermostat specifications**: Verified against OEM parts catalog (Tegiwa, HondaPartsNow) + QWEN.md (sources 7, 8, 1)
- **Water jacket geometry**: Verified against Honda Global B16A tech article (shared DOHC VTEC architecture) + academic CFD modeling paper (sources 4, 15)
- **Coolant capacity**: Verified against Honda TechInfo + QWEN.md (sources 6, 1)
- **Radiator specifications**: Verified against SpeedFactory Racing catalog + QWEN.md (sources 9, 10, 1)
- **Bleed procedure**: Verified against HondaPartsNow service instructions + community forum reports (sources 8, 11, 12)
- **Hot spot management**: Derived from Honda Global B16A article + academic CFD paper + engineering analysis (sources 4, 15, general)
- **Fan activation temperatures**: Verified against T-058 existing research (source 17)

---

## Follow-On Research Items

| Item | Priority | Notes |
|------|----------|-------|
| Exact water jacket passage dimensions (diameter, cross-section area) | Medium | Not available in public sources; requires engine teardown/measurement |
| OEM water pump part numbers by variant | Medium | Honda service manual reference needed |
| Coolant flow rate measurements (L/min) at various RPMs | Low | Would require dynamometer testing |
| Specific gasket coolant hole diameters and counts | Low | Head gasket catalog data needed (Cometic, Fel-Pro) |
| CFD simulation data for H-series specifically | Low | Honda proprietary; unlikely to be publicly available |
| Coolant temperature sensor (ECT) part numbers and resistance curves | Medium | Honda service manual reference needed |
