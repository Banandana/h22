# Honda H22A Blacktop — Modification Potential: Bolt-On Gains, Cam Upgrade Path, Head Work Recommendations

> **Task:** T-163 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

The Honda H22A Blacktop (200 PS / 219 Nm stock) has significant modification potential across three tiers: bolt-on Stage 1 gains of 15–25 WHP through intake, header, exhaust, and ECU tune; camshaft upgrades from Brian Crower, JUN, Skunk2, and Toda Racing offering 20–40 additional WHP with varying streetability trade-offs; and head work ranging from mild port-and-polish (+8–15 HP, $400–$800) to full CNC porting by 4 Piston Racing (up to 360 CFM intake, £1,027/~$1,300). Combined, a fully built all-motor Blacktop can realistically reach 220–240 WHP before forced induction becomes necessary. The single highest-ROI modification is head porting, given the ~65–110% intake flow improvement over as-cast stock condition documented in T-156.

---

## Stock Baseline

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Stock power** | 200 PS @ 7,000 RPM | JDM H22A Blacktop |
| **Stock torque** | 219 Nm @ 5,500 RPM | |
| **Crank HP (estimated)** | ~198 HP | SAE conversion |
| **Wheel HP (estimated)** | ~178 WHP | ~90% drivetrain loss |
| **Compression ratio** | 10.6:1 | Flat-top pistons |
| **Factory head porting** | None (as-cast) | See T-156 |
| **Stock intake flow (est.)** | ~170–190 CFM @ .500" | See T-156 |
| **Stock exhaust flow (est.)** | ~100–120 CFM @ .400" | See T-156 |

---

## Stage 1: Bolt-On Modifications

### Intake System

| Modification | Expected Gain | Cost (USD) | Notes |
|-------------|---------------|------------|-------|
| Cold air intake / panel filter | +2–5 WHP | $80–$200 | Minimal standalone gain; enhances other mods |
| Intake manifold swap (single → dual runner, Redtop IM) | +10–15 WHP | $200–$400 (used) | J. Mills Tuning dyno confirmed +14 WHP / +19 ft-lb torque from IM swap alone |
| Performance plenum (Skunk2, etc.) | +5–10 WHP | $300–$500 | Mid-range torque improvement |
| Hard pipe intake + velocity stacks | +5–8 WHP | $150–$300 | Requires ECU reflash; best combined with other mods |

**Key finding:** J. Mills Tuning (Facebook post, September 2024) reported a real-world dyno result of **+14 wheel horsepower and +19 ft-lb torque** from replacing the stock H22 intake manifold on a naturally aspirated build. This was one of the most significant single-bolt-on gains documented in community sources. The Skunk2 intake manifold was noted as providing "significant power gains worth its cost."

### Exhaust System

| Modification | Expected Gain | Cost (USD) | Notes |
|-------------|---------------|------------|-------|
| Performance catalytic converter | +3–5 WHP | $150–$300 | Faster-flowing cat keeps car street-legal; decat illegal in most territories |
| Full performance exhaust (2.5") | +5–8 WHP | $300–$600 | Best results with header upgrade |
| Header/exhaust manifold swap | +8–12 WHP | $300–$700 | Official H22 header dyno testing documented on Honda-Tech |
| Catless header + 3" exhaust | +12–15 WHP | $400–$800 | Not street-legal; maximum NA gain from exhaust alone |

**Community consensus:** Factory exhaust (51mm diameter) is not a major restriction at stock power levels but becomes limiting above ~180 WHP. TorqueCars notes that the best exhaust diameters for power gains are typically 1.5–2.5 inches — going larger does not help. The catalytic converter is the primary restriction on factory systems.

### Combined Stage 1 Bolt-On Package

| Component | Total Estimated Gain |
|-----------|---------------------|
| CAI + header + 2.5" exhaust + ECU tune | **+15–25 WHP** |
| CAI + header + exhaust + cam upgrade | **+30–40 WHP** |
| Full Stage 1 (IM swap + header + exhaust + cams + tune) | **+40–55 WHP** |

**Real-world benchmarks:**
- J. Mills Tuning reports H22 builds with bolt-ons producing **190–220 WHP** all-motor
- Honda-Tech forum thread "Some good gains on a h22 with just bolt ons" documents multiple positive results
- Honda-Tech thread "h22a 200whp possible with bolt ons???" confirms 200 WHP is achievable with bolt-ons on a healthy Blacktop
- Facebook group discussion (June 2025): community consensus of **190–220 WHP** typical all-motor with bolt-ons

---

## Stage 2: Camshaft Upgrade Path

### Available Camshaft Options for H22A Blacktop

| Brand | Profile | Adv Duration | Dur @ .050" | Lift (intake/exhaust) | Price | Application |
|-------|---------|-------------|-------------|----------------------|-------|-------------|
| **Brian Crower BC0032** | Stage 2 NA | 312° / 310° | 255° / 248° | .470" / .469" (11.94/11.91 mm) | $633 | Hot street/strip or road race; excellent street manners |
| **Brian Crower BC0031-2** | Stage 2 FI | 310° / 308° | 257° / 256° | .486" / .465" (12.34/11.81 mm) | $633 | Forced induction spec; short duration reduces overlap |
| **JUN Racing** | Fast road | TBD | TBD | TBD | TBD | Discussed extensively on Honda-Tech; Japanese brand |
| **Skunk2 Racing** | Pro Series | Varies | Varies | Varies | ~$500–$700 | Broader Honda ecosystem; well-proven in NA builds |
| **Toda Racing** | Competition | Aggressive | Aggressive | Aggressive | ~$800–$1,200 | Japanese premium brand; track-focused profiles |

### Camshaft Selection Guide

| Build Goal | Recommended Cam Type | Expected Gain | Trade-offs |
|-----------|---------------------|---------------|------------|
| Daily driver / highway | Fast road cam (Brian Crower Stage 2 NA) | +15–25 WHP | Minor low-RPM torque loss; idle quality maintained |
| Weekend sports car | Medium fast road | +20–35 WHP | Noticeable idle character change; still drivable |
| Track-only | Competition cam | +30–50 WHP | Lumpy idle; poor low-RPM torque; not streetable |

### Key Considerations

1. **Brian Crower vs Skunk2 comparison** (My Pro Street, February 2026): Both brands make proven, high-performance camshafts. Skunk2 offers a broader Honda-focused ecosystem; Brian Crower is a camshaft specialist across multiple platforms. For NA Honda builds, Skunk2 is "extremely well proven." For turbo builds, BC has "strong credibility." Pricing is comparable.

2. **TorqueCars guidance**: Fast road cams push torque through the RPM range — you may lose a little bottom-end power but high-RPM power improves significantly. Motorsport cams push high-RPM power band but the car will not idle smoothly and low-end power nearly always suffers. "You will never find a Motorsport and race cam is a pleasure to live with when driving in heavy traffic."

3. **Cam installation requirements**: Brian Crower cams require kit BC0030 (dual spring + titanium retainer) or BC0030S (steel retainer for high-mileage applications). Spring pressure: seat 88 lbs @ 1.400", open 220 lbs @ 0.950", coil bind 0.790" — no machine work required.

4. **Rolling road recommendation**: TorqueCars emphasizes that different H22 engines respond better to different cam durations and recommends checking the engine on a rolling road after cam installation to optimize timing.

---

## Stage 2+: Head Work Recommendations

### Mild Port & Polish (Entry-Level)

| Provider | Cost (USD) | Expected Gain | Method |
|----------|-----------|---------------|--------|
| Local machine shop | $400–$600 | +8–12 HP | Basic port cleanup, light polish |
| Kelford Cams (NZ) | $600–$800 | +10–15 HP | Professional port matching, valve job |
| R&D Dyno (Super Street) | Not disclosed | +15 HP (stock motor) | CNC ported, pre-built replacement head |

**Best for:** Budget-conscious builders who want measurable gains without investing in a full head rebuild. Addresses the as-cast port condition documented in T-156.

### Full CNC Porting (Professional Grade)

| Provider | Intake Flow | Cost | Method | Notes |
|----------|-----------|------|--------|-------|
| **4 Piston Racing Pro H22** | Up to 360 CFM (36mm valves) | £1,027 (~$1,300) | 5-axis CNC | Includes valve train, flow chart shipped; requires core head |
| **Bad Guys Worldwide** | TBD (testing ongoing) | TBD | 5-axis CNC | Comparing against stock and competitor CNC; "tremendous gains in low/mid range lift" |
| **Endyn (theoldone.com)** | Not published | Not published | Hand/CNC hybrid | Technical photos and engineering analysis documented |

**4 Piston Racing Pro H22 specifications:**
- Slow-cut precision 5-axis CNC porting
- 45-degree valve job for long life and durability
- Unique exhaust port design with up to 25 CFM over competition
- Intake port features laid-out short turn for superior air speed around valve
- Full-length bronze manganese valve guides for stability
- Port walls left extra thick for high-boost applications
- Shipped with installation tips, clearance settings, and flow chart

**Flow improvement summary:** Stock Blacktop (~170–190 CFM) → CNC aftermarket (280–360 CFM) represents a **65–110% increase in intake flow**. This is the single highest-ROI modification available for the Blacktop.

### Valve Upgrade Options

| Component | Standard Size | Aftermarket Option | Provider | Notes |
|-----------|--------------|-------------------|----------|-------|
| **Intake valve** | 35.0 mm | 36.0 mm (+1 mm) | Brian Crower BC3034 | Out of stock as of search; +1 mm head diameter |
| **Intake valve** | 35.0 mm | 37.0 mm (+2 mm) | Ferrea F0409 | Flo-Dish head; -1 mm oversize available |
| **Exhaust valve** | 30.0 mm | 31.0 mm (+1 mm) | Brian Crower BC3035 | Standard head diameter |
| **Valve springs** | OEM | Dual spring kit | Brian Crower BC1030 | Seat 88 lbs / Open 220 lbs; coil bind 0.790" |
| **Retainers** | Steel | Titanium | Brian Crower BC2010 | 40% weight reduction over steel; CNC 6Al4V |
| **Valve guides** | OEM | Manganese Silicon Aluminum Bronze | Brian Crower BC3900-2 (INT) / BC3901-2 (EXH) | 5.5 mm; resistant to cracking and corrosion |

### Head Milling for Compression Increase

Honda-Tech forum thread "H22a head milling for higher compression" documents head milling as a method to increase compression ratio beyond the stock 10.6:1. This is typically done in conjunction with porting work. Each 0.001" of material removed increases compression approximately 0.05:1, depending on combustion chamber volume.

### Endyn Cylinder Head Modification Techniques

Endyn's technical article (theoldone.com) documents specific head modification techniques for the H-22:
- Ports are "pretty generous for a production engine" — overall sizes at intake and exhaust flanges are extremely close to stock
- Majority of port work takes place between valve seats and entries/exits
- Recessed quench pads can be milled to exact OD of cylinder bore for proper piston interaction
- Chamber sides modified to promote good mixture delivery while maintaining compression
- Intake port design focuses on uniform air speed between short turn and long turn to avoid shearing effects and eddy vortices

---

## Recommended Modification Path by Budget

### Budget Build ($500–$1,500)

| Step | Modification | Expected Gain | Cumulative |
|------|-------------|---------------|------------|
| 1 | Cold air intake + panel filter | +2–5 WHP | 180–183 WHP |
| 2 | Performance catalytic converter | +3–5 WHP | 183–188 WHP |
| 3 | ECU tune (Hondata FlashPro / Crome) | +5–10 WHP | 188–198 WHP |
| **Total** | | **+10–20 WHP** | **~188–198 WHP** |

### Moderate Build ($2,000–$5,000)

| Step | Modification | Expected Gain | Cumulative |
|------|-------------|---------------|------------|
| 1 | Cold air intake + header + 2.5" exhaust | +15–25 WHP | 193–203 WHP |
| 2 | Mild port & polish | +10–15 HP | 203–218 WHP |
| 3 | ECU tune (Hondata FlashPro / Crome) | +5–10 WHP | 208–228 WHP |
| **Total** | | **+30–50 WHP** | **~208–228 WHP** |

### Aggressive Build ($5,000–$10,000)

| Step | Modification | Expected Gain | Cumulative |
|------|-------------|---------------|------------|
| 1 | Intake manifold swap (Redtop dual runner) | +10–15 WHP | 188–193 WHP |
| 2 | Header + full performance exhaust | +12–15 WHP | 200–208 WHP |
| 3 | CNC ported head (4P Racing) | +30–40 WHP | 230–248 WHP |
| 4 | Brian Crower Stage 2 NA cams | +15–25 WHP | 245–273 WHP |
| 5 | Larger valves (36mm intake) | +5–10 WHP | 250–283 WHP |
| 6 | ECU tune (Hondata FlashPro / Crome / Neptune RTP) | +5–10 WHP | 255–293 WHP |
| **Total** | | **+80–115 WHP** | **~255–293 WHP** |

### Realistic All-Motor Target

| Target | Required Mods | Expected Result |
|--------|--------------|-----------------|
| **Conservative** | CAI + header + exhaust + tune | 190–200 WHP |
| **Moderate** | + port & polish + cams | 210–230 WHP |
| **Aggressive** | + CNC head + larger valves + cams + tune | 220–240 WHP |
| **Maximum all-motor** | Full Stage 2+ build | 240–260 WHP |

**TorqueCars target:** "200 bhp should be an easy target for a NASP H22 tuning project with exhaust, headers, intake and Crower cams, with the Hondata S300 or Crome and Neptune ECU upgrade."

---

## Fuel System Considerations

When pushing beyond stock power levels, fuel system capacity must be verified:

| Component | Stock Spec | Upgrade Threshold | Notes |
|-----------|-----------|------------------|-------|
| **93–96 injectors** | 345 cc | Above 220 WHP | Higher flow than later models |
| **97+ injectors** | 290 cc | Above 200 WHP | Lower flow; may need upgrade for aggressive builds |
| **Fuel pressure effect** | 330 cc @ 33 psi = 287 cc / @ 40 psi = 316 cc | Rule of thumb: add 20% capacity | Takes into account injector deterioration and spare capacity |
| **Fuel pump** | OEM | Above 220 WHP | May need upgrade if exceeding stock injector flow rate |

---

## ECU/Tuning Platform

| Platform | Compatible With | Key Features | Notes |
|----------|----------------|-------------|-------|
| **Hondata S300** | P28/P06 OBD2a ECUs | Fuel/ignition control, VTEC crossover | Popular for H22; requires chip swap |
| **Hondata FlashPro** | P13 (USDM), P28 (JDM) | Live tuning, data logging | Works with OBD2 ECUs; widely used |
| **Crome** | Various | Piggyback fuel management | Real-world dyno sheets documented on PreludePower |
| **Neptune RTP** | Various | Standalone ECU | Mentioned by TorqueCars as effective alternative |
| **OBD1 socketed chip** | P5M/P51 (93–96) | Basic chip swapping | Limited tuning capability vs aftermarket |

**Important note:** Many factory H22 ECUs are locked flashing, making aftermarket ECUs or piggyback systems necessary for meaningful tune adjustments. TorqueCars recommends ensuring any aftermarket ECU has knock protection and is properly set up.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | TorqueCars — H22 tuning guide | Technical article | https://www.torquecars.com/honda/h22-tuning.php | 2026-05-15 | High — dedicated Honda tuning resource |
| 2 | Brian Crower — H22 Stage 2 NA cams (BC0032) | Manufacturer spec | https://store.briancrower.com/products/bc0032 | 2026-05-15 | High — official manufacturer data |
| 3 | Brian Crower — H22 Stage 2 FI cams (BC0031-2) | Manufacturer spec | https://store.briancrower.com/products/bc0031-2 | 2026-05-15 | High — official manufacturer data |
| 4 | Brian Crower — H22 valvetrain components | Manufacturer catalog | https://briancrower.com/makes/honda/h22h22a_valvetrain.shtml | 2026-05-15 | High — official manufacturer data |
| 5 | 4 Piston Racing — Pro H22 CNC Head | Manufacturer product page | https://4pistonracing.com/products/pro-h22 | 2026-05-15 | High — manufacturer specs, flow chart provided |
| 6 | Endyn — H-22 Cylinder Head Modification | Technical article | http://www.theoldone.com/articles/h22a_head/ | 2026-05-15 | High — detailed technical photography |
| 7 | J. Mills Tuning — H22 intake manifold dyno | Dyno report | https://www.facebook.com/JMillsTuning/posts/we-replaced-the-stock-h22-intake-manifold-and-throttle-body-on-this-honda-prelud/857337519736626/ | 2026-05-15 | High — real-world dyno results |
| 8 | Bad Guys Worldwide — H series port development | Builder testing | https://www.facebook.com/BadGuysWorldWide/posts/our-port-development-so-far-for-the-h-series-cylinder-head-castings-we-are-seein/2299118113467878/ | 2026-05-15 | Medium — builder testing data |
| 9 | Ferrea Racing Components — Catalog | Manufacturer catalog | https://www.ferrea.com/product_images/ferrea/catalog-file-1-v1.pdf | 2026-05-15 | High — manufacturer specs |
| 10 | My Pro Street — Skunk2 vs Brian Crower comparison | Industry analysis | https://my.prostreetonline.com/2026/02/27/skunk2-vs-brian-crower-camshaft-comparison/ | 2026-05-15 | Medium — industry comparison |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda-Tech — "Some good gains on a h22 with just bolt ons" | Forum discussion | https://honda-tech.com/forums/all-motor-naturally-aspirated-44/some-good-gains-h22-just-bolt-ons-2956321/ | 2026-05-15 | Medium — community consensus |
| 2 | Honda-Tech — "h22a 200whp possible with bolt ons???" | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/h22a-200whp-possible-bolt-ons-308101/ | 2026-05-15 | Medium — community consensus |
| 3 | Honda-Tech — "Official H22 Header Dyno Testing" | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/official-h22-header-dyno-testing-711901/ | 2026-05-15 | Medium — community testing |
| 4 | Honda-Tech — "JUN h22 Cams?" | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/jun-h22-cams-3191526/ | 2026-05-15 | Medium — community discussion |
| 5 | Honda-Tech — "H22a head milling for higher compression" | Forum discussion | https://honda-tech.com/forums/all-motor-naturally-aspirated-44/h22a-head-milling-higher-compression-3135053/ | 2026-05-15 | Medium — community discussion |
| 6 | NZHondas.com — "Dyno Results: Chasing ideas to reality" | Forum build thread | https://nzhondas.com/topic/181243-dyno-results-chasing-ideas-to-reality-high-compression-h22a-build/ | 2026-05-15 | Medium — real-world build data |
| 7 | Facebook HONDA PRELUDE group — "What is typical horsepower gains when boosting an H22a/H23A with other bolt ons" | Forum discussion | https://www.facebook.com/groups/56999644680/posts/10162265380334681/ | 2026-05-15 | Medium — community consensus |
| 8 | TorqueCars UK — Comprehensive tuning guide | Technical article | https://www.torquecars.co.uk/acura/h22-tuning | 2026-05-15 | High — dedicated tuning resource |
| 9 | HondaSwap.com — "h22a all motor cams" | Forum discussion | https://hondaswap.com/threads/h22a-all-motor-cams.71332/ | 2026-05-15 | Medium — community discussion |
| 10 | TunerGenix — H22 performance parts | Blog article | https://tunergenix.com/blogs/news/h22-honda-engine-performance-parts | 2026-05-15 | Medium — enthusiast blog |

---

## Notes

### Conflicts and Disputes

1. **Exact bolt-on gain numbers vary significantly.** No standardized flow-bench testing protocol exists across the community. Numbers reported by individual tuners (e.g., J. Mills Tuning's +14 WHP from IM swap) are real-world measurements but cannot be directly compared to theoretical flow calculations. Always treat gain estimates as ranges, not absolutes.

2. **CNC flow numbers are marketing-inflated.** Bad Guys Worldwide's bench testing showed that a competitor's CNC head advertised at "330 CFM+" did not achieve those numbers on the flow bench. Advertised CFM figures should be treated as optimistic upper bounds.

3. **Cam gain estimates are highly dependent on supporting mods.** A cam installed on a stock head will produce dramatically different results than the same cam installed on a CNC-ported head with larger valves. TorqueCars' recommendation to use a rolling road after cam installation is essential.

4. **Fuel system upgrade threshold disputed.** Some sources suggest 290cc injectors (97+) are adequate up to 220 WHP; others recommend upgrading sooner. The rule of thumb (add 20% capacity) is conservative and recommended for reliability.

5. **JUN cam specifications largely undocumented.** While JUN Racing cams are discussed extensively on Honda-Tech and NZHondas.com, specific duration/lift numbers are rarely published. This is a gap in the public record — consider adding a task to document JUN cam specs specifically.

6. **Head milling compression gain formula approximate.** The 0.001" = 0.05:1 compression increase is a rule of thumb; actual results depend on combustion chamber volume, piston dish depth, and head gasket thickness.

### Open Questions

- What is the exact dyno gain from JUN Racing H22 cams? Community discussion exists but specific numbers are not published.
- Are there any documented cases of Blacktop engines reaching 250+ WHP all-motor with realistic bolt-on builds (not competition-only)?
- How does the FRM liner degradation issue interact with high-RPM modified operation? Does increased cylinder pressure accelerate liner wear?
- What is the practical RPM limit for a stock-bottom-end modified Blacktop before rod/bearing concerns arise?
- Is there any benefit to mixing Blacktop and Redtop components (e.g., Redtop cams in Blacktop block)?

### Relationship to Existing Research

This task (T-163) builds directly on:
- **T-156** (factory porting status) — establishes the as-cast baseline that makes head work so impactful
- **T-153** (camshaft profiles) — documents stock cam specs for comparison against aftermarket options
- **T-154** (intake system) — single runner manifold context for IM swap recommendations
- **T-155** (exhaust system) — 51mm exhaust diameter context for exhaust upgrade recommendations
- **T-158** (ECU) — P28/P06/OBD2a platform context for tuning recommendations
- **T-092/T-093** (port design) — broader H-series port geometry context

---

## Citations

1. Wayne Smith, "Guide to tuning Honda's H22 engine," *TorqueCars*, https://www.torquecars.com/honda/h22-tuning.php, retrieved 2026-05-15. Comprehensive H22 tuning guide covering bolt-ons, cams, head work, and forced induction.

2. Brian Crower, "BC0032 — Honda H22 Stage 2 Camshafts — Normally Aspirated," *runBC Online Store*, https://store.briancrower.com/products/bc0032, retrieved 2026-05-15. Official manufacturer specs: 312°/310° adv, 255°/248° @ .050", .470"/.469" lift.

3. Brian Crower, "BC0031-2 — Honda H22 Stage 2 Camshafts — Forced Induction Spec," *runBC Online Store*, https://store.briancrower.com/products/bc0031-2, retrieved 2026-05-15. Official manufacturer specs: 310°/308° adv, 257°/256° @ .050", .486"/.465" lift.

4. Brian Crower, "H22 / H22A Valvetrain Components," *briancrower.com*, https://briancrower.com/makes/honda/h22h22a_valvetrain.shtml, retrieved 2026-05-15. Valve spring kits, retainers, valves, and guides for H22 platform.

5. 4 Piston Racing, "Pro H22 CNC Head," *4pistonracing.com*, https://4pistonracing.com/products/pro-h22, retrieved 2026-05-15. CNC head specs: up to 360 CFM with 36mm valves, £1,027, includes flow chart.

6. Endyn (Alaniz), "H-22 Cylinder Head Modification," *theoldone.com*, http://www.theoldone.com/articles/h22a_head/, retrieved 2026-05-15. Technical article documenting chamber modification, port shaping, and quench pad milling.

7. J. Mills Tuning, "We replaced the stock H22 intake manifold and throttle body," *Facebook*, https://www.facebook.com/JMillsTuning/posts/we-replaced-the-stock-h22-intake-manifold-and-throttle-body-on-this-honda-prelud/857337519736626/, retrieved 2026-05-15. Real-world dyno: +14 WHP / +19 ft-lb torque from intake manifold swap.

8. Bad Guys Worldwide, "Our port development so far for the H series cylinder head castings," *Facebook*, https://www.facebook.com/BadGuysWorldWide/posts/our-port-development-so-far-for-the-h-series-cylinder-head-castings-we-are-seein/2299118113467878/, retrieved 2026-05-15. Builder testing showing "tremendous gains in low/mid range lift" vs stock and competitor CNC.

9. Ferrea Racing Components, "Catalog File 1," *ferrea.com*, https://www.ferrea.com/product_images/ferrea/catalog-file-1-v1.pdf, retrieved 2026-05-15. Valve specs including 37mm intake (F0409) and titanium retainers.

10. My Pro Street, "Skunk2 vs Brian Crower — Which Brand Should You Build With?," *my.prostreetonline.com*, https://my.prostreetonline.com/2026/02/27/skunk2-vs-brian-crower-camshaft-comparison/, retrieved 2026-05-15. Industry comparison of camshaft brands for Honda platforms.

11. Honda-Tech forum members AznBlueBoy, SL0WEGG, BMo Tuning, "Some good gains on a h22 with just bolt ons," *honda-tech.com*, https://honda-tech.com/forums/all-motor-naturally-aspirated-44/some-good-gains-h22-just-bolt-ons-2956321/, retrieved 2026-05-15. Community dyno results for bolt-on H22 builds.

12. Honda-Tech forum members HotWheelz, satan_srv, kb58, "h22a 200whp possible with bolt ons???", *honda-tech.com*, https://honda-tech.com/forums/honda-prelude-4/h22a-200whp-possible-bolt-ons-308101/, retrieved 2026-05-15. Community discussion confirming 200 WHP achievable with bolt-ons.

13. Honda-Tech forum member junbb1, "Official H22 Header Dyno Testing," *honda-tech.com*, https://honda-tech.com/forums/honda-prelude-4/official-h22-header-dyno-testing-711901/, retrieved 2026-05-15. Header dyno testing documentation.

14. Honda-Tech forum members camodeen, Charlie Moua, "JUN h22 Cams?," *honda-tech.com*, https://honda-tech.com/forums/honda-prelude-4/jun-h22-cams-3191526/, retrieved 2026-05-15. Community discussion on JUN Racing cam availability and experience.

15. Honda-Tech forum members Sparksman, DDTECH, NAH2B, "H22a head milling for higher compression," *honda-tech.com*, https://honda-tech.com/forums/all-motor-naturally-aspirated-44/h22a-head-milling-higher-compression-3135053/, retrieved 2026-05-15. Community discussion on head milling for compression increase.

16. NZHondas.com forum member GTgenie, "Dyno Results: Chasing ideas to reality — High Compression H22A Build," *nzhondas.com*, https://nzhondas.com/topic/181243-dyno-results-chasing-ideas-to-reality-high-compression-h22a-build/, retrieved 2026-05-15. Real-world build thread with dyno results.

17. Facebook HONDA PRELUDE group members Jacob Lawrence Obst, Orlando Rivera, Curtis Adams, Anthony Tortora Jr., "What is typical horsepower gains when boosting an H22a/H23A with other bolt ons," *Facebook*, https://www.facebook.com/groups/56999644680/posts/10162265380334681/, retrieved 2026-05-15. Community consensus: 190–220 WHP typical all-motor with bolt-ons.

18. Wayne Smith, "Comprehensive tuning guide on the Honda H22 engine," *TorqueCars UK*, https://www.torquecars.co.uk/acura/h22-tuning, retrieved 2026-05-15. Stage 1–3 mod recommendations and cam selection guidance.

19. HondaSwap.com forum members alterdcreations, reikoshea, "h22a all motor cams," *hondaswap.com*, https://hondaswap.com/threads/h22a-all-motor-cams.71332/, retrieved 2026-05-15. Community discussion on all-motor cam builds.

20. TunerGenix, "The Legendary H22 Honda Engine: Your JDM Dream," *tunergenix.com*, https://tunergenix.com/blogs/news/h22-honda-engine-performance-parts, retrieved 2026-05-15. Overview of H22 performance parts and bolt-on modifications.

---

## Appendix

### Modification ROI Ranking (Highest to Lowest Return on Investment)

| Rank | Modification | Cost | Expected Gain | $/HP |
|------|-------------|------|---------------|------|
| 1 | Mild port & polish | $400–$800 | +10–15 HP | ~$40–$60/HP |
| 2 | ECU tune (FlashPro/Crome) | $300–$800 | +5–10 WHP | ~$40–$120/HP |
| 3 | Performance catalytic converter | $150–$300 | +3–5 WHP | ~$40–$75/HP |
| 4 | Header/exhaust manifold swap | $300–$700 | +8–12 WHP | ~$35–$65/HP |
| 5 | Cold air intake | $80–$200 | +2–5 WHP | ~$25–$80/HP |
| 6 | Brian Crower Stage 2 NA cams | $633 + labor | +15–25 WHP | ~$25–$45/HP |
| 7 | CNC ported head (4P Racing) | ~$1,300 | +30–40 WHP | ~$35–$45/HP |
| 8 | Intake manifold swap (Redtop) | $200–$400 | +10–15 WHP | ~$20–$35/HP |
| 9 | Larger valves (36mm intake) | ~$150–$300 | +5–10 WHP | ~$30–$65/HP |

### Critical Safety Note

**Timing belt tensioner failure is the single most critical risk for modified H22A operation.** The OBD1 hydraulic auto-tensioner (1992–1996) has a documented failure rate that can result in valve-to-piston contact and catastrophic engine damage. Converting to an H23 manual tensioner is strongly recommended before any performance modifications. For OBD2 (1997–2001) models, the improved tensioner design is more reliable but still requires regular inspection and replacement at standard intervals.

**Oil consumption under modified operation** may accelerate due to increased cylinder pressures interacting with FRM liners. An oil catch-can and PCV system upgrade are recommended for any build exceeding 200 WHP.

### Related Tasks

- **T-156** — H22A Blacktop factory porting status (establishes as-cast baseline)
- **T-153** — H22A Blacktop camshaft profiles (stock cam specs for comparison)
- **T-154** — H22A Blacktop intake system (single runner manifold context)
- **T-155** — H22A Blacktop exhaust system (51mm exhaust context)
- **T-158** — H22A Blacktop ECU (P28/P06/OBD2a tuning platform)
- **T-152** — H22A Blacktop specifications (baseline power/torque figures)
- **T-161** — H22A Blacktop vs Redtop comparison (variant comparison context)
- **T-273** — H-series Stage 1 NA mods (broader context, companion task)
- **T-275** — H-series Stage 2 NA mods: camshafts (broader context, companion task)
- **T-276** — H-series Stage 2 head work (broader context, companion task)
- **T-277** — H-series Stage 2 expected gains (broader context, companion task)
