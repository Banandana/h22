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

---

### T-142

**Description:** Research H22A Redtop restoration guides: nut-and-bolt examples, frame-off rebuild costs, parts availability. Compile comprehensive documentation on restoring a JDM H22A Redtop engine from disassembly through reassembly. Cover step-by-step teardown/rebuild procedures documented by enthusiasts, complete parts lists with OEM part numbers, frame-off rebuild cost breakdowns (labor + parts), gasket kit pricing, bearing sets, piston/ring options, ARP fastener kits, cylinder sleeving solutions (RS Machine, Darton), remanufactured long-block pricing, used engine sourcing (eBay JDM prices), aftermarket supplier landscape (SpeedFactory Racing, Brian Crower, King Motorsports), and community restoration guides (Honda-Tech threads, YouTube teardown videos). Cross-reference against Honda-Tech forums, PreludePower, eBay listings, SpeedFactory Racing catalog, Yonaka Motor Sports, Engine Part Store, VAPENGINES.com, and QWEN.md.

**Depends on:** None directly; benefits from T-122 (Redtop specs), T-141 (common issues) for context.

**Spawns:** None directly; follow-on tasks T-143 through T-149 cover track day viability, drag racing, autocross, rally, winter driving, daily usability, insurance.

**DoD notes:** This is a pure research task — no code changes. Focus on accurate cost figures (note that prices vary by year/source), proper source attribution with URLs and retrieval timestamps, noting any conflicts between sources (e.g., rebuild cost estimates range widely from $2,500 DIY to $6,000+ shop labor), and clearly distinguishing between OBD1 (H22A1/H22A2) and OBD2 (H22A4) parts differences where relevant. The research file should be written to `research/h-series/specifications/h22a-redtop-restoration.md` following the template in `research/template.md`.

---

### T-139

**Description:** Research H22A Redtop sound character: exhaust note, intake roar, VTEC kick description, dB levels. Compile comprehensive documentation on the acoustic profile of the H22A Redtop engine: the raspy idle character from double-walled cast-iron headers, the progressive exhaust note build under WOT, the distinctive VTEC crossover at ~5,500 RPM characterized by deeper/louder exhaust tone and sharp pitch shift, the intake roar amplified by the 62.5 mm throttle body and dual-runner manifold with IAB butterfly, and available dB level measurements. Cross-reference against professional reviews (MotorTrend/Automobile Magazine), enthusiast forums (Honda-Tech, PreludePower, NZHondas.com), technical databases (mywikimotors, specsnode.com), community video documentation, and QWEN.md.

**Depends on:** T-122 (Redtop specs), T-124 (intake system), T-125 (exhaust system) for context.

**Spawns:** None directly; follow-on tasks T-140 through T-150 cover collectibility, common issues, restoration, and performance topics.

**DoD notes:** This is a pure research task — no code changes. Focus on accurate description of sound character (not subjective opinions presented as fact), proper source attribution for all claims about VTEC crossover experience, noting any conflicts between sources (e.g., VTEC engagement RPM varies 5,200–5,800 RPM across sources), and clearly distinguishing measured data from estimates (dB levels are scarce — most are estimates based on similar systems). The research file should be written to `research/h-series/specifications/h22a-redtop-sound-character.md` following the template in `research/template.md`.
