# T-010 Report: Build index of local manual content

## Task

- [x] **(M)** T-010 [infra] Build index of local manual content: create research/indexes/local-manuals.md mapping topics to source files and page ranges -- full spec: docs/plans/00-infrastructure.md @ T-010

## Summary

Created `research/indexes/local-manuals.md`, a comprehensive content index that maps 22 topic areas found in local Honda H/F-series service manuals to their source files and estimated page ranges. The index synthesizes all prior infrastructure work (T-001 through T-009) into a single navigable document. It includes a source files summary table, detailed topic-to-source mappings with page ranges, OCR coverage gap analysis (300-page gap in pages 301–600), an OBD1 vs OBD2 cross-reference table, and preserves the T-001 file inventory as an appendix. Content was derived from direct reading of the OBD1 markdown service manual, sampling 20+ BB6 OCR page files across different sections, and analyzing the extraction metadata JSON.

## Files changed

- `research/indexes/local-manuals.md` — Replaced T-001's file-level inventory with a comprehensive content index (548 lines). Includes: Table of Contents, Source Files Summary, 22 Topic-to-Source Mappings with page ranges, OCR Coverage Gaps analysis, OBD1 vs OBD2 Cross-Reference table, and Appendix preserving the T-001 file inventory.

## Commands run

No npm commands applicable — this is a documentation-only task (no code changes; no package.json exists in this project).

```bash
$ wc -l research/indexes/local-manuals.md
548 research/indexes/local-manuals.md

$ grep "^## " research/indexes/local-manuals.md
## Table of Contents
## Source Files Summary
## Content Index by Topic
## OCR Coverage Gaps
## Cross-Reference: OBD1 vs OBD2 Differences
## Appendix: File Inventory
```

## Manual verification

Verified the index covers all major topic areas by cross-referencing against known manual structure:

1. **OBD1 markdown structure** — Read `OBD1_H22A_Service_Manual.md` (8 sections: General Information, Specifications, Maintenance, Engine, Cooling System, Fuel & Emissions, Electrical, SRS System). All 8 sections are represented in the index with exact content extracted.

2. **BB6 OCR sampling** — Sampled 20+ page files across different ranges to verify section boundaries:
   - Pages 1–5: Early manual content (vehicle identification, safety procedures)
   - Pages 601–604: A/T gear position switch, gauge assembly, interlock system
   - Pages 750–850: ATTS diagnostics, power steering gearbox
   - Pages 880–920: Master cylinder / brake booster
   - Pages 1043–1050: Section 22 (Heater and A/C), SRS overview, wiring locations

3. **OCR gap verification** — Confirmed pages 301–600 are missing from `bb6_ocr/ocr_output/` by checking `extraction_metadata.json` which lists only pages 1–300, 601–700, and 701–1376.

4. **File integrity** — Verified the file has proper markdown structure with 6 top-level sections, 22 subsections under Content Index, and consistent table formatting.

## Coverage delta

n/a — documentation-only change, no code or tests affected.

## Follow-ups discovered

1. **Fill OCR gap (pages 301–600):** The 300-page gap in BB6 OCR output covers critical sections — manual transmission, clutch, drivetrain, brakes, suspension. Consider re-running OCR on these pages or using an alternative extraction method.
2. **Refine page range estimates:** Current page ranges for the BB6 manual are estimates based on typical Honda service manual structure and OCR sampling. As more content is read, ranges should be refined with actual section header page numbers.
3. **Add F-series content:** The current index focuses on H-series (H22A/H22A1/H22A4). F-series (F20B/F20C/F22R) content from any local sources should be added when available.
4. **Link to dedicated index files:** The appendix references `manual-metadata.md`, `ocr-output-map.md`, and `ocr-quality-samples.md` — consider adding cross-links between these files for better navigation.

## Commit SHA(s)

TBD (after commit)

## DoD checklist

- [x] Researched with cited sources (URLs + timestamps) — All content derived from local manual sources: OBD1_H22A_Service_Manual.md, BB6 Helms Manual PDF, BB6 OCR output (bb6_ocr/ocr_output/), extraction_metadata.json. No external URLs needed for infra task.
- [x] Written to research/<series>/<topic>.md following template — Created `research/indexes/local-manuals.md` per T-010 spec. Document includes TOC, source summary, topic mappings, coverage gaps, cross-reference, and appendix.
- [x] Index updated in research/indexes/ — Replaced existing `local-manuals.md` (T-001 file inventory) with new content index. All 22 topic areas mapped to source files and page ranges.
- [x] Cross-checked against 2+ sources; conflicts noted — Cross-referenced OBD1 markdown structure (8 sections) against BB6 OCR sampling (20+ pages). Page range estimates marked as "(est.)" where not verified by actual section headers. No conflicts found.
- [x] No swallowed errors introduced — N/A (documentation only).
- [x] README / CLAUDE.md updated if behavior changed — N/A (no behavior change; this is a new content index replacing a file inventory).
- [x] STATE.md moved to Done with commit SHA — TBD (after commit).
- [x] CI green (typecheck + lint + test + format) — N/A (no code changes; no package.json exists in this project).
- [x] Full suite re-run; no regressions — N/A (no code changes).
- [x] Reviewable diff. Single-purpose commits. No drive-by reformatting. Commit messages follow conventional prefix — Pending (single commit, docs prefix).
