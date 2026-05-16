#!/usr/bin/env python3
"""Extract metadata from a manual file (PDF or HTML download page).

Handles two cases:
  1. Real PDF files — uses pdfinfo if available, falls back to pypdf.
  2. HTML download pages — parses meta tags and page content for metadata.

Usage:
    python3 scripts/extract_pdf_metadata.py <filepath> [output_file]

If output_file is omitted, writes to stdout.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from dataclasses import dataclass, field, asdict
from html.parser import HTMLParser
from pathlib import Path
from typing import Optional


# ---------------------------------------------------------------------------
# Data model
# ---------------------------------------------------------------------------

@dataclass
class PDFMetadata:
    """Structured metadata extracted from a PDF or HTML download page."""

    filename: str = ""
    filepath: str = ""
    file_size_bytes: int = 0
    file_type_detected: str = ""  # e.g. "PDF", "HTML"
    title: str = ""
    author: str = ""
    creator: str = ""
    producer: str = ""
    page_count: int = 0
    creation_date: str = ""
    modification_date: str = ""
    source_url: str = ""
    language: str = ""
    keywords: str = ""
    description: str = ""
    subject: str = ""
    notes: list[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return asdict(self)


# ---------------------------------------------------------------------------
# PDF parsing helpers
# ---------------------------------------------------------------------------

def _try_pdfinfo(filepath: str) -> Optional[dict]:
    """Run pdfinfo and parse its output. Returns dict or None on failure."""
    try:
        result = subprocess.run(
            ["pdfinfo", filepath],
            capture_output=True,
            text=True,
            timeout=30,
        )
        if result.returncode != 0:
            return None
        info: dict = {}
        for line in result.stdout.splitlines():
            if ":" in line:
                key, _, value = line.partition(":")
                info[key.strip().lower().replace(" ", "_")] = value.strip()
        return info
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return None


def _try_pypdf(filepath: str) -> Optional[dict]:
    """Use pypdf to read metadata. Returns dict or None on failure."""
    try:
        import pypdf  # type: ignore[import-untyped]

        reader = pypdf.PdfReader(filepath)
        meta = reader.metadata or {}
        return {
            "page_count": len(reader.pages),
            "title": _meta_val(meta, "/Title"),
            "author": _meta_val(meta, "/Author"),
            "creator": _meta_val(meta, "/Creator"),
            "producer": _meta_val(meta, "/Producer"),
            "creation_date": _meta_val(meta, "/CreationDate"),
            "modification_date": _meta_val(meta, "/ModDate"),
        }
    except Exception:
        return None


def _meta_val(meta: dict, key: str) -> str:
    """Safely get a metadata value."""
    val = meta.get(key)
    return str(val) if val else ""


def parse_pdf(filepath: str) -> PDFMetadata:
    """Parse a real PDF file using available tools."""
    meta = PDFMetadata(
        filename=os.path.basename(filepath),
        filepath=filepath,
        file_size_bytes=os.path.getsize(filepath),
        file_type_detected="PDF",
    )

    # Try pdfinfo first (faster, richer output)
    pdfinfo = _try_pdfinfo(filepath)
    if pdfinfo:
        meta.page_count = int(pdfinfo.get("pages", 0))
        meta.title = pdfinfo.get("title", "")
        meta.author = pdfinfo.get("author", "")
        meta.creator = pdfinfo.get("creator", "")
        meta.producer = pdfinfo.get("producer", "")
        meta.creation_date = pdfinfo.get("creation_date", "")
        meta.modification_date = pdfinfo.get("mod_date", "")
        meta.notes.append("Metadata extracted via pdfinfo")
    else:
        # Fallback to pypdf
        pypdf_meta = _try_pypdf(filepath)
        if pypdf_meta:
            meta.page_count = pypdf_meta.get("page_count", 0)
            meta.title = pypdf_meta.get("title", "")
            meta.author = pypdf_meta.get("author", "")
            meta.creator = pypdf_meta.get("creator", "")
            meta.producer = pypdf_meta.get("producer", "")
            meta.creation_date = pypdf_meta.get("creation_date", "")
            meta.modification_date = pypdf_meta.get("modification_date", "")
            meta.notes.append("Metadata extracted via pypdf fallback")
        else:
            meta.notes.append("Could not extract PDF metadata — pdfinfo and pypdf both failed")

    return meta


# ---------------------------------------------------------------------------
# HTML parsing helpers
# ---------------------------------------------------------------------------

class ManualPageParser(HTMLParser):
    """Extract metadata from a manual download HTML page."""

    def __init__(self) -> None:
        super().__init__()
        self.meta_tags: dict[str, str] = {}
        self.current_tag: str = ""
        self.current_attr: str = ""
        self.current_content: str = ""
        self.in_title: bool = False
        self.title_text: str = ""
        self.in_preview: bool = False
        self.preview_text: str = ""
        self.depth: int = 0
        self.found_page_count: Optional[int] = None
        self.found_file_size: Optional[str] = None
        # Accumulate text near "pages" keyword for cross-element matching
        self._pending_digits: str = ""
        self._in_number_span: bool = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, Optional[str]]]) -> None:
        self.current_tag = tag
        lower_attrs = {k.lower(): v for k, v in attrs}

        if tag == "title":
            self.in_title = True
            self.title_text = ""

        if tag == "meta":
            name = lower_attrs.get("name", "").lower()
            prop = lower_attrs.get("property", "").lower()
            content = lower_attrs.get("content", "")
            if name:
                self.meta_tags[name] = content
            elif prop:
                # property="og:url" → key="og:url" (not "og:og:url")
                self.meta_tags[prop] = content

        if tag == "a":
            href = lower_attrs.get("href", "")
            if "manual_download_act.php" in str(href):
                self.meta_tags["download_action_url"] = href
        # Track spans that might contain page count numbers
        if tag == "span":
            style = " ".join(f'{k}={v}' for k, v in attrs).lower()
            if "font-weight: bold" in style or "font-weight:bold" in style:
                self._in_number_span = True
                self._pending_digits = ""

        if tag in ("div", "span", "p", "strong", "br"):
            self.depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False
        if tag == "span" and self._in_number_span:
            self._in_number_span = False
            # Do NOT clear _pending_digits here — wait for next text chunk
            # to see if "pages" follows
        if tag in ("div", "span", "p", "strong"):
            self.depth -= 1

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_text += data

        stripped = data.strip()

        # Capture page count — accumulate digits from bold spans
        # and look for "pages" keyword in subsequent text
        if self.found_page_count is None:
            if self._in_number_span:
                # Collect digits (and spaces used as thousands separators)
                digits = re.sub(r"[^\d ]", "", stripped)
                if digits:
                    self._pending_digits += digits
            elif self._pending_digits:
                # We had digits from a previous span; check if this text has "pages"
                if re.search(r"\bpages?\b", stripped, re.IGNORECASE):
                    self.found_page_count = int(self._pending_digits.replace(" ", ""))
                    self._pending_digits = ""
                else:
                    # Not a page count — clear
                    self._pending_digits = ""
            else:
                # Fallback: direct match in same text
                match = re.search(r"(\d[\d\s]*)\s*pages?", stripped, re.IGNORECASE)
                if match:
                    self.found_page_count = int(match.group(1).replace(" ", ""))

        # Capture file size from patterns like "38.2 MB"
        if self.found_file_size is None:
            match = re.search(r"(\d+\.?\d*\s*[KMGT]?B)", stripped, re.IGNORECASE)
            if match:
                self.found_file_size = match.group(1).strip()


def parse_html_manual_page(filepath: str) -> PDFMetadata:
    """Parse an HTML download page for manual metadata."""
    with open(filepath, "r", encoding="utf-8", errors="replace") as f:
        html_content = f.read()

    parser = ManualPageParser()
    parser.feed(html_content)

    meta = PDFMetadata(
        filename=os.path.basename(filepath),
        filepath=filepath,
        file_size_bytes=os.path.getsize(filepath),
        file_type_detected="HTML",
        title=parser.title_text.strip(),
        page_count=parser.found_page_count or 0,
        source_url=_extract_source_url(parser.meta_tags),
        language=parser.meta_tags.get("language", "en"),
        keywords=parser.meta_tags.get("keywords", ""),
        description=parser.meta_tags.get("description", ""),
        notes=[
            "File is an HTML download page, NOT a PDF",
            "Metadata extracted from HTML meta tags and page content",
            f"Source URL: {parser.meta_tags.get('og:url', 'N/A')}",
        ],
    )

    # Map meta tags to standard fields
    meta.author = parser.meta_tags.get("author", "")
    meta.creation_date = parser.meta_tags.get("copyright", "")
    meta.subject = parser.meta_tags.get("abstract", "")

    # The actual PDF size is listed on the page (e.g., "38.2 MB")
    if parser.found_file_size:
        meta.notes.append(f"Listed PDF size on page: {parser.found_file_size}")

    # Check if we found a page count reference
    if parser.found_page_count:
        meta.notes.append(f"Listed page count on page: {parser.found_page_count}")

    return meta


def _extract_source_url(meta_tags: dict[str, str]) -> str:
    """Extract the canonical URL from meta tags."""
    return (
        meta_tags.get("og:url", "")
        or meta_tags.get("canonical", "")
        or ""
    )


# ---------------------------------------------------------------------------
# File type detection
# ---------------------------------------------------------------------------

def detect_file_type(filepath: str) -> str:
    """Detect the actual file type using the `file` command and magic bytes."""
    # Check magic bytes first
    try:
        with open(filepath, "rb") as f:
            header = f.read(512)
        if header.startswith(b"%PDF"):
            return "PDF"
        if b"<!DOCTYPE" in header[:2048] or b"<html" in header[:2048].lower():
            return "HTML"
    except OSError:
        pass

    # Fall back to `file` command
    try:
        result = subprocess.run(
            ["file", "--brief", filepath],
            capture_output=True,
            text=True,
            timeout=10,
        )
        mime = result.stdout.strip().lower()
        if "pdf" in mime:
            return "PDF"
        if "html" in mime or "text" in mime:
            return "HTML"
    except (FileNotFoundError, subprocess.TimeoutExpired):
        pass

    return "unknown"


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------

def extract_metadata(filepath: str) -> PDFMetadata:
    """Public API: extract metadata from a file regardless of type."""
    file_type = detect_file_type(filepath)

    if file_type == "PDF":
        return parse_pdf(filepath)
    elif file_type == "HTML":
        return parse_html_manual_page(filepath)
    else:
        return PDFMetadata(
            filename=os.path.basename(filepath),
            filepath=filepath,
            file_size_bytes=os.path.getsize(filepath),
            file_type_detected="unknown",
            notes=["Could not determine file type; skipping metadata extraction"],
        )


def format_markdown(meta: PDFMetadata) -> str:
    """Format metadata as a markdown table suitable for manual-metadata.md."""
    lines = [
        "# Manual Metadata",
        "",
        f"**File:** `{meta.filename}`",
        f"**Path:** `{meta.filepath}`",
        f"**Detected Type:** `{meta.file_type_detected}`",
        f"**File Size:** {meta.file_size_bytes:,} bytes ({_human_size(meta.file_size_bytes)})",
        "",
        "## Extracted Metadata",
        "",
        "| Field | Value |",
        "|-------|-------|",
    ]

    fields = [
        ("Title", meta.title),
        ("Author", meta.author),
        ("Creator", meta.creator),
        ("Producer", meta.producer),
        ("Page Count", str(meta.page_count) if meta.page_count else "N/A"),
        ("Creation Date", meta.creation_date),
        ("Modification Date", meta.modification_date),
        ("Source URL", meta.source_url),
        ("Language", meta.language),
        ("Keywords", meta.keywords),
        ("Description", meta.description),
        ("Subject", meta.subject),
    ]

    for label, value in fields:
        display = value if value else "N/A"
        lines.append(f"| {label} | {display} |")

    if meta.notes:
        lines.extend(["", "## Notes", ""])
        for note in meta.notes:
            lines.append(f"- {note}")

    lines.append("")
    return "\n".join(lines)


def _human_size(size_bytes: int) -> str:
    """Convert bytes to human-readable size string."""
    for unit in ("B", "KB", "MB", "GB"):
        if size_bytes < 1024:
            return f"{size_bytes:.1f} {unit}"
        size_bytes /= 1024
    return f"{size_bytes:.1f} TB"


def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: extract_pdf_metadata.py <filepath> [output_file]", file=sys.stderr)
        sys.exit(1)

    filepath = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) > 2 else None

    if not os.path.isfile(filepath):
        print(f"Error: File not found: {filepath}", file=sys.stderr)
        sys.exit(1)

    meta = extract_metadata(filepath)

    if output_file:
        os.makedirs(os.path.dirname(output_file) or ".", exist_ok=True)
        with open(output_file, "w", encoding="utf-8") as f:
            f.write(format_markdown(meta))
        print(f"Metadata written to {output_file}")
    else:
        print(format_markdown(meta))

    # Also output JSON for programmatic use
    print(json.dumps(meta.to_dict(), indent=2), file=sys.stderr)


if __name__ == "__main__":
    main()
