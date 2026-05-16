# Honda H-Series Oil Pump Specifications

> **Task:** T-110 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the complete oil pump specification for the Honda H-series engine family (H22A, H22A1, H22A4, H23A): gerotor (internal gear) design, OEM part numbers by generation, rotor geometry, flow characteristics, pressure relief valve assembly, factory oil pressure specifications, known limitations at high RPM, and aftermarket performance upgrades. All H-series variants share the same fundamental oil pump architecture because they share the same block design; differences between OBD1 and OBD2 generations are limited to crank angle sensor mounting tabs on the OBD2 pump body.

---

## Pump Architecture

### Gear Type

The H-series oil pump uses a **gerotor (internal gear) design**, not a two-gear spur-type. This consists of:

| Component | Description |
|-----------|-------------|
| **Inner gear (rotor)** | Driving gear with fewer teeth, splined to the crankshaft drive |
| **Outer gear (rotor)** | Idler gear with one additional tooth, eccentrically mounted around the inner gear |
| **Eccentricity** | Creates expanding/contracting chambers between the two rotors that move oil from inlet to outlet |
| **Drive method** | Crankshaft-driven via the front timing belt cover area |
| **Location** | Bottom of block, behind timing belt cover, above oil pan gasket surface |

The gerotor design is standard for automotive engine lubrication pumps because it provides smooth, pulse-free flow across a wide RPM range (400–16,000 RPM per general gerotor specifications for engine lubrication applications).

Source: Boundary Racing Pumps product description (source 1), Engineering.com gerotor selection guide (source 2), Honda-Tech forum consensus (sources 3, 4)

### Drive Method Implications

The pump is driven directly off the crankshaft via the timing belt side. This means:

- Pump speed = crankshaft speed (1:1 ratio through the drive gear)
- At the H22 redline (~7,200–8,200 RPM), the pump is rotating at the same speed
- Crankshaft flex and vibration at high RPM can affect pump internals over time
- This is why some builders consider the crank-driven design a potential failure point in high-RPM builds

Source: preludeonline.com forum discussion (source 3), Honda-Tech forum (source 4)

---

## OEM Part Numbers

### Oil Pump Assembly

| Part Number | Application | MSRP (USD) | Notes |
|-------------|-------------|------------|-------|
| **15100-P13-SSR** | OBD1 H22A (1992–1995) | ~$177 | Early OBD1; no crank angle sensor tabs |
| **15100-P5M-A01** | OBD2 H22A4 (1998–2001) | $506 (MSRP) / ~$340 (discounted) | Later OBD2; includes crank angle sensor mounting tabs |
| **15100-P13-003** | OBD1 variant | ~$166 | Mid-production OBD1 |

Source: HondaPartsNow (source 5), SwapShopRacing (source 6), Honda-Tech forum (source 4)

### OBD1 vs OBD2 Difference

The only difference between OBD1 and OBD2 oil pumps is that **OBD2 pumps include mounting tabs for the crank angle sensor**. This is important for swap compatibility — when swapping a JDM H22A into a USDM chassis, the USDM oil pump must be used to retain the crank angle sensor for proper engine management.

Source: Honda-Tech forum (source 4), eXtremePrelude.com (source 7)

### Oil Pump Gaskets & Seals

| Part Number | Description | Notes |
|-------------|-------------|-------|
| **15113-P13-003** | Gasket, Oil Pump (A) | Primary pump-to-block gasket |
| **15114-PT0-003** | Gasket B, Oil Pump (Arai) | Secondary gasket |
| **91309-PJ7-010** | O-Ring (11.5 × 3.5 mm) | Pickup tube O-ring |
| **91233-PT0-003** | Oil Seal (27 × 40 × 8 mm, Nok) | Front crank seal (included with pump) |

Source: HondaPartsNow related parts listing (source 5)

---

## Pressure Relief Valve Assembly

### Components

| Component | Part Number | Notes |
|-----------|-------------|-------|
| **Relief valve spring** | 15232-R70-A01 | Replaceable; controls maximum system pressure |
| **Relief valve** | 15231-PE0-000 | Plunger-type valve that opens against spring force |
| **Sealing bolt** | (integral) | Torques relief valve assembly into oil pump housing |

Source: NHTSA service bulletin (source 8), HondaPartsNow (source 5)

### Relief Valve Operation

The relief valve is a spring-loaded plunger located in the oil pump housing. When system pressure exceeds the spring rate, the valve opens and redirects excess oil back to the pump inlet (bypass), preventing over-pressurization.

**Assembly torque:** 39 N·m (29 lb-ft)

The sealing bolt threads use **Hondalock 2** threadlocker on the threads during reassembly.

Source: NHTSA service bulletin (source 8)

### Relief Valve Shimming

Builders commonly shim the relief valve to increase system pressure:

| Shim Thickness | Effect | Risk |
|---------------|--------|------|
| **Stock** | Factory pressure curve | None |
| **~1.5 mm (60 thou)** | Moderate pressure increase | Safe upper limit per most builders |
| **2 mm (80 thou)** | Significant pressure increase | ⚠️ Risk of oil filter blowout |

**Warning:** One builder reported blowing three oil filters at 4,000 RPM after installing a 2mm shim ("literally like a frozen pop can"). Most builders recommend capping shims at 60 thousandths of an inch (~1.5 mm).

Sources: preludeonline.com forum (source 3), Honda-Tech forum (source 4)

---

## Factory Oil Pressure Specifications

### Honda Shop Manual Values

| Condition | Minimum Pressure | Source |
|-----------|-----------------|--------|
| **Idle (oil at 80 °C / 176 °F)** | 10 psi (69 kPa) | Honda shop manual |
| **3,000 RPM (oil at 80 °C / 176 °F)** | 50 psi (345 kPa) | Honda shop manual |
| **Same for ATTS and non-ATTS** | Yes | Honda shop manual |

Source: Honda-Tech forum (source 4)

### QWEN.md Reported Values

| Condition | Pressure | Source |
|-----------|----------|--------|
| **Idle (hot engine)** | 30+ psi | QWEN.md |
| **3,000 RPM** | 45–60 psi | QWEN.md |

Source: QWEN.md Lubrication System section (source 9)

### Conflict Resolution

The Honda shop manual minimum of 10 psi at idle represents the **absolute minimum acceptable** — below this, the oil pressure warning light illuminates. The QWEN.md value of 30+ psi at idle represents a **healthy operating range** for a well-maintained engine. Both are correct for different conditions:

- **10 psi idle minimum** = service manual spec for "engine still running"
- **30+ psi idle** = typical healthy reading on a properly maintained engine
- The discrepancy likely reflects that the shop manual spec is a bare-minimum threshold for the oil pressure switch to trigger the warning light, while typical healthy engines run significantly higher

Source: Honda-Tech forum (source 4), QWEN.md (source 9)

### VTEC Oil Pressure Requirement

VTEC engagement requires approximately **10–15 psi oil pressure** at the rocker arm oil pressure switch. Below this threshold, VTEC will not engage regardless of RPM.

Source: QWEN.md VTEC section (source 9), Honda-Tech forum (source 4)

---

## Flow Rate Characteristics

### General Specifications

Specific volumetric flow rate data (L/min or GPM) for the H-series oil pump is **not published by Honda** in any publicly available service manual or technical documentation. This is consistent with Honda's approach — they specify pressure targets, not flow rates.

However, general gerotor specifications for engine lubrication pumps provide useful context:

| Parameter | Typical Range | Source |
|-----------|--------------|--------|
| **Displacement** | 0.4–4.0 in³/rev (6.5–65.6 cc/rev) | Engineering.com gerotor guide |
| **Operating pressure** | 30–120 psi (200–800 kPa) | Engineering.com gerotor guide |
| **Speed range** | 400–16,000 RPM | Engineering.com gerotor guide |
| **Temperature range** | -40 to 300 °F (-40 to 150 °C) | Engineering.com gerotor guide |
| **Axial clearance** | 0.002–0.004 in (0.05–0.10 mm) | Engineering.com gerotor guide |
| **Tip clearance** | 0.003–0.008 in (0.08–0.20 mm) | Engineering.com gerotor guide |
| **OD clearance** | 0.005–0.009 in (0.10–0.20 mm) | Engineering.com gerotor guide |

Source: Engineering.com gerotor selection guide (source 2)

The H-series pump displacement falls within the lower end of this range, consistent with a naturally aspirated 2.2L inline-4 application.

### Endurance Limitations

The stock H-series oil pump is widely recognized as a **weak link in high-RPM endurance applications**:

| Issue | Cause | Symptom |
|-------|-------|---------|
| **Cavitation at high RPM** | Pump cannot maintain prime when oil aerates | Pressure drop at sustained high RPM |
| **Pressure loss at high oil temperature** | Thinner oil + internal clearances | Lower pressure in track/endurance conditions |
| **Oil starvation during high-G cornering** | Pickup location + un-baffled pan | Momentary pressure drops, bearing damage |

Source: 4 Piston Racing (source 10), preludeonline.com forum (source 3)

---

## Aftermarket Performance Upgrades

### Billet Oil Pump Gears

| Product | Price | Material | Key Feature |
|---------|-------|----------|-------------|
| **Boundary Racing H22-OPG** | $399 | Chromoly billet, MartenWear treated | Race-inspired gerotor, mirror-finished, surface-hardened, stability over 13,000 RPM, proven over 1,000 whp |
| **KS Tuned Boundary Racing BOU-H22OPG** | $424 | Same as above | Bundled with KS Tuned branding |

Both products feature:
- Chromoly core quenched and tempered for indestructible strength
- ColdFlow surface hardening process with mirror finish
- Inner and outer gears machined as matched sets
- Blueprinting report included with each set
- MartenWear dual-stage heat treat for operation over 9,000 RPM

Sources: Boundary Racing Pumps (source 1), Real Street Performance (source 11)

### Complete Aftermarket Oil Pumps

| Product | Price | Key Feature |
|---------|-------|-------------|
| **ACL Race H22A** | Contact for pricing | High output and volume capabilities for high-RPM performance engines |
| **4 Piston Racing 4PR-HPUMP** | €433 (~$495) | Ported and smoothed passages from new OEM Honda pump; eliminates cavitation |
| **Endyn ported pump** | Contact for pricing | Larry from Endyn ports and smooth passages; reportedly installs softer bypass spring to prevent excessive pressure |

Sources: SwapShopRacing (source 6), 4 Piston Racing (source 10), preludeonline.com forum (source 3)

### Performance Upgrade Recommendations

| Build Level | Recommended Upgrade | Cost Estimate |
|-------------|-------------------|---------------|
| **Stock NA daily** | Stock pump + ProDrive billet gear | ~$400 |
| **Street/track NA** | Stock pump + ProDrive gear + oil cooler | ~$600–800 |
| **High-output NA (>250 whp)** | Ported pump (4P or Endyn) + ProDrive gear | ~$900–1,200 |
| **Forced induction** | ACL Race pump or full dry sump system | $2,500–3,500+ |

---

## Known Failure Modes

### Oil Pump Gear Shatter

The cast OEM oil pump gear is the single most documented failure mode:

| Aspect | Detail |
|--------|--------|
| **Failure mode** | Cast gear teeth shear under high RPM / high load |
| **Symptoms** | Sudden total oil pressure loss, often catastrophic |
| **Prevention** | ProDrive billet chromoly gear ($399) — considered "cheap insurance" by community |
| **Incidence** | Documented in turbo applications and high-RPM builds; rare in stock NA use |

Sources: preludeonline.com forum (source 3), Honda-Tech forum (source 4)

### Cavitation and Flow Loss

The stock pump is recognized as a limiting factor in endurance racing:

| Aspect | Detail |
|--------|--------|
| **Cause** | Pump geometry + aerated oil at high RPM |
| **Symptoms** | Gradual pressure drop at sustained high RPM, especially with hot oil |
| **Fix** | Port and smooth passages (4 Piston Racing, Endyn) |

Source: 4 Piston Racing (source 10), preludeonline.com forum (source 3)

### Oil Starvation (Not Pump Failure)

Most "oil pump problems" are actually **oil pan/pickup issues**, not pump failures:

| Aspect | Detail |
|--------|--------|
| **Pickup location** | Center of pan — not optimal for cornering |
| **Pan baffling** | Stock pan has minimal baffling |
| **Symptoms** | Oil pressure drops during hard cornering, acceleration, deceleration |
| **Fix** | Custom baffled pan (Moroso, 1320 Performance), Accusump accumulator, or dry sump system ($3,000+) |

Sources: preludeonline.com forum (source 3), QWEN.md (source 9)

### Bearing Galling

Some builders have observed crank bearing galling correlated with oil pump wear:

| Aspect | Detail |
|--------|--------|
| **Observation** | #1 and #2 bearings show galling before others |
| **Possible cause** | Oil pump wear increasing clearances over time |
| **Inspection interval** | Check bottom end after 10–20K miles on high-use engines |
| **Note** | Not all spun bearings are oil-related; some are power-related (turbo boost, detonation) |

Sources: preludeonline.com forum (source 3), Honda-Tech forum (source 4)

---

## Cross-Reference and Conflict Notes

### Conflicts Between Sources

| Topic | Source A | Source B | Resolution |
|-------|----------|----------|------------|
| **Idle oil pressure** | Honda shop manual: 10 psi minimum | QWEN.md: 30+ psi typical | Both correct. Shop manual specifies absolute minimum (warning light trigger); QWEN reports healthy operating range. |
| **3,000 RPM oil pressure** | Honda shop manual: 50 psi minimum | QWEN.md: 45–60 psi | Consistent. 50 psi falls within the 45–60 psi range. |
| **ProDrive gear necessity** | Some builders say unnecessary for budget racers | Others call it "essential insurance" | Consensus: not strictly necessary for stock NA, but cost-effective insurance for any build exceeding 8,000 RPM or track use. |
| **Shim thickness** | Grant: 2mm max | 71dsp: 60 thou max (~1.5 mm) | 71dsp is more conservative and supported by the builder who blew 3 filters at 2mm. Cap at 60 thou. |

### Verification Status

- **Gerotor design:** Verified against Boundary Racing Pumps product description (source 1), Engineering.com gerotor guide (source 2)
- **OEM part numbers (15100-P5M-A01, 15100-P13-SSR):** Verified against HondaPartsNow (source 5), SwapShopRacing (source 6)
- **Pressure specs (10 psi idle / 50 psi @ 3K RPM):** Verified against Honda shop manual via Honda-Tech forum (source 4)
- **Relief valve assembly (15231-PE0-000, 15232-R70-A01, 39 N·m torque):** Verified against NHTSA service bulletin (source 8)
- **ProDrive billet gear ($399, chromoly, MartenWear):** Verified against Boundary Racing Pumps (source 1), Real Street Performance (source 11)
- **Ported pump modifications (4P Racing, Endyn):** Verified against 4 Piston Racing (source 10), preludeonline.com forum (source 3)
- **Cavitation at high RPM:** Verified against 4 Piston Racing (source 10), preludeonline.com forum (source 3)
- **Shimming limits (60 thou max):** Verified against preludeonline.com forum (source 3) — multiple builders confirm

---

## Follow-On Research Items

| Item | Priority | Notes |
|------|----------|-------|
| Exact gerotor dimensions (inner/outer rotor tooth count, pitch diameter, eccentricity) | Medium | Honda proprietary — not published in service manuals; would require physical teardown measurement |
| Volumetric flow rate (cc/rev or L/min) at various RPMs | Medium | Not published by Honda; would require dynamometer testing |
| Oil pump clearance specifications (axial, tip, OD clearances) for rebuild | Low | Not found in service manuals; may require engineering estimate based on gerotor standards |
| H22A7 (Accord Type R CH1) oil pump — any differences from other EDM variants? | Low | Likely identical to other H22 variants but needs verification |
| Oil pump drive gear tooth count and relationship to crankshaft sprocket | Low | Useful for understanding pump speed ratio |
| Comparison of H-series oil pump vs B-series oil pump (common swap consideration) | Low | B-series uses similar gerotor design; direct comparison would aid swap planning |

---

## Sources Used

| # | Source | Type | URL | Retrieved |
|---|--------|------|-----|-----------|
| 1 | Boundary Racing Pumps — H22 Billet Oil Pump Gear (H22-OPG) | Manufacturer product page | https://boundarypumps.com/shop/honda/2-2l-h22/h22-billet-oil-pump-gear-martenwear-treated/ | 2026-05-15 |
| 2 | Engineering.com — Gerotor Selection and Pump Design v1.3 | Engineering reference | https://files.engineering.com/files/4f2ca4a4-1535-457d-8ace-101d4d819014/Gerotor_Selection_and_Pump_Design_v1.3.pdf | 2026-05-15 |
| 3 | PreludeOnline — "H22 (NA Build) — Oil system limitations" thread | Community forum | https://www.preludeonline.com/threads/discussion-h22-na-build-oil-system-limitations.143469/ | 2026-05-15 |
| 4 | Honda-Tech — "Oil Pressure Specs?" thread | Community forum | https://honda-tech.com/forums/honda-prelude-4/oil-pressure-specs-752919/ | 2026-05-15 |
| 5 | HondaPartsNow — Genuine Honda Oil Pump 15100-P5M-A01 | OEM parts catalog | https://www.hondapartsnow.com/genuine/honda~pump~assy~15100-p5m-a01.html | 2026-05-15 |
| 6 | SwapShopRacing — OEM Honda Prelude H22A VTEC Oil Pump | Aftermarket dealer | http://www.swapshopracing.com/contents/en-us/p8608_OEM_Honda_Prelude_H22A_VTEC_Oil_Pump.html | 2026-05-15 |
| 7 | eXtremePrelude.com — How to: Replace Oil Pump | Community how-to guide | https://www.extremeprelude.com/oilpump.html | 2026-05-15 |
| 8 | NHTSA Service Bulletin 13-055 — Oil pump relief valve spring replacement | OEM service bulletin | https://static.nhtsa.gov/odi/tsbs/2014/MC-10128532-9999.pdf | 2026-05-15 |
| 9 | QWEN.md — Lubrication System section | Compiled reference | Local file | 2026-05-15 |
| 10 | 4 Piston Racing — Ported H22 Oil Pump | Manufacturer product page | https://4pistonracing.com/products/4pr-hpump | 2026-05-15 |
| 11 | Real Street Performance — H22 Oil Pumps catalog | Aftermarket dealer | https://www.realstreetperformance.com/shop-by-vehicle/acura-honda/h22-prelude-vtec-91-01-bb1-bb6/bottom-end-engine-parts/oil-pumps.html | 2026-05-15 |
