#!/usr/bin/env bash
# scripts/run-all.sh — keep calling run-task.sh until STATE.md has no open `[ ]`
# tasks in any Backlog section, or until we hit a safety cap, or the same task
# fails twice in a row.
#
# Inherited profile: this script delegates to run-task.sh without passing
# --provider or --model, so it inherits the 35B toaster defaults:
#   PROVIDER = local-toaster    (env override: PI_PROVIDER)
#   MODEL    = Qwen/Qwen3.6-35B-A3B  (env override: PI_MODEL)
# The preflight banner below echoes the resolved values so every run logs
# which profile is active. To override, set PI_PROVIDER / PI_MODEL before
# invoking this script.
#
# Usage:
#   scripts/run-all.sh                    # run until done / cap / repeated failure
#   scripts/run-all.sh -n 20              # cap at 20 total task attempts
#   scripts/run-all.sh --dry-run          # list open tasks and exit
#   scripts/run-all.sh --skip-blocked     # don't bail on repeated failure; skip
#
# Behaviour:
# - Walks STATE.md Backlog top-to-bottom (P0 → P1 → P2). The inner picker in
#   run-task.sh always grabs the first open `- [ ]`, so we just loop.
# - After each run-task.sh invocation we re-read STATE.md. If the previously-
#   picked task line is still open, we count it as a failed attempt for that
#   task. Two consecutive failures on the same task → bail (unless
#   --skip-blocked, in which case we add a `BLOCKED:` marker to the task and
#   move on).
# - Each individual task run is bounded by run-task.sh's own iteration cap
#   (default 8). This wrapper does not pass --max-iters; tweak that in
#   run-task.sh if needed.
# - Ctrl-C propagates: the trap forwards SIGINT to the child run-task.sh,
#   which in turn forwards to pi.
#
# Output: each run-task.sh invocation produces its own .runlog/<slug>/ tree —
# raw `.jsonl` (pi's `--mode json` event stream) plus rendered `.log` files.
# This wrapper writes a top-level orchestration log at
# .runlog/run-all-<iso-ts>.log with one line per attempt.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

MAX_ATTEMPTS=300
DRY_RUN=0
SKIP_BLOCKED=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    -n|--max-attempts) MAX_ATTEMPTS="$2"; shift 2 ;;
    --dry-run)         DRY_RUN=1; shift ;;
    --skip-blocked)    SKIP_BLOCKED=1; shift ;;
    -h|--help)         sed -n '2,30p' "$0"; exit 0 ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

[[ -x scripts/run-task.sh ]] || { echo "scripts/run-task.sh not executable" >&2; exit 2; }

# Re-implement the picker here so we can list / count without running.
count_open() {
  awk '
    /^```/      { in_code = !in_code; next }
    in_code     { next }
    /^## /      { in_backlog = ($0 ~ /^## Backlog/); next }
    !in_backlog { next }
    /^- \[ \]/  { n++ }
    END         { print n+0 }
  ' STATE.md
}

list_open() {
  awk '
    /^```/      { in_code = !in_code; next }
    in_code     { next }
    /^## /      { in_backlog = ($0 ~ /^## Backlog/); section = $0; next }
    /^### /     { section = $0; next }
    !in_backlog { next }
    /^- \[ \]/  { printf "  [%s] %s\n", section, substr($0, 1, 160) }
  ' STATE.md
}

# The first open task line — used to detect "no progress".
first_open_line() {
  awk '
    /^```/      { in_code = !in_code; next }
    in_code     { next }
    /^## /      { in_backlog = ($0 ~ /^## Backlog/); next }
    !in_backlog { next }
    /^- \[ \]/  { print; exit }
  ' STATE.md
}

initial="$(count_open)"
echo "─── run-all preflight ──────────────────────────────────────────────"
echo "open tasks at start: $initial"
echo "max attempts:        $MAX_ATTEMPTS"
# Resolve the inherited 35B toaster profile (env overrides supported).
PROVIDER="${PI_PROVIDER:-local-toaster}"
MODEL="${PI_MODEL:-Qwen/Qwen3.6-35B-A3B}"
echo "profile:             $PROVIDER / $MODEL"
list_open
echo "────────────────────────────────────────────────────────────────────"
if (( DRY_RUN == 1 )); then exit 0; fi
if (( initial == 0 )); then
  echo "Nothing to do — all Backlog tasks are done."
  exit 0
fi

ts="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
ORCH_LOG=".runlog/run-all-$ts.log"
mkdir -p .runlog
exec > >(tee -a "$ORCH_LOG") 2>&1

CHILD_PID=""
cleanup() {
  if [[ -n "$CHILD_PID" ]] && kill -0 "$CHILD_PID" 2>/dev/null; then
    echo
    echo "─── orchestrator caught signal — forwarding to run-task.sh (pid $CHILD_PID)"
    kill -INT "$CHILD_PID" 2>/dev/null || true
    sleep 2
    kill -TERM "$CHILD_PID" 2>/dev/null || true
  fi
  exit 130
}
trap cleanup INT TERM

attempt=0
prev_first_line=""
prev_attempt_failed=0

while (( attempt < MAX_ATTEMPTS )); do
  attempt=$(( attempt + 1 ))
  remaining="$(count_open)"
  if (( remaining == 0 )); then
    echo
    echo "═══ run-all: all Backlog tasks closed after $((attempt - 1)) attempt(s) ════"
    exit 0
  fi

  first_line="$(first_open_line)"
  if [[ "$first_line" == "$prev_first_line" ]]; then
    if (( prev_attempt_failed == 1 )); then
      echo
      echo "═══ run-all: same task failed twice in a row — bailing ════════════════"
      echo "task: $first_line"
      if (( SKIP_BLOCKED == 1 )); then
        echo "(--skip-blocked is set; marking task BLOCKED in STATE.md and moving on)"
        # Prepend BLOCKED: to the task's checkbox so the picker no longer matches.
        # We use perl for safe in-place line replacement with arbitrary content.
        # TASK_LINE must be exported *before* perl — its BEGIN block reads $ENV{TASK_LINE}.
        export TASK_LINE="$first_line"
        perl -i -pe '
          BEGIN { $line = $ENV{TASK_LINE}; chomp $line; }
          if ($_ eq "$line\n") { s/^- \[ \] /- \[B\] BLOCKED: /; }
        ' STATE.md
        prev_attempt_failed=0
        prev_first_line=""
        continue
      fi
      exit 4
    fi
    prev_attempt_failed=1
  else
    prev_attempt_failed=0
  fi
  prev_first_line="$first_line"

  echo
  echo "═══ attempt $attempt/$MAX_ATTEMPTS — $remaining tasks remaining ═══════════"
  echo "next task: $first_line"
  echo

  set +e
  ./scripts/run-task.sh &
  CHILD_PID=$!
  wait "$CHILD_PID"
  rc=$?
  CHILD_PID=""
  set -e
  echo
  echo "─── run-task.sh exited with $rc"

  # Verify the picked task actually advanced. If first_open_line is unchanged,
  # the next loop iteration will set prev_attempt_failed=1.
  new_first="$(first_open_line)"
  if [[ "$new_first" != "$first_line" ]]; then
    # Even if rc != 0, if the task moved we count it as success and reset
    # the failure counter. (Pi sometimes exits non-zero for benign reasons.)
    prev_attempt_failed=0
  fi
done

echo
echo "═══ run-all: hit max-attempts cap ($MAX_ATTEMPTS) ════════════════════════"
echo "remaining tasks: $(count_open)"
exit 5
