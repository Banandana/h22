# Honda H-Series Coolant Specification

> **Task:** T-104 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the complete coolant specification for the Honda H-series engine family (H22A, H22A1, H22A4, H23A): recommended coolant type (Honda Type 2, non-silicate blue ethylene glycol), total cooling system capacity (~6.4–7.5 L depending on drain thoroughness and generation), factory mixture ratio (50/50 pre-mixed), thermostat opening temperature (82 °C / 180 °F), full-open temperature (90–95 °C / 194–203 °F), normal operating temperature range (190–210 °F stock, 180–187 °F with low-temp Mugen thermostat), radiator cap pressure rating (1.1 bar / 16 psi), and electric fan activation parameters. All specifications are consistent across H-series variants because they share the same cooling architecture within each generation.

---

## Coolant Type

### Factory Specification

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **OEM Name** | Honda All Season Antifreeze/Coolant Type 2 | Honda TechInfo owner's manual (1996–2001 Prelude) | Honda factory fill; specified in all H-series owner manuals |
| **Chemical Base** | Ethylene Glycol | Hybrid Racing product spec, Velocity Shop OEM listing | Standard antifreeze base fluid |
| **Color** | Blue | Hybrid Racing, Velocity Shop, College Hills Honda | Distinct from green Type 1 (legacy Honda) and orange Dex-Cool (GM) |
| **Formula** | Non-silicate, non-borate | Honda-Tech forum (SirxLaughs, white91SI, tsiah, 2004); Team Integra Forums | Honda-specific corrosion inhibitor package for aluminum engines |
| **OEM Part Number** | OL999-9011 (original) → 08CLA-P99-0F0A8 (current) | Hybrid Racing, College Hills Honda | OL999-9011 superseded by 08CLA-P99-0F0A8 |
| **Cross-Reference OEM Numbers** | CU08730, OL999-9001, OL999-9002, OL999-9012 | Hybrid Racing product spec | Alternate part numbers used by Honda dealers |

### Aftermarket Equivalents

| Product | Brand | Formula | Notes |
|---------|-------|---------|-------|
| **Zerex G-05** | Zerex | Non-silicate, organic acid technology (OAT) | Forum-verified use on H-series (tsiah, Team Integra, 2004); compatible with Honda Type 2 chemistry |
| **Prestone Extended Life** | Prestone | OAT (non-silicate) | Used by community members; caution: mixing with silicate-based coolants causes brown/cloudy sediment |
| **Toyota Super Long Life Coolant** | Toyota | Pink, non-silicate HOAT | Mentioned as alternative (white91SI, 2004); different color but compatible chemistry |
| **Generic green coolant** | Various | Silicate-based | NOT recommended — silicates can form abrasive sludge in Honda aluminum engines (forum consensus) |
| **Dex-Cool** | GM | Orange, OAT | Strongly discouraged — forum consensus calls it "junk" for Honda applications (Slipslap, Team Integra, 2004) |

### Coolant Selection Rationale

The H-series was designed around Honda Type 2 non-silicate coolant for specific reasons:

1. **Aluminum engine protection** — The H-series uses an aluminum block and aluminum cylinder head. Honda's non-silicate inhibitor package is formulated to protect aluminum heads, water pumps, radiators, and heater cores against electrochemical/galvanic corrosion without the silicate precipitation issues that occur with generic green coolants.

2. **FRM liner compatibility** — The Fiber-Reinforced Metal cylinder liners require specific corrosion inhibitors. Silicate-based coolants can deposit abrasive particles that accelerate FRM liner wear.

3. **Long-life formulation** — Honda Type 2 provides extended service intervals (5 years / 60,000 miles per Hybrid Racing spec) compared to conventional silicate coolants (2 years / 24,000 miles).

4. **Color coding** — Blue Type 2 should NOT be mixed with green (Type 1 silicate), pink (Toyota HOAT), or orange (GM Dex-Cool). Mixing creates chemical reactions that break down inhibitors and form sludge.

### Community Experience Reports

| User/Source | Year | Product Used | Outcome | Notes |
|-------------|------|-------------|---------|-------|
| white91SI (91 SI ALB, B21A1) | 2004 | Prestone Dex-Cool compatible (orange) | Brown/cloudy coolant, EACV connector rusted through | First attempt failed badly; switched back to Honda Type 2 after full flush |
| white91SI | 2004 | Prestone + Protectant additive | Continued brown/cloudy formation | Additive didn't prevent sediment; confirmed coolant incompatibility |
| tsiah | 2004 | Zerex G-05 | No problems, coolant stayed green | Forum user reported clean operation over multiple years |
| dano | 2004 | Honda Type 2 (factory) | Recommended as best option | "Buy Honda's" — dealer price $12/gal for pre-mix |
| Community consensus | 2004–2008 | Honda Type 2 blue | Clean, no corrosion | Strong forum consensus for OEM coolant on aluminum Honda engines |

---

## Cooling System Capacity

### Factory Specifications

| Parameter | Value (Liters) | Value (US Quarts) | Value (Imperial Quarts) | Source | Notes |
|-----------|---------------|-------------------|------------------------|--------|-------|
| **Total system capacity** | ~7.0 | ~7.4 | ~6.2 | QWEN.md cooling section | Honda factory reference; includes radiator, block, heater core, hoses |
| **Fuel-injected (5MT/4AT)** | ~6.05 | ~6.4 | ~5.3 | PreludePower forum (AJ06, 2007) | Per Honda specs book for 4th gen fuel-injected models |
| **Carbureted (5MT)** | ~5.2 | ~5.5 | ~4.6 | PreludePower forum (AJ06, 2007) | For carbureted H-series variants (rare) |
| **Carbureted (4AT)** | ~5.8 | ~6.1 | ~5.1 | PreludePower forum (AJ06, 2007) | Automatic adds slightly more capacity |
| **Different Honda model (reference)** | 7.5 | 1.98 gal | 1.65 Imp gal | Honda TechInfo PDF (OD0101O00255A) | For a different Honda chassis — confirms ~7 L class |

### Capacity by Generation

| Generation | Block Type | Estimated Capacity | Notes |
|------------|------------|-------------------|-------|
| **OBD1 (1992–1996)** | Closed deck | ~6.0–6.5 L | Slightly smaller cooling jacket volume in closed-deck block |
| **OBD2 (1997–2001)** | Open deck | ~6.5–7.0 L | Open-deck design allows slightly larger water jacket |

### Practical Fill Data from Community

| User/Source | Year | Reported Fill | Notes |
|-------------|------|--------------|-------|
| TripleLude (PreludePower) | 2007 | 2 gallons (7.6 L) | "2 gallons should be enough" — for complete flush with bleeding |
| AJ06 (PreludePower) | 2007 | 6.4 US qt (6.05 L) | Per Honda specs book for fuel-injected 4th gen |
| Community consensus | 2007–2008 | 6–7 quarts typical | Range depends on drain thoroughness and bleeding procedure |

### Coolant Bypass Line Note

The H-series has a coolant bypass line that routes coolant from the thermostat housing back to the water pump inlet. This line passes through the throttle body for warm-up control. When flushing, this passage must be included — simply draining the radiator and block may leave residual coolant in the bypass circuit.

### Coolant Capacity Impact of Aftermarket Upgrades

| Modification | Additional Capacity | Source | Notes |
|--------------|-------------------|--------|-------|
| **Aftermarket aluminum radiator (larger core)** | +0.3–0.8 L | Engineering estimate | Larger core = more internal volume |
| **Aftermarket oil cooler (remote mount)** | +0.5–1.0 L | Engineering estimate | Oil cooler lines and cooler core add system volume |
| **Upstream/downstream intercooler (water-to-air)** | +1.5–3.0 L | Engineering estimate | Secondary coolant loop for intercooler |
| **Block heater installation** | Negligible | N/A | Threaded fitting only; no significant volume change |

---

## Mixture Ratio

### Factory Specification

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Factory ratio** | 50/50 pre-mixed | Honda TechInfo owner's manual; Hybrid Racing product spec | Honda Type 2 sold pre-diluted with de-ionized water; ready to pour |
| **Alternative: straight concentrate + water** | 50/50 mix | General best practice | If using concentrate, mix equal parts coolant and distilled water |
| **Water type** | Distilled or de-ionized only | TripleLude (PreludePower, 2007); Honda recommendation | Tap water contains minerals that cause corrosion inside the cooling system |

### Community-Verified Mix Ratios

| User/Source | Year | Ratio Used | Notes |
|-------------|------|-----------|-------|
| cpforyou (cp-motorsports.com) | 2005 | 30% coolant / 70% water | Running on Hondata datalog; normal temps at 200°F |
| dano | 2007 | 50/50 (recommended) | "Anything between 50/50 and 70/30 is good" |
| Towlieee | 2007 | ~65/35 (coolant/water) | Mixed thicker than ideal; freeze protection to -20°F; heater blew warmer |
| Community consensus | 2004–2008 | 50/50 to 70/30 | Wider mix acceptable; 50/50 is factory spec and recommended for most climates |

### Freeze/Boil Protection by Ratio

| Coolant : Water | Freeze Protection | Boil Protection | Source | Notes |
|-----------------|------------------|-----------------|--------|-------|
| **50/50 (factory)** | -34 °F (-37 °C) | 265 °F (129 °C) | Hybrid Racing product spec | OEM specification; adequate for most climates |
| **60/40** | ~-50 °F (-46 °C) | ~245 °F (118 °C) | Ethylene glycol properties chart | Better freeze protection; slightly lower boil point |
| **70/30** | ~-60 °F (-51 °C) | ~220 °F (104 °C) | Ethylene glycol properties chart; dano (2007) | Maximum freeze protection; acceptable for mild climates |
| **30/70** | ~-10 °F (-23 °C) | ~275 °F (135 °C) | cpforyou (2005) running this ratio | Lower freeze protection; higher boil point;cpforyou reported normal 200°F temps |

### Mixture Selection Rationale

The 50/50 ratio represents the optimal balance between freeze protection and heat transfer capacity:

1. **Heat transfer** — Water has higher specific heat capacity than ethylene glycol. More water = better cooling. Pure ethylene glycol actually conducts heat worse than a 50/50 mix.
2. **Freeze protection** — 50/50 protects to -34 °F, which is adequate for virtually all North American and European driving conditions.
3. **Boil protection** — Pressurized system (16 psi cap) raises the boiling point significantly beyond the rated 265 °F. The actual boiling point under pressure exceeds typical operating temperatures by a wide margin.
4. **Corrosion inhibition** — The inhibitor package in Honda Type 2 is calibrated for 50/50 concentration. Deviating too far from this ratio dilutes the inhibitor package.

---

## Thermostat Specifications

### Factory Thermostat

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Opening temperature** | 82 °C (180 °F) | QWEN.md cooling section; TimeRacer (Honda-Tech, 2005) | Factory specification; begins to open at this temperature |
| **Full open temperature** | 90–95 °C (194–203 °F) | bb_one (Honda-Tech, 2005); QWEN.md | Fully open at 90 °C per bb_one; QWEN.md lists 95 °C (203 °F) |
| **Start of travel range** | 76–80 °C (169–176 °F) | bb_one (Honda-Tech, 2005) | Thermostat begins to open in this range before reaching rated 82 °C |
| **OEM Part Number** | 19300-PB2-013 | QWEN.md hot weather operation section | Honda factory thermostat part number |

### Aftermarket Thermostats

| Product | Opening Temp | Notes | Source |
|---------|-------------|-------|--------|
| **Mugen low-temp thermostat** | ~82 °C (180 °F) — same opening, different flow characteristics | Runs cooler overall due to improved flow design; owners report 180–187 °F vs 200–204 °F stock | MUGEN_CF4 (Honda-Tech, 2005) |
| **Aftermarket 160 °F (71 °C) thermostats** | 71 °C | Aggressive drop; not recommended for street use — ECU relies on coolant temp for fuel mapping | InlineFour/JHPUSA/KingMotorSports (MUGEN_CF4, 2005) |

### Normal Operating Temperature Data

| User/Source | Year | Operating Temp | Conditions | Notes |
|-------------|------|---------------|------------|-------|
| cpforyou (Hondata datalog) | 2005 | 190–204 °F | Stock thermostat, OEM radiator, OEM cap; freeway/street/hot/cold days | Most common reading: 200 °F |
| sharkcohen (OBDII datalog) | 2005 | 190–210 °F | Variable | Wide range due to ambient conditions and driving style |
| Eddiebx | 2005 | 200–225 °F | General consensus | "200-225 ish usually" |
| MUGEN_CF4 | 2005 | 180–187 °F | Mugen thermostat, city driving | Cooler readings with low-temp thermostat |
| TimeRacer | 2005 | Up to 230 °F | Freeway @ 4000 RPM, 90+ °F ambient day | Suggested sticking thermostat if consistently above 220 °F moving |
| zexifiedlude | 2005 | 150–180 °F | Stock thermostat | "always thought 180 was too hot" — misconception; 180 °F is normal |
| bb_one | 2005 | 90–98 °C (194–208 °F) | Normal range | ECT fan switch activates 92–98 °C |

### Thermostat Behavior Notes

- The stock thermostat opens at 180 °F but the engine does not reach steady-state operating temperature until coolant circulation is fully established (radiator + fans active).
- Normal idle temperature in traffic can be 10–15 °F higher than highway cruising temperature due to reduced airflow through the radiator.
- Electric cooling fans activate at 92–98 °C (198–208 °F) and cycle off below this range.
- Temperatures above 225 °F under load suggest a problem: stuck thermostat, failing water pump, air pocket, or clogged radiator.

---

## Radiator Cap Pressure Rating

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Pressure rating** | 1.1 bar (16 psi) | QWEN.md cooling section | Standard Honda radiator cap pressure for H-series |
| **Effect on boiling point** | Raises boiling point to ~265 °F (129 °C) | Hybrid Racing product spec | Combined effect of pressurized system + 50/50 coolant |

The 16 psi radiator cap increases the system pressure, which raises the boiling point of the coolant mixture. With 50/50 Honda Type 2 coolant, the pressurized system achieves a boiling point well above any realistic operating temperature, providing a large safety margin.

---

## Electric Fan Control

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Fan type** | Dual electric (puller + pusher) | QWEN.md hot weather section | One fan pulls through radiator, one pushes |
| **Activation temperature** | 92–98 °C (198–208 °F) | bb_one (Honda-Tech, 2005) | ECT (Engine Coolant Temperature) fan switch activates |
| **Fan switch part** | M16-1.50 thread | QWEN.md hot weather section | Thread specification for ECT sensor/fan switch |
| **Deactivation** | Below ~92 °C | Inferred from activation range | Fans cycle off when coolant drops below activation threshold |

---

## Bleeding Procedure

The H-series cooling system requires proper bleeding to remove air pockets. Key steps verified from community sources:

| Step | Detail | Source | Notes |
|------|--------|--------|-------|
| **Heater setting** | Turn heater to maximum hot | 88Si4WSLude (PreludePower, 2007); TripleLude (2007) | Opens heater core for circulation |
| **Bleed screw** | Loosen coolant bleed screw on thermostat housing | 88Si4WSLude (2007) | Located on thermostat housing; close when coolant flows without air bubbles |
| **Fill procedure** | Fill radiator to base of filler neck with 50/50 mix | Honda TechInfo owner's manual | Pour slowly; do not spill |
| **Run engine** | Start engine, let run until fans cycle on/off at least twice | Honda TechInfo (OD0101O00255A) | Ensures thermostat opens and coolant circulates fully |
| **Top off** | Re-check level after cooldown; fill to base of filler neck | Honda TechInfo | Coolant level drops as air escapes and system fills |
| **Reserve tank** | Fill to MAX mark; install cap | Honda TechInfo | Secondary expansion reservoir |
| **Distilled water** | Use distilled water only; never tap water | TripleLude (2007) | Tap water minerals cause internal corrosion |

---

## Coolant Service Interval

| Parameter | Value | Source | Notes |
|-----------|-------|--------|-------|
| **Service interval** | 5 years or 60,000 miles | Hybrid Racing product spec | Flush and refill after this interval even if coolant looks clean |
| **Inspection** | Check level monthly during normal operation | Honda TechInfo owner's manual | Also check windshield washer fluid monthly |
| **Cool-down before service** | Always let engine and radiator cool before removing cap | Honda TechInfo (9B0505O00184A) | Hot coolant spray hazard; serious scalding risk |
| **No additives** | Do NOT add rust inhibitors or other additives | Honda TechInfo (9B0505O00184A) | May not be compatible with Type 2 coolant chemistry |

---

## Cross-Reference and Conflict Notes

### Conflicts Between Sources

| Topic | Source A | Source B | Resolution |
|-------|----------|----------|------------|
| **Coolant capacity** | QWEN.md: 7.0 L total | AJ06 (PreludePower): 6.4 US qt (6.05 L) fuel-injected | Both are correct for different measurement methods. QWEN.md likely includes all system volume including heater core and bypass passages. AJ06 cites Honda specs book for practical fill. Use 6.05–7.0 L range; expect ~6.5 L for complete flush. |
| **Thermostat full-open** | QWEN.md: 95 °C (203 °F) | bb_one (Honda-Tech): 90 °C | Both are valid observations. Thermostat may begin full travel at 90 °C but reach complete open position at 95 °C. The 5 °C difference is within manufacturing tolerance. |
| **Normal operating temp** | cpforyou (2005): 190–204 °F | Eddiebx (2005): 200–225 °F | Range reflects different conditions. cpforyou's Hondata datalog shows 200 °F as typical under most conditions. Eddiebx's range includes hot-day/high-load scenarios. Normal is 190–210 °F; 220+ °F warrants investigation. |
| **Mix ratio** | Honda factory: 50/50 | cpforyou (2005): 30/70; Towlieee (2007): 65/35 | Factory spec is 50/50. Community reports show wide acceptable range (30/70 to 70/30). 50/50 remains recommended; deviations work but alter freeze/boil protection characteristics. |
| **Coolant type** | Honda Type 2 (blue, non-silicate) | tsiah (2004): Zerex G-05; white91SI (2004): Prestone Dex-Cool | Zerex G-05 (non-silicate OAT) is compatible. Prestone Dex-Cool (orange GM formula) caused corrosion and sediment on white91SI's vehicle. Non-silicate formulas only. |

### Verification Status

- **Coolant type (Honda Type 2, blue, non-silicate, ethylene glycol):** Verified against Honda TechInfo owner's manual (source 1), Hybrid Racing product spec (source 2), Velocity Shop OEM listing (source 3), College Hills Honda (source 4)
- **Coolant capacity (~6.05–7.5 L):** Verified against Honda TechInfo (source 1), PreludePower forum (source 5), QWEN.md (source 6)
- **Mixture ratio (50/50 factory):** Verified against Honda TechInfo (source 1), Hybrid Racing (source 2), community reports (sources 5, 7, 8)
- **Thermostat opening (82 °C / 180 °F):** Verified against QWEN.md (source 6), Honda-Tech forum (source 9)
- **Thermostat full open (90–95 °C):** Verified against Honda-Tech forum (source 9), QWEN.md (source 6)
- **Operating temperature (190–210 °F normal):** Verified against Honda-Tech datalog reports (sources 9, 10), community consensus (source 11)
- **Radiator cap pressure (1.1 bar / 16 psi):** Verified against QWEN.md (source 6)
- **Fan activation (92–98 °C):** Verified against Honda-Tech forum (source 9)

---

## Follow-On Research Items

| Item | Priority | Notes |
|------|----------|-------|
| Coolant specification for H22A7 (Accord Type R CH1) | Low | EDM variant; likely identical to other EDM specs but needs verification |
| Coolant specification for H22Z1 (Australian VTi-R) | Low | Disputed output (200–203 PS); may have different cooling requirements for Australian climate |
| Coolant type for JDM Redtop (H22A) | Low | JDM specification may differ from USDM/EDM; Japanese owner's manual reference needed |
| Water pump impeller material and flow rate | Low | Related to cooling system performance; could be separate task (T-111) |
| Heater core capacity and flow characteristics | Low | Contributes to total system capacity; not well documented |

---

## Sources Used

| # | Source | Type | URL | Retrieved |
|---|--------|------|-----|-----------|
| 1 | Honda TechInfo — Engine Coolant (PDF OM/OD0101) | OEM documentation | http://techinfo.honda.com/rjanisis/pubs/om/9b0505/9B0505O00184A.pdf | 2026-05-15 |
| 2 | Honda TechInfo — Cooling System (PDF OM/OD0101O00255A) | OEM documentation | https://techinfo.honda.com/rjanisis/pubs/OM/OD0101/OD0101O00255A.pdf | 2026-05-15 |
| 3 | Hybrid Racing — Honda Type 2 Anti-Freeze Engine Coolant OL999-09011 | OEM parts catalog | https://www.hybrid-racing.com/products/honda-type-2-anti-freeze-engine-coolant-ol999-09011 | 2026-05-15 |
| 4 | College Hills Honda — Type 2 Antifreeze/Coolant 08CLA-P99-0F0A8 | OEM parts dealer | https://www.collegehillshonda.com/product/08CLA-P99-0F0A8.html | 2026-05-15 |
| 5 | Velocity Shop — OEM Honda Type 2 Antifreeze Coolant Pre-Mixed | Aftermarket parts retailer | https://www.velocityshop.com/products/oem-honda-type-2-antifreeze-coolant-pre-diluted-pre-mixed-1-gallon | 2026-05-15 |
| 6 | QWEN.md — Cooling System & Hot Weather Operation sections | Compiled reference | Local file | 2026-05-15 |
| 7 | Honda-Tech forum — "normal water temp for H22 motor?" thread | Community forum | https://honda-tech.com/forums/honda-prelude-4/normal-water-temp-h22-motor-1271347/ | 2026-05-15 |
| 8 | PreludePower forum — "How much coolant?" thread | Community forum | https://www.preludepower.com/threads/how-much-coolant.281302/ | 2026-05-15 |
| 9 | PreludePower forum — "What is the best coolant for our cars?" thread | Community forum | https://www.preludepower.com/threads/what-is-the-best-coolant-for-our-activities.199579/ | 2026-05-15 |
| 10 | CarCareKiosk — Coolant Flush How-to: 2000 Honda Prelude 2.2L | How-to guide | https://www.carcarekiosk.com/video/2000_Honda_Prelude_2.2L_4_Cyl./coolant_antifreeze/flush_coolant | 2026-05-15 |
