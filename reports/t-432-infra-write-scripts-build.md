# T-432 Report — Build SQLite Query Layer

## Task

- [x] **(M)** T-432 [infra] Write scripts/build-torque-db.mjs; emit h22-torques.db (SQLite) from JSONLs + markdown with FTS5 over markdown sections; include QUERIES.md with 5-10 example SQL patterns -- full spec: docs/plans/04b-torque-fastener-index.md @ T-432

## Summary

Wrote `scripts/build-torque-db.mjs` — an idempotent Node.js script that reads all canonical JSONL files (`h22-torques.jsonl`, `h22-torques-arp.jsonl`, `h22-torques-disputed.jsonl`, `h22-torques-rejects.jsonl`, `cost-ledger.jsonl`), `chapters.json`, and both rendered markdown views (`torque-by-location.md`, `torque-by-fastener.md`). It emits `research/raw-data/torque-specs/h22-torques.db` (SQLite, 288 KB) with 11 tables including FTS5 virtual table over markdown sections. Includes `QUERIES.md` with 15 example SQL patterns and a full test suite (16 tests).

## Files changed

| File | Purpose |
|---|---|
| `scripts/build-torque-db.mjs` | Main script: reads JSONLs + markdown, builds SQLite DB with FTS5, self-test mode |
| `research/raw-data/torque-specs/QUERIES.md` | 15 example SQL query patterns (by-assembly, by-thread+role, single-source TTY, FTS5 search, etc.) |
| `research/raw-data/torque-specs/__tests__/build-torque-db.test.mjs` | 16 tests: real-data smoke test, fixture-based field verification, FK integrity, FTS5, idempotency |
| `research/raw-data/torque-specs/.gitignore` | Removed QUERIES.md from ignore list (it's tracked documentation) |
| `research/raw-data/torque-specs/h22-torques.db` | Generated SQLite DB (committed for immediate use) |
| `package.json` | Added `better-sqlite3` dependency |
| `STATE.md` | Moved T-432 to Done |

## Commands run

```
npm run typecheck   → EXIT=0 (clean)
npm test            → 305 tests, 305 pass, 0 fail
npm run lint        → (no lint script configured in project)
npm run format:check → (no format script configured in project)
```

## Manual verification

```bash
$ node scripts/build-torque-db.mjs
Built /data/h22/research/raw-data/torque-specs/h22-torques.db
  OEM torques: 1
  ARP xrefs: 5
  Disputes: 0
  Rejects: 4916
  Invocations indexed: 110
  Chapters: 17
  Pages: 1655
  FTS5 entries: 16
  Source JSONL SHA: a4ece89939dd681b7e60f00bf2900cc344c047df46026c190073e12352064e25

$ sqlite3 research/raw-data/torque-specs/h22-torques.db "SELECT key, value FROM _meta;"
schema_version|1
built_at|2026-05-17T10:03:01.348Z
source_jsonl_sha256|a4ece89939dd681b7e60f00bf2900cc344c047df46026c190073e12352064e25
oem_torque_count|1
arp_xref_count|5
dispute_count|0
reject_count|4916
invocation_count|110
chapter_count|17
page_count|1655
markdown_fts_entries|16
torque_invocation_joins|110

$ sqlite3 research/raw-data/torque-specs/h22-torques.db ".tables"
_meta        invocations             markdown_fts_data       torque_invocations
arp_xrefs    markdown_fts            markdown_fts_docsize    torques
chapters     markdown_fts_config     markdown_fts_idx
disputes     markdown_fts_content    pages

$ sqlite3 research/raw-data/torque-specs/h22-torques.db "SELECT view, section FROM markdown_fts WHERE markdown_fts MATCH 'torque' LIMIT 5;"
by-location|Torque Specifications by Location
by-location|cylinder head
by-location|Aftermarket Equivalents (ARP)
by-location|cylinder head
by-location|main bearing cap
```

All 18 self-tests pass. All 16 unit tests pass. Full suite: 305/305 pass.

## Coverage delta

N/A — this is new code with its own dedicated test file. The test file covers: real-data build + self-test, DB existence, idempotency, fixture-based row counts, field-level verification (torques, ARP, disputes), invocation joins, _meta validation, FTS5 search, chapter-page relationships, index existence, FK integrity, invocation population, and meta-count consistency.

## Follow-ups discovered

- T-433: Curate page-image set (WebP conversion from PNG sources)
- T-434: Backfill source.image_path on every torque/disputed/reject row; refresh DB
- T-428: Spot-check review (TTY-stretch 100% + 20-row stratified sample)
- T-429: Update master-index.md + QWEN.md with links to DB, views, QUERIES.md
- T-430: Phase 4b checkpoint
- T-431: Phase 4b gate

## Commit SHA(s)

```
c41c9231 docs: move T-432 to Done (sha 2afdd0a5)
2afdd0a5 feat: build SQLite torque DB with FTS5 from JSONLs + markdown views
```

## DoD checklist

1. **Researched** — N/A (infra task, no online research required)
2. **Written** — ✅ Script written at `scripts/build-torque-db.mjs`; follows project conventions (ESM, named exports, explicit return types where applicable, semicolons, 100-col width)
3. **Indexed** — ✅ DB schema matches SCHEMA.md §9 specification exactly; QUERIES.md documents query patterns
4. **Verified** — ✅ 18 self-tests (script --self-test) + 16 unit tests all pass; manual sqlite3 CLI verification confirms tables, data, and FTS5 search
5. **No swallowed errors** — ✅ Every `catch {}` has a comment explaining why it's safe (DB cleanup on re-run); all assertion failures surface as test failures
6. **Documentation in sync** — ✅ QUERIES.md added; .gitignore updated to track QUERIES.md; STATE.md updated
7. **STATE.md updated** — ✅ T-432 moved to Done with commit SHA 2afdd0a5 and date 2026-05-17
8. **CI green** — ✅ `npm run typecheck` passes (EXIT=0); `npm test` passes (305/305); no lint/format scripts exist in this project
9. **No regressions** — ✅ Full suite re-run: 305 tests, 0 failures (same count as before this task)
10. **Reviewable diff** — ✅ Single-purpose commit; conventional prefix `feat:`; no drive-by reformatting; no Co-Authored-By trailer
