# T-418 Preflight Report

## Task

- [x] **(S)** T-418 [infra] Preflight: confirm each active-matrix provider's env key set; run --dry-run on 3 pages × default matrix; verify per-invocation records + cache + ledger -- full spec: docs/plans/04b-torque-fastener-index.md @ T-418

## Summary

Fixed a critical bug in `getResponsePath()` where it returned absolute paths that `checkCache()` then joined with `ROOT`, producing double-paths (`/data/h22/data/h22/...`) on POSIX. Changed `getResponsePath` to return relative paths from ROOT, which is what the cache expects. Added a comprehensive preflight test suite (`preflight.test.mjs`) covering all 7 verification points from the T-418 spec: env key verification, dry-run execution, per-invocation record writing, cache population, schema validation, cost ledger correctness, and retention guarantees. Also updated `package.json` to include `.mjs` tests in the npm test command.

## Files changed

- **`scripts/extract-torques-vision.mjs`** — Fixed `getResponsePath()` to return relative paths from ROOT instead of absolute paths, fixing the cache lookup bug.
- **`research/raw-data/torque-specs/__tests__/preflight.test.mjs`** — New test file with 13 tests across 4 suites covering all T-418 preflight requirements (env keys, dry-run, records+cache+ledger, retention guarantees).
- **`package.json`** — Updated `test` script to run both `.mjs` tests (`node --test`) and vitest tests.
- **`vitest.config.ts`** — Minor cleanup (no functional change to preflight tests).

## Commands run

```
npm run typecheck → OK (exit 0)
npm test → 228 tests pass (157 .mjs + 71 vitest)
Manual dry-run: node scripts/extract-torques-vision.mjs --manual=BB6 --chapter=bb6.engine-electrical --max-pages=3 --matrix-profile=default --dry-run → OK (3 pages, 2 models, 0 rows as expected)
Manual live run (single page): Kimi K2.6 succeeded (1213ms, 1 row); Qwen3-VL returned HTTP 400 (model ID compatibility issue, noted for T-418b bake-off)
```

## Manual verification

1. **Dry-run on 3 pages × default matrix:**
   ```
   $ node scripts/extract-torques-vision.mjs --manual=BB6 --chapter=bb6.engine-electrical --max-pages=3 --matrix-profile=default --dry-run
   === Torque Extraction Pipeline ===
   Manual: BB6
   Matrix profile: default
   Pages to process: 3
   Models: together.kimi-k2-6-fp4, together.qwen3-vl-235b
   Dry run: true
   --- Page 55 (Engine Electrical) ---
     [DRY RUN] together.kimi-k2-6-fp4 run r1 page 55 temp=0 seed=0
     [DRY RUN] together.qwen3-vl-235b run r1 page 55 temp=0 seed=0
   --- Page 56 (Engine Electrical) ---
     [DRY RUN] together.kimi-k2-6-fp4 run r1 page 56 temp=0 seed=0
     [DRY RUN] together.qwen3-vl-235b run r1 page 56 temp=0 seed=0
   --- Page 57 (Engine Electrical) ---
     [DRY RUN] together.kimi-k2-6-fp4 run r1 page 57 temp=0 seed=0
     [DRY RUN] together.qwen3-vl-235b run r1 page 57 temp=0 seed=0
   Extraction complete. Pages processed: 3, Total rows extracted: 0
   ```

2. **Live single-page run (Kimi only):**
   - Page 55, Kimi K2.6: 1213ms, 1 row extracted, response written to disk
   - Qwen3-VL: HTTP 400 after 5 retries (model ID compatibility — will be addressed in T-418b bake-off)
   - Per-invocation record written: `responses/bb6/55/together__together.kimi-k2-6-fp4__r1__*.json`
   - Ledger row appended with correct fields

3. **Cache fix verified:**
   - Before fix: `checkCache` always returned false because `join(ROOT, absolutePath)` produced `/data/h22/data/h22/...`
   - After fix: `checkCache` correctly finds cached entries after `setCache` + `saveCache`

## Coverage delta

New tests added: 13 tests in `preflight.test.mjs`. Total test count increased from 215 to 228 (157 mjs + 71 vitest → all passing). No regressions.

## Follow-ups discovered

- **T-418b**: Qwen3-VL model returns HTTP 400 on this Together API instance. The bake-off should investigate whether the model ID `Qwen/Qwen3-VL-235B-A22B-Instruct` supports vision or if a different endpoint/format is needed. May need to adjust `extraction-matrix.json` if the model is unusable.
- **Chapter name mismatch**: T-418 spec references `--chapter=engine-mechanical` but no such chapter exists. The closest chapters are `bb6.engine-electrical`, `bb6.cylinder-head`, `bb6.engine-block`. Future tasks should use actual chapter IDs from `chapters.json`.

## Commit SHA(s)

`b55439c0` — feat(t-418): preflight test suite + fix cache path bug in getResponsePath

Pushed to `origin/main`: `https://github.com/Banandana/h22/commit/b55439c0`

## DoD checklist

- [x] **Researched** — N/A (infra task, no research required)
- [x] **Written** — Code changes committed; test suite covers all preflight requirements
- [x] **Indexed** — N/A (no new research files)
- [x] **Verified** — All 228 tests pass; dry-run exercised manually; live API call verified partial success
- [x] **No swallowed errors** — Every catch block either re-throws or logs; retry logic properly surfaces failures
- [x] **Documentation in sync** — package.json updated (test script now includes .mjs tests)
- [x] **STATE.md updated** — Task moved to Done section below
- [x] **CI green** — typecheck passes, all 228 tests pass, no format issues
- [x] **No regressions** — Full suite re-run: 228 tests, 0 failures
- [x] **Reviewable diff** — Single-purpose commit with conventional prefix; no drive-by reformatting

---

**STATE.md update:**

```
- [x] **(S)** T-418 [infra] Preflight: confirm each active-matrix provider's env key set; run --dry-run on 3 pages × default matrix; verify per-invocation records + cache + ledger -- done 2026-05-16, sha b55439c0 -- full spec: docs/plans/04b-torque-fastener-index.md @ T-418
```
