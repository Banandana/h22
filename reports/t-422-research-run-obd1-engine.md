# T-422 Report: OBD1 Engine-Chapter Matrix Extraction

## Task

```
- [ ] **(M)** T-422 [research] Run OBD1 engine-chapter matrix extraction (PDF->PNG + default profile + inline rescue, ~150-250 pages, ~$4-10) -- full spec: docs/plans/04b-torque-fastener-index.md @ T-422
```

## Summary

T-422 could not be executed. All upstream infrastructure dependencies remain incomplete. The vision-extraction pipeline (`scripts/extract-torques-vision.mjs`), the durable response store (`research/raw-data/torque-specs/`), the OBD1 Honda service manual PDF (T-414c), and the preflight/bake-off runs (T-418, T-418b) have not been built. The current "OBD1 PDF" at `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf` is mislabeled HTML (60 KB), not a real PDF.

## Files changed

_(none — no files were created or modified)_

## Commands run

```bash
# Verified missing infrastructure
ls /data/h22/scripts/acquire-obd1-pdf.mjs        # not found
ls /data/h22/scripts/extract-torques-vision.mjs   # not found
ls /data/h22/research/raw-data/torque-specs/      # not found
file 1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf
# → HTML document, Unicode text, UTF-8
```

## Manual verification

N/A — no code to exercise.

## Coverage delta

n/a

## Follow-ups discovered

T-422 cannot proceed until the following tasks are completed in order:

1. **T-414** — Write SCHEMA.md (canonical row schema + per-invocation record schema + role taxonomy + consensus algorithm + gitignore policy)
2. **T-414b** — Write models.json + extraction-matrix.json; verify Together model IDs
3. **T-414c** — Acquire real OBD1 Honda service manual PDF via Playwright; replace mislabeled HTML placeholder
4. **T-415** — Build chapters.json (chapter → page-range map for BB6 + OBD1 engine chapters)
5. **T-416** — Scaffold durable response store (per-page subdirs, cache/, cost-ledger, Zod validators)
6. **T-417a** — Write extract-torques-vision.mjs skeleton (CLI flags, provider abstraction, prompt loader)
7. **T-417b** — Implement extract-torques-vision.mjs (TogetherProvider + AnthropicProvider, multi-run loop, content-hash cache, retry-with-backoff)
8. **T-418** — Preflight: dry-run on 3 pages × default matrix; verify records + cache + ledger
9. **T-418b** — Bake-off: 10-page pilot across every default-matrix model; emit bakeoff-report.md

Only after all of these can T-422 execute.

## Blocker

**All upstream dependencies are incomplete.** Specifically:

1. **No real OBD1 PDF.** The file `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf` is HTML (confirmed via `file`). T-414c must acquire a real scanned Honda factory service manual (techinfo.honda.com, Honda Service Express, enthusiast forums, or archive.org). Helms reprint scans are acceptable.

2. **No extraction pipeline.** `scripts/extract-torques-vision.mjs` does not exist. Neither does the provider abstraction (TogetherProvider / AnthropicProvider), the content-hash cache, the matrix execution loop, or the prompt file at `scripts/prompts/extract-torques-v1.md`.

3. **No response store.** `research/raw-data/torque-specs/` directory does not exist. No `responses/`, `cache/`, `cost-ledger.jsonl`, or Zod validators.

4. **No config files.** `models.json`, `extraction-matrix.json`, `chapters.json`, and `SCHEMA.md` do not exist.

5. **No preflight/bake-off.** T-418 and T-418b have not run, so we have no evidence that the Together API keys work, that the prompt produces valid JSONL output, or that the models' accuracy meets the bake-off threshold (≥60%).

**Recommendation:** Complete T-414 through T-418b sequentially before attempting T-422. Each task is a prerequisite for the next. The total effort for the full pipeline (T-414 through T-418b) is estimated at 4-8 hours of agent work.

## Commit SHA(s)

_(none)_

## DoD checklist

```
DoD checklist
- [x] Researched with cited sources — N/A (blocked on infrastructure)
- [x] Written to research/<series>/<topic>.md — N/A (no output produced)
- [x] Index updated in research/indexes/ — N/A
- [x] Cross-checked against 2+ sources — N/A
- [x] No swallowed errors introduced — N/A
- [x] README / CLAUDE.md updated — N/A
- [x] STATE.md moved to Done — BLOCKED (see below)
- [x] CI green — N/A (no code changes)
- [x] Full suite re-run — N/A
```

**STATE.md update:** Task left as `[ ]` (open) with blocker noted. Will be revisited once T-414 through T-418b are complete.
