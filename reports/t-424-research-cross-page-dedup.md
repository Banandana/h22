# T-424 Report — Cross-Page Dedup + Conflict-Merge

## Task

- [x] **(M)** T-424 [research] Cross-page dedup + conflict-merge: group consensus rows ACROSS pages; merge agreements with widened applies_to; flag cross-page disagreements with conflict_group_id (separate from corroboration) -- full spec: docs/plans/04b-torque-fastener-index.md @ T-424

## Summary

Implemented `scripts/dedup-torques.mjs`, a Node.js ESM script that reads `h22-torques.jsonl` and performs cross-page deduplication. Rows sharing the same `(assembly, fastener_name, thread.nominal_mm, thread.pitch_mm)` key across pages are grouped. When torques agree (within max(2 N·m, 5%) tolerance), rows merge into one with a `sources` array listing all page citations and widened `applies_to`. When torques disagree, all rows are kept with a shared `conflict_group_id`. The previous version is archived as `.preconflict`. Currently processes 1 consensus row (from BB6 p.136, cylinder head bolt) — the broader dataset will grow as OBD1 extraction and future BB6 re-runs add more pages.

## Files changed

| File | Purpose |
|---|---|
| `scripts/dedup-torques.mjs` | Main dedup script: CLI (--base, --dry-run), grouping, merge/conflict logic, archive + rewrite |
| `research/raw-data/torque-specs/__tests__/dedup-torques.test.mjs` | 28 unit tests covering groupKey, getTorqueNm, torquesAgree, widenAppliesTo, conflictGroupId, full dedup flow (agree/disagree/single), edge cases, idempotency |
| `research/raw-data/torque-specs/h22-torques.jsonl` | Updated in-place: every row now has `sources` array and explicit `conflict_group_id: null` |
| `STATE.md` | T-424 moved to Done with commit SHA |

## Commands run

```
npm run typecheck   → tsc --noEmit (clean, no errors)
npm test            → node --test research/raw-data/torque-specs/__tests__/*.test.mjs
                      # tests 227, # pass 227, # fail 0
node scripts/dedup-torques.mjs
                      Loaded 1 consensus rows
                      Found 1 unique fastener groups
                      Single-page (no merge needed): 1
                      Wrote 1 rows
```

## Manual verification

```
$ node scripts/dedup-torques.mjs
Loaded 1 consensus rows from /data/h22/research/raw-data/torque-specs/h22-torques.jsonl
Found 1 unique fastener groups

=== Dedup Summary ===
Groups processed: 1
Merged (agreeing multi-page): 0
Conflicts (disagreeing multi-page): 0
Single-page (no merge needed): 1
Output rows: 1

Archived previous version to /data/h22/research/raw-data/torque-specs/h22-torques.jsonl.preconflict
Wrote 1 rows to /data/h22/research/raw-data/torque-specs/h22-torques.jsonl
```

Verified output JSON has new fields:
```json
{
  "id": "BB6-p136-cylhead-headbolt",
  ...
  "sources": [{"manual": "BB6", "page": 136}],
  "conflict_group_id": null,
  "corroboration": { "consensus_strategy": "unanimous", ... }
}
```

Archive file exists: `h22-torques.jsonl.preconflict` (19648 bytes vs updated 19713 bytes).

Idempotency verified: running the script twice produces identical output.

## Coverage delta

New code: 28 tests for the dedup module. All 227 existing tests still pass (0 regressions).

## Follow-ups discovered

- T-424b (Disputed-row resolution) — currently no disputed rows, but the infrastructure is in place.
- T-425 (Honda OEM PN fill-in) — blocked on T-424 completion (now unblocked).
- T-426 (ARP catalog aftermarket section) — blocked on T-424 completion (now unblocked).
- T-427 (Render both markdown views) — blocked on T-424 + T-426.

## Commit SHA(s)

```
e15e0b17 feat(t-424): cross-page dedup + conflict-merge for torque fastener index
75c9b277 docs(t-424): move T-424 to Done with commit SHA
```

## DoD checklist

1. **Researched** — ✅ Read SCHEMA.md §8 (Conflict Group vs Corroboration), plan doc T-424 spec, existing consensus-torques.mjs for algorithm reference.
2. **Written** — ✅ Script at `scripts/dedup-torques.mjs`, tests at `research/raw-data/torque-specs/__tests__/dedup-torques.test.mjs`.
3. **Indexed** — ✅ `h22-torques.jsonl` rewritten in-place with `sources` field populated on every row.
4. **Verified** — ✅ Cross-checked: single consensus row correctly gets `sources: [{manual:"BB6", page:136}]` and `conflict_group_id: null`. No cross-page conflicts exist in current data (only 1 page).
5. **No swallowed errors** — ✅ Every catch block either re-throws or has a clear justification. Error paths return early with console.error + exit(1).
6. **Documentation in sync** — ✅ N/A: no behavior/flags/layout changes to README or CLAUDE.md. Schema already documents `sources` and `conflict_group_id` fields.
7. **STATE.md updated** — ✅ T-424 moved to Done with sha e15e0b17, date 2026-05-17.
8. **CI green** — ✅ `tsc --noEmit` clean; `node --test` 227/227 pass.
9. **No regressions** — ✅ Full suite re-run: 227 tests, 0 failures.
10. **Reviewable diff** — ✅ Single-purpose commit. Conventional prefix `feat(t-424):`. No drive-by reformatting.
