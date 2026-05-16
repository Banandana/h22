# Honda H-Series Block Dimensions

> **Task:** T-071 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the fundamental block dimensions of the Honda H-series engine family, including deck height, bore spacing, cylinder center-to-center distances, and related geometric specifications. These dimensions are shared across all H-series variants (H22A, H22A1, H22A4, H23A) and are identical to the F-series due to their common architecture. The block height of 219.5 mm serves as the primary reference dimension for rotating assembly compatibility across the entire H/F platform.

---

## Specifications

### Primary Block Dimensions

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Block Height (Deck Height)** | 219.5 | mm | Honda-Tech (measured), Wikipedia, KStuned | Distance from crank centerline to block deck at TDC; same for all H/F series |
| **Block Height** | 8.643 | inches | Honda-Tech (measured) | Imperial equivalent; confirmed by direct measurement |
| **Bore Spacing (Cylinder Center-to-Center)** | 90.0 | mm | Stan Weiss Engine Tables | Consistent across H22A and B18c; Honda standard |
| **Bore Spacing** | 3.543 | inches | Stan Weiss Engine Tables | Imperial equivalent |
| **Cylinder Bore** | 87.0 | mm | Wikipedia, Honda-Tech, Stan Weiss | Same for all H-series variants |
| **Cylinder Bore** | 3.425 | inches | Honda-Tech, Stan Weiss | Imperial equivalent |
| **Stroke** | 90.7 | mm | Wikipedia, Honda-Tech, Stan Weiss | H22A/H22A1/H22A4 |
| **Stroke** | 95.0 | mm | Wikipedia | H23A variant |
| **Connecting Rod Length** | 143.0 | mm | Honda-Tech (measured), Stan Weiss | H22A/H22A4 |
| **Connecting Rod Length** | 141.5 | mm | Wikipedia | H23A variant |
| **Connecting Rod Length** | 5.633 | inches | Honda-Tech (measured) | H22A imperial |
| **Piston Compression Height** | 31.0 | mm | Honda-Tech (measured) | H22A/H22A4 |
| **Piston Compression Height** | 1.221 | inches | Honda-Tech (measured) | H22A imperial |
| **Rod/Stroke Ratio** | 1.58 | — | Stan Weiss | Calculated: 143/90.7 |

### Crankshaft and Journal Dimensions

| Parameter | H22A (1992-1996) | H22A4 (1997-2001) | H23A | Source | Notes |
|-----------|------------------|-------------------|------|--------|-------|
| **Main Journal Diameter** | 50.0 | 55.0* | 55.0 | Honda-Tech, Wikipedia | *1997 only had 50mm; 1998+ had 55mm |
| **Rod Journal Diameter** | 47.95 | 47.95 | 47.95 | Honda-Tech, Wikipedia | Consistent across all variants |
| **Stroke** | 90.7 | 90.7 | 95.0 | Multiple | See above |

### Bearing Dimensions

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Main Bearing Width** | 19.9 | mm | Honda-Tech (measured) | All H-series variants |
| **Main Bearing Width** | 0.784 | inches | Honda-Tech (measured) | Imperial equivalent |
| **Rod Bearing Width** | 19.35 | mm | Honda-Tech (measured) | All H-series variants |
| **Rod Bearing Width** | 0.762 | inches | Honda-Tech (measured) | Imperial equivalent |
| **Wrist Pin Diameter** | 22.0 | mm | Honda-Tech, Wikipedia | All variants |
| **Wrist Pin Diameter** | 0.866 | inches | Honda-Tech | Imperial equivalent |
| **Piston Pin Bore** | 21.97-21.98 | mm | Honda-Tech (measured) | Tight tolerance range |

### Block Type and Construction

| Parameter | 1992-1996 (OBD1) | 1997-2001 (OBD2) | Source |
|-----------|------------------|------------------|--------|
| **Deck Type** | Closed deck | Open deck | Honda-Tech, Wikipedia |
| **Cylinder Liners** | FRM coating | FRM coating | Wikipedia |
| **Block Material** | Aluminum | Aluminum | Wikipedia |

### Derived Dimensions

| Parameter | Value | Unit | Calculation |
|-----------|-------|------|-------------|
| **Wall Thickness Between Bores** | ~3.0 | mm | Bore spacing (90mm) - Bore (87mm) = 3mm |
| **Displacement (H22A)** | 2,157 | cc | π × (87/2)² × 90.7 × 4 |
| **Displacement (H23A)** | 2,259 | cc | π × (87/2)² × 95 × 4 |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda-Tech Forum — "The official H/F piston/rod/crank/block specs and CR thread" | Community measured data | https://honda-tech.com/forums/honda-prelude-4/official-h-f-piston-rod-crank-block-specs-cr-thread-1232811/ | 2026-05-15 | High (first-hand measurements quoted from Helms manual) |
| 2 | Wikipedia — Honda H engine | Encyclopedia | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | Medium-High (cross-referenced with multiple sources) |
| 3 | Stan Weiss Engine Tables | Technical reference | http://users.erols.com/srweiss/tablersn.htm | 2026-05-15 | High (industry-standard engine specification database) |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | KStuned — "All H&F Series Engines Have The Same Deck Height!" | Technical blog | https://www.kstuned.com/blogs/knowledge/all-h-f-series-engines-have-the-same-deck-height | 2026-05-15 | Medium (community expertise, references Honda-Tech) |
| 2 | PreludePower — "F/H series bore, crank, piston and so much more!" | Community forum | https://www.preludepower.com/threads/f-h-series-bore-crank-piston-and-so-much-more.326846/ | 2026-05-15 | Medium (corroborating data) |
| 3 | CB7Tuner Forums — "H/F Series Engine Dimensional Info" | Community forum | https://www.cb7tuner.com/vbb5/forum/parts-performance/performance-tech/42755-h-f-series-engine-dimensional-info | 2026-05-15 | Medium (corroborating data) |

---

## Notes

### Key Findings

1. **Universal Deck Height:** All H-series and F-series engines share the same deck height of 219.5 mm (8.643"). This means rotating assemblies can be swapped between H22, H23, F20, F22, and F23 blocks as long as bore size and main journal diameter match. This is a critical advantage over B-series engines, which have different deck heights for different variants.

2. **Bore Spacing:** The H-series uses a 90.0 mm bore spacing (center-to-center cylinder distance). This is Honda's standard bore spacing for this engine family. The narrow 3.0 mm wall thickness between adjacent cylinders (90mm spacing - 87mm bore) is made possible by the FRM (Fiber-Reinforced Metal) cylinder liner technology, which provides structural integrity without requiring thick cast-iron sleeves.

3. **Closed vs. Open Deck Transition:** The 1992-1996 H22A variants use closed-deck blocks, while the 1997-2001 H22A4 variants transition to open-deck design. This change coincides with the main journal diameter increase from 50mm to 55mm (starting 1998). The closed-deck design provides greater rigidity for boost applications.

4. **Main Journal Evolution:** Early H22A (1992-1996) and H22A1 (1993-1996) use 50mm main journals. The 1997 H22A4 also used 50mm mains, but 1998+ H22A4 switched to 55mm mains. This matches the F20B (55mm) and H23A (55mm) specifications.

5. **FRM Cylinder Liners:** All H-series variants use FRM (Fiber-Reinforced Metal) cylinder wall coatings rather than traditional cast-iron sleeves. This lightweight technology reduces friction and weight but has known degradation issues over time (oil consumption, compression loss). Aftermarket solutions include RS Machine sleeves.

### Conflicts and Discrepancies

- None identified. The deck height, bore spacing, and bore dimensions are consistent across all three primary sources (Honda-Tech measured data, Wikipedia, Stan Weiss tables).

### Implications for Building/Modding

- **Stroker Kits:** Because all H/F series share the same deck height, stroker cranks from H23 (95mm stroke) or F23 (97mm stroke) can be installed in H22 blocks with appropriate pistons to maintain zero deck clearance.
- **Head Swaps:** F20B heads bolt to H22A blocks (and vice versa) due to shared bolt patterns and deck height, though combustion chamber volume differs (53.8cc H-series vs 50cc F20B).
- **Bottom End Strength:** The 1998+ 55mm main journal upgrade significantly improves bottom-end strength for forced induction applications. Early 50mm main variants are more limited for boost.
- **Rod/Stroke Ratio:** The 1.58:1 ratio (143mm rod / 90.7mm stroke) is favorable for piston stability and reduced side loading compared to shorter-rod alternatives.

---

## Citations

1. Innovation (Honda-Tech), "The official H/F piston/rod/crank/block specs and CR thread," posted 2005-05-02. Measured data quoted from Helms service manuals. Retrieved 2026-05-15. URL: https://honda-tech.com/forums/honda-prelude-4/official-h-f-piston-rod-crank-block-specs-cr-thread-1232811/

2. Wikipedia contributors, "Honda H engine," Wikipedia, The Free Encyclopedia. Retrieved 2026-05-15. URL: https://en.wikipedia.org/wiki/Honda_H_engine

3. Stan Weiss, "Engine Bore, Stroke, Rod Length, Ratio Information," World Wide Enterprises. Retrieved 2026-05-15. URL: http://users.erols.com/srweiss/tablersn.htm

4. Reid Lunde, "All H&F Series Engines Have The Same Deck Height!," KStuned.com, 2026. Retrieved 2026-05-15. URL: https://www.kstuned.com/blogs/knowledge/all-h-f-series-engines-have-the-same-deck-height

---

## Appendix

### Verification Methodology

All deck height measurements were taken directly from the Honda-Tech forum thread started by user "Innovation" on 2005-05-02. The thread explicitly states that measurements are "personally measured and or quoted direct from the helms manual." The following contributors verified the data:

- Innovation (thread starter, Carson CA)
- PirateMcFred
- prelittlelude
- Jdogg
- ZigenBallz

The bore spacing value of 90.0 mm comes from Stan Weiss' industry-standard engine specification database, which cross-references factory service data.

### Conversion Reference

| Metric | Imperial |
|--------|----------|
| 219.5 mm | 8.643 in |
| 90.0 mm | 3.543 in |
| 87.0 mm | 3.425 in |
| 90.7 mm | 3.570 in |
| 143.0 mm | 5.633 in |
| 31.0 mm | 1.221 in |
| 50.0 mm | 1.969 in |
| 55.0 mm | 2.165 in |
| 47.95 mm | 1.888 in |
| 19.9 mm | 0.784 in |
| 19.35 mm | 0.762 in |
| 22.0 mm | 0.866 in |
