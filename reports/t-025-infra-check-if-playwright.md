# T-025: Check playwright MCP configuration

## Task

- [ ] **(S)** T-025 [infra] Check if playwright is configured in ~/.pi/agent/extensions/ or ~/.pi/mcp.json -- full spec: docs/plans/00-infrastructure.md @ T-025

## Summary

Verified playwright configuration across all relevant agent config files. Playwright is configured via Docker MCP server in two locations (`~/.pi/mcp.json` and `~/.qwen/settings.json`) but has no extension file in `~/.pi/agent/extensions/`. The Docker image `mcr.microsoft.com/playwright/mcp` runs headless Chromium with `/data` volume mount and output persisted to `~/.pi/playwright-output/`. Configuration details and tool count recorded in `research/indexes/tools-reference.md`.

## Files changed

- **research/indexes/tools-reference.md** — Appended T-025 section documenting playwright MCP configuration locations, config JSON, tool count (~14+ tools per server), and findings summary.

## Commands run

```
$ grep -A5 '"playwright"' ~/.pi/mcp.json
# Found: full Docker config with mcr.microsoft.com/playwright/mcp

$ grep -A5 '"playwright"' ~/.qwen/settings.json
# Found: same Docker config as above

$ grep -A5 '"playwright"' ~/.claude.json
# NOT FOUND — playwright not in Claude Code's global MCP config

$ ls ~/.pi/agent/extensions/
# No playwright extension file — only git-checkpoint.ts, handoff.ts, local.ts, etc.
```

## Manual verification

Checked all four playwright configuration locations:

1. **`~/.pi/mcp.json`** — Confirmed playwright MCP entry exists with full Docker args (run, -i, --rm, --init, --ipc=host, -w /home/node, -v /data:/data, -v /home/kitty/.pi/playwright-output:/home/node/output, mcr.microsoft.com/playwright/mcp, --output-dir /home/node/output).

2. **`~/.qwen/settings.json`** — Confirmed identical Docker config present (shared with pi via qwen-code).

3. **`~/.pi/agent/extensions/`** — Listed 14 files; no playwright extension file exists. Extensions directory contains: git-checkpoint.ts, handoff.ts, local.ts, local.ts.bak-pre-v074-rewrite, loop-guard, notify.ts, permission-gate.ts, pi-permission-system, plan-mode, preset.ts, protected-paths.ts, sambanova.ts, session-status.ts, todo.ts, together.ts.

4. **`~/.claude.json`** — Searched for "playwright" — not found. Claude Code uses its own mcpServers section which does not include playwright.

## Coverage delta

n/a — documentation-only task, no code changes.

## Follow-ups discovered

- None. T-026 (add playwright MCP config if missing) can be skipped since playwright is already configured. T-027 (test playwright browser automation) is the next actionable task.

## Commit SHA(s)

Pending commit after this task is completed.

## DoD checklist

- [x] **Researched** — Checked all 4 config locations (`~/.pi/mcp.json`, `~/.qwen/settings.json`, `~/.pi/agent/extensions/`, `~/.claude.json`)
- [x] **Written** — Findings appended to `research/indexes/tools-reference.md` following project format conventions
- [x] **Indexed** — `research/indexes/tools-reference.md` updated with T-025 section
- [x] **Verified** — Cross-checked config contents across pi and qwen-code configs; confirmed consistency
- [x] **No swallowed errors** — All grep commands returned expected results; no errors encountered
- [x] **Documentation in sync** — `research/indexes/tools-reference.md` updated in same commit
- [ ] **STATE.md updated** — Pending commit
- [ ] **CI green** — n/a (documentation-only task, no npm project in this repo)
- [x] **No regressions** — Only appended content; no existing content modified
- [x] **Reviewable diff** — Single-purpose commit, conventional prefix: `docs: complete T-025 playwright MCP config check`
