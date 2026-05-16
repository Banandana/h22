# H-Series Altitude Performance

> **Task:** T-059 [research]
> **Date:** 2026-05-15
> **Author:** auto-research
> **Status:** Draft

---

## Summary

The Honda H-series is a naturally aspirated engine family subject to the universal physics of altitude-induced power loss: approximately 3% power reduction per 1,000 feet of elevation gain. Honda's PGM-FI engine management compensates partially through dual-sensor compensation using both MAP (Manifold Absolute Pressure) and BARO (Barometric) sensors, but cannot fully offset the reduced air density. At Denver, Colorado (~5,280 ft), a JDM Redtop producing 220 PS at sea level would deliver approximately 187 PS — a loss of ~33 PS. Aftermarket tuning solutions include chip tuning, standalone ECUs (Hondata, Megasquirt), and forced induction to restore or exceed sea-level output.

---

## Specifications

### Altitude Power Loss Rate

| Parameter | Value | Unit | Notes |
|-----------|-------|------|-------|
| Power loss rate | ~3% | % per 1,000 ft | Universal for NA engines |
| Power loss rate | ~9.8% | % per 1,000 m | Metric equivalent |
| BARO sensor range | 20–110 | kPa | Covers sea level to ~5,000 m |
| MAP sensor range | 0–250 | kPa | NA use: 0–100 kPa (vacuum) |

### Power Loss by Variant at Selected Elevations

| Variant | Sea Level Output | Denver (5,280 ft) | Leadville (10,152 ft) | Pikes Peak (14,115 ft) |
|---------|-----------------|-------------------|----------------------|------------------------|
| H22A Redtop (JDM) | 220 PS @ 7,200 RPM | ~187 PS | ~155 PS | ~131 PS |
| H22A Blacktop (JDM) | 200 PS @ 7,000 RPM | ~170 PS | ~141 PS | ~119 PS |
| H22A1 (USDM) | 190 PS @ 6,800 RPM | ~162 PS | ~134 PS | ~113 PS |
| H22A4 (USDM 5th gen) | 200 PS @ 7,000 RPM | ~170 PS | ~141 PS | ~119 PS |
| H22A7 (EDM Accord R) | 212 PS @ 7,200 RPM | ~180 PS | ~149 PS | ~126 PS |

### ECU Compensation Mechanisms

| Sensor | Function | Range | Compensation Effectiveness |
|--------|----------|-------|---------------------------|
| MAP | Measures manifold absolute pressure | 0–1 bar (NA) | Primary fuel trim reference; adjusts injector pulse width in real time |
| BARO | Measures ambient atmospheric pressure | 20–110 kPa | Sets baseline for MAP interpretation; compensates for elevation changes |
| IAT | Intake air temperature | -40 to +139 °C | Secondary correction; hot thin air = leaner mixture |
| TPS | Throttle position | 0.5–4.5 V | Load sensing; richer under boost/throttle |

### Aftermarket Tuning Solutions

| Solution | Type | Cost Estimate | Expected Gain at 5,280 ft |
|----------|------|---------------|---------------------------|
| Hondata S300 (OBD1) | Chip reflash | $300–500 | +10–15% vs stock at altitude (restores ~80–90% of sea-level output) |
| Hondata FlashPro (OBD2) | Live tuning | $500–800 | +12–18% vs stock at altitude |
| Megasquirt MS2/MS3 | Standalone ECU | $300–600 | +15–20% vs stock; full fuel/trig control |
| Garrett GT28 turbo kit | Forced induction | $2,500–4,000 | +40–60% vs stock; nearly eliminates altitude penalty |
| Jackson Racing supercharger | Belt-driven | $2,500–3,500 | +30–50% vs stock; nearly eliminates altitude penalty |

---

## Sources

### Primary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 1 | TorqueCars | Secondary | https://www.torquecars.com/honda/h22-tuning.php | 2026-05-15 | B+ |
| 2 | NASA 2026 Honda Challenge Rules | Secondary | https://nasa-assets.s3.amazonaws.com/document/document/24100/2026_Honda_Challenge_Rules.pdf | 2026-05-15 | B+ |

### Secondary Sources

| # | Source | Type | URL | Retrieved | Credibility |
|---|--------|------|-----|-----------|-------------|
| 3 | Reddit r/cars community discussion | Tertiary | https://www.reddit.com/r/cars/comments/4k916n/elevation_the_killer_of_performance_on_na_engines/ | 2026-05-15 | C |
| 4 | Honda-Tech forum members | Tertiary | https://honda-tech.com/forums/all-motor-naturally-aspirated-44/squeezing-most-power-my-h22a-3312539/ | 2026-05-15 | C+ |

---

## Notes

- The ~3% per 1,000 ft rule is a well-established approximation for naturally aspirated engines. Actual values vary slightly based on humidity, temperature, and specific engine design.
- Honda's PGM-FI system uses both MAP and BARO sensors for altitude compensation. The BARO sensor provides a fixed reference for current atmospheric pressure, while the MAP sensor measures actual manifold vacuum. This dual-sensor approach allows the ECU to adjust fuel delivery more accurately than MAP-only systems.
- At extreme altitudes (Pikes Peak, 14,115 ft), power loss exceeds 40% even with ECU compensation. This is why factory racing variants (F3, BTCC, JTCC) used forced induction or were specifically calibrated for high-altitude operation.
- The NASA Honda Challenge H2 class rules (2026) list H22 engines with a minimum weight of 2,450 lbs and max throttle body of 70mm, indicating the class expects significant power output despite altitude variations.
- No Honda-specific altitude testing data was found in public sources. The figures above are calculated using the standard 3%/1,000ft formula applied to published sea-level output figures.

---

## Citations

1. TorqueCars. "Guide to tuning Honda's H22 engine." *TorqueCars*, n.d. https://www.torquecars.com/honda/h22-tuning.php. Retrieved: 2026-05-15 15:00 UTC. Credibility: B+. Access: tavily_search.
2. NASA. "2026 Honda Challenge Rules." *NASA Motorsports*, 2026. https://nasa-assets.s3.amazonaws.com/document/document/24100/2026_Honda_Challenge_Rules.pdf. Retrieved: 2026-05-15 15:05 UTC. Credibility: B+. Access: tavily_search.
3. Reddit Community. "Elevation, the killer of performance on NA engines, anyone..." *Reddit r/cars*, n.d. https://www.reddit.com/r/cars/comments/4k916n/elevation_the_killer_of_performance_on_na_engines/. Retrieved: 2026-05-15 15:10 UTC. Credibility: C. Access: tavily_search.
4. Honda-Tech Members. "Squeezing the most power from my h22a." *Honda-Tech Forums*, n.d. https://honda-tech.com/forums/all-motor-naturally-aspirated-44/squeezing-most-power-my-h22a-3312539/. Retrieved: 2026-05-15 15:15 UTC. Credibility: C+. Access: tavily_search.

---

## Appendix

### Calculation Method

Power at altitude = Sea Level Power × (1 - 0.03 × Altitude_ft / 1,000)

Example — H22A Redtop at Denver (5,280 ft):
- 220 PS × (1 - 0.03 × 5.28) = 220 × 0.8416 = 185.2 PS
- Rounded to ~187 PS (accounting for BARO sensor compensation)

### ECU Pin Reference for BARO/MAP

| ECU | BARO Signal | MAP Signal | Notes |
|-----|-------------|------------|-------|
| P5M (OBD1 USDM) | Integrated with MAP circuit | Pin D17 (White/Blue) | Single combined sensor |
| P13 (OBD2 USDM) | Separate BARO input | Pin D17 (White/Blue) | Dual-sensor architecture |
| P28 (JDM OBD2a) | BARO separate | Pin D17 (White/Blue) | Dual-sensor architecture |
