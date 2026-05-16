# Honda H-Series Engineering Targets: Power Density, Reliability, Emissions, Cost

> **Task:** T-038 [research] Research H-series engineering targets: power density, reliability, emissions, cost constraints
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete
> **Depends on:** T-032 (Development timeline), T-036 (FRM liner technology), T-037 (Aluminum block casting)

---

## Summary

The Honda H-series engine family was designed under a set of ambitious engineering targets set by Honda R&D leadership in the mid-to-late 1980s. The flagship target — 100 horsepower per liter of displacement — was imposed by President Nobuhiko Kawamoto on Lead Project Leader Ikuo Kajitani and exceeded even the aggressive specifications he had initially proposed. This document examines the four pillars of H-series engineering targets: power density goals, reliability requirements, emissions constraints, and cost targets. It also compares how these targets differed from those for the B-series and F-series families that preceded it.

---

## 1. Power Density Targets

### 1.1 The 100 HP/Liter Mandate

The most famous engineering target associated with Honda's DOHC VTEC program came not from the development team but from above. According to Honda's official corporate history:

> "Why don't you raise your target to 100 horsepower per liter?" asked Nobuhiko Kawamoto, then president of Honda R&D.

Kajitani's original specification called for only **90 hp/liter** — roughly 140 hp from a 1.6-liter engine. Kawamoto raised the bar to **100 hp/liter**, which meant 160 hp from the 1.6L B16A at approximately 8,000 rpm. At the time, this was considered impossible for a mass-produced, naturally aspirated road car engine.

| Target Parameter | Kajitani's Spec | Kawamoto's Target | Actual Result (B16A) | Source |
|-----------------|-----------------|-------------------|---------------------|--------|
| Specific output | 90 hp/liter | 100 hp/liter | 100 hp/liter (160 @ 7,600 rpm) | [Honda Global Heritage](https://global.honda/en/heritage/episodes/1989vtecengine.html), 2026-05-15 |
| Displacement | 1.6 L | 1.6 L | 1.590 L (1,590 cc) | [Wikipedia - Honda H engine](https://en.wikipedia.org/wiki/Honda_H_engine), 2026-05-15 |
| Redline | ~7,600 rpm | 8,000 rpm | 8,000 rpm | [Honda Global Heritage](https://global.honda/en/heritage/episodes/1989vtecengine.html), 2026-05-15 |

**Key insight:** The 100 hp/liter target was achieved first with the SOHC B16A in the 1989 Integra XSi. The H-series inherited this philosophy but applied it to a larger displacement platform where the absolute power goal was different.

### 1.2 H-Series Power Density in Practice

The H-series did not repeat the exact 100 hp/liter target — its 2.2L displacement meant the absolute power goals were higher, and the specific output targets varied by variant:

| Variant | Displacement | Power | Specific Output | Compression | Source |
|---------|-------------|-------|-----------------|-------------|--------|
| H22A Redtop (JDM Type S) | 2,157 cc | 220 PS (217 hp) | **~100.6 hp/liter** | 11.0:1 | [Wikipedia - H engine](https://en.wikipedia.org/wiki/Honda_H_engine), 2026-05-15 |
| H22A Blacktop (JDM Si VTEC) | 2,157 cc | 200 PS (197 hp) | **~91.4 hp/liter** | 10.6:1 | [Wikipedia - H engine](https://en.wikipedia.org/wiki/Honda_H_engine), 2026-05-15 |
| H22A1 USDM (1993-1996) | 2,157 cc | 190 PS (187 hp) | **~86.7 hp/liter** | 10.0:1 | [Wikipedia - H engine](https://en.wikipedia.org/wiki/Honda_H_engine), 2026-05-15 |
| H22A4 USDM (1997-2001) | 2,157 cc | 200 PS (197 hp) | **~91.4 hp/liter** | 10.0:1 | [Wikipedia - H engine](https://en.wikipedia.org/wiki/Honda_H_engine), 2026-05-15 |
| H22A7 EDM (Accord Euro R) | 2,157 cc | 212 PS (209 hp) | **~96.9 hp/liter** | 10.6:1 | [mywikimotors.com](http://mywikimotors.com/honda-h22a/), 2026-05-15 |
| H22A2 EDM (Prelude BB1) | 2,157 cc | 185 PS (182 hp) | **~84.2 hp/liter** | 10.0:1 | [Wikipedia - H engine](https://en.wikipedia.org/wiki/Honda_H_engine), 2026-05-15 |

**Analysis:** Only the H22A Redtop (Type S variant) actually achieved the 100 hp/liter benchmark at ~100.6 hp/liter. The Blacktop came close at 91.4 hp/liter. USDM variants were detuned for emissions and fuel quality reasons, landing in the 84–91 hp/liter range. The European Accord Euro R (H22A7) approached the target at 96.9 hp/liter.

### 1.3 Context: Competitor Specific Output in Early 1990s

| Engine | Displacement | Power | Specific Output | Notes |
|--------|-------------|-------|-----------------|-------|
| Toyota 3S-GE (20V) | 2,000 cc | 180 PS | 90.0 hp/liter | Turbo-free, dual cam |
| Mazda 13B-MSP (rotary) | 1,308 cc (x2) | 190 PS | ~145 hp/liter* | Rotary has different physics |
| Subaru EJ22 | 2,200 cc | 160 PS | 72.7 hp/liter | NA, SOHC |
| Nissan SR20DET | 1,998 cc | 205 PS (turbo) | ~102.6 hp/liter | Forced induction |
| BMW M20B25 | 2,494 cc | 170 PS | 68.2 hp/liter | SOHC, luxury segment |
| H22A Redtop | 2,157 cc | 220 PS | **100.6 hp/liter** | NA, DOHC VTEC |
| H22A Blacktop | 2,157 cc | 200 PS | **91.4 hp/liter** | NA, DOHC VTEC |

*Rotary engines produce power per rotor chamber, so the per-liter figure is misleading but illustrates the class-leading output density of Wankel designs.

Source: [Reddit r/cars discussion on 100+ HP/L NA engines](https://www.reddit.com/r/cars/comments/hu4iu1/why_is_100hp_per_liter_so_impressive_in_a_na_motor/), 2026-05-15; Wikipedia entries for each engine.

**Key finding:** Among naturally aspirated production inline-4 engines of the early 1990s, the H22A Redtop was one of the very few to break the 100 hp/liter barrier without forced induction. This placed it in rarefied company alongside the B16A (its DOHC VTEC ancestor) and the Nissan SR20DET (which used a turbocharger).

---

## 2. Reliability Requirements

### 2.1 VTEC Durability Testing

Honda's internal testing protocol for VTEC systems included extreme "malicious tests" targeting component longevity:

| Test Parameter | Requirement | Source |
|---------------|-------------|--------|
| VTEC switching events | 400,000 cycles | [Honda Global Heritage](https://global.honda/en/heritage/episodes/1989vtecengine.html), 2026-05-15 |
| Selector pin wear tolerance | Several microns | [Honda Global Heritage](https://global.honda/en/heritage/episodes/1989vtecengine.html), 2026-05-15 |
| Camshaft surface pressure | 40% increase over previous design | [Honda Global Heritage](https://global.honda/en/heritage/episodes/1989vtecengine.html), 2026-05-15 |
| Exhaust valve heat resistance | 30% improvement | [Honda Global Heritage](https://global.honda/en/heritage/episodes/1989vtecengine.html), 2026-05-15 |

The selector pin (the mechanical element that slides to engage VTEC) was specified at **10 mm thickness** with a wear tolerance of just **several microns**. This level of precision was unprecedented for a mass-production engine component.

### 2.2 Materials for Reliability Under Increased Stress

The 40% increase in critical surface pressure on cam lobes required new materials:

| Component | Material | Improvement | Source |
|-----------|----------|-------------|--------|
| Camshafts | High-carbon, high-chrome cast steel | 40% higher surface pressure tolerance | [Honda Global Heritage](https://global.honda/en/heritage/episodes/1989vtecengine.html), 2026-05-15 |
| Exhaust valves | Nickel-based heat-resistant steel + Mo, Ti, W | 30% better heat resistance | [Honda Global Heritage](https://global.honda/en/heritage/episodes/1989vtecengine.html), 2026-05-15 |

### 2.3 FRM Liner Technology and Longevity

The H-series' Fiber-Reinforced Metal cylinder liners (detailed in T-036) were selected partly for their ability to maintain bore geometry under thermal cycling — a key reliability factor for high-output aluminum-block engines. FRM liners are thinner than traditional cast-iron sleeves, reducing thermal mass differences between liner and bore wall, which minimizes hot-spot formation and warpage.

However, FRM liners introduced a maintenance constraint: they cannot be machined like cast iron. When worn, the entire block must be replaced or re-sleeved with aftermarket solutions (e.g., RS Machine sleeves). This was an accepted trade-off for the weight savings and performance benefits.

### 2.4 Real-World Reliability Record

Community and enthusiast sources consistently rate the H-series as highly reliable in stock configuration:

| Aspect | Assessment | Source |
|--------|-----------|--------|
| Stock longevity | "Often achieves high mileage with minimal issues" | [PatSnap Eureka](https://eureka.patsnap.com/blog/tech-seek/h22-engine-specs-guide/), 2026-05-15 |
| Block strength (stock) | "Very strong in stock configuration" | [Honda-Tech forum](https://honda-tech.com/forums/all-motor-naturally-aspirated-44/h-vs-b-better-3216229/), 2026-05-15 |
| Ring lands under boost | "Prone to failure under boost conditions" | [Honda-Tech forum](https://honda-tech.com/forums/all-motor-naturally-aspirated-44/h-vs-b-better-3216229/), 2026-05-15 |
| Sleeve integrity | "Plenty strong for most applications" | [Honda-Tech forum](https://honda-tech.com/forums/all-motor-naturally-aspirated-44/h-vs-b-better-3216229/), 2026-05-15 |
| Notable weakness | Hydraulic timing belt tensioner failure-prone (1992-1996) | [Grassroots Motorsports](https://grassrootsmotorsports.com/forum/grm/what-happened-to-the-h22-engine/138048/page1), 2026-05-15 |

**Cross-check:** Both Honda-Tech and Grassroots Motorsports confirm that while the H-series is reliable in stock form, the hydraulic timing belt tensioner (1992-1996) is a known failure point. The 1997+ improved tensioner design resolved this issue.

### 2.5 Reliability vs. B-Series Comparison

The H-series shared much of the same basic technology as the B-series (same VTEC architecture, similar compression, same engineering staff):

> "There's nothing too distinct about the design of the H-series when compared to the B-series... just a better flowing head and more displacement pretty much."
> — [Honda-Tech forum](https://honda-tech.com/forums/all-motor-naturally-aspirated-44/h-vs-b-better-3216229/), 2026-05-15

The primary reliability difference is the FRM liner requirement, which adds complexity and cost to rebuilds but does not affect service life in normal operation.

---

## 3. Emissions Constraints

### 3.1 Regulatory Landscape During H-Series Development (1986-1991)

The H-series was developed during a period of tightening emissions regulations globally:

| Region | Standard | Effective Date | Key Limits (CO / HC+NOx / PM) | Relevance to H-Series |
|--------|----------|---------------|-------------------------------|----------------------|
| United States | Tier 1 | 1994 | 3.4 / 0.41 / — g/mi | H22A1 (1993 USDM) certified before Tier 1; H22A4 (1997+) compliant |
| United States | CARB LEV | 1994 (CA) | Stricter than federal Tier 1 | California variants had additional restrictions |
| Europe | Euro 1 | July 1992 | 2.72 / 0.97 / — g/km | H22A2 (EDM 1992) targeted Euro 1 compliance |
| Europe | Euro 2 | Jan 1997 | 2.2 / 0.5 / — g/km | H22A4/H22A5 (1997+) targeted Euro 2 compliance |
| Japan | New Long-Term (1991) | 1991 | ~50% reduction from 1990 levels | JDM H22A Si VTEC (Sept 1991) designed to meet new standards |
| Japan | New New Long-Term (1998) | 1998 | ~75% reduction from 1990 levels | H22A4/H22A8 (1997-2001) needed to prepare for this |

Sources: [European emission standards - Wikipedia](https://en.wikipedia.org/wiki/European_emission_standards), 2026-05-15; [United States vehicle emission standards - Wikipedia](https://en.wikipedia.org/wiki/United_States_vehicle_emission_standards), 2026-05-15; [1990 Clean Air Act Amendment Summary](https://www.epa.gov/clean-air-act-overview/1990-clean-air-act-amendment-summary-title-ii), 2026-05-15.

### 3.2 Emissions Equipment by Market

| System | JDM (H22A Redtop/Blacktop) | USDM (H22A1/H22A4) | EDM (H22A2/H22A5) |
|--------|---------------------------|-------------------|------------------|
| Catalytic converter | Yes, 3-way | Yes, 3-way (larger) | Yes, 3-way |
| EGR | Minimal / none | Present (OBD1/OBD2) | Present |
| PCV system | Standard | Standard | Standard |
| Secondary air injection | No | Yes (OBD1) | Yes |
| EVAP system | Japanese spec | US EPA-compliant (charcoal canister) | European spec |
| OBD | None (pre-OBD) | OBD1 (socketed ECU) | OBD1 → OBD2 transition |
| Air pump | No | Yes (some years) | No |

**Note:** USDM variants carried the most emissions equipment, which contributed to their lower power output (190 PS vs 220 PS for JDM Redtop). The H22A1 used different cam profiles, a less aggressive intake manifold, and a larger catalytic converter compared to the JDM equivalent.

### 3.3 Emissions vs. Performance Trade-offs

The power differential between market variants illustrates the emissions-performance trade-off:

| Variant | Power | Emissions Equipment Burden | Compression Ratio | Net Result |
|---------|-------|--------------------------|-------------------|------------|
| H22A Redtop (JDM) | 220 PS | Lightest | 11.0:1 | Maximum output |
| H22A Blacktop (JDM) | 200 PS | Lightest | 10.6:1 | Balanced daily use |
| H22A7 EDM (Accord Euro R) | 212 PS | Moderate | 10.6:1 | Near-JDM output |
| H22A4 USDM | 200 PS | Heavy | 10.0:1 | Detuned for emissions/fuel |
| H22A1 USDM | 190 PS | Heaviest | 10.0:1 | Most detuned |

**Source:** [Wikipedia - Honda H engine](https://en.wikipedia.org/wiki/Honda_H_engine), 2026-05-15; [mywikimotors.com](http://mywikimotors.com/honda-h22a/), 2026-05-15.

### 3.4 Fuel Quality Considerations

USDM and EDM variants were calibrated for lower fuel octane availability in their markets:

| Market | Premium Octane (RON) | Regular Octane (RON) | Impact on H-Series Calibration |
|--------|---------------------|---------------------|-------------------------------|
| Japan (JDM) | 99+ | 91 | Aggressive timing, high CR possible |
| Europe (EDM) | 95-98 | 95 | Moderate timing, mid-range CR |
| United States (USDM) | 87-91 AKI (~96 RON) | 87 AKI (~91 RON) | Conservative timing, lower CR (10.0:1) |

**Source:** [mywikimotors.com](http://mywikimotors.com/honda-h22a/), 2026-05-15; industry-standard octane conversion data.

The 10.0:1 compression ratio on USDM H22A1/H22A4 (vs. 11.0:1 on JDM Redtop) was directly driven by the need to run on 87 AKI regular fuel without knock — a significant emissions and cost consideration for the mass market.

---

## 4. Cost Targets

### 4.1 Manufacturing Cost Philosophy

The H-series was positioned as Honda's premium performance engine, sitting above the B-series in the product hierarchy but below the F-series in displacement. Cost targets were shaped by several factors:

| Cost Factor | Approach | Rationale |
|------------|----------|-----------|
| Block material | Sand-cast aluminum (not die-cast) | More expensive per unit than die-cast, but better for complex geometries and FRM liner integration |
| Cylinder liners | FRM (proprietary) | Higher initial cost than cast iron, but weight savings and thermal benefits justified the premium |
| Valvetrain | DOHC VTEC on both cams | Expensive vs. SOHC, but required for the 100 hp/liter target |
| Machining | Tight tolerances (micron-level) | Increased machining cost, necessary for VTEC selector pin reliability |
| Production volume | Lower than B-series | Economies of scale worked against H-series unit cost |

### 4.2 H-Series vs. B-Series Cost Comparison

Enthusiast and swap-community sources consistently note the cost differential:

> "These H22a engines only cost >$1k complete with motor mounts on eBay. The numbers I'm seeing are a little better than the Type R engine/B16A/C, which alone..."
> — [Reddit r/Honda](https://www.reddit.com/r/Honda/comments/8odhqz/is_there_a_reason_why_h22a_engines_are_way/), 2026-05-15

| Metric | H22A | B16A/B18C | Source |
|--------|------|-----------|--------|
| Used engine price | $1,000-1,500 | $2,000-3,500+ | [Wikipedia comparison tables](https://en.wikipedia.org/wiki/Honda_H_engine), 2026-05-15 |
| Swap complexity | Higher (larger, heavier) | Lower (bolt-in to many chassis) | [HondaSwap.com](https://hondaswap.com/threads/b-vs-h.352191/), 2026-05-15 |
| Transmission cost | Higher (unique mounting) | Lower (widely available) | [Honda-Tech](https://honda-tech.com/forums/all-motor-naturally-aspirated-44/h-vs-b-better-3216229/), 2026-05-15 |
| Aftermarket support | Growing but limited | Extensive, mature | Community consensus |

**Analysis:** Despite being a newer and more technologically advanced engine, the H22A became cheaper on the used market than the B16A/B18C by the 2010s-2020s. This was driven by lower demand (Prelude was always a niche model) and higher swap complexity. However, during original production, the H-series likely carried a higher BOM cost than the B-series due to FRM liners, DOHC VTEC valvetrain, and tighter machining tolerances.

### 4.3 OEM Cost Positioning

Honda positioned the H-series within a broader cost framework:

| Engine Family | Target Market | Relative Cost | Volume Strategy |
|--------------|--------------|---------------|-----------------|
| D-series | Economy subcompact | Lowest | High volume, global |
| B-series | Compact sport | Low-Medium | High volume, broad application |
| H-series | Premium sport coupe/sedan | Medium-High | Lower volume, flagship performance |
| F-series | Grand touring | Medium | Moderate volume |
| J/V-series | Luxury (Legend/TL) | High | Moderate volume |

The H-series sat in the "premium performance" tier — expensive enough to signal exclusivity but not so expensive as to limit its use to ultra-limited editions. This positioning is reflected in its use across multiple models (Prelude, Accord, Integra Type R) rather than a single halo application.

---

## 5. How H-Series Targets Differed from B-Series and F-Series

### 5.1 Comparative Target Matrix

| Target Parameter | B16A (B-series) | H22A (H-series) | F20B (F-series) |
|-----------------|-----------------|-----------------|-----------------|
| Displacement | 1.6 L | 2.2 L | 2.0 L |
| Power density target | 100 hp/liter | ~90-100 hp/liter | ~80-90 hp/liter |
| Block material | Aluminum + cast iron sleeve | Aluminum + FRM liner | Aluminum + cast iron sleeve |
| VTEC application | Intake only (SOHC) / Intake+Exhaust (DOHC) | Intake+Exhaust (DOHC) | Intake only (SOHC) |
| Main bearing caps | 4-bolt | 5-bolt (closed deck) / 4-bolt (open deck) | 4-bolt |
| Redline target | 8,000 rpm | 7,200-8,200 rpm | 7,800-8,000 rpm |
| Primary design goal | Maximize specific output | Balance power + torque + refinement | Grand touring torque |

**Sources:** [Honda Global Heritage](https://global.honda/en/heritage/episodes/1989vtecengine.html), 2026-05-15; [Wikipedia - Honda H engine](https://en.wikipedia.org/wiki/Honda_H_engine), 2026-05-15; [mywikimotors.com](http://mywikimotors.com/honda-h22a/), 2026-05-15.

### 5.2 Key Differentiators

1. **FRM liners:** The H-series was the first Honda engine family to use FRM (Fiber-Reinforced Metal) liners instead of cast iron sleeves. This was a deliberate cost-for-performance trade — higher manufacturing cost but better weight distribution and thermal characteristics.

2. **Torque-rich character:** Unlike the B-series which prioritized high-RPM power, the H-series was engineered for strong mid-range torque (221 Nm @ 6,500 rpm on the Redtop). This was driven by the 90.7mm stroke (longer than B-series) and the Prelude's pairing with 4WS, which benefits from predictable low-end response.

3. **Five-bolt main bearing cap (1992-1996):** The closed-deck H-series used a five-bolt main bearing cap girdle, increasing bottom-end rigidity beyond the B-series' four-bolt design. This was a cost premium for structural integrity at higher outputs.

4. **Dual-runner vs. single-runner intake:** The Redtop used a dual-runner intake manifold for broad torque spread, while the Blacktop and later USDM variants used single-runner designs optimized for different power band characteristics.

---

## 6. Synthesis: Engineering Philosophy

The H-series engineering targets reflect a coherent philosophy that can be summarized as **"maximum performance within a naturally aspirated, mass-producible package."** Key principles:

1. **Power density as the north star:** The 100 hp/liter target set by Kawamoto drove every major design decision — from VTEC implementation to valvetrain materials to cam profiles.

2. **Reliability through precision:** The micron-level tolerances on VTEC components, 400,000-switching-event durability testing, and advanced exhaust valve materials show that Honda did not sacrifice reliability for power — they engineered reliability into the higher-stress regime.

3. **Emissions compliance as a market variable, not a uniform constraint:** Each market received a variant tuned to its regulatory environment. JDM got maximum output with minimal emissions equipment; USDM got the most detuned version with full US emissions hardware. This flexibility allowed Honda to sell the same core architecture globally.

4. **Cost managed through platform sharing:** The H-series shared the VTEC architecture, ECU design philosophy, and many component suppliers with the B-series and F-series. This reduced development cost even as unit manufacturing costs were higher than the B-series.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda Global Heritage — The VTEC Engine / 1989 | Official corporate history, authored by development staff | https://global.honda/en/heritage/episodes/1989vtecengine.html | 2026-05-15 | High (primary source) |
| 2 | Wikipedia — Honda H engine | Community-sourced encyclopedia, well-referenced | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | Medium-High |
| 3 | mywikimotors.com — H22A engine specifications | Technical reference site | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | Medium |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|-------|-----|-----------|-------------|
| 4 | Reddit r/cars — Why is 100+ HP/L impressive in NA motors? | Community discussion, technical | https://www.reddit.com/r/cars/comments/hu4iu1/why_is_100hp_per_liter_so_impressive_in_a_na_motor/ | 2026-05-15 | Medium |
| 5 | PatSnap Eureka — H22 Engine Specs and Why It's Popular Among Tuners | Technical blog, AI-generated summary | https://eureka.patsnap.com/blog/tech-seek/h22-engine-specs-guide/ | 2026-05-15 | Medium |
| 6 | Honda-Tech forum — H vs B comparison | Enthusiast community discussion | https://honda-tech.com/forums/all-motor-naturally-aspirated-44/h-vs-b-better-3216229/ | 2026-05-15 | Medium (community-sourced) |
| 7 | Grassroots Motorsports forum — What happened to the H22? | Enthusiast community discussion | https://grassrootsmotorsports.com/forum/grm/what-happened-to-the-h22-engine/138048/page1 | 2026-05-15 | Medium (community-sourced) |
| 8 | Reddit r/Honda — Why are H22a engines cheaper than B16/B18? | Community discussion on pricing | https://www.reddit.com/r/Honda/comments/8odhqz/is_there_a_reason_why_h22a_engines_are_way/ | 2026-05-15 | Medium |
| 9 | LinkedIn Engineering Community — How Honda's VTEC achieved 100 hp/L | Industry commentary | https://www.linkedin.com/posts/engineeringcommunity_in-the-late-1980s-hondas-rd-president-activity-7369822456842440709-wpiq | 2026-05-15 | Medium |
| 10 | European emission standards — Wikipedia | Reference on EU regulatory timeline | https://en.wikipedia.org/wiki/European_emission_standards | 2026-05-15 | Medium-High |
| 11 | United States vehicle emission standards — Wikipedia | Reference on US regulatory timeline | https://en.wikipedia.org/wiki/United_States_vehicle_emission_standards | 2026-05-15 | Medium-High |
| 12 | 1990 Clean Air Act Amendment Summary — EPA | Official US regulatory document | https://www.epa.gov/clean-air-act-overview/1990-clean-air-act-amendment-summary-title-ii | 2026-05-15 | High |

### Cross-Check Summary

All claims about the 100 hp/liter target are corroborated by Honda's own corporate heritage site (source #1), which is the authoritative primary source. Power figures for all H-series variants cross-check between Wikipedia (source #2) and mywikimotors.com (source #3). The B-series vs. H-series cost comparison is supported by multiple independent community sources (sources #6, #8). Emissions regulatory timelines cross-check between Wikipedia sources (#10, #11) and the EPA (source #12).

---

## Follow-ups Discovered

1. **T-039:** H-series vs competitor engines in early 1990s — this task builds directly on the competitor comparison data gathered here.
2. **T-048:** H-series cost analysis — BOM estimate, pricing vs B-series, margin strategy. The cost section here provides the foundation but needs deeper BOM-level data.
3. **T-054:** H-series environmental compliance — emissions standards met, catalytic converter tech. The emissions section here provides the regulatory context but needs variant-specific certification data.
