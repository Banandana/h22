# Honda H22 Research — Agent Guide

A comprehensive research project on the Honda H22 engine family. The project combines local
service manuals (PDF + OCR), web-sourced technical documentation, and structured analysis into
a unified, verifiable knowledge base.

## Mandatory reading order

1. This file (you are here)
2. `STATE.md` — open tasks, current focus, hand-off notes
3. `QWEN.md` — the primary compiled reference document (all known specs, variants, procedures)
4. `docs/plans/<slug>.md` — the authoritative spec for your assigned task
5. Local service manuals in the repo root (`*.pdf`, `*_extracted.txt`)

## Project structure

| File/dir | Purpose |
|---|---|
| `QWEN.md` | Master compiled reference — all known H22 data organized by topic |
| `STATE.md` | Live task tracker with phases, gates, Definition of Done |
| `docs/plans/` | Per-phase plan docs with detailed task specs |
| `reports/` | Per-task report files written by pi after completion |
| `.runlog/` | Raw JSONL event logs + rendered logs per task iteration |
| `scripts/` | `run-all.sh` (orchestrator) + `run-task.sh` (single task driver) |
| `*.pdf` | Source service manuals (Helms manuals for 4th/5th gen Prelude) |
| `*_extracted.txt` | OCR-extracted text from PDFs |
| `bb6_ocr/` | OCR processing scripts and samples |

## Knowledge sources

### Primary (local)
- **1992-1996 Helms Manual** (OBD1, H22A1) — `1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf`
- **1997-2001 Helms Manual** (OBD2, H22A4) — `1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf`
- **BB6 OCR extracted text** — `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt` (~1.8MB searchable)

### Secondary (compiled in QWEN.md)
- 50+ web sources including Wikipedia, Honda-Tech forums, TorqueCars, Hondata docs
- Community-verified performance data, tuning guides, swap reports
- Aftermarket supplier catalogs and product recommendations

### Tertiary (external references)
- Listed in `QWEN.md` §References & Sources — some links may be stale
- Phase 1 audit will identify broken/outdated URLs for fetching or removal

## Task execution model

Tasks flow through phases sequentially:
1. **Phase 0** — Bootstrap and repo hygiene (config, scripts, conventions)
2. **Phase 1** — Knowledge audit and consolidation (assess what we have, find gaps)
3. **Phase 2** — Data collection and enrichment (fetch missing sources, validate)
4. **Phase 3** — Analysis and synthesis (comparisons, modeling, risk scoring)
5. **Phase 4** — Output and delivery (final docs, indexes, quick-references)

Each phase ends with a `[checkpoint]` (re-check drift) and a `[gate]` (stricter — blocks next phase).

## Conventions

- Semicolons, single quotes, 100-col line width, trailing commas
- **Named exports only**, no default exports (if writing code)
- Explicit return types on exported functions
- Co-located `*.test.ts` files for any new code
- No `any`; no `as` casts except at well-justified boundaries
- File size cap ~1000 lines
- Commit messages use conventional prefix (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `perf:`)

## Workspace rules (from /data/CLAUDE.md)

- **No `Co-Authored-By` trailers in commits.** Workspace-wide rule.
- Keep README.md, CLAUDE.md, and STATE.md in sync with changes. Commit doc updates alongside the change.
- After each meaningful set of changes: commit and push to `origin/main`.

## Definition of Done (TL;DR)

**See `STATE.md` for the full DoD spec.** A task is not done until:
1. Implemented + merged to `main`.
2. **Manually verified** — exercised in a real terminal or session. Paste output in the report.
3. **Tests added** for any new code (unit, property, mock-service, integration, e2e-subprocess).
4. **Coverage ≥ threshold** — never lowered; it's a ratchet.
5. **No swallowed errors** — every `catch {}` is justified or re-throws.
6. **Docs in sync** — README + CLAUDE.md updated in the same commit if behavior changed.
7. **STATE.md updated** — task moved to Done with commit SHA + date.
8. **CI green** — typecheck + lint + test + format pass locally and remotely.
9. **No regressions** — full suite re-run, not just new tests.
10. **Reviewable diff** — single-purpose commits, conventional prefixes, no drive-by reformatting.

If you can't tick every box, the task stays `[~]` in progress. **Do not** claim `[x]` to ship faster.

## Things NOT to do

- Don't invent specifications that aren't backed by a source. If a number appears in multiple
  independent sources, cite them. If it's from one source only, note that.
- Don't modify the original PDF service manuals. Work on extracted text and derived outputs.
- Don't add a DI container or DDD layering "for symmetry" — this is a research project, not an app.
- Don't pollute STATE.md with implementation details. Keep task lines terse; put detail in plan docs.
- Don't skip the report file. Every completed task gets `reports/<slug>.md` with summary, files
  changed, commands run, manual verification, coverage delta, follow-ups, and commit SHAs.

## Pre-commit checklist (the mechanical version)

1. `npm run typecheck` passes (if applicable)
2. `npm run lint` passes (if applicable)
3. `npm test` passes (if applicable)
4. `npm run format:check` passes (if applicable)
5. New code has tests; coverage didn't drop
6. Manually exercised; paste / screenshot ready for report
7. README / STATE / this file updated if scope or structure changed
8. Commit message uses conventional prefix
9. No `Co-Authored-By` trailer

## Runner profile

Scripts default to the **35B toaster** profile:
- Provider: `local-toaster` (configured in `~/.pi/agent/extensions/local.ts`)
- Model: `Qwen/Qwen3.6-35B-A3B` at 512K context, served by SGLang on `:30000`
- Sampling: temp=0.6, top_p=0.90, presence_penalty=1.05 (capped to 0.3 on Qwen3.5)
- Thinking mode: ON
- Override via `PI_PROVIDER` / `PI_MODEL` env vars or `--provider` / `--model` flags
