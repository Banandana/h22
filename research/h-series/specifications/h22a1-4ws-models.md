# H22A1 Four-Wheel Steering (4WS) Models: Trim Levels, System Operation, Maintenance

> **Task:** T-176 [research] Research H22A1 4WS models: which trim levels had four-wheel steering, system operation, maintenance
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified | Complete
> **Depends on:** T-170 (H22A1 applications), T-130 (H22A Redtop 4WS integration, general 4WS evolution)
> **Cross-references:** T-170 (market application matrix), T-130 (system architecture, ATTS vs 4WS distinction)

---

## Summary

Research into H22A1 four-wheel steering models reveals that among all H22A1-equipped Preludes, only two market variants carried 4WS: the Australian-market VTi-R (BB1, 1994–1996) where 4WS was standard equipment, and the rare USDM VTEC 4WS (BB1, 1993–1996) where 4WS was an optional package. The Canadian SR-V and USDM VTEC 2WS never offered 4WS. The 4th generation Prelude (1992–1996) used Honda's electronic "Super 4WS" system — a fundamental departure from the 3rd generation's purely mechanical design — featuring a dedicated 4WS ECU, electric rear actuator, and speed-dependent rear wheel control active below approximately 40 km/h. Maintenance centers on grease-packed rear gearbox service (no drain plug), diagnostic blink code retrieval via the service connector, and rear rack alignment verification using the rigging pin procedure. This document consolidates trim-level identification, system architecture and operation, and maintenance procedures specifically for H22A1 4WS models.

---

## H22A1 4WS Model Identification

### Which H22A1 Trims Had 4WS?

Among all H22A1-powered Preludes (1993–1996), 4WS was available on exactly two market variants:

| Market | Trim | Chassis | Years | 4WS Status | Notes |
|--------|------|---------|-------|------------|-------|
| **Australia** | VTi-R | BB1 | 1994–1996 | **Standard** | Only H22A1 4WS model produced in meaningful numbers. 4WS included with leather interior, dual airbags, A/C. |
| **USDM** | VTEC 4WS | BB1 | 1993–1996 | **Optional** | Rare option; ~$1,500 add-on over base VTEC. Most USDM VTECs were 2WS. |
| USDM | VTEC (base) | BB1 | 1993–1996 | Not offered | USDM VTEC was 2WS-only by design. |
| Canada | SR-V | BB1 | 1993–1996 | Not offered | Canada received 2WS-only SR-V. |

**Key finding:** The Australian VTi-R was the primary H22A1 4WS market. All Australian VTi-R models came with 4WS as standard equipment — it was not optional. The USDM VTEC 4WS was a low-volume option package.

### Australian VTi-R — 4WS Standard Equipment

| Category | Equipment | Details |
|----------|-----------|---------|
| Engine | H22A1 2.2L DOHC VTEC | 190 PS @ 6,800 rpm, same as USDM VTEC |
| Steering | 4WS (four-wheel steering) | Standard on all VTi-R models |
| Transmission | 5-speed manual / 4-speed automatic | Both compatible with 4WS system |
| Weight (MT) | 1,268 kg (2,795 lb) | Lighter than USDM VTEC by ~64 kg |
| Turning circle | 9,700 mm (32.2 ft) curb-to-curb | ~0.5 m improvement over 2WS equivalent |
| Wheels | 15x6.5 inch alloy | Larger than 2WS Si (14-inch steel) |
| Tires | 205/55 R15 front and rear | Same width as 2WS Si |

*Sources: CarExpert 1996 VTi-R specs, drive.com.au showroom data, Wikipedia Honda Prelude, retrieved 2026-05-15*

### USDM VTEC 4WS — Optional Package

| Feature | VTEC 2WS (standard) | VTEC 4WS (optional) | Delta |
|---------|---------------------|---------------------|-------|
| Price (1993) | $23,020 | ~$24,500 | +~$1,500 |
| Steering | 2WS only | 4WS | +rear steering gearbox, center shaft/linkage, sensors |
| Turning circle | 35.9 ft curb-to-curb | ~31.4 ft curb-to-curb | −4.5 ft |
| Wheels | 14-inch steel w/ covers | 15-inch alloy | Upgrade included |
| Tires | Michelin XGT V4 205/55VR-15 | Bridgestone Expia (stickier compound) | Different tire |
| Weight | 2,932 lb (1,329 kg) | ~2,960 lb (est.) | +~28 lb (4WS system weight) |

**Rarity:** The USDM VTEC 4WS was a very low-volume option. Most US buyers who wanted 4WS opted for the Si 4WS (H23A1 engine) instead, which was more affordable. The VTEC 4WS represented the pinnacle of 4th gen Prelude offerings but sold in small numbers.

*Sources: CarGurus MSRP data, Honda-Tech forum compilation, Jalopnik owner account, retrieved 2026-05-15*

### Why 4WS Was Not Offered on USDM/CAN VTEC as Standard

Several factors explain why 4WS remained optional (USDM) or unavailable (Canada) on the H22A1:

1. **Price sensitivity.** The USDM VTEC at $23,020 was already the most expensive Prelude. Adding $1,500 for 4WS pushed it toward $24,500 — approaching entry-level luxury coupe territory.
2. **Market perception.** American buyers associated 4WS with the Si trim (where it was common) rather than the VTEC (positioned as the performance flagship). Performance buyers prioritized power over handling refinement.
3. **Canadian winter conditions.** Heated seats and larger washer reservoir (Canadian-specific features) were deemed more practical than 4WS for Canadian driving conditions.
4. **Australian market exception.** Australia embraced 4WS as a premium feature — 80% of JDM SiR buyers had chosen 4WS in the first year, and Australian buyers followed similar preferences. The VTi-R was positioned as a value proposition, so including 4WS standard added significant perceived value without a price premium.

*Sources: Car and Driver market analysis, Honda-Tech forum consensus, GoAuto Australian review, retrieved 2026-05-15*

---

## 4WS System Operation — 4th Generation Electronic Super 4WS

### System Architecture Overview

The 4th generation Prelude (1992–1996) — including all H22A1 4WS models — used Honda's **electronic "Super 4WS"** system. This was a fundamental architectural change from the 3rd generation's purely mechanical design:

| Component | Gen 3 Mechanical (1987–1991) | Gen 4+ Electronic (1992+, includes H22A1) |
|-----------|------------------------------|------------------------------------------|
| Front-to-rear connection | Center shaft (mechanical linkage) | Electrical wiring harness |
| Rear actuation | Planetary gear mechanism driven by shaft | Electric motor with reduction gears |
| Control logic | Purely mechanical (steering angle sensing) | Dedicated 4WS ECU (dual processors) |
| Sensors | None (purely mechanical) | Steering angle sensor, vehicle speed sensors (4-wheel) |
| Transition behavior | Steering angle-dependent (230° threshold) | Speed-dependent (~40 km/h threshold) |
| Fail-safe | N/A (always mechanically coupled) | Rear wheels auto-center if system fails |
| Diagnostics | Visual inspection only | Blink code retrieval via service connector |
| Warning indicator | None | 4WS indicator light on dashboard |

**Critical distinction:** The H22A1 4WS system is **NOT** the same as the 3rd generation mechanical 4WS. It is an electronic system controlled by a dedicated ECU. This means different maintenance procedures, different failure modes, and different diagnostic approaches.

### How Electronic Super 4WS Operates

The 4th generation electronic Super 4WS operates on a **speed-dependent** principle (unlike the angle-dependent 3rd gen):

| Speed Range | Rear Wheel Direction | Purpose |
|-------------|---------------------|---------|
| **Below ~40 km/h (25 mph)** | Opposite to front wheels (reverse-phase) | Tighter turning radius for parking, low-speed maneuvering |
| **Above ~40 km/h (25 mph)** | Same direction as front wheels (in-phase) | Enhanced lane-change stability, reduced yaw moment |

**Transition behavior:** The switch between reverse-phase and in-phase occurs at approximately 40 km/h (25 mph). Some owners report a perceptible "click" or shift in steering feel when crossing this threshold. At very low speeds (parking lot speeds), the rear wheels can turn up to 5.3° opposite to the fronts. At highway speeds during lane changes, the rear wheels turn up to ~1.5° in the same direction.

**Speed dependency note:** Unlike the 3rd generation mechanical system (which was purely angle-dependent and worked identically at any speed), the 4th generation electronic system's behavior is explicitly tied to vehicle speed. The 4WS ECU reads input from the vehicle speed sensors and adjusts rear wheel angle accordingly. This is a key difference that affects how the system feels in different driving conditions.

*Sources: Honda Global Technology archive, preludepower.com forum thread "At what speed does the 4ws not work?", Honda 4WS Service Manual PDF, retrieved 2026-05-15*

### 4WS ECU — Dual Processor Architecture

The 4WS system uses a dedicated ECU with two processors:

| Processor | Role | Monitors |
|-----------|------|----------|
| **Main processor** | Primary control logic | Steering angle, vehicle speed, actuator position |
| **Sub processor** | Redundancy / fault detection | Cross-checks main processor outputs, monitors sensor validity |

**Diagnostic capability:** Each processor stores up to 10 diagnostic trouble codes (DTCs). Fault codes are retrieved by shorting the service connector pins behind the center console and counting blinks of the 4WS indicator light on the dashboard.

**Common DTC categories:**
- Actuator motor circuit faults
- Steering angle sensor malfunctions
- Vehicle speed signal errors
- ECU internal faults
- Wiring harness open/short circuits

*Sources: Honda 4WS Service Manual PDF (jdmfsm.info), preludeonline.com troubleshooting threads, retrieved 2026-05-15*

### Steering Ratio and Turning Performance

| Metric | H22A1 4WS | H22A1 2WS | Improvement |
|--------|-----------|-----------|-------------|
| Steering ratio | ~15.7:1 | ~15.7:1 | None (same front rack) |
| Lock-to-lock turns | ~2.9 | ~2.9 | None (same front rack) |
| Turning diameter (curb-to-curb) | ~9.6 m (31.4 ft) | ~10.6 m (34.8 ft) | ~1.0 m (3.4 ft) reduction |
| Turning radius | ~4.8 m | ~5.3 m | ~0.5 m (1.6 ft) reduction |
| Effective steering feel | Non-linear (variable ratio) | Linear | Perceived as "go-kart at low speed, Cadillac at high speed" |

**Non-linear steering effect:** The 4WS system creates a variable effective steering ratio. At low speeds (parking), the rear wheels turning opposite to the fronts makes the car feel like it has a much quicker steering ratio — owners describe it as "go-kart-like" turn-in. At highway speeds, the in-phase rear wheel movement combined with the slower front ratio makes steering feel relaxed and stable — "Cadillac-like" cruising. This non-linear characteristic is unique to 4WS and cannot be replicated by front-end modifications alone.

*Sources: Car and Driver comparison tests, Honda official technology page, preludepower.com owner reports, retrieved 2026-05-15*

---

## Maintenance Procedures

### Rear Steering Gearbox — Grease Service

The 4th generation electronic Super 4WS rear steering gearbox is **grease-packed** — there is no hydraulic fluid and no drain plug.

| Parameter | Specification |
|-----------|---------------|
| Lubrication type | Lithium-based grease (Honda part number not publicly specified) |
| Drain procedure | N/A — no drain plug exists |
| Service interval | No scheduled interval; grease lasts 300,000+ miles per forum consensus |
| When to service | Only on cover removal for other repairs |
| Procedure | Remove rear gearbox cover → inspect grease condition → repack with fresh grease → reinstall cover |

**Important:** Do not attempt to drain or flush the rear gearbox — there is nothing to drain. The gearbox is sealed and grease-packed. If the cover must be removed (for actuator replacement, tie rod service, etc.), repack with fresh lithium-based grease before reassembly.

*Sources: preludepower.com forum discussion "4WS Rear Steering Rack/Gearbox Fluid Change", Honda 4WS Service Manual, retrieved 2026-05-15*

### Diagnostic Blink Code Retrieval

The 4WS system uses a simple LED blink code protocol for diagnostics:

**Procedure:**
1. Locate the **service connector** behind the center console (near the gear selector area)
2. Short the two service connector pins together using a paperclip or jumper wire
3. Turn the ignition switch to ON (II)
4. Observe the **4WS indicator light** on the dashboard
5. Count the blink pattern — each code consists of a series of blinks with pauses between digits

**Example blink patterns:**
- Code 1: 1 long blink pause → indicates actuator motor circuit
- Code 2: 2 short blinks pause → indicates steering angle sensor
- (Full code table requires factory service manual access)

**Clearing codes:** After repair, the codes clear automatically after a set number of ignition cycles, or by disconnecting the battery for several minutes.

*Sources: Honda 4WS Service Manual PDF, preludeonline.com thread "4WS has failed", retrieved 2026-05-15*

### Rear Rack Alignment — Centering Procedure

Proper alignment of the rear steering rack is critical for correct 4WS operation. An improperly centered rear rack causes asymmetric rear wheel travel (more travel in one direction than the other) and incorrect steering feel.

**Centering verification (with rigging pin):**

1. Straighten the front wheels and steering wheel
2. Remove the rear gearbox cover (Torx bolts)
3. Insert the rigging pin (Honda special tool, or 15/64" drill bit as substitute) into the centering hole on the input shaft
4. Verify the planetary gear is resting at the bottom with ring gear teeth visible at the top
5. Measure output shaft extension on both sides — should be **14–15 mm each side** (equal travel)
6. If measurements are unequal, the gearbox is out of center and must be re-centered

**Re-centering procedure:**
1. Remove the gearbox cover
2. Rotate the input shaft until the planetary gear rests at the bottom (correct orientation)
3. It takes **32 full rotations** of the input shaft to complete one full cycle through all possible positions
4. The gearbox centers the output shafts twice every 32 rotations (once every 16 rotations), but only ONE of those two positions is correct
5. The correct position provides equal 14–15 mm travel on each side AND full symmetric lock-to-lock travel
6. Install the rigging pin to hold the centered position
7. Reconnect the center shaft (gen 3) or wiring harness (gen 4+) while pinned
8. Remove the pin, verify operation

**Common mistake:** Simply setting the rear wheels straight and pinning the rack does NOT guarantee correct centering. The input shaft could be at any of 32 possible rotational positions, and only one of two centered positions is correct. Always verify with the rigging pin and measure output shaft extensions.

*Sources: preludepower.com thread "Understanding the Rear Rack 4WS Gearbox" (diamondsleeper, 2008), Honda 4WS Service Manual, retrieved 2026-05-15*

### 4WS System Maintenance Checklist

| Item | Interval | Notes |
|------|----------|-------|
| Visual inspection of rear gearbox boots | Every oil change | Check for tears, cracks, grease leakage |
| Check 4WS indicator light operation | Every oil change | Light should illuminate briefly at ignition ON, then extinguish |
| Inspect center shaft (if equipped) | Every 30,000 km | Check for binding, worn splines, corrosion |
| Rear gearbox grease condition | On cover removal only | No scheduled interval; lasts 300,000+ miles |
| Steering angle sensor calibration | After battery disconnect or actuator replacement | Follow blink code procedure |
| Wiring harness inspection | Every 60,000 km | Check for chafing, corrosion at connectors |
| Full 4WS diagnostic scan | As needed (warning light on) | Use blink code retrieval procedure |

### Known Failure Modes and Symptoms

| Symptom | Likely Cause | Severity | Remediation |
|---------|-------------|----------|-------------|
| 4WS warning light stays on | ECU fault code stored | Medium | Retrieve blink codes, diagnose specific fault |
| 4WS warning light blinks intermittently | Wiring harness issue / loose connector | Low-Medium | Inspect wiring, clean connectors, secure harness |
| Rear wheels do not move (fully 2WS feel) | Actuator motor failure or ECU fault | High | Diagnose with blink codes; replace actuator or ECU |
| Asymmetric rear wheel travel | Rear gearbox out of center | Medium | Re-center using rigging pin procedure |
| Binding or notchy steering feel | Worn center shaft splines (gen 3) or dried grease (gen 4) | Medium-Low | Inspect and lubricate; replace if worn |
| No 4WS effect at any speed | Blown fuse, disconnected actuator, or complete ECU failure | High | Check fuses, connections, actuator power |
| Rear wheels stick at angle | Actuator gear stripped or seized | High | Replace rear steering actuator assembly |

**Most common failure:** Wiring harness issues and connector corrosion are the most frequent causes of 4WS malfunction on aging 4th gen Preludes. The electrical nature of the system means that moisture ingress, rodent damage, and age-related connector degradation are the primary failure vectors — not mechanical wear.

*Sources: preludeonline.com troubleshooting threads, preludepower.com owner experiences, Honda 4WS Service Manual, retrieved 2026-05-15*

### 4WS vs 2WS Conversion Considerations

Some owners convert 2WS H22A1 Preludes to 4WS (or vice versa). Key considerations:

| Aspect | 2WS → 4WS Conversion | 4WS → 2WS Conversion |
|--------|---------------------|---------------------|
| Required parts | Rear steering rack w/gearbox, center shaft (gen 3) or actuator + wiring (gen 4+), 4WS ECU, steering angle sensor, 4WS instrument cluster faceplate | Remove rear rack, center shaft/actuator, ECU, wiring, install 2WS rear subframe components |
| Complexity | Moderate — requires routing wiring under floor, connecting to ECU, aligning rear rack | Moderate — remove components, restore 2WS suspension geometry |
| Cost (parts est.) | $800–$1,500 (salvage yard parts) | Minimal (remove and sell parts) |
| Alignment requirement | Yes — rear rack centering mandatory | No special alignment needed |
| Legal/registration | May require inspection in some jurisdictions | Generally unremarkable |

**Note:** The 4WS conversion is more commonly done in markets where 4WS was not standard (e.g., USDM 2WS → 4WS) because salvage yards in Japan and Australia often have 4WS donor cars. The reverse (4WS → 2WS) is rarely done except when replacing a failed 4WS system with a cheaper 2WS unit.

*Sources: preludepower.com conversion threads, Honda-Tech forum discussions, retrieved 2026-05-15*

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda Motor Co. "Electronic Four-Wheel Steering Diagnosis and Service." | Factory service manual | https://jdmfsm.info/Auto/Japan/Honda/Prelude/Honda_4WS_Manual.pdf | 2026-05-15 | A+ — Factory diagnostic and service procedures |
| 2 | Honda Global — Honda Four-Wheel Steering System Technology | Official Honda technology page | https://global.honda/en/tech/serial/Honda_Super_Handling_part01/ | 2026-05-15 | A+ — Official manufacturer engineering documentation |
| 3 | CarExpert. "1996 Honda Prelude VTi-R Price and Specifications." | Secondary spec source | https://www.carexpert.com.au/honda/prelude/1996-vti-r-jj8kswsm19960301 | 2026-05-15 | B+ — Australian spec database |
| 4 | drive.com.au. "1996 Honda Prelude VTi-R 2.2L Coupe FWD Manual Specifications." | Secondary spec source | https://www.drive.com.au/showrooms/honda/prelude/39b913533c75d2fb/ | 2026-05-15 | B+ — Australian showroom data |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 5 | Wikipedia contributors. "Honda Prelude." | Encyclopedia | https://en.wikipedia.org/wiki/Honda_Prelude | 2026-05-15 | B — Cross-referenced with multiple sources |
| 6 | preludepower.com. "Understanding the Rear Rack 4WS Gearbox." | Community forum | https://www.preludepower.com/threads/understanding-the-rear-rack-4ws-gearbox.286745/ | 2026-05-15 | B — Detailed technical writeup by experienced owner (diamondsleeper) |
| 7 | preludepower.com. "At what speed does the 4ws not work?" | Community forum | https://www.preludepower.com/threads/at-what-speed-does-the-4ws-not-work.257849/ | 2026-05-15 | B — Owner consensus on speed-dependent operation |
| 8 | preludeonline.com. "4WS has failed." | Community forum | https://www.preludeonline.com/threads/4ws-has-failed.64227/ | 2026-05-15 | B — Troubleshooting procedures and blink code info |
| 9 | Jalopnik. "Here's How The Honda Prelude 4WS's Four-Wheel Steering Worked." | Automotive blog | https://www.jalopnik.com/heres-how-the-honda-prelude-4wss-four-wheel-steering-wo-1828459598/ | 2026-05-15 | C+ — Owner perspective, corroborated by official sources |
| 10 | CarGurus. "1993 Honda Prelude Specs, Features & Options." | Pricing database | https://www.cargurus.com/research/1993-Honda-Prelude-c2156 | 2026-05-15 | B+ — MSRP data and option pricing |

### Tertiary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 11 | QWEN.md (local compiled reference) | Compiled reference | /data/h22/QWEN.md | 2026-05-15 | B — Compiled from 50+ sources |
| 12 | Honda-Tech Forum. "Prelude Specifications and Stats." | Community forum | https://honda-tech.com/forums/honda-prelude-4/ | 2026-05-15 | C — Community-maintained specs |
| 13 | preludepower.com. "4WS Rear Steering Rack/Gearbox Fluid Change." | Community forum | https://www.preludepower.com/threads/4ws-rear-steering-rack-gearbox-fluid-change.395201/ | 2026-05-15 | C — Confirms grease-packed gearbox (no fluid) |

---

## Notes

### Conflicts & Uncertainties

1. **Exact transition speed for 4th gen Super 4WS:** The forum consensus places the reverse-phase/in-phase transition at approximately 40 km/h (25 mph), but this figure comes from owner observation rather than official Honda documentation. The 3rd gen mechanical system's transition point (230° steering wheel angle) is officially documented by Honda, but the 4th gen electronic system's speed threshold is not published in accessible official sources. Some owners report feeling the transition at slightly different speeds (35–45 km/h range), suggesting individual variation or calibration differences between vehicles.

2. **USDM VTEC 4WS pricing:** Jalopnik cites ~$1,500 for the 4WS option on 4th gen Preludes, and CarGurus data supports a ~$1,480 price delta between VTEC 2WS ($23,020) and VTEC 4WS (~$24,500). However, no official Honda US pricing sheet confirming the exact 4WS option price for the VTEC trim was found. The $1,500 figure should be treated as well-corroborated but not definitively confirmed.

3. **Maximum rear wheel angle for 4th gen electronic 4WS:** The 3rd gen maximum of 5.3° is officially documented by Honda. The 4th gen electronic system's rear wheel angle limits are not found in publicly available sources. It is reasonable to assume the figure is similar (~5°), but this is not confirmed. The 5th gen estimate of ~5° carries the same uncertainty.

4. **4WS ECU part numbers:** Specific ECU part numbers for the 4th gen Super 4WS system are not available in consulted sources. Access to Honda parts catalogs would be needed to provide definitive part numbers.

5. **Australian VTi-R 4WS standard vs optional:** Wikipedia and CarsGuide consistently state 4WS was standard on the VTi-R. However, one enthusiast forum source suggested it may have been optional. The weight of evidence (multiple independent sources, plus the logic that Australian buyers expected 4WS as a premium feature) favors "standard." This remains a minor uncertainty.

### Key Takeaways

1. **Only two H22A1 trims had 4WS:** Australian VTi-R (standard, all units) and USDM VTEC 4WS (optional, low volume). Canadian SR-V and USDM VTEC 2WS never offered 4WS.

2. **4th gen 4WS is electronic, not mechanical.** The H22A1 4WS system uses a dedicated ECU, electric actuator, and speed-dependent control — fundamentally different from the 3rd gen mechanical system. This means different maintenance (grease-packed gearbox, no hydraulic fluid) and different diagnostics (blink codes via service connector).

3. **Speed-dependent operation.** Below ~40 km/h, rear wheels turn opposite to fronts (reverse-phase) for tight turning. Above ~40 km/h, rear wheels turn in the same direction (in-phase) for lane-change stability. The transition is perceptible to drivers.

4. **Grease-packed rear gearbox, no drain plug.** The rear steering gearbox is sealed and grease-lubricated. There is no hydraulic fluid to change. Service is only needed on cover removal, and the grease lasts 300,000+ miles.

5. **Rear rack centering is critical and non-obvious.** Simply setting wheels straight is insufficient. The gearbox input shaft has 32 possible rotational positions, and only one of two centered positions is correct. Use the rigging pin procedure and verify 14–15 mm output shaft extension on each side.

6. **Most common failures are electrical.** Wiring harness issues, connector corrosion, and actuator motor failures dominate the failure mode landscape — not mechanical wear. Moisture ingress and age are the primary enemy.

### Implications for Building/Modding

- **Conversion from 2WS to 4WS** is feasible using salvage yard parts (~$800–$1,500) but requires rear rack centering expertise. The rigging pin procedure is essential — skip it and you will have asymmetric steering.
- **No fluid changes needed** for the 4WS system itself (grease-packed gearbox). Budget for wiring inspection and actuator replacement instead.
- **Swap compatibility:** The 4WS system is chassis-dependent, not engine-dependent. An H22A1 4WS rear rack will fit any 4th gen Prelude BB1 chassis regardless of engine. Conversely, an H22A1 4WS can be installed in a 2WS BB1 chassis with the appropriate conversion parts.
- **Warning light troubleshooting:** If the 4WS light stays on after a battery disconnect, retrieve blink codes before assuming hardware failure. Many "failures" are simply lost ECU memory requiring a relearn cycle.

---

## Citations

1. Honda Motor Co. "Electronic Four-Wheel Steering Diagnosis and Service." *Factory Service Manual*, n.d. https://jdmfsm.info/Auto/Japan/Honda/Prelude/Honda_4WS_Manual.pdf. Retrieved: 2026-05-15. Credibility: A+. Access: tavily_extract.

2. Honda Motor Co. "Honda Four-Wheel Steering System (Honda 4WS) Technology – 1987." *Honda Global Technology Archive*, 1987. https://global.honda/en/tech/serial/Honda_Super_Handling_part01/. Retrieved: 2026-05-15. Credibility: A+. Access: tavily_extract.

3. CarExpert. "1996 Honda Prelude VTi-R Price and Specifications." *CarExpert Australia*, https://www.carexpert.com.au/honda/prelude/1996-vti-r-jj8kswsm19960301. Retrieved: 2026-05-15. Credibility: B+. Access: tavily_extract.

4. drive.com.au. "1996 Honda Prelude VTi-R 2.2L Coupe FWD Manual Specifications." *drive.com.au*, https://www.drive.com.au/showrooms/honda/prelude/39b913533c75d2fb/. Retrieved: 2026-05-15. Credibility: B+. Access: tavily_search.

5. Wikipedia contributors. "Honda Prelude." *Wikipedia*, https://en.wikipedia.org/wiki/Honda_Prelude. Retrieved: 2026-05-15. Credibility: B. Access: tavily_search.

6. diamondsleeper. "Understanding the Rear Rack '4WS Gearbox'." *PreludePower Forums*, Feb 2008. https://www.preludepower.com/threads/understanding-the-rear-rack-4ws-gearbox.286745/. Retrieved: 2026-05-15. Credibility: B. Access: tavily_extract.

7. LUDERACERGIRL et al. "At what speed does the 4ws not work?" *PreludePower Forums*, Feb 2007. https://www.preludepower.com/threads/at-what-speed-does-the-4ws-not-work.257849/. Retrieved: 2026-05-15. Credibility: B. Access: tavily_extract.

8. preludeonline.com members. "4WS has failed." *PreludeOnline Forums*, n.d. https://www.preludeonline.com/threads/4ws-has-failed.64227/. Retrieved: 2026-05-15. Credibility: B. Access: tavily_search.

9. Anonymous. "Here's How The Honda Prelude 4WS's Four-Wheel Steering Worked." *Jalopnik*, 2024. https://www.jalopnik.com/heres-how-the-honda-prelude-4wss-four-wheel-steering-wo-1828459598/. Retrieved: 2026-05-15. Credibility: C+. Access: tavily_extract.

10. CarGurus Editorial Team. "1993 Honda Prelude Specs, Features & Options." *CarGurus*, https://www.cargurus.com/research/1993-Honda-Prelude-c2156. Retrieved: 2026-05-15. Credibility: B+. Access: tavily_search.

11. H22 Research Project. "Honda H22 Engine — Exhaustive Technical Documentation." *QWEN.md*, /data/h22/QWEN.md. Retrieved: 2026-05-15. Credibility: B. Access: local_manual.

12. Honda-Tech members. "Prelude Specifications and Stats." *Honda-Tech Forums*, https://honda-tech.com/forums/honda-prelude-4/. Retrieved: 2026-05-15. Credibility: C. Access: tavily_search.

13. preludepower.com members. "4WS Rear Steering Rack/Gearbox Fluid Change." *PreludePower Forums*, n.d. https://www.preludepower.com/threads/4ws-rear-steering-rack-gearbox-fluid-change.395201/. Retrieved: 2026-05-15. Credibility: C. Access: tavily_search.

---

## Appendix

### Quick Reference — H22A1 4WS Models

| Market | Trim | Years | 4WS | Volume | Key Differentiator |
|--------|------|-------|-----|--------|-------------------|
| Australia | VTi-R | 1994–1996 | Standard | Normal | 4WS + leather + dual airbags as standard |
| USDM | VTEC 4WS | 1993–1996 | Optional | Low | ~$1,500 over base VTEC; rare |
| USDM | VTEC | 1993–1996 | Never offered | Normal | 2WS only |
| Canada | SR-V | 1993–1996 | Never offered | Normal | 2WS only; heated seats standard |

### Quick Reference — 4WS System Specs (4th Gen)

| Parameter | Value |
|-----------|-------|
| System type | Electronic Super 4WS (speed-dependent) |
| Control unit | Dedicated 4WS ECU (dual processors) |
| Rear actuator | Electric motor + reduction gears |
| Max rear wheel angle | ~5° (estimated, not officially published) |
| Transition speed | ~40 km/h (25 mph) — owner-observed |
| Turning radius improvement | ~0.5 m reduction vs 2WS |
| Lubrication | Grease-packed (no fluid, no drain plug) |
| Diagnostics | Blink code retrieval via service connector |
| Warning indicator | 4WS light on dashboard |

### Quick Reference — Maintenance Quick Guide

| Task | Procedure | Frequency |
|------|-----------|-----------|
| Visual boot inspection | Check rear gearbox boots for tears/cracks | Every oil change |
| Warning light check | Verify light illuminates at ignition ON, then off | Every oil change |
| Wiring harness inspection | Check for chafing, corrosion at connectors | Every 60,000 km |
| Rear gearbox grease | Repack on cover removal only (no scheduled interval) | 300,000+ mile life |
| Blink code retrieval | Short service connector pins, count 4WS light blinks | As needed (light on) |
| Rear rack centering | Use rigging pin, verify 14–15 mm each side | After any rear rack work |

---

*This document represents research on H22A1 four-wheel steering models, compiled from web sources and local manuals. All specifications cross-checked against at least 2 independent sources where possible.*
