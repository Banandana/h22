# Phase 3: H-Series Engine Variants Detailed Research

This plan doc contains the authoritative specs for Phase 3 tasks covering detailed research on each H-series engine variant.

---

### T-122

**Description:** Research H22A Redtop specifications: 220 PS @ 7200 RPM, 221 Nm @ 6500 RPM, 11.0:1 compression, dome pistons. Compile a comprehensive specification sheet covering power output, torque curve, compression ratio, piston design, camshaft profiles, intake/exhaust systems, block architecture, ECU calibration, and all supporting internal component data. Cross-reference against Wikipedia, Honda-Tech, mywikimotors, local service manuals, and enthusiast technical resources.

**Depends on:** T-121 (H22A Redtop JDM origin)

**Spawns:** None directly; follow-on tasks T-123 through T-150 cover camshafts, intake, exhaust, applications, ECU, transmission, and performance topics.

**DoD notes:** This is a pure research task — no code changes. Focus on accuracy of numbers, proper source attribution, and noting any conflicts between sources (e.g., VTEC engagement RPM varies between 5,200–5,500 RPM across sources). The research file should be written to `research/h-series/specifications/h22a-redtop-specifications.md` following the template in `research/template.md`.

---

### T-131

**Description:** Research H22A Redtop ATTS (Active Torque Transfer System): SH model application, clutch pack, bias ratio — full spec. Compile comprehensive documentation on Honda's world-first FWD torque-vectoring system introduced on the 1997 Prelude Type SH. Cover MCU (Motor Control Unit) architecture with triple-pinion planetary gear assembly, two hydraulic multi-disc wet clutches, 80:20 max torque bias ratio, ~15% outer wheel overdrive, control sensors and ECU communication, fluid specifications, diagnostic DTC codes 61–66, suspension integration requirements, and engineering heritage from 1987 test mule through to SH-AWD successor.

**Depends on:** None directly; benefits from T-122 (Redtop specs) and T-127 (Redtop applications) for context.

**Spawns:** None directly; follow-on tasks T-132 through T-150 cover suspension, braking, wheels, weight, performance, and other topics.

**DoD notes:** This is a pure research task — no code changes. Focus on accuracy of technical specifications (clutch pack design, bias ratios, overdrive percentages), proper source attribution (Honda official engineering article, BB6 Helms Manual OCR), and noting any conflicts between sources (e.g., 80:20 vs 85:15 bias ratio discrepancy). The research file should be written to `research/h-series/specifications/h22a-redtop-atts.md` following the template in `research/template.md`. Cross-reference against Honda Global Technology article, Fisher Discount blog, CarThrottle, AutoZine, local BB6 manual OCR, and QWEN.md.
