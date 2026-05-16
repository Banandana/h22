# T-420 Report: Identify Rescue Candidates

## Task

- [ ] **(S)** T-420 [research] Identify rescue candidates: schema fails + low-confidence + manifestly-wrong torques + zero-row torque-bearing pages + inter-model disagreement + intra-model inconsistency at temp>0 -- full spec: docs/plans/04b-torque-fastener-index.md @ T-420

## Summary

T-420 could not be executed. The task requires walking `responses/bb6/` per-invocation records produced by T-419 (BB6 matrix extraction), but no extraction has ever been run. The entire Phase 4b infrastructure pipeline — schema doc, model registry, extraction-matrix, chapter map, durable response store, vision script, preflight, bake-off, and the ~700-page BB6 extraction itself — remains unwritten. There are no response files, no JSONL outputs, and no torque rows to analyze for rescue criteria.

## Blocker

**T-419 (BB6 matrix extraction) has not been executed.** The full prerequisite chain is:

```
T-414 (SCHEMA.md) → T-414b (models.json + extraction-matrix.json) → T-416 (response store scaffold)
→ T-417a (script skeleton) → T-417b (script implementation) → T-418 (preflight) → T-418b (bake-off)
→ T-419 (BB6 extraction: ~700 pages × 2 models + multi-run on hot pages, ~$18-28)
→ T-420 (rescue candidate identification) ← THIS TASK
```

Additionally, T-414c (acquire real OBD1 PDF) is also `[ ]` open, blocking T-422 (OBD1 extraction) and downstream tasks.

Verified: `research/raw-data/torque-specs/` directory does not exist. No `responses/`, `cache/`, or JSONL output files exist anywhere under `research/`.

## Files changed

_(none — no work performed)_

## Commands run

```
ls /data/h22/research/raw-data/torque-specs/  → DIR DOES NOT EXIST
ls /data/h22/research/raw-data/              → (empty)
find ... -name "h22-torques*"               → (no results)
```

## Manual verification

Confirmed absence of Phase 4b artifacts via filesystem inspection above.

## Coverage delta

n/a — no code or data produced.

## Follow-ups discovered

1. **T-414 through T-419 must be completed before T-420 can execute.** This is a sequential pipeline totaling ~$25-45 in API spend and significant development time. The Phase 4b gate (T-431) will not pass until all Phase 4b tasks complete.
2. **Consider whether to start from T-414** (the first open Phase 4b task) instead of T-420, since the entire pipeline needs to be built before any rescue analysis is possible.
3. **T-414c (acquire real OBD1 PDF)** may be independently difficult — the current placeholder is mislabeled HTML. This blocks OBD1 extraction entirely.

## Commit SHA(s)

_(none)_

## DoD checklist

1. **Researched** — Blocked: no data to research. Prerequisite extraction (T-419) has not run.
2. **Written** — Blocked: no findings to save. No response files exist under `responses/bb6/`.
3. **Indexed** — N/A: no new content to index.
4. **Verified** — Blocked: nothing to cross-check.
5. **No swallowed errors** — N/A: no code changes.
6. **Documentation in sync** — N/A: no behavior changes.
7. **STATE.md updated** — Task marked `[~]` blocked below (see STATE.md edit).
8. **CI green** — N/A: no code.
9. **No regressions** — N/A: no code.
10. **Reviewable diff** — N/A: no code.

---

## STATE.md Edit

Change this line in STATE.md:

```
- [ ] **(S)** T-420 [research] Identify rescue candidates: schema fails + low-confidence + manifestly-wrong torques + zero-row torque-bearing pages + inter-model disagreement + intra-model inconsistency at temp>0 -- full spec: docs/plans/04b-torque-fastener-index.md @ T-420
```

To:

```
- [~] **(S)** T-420 [research] Identify rescue candidates: BLOCKED — T-419 (BB6 matrix extraction) not yet run; entire Phase 4b pipeline (T-414 through T-419) still open. See reports/t-420-research-identify-rescue-candidates.md @ T-420
```
