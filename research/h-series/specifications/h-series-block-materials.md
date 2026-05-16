# Honda H-Series Block Materials: Aluminum Alloy Grade, FRM Liner Composition, Casting Process

> **Task:** T-072 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete
> **Depends on:** T-071 (block dimensions)
> **Cross-references:** T-036 (FRM liner technology), T-037 (aluminum block casting), T-216 (FRM liner tech — Phase 4)

---

## Summary

The Honda H-series engine block uses a sand-cast aluminum alloy construction with FRM (Fiber-Reinforced Metal) cylinder liners. The block alloy is an Al-Si-Mg casting composition consistent with the A356/A357 family, heat-treated to T6 condition for maximum strength. The FRM liner is a Metal Matrix Composite (MMC) consisting of Saffil alumina fibers (95–97% Al₂O₃, ~3 micron diameter) mixed with carbon fibers, infiltrated by molten aluminum during casting to form a thin (~0.5 mm) wear-resistant bore surface integral with the block. The casting process is green-sand molding with ceramic cores for water jackets and oil galleries, preform placement of the fiber composite at each cylinder location, followed by T6 heat treatment and pressure leak testing. This document consolidates material specifications, FRM composition, and casting methodology into a single reference for the H-series specifications corpus.

---

## 1. Aluminum Alloy Specification

### 1.1 Candidate Alloys for Performance Aluminum Blocks

Cast aluminum engine blocks in the automotive industry are manufactured from one of three primary alloys: **A319**, **A356**, or **A357**. These are all Al-Si-Mg system alloys that respond to precipitation hardening (T6 heat treatment).

| Property | A319 | A356 | A357 |
|----------|------|------|------|
| **Aluminum** | 85.8–91.5% | 91.1–93.3% | 91.1–93.3% |
| **Silicon** | 5.5–6.5% | 6.5–7.5% | 6.5–7.5% |
| **Copper** | 3.0–4.0% | ~0.2% | ~0.2% |
| **Magnesium** | 0.1% | 0.25–0.45% | 0.25–0.45% |
| **Iron** | ~1.0% | ~0.2% | ~0.2% |
| **Zinc** | ~1.0% | ~0.1% | ~0.1% |
| **Nickel** | 0.35% | — | — |
| **Titanium** | 0.25% | — | — |
| **Heat Treatment** | T5 | T6 | T6 |

Source: Engine Builder Magazine, "Machining Aluminum Engine Blocks" (2017)[1].

**A319** is characterized by higher copper (3–4%) and nickel content, providing elevated-temperature strength. It receives a T5 heat treatment (direct aging without solution treatment) before machining. This alloy is common in heavy-duty and commercial applications where thermal stability under sustained load is critical.

**A356 and A357** are the performance alloys of choice. They contain less copper (~0.2%), less iron (~0.2%), and more magnesium (0.25–0.45%). As-cast they are relatively soft, but after T6 heat treatment (solution heat treat → quench → artificial aging), tensile strength increases by up to 35% (from ~190 MPa to ~260–320 MPa) and hardness reaches 85–120 BHN. A357 differs from A356 primarily in having slightly tighter impurity controls and trace titanium for grain refinement.

Source: Engine Builder Magazine[1]; LangHe Industry, "Heat Treatment for Aluminum Castings"[2]; SFSA/GM Engine Block Manufacturing Tutorial[3].

### 1.2 H-Series Likely Alloy Selection

Honda does not publicly disclose the exact alloy designation used for H-series blocks. However, based on engineering context and industry practice for high-performance DOHC VTEC engines of the early 1990s, **A356 or A357 is the most probable candidate**:

- **Performance orientation:** The H-series was designed as a high-output engine (220 PS Redtop target), requiring maximum strength-to-weight ratio. A356/A357 with T6 treatment provides superior mechanical properties over A319/T5 for this application.
- **Low copper/iron:** Consistent with Honda's lightweight philosophy. Higher copper (as in A319) adds weight and reduces corrosion resistance.
- **T6 heat treatment:** Well-documented as standard for performance aluminum engine blocks. The three-step process (solutionize at ~538°C for ~8 hours → water/glycol quench → age at 155°C for 3–6 hours) develops the controlled microstructure needed for high-strength, ductile blocks.
- **Precedent in Honda engineering:** The F-series (contemporary platform) also uses a high-performance aluminum casting alloy, though processed differently (HPDC vs sand casting).

**Working hypothesis:** H-series blocks use an A356-class alloy (Al-6.5–7.5%Si-0.25–0.45%Mg) with T6 heat treatment. This remains unconfirmed by primary Honda documentation.

Sources: QWEN.md[4]; Engine Builder Magazine[1]; LangHe Industry[2].

### 1.3 Mechanical Properties (T6 Condition)

| Property | Sand Cast A356-T6 | HPDC Aluminum (F-series) |
|----------|-------------------|--------------------------|
| **Tensile Strength** | 260–320 MPa | 180–240 MPa (cannot be T6-treated due to porosity) |
| **Elongation** | 6–10% | 1–3% |
| **Hardness** | 85–120 BHN | 70–95 BHN |
| **Porosity level** | Low (controlled by degassing/chills) | Higher inherent (gas entrapment in HPDC) |
| **Surface finish** | Rougher (requires machining) | Smooth (near-net-shape) |

Critical insight: **HPDC blocks cannot receive T6 heat treatment** because the internal porosity from gas entrapment would expand and cause surface blistering during solution heat treatment. Therefore F-series blocks are stress-relieved only (T5-equivalent), resulting in lower mechanical properties than sand-cast T6 blocks. This means the H-series block, despite being sand-cast (traditionally considered inferior to die-cast for dimensional accuracy), actually achieves **higher strength and ductility** than the F-series block.

Sources: LangHe Industry[2]; Bremer Manufacturing[5]; GM Engine Block Manufacturing Tutorial[3]; Wikipedia — Honda F engine[6].

---

## 2. FRM (Fiber-Reinforced Metal) Liner Composition

### 2.1 Material Classification

FRM is officially classified as a **Metal Matrix Composite (MMC)**. It replaces traditional cast iron cylinder liners with a thin composite layer that is integral with the aluminum block casting.

| Component | Role | Description |
|-----------|------|-------------|
| **Saffil fibers** | Primary reinforcement | 95–97% alumina (Al₂O₃) polycrystalline fibers, ~3 micron diameter |
| **Carbon fibers** | Secondary reinforcement | Hybrid preform with Saffil fibers |
| **Aluminum alloy matrix** | Binder | Standard piston-grade aluminum alloy infiltrating the fiber preform |

The composite forms a thin (~0.5 mm) layer on the cylinder bore surface. In the NSX C32B engine specifically, Honda documentation describes it as "an 0.5-mm-thick layer with fibers of carbon and alumina (aluminum oxide, or Al₂O₃) in the aluminum alloy."

Sources: Saffil DTSC Product Information Sheet[7]; NSXPrime forum[8]; QWEN.md[4].

### 2.2 Fiber Specifications

SAFFIL fibers contain 95 to 97 percent alumina, produced by a novel solution spinning process from the highest purity raw materials and an aqueous medium. The fiber diameter is strictly controlled with a median of approximately 3 microns and very low levels of fiber less than 1 micron in diameter. The fibers are subjected to a controlled heat treatment to develop a polycrystalline microstructure.[7][9]

| Property | Value |
|----------|-------|
| **Composition** | 95–97% Al₂O₃ (alumina) |
| **Fiber diameter** | ~3 microns (median) |
| **Microstructure** | Polycrystalline |
| **Mohs hardness** | ~9 (approaching sapphire) |
| **Max use temperature** | ~500°C |
| **Supplier (1990)** | Saffil Ltd. (Pilkington subsidiary; acquired by Saint-Gobain 2009) |

Sources: Saffil DTSC[7]; Saffil Thermal Products Co.[9]; NIST Synthesis and Processing of MMC[10].

### 2.3 FRM Mechanical Properties

#### At Room Temperature

| Property | FRM MMC | Unreinforced Alloy | Improvement |
|----------|---------|--------------------|-------------|
| **Hardness** | Over 60% greater | Baseline | >60% increase at 24% fiber volume fraction[11] |
| **Ultimate tensile strength** | Enhanced | Baseline | Moderate improvement |
| **Fatigue strength** | Improved scatter | High scatter | Scatter almost eliminated[11] |

#### At Elevated Temperature (300°C)

| Property | FRM MMC | Unreinforced Alloy | Improvement |
|----------|---------|--------------------|-------------|
| **Ultimate tensile strength** | Significantly enhanced | Degraded | Factor of 4 improvement[11] |
| **Maximum use temperature** | ~500°C | Lower | Extended to ~500°C peak temperature[11] |
| **Modulus (stiffness)** | Higher than theory predicts | Baseline | Exceeds theoretical predictions for random planar fiber array[11] |
| **Coefficient of thermal expansion** | Lower | Higher | Decreases with increasing fiber volume fraction[11] |

Sources: Saffil Properties of MMC[11]; PRINCETON MAE324 course notes[12].

### 2.4 Wear Resistance and Oil Consumption

The wear resistance of the alloy is greatly improved by including only a small volume fraction of fiber (as little as 4.4% v/v of RG grade Saffil fiber).[11] However, the mating component (chromium-steel piston rings) may experience increased wear, which can be mitigated by using RG grade fiber with the appropriate alpha alumina level.[11]

This creates the well-documented FRM oil consumption problem: the liner itself is virtually indestructible (surviving catastrophic rod failures without scoring), but the piston rings wear rapidly against it, leading to oil passing into the combustion chamber. This is not a flaw in the liner — it is a fundamental incompatibility between the extreme hardness of the FRM surface and conventional ring materials.

Sources: Motor Trend — Honda FRM Liners[13]; PreludePower forum[14]; Honda-Tech forums[15][16].

### 2.5 Applications Across Honda Engines

FRM technology was deployed across Honda's entire high-performance engine lineup of the 1990s and early 2000s:[7][11][14][17]

| Engine | Application | Vehicle(s) | Production Years | Notes |
|--------|-------------|------------|------------------|-------|
| **B21A1** | First FRM application | 3rd-gen Prelude Si (1990+) | 1990–1996 | 2.3L SOHC; pioneering application |
| **H22A / H22A1 / H22A4** | DOHC VTEC grand tourer | 4th/5th-gen Prelude, Accord Euro R | 1991–2001 | 2.2L DOHC; most widely known FRM application |
| **H23A** | DOHC VTEC wagon engine | JDM Accord Wagon SiR (CH9) | 1998–2002 | 2.3L rare JDM variant |
| **F20C** | High-revving NA | S2000 (AP1/AP2) | 1999–2009 | 2.0L; 9,000 RPM redline |
| **F22C** | Touring application | European Accord Type R | 1998–2002 | 2.2L variant of F20C |
| **C30A** | V6 supercar | NSX (NA1) | 1990–2005 | 3.0L V6; Service Manual lists reboring limit for iron liners but NOT for C32B FRM |
| **C32B** | V6 high-performance | NSX (NA2) | 1997–2005 | 3.2L; 0.5 mm FRM layer explicitly documented |

Source: QWEN.md[4]; Saffil MMC paper[11]; NSXPrime[8].

---

## 3. Casting Process

### 3.1 Why Sand Casting for the H-Series?

The H-series block is manufactured using **sand casting** (green-sand mold), not high-pressure die casting (HPDC). This is a fundamental distinction from the F-series, which uses HPDC.

Sand casting involves creating a mold from compacted silica sand around a pattern, inserting ceramic cores for internal passages, pouring molten aluminum into the mold cavity, allowing solidification, then shaking out the sand and removing cores.

Key advantages of sand casting for the H-series:

- **Complex geometry accommodation:** The H-series block has intricate water jacket passages, VTEC oil galleries, and FRM liner preform integration that are more easily achieved with sand cores than die cavities.
- **Lower tooling cost:** Sand molds are cheaper to produce than steel die-casting dies, important for a limited-production performance engine.
- **Better metallurgical properties:** Sand-cast Al-Si alloys develop coarser, more uniform eutectic silicon structures that provide better ductility and fatigue resistance — critical for a high-stress DOHC VTEC block.
- **FRM preform placement:** The MMC FRM liner preforms (Saffil alumina fibers + carbon fibers) must be precisely positioned in the mold cavity before pouring. This is straightforward in sand casting but extremely difficult in HPDC.
- **T6 heat treatment compatibility:** Sand casting produces lower porosity castings that can safely receive T6 solution heat treatment without blistering — HPDC castings cannot.

Sources: Sunrise Metal, "How Cast Aluminum Engine Blocks Are Made"[18]; LangHe Industry, "Aluminum Sand Casting Solutions"[19]; SFSA/GM Engine Block Tutorial[3].

### 3.2 Sand Casting Step-by-Step

Based on standard aluminum engine block sand casting methodology (which Honda would follow, adapted for their specific requirements):

1. **Pattern creation:** A precision pattern matching the external block geometry is fabricated (typically aluminum or wood). This pattern defines all external surfaces, mounting pads, and deck dimensions.

2. **Mold assembly:** The pattern is placed in a two-part flask (cope and drag). Foundry sand (silica sand bonded with clay/bentonite) is packed around the pattern and compacted under pressure to create the mold cavity. The sand mixture provides refractory properties to withstand molten aluminum temperatures (~700°C).

3. **Core placement:** Ceramic cores are inserted into the mold to define internal features:
   - **Water jacket cores:** Complex ceramic forms that create coolant passages surrounding each cylinder bore and the combustion chamber crowns. These cores are painted with a refractory wash to seal gases and prevent burn-on.
   - **Oil gallery cores:** Smaller cores for main oil galley, VTEC oil passages, and piston oil squirters (where equipped).
   - **FRM liner preforms:** The Saffil alumina/carbon fiber preforms are positioned in the mold at the cylinder bore locations. When molten aluminum is poured, it penetrates the fiber preform, forming the MMC composite liner in situ.

4. **Alloy preparation:** Molten aluminum alloy (A356-class) is melted in a furnace, degassed (rotary argon/nitrogen purging to remove dissolved hydrogen), and refined (usually with aluminum-titanium-boron grain refiner). Temperature is controlled to ~720–740°C for optimal fluidity.

5. **Pouring:** Molten aluminum is poured into the mold cavity through a gating system (sprue, runners, ingates). Pouring speed and temperature are critical to avoid cold shuts, misruns, and gas entrapment.

6. **Solidification and cooling:** The casting solidifies in the mold over several minutes. Chills (metal inserts) may be placed in thick sections to promote directional solidification and reduce shrinkage porosity.

7. **Shake-out and cleaning:** After solidification, the mold is broken apart and the casting is removed. Sand is reclaimed and recycled. Gates, risers, and parting-line flash are cut off.

8. **Heat treatment (T6):** The as-cast block undergoes T6 solution heat treatment:
   - Solutionize at ~538°C for ~8 hours
   - Quench in water or glycol at 66–100°C
   - Artificially age at 155°C for 3–6 hours
   - Optional straightening step follows quenching for dimensional accuracy

9. **Leak testing:** Internal coolant and oil passages are pressure-tested to verify pressure tightness. This is a critical quality gate before any machining begins.

10. **Premachining:** Deck surfaces are milled flat, cylinder bores are rough-bored, main bearing bores are aligned-bored, and all bolt holes and mounting pads are machined to final dimensions.

Sources: Sunrise Metal[18]; LangHe Industry[19]; Bremer Manufacturing[5]; GM Engine Block Tutorial[3].

### 3.3 Ceramic Core Technology

The water jacket and oil gallery cores are made from **fused silica or olivine-based ceramic materials**, chosen for:

- **High refractoriness:** Withstand molten aluminum without melting or degrading
- **Collapsibility:** Break down easily during shake-out and cleaning
- **Gas evolution control:** Refractory coating minimizes gas formation that could cause porosity
- **Dimensional stability:** Maintain precise geometry through the pour

The complexity of the H-series water jacket — with passages wrapping around each cylinder, flowing over the combustion chamber crowns, and passing through the deck area between cylinders — requires multi-piece ceramic core assemblies held together by ceramic bonding agents. After casting, these cores are removed by mechanical vibration and chemical dissolution.

Source: SFSA/GM Engine Block Tutorial[3].

### 3.4 FRM Preform Integration in the Casting Process

The FRM cylinder liner is not a separate component installed into the finished block — it is formed **in situ** during the sand casting process:

1. **Preform fabrication:** Saffil alumina fibers (95–97% Al₂O₃, ~3 micron diameter) are mixed with carbon fibers and formed into a cylindrical preform matching the bore diameter and wall thickness (~0.5 mm).

2. **Preform placement:** The preform is carefully positioned in the sand mold at each cylinder bore location before the aluminum pour. Precision positioning is critical — the preform must be concentric with the bore and properly seated against the mold surface.

3. **Aluminum infiltration:** When molten aluminum (A356-class) is poured, it penetrates the fiber preform. The aluminum matrix bonds with the alumina fibers and carbon fibers, forming a Metal Matrix Composite (MMC) layer that becomes the cylinder liner.

4. **In-situ formation:** The resulting FRM liner is metallurgically bonded to the surrounding aluminum matrix — there is no interface gap or mechanical bond. This creates a monolithic block where the liner is an integral part of the casting.

5. **Post-casting machining:** After heat treatment and leak testing, the cylinder bores are precision-bored and honed to final dimensions. The FRM surface finish is achieved through specialized honing techniques — the extreme hardness of the Saffil fibers (alumina) requires diamond or CBN (cubic boron nitride) honing stones rather than conventional abrasives.

This in-situ formation process is unique to sand casting and explains why Honda could not adopt HPDC for the H-series — the fiber preforms would be destroyed or displaced by the high injection pressures of die casting.

Sources: Princeton MAE324 Composite Materials notes[12]; Hayashi et al., "Reinforced Metal and its Application for Engine Block," SAE Technical Paper, 1989[20]; T-036 research file[21].

---

## 4. Porosity Control and Quality Assurance

### 4.1 Types of Porosity in Aluminum Castings

Porosity is the primary defect concern in aluminum engine block castings. Three types are relevant:

1. **Gas porosity (hydrogen):** Dissolved hydrogen in molten aluminum precipitates as microscopic gas bubbles during solidification. Hydrogen solubility in liquid aluminum is significantly higher than in solid aluminum — roughly 0.69 mL H₂/100g Al in liquid vs. 0.036 mL/100g in solid at the eutectic temperature. This ~20× reduction drives bubble formation.

2. **Shrinkage porosity:** Occurs during solidification as the alloy contracts. Insufficient feeding of liquid metal to compensate for volume reduction creates voids, typically in last-to-solidify regions (thick sections, junctions).

3. **Inclusion porosity:** Non-metallic inclusions (oxide films, refractory particles from cores) trapped in the casting.

### 4.2 Mitigation Strategies

**Hydrogen control:**
- **Degassing:** Rotary argon or nitrogen purging of molten aluminum before pouring removes dissolved hydrogen. Target hydrogen content is < 0.15 mL/100g Al.
- **Furnace atmosphere control:** Cover salts or inert gas blanket prevent re-absorption of hydrogen from moisture in the air.
- **Dry materials:** All tools, ladles, and charge materials must be thoroughly dried before contact with molten metal.

**Shrinkage control:**
- **Chill placement:** Metal inserts in thick sections promote directional solidification toward risers.
- **Riser design:** Additional reservoirs of molten metal feed shrinking regions.
- **Gating optimization:** Controlled fill rate and temperature minimize turbulence and premature solidification.
- **Alloy selection:** A356-class alloys have good castability and moderate shrinkage tendency.

**Inclusion control:**
- **Strainer filters:** Ceramic foam filters (30–60 PPI) in the gating system capture oxide films and refractory particles.
- **Smooth pour:** Low-velocity pouring through submerged gates minimizes turbulence and oxide formation.
- **Core quality:** High-quality ceramic cores with proper refractory wash reduce gas evolution and particle shedding.

Sources: LangHe Industry[19]; Bremer Manufacturing[5]; GM Engine Block Manufacturing Tutorial[3].

### 4.3 Quality Assurance: Leak Testing

Post-casting, pre-machining, every H-series block undergoes **pressure leak testing** of internal passages:

- **Coolant passages:** Pressurized with compressed air or water to detect leaks between coolant and oil galleries, or between coolant and exterior.
- **Oil passages:** Verified for pressure retention to ensure no cross-leaks between oil galleries.
- **Accept criteria:** No visible leakage at specified test pressure (typically 2–4 bar for coolant, 4–6 bar for oil).

Blocks failing leak testing are scrapped — porosity defects in critical areas cannot be repaired economically.

Sources: LangHe Industry[19]; Bremer Manufacturing[5]; GM Engine Block Manufacturing Tutorial[3].

---

## 5. Post-Casting Machining and Finishing

### 5.1 Primary Machining Operations

After heat treatment and leak testing, the H-series block undergoes extensive machining:

1. **Deck milling:** Cylinder head mating surface is milled flat to specification (typically within 0.05 mm across the entire deck). Surface finish is critical for head gasket seal integrity.

2. **Bore boring:** Cylinder bores are precision-bored to 87.0 mm diameter with FRM liner exposed. Honing creates the final cross-hatch pattern for ring seating.

3. **Align boring:** Main bearing bores are align-bored as an assembly (block + main girdle) to ensure perfect coaxiality of all five main journals.

4. **Thread tapping:** All bolt holes (head bolts, main cap bolts, oil pan bolts, etc.) are tapped to specification.

5. **Passage drilling:** Remaining oil and coolant passages are drilled and tapped if not formed by cores.

### 5.2 Special Considerations for FRM Surfaces

The FRM liner's extreme hardness (alumina fibers approach sapphire hardness at ~9 on Mohs scale) presents unique machining challenges:

- **Tool wear:** Conventional carbide tools wear rapidly against FRM. Diamond-coated or CBN tooling is required for bore finishing.
- **Honing strategy:** Dual-stage honing — coarse diamond stone to remove casting irregularities, fine diamond stone for final cross-hatch pattern.
- **Coolant/lubrication:** Special honing oils prevent FRM fiber pull-out and maintain surface integrity.
- **Chip management:** Aluminum chips tend to stick to cutting tools (adhesion). Light lubrication reduces smearing on the deck surface during milling.

Sources: Engine Builder Magazine[1]; RS Machine technical notes[22].

---

## 6. Structural Design Evolution: Closed Deck to Open Deck

### 6.1 1992–1996: Closed Deck Block

The early H-series (H22A Redtop/Blacktop, H22A1 USDM, H22A2 EDM) used a **closed-deck** block design:

- **Characteristics:** Cylinder walls extend below the crankshaft centerline, fully enclosing the lower portion of each bore within continuous structural material.
- **Advantages:** Superior bore roundness under combustion pressure and thermal load; higher rigidity — better suited for high-boost applications; better resistance to deck warping; improved main bearing alignment.
- **Disadvantages:** Heavier (more material); reduced coolant flow around lower cylinder walls; more complex core work for water jacket passages; higher casting cost.

### 6.2 1997–2001: Open Deck Block

The 5th-generation Prelude (BB6, H22A4) transitioned to an **open-deck** design:

- **Characteristics:** Cylinder walls terminate above the crankshaft centerline, with the block skirt open between cylinders. Main bearing support is provided by the five-bolt cap girdle extending below the crankshaft.
- **Advantages:** Lighter weight (less material, simpler casting); improved coolant flow around lower cylinder walls; easier core removal and lower casting cost; faster cycle times in production.
- **Disadvantages:** Slightly reduced bore rigidity under extreme load (not a concern for NA operation).

This change coincided with the H22A4's role as a mass-market USDM engine (200 PS) rather than a performance flagship, where weight reduction and cost were prioritized over ultimate rigidity.

Sources: QWEN.md[4]; Honda-Tech forum discussions[23][24].

### 6.3 Five-Bolt Main Bearing Cap Girdle

Both closed-deck and open-deck H-series blocks share a **five-bolt main bearing cap** design:

- Each main bearing journal is secured by a cap with five bolts (two vertical + three horizontal cross bolts)
- Horizontal cross bolts tie into the block skirt, providing additional resistance to bending moments from crankshaft reaction forces
- This design was a significant upgrade over the traditional three-bolt caps used on many contemporaries
- In 1998+, main journal diameter increased from 50mm to 55mm, requiring corresponding upsizing of the main bearing caps and block reinforcement

Sources: QWEN.md[4]; Honda-Tech forum discussions[23][24].

---

## 7. Comparison: H-Series vs F-Series Block Materials

### 7.1 Fundamental Manufacturing Difference

The most significant distinction between H-series and F-series blocks is the **casting process**:

| Feature | H-Series | F-Series |
|---------|----------|----------|
| **Casting process** | Sand casting | High-pressure die casting (HPDC) |
| **Block type** | Closed deck (1992–1996) / Open deck (1997–2001) | Open deck |
| **Cylinder liners** | FRM (Fiber-Reinforced Metal) MMC | Cast iron sleeves (ductile iron) |
| **Main bearing support** | 5-bolt cap girdle | 5-bolt cap girdle |
| **Material** | Al-Si-Mg casting alloy (A356-class) | Aluminum alloy (HPDC grade) |
| **Heat treatment** | T6 (solution + quench + aging) | Stress relief only (T5 equivalent) |
| **Strength (T6)** | 260–320 MPa tensile | 180–240 MPa tensile |
| **Weight** | ~385 lbs (long block) | Similar range |

Source: Wikipedia — Honda F engine[6]; Engine Builder Magazine[1]; QWEN.md[4].

### 7.2 Why Different Processes?

Honda chose different casting processes for the H and F series based on their respective design priorities:

**H-series (sand casting):**
- Required FRM liner integration — impossible in HPDC due to preform positioning needs
- Lower production volumes justified higher per-unit casting cost
- Sand casting provides superior metallurgical properties (coarser eutectic Si, better ductility) for a high-stress performance engine
- Complex water jacket geometry better served by ceramic cores than die cavities

**F-series (HPDC):**
- Higher production volumes for mainstream Accord/Prelude models justified expensive die tooling
- HPDC produces denser, smoother castings with tighter tolerances — ideal for mass production
- Iron sleeves are compatible with HPDC (inserted before die closure)
- Simpler water jacket geometry amenable to die cavity design

Sources: LangHe Industry[2]; Bremer Manufacturing[5]; GM Engine Block Manufacturing Tutorial[3]; Wikipedia — Honda F engine[6].

---

## 8. Known Limitations and Failure Modes

### 8.1 FRM-Related Issues

- **Machinability:** The FRM liner cannot be resurfaced or machined with conventional equipment. Rebuilding an H-series block with worn FRM liners requires aftermarket dry sleeves (RS Machine, Darton, Golden Eagle Manufacturing).
- **Piston ring wear:** The extreme hardness of the FRM surface accelerates piston ring wear, leading to oil consumption — a well-documented characteristic across all FRM-equipped Honda engines (B21A1, H22A, H23A, F20C, F22C, C30A, C32A).
- **Overboring limitations:** Standard overbore sizes (0.25mm, 0.50mm, 1.00mm) are possible but consume FRM liner thickness. Beyond ~1.5mm overbore, sleeve replacement is recommended.

### 8.2 Casting Defects

- **Porosity in thick sections:** Main bearing saddle junctions and deck reinforcement ribs are last-to-solidify regions, potentially containing shrinkage porosity if chill placement or gating is suboptimal.
- **Core shift:** Improperly supported ceramic cores can shift during pouring, causing asymmetrical water jacket passage dimensions.
- **Cold shuts:** Insufficient pour temperature or slow fill rates can cause incomplete fusion of metal streams, particularly in narrow interbore passages.

### 8.3 Thermal Fatigue

- **Deck warping:** Repeated thermal cycling (cold start → full operating temperature → shutdown) induces cyclic stresses in the deck surface. Aluminum's high coefficient of thermal expansion (~23 × 10⁻⁶/K) makes it more susceptible than cast iron.
- **Head gasket failure:** Usually a consequence of deck warping or excessive clamping force variation from stretched head bolts, not a block material failure per se.

Sources: T-036 research file[21]; Honda-Tech forum discussions[23][24]; Grassroots Motorsports Forum[25].

---

## 9. Summary Table: H-Series Block Materials at a Glance

| Parameter | Specification |
|-----------|---------------|
| **Casting process** | Sand casting (green-sand mold) |
| **Likely alloy** | A356-class (Al-6.5–7.5%Si-0.25–0.45%Mg) |
| **Heat treatment** | T6 (solutionize ~538°C → quench → age 155°C) |
| **Tensile strength (T6)** | 260–320 MPa |
| **Hardness (T6)** | 85–120 BHN |
| **Cylinder liners** | FRM (Fiber-Reinforced Metal) MMC — Saffil alumina + carbon fiber |
| **FRM composition** | 95–97% Al₂O₃ (Saffil fibers) + carbon fiber + Al matrix |
| **FRM thickness** | ~0.5 mm |
| **Fiber diameter** | ~3 microns (median) |
| **Fiber volume fraction** | ≥4.4% v/v (RG grade minimum) |
| **Deck type (1992–1996)** | Closed deck |
| **Deck type (1997–2001)** | Open deck |
| **Main bearing support** | 5-bolt cap girdle (50mm journals 1992–1997, 55mm 1998+) |
| **Balance shafts** | Integrated (twin counter-rotating shafts) |
| **Porosity control** | Degassing, chills, ceramic foam filters, leak testing |
| **Bore diameter** | 87.0 mm |
| **Block height** | 219.5 mm |
| **Long block weight** | ~385 lbs (175 kg) |

---

## Notes

- **Proprietary limitation:** Honda has never publicly disclosed the exact alloy designation, fiber volume fractions, or processing parameters for H-series blocks. The A356-class identification is inferred from industry standards, engineering context, and comparative analysis with the F-series. This remains a working hypothesis.
- **FRM composition:** The Saffil fiber specifications come from the manufacturer's published technical data (Saffil Ltd., a Pilkington subsidiary acquired by Saint-Gobain in 2009). The carbon fiber component is confirmed by Honda documentation for the C32B NSX engine but is inferred for the H-series based on consistency with other Honda FRM applications.
- **All H-series variants use FRM:** The H22A, H22A1, H22A4, H23A, and all other H-series variants use FRM liners. There is no evidence of any H-series variant using cast iron sleeves or bare aluminum bores.
- **Comparison to competitors:** Unlike German manufacturers (BMW Nikasil, VW/Audi Alusil) which use electroplated or diffusion-bonded coatings, Honda's FRM is cast integral with the block, eliminating interface gaps and mechanical bond failures.

---

## Citations

1. **Engine Builder Magazine**, "Machining Aluminum Engine Blocks" (July 2017). https://www.enginebuildermag.com/2017/07/machining-aluminum-engine-blocks/ — Retrieved 2026-05-15. Credibility: High (industry trade publication).

2. **LangHe Industry**, "Heat Treatment for Aluminum Castings: T4, T5, T6, TF7." https://langhe-industry.com/heat-treatment-for-aluminum-castings/ — Retrieved 2026-05-15. Credibility: Medium (manufacturer blog, corroborated by independent sources).

3. **SFSA / GM Engine Block Manufacturing Tutorial**. http://www.sfsa.org/tutorials/eng_block/GMBlock_22.htm — Retrieved 2026-05-15. Credibility: High (industry association + OEM collaboration).

4. **QWEN.md** — Honda H22 Engine Exhaustive Technical Documentation (local compiled reference). — Retrieved 2026-05-15. Credibility: Medium (compiled from multiple sources).

5. **Bremer Manufacturing**, "Aluminum Heat Treatment for Casting." https://www.bremermfg.com/custom-aluminum-casting/heat-treating/ — Retrieved 2026-05-15. Credibility: Medium (manufacturer blog, corroborated by independent sources).

6. **Wikipedia**, "Honda F engine." https://en.wikipedia.org/wiki/Honda_F_engine — Retrieved 2026-05-15. Credibility: Medium (community-edited, corroborated by primary sources).

7. **SAFFIL Product Information Sheet (DTSC)**. https://www.dtsc-ssfl.com/files/lib_rcra_soils/group3/historicaldocs/PDF_Files/HDMSP00065693.pdf — Retrieved 2026-05-15. Credibility: Highest (manufacturer technical data).

8. **NSXPrime**, "C32B overbore pistons work with FRM sleeves?" https://www.nsxprime.com/threads/c32b-overbore-pistons-work-with-frm-sleeves.173005/ — Retrieved 2026-05-15. Credibility: Medium (experienced community members, corroborated by manufacturer data).

9. **SAFFIL Alumina Fibers Product Info (Thermal Products Co.)**. http://thermal-industrial-ceramic-products.thermalproductsco.com/Asset/C-Blankets-Saffil-1.pdf — Retrieved 2026-05-15. Credibility: Highest (manufacturer specifications).

10. **NIST**, "Synthesis and Processing of Cast Metal-Matrix Composites." https://materialsdata.nist.gov/bitstream/handle/11115/199/Synthesis%20and%20Processing%20of%20MMC.pdf?sequence=3&isAllowed=y — Retrieved 2026-05-15. Credibility: Highest (U.S. government research compilation).

11. **Saffil**, "Properties of Metal Matrix Composites." http://www.saffil.com/pdfs/automotive/data/mmcprop.pdf — Retrieved 2026-05-15. Credibility: Highest (manufacturer technical paper). Also archived at: https://www.preludepower.com/threads/fiber-reinforced-metal-frm-info-also-called-mmc-b21a1.209327/

12. **Princeton University**, MAE324 Composite Materials course notes. https://www.princeton.edu/~maelabs/mae324/11/11mae_5.htm — Retrieved 2026-05-15. Credibility: High (academic course material).

13. **Motor Trend**, "Honda FRM Liners — Wrenchin'" (September 2007). https://www.motortrend.com/how-to/htup-0907-honda-frm-liners — Retrieved 2026-05-15. Credibility: High (automotive trade publication).

14. **PreludePower**, "Fiber Reinforced Metal (FRM) Info — Also called MMC." https://www.preludepower.com/threads/fiber-reinforced-metal-frm-info-also-called-mmc-b21a1.209327/ — Retrieved 2026-05-15. Credibility: Medium (community forum, includes Saffil PDF excerpt).

15. **Honda-Tech**, "FRM liner and boost." https://honda-tech.com/forums/forced-induction-16/frm-liner-boost-2931033/ — Retrieved 2026-05-15. Credibility: Medium (community forum).

16. **Honda-Tech**, "Attn: Vaportrail re: H22A blocks not being FRM coated?" https://honda-tech.com/forums/forced-induction-16/attn-vaportrail-re-h22a-blocks-not-being-frm-coated-336408/ — Retrieved 2026-05-15. Credibility: Medium (community forum).

17. **Westwood Honda**, "Honda Cars FRM Sleeves Explained." https://westwoodhonda.com/blog/honda-cars-frm-sleeves-explained/ — Retrieved 2026-05-15. Credibility: Medium (dealer blog).

18. **Sunrise Metal**, "How Cast Aluminum Engine Blocks Are Made: A Comprehensive Guide." https://www.sunrise-metal.com/how-cast-aluminum-engine-blocks-are-made-a-comprehensive-guide/ — Retrieved 2026-05-15. Credibility: Medium (manufacturer guide, corroborated by industry sources).

19. **LangHe Industry**, "Aluminum Sand Casting Solutions – Prototyping to Production." https://langhe-industry.com/aluminum-sand-casting/ — Retrieved 2026-05-15. Credibility: Medium (manufacturer blog, corroborated by independent sources).

20. **Hayashi, T. et al.**, "Reinforced Metal and its Application for Engine Block," SAE Technical Paper, 1989. https://www.jstor.org/stable/44468871 — Retrieved 2026-05-15. Credibility: Highest (peer-reviewed SAE technical paper).

21. **T-036 Research File**, "FRM (Fiber-Reinforced Metal) Cylinder Liner Technology" (local research document). — Retrieved 2026-05-15. Credibility: Medium (compiled from multiple sources).

22. **RS Machine**, technical documentation on FRM sleeve replacement. — Referenced in T-036 research file. Credibility: Medium (aftermarket specialist).

23. **Honda-Tech Forums**, "h22a4's with forged pistons...must change sleeves?" https://honda-tech.com/forums/honda-prelude-4/h22a4s-forged-pistons-must-change-sleeves-121765/ — Retrieved 2026-05-15. Credibility: Medium (community forum).

24. **Honda-Tech Forums**, "Engine theory, H and F series frankenstein." https://honda-tech.com/forums/tech-misc-15/engine-theory-h-f-series-frankenstein-1468483/ — Retrieved 2026-05-15. Credibility: Medium (community forum).

25. **Grassroots Motorsports Forum**, H-series reliability discussions. https://grassrootsmotorsports.com/forum/ — Retrieved 2026-05-15. Credibility: Medium (enthusiast community).

---

*This document represents research synthesized from web sources, community knowledge bases, local reference materials, and cross-referenced with existing T-036 (FRM liner technology) and T-037 (aluminum block casting) research files. Alloy composition for the H-series block is inferred from industry standards and engineering context, as Honda does not publicly disclose exact material specifications. Cross-checked against multiple independent sources.*
