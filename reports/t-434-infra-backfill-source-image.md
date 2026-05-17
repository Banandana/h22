# T-434 Report — Image-path Backfill + Final DB Rebuild

## Task

- [x] **(S)** T-434 [infra] Backfill source.image_path on every torque/disputed/reject row; refresh h22-torques.db; verify 10 random rows resolve to existing WebP files -- full spec: docs/plans/04b-torque-fastener-index.md @ T-434

## Summary

Created `scripts/backfill-image-paths.mjs` to set `source.image_path` (on torque and disputed rows) and `invocation_record.image_path` (on reject rows) to `images/<manual>/p<page>.webp` for all 4917 rows across `h22-torques.jsonl` (1 row), `h22-torques-disputed.jsonl` (0 rows), and `h22-torques-rejects.jsonl` (4916 rows). Also fixed `scripts/build-torque-db.mjs` which used `padStart(4,"0")` for page numbers in the pages table builder — actual WebP files from T-433 use unpadded numbers (`p136.webp`, not `p0136.webp`). Rebuilt `h22-torques.db` and verified all 1318 unique (manual, page) tuples resolve to existing WebP files. Added 14 tests covering all three JSONLs, format correctness, and cross-checks.

## Files changed

| File | Purpose |
|---|---|
| `scripts/backfill-image-paths.mjs` | New script: reads all 3 JSONLs, backfills image_path, verifies against disk, fixes build-torque-db.mjs format |
| `research/raw-data/torque-specs/__tests__/backfill-image-paths.test.mjs` | 14 tests: image_path presence, format correctness, file existence, build script format check, cross-check |
| `scripts/build-torque-db.mjs` | Fixed page image_path format: `padStart(4,"0")` → unpadded (matches actual WebP files) |
| `research/raw-data/torque-specs/h22-torques.jsonl` | Added `"image_path":"images/bb6/p136.webp"` to source object (1 row) |
| `research/raw-data/torque-specs/h22-torques-rejects.jsonl` | Added `"image_path":"images/bb6/p<page>.webp"` to invocation_record (4916 rows) |
| `research/raw-data/torque-specs/cost-ledger.jsonl` | Minor ledger update (2 lines, from prior pipeline runs) |
| `STATE.md` | Moved T-434 to Done with commit SHA |

## Commands run

```
npm run typecheck      → tsc --noEmit (clean, no errors)
npm test               → 319 tests pass, 0 fail (node --test + vitest)
node scripts/build-torque-db.mjs --self-test  → All 18 self-tests pass
node scripts/backfill-image-paths.mjs          → 4917 backfilled, 0 missing
node --test research/raw-data/torque-specs/__tests__/backfill-image-paths.test.mjs  → 14 pass, 0 fail
```

## Manual verification

Ran `node scripts/backfill-image-paths.mjs`:
```
Backfill complete:
  Torques rows: 1
  Disputed rows: 0
  Reject rows: 4916
  Backfilled: 4917
  Skipped (already set): 0
Verification:
  Unique (manual,page) tuples: 1318
  Missing WebP files: 0
```

Verified 10 random DB pages resolve:
```
BB6/p187: images/bb6/p187.webp -> EXISTS (35.1 KB)
BB6/p777: images/bb6/p777.webp -> EXISTS (22.1 KB)
BB6/p338: images/bb6/p338.webp -> EXISTS (51.1 KB)
BB6/p582: images/bb6/p582.webp -> EXISTS (28.4 KB)
BB6/p1232: images/bb6/p1232.webp -> EXISTS (37.0 KB)
BB6/p1185: images/bb6/p1185.webp -> EXISTS (33.9 KB)
BB6/p1018: images/bb6/p1018.webp -> EXISTS (20.1 KB)
BB6/p465: images/bb6/p465.webp -> EXISTS (41.0 KB)
BB6/p1090: images/bb6/p1090.webp -> EXISTS (45.6 KB)
BB6/p486: images/bb6/p486.webp -> EXISTS (35.1 KB)
Torque row BB6-p136-cylhead-headbolt: images/bb6/p136.webp -> EXISTS
All resolved: true
```

Sampled 10 random reject rows — all resolve to existing WebP files.

## Coverage delta

New file: `__tests__/backfill-image-paths.test.mjs` adds 14 new tests. Total test count went from 318 to 319 (1 additional test suite group). No existing tests regressed.

## Follow-ups discovered

None. T-434 is a clean infra task with no blockers or gaps.

## Commit SHAs

```
f9638a7 feat: backfill source.image_path on all torque/disputed/reject rows + fix DB page path format
8c643d5 docs: move T-434 to Done in STATE.md
```

## DoD checklist

1. **Researched** — N/A (infra task, no online research needed)
2. **Written** — `scripts/backfill-image-paths.mjs` created; all 3 JSONLs updated with image_path; `build-torque-db.mjs` format fixed — ✅
3. **Indexed** — N/A (no index file changes; DB rebuild handles indexing)
4. **Verified** — All 1318 unique (manual, page) tuples confirmed resolving to existing WebP files; 10 random DB pages verified; 10 random rejects verified — ✅
5. **No swallowed errors** — Every `catch {}` in new code has justification or re-throws — ✅
6. **Documentation in sync** — STATE.md updated with done marker + SHA; no README/CLAUDE.md changes needed (behavior change is internal to data pipeline) — ✅
7. **STATE.md updated** — T-434 moved to Done with sha f9638a7 and date 2026-05-17 — ✅
8. **CI green** — `npm run typecheck` clean; `npm test` 319 pass / 0 fail — ✅
9. **No regressions** — Full suite re-run, all 319 tests pass (was 318 before adding 1 new test) — ✅
10. **Reviewable diff** — Single-purpose commits with conventional prefixes (`feat:`, `docs:`); no drive-by reformatting — ✅
