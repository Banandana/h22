# Torque & Fastener Index — Schema Reference

Canonical reference for every data shape in the H22 torque/fastener index.
A fresh agent reading only this document can write a valid canonical row,
a valid per-invocation response record, and implement the consensus algorithm.

## Table of Contents

- [1. Canonical Row (`h22-torques.jsonl`)](#1-canonical-row-h22-torquesjsonl)
- [2. Per-Invocation Response Record](#2-per-invocation-response-record)
- [3. Role Taxonomy (Closed Enum)](#3-role-taxonomy-closed-enum)
- [4. Applies To Enum](#4-applies-to-enum)
- [5. Confidence Enum](#5-confidence-enum)
- [6. Lubrication Enum](#6-lubrication-enum)
- [7. Consensus Algorithm](#7-consensus-algorithm)
- [8. Conflict Group vs Corroboration](#8-conflict-group-vs-corroboration)
- [9. Database Schema (`h22-torques.db`)](#9-database-schema-h22-torquesdb)
- [10. Retention Guarantees](#10-retention-guarantees)
- [11. Gitignore Policy](#11-gitignore-policy)
- [12. File Layout](#12-file-layout)

---

## 1. Canonical Row (`h22-torques.jsonl`)

One row per fastener per page after consensus + cross-page merge.

```jsonc
{
  // Stable hash derived from (manual, page, fastener_name, assembly).
  // Deterministic across runs; used as primary key in SQLite.
  "id": "BB6-p6617-cylhead-headbolt",

  // Source provenance
  "source": {
    "manual": "BB6" | "OBD1",
    "page": 6617,
    "figure": "Fig 7-12" | null   // optional figure/diagram reference
  },

  // Vehicle applicability — populated when known from manual context
  "applies_to": {
    "trans": "A/T" | "M/T" | "both",
    "trim": "base" | "SH" | "all",
    "my":   "1997" | "1998-2001" | "all",
    "engine_codes": ["H22A4", "H22A1"]   // empty array or omitted if unknown
  },

  // Top-level system classification
  "system": "engine" | "drivetrain" | "chassis" | "body" | "electrical",

  // Canonical slug for the assembly (lowercase, hyphenated)
  "assembly": "cylinder-head",

  // Verbatim fastener name from the manual
  "fastener_name": "Cylinder head bolt",

  // Thread specification
  "thread": {
    "nominal_mm": 10,          // major diameter in mm
    "pitch_mm": 1.25,          // metric pitch (null for imperial)
    "length_mm": null,         // total length if shown
    "grade": null              // 8.8 / 10.9 / 12.9 if specified
  },

  "qty": 10,                   // quantity at this location
  "role": "tty-stretch",       // see §3 Role Taxonomy
  "lubrication": "oiled",      // see §6 Lubrication Enum
  "reusable": false,           // true | false | null (unknown)
  "reuse_conditions": null,    // verbatim condition string if conditional reuse
  "honda_part_number": "90012-PT0-000" | null,
  "special_tool": "07JAB-001020A" | null,
  "notes": "Replace if length > X mm",
  "confidence": "high",        // see §5 Confidence Enum
  "oem": true,                 // false for ARP aftermarket rows

  // Multi-step torque sequence
  "torque": {
    "steps": [
      { "pass": 1, "nm": 39, "kgfm": 4.0, "lbft": 29, "angle_deg": null },
      { "pass": 2, "nm": null, "kgfm": null, "lbft": null, "angle_deg": 90 }
    ],
    "sequence_ref": "BB6 p.6617 fig.2"   // pointer to torque-sequence diagram
  },

  // TTY-specific fields (populated when role is tty-stretch)
  "tty": {
    "stretch_max_mm": null,
    "pre_stretch_mm": null
  },

  // Corroboration block — populated by consensus algorithm (§7)
  "corroboration": {
    "consensus_strategy": "majority-vote-torque-nm" | "unanimous" | "single-source" | "manual",
    "agreeing_invocations": [
      {
        "model_id": "together.kimi-k2-6-fp4",
        "run": "r1",
        "temperature": 0,
        "response_path": "responses/bb6/6617/together__kimi__r1__2026-05-15T22-03-11Z.json"
      }
    ],
    "disagreeing_invocations": [
      {
        "model_id": "anthropic.claude-sonnet-4-6",
        "run": "r1",
        "temperature": 0,
        "response_path": "responses/bb6/6617/anthropic__sonnet__r1__2026-05-15T22-08-15Z.json",
        "their_torque_nm": 44
      }
    ],
    "vote_strength": 0.667,
    "intra_model_consistency": {
      "together.kimi-k2-6-fp4": null
    },
    "single_source": false
  },

  // Cross-page / cross-source disagreement (NOT cross-model — that's corroboration)
  "conflict_group_id": null,

  // Open dict for one-off attributes the vision pass volunteers
  "meta": {}
}
```

### Field rules

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Deterministic hash of `(manual, page, fastener_name, assembly)` |
| `source` | Yes | Always present; `figure` may be null |
| `applies_to` | Yes | All sub-fields required even if `"all"` / `[]` |
| `system` | Yes | Must match one of the 5 enum values |
| `assembly` | Yes | Lowercase, hyphenated slug |
| `fastener_name` | Yes | Verbatim from source |
| `thread` | Yes | `nominal_mm` and `pitch_mm` preferred; others nullable |
| `qty` | Yes | Integer ≥ 1 |
| `role` | Yes | Must be in the role taxonomy (§3) |
| `torque` | Yes | `steps` must contain ≥ 1 step; at least one numeric field per step |
| `lubrication` | Yes | Must match one of the lubrication enum values (§6) |
| `reusable` | Yes | Boolean or null |
| `confidence` | Yes | Must be `"high"`, `"medium"`, or `"low"` (§5) |
| `oem` | Yes | Boolean |
| `corroboration` | Yes | Populated by consensus; never omitted |
| `conflict_group_id` | Yes | String or null |
| `meta` | Yes | Empty object `{}` when unused |

---

## 2. Per-Invocation Response Record

Every API call writes one of these files. Nothing is dropped.

Location: `research/raw-data/torque-specs/responses/<manual>/<page>/<filename>.json`

Filename convention: `<provider>__<model-id>__<run>__<timestamp>Z.json`

Example: `together__kimi-k2-6-fp4__r1__2026-05-15T22-03-11Z.json`

```jsonc
{
  "invocation_id": "together.kimi-k2-6-fp4.r1.2026-05-15T22-03-11Z",
  "manual": "BB6",
  "page": 6617,
  "model_id": "together.kimi-k2-6-fp4",
  "provider": "together",
  "model": "moonshotai/Kimi-K2.6-FP4",
  "run": "r1",
  "temperature": 0,
  "seed": 42,
  "prompt_version": "v1",
  "prompt_hash": "sha256:a1b2c3...",
  "image_hash": "sha256:d4e5f6...",
  "cache_key": "sha256:...",

  // Timing
  "timestamp_start": "2026-05-15T22-03-11.234Z",
  "timestamp_end":   "2026-05-15T22-03-13.891Z",
  "latency_ms": 2657,

  // Token usage
  "tokens": { "input": 1487, "output": 612 },

  // Cost
  "cost_usd": 0.00454,

  // Raw API communication (never stripped)
  "request": { /* exact request body sent to provider */ },
  "response_raw": "...",                        // raw text/JSON returned by the model

  // Parsed output — array of canonical rows WITHOUT the corroboration block
  "response_parsed": [
    { /* canonical row minus corroboration, conflict_group_id, vote_strength, etc. */ }
  ],

  // Populated only if parse/validation failed
  "parse_error": null
}
```

### Field rules

| Field | Required | Notes |
|---|---|---|
| `invocation_id` | Yes | Unique per invocation; includes model, run, timestamp |
| `cache_key` | Yes | SHA256 of `(page_png_bytes, prompt_version, provider, model, temperature, seed)` |
| `response_raw` | Yes | Never modified; the ground truth |
| `response_parsed` | Yes | May be `[]` if parse failed; rows are canonical-minus-corroboration |
| `parse_error` | Yes | Null when parse succeeded; error string otherwise |

### Cache key derivation

```
cache_key = SHA256(page_png_bytes || prompt_version || provider || model || temperature || seed)
```

- `page_png_bytes`: raw bytes of the PNG image for this page
- `prompt_version`: the prompt file version (e.g., `"v1"`)
- `provider`: `"together"` or `"anthropic"`
- `model`: the model identifier string
- `temperature`: float value
- `seed`: integer value

A temp=0 invocation hits cache deterministically. A temp>0 multi-run with
varying seeds correctly misses cache for each new seed.

---

## 3. Role Taxonomy (Closed Enum)

| Role | Description | Examples |
|---|---|---|
| `tty-stretch` | Torque-to-yield stretch bolts | cylinder head, main cap, rod cap, flywheel-to-crank |
| `cap-screw` | General bolted joints | bracket mounts, covers |
| `flange-bolt` | Flanged head bolt (common Honda) | oil pan, valve cover, exhaust |
| `stud-and-nut` | Stud + nut assembly | exhaust manifold, intake manifold |
| `self-locking-nut` | Nylon-insert locknut | exhaust joints, ball joints |
| `castellated-nut` | Slot-and-cotter pin nut | suspension ball joints, axle nut |
| `banjo-bolt` | Hollow bolt for fluid lines | brake hose, fuel rail, oil cooler |
| `sealing-plug` | Plug that seals a passage | drain plugs, port plugs, freeze plugs |
| `wheel-lug` | Wheel nuts or studs | all wheel fasteners |
| `caliper-guide` | Brake caliper slider/guide | caliper slide pins |
| `bracket-mount` | Engine/subframe/accessory brackets | engine mount bolts, subframe bolts |
| `clip-or-clamp` | Hose clamps, line clips, retainers | coolant hose clamps, wiring clips |
| `other` | Free-text fallback | + `meta.role_note` describing the specific type |

When a fastener does not fit any defined role, use `"other"` and populate
`meta.role_note` with a brief description of what the fastener actually is.

---

## 4. Applies To Enum

| Field | Allowed Values |
|---|---|
| `trans` | `"A/T"`, `"M/T"`, `"both"` |
| `trim` | `"base"`, `"SH"`, `"all"` |
| `my` | Any year string from the manual, e.g. `"1997"`, `"1998-2001"`, `"all"` |
| `engine_codes` | Array of strings like `"H22A4"`, `"H22A1"`, or empty `[]` |

---

## 5. Confidence Enum

| Value | Meaning |
|---|---|
| `"high"` | Model is certain; clear callout, unambiguous number |
| `"medium"` | Model is reasonably confident; minor ambiguity (e.g., partially obscured number) |
| `"low"` | Model is unsure; fuzzy callout, missing context, or speculative inference |

Models should self-report `"low"` on any row they are uncertain about.
Low-confidence rows are flagged in rendered views but are still included
in consensus computation.

---

## 6. Lubrication Enum

| Value | Meaning |
|---|---|
| `"dry"` | Bolt/nut surfaces dry, no lubricant |
| `"oiled"` | Lightly oiled or coated |
| `"loctite"` | Threadlocker applied |
| `"sealant:<spec>"` | Specific sealant type (e.g., `"sealant:RTV"`), where `<spec>` is the verbatim specification from the manual |

---

## 7. Consensus Algorithm

Run per fastener, per page, across all invocations for that page.

### Step 1: Collect
Gather all rows from all per-invocation records for the page.

### Step 2: Group
Group rows by the composite key `(assembly, fastener_name, thread.nominal_mm, thread.pitch_mm)`.
Rows in different groups are independent consensus problems.

### Step 3: Cluster by torque
Within each group, cluster rows by their torque value using a tolerance of
`max(2 N·m, 5% of the torque value)`. Example: 39 N·m and 40 N·m cluster
together (difference = 1 N·m < max(2, 1.95) = 2); 39 N·m and 44 N·m do not
(difference = 5 N·m > max(2, 2.2) = 2.2).

### Step 4: Majority wins
The largest cluster wins. Emit one consensus row with:
- `corroboration.agreeing_invocations`: all invocations whose rows landed in the winning cluster
- `corroboration.disagreeing_invocations`: all other invocations (with `their_torque_nm` populated)
- `corroboration.consensus_strategy`: `"majority-vote-torque-nm"`
- `corroboration.vote_strength`: `count(agreeing) / count(total_invocations_for_page)`

### Step 5: No majority → disputed
If no cluster has a strict majority (tie, or three-way split), emit nothing
to `h22-torques.jsonl`. Instead, emit the full candidate set to
`h22-torques-disputed.jsonl` for manual resolution.

### Step 6: Single source
If only one invocation produced a row for this fastener group, emit with:
- `corroboration.single_source: true`
- `corroboration.vote_strength: 1.0`
- `corroboration.consensus_strategy: "single-source"`

Downstream views render these with a "1× single source" badge.

### Step 7: Intra-model consistency
For models that ran N > 1 times at temperature > 0, compute the fraction
of that model's own runs that agreed with each other (within the same
torque tolerance). Populate `corroboration.intra_model_consistency` as an
object keyed by `model_id`, with `null` for single-run models.

---

## 8. Conflict Group vs Corroboration

These are **independent** concerns and both can be populated simultaneously.

| Concern | Field | Scope | What it measures |
|---|---|---|---|
| Model agreement | `corroboration.*` | Single page | Do different AI models agree on the torque value? |
| Source-page agreement | `conflict_group_id` | Across pages | Does the same fastener appear on multiple pages with conflicting torques? |

Example: A crank pulley bolt may appear in both the "Engine Mechanical" chapter
and the "Timing Belt" chapter. If both pages show 147 N·m + 90°, the consensus
rows merge into one with a shared `conflict_group_id: null` (agreement). If one
page shows 147 N·m and another shows 150 N·m, both rows get
`conflict_group_id: "crank-pulley-bolt-cross-page"` and are kept separate.

Corroboration is computed during the per-page consensus pass (§7).
Conflict groups are computed during the cross-page dedup pass (T-424).

---

## 9. Database Schema (`h22-torques.db`)

Single-file SQLite database rebuilt idempotently by `scripts/build-torque-db.mjs`.

### Tables

```sql
-- Source materials
CREATE TABLE chapters (
  id TEXT PRIMARY KEY,                  -- e.g. "bb6.engine-mechanical"
  manual TEXT NOT NULL,                 -- "BB6" | "OBD1"
  name TEXT NOT NULL,
  system TEXT NOT NULL,                 -- engine/drivetrain/chassis/body/electrical
  page_start INTEGER NOT NULL,
  page_end INTEGER NOT NULL
);

CREATE TABLE pages (
  manual TEXT NOT NULL,
  page INTEGER NOT NULL,
  chapter_id TEXT REFERENCES chapters(id),
  image_path TEXT NOT NULL,             -- "images/bb6/p6617.webp"
  ocr_text TEXT,                        -- nullable, optional
  PRIMARY KEY (manual, page)
);

-- Extraction provenance
CREATE TABLE invocations (
  id TEXT PRIMARY KEY,
  manual TEXT NOT NULL,
  page INTEGER NOT NULL,
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  run TEXT NOT NULL,                    -- "r1" | "r2" | ...
  temperature REAL NOT NULL,
  seed INTEGER NOT NULL,
  prompt_version TEXT NOT NULL,
  timestamp_start TEXT NOT NULL,
  latency_ms INTEGER,
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost_usd REAL,
  parse_ok INTEGER NOT NULL,            -- 0|1
  response_path TEXT NOT NULL,          -- relative path to the full JSON record
  FOREIGN KEY (manual, page) REFERENCES pages(manual, page)
);

-- Canonical torque rows (one per fastener after consensus + cross-page merge)
CREATE TABLE torques (
  id TEXT PRIMARY KEY,
  manual TEXT NOT NULL,
  page INTEGER NOT NULL,
  system TEXT NOT NULL,
  assembly TEXT NOT NULL,
  fastener_name TEXT NOT NULL,
  thread_nominal_mm REAL,
  thread_pitch_mm REAL,
  thread_length_mm REAL,
  thread_grade TEXT,
  qty INTEGER,
  role TEXT NOT NULL,
  torque_json TEXT NOT NULL,            -- JSON: steps array
  lubrication TEXT,
  reusable INTEGER,                     -- 0|1|null
  reuse_conditions TEXT,
  honda_part_number TEXT,
  tty_stretch_max_mm REAL,
  tty_pre_stretch_mm REAL,
  special_tool TEXT,
  notes TEXT,
  confidence TEXT,
  oem INTEGER NOT NULL,                 -- 0|1
  conflict_group_id TEXT,
  vote_strength REAL,
  single_source INTEGER,                -- 0|1
  consensus_strategy TEXT,
  meta_json TEXT,
  FOREIGN KEY (manual, page) REFERENCES pages(manual, page)
);

-- Many-to-many: torque ← contributing invocations
CREATE TABLE torque_invocations (
  torque_id TEXT NOT NULL REFERENCES torques(id),
  invocation_id TEXT NOT NULL REFERENCES invocations(id),
  agreement TEXT NOT NULL,              -- "agreeing" | "disagreeing"
  their_torque_nm REAL,                 -- populated for disagreeing
  PRIMARY KEY (torque_id, invocation_id)
);

-- Disputed rows (no majority during consensus)
CREATE TABLE disputes (
  id TEXT PRIMARY KEY,
  manual TEXT NOT NULL,
  page INTEGER NOT NULL,
  assembly TEXT NOT NULL,
  fastener_name TEXT NOT NULL,
  thread_nominal_mm REAL,
  thread_pitch_mm REAL,
  candidates_json TEXT NOT NULL,        -- all candidate torque values + invocations
  resolved INTEGER NOT NULL DEFAULT 0,
  resolution_torque_nm REAL,
  resolution_rationale TEXT
);

-- ARP aftermarket cross-references (segregated)
CREATE TABLE arp_xrefs (
  id TEXT PRIMARY KEY,
  oem_thread_nominal_mm REAL NOT NULL,
  oem_thread_pitch_mm REAL NOT NULL,
  oem_role TEXT NOT NULL,
  arp_part_number TEXT NOT NULL,
  arp_torque_nm REAL,
  arp_lubrication TEXT,
  notes TEXT,
  source_url TEXT
);

-- Full-text search over rendered markdown views
CREATE VIRTUAL TABLE markdown_fts USING fts5(
  view,                                  -- "by-location" | "by-fastener"
  section,                               -- heading path
  body,
  tokenize = 'porter unicode61'
);

-- Build metadata
CREATE TABLE _meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
-- Expected keys: schema_version, built_at, source_jsonl_sha256
```

### Indexes

```sql
CREATE INDEX idx_torques_assembly ON torques(assembly);
CREATE INDEX idx_torques_role_thread ON torques(role, thread_nominal_mm, thread_pitch_mm);
CREATE INDEX idx_torques_manual_page ON torques(manual, page);
CREATE INDEX idx_invocations_model ON invocations(model_id);
CREATE INDEX idx_invocations_page ON invocations(manual, page);
```

---

## 10. Retention Guarantees

Non-negotiable. Every extraction task inherits these.

1. **Raw response on disk first, parse second.** Every API call writes the
   per-invocation record (full schema above) *before* any schema parsing.
   Schema failures trigger re-parse, never re-call.

2. **Content-hash cache.** `SHA256(page_png_bytes, prompt_version, provider,
   model, temperature, seed)` keys every call. Re-runs of identical inputs
   are free; multi-run at varying seeds correctly miss cache.

3. **Stream-to-disk, not buffer-then-write.** Per-invocation flush; a crash
   loses at most one in-flight call.

4. **Every invocation retained.** Sonnet, Opus, Kimi, Qwen3-VL, every run,
   forever. Consensus rows reference paths to every contributing invocation
   (`corroboration.agreeing_invocations[].response_path`).

5. **Schema-extras never dropped.** Unknown keys route into `meta: {}`.

6. **Failed rows preserved.** Validation rejects land in
   `h22-torques-rejects.jsonl` with the full per-invocation record + error.

7. **Re-extraction is opt-in.** Cached responses are reused by default;
   `--no-cache` required to re-call. Adding a new model to the matrix
   triggers calls only for that model (others stay cached).

8. **Prompt versioning.** Prompts live in `scripts/prompts/extract-torques-vN.md`.
   Bumping `v` invalidates cache automatically. Old responses never deleted.

9. **Cost ledger.** Append-only `cost-ledger.jsonl` with
   `{invocation_id, manual, page, provider, model_id, run, temperature,
   seed, input_tokens, output_tokens, cost_usd, latency_ms, timestamp}`
   per call.

10. **Git-tracked durability.** `responses/`, `cache/index.json`, JSONL
    files, markdown — all committed. Page PNG bytes already live in
    `bb6_ocr/images/`.

---

## 11. Gitignore Policy

### Files to gitignore (working set, regenerable)

```gitignore
# OCR working set — >800 MB, regenerable from PDFs
bb6_ocr/images/*.png

# OBD1 source PDF (if acquired, >50 MB)
obd1_source/honda-service-manual-*.pdf

# OBD1 page renders (regenerable via pdftoppm)
obd1_source/pages/*.png

# Large intermediate files
*.tmp
*.bak
```

### Files to track in git (committed artifacts)

| Path | Content | Size estimate |
|---|---|---|
| `SCHEMA.md` | This file | ~5 KB |
| `models.json` | Provider/model registry | ~1 KB |
| `extraction-matrix.json` | Default + high-stakes + rescue tiers | ~1 KB |
| `chapters.json` | Chapter → page-range map | ~2 KB |
| `h22-torques.jsonl` | Canonical consensus rows | ~50–200 KB |
| `h22-torques-disputed.jsonl` | No-majority fastener groups | ~1–10 KB |
| `h22-torques-rejects.jsonl` | Failed parse records | ~1–5 KB |
| `h22-torques-flat.jsonl` | Intermediate flat rows | ~100–500 KB |
| `h22-torques-arp.jsonl` | ARP aftermarket cross-refs | ~1–10 KB |
| `cost-ledger.jsonl` | Append-only spend record | ~100 KB |
| `consensus-report.md` | Vote-strength + single-source stats | ~2 KB |
| `bakeoff-report.md` | Per-model accuracy/cost comparison | ~3 KB |
| `cache/index.json` | Content-hash → response-path map | ~10 KB |
| `responses/**/*.json` | Per-invocation records (committed) | ~100–500 MB total |
| `images/bb6/p*.webp` | Curated WebP page images | ~10–25 MB |
| `images/obd1/p*.webp` | Curated WebP page images | ~5–15 MB |

Note: `responses/` can grow large (hundreds of MB across thousands of
invocations) but is committed because it is the full provenance trail.
If repository size becomes an operational concern, compress individual
per-invocation JSON files with `gzip -k` and update the retrieval protocol.

---

## 12. File Layout

```
research/raw-data/torque-specs/
├── SCHEMA.md                          # This file
├── models.json                        # Provider/model registry
├── extraction-matrix.json             # Default + high-stakes + rescue tiers
├── chapters.json                      # Chapter → page-range map
├── cost-ledger.jsonl                  # Append-only spend record
├── h22-torques.jsonl                  # Canonical consensus rows
├── h22-torques-disputed.jsonl         # No-majority fastener groups
├── h22-torques-rejects.jsonl          # Failed parse records
├── h22-torques-flat.jsonl             # Intermediate: one row per (invocation × fastener)
├── h22-torques-arp.jsonl              # ARP aftermarket cross-references
├── consensus-report.md                # Vote-strength + single-source stats
├── bakeoff-report.md                  # Per-model accuracy/cost comparison
├── cache/
│   └── index.json                     # Content-hash → response-path map
├── responses/
│   ├── bb6/                           # BB6 manual responses
│   │   └── <page>/
│   │       └── <provider>__<model>__<run>__<timestamp>Z.json
│   └── obd1/                          # OBD1 manual responses
│       └── <page>/
│           └── <provider>__<model>__<run>__<timestamp>Z.json
└── images/
    ├── bb6/
    │   └── p<page>.webp               # Curated WebP page images
    └── obd1/
        └── p<page>.webp               # Curated WebP page images
```
