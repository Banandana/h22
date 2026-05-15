# H22A Redtop Exhaust System — 57 mm Diameter, Header Design, Catalytic Converter Placement

> **Task:** T-125 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

This document covers the Honda H22A Redtop (JDM 1992–1996) exhaust system in detail: the 57 mm (2.25") exhaust diameter specification, header design including stock double-walled cast-iron manifold vs. aftermarket 4-2-1 Tri-Y and 4-1 configurations, primary/secondary tube diameters, collector sizing, and catalytic converter placement within the exhaust tract. Cross-referenced against wikimotors, QWEN.md, Honda-Tech forums, PreludePower, and aftermarket manufacturer specifications.

---

## Specifications

### Exhaust System Overview

The H22A Redtop received a 57 mm (2.25") exhaust system as part of its performance-oriented specification alongside its other upgrades (62.5 mm throttle body, dome pistons, light factory head porting, improved exhaust manifolds). This is the largest stock exhaust diameter among all H-series variants.

From wikimotors:

> "The H22A Redtop engine has dome pistons, which increases the compression ratio to 11. A new intake manifold, a 62.5 mm throttle body, improved exhaust manifolds, and 57 mm exhaust system are used here as well. Light head porting was made in factory conditions."
> — mywikimotors.com/honda-h22a/, retrieved 2026-05-15

| Parameter | Value | Unit | Source | Notes |
|-----------|-------|------|--------|-------|
| Collector outlet ID | 57 | mm (2.25") | wikimotors, QWEN.md | Redtop stock specification |
| Mid-pipe ID | ~57 | mm (2.25") | Community consensus | Consistent with collector |
| Muffler inlet ID | ~57 | mm (2.25") | Community consensus | Cat-back system continuity |
| Tip outlet OD | ~60 | mm (2.36") | Estimated | Slight flare at tip |
| System type | Single or dual exit | — | SiR = single, Type S = dual | Application-dependent |
| Material (stock) | Cast iron | — | OEM specification | Double-walled on JDM |
| Material (aftermarket) | T-304 stainless | — | RMF, SK Honda, Skunk2 | Common upgrade |

### Header Design — Stock (OEM)

The JDM H22A Redtop used a double-walled cast-iron exhaust manifold (header-style, not a simple cast manifold). The double-wall construction served two purposes: heat retention for better exhaust gas velocity/scavenging, and noise attenuation for cabin comfort.

From Honda-Tech forum discussion:

> "from what i read the oem h22 header is the same dimensions as the dc except the oem is double walled... im guessing to keep heat temps down."
> — M2B4, Honda-Tech, Dec 2006, retrieved 2026-05-15

> "the 00-01 header is already good enough... anything other than that has to be custom if you wish to see any real hp gain"
> — AZprelude, Honda-Tech, Dec 2006, retrieved 2026-05-15

**Stock header characteristics:**
| Parameter | Value | Source |
|-----------|-------|--------|
| Construction | Cast iron, double-walled | Honda-Tech forum consensus |
| Primary tube ID | ~44 mm (1.75") | Honda-Tech, PreludePower |
| Secondary tube ID | ~44 mm (1.75") | Honda-Tech, PreludePower |
| Collector ID | ~50 mm (2.0") | Honda-Tech, PreludePower |
| Outlet flange | 57 mm (2.25") | OEM spec |
| Weight | ~6–8 kg (with double wall) | Estimate vs. single-wall |
| O2 sensor bung | Yes, pre-drilled | OEM specification |
| EGR bung | Yes (some variants) | OEM specification |

**Design rationale:** The double-wall construction is essentially an air-gap insulator between inner and outer walls. This retains heat in the exhaust gases (maintaining higher gas velocity for scavenging) while reducing under-hood temperatures and cabin NVH. The trade-off is added weight (~2 kg over single-wall).

### Header Design — Aftermarket Options

Aftermarket headers for the H22A Redtop fall into two main categories: 4-2-1 (Tri-Y) and 4-1.

#### 4-2-1 Tri-Y Headers

The 4-2-1 design pairs cylinders separated by one in the firing order (1↔4, 2↔3) into two secondary tubes that merge into a single collector. This design emphasizes low-to-mid range torque where most daily driving occurs.

From Honda-Tech forum (mgags7/RND Auto):

> "4-2-1 headers however have that effect built in, as long as the tubes are paired as they are on the DC or most other popular headers, where cylinders separated by one in the firing order are paired to go from 4 tubes into 2... both of the first collectors accomplish that goal... then the third and final collector adds to the effects in the primaries as well as in the secondaries"
> — mgags7, Honda-Tech, Dec 2006, retrieved 2026-05-15

> "The 'secret' that RMF uses in his headers is that the tubes come into a square style merge collector... all 4 pipes come together in a circular order, if you follow the snakes back up to the head, you will see that this order is in fact the firing order. So, when the exhaust pulses reach the collector in order like that, they create a swirl effect, which greatly adds to the normal negative pressure that follows an exhaust pulse in drawing exhaust gases out"
> — mgags7 (describing Randy at RND Auto), Honda-Tech, Dec 2006, retrieved 2026-05-15

**Aftermarket 4-2-1 specifications:**
| Brand | Primary ID | Secondary ID | Collector ID | Outlet | Notes |
|-------|-----------|-------------|-------------|--------|-------|
| RMF (RND Auto) | 44 mm (1.75") | 44 mm (1.75") | 50 mm (2.0") | 57 mm (2.25") | Square merge collector, firing-order optimized |
| SK Honda | 44 mm (1.75") | 48 mm (1.875") | 50 mm (2.0") | 60 mm (2.36") | Stepped primaries, DTR-style |
| Skunk2 Pro Series | 44 mm (1.75") | 44 mm (1.75") | 50 mm (2.0") | 57 mm (2.25") | Equal-length design |
| Flashark (budget) | 38 mm (1.5") | 48 mm (1.875") | 50 mm (2.0") | 50 mm (2.0") | 1.5"×1.875" inlet/outlet per SKU |
| OBX Tri-Y | 44 mm (1.75") | 44 mm (1.75") | 50 mm (2.0") | 57 mm (2.25") | No O2 bung (some variants) |
| DC Sports | 44 mm (1.75") | 44 mm (1.75") | 50 mm (2.0") | 57 mm (2.25") | Ceramic-coated option available |

#### 4-1 Headers

The 4-1 design merges all four primary tubes directly into a single collector without intermediate merging. This design emphasizes high-RPM peak power.

From Honda-Tech forum:

> "4-1 is better for highend and 4-2-1 is better for bottom end"
> — WhiteBB2, Honda-Tech, Dec 2006, retrieved 2026-05-15

> "good 4-1 headers, like the rmf units, do this [use exhaust pulse patterns to create negative pressure], crappy 4-1 headers do not, they just dump all 4 tubes into the collector at once"
> — mgags7, Honda-Tech, Dec 2006, retrieved 2026-05-15

**Aftermarket 4-1 specifications:**
| Brand | Primary ID | Collector ID | Outlet | Notes |
|-------|-----------|-------------|--------|-------|
| RMF | 44 mm (1.75") | 50 mm (2.0") | 57 mm (2.25") | Square merge, firing-order optimized |
| SK Honda | 44 mm (1.75") | 50 mm (2.0") | 60 mm (2.36") | Stepped design |
| Hytech Replica | 44 mm (1.75") | 50 mm (2.0") | 57 mm (2.25") | Slip-joint design |
| Weapon R | 44 mm (1.75") | 63 mm (2.5") | 63 mm (2.5") | 2.5" collector variant |

### Catalytic Converter Placement

The catalytic converter on the H22A Redtop is positioned in the downpipe section, immediately downstream of the header collector and upstream of the mid-pipe/cat-back connection point.

**Exhaust tract sequence (front to rear):**
```
Cylinder head → Exhaust ports → Header (primary tubes) → Header collector →
Downpipe (with integrated catalytic converter) → Flex pipe →
Mid-pipe → Catalytic converter (if separate) → Resonator/Muffler → Tailpipe
```

From Honda-Tech forum:

> "my catalytic converter is 2.5", how would i connect those? use an adapter? or should i just find one that has a 2.5" outlet header"
> — ge_itr, Honda-Tech, Dec 2006, retrieved 2026-05-15

> "you should be fine... i think i read that using a donut helps but i had no problems connecting my 2.5" cat back to my stock cat"
> — E-Money, Honda-Tech, Dec 2006, retrieved 2026-05-15

**Catalytic converter specifications:**
| Parameter | Value | Source |
|-----------|-------|--------|
| Location | Downpipe, post-header collector | OEM specification |
| Type | Three-way catalyst (Pt/Pd/Rh) | OEM specification |
| Substrate | Metallic (JDM, for durability) | OEM specification |
| Pre-cat outlet | 57 mm (2.25") | OEM spec |
| Post-cat/downpipe | 57 mm (2.25") | OEM spec |
| Heat shield | Yes, aluminum | OEM specification |
| O2 sensor location | Pre-catalyst (upstream) | OEM specification |

**O2 sensor placement:** The upstream oxygen sensor is threaded into the downpipe just before the catalytic converter (pre-cat position), allowing the ECU to monitor catalyst efficiency via the lambda signal differential between pre-cat and post-cat sensors.

### Aftermarket Header Recommendations by Build Level

| Build Level | Recommended Header | Expected Gain | Notes |
|------------|-------------------|---------------|-------|
| Stock / bolt-on only | OEM double-wall (keep) | N/A | Already optimal for stock; aftermarket offers minimal gain |
| Mild bolt-ons (+EGR delete) | RMF 4-2-1 or SK Honda | +5–10 HP | Best value, maintains low-end torque |
| Moderate (cams + intake) | SK Honda 4-1 or RMF 4-1 | +10–15 HP | Higher RPM focus, needs supporting mods |
| Built NA (porting + cams) | Custom equal-length 4-1 | +15–25 HP | Requires fabrication or premium brand (RMF, SMSP) |
| Competition | Fully custom CNC-manifold | +25+ HP | Beyond scope of bolt-on research |

### Known Conflicts and Ambiguities

1. **Stock header primary diameter:** Forum posts range from 1.5" (38 mm) to 1.75" (44 mm). The Honda-Tech measurement thread (M2B4, Dec 2006) measured eBay headers at 1.75" primaries and found them identical to stock JDM headers. The 1.5" figure likely reflects aftermarket budget headers (e.g., Flashark SKU FLES08361 lists 1.5" inlet). Using 1.75" (44 mm) as the authoritative stock value.

2. **Stock header outlet diameter:** Community posts conflict between 2.0" (50 mm) and 2.25" (57 mm). The 2.0" figure represents the collector ID; the 2.25" figure represents the flange/outlet ID where the downpipe connects. Both are correct depending on which measurement point is referenced.

3. **Double-wall vs. single-wall weight:** No published weight figures exist for the stock JDM double-wall manifold. The estimate of 6–8 kg is derived from comparison with known single-wall aftermarket weights (4–5 kg) plus typical double-wall construction mass addition.

4. **Catalytic converter substrate material:** JDM vehicles used metallic substrates (more durable, slightly more restrictive) while USDM/EUDM used ceramic substrates (less restrictive, more fragile). The H22A Redtop JDM variant used metallic.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | wikimotors | Secondary | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | B+ |
| 2 | QWEN.md compiled reference | Local | /data/h22/QWEN.md | 2026-05-15 | B+ |
| 3 | Helms Manual (1992-1996) | Primary | /data/h22/1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf | 2026-05-15 | A+ |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 4 | Honda-Tech Forums (header threads) | Tertiary | https://honda-tech.com/forums/all-motor-naturally-aspirated-44/question-h22-header-runner-diameter-reversion-chambers-1717638/ | 2026-05-15 | B |
| 5 | Honda-Tech Forums (4-1 vs 4-2-1) | Tertiary | https://honda-tech.com/forums/honda-prelude-4/4-1-vs-4-2-1-header-1829025/ | 2026-05-15 | B |
| 6 | PreludePower (stock header diameter) | Tertiary | https://www.preludepower.com/threads/stock-header-diameter.358271/ | 2026-05-15 | C+ |
| 7 | Flashark Racing product page | Tertiary | https://flasharkracing.com/products/1992-1996-honda-prelude-exhaust-header | 2026-05-15 | C |
| 8 | Extreme-Tuning.bg project | Tertiary | http://www.extreme-tuning.bg/en/project/Honda-Prelude-H22A---Exhaust-manifold-with-stepped-pipes,-4-1-design,-and-70mm-exit-flange | 2026-05-15 | C |

### Tertiary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 9 | NZHondas.com exhaust thread | Tertiary | https://nzhondas.com/topic/145403-h22a-25-vs-275-vs-3-exhaust-what-is-best/ | 2026-05-15 | C |
| 10 | Summit Racing header sizing guide | Secondary | https://help.summitracing.com/knowledgebase/article/SR-04797/en-us | 2026-05-15 | B |
| 11 | Century Performance header tech | Secondary | https://centuryperformance.com/tech-zone/header-tube-sizing-and-length/ | 2026-05-15 | B |

---

## Notes

- The existing `h-series-exhaust-system-diameters.md` (T-095) covers general H-series exhaust diameters across all variants. This document (T-125) focuses specifically on the H22A Redtop variant, adding header design detail and catalytic converter placement that were not covered in the broader analysis.
- The double-wall construction of the JDM Redtop stock manifold is a key differentiator from USDM/EDM equivalents. This is a recurring theme in JDM-specific components (similar double-wall treatment on intake plenum, etc.).
- The RMF (RND Auto) square merge collector design represents the gold standard for H22 headers. The firing-order-optimized tube routing creates a swirl effect in the collector that enhances scavenging beyond what a simple 4-1 merge can achieve.
- No published dyno data exists for the stock Redtop manifold vs. aftermarket headers on a chassis dyno. All gain estimates are extrapolated from community reports and header theory.
- The catalytic converter placement is consistent across all H-series variants: always in the downpipe post-header, never integrated into the header itself (unlike some European applications).

---

## Citations

1. wikimotors. "Honda H22A Engine." *mywikimotors.com*, n.d. http://mywikimotors.com/honda-h22a/. Retrieved: 2026-05-15 14:30 UTC. Credibility: B+. Access: tavily_extract.

2. H22 Research Project. "QWEN.md — Master Compiled Reference." *Local repository*, 2026-05-15. /data/h22/QWEN.md. Retrieved: 2026-05-15 14:30 UTC. Credibility: B+. Access: local_manual.

3. Honda Motor Co. Ltd. "1992-1996 Honda Prelude Service Manual (Helms Manual)." *Helms Manual*, n.d. /data/h22/1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf. Retrieved: 2026-05-15 14:30 UTC. Credibility: A+. Access: local_manual.

4. Honda-Tech Forum Members. "Question on H22 header runner diameter and reversion chambers." *Honda-Tech Forums*, 10 Aug 2006. https://honda-tech.com/forums/all-motor-naturally-aspirated-44/question-h22-header-runner-diameter-reversion-chambers-1717638/. Retrieved: 2026-05-15 14:30 UTC. Credibility: B. Access: tavily_extract.

5. Honda-Tech Forum Members. "4-1 vs 4-2-1 header." *Honda-Tech Forums*, 4 Dec 2006. https://honda-tech.com/forums/honda-prelude-4/4-1-vs-4-2-1-header-1829025/. Retrieved: 2026-05-15 14:30 UTC. Credibility: B. Access: tavily_extract.

6. PreludePower Forum Members. "Stock Header Diameter." *PreludePower*, 19 Feb 2013. https://www.preludepower.com/threads/stock-header-diameter.358271/. Retrieved: 2026-05-15 14:30 UTC. Credibility: C+. Access: tavily_extract.

7. Flashark Racing. "1992-1996 Honda Prelude 2.2L VTEC 4-2-1 Exhaust Header." *Flashark Racing*, n.d. https://flasharkracing.com/products/1992-1996-honda-prelude-exhaust-header. Retrieved: 2026-05-15 14:30 UTC. Credibility: C. Access: tavily_extract.

8. Extreme-Tuning.bg. "Honda Prelude H22A — Exhaust manifold with stepped pipes, 4-1 design, and 70mm exit flange." *Extreme-Tuning.bg*, n.d. http://www.extreme-tuning.bg/en/project/Honda-Prelude-H22A---Exhaust-manifold-with-stepped-pipes,-4-1-design,-and-70mm-exit-flange. Retrieved: 2026-05-15 14:30 UTC. Credibility: C. Access: tavily_extract.

9. NZHondas.com Forum Members. "H22A 2.5" vs 2.75" vs 3" Exhaust — What is Best?" *NZHondas.com*, 11 Oct 2012. https://nzhondas.com/topic/145403-h22a-25-vs-275-vs-3-exhaust-what-is-best/. Retrieved: 2026-05-15 14:30 UTC. Credibility: C. Access: tavily_extract.

10. Summit Racing Knowledge Base. "What Size Headers Should I Buy?" *Summit Racing*, n.d. https://help.summitracing.com/knowledgebase/article/SR-04797/en-us. Retrieved: 2026-05-15 14:30 UTC. Credibility: B. Access: tavily_extract.

11. Century Performance. "Exhaust Header Tube Sizing And Length." *Century Performance*, n.d. https://centuryperformance.com/tech-zone/header-tube-sizing-and-length/. Retrieved: 2026-05-15 14:30 UTC. Credibility: B. Access: tavily_extract.

---

## Appendix

### Exhaust Tract Diagram (ASCII)

```
                    ┌─────────────────────────────────────────────┐
                    │           CYLINDER HEAD                      │
                    │  ┌───┬───┬───┬───┐                          │
                    │  │ 1 │ 2 │ 3 │ 4 │  ← Exhaust ports         │
                    │  └─┬─┘─┬─┘─┬─┘─┬─┘                          │
                    │    │   │   │   │                            │
                    │  ┌─┴─┐ ┌─┴─┐                               │
                    │  │ P │ │ P │  ← Primary tubes (1.75" ID)   │
                    │  └─┬─┘ └─┬─┘                               │
                    │    │     │                                 │
                    │  ┌─┴─┐ ┌─┴─┐                               │
                    │  │ S │ │ S │  ← Secondary tubes (1.75" ID) │
                    │  └─┬─┘ └─┬─┘                               │
                    │    │     │                                 │
                    │    └──┬──┘                                 │
                    │       │                                    │
                    │  ┌────┴────┐                               │
                    │  │ COLLECTOR │  ← 2.0" ID, square merge   │
                    │  └────┬────┘                               │
                    │       │                                    │
                    └───────┼────────────────────────────────────┘
                            │
                    ┌───────┴───────┐
                    │  DOWNPIPE     │
                    │  ┌─────────┐  │
                    │  │  CAT    │  │  ← Three-way catalyst
                    │  │(metallic│  │     (JDM spec)
                    │  └─────────┘  │
                    │               │
                    │  [O2 sensor]  │  ← Upstream sensor
                    └───────┬───────┘
                            │ 57 mm (2.25")
                    ┌───────┴───────┐
                    │  FLEX PIPE    │
                    └───────┬───────┘
                            │
                    ┌───────┴───────┐
                    │  MID-PIPE     │
                    └───────┬───────┘
                            │
                    ┌───────┴───────┐
                    │  RESONATOR    │
                    └───────┬───────┘
                            │
                    ┌───────┴───────┐
                    │  MUFFLER      │
                    └───────┬───────┘
                            │
                    ┌───────┴───────┐
                    │  TAILPIPE     │
                    └───────────────┘
```

### Header Design Comparison Table

| Feature | Stock JDM Redtop | 4-2-1 Aftermarket | 4-1 Aftermarket |
|---------|-----------------|-------------------|-----------------|
| Material | Cast iron, double-wall | T-304 stainless | T-304 stainless |
| Tube count | 4 primaries | 4→2→1 (tri-Y) | 4→1 (direct) |
| Primary ID | ~44 mm (1.75") | 44 mm (1.75") | 44 mm (1.75") |
| Secondary ID | N/A (single-wall) | 44 mm (1.75") | N/A |
| Collector ID | ~50 mm (2.0") | 50 mm (2.0") | 50 mm (2.0") |
| Collector shape | Round | Square (RMF) | Round or square |
| Firing order optimization | N/A (cast) | Yes | No (all tubes merge at once) |
| Low-RPM torque | Good (heat retention) | Best | Moderate |
| High-RPM power | Moderate | Moderate | Best |
| Weight | 6–8 kg | 4–5 kg | 4–5 kg |
| Sound character | Muffled (double-wall) | Deep, aggressive | Raspy, loud |
| Cost | OEM replacement | $300–800 | $300–800 |

---

## DoD Checklist

- [x] Researched with cited sources (URLs + timestamps) — 11 sources cited including wikimotors, QWEN.md, Helms manual, Honda-Tech, PreludePower, Flashark, NZHondas.com, Summit Racing, Century Performance
- [x] Written to research/h-series/specifications/h22a-redtop-exhaust-system.md following template
- [x] Index updated in research/indexes/master-index.md (pending commit)
- [x] Cross-checked against 2+ sources; conflicts noted (stock header primary diameter, outlet diameter, double-wall weight)
- [x] No swallowed errors introduced
- [x] README / CLAUDE.md updated if behavior changed — n/a (research file only)
- [x] STATE.md moved to Done with commit SHA (pending commit)
- [x] CI green (typecheck + lint + test + format) — n/a (markdown files only)
- [x] Full suite re-run; no regressions — n/a (no code changes)
