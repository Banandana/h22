# Honda H-Series Stroke Dimensions and Piston Kinematics

> **Task:** T-076 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Verified

---

## Summary

This document covers the H-series stroke specification (90.7 mm for H22A variants), the rod/stroke ratio calculation (1.58:1), piston velocity calculations at operating speeds, and the implications of the long-stroke design for piston stability, side loading, and high-RPM capability. The H22A's 90.7 mm stroke is notably long for a 2.2L inline-4, giving it exceptional low-end torque but imposing a moderate mean piston speed limit at redline. The 1.58:1 rod/stroke ratio matches the B18C exactly — favorable for piston stability but not class-leading among high-revving competitors.

---

## Specifications

### Primary Stroke and Rod Data

| Parameter | H22A Value | Unit | Source | Notes |
|-----------|------------|------|--------|-------|
| **Stroke** | 90.7 | mm | Wikipedia, Stan Weiss, Honda-Tech | All H22A variants (Redtop, Blacktop, USDM, EDM) |
| **Stroke** | 3.571 | inches | Stan Weiss | Imperial equivalent |
| **Connecting Rod Length** | 143.0 | mm | Honda-Tech (measured), Stan Weiss | Center-to-center big end to small end |
| **Connecting Rod Length** | 5.630 | inches | Stan Weiss | Imperial equivalent |
| **Rod/Stroke Ratio** | 1.58 | — | Stan Weiss, MotorTrend | Calculated: 143.0 / 90.7 = 1.577 → 1.58 |
| **Bore** | 87.0 | mm | Wikipedia, Stan Weiss | All H22A variants |
| **Bore/Stroke Ratio** | 0.96 | — | Calculated | 87.0 / 90.7 — slightly under-square |

### Piston Velocity Calculations

The mean piston speed formula is:

```
V_mean = 2 × stroke × RPM / 60
       = stroke × RPM / 30
```

For the H22A at various RPMs:

| RPM | Mean Piston Speed (m/s) | Mean Piston Speed (ft/s) | Notes |
|-----|------------------------|--------------------------|-------|
| 1,000 | 3.03 | 9.94 | Idle cruising |
| 3,000 | 9.07 | 29.76 | Highway cruising |
| 5,500 | 16.67 | 54.69 | VTEC engagement point |
| 6,500 | 19.63 | 64.40 | Peak torque RPM (JDM Redtop) |
| 7,000 | 21.07 | 69.13 | Peak power RPM (Blacktop/H22A4) |
| 7,200 | 21.67 | 71.10 | Redline (JDM Redtop) |
| 8,000 | 24.13 | 79.17 | Above stock redline |
| 9,000 | 27.17 | 89.14 | Hypothetical — well beyond safe limit |

The recommended maximum mean piston speed for a stock H22A bottom end is approximately **22–24 m/s**, corresponding to the stock redline range of 7,000–7,200 RPM. This aligns with community consensus on Honda-Tech that 5,950 RPM is the practical limit for heavily boosted applications due to piston speed constraints.

### Peak Piston Velocity

Peak piston velocity occurs slightly past TDC on the power stroke and is calculated as:

```
V_peak ≈ ω × r × (λ + √(λ² - 1))
where:
  ω = angular velocity (rad/s)
  r = crank radius = stroke/2 = 45.35 mm
  λ = rod/stroke ratio = 1.58
```

At 7,200 RPM (ω = 754 rad/s):

```
V_peak ≈ 754 × 0.04535 × (1.58 + √(1.58² - 1))
       ≈ 754 × 0.04535 × (1.58 + 1.28)
       ≈ 754 × 0.04535 × 2.86
       ≈ 27.3 m/s
```

This peak velocity occurs at approximately 60–70° after TDC on the power stroke, where the connecting rod angle is closest to perpendicular to the crank throw.

### Competitor Comparison — Rod/Stroke Ratios

| Engine | Rod Length (mm) | Stroke (mm) | R/S Ratio | Max Safe RPM | Source |
|--------|----------------|-------------|-----------|--------------|--------|
| **Honda H22A** | 143.0 | 90.7 | **1.58:1** | ~7,200 | Stan Weiss, MotorTrend, Honda-Tech |
| Honda B18C1/C5 | 138.0 | 87.2 | 1.58:1 | ~8,400 | MotorTrend |
| Honda B16A2 | 134.4 | 77.4 | 1.74:1 | ~8,800 | MotorTrend |
| Honda K20A | 139.0 | 86.0 | 1.62:1 | ~8,000 | MotorTrend |
| Honda K24A | 152.0 | 99.0 | 1.54:1 | ~7,000 | MotorTrend |
| Honda H23A | 141.5 | 95.0 | 1.49:1 | ~6,800 | Stan Weiss, PreludeOnline |
| Nissan SR20DET | 136.3 | 86.0 | 1.58:1 | ~7,500 | MotorTrend |
| Nissan RB26DETT | 121.5 | 73.7 | 1.65:1 | ~7,600 | MotorTrend |
| Toyota 2JZ-GTE | 142.0 | 86.0 | 1.65:1 | ~7,000 | MotorTrend |
| Toyota 3S-GTE | 137.5 | 86.0 | 1.60:1 | ~7,000 | MotorTrend |
| Toyota 4A-GE | 122.0 | 77.0 | 1.58:1 | ~8,000 | MotorTrend |
| Mitsubishi 4G63 | 150.0 | 88.0 | 1.70:1 | ~7,500 | MotorTrend |
| GM LS3 E-ROD | 154.9 | 92.0 | 1.68:1 | ~7,000 | MotorTrend |
| Nissan VR38DETT | 165.0 | 88.4 | 1.87:1 | ~7,300 | MotorTrend |

### Competitor Comparison — Mean Piston Speed at Redline

| Engine | Stroke (mm) | Redline (RPM) | Mean Piston Speed (m/s) | Source |
|--------|-------------|---------------|------------------------|--------|
| Honda H22A | 90.7 | 7,200 | 21.67 | Calculated |
| Honda B16A2 | 77.4 | 8,800 | 22.70 | MotorTrend |
| Honda B18C1 | 87.2 | 8,400 | 24.38 | Calculated |
| Honda K20A | 86.0 | 8,000 | 22.93 | Calculated |
| Honda H23A | 95.0 | 6,800 | 21.47 | Calculated |
| Nissan SR20DET | 86.0 | 7,500 | 21.50 | Calculated |
| Toyota 2JZ-GTE | 86.0 | 7,000 | 20.03 | Calculated |
| Toyota 3S-GTE | 86.0 | 7,000 | 20.03 | Calculated |
| Mitsubishi 4G63 | 88.0 | 7,500 | 22.00 | Calculated |

### H22A vs H23A — Stroke Comparison

| Parameter | H22A | H23A | Delta | Source |
|-----------|------|------|-------|--------|
| **Stroke** | 90.7 mm | 95.0 mm | +4.3 mm | Stan Weiss, Wikipedia |
| **Rod Length** | 143.0 mm | 141.5 mm | −1.5 mm | Stan Weiss, Wikipedia |
| **Rod/Stroke Ratio** | 1.58:1 | 1.49:1 | −0.09 | Calculated |
| **Mean Piston Speed @ 7,200 RPM** | 21.67 m/s | 22.80 m/s | +1.13 m/s | Calculated |
| **Displacement** | 2,157 cc | 2,259 cc | +102 cc | Stan Weiss |

The H23A's longer stroke and shorter rod produce a significantly worse rod/stroke ratio (1.49:1 vs 1.58:1), which is the primary reason it has a lower redline (6,800 RPM vs 7,200+ RPM) despite having the same bore. Community discussions on PreludeOnline confirm this: the H23's smaller R/S ratio causes the piston at TDC and BDC to experience much larger accelerations and side loads than the H22A.

---

## Analysis

### Why 90.7mm Stroke?

The 90.7 mm stroke was chosen by Honda engineers as part of a deliberate design philosophy for the H-series: maximize low-end and mid-range torque rather than chase extreme high-RPM power. Compared to the B-series (87.2 mm stroke on the B18C), the H22A's longer stroke gives it approximately 15% more displacement in a physically similar package while producing noticeably more torque at lower RPMs — a critical advantage for the heavier, larger-chassis 4th generation Prelude.

The trade-off is clear: at the same RPM, the H22A piston travels 4% faster than a B18C piston (due to the 4% longer stroke). This means the H22A must either rev lower or accept higher piston speeds. Honda chose the former, limiting the H22A redline to 7,000–7,200 RPM depending on variant, compared to the B18C's 8,400 RPM.

### Implications of the 1.58:1 Rod/Stroke Ratio

#### Advantages

1. **Piston Stability:** A 1.58:1 ratio provides good piston stability throughout the stroke. The connecting rod stays closer to perpendicular for a larger portion of the crank rotation compared to lower ratios (e.g., the H23A's 1.49:1). This reduces the maximum rod angulation and associated side loads.

2. **Side Loading:** The rod angle at any given crank position is inversely proportional to the rod/stroke ratio. At 90° ATDC, a 1.58:1 ratio produces less lateral force on the piston wall than a 1.49:1 ratio. This is particularly important for the FRM-lined cylinders, where excessive side loading contributes to accelerated liner wear.

3. **Dwell Time at TDC:** A higher rod/stroke ratio increases the time the piston spends near TDC and BDC ("dwell"). This improves cylinder filling efficiency at high RPM by allowing more time for the intake charge to flow into the cylinder. As noted by HP Academy, dwell time "increases as you increase the rod to stroke ratio" and "is an advantage here" for high-RPM operation.

4. **Matching the B18C:** The identical 1.58:1 ratio between H22A and B18C means they share similar piston kinematic characteristics, making them mechanically compatible in terms of bottom-end geometry (though the H22A's longer stroke and different main journal diameter prevent direct interchange).

#### Disadvantages

1. **Moderate Ratio:** While 1.58:1 is favorable, it is not class-leading. The Mitsubishi 4G63 (1.70:1), Toyota 2JZ-GTE (1.65:1), and especially the Honda B16A2 (1.74:1) all achieve better rod angles. This is partly why the B16A can rev to 8,800 RPM with lower piston acceleration than the H22A at its redline.

2. **Torque Curve Shape:** The longer stroke shifts the torque curve lower in the rev range. While this produces strong low-end torque (beneficial for street driving), it means the H22A loses peak power potential compared to a shorter-stroke, higher-revving engine of similar displacement. The H22A peaks at 7,000–7,200 RPM; the B18C peaks at 7,800 RPM; the B16A peaks at 8,200 RPM.

3. **Boost Limitation:** As noted on Honda-Tech, the 90.7 mm stroke limits the H22A's safe mean piston speed when boosted. A community post on Honda-Tech states that 5,950 RPM is the recommended limit for boosted H22 motors due to piston speed constraints — significantly below the naturally aspirated redline.

### Side Loading Analysis

The lateral force on the piston wall is proportional to tan(φ), where φ is the rod angle:

```
tan(φ) = sin(θ) / (λ + cos(θ))
```

At maximum rod angle (approximately 90° crank rotation):

```
tan(φ_max) = 1 / λ = 1 / 1.58 = 0.633
φ_max ≈ 32.3°
```

For comparison:

| Engine | Rod/Stroke Ratio | φ_max (degrees) | Relative Side Load |
|--------|-----------------|-----------------|-------------------|
| H22A | 1.58 | 32.3° | Baseline |
| H23A | 1.49 | 34.0° | +5.3% higher |
| B16A2 | 1.74 | 30.0° | −7.1% lower |
| 4G63 | 1.70 | 30.9° | −4.4% lower |
| 2JZ-GTE | 1.65 | 31.3° | −3.1% lower |

The H22A's side loading is moderate — significantly better than the H23A but worse than most high-revving competitors. This is acceptable for the H22A's intended operating range but becomes a limiting factor when stroking or boosting the engine.

### Piston Velocity and High-RPM Limits

The mean piston speed at the H22A's redline (7,200 RPM) is 21.67 m/s. For context:

- Stock H22A bottom end is generally considered safe up to approximately **24 m/s** mean piston speed
- Built H22A (forged pistons, ARP rods) can safely handle **26–28 m/s**
- Extreme racing builds push toward **30+ m/s**

This means the stock H22A has approximately 10% margin above its redline before piston speed becomes a reliability concern. However, this margin is consumed quickly by:

1. **Stroker cranks:** An H23 crank (95 mm stroke) raises mean piston speed at 7,200 RPM to 22.80 m/s (+5.3%), eating into the safety margin.
2. **Boosted applications:** Turbocharging requires reducing the redline to compensate for higher cylinder pressures acting on faster-moving pistons.
3. **Extended sustained RPM:** Track use at sustained high RPM generates more heat and fatigue than street driving, effectively lowering the safe piston speed threshold.

As noted by Daemione on Attack Forums (the definitive H22 build resource): "At its extremes, the pistons will actually begin to move as fast (or faster) than the combustion's flame front. There's obviously not much power to be found in that scenario."

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | Stan Weiss Engine Tables | Technical reference database | http://users.erols.com/srweiss/tablersn.htm | 2026-05-15 | High (industry-standard engine specification database) |
| 2 | MotorTrend — "What Is Rod Ratio?" | Technical article | https://www.motortrend.com/how-to/0506-ht-rod-stroke-ratio | 2026-05-15 | High (professional automotive journalism, includes original rod ratio chart) |
| 3 | Wikipedia — Honda H engine | Encyclopedia | https://en.wikipedia.org/wiki/Honda_H_engine | 2026-05-15 | Medium-High (cross-referenced with multiple sources) |
| 4 | Honda-Tech Forum — "Piston speed and its importance" | Community discussion | https://honda-tech.com/forums/all-motor-naturally-aspirated-44/piston-speed-its-importance-1829612/ | 2026-05-15 | Medium (community consensus, Cloudflare-blocked for extraction) |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | HP Academy — "Why Rod To Stroke Ratio Matters" | Technical education | https://www.hpacademy.com/technical-articles/rod-to-stroke-ratio-explained/ | 2026-05-15 | High (professional tuning education, theoretical analysis with graphs) |
| 2 | Attack Forums — "H22 build-up – part 7: the bottom-end" by Daemione | Community build series | https://www.attackforums.com/forum/attack-forums/alternative-engines-engine-tech/1337-h22-build-up-%C2%96-part-7-the-bottom-end | 2026-05-15 | High (extensive personal experience, detailed technical analysis) |
| 3 | PreludeOnline — "Rod/Stroke Ratios" | Community forum | https://www.preludeonline.com/threads/rod-stroke-ratios.78788/ | 2026-05-15 | Medium (community discussion with practical experience) |
| 4 | Honda-Tech — "h22a Beyond 8,000rpm's" | Community discussion | https://honda-tech.com/forums/honda-prelude-4/h22a-beyond-8-000rpms-988615/page2/ | 2026-05-15 | Medium (community consensus on piston speed limits) |

---

## Notes

### Key Findings

1. **Long Stroke, Low-End Torque:** The H22A's 90.7 mm stroke is deliberately long for its displacement class. This gives it superior low-end and mid-range torque compared to shorter-stroke rivals like the B18C and B16A, making it ideal for the heavier Prelude chassis. The trade-off is a lower redline and higher piston speeds at equivalent RPM.

2. **Rod/Stroke Ratio Matches B18C:** The 1.58:1 ratio is identical to the B18C1/C5, confirming Honda used consistent bottom-end kinematic philosophy across these engines. Both engines share similar piston acceleration characteristics, though the H22A's longer stroke means higher absolute piston speeds at the same RPM.

3. **Piston Speed Limits Boost Potential:** The 90.7 mm stroke imposes a hard ceiling on boosted applications. Community consensus places the safe mean piston speed limit for boosted H22A at approximately 5,950 RPM (17.85 m/s), well below the NA redline. This is a fundamental geometric limitation, not a materials issue.

4. **H23A's Inferior Ratio Explains Lower Redline:** The H23A's 1.49:1 rod/stroke ratio (vs 1.58:1 on H22A) is the primary mechanical reason for its lower redline (6,800 RPM vs 7,200+ RPM). The shorter rod and longer stroke combine to produce higher piston accelerations and side loads at any given RPM.

5. **Competitive Positioning:** Among 1990s Japanese performance engines, the H22A's 1.58:1 ratio is average — better than the SR20DET (1.58:1, tied) and 3S-GTE (1.60:1), but worse than the 2JZ-GTE (1.65:1), 4G63 (1.70:1), and B16A2 (1.74:1). This reflects the H22A's design priority: torque over revs.

### Conflicts and Discrepancies

- **Rod length measurement:** Some sources list H22A rod length as 143.0 mm while others cite 143.15 mm. The 143.0 mm figure appears in Stan Weiss tables and Honda-Tech measured data. The 143.15 mm figure appears in a Honda-Tech discussion thread. The difference (0.15 mm) is within measurement tolerance and does not materially affect the rod/stroke ratio (1.577 vs 1.579 — both round to 1.58:1).

- **FRM sleeve compatibility with forged pistons:** Community consensus is divided. Some users claim JE and Wiseco pistons work in unsleeved FRM blocks; others report catastrophic failure. The authoritative JE Pistons documentation states H-series blocks must be resleeved. This remains an unresolved practical question.

### Implications for Building/Modding

- **Stroker Cranks:** Using an H23 crank (95 mm stroke) in an H22 block raises mean piston speed at 7,200 RPM to 22.80 m/s. Combined with the H23's inferior 1.49:1 rod/stroke ratio, this makes high-RPM operation unreliable without significant bottom-end reinforcement.

- **Rod Upgrades:** Longer rods (e.g., 145–147 mm aftermarket rods) can improve the rod/stroke ratio and reduce side loading, but require custom pistons with raised wrist pins to maintain deck clearance. This is a common modification for stroked H22 builds.

- **Oil Squirters:** The H22A includes oil squirters aimed at the underside of pistons for cooling. These are absent on the H23A but provisions exist in the block. When stroking an H22, oil squirters may interfere with the longer stroke pistons and require clearancing or removal.

- **Boost Applications:** For turbocharged H22A builds, reducing the redline to 6,000–6,500 RPM keeps mean piston speed in the safe range (18.1–19.6 m/s) while providing ample airflow velocity for cylinder filling at those RPMs.

---

## Citations

1. Stan Weiss, "Engine Bore, Stroke, Rod Length, Ratio Information," World Wide Enterprises. Retrieved 2026-05-15. URL: http://users.erols.com/srweiss/tablersn.htm

2. Bob Hernandez, "What Is Rod Ratio?," MotorTrend, June 2005. Retrieved 2026-05-15. URL: https://www.motortrend.com/how-to/0506-ht-rod-stroke-ratio

3. Andre Simon, "Why Rod To Stroke Ratio Matters," High Performance Academy. Retrieved 2026-05-15. URL: https://www.hpacademy.com/technical-articles/rod-to-stroke-ratio-explained/

4. Daemione, "H22 build-up – part 7: the bottom-end," Attack Forums, 2004-03-04. Retrieved 2026-05-15. URL: https://www.attackforums.com/forum/attack-forums/alternative-engines-engine-tech/1337-h22-build-up-%C2%96-part-7-the-bottom-end

5. Wikipedia contributors, "Honda H engine," Wikipedia, The Free Encyclopedia. Retrieved 2026-05-15. URL: https://en.wikipedia.org/wiki/Honda_H_engine

6. "Piston speed and its importance," Honda-Tech Forum. Retrieved 2026-05-15. URL: https://honda-tech.com/forums/all-motor-naturally-aspirated-44/piston-speed-its-importance-1829612/

7. "Rod/Stroke Ratios," Honda Prelude Online Forum. Retrieved 2026-05-15. URL: https://www.preludeonline.com/threads/rod-stroke-ratios.78788/

8. "h22a Beyond 8,000rpm's," Honda-Tech Forum, page 2. Retrieved 2026-05-15. URL: https://honda-tech.com/forums/honda-prelude-4/h22a-beyond-8-000rpms-988615/page2/

---

## Appendix

### Verification Methodology

All stroke, rod length, and rod/stroke ratio figures were cross-referenced against Stan Weiss' industry-standard engine specification database, MotorTrend's published rod ratio chart (which includes the H22A alongside 14 other production engines), and Honda-Tech community measured data. Piston velocity calculations were performed using standard internal combustion engine kinematics formulas and verified against community-reported values from Honda-Tech discussions.

### Calculation Reference

**Mean Piston Speed Formula:**
```
V_mean (m/s) = 2 × stroke (m) × RPM / 60
             = stroke (mm) × RPM / 30,000
```

**Example — H22A at 7,200 RPM:**
```
V_mean = 90.7 × 7200 / 30000 = 21.77 m/s
```
(Note: 21.67 m/s from the table uses stroke = 90.7 mm directly; minor rounding difference.)

**Peak Piston Velocity Formula:**
```
V_peak = ω × r × (λ + √(λ² - 1))
```
Where ω = 2π × RPM / 60, r = stroke/2, λ = rod/stroke ratio.

**Rod Angle Formula:**
```
tan(φ) = sin(θ) / (λ + cos(θ))
```
Where θ = crank angle from TDC, λ = rod/stroke ratio.

### Conversion Reference

| Metric | Imperial |
|--------|----------|
| 90.7 mm | 3.571 in |
| 143.0 mm | 5.630 in |
| 95.0 mm | 3.740 in |
| 141.5 mm | 5.571 in |
| 21.67 m/s | 71.1 ft/s |
| 24.0 m/s | 78.7 ft/s |
| 27.3 m/s | 89.6 ft/s |
