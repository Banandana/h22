# Phase 4b — Torque & Fastener Index

Authoritative spec for the H22 bolt-torque + fastener-identification index.
Inserted between Phase 4 (H-Series Mechanical) and the rest of the queue;
runs *before* the remaining Phase 4 tasks because several of them (T-244
head gasket sequence, T-219 rod bolts, etc.) become easier with this index
in hand.

## Goal

Two cross-indexed views of every fastener in scope:

1. **By location** — `system → assembly → fastener` table with torque
   sequence/angle/lube/reusability. The "what do I torque this to?" view.
2. **By fastener** — `(thread, role)` groups listing every application and
   median+range torque. The "I have this bolt, what is it?" view.

Backed by a single canonical JSONL so future tasks can join against it.

## Scope

| Source | Coverage |
|---|---|
| BB6 Helms (1997-2001 Prelude) | Whole vehicle (1997 USDM H22A4 base A/T as target variant; other variants captured + tagged) |
| OBD1 Helms (1992-1996 Prelude H22A1) | Engine chapters only (applies to user's JDM Accord H22A swap) |
| Honda OEM parts catalog (partsouq / hondapartsnow) | PN fill-in for rows missing `honda_part_number`. **PN only, never torques.** |
| ARP catalog | Aftermarket cross-reference section, segregated, tagged `oem: false` |

Out of scope for Phase 4b (noted for follow-up):
- Hasport / Innovative engine-mount adapter torques (aftermarket-swap-specific)
- M/T transmission internals (user's car is A/T)
- Wiring harness fastener torques (rare in Helms)

## Data model

### Canonical row schema (h22-torques.jsonl)

```jsonc
{
  "id": "BB6-p6617-cylhead-headbolt",   // stable hash of (manual, page, fastener_name, assembly)
  "source": {
    "manual": "BB6" | "OBD1",
    "page": 6617,
    "figure": "Fig 7-12" | null
  },
  "applies_to": {
    "trans": "A/T" | "M/T" | "both",
    "trim": "base" | "SH" | "all",
    "my":   "1997" | "1998-2001" | "all",
    "engine_codes": ["H22A4", "H22A1", ...]    // populated when known
  },
  "system":   "engine" | "drivetrain" | "chassis" | "body" | "electrical",
  "assembly": "cylinder-head",                  // canonical slug
  "fastener_name": "Cylinder head bolt",        // verbatim from manual
  "thread": {
    "nominal_mm": 10,
    "pitch_mm":   1.25,
    "length_mm":  null,
    "grade":      null                          // 8.8 / 10.9 / 12.9 if shown
  },
  "qty": 10,
  "role": "tty-stretch",                        // closed enum, see below
  "torque": {
    "steps": [
      { "pass": 1, "nm": 39, "kgfm": 4.0, "lbft": 29, "angle_deg": null },
      { "pass": 2, "nm": null, "kgfm": null, "lbft": null, "angle_deg": 90 }
    ],
    "sequence_ref": "BB6 p.6617 fig.2"          // pointer to torque-sequence diagram
  },
  "lubrication": "oiled",                       // "dry" | "oiled" | "loctite" | "sealant:<spec>"
  "reusable":    false,
  "reuse_conditions": null,                     // verbatim condition string if conditional
  "honda_part_number": "90012-PT0-000" | null,
  "tty": {
    "stretch_max_mm":  null,
    "pre_stretch_mm":  null
  },
  "special_tool": "07JAB-001020A" | null,
  "notes": "Replace if length > X mm",
  "confidence": "high" | "medium" | "low",
  "corroboration": {                            // see "Multi-model corroboration" section below
    "consensus_strategy": "majority-vote-torque-nm" | "unanimous" | "single-source" | "manual",
    "agreeing_invocations": [
      { "model_id": "together.kimi-k2-6-fp4",      "run": "r1", "temperature": 0, "response_path": "responses/bb6/6617/together__kimi__r1__...json" },
      { "model_id": "together.qwen3-vl-235b",      "run": "r1", "temperature": 0, "response_path": "..." }
    ],
    "disagreeing_invocations": [
      { "model_id": "anthropic.claude-sonnet-4-6", "run": "r1", "temperature": 0, "response_path": "...", "their_torque_nm": 44 }
    ],
    "vote_strength": 0.667,                     // agreeing / total invocations
    "intra_model_consistency": {                // for multi-run models at temp>0: did the runs agree with themselves?
      "together.kimi-k2-6-fp4": null,           // single run
      "anthropic.claude-sonnet-4-6": null
    },
    "single_source": false                      // true if only one invocation produced this row
  },
  "conflict_group_id": null,                    // cross-page / cross-source disagreement (NOT cross-model — that's in corroboration)
  "oem": true,                                  // false for ARP aftermarket rows
  "meta": {}                                    // open dict for one-off attributes the vision pass volunteers
}
```

### Per-invocation response record schema (responses/<manual>/<page>/*.json)

Every API call writes one of these files; nothing is dropped.

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
  "prompt_hash": "sha256:...",
  "image_hash": "sha256:...",
  "cache_key": "sha256:...",                    // (image, prompt, provider, model, temperature, seed)
  "timestamp_start": "2026-05-15T22-03-11.234Z",
  "timestamp_end":   "2026-05-15T22-03-13.891Z",
  "latency_ms": 2657,
  "tokens": { "input": 1487, "output": 612 },
  "cost_usd": 0.00454,
  "request": { /* exact request body sent to provider */ },
  "response_raw": "...",                        // raw text/JSON returned by the model, untouched
  "response_parsed": [                          // parsed rows (or [] if schema parse failed)
    { /* row in canonical schema, missing the corroboration block */ }
  ],
  "parse_error": null                           // populated if schema parse failed
}
```

### Role taxonomy (closed enum + `other`)

| Role | Examples |
|---|---|
| `tty-stretch` | head, main cap, rod cap, flywheel-to-crank |
| `cap-screw` | general bolted joints, brackets |
| `flange-bolt` | flanged head, common Honda fastener |
| `stud-and-nut` | exhaust manifold, intake manifold |
| `self-locking-nut` | exhaust joints, ball joints |
| `castellated-nut` | suspension ball joints, axle nut |
| `banjo-bolt` | brake hose, fuel rail, oil cooler |
| `sealing-plug` | drain plugs, port plugs, freeze plugs |
| `wheel-lug` | wheel nuts/studs |
| `caliper-guide` | brake caliper slider/guide bolts |
| `bracket-mount` | engine mounts, subframe, accessory brackets |
| `clip-or-clamp` | hose clamps, line clips |
| `other` | + free-text in `meta.role_note` |

## Multi-model corroboration

The pipeline runs **multiple models per page**, optionally **multiple runs per
model** (at temperature > 0 to capture sampling variance), and derives a
consensus row per fastener with full provenance to every contributing
invocation.

### Provider/model registry (`research/raw-data/torque-specs/models.json`)

Single source of truth for what's runnable. Adding a model = one JSON entry, no code change.

```jsonc
{
  "together.kimi-k2-6-fp4": {
    "provider": "together",
    "model": "moonshotai/Kimi-K2.6-FP4",
    "vision": true,
    "default_temp": 0,
    "input_per_M_usd": 1.20,
    "output_per_M_usd": 4.50,
    "tier": "primary-cheap"
  },
  "together.qwen3-vl-235b": {
    "provider": "together",
    "model": "Qwen/Qwen3-VL-235B-A22B-Instruct",
    "vision": true,
    "default_temp": 0,
    "input_per_M_usd": 0.60,
    "output_per_M_usd": 3.60,
    "tier": "primary-cheap"
  },
  "anthropic.claude-sonnet-4-6": {
    "provider": "anthropic",
    "model": "claude-sonnet-4-6",
    "vision": true,
    "default_temp": 0,
    "input_per_M_usd": 3.00,
    "output_per_M_usd": 15.00,
    "tier": "primary-high"
  },
  "anthropic.claude-opus-4-7": {
    "provider": "anthropic",
    "model": "claude-opus-4-7",
    "vision": true,
    "default_temp": 0,
    "input_per_M_usd": 15.00,
    "output_per_M_usd": 75.00,
    "tier": "rescue"
  }
}
```

Anthropic entries kept in registry for future use; default matrix is
Together-only (only `TOGETHER_API_KEY` set at planning time).

### Extraction matrix (`research/raw-data/torque-specs/extraction-matrix.json`)

Which (model, runs) tuples run on which chapters. Multi-run lives here.

```jsonc
{
  "default": [
    { "model_id": "together.kimi-k2-6-fp4",  "runs": 1, "temperature": 0 },
    { "model_id": "together.qwen3-vl-235b",  "runs": 1, "temperature": 0 }
  ],
  "high_stakes_chapters": [
    "engine-mechanical", "cylinder-head", "main-bearings",
    "connecting-rods", "flywheel-clutch"
  ],
  "high_stakes_overrides": [
    { "model_id": "together.kimi-k2-6-fp4",  "runs": 3, "temperature": 0.3, "seed_base": 1000 },
    { "model_id": "together.qwen3-vl-235b",  "runs": 2, "temperature": 0.2, "seed_base": 2000 }
  ],
  "rescue_tier": [
    { "model_id": "anthropic.claude-opus-4-7", "runs": 1, "temperature": 0, "requires_key": "ANTHROPIC_API_KEY" }
  ]
}
```

TTY-critical chapters (head, mains, rods, flywheel) get multi-run + multi-model
at temp>0 to capture sampling variance. Rescue tier only fires if its required
key is present; otherwise the rescue task is marked blocked.

### Response store layout

Per-page subdirectory, one file per invocation:

```
research/raw-data/torque-specs/responses/<manual>/<page-num>/
  together__kimi-k2-6-fp4__r1__2026-05-15T22-03-11Z.json
  together__kimi-k2-6-fp4__r2__2026-05-15T22-03-44Z.json     ← multi-run at temp>0
  together__qwen3-vl-235b__r1__2026-05-15T22-04-02Z.json
  anthropic__claude-opus-4-7__r1__2026-05-15T22-08-15Z.json  ← rescue tier
```

Every invocation kept forever, individually queryable. Filename encodes
provider, model, run, timestamp. Files conform to the per-invocation schema
above.

### Cache key (extended)

```
cache_key = SHA256(page_png_bytes, prompt_version, provider, model, temperature, seed)
```

A temp=0 invocation hits cache deterministically. A temp=0.3 multi-run with
varying seeds correctly misses cache for each new seed. Each invocation
cacheable independently of every other.

### Consensus algorithm (per fastener, per page)

1. Collect all rows from all invocations for the page.
2. Group by `(assembly, fastener_name, thread.nominal_mm, thread.pitch_mm)`.
3. Within each group, cluster rows by torque value within `max(2 N·m, 5%)`
   tolerance (so 39 vs 40 cluster together; 39 vs 44 do not).
4. **Majority cluster wins** → emit one consensus row with all agreeing
   invocations in `corroboration.agreeing_invocations` and the rest in
   `disagreeing_invocations`.
5. **Tie / no majority** → emit nothing to `h22-torques.jsonl`; instead emit
   the full candidate set to `h22-torques-disputed.jsonl` for manual resolution.
6. **Single-source** (only one invocation produced this fastener) → emit with
   `corroboration.single_source: true`, `vote_strength: 1.0`. Downstream views
   render these with a "single source" badge.
7. **Vote strength** = `count(agreeing) / count(total_invocations_for_page)`.
8. **Intra-model consistency** (when a model ran N>1 times at temp>0): fraction
   of that model's own runs that agreed with each other. Populated per-model
   in `corroboration.intra_model_consistency`.

## Retention guarantees (the API-spend protection contract)

Non-negotiable. T-416 implements; T-418 verifies; every extraction task inherits.

1. **Raw response on disk first, parse second.** Every API call writes the
   per-invocation record (full schema above) *before* any schema parsing of
   `response_parsed`. Schema failures trigger re-parse, never re-call.
2. **Content-hash cache.** SHA256 of `(page_png_bytes, prompt_version,
   provider, model, temperature, seed)` keys every call. Re-runs of identical
   inputs are free; multi-run at varying seeds correctly misses cache.
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
9. **Cost ledger.** Append-only `responses/cost-ledger.jsonl` with
   `{page, model, in_tokens, out_tokens, cost_usd, timestamp}` per call.
10. **Git-tracked durability.** `responses/`, `cache/index.json`, JSONL files,
    markdown — all committed. Page PNG bytes already live in `bb6_ocr/images/`.

## Outputs

- `research/raw-data/torque-specs/SCHEMA.md` — schema doc (canonical row + per-invocation record + role taxonomy + consensus algorithm)
- `research/raw-data/torque-specs/models.json` — provider/model registry
- `research/raw-data/torque-specs/extraction-matrix.json` — default + high-stakes + rescue tiers
- `research/raw-data/torque-specs/chapters.json` — chapter→page-range map
- `research/raw-data/torque-specs/responses/<manual>/<page>/*.json` — durable per-invocation response store
- `research/raw-data/torque-specs/cache/index.json` — content-hash → response-path map
- `research/raw-data/torque-specs/cost-ledger.jsonl` — append-only spend record (one row per invocation)
- `research/raw-data/torque-specs/bakeoff-report.md` — per-model accuracy/cost/latency comparison
- `research/raw-data/torque-specs/h22-torques-flat.jsonl` — intermediate: one row per (invocation × fastener)
- `research/raw-data/torque-specs/h22-torques.jsonl` — **canonical** consensus rows with `corroboration` populated
- `research/raw-data/torque-specs/h22-torques-disputed.jsonl` — fastener groups where models had no majority
- `research/raw-data/torque-specs/h22-torques-rejects.jsonl` — invocations whose responses failed schema validation
- `research/raw-data/torque-specs/consensus-report.md` — per-page vote-strength + single-source + disputed counts
- `research/raw-data/torque-specs/h22-torques-arp.jsonl` — aftermarket (ARP) cross-reference, segregated
- `research/raw-data/torque-specs/h22-torques.db` — **SQLite query layer** (FTS5 over markdown; tables for torques, invocations, pages, chapters, disputes, ARP)
- `research/raw-data/torque-specs/images/<manual>/p<page>.webp` — **curated page images** filtered to torque-bearing pages only; WebP-recompressed, git-committed
- `research/h-series/maintenance/torque-by-location.md` — `system → assembly → fastener` view
- `research/h-series/maintenance/torque-by-fastener.md` — `(thread, role)` view
- `scripts/extract-torques-vision.mjs` — pipeline script (standalone-runnable, multi-provider)
- `scripts/render-torque-index.mjs` — JSONL → markdown renderer
- `scripts/build-torque-db.mjs` — JSONL + markdown → SQLite renderer (idempotent)
- `scripts/curate-page-images.mjs` — filter + WebP-recompress source PNGs for git commit
- `scripts/acquire-obd1-pdf.mjs` — Playwright-based search/download of the OBD1 H22A1 Helms manual PDF
- `scripts/prompts/extract-torques-v1.md` — vision prompt

## Database & image layer (Future-client interface)

Phase 4b ships not just data files but a **stable, queryable interface** any future client (web UI, MCP server, CLI tool, mobile app, next year's different agent) can consume without rebuilding from raw JSONL.

### SQLite schema (h22-torques.db)

Single-file binary, git-tracked, rebuilt by `scripts/build-torque-db.mjs` from the JSONL + markdown sources. Idempotent — running on identical inputs produces a byte-identical DB.

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
  id TEXT PRIMARY KEY,                  -- invocation_id
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
  id TEXT PRIMARY KEY,                  -- stable hash
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
  role TEXT NOT NULL,                   -- role taxonomy enum
  -- torque is JSON (steps array) — query via json_extract
  torque_json TEXT NOT NULL,
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
  vote_strength REAL,                   -- from corroboration
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
  resolution_torque_nm REAL,            -- populated after T-424b
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

-- Full-text search over rendered markdown
CREATE VIRTUAL TABLE markdown_fts USING fts5(
  view,                                  -- "by-location" | "by-fastener"
  section,                               -- heading path
  body,
  tokenize = 'porter unicode61'
);

-- Indexes
CREATE INDEX idx_torques_assembly ON torques(assembly);
CREATE INDEX idx_torques_role_thread ON torques(role, thread_nominal_mm, thread_pitch_mm);
CREATE INDEX idx_torques_manual_page ON torques(manual, page);
CREATE INDEX idx_invocations_model ON invocations(model_id);
CREATE INDEX idx_invocations_page ON invocations(manual, page);
```

### Image layer

- **Curated set**: filter to pages cited by any torque row, disputed row, or reject record. For BB6 that's ~200–300 of 1411 pages.
- **Format**: PNG → WebP, quality 75, max-width 1200 (manuals print at 300dpi, web display doesn't need that). Typical compression: 5–10×. Estimated total commit size: 10–25 MB.
- **Stable addressing**: `images/<manual>/p<page>.webp`. Every torque row's `source.image_path` and `pages.image_path` in SQLite resolve here.
- **Original**: `bb6_ocr/images/*.png` (846 MB) stays gitignored as working set; never the committed source of truth.

### Future-client contract

Any future client implementing the torque-index interface receives ONE git clone and is guaranteed:
- A queryable SQLite DB with stable schema.
- A complete image set for every cited page.
- Two human-readable markdown views.
- The JSONL files as ultimate source-of-truth (DB rebuilds from these).
- The full per-invocation provenance under `responses/` for any auditing.

Schema migrations across versions: documented in `SCHEMA.md` with a `schema_version` field in the DB's `_meta` table.

---

## Tasks

### T-414 — Schema doc

**Description.** Write `research/raw-data/torque-specs/SCHEMA.md`: full
canonical-row schema (incl. `corroboration` block), per-invocation response
record schema, role taxonomy enum, `applies_to` enum, consensus algorithm,
conflict-group vs corroboration distinction, gitignore policy for `responses/`
and `cache/`. No code, no API calls. Single source of truth for every
downstream task.

**Depends on.** None.

**DoD notes.** SCHEMA.md must be unambiguous enough that a fresh agent
reading only T-414's output can write a valid row and a valid per-invocation
record.

### T-414b — Provider/model registry + extraction matrix

**Description.** Write `research/raw-data/torque-specs/models.json` (registry
of every runnable model with provider, pricing, vision capability) and
`research/raw-data/torque-specs/extraction-matrix.json` (default matrix +
high-stakes overrides + rescue tier). Default matrix: Together-only
(`together.kimi-k2-6-fp4` + `together.qwen3-vl-235b`, both single-run temp=0).
High-stakes chapters: 3-run Kimi @ temp=0.3 + 2-run Qwen3-VL @ temp=0.2.
Rescue tier: Anthropic Opus, marked `requires_key: ANTHROPIC_API_KEY` so it
auto-skips when key absent.

**Depends on.** T-414.

**DoD notes.** Verify `together.qwen3-vl-235b` actually exists on Together
(via `curl https://api.together.xyz/v1/models | jq` or equivalent); if the
exact model id differs, update registry. If only one Together vision model
is available, default matrix becomes single-model with multi-run for
corroboration via sampling variance.

### T-414c — Acquire OBD1 H22A1 Honda Service Manual PDF

**Description.** The repo's `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf`
is mislabeled — `file` reports it as HTML (60 KB), not a real PDF. To execute
T-422 (OBD1 engine extraction), we need an actual scanned Honda factory
service manual for the 1992-1996 Prelude.

**Target sources, in priority order:**
1. **techinfo.honda.com** (Honda's official service-information portal —
   requires paid subscription, but the user may have/obtain access). Honda
   Service Manual P/N 61SS010 or equivalent for 1992-1996 Prelude.
2. **Honda Service Express** (similar OEM portal).
3. **Enthusiast forums** (preludeonline.com, hondaprelude.com,
   hondatech.com) — many host community scans of the original Honda
   factory service manual.
4. **Archive.org** — search "Honda Prelude 1992-1996 service manual".

Helms Inc. is Honda's licensed reprinter — Helms-branded scans are
acceptable, content is identical to the Honda factory document.

Use `scripts/acquire-obd1-pdf.mjs` (Playwright-based): search → identify
candidate URLs → verify file type is PDF → verify page count > 1000 →
download to `obd1_source/honda-service-manual-1992-1996-prelude.pdf`.
Replace the mislabeled placeholder file. Add the new PDF to `.gitignore`
(will be large, >50 MB).

**Depends on.** None.

**DoD notes.** Verify with `file` that the download is genuinely PDF.
Verify page count via `pdfinfo`. Render page 1 and a random interior page
via `pdftoppm` and visually confirm it's a Honda service manual (not a
sales brochure, not an owner's manual, not a wiring-diagram-only supplement).
If acquisition fails or produces low-quality scans (OCR-resistant), mark
**[B] blocked** and surface to user; T-422 then becomes blocked downstream.

### T-415 — Chapter → page-range map

**Description.** Produce `research/raw-data/torque-specs/chapters.json`
mapping each Honda service manual chapter to its `{chapter_name, system,
page_start, page_end}`. For BB6: all mechanical chapters (engine, cooling,
fuel/emissions, intake/exhaust, ignition, starting/charging, clutch, A/T
transmission, driveshafts, suspension, brakes, steering, body, HVAC). For
OBD1: engine chapters only. Excludes pure-wiring chapters.

**Depends on.** T-003 (BB6 TOC parse, already done), T-414c (need real OBD1
PDF before its TOC can be mapped).

**DoD notes.** Total BB6 page count in scope: 600–800 expected. OBD1: 150–250.

### T-416 — Durable response store scaffold

**Description.** Create `research/raw-data/torque-specs/responses/{bb6,obd1}/`
with per-page subdirectory layout. Create `cache/` directory. Write
`.gitignore` excluding any blob >50MB. Write a Node `schema-validator.mjs`
stub (Zod schema matching both the canonical row schema AND the per-invocation
record schema). Write an empty `cost-ledger.jsonl` whose documented columns
include `{invocation_id, manual, page, provider, model_id, run, temperature,
seed, input_tokens, output_tokens, cost_usd, latency_ms, timestamp}`. No API
calls. Implements all 7 retention guarantees at the directory/file level
before any spend occurs.

**Depends on.** T-414.

### T-417a — Vision script interface spec + skeleton

**Description.** Write `scripts/extract-torques-vision.mjs` as a skeleton:
imports, CLI argument parser (`--manual`, `--chapter`, `--matrix-profile`
(default/high-stakes/rescue), `--model-id` (override), `--runs` (override),
`--temperature` (override), `--seed-base` (override), `--no-cache`,
`--dry-run`, `--max-pages`), function signatures with JSDoc types, provider
client abstraction (`AnthropicProvider`, `TogetherProvider` — both implement
the same `extractFromPage(pageBytes, model, temperature, seed): Promise<RawResponse>`
interface), matrix loader, prompt-file loader, response-writer, cache-checker —
all stubbed with `throw new Error("not implemented")` bodies. Also write
`scripts/prompts/extract-torques-v1.md` with the full extraction prompt
(input: page PNG, output: JSONL rows conforming to SCHEMA.md, explicit
instruction to emit unknown attributes into `meta` and to emit
`confidence: "low"` on any row the model is unsure about).

**Depends on.** T-414, T-414b, T-416.

**DoD notes.** No test coverage required; this is interface only. Provider
abstraction must hide all SDK differences from the matrix-execution loop.

### T-417b — Vision script implementation

**Description.** Fill in T-417a's stubs:
- `TogetherProvider` using `@together-ai/sdk` (or fetch against
  `https://api.together.xyz/v1/chat/completions` with vision content blocks).
- `AnthropicProvider` using `@anthropic-ai/sdk` (only invoked if
  `ANTHROPIC_API_KEY` is set; otherwise the provider's preflight returns
  `unavailable` and matrix rows for it are skipped with a logged warning).
- Content-hash cache: `SHA256(page_png_bytes, prompt_version, provider, model,
  temperature, seed)` → cached per-invocation record path.
- Matrix-execution loop: for each (page, model_id, run_idx), compute seed
  (= `seed_base + run_idx`), check cache, call provider on miss, write
  per-invocation record to disk per retention guarantee #1, append ledger
  row, schema-parse the response into `response_parsed`, but never drop the
  raw response.
- Retry-with-backoff on 429/500 (exponential, max 4 retries).
- Progress log: per-page line with `(model_id, run, cached?, latency_ms, cost_usd)`.
- Script invokable standalone; exits non-zero on uncaught error.

**Depends on.** T-417a.

**DoD notes.** Tests: integration tests with mocked Together + Anthropic
clients exercising (a) cache hit on second call, (b) cache miss + retry on
500, (c) multi-run with different seeds writing distinct records, (d)
Anthropic-skip when key absent, (e) schema-parse failure preserves raw
record. No live API calls in CI.

### T-418 — Preflight

**Description.** For every model in the active matrix (default profile):
verify the required env key is set, run
`extract-torques-vision.mjs --manual=BB6 --chapter=engine-mechanical
--max-pages=3 --matrix-profile=default` end-to-end. Confirm:
per-invocation records written under `responses/bb6/<page>/`, ledger has one
row per (page × model × run), cache populated such that immediate re-run is
free, schema validator parses each `response_parsed` without rejects. Total
spend recorded ≤ $0.50 (covers 3 pages × 2 models × 1 run each).

**Depends on.** T-417b, T-416, T-414b.

### T-418b — Bake-off

**Description.** 10-page pilot on a hard chapter (suspension or exhaust
manifold — lots of overlapping callouts). For every model currently in the
default matrix, run extraction. Emit
`research/raw-data/torque-specs/bakeoff-report.md` with per-model:
- Row count emitted across the 10 pages.
- Schema-conformance rate (% of returned rows that parse cleanly).
- Average self-reported confidence.
- Eyeball accuracy of 5 randomly-sampled rows per model against the source PNG.
- Per-page latency + cost.
- Notes on systematic blind spots (tables vs diagrams vs callouts).

Outcome: confirms whether the default matrix is good as-is or needs editing
(e.g., drop a model that's <60% accurate). Updates `extraction-matrix.json`
accordingly.

**Depends on.** T-418.

**DoD notes.** Spend cap $1.00.

### T-419 — BB6 matrix extraction

**Description.** Run `extract-torques-vision.mjs --manual=BB6
--matrix-profile=default` across every chapter in `chapters.json` for BB6,
then run `--matrix-profile=high-stakes` against the chapters listed in
`extraction-matrix.json.high_stakes_chapters` (these get 3-run Kimi @ temp=0.3
+ 2-run Qwen3-VL @ temp=0.2 in addition to the default single-run pass).
Expected: ~700 pages × 2 models × 1 run + ~70 pages × extra (3+2-1) runs ≈
1750 invocations, ~$18–28, runtime 90–180 min. Per-invocation flush makes
partial completion recoverable.

**Depends on.** T-418, T-418b.

**DoD notes.** Per-chapter progress + per-model row counts noted in task
report. Cost ledger attached.

### T-420 — Rescue-candidate identification

**Description.** Walk `responses/bb6/` and produce `rescue-list-bb6.txt`
listing every page that satisfies ANY of:
- (a) any invocation failed schema validation,
- (b) any row self-reported `confidence: "low"`,
- (c) any row has manifestly-invalid torque (≤0 N·m or >1000 N·m without TTY-angle),
- (d) page is torque-bearing per the OCR pre-filter but every invocation returned zero rows,
- (e) **inter-model disagreement on torque value** — any (assembly, fastener,
   thread) group where models emitted torques differing by >10% or >5 N·m
   (whichever is larger),
- (f) **intra-model inconsistency** — for any model that ran N>1, the runs
   disagreed on torque value for the same fastener.

Output additionally produces `rescue-reasons.jsonl` keyed by page with the
specific reasons that flagged it (helps the rescue task pick the right
follow-up model).

**Depends on.** T-419.

### T-421 — Opus rescue (conditional)

**Description.** If `ANTHROPIC_API_KEY` is set, run
`extract-torques-vision.mjs --manual=BB6 --matrix-profile=rescue
--pages=@rescue-list-bb6.txt`. Expected ~5–10% of pages, ~$5–15. Per-invocation
records joined to the existing per-page subdirectories. Per-page rescue
records become additional voters in the consensus pass.

If `ANTHROPIC_API_KEY` is NOT set, mark this task **[B] blocked**, log the
rescue-list in the report for manual handling, and proceed to T-422 / T-423b.
Phase 4b gate (T-431) checks that either rescue ran OR the rescue-list is
empty OR the user explicitly waived.

**Depends on.** T-420.

### T-422 — OBD1 engine-chapter extraction

**Description.** Render the OBD1 Honda service manual PDF (acquired in
T-414c) pages to PNG via `pdftoppm` at 200 DPI. Run
`extract-torques-vision.mjs --manual=OBD1 --matrix-profile=default` over
the OBD1 engine chapters defined in `chapters.json`. Identify rescue
candidates inline using the same criteria as T-420. If
`ANTHROPIC_API_KEY` is set, run rescue tier on flagged pages within this
same task (smaller corpus, ~150–250 pages × 2 models + ~5% rescue).

**Depends on.** T-414c (real PDF must exist), T-418, T-418b.

**DoD notes.** If T-414c is blocked, this task auto-blocks. Render output
goes to `obd1_source/pages/p<NNNN>.png` (gitignored — large working set;
the curated WebP set lands separately in T-433).

### T-423 — Validate per-invocation records → flat rows

**Description.** Walk `responses/{bb6,obd1}/<page>/*.json`, run final schema
validation on every `response_parsed` array. Emit two intermediate files:
- `h22-torques-flat.jsonl` — one row per (invocation × fastener), every row
  carrying `invocation_id` provenance.
- `h22-torques-rejects.jsonl` — invocation records whose `response_parsed`
  failed validation, with full per-invocation record + validator error.

Compute summary stats: total invocations, total flat rows, rejects, per-model
row count, distribution of `confidence`.

**Depends on.** T-419, T-421, T-422.

### T-423b — Consensus pass

**Description.** Implement and run consensus algorithm (see "Multi-model
corroboration" section). For each page, group flat rows by `(assembly,
fastener_name, thread.nominal_mm, thread.pitch_mm)`, cluster by rounded
torque value, pick majority cluster, emit one consensus row per fastener
with full `corroboration` block populated. Outputs:
- `h22-torques.jsonl` — consensus rows (one per fastener per page).
- `h22-torques-disputed.jsonl` — fastener groups with no majority (full
  candidate set retained, awaiting T-424b resolution).
- `consensus-report.md` — per-page vote-strength histogram, single-source
  row count, disputed-row count.

**Depends on.** T-423.

**DoD notes.** Consensus implementation has its own unit tests against
synthetic flat-row sets covering: unanimous, majority, tied, single-source,
and disagreement-within-rounding cases.

### T-424 — Dedup + cross-page conflict-merge

**Description.** Group consensus rows by `(assembly, fastener_name,
thread.nominal_mm, thread.pitch_mm)` ACROSS pages. (Same fastener may have
its consensus row emitted from multiple pages — engine-mech chapter AND
timing-belt chapter both showing crank-pulley bolt.) Within each cross-page
group: if torques agree, merge to one row with `sources: [...]` listing
every page citation and `applies_to` widened. If torques disagree across
pages, keep all, assign shared `conflict_group_id`, do not average.

Critical: this is a SEPARATE concern from the corroboration block (which is
about model agreement on a single page). `conflict_group_id` is about
source-page disagreement; `corroboration` is about model disagreement.
Both fields can be populated independently.

Output: `h22-torques.jsonl` rewritten in-place; previous version archived as
`h22-torques.jsonl.preconflict`.

**Depends on.** T-423b.

### T-424b — Disputed-row resolution

**Description.** Walk `h22-torques-disputed.jsonl`. For each disputed
fastener: surface the candidate set + the page PNG to the user, accept a
manual resolution (pick a candidate value with rationale, or mark
"unresolved — see manual" and emit with all candidates + an
`unresolved: true` flag). Resolved rows move to `h22-torques.jsonl`;
unresolved rows stay in disputed but get `acknowledged: true` so the gate
doesn't re-flag them.

**Depends on.** T-423b.

**DoD notes.** Time-cap: 2 hours of pi work. If disputed count > 30,
escalate to a follow-up task rather than blocking the phase.

### T-425 — Honda OEM PN fill-in

**Description.** For every row with `honda_part_number: null`, query
partsouq.com or hondapartsnow.com (playwright if needed) for the relevant
exploded diagram, locate the fastener by assembly + position, capture PN.
Update rows in-place. Do not touch torque fields. Annotate `meta.pn_source: "partsouq" | "hondapartsnow"`.

**Depends on.** T-424.

**DoD notes.** Time-cap this at 4 hours of pi work; if coverage <50% after
that, lower the bar and ship.

### T-426 — ARP catalog aftermarket section

**Description.** From ARP's online catalog, gather aftermarket equivalents
for the H22 OEM rows in roles {tty-stretch (head, main, rod), cap-screw
(cam caps, flywheel)}. Emit `h22-torques-arp.jsonl` with `oem: false` on
every row and `meta.arp_pn`. Do *not* merge into `h22-torques.jsonl`;
renderer keeps them in a separate "Aftermarket equivalents" section.

**Depends on.** T-424.

### T-427 — Render both markdown views

**Description.** Write `scripts/render-torque-index.mjs`. Reads
`h22-torques.jsonl` + `h22-torques-arp.jsonl`. Emits:
- `research/h-series/maintenance/torque-by-location.md` — nested headings
  `system → assembly`, each assembly a table with columns
  `fastener | thread | qty | torque (N·m / kgf·m / lbf·ft) | sequence | lube | reusable | PN | vote | notes`.
  Cross-page-conflict rows rendered with a "⚠ conflict" callout.
  Single-source rows badged "1×"; low-vote-strength rows (< 0.75) badged "split".
- `research/h-series/maintenance/torque-by-fastener.md` — sections per
  `(thread, role)` group. Each section lists every application and shows
  median + range. ARP aftermarket appended as its own "Aftermarket" subsection.

Renderer idempotent: re-running produces identical output if JSONL unchanged.

**Depends on.** T-424, T-426.

### T-428 — Spot-check

**Description.** Three-part verification:
1. **100% review of TTY-stretch rows.** Every row with `role: "tty-stretch"`
   compared against its source page PNG. Expected ~15–20 rows (head bolts,
   main caps, rod caps, flywheel bolts across BB6 + OBD1).
2. **20-row stratified random sample.** Sample distribution: engine 8,
   drivetrain 4, chassis 6, body 2. Each row checked against its source.
3. **Consensus correctness.** From the random sample, separately compute:
   - When models agreed (vote_strength ≥ 0.75): how often was the consensus
     value correct?
   - When models disagreed (vote_strength < 0.75): which model's value was
     right (or was none of them right)? Tags each model with an empirical
     reliability score for the bake-off-report follow-up.

Record accuracy in the task report. Any wrong row spawns a fix task.

**Depends on.** T-427.

### T-432 — Build SQLite query layer

**Description.** Write `scripts/build-torque-db.mjs`. Reads all canonical
JSONLs (torques, disputed, rejects, ARP), chapters.json, and the rendered
markdown views. Emits `research/raw-data/torque-specs/h22-torques.db`
matching the schema in "Database & image layer" section. Idempotent: running
on identical inputs produces a byte-identical DB. Populate FTS5 virtual
table with section/body extracted from both markdown views. Include a
`_meta` table with `schema_version`, `built_at`, `source_jsonl_sha256`.

**Depends on.** T-427 (markdown views must exist before FTS population).

**DoD notes.** Smoke tests via the script's own self-test mode: query
each table, run an FTS search, walk one torque row through its
`torque_invocations` to verify provenance joins. Document common query
patterns in `research/raw-data/torque-specs/QUERIES.md` (5–10 example SQL
queries: by-assembly, by-thread+role, all single-source TTY rows, etc.).

### T-433 — Curate page-image set

**Description.** Write `scripts/curate-page-images.mjs`. Scans
`h22-torques.jsonl`, `h22-torques-disputed.jsonl`, `h22-torques-rejects.jsonl`
to collect the union of (manual, page) tuples cited by any row. For each:
- BB6 source: `bb6_ocr/images/page-<NNNN>.png` (working set, gitignored).
- OBD1 source: `obd1_source/pages/p<NNNN>.png` (working set, gitignored).
Recompress each PNG to WebP via `sharp` or `cwebp` at quality=75,
max-width=1200, output to `research/raw-data/torque-specs/images/<manual>/p<page>.webp`.
Commit the resulting WebP set (estimated 10–25 MB total).

**Depends on.** T-424 (canonical torques.jsonl must be final), T-422 (OBD1
working-set PNGs must exist).

**DoD notes.** Verify total committed size < 50 MB. If WebP unavailable on
the system, fall back to PNG at lower DPI (resize via `convert` /
`pdftoppm` -r 100). Curated set diff'd: any page in a row whose WebP
doesn't exist → fail the task.

### T-434 — Image-path backfill + final DB rebuild

**Description.** For every torque row in `h22-torques.jsonl`, every disputed
row in `h22-torques-disputed.jsonl`, every reject in
`h22-torques-rejects.jsonl`, set `source.image_path` to
`images/<manual>/p<page>.webp` (the WebP path from T-433). Same for the
`pages.image_path` column in the SQLite DB. Re-run `build-torque-db.mjs`
to refresh the DB with the populated paths. Verify by sampling: pick 10
random torque rows, confirm `source.image_path` resolves to an existing
file on disk.

**Depends on.** T-432, T-433.

### T-429 — Update master-index + QWEN.md

**Description.** Update `research/indexes/master-index.md` with links to
both markdown views, the JSONL files, the SQLite DB, the curated image set,
and SCHEMA.md + QUERIES.md. Update `QWEN.md` §Specifications with a
"Torque & Fastener Index" subsection summarizing coverage and pointing to
the index files (markdown views for humans, SQLite for programmatic
clients, JSONL for source-of-truth).

**Depends on.** T-427, T-434.

### T-430 — Phase 4b checkpoint

**Description.** Review the index for: gaps the vision pass missed
(systematic blind spots), follow-up tasks (Hasport mount torques, M/T
internals, additional ARP coverage, OBD1 chassis extension), variant
coverage holes (Type-S / Euro-R if user later wants them). Spawn new
backlog tasks as needed.

**Depends on.** T-429.

### T-431 — Phase 4b gate

**Description.** Phase boundary. Cannot pass to remaining Phase 4 tasks
until ALL of:
- Every TTY-stretch row in T-428 reviewed correct (0 defects).
- T-428 sample ≥18/20 correct.
- T-428 consensus-correctness section populated; any model with empirical
  reliability < 60% noted in the bake-off report for future-matrix tuning.
- Either: rescue (T-421) ran AND completed, OR rescue-list was empty,
  OR user explicitly waived (with rationale logged in report).
- Disputed-row file (`h22-torques-disputed.jsonl`) either empty, or every
  entry has `acknowledged: true` / `unresolved: true` set by T-424b.
- Both markdown views render cleanly from JSONL.
- `h22-torques.jsonl` passes schema validation; every row has
  `corroboration` populated (even if single-source).
- **SQLite DB (`h22-torques.db`) exists, passes self-tests, and at least
  one example query from QUERIES.md returns expected results.**
- **Every torque row's `source.image_path` resolves to a file on disk
  under `images/<manual>/`.**
- **Curated image set total size < 50 MB (committed to git).**
- Cost ledger total matches sum of per-invocation records; no orphaned
  responses (every file in `responses/` referenced by exactly one ledger row
  AND either consumed by consensus or flagged as disputed).
- All retention guarantees demonstrably enforced (T-416 contract).
- If T-414c was blocked: phase ships BB6-only with a clear note in
  master-index.md that OBD1 coverage is deferred.

**Depends on.** T-430.
