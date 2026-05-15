# Honda H22A Blacktop — Closed Deck vs Open Deck Transition

> **Task:** T-160 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete
> **Depends on:** T-073 (general H-series deck designs), T-151 (Blacktop JDM origin), T-152 (Blacktop specifications)
> **Cross-references:** T-073 (deck design definitions), T-074 (main bearing support), T-161 (Blacktop vs Redtop comparison)

---

## Summary

The H22A Blacktop (JDM, black valve cover, 200 PS @ 6,800 RPM) was produced from 1992 to 2001 across two generations of the Honda Prelude. The defining structural change between these generations is the block deck design: 1992–1996 models used a **closed-deck** block while 1997–2001 models switched to an **open-deck** block. This document documents the specific implications of this transition for the Blacktop variant — not just the general engineering differences, but how it affects real-world ownership, swapping, tuning, and build decisions for owners working specifically with the H22A Blacktop.

The transition coincided with two other significant changes: the main journal diameter increased from 50 mm to 55 mm (starting 1998), and the ECU system shifted from OBD1 to OBD2. Despite the deck design change, the Blacktop's power output remained constant at 200 PS throughout its production run — Honda traded structural rigidity for improved cooling efficiency without sacrificing rated performance.

---

## Timeline: When Did the Switch Happen?

| Period | Deck Type | Main Journals | ECU System | Block Serial Range | Applications |
|--------|-----------|---------------|------------|-------------------|--------------|
| 1992–1996 | Closed deck | 50 mm | OBD1 (P13, P14) | H22A-1000001~ through H22A-1200001~ | 4th gen Prelude SiR (BB1/BB4), Accord SiR (CD6/CF2) |
| 1997 | Open deck | 50 mm | OBD2 (P13) | H22A-1250001~ through H22A-1270001~ | 5th gen Prelude SiR (BB6/BB8) |
| 1998–2001 | Open deck | 55 mm | OBD2 (P13) | H22A-1280001~ through H22A-1290001~ | 5th gen Prelude SiR (BB6/BB8), SiR S-Spec |

**Key observation:** The deck design change happened at the model-year boundary (1996→1997), but the main journal increase came later (1997→1998). This means 1997 models are unique: they have an open deck but retain 50 mm main journals.

---

## Structural Differences: What Changed Specifically for the Blacktop

### Closed-Deck Blacktop (1992–1996)

The 4th-generation Blacktop block features solid material bridging the coolant passages around the upper circumference of each cylinder bore. This creates a rigid collar that:

1. **Resists lateral cylinder movement** — Combustion pressure pushes the cylinder walls outward. In a closed deck, this force is countered by the solid material ring, preventing bore distortion (egg-shaping) under high cylinder pressure.
2. **Prevents head gasket failure** — By keeping the cylinder aligned with the deck surface, the head gasket seal remains intact even under extreme cylinder pressures from high compression or boost.
3. **Increases block torsional rigidity** — The additional material adds stiffness to the entire block structure, reducing flex under load.

**Visual identification:** Removing the cylinder head and looking down at the deck reveals solid material bridging between coolant ports around the upper circumference of each cylinder.

### Open-Deck Blacktop (1997–2001)

The 5th-generation Blacktop block features continuous coolant passages that form a complete ring around each cylinder wall up to the deck surface. This design:

1. **Maximizes cooling capacity** — Coolant makes full contact with the entire upper cylinder wall surface area, providing superior heat dissipation from the combustion chamber edges.
2. **Reduces manufacturing complexity** — Simpler casting process with fewer internal bridges to manage. Easier to produce at scale.
3. **Provides less lateral support** — The cylinders are structurally isolated from the surrounding block at the deck level, allowing some lateral movement under high cylinder pressure.

**Visual identification:** Removing the cylinder head reveals coolant passages forming a continuous ring around each cylinder wall up to the deck surface. The cylinders appear "free-floating" relative to the rest of the block.

---

## Performance Implications for the Blacktop

### Naturally Aspirated Use

For stock NA operation, the deck design difference is **irrelevant**. Both closed and open deck blocks handle the Blacktop's rated 200 PS without issues. The FRM (Fiber-Reinforced Metal) cylinder liner coating adds significant inherent wall strength to all H-series blocks, narrowing the practical gap between the two designs for NA use.

**Community consensus:** Multiple forum contributors (motoxxxman on Honda-Tech, cruiserdude on PreludePower) confirm that for NA builds, the deck type does not affect power output or reliability. The difference only becomes meaningful at higher boost levels (> 10 psi) or in competition applications.

### Forced Induction Implications

| Build Level | Closed Deck (1992–1996) | Open Deck (1997–2001) |
|-------------|------------------------|----------------------|
| Stock internals, stock block | 6–8 psi (250–280 HP) | 6–8 psi (250–280 HP)* |
| Stock internals, sleeved | 10–12 psi (300–350 HP) | 8–10 psi (280–320 HP) |
| Built bottom end | 12–18 psi (350–450+ HP) | 10–14 psi (320–400 HP) |

*Open-deck blocks at the high end of the "stock" range often require ARP head studs and MLS head gaskets for reliability.

**Failure mode differences under boost:**

- **Closed deck failures:** Piston ring land failure (first to go, regardless of deck type), connecting rod bearing failure, crankshaft fatigue.
- **Open deck failures:** Cylinder wall cracking at the base (distinctive to open deck), bore distortion / egg-shaping from lateral movement, head gasket blowout from cylinder-to-deck misalignment. These three failure modes are unique to open-deck blocks.

**Key insight from motoxxxman (Honda-Tech, 2,428 posts):** "NA or Turbo, get the closed-deck. Open-deck seems to have a tendency to go out of round as miles accumulate. Closed deck is also better for turbo for obvious reasons."

**Counterpoint from cruiserdude (PreludePower, 5,378 posts):** "People claim that closed deck is better for boost, but you're not gonna make the kind of power levels where that will matter on the stock engine anyway. That is to say, the open deck design will not be a weakness until you reach power levels beyond what the stock pistons and FRM liners can handle."

### Cooling Efficiency

The open-deck design provides demonstrably superior cooling:

- Full coolant contact around the entire upper cylinder wall
- Better heat rejection from combustion chamber edges
- Lower operating temperatures under sustained high-RPM NA operation

This is particularly relevant for the Blacktop because its single-runner intake manifold and 51 mm exhaust system (compared to the Redtop's dual runner and 57 mm) create slightly more restrictive airflow, which can lead to higher exhaust gas temperatures. The improved cooling of the open-deck design partially compensates for this restriction.

---

## The 55 mm Main Journal Upgrade (1998+)

The deck design change coincided with a concurrent structural upgrade: the main journal diameter increased from 50 mm to 55 mm starting in 1998. This suggests Honda's engineers viewed the two changes as complementary:

- **Open deck:** Better cooling, lower cost (front-end of engine)
- **55 mm mains:** Greater bottom-end strength (rear of engine)

The 55 mm main journals provide:
- Larger bearing surface area (19.9 mm → wider bearing width)
- Reduced bearing specific load
- Improved oil film stability at high RPM
- Greater resistance to crankshaft deflection under load

**Important for swap planning:** 50 mm and 55 mm main journal blocks are NOT directly interchangeable with their respective crankshafts. A 1992–1997 block (50 mm mains) requires a 50 mm crank; a 1998+ block (55 mm mains) requires a 55 mm crank. This is a critical consideration when sourcing a replacement or swap block.

---

## Identification Guide: How to Tell Which Deck Your Blacktop Has

### Method 1: Year-Based (Most Reliable for Production Vehicles)

| Year | Deck Type | Main Journals |
|------|-----------|---------------|
| 1992–1996 | Closed deck | 50 mm |
| 1997 | Open deck | 50 mm |
| 1998–2001 | Open deck | 55 mm |

**Caveat:** Gray-market imports may have been assembled from mixed components. Year alone is not 100% reliable for imported engines.

### Method 2: Block Serial Code

| Serial Code Range | Deck Type | Period |
|-------------------|-----------|--------|
| H22A-1000001~ through H22A-1200001~ | Closed deck | 1992–1996 |
| H22A-1250001~ through H22A-1290001~ | Open deck | 1997–2001 |

### Method 3: Physical Inspection (Definitive)

Remove the cylinder head and look at the deck surface:

- **Closed deck:** Solid material bridges the coolant passages around the upper circumference of each cylinder bore.
- **Open deck:** Coolant passages form a continuous ring around each cylinder wall up to the deck surface.

Alternatively, remove the thermostat housing and look down past the water pump:

- **Closed deck:** You will see solid metal rings at the top of each cylinder.
- **Open deck:** You will see coolant passages forming continuous open rings.

---

## Swap and Build Recommendations

### For Stock/NA Swaps

**Either deck type works.** The practical difference is negligible. Choose based on:

- **Price:** 4th gen (closed deck) engines typically cost $300–400 less than 5th gen (open deck) on the used market.
- **Condition:** Older engines have more mileage. A well-maintained 5th gen with lower hours may be preferable to a neglected 4th gen.
- **Cooling preference:** If the recipient vehicle has marginal cooling (e.g., CR-X EF swap), the open deck's superior cooling may be beneficial.

### For Mild Boost (6–8 psi)

**Either deck type works** with proper supporting mods. Use ARP head studs and MLS gasket on open-deck blocks for margin. Monitor oil pressure closely — VTEC solenoid health is critical for both deck types.

### For Serious Boost (10+ psi)

**Closed-deck blocks are strongly preferred.** If using an open-deck block:
1. Sleeve it first (RS Machine, Darton, or Golden Eagle ductile iron sleeves)
2. Use ARP head studs and MLS head gasket
3. Consider block guards as an alternative to sleeving (requires professional installation)

### For Race/High-Horsepower (15+ psi)

**Sleeved block is mandatory** regardless of original deck type. The original deck design matters less once the block is properly prepared. ARP main studs, forged pistons, and upgraded rods are essential.

---

## Community Perspectives and Real-World Evidence

### Honda-Tech Forum Consensus (Thread: "h22a open deck or closed deck?", Apr 2009)

Multiple users confirmed the year-based transition:

- **vinuneuro** (6,619 posts): "H22: 92-96= closed-deck, 97-01= open-deck"
- **MyHotsh** (542 posts): Confirmed his JDM H22A (1992–1996 era) is closed deck, posted photos showing solid material bridges
- **kikih22** (10 posts): "h22a4 obd2 is an open deck and h22a and h22a1 obd1 are close deck"
- **red92si** (716 posts): Provided visual definitions with images from team-integra.net and fototime.com
- **motoxxxman** (2,428 posts): "impossible, all a1's are closed deck. unless someone installed an a4 block that had all the obd1 parts swapped over to it and re-stamped it as an a1"

**Notable outlier:** One user (Jim W) claimed his H22A1 was open deck. motoxxxman responded that this is "impossible" unless someone installed an H22A4 block with OBD1 parts swapped over and re-stamped — indicating that block swapping and restamping do occur in the community.

### PreludePower Forum Discussion (Thread: "Differences between JDM H22A 92-95 and 97-01", Apr 2011)

**cruiserdude** (5,378 posts) provided the most comprehensive breakdown:

1. 4th gen engines have 50 mm main bearings, 5th gen have 55 mm — cranks and blocks are not easily interchangeable
2. Closed deck is better for boost, but open deck has distinct advantage in cooling — the difference doesn't matter until power levels beyond what stock pistons and FRM liners can handle
3. 5th gen JDM motors use OBD2 ECUs but still use OBD1 distributors
4. 5th gen motors appear to have smoother casting than 4th gen; 98+ motors are smoother still
5. Newest 5th gen motors use beehive LMA's (look it up) which are better

**Price observation:** At the time of the thread (2011), 4th gen JDM H22A engines listed for ~$999 while 5th gen listed for ~$1,395 — a $400 premium for the open deck + 55 mm mains combination.

### HondaSwap.com Discussion (Thread: "H22 closed deck?", Nov 2003)

Early confirmation of the closed/open deck distinction:

- **dohcvtec_accord:** "Open deck means that there is a water jacket between the cylinder walls and the block. Pros are better cooling. Cons are weaker cylinder walls. Closed deck means it's solid between the block and the sleeves. Pros and cons are the opposite of open deck."

---

## Engineering Rationale: Why Did Honda Switch?

### 1. Production Cost Reduction

The 5th-generation Prelude (BB6, 1997) was a redesign aimed at maintaining competitiveness against newer rivals. Simplifying the block casting process by switching to open-deck reduced per-unit manufacturing cost — a significant factor for a volume automotive manufacturer.

### 2. Cooling Optimization for OBD2 Applications

The OBD2-era H22A variants had different emissions equipment and calibration compared to OBD1 versions. Higher exhaust gas temperatures from stricter emissions controls could benefit from the improved cooling of an open-deck design. Additionally, the 1997+ engines ran slightly cooler overall due to refined fuel delivery and ignition timing strategies.

### 3. Concurrent Main Journal Upgrade

The deck design change coincided with the main journal diameter increase from 50 mm to 55 mm (starting 1998). The larger main journals provided greater bottom-end strength to compensate for any perceived loss in overall block rigidity from the open-deck transition. This suggests Honda's engineers viewed the two changes as complementary.

### 4. Market Positioning

The 5th-gen Prelude was positioned as a grand tourer rather than a pure sports car. Honda may have judged that the typical owner would not be pursuing high-boost turbo applications, making the open-deck's cooling advantages more valuable than its boost limitations. The stock output remained competitive (200 PS), and the open-deck design is entirely adequate for NA use within the factory power envelope.

---

## Comparison Matrix: Blacktop Closed vs Open Deck

| Parameter | Closed Deck (1992–1996) | Open Deck (1997–2001) |
|-----------|------------------------|----------------------|
| **Lateral cylinder support** | Full circumferential ring at deck | None at deck; coolant ring only |
| **Head gasket seal integrity under boost** | Excellent | Good (NA), Fair (boost > 8 psi) |
| **Cylinder wall rigidity** | High (solid support collar) | Moderate (unsupported upper section) |
| **Cooling efficiency** | Good | Excellent (full coolant contact) |
| **Typical boost limit (stock)** | 10–12 psi safely | 6–8 psi safely |
| **Typical boost limit (sleeved)** | 15–18 psi | 12–15 psi |
| **Main journal diameter** | 50 mm | 50 mm (1997), 55 mm (1998+) |
| **Manufacturing cost** | Higher | Lower |
| **Weight impact** | Slightly heavier | Slightly lighter |
| **Casting quality** | Standard | Smoother (especially 1998+) |
| **Aftermarket support** | More blocks available (older, cheaper) | Fewer blocks, higher price premium |

---

## Notes

### Key Findings

1. **The transition was clean and year-based:** Wikipedia, Honda-Tech measured data, Honda Thomsen, and multiple forum sources all confirm that 1992–1996 H22A Blacktop blocks are closed deck and 1997–2001 blocks are open deck. There is no ambiguity or overlap period.

2. **The timing correlates with the main journal upgrade:** The 1997 H22A4 retained 50 mm main journals (matching the closed-deck predecessors), but 1998+ models switched to 55 mm journals. This suggests the open-deck transition and main journal increase were planned as complementary structural changes.

3. **FRM liners mitigate the open-deck weakness:** The Fiber-Reinforced Metal cylinder liner coating adds significant inherent wall strength to all H-series blocks. This narrows the practical performance gap between open and closed deck compared to blocks without FRM technology.

4. **Community debate exists but consensus is clear:** While some forum contributors argue the difference is negligible for street use, the engineering consensus is that closed deck provides measurably superior lateral support. For NA use, the difference is moot. For boost applications, closed deck is the preferred choice.

5. **No official Honda documentation found:** Honda has never published technical bulletins explaining the deck design change. All conclusions are drawn from cross-referencing community-measured data, engineering principles, and logical inference from the concurrent main journal upgrade.

### Conflicts and Discrepancies

- **Cooling efficiency debate:** Some forum contributors disagree on whether open deck actually cools better in practice. The engineering principle supports open deck having superior cooling (more coolant surface contact), but practical evidence is mixed. The head gasket restricts coolant flow between head and block equally in both designs, which limits the theoretical advantage.
- **Power limit estimates vary:** Different sources cite different boost/power limits for open-deck H22 blocks (250 HP to 350 HP). This variance reflects real-world differences in tuning quality, supporting mods, and individual block condition.
- **"Pistons go before sleeves" claim:** Multiple forum contributors assert that ringland/piston failure precedes cylinder wall failure in open-deck H22s. This is anecdotal evidence from built engines and should be treated as indicative rather than definitive.

### Implications for Building/Modding

- **For NA builds:** Deck design is irrelevant. Both closed and open deck handle stock output (200 PS) with zero concerns. Focus on maintenance quality (oil changes, timing belt service) instead.
- **For mild boost (6–8 psi):** Either deck type works. Use ARP head studs and MLS gasket on open-deck blocks for margin. Monitor oil pressure closely (VTEC solenoid health is critical).
- **For serious boost (10+ psi):** Closed-deck blocks are strongly preferred. If using an open-deck block, sleeve it first. Consider the 55 mm main journal upgrade if swapping blocks between generations.
- **For race/high-horsepower (15+ psi):** Sleeved block is mandatory regardless of original deck type. ARP main studs, forged pistons, and upgraded rods are essential. The original deck design matters less once the block is properly prepared.
- **Swap planning:** When sourcing a replacement or swap H22 block, check the deck type if boost is planned. A 1992–1996 closed-deck block (even with 50 mm mains) may be preferable to a 1998+ open-deck block (with 55 mm mains) for a turbo build, depending on the specific application.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Wikipedia — Honda H engine | Encyclopedia article | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | High — well-sourced, community-edited |
| 2 | Honda Thomsen — H22 documentation | Technical blog | https://hondathomsen.wordpress.com/h22/ | 2026-05-15 | High — comprehensive variant data |
| 3 | Honda-Tech — "h22a open deck or closed deck?" | Community discussion | https://honda-tech.com/forums/honda-prelude-4/h22a-open-deck-closed-deck-2552772/ | 2026-05-15 | Medium-High — extensive debate from experienced builders |
| 4 | Honda-Tech — "JDM H22 Block: How do I know if it is an open or closed system?" | Community discussion | https://honda-tech.com/forums/forced-induction-16/jdm-h22-block-how-do-i-know-if-open-closed-system-3357590/ | 2026-05-15 | Medium — practical identification advice |
| 5 | QWEN.md — Master compiled reference | Compiled reference | /data/h22/QWEN.md | 2026-05-15 | High — compiled from 50+ web sources |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | PreludePower — "Differences between JDM H22A 92-95 and 97-01" | Community forum | https://www.preludepower.com/threads/differences-between-jdm-h22a-92-95-and-97-01.342872/ | 2026-05-15 | High — comprehensive breakdown by experienced builder |
| 2 | Civic Forums — "H-Series Engine Specifications, Swap Guides and FAQ" | Community reference | https://www.civicforums.com/forums/241-engine-performance-modifications/366076-h-series-engine-specifications-swap-guides-faq.html | 2026-05-15 | Medium — specification reference, confirms deck types |
| 3 | HondaSwap — "H22 closed deck?" | Community forum | https://hondaswap.com/threads/h22-closed-deck.25553/ | 2026-05-15 | Medium — early confirmation of deck distinction |
| 4 | mywikimotors — "Honda H22A engine" | Technical database | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | Medium — enthusiast database with variant specs |
| 5 | AV HONDA — "H-Series Engine Specs" | Technical reference | https://devinshondasite.weebly.com/h-series-engine-specs.html | 2026-05-15 | Medium — enthusiast reference with spec tables |

---

## Citations

1. Wikipedia contributors, "Honda H engine," Wikipedia, The Free Encyclopedia. Retrieved 2026-05-15. URL: https://en.wikipedia.org/wiki/Honda_H_engine

2. Honda Thomsen, "H22," Honda Thomsen. Retrieved 2026-05-15. URL: https://hondathomsen.wordpress.com/h22/

3. Honda-Tech community, "h22a open deck or closed deck?," Honda-Tech.com, forum discussion. Retrieved 2026-05-15. URL: https://honda-tech.com/forums/honda-prelude-4/h22a-open-deck-closed-deck-2552772/

4. Honda-Tech community, "JDM H22 Block. How do I know if it is an open or closed system?," Honda-Tech.com, forum discussion. Retrieved 2026-05-15. URL: https://honda-tech.com/forums/forced-induction-16/jdm-h22-block-how-do-i-know-if-open-closed-system-3357590/

5. QWEN.md, "Honda H22 Engine — Exhaustive Technical Documentation," /data/h22/QWEN.md, 2026-05-15. Compiled from 50+ web sources.

6. PreludePower community, "Differences between JDM H22A 92-95 and 97-01," PreludePower.com, 2011. Retrieved 2026-05-15. URL: https://www.preludepower.com/threads/differences-between-jdm-h22a-92-95-and-97-01.342872/

7. Civic Forums community, "H-Series Engine Specifications, Swap Guides and FAQ," CivicForums.com. Retrieved 2026-05-15. URL: https://www.civicforums.com/forums/241-engine-performance-modifications/366076-h-series-engine-specifications-swap-guides-faq.html

8. HondaSwap community, "H22 closed deck?," HondaSwap.com, 2003. Retrieved 2026-05-15. URL: https://hondaswap.com/threads/h22-closed-deck.25553/

9. mywikimotors admin, "Honda H22A engine," mywikimotors.com. Retrieved 2026-05-15. URL: http://mywikimotors.com/honda-h22a/

10. AV HONDA, "H-Series Engine Specs," AV HONDA PARTS/CARS/TECH. Retrieved 2026-05-15. URL: https://devinshondasite.weebly.com/h-series-engine-specs.html

---

## Related Tasks

- **T-073** — General H-series deck designs (companion task, provides definitions)
- **T-074** — H-series main bearing support (50mm→55mm transition)
- **T-151** — H22A Blacktop JDM origin (companion task)
- **T-152** — H22A Blacktop specifications (follow-on)
- **T-157** — H22A Blacktop applications (companion task, already notes deck types in feature matrix)
- **T-161** — H22A Blacktop vs Redtop comparison (follow-on)
- **T-163** — H22A Blacktop modification potential (follow-on)
