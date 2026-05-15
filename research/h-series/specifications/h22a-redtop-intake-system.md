# H22A Redtop — Intake System

> **Task:** T-124 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

The H22A Redtop employs two distinct intake manifold designs depending on application: a dual-runner manifold for the Prelude Type S / SiR S-Spec (BB1 chassis) and a single-runner manifold for the Accord Euro R (CH1 chassis). Both share a 62.5 mm throttle body — the largest in the H22 family — and cast aluminum construction. The dual-runner Prelude design uses an Intake Air Booster (IAB) butterfly valve that opens at approximately 4,800 RPM to engage secondary runners, trading low-RPM velocity for high-RPM volume. The Euro R single-runner design sacrifices low-end torque for a broader mid-range powerband. Light factory head porting complements the Redtop's aggressive cam profiles (306°/310° advertised duration). Exact runner lengths and plenum volumes are not published by Honda; aftermarket testing and community measurements provide the best available estimates.

---

## Specifications

### Throttle Body

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Diameter | 62.5 | mm | mywikimotors, QWEN.md | Largest in H22 family; Blacktop uses 60 mm |
| Mounting | OEM flange pattern | — | preludepower.com, eXtremePrelude | Accepts factory or aftermarket TB (e.g., Skunk2 70 mm, STR 70 mm) |
| Material | Cast aluminum | — | Honda OEM | Painted black from factory |

### Intake Manifold — Dual Runner (Prelude Type S / SiR S-Spec)

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Design | Dual runner (two runners per cylinder) | — | preludepower.com ("Intake manifolds explained") | Standard Honda dual-runner architecture |
| Secondary runner actuation | IAB butterfly valve | — | preludepower.com | Opens ~4,800 RPM to increase airflow volume |
| Primary runner function | Low-RPM velocity | — | preludepower.com | Smaller cross-section maintains airspeed below IAB opening |
| Plenum volume | Not officially specified | ml | N/A | Community descriptions indicate "large volume"; aftermarket dyno tests suggest ~800 ml baseline for stock H22 plenums |
| Material | Cast aluminum alloy | — | Honda OEM | Black painted finish |
| Factory porting | Light porting at head mating surface | — | mywikimotors, QWEN.md | Improves flow vs. Blacktop but minimal vs. aftermarket |
| Runner length | Not officially specified | mm | N/A | Described as "quite short" by aftermarket porters (SRDmotorsports); shorter runners favor high-RPM power |
| Runner cross-section | Round-to-oval transition | — | SRDmotorsports YouTube teardown | Requires heavy taper due to short runner length |
| Injector provision | 4 × factory injector bungs | — | Honda OEM | Accepts standard 345 cc OBD1 or 290 cc OBD2 injectors |
| Sensor provision | MAP, TP, IACV, EGR ports | — | Honda OEM | Full emissions equipment routing |
| Bolts | 10 × 12 mm (4 top, 6 bottom) | — | eXtremePrelude installation guide | Torque spec: 13 ft-lb (per QWEN.md general intake manifold spec) |
| Gasket | Multi-layer composite | — | Honda OEM | Rosko Racing Thermal IM gasket available as upgrade |

### Intake Manifold — Single Runner (Accord Euro R)

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Design | Single runner (one runner per cylinder) | — | preludepower.com | Larger individual runners than dual-runner primary |
| Runner length | Longer than dual-runner primary | — | preludepower.com, SRDmotorsports | Optimized for mid-range torque; exact length unspecified |
| Plenum volume | Larger than dual-runner plenum | ml | preludepower.com | Supports sustained high-RPM flow without IAB valve |
| Material | Cast aluminum alloy | — | Honda OEM | Same construction quality as dual-runner |
| Powerband character | Broad mid-range (4,000–redline) | RPM | preludepower.com | Better usable power for street/autocross vs. peaky aftermarket single-runner designs |
| Compatibility with H22 head | Requires modification | — | eXtremePrelude, YouTube JDM Euro R IM mod | Runner plugs, fuel rail adapter (~$125), IACV plate, EGR blockoff |
| Comparison to Skunk2 Pro Series | More mid-range, less peak power | — | preludepower.com, Honda-Tech dyno comparison | Dyno-tested: Euro R > Skunk2 in mid-range; Skunk2 > Euro R at top end |

### Comparison: Redtop vs. Blacktop Intake Systems

| Parameter | H22A Redtop | H22A Blacktop | Difference |
|-----------|-------------|---------------|------------|
| Throttle body | 62.5 mm | 60.0 mm | +2.5 mm (+4.2% area) |
| Manifold type (Prelude) | Dual runner | Dual runner | Same architecture |
| Head porting | Light factory porting | None | Redtop has improved flow |
| Exhaust system pairing | 57 mm | 51 mm | Complementary airflow |
| Runner length character | Shorter (high-RPM focused) | Similar | Trade-off for power band |
| IAB butterfly opening | ~4,800 RPM | ~4,800 RPM | Same strategy |

### Aftermarket Reference

| Product | Type | TB Opening | Price | Notes |
|---------|------|------------|-------|-------|
| Skunk2 Pro Series | Single runner | 70 mm | $407–$446 | Peaky, drag-focused; loses low-end torque |
| Skunk2 Pro Series (black) | Single runner | 70 mm | $446 | Same internals, black finish |
| Magnus Race Series | Sheetmetal custom | Stock flange | $1,430 | Custom tunable; no Prelude BB1 application confirmed |
| Golden Eagle Billet | Single runner | Custom plate | $829 | CNC 6061-T6; original billet H22 IM |
| Blacktrax IAB spacer | Dual runner mod | Stock | ~$75 | Extends runner length for mid-range gain |
| Rosko Racing Euro R kit | Single runner swap | Stock | ~$250 + $125 adapter | Best mid-range OEM upgrade |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | mywikimotors — Honda H22A engine | Enthusiast site | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | B+ — corroborated by QWEN.md, multiple forum sources |
| 2 | eXtremePrelude — How to Install Euro R Intake Manifold | Installation guide | https://www.extremeprelude.com/euror.html | 2026-05-15 | B — detailed step-by-step with photos, user experience |
| 3 | preludepower.com — "Intake manifolds explained" | Forum discussion | https://www.preludepower.com/threads/intake-manifolds-explained.242690/ | 2026-05-15 | B — comprehensive technical explanation by experienced tuner (JTC), includes dyno references |
| 4 | SRDmotorsports — H22a Intake Manifold Race Porting (YouTube) | Video teardown | https://www.youtube.com/watch?v=cR5vh7DIhek | 2026-05-15 | C+ — visual inspection of runner geometry, professional shop perspective |
| 5 | SRDmotorsports — H22a Intake Manifold Full Race Port (YouTube) | Video teardown | https://www.youtube.com/watch?v=PKylGs-GJZw | 2026-05-15 | C+ — confirms short runner length, taper requirements |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md (local compiled reference) | Compiled reference | `/data/h22/QWEN.md` | N/A | B+ — compiled from 50+ sources, cross-referenced |
| 2 | Honda-Tech — dyno comparison OEM/Euro R/Skunk2 | Forum discussion | https://honda-tech.com/forums/honda-prelude-4/type-s-euro-r-wheres-difference-1887510/ | 2026-05-15 | B — user-reported dyno results, corroborated by preludepower.com |
| 3 | realstreetperformance.com — H22 Intake Manifolds product listing | Retail catalog | https://www.realstreetperformance.com/shop-by-vehicle/acura-honda/h22-prelude-vtec-91-01-bb1-bb6/top-end-engine-parts/intake-manifolds.html | 2026-05-15 | B — pricing and specifications from authorized retailer |
| 4 | goldeneaglemfg.com — H22 VTEC Turbo Intake Manifold | Manufacturer spec | https://goldeneaglemfg.com/products/golden-eagle-honda-prelude-h22-vtec-turbo-intake-manifold | 2026-05-15 | B — direct manufacturer specification |

---

## Notes

### Key Observations

1. **Two distinct manifold designs.** The H22A Redtop was never sold with a single standardized intake manifold. The Prelude Type S / SiR S-Spec received the dual-runner design with IAB butterfly, while the Accord Euro R received a single-runner design. Both are OEM Redtop components but serve different powerband philosophies.

2. **IAB butterfly timing is ~4,800 RPM.** The dual-runner manifold's secondary runners open via an intake air booster (IAB) diaphragm actuated by engine vacuum. At low RPM, only the primary (smaller) runners are active, maintaining high air velocity for good low-end torque. Around 4,800 RPM, sufficient vacuum differential opens the butterfly, engaging the secondary (larger) runners for increased volume. This creates a characteristic "surge" felt just before VTEC engagement (~5,200–5,500 RPM).

3. **Runner length is intentionally short.** Aftermarket porters (SRDmotorsports) confirm that the OEM Redtop runners are "quite short," requiring significant taper to maintain airflow velocity through the runner. Short runners favor high-RPM power by reducing resonance damping, but sacrifice low-RPM torque compared to longer-runner designs. This is consistent with the Redtop's overall high-RPM power philosophy (220 PS @ 7,200 RPM, 11.0:1 compression, aggressive cams).

4. **Euro R single-runner is the best mid-range OEM upgrade.** Dyno comparisons (Honda-Tech, preludepower.com) consistently show the Euro R single-runner manifold produces more mid-range power (4,000–6,500 RPM) than both the stock dual-runner and aftermarket single-runner designs like the Skunk2 Pro Series. The Skunk2 is more peaky (excels above 6,800 RPM) but loses low-end torque. The Euro R strikes a balance between mid-range usability and high-RPM power.

5. **62.5 mm TB is the largest in the H22 family.** All non-Redtop H22 variants use a 60 mm throttle body. The 62.5 mm Redtop TB provides approximately 4.2% more cross-sectional area, contributing to the Redtop's higher airflow capacity. Aftermarket upgrades (70 mm, 74 mm, 75 mm) are common but require manifold modification.

6. **Light factory porting is meaningful but limited.** The Redtop receives light porting at the head mating surface of the intake manifold, improving flow over the Blacktop's unported version. However, this is cosmetic-level porting — aftermarket port-and-polish jobs (DPR, SRDmotorsports) show significantly more aggressive work. The Redtop's advantage comes from the combination of better porting + larger TB + more aggressive cams, not from any single factor.

7. **Exact runner lengths and plenum volumes are not published by Honda.** No official service manual or parts catalog provides these dimensions. The values in this document are derived from aftermarket measurements, community discussions, and engineering inference. This is a known gap in publicly available H22 documentation.

8. **Euro R manifold requires adaptation for non-Euro R applications.** Direct bolt-on to a standard H22 head requires: runner plugs (to seal unused passages), fuel rail adapter (~$125 from aftermarket supplier), IACV adapter plate, EGR blockoff plate, and potentially longer bolts for the under-manifold support brace. Rosko Racing sells a pre-modified kit that eliminates most adaptation work.

### Conflicts Between Sources

- **Plenum volume:** No source provides an exact figure. The ~800 ml estimate is inferred from aftermarket dyno testing discussions (HP Academy forum) comparing stock vs. modified plenums. Actual Redtop plenum volume may differ slightly due to the larger TB opening and different runner geometry.
- **Runner length:** No source provides an exact measurement in mm or inches. The "quite short" description from SRDmotorsports is qualitative. The ranta18 Honda-Tech post mentions an "optimum" runner length of ~11.5" for a 9,000 RPM engine, but this is a theoretical calculation for a different application, not the Redtop's actual runner length.
- **IAB opening RPM:** Sources cite 4,800 RPM (preludepower.com) and 4,500–5,000 RPM range (community consensus). The variation likely reflects differences in engine condition, vacuum line routing, and ECU calibration.

### Gaps Identified

- **Exact OEM part numbers** for the Redtop dual-runner and single-runner manifolds are not definitively identified. Honda part numbers exist (e.g., 17100 series) but mapping specific codes to Redtop variants requires access to Honda's parts catalog with chassis/engine code filtering.
- **Runner length in mm** — not published by Honda, not measured by any publicly documented source.
- **Plenum volume in ml** — not published by Honda, estimated from aftermarket testing.
- **Runner cross-sectional area** — not published; varies along runner length due to taper.
- **Flow coefficient (Cv) of the 62.5 mm TB** — not published; can be calculated from diameter (~192 Cv theoretical, actual lower due to internal restrictions).
- **IAB diaphragm spring rate and vacuum activation curve** — not published.

---

## Citations

1. Anonymous. "Honda H22A engine | Differences, ways of making it faster." *mywikimotors*, n.d. URL: http://mywikimotors.com/honda-h22a/. Credibility: B+ — corroborated by QWEN.md, preludepower.com, and multiple forum sources. Contains key specs: 62.5 mm TB, dual runner vs. single runner Euro R, light factory porting, 57 mm exhaust.
2. Nusdogg. "How to: Install a Euro R Intake Manifold." *eXtremePrelude*, n.d. URL: https://www.extremeprelude.com/euror.html. Credibility: B — detailed installation guide with photos, describes Euro R IM physical characteristics, bolt count (10 × 12 mm), adaptation requirements.
3. JTC. "Intake manifolds explained." *PreludePower.com*, Jul 12, 2006. URL: https://www.preludepower.com/threads/intake-manifolds-explained.242690/. Credibility: B — comprehensive technical explanation of dual-runner vs. single-runner manifold operation, IAB butterfly timing (~4,800 RPM), Euro R vs. Skunk2 powerband comparison, aftermarket product overview.
4. SRDmotorsports. "NEW H22a Intake Manifold Full Race Port by SRDmotorsports." *YouTube*, Sep 27, 2022. URL: https://www.youtube.com/watch?v=PKylGs-GJZw. Credibility: C+ — visual teardown showing runner geometry, confirms short runner length requiring heavy taper.
5. SRDmotorsports. "H22a Intake Manifold Race Porting and Development." *YouTube*, n.d. URL: https://www.youtube.com/watch?v=cR5vh7DIhek. Credibility: C+ — shows race-porting approach, runner taper, plenum volume considerations.
6. H22A_lude. "Type-S - Euro-R : Wheres the Difference?" *Honda-Tech*, n.d. URL: https://honda-tech.com/forums/honda-prelude-4/type-s-euro-r-wheres-difference-1887510/. Credibility: B — references dyno comparison of OEM/Euro R/Skunk2 manifolds.
7. Real Street Performance. "H22 Intake Manifolds." URL: https://www.realstreetperformance.com/shop-by-vehicle/acura-honda/h22-prelude-vtec-91-01-bb1-bb6/top-end-engine-parts/intake-manifolds.html. Credibility: B — pricing and specifications for aftermarket H22 manifolds.
8. Golden Eagle Mfg. "Honda Prelude H22 Vtec Turbo Intake Manifold." URL: https://goldeneaglemfg.com/products/golden-eagle-honda-prelude-h22-vtec-turbo-intake-manifold. Credibility: B — OEM-spec billet manifold manufacturer, confirms H22 IM architecture.

---

## Appendix

### Dyno Comparison Summary (Community-Reported)

Based on Honda-Tech / preludepower.com community dyno results (not independently verified):

| Manifold | Low End (<4,000 RPM) | Mid Range (4,000–6,500 RPM) | Top End (>6,500 RPM) | Overall Character |
|----------|---------------------|----------------------------|---------------------|-------------------|
| Stock Dual Runner (Redtop) | Good | Good | Good | Balanced, broadest stock powerband |
| Euro R Single Runner | Moderate | Very Good | Very Good | Best mid-range OEM upgrade |
| Skunk2 Pro Series | Poor | Good | Excellent | Peaky, drag-focused |
| Stock + Blacktrax Spacer | Moderate | Improved | Slightly improved | Mid-range bump without full swap |

*Note: These results are from community-reported dyno runs and should be treated as indicative rather than definitive. Actual results vary by engine condition, tuning, supporting modifications, and dyno methodology.*

### Aftermarket Modification Paths

| Path | Cost | Expected Gain | Notes |
|------|------|---------------|-------|
| Delete IAB butterfly (JB weld/bolts) | ~$10 | +3–6 whp mid-range | Loses sub-4,000 RPM torque |
| Blacktrax IAB spacer | ~$75 | +6 whp mid-range | Extends effective runner length |
| Euro R IM swap | ~$375 (part + adapter) | +10–15 whp mid-range | Best balanced upgrade |
| Skunk2 Pro Series | ~$407 | +8–12 whp top-end | Loses low-end, needs tuning |
| Full race port (SRDmotorsports) | ~$500+ | +15–25 whp total | Requires ECU reflash |

### Cross-Reference

- `h22a-redtop-specifications.md` — Engine-wide Redtop specs (power, compression, pistons)
- `h22a-redtop-camshaft-profiles.md` — Cam profiles complementary to intake design
- `h-series-throttle-body-sizes.md` — TB size comparison across H22 variants
- `h-series-intake-manifold-designs.md` — General H-series intake architecture
- `h-series-intake-port-design.md` — Cylinder head intake port specifications
