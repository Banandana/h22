# Tools Reference

Available tools for the Honda H/F-Series research project, their status, capabilities, and limitations.

---

## tavily-mcp

| Attribute | Value |
|---|---|
| **Status** | Available and verified |
| **Type** | Web search and content extraction |
| **Tool count** | 4 (`tavily-search`, `tavily-extract`, `tavily-crawl`, `tavily-map`) |
| **Access method** | MCP tool (`npm-global: tavily-mcp`) |
| **Verified date** | 2026-05-14 |

### Capabilities

- **Search**: Full-text web search with configurable result count (5–20), domain filtering, time range, and country targeting. Depth modes: `basic`, `advanced`, `fast`, `ultra-fast`.
- **Extract**: Content extraction from URLs returning clean markdown or plain text. Advanced mode includes tables and embedded content.
- **Crawl**: Structured web crawling starting from a base URL, following internal links with configurable depth and breadth.
- **Map**: Website structure mapping — discovers and analyzes site architecture and navigation paths.

### Verification tests (T-021 / T-022 / T-023)

- **Query**: "Honda H22A Redtop specifications" — 5 results returned, all relevant (avg relevance 4.3/5).
- **Extract**: Wikipedia H-engine article — ~28,000 chars extracted, tables preserved, < 3s latency.
- **Quality**: Top results contain comprehensive spec tables; community sources dominate; no manufacturer-published sources found.

### Limitations

- Requires network access and Tavily API key.
- Free tier has rate limits.
- Extracted content quality depends on source page structure.
- No built-in caching between queries.
- Forum results less structured than wiki/encyclopedia sources.

---

## playwright

| Attribute | Value |
|---|---|
| **Status** | CLI available; Chromium partially installed |
| **Type** | Browser automation / headless navigation |
| **Tool count** | 14+ tools per server instance |
| **Access method** | Docker MCP server (`mcr.microsoft.com/playwright/mcp`) + local `npx playwright` |
| **Verified date** | 2026-05-15 |

### Version

```
$ npx playwright --version
Version 1.60.0
```

### Chromium installation status

| Binary | Location | Status |
|---|---|---|
| chromium-1208 (PW-managed) | `~/.cache/ms-playwright/chromium-1208/` | Installed |
| System Chromium | `/usr/bin/chromium` | Installed — v147.0.7727.137 (Arch Linux) |
| chromium-1223 (matching PW 1.60.0) | `~/.cache/ms-playwright/chromium-1223/` | Not pre-installed (auto-downloads on first use) |
| FFmpeg | `~/.cache/ms-playwright/ffmpeg-1011/` | Installed |
| Firefox | `~/.cache/ms-playwright/firefox-1522/` | Not installed |

### Capabilities

- **Browser automation**: Launch Chromium programmatically via Playwright API.
- **Headless mode**: Verified working with system Chromium (`--headless --no-sandbox`).
- **Screenshot capture**: `page.screenshot()` — outputs PNG.
- **DOM inspection**: `page.content()`, `page.evaluate()` for JS execution.
- **Navigation**: Full page loading with network interception support.
- **PDF generation**: `page.pdf()` — export pages to PDF.
- **Form interaction**: Fill forms, click elements, handle dialogs.

### Limitations

- Playwright 1.60.0 expects chromium-1223; only chromium-1208 is pre-installed.
- First browser launch triggers automatic download (~150MB).
- Firefox and WebKit browsers not installed.
- `networkidle` wait strategy unreliable for sites with persistent background requests (analytics, ads).
- Containerized Playwright MCP (via Docker) is the primary integration path.

### Integration notes

This project uses Playwright primarily through the Docker-based MCP server (`mcr.microsoft.com/playwright/mcp`) rather than a local npm install. The MCP server runs headless Chromium inside a container with `/data` mounted. Output persists to `~/.pi/playwright-output/`.

### Test results (T-027)

- Navigated to `honda-tech.com/forums/` — loaded in < 5s with resource blocking.
- Screenshot saved: PNG, 1280×720, 88 KB.
- Body text extracted: 28,519 characters.
- Custom user-agent avoids basic bot detection.

---

## github

| Attribute | Value |
|---|---|
| **Status** | Available (cached metadata) |
| **Type** | GitHub repository operations |
| **Tool count** | 40 tools |
| **Access method** | MCP tool (requires `GITHUB_PAT` env var) |
| **Verified date** | Configured in `~/.pi/mcp.json` and `~/.qwen/settings.json` |

### Key capabilities

| Category | Tools | Use case |
|---|---|---|
| Code search | `github_search_code` | Fast symbol/code search across all repos |
| Issue management | `github_list_issues`, `github_issue_read`, `github_issue_write`, `github_add_issue_comment` | Create/update/issues/comments |
| PR management | `github_list_pull_requests`, `github_create_pull_request`, `github_update_pull_request`, `github_merge_pull_request` | Full PR lifecycle |
| PR review | `github_pull_request_read`, `github_pull_request_review_write`, `github_request_copilot_review` | Reviews, comments, approvals |
| Repository ops | `github_create_repository`, `github_fork_repository`, `github_create_branch`, `github_push_files`, `github_create_or_update_file`, `github_delete_file` | Repo creation, branching, file ops |
| Content access | `github_get_file_contents`, `github_get_commit`, `github_list_commits`, `github_list_tags`, `github_list_releases` | Read repo contents, history, releases |
| Discovery | `github_search_repositories`, `github_search_users`, `github_search_issues`, `github_search_pull_requests` | Find repos, users, issues, PRs |
| Collaboration | `github_assign_copilot_to_issue`, `github_sub_issue_write`, `github_add_comment_to_pending_review` | Copilot assignment, sub-issues, review comments |

### Limitations

- Requires `GITHUB_PAT` (GitHub Personal Access Token) configured in env vars.
- Destructive operations (force push, delete branch) require explicit approval.
- Rate limits apply for unauthenticated or free-tier tokens.

---

## docker-mcp

| Attribute | Value |
|---|---|
| **Status** | Available (cached metadata) |
| **Type** | Docker container operations |
| **Tool count** | 4 tools |
| **Access method** | MCP tool (`uvx docker-mcp`) |
| **Verified date** | Configured in `~/.pi/mcp.json` and `~/.qwen/settings.json` |

### Tools

| Tool | Purpose |
|---|---|
| `docker_mcp_list-containers` | List all running/stopped containers |
| `docker_mcp_create-container` | Create a new standalone container with custom image, ports, environment |
| `docker_mcp_deploy-compose` | Deploy a Docker Compose stack from YAML |
| `docker_mcp_get-logs` | Retrieve latest logs for a specified container |

### Limitations

- Requires Docker daemon running on host.
- No container exec/attach capability — read-only log access.
- No image pull/push operations exposed.

---

## session-history

| Attribute | Value |
|---|---|
| **Status** | Available (cached metadata) |
| **Type** | Claude Code session history mining |
| **Tool count** | 16 tools |
| **Access method** | MCP tool (stdio: `bash -c "cd /data/claude-session-mcp && npx tsx src/server.ts"`) |
| **DB location** | `~/.claude/session-mcp-index.db` (SQLite + FTS5 + sqlite-vec) |
| **Embeddings** | Wired to TEI on :30001, model `nomic-ai/modernbert-embed-base`, dim 768 |

### Tools

| Tool | Purpose |
|---|---|
| `list_projects` | List projects by recency/session count |
| `get_project` | Get project details, CLAUDE.md content, settings |
| `list_sessions` | List sessions with filters (sortBy, toolNames, date range) |
| `get_session` | Session metadata, tool breakdown, files-changed |
| `get_conversation` | Phase-clustered overview of a session |
| `search` | FTS5 full-text keyword search across all sessions |
| `semantic_search` | KNN vector search over message embeddings |
| `query_turns` | Filter turns by isError, isCorrection, toolNames, textPattern |
| `get_turns` | Expand specific turn IDs for full content |
| `get_changes` | File-op log (read/write/edit/create) across sessions |
| `analyze` | Aggregates: errors, corrections, tool_failures, costly_sessions |
| `context_audit` | Cost/token/context/cache/collapse/profile breakdowns |
| `claude_md_effectiveness` | Measure whether CLAUDE.md edits reduced friction |
| `deep_analyze` | Opus-powered per-session review (costs Anthropic credits) |
| `get_memory` | Access indexed CLAUDE.md / MEMORY.md entries |
| `get_audit_history` | List prior MCP audit calls |

### Limitations

- `isCorrection` is noisy (includes subagent callbacks + compaction preambles).
- `costUsd` is always null on this host (local vLLM emits no cost).
- `analyze(metric=cache_efficiency)` ratios are relative ranks, not percentages.
- `collapseCount` is ~always 0 (manual compactions not counted).
- `textPattern` regex only works when `sessionId` is set.
- `deep_analyze` requires Anthropic API credits.

---

## langfuse-trace

| Attribute | Value |
|---|---|
| **Status** | Configured (not connected in current environment) |
| **Type** | LLM observability: traces, observations, sessions, prompts, scores |
| **Tool count** | 30+ tools |
| **Access method** | MCP tool (pointing to local Langfuse at `http://10.1.10.20:3060`) |
| **Verified date** | Configured in `~/.claude.json` global MCP servers |

### Key capabilities

| Category | Tools | Use case |
|---|---|---|
| Traces | `fetch_traces`, `fetch_trace` | Query trace spans/generations by age, name, tags |
| Observations | `fetch_observations`, `fetch_observation` | Query spans/generations/events by type, level, trace_id |
| Sessions | `fetch_sessions`, `get_session_details`, `get_user_sessions` | Langfuse-native session grouping |
| Prompts | `list_prompts`, `get_prompt`, `create_text_prompt`, `create_chat_prompt` | Versioned prompt management |
| Scores | `list_scores_v2`, `get_score_v2` | Eval scores (LLM-judge or manual) |
| Datasets | `list_datasets`, `create_dataset`, `list_dataset_items` | Evaluation dataset management |
| Exceptions | `find_exceptions`, `get_exception_details` | Exception grouping by file/function/type |
| Metadata | `get_data_schema` | Returns available entity schemas |

### Known quirks

- `age` parameter is in minutes (max 10080 = 7 days).
- `get_error_count` / `find_exceptions` return zero for ginny traces — use `fetch_observations(type=GENERATION, level=ERROR)` instead.
- Trace `name` filter matches trace name, not resource attributes like `service.name`.
- OTel ingest endpoint: `http://10.1.10.20:3060/api/public/otel/v1/traces`.

---

## langfuse (prompt-only subset)

| Attribute | Value |
|---|---|
| **Status** | Configured (not connected in current environment) |
| **Type** | Prompt management only (camelCase names) |
| **Tool count** | 6 tools |
| **Access method** | MCP tool (older server, redundant with langfuse-trace) |
| **Verified date** | Configured in `~/.claude.json` |

### Tools

| Tool | Equivalent in langfuse-trace |
|---|---|
| `listPrompts(name?, label?, tag?)` | `list_prompts` |
| `getPrompt(name, version?, label?)` | `get_prompt` |
| `getPromptUnresolved(name, version?, label?)` | `get_prompt_unresolved` |
| `createTextPrompt(name, prompt, ...)` | `create_text_prompt` |
| `createChatPrompt(name, messages, ...)` | `create_chat_prompt` |
| `updatePromptLabels(name, version, newLabels)` | `update_prompt_labels` |

### Rule of thumb

Default to `langfuse-trace` for everything. Only use `langfuse` if the session already has it loaded and the task is strictly prompt-management.

---

## sequential-thinking

| Attribute | Value |
|---|---|
| **Status** | Available (cached metadata) |
| **Type** | Step-by-step reasoning tool |
| **Tool count** | 1 tool |
| **Access method** | MCP tool (npm: `@modelcontextprotocol/server-sequential-thinking`) |
| **Verified date** | Configured in `~/.pi/mcp.json` and `~/.qwen/settings.json` |

### Tool

| Tool | Purpose |
|---|---|
| `sequential_thinking_sequentialthinking` | Multi-step problem analysis with hypothesis generation, revision tracking, and branch support |

### Parameters

- `thought`: Current thinking step
- `nextThoughtNeeded`: Whether another thought step is needed
- `thoughtNumber`: Current step number
- `totalThoughts`: Estimated total thoughts needed
- `isRevision`: Whether this revises previous thinking
- `revisesThought`: Which thought is being reconsidered (if revision)
- `branchFromThought`: Branching point thought number (if branching)
- `branchId`: Branch identifier (if branching)
- `needsMoreThoughts`: If more thoughts are needed

### Limitations

- Single tool only — no additional capabilities beyond structured reasoning.
- Output is text-only — no structured data output.

---

## mongodb

| Attribute | Value |
|---|---|
| **Status** | Configured (not connected in current environment) |
| **Type** | MongoDB queries |
| **Tool count** | 1 tool |
| **Access method** | MCP tool (connection: `mongodb://localhost:27017/ralph_loop`) |
| **Verified date** | Configured in `~/.pi/mcp.json` |

### Notes

- Database: `ralph_loop` at `localhost:27017`.
- Tool name not fully enumerated in cached metadata — likely generic query execution.
- Used for querying MongoDB data when working with that database.

---

## huggingface

| Attribute | Value |
|---|---|
| **Status** | Not connected |
| **Type** | Unknown (registered but not connected) |
| **Tool count** | Unknown |
| **Access method** | MCP tool (registered in `~/.pi/mcp.json`) |
| **Verified date** | N/A |

### Notes

- Server registered but connection failed. May require API key or additional configuration.

---

## Summary table

| Tool | Type | Status | Tool Count | Primary Use |
|---|---|---|---|---|
| tavily-mcp | Web search + extract | Available | 4 | Online research, fact-finding |
| playwright | Browser automation | Available | 14+ | JS-rendered pages, screenshots |
| github | GitOps | Available | 40 | Code search, PRs, issues, repos |
| docker-mcp | Container ops | Available | 4 | Docker management |
| session-history | Session mining | Available | 16 | Claude Code session analysis |
| langfuse-trace | Observability | Configured | 30+ | Trace/observation debugging |
| langfuse | Prompt mgmt | Configured | 6 | Prompt versioning |
| sequential-thinking | Reasoning | Available | 1 | Complex problem decomposition |
| mongodb | Database queries | Configured | 1 | MongoDB access |
| huggingface | Unknown | Not connected | ? | Pending configuration |

---

*Last updated: 2026-05-15*
