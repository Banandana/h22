#!/usr/bin/env bash
# scripts/run-task.sh — pick a task from STATE.md and drive `pi` until done.
#
# Usage:
#   scripts/run-task.sh                  # pick the first open task
#   scripts/run-task.sh "audit"          # pick the first open task whose text matches
#   scripts/run-task.sh -n 8             # cap iterations (default: 6)
#   scripts/run-task.sh --dry-run        # show which task would be picked, exit
#
# Each iteration is a fresh `pi -p --continue` invocation. We loop because pi's
# context window — even at 512K — can fill, and because a model can declare
# "done" prematurely. We stop when EITHER:
#   1. The task-specific report file `reports/<slug>.md` exists and STATE.md
#      shows the task moved to Done, OR
#   2. We hit the iteration cap (default 6), OR
#   3. The user presses Ctrl-C.
#
# Stack:
#   - Provider: local-toaster (configured in ~/.pi/agent/extensions/local.ts)
#   - Model:    Qwen/Qwen3.6-35B-A3B at 512K context, on SGLang :30000
#   - Sampling (forced by the toaster preset): temp=0.6, top_p=0.90,
#     top_k=-1 (disabled), presence_penalty=1.05 (capped to 0.3 on Qwen3.5).
#     Thinking mode stays ON. Override with PI_PROVIDER=... or
#     --provider <name> (local / local-coding / local-brainstorm / local-toaster).
#   - Subagents: enabled via the `pi-subagents` package in ~/.pi/agent.
#
# pi is driven in `--mode json` (see pi docs/json.md): instead of a TUI, pi
# emits one JSON object per line to stdout — a `session` header followed by
# `agent_start` / `turn_*` / `message_*` / `tool_execution_*` / `agent_end`
# events as they happen. Because each event is a discrete line written to a
# pipe, output streams live with no PTY trickery (the old `script -qfc` hack
# is gone). We fan the stream three ways:
#   1. raw JSONL  -> `.runlog/<slug>/<iso-ts>.jsonl` (+ per-iter `iter-N.jsonl`)
#      — the canonical, replayable record.
#   2. rendered   -> `render_events` turns each JSON line into a coloured,
#      human-readable line on the terminal (and into `<iso-ts>.log`).
#   3. stderr     -> `iter-N.stderr` plus the terminal (pi startup/extension
#      noise; kept off the JSONL stream so it stays pure).
# `.runlog/latest.log` / `.runlog/latest.jsonl` symlink the newest of each.
#
# Workspace rule reminder: no Co-Authored-By trailers in commits made by pi.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# --- args ----------------------------------------------------------------
MAX_ITERS=8
DRY_RUN=0
SELF_TEST=0
TASK_FILTER=""
PROVIDER="${PI_PROVIDER:-local-toaster}"
MODEL="${PI_MODEL:-Qwen/Qwen3.6-35B-A3B}"

while [[ $# -gt 0 ]]; do
  case "$1" in
    -n|--max-iters) MAX_ITERS="$2"; shift 2 ;;
    --dry-run)      DRY_RUN=1; shift ;;
    -h|--help)
      sed -n '2,30p' "$0"
      exit 0 ;;
    --provider)     PROVIDER="$2"; shift 2 ;;
    --model)        MODEL="$2"; shift 2 ;;
    --self-test)    SELF_TEST=1; shift ;;
    *)              TASK_FILTER="$1"; shift ;;
  esac
done

# --- make_slug -----------------------------------------------------------
# Input shape: a STATE.md task line from a Backlog section, e.g.
#   - [ ] **(S)** T-001 [impl] Scaffold initial project structure -- full spec: docs/plans/00-bootstrap.md @ T-001
#
# Output shape: a kebab-case slug starting with the lowercased task ID,
#   e.g. "t-001-impl-scaffold-initial" (first 6 words, non-alnum → space,
#   truncated to 50 chars). The result is used as the report filename:
#     reports/<slug>.md
#
# Pipeline (each stage is idempotent — safe to rerun on any output):
#   1. Strip the leading "- [ ] **(X)** " prefix (scope tag S/M/L).
#   2. Remove remaining markdown formatting (**, backticks).
#   3. Lowercase everything.
#   4. Replace every run of non-alphanumeric chars with a single space.
#   5. Take the first 6 space-separated words and join with hyphens.
#   6. Truncate to 50 characters.
#
# Guard: if the resulting slug does not start with "t-" (the lowercased
# task ID prefix), fall back to "task-$(date +%s)" and warn on stderr.
# This catches future format drift before it corrupts report filenames.
make_slug() {
  printf '%s' "$1" \
    | sed -E 's/^- \[ \] \*\*\([A-Z]\)\*\* //; s/\*\*//g; s/`//g' \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9 ]+/ /g; s/ +/ /g; s/^ //; s/ $//' \
    | awk '{ for (i=1; i<=6 && i<=NF; i++) printf (i==1?"":"-") $i; print "" }' \
    | cut -c1-50
}

# --- self-test -----------------------------------------------------------
# Verify make_slug against known inputs. Run via: scripts/run-task.sh --self-test
if (( SELF_TEST == 1 )); then
  echo "─── make_slug self-test ──────────────────────────────────────────────"
  FAILED=0
  run_case() {
    local input="$1" expected="$2"
    local actual
    actual="$(make_slug "$input")"
    if [[ "$actual" == "$expected" ]]; then
      echo "  ✓ $(printf '%-70s' "$input") → $actual"
    else
      echo "  ✗ FAIL: $(printf '%-70s' "$input")"
      echo "    expected: $expected"
      echo "    actual:   $actual"
      FAILED=1
    fi
  }
  # Standard T-NNN line format (the one STATE.md uses)
  run_case '- [ ] **(S)** T-001 [impl] Scaffold initial project structure -- full spec: docs/plans/00-bootstrap.md @ T-001' 't-001-impl-scaffold-initial'
  run_case '- [ ] **(M)** T-010 [audit] Audit QWEN.md for completeness -- full spec: docs/plans/01-knowledge-audit.md @ T-010' 't-010-audit-qwen-md-for'
  run_case '- [ ] **(S)** T-008 [checkpoint] Phase 0 checkpoint: runner and hygiene -- full spec: docs/plans/00-bootstrap.md @ T-008' 't-008-checkpoint-phase-0-checkpoint'
  # Edge cases
  run_case '- [ ] **(S)** T-002 [impl] Add LICENSE file and package.json license field' 't-002-impl-add-license-file'
  run_case '- [ ] **(L)** T-022 [impl] Build comparative analysis tools -- full spec: docs/plans/03-analysis.md @ T-022' 't-022-impl-build-comparative-anal'
  # Guard: malformed line without T-NNN prefix should fall back
  FALLBACK="$(make_slug '- [ ] **(S)** some random line without task id')"
  if [[ "$FALLBACK" != t-* ]]; then
    echo "  ✓ guard: non-T-NNN line produces fallback slug '$FALLBACK'"
  else
    echo "  ✗ FAIL: guard should have rejected this line but got '$FALLBACK'"
    FAILED=1
  fi
  echo "──────────────────────────────────────────────────────────────────────"
  if (( FAILED == 1 )); then
    echo "RESULT: FAILED"
    exit 1
  fi
  echo "RESULT: ALL PASSED"
  exit 0
fi

# --- preflight -----------------------------------------------------------
if ! command -v pi >/dev/null 2>&1; then
  echo "error: \`pi\` not on PATH. Install pi-coding-agent first." >&2
  exit 2
fi
RENDER_WITH_JQ=1
if ! command -v jq >/dev/null 2>&1; then
  echo "warn: \`jq\` not on PATH — live event rendering disabled, raw JSONL only." >&2
  RENDER_WITH_JQ=0
fi
if [[ ! -f STATE.md ]]; then
  echo "error: STATE.md not found in $REPO_ROOT" >&2
  exit 2
fi
if ! curl -fsS -o /dev/null --max-time 3 "http://localhost:30000/v1/models" 2>/dev/null; then
  echo "warn: local SGLang at :30000 unreachable — pi will fail or fall back." >&2
fi

# --- pick a task ---------------------------------------------------------
# Extract the first `- [ ] ...` line from STATE.md that matches (case-insensitive)
# the optional filter. We deliberately walk Backlog tiers top-to-bottom so P0
# beats P1 beats P2.
pick_task() {
  local filter_re="${TASK_FILTER:-.}"
  awk -v re="$filter_re" '
    /^```/                 { in_code = !in_code; next }
    in_code                { next }
    /^## /                 { in_backlog = ($0 ~ /^## Backlog/); section = $0; next }
    /^### /                { section = $0; next }
    !in_backlog            { next }
    /^- \[ \]/ {
      line = $0
      # Strip indented sub-bullets that hang off a parent task.
      if (line !~ /^- \[ \]/) next
      if (tolower(line) ~ tolower(re)) {
        print section
        print line
        exit
      }
    }
  ' STATE.md
}

TASK_BLOCK="$(pick_task || true)"
if [[ -z "$TASK_BLOCK" ]]; then
  echo "error: no open '- [ ]' task in STATE.md matching '$TASK_FILTER'" >&2
  exit 1
fi
TASK_SECTION="$(printf '%s\n' "$TASK_BLOCK" | head -1)"
TASK_LINE="$(printf '%s\n' "$TASK_BLOCK" | tail -1)"

# Slug: first 6 words of the task line, lowercased, kebabed, capped at 50 chars.
# Guard: if the resulting slug does not start with "t-" (the lowercased task ID
# prefix), fall back to "task-$(date +%s)" and warn on stderr.
SLUG="$(make_slug "$TASK_LINE")"
if [[ -z "$SLUG" ]] || [[ "$SLUG" != t-* ]]; then
  echo "warn: make_slug produced unexpected slug '$SLUG' — falling back to task-$(date +%s)" >&2
  SLUG="task-$(date +%s)"
fi

echo "─── picked task ────────────────────────────────────────────────────"
echo "section: $TASK_SECTION"
echo "task:    $TASK_LINE"
echo "slug:    $SLUG"
echo "model:   $PROVIDER / $MODEL"
echo "max:    $MAX_ITERS iterations"
echo "────────────────────────────────────────────────────────────────────"

if (( DRY_RUN == 1 )); then
  echo "(dry run — exiting)"
  exit 0
fi

REPORT_PATH="reports/${SLUG}.md"
SESSION_DIR=".runlog/${SLUG}/sessions"
LOG_DIR=".runlog/${SLUG}"
mkdir -p "$SESSION_DIR" "$LOG_DIR" reports
LATEST_LINK=".runlog/latest.log"
LATEST_JSONL=".runlog/latest.jsonl"

# --- signal handling ----------------------------------------------------
PI_PID=""
TAIL_PID=""
cleanup() {
  local code=$?
  # If pi is still running, send it SIGINT first (graceful), then SIGTERM.
  if [[ -n "$PI_PID" ]] && kill -0 "$PI_PID" 2>/dev/null; then
    echo
    echo "─── caught signal — terminating pi (pid $PI_PID) ────────────────────"
    kill -INT "$PI_PID" 2>/dev/null || true
    sleep 2
    kill -TERM "$PI_PID" 2>/dev/null || true
  fi
  [[ -n "$TAIL_PID" ]] && kill "$TAIL_PID" 2>/dev/null || true
  exit "$code"
}
trap cleanup INT TERM

# --- prompts ------------------------------------------------------------
# We send a self-contained mission brief on iteration 1 (no --continue) and
# a much shorter nudge on subsequent iterations (with --continue).
INITIAL_PROMPT_FILE="$(mktemp)"
cat > "$INITIAL_PROMPT_FILE" <<EOF
You are working autonomously on the Honda H22 research project at \`$REPO_ROOT\`.
Your job for this run is to take **exactly one** task from STATE.md from
\`[ ]\` to \`[x]\` per the Definition of Done.

## The task

Section: \`$TASK_SECTION\`

Task line (verbatim from STATE.md):

\`\`\`
$TASK_LINE
\`\`\`

## Required reading (in this order)

1. \`STATE.md\` — full task list and the **Definition of Done** section. Re-read DoD carefully.
2. \`CLAUDE.md\` — agent guide for this repo (architecture, conventions, what NOT to do).
3. \`QWEN.md\` — the master compiled reference document (all known H22 specs, variants, procedures).
4. Find your task's section in \`docs/plans/\` — search for \`### <your T-NNN>\` — and treat that section as the authoritative spec.
5. The source files relevant to this task (use \`ls\`, then \`read\` selectively).

## Operating rules (non-negotiable)

- Follow the Definition of Done in STATE.md exactly. **Every** DoD bullet must hold before you mark the task done.
- Tests are required for any new code, not optional. New code → new tests in the same commit.
- Run \`npm run typecheck && npm run lint && npm test && npm run format:check\` before claiming done. Paste the output (or at minimum the summary line) into the report.
- Manually exercise the change. For UI work: \`timeout 3 npx tsx src/index.tsx\` and confirm the output renders. Include a snippet of the rendered output in the report.
- Do **not** add a \`Co-Authored-By\` trailer to commits. Workspace rule.
- Stage specific files; avoid \`git add -A\`.
- One purpose per commit. Conventional prefix (\`feat:\`, \`fix:\`, \`docs:\`, \`refactor:\`, \`test:\`, etc.).
- Update \`README.md\` and/or \`CLAUDE.md\` in the **same commit** if behavior/flags/layout changed.
- After the change is merged on \`main\` and pushed: move the task to the Done section of STATE.md with the commit SHA + today's date.

## Final deliverable

When (and only when) every DoD box ticks, write a report at \`$REPORT_PATH\` containing:

1. **Task** — the verbatim task line.
2. **Summary** — 2-4 sentences on what changed and why.
3. **Files changed** — bulleted list with one-line purpose each.
4. **Commands run** — typecheck / lint / test / format output (paste the summary lines).
5. **Manual verification** — exactly what you ran and what you saw. Include rendered output for UI work.
6. **Coverage delta** — before/after if known; "n/a" if no measurable change.
7. **Follow-ups discovered** — new STATE.md backlog items you added.
8. **Commit SHA(s)** — \`git log --oneline -n N\` for the task's commits.
9. **DoD checklist** — paste the 9-item DoD list from STATE.md with each box ticked or with a one-line justification.

The report file is how the next operator audits your work. Do not skip sections.

## When to stop

Stop when the report file exists AND the task is moved to Done in STATE.md AND \`git status\` is clean AND your last commit is pushed to \`origin/main\`.

If you hit a blocker you cannot resolve: write the report file anyway with a section called "Blocker", describe what's missing, leave the task as \`[~]\` in STATE.md, and exit. Do not silently give up.

Begin now.
EOF

CONTINUE_PROMPT="Continue working on the task above. Re-check the Definition of Done in STATE.md. Re-read your task's spec section in docs/plans/ if you need to refresh context. If every DoD box now ticks: write the report file at \`$REPORT_PATH\` and ensure the task is moved to Done in STATE.md with the commit SHA. If something is still missing, name it and fix it. Do not stop until done or blocked."

# --- iteration loop ------------------------------------------------------
ts="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
LOG_FILE="$LOG_DIR/$ts.log"
JSONL_LOG="$LOG_DIR/$ts.jsonl"
ln -sfn "$LOG_FILE" "$LATEST_LINK"
ln -sfn "$JSONL_LOG" "$LATEST_JSONL"

# --- live event renderer ------------------------------------------------
# Reads pi's `--mode json` JSONL stream on stdin and prints one coloured,
# human-readable line per significant event. Non-JSON lines (e.g. pi's
# trailing OSC terminal-notify escape) are silently skipped via `fromjson?`.
# Falls back to a raw pass-through when jq is unavailable.
RENDER_JQ_PROG='
  def c(code): "[" + code + "m";
  def reset: c("0");
  def dim(s): c("2") + s + reset;
  def col(code; s): c(code) + s + reset;
  def clip(s; n): (s // "" | tostring | gsub("\\s+"; " ")) as $t
    | if ($t | length) > n then ($t[0:n] + "...") else $t end;
  def stamp: dim((now | strftime("%H:%M:%S")));
  (fromjson? // empty) as $e
  | $e.type as $t
  | if   $t == "session"      then stamp + " " + col("36"; "▸ session " + ($e.id // "?")[0:8]) + dim(" cwd=" + ($e.cwd // "?"))
    elif $t == "agent_start"  then stamp + " " + dim("▸ agent start")
    elif $t == "agent_end"    then stamp + " " + dim("▸ agent end")
    elif $t == "message_start" and ($e.message.role == "user")
      then stamp + " " + col("32"; "» user: ") + clip(([$e.message.content[]? | select(.type=="text") | .text] | join(" ")); 200)
    elif $t == "message_update"
      then ($e.assistantMessageEvent // {}) as $a
        | if   ($a.type == "text_end")     then stamp + " " + col("37"; "· ") + clip($a.content; 280)
          elif ($a.type == "thinking_end") then stamp + " " + dim("~ " + clip($a.content; 200))
          else empty end
    elif $t == "message_end" and ($e.message.role == "assistant")
      then ($e.message.usage // {}) as $u
        | if ($u.totalTokens // 0) > 0
          then stamp + " " + dim("  ↳ tokens in=" + ($u.input|tostring) + " out=" + ($u.output|tostring) + " total=" + ($u.totalTokens|tostring))
          else empty end
    elif $t == "tool_execution_start"
      then stamp + " " + col("33"; "🔧 " + ($e.toolName // "?")) + " " + dim(clip(($e.args | tojson); 160))
    elif $t == "tool_execution_end"
      then stamp + " " + (if $e.isError then col("31"; "✗ ") else col("32"; "✓ ") end)
        + ($e.toolName // "?") + " " + dim(clip(($e.result | if type=="string" then . else tojson end); 160))
    elif $t == "compaction_start" then stamp + " " + col("35"; "⚠ compaction start (" + ($e.reason // "?") + ")")
    elif $t == "compaction_end"   then stamp + " " + col("35"; "⚠ compaction end" + (if $e.aborted then " [aborted]" else "" end))
    elif $t == "auto_retry_start" then stamp + " " + col("31"; "↻ retry " + ($e.attempt|tostring) + "/" + ($e.maxAttempts|tostring)) + " " + dim(clip($e.errorMessage; 160))
    elif $t == "auto_retry_end"   then stamp + " " + col("31"; "↻ retry end (success=" + ($e.success|tostring) + ")")
    else empty end
'
render_events() {
  if (( RENDER_WITH_JQ == 1 )); then
    jq -Rr --unbuffered "$RENDER_JQ_PROG"
  else
    cat
  fi
}

run_pi() {
  local iter="$1"
  local prompt_file="$2"
  local continue_flag="${3:-}"

  local iter_jsonl="$LOG_DIR/iter-${iter}.jsonl"
  local iter_log="$LOG_DIR/iter-${iter}.log"
  local iter_stderr="$LOG_DIR/iter-${iter}.stderr"
  echo
  echo "═══ iteration $iter / $MAX_ITERS ════════════════════════════════════"
  echo "raw jsonl:     $iter_jsonl"
  echo "rendered log:  $iter_log"
  echo "report target: $REPORT_PATH"
  echo "session dir:   $SESSION_DIR"
  echo "════════════════════════════════════════════════════════════════════"

  # `pi --mode json` emits one JSON event per line to stdout — no PTY needed,
  # the pipe is line-buffered. We fan it out: raw JSONL is tee'd to the
  # cumulative + per-iteration logs, then render_events turns each line into a
  # coloured human-readable line that is tee'd to the terminal + rendered logs.
  # pi's stderr (startup / extension noise) is split to its own file and the
  # terminal so it never contaminates the JSONL stream.
  set +e
  local prompt_text
  prompt_text="$(cat "$prompt_file")"
  local pi_args=(--provider "$PROVIDER" --model "$MODEL" --session-dir "$SESSION_DIR" --thinking medium --mode json)
  if [[ -n "$continue_flag" ]]; then
    pi_args+=(--continue)
  fi

  : > "$iter_jsonl"
  : > "$iter_log"
  # The prompt is passed as a plain argv element — no shell-string escaping
  # needed now that we no longer build a `script -c` command string.
  pi "${pi_args[@]}" "$prompt_text" 2> >(tee -a "$iter_stderr" >&2) \
    | tee -a "$JSONL_LOG" "$iter_jsonl" \
    | render_events \
    | tee -a "$LOG_FILE" "$iter_log" &
  PI_PID=$(jobs -p | tail -1)
  wait
  local rc=$?
  PI_PID=""
  set -e
  return "$rc"
}

task_complete() {
  # Report exists AND the original task line no longer appears as `- [ ]` in STATE.md.
  [[ -f "$REPORT_PATH" ]] || return 1
  # Escape the line for fixed-string grep.
  if grep -F -q -- "$TASK_LINE" STATE.md; then
    return 1
  fi
  return 0
}

iter=1
while (( iter <= MAX_ITERS )); do
  if (( iter == 1 )); then
    run_pi "$iter" "$INITIAL_PROMPT_FILE" || true
  else
    nudge_file="$(mktemp)"
    printf '%s\n' "$CONTINUE_PROMPT" > "$nudge_file"
    run_pi "$iter" "$nudge_file" "continue" || true
    rm -f "$nudge_file"
  fi

  if task_complete; then
    echo
    echo "─── task complete after $iter iteration(s) ─────────────────────────"
    echo "report: $REPORT_PATH"
    echo "log:    $LOG_FILE"
    rm -f "$INITIAL_PROMPT_FILE"
    exit 0
  fi

  echo "─── iteration $iter did not complete task; looping ─────────────────"
  iter=$(( iter + 1 ))
done

echo
echo "─── hit iteration cap ($MAX_ITERS) without completion ──────────────"
echo "task line:  $TASK_LINE"
echo "report:     $REPORT_PATH  (may be partial)"
echo "log:        $LOG_FILE"
echo "next step:  re-run \`scripts/run-task.sh '<filter>'\` or pick up manually."
rm -f "$INITIAL_PROMPT_FILE"
exit 3
