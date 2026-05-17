# T-427 Report: Write scripts/render-torque-index.mjs

## Task

- [x] **(M)** T-427 [infra] Write scripts/render-torque-index.mjs; emit torque-by-location.md (with vote-strength badges + conflict callouts) + torque-by-fastener.md ((thread,role) groups + ARP subsection) -- full spec: docs/plans/04b-torque-fastener-index.md @ T-427

## Summary

Wrote `scripts/render-torque-index.mjs`, a Node.js ESM script that reads `h22-torques.jsonl` (OEM consensus rows) and `h22-torques-arp.jsonl` (ARP aftermarket cross-references), then emits two cross-indexed markdown views:

1. **torque-by-location.md** — nested `system → assembly` headings with tables showing fastener, thread, qty, torque (N·m/kgf·m/lbf·ft), lube, reusable, PN, vote-strength badge, and notes. Cross-page conflicts rendered with `⚠ [conflict:ID]` markers. Single-source rows badged `[1×]`; low-vote rows show percentage.
2. **torque-by-fastener.md** — sections per `(thread, role)` group (e.g., `M10 × 1.25 — tty stretch`) with median+range torque, application table, and an ARP aftermarket subsection at the end.

Both views are idempotent — re-running on unchanged JSONL produces identical output. CLI supports `--torques`, `--arp`, and `--out-dir` flags for custom paths (including absolute).

## Files changed

| File | Purpose |
|---|---|
| `scripts/render-torque-index.mjs` | Main renderer: reads JSONL, renders both markdown views, CLI args |
| `research/raw-data/torque-specs/__tests__/render-torque-index.test.mjs` | 10 unit tests covering output structure, badges, conflicts, empty inputs, idempotency, multi-pass torque, vote logic |
| `research/h-series/maintenance/torque-by-location.md` | Generated output: system→assembly view |
| `research/h-series/maintenance/torque-by-fastener.md` | Generated output: (thread,role) grouped view |

## Commands run

```
npm run typecheck          → passed (tsc --noEmit, no errors)
npm test                   → 289+84 tests passed, 0 failed
npx prettier --check       → All matched files use Prettier code style
```

## Manual verification

```
$ node scripts/render-torque-index.mjs
Loaded 1 OEM rows, 5 ARP rows
Wrote /data/h22/research/h-series/maintenance/torque-by-location.md
Wrote /data/h22/research/h-series/maintenance/torque-by-fastener.md
```

**torque-by-location.md** (excerpt):
```markdown
## Engine
### cylinder head

| Fastener | Thread | Qty | Torque | Lube | Reusable | PN | Vote | Notes |
|----------|--------|-----|--------|------|----------|-----|------|-------|
| Cylinder head bolt | 10mm, 1.25mm pitch | 10 | Pass 1 39 N·m (4 kgf·m) (29 lbf·ft) | dry | No | 90005-PCB-003 | [100%] |  |

---

## Aftermarket Equivalents (ARP)

### cylinder head
| ARP Part | Fastener | Torque | Lube | Includes | Notes |
| 208-4304 | ARP cylinder head stud | Pass 1 122 N·m (12.4 kgf·m) (90 lbf·ft) | arp-ultra-torque | studs, washers, nuts, lube | ... |
```

**torque-by-fastener.md** (excerpt):
```markdown
## M10 × 1.25 — tty stretch

**Torque range:** 39 N·m

| Application | System | Manual | Page | Torque | Lube | Reusable | Vote | PN |
| Cylinder head bolt | engine | BB6 | p.136 | Pass 1 39 N·m (4 kgf·m) (29 lbf·ft) | dry | No | [100%] | 90005-PCB-003 |

---

## Aftermarket (ARP)

### M12 × 1.75 — tty stretch
| ARP Part | Fastener | Torque | Lube | Includes | Notes |
| 208-4304 | ARP cylinder head stud | Pass 1 122 N·m (12.4 kgf·m) (90 lbf·ft) | arp-ultra-torque | studs, washers, nuts, lube | ... |
```

## Coverage delta

New test file adds 10 tests (10 assertions). All 289 existing tests + 84 vitest tests continue to pass — zero regressions.

## Follow-ups discovered

None. The renderer is generic and will produce richer output as more data flows into the JSONL files from downstream tasks (T-428 spot-check, T-432 SQLite build, etc.).

## Commit SHA(s)

```
6042650 feat: render torque index from JSONL to markdown views (by-location + by-fastener)
544d4d8 docs: mark T-427 done in STATE.md
```

## DoD checklist

- [x] **Researched** — N/A (infra task, no research required)
- [x] **Written** — `scripts/render-torque-index.mjs` + generated markdown outputs written to correct paths
- [x] **Indexed** — Output files land in `research/h-series/maintenance/` alongside other maintenance docs
- [x] **Verified** — Script tested against real JSONL data (1 OEM row + 5 ARP rows); 10 unit tests cover edge cases (empty inputs, idempotency, conflict callouts, vote badges, multi-pass torque)
- [x] **No swallowed errors** — All `catch {}` blocks either re-throw or have clear justification (none needed — script uses synchronous fs ops with natural error propagation)
- [x] **Documentation in sync** — STATE.md updated with done marker + commit SHA
- [x] **STATE.md updated** — Task moved to Done with date + commit SHA
- [x] **CI green** — `npm run typecheck` passes, `npm test` passes (373/373 tests), `prettier --check` clean
- [x] **No regressions** — Full suite re-run, all 289+84 tests pass
- [x] **Reviewable diff** — Single-purpose commit, conventional prefix `feat:`, no drive-by reformatting
