# Task Report: T-414b — Write models.json + extraction-matrix.json

## Task

- [ ] **(S)** T-414b [infra] Write models.json (provider/model registry) + extraction-matrix.json (default Together-only + high-stakes overrides + rescue tier); verify Together model ids -- full spec: docs/plans/04b-torque-fastener-index.md @ T-414b

## Summary

Created two JSON configuration files for the H22 torque/fastener index pipeline:

1. **`research/raw-data/torque-specs/models.json`** — Provider/model registry with 4 entries (Kimi K2.6 FP4, Qwen3-VL-235B, Claude Sonnet 4.6, Claude Opus 4.7). Verified Together model IDs against official API docs: Kimi K2.6 confirmed as `moonshotai/Kimi-K2.6` ($1.20/$4.50 per 1M tokens). Qwen3-VL-235B (`Qwen/Qwen3-VL-235B-A22B-Instruct`) confirmed NOT available on Together serverless API — only via dedicated endpoints (fine-tuning docs show LoRA/full-ft support). Documented this limitation in a `note` field.

2. **`research/raw-data/torque-specs/extraction-matrix.json`** — Extraction matrix with default profile (Together-only, single-run temp=0), high-stakes chapter overrides (5 chapters, 3-run Kimi @ temp=0.3 + 2-run Qwen3-VL @ temp=0.2), and Anthropic Opus rescue tier (requires ANTHROPIC_API_KEY).

3. **`config-validation.test.mjs`** — 41 tests validating JSON structure, required fields, enum values, pricing data, cross-file consistency, and schema validation. All tests pass via `node --test`.

## Files Changed

| File | Purpose |
|---|---|
| `research/raw-data/torque-specs/models.json` | Provider/model registry (4 entries, verified Together model IDs + pricing) |
| `research/raw-data/torque-specs/extraction-matrix.json` | Default + high-stakes + rescue tier extraction matrix |
| `research/raw-data/torque-specs/__tests__/config-validation.test.mjs` | 41 validation tests (structure, enums, pricing, cross-file consistency) |

## Commands Run

### Test output (node --test)
```
# tests 41
# suites 4
# pass 41
# fail 0
# cancelled 0
# skipped 0
# duration_ms 104.704461
```

### typecheck
```
npm run typecheck
```
Result: Pre-existing failures in `src/torque-consensus/consensus.ts` (line 325: `firstWinningRow` undefined). Not introduced by this task — these are pre-existing bugs from earlier work. My changes are JSON files and Node.js test code (no TypeScript involved).

### lint / format:check
```
npm run lint        → script not found in package.json
npm run format:check → script not found in package.json
```
These scripts are not configured in the project's package.json. This is a pre-existing infrastructure gap, not introduced by this task.

### git commit + push
```
git add research/raw-data/torque-specs/models.json \
       research/raw-data/torque-specs/extraction-matrix.json \
       research/raw-data/torque-specs/__tests__/config-validation.test.mjs
git commit -m "feat(torque-specs): write models.json + extraction-matrix.json + validation tests"
git push origin main
```
Commit SHA: `de3ec2f1`
Pushed successfully to `origin/main`.

## Manual Verification

1. **JSON validity**: Both files parse cleanly with `JSON.parse()` (verified by test harness).
2. **Together model ID verification**: Queried Together AI docs (docs.together.ai/docs/serverless/models) — confirmed:
   - Kimi K2.6: API string `moonshotai/Kimi-K2.6`, Input $1.20/M, Output $4.50/M, FP4 quantization ✅
   - Qwen3-VL-235B: NOT listed on serverless vision models page. Only appears in fine-tuning docs (`Qwen/Qwen3-VL-235B-A22B-Instruct` for full-ft/LoRA). Serverless vision list shows Qwen3.5 397B, Qwen3.5 9B, Gemma 4 31B, Kimi K2.5.
3. **Test execution**: `node --test research/raw-data/torque-specs/__tests__/config-validation.test.mjs` — 41 tests pass, 0 fail.
4. **Cross-file consistency**: All model_ids referenced in extraction-matrix.json exist in models.json; all tiers match.

## Coverage Delta

N/A — this task creates new configuration files and their tests. No existing code was modified. The 41 new tests provide comprehensive coverage of the JSON schemas.

## Follow-ups Discovered

1. **T-414c dependency**: Qwen3-VL-235B is not available on Together serverless. If the pipeline requires it for vision tasks, either:
   - Use a dedicated endpoint instead of serverless
   - Replace with a serverless vision model (e.g., `Qwen/Qwen3.5-397B-A17B` or `google/gemma-4-31B-it`)
   - Accept single-model default matrix with multi-run sampling variance for corroboration
2. **CI pipeline**: Project lacks `npm run lint` and `npm run format:check` scripts. Consider adding them to package.json for future tasks.
3. **Pre-existing typecheck failures**: `src/torque-consensus/consensus.ts` has `firstWinningRow` undefined errors (from earlier consensus implementation). Should be fixed before merging any downstream work.

## Commit SHA(s)

```
de3ec2f1 feat(torque-specs): write models.json + extraction-matrix.json + validation tests
```

## DoD Checklist

1. **Researched** ✅ — Verified Together model IDs against official docs.together.ai pages. Confirmed Kimi K2.6 pricing and availability. Documented Qwen3-VL-235B serverless limitation.
2. **Written** ✅ — models.json and extraction-matrix.json written to `research/raw-data/torque-specs/` following the schema defined in SCHEMA.md (§12 File Layout).
3. **Indexed** ✅ — SCHEMA.md §12 lists both files as tracked artifacts. No separate index file needed for config files.
4. **Verified** ✅ — Cross-checked Together model IDs against official API docs. Cross-file consistency verified: all model_ids in extraction-matrix.json exist in models.json with matching tiers.
5. **No swallowed errors** ✅ — Tests use strict assertions. No try/catch blocks. Errors surface naturally.
6. **Documentation in sync** ✅ — STATE.md updated (task moved to Done). Report file written. SCHEMA.md already documents these files.
7. **STATE.md updated** ✅ — Task line flipped from `[ ]` to `[x]` with date (2026-05-16) and commit SHA (de3ec2f).
8. **CI green** ⚠️ — `npm run typecheck` has pre-existing failures in unrelated consensus.ts. `npm run lint` and `npm run format:check` scripts don't exist in package.json. My new code (JSON + Node.js tests) has no issues. 41/41 tests pass.
9. **No regressions** ✅ — No existing code modified. Only new files added.
10. **Reviewable diff** ✅ — Single-purpose commit with conventional prefix `feat:`. No drive-by reformatting. 3 files changed, 464 insertions.
