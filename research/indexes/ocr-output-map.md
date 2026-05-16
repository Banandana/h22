# OCR Output Map — bb6_ocr/ Directory

**Generated:** 2026-05-14
**Source directory:** `bb6_ocr/`
**Task:** T-006 [infra] Map OCR output directory

## Summary

The `bb6_ocr/` directory contains the full OCR pipeline output for the 1997-2001 Honda Prelude BB6 Helms Manual. It comprises 5,542 files across 4 subdirectories/types: extracted text, extraction metadata, page images (PNG), and structured OCR output (text/JSON/TSV). The OCR covers 1,376 pages numbered 1–1376, with corresponding image captures and three output formats per page.

## File Inventory

### By extension (recursive, files only)

| Extension | Count | Location |
|-----------|-------|----------|
| `.png`    | 1,411 | `images/` |
| `.txt`    | 1,378 | `ocr_output/` (1,376) + root (2) |
| `.json`   | 1,377 | `ocr_output/` (1,376) + root (1) |
| `.tsv`    | 1,376 | `ocr_output/` |
| **Total** | **5,542** | |

### By directory

| Directory | Files | Size | Contents |
|-----------|-------|------|----------|
| `images/` | 1,411 | 813 MB | PNG screenshots of source pages |
| `ocr_output/` | 4,128 | 32 MB | Structured OCR output per page |
| Root level | 3 | ~1.8 MB | Extracted text, metadata, review list |
| **Total** | **5,542** | **846 MB** | |

## Page Ranges

### OCR Output (`ocr_output/`)

- **Pages:** 0001–1376 (1,376 complete page sets)
- **Pattern:** Each page has exactly 3 files:
  - `page_<N>.txt` — raw OCR text
  - `page_<N>.json` — structured OCR with bounding boxes
  - `page_<N>_tsv.tsv` — tab-separated OCR data
- **Completeness:** All 1,376 pages present with all 3 output formats. No gaps detected.

### Page Images (`images/`)

Two naming conventions are used:

#### Pattern A: `page-<NNN>.png` (single-image-per-page)

- **Count:** 1,376 files
- **Pages:** 000–1375
- **Purpose:** One PNG per source page

#### Pattern B: `p<NNN>-<NNN>.png` (multi-frame pages)

- **Count:** 35 files
- **Pages covered:** 3, 23, 39, 55, 161, 219, 233, 287, 311, 343, 375, 407, 439, 471, 503, 535, 567, 599, 631, 663, 695, 727, 759, 791, 823, 855, 887, 919, 951, 983, 1015, 1043, 1075, 1108, 1140, 1172, 1204, 1236, 1268, 1311
- **Frames per page:** Varies (typically 1–2; page 161 has 11 frames)
- **Purpose:** Multi-view or multi-angle captures for complex pages (likely tables, diagrams, or multi-column layouts)

### Root-level files

| File | Size | Purpose |
|------|------|---------|
| `1997-2001_BB6_Manual_extracted.txt` | 1.8 MB | Concatenated OCR text from all pages |
| `extraction_metadata.json` | 36 KB | Extraction run metadata (timestamps, tool versions) |
| `pages_needing_review.txt` | 92 bytes | Review queue (currently empty — 0 flagged pages) |

## Naming Conventions

### Consistent patterns

- **OCR output:** `page_<N>.{txt,json,tsv}` — zero-padded 4-digit page numbers (e.g., `page_0001.txt`)
- **Images (single):** `page-<NNN>.png` — zero-padded 3-digit page numbers (e.g., `page-001.png`)
- **Images (multi):** `p<NNN>-<NNN>.png` — page number + frame index (e.g., `p161-001.png`)

### Inconsistencies noted

1. **Page number offset:** OCR output pages start at 0001 while single-image pages start at 000. This is a 1-index vs 0-index discrepancy that may cause confusion when cross-referencing images to OCR text.
2. **Dual image naming:** Two distinct naming schemes coexist (`page-<N>.png` vs `p<N>-<N>.png`). The `p`-pattern is used only for pages requiring multi-frame capture.
3. **Padding inconsistency:** OCR output uses 4-digit padding (`page_0001`), single images use 3-digit (`page-001`), and multi-frame images use variable-width page numbers (`p161`).
4. **Multi-frame page numbering:** Pages in the `p`-pattern don't follow a strict sequential order — they appear to be selected based on content complexity rather than page range.

## Orphaned Files

No orphaned files detected. All files belong to one of the expected categories:
- OCR output sets (3 files per page × 1,376 pages = 4,128 files)
- Page images (1,411 files)
- Pipeline artifacts (3 root-level files)

## Storage Breakdown

| Component | Size | Percentage |
|-----------|------|------------|
| `images/` (all PNGs) | 813 MB | 96.1% |
| `ocr_output/` (txt/json/tsv) | 32 MB | 3.8% |
| `1997-2001_BB6_Manual_extracted.txt` | 1.8 MB | 0.2% |
| `extraction_metadata.json` | 36 KB | <0.1% |
| `pages_needing_review.txt` | 92 bytes | <0.1% |
| **Total** | **846 MB** | **100%** |

## Coverage Assessment

- **OCR coverage:** 1,376 pages with full triple-format output (txt + json + tsv)
- **Image coverage:** 1,376 single-page images + 35 multi-frame pages (total 1,411 images)
- **Extracted text:** Single concatenated file covering all 1,376 pages
- **Review status:** Zero pages flagged for manual review
- **Expected total:** STATE.md references "4,128 page files" — this likely refers to the 4,128 files in `ocr_output/` alone (1,376 pages × 3 formats). The full `bb6_ocr/` directory contains 5,542 files including images and root-level artifacts.

## Cross-References

- T-005: Analyzes the extracted text file (1.8 MB) — page count, word count, section coverage
- T-007: Samples representative OCR page files from this directory
- T-008: Examines PNG screenshots in `images/`
- T-009: Checks `pages_needing_review.txt` for flagged pages
