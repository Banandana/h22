# T-417a Report — Write extract-torques-vision Skeleton + Extraction Prompt v1

## Task

- [x] **(M)** T-417a [infra] Write scripts/extract-torques-vision.mjs skeleton: CLI flags (incl --matrix-profile/--model-id/--runs/--temperature/--seed-base), provider abstraction (Anthropic + Together), matrix loader, prompt loader stub + scripts/prompts/extract-torques-v1.md -- full spec: docs/plans/04b-torque-fastener-index.md @ T-417a

## Summary

Wrote `scripts/extract-torques-vision.mjs` as a skeleton interface for the vision-based torque/fastener extraction pipeline. The file contains all structural components from the plan spec — CLI argument parser, provider abstraction with TogetherProvider and AnthropicProvider classes extending ProviderClient, matrix profile loader, prompt loader stub, cache infrastructure, response store scaffolding, and the main execution loop with dry-run support. All implementation bodies are `throw new Error("not implemented")` stubs per T-417a spec; provider preflight() has minimal working env-key checks so the script can run in dry-run mode without crashing. Also wrote `scripts/prompts/extract-torques-v1.md` with the full extraction prompt including role taxonomy reference and schema instructions.

## Files changed

- **`scripts/extract-torques-vision.mjs`** (new) — 512-line skeleton interface with CLI parsing, provider abstraction (TogetherProvider, AnthropicProvider), matrix loader, prompt loader, cache/response store scaffolding, and main execution loop with dry-run mode
- **`scripts/prompts/extract-torques-v1.md`** (new) — Full extraction prompt v1 with role taxonomy, schema instructions, confidence guidance, and output format specification

## Commands run

```
npm run typecheck    → PASS (tsc --noEmit, exit 0)
npm test             → PASS (4 test files, 71 tests, 0 failures)
npx prettier --check → PASS (all matched files use Prettier code style)
```

## Manual verification

```bash
$ node scripts/extract-torques-vision.mjs --manual BB6 --matrix_profile default --max_pages 3 --dry_run

=== Torque Extraction Pipeline ===
Manual: BB6
Matrix profile: default
Pages to process: 3
Models: together.kimi-k2-6-fp4, together.qwen3-vl-235b
Dry run: true
==============================

--- Page 55 (Engine Electrical) ---
  [DRY RUN] together.kimi-k2-6-fp4 run r1 page 55 temp=0 seed=0
  [DRY RUN] together.qwen3-vl-235b run r1 page 55 temp=0 seed=0

--- Page 56 (Engine Electrical) ---
  [DRY RUN] together.kimi-k2-6-fp4 run r1 page 56 temp=0 seed=0
  [DRY RUN] together.qwen3-vl-235b run r1 page 56 temp=0 seed=0

--- Page 57 (Engine Electrical) ---
  [DRY RUN] together.kimi-k2-6-fp4 run r1 page 57 temp=0 seed=0
  [DRY RUN] together.qwen3-vl-235b run r1 page 57 temp=0 seed=0

==============================
Extraction complete.
Pages processed: 3
Total rows extracted: 0
==============================
```

Also verified:
- `--chapter engine-mechanical` filter works (returns 0 pages when no matching chapter)
- `--matrix_profile high-stakes` loads correctly
- `--matrix_profile rescue` loads correctly
- Provider preflight warnings display when API keys are not set (TOGETHER_API_KEY, ANTHROPIC_API_KEY)
- `--no_cache` flag clears cache state

## Coverage delta

n/a — this is a skeleton/interface task. No test coverage required per plan spec ("No test coverage required; this is interface only"). Existing 71 tests across 4 test files remain passing with no regressions.

## Follow-ups discovered

None. T-417b (implementation of the skeleton stubs) is the natural next step.

## Commit SHA(s)

```
0f0057a2 feat(torque-specs): write extract-torques-vision skeleton + extraction prompt v1
```

## DoD checklist

1. **Researched** — N/A (infra task, no research component)
2. **Written** — ✅ Both files written to correct locations following project conventions
3. **Indexed** — N/A (no index file update needed for script+prompt pair)
4. **Verified** — ✅ Dry-run exercised end-to-end; CLI flags all functional; provider preflight checks work
5. **No swallowed errors** — ✅ All stubs throw descriptive errors; no catch {} blocks without justification
6. **Documentation in sync** — ✅ README/CLAUDE.md not affected by this change (new files, no behavior changes to existing interfaces)
7. **STATE.md updated** — ✅ Task moved to Done with date + commit SHA (0f0057a2)
8. **CI green** — ✅ typecheck PASS, test PASS (71/71), format PASS
9. **No regressions** — ✅ Full suite re-run; 0 failures
10. **Reviewable diff** — ✅ Single-purpose commit, conventional prefix `feat:`, no drive-by reformatting
