# Torque & Fastener Extraction Prompt v2

You are extracting torque specifications and fastener data from Honda service manual pages.

## CRITICAL OUTPUT RULE — READ FIRST

Your ENTIRE response MUST be a single JSON array. Nothing before it, nothing after it. No explanation text, no analysis, no markdown code fences, no "Here is the data."

Correct output format:
```json
[
  { "id": "...", "source": {...}, "system": "...", ... },
  { "id": "...", "source": {...}, "system": "...", ... }
]
```

WRONG outputs that will be rejected:
- `{ "fasteners": [ ... ] }` — do NOT wrap in an object
- `{ "analysis": "...", "output": [ ... ] }` — do NOT include analysis text
- `{ "findings": [ ... ] }` — do NOT use different key names
- Any text outside the JSON array
- Multiple JSON objects without array brackets

If there are zero fasteners on the page, output exactly: `[]`

## What to extract

Look for:
- Torque specification tables
- Bolt/nut torque callouts near illustrations
- Thread size annotations (M6, M8, M10, etc.)
- Torque values in N·m, kgf·m, and/or lbf·ft
- Multi-step torque sequences (e.g., "39 N·m + 90°")
- Lubrication notes (dry, oiled, Loctite)
- Reusability notes
- Special tool references
- Part numbers

## Output schema

Each element in the JSON array must be a single JSON object conforming to this exact structure:

```json
{
  "id": "<stable-identifier>",
  "source": {
    "manual": "{manual}",
    "page": <integer-page-number>,
    "figure": null
  },
  "applies_to": {
    "trans": null,
    "trim": null,
    "my": null,
    "engine_codes": []
  },
  "system": "engine",
  "assembly": "<lowercase-hyphenated-slug>",
  "fastener_name": "<verbatim-from-manual>",
  "thread": {
    "nominal_mm": <number-or-null>,
    "pitch_mm": <number-or-null>,
    "length_mm": null,
    "grade": null
  },
  "qty": <integer>,
  "role": "cap-screw",
  "torque": {
    "steps": [
      { "pass": 1, "nm": <number>, "kgfm": <number>, "lbft": <number>, "angle_deg": null }
    ],
    "sequence_ref": null
  },
  "lubrication": "dry",
  "reusable": true,
  "reuse_conditions": null,
  "honda_part_number": null,
  "tty": {
    "stretch_max_mm": null,
    "pre_stretch_mm": null
  },
  "special_tool": null,
  "notes": null,
  "confidence": "high",
  "oem": true,
  "meta": {}
}
```

## Field rules

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Unique identifier: `<assembly>-<fastener>-<seq>` |
| `source.manual` | Yes | MUST be exactly `{manual}` — the value substituted from the prompt template. Never use chapter titles, brand names, or any other text.
| `source.page` | Yes | Integer page number from the image |
| `source.figure` | Yes | String or null |
| `applies_to.trans` | Yes | `"A/T"`, `"M/T"`, `"both"`, or `null` |
| `applies_to.trim` | Yes | `"base"`, `"SH"`, `"all"`, or `null` |
| `applies_to.my` | Yes | Year string or `null` |
| `applies_to.engine_codes` | Yes | Array of strings or empty `[]` |
| `system` | Yes | One of: `engine`, `drivetrain`, `chassis`, `body`, `electrical` |
| `assembly` | Yes | Lowercase hyphenated slug, e.g. `cylinder-head` |
| `fastener_name` | Yes | Verbatim name from the manual |
| `thread.nominal_mm` | Yes | Major diameter in mm or null |
| `thread.pitch_mm` | Yes | Metric pitch or null |
| `thread.length_mm` | Yes | Total length or null |
| `thread.grade` | Yes | `8.8`, `10.9`, `12.9`, or null |
| `qty` | Yes | Integer ≥ 1 |
| `role` | Yes | See role taxonomy below |
| `torque.steps` | Yes | Array with ≥ 1 step; at least one numeric field per step |
| `torque.sequence_ref` | Yes | String or null |
| `lubrication` | Yes | `dry`, `oiled`, `loctite`, or `sealant:<spec>` |
| `reusable` | Yes | Boolean or `null` |
| `reuse_conditions` | Yes | String or `null` |
| `honda_part_number` | Yes | String or `null` |
| `tty` | Yes | Object with `stretch_max_mm` and `pre_stretch_mm` (both nullable) |
| `special_tool` | Yes | String or `null` |
| `notes` | Yes | String or `null` |
| `confidence` | Yes | `"high"`, `"medium"`, or `"low"` |
| `oem` | Yes | Boolean `true` |
| `meta` | Yes | Empty object `{}` |

## Role Taxonomy

Use exactly one of these values for `role`:

- `tty-stretch` — Head bolts, main cap bolts, rod cap bolts, flywheel-to-crank bolts
- `cap-screw` — General bolted joints, brackets
- `flange-bolt` — Flanged head bolts (common Honda fastener)
- `stud-and-nut` — Exhaust/intake manifold studs
- `self-locking-nut` — Nylon-insert locknuts
- `castellated-nut` — Slot-and-cotter pin nuts
- `banjo-bolt` — Hollow bolts for fluid lines
- `sealing-plug` — Drain plugs, port plugs, freeze plugs
- `wheel-lug` — Wheel nuts/studs
- `caliper-guide` — Brake caliper slider/guide bolts
- `bracket-mount` — Engine/subframe/accessory bracket bolts
- `clip-or-clamp` — Hose clamps, line clips, retainers
- `other` — Anything else + add description in `meta.role_note`

## Few-Shot Examples

### Example 1: Single fastener with multi-step torque

```json
[
  {
    "id": "cylinder-head-bolt-1",
    "source": { "manual": "{manual}", "page": 136, "figure": null },
    "applies_to": { "trans": null, "trim": null, "my": null, "engine_codes": ["H22A4"] },
    "system": "engine",
    "assembly": "cylinder-head",
    "fastener_name": "Cylinder head bolt",
    "thread": { "nominal_mm": 12, "pitch_mm": 1.25, "length_mm": null, "grade": null },
    "qty": 10,
    "role": "tty-stretch",
    "torque": {
      "steps": [
        { "pass": 1, "nm": 39, "kgfm": 4.0, "lbft": 29, "angle_deg": null },
        { "pass": 2, "nm": null, "kgfm": null, "lbft": null, "angle_deg": 90 }
      ],
      "sequence_ref": null
    },
    "lubrication": "oiled",
    "reusable": false,
    "reuse_conditions": null,
    "honda_part_number": null,
    "tty": { "stretch_max_mm": null, "pre_stretch_mm": null },
    "special_tool": null,
    "notes": "Torque sequence: 39 N·m then +90° additional rotation",
    "confidence": "high",
    "oem": true,
    "meta": {}
  }
]
```

### Example 2: Multiple fasteners on one page

```json
[
  {
    "id": "oil-pan-bolt-1",
    "source": { "manual": "{manual}", "page": 200, "figure": null },
    "applies_to": { "trans": null, "trim": null, "my": null, "engine_codes": [] },
    "system": "engine",
    "assembly": "oil-pan",
    "fastener_name": "Oil pan bolt",
    "thread": { "nominal_mm": 10, "pitch_mm": 1.25, "length_mm": null, "grade": null },
    "qty": 12,
    "role": "flange-bolt",
    "torque": {
      "steps": [{ "pass": 1, "nm": 9.8, "kgfm": 1.0, "lbft": 7.2, "angle_deg": null }],
      "sequence_ref": null
    },
    "lubrication": "oiled",
    "reusable": true,
    "reuse_conditions": null,
    "honda_part_number": null,
    "tty": { "stretch_max_mm": null, "pre_stretch_mm": null },
    "special_tool": null,
    "notes": "Apply liquid gasket to bolt threads",
    "confidence": "high",
    "oem": true,
    "meta": {}
  },
  {
    "id": "oil-drain-plug-1",
    "source": { "manual": "{manual}", "page": 200, "figure": null },
    "applies_to": { "trans": null, "trim": null, "my": null, "engine_codes": [] },
    "system": "engine",
    "assembly": "oil-pan",
    "fastener_name": "Oil drain plug",
    "thread": { "nominal_mm": 14, "pitch_mm": 1.5, "length_mm": null, "grade": null },
    "qty": 1,
    "role": "sealing-plug",
    "torque": {
      "steps": [{ "pass": 1, "nm": 44, "kgfm": 4.5, "lbft": 32, "angle_deg": null }],
      "sequence_ref": null
    },
    "lubrication": "dry",
    "reusable": false,
    "reuse_conditions": null,
    "honda_part_number": null,
    "tty": { "stretch_max_mm": null, "pre_stretch_mm": null },
    "special_tool": null,
    "notes": null,
    "confidence": "high",
    "oem": true,
    "meta": {}
  }
]
```

### Example 3: No fasteners on page

```json
[]
```

### Example 4: Fastener with Loctite and special tool

```json
[
  {
    "id": "main-cap-bolt-1",
    "source": { "manual": "{manual}", "page": 140, "figure": "Fig 3-7" },
    "applies_to": { "trans": null, "trim": null, "my": null, "engine_codes": ["H22A4"] },
    "system": "engine",
    "assembly": "main-bearing-cap",
    "fastener_name": "Main bearing cap bolt",
    "thread": { "nominal_mm": 14, "pitch_mm": 1.5, "length_mm": null, "grade": "10.9" },
    "qty": 5,
    "role": "tty-stretch",
    "torque": {
      "steps": [
        { "pass": 1, "nm": 49, "kgfm": 5.0, "lbft": 36, "angle_deg": null },
        { "pass": 2, "nm": null, "kgfm": null, "lbft": null, "angle_deg": 45 }
      ],
      "sequence_ref": null
    },
    "lubrication": "oiled",
    "reusable": false,
    "reuse_conditions": null,
    "honda_part_number": "90001-SDA-003",
    "tty": { "stretch_max_mm": null, "pre_stretch_mm": null },
    "special_tool": "07JAB-001020A",
    "notes": "Use specified torque-angle sequence. Replace if stretched.",
    "confidence": "high",
    "oem": true,
    "meta": {}
  }
]
```

## Important Notes

- Torque values may appear as multi-step sequences (e.g., pass 1: 39 N·m, pass 2: +90°)
- Thread sizes like "M10×1.25" should be split into nominal_mm=10, pitch_mm=1.25
- If only one unit system is shown (e.g., only N·m), compute approximate conversions for others
- Always include the page number in source.page
- If the same fastener appears multiple times on the page (e.g., different assemblies), emit separate rows
- When in doubt, emit with confidence: "low" rather than guessing
- Set unknown fields to null (not omitted) — every field must be present
