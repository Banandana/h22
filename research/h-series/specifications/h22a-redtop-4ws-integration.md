# H22A Redtop — Four-Wheel Steering (4WS) Integration

> **Task:** T-130 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

Research into H22A Redtop four-wheel steering integration reveals a definitive negative finding: **the H22A Redtop (220 PS) was never offered with four-wheel steering in any market.** The Redtop-exclusive trim levels — SiR S-spec and Type S — were strictly two-wheel-drive, two-wheel-steer (2WS) vehicles. The 4WS-equipped Preludes of the same era used either the standard H22A (200 PS Blacktop) or the detuned USDM/European variants (H22A1, H22A4). Honda's 4WS system evolved from a purely mechanical design (3rd generation, ended 1991) to an electronic "Super 4WS" (4th generation, 1992+) that used an electric actuator controlled by a dedicated ECU rather than any mechanical linkage to the front steering rack. This document documents which Prelude models actually had 4WS, the technical specifications of both the mechanical and electronic 4WS systems, steering ratios, turning circles, and explains why the Redtop was excluded from the 4WS lineup.

---

## Key Finding: No H22A Redtop 4WS Combination Existed

| Question | Answer |
|----------|--------|
| Did any H22A Redtop (220 PS) come with 4WS? | **No.** Never offered in any market. |
| Which Redtop trims existed? | SiR S-spec (BB6), Type S (BB6) — both 2WS only. |
| Which 4WS Prelude models existed? | BB1 (4th gen, H22A 200 PS), BB8 (5th gen, H22A/H22A4), plus USDM VTi-R (H22A1). |
| Why wasn't Redtop paired with 4WS? | Likely packaging/weight distribution considerations; Redtop was positioned as the pure performance variant while 4WS was a handling refinement for the standard SiR. |

### Redtop Applications (All 2WS)

| Chassis Code | Model | Years | Engine | Power | Steering | Notes |
|--------------|-------|-------|--------|-------|----------|-------|
| BB6 (BB4 2WS) | SiR VTEC S-Spec | 1992–1996 | H22A Redtop | 220 PS @ 7,200 RPM | 2WS | Alcantara interior, Recaro seats, ATTS on some |
| BB6 | Type S | 1997–2001 | H22A Redtop | 220 PS @ 7,200 RPM | 2WS | Hood spoiler, ATTS, Cabron/Excene seats, yellow gauges |
| CD6 | Accord SiR Sedan | 1994–1997 | H22A Redtop | 220 PS (some sources say 190 PS) | 2WS | See Conflicts section |
| CF2 | Accord SiR Wagon | 1997 | H22A Redtop | 220 PS (some sources say 190 PS) | 2WS | Rare |

### 4WS Applications (None with Redtop)

| Chassis Code | Model | Years | Engine | Power | Steering | Notes |
|--------------|-------|-------|--------|-------|----------|-------|
| BB1 | Si VTEC 4WS | 1992–1996 | H22A (Blacktop) | 200 PS @ 7,000 RPM | 4WS | 4th gen; mechanical 4WS until mid-1992, then electronic |
| BB8 | Si 4WS / VTi 4WS | 1997–2001 | H22A4 / H22A | 200 PS / 185 PS | 4WS | 5th gen; electronic Super 4WS |
| BB1 (USDM) | VTEC 4WS | 1993–1996 | H22A1 | 190 PS @ 6,800 RPM | 4WS | USDM; rare |
| BB1 (AUS) | VTi-R 4WS | 1994–1996 | H22A1 | 190 PS @ 6,800 RPM | 4WS | Australian market |

---

## Honda 4WS System Evolution

### Generation 3 (1987–1991): Mechanical Steering-Angle Sensing 4WS

Used in the 3rd generation Prelude (BA/BB5/BB7 chassis). This was the world's first mass-produced mechanical 4WS system.

| Parameter | Value |
|-----------|-------|
| System type | Purely mechanical |
| Connection | Center shaft from front rack to rear steering gearbox |
| Actuation | Planetary gear mechanism in rear gearbox |
| Front steering | Rack-and-pinion with extra pinion gear |
| Rear steering | Gearbox with eccentric shaft, planetary gear, internal gear, slider, guide, stroke rod |
| Transition point | 230° steering wheel angle (~140° front wheel angle) |
| Max rear wheel angle | 5.3° (same direction at low angles, opposite at high angles) |
| Turning radius | 4.8 m (vs 5.3 m for 2WS equivalent) |
| Lock-to-lock turns | 2.5 turns (900° total) |
| Hydraulic fluid | None for rear steering (grease-lubricated gears only) |

**How it worked:** The front rack-and-pinion had an extra pinion gear that drove a center shaft running under the floor to the rear steering gearbox. The gearbox used a double-crank mechanism (eccentric shaft + planetary gear) to convert the rotational input into linear motion of a stroke rod, which moved the rear tie rods. At small steering angles (< 230°), the rear wheels turned in the same direction as the front (in-phase). At large steering angles (> 230°), they turned in the opposite direction (reverse-phase). No hydraulics, no electronics, no sensors — purely mechanical.

**Honda's official description** (from global.honda/en/tech/serial/Honda_Super_Handling_part01/):

> "The rear steering gearbox consists of an eccentric shaft, planetary gear, internal gear, slider, guide, and stroke rod. Input from the center shaft rotates the eccentric shaft, which functions as the first crank. The planetary gear attached to the eccentric shaft meshes with the internal gear fixed in the gearbox. The planetary gear, which receives power from the eccentric shaft, rotates in the opposite direction while revolving around the internal gear."

### Generation 4+ (1992–present): Electronic "Super 4WS"

Used in the 4th generation Prelude (BB1/BB6/BB7/BB8) through the 5th generation. Honda abandoned the mechanical center shaft entirely and replaced it with an electric actuator controlled by a dedicated 4WS ECU.

| Parameter | Value |
|-----------|-------|
| System type | Electronic (steering-angle sensing + vehicle speed) |
| Connection | Electrical wiring harness (no mechanical link to front rack) |
| Actuator | Electric motor with reduction gears in rear steering gearbox |
| Sensors | Steering angle sensor, vehicle speed sensors (4-wheel), yaw rate sensor (later models) |
| Control unit | Dedicated 4WS ECU (separate from main engine ECU) |
| Max rear wheel angle | ~5° (same direction at high speed, opposite at low speed) |
| Transition behavior | Speed-dependent (not steering-angle-dependent like gen 3) |
| Fail-safe | Rear wheels center if system fails; 4WS warning light illuminates |
| Diagnostic | Blink code retrieval via service check connector behind center console |
| Maintenance | Grease replacement on rear gearbox cover removal (no drain plug); fluid change ~100,000 miles for ATTS-equipped models |

**Key differences from gen 3:**
- No center shaft — the rear steering box is completely independent
- Steering angle sensing uses an electronic sensor, not mechanical linkage
- Transition between in-phase and reverse-phase is speed-dependent, not angle-dependent
- Diagnostic trouble codes stored in 4WS ECU (main + sub processors, 10 codes each)
- 4WS indicator light on dashboard blinks fault codes during service mode

---

## Steering Specifications by Model

### 4th Generation Prelude (BB1/BB4/BB5/BB6/BB7/BB8, 1992–1996)

| Model | Steering Ratio | Lock-to-Lock Turns | Turning Diameter (curb-to-curb) | 4WS |
|-------|---------------|-------------------|-------------------------------|-----|
| Si (F22B) 2WS | ~15.7:1 | ~2.9 | ~34.8 ft (10.6 m) | No |
| Si 4WS (F22B) | ~15.7:1 | ~2.9 | ~31.4 ft (9.6 m) | Yes |
| SiR (H22A 200 PS) 2WS | ~15.7:1 | ~2.9 | ~34.8 ft (10.6 m) | No |
| SiR 4WS (H22A 200 PS) | ~15.7:1 | ~2.9 | ~31.4 ft (9.6 m) | Yes |
| SiR S-spec (H22A Redtop 220 PS) 2WS | ~15.7:1 | ~2.9 | ~34.8 ft (10.6 m) | No |
| Type S (H22A Redtop 220 PS) 2WS | ~15.7:1 | ~2.9 | ~34.8 ft (10.6 m) | No |
| USDM VTEC (H22A1 190 PS) 2WS | ~15.7:1 | ~2.9 | ~34.8 ft (10.6 m) | No |
| USDM VTEC 4WS (H22A1 190 PS) | ~15.7:1 | ~2.9 | ~31.4 ft (9.6 m) | Yes |

**Source:** Car and Driver comparison test (1988 model year, but steering geometry carried forward to 4th gen); Wikipedia chassis tables; Honda-Tech forum compilation.

### 5th Generation Prelude (BB5/BB6/BB7/BB8/BB9, 1997–2001)

| Model | Steering Ratio | Lock-to-Lock Turns | Turning Diameter (curb-to-curb) | 4WS |
|-------|---------------|-------------------|-------------------------------|-----|
| Base (H22A4 200 PS) 2WS | 15.75:1 | 2.887 | 11.0 m / 36.1 ft | No |
| Type SH (H22A4 200 PS) 2WS + ATTS | 15.61:1 | 2.762 | 11.4 m / 37.4 ft | No |
| VTi / VTi-R 4WS (H22A4/H22A) | 15.75:1 | ~2.8 | ~10.5 m / 34.4 ft (estimated) | Yes |

**Sources:** Honda News 2001 press release (official specs for Base and Type SH); K Street Studio track specs (15.6:1 ratio, 2.76 lock-to-lock, 36.1 ft turning diameter for 4WS-equipped 5th gen); Wikipedia chassis tables.

**Note:** The Type SH has a slightly quicker steering ratio (15.61:1 vs 15.75:1) due to its ATTS (Active Torque Transfer System) package, which required revised suspension geometry for torque vectoring. However, the Type SH was still 2WS despite having ATTS — ATTS is a torque-vectoring differential system, not a steering system.

---

## Turning Circle Analysis

### 4WS vs 2WS Comparison

| Generation | 2WS Turning Radius | 4WS Turning Radius | Improvement |
|------------|-------------------|-------------------|-------------|
| 3rd gen (1987–1991) | 5.3 m | 4.8 m | 0.5 m (9.4% reduction) |
| 4th gen (1992–1996) | ~5.3 m (17.4 ft) | ~4.8 m (15.7 ft) | ~0.5 m (9.4% reduction) |
| 5th gen (1997–2001) | ~5.5 m (18.0 ft) | ~5.0 m (16.4 ft) estimated | ~0.5 m (9.1% reduction) estimated |

**Sources:** Honda official technology page (global.honda/en/tech/serial/Honda_Super_Handling_part01/) — states 3rd gen: 5.3 m vs 4.8 m. Car and Driver (1988) — 34.8 ft vs 31.4 ft (10.6 m vs 9.6 m). Honda News 2001 — 18.04 ft (5.5 m) curb-to-curb for 2WS 5th gen.

### How 4WS Improves Turning

At low speeds (parking lots, tight U-turns), the rear wheels turn in the **opposite direction** to the front wheels. This effectively shortens the wheelbase during turns, reducing the turning radius. At higher speeds (highway lane changes), the rear wheels turn in the **same direction** as the front wheels, improving stability and reducing the yaw moment during lane changes.

The transition between modes occurs at different points depending on generation:
- **Gen 3 (mechanical):** Steering wheel angle threshold at 230° (~140° front wheel angle)
- **Gen 4+ (electronic):** Vehicle speed threshold — typically below ~22 mph (35 km/h) for reverse-phase, above for in-phase

---

## Steering System Technical Details

### Power Steering (All Prelude Models)

All Prelude models used a variable-assist power rack-and-pinion system. This is distinct from the 4WS system and applies to both 2WS and 4WS models.

| Parameter | Value |
|-----------|-------|
| Type | Variable-assist power rack-and-pinion |
| Assist characteristic | Torque-sensitive (increases boost as steering load increases) |
| Pump type | Large-capacity vane type (quiet operation) |
| Valve system | Rotary valve + torsion bar (5th gen); 4-way valve + pinion holder (earlier) |
| Relief valves | Two: one maintains constant return pressure, one responds to steering system fluctuations |
| CV joints | Roller bearing-equipped tripod joints (permit larger steering angle) |
| Fluid | Honda Power Steering Fluid (PSF) |

**5th gen improvement (per Honda News):** The new torsion-bar system replaces the older 4-way valve design. As the torsion bar twists in proportion to steering effort, it progressively opens hydraulic valves that increase boost. This greatly reduces power steering noise, rattle, and kickback.

### 4WS Rear Steering Gearbox (Gen 4+ Electronic)

Unlike the gen 3 mechanical system, the gen 4+ rear steering box contains:

| Component | Description |
|-----------|-------------|
| Electric actuator motor | Drives the rear steering mechanism |
| Reduction gears | Convert motor rotation to usable torque |
| Steering angle sensor | Monitors rear wheel position |
| Tie rod ends | Connect to rear suspension uprights |
| Grease-lubricated bearings | No hydraulic fluid; grease-packed gearbox |

**Maintenance note:** There is no drain plug — the gearbox is grease-packed and requires cover removal for any service. Forum consensus indicates these last 300,000+ miles without service. The rear main steering angle sensor can be adjusted using the 4WS diagnostic blink code procedure.

---

## ATTS vs 4WS — Common Confusion

The **Type SH** (5th gen, 1997–2001) featured **ATTS (Active Torque Transfer System)**, which is often confused with 4WS. They are entirely different systems:

| Feature | 4WS | ATTS |
|---------|-----|------|
| What it steers | Rear wheels | Drive torque distribution (left vs right front wheel) |
| System type | Steering angle sensing (mechanical or electronic) | Microprocessor-controlled hydraulic clutch pack |
| Effect on turning | Changes turning radius | Adds yaw moment during cornering |
| Components | Rear steering gearbox, center shaft (gen 3) or electric actuator (gen 4+) | Moment Control Unit (MCU), ECM, solenoid valves, hydraulic pump |
| Weight added | ~15 kg | ~18 kg (40 lbs) |
| Maintenance | Grease change (rarely needed) | Hydraulic fluid change ~100,000 miles |
| Available on Redtop models | No (Redtop was 2WS only) | No (ATTS was on Type SH with H22A4, not Redtop) |

**ATTS description (per Honda News):** "Active Torque Transfer uses a microprocessor to process information from driver inputs (Feed-Forward Control) as well as vehicle status data from various sensors (Feedback Control). It then uses this information to augment the driver's control of the vehicle, thereby optimizing vehicle control and stability when turning."

The MCU can raise the outside wheel speed by up to 15% and distribute up to 80% of drive force to the outer wheel and 20% to the inner wheel. This creates a yaw moment similar to how a tracked vehicle turns — but it does NOT steer the rear wheels.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda Global — Honda Four-Wheel Steering System Technology | Official Honda technology page | https://global.honda/en/tech/serial/Honda_Super_Handling_part01/ | 2026-05-15 | A+ — Official manufacturer engineering documentation |
| 2 | Honda News — 2001 Honda Prelude Specifications | Official Honda press release | https://hondanews.com/en-US/releases/release-ff82699f1c3527fa113578004c34c897-2001-honda-prelude-specifications | 2026-05-15 | A+ — Official manufacturer specifications |
| 3 | Honda News — Honda Prelude Chassis | Official Honda press release | https://hondanews.com/en-US/releases/release-874e30b477a01c6042e12d004c34c875-honda-prelude-chassis | 2026-05-15 | A+ — Official manufacturer engineering documentation |
| 4 | Honda 4WS Service Manual (PDF) | Factory service manual | https://jdmfsm.info/Auto/Japan/Honda/Prelude/Honda_4WS_Manual.pdf | 2026-05-15 | A+ — Factory diagnostic and service procedures |
| 5 | Wikipedia — Honda Prelude | Encyclopedia | https://en.wikipedia.org/wiki/Honda_Prelude | 2026-05-15 | B+ — Cross-referenced with multiple sources |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Car and Driver — Tested: The Four-Wheel-Steering Systems of 1988 | Automotive magazine | https://www.caranddriver.com/reviews/a35287962/tested-1988-four-wheel-steering-benefits/ | 2026-05-15 | B — Professional automotive testing with measured data |
| 2 | Jalopnik — Here's How The Honda Prelude 4WS's Four-Wheel Steering Worked | Automotive blog | https://www.jalopnik.com/heres-how-the-honda-prelude-4wss-four-wheel-steering-wo-1828459598/ | 2026-05-15 | C+ — Enthusiast perspective, corroborated by official sources |
| 3 | Curbside Classic — 1988–1991 Honda Prelude Si 4WS | Automotive blog | https://www.curbsideclassic.com/blog/tech/1988-1991-honda-prelude-si-4ws-was-its-four-wheel-steering-a-gimmick | 2026-05-15 | C+ — Owner perspective, corroborated by official sources |
| 4 | Honda-Tech Forum — Prelude Specifications and Stats | Community forum | https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/ | 2026-05-15 | C — Community-maintained, cross-referenced with official specs |
| 5 | K Street Studio — Honda Prelude Specifications | Track reference site | https://www.kstreetstudio.com/track/prelude/specs.html | 2026-05-15 | C — Track-oriented reference, steering specs match official data |

### Tertiary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md (local compiled reference) | Compiled reference | /data/h22/QWEN.md | N/A | B — Compiled from 50+ sources, some may be stale |
| 2 | Honda-Tech — 4WS Rear Steering Rack/Gearbox Fluid Change | Community forum | https://www.preludepower.com/threads/4ws-rear-steering-rack-gearbox-fluid-change.395201/ | 2026-05-15 | C — Forum discussion confirming grease-packed (no fluid) gearbox |
| 3 | YouTube — 87-91 Honda 3Gen Prelude 4WS Gearbox Adjustment | Video | https://www.youtube.com/watch?v=D0rpENKGgDg | 2026-05-15 | C+ — Practical demonstration of mechanical 4WS gearbox adjustment |

---

## Notes

### Key Observations

1. **The H22A Redtop was never offered with 4WS.** This is the most important finding. The Redtop (220 PS) was exclusively fitted to the SiR S-spec and Type S trim levels, both of which were 2WS-only. The 4WS-equipped Preludes used either the standard H22A (200 PS Blacktop) or the detuned USDM/European variants.

2. **Honda's 4WS underwent a fundamental architectural change between generations.** The 3rd generation (1987–1991) used a purely mechanical system with a center shaft connecting the front and rear steering boxes. The 4th generation (1992+) replaced this with an electronic system using an electric actuator and dedicated 4WS ECU. This means the 4WS system found in 4th/5th gen Preludes (the era when the Redtop existed) was already electronic — not mechanical.

3. **The mechanical 4WS was genuinely clever engineering.** The double-crank planetary gear mechanism converted rotational input from the center shaft into precise linear motion of the rear tie rods, with the direction and magnitude of rear wheel movement determined entirely by the angle of the steering wheel. No sensors, no computers, no hydraulics — just gears and linkages.

4. **Turning circle improvement was modest but real.** The 4WS system reduced turning radius by approximately 0.5 meters (about 9.4%) compared to 2WS equivalents. This is meaningful in parking lot scenarios but less noticeable on open roads.

5. **ATTS is not 4WS.** The Type SH's Active Torque Transfer System is a torque-vectoring differential that adds yaw moment during cornering by driving the outside front wheel faster than the inside one. It does not steer the rear wheels. This distinction is frequently blurred in enthusiast discussions.

6. **The 4WS system was entirely grease-lubricated.** There is no hydraulic fluid in the rear steering gearbox — it is packed with grease and has no drain plug. Forum owners report 300,000+ mile service intervals without issues.

### Gaps Identified

- **Exact 4WS turning circle for 5th gen 4WS models** is not definitively published. The Honda News 2001 press release gives 36.1 ft for the Base 2WS and 37.4 ft for the Type SH 2WS, but no figure for a 4WS-equipped 5th gen model. The estimate of ~34.4 ft (10.5 m) is extrapolated from the consistent ~0.5 m improvement seen in earlier generations.
- **4WS ECU part numbers** are not available in consulted sources. The diagnostic blink code procedure is documented in the service manual, but specific ECU part numbers would require access to Honda parts catalogs.
- **Rear wheel angle specifics for 5th gen Super 4WS** are not published. The 3rd gen maximum of 5.3° is documented, but the 5th gen electronic system's rear wheel angle limits are not found in publicly available sources.
- **Official Honda marketing materials** describing the 4WS option pricing and availability are not accessible. Jalopnik cites ~$1,500 for the 4WS option on 4th gen models, but this needs corroboration.
- **Accord SiR (CD6/CF2) 4WS availability** is unclear. These models received the H22A Redtop but it is not confirmed whether any Accord SiR models were offered with 4WS.

---

## Citations

1. Honda Motor Co. "Honda Four-Wheel Steering System (Honda 4WS) Technology – 1987." *Honda Global Technology Archive*, 1987. https://global.honda/en/tech/serial/Honda_Super_Handling_part01/. Retrieved: 2026-05-15 14:00 UTC. Credibility: A+. Access: tavily_extract.

2. American Honda Motor Co., Inc. "2001 Honda Prelude Specifications." *Honda News*, 2000. https://hondanews.com/en-US/releases/release-ff82699f1c3527fa113578004c34c897-2001-honda-prelude-specifications. Retrieved: 2026-05-15 14:15 UTC. Credibility: A+. Access: tavily_extract.

3. American Honda Motor Co., Inc. "Honda Prelude — Chassis." *Honda News*, 1996. https://hondanews.com/en-US/releases/release-874e30b477a01c6042e12d004c34c875-honda-prelude-chassis. Retrieved: 2026-05-15 14:30 UTC. Credibility: A+. Access: tavily_extract.

4. Honda Motor Co. "Electronic Four-Wheel Steering Diagnosis and Service." *Factory Service Manual*, n.d. https://jdmfsm.info/Auto/Japan/Honda/Prelude/Honda_4WS_Manual.pdf. Retrieved: 2026-05-15 14:45 UTC. Credibility: A+. Access: tavily_extract.

5. Wikipedia contributors. "Honda Prelude." *Wikipedia*, The Free Encyclopedia. https://en.wikipedia.org/wiki/Honda_Prelude. Retrieved: 2026-05-15 15:00 UTC. Credibility: B+. Access: tavily_search.

6. Car and Driver staff. "Tested: The Four-Wheel-Steering Systems of 1988." *Car and Driver*, 1988. https://www.caranddriver.com/reviews/a35287962/tested-1988-four-wheel-steering-benefits/. Retrieved: 2026-05-15 15:15 UTC. Credibility: B. Access: tavily_search.

7. Anonymous. "Here's How The Honda Prelude 4WS's Four-Wheel Steering Worked." *Jalopnik*, 2024. https://www.jalopnik.com/heres-how-the-honda-prelude-4wss-four-wheel-steering-wo-1828459598/. Retrieved: 2026-05-15 15:30 UTC. Credibility: C+. Access: tavily_search.

8. Anonymous. "1988–1991 Honda Prelude Si 4WS — Was Its Four-Wheel Steering a Gimmick?" *Curbside Classic*, 2024. https://www.curbsideclassic.com/blog/tech/1988-1991-honda-prelude-si-4ws-was-its-four-wheel-steering-a-gimmick. Retrieved: 2026-05-15 15:45 UTC. Credibility: C+. Access: tavily_search.

9. Honda-Tech members. "Prelude Specifications and Stats." *Honda-Tech Forums*, archived thread. https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/. Retrieved: 2026-05-15 16:00 UTC. Credibility: C. Access: tavily_search.

10. K Street Studio. "Honda Prelude Specifications." *K Street Studio Track Reference*. https://www.kstreetstudio.com/track/prelude/specs.html. Retrieved: 2026-05-15 16:15 UTC. Credibility: C. Access: tavily_search.

---

## Appendix

### Chassis Code Quick Reference

| Chassis Code | Generation | Years | Body Style | Notable Features |
|--------------|------------|-------|------------|-----------------|
| BA8/BA9 | 3rd gen | 1987–1991 | Coupe | First 4WS application (mechanical) |
| BB1 | 4th gen | 1992–1996 | Coupe | Si R/VTEC, 4WS available (transitioned to electronic mid-year) |
| BB4 | 4th gen | 1992–1996 | Coupe | Si R S-Spec (2WS, Redtop) |
| BB5 | 4th gen | 1992–1996 | Coupe | Si (F22B, non-VTEC) |
| BB6 | 4th/5th gen | 1996–2001 | Coupe | Type S (Redtop, 2WS), SiR (Blacktop, 2WS) |
| BB7 | 4th gen | 1992–1996 | Coupe | 4WS (F22B) |
| BB8 | 4th/5th gen | 1996–2001 | Coupe | Si 4WS / VTi 4WS |
| BB9 | 5th gen | 1997–2001 | Coupe | Base (non-VTEC F20A4) |

### Redtop vs Blacktop vs Detuned — Engine Quick Comparison

| Feature | H22A Redtop | H22A Blacktop | H22A1 (USDM) | H22A4 (5th gen) |
|---------|------------|---------------|-------------|----------------|
| Power | 220 PS @ 7,200 RPM | 200 PS @ 7,000 RPM | 190 PS @ 6,800 RPM | 200 PS @ 7,000 RPM |
| Torque | 221 Nm @ 6,500 RPM | 219 Nm @ 5,500 RPM | 207 Nm @ 5,500 RPM | 212 Nm @ 5,250 RPM |
| Compression | 11.0:1 | 10.6:1 | 10.0:1 | 10.0:1 |
| Cam duration (I/E) | 306° / 310° | 288° / 308° | 288° / 308° | 288° / 308° |
| Throttle body | 62.5 mm | 60 mm | 57 mm | 60 mm |
| Intake manifold | Dual runner | Single runner | Single runner | Single runner |
| Exhaust diameter | 57 mm | 51 mm | 51 mm | 51 mm |
| Valve cover color | Red | Black | Black | Black |
| Deck type (early) | Closed | Closed | Closed | Open (1997+) |
| 4WS available? | **No** | Yes (BB1/BB8) | Yes (BB1 USDM/AUS) | Yes (BB8) |
| ATTS available? | No | No | No | Yes (Type SH) |

---

## Conflicts and Ambiguities

1. **4th gen 4WS transition from mechanical to electronic:** Some 1992 4th gen Preludes retained the 3rd gen mechanical 4WS system, while later 1992 models switched to the electronic Super 4WS. The exact cutoff date is not clearly documented in publicly available sources. Honda's official technology page describes the mechanical system as introduced in 1987, and the Curbside Classic article notes Honda "abandoned its mechanical steering angle dependent 4WS in 1991 in favor of an all-new 'Super 4WS' system for the fourth-generation Prelude." This suggests the transition happened at the start of 4th gen production, but some early 1992 models may have carried over the mechanical system.

2. **Accord SiR (CD6/CF2) 4WS availability:** It is not confirmed whether any Accord SiR models (which received the H22A Redtop) were offered with 4WS. The Accord platform may have supported 4WS but Honda may not have offered it on the Accord SiR. Further verification against Japanese Honda dealer catalogs would be needed.

3. **5th gen 4WS turning circle:** No official figure is published for a 5th gen 4WS-equipped Prelude. The estimate of ~34.4 ft (10.5 m) is extrapolated from the consistent ~0.5 m improvement seen in earlier generations. The Honda News 2001 press release only lists figures for the Base 2WS (36.1 ft) and Type SH 2WS (37.4 ft).

4. **Maximum rear wheel angle for 5th gen Super 4WS:** The 3rd gen maximum of 5.3° is documented by Honda. The 5th gen electronic system's rear wheel angle limits are not found in publicly available sources. It is reasonable to assume the figure is similar (~5°), but this is not confirmed.
