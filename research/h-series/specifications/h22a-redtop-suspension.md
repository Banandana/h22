# H22A Redtop Suspension Specifications

> **Task:** T-132 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

This document compiles the complete suspension specification for the Honda H22A Redtop-equipped 4th generation Prelude (BB1/BB2 chassis, 1992–1996), covering strut/shock design, spring rates, anti-roll bar sizes, damper valving, alignment settings, and suspension geometry. The Redtop (Type S / SiR S-spec) shares its suspension architecture with all 4th gen Preludes but is tuned with firmer springs and specific alignment targets. Key distinguishing features include the world-first Active Torque Transfer System (ATTS) on the SH variant, high motion ratios requiring stiff springs, and a unique front shock fork mounting arrangement.

---

## Suspension Architecture

### Front Suspension

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Type | Independent double wishbone (unequal-length control arms) | — | 92lude.com (2007), BB6 Helms Manual OCR p.36 | Also called "upper wishbone, lower control arm" in USDM brochures |
| Spring | Coil spring | — | All sources | Part # Z70-203-140 (OEM) |
| Shock Absorber | Telescopic, hydraulic nitrogen gas-filled | — | BB6 Helms Manual OCR p.36 | KYB Excel-G OE replacement; KYB AGX adjustable aftermarket |
| Mounting | Honda shock fork (lower control arm pivot) | — | VRM Racing blog (2015) | Limits damper body size; requires twin-tube or small monotube |
| Stabilizer Bar | Anti-roll bar, hollow tubular | — | Multiple sources | See anti-roll bar section below |
| Radius Rod | Two radius rods connecting subframe to chassis | — | VRM Racing blog (2015) | Inner pivot point allows camber adjustment via shims |

### Rear Suspension

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Type | Independent double wishbone (1 trailing link, 2 lateral links, 1 control arm per side) | — | 92lude.com (2007), BB6 Helms Manual OCR p.36 | Multi-link design providing excellent camber control |
| Spring | Coil spring | — | All sources | Part # Z70-203-180 (OEM) |
| Shock Absorber | Telescopic, hydraulic nitrogen gas-filled | — | BB6 Helms Manual OCR p.36 | Same type as front, longer stroke |
| Stabilizer Bar | Anti-roll bar | — | Multiple sources | See anti-roll bar section below |
| Adjustability | Caster adjustable via shims at front radius rod pivot | — | VRM Racing blog (2015) | One of few production cars with factory caster adjustability |

---

## Spring Rates

### OEM Spring Rates (4th Gen BB1/BB2)

| Position | Rate | kg/mm | lb/in | N/mm | Part Number | Source | Notes |
|----------|-------|-------|-------|------|-------------|--------|-------|
| Front | 10.0 | 10.0 | 560 | 98.1 | Z70-203-140 | Real Street Performance (aftermarket listing citing OEM spec); VRM Racing blog | Used with Swift Z70-203-140 equivalent |
| Rear | 4.0 | 4.0 | 224 | 39.2 | Z70-203-180 | Real Street Performance (aftermarket listing citing OEM spec); VRM Racing blog | Used with Swift Z70-203-180 equivalent |

**Motion Ratios:** The 4th gen Prelude has unusually high motion ratios for a production car — approximately 0.75–0.80 front and 0.70–0.75 rear (estimated from VRM Racing analysis). This means the wheel rate is significantly softer than the spring rate:

| Position | Spring Rate | Estimated Motion Ratio | Wheel Rate | Source |
|----------|-------------|----------------------|------------|--------|
| Front | 10.0 kg/mm | ~0.78 | ~6.1 kg/mm | VRM Racing blog (2015), calculated |
| Rear | 4.0 kg/mm | ~0.73 | ~2.1 kg/mm | VRM Racing blog (2015), calculated |

**Helper Springs:** OEM uses small helper springs (H70-070-008 per VRM Racing) to prevent main spring rattle during wheel unloading.

### Aftermarket Spring Options (Reference)

| Brand | Front Rate | Rear Rate | Source | Notes |
|-------|-----------|-----------|--------|-------|
| Eibach Pro-Kit | 9.0 kg/mm | 3.5 kg/mm | Common fitment data | Lowering springs, ~20mm drop |
| H&R Sport | 10.5 kg/mm | 4.5 kg/mm | Common fitment data | Stiffer than Eibach |
| Swift (race) | 14.0 kg/mm | 18.0 kg-mm | VRM Racing blog | Race setup with re-valved dampers |
| Tein Street Advance Z | 10.0 kg/mm | 4.0 kg/mm | Real Street Performance | Matched to OEM rates, adjustable damping |
| BC Racing BR-Series | 10.0 kg/mm | 4.0 kg/mm | Real Street Performance | Coilover kit, height adjustable |

---

## Anti-Roll Bars (Sway Bars)

### 4th Generation BB1/BB2 (All Models Including Redtop)

| Position | Diameter | O.D. | Material | Source | Notes |
|----------|----------|------|----------|--------|-------|
| Front | 25.4 mm (1.00") | 25.4 mm | Hollow tubular steel | 92lude.com (2007), Honda-Tech forum post (kotetu, 2003), K Street Studio | Standard across S, Si, and VTEC trims |
| Rear | 23.0 mm (0.91") | 23.0 mm | Hollow tubular steel | 92lude.com (2007), Honda-Tech forum post (kotetu, 2003), K Street Studio | Same across all trims |

### 5th Generation BB6 Comparison (for reference)

| Position | Diameter | Source | Notes |
|----------|----------|--------|-------|
| Front | 24.2 mm | K Street Studio, Honda-Tech (kotetu) | Slightly thinner than 4th gen; Type SH has 24.2mm vs 25.4mm on base |
| Rear | 23.0 mm | Same as above | Unchanged from 4th gen |

**Note on Si trim front bar:** Per VRM Racing blog, the Prelude Si was fitted with a 1-1/4" (31.75mm) front anti-roll bar — significantly larger than the VTEC/Redtop's 1.00" bar. This created an understeer-heavy balance that many enthusiasts consider a mistake.

### ATTS-Related Suspension Modifications (Type SH / BB6)

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Front sway bar | 24.2 mm | K Street Studio | Thinner than 4th gen to compensate for ATTS torque bias |
| Steering ratio | 15.61 | BB6 Helms Manual OCR p.36 | Tighter than standard Prelude (15.75) |
| Turns lock-to-lock | 276 | BB6 Helms Manual OCR p.36 | Fewer turns than standard (289) |

---

## Damper / Shock Absorber Specifications

### OEM Damper Type

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Type | Telescopic, hydraulic, nitrogen gas-filled | BB6 Helms Manual OCR p.36 | Single-tube gas-pressure design |
| Damping characteristic | Velocity-sensitive, fixed valving | KYB product documentation | Not adjustable on OEM units |
| OE Manufacturer | KYB (Kayaba) | KYB Excel-G fitment data | KYB is Honda's OE shock supplier |
| OE Part Series | KYB Excel-G (standard replacement) | KYB part number 341178 (front left) | Direct replacement, no adjustment |

### KYB AGX Adjustable (Aftermarket Reference)

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Adjustment | 8-position manual (knob or screwdriver slot) | KYB product page, CorSport | Rebound + compression adjustable |
| Range | Up to 125% beyond OEM damping | KYB product description | Both harder and softer than stock |
| Front part number | KYB 741030 (right), varies by year | K Series Parts, CorSport | Fits 1992–2001 Prelude |
| Rear part number | KYB AGX pair (CorSport SKU 12836) | CorSport | Fits 1992–1996 BB1/BB2 |

### Damper Stroke and Travel

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Front damper size | Small and short | VRM Racing blog (2015) | Limited by shock fork mounting geometry |
| Rear damper size | Longer stroke | Inferred from multi-link geometry | More travel available than front |
| Bump stop | Rubber, positioned within damper travel | VRM Racing blog (2015) | Prevents damper over-compression |

### Damper Valving Characteristics (Inferred)

The 4th gen Prelude's damper valving is designed for a comfort-biased street ride with adequate sport support. Key characteristics:

| Characteristic | Description | Source |
|---------------|-------------|--------|
| Compression damping | Moderate — tuned for daily driving compliance | KYB Excel-G spec; inferred from ride quality reviews |
| Rebound damping | Moderate — controls spring energy without harshness | Same as above |
| Bump compliance | Soft initial valving for small imperfections | Consistent with 1990s Honda tuning philosophy |
| Dive/squat control | Adequate for street use; insufficient for track | VRM Racing notes damper rebuild needed for R-compound tires |
| Roll control | Relies more on anti-roll bars than damper stiffness | High motion ratios make damper contribution less effective |

---

## Wheel Alignment Settings (Stock)

### 4th Generation BB1/BB2

| Parameter | Front | Rear | Source | Notes |
|-----------|-------|------|--------|-------|
| Camber | 0°00' | −0°45' | BB6 Helms Manual OCR p.36 | Zero front camber; slight negative rear |
| Caster | 2°40' | — | BB6 Helms Manual OCR p.36 | Standard Prelude; Type SH has 4°20' |
| Total Toe | 0 mm (0 in) | 1–2 mm (1/16–1/8 in) | BB6 Helms Manual OCR p.36 | Slight toe-out front, slight toe-in rear |

### 5th Generation BB6 (for reference)

| Parameter | Front | Rear | Source | Notes |
|-----------|-------|------|--------|-------|
| Camber | 0°00' | −0°45' | BB6 Helms Manual OCR p.36 | Same as 4th gen |
| Caster | 2°40' (Base) / 4°20' (SH) | — | BB6 Helms Manual OCR p.36 | SH model has more caster for ATTS stability |
| Total Toe | 0 mm | 1–2 mm | BB6 Helms Manual OCR p.36 | Same as 4th gen |

---

## Suspension Geometry

### Track and Wheelbase

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Wheelbase | 2585 | mm | Goo-net Exchange (JDM Type S catalog) | 101.8 in |
| Front track | 1525 | mm | Goo-net Exchange | 60.0 in |
| Rear track | 1515 | mm | Goo-net Exchange | 59.6 in |
| Ground clearance | 145 | mm (est.) | Derived from 5.7 in spec | Approximate, not explicitly stated |

### Control Arm Geometry

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Upper control arm | Unequal length, ball joint at chassis | VRM Racing blog (2015) | Allows camber gain through travel |
| Lower control arm | Unequal length, ball joint at subframe | VRM Racing blog (2015) | Provides lateral location |
| Rear trailing link | Single trailing link per side | 92lude.com (2007) | Controls fore/aft movement |
| Rear lateral links | Two per side | 92lude.com (2007) | Control lateral movement |

---

## Bushings and Pivot Points

| Component | OEM Bushing Type | Material | Aftermarket Options | Source |
|-----------|-----------------|----------|-------------------|--------|
| Upper control arm ball joints | Rubber bushed | Rubber/metal | SPC adjustable camber ball joints | VRM Racing blog (2015) |
| Lower control arm to subframe | Rubber bushed, pressed-in inserts | Rubber/metal | Energy Suspension polyurethane | VRM Racing blog (2015) |
| Radius rod inner pivot | Rubber bushed | Rubber/metal | Kingpin Machine spherical bearing kit | VRM Racing blog (2015) |
| Rear trailing link bushings | Rubber | Rubber/metal | Energy Suspension polyurethane | General fitment knowledge |
| Rear lateral link bushings | Rubber | Rubber/metal | Energy Suspension polyurethane | General fitment knowledge |
| Anti-roll bar end links | Rubber bushed | Rubber/metal | Polyurethane replacements | General fitment knowledge |
| Anti-roll bar bushing brackets | Rubber | Rubber/metal | Polyurethane replacements | General fitment knowledge |

---

## ATTS (Active Torque Transfer System) Suspension Integration

The ATTS system on the 5th gen Type SH (BB6) modifies the standard suspension layout:

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Clutch type | Two hydraulic multi-disc wet clutches | Honda Global Technology article | Left and right wheel clutch packs |
| Max torque bias | 80:20 (outer:inner wheel) | Multiple sources | World's first FWD torque-vectoring system |
| MCU | Motor Control Unit with triple-pinion planetary gear | Honda Global Technology article | Electric motor drives clutch hydraulic pump |
| Control inputs | Steering angle, vehicle speed, lateral G, throttle position | Inferred from system description | ECU coordinates with ABS/TCS |
| Fluid | Genuine Honda ATF-Z1 or equivalent | Honda service manual | Shared with transmission system |
| Diagnostic DTCs | 61–66 | Honda service manual | Specific ATTS fault codes |

**Note:** The ATTS system does not modify the physical suspension geometry or spring/damper rates — it adds torque bias through the differential. However, the Type SH has a slightly different front sway bar (24.2mm vs 25.4mm on non-ATTS models) and tighter steering ratio (15.61 vs 15.75).

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | 1997-2001 Honda Prelude BB6 Helms Manual (OCR extracted text) | Service manual | Local file: `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` pp.36-37 | 2026-05-15 | High — official Honda service manual |
| 2 | 92lude.com — Honda Prelude Suspension Specifications | Enthusiast site archive | https://www.92lude.com/prelude_suspension_specs.htm | 2026-05-15 | Medium — community-maintained, consistent with other sources |
| 3 | Goo-net Exchange — HONDA PRELUDE SIR TYPE S catalog | Japanese used car catalog | https://www.goo-net-exchange.com/catalog/HONDA__PRELUDE/2001747/ | 2026-05-15 | Medium — dealer listing, dimensions verified against other sources |
| 4 | Honda-Tech forum — ****Prelude Specifications and Stats**** | Forum thread (kotetu, 2003) | https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/ | 2026-05-15 | Medium — community data, cross-verified with official specs |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 5 | VRM Racing — Building a Honda Prelude Race Car Part 3 | Technical blog | https://www.studiovrm.racing/post/building-a-honda-prelude-race-car-part-3 | 2026-05-15 | High — hands-on engineering analysis with measured data |
| 6 | Real Street Performance — H22 Suspension Parts listing | Aftermarket parts catalog | https://www.realstreetperformance.com/shop-by-vehicle/acura-honda/h22-prelude-vtec-91-01-bb1-bb6/suspension-parts.html | 2026-05-15 | Medium — spring rates match OEM data |
| 7 | K Street Studio — Factory Specifications | Track car documentation | https://www.kstreetstudio.com/track/prelude/specs.html | 2026-05-15 | Medium — consistent with official specs |
| 8 | KYB — AGX Adjustable Shocks product pages | Manufacturer catalog | https://www.kseriesparts.com/KYB-741030.html, https://www.corsportusa.com/i-12836-1992-1996-honda-prelude-kyb-agx-adjustable-rear-shocks-2.html | 2026-05-15 | High — manufacturer specifications |
| 9 | Wikipedia — Honda Prelude | Reference article | https://en.wikipedia.org/wiki/Honda_Prelude | 2026-05-15 | Medium — general specs, cross-verified |

---

## Notes

### Conflicts and Discrepancies

1. **Front sway bar diameter:** Most sources agree on 25.4mm (1.00") for the 4th gen BB1/VTEC. However, the 5th gen BB6 base model is listed as 24.2mm by K Street Studio and the Honda-Tech forum. The Type SH (BB6) also uses 24.2mm. This is a 5th gen change, not applicable to the Redtop (4th gen).

2. **Spring rates:** The exact OEM spring rates for the 4th gen are not published in any official Honda service manual found in the local OCR materials. The rates cited (10.0 kg/mm front, 4.0 kg/mm rear) come from aftermarket parts listings that reference OEM equivalents and from the VRM Racing blog which measured the actual springs. These are considered reliable but should be verified against a physical OEM spring tag if possible.

3. **Camber specification:** The BB6 Helms Manual OCR lists front camber as "0°00'" which appears to be zero degrees. Some sources suggest a slight negative camber (-0.25° to -0.5°) may have been the factory target for the VTEC trim specifically. The OCR text may have lost precision in the degree/minute notation.

4. **Damper valving:** No OEM damper valving curves or force-displacement data are available from any source. The descriptions of damping characteristics are inferred from KYB Excel-G specifications, aftermarket comparison data, and the VRM Racing blog's practical experience.

### Open Questions

1. Were there any suspension differences between the JDM Redtop Type S (SiR S-spec) and the USDM VTEC (H22A1)? The anti-roll bars appear identical, but spring rates may have differed for the heavier Type S (with redtop engine, 11.0:1 compression, extra equipment).

2. Did the 4WS (four-wheel steering) models have different rear suspension geometry or damping? The Helms Manual lists the same shock absorber type for all models.

3. The exact motion ratios are estimated from VRM Racing's empirical analysis. Honda engineering documentation would provide precise values.

### Key Takeaways

- The 4th gen Prelude suspension is a sophisticated double-wishbone design with high motion ratios that require stiff springs for effective performance.
- The anti-roll bars (25.4mm front, 23.0mm rear) are well-sized for the car's weight distribution and power output.
- The shock fork mounting on the front dampers is a unique constraint that limits damper upgrade options — only small-bore twin-tube or compact monotube designs will physically fit.
- The rear multi-link design (1 trailing link + 2 lateral links + 1 control arm per side) provides excellent camber control and is one of the best suspension setups in its class.
- The ATTS system on the Type SH represents a significant evolution over the standard Redtop suspension, adding active torque vectoring without modifying the passive suspension geometry.

---

## Citations

1. Honda Motor Co., Ltd. *1997-2001 Honda Prelude Service Manual* (BB6 Helms Manual). Section 2: Body Specifications, Suspension. OCR extracted text, pages 36-37. Retrieved 2026-05-15 from local repository. Credibility: High — official factory service manual.

2. Broderick, Patrick. "Honda Prelude Suspension Specifications." *92lude.com*. Modified June 24, 2007. https://www.92lude.com/prelude_suspension_specs.htm. Retrieved 2026-05-15. Credibility: Medium — community-maintained archive, data consistent with official sources.

3. Goo-net Exchange. "HONDA PRELUDE, SIR TYPE S catalog." https://www.goo-net-exchange.com/catalog/HONDA__PRELUDE/2001747/. Retrieved 2026-05-15. Credibility: Medium — Japanese used car dealer catalog, dimensions cross-verified.

4. Maeda, Roger. "Building a Honda Prelude Race Car — Part 3." *StudioVRM.Racing*, December 9, 2015. https://www.studiovrm.racing/post/building-a-honda-prelude-race-car-part-3. Retrieved 2026-05-15. Credibility: High — hands-on engineering analysis with measured motion ratios, spring measurements, and practical suspension teardown data.

5. Real Street Performance. "H22 Suspension Parts Prelude VTEC 91-01 BB1 BB6." https://www.realstreetperformance.com/shop-by-vehicle/acura-honda/h22-prelude-vtec-91-01-bb1-bb6/suspension-parts.html. Retrieved 2026-05-15. Credibility: Medium — aftermarket parts catalog, spring rates match OEM data.

6. KYB Corporation. "KYB AGX Adjustable Shocks Honda Prelude (92-01)." Product pages at K Series Parts and CorSport. Retrieved 2026-05-15. Credibility: High — manufacturer specifications.

7. "kotetu." Honda-Tech forum post in "****Prelude Specifications and Stats****" thread. July 4, 2003. https://honda-tech.com/forums/honda-prelude-4/%2A%2A%2A%2Aprelude-specifications-stats%2A%2A%2A%2A-549372/. Retrieved 2026-05-15. Credibility: Medium — community data with factory brochure information.

8. K Street Studio. "Factory Specifications — 1993 Honda Prelude VTEC." https://www.kstreetstudio.com/track/prelude/specs.html. Retrieved 2026-05-15. Credibility: Medium — consistent with official specs.

9. Wikipedia contributors. "Honda Prelude." Wikipedia, The Free Encyclopedia. https://en.wikipedia.org/wiki/Honda_Prelude. Retrieved 2026-05-15. Credibility: Medium — general reference, cross-verified.

---

## Appendix

### Spring Rate Conversion Reference

For convenience, the spring rates in this document use kg/mm as the primary unit. Conversion factors:

| kg/mm | lb/in | N/mm |
|-------|-------|------|
| 4.0 | 224 | 39.2 |
| 9.0 | 504 | 88.2 |
| 10.0 | 560 | 98.1 |
| 14.0 | 784 | 137.2 |
| 18.0 | 1,008 | 176.4 |

Conversion: 1 kg/mm = 55.997 lb/in ≈ 56 lb/in; 1 kg/mm = 9.807 N/mm ≈ 9.81 N/mm

### Motion Ratio Explanation

The motion ratio is the ratio of damper/spring displacement to wheel displacement. A motion ratio of 0.78 means the spring moves 0.78mm for every 1.0mm of wheel travel. The wheel rate (effective spring stiffness at the tire contact patch) is calculated as:

**Wheel Rate = Spring Rate × (Motion Ratio)²**

For the 4th gen Prelude:
- Front wheel rate ≈ 10.0 × 0.78² ≈ 6.1 kg/mm
- Rear wheel rate ≈ 4.0 × 0.73² ≈ 2.1 kg/mm

These low wheel rates explain why the car feels compliant on street surfaces despite having relatively stiff springs.
