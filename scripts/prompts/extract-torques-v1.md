# Torque & Fastener Extraction Prompt v1

You are extracting torque specifications and fastener data from Honda service manual pages.

## Instructions

1. Examine the page image carefully. Look for:
   - Torque specification tables
   - Bolt/nut torque callouts near illustrations
   - Thread size annotations (M6, M8, M10, etc.)
   - Torque values in N·m, kgf·m, and/or lbf·ft
   - Multi-step torque sequences (e.g., "39 N·m + 90°")
   - Lubrication notes (dry, oiled, Loctite)
   - Reusability notes
   - Special tool references
   - Part numbers

2. For each fastener found, emit one JSON object conforming to the schema below.

3. If you are unsure about any field, set `confidence: "low"` and leave the field null.

4. If a field is not present on the page, omit it or set to null. Do NOT invent values.

5. Emit unknown attributes into `meta` rather than guessing.

6. If no fasteners/torques are on this page, emit an empty array [].

## Output Format

Output a JSON array of objects. Each object must conform to this schema:

```json
{
  "id": "auto-generated-stable-id",
  "source": {
    "manual": "BB6",
    "page": <page_number>,
    "figure": "<figure_label>" | null
  },
  "applies_to": {
    "trans": "A/T" | "M/T" | "both" | null,
    "trim": "base" | "SH" | "all" | null,
    "my": "<year>" | "all" | null,
    "engine_codes": ["<code>"] | []
  },
  "system": "engine" | "drivetrain" | "chassis" | "body" | "electrical",
  "assembly": "<canonical_slug>",
  "fastener_name": "<verbatim_from_manual>",
  "thread": {
    "nominal_mm": <number> | null,
    "pitch_mm": <number> | null,
    "length_mm": <number> | null,
    "grade": "<8.8|10.9|12.9>" | null
  },
  "qty": <integer>,
  "role": "tty-stretch" | "cap-screw" | "flange-bolt" | "stud-and-nut" | "self-locking-nut" | "castellated-nut" | "banjo-bolt" | "sealing-plug" | "wheel-lug" | "caliper-guide" | "bracket-mount" | "clip-or-clamp" | "other",
  "torque": {
    "steps": [
      { "pass": <integer>, "nm": <number> | null, "kgfm": <number> | null, "lbft": <number> | null, "angle_deg": <number> | null }
    ],
    "sequence_ref": "<reference>" | null
  },
  "lubrication": "dry" | "oiled" | "loctite" | "sealant:<spec>" | null,
  "reusable": <boolean> | null,
  "reuse_conditions": "<text>" | null,
  "honda_part_number": "<PN>" | null,
  "tty": {
    "stretch_max_mm": <number> | null,
    "pre_stretch_mm": <number> | null
  },
  "special_tool": "<tool_PN>" | null,
  "notes": "<text>" | null,
  "confidence": "high" | "medium" | "low",
  "oem": true,
  "meta": {}
}
```

## Role Taxonomy Reference

Use these roles when classifying fasteners:

- **tty-stretch**: Head bolts, main cap bolts, rod cap bolts, flywheel-to-crank bolts (torque-to-yield stretch bolts)
- **cap-screw**: General bolted joints, brackets
- **flange-bolt**: Flanged head bolts, common Honda fastener
- **stud-and-nut**: Exhaust manifold studs, intake manifold studs
- **self-locking-nut**: Exhaust joints, ball joint nuts
- **castellated-nut**: Suspension ball joints, axle nuts
- **banjo-bolt**: Brake hose, fuel rail, oil cooler lines
- **sealing-plug**: Drain plugs, port plugs, freeze plugs
- **wheel-lug**: Wheel nuts/studs
- **caliper-guide**: Brake caliper slider/guide bolts
- **bracket-mount**: Engine mounts, subframe, accessory brackets
- **clip-or-clamp**: Hose clamps, line clips
- **other**: Anything else + free-text in meta.role_note

## Important Notes

- Torque values may appear as multi-step sequences (e.g., pass 1: 39 N·m, pass 2: +90°)
- Thread sizes like "M10×1.25" should be split into nominal_mm=10, pitch_mm=1.25
- If only one unit system is shown (e.g., only N·m), compute approximate conversions for others
- Always include the page number in source.page
- If the same fastener appears multiple times on the page (e.g., different assemblies), emit separate rows
- When in doubt, emit with confidence: "low" rather than guessing
