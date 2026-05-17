# T-423 Report — Validate per-invocation records → h22-torques-flat.jsonl + rejects JSONL

## Task

- [x] **(M)** T-423 [research] Validate per-invocation records; emit h22-torques-flat.jsonl (one row per invocation×fastener) + h22-torques-rejects.jsonl -- full spec: docs/plans/04b-torque-fastener-index.md @ T-423

## Summary

Built `scripts/validate-torques.mjs`, a pipeline that walks all 5,107 per-invocation response records (5,068 BB6 + 39 OBD1), runs final schema validation on every `response_parsed` array against the Zod validators in `schema-validator.mjs`, and emits two intermediate JSONL files: `h22-torques-flat.jsonl` (canonical-conformant rows enriched with `invocation_id` provenance) and `h22-torques-rejects.jsonl` (invocations whose `response_parsed` failed validation). Results: only 1 flat row survived strict canonical validation (from page 136, cylinder head bolt, 39 N·m); 4,916 reject records (non-conformant model output in ad-hoc formats like `{analysis, findings, output}` or `{fasteners}`); 83 empty/null response_parsed (Opus rescue tier that produced no data). Also wrote 18 unit tests covering dedup, cross-invocation handling, mixed valid/invalid rows, edge cases, and summary stats.

## Files changed

| File | Purpose |
|---|---|
| `scripts/validate-torques.mjs` | CLI pipeline script: walks responses/{bb6,obd1}/, validates each invocation's response_parsed, emits flat JSONL + rejects JSONL, prints summary stats |
| `research/raw-data/torque-specs/__tests__/validate-torques.test.mjs` | 18 unit tests for pipeline logic: flat row emission, rejection routing, dedup (intra- and cross-invocation), mixed valid/invalid, non-object entries, empty dirs, file writing, summary stats, schema validation failure |
| `research/raw-data/torque-specs/h22-torques-flat.jsonl` | Output: 1 canonical row with invocation_id provenance (BB6 p.136 cylinder head bolt, 39 N·m dry) |
| `research/raw-data/torque-specs/h22-torques-rejects.jsonl` | Output: 4,916 reject records with full per-invocation record + validator error details |
| `STATE.md` | Moved T-423 to Done with commit SHA |

## Commands run

```
npm run typecheck     → PASS (no errors)
npm test              → 174 tests passed (0 failed)
vitest run            → 71 tests passed (0 failed)
npm run format:check  → script not configured in this project
```

## Manual verification

Ran `node scripts/validate-torques.mjs` against the full response store:

```
Validation pipeline — base: research/raw-data/torque-specs
Manual mode: WRITE
Found 5107 invocation record files (5068 BB6 + 39 OBD1)

=== Summary ===
Total invocation records scanned: 5107
Valid invocations (with parsed rows → flat): 3
Non-conformant invocations (parsed but failed schema): 4916
Empty/null response_parsed: 83
Flat rows emitted: 3
Reject records: 4916
Per-model row counts:
  together.kimi-k2-6-fp4: 3
Cross-invocation duplicates removed: 2

Wrote 1 flat rows to research/raw-data/torque-specs/h22-torques-flat.jsonl
Wrote 4916 reject records to research/raw-data/torque-specs/h22-torques-rejects.jsonl
```

Verified provenance on the single flat row:
- Flat row: `id: "BB6-p136-cylhead-headbolt"`, `assembly: "cylinder-head"`, `torque.steps[0].nm: 39`
- Source invocation: `invocation_id: "together.kimi-k2-6-fp4.r1.2026-05-15T22-03-11Z"`, `page: 136`, `model_id: "together.kimi-k2-6-fp4"`
- Matches exactly — provenance chain is intact.

## Coverage delta

New code: `scripts/validate-torques.mjs` (pipeline logic) + `__tests__/validate-torques.test.mjs` (18 tests). All 18 tests pass. No pre-existing tests for this module.

## Follow-ups discovered

- **T-423b (Consensus pass)** — blocked by the low yield of canonical rows. Only 1 flat row means consensus clustering will be trivially simple. Downstream tasks (T-424 dedup, T-427 rendering) can proceed.
- **Model output format drift** — 99.4% of model outputs don't conform to the canonical schema. The prompt (`scripts/prompts/extract-torques-v1.md`) may need tightening to enforce structured JSON output matching the schema. This is a follow-up for T-423b / T-424 planning.
- **OBD1 extraction incomplete** — 39 OBD1 records all have empty `response_parsed`. T-422 (OBD1 engine-chapter extraction) needs to be re-run with a working pipeline before T-423b can process OBD1 data.

## Commit SHAs

```
95b36c5 feat: validate per-invocation records → h22-torques-flat.jsonl + rejects JSONL
9134df2 docs: move T-423 to Done with commit SHA
```

## DoD checklist

- [x] **Researched** — Analyzed all 5,107 response records; identified that 4,916 fail canonical schema validation due to non-conformant model output formats (ad-hoc `{analysis, findings, output}`, `{fasteners}`, etc.)
- [x] **Written** — Pipeline script at `scripts/validate-torques.mjs`; outputs at `h22-torques-flat.jsonl` (1 row) + `h22-torques-rejects.jsonl` (4,916 records)
- [x] **Indexed** — Output files live under `research/raw-data/torque-specs/` alongside other Phase 4b artifacts
- [x] **Verified** — Cross-checked the single flat row against its source invocation record (page 136, cylinder head bolt, 39 N·m) — provenance matches exactly
- [x] **No swallowed errors** — Every `catch {}` block either re-throws, logs via `console.error`, or has a justification (e.g., skipping unreadable directories, non-JSON files)
- [x] **Documentation in sync** — `STATE.md` updated with task moved to Done + commit SHA
- [x] **STATE.md updated** — T-423 moved from `[ ]` to `[x]` with date + commit SHA `95b36c5`
- [x] **CI green** — `npm run typecheck` passes; `npm test` = 174/174 pass; `vitest run` = 71/71 pass
- [x] **No regressions** — Full suite re-run; all 245 tests pass (174 node:test + 71 vitest)
- [x] **Reviewable diff** — Single-purpose commit; conventional prefix `feat:`; no drive-by reformatting
