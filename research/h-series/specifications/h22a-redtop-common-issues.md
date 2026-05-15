# H22A Redtop — Common Issues & Failure Modes

> **Task:** T-141 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Complete

---

## Summary

The H22A Redtop is a fundamentally robust engine, but it has several well-documented failure modes that owners and builders must address. The most pervasive issue is **progressive oil consumption** — even engines in stock condition can burn a quart every 1,000–5,000 miles due to FRM liner interaction with piston rings and PCV system oil ingestion. The **hydraulic auto tensioner** (1992–1996) has a deserved reputation for catastrophic failure, requiring replacement with an H23 manual tensioner or aftermarket unit. **Oil leaks** from VTEC gaskets, oil cooler gaskets, cam seals, and oil pressure sensors are common age-related issues. **Valve adjustment** is required every 40,000 km (25,000 miles) due to the absence of hydraulic lash adjusters. Additional concerns include coolant leaks from the IACV, distributor O-ring leaks, water pump bearing failure, and head gasket failure under boost or overheating conditions. Despite these issues, the forged steel crankshaft and rods provide excellent strength for NA and moderate boost applications.

---

## Critical Issues

### 1. Oil Consumption (Pervasive)

| Aspect | Detail |
|--------|--------|
| Severity | **High** — affects nearly all H22 engines, even in stock condition |
| Rate | 1 quart per 1,000–5,000 miles (varies by engine condition and driving style) |
| Primary cause | FRM cylinder liner interaction with piston rings + PCV system oil ingestion |
| Secondary causes | Valve stem seal wear, valve guide wear, PCV system overload |
| Symptoms | Low oil level between changes, blue smoke on deceleration, oily intake manifold |

**Mechanism:** The FRM (Fiber-Reinforced Metal) cylinder liner coating is extremely hard (~9 Mohs, approaching sapphire) but creates accelerated piston ring wear over time. Additionally, the stock PCV system allows engine oil to be slung around inside the valve cover during high-RPM operation; this oil passes through the valve cover baffles and enters the PCV valve, where it gets sucked into the intake manifold and burned.

**Mitigation strategies:**

| Strategy | Cost | Effectiveness |
|----------|------|--------------|
| Frequent oil checks (before every drive) | $0 | High — prevents low-oil damage |
| Synthetic oil (Amsoil 10W-30, Mobil 1 5W-30) | ~$30–40/change | Medium — better film strength at high temp |
| Oil catch can | ~$50–150 | High — captures oil before it enters PCV |
| PCV valve replacement | ~$10–20 | Medium — ensures one-way flow |
| PCV breather valve upgrade | ~$20–40 | High — reduces crankcase pressure |
| Baffled oil pan (Moroso, 1320 Performance) | ~$250–450 | Medium — reduces oil slosh into PCV |
| RS Machine cylinder sleeving | ~$1,500–2,500 | High — replaces FRM with conventional bore |
| Full engine rebuild | ~$3,000–6,000 | High — but often more expensive than replacement |

**Track day imperative:** Carry 1 quart minimum. Use 10W-40 or 15W-50 synthetic (Motul 300V, Red Line 10W-40) for track days to maintain film strength at elevated temperatures. Change oil every 3,000 miles or after every track weekend.

### 2. Timing Belt Tensioner — Catastrophic Failure Mode

| Aspect | Detail |
|--------|--------|
| Severity | **Critical** — failure = bent valves, damaged pistons, possible rod-through-block |
| Affected years | 1992–1996 (OBD1 hydraulic auto tensioner) |
| Failure mode | Belt slack → tooth skip → valve-piston contact (interference engine) |
| Symptoms | Belt flap noise, timing belt slack, rattling from tensioner area |
| Replacement interval | 60,000 miles standard; 30,000 miles for track use |

**Replacement options:**

| Option | Description | Cost | Notes |
|--------|-------------|------|-------|
| H23 manual tensioner | Direct swap; mechanical spring tension | ~$80–120 | Most popular upgrade; proven reliability |
| KS Tuned aftermarket tensioner | Improved design | ~$100–150 | Premium option with better damping |
| OEM hydraulic tensioner (replacement) | Same type as stock | ~$50–80 | Not recommended — same failure mode |

**Track day imperative:** Any H22A Redtop intended for track use MUST have the hydraulic auto tensioner replaced BEFORE the first track session. This is non-negotiable.

### 3. Oil Leaks (Common Age-Related)

| Leak Point | Symptoms | Solution | Cost Estimate |
|------------|----------|----------|--------------|
| VTEC solenoid gasket | Oil on top of engine, near valve cover | Replace gasket at every timing belt service | ~$5–15 (gasket) |
| Oil cooler gasket | Oil leak on side of engine, near oil filter | Replace gasket/O-ring | ~$10–20 |
| Cam seals (front/rear) | Oil seepage at camshaft ends | Replace seals | ~$10–20 each |
| Oil pressure sensor | Oil drip from sensor location | Replace sensor | ~$20–40 |
| Distributor O-ring | Oil on spark plugs, oil puddle under engine | Replace O-ring and gasket | ~$5–15 |
| Rear main seal | Oil leak at transmission bellhousing | Replace seal (requires transmission removal) | ~$50–100 (part); $500–1,000 (labor) |
| Front main seal | Oil leak at crank snout | Replace seal | ~$20–40 (part); $300–600 (labor) |

---

## Performance-Related Issues

### 4. Loss of Power

| Cause | Diagnosis | Solution |
|-------|-----------|----------|
| Faulty distributor | Check for spark at plugs; inspect distributor cap/rotor | Replace distributor or ignition module |
| Timing belt tensioner wear | Check belt tension; listen for flap noise | Replace tensioner (see #2 above) |
| Oxygen sensor failure | Scan for P0131–P0136 codes; check O2 sensor voltage | Replace O2 sensor |
| Knock sensor malfunction | Scan for P0325 code; check sensor resistance | Replace knock sensor |
| Valve adjustment needed | Measure valve clearance with feeler gauge | Adjust valves to spec (see below) |
| Clogged catalytic converter | Backpressure test; remove cat and test | Replace catalytic converter |
| Fuel delivery issue | Check fuel pressure (39 psi idle, 44 psi load) | Replace fuel pump/filter/pressure regulator |

### 5. Coolant Leaks

| Leak Point | Symptoms | Solution |
|------------|----------|----------|
| IACV (Idle Air Control Valve) | Coolant leak at throttle body | Replace IACV gasket or entire IACV |
| Heater core | Sweet smell inside cabin, wet passenger floor | Replace heater core |
| Water pump | Coolant leak at pump weep hole | Replace water pump (Aisin, GMB recommended) |
| Radiator hoses | Coolant drip from hose connections | Replace hoses (silicone recommended for performance) |
| Thermostat housing | Coolant leak at housing gasket | Replace gasket or entire housing |

---

## Maintenance Requirements

### Valve Adjustment

The H22A has **no hydraulic lash adjusters** — valves must be adjusted manually at regular intervals.

| Condition | Intake Clearance | Exhaust Clearance |
|-----------|-----------------|-------------------|
| Cold | 0.15–0.19 mm (0.006–0.007 in) | 0.17–0.21 mm (0.007–0.008 in) |
| Hot | 0.25 mm (0.010 in) | 0.30 mm (0.012 in) |

| Interval | Mileage | Notes |
|----------|---------|-------|
| Standard | 25,000–30,000 miles | Per Honda service schedule |
| Performance use | 15,000 miles | Aggressive cams accelerate wear |
| Track use | 10,000 miles | High-RPM operation increases wear |

**Procedure:**
1. Remove valve cover
2. Bring cylinder #1 to TDC (compression stroke)
3. Adjust valves for cylinders #1 and #3
4. Rotate crank 360° (bring #4 to TDC)
5. Adjust valves for cylinders #2 and #4
6. Recheck all adjustments
7. Replace valve cover gasket

### Oil Change Schedule

| Usage | Interval | Oil Type | Filter |
|-------|----------|----------|--------|
| Street | 5,000 miles | 5W-30 or 10W-30 synthetic | Honda 15400-PLM-A02 or equivalent |
| Performance | 3,000 miles | 10W-40 or 15W-50 synthetic | Amsoil, K&N, Wix |
| Track | After every session | 10W-40 or 15W-50 synthetic | Amsoil preferred |

---

## Reliability Statistics

| Metric | Value | Source |
|--------|-------|--------|
| Stock lifespan (proper maintenance) | 200,000+ km (120,000+ miles) | QWEN.md; GRM forum (Trackmouse, 192k on original timing belt) |
| Boost limit (stock bottom end) | 6–8 psi safe; 12–18 psi with built internals | QWEN.md; Facebook community consensus |
| FRM liner lifespan | Indefinite with proper oil changes; accelerates ring wear | QWEN.md; Attack Forums (Daemione's build series) |
| Timing belt tensioner failure rate | High — documented failures across multiple communities | QWEN.md; GRM; Honda-Tech; PreludePower |
| Oil consumption prevalence | Near-universal; even stock engines consume oil | Attack Forums; GRM; BobIsTheOilGuy UOA data |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Attack Forums — H22 Build-Up Part 1: Reliability | Forum build thread | https://www.attackforums.com/forum/attack-forums/alternative-engines-engine-tech/1147-h22-build-up-%C2%96-part-1-reliability-peace-of-mind | 2026-05-15 | High — detailed owner experience |
| 2 | Grassroots Motorsports — What Happened to the H22? | Forum discussion | https://grassrootsmotorsports.com/forum/grm/what-happened-to-the-h22-engine/138048/ | 2026-05-15 | High — multiple owner experiences |
| 3 | mywikimotors — H22A problems | Enthusiast site | http://mywikimotors.com/honda-h22a/ | 2026-05-15 | Medium — corroborated by other sources |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | QWEN.md (local compiled reference) | Compiled reference | `/data/h22/QWEN.md` | N/A | Medium — compiled from 50+ sources |
| 2 | Wikipedia — Honda H engine | Encyclopedia | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | High — cross-referenced |
| 3 | Honda-Tech — H22 Oil Consumption Question | Forum thread | https://honda-tech.com/forums/honda-prelude-4/h22-oil-consumption-question-2736468/ | 2026-05-15 | Low — community discussion |
| 4 | PreludePower — H22A Oil Consumption Thread | Forum thread | https://www.preludepower.com/threads/h22a-oil-consumption-tell-us-what-you-use.292380/ | 2026-05-15 | Low — community discussion |
| 5 | YouTube — Honda H22A 2.2 Problems and Weak Points | Video | https://www.youtube.com/watch?v=EcRqvZ8XitI | 2026-05-15 | Low-Medium — video analysis |

---

## Notes

### Key Observations

1. **Oil consumption is the #1 H22A concern.** It is not a "defect" per se — it is an inherent characteristic of the FRM-lined block combined with the PCV system design. Even brand-new Redtops consume oil. The key is management, not elimination.

2. **The timing belt tensioner is the #1 safety concern.** A broken timing belt on an interference engine means catastrophic engine damage. The H23 manual tensioner swap is the single most important maintenance item for any Redtop.

3. **FRM liners are a double-edged sword.** They provide excellent wear resistance and allow a lightweight aluminum block, but they accelerate piston ring wear and cannot be machined conventionally. For high-power builds, cylinder sleeving (RS Machine, Darton) is strongly recommended.

4. **The H22A responds well to boost.** Community consensus (Facebook, Honda-Tech, Attack Forums) indicates the H22A handles boost well up to ~12 psi with stock internals, and 15–18 psi with forged pistons and rods. However, the FRM liners remain the weak point — sleeving is essential for boosted applications.

5. **Valve adjustment is often overlooked.** Because the H22A lacks hydraulic lash adjusters, valves must be adjusted manually. Neglect leads to noisy operation, reduced power, and potential valve damage at high RPM.

### Gaps Identified

- **Exact FRM liner composition** (specific fiber type, matrix material ratios) is not published by Honda.
- **Statistical failure rates** for specific components (e.g., what percentage of hydraulic tensioners fail before 100k miles?) are not available.
- **Long-term durability data** for the H23 manual tensioner swap (how long does it last?) is anecdotal.
- **Oil consumption rates by model year** — whether early (1992) or late (1996) Redtops differ in consumption severity is not documented.

---

## Citations

1. Daemione. "H22 Build-Up — Part 1: Reliability/Piece of Mind." *Attack Forums*, 2026. URL: https://www.attackforums.com/forum/attack-forums/alternative-engines-engine-tech/1147-h22-build-up-%C2%96-part-1-reliability-peace-of-mind. Credibility: High — detailed owner experience with mitigation strategies.
2. GRM community. "What happened to the H22 engine?" *Grassroots Motorsports Forums*, March 2018. URL: https://grassrootsmotorsports.com/forum/grm/what-happened-to-the-h22-engine/138048/. Credibility: High — multiple owner experiences including 192k-mile timing belt run.
3. Anonymous. "Honda H22A engine | Differences, ways of making it faster." *mywikimotors*, 2026. URL: http://mywikimotors.com/honda-h22a/. Credibility: Medium — corroborated by Attack Forums and GRM.

---

## Appendix

### Diagnostic Trouble Codes (DTC) Relevant to H22A

| Code | Description | Likely Cause |
|------|-------------|-------------|
| P0325 | Knock sensor malfunction | Faulty knock sensor or wiring |
| P0327 | Knock sensor circuit low input | Wiring issue or faulty sensor |
| P0335 | Crankshaft position sensor malfunction | CKP sensor failure |
| P0340 | Camshaft position sensor malfunction | CMP sensor failure |
| P0341 | Camshaft position system performance | Timing alignment issue |
| P0351 | Ignition coil primary/secondary circuit malfunction | Coil pack or wiring issue |
| P0420 | Catalyst system efficiency below threshold | Catalytic converter degradation |
| P0441 | Evaporative emission system incorrect purge flow | EVAP purge solenoid or wiring |
| P0442 | Evaporative emission system leak detected | Small EVAP leak (gas cap, hose) |
| P0505 | Idle air control system malfunction | IACV clogged or failed |
| P0506 | Idle air control system RPM lower than expected | IACV, vacuum leak, or throttle body issue |
| P0507 | Idle air control system RPM higher than expected | Vacuum leak or IACV sticking open |
| P0131–P0136 | O2 sensor circuit malfunctions (Bank 1) | Faulty O2 sensor or wiring |
| P1259 | VTEC system malfunction | VTEC solenoid, oil pressure, or wiring issue |
| P1358 | Ignition coil circuit malfunction (A) | Coil pack or ICM issue |
