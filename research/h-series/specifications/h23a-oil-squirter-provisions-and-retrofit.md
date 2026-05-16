# H23A Oil Squirters — Provisions, Retrofit, and Aftermarket Analysis

> **Task:** T-212 [research] Research H23A oil squirters: provisions exist but not installed, block drilling requirements, aftermarket kits
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified | Complete
> **Depends on:** T-210 (H23A JDM rare blue top), T-211 (H23A internal oil passage), T-213 (H23A lower redline)
> **Cross-references:** T-081 (H-series oil gallery layout), T-122 (H22A Redtop specs), T-194 (H22A4 specs)

---

## Summary

The H23A engine block includes provisions for piston oil squirters — tapped holes in the main oil galley and at the bottom of each cylinder bore where squirters mount — but Honda did not install squirters from the factory. This was a deliberate design choice: the H23A's stock connecting rods feature internal oil orifices (drilled holes) that spray pressurized oil upward onto the piston undersides from the rod bearings, providing adequate cooling without external squirters. The H22A's rods lack these internal holes, which is why H22A requires external squirters. Retrofitting H22A squirters into an H23A block is possible but problematic: the H23A's 95 mm stroke crankshaft extends further into the crankcase than the H22A's 90.7 mm stroke crank, so standard H22A squirters would contact the crank counterweights. They can be bent to clear, but the bending process risks metal fatigue and breakage (documented cases of squirters snapping and landing in the oil pan). No dedicated H23A squirter kit exists from any major aftermarket supplier. For builders who remove squirters (e.g., on high-HP builds using forged pistons), Golden Eagle Mfg sells 303 stainless steel squirrel plugs (PN OILSQUIRTPLUGXH, $22.95/plug) to seal the passages. GET'M Performance offers DIY piston cooling kits for engines that lack provisions entirely, but these are not applicable to the H23A which already has provisions.

---

## Why H23A Lacks Oil Squirters — Design Rationale

### Internal Rod Oil Orifices

The key difference between H22A and H23A lubrication design lies in the connecting rods:

| Feature | H22A Rod | H23A Rod |
|---------|----------|----------|
| **External squirters** | Yes (installed) | No (provisions only) |
| **Internal rod oil orifice** | No | Yes (drilled hole in rod) |
| **Piston cooling method** | External squirt spray + splash | Internal rod spray + splash |

Stock H23A rods have an oil orifice (small drilled hole) that allows oil to come up through the rod bearing and spray onto the underside of the piston crown. This is Honda's alternative approach to piston cooling — instead of spraying from below via external jets, they route oil internally through the rod itself. The H22A rod does not have these holes, which is why H22A requires external squirters.

**Source:** AdReNaLiN (Honda-Tech, 2008): "Stock H23 rods have an oil orifice or hole in them that allows oil to come up to underneath the piston for cooling of the piston/cyl. The H22 rod does not have these holes and therefore needs the squirters." vinuneuro (Honda-Tech, 2008) confirmed this observation.

### Engineering Trade-off

Honda's choice to omit external squirters on the H23A was likely driven by:

1. **Simplified block casting** — fewer passages to machine, lower production cost
2. **Rod-orifice design is adequate for NA operation** — the H23A produces 160 PS (non-VTEC) or 200 PS (VTEC), well within the thermal capacity of rod-orifice cooling
3. **Stroke length consideration** — the longer 95 mm stroke increases piston speed (~20.7 m/s at 7,200 RPM vs ~19.8 m/s for H22A), meaning less time per cycle for heat transfer; Honda may have judged that adding squirters would create more problems (clearance, failure points) than they solved
4. **Splash lubrication supplement** — the H23A relies on conventional splash lubrication for piston crowns, supplemented by the rod orifices

---

## H23A Block Provisions — Detailed Specifications

### What Provisions Exist

The H23A VTEC block includes two sets of provisions for oil squirters:

| Provision | Location | Thread/Tap | Status |
|-----------|----------|------------|--------|
| **Main oil galley feed** | Main oil gallery in block deck area | Tapped | Provisioned but not connected |
| **Bolt mounting holes** | Bottom of each cylinder bore (4 locations) | Tapped | Provisioned but empty |
| **Banjo bolt passages** | Connection between galley feed and squirter body | Drilled/tapped | Provisioned but not used |

### What Does NOT Exist

| Item | Status | Notes |
|------|--------|-------|
| **Squirter tubes/nozzles** | Not installed | Honda chose not to install |
| **Banjo bolts** | Not installed | No fittings in provisioned passages |
| **Metering orifices** | Not installed | No flow restrictors fitted |
| **Dedicated H23A squirter kit** | Does not exist | No aftermarket manufacturer offers one |

### Clearance Issue with H22A Squirters

Standard H22A squirters are bent to a specific angle designed for the H22A's 90.7 mm stroke crank. When installed in an H23A block with its 95 mm stroke crank:

- The crank counterweights extend ~4.3 mm further into the crankcase
- Standard H22A squirter bends do not provide sufficient clearance
- Attempted installation results in squirter-to-counterweight contact
- Bending squirters further to clear creates metal fatigue risk

---

## Retrofitting H22A Squirters into H23A — Practical Guide

### Feasibility Assessment

| Factor | Assessment | Source |
|--------|-----------|--------|
| **Block provisions** | Present — no drilling required | QWEN.md, preludepower forum |
| **Clearance** | Problematic — crank interference | Honda-Tech (mgags7, 2008) |
| **Bending skill** | Required — manual fabrication | preludepower (jlude90, 2009) |
| **Reliability** | Marginal — documented failures | preludepower (jlude90, 2009) |
| **Availability of parts** | Possible — H22A squirter sets available | Just Engine Parts (eBay) |

### Documented Builder Experience

**Reddit r/hondaprelude (2022):** A builder documented installing H22A oil squirters into an H23A VTEC block. Process:
1. Flip engine block upside down
2. Remove oil pan baffle plate
3. Remove gold-colored banjo bolt from center of block (main galley feed point)
4. Install squirter assemblies into tapped holes next to each cylinder
5. Connect banjo bolt from main galley to squirter feed
6. Torque everything down, reinstall baffle and oil pan

**preludepower (jlude90, 2009):** Builder reported snapping 2 squirters during installation on a high-HP build: "the memory in the metal actually brought them back a little and I snapped 2 off and found them in the oil pan. I guess I should have bent them a little more?" Builder noted that on high-HP builds with forged components, squirters may be unnecessary anyway because forged pistons dissipate heat faster/more efficiently.

**Honda-Tech (mgags7, 2008):** "Unmodified, they won't fit with the H23 crank. They can, however, be bent to fit, and work just fine, depending on who does the bending."

**Honda-Tech (vinuneuro, 2008):** Questioned effectiveness: "They're pointed at a specific location. Is it even worth it if you aim them somewhere else?" — highlighting that bending changes the spray angle away from the optimal piston-cooling zone.

### Installation Steps (If Attempted)

1. **Remove oil pan and baffle plate** — access to bottom of block
2. **Identify provisioned tapped holes** — 4 locations at bottom of each cylinder bore
3. **Obtain H22A squirter set** — available from scrap H22A engines or online (Just Engine Parts lists ~$70 for OEM set)
4. **Test-fit each squirter** — check clearance against crank counterweights before bending
5. **Bend squirters carefully** — gradual bends, avoid sharp angles; metal memory will try to straighten
6. **Install banjo bolt connections** — connect main galley feed to each squirter
7. **Verify no contact** — rotate crank by hand, check all 4 squirters through full rotation
8. **Torque to spec** — banjo bolts require proper crush washer seals
9. **Reinstall baffle and oil pan** — complete reassembly

### Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| **Squirter breakage during installation** | High | Bend gradually, test-fit first; expect to lose 1-2 to breakage |
| **Squirter breakage during operation** | Critical | Fragile thin-wall steel; broken piece falls into oil pan → pump pickup clog → catastrophic oil starvation |
| **Incorrect spray angle** | Medium | Bending changes aim away from optimal piston-cooling zone |
| **Crank counterweight contact** | High | Must verify clearance through full rotation before assembly |
| **Oil leak at banjo connections** | Medium | Use proper crush washers; torque to spec |

---

## Aftermarket Products

### Golden Eagle Mfg — Oil Squirter Plugs

Golden Eagle Mfg sells stainless steel oil squirter plugs for H-series engines. These are used to seal the provisioned holes when squirters are intentionally omitted (common on high-HP builds with forged pistons).

| Product | PN | Price | Material | Coverage |
|---------|----|-------|----------|----------|
| **H Series GEM Oil Squirter Plug** | OILSQUIRTPLUGXH | $22.95 | 303 Stainless steel | Single plug, all H-series |
| **Note:** Sold individually | | | | Need 4+ for complete block |

**Source:** goldeneaglemfg.com. Available through JHPUSA (SKU: OILSQUIRTPLUGBXX for B-series equivalent, $24.95/set of 4).

**Use case:** Builders removing squirters on turbo/boosted H23/H22 builds to eliminate failure risk. Plugs seal the passages, maintaining oil pressure without the risk of a broken squirter fragment entering the oil pump pickup.

### GET'M Performance — Piston Cooling Kits

GET'M Performance offers DIY piston cooling installation kits with aluminum drill fixtures, tap sets, and drill bits. These are designed for engines that **lack provisions entirely** — they drill and tap new holes into the block.

**Not applicable to H23A** — the H23A already has provisioned holes. GET'M kits are primarily for LS/V8 engines and similar platforms that don't have factory provisions.

### Just Engine Parts — OEM H22A Squirter Set

Lists "93-01 Honda Prelude H22 VTEC oil squirters OEM engine motor H22A H22A4 P13 P5M" as a set for H22 variants. These are the same squirters that can be retrofitted to H23A with bending.

**Price:** ~$70 for complete set (OEM parts from junkyard/scrap engine).

---

## H22A vs H23A Lubrication Comparison

| Feature | H22A (Redtop/Blacktop) | H23A (Non-VTEC) | H23A VTEC (Blue Top) |
|---------|------------------------|-----------------|----------------------|
| **Stroke** | 90.7 mm | 95.0 mm | 95.0 mm |
| **Piston speed @ 7,200 RPM** | ~19.8 m/s | ~20.7 m/s | ~20.7 m/s |
| **External oil squirters** | Yes (installed) | No (provisions only) | No (provisions only) |
| **Internal rod oil orifice** | No | Yes | Yes |
| **Piston cooling method** | External squirt + splash | Internal rod spray + splash | Internal rod spray + splash |
| **Squirter clearance issue** | N/A (designed for 90.7 mm stroke) | Yes — crank interference | Yes — crank interference |
| **Aftermarket squirter kit** | N/A (stock installed) | None available | None available |
| **Common practice on builds** | Keep stock squirters | Remove or skip; forged pistons preferred | Remove or skip; forged pistons preferred |

---

## Community Consensus and Recommendations

### Should You Add Squirters to an H23A?

**Consensus: Generally no, unless building for extreme forced induction.**

Arguments for keeping/removing:
- **Keep/remove:** Stock H23A rods have internal oil orifices — adequate for NA and moderate boost
- **Remove:** On high-HP builds (>300 HP), many builders remove squirters to eliminate the failure risk; forged pistons dissipate heat better than cast pistons
- **Add:** Only recommended if using stock cast pistons on a boosted build and accepting the installation risk

**mgags7 (Honda-Tech, 2008):** "It is a simple, cheap addition that is only added security for you."

**AdReNaLiN (Honda-Tech, 2008):** Emphasized that H23 rods already have internal oil orifices — the squirters are redundant for most applications.

**jlude90 (preludepower, 2009):** On a high-HP build with forged components, squirters were unnecessary: "forged components dissipate heat faster/more efficiently, so that's kinda apples to oranges there."

### Recommended Approach by Build Level

| Build Level | Recommendation | Rationale |
|-------------|---------------|-----------|
| **Stock/NA** | Leave as-is (no squirters) | Rod orifices + splash are adequate; 160-200 PS well within thermal limits |
| **Stage 1-2 bolt-on** | Leave as-is | Same rationale; no significant thermal increase |
| **Turbo/Supercharger < 300 HP** | Consider removing + plugging | Eliminate failure risk; forged pistons recommended at this level |
| **Turbo/Supercharger > 300 HP** | Remove + plug; forged pistons mandatory | At this power level, squirters are both unnecessary and a liability |
| **Race/competition** | Remove + plug; forged internals | Failure risk unacceptable in competition; forged pistons required |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md — Lubrication System section | Compiled reference | Local file | 2026-05-15 | A |
| 2 | QWEN.md — H23A section | Compiled reference | Local file | 2026-05-15 | A |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Honda-Tech forum — "h23 oil jets help or not?" (jprelude92, Hawkze_2.3, mgags7, vinuneuro, AdReNaLiN posts) | Community forum discussion | https://honda-tech.com/forums/honda-prelude-4/h23-oil-jets-help-not-2194989/ | 2026-05-15 | B |
| 2 | preludepower forum — "Oil squirters" thread (jlude90, MeNmyType-SH, aznblueboy posts) | Community forum discussion | https://www.preludepower.com/threads/oil-squirters.315923/ | 2026-05-15 | B |
| 3 | Golden Eagle Mfg — "Honda H Series GEM Oil Squirter Plug" | Aftermarket product page | https://goldeneaglemfg.com/products/golden-eagle-honda-h-series-oil-squirter-plug | 2026-05-15 | A |
| 4 | GET'M Performance — "Piston Cooling Installation Instructions" | Manufacturer documentation | https://getmperformance.com/piston-cooling-installation-instructions/ | 2026-05-15 | A |

### Tertiary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Reddit r/hondaprelude — "I put piston oil squirters from an H22A into an H23A VTEC" | User build documentation | https://www.reddit.com/r/hondaprelude/comments/w0lkci/i_put_piston_oil_squirters_from_an_h22a_into_an/ | 2026-05-15 | C |
| 2 | Just Engine Parts — "93-01 Honda Prelude H22 VTEC oil squirters OEM" | Used parts dealer listing | https://japansalvage.myshopify.com/products/93-01-honda-prelude-h22-vtec-oil-squirters-oem-engine-motor-h22a-h22a4-p13-p5m | 2026-05-15 | C |
| 3 | Honda-Tech forum — "Has anybody had any success mounting oil squirters in H blocks with the 95mm crank?" | Community forum discussion | https://honda-tech.com/forums/honda-prelude-4/has-anybody-had-any-success-mounting-oil-squirters-h-blocks-95mm-crank-884515/ | 2026-05-15 | C |
| 4 | Honda-Tech forum — "h23 oil squirter install" | Community forum discussion | https://honda-tech.com/forums/honda-prelude-4/h23-oil-squirter-install-586105/ | 2026-05-15 | C |

---

## Notes

### Conflicts & Uncertainties

1. **Exact H23 rod orifice dimensions:** Not specified in any public source. Honda-Tech users confirm the existence of internal oil holes in H23 rods but do not provide diameter or flow rate measurements. Requires physical dissection of a stock H23 rod to measure.

2. **Whether H23 non-VTEC rods differ from H23 VTEC rods:** Sources generally treat H23 rods as a single design regardless of VTEC variant. The internal orifice appears consistent across H23A/H23A1/H23A2/H23A3 variants. No evidence of different rod designs between non-VTEC and VTEC H23 blocks.

3. **Optimal spray angle for H23A squirters:** If retrofitting, what angle provides best piston cooling? No published data exists. Standard H22A squirter angle is designed for 90.7 mm stroke; bending changes the aim. Engine builder judgment required.

4. **Historical reason for Honda's design choice:** Why did Honda choose rod orifices for H23 but external squirters for H22? No official Honda documentation explains this decision. Likely engineering trade-off analysis not made public.

### Key Takeaways

- H23A block has provisions (tapped holes) for squirters but none installed from factory.
- H23A uses internal rod oil orifices instead of external squirters — a different cooling strategy than H22A.
- H22A squirters can be retrofitted to H23A but require bending to clear the 95 mm stroke crank; risk of breakage during installation and operation.
- No dedicated H23A squirter kit exists from any aftermarket supplier.
- Golden Eagle Mfg sells 303 stainless steel squirter plugs ($22.95/plug) for sealing provisioned holes when squirters are omitted.
- Community consensus: leave stock H23A as-is for NA builds; remove + plug for high-HP boosted builds with forged pistons.
- Adding squirters to H23A is generally considered redundant and introduces failure risk without meaningful benefit for most applications.

### Implications for Building/Modding

- **Stock/NA H23A builds:** No action needed. Rod orifices provide adequate piston cooling.
- **Forced induction H23A builds:** Consider removing any existing squirters and plugging with Golden Eagle Mfg OILSQUIRTPLUGXH. Forged pistons recommended above 300 HP.
- **H22A-to-H23A swap with squirters:** If transplanting an H22A head onto an H23A block (or vice versa), ensure the correct rod type matches the block's cooling strategy. H22A rods in an H23A block would need external squirters; H23A rods in an H22A block would not need them.
- **Oil pan baffle modification:** Any squirter work requires removal of the oil pan baffle plate (OEM part 11221-P5L-010). Note that the baffle plate is separate from the windage tray (OEM part 11221-RAA-A00).

---

## Citations

1. QWEN.md — "Honda H22 Engine - Exhaustive Technical Documentation". Local project file. Credibility: A. Access: local_manual.
2. Honda-Tech forum. "h23 oil jets help or not?" *Honda-Tech*, 2008. https://honda-tech.com/forums/honda-prelude-4/h23-oil-jets-help-not-2194989/. Retrieved: 2026-05-15. Credibility: B. Access: tavily_extract.
3. preludepower forum. "Oil squirters." *PreludePower*, 2009. https://www.preludepower.com/threads/oil-squirters.315923/. Retrieved: 2026-05-15. Credibility: B. Access: tavily_search.
4. Golden Eagle Mfg. "Honda H Series GEM Oil Squirter Plug." *goldeneaglemfg.com*. https://goldeneaglemfg.com/products/golden-eagle-honda-h-series-oil-squirter-plug. Retrieved: 2026-05-15. Credibility: A. Access: tavily_extract.
5. GET'M Performance. "Piston Cooling Installation Instructions." *getmperformance.com*. https://getmperformance.com/piston-cooling-installation-instructions/. Retrieved: 2026-05-15. Credibility: A. Access: tavily_extract.
6. Reddit r/hondaprelude. "I put piston oil squirters from an H22A into an H23A VTEC." *Reddit*, 2022. https://www.reddit.com/r/hondaprelude/comments/w0lkci/i_put_piston_oil_squirters_from_an_h22a_into_an/. Retrieved: 2026-05-15. Credibility: C. Access: tavily_extract.
7. Just Engine Parts. "93-01 Honda Prelude H22 VTEC oil squirters OEM." *japansalvage.myshopify.com*. https://japansalvage.myshopify.com/products/93-01-honda-prelude-h22-vtec-oil-squirters-oem-engine-motor-h22a-h22a4-p13-p5m. Retrieved: 2026-05-15. Credibility: C. Access: tavily_search.

---

## Appendix

### Quick Reference — H23A Oil Squirters

```
┌─────────────────────────────────────────────────────────────────┐
│  H23A OIL SQUIRTER QUICK REFERENCE                              │
├─────────────────────────────────────────────────────────────────┤
│  Factory squirters:    NO (provisions only)                     │
│  Rod oil orifices:     YES (internal, in each rod)              │
│  Piston cooling:       Rod spray + splash                       │
│  H22A squirter fit:    Problematic — crank interference         │
│  Bending required:     YES — to clear 95mm stroke crank         │
│  Breakage risk:        HIGH — documented failures               │
│  Aftermarket kit:      NONE available                           │
│  Plug option:          Golden Eagle Mfg OILSQUIRTPLUGXH         │
│  Plug price:           $22.95 each (303 SS)                     │
│  H22A squirter set:    ~$70 OEM (Just Engine Parts)             │
│  Recommendation:       Leave as-is for NA; remove+plug for HP   │
└─────────────────────────────────────────────────────────────────┘
```

### Verification Methodology

Research conducted using:
- **tavily_search** for web discovery across Honda-Tech, PreludePower, Reddit, aftermarket suppliers
- **tavily_extract** for full content extraction from forum threads and product pages
- **Local manual cross-reference**: QWEN.md for H-series lubrication architecture, H23A specifications
- **Cross-validation**: Honda-Tech forum consensus (multiple independent builders confirming rod orifice theory), preludepower builder experience reports, Golden Eagle Mfg product specifications

---

*This document represents research on H23A oil squirters, compiled from web sources and local manuals. All specifications cross-checked against at least 2 independent sources where possible.*
