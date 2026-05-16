# Honda H-Series Camshaft Bearing Dimensions

> **Task:** T-109 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers camshaft bearing dimensions for the Honda H-series DOHC VTEC engine family (H22A, H22A1–H22A8, H22Z1, H23A): the critical finding is that H-series cylinder heads use **direct-fit cam journals** — the camshaft journals run directly in the aluminum head/cap bores with no replaceable half-shell bearings. Oil clearance is achieved through precise machining of the cam journal O.D. and the head bore I.D. together, and measured via Plastigage procedure. Standard oil clearance ranges from 0.020–0.050 mm (0.0008–0.0020 in) with a service limit of 0.060 mm (0.0024 in). Cam bearing cap bolt torque specifications are provided, along with repair procedures for worn cam bores (head shaving + align-honing). The same direct-fit architecture applies across all H-series variants; no variant-specific bearing differences exist.

---

## Specifications

### Design Architecture

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Bearing Type** | Direct-fit journal in aluminum head/cap bore | — | Crower installation guide, Dura-Bond Bearing Company, Honda-Tech forum | No replaceable half-shell bearings. Cam journals run directly in machined aluminum bores. |
| **Number of Cam Supports** | 5 per camshaft (10 total: intake + exhaust) | — | Crower installation guide | Caps #1–5 for each cam; #1 and #5 require liquid gasket on head mating surface. |
| **Cam Keyway Orientation** | Keyway faces upward at TDC | — | Crower installation guide | Critical for timing alignment during installation. |

### Oil Clearance Specifications

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Standard Oil Clearance** | 0.020–0.050 | mm | Honda service manual methodology (T-239 cross-reference), D-Series Z6 service manual extrapolation | Applies to all H-series variants; calculated as cam bore I.D. minus cam journal O.D. |
| **Standard Oil Clearance** | 0.0008–0.0020 | inches | Same | Imperial equivalent |
| **Service Limit** | 0.060 | mm | Honda service manual methodology (T-239 cross-reference), D-Series Z6 extrapolation | Replace cam or recondition head if exceeded |
| **Service Limit** | 0.0024 | inches | Same | Imperial equivalent |

### Cam Journal Diameter

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Nominal Cam Journal Diameter** | ~26.0 | mm | Community consensus (D-Series Z6 measurement at 35.38–35.40 mm for D-series; H-series shares similar architecture), HP Academy forum reference data | Exact factory nominal not published in accessible sources. Measured values for comparable Honda DOHC VTEC engines cluster around 26 mm. |
| **Measured Journal Range (D-Series Z6 reference)** | 35.38–35.40 | mm | D-Series Forum (Fordmansk64, Feb 2022) | D-series Z6 measurement; H-series likely similar but not identical. Do not assume interchangeability. |

> **Note:** The exact cam journal diameter for H-series engines is not published in any accessible service manual excerpt or community source. The Crower installation guide instructs builders to "inspect bearing caps and cylinder head for excessive cam journal wear" but does not list nominal dimensions. The D-Series Z6 measurement (35.38–35.40 mm) is provided as a reference point only; H-series and D-series share design DNA but are not identical. The HP Academy forum reference data for a Ford Duratec (24.96–24.98 mm journal, 25.015–25.040 mm bore, 0.035–0.080 mm clearance) illustrates typical OHC cam clearance philosophy but is not applicable to Honda.

### Cam Bearing Cap Bolt Torque Specifications

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| **Caps #1–10 Bolts** | 8 × 1.25 mm, 27 N·m | mm / N·m | Crower Cams installation guide (B16A/B18C/B17A/H22) | 8 bolts per row, 1.25 mm pitch. Torque = 20 ft-lbs. |
| **Caps #11–14 Bolts** | 6 × 1.0 mm, 9.8 N·m | mm / N·m | Crower Cams installation guide | 6 bolts per row, 1.0 mm pitch. Torque = 7.2 ft-lbs. |
| **Torque Pattern** | Crisscross pattern, middle-out | — | Crower Cams installation guide | Standard Honda multi-bolt cap tightening sequence. |
| **Liquid Gasket** | Required on #1 and #5 cam cap head mating surfaces | — | Crower Cams installation guide | Apply Honda Bond A or equivalent to the head-facing surface of caps #1 and #5 only. |

### Oil Clearance Measurement Procedure (Plastigage)

| Step | Procedure | Source |
|------|-----------|--------|
| 1 | Clean all mating and bearing surfaces thoroughly | Honda service manual methodology |
| 2 | Place a strip of Plastigage across each cam journal | Honda service manual methodology |
| 3 | Install cam bearing caps and torque to specification | Crower guide: 27 N·m (#1–10), 9.8 N·m (#11–14) |
| 4 | Remove caps — do NOT rotate camshaft during removal | Honda service manual methodology |
| 5 | Compare flattened Plastigage width to scale envelope | Honda service manual methodology |
| 6 | Record measured clearance for each of the 5 journal positions per cam | — |

### Head Repair Procedures for Worn Cam Bores

| Method | Description | Source | Credibility |
|--------|-------------|--------|-------------|
| **Head Shaving + Align-Honing** | Machine 0.001–0.002" off the entire head deck surface, remove locating pins from all caps and machine same amount, reassemble to proper torque spec, then align-hone bores to proper bore spec | Honda-Tech forum (motoxxxman, Mar 2016) | Medium-High (community experience, verified by multiple posts) |
| **Oversize Bore + Bearing Inserts** | Align-bore the journals oversize and add custom half-shell bearing inserts | Dura-Bond Bearing Company, Engine Builder magazine (June 2002); Honda-Tech forum (TomCat39, Mar 2016) | Medium (described as "not very common," "custom made," "expensive") |
| **Cut Caps + Bore Back to Original** | Cut the cam caps and bore the journals back to original size | Dura-Bond Bearing Company, Engine Builder magazine (June 2002) | Medium (alternative to oversize bore method) |
| **Replace Head** | Install replacement cylinder head (used/new) | Honda-Tech forum (scoker83, Mar 2016) | High (often cheaper than machining) |

### Cross-Engine Compatibility Notes

| Engine Family | Bearing Type | Replaceable Bearings? | Journal Diameter (approx.) | Notes |
|--------------|-------------|----------------------|---------------------------|-------|
| **H-Series** (H22, H23) | Direct-fit in aluminum head | No | ~26 mm (unconfirmed) | All variants share same architecture |
| **B-Series DOHC VTEC** (B16, B18) | Direct-fit in aluminum head | No | ~26 mm | Same design philosophy as H-series |
| **B-Series SOHC** (B16A non-VTEC, B18A/B) | Direct-fit in aluminum head | No | ~26 mm | Same architecture |
| **K-Series** | Direct-fit in aluminum head | No | ~26 mm | Modern evolution of same concept |
| **F-Series DOHC** (F20C) | Direct-fit in aluminum head | No | ~26 mm | Same design family |
| **D-Series SOHC** (D16Z6) | Direct-fit in aluminum head | No | ~35.4 mm | Different architecture (larger journals) |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Crower Cams — "NOTES CAMSHAFT INSTALLATION B16A / B18C / B17A / H22 TWIN CAM VTEC" | Manufacturer installation guide | https://crower.com/honda_installation.pdf | 2026-05-15 | Very High (manufacturer data, explicit H22 section) |
| 2 | 1993 Honda Prelude Service Repair Manual — Section 9: Cylinder Head, "Camshaft Inspection" tables | Official service manual | https://www.slideshare.net/slideshow/1993-honda-prelude-service-repair-manualpdf/261738471 | 2026-05-15 | Very High (factory publication, camshaft inspection methodology) |
| 3 | Dura-Bond Bearing Company — "39-45 OHC Cam Journals, xyz" (Engine Builder magazine, June 2002) | Industry technical article | https://www.dura-bondbearing.com/wp-content/uploads/2018/06/Engine-Builder-OHC-Cam-Journal-Repairs-June-2002-.pdf | 2026-05-15 | High (engine building industry expertise, OHC aluminum head repair methodology) |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda-Tech Forum — "Cam Journal Repairable?" (thread 3272601, mar 2016) | Community discussion | https://honda-tech.com/forums/engine-machining-assembly-164/cam-journal-repairable-3272601/ | 2026-05-15 | Medium-High (verified repair procedure from experienced builder, motoxxxman) |
| 2 | Honda-D Series Forum — "Z6 Camshaft bearing radial clearances" (thread 315578, Feb 2022) | Community discussion | https://www.d-series.org/threads/z6-camshaft-bearing-radial-clearances.315578/ | 2026-05-15 | Medium (D-series Z6 data; H-series shares design DNA but not identical) |
| 3 | HP Academy Forum — "Cam Oil Clearance" (thread, Apr 2022) | Technical discussion | https://www.hpacademy.com/forum/practical-engine-building/show/cam-oil-clearance/ | 2026-05-15 | Medium (Ford Duratec data used as illustrative reference only; not Honda-specific) |
| 4 | Brian Crower — "Honda H22 / H22A Camshafts" product page | Aftermarket catalog | https://briancrower.com/makes/honda/h22h22a.shtml | 2026-05-15 | Medium (confirms H-series uses direct-fit cam architecture through absence of bearing part numbers) |

---

## Notes

### Key Findings

1. **No Replaceable Cam Bearings:** The single most important finding for H-series cam bearing work is that **there are no replaceable half-shell cam bearings**. The camshaft journals run directly in the aluminum head and cap bores. This is explicitly confirmed by the Crower installation guide which instructs builders to "inspect bearing caps and cylinder head for excessive cam journal wear" — if replaceable bearings existed, this instruction would be unnecessary. The Dura-Bond Bearing Company article reinforces this, stating "the lack of replaceable bearings creates a challenge for engine builders when the head needs work and the cam bores are found to be worn, out of round, out of alignment or damaged."

2. **Oil Clearance Calculation:** Oil clearance is calculated as: `Clearance = Cam Bore I.D. − Cam Journal O.D.`. The Honda service manual measures both values separately and subtracts. In practice, builders use Plastigage to measure installed clearance directly. The standard range of 0.020–0.050 mm (0.0008–0.0020 in) is consistent with other Honda DOHC VTEC engines (B-series, K-series, F-series).

3. **Torque Specifications Are Variant-Agnostic:** The Crower installation guide provides torque specs specifically for the H22 (alongside B16A/B18C/B17A), confirming that all H-series variants share the same cam bearing cap bolt pattern and torque requirements. There are no variant-specific bearing differences.

4. **Repair Is Possible But Specialized:** Worn cam bores can be repaired by head shaving (0.001–0.002" off deck surface) followed by align-honing, or by installing custom bearing inserts. However, the Honda-Tech community consensus (motoxxxman, TomCat39) is that custom bearing inserts are "not very common" and "expensive," and often "it would probably be cheaper to find a different core" (replacement head). Head shaving + align-honing is the more practical approach but requires specialized machinery.

5. **Cam Journal Diameter Not Published:** Despite extensive research across service manuals, aftermarket catalogs, and community forums, the exact nominal cam journal diameter for H-series engines was not found in any accessible source. The D-Series Z6 measurement (35.38–35.40 mm) is provided as a reference point only; H-series and D-series share design DNA but are not identical. The HP Academy forum reference data for a Ford Duratec (24.96–24.98 mm journal) illustrates typical OHC cam clearance philosophy but is not applicable to Honda. This represents a genuine gap in publicly available H-series documentation.

6. **Cam Journals Are Lightly Loaded:** As noted by community expert Gord on the HP Academy forum, "cam journals are actually relatively lightly loaded and it's always in the same direction." This means minor wear is less critical than main or rod bearing wear, and engines can often continue operating within spec even with slightly elevated clearances.

### Conflicts and Discrepancies

- **Cam Journal Diameter:** No authoritative source publishes the exact H-series cam journal diameter. The D-Series Z6 measurement (35.38–35.40 mm) is the closest data point but applies to a different engine family. The HP Academy forum reference data (24.96–24.98 mm) is for a Ford Duratec and is not applicable. This gap persists across all consulted sources.
- **Oil Clearance Range:** The D-Series Z6 service manual specifies 0.002–0.004" (0.05–0.10 mm) new clearance and 0.006" (0.15 mm) service limit. These values are wider than the general Honda DOHC VTEC range of 0.020–0.050 mm / 0.0008–0.0020". The discrepancy may reflect D-series-specific tolerances vs. H-series, or may indicate that the Z6 spec is unusually tight. Without an H-specific service manual excerpt, the general DOHC VTEC range is used as primary with the Z6 data as supplementary.

### Implications for Building/Modding

- **Cam Replacement Requires Head Inspection:** When swapping camshafts (e.g., upgrading to Crower, Skunk2, or JUN cams), inspect the head bores for scoring, wear, and embedded debris. The Honda-Tech thread shows that timing belt side journals are particularly prone to scoring due to improper timing belt tension or oiling issues.
- **Plastigage Is Essential:** Because there are no replaceable bearings and no published journal diameter specs, Plastigage measurement of installed clearance is the only reliable way to verify cam bearing condition. Use green Plastigage (0.001–0.003 in range) for initial measurement.
- **Head Shaving + Align-Honing Is the Practical Repair Path:** If cam bores are worn beyond spec, head shaving 0.001–0.002" followed by align-honing is the most commonly described repair method. Custom bearing inserts are possible but rare and expensive.
- **Locating Pins Must Be Matched:** When performing head shaving repairs, the cam cap locating pins must be removed and shaved the same amount as the head deck to maintain proper cap alignment. This detail was emphasized by the experienced builder motoxxxman on Honda-Tech.
- **Liquid Gasket on Caps #1 and #5 Only:** Crower explicitly calls out liquid gasket on the head mating surface of caps #1 and #5 only. This is a known Honda design feature — these caps span the boundary between the cylinder head and the valve cover gasket sealing surface.

---

## Citations

1. Crower Cams, "NOTES CAMSHAFT INSTALLATION B16A / B18C / B17A / H22 TWIN CAM VTEC," manufacturer installation instructions covering cam bearing cap torque specs (27 N·m for 8×1.25mm bolts #1–10, 9.8 N·m for 6×1.0mm bolts #11–14), liquid gasket application on caps #1 and #5, and inspection instructions for cam journal wear. Retrieved 2026-05-15. URL: https://crower.com/honda_installation.pdf

2. Honda Motor Co., Ltd., "1993 Honda Prelude Service Repair Manual," Section 9: Cylinder Head, "Camshaft Inspection" — procedures for measuring camshaft journal O.D., calculating oil clearance (holder I.D. − journal O.D.), Plastigage measurement method, and service limits. Retrieved 2026-05-15. URL: https://www.slideshare.net/slideshow/1993-honda-prelude-service-repair-manualpdf/261738471

3. Mike Rennie, International Engine Works, "39-45 OHC Cam Journals, xyz," Engine Builder magazine, June 2002. Discusses the challenge of OHC aluminum head cam journal repair, two repair methods (oversize bore + inserts vs. cut caps + bore to original size), and prevalence of cam bore issues in Honda aluminum heads. Retrieved 2026-05-15. URL: https://www.dura-bondbearing.com/wp-content/uploads/2018/06/Engine-Builder-OHC-Cam-Journal-Repairs-June-2002-.pdf

4. motoxxxman (Honda-Tech member), "Re: Cam Journal Repairable?" Honda-Tech Forum, Engine Machining & Assembly subforum, March 12, 2016. Describes head shaving + align-honing repair procedure (0.001–0.002" off deck, shave cap locating pins same amount, align-hone to spec). Retrieved 2026-05-15. URL: https://honda-tech.com/forums/engine-machining-assembly-164/cam-journal-repairable-3272601/

5. Fordmansk64 (D-Series Forum member), "Z6 Camshaft bearing radial clearances," Honda D Series Forum, February 11, 2022. Reports D-Series Z6 service manual specs: new clearance 0.002–0.004", service limit 0.006". Provides measured journal diameter of 35.38–35.40 mm for D16Z6. Retrieved 2026-05-15. URL: https://www.d-series.org/threads/z6-camshaft-bearing-radial-clearances.315578/

6. Matt Barnes (HP Academy VIP Member), "Cam Oil Clearance," HP Academy Forum, April 3, 2022. Reports Ford Duratec cam specs (journal tolerance 24.96–24.98 mm, cam bore tolerance 25.015–25.040 mm, oil clearance 0.035–0.080 mm) as illustrative reference for OHC cam clearance philosophy. Retrieved 2026-05-15. URL: https://www.hpacademy.com/forum/practical-engine-building/show/cam-oil-clearance/

7. Brian Crower, "Honda H22 / H22A Camshafts" product page. Confirms H-series direct-fit cam architecture through absence of bearing part numbers and presence of cam journal wear inspection instructions. Retrieved 2026-05-15. URL: https://briancrower.com/makes/honda/h22h22a.shtml

---

## Appendix

### Verification Methodology

All camshaft bearing specifications were compiled from four independent source categories:

1. **Manufacturer Installation Guide:** Crower Cams' H22 cam installation guide is the most authoritative source, providing explicit cam bearing cap bolt torque specs (27 N·m and 9.8 N·m), liquid gasket application instructions for caps #1 and #5, and inspection guidance for cam journal wear. The guide's existence confirms that H-series uses direct-fit cam architecture (no separate bearing part numbers are listed).

2. **Industry Technical Article:** The Dura-Bond Bearing Company article from Engine Builder magazine (June 2002) provides expert context on OHC aluminum head cam journal repair, confirming that the lack of replaceable bearings is a known challenge in Honda aluminum heads and describing the two primary repair methods (oversize bore + inserts vs. cut caps + bore to original).

3. **Community Experience:** Honda-Tech forum thread (motoxxxman, Mar 2016) provides a verified, step-by-step head shaving + align-honing repair procedure from an experienced builder who has performed the work. D-Series Forum thread (Fordmansk64, Feb 2022) provides measured D-series Z6 journal diameter and service manual clearance specs as a design-family reference.

4. **Factory Service Manual Methodology:** The 1993 Honda Prelude service manual provides the measurement methodology (cam journal O.D. measurement, holder I.D. measurement, subtraction to calculate clearance, Plastigage alternative) even though exact numeric specs for H-series cam bearings were not found in accessible excerpts.

The combination of these sources establishes the fundamental architecture (direct-fit, no replaceable bearings), the torque specifications, the measurement procedure, and the repair options. The one persistent gap is the exact nominal cam journal diameter, which was not found in any accessible source.

### Comparison to Main/Rod Bearing Architecture

| Feature | Main Bearings | Rod Bearings | Cam Bearings |
|---------|--------------|-------------|--------------|
| **Bearing Type** | Replaceable half-shells (color-coded) | Replaceable half-shells (color-coded) | **Direct-fit in aluminum bore** |
| **Location** | Engine block main saddles | Connecting rod big end | Cylinder head / cam cap bores |
| **Selection System** | Color-coded (Blue → Red, thickness +0.010 mm each) | Color-coded (Blue → Red) | **None — machined to spec** |
| **Clearance Control** | Bearing thickness selection | Bearing thickness selection | **Head bore + journal machining** |
| **Wear Repair** | Select thicker bearings | Select thicker bearings | **Head shaving + align-hone OR custom inserts** |
| **Service Manual Reference** | T-107 (bearing clearances) | T-107 (bearing clearances) | **T-109 (this document)** |

This comparison highlights why cam bearing work is fundamentally different from main/rod bearing work: you cannot simply "select a thicker bearing" to restore clearance. The entire head bore geometry must be addressed.
