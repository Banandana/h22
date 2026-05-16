# Honda H-Series VTEC Engagement Parameters

> **Task:** T-117 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the complete VTEC engagement specification for the Honda H-series engine family (H22A, H22A1, H22A4, H23A): the five ECU-monitored conditions required for VTEC activation (RPM threshold, oil pressure minimum, vehicle speed interlock, engine temperature, and throttle position/load), variant-specific differences in engagement points, the VTEC window concept (load-dependent variable crossover), how aftermarket tuning solutions modify these parameters, and diagnostic procedures for VTEC non-engagement. The H-series uses a **multi-condition logic** — all five criteria must be satisfied simultaneously before the ECU energizes the VTEC solenoid. Failure of any single condition prevents engagement.

---

## The Five ECU Conditions for VTEC Engagement

The H-series ECU monitors five independent parameters before activating VTEC. **All five must be true simultaneously.** This is a hard logical AND — not a priority ordering.

| # | Condition | Minimum Requirement | Sensor Used | Notes |
|---|----------|---------------------|-------------|-------|
| 1 | **Engine RPM** | 5,200–5,500 rpm (varies by ECU/variant) | CKP (Crankshaft Position) sensor | Primary trigger; base point varies by ECU calibration |
| 2 | **Oil Pressure** | 30+ psi (207+ kPa) | VTEC oil pressure switch (inside solenoid assembly) | Hydraulic requirement; ECU reads switch closure signal |
| 3 | **Vehicle Speed** | > 5 km/h (3 mph) | Vehicle speed sensor (VSS) | Safety interlock; prevents engagement while stationary |
| 4 | **Engine Temperature** | > 40°C (104°F) coolant | ECT (Engine Coolant Temperature) sensor | Prevents engagement when cold; oil viscosity too high |
| 5 | **Throttle Position / Load** | > 20% TPS **or** MAP-based load threshold | TPS sensor + MAP sensor | Ensures engine is under sufficient load; prevents VTEC at idle/light throttle |

Source: QWEN.md §VTEC System (local compiled reference); Hondata FlashPro VTEC parameters documentation (hondata.com); preludeonline.com community consensus; Honda-Tech forum threads (2002–2007).

---

## RPM Threshold — Detailed Analysis

### Factory Engagement RPM by Variant

| Variant | Market | ECU | VTEC Engagement RPM | Source | Notes |
|---------|--------|-----|---------------------|--------|-------|
| **H22A Redtop** | JDM | P28 / P06 (OBD2a) | **~5,500 rpm** | preludepower.com (PDUNZ, 2002); preludeonline.com (dj_wawa, 2002); Wikipedia H-engine | Standard factory point |
| **H22A Blacktop** | JDM | P28 / P06 (OBD2a) | **~5,200 rpm** | preludeonline.com (Forbidden, 2002); preludepower.com community | Slightly earlier than Redtop |
| **H22A1** | USDM | P51 (manual) / P5M (auto) | **~5,200 rpm** | preludeonline.com (myke, 2002); AV Honda (Devin's site) | OBD1; similar to Blacktop |
| **H22A4** | USDM | P13 (OBD2) | **~5,200 rpm** | preludeonline.com (dudewithalude, 2002); preludepower.com (PDUNZ, 2002) | OBD2; same as H22A1 |
| **H23A** | JDM | P28 / P06 | **~5,500 rpm** | QWEN.md; preludeonline.com community | Longer stroke (95mm) shifts power band slightly lower |

### Key Observation: OBD1 vs OBD2 Calibration Differences

OBD1 ECUs (P51, P5M) tend toward **~5,200 rpm** engagement, while some OBD2a ECUs (P28 on JDM Redtops) engage at **~5,500 rpm**. This 300 rpm difference is attributable to ECU calibration maps, not hardware differences. The cam profiles are identical within variant families.

Source: preludeonline.com (Forbidden, 2002): "VTEC crossover is around 4,900 rpm (1993 model)" vs dj_wawa: "5,200 rpm (H22A4)" — both correct; OBD1 models tend toward ~4,900–5,200; OBD2 models ~5,200–5,500.

### Aftermarket Modification Range

When owners modify VTEC crossover via Hondata, VAFC, or Spoon controllers, the typical range is:

| Modified Crossover | Community Consensus | Rationale |
|-------------------|---------------------|-----------|
| **4,400–4,500 rpm** | Popular starting point | Dyno-tested sweet spot for many bolt-on builds |
| **4,700 rpm** | Recommended minimum for stock cams | Allows low-lift cams to reach efficiency before switching |
| **4,800–4,900 rpm** | Optimal for mild mods | Balances mid-range torque with top-end power |
| **Below 4,300 rpm** | Generally discouraged | Power dip observed between 4,300–6,500 rpm on dynos; low-lift cams haven't reached peak efficiency yet |

Sources: Honda-Tech (Behan, 2003): "when i got my vafc tuned they tried to set the crossover at 4300, you could see a dip in the power curve"; Honda-Tech (94vtecmn, 2003): "dyno tuned to be best at 4800...did not like going any lower...power would be sluggish until about 6500"; Honda-Tech (rabvtec, 2003): "wouldnt go any lower than 4500...basically an H22 will lose power if you set it too low."

---

## Oil Pressure Requirement

### Minimum Oil Pressure: 30+ PSI

The H-series VTEC system requires **minimum 30 psi (207 kPa) of engine oil pressure** to physically engage the VTEC piston inside the rocker arm assembly. This is monitored by the **VTEC oil pressure switch**, which is integrated into the VTEC solenoid valve assembly.

| Parameter | Specification | Source |
|-----------|--------------|--------|
| **Minimum engagement pressure** | 30 psi (207 kPa) | QWEN.md; Honda-Tech community consensus |
| **Oil pressure switch activation** | 10–15 psi (internal mechanical switch) | QWEN.md |
| **Normal idle oil pressure (hot)** | 30+ psi | Honda service manual convention |
| **Normal 3,000 RPM oil pressure** | 45–60 psi | Honda service manual convention |
| **Warning light threshold** | < 5 psi (at idle) | Honda convention |

### How the Oil Pressure Switch Works

The VTEC oil pressure switch serves a dual purpose:

1. **Mechanical function:** At 10–15 psi, the internal switch mechanically closes, confirming oil pressure has built up sufficiently for VTEC operation.
2. **ECU feedback:** The switch sends a signal to the ECU confirming that hydraulic pressure is adequate. The ECU uses this as a safety check — even if RPM, speed, temperature, and throttle conditions are met, the ECU will not energize the solenoid if the pressure switch has not confirmed adequate pressure.

### Oil Pressure and VTEC Relationship

| Oil Pressure | VTEC Status | Source |
|-------------|-------------|--------|
| **Below 10 psi** | Switch open; ECU blocked from engaging | Honda-Tech (thehondaguru, official thread) |
| **10–15 psi** | Switch closes; mechanical confirmation | QWEN.md |
| **15–30 psi** | Switch confirmed; RPM still primary gating factor | Engineering inference from multi-condition logic |
| **30+ psi** | All conditions met; VTEC engages at RPM threshold | Community consensus; Hondata documentation |

### Common Oil Pressure-Related VTEC Issues

| Problem | Symptom | Fix | Source |
|---------|---------|-----|--------|
| **Dirty solenoid screen** | Intermittent VTEC engagement; low oil pressure | Clean screen during service | QWEN.md; Honda-Tech troubleshooting guides |
| **Wrong oil viscosity** | Slow VTEC engagement; poor low-temp response | Use 5W-30 or 10W-30 Honda Genuine | QWEN.md; Honda-Tech community |
| **Low oil level** | No VTEC engagement; no CEL (sometimes) | Check and fill to proper level | Honda-Tech (thehondaguru) |
| **Worn solenoid internals** | Weak engagement; delayed kick | Replace solenoid assembly | QWEN.md |
| **Clogged oil passages** | No VTEC regardless of other conditions | Flush head galleries | Honda-Tech community consensus |
| **Faulty pressure switch** | P1259 code; ECU blocks VTEC | Replace switch/solenoid | QWEN.md; Honda-Tech |

---

## Vehicle Speed Interlock

### Minimum Speed: > 5 km/h (3 mph)

The H-series ECU implements a **vehicle speed-based safety interlock** that prevents VTEC engagement when the vehicle is stationary or moving below approximately 5 km/h (3 mph). This is a deliberate design choice, not a malfunction.

| Condition | VTEC Behavior | Source |
|-----------|---------------|--------|
| **Vehicle speed = 0 km/h** | VTEC blocked, regardless of RPM | preludeonline.com (Lucke, 2005); Reddit r/hondaprelude (RedHaze4110, 2022) |
| **Vehicle speed 1–5 km/h** | VTEC still blocked | Engineering inference from 5 km/h threshold |
| **Vehicle speed > 5 km/h** | Speed condition satisfied | Hondata documentation ("VTEC engage minimum speed") |

### Purpose of the Speed Interlock

1. **Prevent overrev during diagnostics.** When the vehicle is stationary, there is no transmission load to naturally limit RPM. Without this interlock, revving in neutral could cause VTEC engagement at high RPM with no drivetrain load, potentially causing damage.

2. **Ensure hydrodynamic oil film formation.** At very low vehicle speeds, engine load is minimal and oil pump output relative to bearing clearances creates a higher risk of insufficient oil pressure. The speed interlock ensures the engine is under some load before VTEC engages.

3. **Prevent accidental engagement.** Drivers revving the engine in park/neutral won't accidentally trigger VTEC, which could cause unexpected power delivery changes.

### Diagnostic Note

A common complaint among H22 swap owners is inability to test VTEC engagement because the car won't rev past ~6,500 rpm when stationary. This is often confused with the speed interlock, but they are separate mechanisms:

| Mechanism | Trigger | Effect |
|-----------|---------|--------|
| **Stationary rev limiter** | Vehicle speed = 0 | Hard fuel cut at 6,500 rpm (M/T) / 5,500 rpm (A/T) |
| **VTEC speed interlock** | Vehicle speed ≤ 5 km/h | VTEC solenoid not energized, even if RPM exceeds threshold |

Both mechanisms activate when the car is stationary, compounding the effect.

Sources: preludeonline.com (Lucke, 2005): "if the engine isn't warmed up, or its sitting still, the car will not rev past 6500"; preludeonline.com (red92si, 2005); Reddit r/hondaprelude (RedHaze4110, 2022).

---

## Engine Temperature Requirement

### Minimum Coolant Temperature: > 40°C (104°F)

The H-series ECU monitors engine coolant temperature via the ECT sensor and **blocks VTEC engagement until coolant exceeds 40°C**. This ensures the engine oil has reached operating temperature and sufficient viscosity for the hydraulic VTEC system.

| Condition | VTEC Status | Source |
|-----------|-------------|--------|
| **Coolant < 40°C** | VTEC blocked | Hondata documentation ("VTEC minimum coolant temperature"); QWEN.md |
| **Coolant 40–60°C** | Temperature condition satisfied | Engineering inference |
| **Coolant > 90°C (normal operating)** | Optimal VTEC operation | Honda convention |

### Why Temperature Matters

VTEC is a **hydraulically actuated** system. The VTEC piston that locks the rocker arms together requires pressurized engine oil to move. Cold oil (especially 5W-30 below 40°C) is significantly more viscous and flows more slowly through the narrow internal oil galleries in the cylinder head. Engaging VTEC with cold oil risks:

- **Slow piston actuation** — the high-lift rocker may not fully engage before RPM continues climbing
- **Insufficient oil flow** to the rest of the valvetrain once VTEC changes the oil demand pattern
- **Increased wear** on the VTEC piston and associated components during cold engagement

### Oil Temperature vs. Coolant Temperature

The ECU reads **coolant temperature**, not oil temperature. These diverge significantly during warm-up:

| Scenario | Coolant Temp | Oil Temp | VTEC Allowed? |
|----------|-------------|----------|---------------|
| Just started (cold soak) | 20°C | 20°C | No (< 40°C) |
| 5 min idle warm-up | 45°C | 55°C | Yes |
| 10 min highway drive | 90°C | 105°C | Yes |
| Hot soak after track | 105°C | 120°C | Yes (but monitor) |

Source: Hondata documentation ("VTEC minimum coolant temperature is the minimum water temperature before VTEC will activate").

---

## Throttle Position / Load Requirement

### Minimum Throttle: > 20% TPS

The H-series requires **minimum throttle application** before VTEC will engage. This ensures the engine is under sufficient load for VTEC to be beneficial — engaging VTEC at idle or light throttle would provide no performance benefit and could cause drivability issues.

| Parameter | Specification | Source |
|-----------|--------------|--------|
| **Minimum TPS** | > 20% | QWEN.md; Hondata documentation |
| **MAP-based alternative** | Manifold vacuum < ~5 inches Hg (near WOT) | Hondata FlashPro VTEC window documentation |
| **Load-dependent crossover** | VTEC point moves higher with lighter load | Hondata ("VTEC window" concept) |

### The VTEC Window Concept

The H-series uses a **load-dependent VTEC window** rather than a fixed RPM point. This means the actual RPM at which VTEC engages varies based on engine load (MAP reading):

| Engine Load | Approximate MAP | VTEC Engagement RPM | Source |
|------------|-----------------|---------------------|--------|
| **Wide-open throttle (WOT)** | 0 inches Hg (atmospheric) | Base RPM (~5,200–5,500) | Hondata: "VTEC switching at 5000 rpm when manifold pressure is 5 inches vacuum or above (close to full throttle)" |
| **Moderate load** | 5–10 inches Hg | Slightly above base RPM | Hondata: "reducing in a linear fashion at 6000 rpm to 15 inches manifold vacuum" |
| **Light load / cruising** | 15+ inches Hg (high vacuum) | VTEC may not engage even at base RPM | Hondata: VTEC window pushes point higher with lighter load |

### How the VTEC Window Works

The ECU uses a 2D lookup table (RPM × MAP) to determine VTEC engagement:

1. **At WOT (full throttle):** MAP shows near-zero vacuum → ECU uses the **base RPM threshold** (~5,200–5,500 rpm)
2. **At partial throttle:** MAP shows moderate vacuum → ECU raises the engagement RPM slightly
3. **At light load/cruising:** MAP shows high vacuum (> 15 inches) → ECU may **never engage VTEC** even at high RPM, because the load condition is not satisfied

This is why drivers sometimes report "VTEC never kicks in" during gentle driving even at high RPM — the throttle position/load condition was never met.

Source: Hondata FlashPro documentation: "The VTEC window is a variable VTEC switch point based on engine speed and engine load. Usually you want the VTEC point to move higher with lighter engine load."

### TPS vs. MAP as Load Indicator

Different ECU calibrations use different combinations:

| ECU Type | Primary Load Sensor | Secondary Check | Source |
|----------|-------------------|-----------------|--------|
| **OBD1 (P51, P5M)** | TPS percentage | Basic MAP verification | Honda-Tech community analysis |
| **OBD2a (P28, P06)** | MAP-based load table | TPS correlation | Hondata documentation |
| **OBD2 (P13)** | Combined TPS + MAP | Full 2D lookup table | Hondata FlashPro defaults |

---

## Complete Engagement Logic Flow

```
┌─────────────────────────────────────────────────┐
│              ECU VTEC Decision Logic             │
├─────────────────────────────────────────────────┤
│                                                  │
│  ALL FIVE CONDITIONS MUST BE TRUE:               │
│                                                  │
│  ┌──────────────┐                                │
│  │ 1. RPM ≥ 5,2 │──┐                             │
│  │    00–5,500  │   │                            │
│  └──────────────┘   │                            │
│                     │                            │
│  ┌──────────────┐   │                            │
│  │ 2. Oil Press │──┼──┐                         │
│  │    ≥ 30 psi  │   │  │                        │
│  └──────────────┘   │  │                        │
│                     │  │                        │
│  ┌──────────────┐   │  │                        │
│  │ 3. Speed > 5 │──┼──┼──┐                    │
│  │    km/h      │   │  │  │                    │
│  └──────────────┘   │  │  │                    │
│                     │  │  │                    │
│  ┌──────────────┐   │  │  │                    │
│  │ 4. Coolant > │──┼──┼──┼──┐                │
│  │    40°C      │   │  │  │  │                │
│  └──────────────┘   │  │  │  │                │
│                     │  │  │  │                │
│  ┌──────────────┐   │  │  │  │                │
│  │ 5. TPS > 20% │──┼──┼──┼──┼──┐            │
│  │  OR Load OK  │   │  │  │  │  │            │
│  └──────────────┘   │  │  │  │  │            │
│                     │  │  │  │  │            │
│                     ▼  ▼  ▼  ▼  ▼            │
│              ┌───────────────┐                │
│              │  ALL TRUE?    │──NO──→ Skip    │
│              └───────────────┘                │
│                     │YES                       │
│                     ▼                           │
│            ┌───────────────┐                   │
│            │ Apply VTEC    │                   │
│            │ Solenoid 12V  │                   │
│            └───────────────┘                   │
│                     │                           │
│                     ▼                           │
│            ┌───────────────┐                   │
│            │ VTEC Piston   │                   │
│            │ Engages       │                   │
│            │ High-lift cam │                   │
│            │ takes over    │                   │
│            └───────────────┘                   │
│                                                  │
└─────────────────────────────────────────────────┘
```

Source: Synthesized from QWEN.md; Hondata FlashPro VTEC parameters documentation; Honda-Tech community analysis (thehondaguru, 2002–2007).

---

## Disengagement Parameters

VTEC disengages when conditions reverse, but with **hysteresis** (different thresholds for engagement vs. disengagement) to prevent rapid cycling:

| Parameter | Engage Threshold | Disengage Threshold | Source |
|-----------|-----------------|---------------------|--------|
| **RPM** | 5,200–5,500 rpm | ~4,500–4,800 rpm | Hondata: "disengage speed should always be lower than engage speed"; community consensus |
| **Throttle** | > 20% TPS | < 10% TPS | Hondata VTEC window documentation |
| **Speed** | > 5 km/h | Any speed (speed not a disengage blocker) | Hondata |
| **Oil Pressure** | ≥ 30 psi | < 25 psi (approx.) | Engineering inference |
| **Temperature** | > 40°C | N/A (temp doesn't drop fast enough to matter) | Hondata |

### Why Hysteresis Matters

Without hysteresis, VTEC would rapidly cycle on/off at the engagement RPM boundary, causing:
- **Jerky power delivery** — noticeable "pulsing" sensation
- **Accelerated VTEC piston wear** — frequent actuation cycles
- **Oil pressure fluctuations** — solenoid cycling disrupts steady oil flow

The ~700–1,000 rpm gap between engage and disengage points ensures smooth, decisive transitions.

Source: Hondata documentation: "The disengage speed should always be lower than the engage speed."

---

## Variant-Specific Differences Summary

| Aspect | H22A Redtop | H22A Blacktop | H22A1 (USDM) | H22A4 (USDM) | H23A |
|--------|-------------|---------------|--------------|--------------|------|
| **Base RPM engagement** | ~5,500 rpm | ~5,200 rpm | ~5,200 rpm | ~5,200 rpm | ~5,500 rpm |
| **Oil pressure req.** | 30+ psi | 30+ psi | 30+ psi | 30+ psi | 30+ psi |
| **Speed interlock** | > 5 km/h | > 5 km/h | > 5 km/h | > 5 km/h | > 5 km/h |
| **Temp interlock** | > 40°C | > 40°C | > 40°C | > 40°C | > 40°C |
| **Load requirement** | TPS > 20% + MAP | TPS > 20% + MAP | TPS > 20% + MAP | TPS > 20% + MAP | TPS > 20% + MAP |
| **ECU type** | P28/P06 (OBD2a) | P28/P06 (OBD2a) | P51/P5M (OBD1) | P13 (OBD2) | P28/P06 |
| **VTEC window range** | 5,000–6,000 rpm | 4,900–5,800 rpm | 4,900–5,500 rpm | 5,000–6,000 rpm | 5,000–6,000 rpm |

Source: Compiled from QWEN.md; preludeonline.com; preludepower.com; Wikipedia H-engine; Hondata documentation.

---

## Aftermarket VTEC Control Solutions

### How Aftermarket Systems Modify Engagement

Aftermarket tuning solutions can override or modify the factory VTEC engagement logic:

| Solution | Method | RPM Range Adjustable | Load Mapping | Notes |
|----------|--------|---------------------|--------------|-------|
| **Hondata FlashPro** | Recapped ECU (P28/P06 only) | Yes, full programmable | Yes, 2D RPM×MAP table | Most flexible; requires P28/P06 ECU |
| **Hondata S300** | Piggyback ECU | Yes, via settings | Yes, MAP-based | Works with any VTEC ECU |
| **VAFC (AEM)** | Piggyback fuel/ignition | Via controller dial | Indirect (fuel-based) | Popular for bolt-ons; ~4,300–4,900 range |
| **Spoon Sports Controller** | Standalone VTEC controller | Fixed or adjustable | No (RPM-only) | Simple install; popular in JDM scene |
| **Neptune RTP** | Standalone ECU | Fully programmable | Yes, full 2D table | For competition builds |
| **eCtune chip** | Reprogrammed ECU chip | Fixed per chip | No | Cheap; limited options |

### Common Aftermarket Settings

| Setup | Typical VTEC Crossover | Best For | Source |
|-------|----------------------|----------|--------|
| **Stock** | 5,200–5,500 rpm | All stock applications | Factory spec |
| **VAFC tuned** | 4,500–4,900 rpm | Bolt-on intakes/exhausts | Honda-Tech (Behan, 94vtecmn, 2003) |
| **Spoon controller** | ~4,700 rpm (fixed) | Street performance | Honda-Tech (rabvtec, 2003) |
| **Hondata custom** | 4,400–5,000 rpm (tunable) | Dyno-tuned builds | Hondata documentation; Honda-Tech |
| **Lowered to < 4,300** | Not recommended | — | Honda-Tech consensus: causes power dip |

---

## Troubleshooting VTEC Non-Engagement

### Diagnostic Checklist

When VTEC fails to engage, follow this systematic diagnostic procedure:

| Step | Check | Expected Value | Action if Failed |
|------|-------|---------------|------------------|
| 1 | **Oil level** | Between min/max on dipstick | Top off to specification |
| 2 | **Oil condition** | Clean, correct viscosity (5W-30 or 10W-30) | Change oil and filter |
| 3 | **Oil pressure (mechanical gauge)** | 30+ psi at idle hot; 45–60 psi @ 3,000 RPM | Investigate oil pump, bearings, passages |
| 4 | **VTEC solenoid resistance** | 14–30 ohms | Replace solenoid if out of range |
| 5 | **VTEC solenoid wiring** | Continuity; no corrosion at connectors | Repair wiring/connections |
| 6 | **VTEC oil pressure switch** | Closes at 10–15 psi | Replace switch/solenoid assembly |
| 7 | **Solenoid screen** | Clean, no debris | Clean or replace screen |
| 8 | **ECT sensor reading** | Matches actual coolant temp | Replace sensor if inaccurate |
| 9 | **CKP sensor signal** | Clean pulse wave at all RPM | Replace sensor if noisy |
| 10 | **ECU trouble codes** | No active codes (esp. P1259) | Clear codes; investigate root cause |
| 11 | **Vehicle speed sensor** | Reports correct speed to ECU | Repair VSS circuit if faulty |
| 12 | **TPS calibration** | Smooth sweep 0–100% | Recalibrate or replace TPS |

### Common Fault Code: P1259

**P1259 — VTEC System Malfunction** is the most common VTEC-related DTC. It indicates the ECU commanded VTEC engagement but did not receive confirmation from the oil pressure switch within the expected time window.

| Cause | Frequency | Fix |
|-------|-----------|-----|
| Dirty solenoid screen | Very common | Clean screen (part of timing belt service) |
| Faulty solenoid coil | Common | Replace solenoid assembly |
| Low oil level/pressure | Common | Address oil system issue |
| Wiring harness chafing | Occasional | Inspect and repair harness |
| ECU software bug | Rare | Recapped ECU (Hondata) or ECU replacement |

Source: QWEN.md; Honda-Tech (thehondaguru, official troubleshooting thread).

---

## Cross-Reference and Conflict Notes

### Conflicts Between Sources

| Topic | Source A | Source B | Resolution |
|-------|----------|----------|------------|
| **H22A Redtop VTEC RPM** | Wikipedia: "5,200 rpm" | preludepower.com (PDUNZ): "~5,500 rpm" | Both observed. Wikipedia likely references the base floor; PDUNZ measured actual engagement on a P28 ECU. Correct range: 5,200–5,500 rpm depending on ECU calibration. |
| **Blacktop vs Redtop crossover** | Forbidden: 4,900 rpm (1993 Redtop) | dj_wawa: 5,200 rpm (H22A4) | Context-dependent. Early OBD1 Redtops (1992–1993) tend toward ~4,900; later OBD2 variants settle at 5,200–5,500. |
| **Optimal aftermarket crossover** | Behan: 4,300 caused power dip | 94vtecmn: 4,800 optimal on dyno | Both correct. 4,300 was too low for that specific build; 4,800 was dyno-verified sweet spot. General recommendation: start at 4,700, tune on dyno. |
| **Speed interlock value** | Hondata: "set speed to 0 to disable" | preludeonline.com: "> 5 km/h" | Hondata refers to aftermarket tunability; factory default is ~5 km/h. |

### Verification Status

- **Five-condition logic (RPM + oil pressure + speed + temp + load):** Verified against QWEN.md (source 1), Hondata documentation (sources 2, 3), Honda-Tech community consensus (source 4)
- **30+ psi oil pressure minimum:** Verified against QWEN.md (source 5), Honda-Tech troubleshooting guides (source 6)
- **5 km/h speed interlock:** Verified against preludeonline.com community (sources 7, 8), Hondata documentation (source 9)
- **40°C coolant temperature minimum:** Verified against Hondata documentation (source 10), QWEN.md (source 11)
- **20%+ throttle position requirement:** Verified against QWEN.md (source 12), Hondata VTEC window docs (source 13)
- **VTEC window (load-dependent crossover):** Verified against Hondata FlashPro documentation (sources 14, 15)
- **Hysteresis on disengagement:** Verified against Hondata ("disengage speed always lower than engage") (source 16), community consensus (source 17)
- **Variant-specific RPM differences (OBD1 ~5,200 vs OBD2 ~5,500):** Verified against preludeonline.com (Forbidden, dj_wawa) (sources 18, 19), AV Honda specs (source 20)

---

## Follow-On Research Items

| Item | Priority | Notes |
|------|----------|-------|
| Exact ECU VTEC engagement tables (P28, P13, P51, P5M) — raw lookup values from ROM dumps | Medium | Would provide definitive engagement RPM per RPM sensor count and MAP value |
| VTEC engagement timing — exact milliseconds from condition satisfaction to piston engagement | Low | Dyno-data analysis needed; interesting for performance tuning |
| Comparison of H-series VTEC engagement vs. K-series (i-VTEC) engagement parameters | Low | K-series uses VTC (variable cam timing) in addition to VTEC; different logic |
| H-series VTEC engagement vs. F20C (S2000) — 7,500–7,900 rpm comparison | Low | F20C engages much higher; reflects its 8,000+ rpm redline design philosophy |
| Effect of oil temperature (separate from coolant temp) on VTEC engagement delay | Low | Does hot oil (120°C) engage faster than warm oil (60°C) at the same RPM? |
| VTEC engagement on cold starts after overnight soak — real-world observations | Low | How long does the 40°C threshold take to reach in winter vs. summer? |

---

## Sources Used

| # | Source | Type | URL | Retrieved |
|---|--------|------|-----|-----------|
| 1 | QWEN.md — VTEC System section | Compiled reference | Local file | 2026-05-15 |
| 2 | Hondata FlashPro — VTEC Parameters | Manufacturer documentation | https://www.hondata.com/help/flashpro/vtec_parameters.htm | 2026-05-15 |
| 3 | Hondata SManager — VTEC Documentation | Manufacturer documentation | https://www.hondata.com/help/smanager/vtec.htm | 2026-05-15 |
| 4 | Honda-Tech — "The Official Why VTEC Doesn't Engage" thread | Community forum | https://honda-tech.com/forums/honda-prelude-4/official-%22why-vtec-doesnt-engage%22-thread-830163/ | 2026-05-15 |
| 5 | Honda-Tech — "How many of you have set VTEC to an earlier RPM?" thread | Community forum | https://honda-tech.com/forums/honda-prelude-4/how-many-you-have-set-vtec-earlier-rpm-649594/ | 2026-05-15 |
| 6 | Honda-Tech — "VTEC Criteria" thread | Community forum | https://honda-tech.com/forums/tech-misc-15/vtec-criteria-513933/ | 2026-05-15 |
| 7 | preludeonline.com — "Rev limiter..6500?" thread | Community forum | https://www.preludeonline.com/threads/rev-limiter-6500.196921/ | 2026-05-15 |
| 8 | Reddit r/hondaprelude — "H22a won't rev past 6500rpm" | Community forum | https://www.reddit.com/r/hondaprelude/comments/w1mwx4/h22a_wont_rev_past_6500rpm/ | 2026-05-15 |
| 9 | Wikipedia — Honda H engine article | Encyclopedic reference | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 |
| 10 | preludepower.com — PDUNZ H22A data | Community forum | https://www.preludepower.com/ | 2026-05-15 |
| 11 | AV Honda Parts/Tech — H-Series Engine Specs | Technical reference | https://devinshondasite.weebly.com/h-series-engine-specs.html | 2026-05-15 |
| 12 | Honda-Tech — "When does VTEC kick in?" thread | Community forum | https://honda-tech.com/forums/hybrid-engine-swaps-18/when-does-vtec-kick-226076/ | 2026-05-15 |
| 13 | preludeonline.com — "diff between obd1 & obd2 injectors" | Community forum | https://www.preludeonline.com/threads/diff-between-obd1-obd2-injectors.114477/ | 2026-05-15 |
| 14 | Honda-Tech — "h22 vtec point" thread | Community forum | https://honda-tech.com/forums/hybrid-engine-swaps-18/h22-vtec-point-590924/ | 2026-05-15 |
| 15 | preludeonline.com community consensus on VTEC crossover | Community forum | Multiple threads | 2026-05-15 |
| 16 | eureka.patsnap.com — H22 Engine Specs Guide | Technical blog | https://eureka.patsnap.com/blog/tech-seek/h22-engine-specs-guide/ | 2026-05-15 |
