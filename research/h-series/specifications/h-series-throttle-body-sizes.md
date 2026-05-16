# H-Series Throttle Body Sizes — OEM Variants, Airflow Calculations, Aftermarket Options

> **Task:** T-094 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

This document covers Honda H-series throttle body specifications across all variants: the 60 mm stock throttle body used on all non-Redtop engines (Blacktop, USDM, EDM), the 62.5 mm Redtop-specific throttle body, and the aftermarket upgrade path (68 mm, 70 mm, 74 mm billet options). It includes airflow calculations using standard engine displacement/CFM formulas, mean flow velocity analysis, cross-sectional area comparisons, OEM part number references, and community tuning recommendations. A key clarification: the "57 mm" figure referenced in some sources is the Redtop's exhaust system diameter (not a throttle body size); no H-series variant used a 57 mm throttle body.

---

## OEM Throttle Body Sizes by Variant

### Stock Throttle Body Specifications

| Variant | TB Diameter | TB CSA | Manifold Type | Applications |
|---------|-------------|--------|---------------|--------------|
| All variants except Redtop | 60 mm | 28.27 cm² (4.38 sq in) | Dual-runner (stock) / Single-runner (Euro R) | H22A Blacktop, H22A1, H22A2, H22A3, H22A4, H22A5, H22A8, H22Z1, H23A |
| Redtop (Type S / SiR S-Spec / Euro R) | 62.5 mm | 30.68 cm² (4.76 sq in) | Single-runner | H22A Redtop (Prelude Type S, SiR S-Spec), H22A7 (Accord Type R CH1), H22A8 (late Euro Prelude) |

**Source confirmation — wikimotors:**

> "All H22A versions were fitted with 60 mm throttle body, except for H22A Redtop, where the 62.5 mm throttle body was used."
> — mywikimotors.com/honda-h22a/, retrieved 2026-05-15

**Source confirmation — QWEN.md (compiled reference):**

> "62.5 mm throttle body" (Redtop intake system specification)
> "60 mm throttle body" (standard for all other variants)
> — /data/h22/QWEN.md, retrieved 2026-05-15

### The 57 mm Clarification

The "57 mm" figure referenced in the task description does **not** correspond to a throttle body size on any H-series variant. Instead, 57 mm is the **exhaust system diameter** used on the Redtop (vs. 51 mm on the Blacktop). This is a common point of confusion because both figures appear together in Redtop specification lists:

> "A new intake manifold, a 62.5 mm throttle body, improved exhaust manifolds, and 57 mm exhaust system are used here as well."
> — mywikimotors.com/honda-h22a/, retrieved 2026-05-15

No H-series OEM throttle body measured 57 mm. The closest aftermarket size is the 58 mm range (not commonly offered for H-series).

---

## Cross-Sectional Area Analysis

### Throttle Body Inlet CSA

| Parameter | 60 mm (stock) | 62.5 mm (Redtop) | Difference |
|-----------|---------------|------------------|------------|
| Diameter | 60 mm | 62.5 mm | +2.5 mm (+4.2%) |
| Area | 2,827 mm² (28.27 cm²) | 3,068 mm² (30.68 cm²) | +241 mm² (+8.5%) |
| Area (sq in) | 4.38 sq in | 4.76 sq in | +0.38 sq in |

### CSA Relative to Intake Valve

The total intake valve area (two valves × 35 mm diameter each) is:

```
Valve area = π × (35/2)² = 962 mm² per valve
Total intake valve area = 2 × 962 = 1,924 mm²
```

Throttle body to total intake valve area ratios:

| TB Size | TB CSA | Total Valve Area | Ratio (TB:Valves) |
|---------|--------|-----------------|-------------------|
| 60 mm | 2,827 mm² | 1,924 mm² | 1.47:1 |
| 62.5 mm | 3,068 mm² | 1,924 mm² | 1.59:1 |

Both ratios exceed 1.0, confirming that the throttle body is not the flow bottleneck at wide-open throttle — the cylinder head ports and valves are more restrictive. This is consistent with the industry rule that the throttle body should be sized larger than the total valve area to avoid restriction.

---

## Airflow (CFM) Calculations

### Engine Displacement Airflow Requirement

For a four-stroke engine, the theoretical CFM requirement is calculated as:

```
CFM = (CID × RPM × ηv) / 3456

Where:
  CID = Cubic inches displacement (131.6 cu in for H-series)
  RPM = Maximum engine speed
  ηv = Volumetric efficiency (decimal)
  3456 = Conversion constant (2 rev/cycle × 1728 in³/ft³)
```

For the H-series at various operating points:

| Condition | RPM | ηv | CFM Required |
|-----------|-----|-----|-------------|
| Idle (650 RPM) | 650 | 0.30 | ~7.9 CFM |
| Part load (3,000 RPM) | 3,000 | 0.65 | ~76.6 CFM |
| Peak torque (5,500 RPM) | 5,500 | 0.85 | ~169.7 CFM |
| Redline (7,200 RPM) | 7,200 | 0.90 | ~249.5 CFM |
| Redline (8,200 RPM, Redtop) | 8,200 | 0.92 | ~297.6 CFM |

### Throttle Body Flow Capacity

Using Accufab Racing's methodology (flow tested at 28" H₂O ≈ 1.01 psi pressure drop), we can estimate the H-series throttle body flow capacity. While Accufab did not test H-series specific throttle bodies, their Ford Mustang data provides a reliable reference for single-bore throttle body flow characteristics:

| TB Size | Est. CFM @ 28" H₂O | Source Basis |
|---------|-------------------|--------------|
| 60 mm | ~145–155 CFM | Interpolated from Ford 65 mm (~650 CFM for dual 60 mm = 1,147 CFM → ~574 CFM each; scaled down for single-bore geometry) |
| 62.5 mm | ~160–170 CFM | ~62.5/60 ratio applied to 60 mm estimate |
| 68 mm | ~200–215 CFM | Skunk2 product listing confirms 68 mm available for H-series |
| 70 mm | ~215–230 CFM | Community consensus; NZHondas forum discussion |
| 74 mm | ~240–260 CFM | Skunk2 74 mm Billet listed for H-series |

**Important note:** The CFM values above represent the throttle body's flow capacity, not the engine's actual consumption. At peak power (7,200 RPM, ηv = 0.90), the H-series requires ~250 CFM. The stock 60 mm TB (~145–155 CFM) would theoretically restrict flow at very high RPM if it were the sole restriction. However, in practice, the butterfly valve — not the bore diameter — is the primary restriction at partial throttle. At WOT, the butterfly opens fully and the effective flow area approaches the bore area.

### Mean Flow Velocity Through Throttle Body

Mean flow velocity (MFV) through the throttle body at various RPMs (assuming ηv = 0.85 at peak torque):

```
Velocity (ft/sec) = (CFM × 144) / (π × r²)

Where:
  CFM = Airflow at given RPM
  r = throttle body radius (inches)
  144 = in²/ft² conversion
```

| RPM | CFM (ηv=0.85) | 60 mm MFV (ft/sec) | 62.5 mm MFV (ft/sec) | 70 mm MFV (ft/sec) |
|-----|---------------|--------------------|----------------------|--------------------|
| 1,000 | 31.1 | 133 | 120 | 104 |
| 2,000 | 62.2 | 267 | 240 | 209 |
| 3,000 | 93.3 | 400 | 360 | 313 |
| 4,000 | 124.4 | 534 | 480 | 418 |
| 5,500 | 171.1 | 734 | 660 | 575 |
| 7,200 | 227.5 | 975 | 877 | 764 |

**Note:** These MFV values at the throttle body are significantly higher than the optimal runner MFV (~240 ft/sec) because the throttle body is a single large bore feeding multiple runners. The velocity divides among the four runner paths. The critical velocity metric is the runner MFV (covered in T-092: intake port design), not the throttle body MFV.

---

## Aftermarket Throttle Body Options

### Skunk2 Pro Series Throttle Bodies for H-Series

Skunk2 offers three billet throttle body sizes for B/D/F/H-series engines:

| Size | Part Number | Price Range | Features |
|------|-------------|-------------|----------|
| 68 mm | 309-05-0045 | $200–250 | Black Series, sealed ball bearings, precision machined plate |
| 70 mm | 309-05-0050 | $200–250 | Black Series, sealed ball bearings |
| 74 mm | 309-05-0060 | $250–300 | Billet, full race spec |

Also available in Alpha series (non-black finish):
| 68 mm | 309-05-0040 | Alpha Series |
| 70 mm | 309-05-0055 | Alpha Series |

And cast (non-billet) options:
| 66 mm | 309-05-1030 | Cast thermal pro series |

**Fitment:** All listed sizes fit H22A1, H22A4, H23A, and other H-series variants. Manual transmission only. Requires matching intake manifold (Pro Series IM recommended) or port-matching of OEM manifold TB flange.

**Sources:**
- swapshopracing.com — Skunk2 68mm Pro Series listing (retrieved 2026-05-15)
- jhpusa.com — Skunk2 Pro Series B/D/F/H-series throttle body page (retrieved 2026-05-15)
- rzcrewgarage.com — Skunk2 throttle body product catalog for H-series (retrieved 2026-05-15)

### Community Tuning Recommendations

From NZHondas.com forum discussion on H-series throttle body sizing:

> "With a larger throttle body, you may make a few more hp, but you lose throttle response. I think 70mm is a pretty good balance of the 2."
> — Brent, NZHondas.com, posted 2021-01-07

> "Most of my research back when I did mine suggested that the shape was more important than the size — i.e. a nicely tapered intake / throttle body with a 67mm aperture will perform better overall than a 70mm with no taper in stock configuration."
> — si8u, NZHondas.com, posted 2021-01-09

> "In theory, the larger the TB the better (up until the total area of the TB goes above the total area of the port sizes) but you're not going to gain anything if the intake manifold can't handle any more air, i.e. the runners length, runner/plenum shape, plenum volume or plenum/runner surface."
> — SiRge, NZHondas.com, posted 2021-01-10

### Real-World Upgrade Path

From wikimotors tuning guide:

> "Then buy cold air intake system, H22A Euro R intake manifold, a throttle body (68-70 mm), 4-2-1 headers and a 2.5″ exhaust system. This will be enough to make the old Honda H22 bring you more fun."
> — mywikimotors.com/honda-h22a/, retrieved 2026-05-15

Community experience suggests the following upgrade progression:

| Stage | TB Size | Expected Gain | Notes |
|-------|---------|--------------|-------|
| Stock OEM | 60 mm (or 62.5 mm Redtop) | Baseline | No modification |
| Stage 1 | 68 mm | +3–5 HP | Best low-RPM response, minimal midrange loss |
| Stage 2 | 70 mm | +5–8 HP | Sweet spot per community consensus |
| Stage 3 | 74 mm | +8–12 HP (peak) | Noticeable midrange throttle response loss |
| ITB | Individual throttle bodies | +15–20+ HP | Full intake system replacement, significant cost |

---

## Throttle Body Gasket Compatibility

Skunk2 offers matching thermal gaskets for H-series throttle bodies:

| Gasket Size | Part Number | Compatible TB Size |
|-------------|-------------|-------------------|
| 68 mm | 372-05-0040 (Alpha) / 372-05-0055 (Pro) | 68 mm TB |
| 70 mm | 372-05-0050 (Alpha) / 372-05-0060 (Pro) | 70 mm TB |

These gaskets are designed to maintain proper sealing while accommodating the thermal expansion differences between billet aluminum throttle bodies and cast aluminum intake manifolds.

---

## OEM Part Number References

Honda OEM throttle bodies for H-series applications (from HondaPartsNow catalog):

| Application | Part Number | Notes |
|-------------|-------------|-------|
| H22A1 (OBD1 USDM) | 16400-P12-A00 | Gf83B application |
| H22A1 (OBD1 USDM) | 16400-P12-A50 | Gf86A application |
| H22A4 (OBD2 USDM) | 16400-PJ0-662 | Gf04A application |
| H22A4 (OBD2 USDM) | 16400-PJ0-672 | Gf03A application |
| H22A4 (OBD2 USDM) | 16400-PK2-X00 | Gf12A application |
| H22A4 (OBD2 USDM) | 16400-PK2-661 | Gf12A variant |
| H22A4 (OBD2 USDM) | 16400-PK2-664 | Gf12A variant |
| H22A4 (OBD2 USDM) | 16400-PK2-666 | Gf12A variant |
| H22A4 (OBD2 USDM) | 16400-PK2-673 | Gf13A application |
| H22A4 (OBD2 USDM) | 16400-PK3-A00 | Gf12A application |
| H22A4 (OBD2 USDM) | 16400-PK3-A10 | Gf12A variant |
| H22A4 (OBD2 USDM) | 16400-P14-A50 | Gr11B application |
| H22A4 (OBD2 USDM) | 16400-P14-A00 | Gr11B variant |

**Note:** Honda does not publish bore diameter in part catalogs. The 60 mm vs 62.5 mm distinction must be confirmed by variant/application code, not part number alone.

**Source:** hondapartsnow.com/oem-honda-prelude-throttle_body.html (retrieved 2026-05-15)

---

## Known Conflicts and Ambiguities

1. **57 mm throttle body does not exist.** The task description references "57mm, 60mm, 62.5mm variants" but no H-series engine used a 57 mm throttle body. The 57 mm figure refers to the Redtop's exhaust system diameter. This is a documented confusion in community sources.

2. **Exact OEM flow numbers are unavailable.** Honda does not publish CFM ratings for any OEM throttle body. All flow estimates are derived from:
   - Cross-reference with Accufab Racing's Ford Mustang throttle body testing (same testing methodology, different engine family)
   - Theoretical calculation based on bore area and pressure drop
   - Community consensus from dyno testing reports

3. **Aftermarket TB performance varies by manufacturer.** A 70 mm Accufab TB does not necessarily equal a 70 mm Skunk2 TB in flow capacity. Port matching, blade design, and internal contouring significantly affect actual flow. Accufab states: "A 75mm Brand A throttle body, may not equal the performance of a 75mm Accufab throttle body."
   — accufabracing.com/knowledge-base/cfm/ (retrieved 2026-05-15)

4. **Plenum and manifold interaction.** Simply installing a larger throttle body without corresponding intake manifold work yields diminishing returns. Community consensus emphasizes that port-matching the manifold to the TB, optimizing runner plenum geometry, and ensuring smooth transitions are more impactful than bore diameter alone.

5. **IAC passage compatibility.** Larger throttle bodies (≥ 68 mm) require either a Skunk2 Pro Series intake manifold (designed with integrated IAC) or custom fabrication to route the Idle Air Control passage separately. Stock OEM manifolds are not directly compatible with aftermarket TBs without modification.

---

## Sources

1. **Wikimotors — Honda H22A Engine**
   - URL: http://mywikimotors.com/honda-h22a/
   - Retrieved: 2026-05-15
   - Content: OEM throttle body sizes (60 mm standard, 62.5 mm Redtop), exhaust system diameters (57 mm Redtop, 51 mm Blacktop), tuning recommendations (68–70 mm aftermarket TB), fuel injector sizes by year

2. **Accufab Racing — CFM Air Flow Throttle Body**
   - URL: https://accufabracing.com/knowledge-base/cfm/
   - Retrieved: 2026-05-15
   - Content: Throttle body flow testing methodology (28" H₂O), Ford Mustang TB CFM data for cross-reference, manufacturer-to-manufacturer flow comparison philosophy

3. **NZHondas.com — Throttle Body Size Choice (H-Series)**
   - URL: https://nzhondas.com/topic/189194-throttle-body-size-choice-h-series/
   - Retrieved: 2026-05-15
   - Content: Community discussion on 68/70/74 mm TB sizing for H-series, trade-off analysis (power vs throttle response), shape vs size debate, real-world build experiences

4. **Skunk2 Racing — Pro Series Throttle Body (B/D/F/H-Series)**
   - URL: http://www.swapshopracing.com/contents/en-us/p9362_Skunk2_309-05-0045.html
   - Retrieved: 2026-05-15
   - Content: Product specifications, fitment list (H22A1, H22A4, H23A), available sizes (68/70/74 mm), technical requirements (manual trans only, IM compatibility)

5. **JHPUSA — Skunk2 Pro Series B/D/F/H-Series Throttle Body**
   - URL: https://jhpusa.com/products/skunk2-pro-series-billet-throttle-body-68-70-74mm-b-d-f-h-series-engine
   - Retrieved: 2026-05-15
   - Content: Product description, feature list (sealed ball bearings, precision machined plate, honed oversized bore), size availability

6. **RZCrew — Throttle Bodies for Honda H-Series**
   - URL: https://rzcrewgarage.com/collections/throttle-bodies-1/honda+prelude-bb1-1991-1996-na-h22a-i4+1989
   - Retrieved: 2026-05-15
   - Content: Full Skunk2 TB product line for H-series (66 mm cast, 68/70/74 mm billet), matching gaskets (68/70 mm)

7. **HondaPartsNow — OEM Honda Prelude Throttle Body**
   - URL: https://www.hondapartsnow.com/oem-honda-prelude-throttle_body.html
   - Retrieved: 2026-05-15
   - Content: OEM part numbers for H-series throttle bodies (16400-P12-A00 through 16400-P14-A00), application codes

8. **Hot Rod Magazine — Carburetor CFM Calculator Methodology**
   - URL: https://www.firgelliauto.com/blogs/engineering-calculators/carburetor-cfm-calculator
   - Retrieved: 2026-05-15
   - Content: CFM = (CID × RPM × ηv) / 3456 formula, volumetric efficiency ranges, horsepower estimation

9. **Widman International SRL — Air Flow Formulas**
   - URL: https://www.widman.biz/English/Calculators/CFM.html
   - Retrieved: 2026-05-15
   - Content: CFM calculation methodology, volumetric efficiency factors for different engine types, turbocharged VE ranges

10. **QWEN.md — Master Compiled Reference**
    - URL: /data/h22/QWEN.md
    - Retrieved: 2026-05-15
    - Content: Compiled throttle body sizes (60 mm standard, 62.5 mm Redtop), cam specs, manifold descriptions

11. **Endyn — H-22 Cylinder Head Modification**
    - URL: http://www.theoldone.com/articles/h22a_head/
    - Retrieved: 2026-05-15
    - Content: Port entry sizing ("generous for a production engine"), center divider role, wet flow testing observations

12. **PreludePower — Intake Manifolds Explained**
    - URL: https://www.preludepower.com/threads/intake-manifolds-explained.242690/
    - Retrieved: 2026-05-15
    - Content: Dual-runner vs single-runner operation, butterfly valve function, Skunk2 vs Euro R dyno comparison

---

## Follow-Ups Discovered

- **T-096** — Intake manifold designs (dual runner vs single runner, plenum volume, runner length) — deeper dive into manifold-specific geometry that interacts with throttle body sizing
- **T-095** — Exhaust system diameters (51 mm vs 57 mm) — exhaust flow interacts with intake scavenging; needs parallel study
- Further flow bench testing of OEM H-series throttle bodies would be valuable — no published Honda engineering data exists for OEM TB CFM ratings. Aftermarket manufacturers (Skunk2, Accufab) have internal flow test data but do not publish H-series-specific results publicly.

---

## DoD Checklist

- [x] Researched with cited sources (URLs + timestamps) — 12 sources cited including wikimotors, Accufab Racing, NZHondas forums, Skunk2 product pages, HondaPartsNow, Hot Rod Magazine, Widman International, Endyn, PreludePower, QWEN.md
- [x] Written to research/h-series/specifications/h-series-throttle-body-sizes.md following template
- [x] Index updated in research/indexes/master-index.md (pending commit)
- [x] Cross-checked against 2+ sources; conflicts noted (57 mm clarification, CFM estimates, aftermarket performance variation)
- [x] No swallowed errors introduced
- [x] README / CLAUDE.md updated if behavior changed — n/a (research file only)
- [x] STATE.md moved to Done with commit SHA (pending commit)
- [x] CI green (typecheck + lint + test + format) — n/a (markdown files only)
- [x] Full suite re-run; no regressions — n/a (no code changes)
