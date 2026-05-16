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
  "extraction_model": "sonnet-4-6" | "opus-4-7" | "manual",
  "conflict_group_id": null,                    // populated when this row disagrees with another
  "oem": true,                                  // false for ARP aftermarket rows
  "meta": {}                                    // open dict for one-off attributes the vision pass volunteers
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

## Retention guarantees (the API-spend protection contract)

These are non-negotiable. T-416 implements them; T-418 verifies them; every
extraction task (T-419, T-421, T-422) inherits them.

1. **Raw response on disk first, parse second.** Every vision API response
   is written to `research/raw-data/torque-specs/responses/<manual>/<page>-<model>-<timestamp>.json`
   *before* schema parsing. Schema failures trigger re-parse, not re-call.
2. **Content-hash cache.** SHA256 of `(page_png_bytes, prompt_version, model_id)`
   keys every call. Re-runs of identical inputs are free.
3. **Stream-to-disk, not buffer-then-write.** Per-page flush; a crash loses
   at most one in-flight page.
4. **Both Sonnet and Opus responses retained for rescued pages.** The merged
   row records which model it came from; both raw JSONs stay on disk.
5. **Schema-extras never dropped.** Unknown keys route into `meta: {}`.
6. **Failed rows preserved.** Validation rejects land in
   `h22-torques-rejects.jsonl` with raw response + error.
7. **Re-extraction is opt-in.** Cached responses are reused by default;
   `--no-cache` required to re-call.
8. **Prompt versioning.** Prompts live in `scripts/prompts/extract-torques-vN.md`.
   Bumping `v` invalidates cache automatically. Old responses never deleted.
9. **Cost ledger.** Append-only `responses/cost-ledger.jsonl` with
   `{page, model, in_tokens, out_tokens, cost_usd, timestamp}` per call.
10. **Git-tracked durability.** `responses/`, `cache/index.json`, JSONL files,
    markdown — all committed. Page PNG bytes already live in `bb6_ocr/images/`.

## Outputs

- `research/raw-data/torque-specs/h22-torques.jsonl` — canonical rows
- `research/raw-data/torque-specs/h22-torques-rejects.jsonl` — schema failures + raw responses
- `research/raw-data/torque-specs/SCHEMA.md` — schema doc + role taxonomy
- `research/raw-data/torque-specs/chapters.json` — chapter→page-range map
- `research/raw-data/torque-specs/responses/` — durable per-call response store
- `research/raw-data/torque-specs/cache/index.json` — content-hash → response-path map
- `research/raw-data/torque-specs/cost-ledger.jsonl` — append-only spend record
- `research/h-series/maintenance/torque-by-location.md` — `system → assembly → fastener` view
- `research/h-series/maintenance/torque-by-fastener.md` — `(thread, role)` view
- `scripts/extract-torques-vision.mjs` — pipeline script (standalone-runnable)
- `scripts/render-torque-index.mjs` — JSONL → markdown renderer
- `scripts/prompts/extract-torques-v1.md` — vision prompt

---

## Tasks

### T-414 — Schema doc

**Description.** Write `research/raw-data/torque-specs/SCHEMA.md`: full row
schema as above, role taxonomy enum table, `applies_to` enum values,
conflict-group semantics, gitignore policy for `responses/` and `cache/`.
No code, no API calls. Single source of truth for every downstream task.

**Depends on.** None.

**DoD notes.** SCHEMA.md must be unambiguous enough that a fresh agent
reading only T-414's output can write a valid row.

### T-415 — Chapter → page-range map

**Description.** Produce `research/raw-data/torque-specs/chapters.json`
mapping each Helms chapter to its `{chapter_name, system, page_start, page_end}`.
For BB6: all mechanical chapters (engine, cooling, fuel/emissions, intake/exhaust,
ignition, starting/charging, clutch, A/T transmission, driveshafts, suspension,
brakes, steering, body, HVAC). For OBD1: engine chapters only. Excludes
pure-wiring chapters.

**Depends on.** T-003 (BB6 TOC parse, already done).

**DoD notes.** Total BB6 page count in scope: 600–800 expected. OBD1: 150–250.

### T-416 — Durable response store scaffold

**Description.** Create `research/raw-data/torque-specs/responses/{bb6,obd1}/`,
`cache/`, write `.gitignore` excluding any blob >50MB, write a Node
`schema-validator.mjs` stub (Zod schema matching SCHEMA.md), write an
empty `cost-ledger.jsonl` with the documented row format header comment.
No API calls. Implements all 10 retention guarantees at the directory/file
level before any spend occurs.

**Depends on.** T-414.

### T-417a — Vision script interface spec + skeleton

**Description.** Write `scripts/extract-torques-vision.mjs` as a skeleton:
all imports, CLI argument parser (`--manual`, `--chapter`, `--model`,
`--no-cache`, `--dry-run`, `--max-pages`), function signatures with JSDoc
types, prompt-file loader, response-writer, cache-checker — all stubbed
with `throw new Error("not implemented")` bodies. Also write
`scripts/prompts/extract-torques-v1.md` with the full extraction prompt
(input: page PNG, output: JSONL rows conforming to SCHEMA.md, explicit
instruction to emit unknown attributes into `meta`).

**Depends on.** T-414, T-416.

**DoD notes.** No test coverage required; this is interface only.

### T-417b — Vision script implementation

**Description.** Fill in T-417a's stubs: Anthropic SDK calls for both
Sonnet 4.6 and Opus 4.7, content-hash caching via SHA256, streaming
per-page flush to disk, schema validation routing valid rows to JSONL and
invalid to rejects, cost-ledger append, retry-with-backoff on 429/500,
progress logging. Script must be invokable standalone (independent of pi
runner) and exit non-zero on any uncaught error.

**Depends on.** T-417a.

**DoD notes.** Tests: integration test with a mocked Anthropic client
exercising the cache hit path, the cache miss path, and the schema-reject
path. No live API calls in CI.

### T-418 — Preflight

**Description.** Verify `ANTHROPIC_API_KEY` is set; run
`extract-torques-vision.mjs --manual=BB6 --chapter=engine-mechanical --max-pages=3 --dry-run`
and confirm: 3 response JSONs written to `responses/bb6/`, cache populated,
ledger has 3 rows, schema validator parses all 3 without rejects. Total
spend recorded ≤ $0.25.

**Depends on.** T-417b, T-416.

### T-419 — BB6 Sonnet extraction

**Description.** Run `extract-torques-vision.mjs --manual=BB6 --model=sonnet`
across every chapter in `chapters.json` for BB6. Expected: 600–800 pages,
~$15–30, runtime 60–120 min. Commit incremental responses; the script
flushes per page, so partial completion is recoverable.

**Depends on.** T-418.

**DoD notes.** Per-chapter progress noted in task report. Cost ledger
attached.

### T-420 — Rescue-candidate identification

**Description.** Walk `responses/bb6/` and produce `rescue-list-bb6.txt`
containing every page whose response: (a) failed schema validation, (b)
self-reported `confidence: "low"` on any row, or (c) produced rows with
manifestly-invalid torques (≤0 N·m or >1000 N·m without TTY-angle), or
(d) produced zero rows from a page the regex-prefilter flagged as
torque-bearing.

**Depends on.** T-419.

### T-421 — BB6 Opus rescue

**Description.** Run `extract-torques-vision.mjs --manual=BB6 --model=opus
--pages=@rescue-list-bb6.txt`. Expected: ~5% of pages, ~$5–15. Both Sonnet
and Opus responses retained per retention guarantee #4.

**Depends on.** T-420.

### T-422 — OBD1 engine-chapter extraction

**Description.** Render OBD1 PDF pages to PNG (no OCR needed — vision-direct);
run `extract-torques-vision.mjs --manual=OBD1 --model=sonnet` across engine
chapters only; identify rescue candidates inline; run Opus rescue in the same
task (smaller corpus, ~150–250 pages, ~$5–15 combined).

**Depends on.** T-418. (Independent of BB6 extraction — could run in parallel
if pi supports it; ordered for ledger clarity.)

### T-423 — Schema-validate + parse to JSONL

**Description.** Walk `responses/{bb6,obd1}/`, run final schema validation,
emit `h22-torques.jsonl` (valid rows) and `h22-torques-rejects.jsonl`
(invalid rows + raw response + validator error). Compute summary stats:
total rows, rows per system/assembly, reject count, distribution of
`confidence` values.

**Depends on.** T-419, T-421, T-422.

### T-424 — Dedup + conflict-merge

**Description.** Group rows by `(assembly, fastener_name, thread.nominal_mm,
thread.pitch_mm)`. Within each group: if all torques agree (within
rounding tolerance), merge to one row with `sources: [...]` listing every
contributing citation and `applies_to` widened to cover all source
variants. If torques disagree, keep all rows, assign shared
`conflict_group_id`, do not average. Output: `h22-torques.jsonl` rewritten
in-place; previous version archived as `h22-torques.jsonl.preconflict`.

**Depends on.** T-423.

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
  `fastener | thread | qty | torque (N·m / kgf·m / lbf·ft) | sequence | lube | reusable | PN | notes`.
  Conflict-group rows rendered with a visible "⚠ conflict" callout.
- `research/h-series/maintenance/torque-by-fastener.md` — sections per
  `(thread, role)` group. Each section lists every application and shows
  median + range. ARP aftermarket appended as its own "Aftermarket" subsection.

Renderer idempotent: re-running produces identical output if JSONL unchanged.

**Depends on.** T-424, T-426.

### T-428 — Spot-check

**Description.** Two-part verification:
1. **100% review of TTY-stretch rows.** Every row with `role: "tty-stretch"`
   compared against its source page PNG. Expected ~15–20 rows (head bolts,
   main caps, rod caps, flywheel bolts across BB6 + OBD1).
2. **20-row stratified random sample.** Sample distribution: engine 8,
   drivetrain 4, chassis 6, body 2. Each row checked against its source.

Record accuracy in the task report. Any wrong row spawns a fix task.

**Depends on.** T-427.

### T-429 — Update master-index + QWEN.md

**Description.** Update `research/indexes/master-index.md` with links to
both markdown views, the JSONL, and SCHEMA.md. Update `QWEN.md`
§Specifications with a "Torque & Fastener Index" subsection summarizing
coverage and pointing to the index files.

**Depends on.** T-427.

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
- Both markdown views render cleanly from JSONL.
- `h22-torques.jsonl` passes schema validation (0 rejects after T-424
  merge, or all rejects justified in `h22-torques-rejects.jsonl`).
- Cost ledger total matches sum of per-call entries; no orphaned responses.
- All retention guarantees demonstrably enforced (T-416 contract).

**Depends on.** T-430.
