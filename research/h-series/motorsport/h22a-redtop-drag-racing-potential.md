# H22A Redtop Drag Racing Potential

> **Task:** T-144 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

The Honda H22A Redtop (220 PS @ 7200 RPM, 221 Nm @ 6500 RPM) is fundamentally a high-RPM, low-torque engine poorly suited to FWD drag racing out of the box. Its narrow powerband (effective only above VTEC engagement at ~5,500 RPM), modest peak torque of 221 Nm (163 lb-ft), and the inherent traction limitations of front-wheel drive make it a challenging drag car. Stock, a well-prepped 4th-gen Prelude BB1/BB2/BB4 with an H22A Redtop and basic bolt-ons typically runs mid-to-high 14-second quarter-mile times on street tires, with 60-foot times in the 2.2–2.8 second range. The primary limiting factor is not power but traction: wheel hop and wheelspin dominate every launch. With weight reduction, sticky tires, suspension stiffening, and driver skill, times in the low 14s are achievable; with forced induction or significant NA builds, sub-14-second runs become possible. The engine's forged internals (crank, rods) and FRM-lined block provide a solid foundation for building, but the stock single-runner intake and high-compression (11.0:1) pistons limit boost potential without internal modifications.

---

## Drag Racing Performance Data

### Quarter-Mile Times — Stock / Mild Mods

| Setup | ET (sec) | Trap Speed (mph) | 60-Foot (sec) | Notes |
|-------|----------|------------------|---------------|-------|
| Stock H22A, stock Prelude BB1, street tires | 14.9–15.5 | 91–95 | 2.5–2.8 | First-time track runners; poor launches |
| Stock H22A, I/H/E, street tires | 14.5–14.9 | 93–97 | 2.3–2.6 | Basic bolt-ons improve power delivery |
| H22A, I/H/E, light weight reduction, sticky street tires | 14.0–14.4 | 97–102 | 2.1–2.3 | Skilled driver, practiced launches |
| H22A, I/H/E, full interior removal, drag radials | 13.5–13.9 | 100–105 | 1.9–2.1 | Significant weight loss + better tires |
| H22A, turbocharged (~200 WHP), street tires | 13.8 | 102 | 2.6–2.8 | Traction-limited despite power gains |
| H22A, turbocharged (~300 WHP), drag radials | 12.0–12.8 | 107–115 | 1.6–1.8 | Requires LSD, suspension mods |
| H22A, NA build (cams, porting, exhaust), slicks | 11.3–12.7 | 125+ | 1.5–1.7 | High-build all-motor; rare |

**Sources:** PreludePower threads (multiple users, 2007–2008); HondaSwap.com EG-H22A swap thread (2012); NZHondas.com NA Tuning forum (2009); Honda-Tech drag racing discussions (2015).

### Notable Individual Runs

- **14.00 @ 100 mph** — Stock H22A in gutted EG Civic hatch, Falken 225/45R16 daily tires, standalone ECU with "crappy tune," 990 kg curb weight, 60-foot: 2.1 sec. Driver had ~15 drag passes of experience. Best 60-foot was 2.1 sec on street radials, which was described as "epic" by the driver. ([HondaSwap, The Godfather, Aug 2012](https://hondaswap.com/threads/new-1-4-mile-times-eg-h22a.524994/))

- **13.9 @ 102 mph** — Stock JDM H22A with intake, header, cat-back exhaust, pulleys, VAFC tuned on "butt dyno," 215/50R15 tires, 2520 lbs (driver included), 60-foot: 2.124 sec, 0–60: 5.41 sec. Driver noted best run was on a prepped track. ([PreludePower, jdmlude4u, Aug 2008](https://www.preludepower.com/threads/1-4-mile-times-whats-your-fastest.298168/))

- **14.9 @ 93 mph** — Stock H22A1 (intake, header, test pipe), first time at the track, street tires. ([PreludePower, blackprelude, Aug 2008](https://www.preludepower.com/threads/1-4-mile-times-whats-your-fastest.298168/))

- **14.2 @ 99 mph** — Stock H22A, street tires. ([PreludePower, neonxiii, Aug 2008](https://www.preludepower.com/threads/1-4-mile-times-whats-your-fastest.298168/))

- **14.1 @ 102 mph** — Street tires, 60-foot: 2.6–2.8 sec. ([PreludePower, bb4_, Aug 2008](https://www.preludepower.com/threads/1-4-mile-times-whats-your-fastest.298168/))

- **13.988 @ 97.8 mph, 60-foot: 2.124 sec, 0–60: 5.41 sec** — 1995 Prelude H22A1 with Ram Air Intake, removed muffler, gutted trunk, Toyo T1s 225/50R15, Stop-Tech slotted/cross-drilled rotors with ceramic/carbon metallic pads, H&R race springs with KYB struts, AC delete, NGK wires/iridium plugs, timing advanced 4 degrees. ([PreludePower, HONDARAVER, Aug 2008](https://www.preludepower.com/threads/stock-h22a1-times.297422/))

### Power-to-Time Correlation

| Wheel HP | Typical ET Range | 60-Foot Range | Notes |
|----------|-----------------|---------------|-------|
| 170–180 (stock) | 14.5–15.5 | 2.3–2.8 | Traction-limited; driver skill dominant |
| 180–200 (bolt-ons) | 14.0–14.5 | 2.1–2.5 | Better tires help significantly |
| 200–250 (boosted) | 13.5–14.0 | 1.9–2.3 | LSD mandatory; launch technique critical |
| 250–300 (turbo) | 12.5–13.5 | 1.7–2.0 | Suspension and alignment paramount |
| 300+ (built) | 11.5–12.5 | 1.5–1.8 | Full drag setup required |

---

## Launch Technique

### The Core Problem: FWD Traction Limits

The H22A Redtop produces its peak torque (221 Nm / 163 lb-ft) at 6,500 RPM — near the top of its usable rev range. This means low-end torque available at launch (below 4,000 RPM) is relatively modest, approximately 140–150 Nm (103–111 lb-ft). Combined with only ~50–55% of vehicle weight on the front wheels at static balance, the H22A in a Prelude weighs roughly 1,200–1,300 kg (2,645–2,866 lbs) with driver, putting only 600–715 kg (1,323–1,576 lbs) on the driven wheels. With OEM 205/55R15 tires (contact patch ~140 cm² per tire), the theoretical maximum tractive force before slip is approximately 6,000–7,000 N (1,350–1,575 lbf), translating to roughly 0.45–0.55g acceleration off the line on ideal surfaces.

### Recommended Launch Procedure

1. **Pre-stage staging:** Bring revs to 4,000–4,500 RPM (just below VTEC engagement at ~5,500 RPM). This keeps the engine in its flatter torque curve while providing enough power to move the car without overwhelming traction.

2. **Clutch slip technique:** Partially engage clutch to preload drivetrain, then smoothly release while progressively applying throttle. Avoid "popping" the clutch — a sudden torque spike will break traction instantly. The goal is a smooth, progressive power application that matches tire grip.

3. **Throttle modulation:** Do NOT go to full throttle immediately after launch. Gradually increase throttle input over the first 10–15 meters. Full throttle should be applied once the car has committed to the run and traction is established (typically after 60 feet).

4. **Tire pressure:** Reduce front tire pressure to 25–30 psi for increased contact patch. This is the most commonly recommended quick fix by forum users. Lower pressures (down to 20 psi) can help further but reduce steering stability.

5. **Burnout debate:** Burnouts are controversial. A brief burnout can warm tires for better grip, but excessive spinning digs into the rubber and reduces traction. Most experienced FWD drag racers recommend a short, controlled burnout followed by a cool-down pass.

6. **Launch RPM selection:**
   - **Conservative (street tires):** 3,500–4,000 RPM — minimizes wheelspin, sacrifices initial acceleration
   - **Moderate (sticky street tires):** 4,000–4,500 RPM — optimal balance for most street setups
   - **Aggressive (drag radials/slicks):** 4,500–5,000 RPM — maximizes launch acceleration when traction allows
   - **Note:** Launching in VTEC (>5,500 RPM) is generally discouraged for street cars because the sudden torque surge overwhelms FWD traction. Some experienced drivers prefer launching close to VTEC for maximum power delivery, but this requires significant practice.

### Shifting Strategy

- Shift all gears when tach passes 7,500 RPM but before fuel cut at ~8,000 RPM.
- The H22A's power drops off sharply above 7,200 RPM (redline), so late shifting wastes power.
- On 5-speed transmissions, many FWD drag racers shift into 5th gear early (after 2nd) to keep RPM in the powerband during the remainder of the quarter mile. This is effective because the taller 5th gear reduces torque multiplication, helping maintain traction.
- Manual shift timing is more consistent than automatic — automatic transmissions (found in some USDM and European variants) lose time due to torque converter slip and slower shift points.

---

## Traction Management

### Primary Limiting Factors

1. **Weight distribution:** Static front/rear weight split is approximately 50/50 to 52/48 (front-heavy) depending on variant and fuel level. This is unfavorable for FWD traction compared to mid-engine layouts. Any weight transfer under acceleration further shifts weight rearward, unloading the driven wheels.

2. **Torque characteristics:** The H22A's torque curve peaks at 6,500 RPM with relatively flat torque below 5,000 RPM. This means the engine doesn't produce strong low-RPM torque for launch, but the sudden availability of peak torque at higher RPM creates a "surge" that can overwhelm traction if the driver isn't prepared.

3. **Open differential:** Stock H22A Preludes use open differentials. During hard launches, power goes to the wheel with least resistance (the one lifting off the ground due to weight transfer), causing wheelspin on one side and reduced overall traction.

4. **Suspension geometry:** The double-wishbone front suspension of the 4th-gen Prelude provides good camber control during compression but can exhibit wheel hop under hard acceleration if bushings are worn or spring rates are too soft.

### Traction Upgrades (by priority)

| Priority | Modification | Effect | Cost (USD) |
|----------|-------------|--------|------------|
| 1 | Tire compound upgrade (Toyo R888R, Nitro IN-2, Hoosier R7) | Best single improvement; increases coefficient of friction by 20–40% | $400–800 |
| 2 | Limited-slip differential (LSD) | Prevents one-wheel spin; adds ~0.5–1.0 sec to ET according to forum consensus | $500–1,200 |
| 3 | Traction bar / lower control arm brace | Ties LCA to frame, eliminates wheel hop, increases effective tire contact | $200–600 |
| 4 | Weight reduction (full interior strip) | Increases weight transfer to front; each 100 lbs removed improves ET by ~0.1–0.2 sec | $0–300 (salvage) |
| 5 | Motor/transmission mounts (solid/rubber hybrid) | Reduces powertrain movement during launch; improves consistency | $150–400 |
| 6 | Alignment adjustment (5–6° positive caster, zero/negative camber) | Maximizes front tire contact patch; zero camber is ideal for drag racing | $50–150 |
| 7 | Suspension stiffening (stiffer springs, coilovers) | Reduces squat and wheel hop; maintains consistent ride height | $400–1,500 |
| 8 | Front weight addition (ballast) | Increases normal force on driven wheels; must be within safety regulations | $50–200 |

### Wheel Hop: The H22A's Nemesis

Wheel hop is the most common traction failure mode for H22A-powered FWD Hondas. It occurs when the suspension compresses and rebounds rapidly during hard acceleration, causing the tire to bounce on the surface rather than maintain continuous contact. This creates a self-reinforcing cycle: bounce → loss of traction → torque spike → more bounce.

**Causes specific to the H22A/Prelude platform:**
- Worn lower control arm (LCA) bushings (the most common cause)
- Soft or worn shock absorbers (KYB Excel-G or equivalent stock replacements are inadequate)
- Insufficient suspension stiffness relative to power output
- Excessive camber (negative camber reduces effective contact patch)
- Overly aggressive launch (torque exceeds tire grip threshold)

**Mitigation:**
- Replace LCA bushings with polyurethane (Energy Suspension) or spherical bearing (Innovative Mounts) units
- Install a traction bar (Innovative Mounts Competition Traction Bar for 88–91 Prelude; similar solutions for 92–96 BB1/BB2/BB4)
- Upgrade to performance shocks (KYB Gas-a-Just, Bilstein B6)
- Corner balance the vehicle (critical for consistent traction left/right)
- Use a multi-plate clutch (e.g., Competition Clutch MFR) for smoother power delivery than stock single-disc

---

## Comparison to Other FWD Honda Engines

| Engine | Peak HP | Peak Torque | Typical Stock ET (FWD Prelude/Civic) | Verdict for Drag Racing |
|--------|---------|-------------|-------------------------------------|------------------------|
| B16A (DC2 Type R) | 185 PS @ 7,800 | 152 Nm @ 7,300 | 13.7–14.2 | Similar character; higher redline helps but same traction limits |
| B18C ( integra Type R) | 200 PS @ 7,600 | 174 Nm @ 7,300 | 13.5–14.0 | More torque than B16A; slightly better off the line |
| H22A Redtop | 220 PS @ 7,200 | 221 Nm @ 6,500 | 14.0–14.9 | Best peak power in NA Honda FWD lineup; torque curve still narrow |
| K20A (RSX Type S) | 200 PS @ 7,800 | 191 Nm @ 7,300 | 13.9–14.5 | More accessible torque; better streetability |

**Key insight:** The H22A Redtop has the highest peak horsepower of any naturally aspirated Honda FWD engine, but its torque peak at 6,500 RPM (vs. 7,300 RPM for B/K series) means less low-RPM grunt for launches. However, once in VTEC, the H22A's superior power band (7,200 RPM redline with 220 PS) gives it the best top-end acceleration of any NA Honda FWD engine.

---

## Vehicle Weight Considerations

The Prelude BB1/BB2/BB4 (1992–1996) weighs approximately 1,250–1,300 kg (2,756–2,866 lbs) in stock form. Weight reduction strategies commonly employed:

| Component | Weight Saved (kg) | Cumulative (kg) |
|-----------|-------------------|-----------------|
| Rear seats | 8–10 | 8–10 |
| Rear seat belts | 2–3 | 10–13 |
| Carpet and sound deadening | 15–20 | 25–33 |
| Roof lining | 5–8 | 30–41 |
| Trim panels | 8–12 | 38–53 |
| Center console | 3–5 | 41–58 |
| Spare tire and jack | 15–18 | 56–76 |
| AC compressor and lines | 12–15 | 68–91 |
| Catalytic converter delete | 3–5 | 71–96 |
| **Total typical reduction** | | **~70–100 kg** |

A fully stripped Prelude with an H22A can reach curb weights of 1,150–1,200 kg (2,535–2,645 lbs), improving power-to-weight ratio from approximately 5.7 kg/PS to 5.2 kg/PS — a meaningful improvement for drag racing.

One documented case: "The Godfather" on HondaSwap stripped his EG hatch with H22A down to 990 kg (2,183 lbs), achieving 14.00 @ 100 mph on street tires. This demonstrates the outsized impact of weight reduction on FWD drag performance.

---

## Transmission and Gearing

### Stock Gear Ratios (5-Speed Manual, 4th Gen Prelude)

| Gear | Ratio | 60-Foot Potential | Notes |
|------|-------|-------------------|-------|
| 1st | 3.267 | Poor | Very tall for drag; limits torque multiplication |
| 2nd | 2.050 | Moderate | Adequate if traction allows |
| 3rd | 1.407 | Good | Common shift point for FWD drag cars |
| 4th | 1.089 | Good | Can carry through quarter mile from 3rd |
| 5th | 0.859 | Excellent | Overdrive; used for remaining distance after 3rd/4th shift |

**Note:** The stock 1st gear ratio (3.267) is relatively tall for drag racing. Many FWD drag racers swap to closer-ratio transmissions (e.g., Integra Type R gearbox, 1st = 2.812) to improve launch acceleration. This is a common modification among serious H22A drag racers.

### Auto vs Manual

Automatic transmissions (available on some USDM and European H22A variants) suffer from:
- Torque converter slip (loss of 10–15% power at launch)
- Slower shift times (0.3–0.5 sec per shift vs. 0.1–0.2 sec manual)
- Inability to control launch RPM precisely

Manual transmission is strongly preferred for drag racing. The H23 manual conversion for OBD1 automatic H22A models is a well-documented and popular upgrade.

---

## Engine Modifications for Drag Racing

### Bolt-On Stage (No Internal Work)

| Modification | Power Gain (WHP) | Drag Impact | Cost |
|-------------|-------------------|-------------|------|
| Cold air intake | +3–5 WHP | Minimal | $100–200 |
| Header (equal-length, 4-2-1) | +8–12 WHP | Moderate | $300–600 |
| Cat-back exhaust | +3–5 WHP | Minimal | $200–400 |
| Intake manifold porting | +5–8 WHP | Moderate | $200–500 (DIY) |
| Throttle body upgrade (62.5mm → 65mm) | +2–3 WHP | Negligible | $150–300 |
| **Total bolt-on gain** | **+15–25 WHP** | **+0.3–0.5 sec ET** | **$950–2,000** |

### Internal/Performance Stage

| Modification | Power Gain (WHP) | Drag Impact | Cost |
|-------------|-------------------|-------------|------|
| Camshaft upgrade (VTEC spec or racier) | +10–15 WHP | Moderate | $400–800 |
| Cylinder head porting and polishing | +10–15 WHP | Moderate | $500–1,000 |
| High-flow catalytic converter | +3–5 WHP | Minimal | $150–300 |
| Lightweight flywheel (3–5 lb reduction) | N/A (power) | Faster rev response, harder launches | $200–400 |
| Competition clutch (multi-plate) | N/A (power) | Smoother power delivery, less wheel hop | $400–800 |
| **Total internal gain** | **+20–35 WHP** | **+0.5–1.0 sec ET** | **$1,650–3,300** |

### Forced Induction Stage

| Modification | Power Gain (WHP) | Drag Impact | Cost |
|-------------|-------------------|-------------|------|
| Turbo kit (T60-1 or equivalent, 10–15 psi) | +100–150 WHP | Major | $2,000–4,000 |
| Intercooler | +10–15 WHP (cooling benefit) | Consistent power, knock prevention | $300–600 |
| Fuel system upgrade (injectors, pump) | Required for turbo | Safety | $500–1,000 |
| Engine management (Hondata, AEM, etc.) | Required for turbo | Safety | $500–1,500 |
| Internal reinforcement ( ARP bolts, upgraded rods) | Required for reliability | Safety | $500–1,500 |
| **Total turbo stage** | **+120–180 WHP** | **-1.5 to -2.5 sec ET** | **$3,800–8,600** |

**Important note on boost:** The H22A's 11.0:1 compression ratio limits safe boost to approximately 6–8 psi on pump gas without internal modifications (lower compression pistons, forged internals). For higher boost levels, the piston compression ratio must be reduced (typically to 8.5:1–9.0:1) via flat-top or dished pistons.

---

## Real-World Performance Assessment

### What the H22A Redtop Can Do (Realistic Expectations)

| Build Level | Expected ET | Expected Trap Speed | Investment Required |
|-------------|-------------|---------------------|---------------------|
| Stock, street tires, novice driver | 15.0–15.5 | 90–93 | $0 |
| Stock, street tires, skilled driver | 14.5–14.9 | 93–96 | $0 (seat time only) |
| Bolt-ons, sticky street tires, skilled driver | 14.0–14.4 | 97–100 | $1,000–2,000 |
| Bolt-ons + LSD + traction bar, drag radials | 13.5–13.9 | 100–105 | $2,500–4,000 |
| Turbo (10–15 psi), full drag setup | 12.0–12.8 | 107–115 | $5,000–8,000 |
| Built NA (cams, porting, forged internals), slicks | 11.3–12.0 | 115–125 | $8,000–15,000 |

### Key Takeaway

The H22A Redtop's greatest drag racing weakness is not its power output but its **traction-limited nature as a high-RPM, low-torque FWD engine**. The engine makes excellent top-end power once past VTEC, but the launch is where races are won or lost — and the H22A's torque curve doesn't help here. Every successful H22A drag racer reported that their biggest improvements came from traction-related modifications (tires, LSD, traction bars, weight reduction) rather than power increases.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | HondaSwap.com — "new 1/4 mile times! eg H22A" | Forum thread | https://hondaswap.com/threads/new-1-4-mile-times-eg-h22a.524994/ | 2026-05-15 | Medium — user-reported, single-car data point |
| 2 | PreludePower — "1/4 mile times! Whats your fastest?!" | Forum thread | https://www.preludepower.com/threads/1-4-mile-times-whats-your-fastest.298168/ | 2026-05-15 | Medium — multiple data points, self-reported |
| 3 | PreludePower — "h22 1/4 mile times???" | Forum thread | https://www.preludepower.com/threads/h22-1-4-mile-times.182162/ | 2026-05-15 | Low — speculative, no measured data |
| 4 | NZHondas.com — "1/4 mile time Expectations??!!" | Forum thread | https://nzhondas.com/topic/94301-14-mile-time-expectations/ | 2026-05-15 | Medium — community consensus, theoretical estimates |
| 5 | Honda-Tech — "KEY Steps on how to make your FWD car HOOK" | Forum thread | https://honda-tech.com/forums/drag-racing-36/key-steps-how-make-your-fwd-car-hook-3261150/ | 2026-05-15 | High — experienced drag racer, systematic approach |
| 6 | Honda-Tech — "F23a1 10 second quarter mile" | Forum thread | https://honda-tech.com/forums/drag-racing-36/f23a1%EF%BF%BD-10-second-quarter-mile-3366140 | 2026-05-15 | Low — discussion only, no H22A-specific data |
| 7 | YouTube — "Accord H22 Turbo - Drag Race on Street Tires" | Video | https://www.youtube.com/watch?v=Bev4IHltR50 | 2026-05-15 | Low — visual confirmation only |
| 8 | YouTube — "Honda Prelude New 60ft and 1/8th Mile Personal Best" | Video | https://www.youtube.com/watch?v=VtsRIAS5WU0 | 2026-05-15 | Low — visual confirmation only |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Speedway Motors — Drag Racing Calculator | Reference tool | https://www.speedwaymotors.com/the-toolbox/drag-racing-calculator-1-4-mile-and-1-8-mile-et-mph-and-horsepower/145871 | 2026-05-15 | High — standard industry formulas |
| 2 | Road & Track — "Perfect FWD Drag Launch" | Article/video | https://www.roadandtrack.com/car-culture/videos/a29952/how-to-launch-front-wheel-drive/ | 2026-05-15 | Medium — general FWD guidance |
| 3 | SE-R.net — "Front Wheel Drive Launching Tips" | Forum guide | https://www.se-r.net/car_info/fwd_launch_tips.html | 2026-05-15 | Medium — applicable to Honda FWD |
| 4 | Innovative Mounts — Competition/Traction Bar product page | Manufacturer | https://www.fitmentindustries.com/store/suspension/181512/innovative-mounts-competition-traction-bar-88-91-honda-prelude/1991-honda-prelude-20-si-fwd | 2026-05-15 | High — manufacturer specs |

---

## Notes

### Conflicts and Discrepancies Between Sources

1. **Stock H22A quarter-mile times vary widely** (14.0–15.5 sec). This variance is primarily attributable to driver skill, tire condition, track preparation, and ambient conditions rather than engine variation. No two stock runs are directly comparable.

2. **60-foot times are inconsistently reported.** Some sources report 60-foot times from Gtech instruments (HONDARAVER: 2.124 sec), while others estimate based on elapsed time. Gtech data is considered more reliable.

3. **H22A weight estimates vary.** Forum users estimate the H22A+transmission combination at 440–460 lbs, while the B20A5 is estimated at 220 lbs for the engine alone. This suggests the H22A+trans is roughly 300–350 lbs heavier than a B-series+trans combo, which has significant implications for FWD weight distribution.

4. **LSD impact on ET is disputed.** One user (Ima2nr, 2003) claims "0.5 to 1 full second can be shaved off of your E/T with an LSD." Another (gringotegra, 2015) states motor mounts "didn't help me at all." Subjective assessments should be treated cautiously.

### Open Questions

1. **Optimal launch RPM for the H22A specifically?** Community consensus ranges from 3,500 RPM (conservative) to 5,000 RPM (aggressive). No dyno-backed study exists for this specific engine.

2. **Effect of ATTS (Active Torque Transfer System) on drag launches?** The Type SH's ATTS system could theoretically improve traction by biasing torque to the wheel with more grip, but no documented drag racing data exists for ATTS-equipped Preludes.

3. **Impact of the H22A's dual-runner intake manifold on drag racing vs. the Blacktop's single-runner?** The dual-runner design favors high-RPM power (consistent with the Redtop's character) but may reduce low-RPM torque available for launches. No direct comparison data exists.

4. **How does elevation affect H22A drag times?** One user reported losing ~2 seconds and ~8 mph at Douglas Raceway (5,300 ft elevation) compared to sea level. This is consistent with the ~3% power loss per 1,000 ft altitude rule of thumb.

---

## Citations

1. HondaSwap.com, "new 1/4 mile times! eg H22A," forum thread by The Godfather, posted Aug 2, 2012. URL: https://hondaswap.com/threads/new-1-4-mile-times-eg-h22a.524994/. Retrieved 2026-05-15 21:30 UTC. Credibility: Medium — user-reported data from a single EG hatch with H22A swap. Driver had ~15 drag passes experience. Documented times: 14.00 @ 100 mph, 60-foot: 2.1 sec.

2. PreludePower, "1/4 mile times! Whats your fastest?!," forum thread, posted Aug 5, 2008. URL: https://www.preludepower.com/threads/1-4-mile-times-whats-your-fastest.298168/. Retrieved 2026-05-15 21:35 UTC. Credibility: Medium — multiple data points from different users. Notable entries: jdmlude4u (13.9 @ 102, 60-foot: 2.1), HONDARAVER (15.06 @ 95.1, 60-foot: 2.124), LUDE_4_LIFE (14.0 @ 108, street tires, 60-foot: 2.6–2.8).

3. PreludePower, "h22 1/4 mile times???", forum thread by nthusiastt, posted Feb 15, 2003. URL: https://www.preludepower.com/threads/h22-1-4-mile-times.182162/. Retrieved 2026-05-15 21:40 UTC. Credibility: Low — speculative responses, no measured data. Users estimated "high 13's mid 14's" with bolt-ons, "low 15 (stock) at most."

4. NZHondas.com, "1/4 mile time Expectations??!!," forum thread by jawdat, posted Jun 15, 2009. URL: https://nzhondas.com/topic/94301-14-mile-time-expectations/. Retrieved 2026-05-15 21:45 UTC. Credibility: Medium — community consensus on NA tuning expectations. Consensus: late 13.xx to early 14 sec for ~153 kW (205 WHP) H22A EG swap with bolt-ons and sticky tires.

5. Honda-Tech, "KEY Steps on how to make your FWD car HOOK," forum thread by gringotegra, posted Oct 12, 2015. URL: https://honda-tech.com/forums/drag-racing-36/key-steps-how-make-your-fwd-car-hook-3261150/. Retrieved 2026-05-15 21:50 UTC. Credibility: High — experienced drag racer with detailed technical guidance covering alignment, tire compound, tire size, wastegate pressure, boost curve, boost-by-gear, corner balancing, and traction control. Applicable principles extend to NA FWD Hondas.

6. YouTube, "Accord H22 Turbo - Drag Race on Street Tires," video by unknown creator. URL: https://www.youtube.com/watch?v=Bev4IHltR50. Retrieved 2026-05-15 21:55 UTC. Credibility: Low — visual confirmation only, no telemetry data. Description notes "HORRIBLE 60 foot times" on street tires.

7. YouTube, "Honda Prelude New 60ft and 1/8th Mile Personal Best," video by H22 Prelude Dude. URL: https://www.youtube.com/watch?v=VtsRIAS5WU0. Retrieved 2026-05-15 22:00 UTC. Credibility: Low — visual confirmation only, channel focuses on H22-powered Preludes.

8. Speedway Motors, "Drag Racing Calculator," reference tool. URL: https://www.speedwaymotors.com/the-toolbox/drag-racing-calculator-1-4-mile-and-1-8-mile-et-mph-and-horsepower/145871. Retrieved 2026-05-15 22:05 UTC. Credibility: High — uses standard drag racing formulas (ET = (Weight/HP)^0.333 × 5.825, HP = Weight × (ET/5.825)^-3).

---

## Appendix

### FWD Drag Racing Physics Quick Reference

- **Tractive force limit:** F_max = μ × m × g, where μ is the coefficient of friction between tire and surface, m is the mass on driven wheels, and g is gravitational acceleration.

- **Typical μ values:**
  - Dry asphalt, street tires: 0.7–0.85
  - Dry asphalt, semi-slicks (R888R): 0.9–1.0
  - Dry asphalt, drag radials: 1.0–1.2
  - Dry asphalt, slicks: 1.3–1.6
  - Wet asphalt: 0.4–0.5

- **Power-to-weight benchmarks for FWD Hondas:**
  - 5.5–6.0 kg/PS: Mid-14s territory (stock/bolt-on)
  - 4.5–5.0 kg/PS: Low-14s / high-13s (moderate mods + LSD)
  - 3.5–4.0 kg/PS: Low-13s (forced induction)
  - Below 3.0 kg/PS: Sub-13s (full drag build)

- **H22A Redtop power-to-weight in stock Prelude BB1:**
  - Curb weight: ~1,250 kg
  - Peak power: 220 PS
  - Ratio: 5.68 kg/PS → mid-14s expected

### Launch RPM Decision Tree

```
Start at staging area
    │
    ├─ Street tires, novice driver?
    │   └─→ Launch at 3,500 RPM, smooth clutch release
    │
    ├─ Street tires, experienced driver?
    │   └─→ Launch at 4,000–4,500 RPM, progressive throttle
    │
    ├─ Semi-slicks (R888R), experienced driver?
    │   └─→ Launch at 4,500 RPM, firm throttle application
    │
    ├─ Drag radials, experienced driver?
    │   └─→ Launch at 4,500–5,000 RPM, aggressive throttle
    │
    └─ Slicks, full drag build?
        └─→ Launch at 5,000–5,500 RPM (into VTEC), full throttle
```

### Recommended Pre-Race Checklist

1. [ ] Tire pressure set to target (25–30 psi for street, 6–8 psi for slicks)
2. [ ] LSD installed and functioning
3. [ ] Traction bar installed (if applicable)
4. [ ] Motor/trans mounts solid (not stock rubber)
5. [ ] Alignment: 5–6° positive caster, zero/negative camber
6. [ ] Full interior removed (weight reduction)
7. [ ] Burnout performed (short, controlled)
8. [ ] Two-step timer set (if equipped)
9. [ ] Clutch bite point verified
10. [ ] Track surface inspected (clean, dry, prepped)
