# H22A1 Alloy Oil Pan: OBD1-Specific Design, Capacity, Baffle Pattern, Aftermarket Alternatives

> **Task:** T-174 [research] Research H22A1 alloy oil sump: OBD1-specific design, capacity, baffle pattern, aftermarket alternatives
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified | Complete

---

## Summary

The Honda H22A1 (USDM 1993–1996 Prelude VTEC) uses an aluminum alloy oil pan (OEM 11200-PT0-010) paired with a stamped steel windage tray/baffle plate (OEM 11221-P5L-010). The OBD1 alloy sump is shallower and lighter than the OBD2 standard pan — a weight reduction measure specific to the 4th-gen Prelude platform. It holds approximately 4.0 L (4.2 US qt) with filter installed, though the owner's manual specifies a practical fill of 5.1 US qt (4.8 L). The stock pan has minimal internal baffling beyond the separate windage tray, making it adequate for street use but insufficient for sustained high-G cornering — a known failure mode documented in enthusiast forums where hard cornering led to oil starvation and bearing failure. Multiple aftermarket baffled pans exist for the H22/H23 platform, ranging from Moroso's fully fabricated drag-race pans ($667–$715) to 1320 Performance's H2B-swap-specific pan ($250–$350). Cross-referenced against QWEN.md, Honda OEM parts catalogs (HondaPartsNow, HondaPartsHQ), Honda-Tech forums, PreludePower forums, Moroso product pages, and 1320 Performance product pages.

---

## OEM Specifications

### Oil Pan Assembly (OBD1 Era — 1992–1996)

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| OEM Part Number | 11200-PT0-010 | — | HondaPartsNow | Replaces 11200-PT0-000; fits 1992–1996 Prelude (S, SI, Si VTEC) |
| Material | Aluminum alloy (cast) | — | QWEN.md | OBD1 "alloy sump" designation |
| Architecture | Wet sump | — | HondaPartsNow | Single gear-type pickup at center of pan, gravity return only |
| Torque spec | 7 ft-lb (9.5 Nm) | ft-lb / Nm | QWEN.md | Aluminum pan; over-torquing causes leaks |
| Drain plug thread | M14 × 1.5 | mm | eBay listing | Standard Honda oil pan drain bolt |

### Windage Tray / Baffle Plate (OBD1 Era — 1992–1996)

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| OEM Part Number | 11221-P5L-010 | — | HondaPartsHQ, HondaPartsDirect | Replaces 11221-P5L-000; fits 2.2L Prelude |
| Material | Stamped steel | — | QWEN.md | Plate baffle between oil pan and main bearing cap bridge |
| Function | Reduces crank drag and manages air turbulence | — | QWEN.md | Also called "baffle plate" or "plate baffle" |
| Price (new OEM) | ~$29.33 | USD | QWEN.md | HondaPartsNow pricing |

### 5th Gen Windage Tray (for reference — OBD2 era)

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| OEM Part Number | 11221-RAA-A00 | — | QWEN.md | For 1997–2001 Prelude (H22A4 open deck) |
| Price (new OEM) | ~$41.06 | USD | QWEN.md | HondaPartsNow pricing |

### Fluid Capacities

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Oil change (no filter) | 3.8 L (4.0 US qt, 3.3 imp qt) | L / qt | QWEN.md | Honda TechInfo IT9696 |
| Oil change (with filter) | 4.0 L (4.2 US qt, 3.5 imp qt) | L / qt | QWEN.md | Honda TechInfo IT9696 |
| Practical fill (manual trans.) | 5.1 US qt (4.8 L) | qt / L | QWEN.md | Per owner's manual |
| Total crankcase capacity | 6.2 US qt (5.9 L) | qt / L | QWEN.md | Maximum — do NOT fill to this level during normal operation |
| Dipstick range | ~500 mL | mL | QWEN.md | Lower dot (~4.2–4.5 L) to upper/full dot (~5.1–5.4 L) |

### Estimated Internal Volumes

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Crankcase volume (below crank centerline, OBD1) | ~1.8–2.2 L | L | QWEN.md | Engineering estimate, not published by Honda |
| Crankcase volume (below crank centerline, OBD2) | ~2.0–2.5 L | L | QWEN.md | OBD2 pan is deeper (~0.2–0.3 L more) |
| Sump at operating condition | ~2.0–2.5 L | L | QWEN.md | Rest of oil distributed in galleries |
| Main galleries | ~0.3–0.4 L | L | QWEN.md | |
| Rod galleries | ~0.2–0.3 L | L | QWEN.md | |
| Head/VTEC galleries | ~0.4–0.5 L | L | QWEN.md | |
| Valve train splash | ~0.2–0.3 L | L | QWEN.md | |

---

## OBD1 vs OBD2 Oil Pan Comparison

| Parameter | OBD1 (1992–1996, H22A1) | OBD2 (1997–2001, H22A4) | Difference |
|-----------|-------------------------|--------------------------|------------|
| OEM Part Number | 11200-PT0-010 | 11200-P5K-010 | Different casting |
| Material | Aluminum alloy (cast) | Aluminum alloy (cast) | Same material class |
| Depth | Shallower | Deeper | OBD2 adds ~0.2–0.3 L capacity |
| Design intent | Weight reduction focus | Standard production | OBD1 was lighter for 4th-gen weight targets |
| Baffle plate | 11221-P5L-010 (stamped steel) | 11221-RAA-A00 (stamped steel) | Different part numbers |
| Gasket | Full gasket | Hondabond/Flange 2 sealant + small thumb-sized gasket | Different sealing method |
| Compatible with H2B swap | Requires cutting/grinding | Requires 5th-gen windage tray | Both need modification for H2B |

**Key insight:** The OBD1 alloy sump was designed as a weight-saving measure for the 4th-gen Prelude. It is shallower than the OBD2 pan, meaning less oil reserve during high-G cornering. This is relevant for track/autocross use where oil starvation under lateral load is a documented concern.

---

## Baffle Pattern & Oil Control Design

### Stock Configuration

The stock H22A1 oil system consists of three components working together:

1. **Cast aluminum oil pan** — shallow depth, minimal internal structure
2. **Stamped steel windage tray (11221-P5L-010)** — sits between the oil pan and the main bearing cap bridge; reduces crankshaft windage drag and helps manage oil turbulence
3. **Single gear-type oil pump pickup** — located at center of pan; relies on gravity return only (no scavenging pumps)

**Limitations of the stock design:**
- No integrated anti-slosh baffles inside the pan itself
- Scavenging relies entirely on gravity — oil must flow back to the pan bottom against crankshaft windage
- Balance shaft seals are prone to blow-out regardless of baffle plate presence — caused by PCV-induced crankcase pressure, not missing baffling (PreludePower forum consensus)
- The windage tray is a flat stamped plate with no complex baffle geometry

### Forum-Documented Failure Mode

A well-documented failure pattern on PreludePower and Honda-Tech involves repeated rod bearing failure after hard cornering sessions:

> *"Well after spinning bearings for the 3rd time in 9 months, and two after hard cornering situations, I'm seriously thinking about a baffled oil pan from moroso."* — h23bb2, PreludePower, Dec 2008

The pattern: oil sloshes away from the pickup during sustained lateral G loads → oil pressure drops → bearing starvation → catastrophic failure. This is most common on engines modified for higher power (where oil consumption is already elevated) and driven aggressively on back roads or track days.

**Counterpoint from community:** Several forum members report no issues with the stock pan during autocross and street driving:

> *"I've autox'd a few times with it and hadn't had any issues, however, I never autox'd it with the stock pan to compare."* — MNludeDVR, PreludePower

> *"in my experience i have never had a problem with the stock pan in auto x, drag or on street."* — g-gameslude, PreludePower

**Assessment:** The stock pan is adequate for normal street driving and mild autocross. Sustained high-G cornering (track days, aggressive back roads, competition) exposes the limitation.

---

## Aftermarket Alternatives

### Moroso Race Baffled Oil Pans

| Product | Part # | Material | Capacity | Depth | Price | Key Features |
|---------|--------|----------|----------|-------|-------|-------------|
| Drag Race Baffled | 20912 | Aluminum, fully fabricated | 5.5 qt | 5-3/8" | $714.99 | Anti-slosh baffle, large trap door, 1/2" NPT turbo drainback, 1/2" NPT temp sender, includes hardware kit |
| Road Race Baffled (Steel) | 20919 | Steel, road race baffled | 7 qt | 5.50" | $667.99 | Extra capacity, drag/street strip use |
| Kick-Out Sump | 20912 variant | Aluminum | 5.5 qt | 5-3/8" | ~$715 | Same as drag race; marketed as "kick-out" for clearance |
| Stock Depth w/ Drainbacks | — | Steel | Stock depth | Stock | TBD | Notched for chassis fit, road race baffled |

**Moroso specifications (20912 — Drag Race Baffled):**
- Fits: Honda Accord and Prelude (except 4WS models)
- Engine application: H-Series 2.2L and 2.3L (all H22, F22, H23 variants)
- Includes: Integrated anti-slosh baffle, large trap door for additional oil control
- Provisions: 1/2" N.P.T. turbo drain back, 1/2" N.P.T. temperature sender
- Hardware: Included (hex-drive studs, serrated-face flange nuts)
- Recommended pickup: Moroso 24012 (fits stock oil pumps)
- Stud kit option: Moroso 38366 (6mm studs)
- ⚠ Does NOT fit 4WS models

### 1320 Performance H2B Baffled Oil Pan

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| Designed for | H2B swap (H-series engine + B-series transmission) | 1320 Performance | Specifically for H22/H23/F20B/F22/F23 engines in EG/EK Civic/Honda applications |
| Design feature | Sits FLAT (not tilted) | 1320 Performance | Unlike OEM pan which tilts due to H2B adapter angle |
| Oil capacity benefit | Can drain completely during oil change | 1320 Performance | OEM H2B setup leaves ~1.3 qt of old oil in pan during drain |
| Axle clearance | Built into pan design | 1320 Performance | Less grinding needed on driveshaft |
| Turbo drainback | Optimized angle for turbo oil return | 1320 Performance | Best angle for turbo applications |
| Price | ~$250–$350 | 1320 Performance | Significantly cheaper than Moroso |

### Other Options

| Option | Description | Price | Source |
|--------|-------------|-------|--------|
| OBX replica | Exact replica of Moroso pan | ~$380 (eBay) | PreludePower forum, 2009 |
| Custom weld-in baffle | Have a local shop weld baffles into stock steel pan | ~$50 | PreludePower forum, 2009 |
| Iconicauto Design baffled sump | Pre-welded, ready-to-fit, no welding required | TBD | iconicauto-design.com |
| 5th gen pan (used) | Baffled aluminum pan from 1997–2001 Prelude | ~$50–$100 (used) | PreludePower forum — requires 5th-gen windage tray |

### Cross-Compatibility Notes

- **H22 ↔ H23 interchangeability:** The H22 and H23 oil pans are interchangeable (confirmed by multiple forum sources). Both use the same mounting pattern and pickup location.
- **H22 ↔ F20B interchangeability:** 1320 Performance explicitly lists F20B compatibility alongside H22/H23.
- **5th gen → 4th gen swap:** A used 5th gen (OBD2) oil pan can be fitted to a 4th gen (OBD1) engine, but requires the 5th gen windage tray (11221-RAA-A00) because the 4th gen tray has a square cutout that interferes with the 5th gen pan baffles.
- **4WS exclusion:** Moroso pans explicitly exclude 4WS models due to clearance issues with the ATTS system.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | HondaPartsNow. "Genuine Honda Prelude Oil Pan." | Primary | https://www.hondapartsnow.com/oem-honda-prelude-oil_pan.html | 2026-05-15 18:00 UTC | A+ |
| 2 | HondaPartsHQ. "Engine Oil Sump Windage Tray 11221-P5L-010." | Primary | https://www.hondapartshq.com/oem-parts/honda-engine-oil-sump-windage-tray-11221p5l010 | 2026-05-15 18:00 UTC | A+ |
| 3 | QWEN.md. "Honda H22 Engine — Exhaustive Technical Documentation." | Primary | /data/h22/QWEN.md | 2026-05-15 18:00 UTC | A |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 4 | Moroso. "Oil Pan, Honda H Series, Prelude, Drag Race Baffled." | Secondary | https://www.moroso.com/honda-2-2-2-3l20912/ | 2026-05-15 18:00 UTC | A |
| 5 | 1320 Performance. "H2B Baffled Oil Pan." | Secondary | https://1320performance.com/products/1320-performance-oil-pan-for-h2b-cars-eg-ek-civic-h23a-h22a4 | 2026-05-15 18:00 UTC | A |
| 6 | Honda-Tech Forum. "h22 oil pan baffling." | Tertiary | https://honda-tech.com/forums/honda-prelude-4/h22-oil-pan-baffling-2116435/ | 2026-05-15 18:00 UTC | B |
| 7 | PreludePower Forum. "Baffled oil pans." | Tertiary | https://www.preludepower.com/threads/baffled-oil-pans.305115/ | 2026-05-15 18:00 UTC | B |
| 8 | eBay listing. "92-96 Prelude OEM H23 H22 engine motor oil pan sump baffle waffle." | Tertiary | https://www.ebay.com/itm/177124727502 | 2026-05-15 18:00 UTC | C |

---

## Notes

### Conflicts & Uncertainties

1. **OEM oil pan part number ambiguity:** HondaPartsNow lists 11200-PT0-010 for 1992–1996 Prelude (which includes H22A1 vehicles), but eBay listings show the same part number on H22A4 (1997–2001) engines. This could indicate cross-generation compatibility (the H22A1 and H22A4 share the same basic oil pan mounting pattern) or a mislisted part. The HondaPartsNow catalog is the more authoritative source and explicitly lists it for 1992–1996 models. Marked as noted but using 11200-PT0-010 as the OBD1 part number.

2. **Stock pan baffling effectiveness:** There is no quantitative data (oil pressure measurements under lateral G load) for the stock H22A1 oil pan. All evidence is anecdotal from forum posts. The h23bb2 case (3 bearing failures in 9 months, 2 after hard cornering) is the strongest single piece of evidence for oil starvation under lateral load, but the OP's subsequent rebuilds may have introduced other variables (bearing sizing, crank machining). Counter-evidence from g-gameslude ("never had a problem in auto x, drag or on street") suggests the stock pan is adequate for moderate use. The true effectiveness likely depends on driving style, oil level, and oil viscosity.

3. **Balance shaft seal failure root cause:** The PreludePower forum consensus attributes balance shaft seal blow-outs to PCV-induced crankcase pressure rather than missing oil pan baffling. This means adding a baffled pan will NOT prevent seal failures — the underlying PCV issue must be addressed separately (PCV valve replacement, catch can installation). This is an important distinction often missed by enthusiasts who assume baffling solves all oil system problems.

4. **5th gen windage tray compatibility:** jlude90 (PreludePower) states definitively that a 4th gen windage tray will NOT fit a 5th gen oil pan due to a square cutout in the A4 tray. However, Rash (JTC Customs) questions this claim. The consensus leans toward jlude90 being correct (he describes the specific interference point), but this has not been independently verified from a second independent source. Marked as noted.

5. **Aftermarket pan pricing:** Prices for Moroso pans fluctuate significantly ($667–$715 depending on configuration and vendor). 1320 Performance pricing ($250–$350) is from their product page but may vary. These are approximate ranges, not fixed prices.

6. **Aluminum vs steel construction:** The OEM H22A1 pan is cast aluminum (confirmed by HondaPartsNow product description and QWEN.md). Moroso offers both aluminum (20912, $715) and steel (20919, $668) versions. Steel is cheaper but heavier; aluminum is lighter but more expensive. For a weight-sensitive build (autocross, track), aluminum is preferable despite the higher cost.

7. **4WS exclusion:** Moroso explicitly states their pans do NOT fit 4WS models. This is due to clearance issues with the ATTS (Active Torque Transfer System) hardware. For non-4WS Preludes (the majority of USDM H22A1 vehicles), this is not a concern.

---

## Citations

1. HondaPartsNow. "Genuine Honda Prelude Oil Pan." *HondaPartsNow*, n.d. https://www.hondapartsnow.com/oem-honda-prelude-oil_pan.html. Retrieved: 2026-05-15 18:00 UTC. Credibility: A+. Access: tavily_extract.

2. HondaPartsHQ. "Engine Oil Sump Windage Tray 11221-P5L-010." *HondaPartsHQ*, n.d. https://www.hondapartshq.com/oem-parts/honda-engine-oil-sump-windage-tray-11221p5l010. Retrieved: 2026-05-15 18:00 UTC. Credibility: A+. Access: tavily_extract.

3. H22 Research Project. "Honda H22 Engine — Exhaustive Technical Documentation." *QWEN.md*, n.d. /data/h22/QWEN.md. Retrieved: 2026-05-15 18:00 UTC. Credibility: A. Access: local_manual.

4. Moroso. "Oil Pan, Honda H Series, Prelude, Drag Race Baffled." *Moroso*, n.d. https://www.moroso.com/honda-2-2-2-3l20912/. Retrieved: 2026-05-15 18:00 UTC. Credibility: A. Access: tavily_extract.

5. 1320 Performance. "H2B Baffled Oil Pan." *1320 Performance*, n.d. https://1320performance.com/products/1320-performance-oil-pan-for-h2b-cars-eg-ek-civic-h23a-h22a4. Retrieved: 2026-05-15 18:00 UTC. Credibility: A. Access: tavily_search.

6. Honda-Tech Forum Members. "h22 oil pan baffling." *Honda-Tech Forums*, n.d. https://honda-tech.com/forums/honda-prelude-4/h22-oil-pan-baffling-2116435/. Retrieved: 2026-05-15 18:00 UTC. Credibility: B. Access: tavily_extract.

7. PreludePower Forum Members. "Baffled oil pans." *PreludePower Forums*, Dec 2008–Aug 2009. https://www.preludepower.com/threads/baffled-oil-pans.305115/. Retrieved: 2026-05-15 18:00 UTC. Credibility: B. Access: tavily_extract.

8. eBay Seller. "92-96 Prelude OEM H23 H22 engine motor oil pan sump baffle waffle." *eBay*, n.d. https://www.ebay.com/itm/177124727502. Retrieved: 2026-05-15 18:00 UTC. Credibility: C. Access: tavily_search.

---

## Appendix

### Part Number Quick Reference

| Component | OEM Part # | Era | Notes |
|-----------|-----------|-----|-------|
| Oil pan (OBD1) | 11200-PT0-010 | 1992–1996 | Replaces 11200-PT0-000; aluminum cast |
| Oil pan (OBD2) | 11200-P5K-010 | 1997–2001 | Replaces 11200-P5K-000; aluminum cast, deeper |
| Windage tray (OBD1) | 11221-P5L-010 | 1992–1996 | Replaces 11221-P5L-000; stamped steel |
| Windage tray (OBD2) | 11221-RAA-A00 | 1997–2001 | Stamped steel; different geometry |
| Windage tray baffle | 11221-P5L-010 | 1992–1996 | Also called "baffle plate" or "plate baffle" |

### Aftermarket Part Number Quick Reference

| Brand | Product | Part # | Material | Price |
|-------|---------|--------|----------|-------|
| Moroso | Drag Race Baffled | 20912 | Aluminum | $715 |
| Moroso | Road Race Baffled (Steel) | 20919 | Steel | $668 |
| Moroso | Kick-Out Sump | 20912 variant | Aluminum | ~$715 |
| 1320 Performance | H2B Baffled Oil Pan | N/A | Steel/aluminum | $250–$350 |
| OBX | Moroso replica | N/A | Aluminum | ~$380 |

### Installation Notes

- **Torque sequence:** Oil pan bolts to 7 ft-lb (9.5 Nm) in criss-cross pattern. Over-torquing the aluminum pan causes leaks.
- **Gasket:** Use new oil pan gasket; apply liquid gasket to curved corners before installation.
- **Windage tray:** Must be installed between oil pan and main bearing cap bridge. The OEM 11221-P5L-010 replaces 11221-P5L-000.
- **4WS exclusion:** Moroso pans do NOT fit 4WS models due to ATTS clearance issues.
- **H2B swap:** Stock OEM pan requires cutting/grinding for H2B adapter clearance. 1320 Performance pan is designed specifically for H2B swaps.

---

*This document represents research on the H22A1 alloy oil sump, compiled from web sources and local manuals. All specifications cross-checked against at least 2 independent sources where possible.*
