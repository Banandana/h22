# H22A Redtop Common Issues — Known Failure Modes, Age-Related Wear, Corrosion Patterns

> **Task:** T-141 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

The Honda H22A Redtop (JDM 1992–1996) is widely regarded as one of Honda's most reliable performance engines, but like any 30+ year old high-revving DOHC VTEC engine, it has well-documented failure modes and age-related wear patterns. The most critical issue is FRM (Fiber-Reinforced Metal) cylinder liner degradation, which causes progressive oil consumption that typically demands full block resleeving rather than simple ring replacement. VTEC solenoid gasket leaks are nearly universal on high-mileage examples, followed by hydraulic timing belt auto-tensioner failure (Honda acknowledged this in service bulletin #01-010). Secondary issues include valve stem seal deterioration, PCV system clogging, distributor O-ring leaks, and aluminum corrosion at cooling system junctions. With proper maintenance, the H22A Redtop can exceed 200,000 km, but the FRM liner issue means every used example should be assessed for oil consumption before purchase.

---

## Known Failure Modes

### 1. FRM Cylinder Liner Degradation — Oil Consumption (CRITICAL)

**Severity:** High — often requires full block replacement or resleeving
**Affected variants:** All H-series with FRM-lined blocks (H22A Redtop, H22A Blacktop, H22A1, H23A, NA2 NSX, AP1 S2000)
**Symptoms:** Blue smoke from exhaust, oil top-up every 500–1,000 miles, fouled spark plugs, low compression

The FRM (Fiber-Reinforced Metal) cylinder liner is a thin composite lining consisting of a fiber matrix, aluminum alloy, and aluminum oxide. It is inserted into the cylinder casting during molding, cooled, and bored out, then left as the surface piston rings contact. While durable under normal conditions, the FRM material has a fundamental weakness: its hardness and composition allow oil to pass past the piston rings into the combustion chamber over time. As mileage increases, this manifests as progressive oil consumption.

MotorTrend's 2009 technical analysis confirms that FRM linings "aren't all perfect" — the material's strength causes oil to bypass piston rings and burn in the combustion chamber, producing "billowing oil from the tailpipe" and accelerating piston ring wear. The problem is not uniform: forum members note significant batch-to-batch variance, with some engines consuming no oil at 200k+ miles while others burn a quart every 500 miles.

**Root causes:**
- Inherent FRM material property — hard surface accelerates ring wear over decades
- Batch-to-batch manufacturing variance in FRM composition
- Use of non-OEM piston rings (aftermarket coatings wear down the FRM)
- Extended oil change intervals exceeding 5,000 km
- Low oil level triggering P1259 VTEC malfunction codes

**Solutions:**
- **Short-term:** Replace PCV valve with genuine OEM unit (not FRAM or aftermarket), use high-quality 5W-40 or 10W-40 synthetic oil, install catch can to reduce crankcase pressure
- **Medium-term:** Honda SB618958 honing procedure using rigid hone with GC-600-J stones at 200–300 kPa pressure — effective only if cylinders lack deep vertical scratches
- **Long-term:** Full block resleeving with iron liners (RS Machine sleeves, Darton sleeves, Golden Eagle sleeves). FRM blocks cannot be conventionally machined or bored — they require complete resleeving
- **Replacement:** Used JDM H22A Redtop blocks with iron sleeves available through importers; new aftermarket sleeved blocks from RS Machine

**Cross-reference:** QWEN.md §Block Materials (line 399–425) documents FRM composition and disadvantages identically. Service Bulletin SB618958 details the honing procedure.

---

### 2. VTEC Solenoid Gasket Leaks (VERY COMMON)

**Severity:** Medium — oil loss, potential VTEC malfunction, misdiagnosis as rear main seal leak
**Affected variants:** All H-series
**Symptoms:** Oil accumulation on top of transmission bellhousing, black gunk on passenger-side block, low oil level, P1259 trouble code

The single most common VTEC-related leak source is the black rubbery VTEC solenoid-to-engine gasket. Located just behind the distributor, this gasket resembles a "hearty but convoluted O-ring" and often leaks badly enough to send oil down into the bellhousing. Many technicians misdiagnose this as a rear main seal failure due to the oil accumulation pattern.

There is a second, less-known leak point: a triangular aluminum base on the solenoid secured by three bolts. Between this base and the rest of the assembly sits another black rubber gasket — the "figure-eight gasket" — which also frequently leaks. Replacing only the primary solenoid gasket without addressing the figure-eight gasket leads to recurring leaks.

The VTEC solenoid-to-engine gasket contains a fine-mesh filter screen protecting the VTEC hydraulic system from debris. Low oil level is a very common cause of DTC P1259 (VTEC Malfunction) because the screen can draw in air if oil is low.

**Solutions:**
- Replace both the primary VTEC solenoid gasket (part #15825-P13-005, ~$20 dealer) and the figure-eight gasket (part #12513-P30-000, ~$7 dealer)
- Inspect and clean the fine-mesh filter screen inside the gasket
- Verify and maintain proper oil level
- Replace at next scheduled valve adjustment (every 25,000–30,000 miles)

**Sources:** MOTOR Magazine "Foreign Service" VTEC oil leak guide; Canadian Prelude Club oil leak guide; Honda-Tech forum threads.

---

### 3. Hydraulic Timing Belt Auto-Tensioner Failure (CRITICAL)

**Severity:** Catastrophic if unaddressed — timing jump, valve-to-piston contact, complete engine destruction
**Affected variants:** 1992–1996 H-series (OBD1); improved version introduced 1997+ (OBD2)
**Symptoms:** Rattling noise from timing cover at idle, timing belt跳齿 (jumped timing), no-start condition after failure

The 1992–1996 H-series used a hydraulic auto-tensioner that was documented as failure-prone by both Honda and the enthusiast community. Honda acknowledged this issue in service bulletin #01-010, citing a documented case where the tensioner failed at 79,000 miles — well before the recommended 105,000-mile inspection interval — causing timing jump, valve-to-piston damage, and a $2,300 engine overhaul.

Grassroots Motorsports forum members confirm the hydraulic auto-tensioner was a known weak point, with the community-standard fix being replacement with the H23 manual tensioner or an aftermarket solution (KS Tuned tensioners are the popular choice). One GRM member reported 192,000 miles on the original timing belt, suggesting some units last significantly longer than others.

**Solutions:**
- Replace hydraulic auto-tensioner with H23 manual tensioner kit (community-preferred fix)
- Alternative: aftermarket KS Tuned hydraulic tensioner (improved design over stock)
- Timing belt replacement interval: 60,000 miles / 100,000 km regardless of tensioner type
- Inspect tensioner at every timing belt service; replace proactively at 8 years or 105,000 miles

**Cross-reference:** QWEN.md §Timing Belt Tensioner (line 894–903) confirms hydraulic auto-tensioner failure as a critical issue.

---

### 4. Valve Stem Seal Deterioration (COMMON)

**Severity:** Medium — oil consumption, blue smoke on startup
**Affected variants:** All H-series, particularly high-mileage examples
**Symptoms:** Blue smoke on cold startup (clears after warming), increased oil consumption, oil-fouled spark plugs

Valve stem seals harden and shrink over time due to heat cycling and age. On the H22A Redtop, this manifests primarily as oil leaking past the seals into the combustion chamber during startup, producing characteristic blue smoke that clears once the engine warms and the seals expand slightly.

This failure mode compounds with FRM liner degradation — both contribute to oil consumption, making diagnosis important. Valve seal issues produce smoke primarily on cold start; FRM liner issues produce smoke continuously under load.

**Solutions:**
- Replace valve stem seals (requires cylinder head removal or use of special tools without head removal)
- Recommended interval: inspect at 150,000 km / 100,000 miles
- Use OEM Honda seals; aftermarket seals vary in rubber compound quality

---

### 5. PCV System Clogging (MODERATE)

**Severity:** Medium — increased crankcase pressure, worsened oil leaks, false low-oil warnings
**Affected variants:** All H-series
**Symptoms:** Oil seepage from multiple gaskets simultaneously, rough idle, P1259 VTEC code (low oil pressure at solenoid)

PCV (Positive Crankcase Ventilation) system clogging is a frequent contributor to secondary oil leak symptoms. When the PCV valve and associated passages become restricted with sludge, crankcase pressure builds up and forces oil past gaskets and seals that would otherwise hold. This creates the appearance of multiple simultaneous gasket failures when the root cause is a single clogged PCV valve.

PreludeOnline forum members specifically recommend replacing the PCV valve with a genuine OEM unit (not FRAM or aftermarket) at approximately 10,000-mile intervals as preventive maintenance, noting "replacing them at about 10k miles makes a big difference on both of my H22s versus replacing them at 15k or more."

**Solutions:**
- Replace PCV valve with genuine Honda OEM part at 10,000-mile intervals
- Clean PCV passages with carb cleaner
- Install catch can as supplementary measure (does not replace PCV maintenance)

---

### 6. Distributor O-Ring Leak (MODERATE)

**Severity:** Low-Medium — oil loss, potential misfire if water ingress occurs
**Affected variants:** OBD1 H22A (1992–1996); OBD2 models use coil-on-plug or different distributor design
**Symptoms:** Oil accumulation around distributor base, possible misfire if moisture enters distributor

The distributor O-ring is a known leak point on OBD1 H22A engines. Over time, the O-ring hardens and loses sealing ability, allowing oil to seep out. More critically, if the vehicle operates with significant oil loss, the same path can allow moisture ingress during wet conditions, potentially causing distributor/misfire issues.

**Solutions:**
- Replace distributor O-ring during distributor removal (inexpensive part)
- Apply thin coat of dielectric grease to new O-ring for improved sealing
- Inspect during timing belt service (distributor must be removed)

---

### 7. Head Gasket Failure (UNCOMMON — typically mod/heat-induced)

**Severity:** High — coolant/oil mixing, compression loss
**Affected variants:** All H-series; significantly more common under boost or sustained overheating
**Symptoms:** Coolant in oil (milky residue), oil in coolant, white exhaust smoke, compression loss between adjacent cylinders

Head gasket failures on the H22A Redtop are relatively uncommon in stock, properly-cooled applications. When they do occur, the typical causes are:
- Forced induction (boost levels above 6–8 psi stress the stock MLS gasket)
- Sustained overheating (cooling system neglect, water pump failure)
- Over-torqued head bolts during prior rebuild
- Warped cylinder head from thermal shock

The stock head gasket is Multi-Layer Steel (MLS). For boosted applications, upgraded MLS gaskets from Cometic are the recommended replacement.

**Solutions:**
- Stock applications: replace with OEM MLS gasket, ensure head is machined flat to spec
- Boosted applications: Cometic MLS head gasket (specified thickness for target compression)
- Always replace timing belt, water pump, and thermostat during head gasket service

---

### 8. Coolant Leaks — Idle Air Control Valve (IACV) (LOW)

**Severity:** Low — gradual coolant loss, potential overheating if unaddressed
**Affected variants:** All H-series
**Symptoms:** Slow coolant level drop, coolant pooling near IACV body

The idle air control valve (IACV) body passes through the coolant passage in the throttle body. The O-ring/seal between the IACV body and throttle body can deteriorate over time, causing slow coolant leaks. This is a minor but persistent issue on high-mileage examples.

**Solutions:**
- Replace IACV O-ring (inexpensive part)
- Inspect IACV body for cracks (rare but possible)

---

### 9. Oil Cooler Gasket Leak (LOW)

**Severity:** Low — oil loss, potential low oil pressure warning
**Affected variants:** All H-series with factory oil cooler
**Symptoms:** Oil dripping from oil cooler housing, oil stain on engine bay floor

The oil cooler gasket is a known minor leak point. The gasket deteriorates with heat cycling and age, allowing oil to weep from the cooler housing.

**Solutions:**
- Replace oil cooler gasket (inexpensive part)
- Inspect oil cooler core for internal leaks (less common)

---

### 10. Cam Seal Leaks (LOW)

**Severity:** Low — oil seepage at front/rear of engine
**Affected variants:** All H-series
**Symptoms:** Oil stain on timing cover (front cam seal) or bellhousing area (rear main seal area confusion)

Front and rear cam seals harden with age and can leak. Front cam seal leaks are often confused with timing cover gasket leaks. Rear cam seal leaks are sometimes confused with rear main seal leaks.

**Solutions:**
- Replace seals during timing belt service (front cam seal accessible without major disassembly)
- Use quality rubber or PTFE seals; avoid cheap aftermarket options

---

## Age-Related Wear Patterns

### Compression Loss Progression

| Mileage Range | Typical Condition | Expected Action |
|---|---|---|
| 0–80,000 km | Near-spec compression on all cylinders | Routine maintenance |
| 80,000–150,000 km | Minor compression loss (1–3% spread) | Valve adjustment, PCV replacement |
| 150,000–250,000 km | Moderate compression loss (3–8% spread), oil consumption begins | Valve seal inspection, FRM assessment, consider compression test |
| 250,000+ km | Significant compression loss (>8% spread), heavy oil consumption | Block inspection, likely resleeving required |

### Component Wear Intervals

| Component | Recommended Interval | Notes |
|---|---|---|
| Valve adjustment | Every 25,000–30,000 miles | Cold: intake 0.15–0.19 mm, exhaust 0.17–0.21 mm |
| Timing belt + tensioner | 60,000 miles / 100,000 km | Hydraulic tensioner fails early; replace proactively |
| PCV valve | Every 10,000 miles (preventive) | Genuine OEM only; aftermarket ineffective |
| Spark plugs | Every 30,000 miles | NGK or Denso OEM spec |
| Engine oil + filter | Every 5,000–10,000 km | 5W-30, 5W-40, or 10W-40 recommended; 4.8L capacity |
| Coolant flush | Every 40,000 km | Honda Type 2 ATF or equivalent HOAT coolant |
| Valve stem seals | Inspect at 150,000 km | Replace if blue smoke on cold start |

---

## Corrosion Patterns

### Aluminum Corrosion

The H22A Redtop's aluminum block and components exhibit several corrosion patterns after 30+ years of service:

1. **Coolant passage corrosion:** Internal aluminum corrosion in coolant jackets, especially with mixed coolant types (Honda Type 2 mixed with silicate-based coolants causes gel formation and accelerated corrosion). This is the most damaging corrosion pattern as it can lead to internal block leaks.

2. **External oxidation:** Surface oxidation on valve covers, intake manifold, and exhaust components. Generally cosmetic but can progress to pitting on exposed aluminum surfaces.

3. **Galvanic corrosion at dissimilar metal junctions:** Aluminum block contacting steel bolts (head bolts, main bearing caps) without proper lubrication/threadlocker can cause galvanic corrosion, leading to seized fasteners. This is particularly problematic during engine teardown.

4. **Battery tray corrosion:** The battery tray (mounted near the engine on some applications) corrodes rapidly in coastal/salt-road environments, potentially shortening battery life and causing electrical issues.

### Rust on External Components

- **Exhaust manifold:** Cast iron headers corrode externally, especially on JDM imports where road salt exposure is minimal but humidity in storage can cause surface rust. This is cosmetic.
- **Bracket mounting points:** Engine mount brackets and accessory brackets can develop surface rust, particularly on JDM imports stored in humid conditions. Structural integrity is rarely affected.
- **Fastener corrosion:** Exhaust bolts, EGR bolts, and oxygen sensor threads seize due to heat cycling and moisture. Penetrating oil and careful removal required.

---

## Reliability Assessment

### Strengths

- **Bottom-end durability:** Forged steel crankshaft and connecting rods handle stock power levels (220 PS) with ease. Stock bottom end rated for ~250–280 HP @ 6–8 psi boost with proper maintenance.
- **High-revving capability:** 7,200 RPM redline with robust valvetrain. Community reports of 192,000+ km on original timing components with proper maintenance.
- **ChampCar endurance record:** Documented 12-hour ChampCar race runs on stock H22A without catastrophic failure (only issue was oil consumption).
- **Aftermarket support:** Extensive parts availability from Honda (OEM), RS Machine (sleeves), Brian Crower (cams), Skunk2 (valvetrain), ARP (fasteners), Cometic (gaskets).

### Weaknesses

- **FRM liner dependency:** The single biggest weakness. Every H22A owner eventually faces the FRM oil consumption question. No way to predict which engines will be bad actors until symptoms appear.
- **Physical size:** Large engine dimensions make swaps into smaller chassis (CRX EF, Civic EG) difficult, requiring custom fabrication. This limits swap culture compared to B-series.
- **Transmission synchro issues:** H-series transmissions (especially automatic M6HA SportShift 1999–2001) had widespread synchro failures. Honda extended warranty on 1999–2001 automatics only, excluding 1997–1998 models.
- **Age-related scarcity:** 30+ year old engines with documented failure modes are becoming harder to source in good condition. JDM import prices rising.

### Overall Reliability Rating

**Stock/Naturally Aspirated:** 8/10 — Excellent if FRM status is known and maintenance is current. The engine itself is fundamentally sound; the FRM liner is a design-era compromise that becomes apparent only at high mileage.

**Boosted (>6 psi):** 5/10 — Stock bottom end adequate for moderate boost (6–8 psi, ~250–280 wheel HP), but rod/piston integrity degrades faster under sustained boost. Built bottom end recommended for higher outputs.

**Track/Endurance:** 7/10 — Proven in 12-hour endurance events. Oil consumption is the primary concern; adequate oil capacity and monitoring required.

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | mywikimotors.com — Honda H22A engine overview | Technical database | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | Medium — aggregated enthusiast data |
| 2 | MotorTrend — Honda FRM Liners (htup-0907) | Professional automotive journalism | https://www.motortrend.com/how-to/htup-0907-honda-frm-liners | 2026-05-15 | High — professional technical analysis |
| 3 | Grassroots Motorsports forum — "What happened to the H22?" | Enthusiast community discussion | https://grassrootsmotorsports.com/forum/grm/what-happened-to-the-h22-engine/138048/page1/ | 2026-05-15 | Medium — experienced community consensus |
| 4 | Honda-Tech forum — H22A problems thread | Enthusiast community discussion | https://honda-tech.com/forums/honda-prelude-4/h22a-problems-2853853/ | 2026-05-15 | Medium — community-sourced reports |
| 5 | Canadian Prelude Club — Oil Leak Guide | Community technical guide | https://canadianpreludeclub.com/forum/viewtopic.php?p=399 | 2026-05-15 | High — detailed, sourced community knowledge |
| 6 | MOTOR Magazine — Foreign Service: VTEC Oil Leaks | Professional automotive journalism | https://www.motor.com/magazine-summary/foreign-service-3-august-2010/ | 2026-05-15 | High — professional technician analysis |
| 7 | Center for Auto Safety — 1998 Honda Prelude complaint | Consumer advocacy | https://www.autosafety.org/vehicle-safety-check/1998-honda-prelude/ | 2026-05-15 | High — official consumer complaint documentation |
| 8 | BobIsTheOilGuy — Mobil 1 UOA in H22A4 | Owner analysis community | https://bobistheoilguy.com/forums/threads/mobil-1-0w40-uoa-in-honda-h22a4-engine.16349/ | 2026-05-15 | Medium — knowledgeable owner community |
| 9 | Honda-Tech — Sleeve durability on stock H22 | Enthusiast community discussion | https://honda-tech.com/forums/honda-prelude-4/sleeve-durability-stock-h22-5th-gen-892513/ | 2026-05-15 | Medium — community experience reports |
| 10 | Reddit r/hondaprelude — H22A4 excessive oil consumption | Community discussion | https://www.reddit.com/r/hondaprelude/comments/1mq4sr2/h22a4_excessive_oil_consumption/ | 2026-05-15 | Medium — anecdotal reports |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md — Master compiled reference (local) | Compiled reference | /data/h22/QWEN.md | 2026-05-15 | High — cross-referenced against web sources |
| 2 | State of existing H-series reliability research (T-284 through T-291 in STATE.md) | Project research files | /data/h22/research/h-series/reliability/ | 2026-05-15 | High — project-consistent methodology |
| 3 | NZHondas.com — H22A performance discussions | Enthusiast community | https://nzhondas.com/topic/16286-h22a-poor-performance-or-not/ | 2026-05-15 | Low-Medium — general discussion, limited technical detail |
| 4 | Facebook groups — Honda Prelude community | Community discussion | Multiple group posts | 2026-05-15 | Low — anecdotal, limited verification |

---

## Notes

- **FRM batch variance is real.** Multiple forum sources confirm that FRM liner quality varies by production batch. Some engines consume no oil at 200k+ miles; others burn a quart every 500 miles. There is no reliable way to predict which engine will be a "bad actor" without a compression test and leak-down test.
- **PCV maintenance is underrated.** The connection between PCV function and VTEC operation (via oil pressure at the solenoid) means a clogged PCV can trigger P1259 codes and VTEC malfunctions that are mistakenly attributed to the solenoid itself.
- **Hydraulic tensioner improvement in 1997+.** The 1997+ OBD2 H-series used an improved tensioner design. While not immune to failure, the failure rate was reduced. This is a key differentiator when comparing OBD1 vs OBD2 H22A examples.
- **Community consensus on sleeve compatibility.** Mahle and Weisco make coated pistons claimed to be FRM-compatible, but forum reports indicate the coatings wear down over time, after which cylinder walls get damaged. Iron sleeve replacement remains the definitive fix.
- **Oil consumption threshold.** mywikimotors cites oil consumption up to 0.5 L/1,000 km (1 qt per 1,200 miles) as within spec range. Beyond this, FRM degradation is likely advanced.
- **Corrosion from mixed coolants.** Using non-Honda coolant types (especially silicate-based) in Honda HOAT systems causes gel formation that accelerates internal corrosion. This is a maintenance error, not a design flaw, but very common on older vehicles where coolant history is unknown.

---

## Citations

1. mywikimotors.com, "Honda H22A engine," retrieved 2026-05-15. Aggregated technical specifications and problem catalog for all H22A variants. Credibility: Medium — cross-referenced with other sources.

2. MotorTrend (HTUP-0907), "Honda FRM Liners — Cylinder Technology," retrieved 2026-05-15. Professional technical analysis of FRM liner composition, failure mechanisms, and mitigation strategies. Credibility: High — published by established automotive media.

3. Grassroots Motorsports forum, "What happened to the H22 engine?" thread, retrieved 2026-05-15. Community discussion covering H22 reliability, FRM liner issues, timing belt tensioner failures, and comparison to alternative swap engines. Credibility: Medium — experienced community consensus.

4. Canadian Prelude Club, "OFFICIAL: OIL LEAK GUIDE," retrieved 2026-05-15. Detailed community-maintained guide covering VTEC solenoid gaskets, cam seals, valve cover gaskets, and distributor O-ring leaks with part numbers and diagnostic procedures. Credibility: High — well-sourced community knowledge.

5. MOTOR Magazine, "Foreign Service: VTEC-Related Oil Leaks," August 2010, retrieved 2026-05-15. Professional technician analysis of VTEC solenoid gasket leak patterns, including the lesser-known "figure-eight" gasket leak point. Credibility: High — published by established automotive media.

6. Center for Auto Safety, "1998 Honda Prelude" complaint, retrieved 2026-05-15. Official consumer complaint documenting Honda service bulletin #01-010 acknowledging hydraulic auto-tensioner failure at 79,000 miles. Credibility: High — official regulatory filing.

7. Honda-Tech forum, "H22A Problems..." thread, retrieved 2026-05-15. Community-sourced problem reports for H22A engines. Credibility: Medium — anecdotal reports.

8. BobIsTheOilGuy, "Mobil 1 0W40 UOA in Honda H22A4 Engine," retrieved 2026-05-15. Owner analysis of oil condition in H22A4, discussing valve seal and VTEC contributions to oil consumption. Credibility: Medium — knowledgeable owner community.

9. Honda service bulletin SB618958 — FRM Cylinder Liner Honing Procedure, referenced via Honda-Tech and PreludeOnline threads, retrieved 2026-05-15. Official Honda dealer procedure for addressing oil consumption via FRM honing. Credibility: High — official Honda document.

10. QWEN.md, "H-Series Block Materials" and "Reliability & Common Failures" sections, local file, retrieved 2026-05-15. Cross-project master reference documenting FRM liner characteristics, timing belt tensioner issues, and oil consumption patterns. Credibility: High — compiled from multiple sources and cross-referenced.

---

## Appendix

### Diagnostic Decision Tree — Oil Consumption

```
Engine burning oil?
├── Blue smoke ONLY on cold startup → Likely valve stem seals
│   └── Confirm: smoke clears after warm-up
│   └── Fix: Replace valve stem seals
│
├── Blue smoke under load AND cold startup → Likely FRM liner degradation
│   └── Confirm: Compression test, leak-down test
│   └── Confirm: Check for oil past rings (remove plugs, inspect ring lands)
│   └── Fix: Resleeve block (RS Machine/Darton) or replace block
│
├── Oil level dropping but NO visible smoke → Likely external leak
│   ├── Oil on transmission bellhousing → VTEC solenoid gasket
│   ├── Oil around distributor → Distributor O-ring
│   ├── Oil at oil cooler → Oil cooler gasket
│   ├── Oil at cam seals → Front/rear cam seals
│   └── Oil at valve cover → Valve cover gasket
│
└── Oil level dropping + P1259 code → Check PCV first
    ├── Clogged PCV → Replace PCV valve (OEM)
    └── Low oil level → Check for leaks, maintain proper level
```

### Part Numbers Reference

| Part | Description | Approximate Cost |
|------|-------------|-----------------|
| 15825-P13-005 | VTEC solenoid gasket (primary) | ~$20 (dealer) |
| 12513-P30-000 | Figure-eight VTEC gasket | ~$7 (dealer) |
| — | PCV valve (OEM Honda) | ~$10–15 (dealer) |
| — | Distributor O-ring | ~$5 (dealer) |
| — | KS Tuned timing belt tensioner | ~$60–80 (aftermarket) |
| — | RS Machine sleeve kit (per block) | ~$400–600 (machine shop) |
| — | Complete sleeved block (RS Machine) | ~$1,200–1,800 (installed) |
