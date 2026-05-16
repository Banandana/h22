# Phase 0 — Bootstrap and repo hygiene

Scaffold the project with all necessary config files, conventions, and runner verification.
This phase must be complete before any research work begins.

## T-001: Scaffold initial project structure and config files

**Description:** Create the foundational project files: `tsconfig.json` (strict), `eslint.config.js`
(flat config), `.prettierrc`, `vitest.config.ts`, `.gitignore`. Set up package.json with name,
version, description, main entry point, scripts (`typecheck`, `lint`, `test`, `format:check`,
`format:write`).

**Depends on:** none

**DoD notes:** Ensure tsconfig has all 29 strict flags from `/data/ts-template`. ESLint must use
flat config format. Vitest must be configured for ESM + tsx runtime.

---

## T-002: Add LICENSE file and package.json license field

**Description:** Add an MIT LICENSE file and set the `license` field in package.json.

**Depends on:** T-001

**DoD notes:** Standard MIT template. No special considerations.

---

## T-003: Complete package.json metadata fields

**Description:** Fill in missing package.json fields: `author`, `repository`, `homepage`, `bugs`,
`keywords`, `files`.

**Depends on:** T-001

**DoD notes:** Keep keywords relevant to Honda H22 research. `files` should list only what's needed
for npm packaging (src/, scripts/, *.md — exclude node_modules, .runlog, reports).

---

## T-004: Add .editorconfig matching project conventions

**Description:** Create `.editorconfig` with settings matching Prettier + ESLint conventions:
2-space indent, LF line endings, UTF-8 charset, final newline, trim trailing whitespace.

**Depends on:** T-001

**DoD notes:** No code changes — config only. Should be consistent with other projects under /data.

---

## T-005: Scaffold the docs directory with an index

**Description:** Create `docs/README.md` listing the plans/ subdirectory and forward-referencing
Phase 7 documentation tasks. Update `CLAUDE.md` and `STATE.md` to reference `docs/`.

**Depends on:** T-001

**DoD notes:** The index should be minimal — just a table of contents for what exists and what's
planned. Don't over-engineer; docs will grow organically.

---

## T-006: Add CONTRIBUTING.md contributor guide

**Description:** Write a `CONTRIBUTING.md` covering: how to run the agent pipeline, how to add
tasks to STATE.md, how to write plan docs, coding conventions, commit message format.

**Depends on:** T-005

**DoD notes:** Target audience is other agents (pi) and occasional human contributors. Keep it
practical — skip corporate fluff. Reference workspace rules from `/data/CLAUDE.md`.

---

## T-007: Verify the runner scripts work end-to-end

**Description:** Dry-run both `scripts/run-all.sh --dry-run` and `scripts/run-task.sh --dry-run`.
Verify `make_slug` self-test passes. Confirm SGLang connectivity check works (warns gracefully
if unreachable). Test signal handling (Ctrl-C propagation).

**Depends on:** T-001 (scripts exist)

**DoD notes:** This is the first real integration test. Run each script with `--dry-run` and
`--self-test`. Capture output in `reports/t-007-verify-runner-scripts.md`. If anything fails,
fix it before marking done.

---

## T-008: Phase 0 checkpoint

**Description:** Re-read all of STATE.md. Verify no stray `[~]` markers. Confirm `npm test`
passes (even if empty suite). Check that `git status` is clean. Verify the runner can pick up
the next task (T-009 gate) correctly.

**Depends on:** T-001 through T-007

**Spawns:** None expected. If drift is found, add `[fix]` tasks below this checkpoint.

**DoD notes:** This is a lightweight checkpoint — not a gate. It's about catching obvious issues
before the stricter gate at T-009.

---

## T-009: Phase 0 gate

**Description:** Stricter verification. Every task in Phase 0 must be `[x] done`. All config
files are present and correct. Runner scripts pass dry-run + self-test. `git status` is clean.
No `[~]` or `[B]` markers remain in Phase 0.

**Depends on:** T-008

**Spawns:** None. If this gate fails, go back and fix the failing tasks — don't bypass.

**DoD notes:** This gate blocks all subsequent phases. Do not mark done until every box ticks.
If you're tempted to skip something, write it as a `[fix]` task under the next phase instead.
