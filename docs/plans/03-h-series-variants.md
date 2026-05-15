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

### T-143

**Description:** Research H22A Redtop track day viability: reliability on track, cooling capacity, tire wear, brake fade. Compile comprehensive documentation evaluating the H22A Redtop engine and its host chassis (4th gen Prelude BB1/BB2/BB4, 1992–1996) for track day use across four dimensions: (1) engine reliability under sustained high-RPM operation — forged crank/rods, FRM liner oil consumption under track conditions, timing belt tensioner critical failure mode (OBD1 hydraulic auto → H23 manual conversion mandatory), oil system vulnerabilities (wet-sump scavenging limits, PCV-induced crankcase pressure, balance shaft seal failure); (2) cooling capacity — stock 2-row aluminum radiator + passive oil cooling adequacy, recommended upgrades (3-row aluminum radiator, oil cooler kit, silicone hoses, race coolant, higher-capacity fan switch), oil temperature management with/without oil cooler, community consensus on Mugen thermostat/fan switch/radiator cap package; (3) tire wear characteristics — FWD wear pattern (front outer shoulder dominant), OEM 205/55R15 limitations, track tire upgrade path by use case (HPDE vs autocross vs time attack), suspension advantage (double-wishbone front/rear, KYB dampers, 25.4mm front/23.0mm rear ARBs); (4) brake fade resistance — stock VTEC brake upgrade (11.1" ventilated front rotors, Vigor-derived calipers, 57.2mm piston), measured rotor temps (270–280°C after 30 min per Honda-Tech), DOT 3 fluid wet boiling point inadequacy (~140°C), brake fade progression timeline, cost-effective upgrade path (DOT 4 fluid + Hawk HP+ pads + stainless lines = 90% of fade concerns addressed at <$250). Cross-reference against Grassroots Motorsports forum (ChampCar 12-hour endurance report), Honda-Tech forums (reliability threads, brake temp measurements, track setup advice), PreludeOnline (Big Brake Guide, SH track setup thread), PreludePower (autocross setup, 4WS track effects, oil cooler discussion), QWEN.md (motorsport history, common failures, cooling specs, maintenance procedures), YouTube (autocross championship documentation). Include documented track endurance record (ChampCar 12-hour runs, JTCC championship wins, BTCC Super Tourers), real-world acceleration/lap time data, track-day readiness checklist, recommended upgrade path by stage (Stage 0 stock through Stage 3 aggressive), known failure modes under track conditions, comparative assessment vs B18C and K20A for track use, and final viability verdict.

**Depends on:** T-122 (Redtop specs), T-132 (suspension), T-133 (braking), T-134 (wheel/tire specs), T-136 (acceleration/lap times), T-141 (common issues) for context.

**Spawns:** None directly; follow-on tasks T-144 through T-149 cover drag racing, autocross, rally/endurance, winter driving, daily usability, insurance.

**DoD notes:** This is a pure research task — no code changes. Focus on practical, actionable track-day guidance grounded in real-world data. Distinguish between stock capability and upgraded capability. Note that the ChampCar 12-hour endurance report (GRM forum, ross2004, 2018) is the strongest single piece of evidence for H22A track reliability. The timing belt tensioner issue is the single most critical safety item — emphasize this prominently. Oil temperature data is scarce — clearly note when figures are inferred vs measured. Cross-reference brake fade data from Honda-Tech rotor temp measurements against general FWD performance car benchmarks. The research file should be written to `research/h-series/specifications/h22a-redtop-track-day-viability.md` following the template in `research/template.md`.

---

### T-145

**Description:** Research H22A Redtop autocross capability: grip levels, turn-in response, mid-corner stability, driver feedback. Compile comprehensive documentation evaluating the H22A Redtop engine and its host chassis (4th gen Prelude BB1/BB2/BB4, 1992–1996) for autocross competition across four dimensions: (1) mechanical grip levels — double-wishbone front/rear suspension geometry, natural camber curve characteristics, bumpsteer resilience, tire contact patch management under transient load, FWD weight transfer dynamics, stock 205/55R15 vs upgraded tire options (15" and 16" performance summer tires), measured lateral G estimates by setup; (2) turn-in response — steering ratio (15.75:1 standard / 15.61:1 Type SH), rack-and-pinion feel, power steering assist linearity, chassis roll center height (front 58 mm), body roll rate, initial rotation speed through slalom transitions, comparison to B-series Honda chassis (Civic Si, Integra); (3) mid-corner stability — double-wishbone camber control maintaining optimum tire angle through sustained cornering, rear suspension toe/camber optimization with body roll, ATTS torque-vectoring effect on cornering line (Type SH only), chassis torsional rigidity (+24% over 3rd gen), suspension compliance bushing behavior, wheel hop resistance under power exit; (4) driver feedback — steering feel and communication through rack, chassis vibration isolation vs information transmission, VTEC engagement as power delivery cue (~5,500 RPM), pedal modulation (brake pedal lever ratio revision, firm progressive feel), seat support during high-G cornering, visibility (double-wishbone low hoodline advantage), cabin ergonomics for aggressive driving. Cross-reference against Grassroots Motorsports forum autocross setups, Honda-Tech autocross threads, SCCA Super Touring Under class results, StudioVRM race car development logs, PreludePower autocross setup threads, YouTube autocross championship coverage, Hagerty Media driving impressions, Honda press release chassis documentation, and QWEN.md (motorsport history, common failures, maintenance procedures). Include documented autocross competition results, recommended stock-to-augmented upgrade path by stage, known failure modes under autocross conditions (timing belt tensioner critical, oil consumption management, brake fade prevention), comparative assessment vs B18C Integra RS-R and K20A Integra Type R for autocross use, and final viability verdict for each competition level (Novice → Intermediate → Advanced → Competitive).

**Depends on:** T-122 (Redtop specs), T-132 (suspension), T-133 (braking), T-134 (wheel/tire specs), T-135 (weight/balance), T-141 (common issues), T-143 (track day viability) for context.

**Spawns:** None directly; follow-on tasks T-146 through T-149 cover rally/endurance, winter driving, daily usability, insurance.

**DoD notes:** This is a pure research task — no code changes. Focus on practical, actionable autocross guidance grounded in real-world data. Distinguish between stock capability and upgraded capability. Note that documented autocross championship results are scarce — most evidence comes from forum reports and club-level competition. The timing belt tensioner issue carries the same critical safety emphasis as T-143. Oil temperature and brake fade data are equally relevant for autocross (short bursts vs sustained track sessions). Cross-reference suspension geometry data from StudioVRM's disassembly analysis against Honda's official chassis specifications. The research file should be written to `research/h-series/specifications/h22a-redtop-autocross-capability.md` following the template in `research/template.md`.

---

### T-139

**Description:** Research H22A Redtop sound character: exhaust note, intake roar, VTEC kick description, dB levels. Compile comprehensive documentation on the acoustic profile of the H22A Redtop engine: the raspy idle character from double-walled cast-iron headers, the progressive exhaust note build under WOT, the distinctive VTEC crossover at ~5,500 RPM characterized by deeper/louder exhaust tone and sharp pitch shift, the intake roar amplified by the 62.5 mm throttle body and dual-runner manifold with IAB butterfly, and available dB level measurements. Cross-reference against professional reviews (MotorTrend/Automobile Magazine), enthusiast forums (Honda-Tech, PreludePower, NZHondas.com), technical databases (mywikimotors, specsnode.com), community video documentation, and QWEN.md.

**Depends on:** T-122 (Redtop specs), T-124 (intake system), T-125 (exhaust system) for context.

**Spawns:** None directly; follow-on tasks T-140 through T-150 cover collectibility, common issues, restoration, and performance topics.

**DoD notes:** This is a pure research task — no code changes. Focus on accurate description of sound character (not subjective opinions presented as fact), proper source attribution for all claims about VTEC crossover experience, noting any conflicts between sources (e.g., VTEC engagement RPM varies 5,200–5,800 RPM across sources), and clearly distinguishing measured data from estimates (dB levels are scarce — most are estimates based on similar systems). The research file should be written to `research/h-series/specifications/h22a-redtop-sound-character.md` following the template in `research/template.md`.
