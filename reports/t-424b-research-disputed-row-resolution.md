# T-424b Report: Disputed-Row Resolution

## Task

- [x] **(M)** T-424b [research] Disputed-row resolution: walk h22-torques-disputed.jsonl, surface PNG + candidates, accept manual pick or mark unresolved; resolved rows move to h22-torques.jsonl -- full spec: docs/plans/04b-torque-fastener-index.md @ T-424b

## Summary

Executed T-424b disputed-row resolution. The `h22-torques-disputed.jsonl` file contained **zero disputed rows** — the consensus pass (T-423b) emitted 1 consensus row with unanimous agreement and 0 disputed rows. This is because the schema validator in the validation pipeline (T-423) was highly selective: of 5,061 parsed rows across 1,321 BB6 pages (5,111 invocations), only 1 row passed full canonical-row schema validation. That single row (cylinder head bolt on BB6 p.136) reached unanimous consensus across all model invocations. No disputed rows were produced, so no manual resolution was required. A reusable `scripts/resolve-disputed-rows.mjs` tool was created for future use when disputed rows exist.

## Files changed

- **`scripts/resolve-disputed-rows.mjs`** — New script implementing T-424b logic: walks disputed JSONL, surfaces page image paths + candidate torque values per disputed fastener, supports interactive mode for manual resolution, writes resolve-log.jsonl, updates disputed file with acknowledged flag, appends resolved rows to consensus JSONL.

## Commands run

```
npm test
  → 227 tests passed, 0 failed (node:test + vitest)

npm run typecheck
  → tsc --noEmit: clean, no errors

node scripts/resolve-disputed-rows.mjs
  → "No disputed rows to resolve. Pipeline clean."
```

## Manual verification

Ran `node scripts/resolve-disputed-rows.mjs` against the actual data directory. Output:

```
Disputed-row resolution (T-424b)
Base dir: /data/h22/research/raw-data/torque-specs
Mode: LOG-ONLY

Disputed rows: 0
Existing consensus rows: 1

No disputed rows to resolve. Pipeline clean.
```

Verified the disputed file content:
- `h22-torques-disputed.jsonl`: 1 byte (just a newline), 0 JSON lines
- `h22-torques.jsonl`: 1 consensus row (BB6-p136-cylhead-headbolt, 39 N·m, unanimous)
- Consensus report confirms: 0 disputed rows, 1 consensus row, 1 unanimous agreement

Data provenance check:
- 1,321 BB6 pages with response files (5,111 total invocations)
- 5,061 parsed rows from vision models
- 498 pages contained fastener-like data; 820 pages had non-fastener responses (analysis text, SRS warnings, etc.)
- Only 1 row survived the Zod schema validator (the rest failed on missing/invalid fields like `id`, `source.page` type, null enum values, invalid `lubrication`)

## Coverage delta

n/a — no new code with tests; this task is a data-resolution step. The existing test suite (227 tests) remains fully passing.

## Follow-ups discovered

- **Schema validator too strict for vision model output.** 99.98% of parsed rows (5,060/5,061) failed schema validation. Root causes: (a) vision models sometimes wrap results in a `{ fasteners: [...] }` envelope instead of emitting canonical rows directly; (b) `source.page` comes through as a string (e.g., `"14-8"`) rather than a number; (c) null values in enum fields (`applies_to.trans: null`); (d) `lubrication` accepts values outside the validated enum. This means the consensus pass only processed 1 page out of 1,321. A schema enrichment/preprocessing step should be added to the validation pipeline to normalize vision model output before Zod validation. This should be a new backlog task.

## Commit SHA(s)

Pending commit.

## DoD checklist

- [x] **Researched** — Examined `h22-torques-disputed.jsonl` (empty), `h22-torques.jsonl` (1 row), consensus report, invocation records across 1,321 pages. Verified data provenance end-to-end.
- [x] **Written** — Report written to `reports/t-424b-research-disputed-row-resolution.md`. Resolution tool written to `scripts/resolve-disputed-rows.mjs`.
- [x] **Indexed** — Not applicable; no index file changes needed. The disputed file is already part of the pipeline output.
- [x] **Verified** — Cross-checked: consensus report matches JSONL contents; disputed file genuinely empty (not truncated); single consensus row verified against source invocation records.
- [x] **No swallowed errors** — Script uses explicit error handling; `try/catch` on JSON parse with console.error; exits non-zero on uncaught errors.
- [x] **Documentation in sync** — No behavior/flag/layout changes that require README/CLAUDE.md updates.
- [ ] **STATE.md updated** — Pending commit.
- [x] **CI green** — `npm test`: 227 pass, 0 fail. `npm run typecheck`: clean.
- [x] **No regressions** — Full suite re-run; all 227 tests pass.
- [x] **Reviewable diff** — Single file added (`scripts/resolve-disputed-rows.mjs`). Conventional prefix: `feat:`.
