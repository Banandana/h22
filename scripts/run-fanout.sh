#!/usr/bin/env bash
# scripts/run-fanout.sh — dependency-aware parallel task runner.
#
# Picks a "ready set" of tasks from STATE.md and launches up to -w of them
# in parallel via scripts/run-task.sh. A task is READY iff every preceding
# task in its `### section` is `[x]` done or `[-]` skipped. Any open `[ ]`,
# in-progress `[~]`, or blocked `[B]` task gates everything after it in the
# same section. Open `[gate]` tasks in earlier sections gate every later
# section. Open `[checkpoint]` tasks DO NOT gate (advisory only).
#
# This is the fix for the incident on 2026-05-15 where 6 workers were fanned
# out across T-419..T-423b while their upstream infra (T-414..T-418b) was
# still `[ ]`. Three of them ignored the blocked state and freelanced
# unauthorized infrastructure. The dep-check now happens at the orchestrator
# layer so a stray model can't even be asked to do the work.
#
# Usage:
#   scripts/run-fanout.sh                          # one wave of the ready set, 6 workers
#   scripts/run-fanout.sh -w 4                     # one wave, 4 workers
#   scripts/run-fanout.sh --continuous             # loop: re-pick after each completion
#   scripts/run-fanout.sh --section "Cylinder Block"  # restrict to a section
#   scripts/run-fanout.sh T-215 T-216              # only these IDs (must be ready, or --force)
#   scripts/run-fanout.sh --force T-422            # bypass dep check (escape hatch)
#   scripts/run-fanout.sh --dry-run                # print the ready set and exit
#   scripts/run-fanout.sh --verbose                # tail one worker's render to terminal
#   scripts/run-fanout.sh --self-test              # show what pick_ready_set returns
#
# Ctrl-C: insta-kill. SIGKILL to every worker pgid. Second Ctrl-C bails
# without waiting for child cleanup.
#
# Output:
#   per-worker stdout/stderr → .runlog/fanout-<ts>/<task>.log
#   orchestrator summary     → .runlog/fanout-<ts>/orchestrator.log
#   per-task .runlog/<slug>/ trees are still produced by run-task.sh

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

WORKERS=6
CONTINUOUS=0
DRY_RUN=0
VERBOSE=0
FORCE=0
SECTION_FILTER=""
EXPLICIT_IDS=()
SELF_TEST=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    -w|--workers)  WORKERS="$2"; shift 2 ;;
    --continuous)  CONTINUOUS=1; shift ;;
    --section)     SECTION_FILTER="$2"; shift 2 ;;
    --dry-run)     DRY_RUN=1; shift ;;
    --verbose)     VERBOSE=1; shift ;;
    --force)       FORCE=1; shift ;;
    --self-test)   SELF_TEST=1; shift ;;
    -h|--help)     sed -n '2,40p' "$0"; exit 0 ;;
    T-*|t-*)       EXPLICIT_IDS+=("$(echo "$1" | tr '[:lower:]' '[:upper:]')"); shift ;;
    *)             echo "unknown arg: $1" >&2; exit 2 ;;
  esac
done

[[ -x scripts/run-task.sh ]] || { echo "scripts/run-task.sh not executable" >&2; exit 2; }
[[ -f STATE.md ]]            || { echo "STATE.md not found in $REPO_ROOT" >&2; exit 2; }

# --- ready-set picker ----------------------------------------------------
# Emits one line per ready task: "T-NNN<TAB>type<TAB>fulltext"
#
# Status markers in STATE.md:
#   [x] done           — does not block successors
#   [-] skipped/won't-do — does not block successors
#   [ ] open           — blocks successors in section
#   [~] in-progress    — blocks successors (already being worked)
#   [B] blocked        — blocks successors (its own deps unmet)
#
# Cross-section: an open [gate] in any earlier section blocks every later
# section. Open [checkpoint] is advisory and does NOT block.
pick_ready_set() {
  local max="$1"
  local sec_filter="${2:-}"
  local explicit_ids="${3:-}"

  awk -v max="$max" -v sec_filter="$sec_filter" -v ids="$explicit_ids" '
    BEGIN {
      n_ids = split(ids, id_arr, " ")
      for (i = 1; i <= n_ids; i++) want[toupper(id_arr[i])] = 1
      section = ""
      section_blocked = 0     # set when a non-done task is seen in this section
      global_gate_blocked = 0 # set when an open [gate] is seen anywhere prior
      in_backlog = 0
    }
    /^```/      { in_code = !in_code; next }
    in_code     { next }
    /^## /      {
      in_backlog = ($0 ~ /^## Backlog/)
      section = ""
      section_blocked = 0
      next
    }
    /^### /     {
      section = $0
      sub(/^### */, "", section)
      section_blocked = 0
      next
    }
    !in_backlog { next }
    /^- \[/     {
      status = ""
      if (match($0, /^- \[[ x~B-]\]/)) {
        status = substr($0, 4, 1)   # the char inside [ ]
      } else { next }

      # Extract task ID and type.
      task_id = ""
      task_type = "research"
      if (match($0, /T-[0-9]+[a-z]?/)) {
        task_id = toupper(substr($0, RSTART, RLENGTH))
      } else { next }   # DoD-checklist lines without a T-ID — skip silently
      if (match($0, /\[(research|infra|checkpoint|gate|fix)\]/)) {
        task_type = substr($0, RSTART + 1, RLENGTH - 2)
      }

      # Done / skipped: do not gate.
      if (status == "x" || status == "-") { next }

      # An open [gate] gates every later section globally.
      if (task_type == "gate") { global_gate_blocked = 1 }

      # Section-filter (if set, only emit from matching section).
      sec_match = (sec_filter == "") || (tolower(section) ~ tolower(sec_filter))

      # Explicit-ID filter (if set, only emit listed IDs).
      id_match = (n_ids == 0) || (task_id in want)

      # Is this task READY? Ready iff section not yet blocked AND no global gate.
      is_ready = (section_blocked == 0) && (global_gate_blocked == 0)

      if (is_ready && sec_match && id_match && status == " ") {
        # Only [ ] tasks are launchable; [~] / [B] are not.
        print task_id "\t" task_type "\t" $0
        emitted++
        if (emitted >= max) exit
      }

      # After processing, this task gates successors in its section
      # (regardless of whether we emitted it).
      section_blocked = 1
    }
  ' STATE.md
}

# --- explicit-ID readiness check (for --force diagnostics) --------------
# Returns: prints "READY" or "BLOCKED: <reason>" per requested ID.
check_explicit_ids() {
  local ids="$1"
  awk -v ids="$ids" '
    BEGIN {
      n_ids = split(ids, id_arr, " ")
      for (i = 1; i <= n_ids; i++) want[toupper(id_arr[i])] = 1
      section = ""
      section_blocker = ""
      global_gate_blocker = ""
      in_backlog = 0
    }
    /^```/      { in_code = !in_code; next }
    in_code     { next }
    /^## /      {
      in_backlog = ($0 ~ /^## Backlog/)
      section = ""; section_blocker = ""
      next
    }
    /^### /     {
      section = $0; sub(/^### */, "", section)
      section_blocker = ""
      next
    }
    !in_backlog { next }
    /^- \[/ {
      if (!match($0, /^- \[[ x~B-]\]/)) next
      status = substr($0, 4, 1)
      task_id = ""
      if (match($0, /T-[0-9]+[a-z]?/)) task_id = toupper(substr($0, RSTART, RLENGTH)); else next
      task_type = "research"
      if (match($0, /\[(research|infra|checkpoint|gate|fix)\]/))
        task_type = substr($0, RSTART + 1, RLENGTH - 2)

      if (task_id in want) {
        if (status == "x" || status == "-") {
          printf "%s\tDONE\t(already %s)\n", task_id, (status == "x" ? "done" : "skipped")
        } else if (global_gate_blocker != "") {
          printf "%s\tBLOCKED\tglobal gate open: %s\n", task_id, global_gate_blocker
        } else if (section_blocker != "") {
          printf "%s\tBLOCKED\tsection predecessor open: %s\n", task_id, section_blocker
        } else if (status != " ") {
          printf "%s\tBLOCKED\tstatus is [%s], not [ ]\n", task_id, status
        } else {
          printf "%s\tREADY\t-\n", task_id
        }
      }

      if (status != "x" && status != "-") {
        if (section_blocker == "") section_blocker = task_id
        if (task_type == "gate" && global_gate_blocker == "") global_gate_blocker = task_id
      }
    }
  ' STATE.md
}

# --- self-test -----------------------------------------------------------
if (( SELF_TEST == 1 )); then
  echo "─── ready set (max $WORKERS) ─────────────────────────────────────"
  pick_ready_set "$WORKERS" "$SECTION_FILTER" "${EXPLICIT_IDS[*]:-}" \
    | awk -F'\t' '{printf "  %s [%s] %s\n", $1, $2, substr($3, 1, 100) "..."}'
  if (( ${#EXPLICIT_IDS[@]} > 0 )); then
    echo
    echo "─── explicit-ID readiness ────────────────────────────────────────"
    check_explicit_ids "${EXPLICIT_IDS[*]}" \
      | awk -F'\t' '{printf "  %-7s %-8s %s\n", $1, $2, $3}'
  fi
  exit 0
fi

# --- one-wave cohort resolution -----------------------------------------
resolve_cohort() {
  mapfile -t COHORT < <(pick_ready_set "$WORKERS" "$SECTION_FILTER" "${EXPLICIT_IDS[*]:-}")
}

resolve_cohort

# Explicit-mode diagnostics: explain why any requested ID was filtered out.
if (( ${#EXPLICIT_IDS[@]} > 0 )); then
  declare -A IN_COHORT=()
  if (( ${#COHORT[@]} > 0 )); then
    for line in "${COHORT[@]}"; do IN_COHORT["${line%%	*}"]=1; done
  fi

  missing=()
  for id in "${EXPLICIT_IDS[@]}"; do
    [[ -z "${IN_COHORT[$id]:-}" ]] && missing+=("$id")
  done

  if (( ${#missing[@]} > 0 )); then
    echo "─── explicit IDs not ready ───────────────────────────────────────" >&2
    check_explicit_ids "${missing[*]}" \
      | awk -F'\t' '{printf "  %-7s %-8s %s\n", $1, $2, $3}' >&2
    if (( FORCE == 1 )); then
      echo
      echo "--force given: launching anyway. The model will see the blocked state." >&2
      for id in "${missing[@]}"; do
        COHORT+=("$id"$'\t'"forced"$'\t'"[forced] $id")
      done
    else
      echo
      echo "refusing to launch unready tasks. Pass --force to override (NOT RECOMMENDED)." >&2
      exit 3
    fi
  fi
fi

if (( ${#COHORT[@]} == 0 )); then
  echo "no ready tasks (workers=$WORKERS, section=${SECTION_FILTER:-<any>})" >&2
  exit 1
fi

# --- preflight banner ---------------------------------------------------
echo "─── run-fanout preflight ───────────────────────────────────────────"
echo "workers:    $WORKERS"
echo "continuous: $CONTINUOUS"
[[ -n "$SECTION_FILTER" ]] && echo "section:    $SECTION_FILTER"
(( FORCE == 1 ))           && echo "force:      yes (dep-check bypassed for explicit IDs)"
echo "initial ready set ($(printf %d ${#COHORT[@]}) tasks):"
for line in "${COHORT[@]}"; do
  printf '  %s [%s] %s\n' "${line%%	*}" "$(echo "$line" | cut -f2)" "$(echo "$line" | cut -f3- | cut -c1-100)..."
done
echo "────────────────────────────────────────────────────────────────────"
(( DRY_RUN == 1 )) && exit 0

# --- logging dir --------------------------------------------------------
TS="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
FANOUT_DIR=".runlog/fanout-$TS"
mkdir -p "$FANOUT_DIR"
ORCH_LOG="$FANOUT_DIR/orchestrator.log"
exec > >(tee -a "$ORCH_LOG") 2>&1
echo "orchestrator log: $ORCH_LOG"
(( CONTINUOUS == 1 )) && echo "mode: continuous — will repick after each completion"

# --- worker tracking ----------------------------------------------------
declare -A PGIDS=()        # task_id → pgid
declare -A TASK_BY_PID=()  # last-pid → task_id
declare -A LAUNCH_TIME=()  # task_id → epoch start
declare -A ALL_LAUNCHED=() # task_id → 1 (so continuous mode doesn't relaunch)

launch_worker() {
  local task_id="$1"
  local log_file="$FANOUT_DIR/${task_id}.log"
  echo "[$task_id] launched → $log_file"
  set -m
  ./scripts/run-task.sh "$task_id" >> "$log_file" 2>&1 &
  local last_pid=$!
  local pgid
  pgid=$(jobs -p %+ | tail -1)
  set +m
  PGIDS["$task_id"]="$pgid"
  TASK_BY_PID["$last_pid"]="$task_id"
  LAUNCH_TIME["$task_id"]=$(date +%s)
  ALL_LAUNCHED["$task_id"]=1
}

# --- insta-kill trap ----------------------------------------------------
SHUTTING_DOWN=0
on_signal() {
  if (( SHUTTING_DOWN == 1 )); then
    echo
    echo "─── second Ctrl-C — exiting without wait"
    exit 130
  fi
  SHUTTING_DOWN=1
  echo
  echo "─── insta-kill: SIGKILL ${#PGIDS[@]} worker pgid(s) ────────────────"
  local task pgid
  for task in "${!PGIDS[@]}"; do
    pgid="${PGIDS[$task]}"
    echo "  [$task] kill -KILL -- -$pgid"
    kill -KILL -- "-$pgid" 2>/dev/null &
  done
  wait
  exit 130
}
trap on_signal INT TERM

# --- main pool loop -----------------------------------------------------
QUEUE=("${COHORT[@]}")
LAUNCHED=0
SUCCEEDED=0
FAILED=0
REPICK_EMPTY_STREAK=0

TAIL_PID=""
maybe_start_tail() {
  if (( VERBOSE == 1 )) && [[ -z "$TAIL_PID" ]] && (( ${#PGIDS[@]} > 0 )); then
    local first_task
    first_task=$(echo "${!PGIDS[@]}" | awk '{print $1}')
    tail -f "$FANOUT_DIR/${first_task}.log" &
    TAIL_PID=$!
  fi
}

repick_into_queue() {
  # In continuous mode, after a worker finishes, recompute the ready set
  # and append any NEW (not previously launched, not currently running) tasks.
  (( CONTINUOUS == 1 )) || return 0
  (( ${#EXPLICIT_IDS[@]} > 0 )) && return 0   # explicit mode: no repick

  local fresh_count=0
  local fresh_line task
  while IFS= read -r fresh_line; do
    task="${fresh_line%%	*}"
    [[ -n "${ALL_LAUNCHED[$task]:-}" ]] && continue   # already done it
    [[ -n "${PGIDS[$task]:-}" ]]       && continue   # currently running
    # Also avoid re-queueing duplicates already in the queue.
    local dup=0 qline
    for qline in "${QUEUE[@]:-}"; do
      [[ "${qline%%	*}" == "$task" ]] && { dup=1; break; }
    done
    (( dup == 1 )) && continue
    QUEUE+=("$fresh_line")
    fresh_count=$((fresh_count + 1))
  done < <(pick_ready_set "$WORKERS" "$SECTION_FILTER" "")

  if (( fresh_count > 0 )); then
    echo "  ↳ repick added $fresh_count new ready task(s); queue=${#QUEUE[@]}"
    REPICK_EMPTY_STREAK=0
  else
    REPICK_EMPTY_STREAK=$((REPICK_EMPTY_STREAK + 1))
  fi
}

while (( ${#QUEUE[@]} > 0 )) || (( ${#PGIDS[@]} > 0 )); do
  # Fill worker slots from queue.
  while (( ${#PGIDS[@]} < WORKERS )) && (( ${#QUEUE[@]} > 0 )); do
    line="${QUEUE[0]}"
    QUEUE=("${QUEUE[@]:1}")
    task_id="${line%%	*}"
    launch_worker "$task_id"
    LAUNCHED=$((LAUNCHED + 1))
  done

  maybe_start_tail

  # If queue empty and no workers, we're done.
  if (( ${#QUEUE[@]} == 0 )) && (( ${#PGIDS[@]} == 0 )); then break; fi

  # Reap one finished worker.
  if (( ${#PGIDS[@]} > 0 )); then
    set +e
    wait -n -p finished_pid
    rc=$?
    set -e
    if [[ -z "${finished_pid:-}" ]]; then break; fi
    task="${TASK_BY_PID[$finished_pid]:-}"
    if [[ -n "$task" ]]; then
      elapsed=$(( $(date +%s) - LAUNCH_TIME[$task] ))
      if (( rc == 0 )); then
        echo "[$task] finished rc=0 in ${elapsed}s"
        SUCCEEDED=$((SUCCEEDED + 1))
      else
        echo "[$task] FAILED rc=$rc in ${elapsed}s — see $FANOUT_DIR/${task}.log"
        FAILED=$((FAILED + 1))
      fi
      unset "PGIDS[$task]"
      unset "TASK_BY_PID[$finished_pid]"

      # Continuous mode: try to find newly-unblocked tasks.
      repick_into_queue
    fi
  fi
done

[[ -n "$TAIL_PID" ]] && kill "$TAIL_PID" 2>/dev/null || true

echo
echo "═══ run-fanout done: launched=$LAUNCHED succeeded=$SUCCEEDED failed=$FAILED ═══"
echo "logs: $FANOUT_DIR/"
(( FAILED == 0 ))
