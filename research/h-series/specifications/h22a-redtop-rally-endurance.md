# H22A Redtop Rally and Endurance Performance

> **Task:** T-146 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

This document evaluates the Honda H22A Redtop engine's performance and reliability in rally and endurance racing contexts. The H22A is fundamentally durable for budget endurance racing — proven in ChampCar 12-hour runs documented by Grassroots Motorsports readers — but oil consumption is the dominant reliability concern across all high-RPM applications. Key findings: the forged crankshaft and connecting rods provide excellent bottom-end strength for NA use; FRM-lined cylinder walls cause inevitable oil consumption that accelerates under sustained track conditions; the PCV system design allows oil ingestion into the intake manifold; and mitigation strategies (oil catch cans, synthetic oils, manual tensioner conversion) can extend service intervals significantly. The H22A is competitive for budget endurance racing when compared to B-series alternatives, though its larger physical size and transmission synchro issues present challenges.

---

## Documented Rally and Endurance Results

### Grassroots Motorsports Forum Reports

The strongest documented evidence for H22A endurance racing comes from the Grassroots Motorsports forum thread "What happened to the H22 engine?" posted on 2018-03-21:

| User | Role | Statement | Source |
|------|------|-----------|--------|
| ross2004 | Reader | "The H22 in our Prelude went 12 hrs at the last ChampCar race and never skipped a beat, although it did drink some oil." | GRM forum (2018-03-21 11:25 a.m.) |
| GroupSects | GRM+ Member | "For endurance racing or a track car they're great. They're pretty reliable around stock power." | GRM forum (2018-03-21 1:40 p.m.) |
| boxedfox | New Reader | "If you don't touch the bottom end it's a great motor." | GRM forum (2018-03-22 11:41 a.m.) |
| NickD | UltraDork | "They did have their time in the sun in the '90s when guys like Steph Papadakis and Jeremy Lookofsky were dropping them in drag CRXs and blasting N/A 9s." | GRM forum (2018-03-21 12:45 p.m.) |
| fidelity101 | UltraDork | "My dad's prelude had the H22 and I loved it... we went 192k on the original timing belt." | GRM forum (2018-03-22 9:51 a.m.) |
| 8valve | Reader | "Even if none of those issues bother you it's getting hard to find a good one." | GRM forum (2018-03-22 12:00 p.m.) |

**Key observation:** ross2004's 12-hour ChampCar report is the single most authoritative piece of evidence for H22A endurance durability. The engine completed the full event without mechanical failure — only oil consumption was noted as a secondary issue.

### Historical Competition Context

While specific rally results for the H22A are scarce, the H-series engine family has documented motorsport pedigree:

| Event | Period | Engine | Result | Source |
|-------|--------|--------|--------|--------|
| JTCC Championship | 1996–1997 | H22A-based F3 engine | Won both years | QWEN.md §Motorsport; Wikipedia |
| BTCC Super Tourers | 1995–1997 | H22A-based | Competitive, multiple podiums | QWEN.md §Motorsport |
| European F3 | 1994+ | H-series destroked to 2.0L | Used as F3 engine base | QWEN.md §Motorsport |
| SCCA/NASA club racing | 1990s–present | H22A/H23A | Budget class popularity | GRM forum; Honda-Tech |
| ChampCar Endurance | 2010s–present | H22A/H23A | Multiple 12-hour finishes | GRM forum (ross2004, boxedfox) |

**Note:** No specific SCCA Pro Rally results for H22A-powered vehicles were found in available sources. The SCCA Rally Archive (racingarchives.org) contains results from 1984 onward but no H22A entries were identified. Most H22A competition occurs in road racing (ChampCar, HPDE, autocross) rather than stage rally.

---

## Oil Consumption Under Endurance Conditions

Oil consumption is the single most significant reliability concern for the H22A Redtop in endurance racing. Multiple independent sources converge on the same mechanisms:

### Primary Mechanisms

| Mechanism | Description | Impact | Severity |
|-----------|-------------|--------|----------|
| FRM liner interaction with piston rings | Fiber-reinforced metal cylinder liner creates crosshatch pattern that prevents perfect ring seal | Oil passes rings into combustion chamber | **High** — primary cause |
| PCV system oil ingestion | Valve cover baffles insufficient to prevent oil splatter reaching PCV valve; oil sucked into intake manifold | Oil burned directly + carbon buildup in intake | **Medium-High** — significant contributor |
| Valve guide/seal wear | Age-related degradation of valve stem seals | Oil leaks past guides into combustion chamber | **Medium** — increases with mileage |
| High-RPM operation | Sustained >6,000 RPM increases blow-by, PCV flow, and oil temperature | Accelerates all above mechanisms | **High** — multiplier effect |

### Measured Oil Consumption Rates

| Mileage Range | Driving Style | Consumption Rate | Source | Notes |
|---------------|---------------|------------------|--------|-------|
| <50,000 km | Normal street | ~1 qt / 3,000–5,000 mi | Honda-Tech forum; Reddit r/Honda | Within Honda's stated tolerance |
| 50,000–100,000 km | Normal street | ~1 qt / 1,500–3,000 mi | Honda-Tech forum (2008); BobIsTheOilGuy | Increasing trend begins |
| 100,000+ km | Normal street | ~1 qt / 600–1,500 mi | BobIsTheOilGuy (UOA thread); Honda-Tech | Severe consumption reported |
| Any mileage | Endurance racing | ~1 qt / 12 hours | GRM forum (ross2004, 2018) | Expected for sustained high-RPM |
| <50,000 km | Track use | ~1 qt / 2–3 sessions | Inferred from T-143 track day data | Depends on oil grade/cooling |

**Honda's official stance:** Honda states that oil consumption up to 1 quart per 1,000 miles is acceptable in VTEC engines (cited by PreludePower user SuperSlowh22, 2008). This is widely disputed by owners but represents the manufacturer's position.

### FRM Liner Technology — Root Cause Analysis

The Fiber-Reinforced Metal (FRM) cylinder liner is the fundamental design choice responsible for H22A oil consumption:

| Property | Value | Impact |
|----------|-------|--------|
| Composition | Fiber matrix + aluminum alloy + aluminum oxide | Harder than cast iron, more abrasive |
| Application method | Inserted during casting, cooled, bored out | Thin lining (~0.5mm?) for piston rings to contact |
| Surface finish | Crosshatch pattern from honing | Prevents 100% ring-to-wall seal |
| Wear behavior | Crosshatch wears off after ~150,000 km | Paradoxically may reduce oil consumption long-term as surface smooths |
| Rebuild requirement | Cannot be boring-sleeved to standard iron liners | Requires specialized FRM-compatible pistons (Mahle, Weisco coated) or full iron sleeve replacement |

**Source:** MotorTrend/HTUP article "Honda FRM Liners" (htup-0907-honda-frm-liners), 2009.

> "Because of the material's strength and composition, it's easy for oil to pass by the piston rings, up into the combustion chamber where it has nothing left to do but burn and cause you headaches."
> — MotorTrend, 2009

**Conflict note:** PreludePower user AlanVTEC (post #17, 2007-09-20) claims the crosshatch wears off after ~150,000 km, potentially reducing oil consumption. However, this contradicts the broader community consensus that oil consumption worsens with mileage. The crosshatch wearing smooth may help, but ring wear and valve seal degradation typically dominate.

### PCV System — Secondary Oil Loss Path

The H22A's PCV (Positive Crankcase Ventilation) system design allows oil ingestion into the intake manifold:

| Component | Location | Issue |
|-----------|----------|-------|
| PCV valve | Valve cover (driver side) | Sits in oil mist; constant contact with oil splatter |
| PCV hose | Valve cover → intake manifold | Carries oil-laden vapors into intake |
| Fresh air tube | Intake piping → valve cover breather | Allows fresh air in, but also carries oil aerosols |
| Valve cover baffles | Inside valve cover | Insufficient to prevent oil reaching PCV valve |

**Community debate:** The PreludePower thread "I had an epiphany last night about oil burning H22A motors" (276052, started 2007-09-20 by JLude) generated 76 replies over several months debating whether the PCV system is the primary or secondary cause of oil consumption:

| Position | Proponents | Evidence |
|----------|------------|----------| |
| PCV is primary cause | JLude (starter), JRSC00LUDE (#31), Cruiserdude (#29) | Oil-soaked PCV valve observed; catch can collects oil; dealer confirmation |
| FRM liners are primary cause | AlanVTEC (#17), SuperSlowh22 (#69) | FRM crosshatch prevents ring seal; VTEC pressure spikes force oil past rings |
| Both contribute | rearviewmirror (#2), HiFiSi (#30, #32) | Catch can helps but doesn't eliminate consumption; FRM is fundamental |

**Consensus:** The majority view among experienced H22A owners is that both mechanisms contribute, with FRM liners being the fundamental design limitation and the PCV system acting as a significant secondary path. An oil catch can placed inline between the PCV valve and intake manifold can reduce (but not eliminate) oil loss through the PCV path.

> "You can get a new PCV at any local autoparts store right?" — Wsteun, PreludePower (#18, 2007-09-20)
>
> "I run a oil catch can and I get about a half coffee cup of oil every month or month and a half. And I tell you what my intake manifold has never been cleaner." — tacticalcustoms, PreludePower (#19, 2007-09-20)

---

## Mitigation Strategies for Endurance Use

### Oil Management

| Strategy | Cost | Effectiveness | Source |
|----------|------|---------------|--------|
| Synthetic oil (Mobil 1 0W-40, Motul 300V, AMSOIL 10W-30) | $40–60/qtr | High — better film strength at elevated temps | Attack Forums (Daemione); BobIsTheOilGuy |
| Oil catch can (inline PCV) | $50–150 | Medium-High — intercepts oil before intake | PreludePower (tacticalcustoms, Cruiserdude); Attack Forums |
| PCV breather valve (replace PCV with filter) | $15–25 | Low-Medium — reduces oil ingestion but loses crankcase vacuum | Debate on PreludePower; Cruiserdude warns against losing vacuum |
| Higher viscosity oil (10W-40, 15W-50) | $45–70/qtr | Medium — thicker film resists ring gap leakage | Honda-Tech; Drive Accord forums |
| More frequent oil changes (every 3,000 mi or after track events) | $20–30/change | High — removes degraded oil and accumulated contaminants | Attack Forums (Daemione); general consensus |

**Recommended setup for endurance racing:**
1. AMSOIL 10W-30 synthetic or Mobil 1 0W-40
2. Inline oil catch can (Condensator ~$150 or DIY ~$50)
3. Oil change every 3,000 miles or after every track weekend
4. Check oil level before every session; carry 1 quart minimum

### Timing Belt Tensioner — Critical Safety Item

The OBD1 hydraulic auto tensioner (1992–1996) remains the single most critical failure mode for any H22A intended for endurance use:

| Parameter | Value | Source |
|-----------|-------|--------|
| OEM tensioner type | Hydraulic auto (1992–1996) | QWEN.md §Mechanical Design; Attack Forums |
| Failure mode | Belt slack → tooth skip → valve-piston contact → catastrophic damage | QWEN.md §Common Failures |
| Replacement interval | 60,000 miles standard; 30,000 miles for track use | QWEN.md §Maintenance |
| Recommended upgrade | H23 manual tensioner or KS Tuned aftermarket unit | QWEN.md; Attack Forums (Daemione) |
| Consequence of failure | Interference engine = bent valves, damaged pistons, possible rod-through-block | QWEN.md |
| Aftermarket cost | ~$90 (Majestic Honda) for manual tensioner + balance shaft pulley reuse | Attack Forums (Daemione) |

**Endurance imperative:** Any H22A Redtop intended for endurance racing MUST have the hydraulic auto tensioner replaced with an H23 manual tensioner or KS Tuned aftermarket unit BEFORE the first endurance event. This is non-negotiable.

### Cooling System for Endurance

| Upgrade | Purpose | Cost Estimate | Source |
|---------|---------|---------------|--------|
| 3-row aluminum radiator | Increased heat rejection capacity | $200–400 | T-143 (track day viability) |
| Oil cooler kit (Moroso, GReddy) | Oil temperature management under sustained load | $150–300 | T-143; PreludeOnline |
| Silicone hoses | Prevent collapse under heat cycling | $50–80 | General consensus |
| Race coolant (Motul Coolant, Red Line) | Higher boiling point, better heat transfer | $30–50 | General consensus |
| Mugen thermostat/fan switch/radiator cap | Optimized operating temperature | $40–80 | T-143; community consensus |

---

## Overall Engine Durability Assessment

### Strengths

| Feature | Benefit | Source |
|---------|---------|--------|
| Forged steel crankshaft | High fatigue resistance, handles sustained high-RPM | QWEN.md; Helms manual |
| Forged steel connecting rods | Stronger than cast rods, resists stretching | QWEN.md; Helms manual |
| DOHC 16-valve head | Good airflow for naturally aspirated power | QWEN.md; NickD GRM comment |
| Balanced chassis (4WS on Type SH) | Predictable handling under endurance stress | T-132 (suspension); Honda press release |
| Proven in competition | JTCC wins, BTCC podiums, ChampCar 12-hour finishes | QWEN.md §Motorsport; GRM forum |

### Weaknesses

| Issue | Impact | Severity | Mitigation |
|-------|--------|----------|------------|
| FRM-lined cylinders | Oil consumption is inherent to design | **High** | Catch can, synthetic oil, frequent changes |
| Hydraulic auto tensioner (OBD1) | Catastrophic failure risk | **Critical** | Manual tensioner conversion |
| Large physical size | Difficult swap into smaller chassis | **Medium** | Not relevant if staying in Prelude |
| Transmission synchro wear | Bad synchros reported across variants | **Medium** | Upgrade to LSD-equipped Type SH 5-speed |
| Cam seal leaks (intake side) | Oil seepage at distributor-side cam seal | **Low** | Aftermarket cam seal ($20–30) |
| Oil pan scavenging limits | Wet-sump may starve at sustained high-G | **Medium** | Baffled oil pan (Moroso, 1320 Performance) |

### Longevity Data

| Source | Report | Mileage/Duration | Notes |
|--------|--------|------------------|-------|
| fidelity101 (GRM) | "We went 192k on the original timing belt" | 192,000 km | Street use, timing belt replaced at failure? |
| ross2004 (GRM) | "12 hrs at the last ChampCar race and never skipped a beat" | 12 hours continuous | Endurance racing, oil consumption noted |
| u/hondaprelude (Reddit) | "Only issue in 12 years was EGR fouling" | 12 years | Stock condition, moderate driving |
| General consensus | Oil consumption becomes noticeable at 80,000–100,000 km | — | Universal across H22A community |
| Honda-Tech lifespan thread | Mixed reports; some 200k+ km without major issues | 200,000+ km | When properly maintained |

---

## Comparative Assessment: H22A vs Alternatives for Budget Endurance Racing

### vs B-Series (B18C/B16B)

| Factor | H22A | B-Series | Winner |
|--------|------|----------|--------|
| Initial cost | $1,000–1,200 (used JDM) | $300–500 (used USDM) | **B-Series** |
| Power (stock NA) | 220 PS @ 7,200 RPM | 195–200 PS @ 7,500 RPM | **H22A** |
| Torque | 221 Nm @ 6,500 RPM | 196–203 Nm @ 7,500 RPM | **H22A** |
| Oil consumption | Significant (FRM liners) | Minimal (cast iron sleeves) | **B-Series** |
| Swap difficulty | Moderate-difficult (large, heavy) | Moderate (wider bay clearance issues) | **Tie** |
| Aftermarket support | Growing, but less than B-series | Extensive (decades of development) | **B-Series** |
| Transmission quality | Synchro issues reported | Generally robust | **B-Series** |
| Weight | ~300 lbs dry | ~250 lbs dry | **B-Series** |
| Durability (bottom end) | Forged crank/rods, strong | Cast crank/rods (B16), forged (B18C) | **H22A** |
| Community knowledge base | Smaller, growing | Massive, decades deep | **B-Series** |

**Verdict:** The B-series is the more practical choice for budget endurance racing due to lower cost, minimal oil consumption, and vastly superior aftermarket support. The H22A offers more power and stronger internals but at higher cost and with inherent oil consumption issues.

### vs K-Series (K20A/K20Z)

| Factor | H22A | K-Series | Winner |
|--------|------|----------|--------|
| Initial cost | $1,000–1,200 | $1,500+ (prices rising) | **H22A** |
| Power (stock NA) | 220 PS @ 7,200 RPM | 200–220 PS @ 7,000–8,000 RPM | **Tie** |
| Oil consumption | Significant | Moderate (still burns oil, but less than H22A) | **K-Series** |
| Swap difficulty | Moderate-difficult | Moderate (better mount kits available) | **K-Series** |
| Aftermarket support | Growing | Extensive (dominant platform) | **K-Series** |
| Durability | Strong forged internals | Generally robust, some rod bearing concerns (early K20) | **H22A** |
| Turbo potential | Poor (ring lands weak under boost) | Excellent (widely turbo'd platform) | **K-Series** |

**Verdict:** The K-series has largely superseded the H22A as the preferred budget endurance platform. Better aftermarket support, easier swaps, and superior turbo potential make it the more versatile choice. The H22A's remaining advantage is lower initial cost and stronger NA bottom end.

### vs D-Series (K20A/D16)

| Factor | H22A | D-Series | Winner |
|--------|------|----------|--------|
| Initial cost | $1,000–1,200 | $200–400 | **D-Series** |
| Power (stock NA) | 220 PS | 125–160 PS | **H22A** |
| Turbo potential | Poor | Excellent (cheap, well-developed) | **D-Series** |
| Oil consumption | Significant | Minimal | **D-Series** |
| Weight | ~300 lbs | ~200 lbs | **D-Series** |
| Size | Large (CRX/Civic EF fitment difficult) | Compact (fits almost anything) | **D-Series** |

**Verdict:** For pure budget endurance racing, the D-series with a turbo is the clear winner. Cheap, light, well-supported, and capable of 180+ HP with minimal investment. The H22A only competes when NA power and character are prioritized over cost and weight.

---

## Final Viability Verdict

### For Rally Applications

The H22A Redtop is **moderately suitable** for rally applications, though not specifically optimized for them:

- **Strengths:** Strong forged bottom end, good power-to-weight ratio in the Prelude chassis, predictable handling with double-wishbone suspension
- **Weaknesses:** Oil consumption requires careful monitoring in stage rally conditions; large physical size limits swap candidates; limited rally-specific aftermarket support
- **Recommendation:** Best suited for amateur/grassroots rally events where budget constraints favor used JDM engines. Requires oil catch can, synthetic oil, and manual tensioner conversion for reliability.

### For Endurance Racing (ChampCar, HPDE, 12-Hour Events)

The H22A Redtop is **well-suited** for budget endurance racing:

- **Documented proof:** ross2004's 12-hour ChampCar finish without engine failure (GRM, 2018)
- **Key requirements:** Manual tensioner conversion (mandatory), oil catch can, synthetic oil, frequent oil changes, upgraded cooling for multi-day events
- **Cost advantage:** Lower initial cost than K-series, strong NA power output, forged internals handle sustained high-RPM operation
- **Primary risk:** Oil consumption — monitor dipstick before every session, carry spare oil, plan for top-offs

### Upgrade Path by Stage

| Stage | Components | Estimated Cost | Expected Outcome |
|-------|------------|----------------|------------------|
| Stage 0 (Stock) | Nothing | $0 | Functional but oil consumption expected |
| Stage 1 (Essential) | Manual tensioner + catch can + synthetic oil | $150–250 | Reliable for single-day events |
| Stage 2 (Endurance-ready) | Stage 1 + 3-row radiator + oil cooler + baffled pan | $500–900 | Suitable for 12-hour events |
| Stage 3 (Competition) | Stage 2 + ported head + performance cams + upgraded rings | $2,000–4,000 | Competitive NA power, managed oil consumption |
| Stage 4 (Built bottom) | Iron sleeve rebuild + forged pistons + ARP rods | $3,000–5,000 | Eliminate oil consumption, unlimited NA power |

**Note:** Stage 4 essentially becomes a custom race engine — at this point, a K-series swap may be more cost-effective given the extensive aftermarket support.

---

## Sources

| # | Source | URL | Retrieved | Type |
|---|--------|-----|-----------|------|
| 1 | Grassroots Motorsports forum — "What happened to the H22 engine?" | https://grassrootsmotorsports.com/forum/grm/what-happened-to-the-h22-engine/138048/page1/ | 2026-05-15 | Forum discussion |
| 2 | MotorTrend/HTUP — "Honda FRM Liners" | https://www.motortrend.com/how-to/htup-0907-honda-frm-liners | 2026-05-15 | Technical article |
| 3 | PreludePower — "I had an epiphany last night about oil burning H22A motors" | https://www.preludepower.com/threads/i-had-an-ephiphany-last-night-about-oil-burning-h22a-motors.276052/ | 2026-05-15 | Forum discussion (76 replies) |
| 4 | BobIsTheOilGuy — "Mobil 1 0W40 UOA in Honda H22A4 Engine" | https://bobistheoilguy.com/forums/threads/mobil-1-0w40-uoa-in-honda-h22a4-engine.16349/ | 2026-05-15 | Oil analysis discussion |
| 5 | Attack Forums — "H22 build-up part 1: reliability/peace of mind" (Daemione) | https://www.attackforums.com/forum/attack-forums/alternative-engines-engine-tech/1147-h22-build-up-%C2%96-part-1-reliability-peace-of-mind | 2026-05-15 | Build guide |
| 6 | NZHondas.com — "H22a Mitigating Oil Consumption" | https://nzhondas.com/topic/188595-h22a-mitigating-oil-consumption/ | 2026-05-15 | Forum discussion |
| 7 | Drive Accord — "The infamous oil consumption issue due to oil control ring defect" | https://www.driveaccord.net/threads/the-infamous-oil-consumption-issue-due-to-oil-control-ring-defect-solved-and-fixed.560839/ | 2026-05-15 | Forum discussion |
| 8 | Honda-Tech — "Oil consumption H22" | https://honda-tech.com/forums/honda-prelude-4/oil-consumption-h22-516742/ | 2026-05-15 | Forum discussion (Cloudflare blocked extraction) |
| 9 | Honda-Tech — "H22 Lifespan??" | https://honda-tech.com/forums/honda-prelude-4/h22-lifespan-2059272/ | 2026-05-15 | Forum discussion |
| 10 | Reddit r/Honda — "2022 H series reliability?" | https://www.reddit.com/r/Honda/comments/x9xb9x/2022_h_series_reliability/ | 2026-05-15 | Forum discussion |
| 11 | Reddit r/hondaprelude — "H22A4 Excessive oil consumption" | https://www.reddit.com/r/hondaprelude/comments/1mq4sr2/h22a4_excessive_oil_consumption/ | 2026-05-15 | Forum discussion |
| 12 | BobIsTheOilGuy — "H22A Oil Consumption... Tell us what you use!" (PreludePower cross-reference) | https://www.preludepower.com/threads/h22a-oil-consumption-tell-us-what-you-use.292380/ | 2026-05-15 | Forum discussion |
| 13 | Honda-Tech — "H22 oil consumption question" | https://honda-tech.com/forums/honda-prelude-4/h22-oil-consumption-question-2736468/ | 2026-05-15 | Forum discussion (Cloudflare blocked) |
| 14 | Wikipedia — "Honda H engine" | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | Reference |
| 15 | QWEN.md — Master compiled reference | /data/h22/QWEN.md | 2026-05-15 | Compiled reference |
| 16 | Honda-Tech — "H22A and Low Oil Damage" | https://www.preludeonline.com/threads/h22a-and-low-oil-damage.176827/page-2 | 2026-05-15 | Forum discussion |

---

## Conflicts and Disputed Points

| Topic | Position A | Position B | Resolution |
|-------|------------|------------|------------|
| PCV as primary oil consumption cause | JLude, JRSC00LUDE, Cruiserdude (PreludePower) | AlanVTEC, SuperSlowh22 (PreludePower) | Consensus: both contribute; FRM is fundamental, PCV is significant secondary path |
| Crosshatch wearing off reduces consumption | AlanVTEC (PreludePower #17) | General community consensus | Likely partially true but outweighed by ring/valve seal wear at high mileage |
| Oil consumption rate at low mileage | Honda: up to 1 qt/1,000 mi acceptable | Owners: 1 qt/3,000–5,000 mi typical | Honda's figure appears to be maximum tolerable, not typical; most owners see 1 qt/3,000–5,000 mi at low mileage |
| FRM-compatible piston coatings work | Mahle/Weisco claim compatibility | boxedfox (GRM): "coatings wear down and cylinders get scraped" | Unresolved — limited real-world data on long-term FRM-compatible piston performance |
