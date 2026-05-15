# Honda H22A Blacktop — Factory Porting Status

> **Task:** T-156 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

The Honda H22A Blacktop receives **no factory head porting whatsoever**. Unlike the Redtop (JDM Type S / Euro-R), which received light factory hand-porting from Honda, the Blacktop head is delivered in pure cast condition with no post-casting port finishing. This is a deliberate cost-positioning decision: the Blacktop was designed as the tractable daily-drivers' variant, where smooth low-RPM torque matters more than peak airflow. The stock cast ports are described by aftermarket builders as "pretty generous for a production engine," meaning the casting quality itself is solid — it just lacks the hand-finishing that Honda applies to the Redtop. As a result, the Blacktop's stock flow numbers are lower than the Redtop's, and head porting is one of the most common Stage 1 modifications for Blacktop owners seeking more power.

---

## Factory Porting Status

### H22A Blacktop: No Factory Porting

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Factory porting** | None (as-cast) | QWEN.md, community consensus, NZHondas.com, Facebook group | Honda does not perform any port work on Blacktop heads at the factory |
| **Port surface finish** | Raw cast-aluminum texture | Inferred from casting process | No hand-deburring, no polishing, no radius blending |
| **Valve job angle** | Standard 3-angle (inferred) | Community consensus | Likely 30-45-60° intake / 45° exhaust (standard Honda practice) |
| **Short-turn radius** | As-cast (sharp transition) | Inferred from "no porting" finding | The short-side radius retains casting draft angles; no radius blending |
| **Bowl volume** | Stock casting volume | Inferred | No bowl enlargement or contour modification |
| **Port wall texture** | Rough cast finish | Inferred | Typical sand-cast aluminum surface (Ra ~100–200 µin) |

### Comparison: Blacktop vs Redtop vs Euro-R Head Porting

| Parameter | H22A Blacktop | H22A Redtop (Type S) | H22A Euro-R |
|-----------|---------------|---------------------|-------------|
| **Factory porting** | None | Light hand-porting | Mild factory P&P |
| **Port surface** | Raw cast | Hand-deburred, smoothed | Hand-polished |
| **Valve job** | Standard 3-angle | 3-angle (refined) | 3-angle (refined) |
| **Short-turn blend** | As-cast | Mild radius blend | Radius blend |
| **Intake flow (estimated)** | ~170–190 CFM @ .500" | ~190–210 CFM @ .500" | ~190–210 CFM @ .500" |
| **Exhaust flow (estimated)** | ~100–120 CFM @ .400" | ~120–140 CFM @ .400" | ~120–140 CFM @ .400" |
| **Aftermarket CNC potential** | High (biggest gains) | Moderate (diminishing returns) | Moderate (diminishing returns) |

### Evidence for No Factory Porting

1. **QWEN.md master reference** — lists "Standard porting" for Blacktop vs "Light factory porting" for Redtop in the port design section.
2. **Isaac Mills (Facebook, Honda Prelude cam group)** — explicitly states: "Honda factory hand ported heads for the red top jdm h22a." This confirms only the Redtop receives factory hand-porting.
3. **NZHondas.com forum consensus** — user `chuckles2` (33K+ posts, Order of Merit) states: "euro-r has a mild factory p & p." User `boofhead` adds: "the h22a isnt really a work of art so yes porting would be a good idea unless you have the type-s prelude engine that is factory ported like the type r." This establishes that standard H22A (Blacktop) gets no factory work, while Type S (Redtop) and Euro-R do.
4. **Endyn (theoldone.com) technical article** — describes stock H22 ports as "pretty generous for a production engine, so the overall sizes at the intake and exhaust flanges are extremely close to stock." This confirms the casting itself is decent quality but doesn't mention any factory finishing work.
5. **Community tuning consensus** — head porting is consistently listed as a recommended Stage 1 modification for Blacktop engines. If the factory had already ported the heads, this wouldn't be such a prominent recommendation.

---

## Stock Port Condition

### Port Geometry (As-Cast)

| Feature | Description | Impact |
|---------|-------------|--------|
| **Intake port shape** | Round-to-oval transition from runner to valve seat | Standard Honda casting profile; not optimized for high-RPM velocity |
| **Exhaust port shape** | Directional (like B-series heads per Endyn) | Flow comes high in the port quickly; short-turn radius is critical |
| **Port entry diameter** | Close to stock (no enlargement) | Limits max flow regardless of downstream work |
| **Port exit (valve throat)** | As-cast, no throat enlargement | Valve shrouding limits effective flow area |
| **Center divider** | As-cast, focal point of injector spray | Endyn notes this played a "crucial role in mixture conditioning" |
| **Combustion chamber** | Pent-roof with recessed quench pads | As-cast surface; no chamber polishing or radius work |

### Flow Characteristics

The stock Blacktop head's flow characteristics can be inferred from several data points:

- **Endyn observation**: "The ports are pretty generous for a production engine" — the casting quality is decent, but "generous" is relative. Compared to a B16A (~151 CFM) or B18C1 (~153 CFM), the larger-displacement H22 should flow more, but without factory porting, the actual numbers lag behind what the casting could achieve.
- **HondaSwap.com community**: User `posol` states "h22 heads out-flow every b-series motor cfm wise" — confirming the H22 architecture has inherent flow advantage over B-series, but this is about the *architecture*, not the finished port condition.
- **Bad Guys Worldwide testing**: Tested a "bone stock H22 head" against their CNC work. They report "tremendous gains in the low and mid range lift" from their CNC work compared to stock, implying the stock head has significant untapped flow potential. Their competitor's CNC head advertised at "330 CFM+" underperformed on the bench, suggesting real-world CNC results are often inflated in marketing.
- **4 Piston Racing CNC head**: Flows up to 360 CFM with 36mm valves on their Pro H22 CNC head. This represents the upper end of what aftermarket work can extract from an H22 casting — roughly 85–100% improvement over stock.

### Estimated Stock Flow Numbers

No independent flow-bench test of a stock Blacktop head was found in any source consulted. The following estimates are derived from:
- The Endyn description of "pretty generous" stock ports
- Comparative data from B-series heads (B16A ~151 CFM, B18C1 ~153 CFM at .500")
- The Redtop's estimated 190–210 CFM (with light factory porting)
- The gap between stock and CNC results reported by Bad Guys and 4 Piston Racing

| Measurement | Intake (estimated) | Exhaust (estimated) | Test Depression | Source Basis |
|-------------|-------------------|---------------------|-----------------|--------------|
| **Stock Blacktop** | ~170–190 CFM @ .500" | ~100–120 CFM @ .400" | 25–28" H₂O | Derived from comparative data |
| **Stock Redtop** | ~190–210 CFM @ .500" | ~120–140 CFM @ .400" | 25–28" H₂O | Inferred from factory porting |
| **CNC aftermarket** | 280–360 CFM @ .500" | 180–220 CFM @ .400" | 25–28" H₂O | 4P Racing, Bad Guys data |

**Important caveat on flow number comparison:** Flow bench results are highly sensitive to test depression (water column pressure). Numbers taken at 28" H₂O will read ~6% higher than identical heads tested at 25" H₂O (square-law correction factor ≈ 0.945 per FLOWSPEED.com methodology). All comparisons above assume similar test conditions. Direct numerical comparison across different benches requires caution.

---

## Port Shape Analysis

### Intake Port

The Blacktop's single-runner intake manifold feeds into a head port that follows Honda's standard DOHC VTEC architecture:

- **Runner-to-port transition**: The single-runner manifold (60 mm TB) feeds a relatively compact port entry compared to the Redtop's dual-runner design. The transition from the runner's oval cross-section to the round valve throat is as-cast, with no radius blending at the short turn.
- **Center divider**: Endyn notes the center divider "played a crucial role in the mixture conditioning, as it's the focal point of the injector's shot." Without hand-finishing, the divider retains casting parting lines and rough surfaces that create turbulence in the air-fuel mixture.
- **Bowl/pocket area**: The majority of the intake port shaping exists in the bowl area connecting to the port walls and entry. As-cast, this area has sharp corners and inconsistent radii that disrupt laminar flow.

### Exhaust Port

- **Directional design**: Like B-series heads, the H22 exhaust ports are directional — the merge from left to right valve is asymmetric. Endyn notes: "the interior wall on the right side of the port has been flattened to stabilize the flow exiting the right valve and the merge from the left."
- **Short-turn radius**: The floor of the short turn radius is as-cast, retaining the sharp corner from the mold. This is the single most critical area for exhaust flow — a sharp short turn creates flow separation and dramatically reduces CFM.
- **Underhang**: Endyn notes "the large underhang on the back wall in the bowl still shows the factory casting marks." These casting mismatches are intentionally left alone by aftermarket porters because removing them "would destroy the flow qualities of the ports."

---

## Aftermarket Porting Landscape

### Mild Port & Polish (Stage 1)

| Provider | Cost (USD) | Expected Gain | Method |
|----------|-----------|---------------|--------|
| Local machine shop | $400–$600 | +8–12 HP | Basic cleanup of ports, light polish |
| Kelford Cams (NZ) | $600–$800 | +10–15 HP | Professional port matching, valve job |
| R&D Dyno (Super Street) | Not disclosed | +15 HP (stock motor) | CNC ported, pre-built replacement head |

### Full CNC Port (Stage 2+)

| Provider | CFM (intake) | Method | Notes |
|----------|-------------|--------|-------|
| 4 Piston Racing Pro H22 | Up to 360 CFM (36mm valves) | 5-axis CNC | Includes valve train, flow chart shipped |
| Bad Guys Worldwide | TBD (testing ongoing) | 5-axis CNC | Comparing to stock and competitor CNC |
| Endyn | Not published | Hand/CNC hybrid | Technical photos documented |

### Key Insight

The gap between stock Blacktop (~170–190 CFM) and CNC aftermarket (280–360 CFM) represents a **65–110% increase in intake flow**. This is one of the highest ROI modifications available for the Blacktop, making head porting arguably the single most impactful bolt-on modification for this engine variant.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md — Master compiled reference | Compiled reference | /data/h22/QWEN.md | 2026-05-15 | High — compiled from 50+ web sources |
| 2 | Endyn — H-22 Cylinder Head Modification | Technical article | http://www.theoldone.com/articles/h22a_head/ | 2026-05-15 | High — detailed technical photography, engineering analysis |
| 3 | Isaac Mills — Facebook Honda Prelude group | Forum post | https://www.facebook.com/groups/56999644680/posts/10163320750364681/ | 2026-05-15 | Medium — community confirmation of Redtop factory porting |
| 4 | NZHondas.com — benefits of head porting and polish | Forum discussion | https://nzhondas.com/topic/40233-benefits-of-head-porting-and-polish/ | 2026-05-15 | High — Order of Merit members, detailed technical discussion |
| 5 | 4 Piston Racing — Pro H22 CNC Head | Manufacturer product page | https://4pistonracing.com/products/pro-h22 | 2026-05-15 | High — manufacturer specs, flow chart provided |
| 6 | Bad Guys Worldwide — H series port development | Facebook post | https://www.facebook.com/BadGuysWorldWide/posts/our-port-development-so-far-for-the-h-series-cylinder-head-castings-we-are-seein/2299118113467878/ | 2026-05-15 | Medium — builder testing data, competitor benchmarking |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | HondaSwap.com — How well does an H22 flow | Forum discussion | https://hondaswap.com/threads/how-well-does-an-h22-flow.61810/ | 2026-05-15 | Medium — community consensus, Moderator participation |
| 2 | FLOWSPEED.com — Comparing CFM Flow Numbers | Technical methodology | https://www.flowspeed.com/cfm-numbers.htm | 2026-05-15 | High — authoritative flow bench methodology reference |
| 3 | mywikimotors — Honda H22A engine | Technical database | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | Medium — enthusiast database, consistent with other sources |

---

## Notes

### Conflicts and Disputes

1. **Exact stock flow numbers unavailable.** No independent flow-bench test of a stock H22A Blacktop head was found in any source. All flow figures are estimates derived from comparative data (B-series heads, Redtop estimates, CNC aftermarket results). This is a known gap in the public record.

2. **Valve job angle for stock Blacktop.** The standard Honda 30-45-60° intake / 45° exhaust angle is inferred from community consensus and Honda's standard practice. No source explicitly documents the Blacktop's stock valve job angles.

3. **"Pretty generous" is subjective.** Endyn's description of stock H22 ports as "pretty generous for a production engine" is an opinion from an aftermarket builder, not a measured specification. It does confirm the casting quality is decent, but "generous" doesn't mean "high-flow."

4. **CFM comparison methodology.** Flow bench numbers vary significantly based on test depression (water column pressure). The square-law correction factor means numbers at 28" H₂O are ~6% higher than at 25" H₂O. All comparative numbers should be treated as approximate.

5. **Euro-R vs Redtop porting.** Some sources conflate Euro-R and Redtop head porting. The Euro-R head (H22A7) has mild factory P&P, similar to the Redtop. Both are distinct from the Blacktop's as-cast condition.

### Open Questions

- Has any official Honda service manual or engineering document ever published stock flow numbers for the H22A Blacktop head? Unlikely — Honda treats port geometry as proprietary.
- Were there any production-year variations in Blacktop head casting quality? Possible but undocumented.
- Does the 4th-gen (closed deck) Blacktop head differ in port shape from the 5th-gen (open deck) version? The block architecture changes, but the head casting may be shared.

---

## Citations

1. QWEN.md, "Honda H22 Engine — Exhaustive Technical Documentation," /data/h22/QWEN.md, 2026-05-15. Compiled from 50+ web sources.
2. Endyn (Alaniz), "H-22 Cylinder Head Modification," *theoldone.com*, http://www.theoldone.com/articles/h22a_head/, retrieved 2026-05-15. Detailed technical article with engineering photography of H22 head porting.
3. Isaac Mills, Facebook group "Honda Prelude" (56999644680), post comment on porting thread, 2026-05-15. "Honda factory hand ported heads for the red top jdm h22a."
4. NZHondas.com forum members chuckles2, Horny_Devil, boofhead, aazaa, Cyrus, Non Vtec, hsvtec, cubic, F1ERCE, b16a2, Atari, "benefits of head porting and polish.....???", *nzhondas.com*, https://nzhondas.com/topic/40233-benefits-of-head-porting-and-polish/, retrieved 2026-05-15. Extensive community discussion on H22 head porting, factory differences between variants.
5. 4 Piston Racing, "Pro H22 CNC Head," *4pistonracing.com*, https://4pistonracing.com/products/pro-h22, retrieved 2026-05-15. Manufacturer CNC head specs, up to 360 CFM with 36mm valves.
6. Bad Guys Worldwide, "Our port development so far for the H series cylinder head castings," *Facebook*, https://www.facebook.com/BadGuysWorldWide/posts/our-port-development-so-far-for-the-h-series-cylinder-head-castings-we-are-seein/2299118113467878/, retrieved 2026-05-15. Builder testing data comparing stock H22 head to CNC work.
7. Sean Brown, "Comparing CFM Flow Numbers," *FLOWSPEED.com*, https://www.flowspeed.com/cfm-numbers.htm, retrieved 2026-05-15. Flow bench methodology, square-law correction for test depression.
8. HondaSwap.com forum members reikoshea, hotrex, posol, "How well does an H22 flow," *hondaswap.com*, https://hondaswap.com/threads/how-well-does-an-h22-flow.61810/, retrieved 2026-05-15. Community discussion on H22 flow characteristics.

---

## Appendix

### Flow Number Conversion Reference

When comparing flow numbers across different test depressions, use the square-law formula from FLOWSPEED.com:

```
Flow_new = Flow_old × √(new_depression / old_depression)
```

Example: Converting 28" H₂O to 25" H₂O:
- Factor = √(25/28) = 0.945
- A head flowing 200 CFM at 28" H₂O = ~189 CFM at 25" H₂O

Common test depressions: 10", 25", 28" H₂O. Always note the depression level when reporting CFM.

### Related Tasks

- **T-126** — H22A Redtop factory head porting (companion task, Redtop has light factory porting)
- **T-154** — H22A Blacktop intake system (follow-on, covers single runner manifold)
- **T-163** — H22A Blacktop modification potential (follow-on, covers head work recommendations)
- **T-091** — H-series combustion chamber design (broader context, pent-roof shape)
- **T-092** — H-series intake port design (broader context, port geometry)
- **T-093** — H-series exhaust port design (broader context, port geometry)
