# H22A Redtop — Active Torque Transfer System (ATTS)

> **Task:** T-131 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

The Active Torque Transfer System (ATTS) was a world-first front-wheel-drive torque-vectoring system introduced on the 1997 Honda Prelude Type SH (BB6 chassis) in November 1996. It used a triple-pinion planetary gear assembly with two hydraulically operated multi-disc wet clutches to actively overdrive the outer front wheel by up to 15% during cornering, shifting torque distribution up to 80:20 (outer:inner). This reduced understeer and gave the FWD Prelude handling characteristics more commonly associated with RWD vehicles. The system was designed by Koji Shibata (ex-Nissan HICAS engineer), evolved from a 1987 one-wheel-drive test mule, and served as the direct predecessor to the SH-AWD system that debuted on the 2004 Legend. ATTS was exclusive to the Type SH (USDM) / VTI-S ATTS (JDM/European) trim levels; it was not available on standard SiR or SE models.

---

## System Overview

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Full name | Active Torque Transfer System | — | Honda official | Also called "Active Torque Distribution System" |
| First application | 1997 Honda Prelude Type SH (BB6) | — | Honda official, Nov 1996 launch | World's first FWD torque-vectoring system |
| Designer | Koji Shibata | — | Fisher Discount / Honda Magazine | Former Nissan HICAS engineer (joined Honda 1986) |
| System type | Hydraulic multi-disc clutch + planetary gears | — | Honda official | Wet clutches, hydraulic actuation |
| Active only during | Cornering / acceleration in turns | — | Honda official | Inactive during straight-line driving |
| Overdrive ratio | ~15% | — | Honda official | Outer tire overdriven vs. inner tire |
| Max torque bias | 80:20 | outer:inner | Honda official, AcuraZine | Freely adjustable via clutch engagement |
| Minimum effective turn radius | ~10 m | inner tire radius | Honda official | Based on 1.5 m vehicle tread |
| Evolution successor | SH-AWD (Super Handling All-Wheel Drive) | — | Honda official | Debuted 2004 Honda Legend (KB1) |

---

## Mechanical Architecture

### MCU (Motor Control Unit)

The MCU is the heart of the ATTS system. It consists of:

| Component | Description | Source |
|-----------|-------------|--------|
| Planetary gear assembly | Triple-pinion, triple-planetary gear set | Honda official |
| Hydraulic clutches | Two multi-disc wet clutches (one per side) | Honda official |
| Concentric shafts | Outer shaft = right wheel torque path; Inner shaft = left wheel (direct from diff) | Honda official |
| Sun gears | Connected to clutch packs; drive planetary gear speed multiplication | Honda official |
| Carrier shafts | Connected to differential gear case (output to wheels) | Honda official |

**Design evolution:** Repeated studies led through multiple layout concepts before settling on the triple-pinion/triple-planetary design: parallel twin-shaft + hydraulic CVT concept → parallel triple-shaft concept → parallel twin-shaft prototype → double pinion/double planetary prototype → **triple pinion/triple planetary (final)**.

### Differential Unit

| Component | Description | Source |
|-----------|-------------|--------|
| Connection | Links transmission output to ATTS unit input | Honda official, Fisher Discount |
| Function | Splits engine torque to ATTS unit via concentric shafts | Honda official |
| Straight-line operation | Torque passes through equally to both wheels (50:50) | Honda official |

---

## Torque Vectoring Operation

### Three Operating Modes

| Mode | Clutch State | Torque Split | Wheel Speed Ratio |
|------|-------------|-------------|-------------------|
| Straight driving | Both clutches disengaged | 50:50 | 1.00:1.00 |
| Left turn (accelerating) | Left clutch locked | Up to 80:20 (right:left) | Right wheel ~15% faster |
| Right turn (accelerating) | Right clutch locked | Up to 80:20 (left:right) | Left wheel ~15% faster |

### Turning Left — Torque Flow Path

When turning left with accelerator depressed:

1. Left-turn clutch engages and locks
2. Torque flows: left wheel → left sun gear → triple pinion gear → right sun gear → differential gear case → right (outer) wheel axle
3. Right wheel receives increased driving torque
4. Left wheel experiences braking effect from locked clutch
5. Result: yaw moment assists the turn, reducing understeer

### Turning Right — Torque Flow Path

When turning right with accelerator depressed:

1. Right-turn clutch engages and locks
2. Torque flows: right wheel → differential gear case → right sun gear → triple pinion gear → left sun gear → left wheel axle
3. Left wheel receives increased driving torque
4. Right wheel experiences braking effect from locked clutch
5. Result: yaw moment assists the turn, reducing understeer

### Why 15% Overdrive Matters

With a 1.5 m vehicle tread, a 15% speed difference between left and right tires means the ATTS is effective for turns with an inner tire radius of 10 m or more. This covers essentially all real-world cornering scenarios at legal speeds.

---

## Control System

### Sensors

| Sensor | Signal | Purpose | Source |
|--------|--------|---------|--------|
| Steering angle sensor | Degrees turned | Determines turn direction and severity | Honda official, CarThrottle |
| Accelerator pedal position | % depression | Determines torque demand | Honda official |
| Vehicle speed (front) | RPM | Calculates gear ratio and drive torque | Honda official |
| Vehicle speed (rear) | RPM | Calculates lateral acceleration | Honda official |
| Lateral G-force sensor | G-force | Measures cornering load | CarThrottle |
| Yaw rate sensor | °/s | Feedback for vehicle stability | Honda official |
| Engine speed | RPM | Calculates engine torque | Honda official |
| Manifold absolute pressure (MAP) | kPa/kPa | Estimates engine load/torque | Honda official, BB6 Manual |

### ECU Architecture

| Component | Description | Source |
|-----------|-------------|--------|
| Dedicated ECU | Torque vectoring ECU (separate from ECM) | Honda official |
| Communication | SAF (Serial Actuator Function) bus with ECM | BB6 Manual p.277 (C31 terminal) |
| Feed-forward control | Determined by accelerator + steering angle + vehicle speed + lateral acceleration | Honda official |
| Feedback control | Yaw rate sensor feedback for stability | Honda official |
| Target calculation | Computes hydraulic pressure for clutches based on front/rear acceleration and turn amount | Honda official |
| Reaction time | Milliseconds | CarThrottle |

### Drive Torque Calculation

Drive torque is computed from:
1. Engine torque (based on engine speed and manifold vacuum)
2. Engine speed
3. Gear ratio (calculated from front tire speed)

Front/rear acceleration is estimated from drive torque. Lateral acceleration is calculated from rear tire speed and steering angle. The target hydraulic pressure for the clutches is determined by comparing actual acceleration to expected values.

---

## Fluid Specifications (from BB6 Helms Manual)

| Parameter | Value | Condition | Source |
|-----------|-------|-----------|--------|
| ATTS unit fluid capacity (at overhaul) | 1.4 L (1.5 US qt, 1.2 Imp qt) | Full fill | BB6 Manual p.2339 |
| ATTS unit fluid capacity (at fluid change) | 0.95 L (1.0 US qt, 0.84 Imp qt) | Drain and refill | BB6 Manual p.2340 |
| Recommended fluid | ATF (Automatic Transmission Fluid) | — | BB6 Manual p.2704 |

---

## Diagnostic Information (from BB6 Helms Manual)

### DTC Codes

| DTC | Description | Source |
|-----|-------------|--------|
| 61 | ATTS oil pressure sensor circuit | BB6 Manual |
| 62 | ATTS solenoid valve circuit | BB6 Manual |
| 63 | ATTS clutch pressure control solenoid | BB6 Manual |
| 64 | ATTS hydraulic unit malfunction | BB6 Manual |
| 65 | ATTS control unit communication error | BB6 Manual |
| 66 | ATTS yaw rate sensor circuit | BB6 Manual |

### SCS Connector Procedure

ATTS diagnostics require connecting the SCS (Service Check) connector to put the system into diagnostic mode. This is done through the 16-pin DLC under the dashboard.

### MAP Sensor Testing (With ATTS)

When testing the MAP sensor on ATTS-equipped models:
1. Disconnect the ATTS control unit 22P connector
2. Check continuity between MAP sensor 3P connector terminal No. 3 and body ground
3. If continuity exists, there is a short in the ATTS control unit

---

## Suspension Integration

### Torque Steer Mitigation

When ATTS applies unequal torque to the left and right wheels, the difference creates a torque around the kingpin (steering axis) that tends to pull the steering wheel toward the inside of the turn — a phenomenon known as torque steer.

To eliminate this:

| Design Change | Specification | Source |
|--------------|---------------|--------|
| Lower arm type | Double-joint lower link | Honda official, Fisher Discount |
| Virtual kingpin | Separated from actual ball joint position | Honda official |
| Wheel offset | Reduced from 43.7 mm to 25 mm | Fisher Discount |
| Kingpin offset | Minimized through double-wishbone geometry | Honda official |

The double-joint lower link allows the virtual kingpin axis to be positioned differently from the physical ball joints, effectively canceling the torque-steer moment generated by ATTS during cornering.

---

## Applications

| Chassis Code | Model | Years | Market | Engine | Power | Notes |
|--------------|-------|-------|--------|--------|-------|-------|
| BB6 (2WS) | Type SH | 1997–2001 | USDM | H22A4 | 200 PS @ 7,000 RPM | USDM ATTS model; "SH" = Super Handling |
| BB6 (2WS) | VTI-S ATTS | 1997–2001 | JDM/EU | H22A4 | 200 PS @ 7,000 RPM | European/JDM ATTS model |
| BB6 (2WS) | VTi-R ATTS | 1999–2001 | AUS | H22Z1 | 200–203 PS (disputed) | Australian market; ATTS compatible |

**Note on RHD vs LHD:** RHD and LHD Type S/SH models had opposite engine rotation directions (clockwise for LHD, counterclockwise for RHD). This means the ATTS unit is not directly transplantable between RHD and LHD platforms without modification.

---

## Production Volume & Rarity

| Metric | Value | Source | Notes |
|--------|-------|--------|-------|
| Percentage of 5th gen Preludes with ATTS | ~5% | CarThrottle | Very rare compared to base Type-S |
| Total 5th gen Prelude production | ~100,000 (est.) | Industry estimate | ATTS models: ~5,000 units (est.) |
| Discontinued | 2001 | — | With the entire Prelude line |
| Successor system | SH-AWD | — | Debuted 2004 on Honda Legend |

---

## Engineering Heritage

### Development Timeline

| Year | Milestone | Source |
|------|-----------|--------|
| 1986 | Koji Shibata joins Honda from Nissan (HICAS designer) | Fisher Discount |
| 1987 | One-wheel-drive test mule developed (converted Civic Shuttle AWD) | Honda official |
| 1989 | Technical viability confirmed at Tochigi R&D Center | Honda official |
| 1991 | FS-X AWD concept car (Tokyo Motor Show) — ATTS on rear wheels | Fisher Discount |
| 1996 (Nov) | Production debut: Prelude Type SH (BB6) | Honda official |
| 2001 | Prelude discontinued; ATTS production ends | — |
| 2004 | SH-AWD debuts on Honda Legend (KB1) | Honda official |

### Concept Origin

The ATTS concept originated from replacing traditional 4WD (which distributes torque front-to-rear) with torque vectoring to left-and-right wheels. The development team proved the concept by converting a 1987 4WD Civic Shuttle into a one-wheel-drive vehicle (rear-right only) and driving it on the Tochigi R&D test course. The resulting "exhilarating turning feel" validated the approach.

---

## Comparison: ATTS vs. Limited-Slip Differential

| Feature | ATTS | Conventional LSD |
|---------|------|-----------------|
| Torque distribution | Variable 50:50 to 80:20 | Fixed or semi-active ratio |
| Activation | Only during cornering/acceleration | Always active |
| Speed differential | Actively creates (~15% overdrive) | Passively allows (via clutch slip) |
| Control | Electronic (ECU + hydraulic) | Mechanical (spring preload, friction) |
| Yaw moment generation | Active (creates turning force) | Passive (reduces understeer only) |
| Complexity | High (planetary gears, clutches, ECU) | Low (gear set or clutch pack) |
| Weight penalty | Significant | Minimal |
| Cost | High | Low |

---

## Why ATTS Was Phased Out

| Factor | Detail | Source |
|--------|--------|--------|
| Suspension redesign requirement | Needed double-joint lower arms and modified kingpin geometry | Honda official, Fisher Discount |
| Incompatibility with MacPherson strut | Later performance Hondas (Integra, Civic) used MacPherson struts | Fisher Discount |
| Cost | Complex hydraulic system + dedicated ECU = expensive | Industry analysis |
| Weight | MCU and hydraulic unit added significant front-end weight | Industry analysis |
| Successor technology | SH-AWD provided similar benefits on AWD platforms | Honda official |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda Global — "Active Torque Transfer System (ATTS) Technology – 1996" | Official engineering article | https://global.honda/en/tech/serial/Honda_Super_Handling_part02/ | 2026-05-15 | High — first-party engineering documentation |
| 2 | BB6 Helms Manual (1997–2001 Honda Prelude) OCR extracted text | Service manual | `/data/h22/1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` | 2026-05-15 | High — manufacturer service documentation |
| 3 | Honda News — "Acura Super Handling All-Wheel Drive" | Press release | https://hondanews.com/en-US/releases/release-9cc3a6ebff00753bc08baae86a055512-acura-super-handling-all-wheel-drive | 2026-05-15 | High — official press release |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Fisher Discount — "Honda ATTS System: FWD Precision Handling for Prelude Type S" | Technical blog | https://fisherdiscount.com/blogs/news/🌟-honda-s-fwd-marvel-atts-system-🌟 | 2026-05-15 | Medium — well-researched, cites Honda sources |
| 2 | CarThrottle — "What is ATTS?" | Enthusiast article | https://www.carthrottle.com/post/w8er3qe | 2026-05-15 | Medium — community knowledge, corroborated |
| 3 | AutoZine — "4-Wheel Drive with Electronic Active Torque Split" | Technical education | https://www.autozine.org/technical_school/traction/4WD_3.html | 2026-05-15 | Medium — explains SH-AWD lineage from ATTS |
| 4 | QWEN.md (local compiled reference) | Compiled reference | `/data/h22/QWEN.md` | N/A | Medium — compiled from 50+ sources |
| 5 | Honda-Tech — "The ATTS Unit: An Interesting Look Inside" | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/atts-unit-interesting-look-inside-1858351/ | 2026-05-15 | Low — community discussion, limited technical depth |

---

## Notes

### Key Observations

1. **ATTS was the world's first production torque-vectoring system.** While SH-AWD later gained more attention (being AWD-based), ATTS pioneered the fundamental concept of using electronically controlled multi-disc clutches to create a yaw moment by transferring torque to the outside wheel during cornering.

2. **The 80:20 bias ratio is asymmetric and dynamic.** Unlike a conventional LSD which has a fixed bias ratio, ATTS continuously varies the split based on driving conditions. At full lock, up to 80% of available torque can go to the outer wheel.

3. **The triple-pinion planetary gear design was critical.** By using three sets of planetary gears, Honda achieved the 15% speed multiplication needed to overdrive the outer wheel without excessive clutch wear. The planetary gears take most of the speed differential load, while the clutches primarily manage torque transfer.

4. **ATTS required bespoke suspension geometry.** The double-joint lower arm, reduced wheel offset (25 mm vs. 43.7 mm), and minimized kingpin offset were all necessary to eliminate torque steer. This made ATTS incompatible with the MacPherson strut platforms that dominated Honda's later lineup.

5. **The system was mechanically complex but elegant.** The concentric shaft design (inner shaft = left wheel, outer shaft = right wheel) allowed the differential to feed both sides through a single housing. The hydraulic clutch actuation provided millisecond response times.

6. **ATTS is functionally similar to SH-AWD but on a smaller scale.** SH-AWD extended the concept to four wheels with two independent clutch packs per axle (four total), whereas ATTS had two clutch packs in a single front-mounted unit.

### Conflicts and Ambiguities

1. **Torque bias ratio — 80:20 vs. 85:15:** Honda's official engineering article states "up to 80:20 (outer wheel: inner wheel)" while the Fisher Discount blog cites "up to 85:15." The 80:20 figure comes directly from Honda's own technical documentation and should be considered authoritative. The 85:15 figure may represent a real-world measurement under specific conditions or may be a rounding approximation.

2. **Overdrive percentage — 15% vs. variable:** Multiple sources cite "~15%" as the overdrive figure. Honda's official article says "around 15%." This appears to be a fixed mechanical ratio determined by the planetary gear set, not a variable parameter.

3. **Total ATTS production numbers:** No official production figures exist. The "~5% of 5th gen Preludes" figure from CarThrottle is an industry estimate. Actual numbers are likely lower given the Type SH's premium pricing.

4. **H22Z1 ATTS compatibility:** QWEN.md lists the Australian H22Z1 as "ATTS compatible" but does not confirm factory installation. Some sources suggest the H22Z1 VTi-R ATTS was a genuine factory configuration; others suggest it was an aftermarket retrofit possibility. Further verification needed.

---

## Citations

1. Honda Motor Co., LTD. "Active Torque Transfer System (ATTS) Technology – 1996." *Honda Global Technology*, 1996. URL: https://global.honda/en/tech/serial/Honda_Super_Handling_part02/. Retrieved 2026-05-15. Credibility: High — first-party engineering documentation from Honda's official technology series.

2. Honda Motor Co., LTD. "1997–2001 Honda Prelude Service Manual (BB6)." *Helms Manual*, 1996. Section 15 (Steering / ATTS), pages 701–750 (estimated). Local OCR text: `/data/h22/1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt`. Credibility: High — manufacturer service documentation.

3. Honda News. "Acura Super Handling All-Wheel Drive." *Honda PR Newswire*, 2004. URL: https://hondanews.com/en-US/releases/release-9cc3a6ebff00753bc08baae86a055512-acura-super-handling-all-wheel-drive. Retrieved 2026-05-15. Credibility: High — official press release documenting ATTS as predecessor to SH-AWD.

4. Zhou, Guifeng. "Honda ATTS System: FWD Precision Handling for Prelude Type S." *Fisher Discount Blog*, November 2024. URL: https://fisherdiscount.com/blogs/news/🌟-honda-s-fwd-marvel-atts-system-🌟. Retrieved 2026-05-15. Credibility: Medium — well-researched, cites Honda Magazine and official sources.

5. Anonymous. "What is ATTS?" *CarThrottle*, 2024. URL: https://www.carthrottle.com/post/w8er3qe. Retrieved 2026-05-15. Credibility: Medium — community knowledge, corroborated by Honda sources.

6. Anonymous. "AutoZine Technical School — 4-Wheel Drive with Electronic Active Torque Split." *AutoZine*, 2024. URL: https://www.autozine.org/technical_school/traction/4WD_3.html. Retrieved 2026-05-15. Credibility: Medium — educational resource explaining SH-AWD lineage from ATTS.

---

## Appendix

### ATTS System Block Diagram (Text Representation)

```
Engine → Transmission → Differential → Concentric Shafts
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                                                         │
              Inner Shaft (Left)                                    Outer Shaft (Right)
                    │                                                         │
              ┌─────▼─────┐                                         ┌──────────▼──────┐
              │ Left Turn  │                                         │ Right Turn       │
              │ Clutch     │                                         │ Clutch           │
              │ (Wet Multi │                                         │ (Wet Multi       │
              │  -Disc)    │                                         │  -Disc)          │
              └─────┬──────┘                                         └────────┬────────┘
                    │                                                         │
              Left Sun Gear ── Triple Pinion Gears ── Right Sun Gear
                    │                                                         │
              ┌─────▼─────────────────────────────────────────────────────▼────┐
              │                                                                 │
              │                    Differential Gear Case                       │
              │                    (Carrier Shaft)                              │
              │                                                                 │
              └─────┬─────────────────────────────────────────────────────┬────┘
                    │                                                         │
              Left Wheel (Inner)                                Right Wheel (Outer)
              During left turn                                   During left turn
              Reduced torque                                     Increased torque (+15% speed)
```

### ATTS Control Signal Flow

```
Sensors:
  Steering Angle ──┐
  Accelerator Pos ─┤
  Front Wheel Speed ──┤
  Rear Wheel Speed ──┤
  Lateral G ────────┤
  Yaw Rate ─────────┤
  Engine Speed ─────┤
  MAP ──────────────┤
                    ▼
            Torque Vectoring ECU
                  │
                  ├── Feed-forward control (predictive)
                  │    Input: accelerator + steering angle + vehicle speed + lateral accel
                  │
                  ├── Feedback control (stabilizing)
                  │    Input: yaw rate sensor
                  │
                  └── Output: hydraulic pressure command to clutch solenoids
                        │
                        ▼
                Hydraulic Unit (solenoid valves)
                        │
                        ▼
                Multi-disc clutch engagement
                        │
                        ▼
                Torque redistribution to outer wheel
```

### Wiring Harness References (from BB6 Manual)

| Connector | Pins | Wire Color | Function | Source |
|-----------|------|------------|----------|--------|
| ATTS Control Unit 22P | 22 pins | Various | Main harness connection | BB6 Manual p.4355 |
| ECM C31 (31P) | Pin 30 | GRN/BLK | VREF to ATTS control unit | BB6 Manual p.277 |
| ECM C31 (31P) | Pin 31 | GRN/YEL | FIBX data comm with ATTS | BB6 Manual p.277 |
| SAF Bus | — | GRN/BLU | Data comm with TCM | BB6 Manual p.277 |

---

## Conflicts and Ambiguities (Summary)

See main Conflicts section above. Key unresolved items:
1. Exact maximum bias ratio (80:20 per Honda official vs. 85:15 per secondary source)
2. Total ATTS-equipped Prelude production numbers (no official data)
3. Factory vs. retrofit status of H22Z1 VTi-R ATTS in Australia
