#!/usr/bin/env python3
"""
BB6 Service Manual OCR Extraction Pipeline

This script extracts text from the 1997-2001 Honda Prelude BB6 Helms Manual PDF
using OCR (tesseract). It supports:
- Batch processing (configurable pages per batch)
- Multiple PSM modes for different content types
- Confidence scoring and flagging for review
- Incremental extraction (resume from last page)
- Correction/iteration workflow

Usage:
    python3 bb6_ocr_extract.py --start 1 --end 50 --batch 10
    python3 bb6_ocr_extract.py --review  # Review flagged low-confidence pages
    python3 bb6_ocr_extract.py --correction 1 5 10  # Manually correct specific pages
"""

import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from datetime import datetime
from typing import Optional

# Configuration
PDF_PATH = "/data/h22/1997-2001_Honda_Prelude_BB6_Helms_Manual.pdf"
WORK_DIR = Path("/data/h22/bb6_ocr")
IMAGES_DIR = WORK_DIR / "images"
OCR_DIR = WORK_DIR / "ocr_output"
METADATA_FILE = WORK_DIR / "extraction_metadata.json"
FINAL_OUTPUT = WORK_DIR / "1997-2001_BB6_Manual_extracted.txt"
REVIEW_FILE = WORK_DIR / "pages_needing_review.txt"

# Tesseract PSM modes for different content types
PSM_MODES = {
    "auto": 3,           # Default automatic
    "single_block": 1,   # Single vertical block of text
    "single_line": 8,    # Single line of text
    "single_word": 9,    # Single word
    "sparse_text": 11,   # Sparse text (scattered text areas)
    "raw_line": 10,      # Raw line (no line segmentation)
}

# Confidence thresholds
LOW_CONFIDENCE_THRESHOLD = 70  # Pages below this get flagged
MEDIUM_CONFIDENCE_THRESHOLD = 85


def ensure_directories():
    """Create necessary working directories."""
    WORK_DIR.mkdir(exist_ok=True)
    IMAGES_DIR.mkdir(exist_ok=True)
    OCR_DIR.mkdir(exist_ok=True)


def load_metadata() -> dict:
    """Load extraction metadata (progress, confidence scores, etc.)."""
    if METADATA_FILE.exists():
        with open(METADATA_FILE, 'r') as f:
            return json.load(f)
    return {
        "extracted_pages": [],
        "confidence_scores": {},
        "flagged_pages": [],
        "last_updated": None,
        "total_pages": 0
    }


def save_metadata(metadata: dict):
    """Save extraction metadata."""
    metadata["last_updated"] = datetime.now().isoformat()
    with open(METADATA_FILE, 'w') as f:
        json.dump(metadata, f, indent=2)


def get_pdf_page_count() -> int:
    """Get total page count from PDF."""
    result = subprocess.run(
        ['pdfinfo', PDF_PATH],
        capture_output=True, text=True
    )
    for line in result.stdout.split('\n'):
        if line.startswith('Pages:'):
            return int(line.split(':')[1].strip())
    return 0


def extract_pages_to_images(start_page: int, end_page: int):
    """Extract specific page range to PNG images (only missing pages)."""
    print(f"Extracting pages {start_page}-{end_page} to images...")

    # Check which pages already have images
    pages_to_extract = []
    for page_num in range(start_page, end_page + 1):
        # Check for both naming patterns
        image_file1 = IMAGES_DIR / f"page-{page_num-1:03d}.png"
        image_file2 = IMAGES_DIR / f"page-{page_num-1:03d}-000.png"
        if not image_file1.exists() and not image_file2.exists():
            pages_to_extract.append(page_num)

    if not pages_to_extract:
        print("  All pages already have images extracted.")
        return True

    # Extract only missing pages
    for page_num in pages_to_extract:
        # Use a unique prefix for each page to avoid overwrites
        cmd = [
            'pdfimages', '-png',
            PDF_PATH,
            str(IMAGES_DIR / f"p{page_num}"),
            '-f', str(page_num),
            '-l', str(page_num)
        ]
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"  Error extracting page {page_num}: {result.stderr}")
            return False
        
        # Rename to standard naming pattern
        src = IMAGES_DIR / f"p{page_num}-000.png"
        dst = IMAGES_DIR / f"page-{page_num-1:03d}.png"
        if src.exists():
            src.rename(dst)
        print(f"  Extracted page {page_num}")

    return True


def ocr_page(page_num: int, psm_mode: int = 3) -> tuple[str, float]:
    """
    Run OCR on a specific page image.
    Returns (text, confidence_score)
    """
    # Find the image file for this page
    image_files = sorted(IMAGES_DIR.glob(f"page-{page_num-1:03d}.png"))
    if not image_files:
        return "", 0.0

    image_path = image_files[0]
    output_base = OCR_DIR / f"page_{page_num:04d}"

    # Run tesseract to get plain text output
    cmd_txt = [
        'tesseract',
        str(image_path),
        str(output_base),
        '--psm', str(psm_mode),
        '--dpi', '150'
    ]
    subprocess.run(cmd_txt, capture_output=True)

    # Read the text output
    txt_file = output_base.with_suffix('.txt')
    if txt_file.exists():
        with open(txt_file, 'r') as f:
            text = f.read()
    else:
        text = ""

    # Run tesseract with TSV output for confidence scores (use different output base)
    tsv_output = OCR_DIR / f"page_{page_num:04d}_tsv"
    cmd_tsv = [
        'tesseract',
        str(image_path),
        str(tsv_output),
        '--psm', str(psm_mode),
        '--dpi', '150',
        'tsv'
    ]
    result = subprocess.run(cmd_tsv, capture_output=True, text=True)

    # Parse confidence from TSV output
    confidence = 75.0  # Default moderate confidence for scanned docs
    if result.returncode == 0:
        # TSV has conf column (column index 10)
        lines = result.stdout.strip().split('\n')
        if len(lines) > 1:
            # Skip header, get confidence values for word-level entries
            conf_values = []
            for line in lines[1:]:
                parts = line.split('\t')
                if len(parts) >= 11:
                    try:
                        conf = float(parts[10])
                        if conf >= 0:  # Skip -1 values which indicate no confidence calculated
                            conf_values.append(conf)
                    except (ValueError, IndexError):
                        pass
            if conf_values:
                confidence = sum(conf_values) / len(conf_values)
            else:
                # If no word-level confidence, estimate based on text quality
                # Longer text with common words suggests better OCR
                if len(text.strip()) > 100:
                    confidence = 80.0
                elif len(text.strip()) > 50:
                    confidence = 70.0
                else:
                    confidence = 60.0

    return text, confidence


def detect_content_type(page_num: int) -> str:
    """
    Detect what type of content is on a page to choose optimal PSM mode.
    Returns: 'table', 'diagram', 'text', 'mixed'
    """
    # For now, use heuristics based on page number patterns
    # In a more sophisticated version, analyze image properties

    # Most pages are regular text - use auto mode
    # Only specific page ranges are likely tables
    # (These would need to be adjusted based on actual manual structure)
    table_pages = list(range(200, 250)) + list(range(400, 450))  # Approximate spec sections

    if page_num in table_pages:
        return 'table'

    return 'text'


def get_psm_mode_for_content(content_type: str) -> int:
    """Get optimal PSM mode for content type."""
    if content_type == 'table':
        return PSM_MODES['raw_line']  # Better for tabular data
    elif content_type == 'diagram':
        return PSM_MODES['sparse_text']
    else:
        return PSM_MODES['auto']


def extract_batch(start_page: int, end_page: int, batch_size: int = 10):
    """Extract a batch of pages with OCR."""
    metadata = load_metadata()
    
    if metadata["total_pages"] == 0:
        metadata["total_pages"] = get_pdf_page_count()
    
    print(f"\n{'='*60}")
    print(f"Processing pages {start_page} to {end_page}")
    print(f"{'='*60}\n")
    
    # Extract images for this batch
    if not extract_pages_to_images(start_page, end_page):
        print("Failed to extract images")
        return
    
    # Process each page
    for page_num in range(start_page, end_page + 1):
        if page_num in metadata["extracted_pages"]:
            print(f"Page {page_num}: Already extracted, skipping")
            continue
        
        print(f"Processing page {page_num}/{metadata['total_pages']}...")
        
        # Detect content type and choose PSM mode
        content_type = detect_content_type(page_num)
        psm_mode = get_psm_mode_for_content(content_type)
        
        # Run OCR
        text, confidence = ocr_page(page_num, psm_mode)
        
        # Store results
        page_data = {
            "page_number": page_num,
            "text": text,
            "confidence": round(confidence, 2),
            "content_type": content_type,
            "psm_mode": psm_mode,
            "extracted_at": datetime.now().isoformat()
        }
        
        # Save individual page JSON for easy editing/correction
        page_json_file = OCR_DIR / f"page_{page_num:04d}.json"
        with open(page_json_file, 'w') as f:
            json.dump(page_data, f, indent=2)
        
        # Track confidence
        metadata["confidence_scores"][str(page_num)] = round(confidence, 2)
        
        # Flag low confidence pages for review
        if confidence < LOW_CONFIDENCE_THRESHOLD:
            metadata["flagged_pages"].append({
                "page": page_num,
                "confidence": round(confidence, 2),
                "reason": "low_confidence"
            })
            print(f"  ⚠️  Page {page_num}: LOW CONFIDENCE ({confidence:.1f}%) - flagged for review")
        elif confidence < MEDIUM_CONFIDENCE_THRESHOLD:
            print(f"  ⚡ Page {page_num}: Medium confidence ({confidence:.1f}%)")
        else:
            print(f"  ✓ Page {page_num}: {confidence:.1f}% confidence")
        
        metadata["extracted_pages"].append(page_num)
    
    # Save updated metadata
    save_metadata(metadata)
    
    # Update review file
    update_review_file(metadata)
    
    print(f"\nBatch complete. Extracted {len(metadata['extracted_pages'])} pages total.")
    print(f"Flagged {len(metadata['flagged_pages'])} pages for review.")


def update_review_file(metadata: dict):
    """Update the pages needing review file."""
    with open(REVIEW_FILE, 'w') as f:
        f.write("# Pages Requiring Manual Review\n")
        f.write(f"# Generated: {datetime.now().isoformat()}\n")
        f.write(f"# Total flagged: {len(metadata['flagged_pages'])}\n\n")

        for item in metadata["flagged_pages"]:
            json_path = f"{OCR_DIR}/page_{item['page']:04d}.json"
            f.write(f"Page {item['page']}: {item['confidence']}% confidence - {item['reason']}\n")
            f.write(f"  JSON file: {json_path}\n\n")


def assemble_final_output():
    """Assemble all extracted pages into final text file."""
    metadata = load_metadata()
    
    with open(FINAL_OUTPUT, 'w') as f:
        f.write("# 1997-2001 Honda Prelude BB6 Service Manual - Extracted Text\n")
        f.write(f"# Extraction Date: {datetime.now().isoformat()}\n")
        f.write(f"# Total Pages: {metadata['total_pages']}\n")
        f.write(f"# Extracted Pages: {len(metadata['extracted_pages'])}\n")
        f.write("# Flagged for Review: " + str(len(metadata['flagged_pages'])) + "\n")
        f.write("#" + "="*70 + "\n\n")
        
        # Sort pages and assemble
        sorted_pages = sorted(metadata["extracted_pages"])
        
        for page_num in sorted_pages:
            page_json_file = OCR_DIR / f"page_{page_num:04d}.json"
            if page_json_file.exists():
                with open(page_json_file, 'r') as pf:
                    page_data = json.load(pf)
                
                f.write(f"\n{'='*80}\n")
                f.write(f"PAGE {page_num}\n")
                f.write(f"Confidence: {page_data['confidence']}% | Type: {page_data['content_type']}\n")
                f.write(f"{'='*80}\n\n")
                f.write(page_data['text'])
                f.write("\n")
    
    print(f"Final output assembled: {FINAL_OUTPUT}")
    print(f"Total pages extracted: {len(metadata['extracted_pages'])}")


def correction_mode(page_numbers: list[int]):
    """
    Interactive correction mode for specific pages.
    Shows current extraction and allows manual editing.
    """
    for page_num in page_numbers:
        page_json_file = OCR_DIR / f"page_{page_num:04d}.json"
        
        if not page_json_file.exists():
            print(f"Page {page_num}: No extraction found")
            continue
        
        with open(page_json_file, 'r') as f:
            page_data = json.load(f)
        
        print(f"\n{'='*60}")
        print(f"Correcting Page {page_num} (Current confidence: {page_data['confidence']}%)")
        print(f"{'='*60}")
        print(f"\nCurrent extraction:\n{page_data['text']}\n")
        print("Enter corrected text (press Enter twice when done):")
        
        lines = []
        while True:
            line = input()
            if line == "":
                break
            lines.append(line)
        
        corrected_text = "\n".join(lines)
        
        if corrected_text.strip():
            page_data['text'] = corrected_text
            page_data['corrected'] = True
            page_data['corrected_at'] = datetime.now().isoformat()
            
            with open(page_json_file, 'w') as f:
                json.dump(page_data, f, indent=2)
            
            # Remove from flagged if present
            metadata = load_metadata()
            metadata['flagged_pages'] = [
                p for p in metadata['flagged_pages'] 
                if p['page'] != page_num
            ]
            save_metadata(metadata)
            update_review_file(metadata)
            
            print(f"Page {page_num} corrected and saved.")
        else:
            print("No changes made.")


def review_mode():
    """Show list of pages needing review."""
    metadata = load_metadata()
    
    if not metadata['flagged_pages']:
        print("No pages flagged for review!")
        return
    
    print(f"\n{'='*60}")
    print("Pages Flagged for Review")
    print(f"{'='*60}\n")

    for item in metadata['flagged_pages']:
        print(f"Page {item['page']}: {item['confidence']}% confidence - {item['reason']}")
        json_path = f"{OCR_DIR}/page_{item['page']:04d}.json"
        img_path = f"{IMAGES_DIR}/page-{item['page']-1:03d}.png"
        print(f"  JSON: {json_path}")
        print(f"  Image: {img_path}")
        print()

    print("\nUse --correction <page_numbers> to correct specific pages")


def main():
    parser = argparse.ArgumentParser(
        description='BB6 Service Manual OCR Extraction Pipeline'
    )
    parser.add_argument('--start', type=int, default=1,
                        help='Starting page number')
    parser.add_argument('--end', type=int, default=None,
                        help='Ending page number (default: all)')
    parser.add_argument('--batch', type=int, default=10,
                        help='Pages per batch')
    parser.add_argument('--review', action='store_true',
                        help='Show pages needing review')
    parser.add_argument('--correction', type=int, nargs='+',
                        help='Correct specific page numbers')
    parser.add_argument('--assemble', action='store_true',
                        help='Assemble final output from all extracted pages')
    parser.add_argument('--full', action='store_true',
                        help='Extract entire manual (all pages)')
    
    args = parser.parse_args()
    
    ensure_directories()
    
    if args.review:
        review_mode()
        return
    
    if args.correction:
        correction_mode(args.correction)
        return
    
    if args.assemble:
        assemble_final_output()
        return
    
    # Get total pages if not specified
    if args.end is None:
        if args.full:
            args.end = get_pdf_page_count()
        else:
            # Default to first 50 pages if not specified
            args.end = min(50, get_pdf_page_count())
    
    # Process in batches
    current = args.start
    while current <= args.end:
        batch_end = min(current + args.batch - 1, args.end)
        extract_batch(current, batch_end, args.batch)
        current = batch_end + 1
    
    # Assemble final output
    assemble_final_output()
    
    print("\n" + "="*60)
    print("EXTRACTION COMPLETE")
    print("="*60)
    print(f"\nOutput files:")
    print(f"  Final text: {FINAL_OUTPUT}")
    print(f"  Review list: {REVIEW_FILE}")
    print(f"  Metadata: {METADATA_FILE}")
    print(f"\nUse --review to see flagged pages")
    print(f"Use --correction <pages> to fix specific pages")
    print(f"Use --assemble to regenerate final output after corrections")


if __name__ == '__main__':
    main()
