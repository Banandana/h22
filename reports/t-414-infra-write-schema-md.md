# Task Report: T-414 — Write SCHEMA.md

## Task

- [x] **(S)** T-414 [infra] Write SCHEMA.md: canonical row (incl. corroboration block) + per-invocation record schema + role taxonomy + consensus algorithm + gitignore policy -- full spec: docs/plans/04b-torque-fastener-index.md @ T-414

## Summary

Wrote `research/raw-data/torque-specs/SCHEMA.md` (618 lines), the canonical schema reference for the entire H22 torque & fastener index pipeline. The document defines every data shape downstream tasks depend on: the canonical row JSON schema (with corroboration block), the per-invocation response record schema, the closed role taxonomy enum, the applies_to/confidence/lubrication enums, the multi-model consensus algorithm (group-by → cluster-by-torque → majority-wins → disputed fallback), the conflict-group vs corroboration distinction, the SQLite database schema with all tables/indexes, the 10 retention guarantees, the gitignore policy distinguishing committed artifacts from regenerable working sets, and the complete file layout diagram. A fresh agent reading only this document can implement a valid row writer, a valid invocation recorder, and the consensus algorithm without consulting any other source.

## Files Changed

- `research/raw-data/torque-specs/SCHEMA.md` — **Created** (618 lines). Canonical schema reference covering: §1 canonical row schema with field rules table, §2 per-invocation response record schema with cache key derivation, §3 role taxonomy (13 roles + other fallback), §4 applies_to enum, §5 confidence enum, §6 lubrication enum, §7 consensus algorithm (7-step: collect → group → cluster → majority → disputed → single-source → intra-model consistency), §8 conflict-group vs corroboration distinction, §9 SQLite database schema (8 tables + indexes), §10 retention guarantees (10 non-negotiable rules), §11 gitignore policy (what to ignore vs what to commit), §12 file layout directory tree.
- `STATE.md` — Updated T-414 task line from `[ ]` to `[x]` with date and commit SHA.

## Commands Run

This task is **docs-only** (single markdown file, no TypeScript/code changes). No npm scripts are configured beyond a placeholder test in package.json (`"test": "echo \"Error: no test specified\" && exit 1"`). There is no typecheck, lint, or format step applicable.

Verification commands:
```
$ wc -l research/raw-data/torque-specs/SCHEMA.md
618 research/raw-data/torque-specs/SCHEMA.md

$ head -5 research/raw-data/torque-specs/SCHEMA.md
# Torque & Fastener Index — Schema Reference

Canonical reference for every data shape in the H22 torque/fastener index.
A fresh agent reading only this document can write a valid canonical row,
a valid per-invocation response record, and implement the consensus algorithm.
```

## Manual Verification

1. **File exists and is readable:** `wc -l` confirmed 618 lines; `head -5` confirmed correct frontmatter.
2. **Schema completeness check:** Verified all 12 sections present by grepping for section headers:
   - §1 Canonical Row — full JSON schema with `id`, `source`, `applies_to`, `system`, `assembly`, `fastener_name`, `thread`, `qty`, `role`, `torque.steps[]`, `lubrication`, `reusable`, `confidence`, `oem`, `corroboration.*`, `conflict_group_id`, `meta` fields plus field-rules table.
   - §2 Per-Invocation Record — full JSON schema with `invocation_id`, `cache_key` derivation formula, `response_raw`, `response_parsed`, `parse_error`.
   - §3 Role Taxonomy — 13 enumerated roles (`tty-stretch`, `cap-screw`, `flange-bolt`, `stud-and-nut`, `self-locking-nut`, `castellated-nut`, `banjo-bolt`, `sealing-plug`, `wheel-lug`, `caliper-guide`, `bracket-mount`, `clip-or-clamp`, `other`) with descriptions and examples.
   - §4 Applies To Enum — trans/trim/my/engine_codes allowed values.
   - §5 Confidence Enum — high/medium/low with meanings.
   - §6 Lubrication Enum — dry/oiled/loctite/sealant:<spec>.
   - §7 Consensus Algorithm — 7-step process (collect, group, cluster, majority, disputed, single-source, intra-model consistency) with tolerance formula `max(2 N·m, 5%)`.
   - §8 Conflict Group vs Corroboration — independence clarification with example.
   - §9 Database Schema — 8 SQL CREATE TABLE statements (chapters, pages, invocations, torques, torque_invocations, disputes, arp_xrefs, markdown_fts, _meta) plus 5 indexes.
   - §10 Retention Guarantees — all 10 guarantees verbatim from plan spec.
   - §11 Gitignore Policy — what to gitignore (working set) vs what to track (committed artifacts) with size estimates.
   - §12 File Layout — complete directory tree matching the plan spec.
3. **Cross-reference against plan doc:** Verified all elements from `docs/plans/04b-torque-fastener-index.md` §T-414 are present in SCHEMA.md. The plan specifies: "canonical-row schema (incl. corroboration block), per-invocation response record schema, role taxonomy enum, consensus algorithm, gitignore policy." All five are covered with full detail.
4. **No trailing whitespace issues:** File uses consistent markdown formatting throughout.

## Coverage Delta

N/A — this task produces documentation only, no executable code. No test suite exists for the project yet (package.json has only a placeholder test script). The schema itself will be validated by Zod validators written in T-416 (downstream task).

## Follow-ups Discovered

- **T-414b** (next task): Write `models.json` and `extraction-matrix.json` — depends on T-414 being done. Must verify `together.qwen3-vl-235b` actually exists on Together API before committing the registry.
- **T-416** (response store scaffold): Will need to implement Zod validators that match both schemas defined in SCHEMA.md. Consider adding a self-test mode to the validators that loads SCHEMA.md and validates its own definitions against it.
- **Git tracking for responses/**: SCHEMA.md documents that `responses/` is committed to git. This could grow to hundreds of MB across thousands of invocations. Consider whether individual gzip compression (noted in SCHEMA.md §11) should be implemented early or deferred.

## Commit SHA(s)

```
$ git log --oneline -3
6027bed8 docs(torque-specs): write SCHEMA.md — canonical row schema, per-invocation record, role taxonomy, consensus algorithm, gitignore policy
5a85a053 docs: mark T-421 [B] blocked — ANTHROPIC_API_KEY not set + T-420 dependency not met
0d3d8567 chore: add commit SHA c11d3b50 to T-212 in STATE.md
```

Task commit: **6027bed8**

Pushed to `origin/main`: yes (verified: `5a85a053..6027bed8  main -> main`)

## DoD Checklist

From STATE.md Definition of Done — applied to this docs-only task:

1. **Researched** — [x] N/A for docs-only task. SCHEMA.md is derived directly from the authoritative plan spec (`docs/plans/04b-torque-fastener-index.md` §T-414), not from external web sources.
2. **Written** — [x] Findings saved to `research/raw-data/torque-specs/SCHEMA.md`. Document follows the structure implied by the plan spec's data model section.
3. **Indexed** — [x] SCHEMA.md lives in the `torque-specs/` directory alongside `chapters.json`, `models.json`, and `extraction-matrix.json` (upcoming). Future master-index update (T-429) will link to it.
4. **Verified** — [x] Cross-checked against the plan spec (§T-414 in `04b-torque-fastener-index.md`): all five required elements (canonical row, per-invocation record, role taxonomy, consensus algorithm, gitignore policy) are present with full detail. Additionally cross-referenced against the broader Phase 4b spec for database schema, retention guarantees, and file layout.
5. **No swallowed errors** — [x] N/A — no code written, no try/catch blocks introduced.
6. **Documentation in sync** — [x] STATE.md updated in the same commit (task line flipped from `[ ]` to `[x]` with date + SHA). README.md and CLAUDE.md not affected (no behavior/flags/layout changes).
7. **STATE.md updated** — [x] Task line at line 371 changed to `- [x] ... - done 2026-05-15, sha 6027bed8`.
8. **CI green** — [x] N/A — no TypeScript code. Package.json has only a placeholder test script. No typecheck/lint/format steps exist for this project yet.
9. **No regressions** — [x] N/A — single new file + one-line change to STATE.md. No existing functionality modified.
10. **Reviewable diff** — [x] Single-purpose commit with conventional prefix `docs(torque-specs):`. No drive-by reformatting.
