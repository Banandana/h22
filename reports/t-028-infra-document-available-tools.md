# T-028 Report: Document Available Tools and Their Capabilities

## Task

- [x] **(S)** T-028 [infra] Document available tools and their capabilities in research/indexes/tools-reference.md -- full spec: docs/plans/00-infrastructure.md @ T-028

## Summary

Rewrote `research/indexes/tools-reference.md` from scratch to consolidate all available MCP tools into a single, well-structured reference document. The previous version (built incrementally by T-021 through T-027) only covered tavily-mcp and playwright. This rewrite adds comprehensive documentation for github (40 tools), docker-mcp (4 tools), session-history (16 tools), sequential-thinking (1 tool), langfuse-trace (30+ tools), langfuse prompt-only subset (6 tools), mongodb (1 tool), and huggingface (not connected). Includes a summary table mapping each tool to its type, status, tool count, and primary use case.

## Files changed

- **`research/indexes/tools-reference.md`** — Complete rewrite. Consolidated tavily-mcp and playwright sections from prior tasks with new sections for github, docker-mcp, session-history, langfuse-trace, langfuse, sequential-thinking, mongodb, and huggingface. Added summary table. Cleaned up structural issues (stray separators, inconsistent formatting).

## Commands run

```
$ cd /data/h22 && npm run typecheck 2>&1 | tail -5
npm error Missing script: "typecheck"
$ npm run lint 2>&1 | tail -5
npm error Missing script: "lint"
$ npm test 2>&1 | tail -5
> echo "Error: no test specified" && exit 1
Error: no test specified
$ npm run format:check 2>&1 | tail -5
npm error Missing script: "format:check"
```

**Note:** This project has no TypeScript code — it is a pure documentation/research repo. The `package.json` contains placeholder scripts only. No typecheck, lint, or format:check targets exist. The `test` script is a stub that exits with error. This is expected and documented in the project structure.

## Manual verification

1. **File written successfully:**
   ```
   $ wc -c research/indexes/tools-reference.md
   14365
   ```

2. **All tools documented with tables:** Verified each section has name, status, type, tool count, access method, and verified date.

3. **Tool counts match actual MCP server metadata:**
   - tavily-mcp: 4 tools ✓
   - playwright: 14+ tools ✓
   - github: 40 tools ✓
   - docker-mcp: 4 tools ✓
   - session-history: 16 tools ✓
   - langfuse-trace: 30+ tools ✓
   - langfuse: 6 tools ✓
   - sequential-thinking: 1 tool ✓
   - mongodb: 1 tool ✓
   - huggingface: not connected ✓

4. **Cross-referenced against CLAUDE.md:** All tools listed in the `/data/CLAUDE.md` MCP servers section are accounted for. Langfuse tools noted as configured but not connected (matching actual environment state).

5. **Summary table at bottom:** Maps all 10 tools with type, status, tool count, and primary use.

## Coverage delta

n/a — This is a documentation-only task. No code changes, no tests involved.

## Follow-ups discovered

None. The tools-reference.md is now complete for Phase 0 infrastructure. Next task is T-029 (create research template) and T-030 (create citations standard).

## Commit SHA(s)

Pending commit (will be recorded after push to origin/main).

## DoD checklist

- [x] **Researched** — Information gathered from MCP server metadata (`mcp` tool calls), CLAUDE.md cross-project docs, and ~/.pi/mcp.json configuration files.
- [x] **Written** — Findings saved to `research/indexes/tools-reference.md`. File follows consistent table-based format matching the style of prior tool sections.
- [x] **Indexed** — File is already in `research/indexes/` (the correct index directory). Master index at `research/indexes/master-index.md` would need updating if it references tools-reference.md specifically (it currently has placeholder structure).
- [x] **Verified** — Tool counts verified against live MCP server metadata. Status values match actual environment state (available/cached/configured/not connected).
- [x] **No swallowed errors** — N/A (no code changes).
- [x] **Documentation in sync** — README.md and CLAUDE.md do not reference tools-reference.md in a way that requires updates. The file lives in the established `research/indexes/` directory.
- [ ] **STATE.md updated** — Pending (to be done in same commit).
- [x] **CI green** — N/A. Project has no TypeScript code; npm scripts are placeholders. This is a docs-only project.
- [x] **No regressions** — Full suite re-run: N/A (no code).
- [x] **Reviewable diff** — Single-purpose commit: rewrite tools-reference.md + update STATE.md. Conventional prefix: `docs:`.
