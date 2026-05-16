# Phase 0 — Infrastructure & Tooling

Scaffold the project with directory structure, local data indexing, tool verification, and conventions.
This phase must be complete before any research work begins.

## Task format

Each task line in STATE.md ends with `@ T-NNN` — that is the pointer to this section.
The task title in STATE.md is the summary; this doc provides the full spec.

---

## T-001: Index all local service manuals

**Description:** Enumerate every local service manual file in the repo root and subdirectories.
Record filename, size (bytes + human-readable), modification date, file type/format, and a
one-line description of what each file contains. Group by category (PDFs, extracted text, OCR output, samples).

**Output:** `research/indexes/local-manuals.md`

**Depends on:** none

**DoD notes:** This is purely an audit — no parsing, no content analysis. Just file-level metadata.
Cross-reference against CLAUDE.md knowledge sources section to confirm nothing is missing.

---

## T-002: Parse 1992-1996 Helms Manual PDF metadata and table of contents

**Description:** Extract PDF metadata (title, author, creator, page count, creation date) from
`1992-1996_Honda_Prelude_H22A1_Helms_Manual.pdf`. Attempt to extract table of contents / outline.

**Output:** `research/indexes/manual-metadata.md`

**Depends on:** T-001

**DoD notes:** If PDF parsing tools aren't available, note the limitation and use `pdfinfo` or
Python's `pypdf` as fallback. Record page count — critical for estimating OCR coverage.

---

## T-003: Parse 1997-2001 Helms Manual BB6 PDF metadata and table of contents

**Description:** Same as T-002 but for `1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf` (170 MB).

**Output:** `research/indexes/manual-metadata.md` (append section)

**Depends on:** T-001

**DoD notes:** This is the large file — expect longer processing. Verify page count matches
what the OCR produced (should align with bb6_ocr/images/ count).

---

## T-004: Parse OBD1_H22A_Service_Manual.md structure and extract key sections

**Description:** Read `OBD1_H22A_Service_Manual.md`, extract its heading hierarchy (all `##` and `###`
lines), and produce a structured TOC. Note any tables, code blocks, or special formatting.

**Output:** `research/indexes/manual-metadata.md` (append section)

**Depends on:** T-001

**DoD notes:** This is markdown, not PDF — simple parsing. Focus on completeness of coverage,
not depth of content.

---

## T-005: Analyze bb6_ocr extracted text: page count, word count, section coverage

**Description:** Analyze `1997-2001_Honda_Prelude_BB6_Helms_Manual_extracted.txt`: total character
count, word count, approximate page count (assuming ~3000 chars/page), identify section headers
found, estimate coverage percentage vs. the original PDF.

**Output:** `research/indexes/manual-metadata.md` (append section)

**Depends on:** T-001

**DoD notes:** Compare extracted text length to known BB6 PDF page count. Flag any gaps.

---

## T-006: Map OCR output directory

**Description:** Enumerate all files in `bb6_ocr/`: count files by type (.txt, .json, .tsv, .png),
list page ranges covered, calculate total storage used. Categorize by output type.

**Output:** `research/indexes/ocr-output-map.md`

**Depends on:** T-001

**DoD notes:** This is a structural inventory. Note any orphaned files or naming inconsistencies.

---

## T-007: Sample OCR page files

**Description:** Read 5 representative OCR page files (mix of .txt, .json, .tsv) to assess quality.
Pick pages from different ranges (early, middle, late) to check for consistency.

**Output:** `research/indexes/ocr-quality-samples.md`

**Depends on:** T-006

**DoD notes:** Don't analyze deeply — just note whether text appears readable, whether tables
are captured, and whether there are obvious artifacts.

---

## T-008: Check bb6_ocr_samples

**Description:** Examine the PNG screenshots and sample text output in `bb6_ocr_samples/`.
Document what each file shows and its purpose.

**Output:** `research/indexes/ocr-quality-samples.md` (append section)

**Depends on:** T-006

**DoD notes:** These are reference samples. Note page numbers and whether they match the OCR output.

---

## T-009: Check pages_needing_review.txt

**Description:** Read `bb6_ocr/pages_needing_review.txt` and document which pages were flagged
and why. Cross-reference against the OCR output to see if reviews were completed.

**Output:** `research/indexes/ocr-quality-samples.md` (append section)

**Depends on:** T-006

**DoD notes:** Simple read + cross-reference. Flag any pages that are still unreviewed.

---

## T-010: Build index of local manual content

**Description:** Create `research/indexes/local-manuals.md` that maps topics found in local
manuals to their source files and page ranges. This is the primary content index.

**Output:** `research/indexes/local-manuals.md`

**Depends on:** T-001 through T-009

**DoD notes:** This synthesizes all prior work into a single navigable index. Link back to
source files for deep dives.

---

## T-011: Create QWEN.md content inventory

**Description:** Extract all topics, subtopics, and references from QWEN.md. Produce a structured
inventory showing the document's coverage breadth.

**Output:** `research/indexes/qwen-content-inventory.md`

**Depends on:** T-001

**DoD notes:** This is a TOC extraction + topic categorization. Useful for gap analysis.

---

## T-012: Identify gaps in QWEN.md

**Description:** Compare QWEN.md's topic list against a comprehensive H/F-series topic checklist.
Flag missing areas, under-covered topics, and stale references.

**Output:** `research/indexes/qwen-gap-analysis.md`

**Depends on:** T-011

**DoD notes:** This spawns actionable research tasks for subsequent phases.

---

## T-013: Catalog H-series variant codes

**Description:** Extract all H-series variant codes mentioned in local materials: H22A, H22A1-H22A8,
H22Z1, H23A. Document where each appears and in what context.

**Output:** `research/indexes/variant-catalog.md`

**Depends on:** T-001

**DoD notes:** Simple extraction. Don't add external data — only what's in local files.

---

## T-014: Catalog F-series variant codes

**Description:** Same as T-013 but for F-series: F20B, F20C, F22R, etc.

**Output:** `research/indexes/variant-catalog.md` (append section)

**Depends on:** T-013

**DoD notes:** Local materials may have limited F-series coverage. Note that.

---

## T-015: Extract ECU part numbers and pinout references

**Description:** Scan local manuals for ECU part numbers, connector pinouts, and wiring references.
Catalog them with source file and page reference.

**Output:** `research/indexes/ecu-references.md`

**Depends on:** T-001

**DoD notes:** This is a targeted scan. Focus on OBD1 and OBD2 ECU variants mentioned.

---

## T-016: Create research/ directory structure

**Description:** Create `research/` and all planned subdirectories. Ensure the tree matches the
project's research taxonomy (h-series/, f-series/, comparisons/, indexes/, raw-data/).

**Output:** directory structure only (no content files)

**Depends on:** T-010

**DoD notes:** Verify after creation: `find research/ -type d | sort`.

---

## T-017: Create research/h-series/ subdirectories

**Description:** Create all h-series subdirectories: development/, specifications/, variants/,
mechanical/, vtec/, engine-management/, tuning/, reliability/, swaps/, motorsport/, aftermarket/,
comparisons/, maintenance/.

**Output:** directory structure only

**Depends on:** T-016

**DoD notes:** Match the directory names exactly as listed. No typos.

---

## T-018: Create research/f-series/ subdirectories

**Description:** Mirror T-017 for f-series/.

**Output:** directory structure only

**Depends on:** T-016

**DoD notes:** Same subdirectory names as h-series.

---

## T-019: Create research/comparisons/ subdirectories

**Description:** Create h-vs-f/, h-vs-b16/, h-vs-k20/, h-vs-f20c/, f-vs-b16/, f-vs-k20/.

**Output:** directory structure only

**Depends on:** T-016

**DoD notes:** These are cross-engine comparison directories.

---

## T-020: Create initial master index

**Description:** Create `research/indexes/master-index.md` with placeholder structure linking
to all planned research files. This is the entry point for navigating the research corpus.

**Output:** `research/indexes/master-index.md`

**Depends on:** T-016 through T-019

**DoD notes:** Keep it minimal — just headings and placeholder links. Fill in during research.

---

## T-021: Verify tavily-mcp availability

**Description:** Test tavily search with a sample query ("Honda H22A Redtop specifications").
Verify results are returned and formatted correctly.

**Output:** `research/indexes/tools-reference.md`

**Depends on:** none

**DoD notes:** This verifies web search capability. Record query time and result count.

---

## T-022: Test tavily search quality

**Description:** Run the specific query "Honda H22A Redtop specifications" and assess result quality.
Are the top 3 results relevant? Do they contain technical specs?

**Output:** `research/indexes/tools-reference.md` (append section)

**Depends on:** T-021

**DoD notes:** Qualitative assessment. Score 1-5 for relevance.

---

## T-023: Test tavily extract

**Description:** Pick a known Honda technical article URL and test content extraction.
Verify the extracted content is clean markdown/text.

**Output:** `research/indexes/tools-reference.md` (append section)

**Depends on:** T-021

**DoD notes:** Use a URL from QWEN.md's references section.

---

## T-024: Check playwright availability

**Description:** Verify `npx playwright --version` works and Chromium is installed.

**Output:** `research/indexes/tools-reference.md`

**Depends on:** none

**DoD notes:** Simple version check. Note if headless mode works.

---

## T-025: Check playwright MCP configuration

**Description:** Verify playwright is configured in ~/.pi/mcp.json or ~/.pi/agent/extensions/.

**Output:** `research/indexes/tools-reference.md` (append section)

**Depends on:** T-024

**DoD notes:** Record the config location and tool count.

---

## T-026: Add playwright MCP configuration

**Description:** If playwright MCP isn't configured, add it to ~/.pi/mcp.json for browser-based
web navigation support.

**Output:** ~/.pi/mcp.json update

**Depends on:** T-025

**DoD notes:** Only run if needed. Document what was added.

---

## T-027: Test playwright browser automation

**Description:** Navigate to a Honda forum, take a screenshot, verify output is saved correctly.

**Output:** `research/indexes/tools-reference.md` (append section)

**Depends on:** T-026

**DoD notes:** Screenshot goes to ~/.pi/playwright-output/. Verify it exists.

---

## T-028: Document available tools

**Description:** Create `research/indexes/tools-reference.md` listing all available tools
(tavily, playwright, session-history, langfuse, etc.) with capabilities and status.

**Output:** `research/indexes/tools-reference.md`

**Depends on:** T-021 through T-027

**DoD notes:** One table per tool: name, status, key capabilities, limitations.

---

## T-029: Create research template

**Description:** Create `research/template.md` — a standard template for all research markdown
files. Sections: summary, specifications, sources, notes, citations.

**Output:** `research/template.md`

**Depends on:** T-016

**DoD notes:** Keep it minimal. Template should be copy-paste friendly.

---

## T-030: Create citations standard

**Description:** Create `research/citations.md` defining the citation format and source tracking
methodology for the project.

**Output:** `research/citations.md`

**Depends on:** T-029

**DoD notes:** Standardize how URLs, timestamps, and source credibility are recorded.

---

## Phase 0 checkpoint (T-070 in STATE.md)

**Description:** Re-read all of STATE.md. Verify no stray `[~]` markers. Confirm directory
structure is correct. Check that all index files are present. Verify `git status` is clean.

**Depends on:** T-001 through T-030

**Spawns:** None expected. If drift is found, add `[fix]` tasks below this checkpoint.

**DoD notes:** Lightweight checkpoint — not a gate. Catch obvious issues before the stricter gate.

---

## Phase 0 gate (T-009 in 00-bootstrap.md)

**Description:** Stricter verification. Every task in Phase 0 must be `[x] done`. All config
files present and correct. Directory structure verified. Runner scripts pass dry-run.
`git status` is clean. No `[~]` or `[B]` markers remain in Phase 0.

**Depends on:** T-070

**Spawns:** None. If this gate fails, go back and fix the failing tasks.

**DoD notes:** This gate blocks all subsequent phases. Do not mark done until every box ticks.
