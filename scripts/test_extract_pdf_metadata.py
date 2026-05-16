#!/usr/bin/env python3
"""Tests for extract_pdf_metadata.py — uses only stdlib (unittest).

Run:  python3 scripts/test_extract_pdf_metadata.py
"""

from __future__ import annotations

import json
import os
import subprocess
import tempfile
import textwrap
import unittest
from pathlib import Path

# Ensure parent dir is on sys.path so we can import the module
_SCRIPTS_DIR = Path(__file__).resolve().parent
sys_path_backup = __import__("sys").path[:]
if str(_SCRIPTS_DIR) not in __import__("sys").path:
    __import__("sys").path.insert(0, str(_SCRIPTS_DIR))

from extract_pdf_metadata import (  # noqa: E402
    PDFMetadata,
    detect_file_type,
    extract_metadata,
    format_markdown,
    parse_html_manual_page,
    _human_size,
)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _write_tmp(content: str, suffix: str = ".html") -> str:
    """Write *content* to a temp file and return its path."""
    fd, path = tempfile.mkstemp(suffix=suffix)
    with os.fdopen(fd, "w", encoding="utf-8") as fh:
        fh.write(content)
    return path


# ---------------------------------------------------------------------------
# Tests: detect_file_type
# ---------------------------------------------------------------------------

class TestDetectFileType(unittest.TestCase):
    def test_html_doctype(self) -> None:
        path = _write_tmp("<!DOCTYPE html><html>")
        self.assertEqual(detect_file_type(path), "HTML")

    def test_html_lowercase(self) -> None:
        path = _write_tmp("<html><body>hello</body></html>")
        self.assertEqual(detect_file_type(path), "HTML")

    def test_text_plain(self) -> None:
        path = _write_tmp("just plain text\n")
        self.assertEqual(detect_file_type(path), "HTML")  # falls through to `file` cmd

    def test_nonexistent(self) -> None:
        """Missing file falls through to `file` cmd → returns 'unknown'."""
        self.assertEqual(detect_file_type("/nonexistent/file.xyz"), "unknown")


# ---------------------------------------------------------------------------
# Tests: parse_html_manual_page — page count detection
# ---------------------------------------------------------------------------

class TestHtmlPageCount(unittest.TestCase):
    """Verify that the cross-span page-count accumulator works."""

    def _make_page(self, body: str) -> str:
        return f"<html><body>{body}</body></html>"

    def test_spans_with_space_separator(self) -> None:
        """'1 408' in bold span + 'pages' in following text."""
        html = self._make_page(
            '<span style="font-weight: bold;">1 408</span> pages'
        )
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertEqual(meta.page_count, 1408)

    def test_no_space_thousands(self) -> None:
        html = self._make_page(
            '<span style="font-weight: bold;">1408</span> pages'
        )
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertEqual(meta.page_count, 1408)

    def test_no_pages_keyword(self) -> None:
        html = self._make_page('<span style="font-weight: bold;">1408</span>')
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertEqual(meta.page_count, 0)

    def test_direct_match_same_text(self) -> None:
        """Fallback: digits and 'pages' in same chunk."""
        html = self._make_page("This manual has 500 pages.")
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertEqual(meta.page_count, 500)


# ---------------------------------------------------------------------------
# Tests: parse_html_manual_page — metadata extraction
# ---------------------------------------------------------------------------

class TestHtmlMetadata(unittest.TestCase):
    def test_source_url_from_og(self) -> None:
        html = textwrap.dedent("""\
        <html><head>
        <meta property="og:url" content="https://example.com/manual?id=42">
        </head><body></body></html>""")
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertEqual(meta.source_url, "https://example.com/manual?id=42")

    def test_author_from_meta_name(self) -> None:
        html = '<html><head><meta name="author" content="Jane Doe"></head><body></body></html>'
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertEqual(meta.author, "Jane Doe")

    def test_language_default(self) -> None:
        html = "<html><body></body></html>"
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertEqual(meta.language, "en")

    def test_description_from_meta(self) -> None:
        html = '<html><head><meta name="description" content="A repair manual"></head><body></body></html>'
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertIn("repair manual", meta.description.lower())

    def test_file_type_detected_as_html(self) -> None:
        html = "<html><body></body></html>"
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertEqual(meta.file_type_detected, "HTML")

    def test_notes_indicate_not_pdf(self) -> None:
        html = "<html><body></body></html>"
        path = _write_tmp(html)
        meta = parse_html_manual_page(path)
        self.assertTrue(any("NOT a PDF" in n or "not a PDF" in n for n in meta.notes))


# ---------------------------------------------------------------------------
# Tests: extract_metadata (public API)
# ---------------------------------------------------------------------------

class TestExtractMetadata(unittest.TestCase):
    def test_html_input(self) -> None:
        html = "<html><body>test</body></html>"
        path = _write_tmp(html)
        meta = extract_metadata(path)
        self.assertEqual(meta.file_type_detected, "HTML")

    def test_unknown_extension(self) -> None:
        path = _write_tmp("some data")
        meta = extract_metadata(path)
        # Should still work (falls back to `file` command → HTML/text)
        self.assertIsInstance(meta, PDFMetadata)


# ---------------------------------------------------------------------------
# Tests: format_markdown
# ---------------------------------------------------------------------------

class TestFormatMarkdown(unittest.TestCase):
    def test_contains_header(self) -> None:
        meta = PDFMetadata(filename="test.pdf", file_type_detected="HTML", page_count=100)
        md = format_markdown(meta)
        self.assertIn("# Manual Metadata", md)

    def test_contains_table(self) -> None:
        meta = PDFMetadata(filename="test.pdf", file_type_detected="HTML", page_count=100)
        md = format_markdown(meta)
        self.assertIn("| Field | Value |", md)
        self.assertIn("| Page Count | 100 |", md)

    def test_contains_notes(self) -> None:
        meta = PDFMetadata(
            filename="test.pdf",
            file_type_detected="HTML",
            notes=["Note one", "Note two"],
        )
        md = format_markdown(meta)
        self.assertIn("- Note one", md)
        self.assertIn("- Note two", md)

    def test_n_a_for_empty_fields(self) -> None:
        meta = PDFMetadata(filename="test.pdf", file_type_detected="HTML")
        md = format_markdown(meta)
        self.assertIn("| N/A |", md)


# ---------------------------------------------------------------------------
# Tests: _human_size
# ---------------------------------------------------------------------------

class TestHumanSize(unittest.TestCase):
    def test_bytes(self) -> None:
        self.assertEqual(_human_size(512), "512.0 B")

    def test_kilobytes(self) -> None:
        self.assertEqual(_human_size(1024), "1.0 KB")

    def test_megabytes(self) -> None:
        self.assertAlmostEqual(float(_human_size(1048576).split()[0]), 1.0, places=1)

    def test_large(self) -> None:
        result = _human_size(1024 ** 4)
        self.assertIn("TB", result)


# ---------------------------------------------------------------------------
# Tests: JSON output round-trip
# ---------------------------------------------------------------------------

class TestJSONRoundTrip(unittest.TestCase):
    def test_to_dict_and_back(self) -> None:
        meta = PDFMetadata(
            filename="manual.pdf",
            filepath="/data/h22/manual.pdf",
            file_size_bytes=59423,
            file_type_detected="HTML",
            title="Test Manual",
            author="Author X",
            page_count=42,
            source_url="https://example.com",
            language="en",
            notes=["note1"],
        )
        d = meta.to_dict()
        self.assertEqual(d["filename"], "manual.pdf")
        self.assertEqual(d["page_count"], 42)
        # Verify it's valid JSON
        json_str = json.dumps(d)
        parsed = json.loads(json_str)
        self.assertEqual(parsed["page_count"], 42)


# ---------------------------------------------------------------------------
# Tests: CLI integration
# ---------------------------------------------------------------------------

class TestCLI(unittest.TestCase):
    def test_cli_writes_file(self) -> None:
        html = "<html><body><span style='font-weight: bold;'>100</span> pages</body></html>"
        path = _write_tmp(html)
        out_path = path + ".md"
        try:
            result = subprocess.run(
                ["python3", str(_SCRIPTS_DIR / "extract_pdf_metadata.py"), path, out_path],
                capture_output=True,
                text=True,
                timeout=30,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            self.assertTrue(os.path.isfile(out_path))
            with open(out_path) as fh:
                content = fh.read()
            self.assertIn("# Manual Metadata", content)
            self.assertIn("100", content)
        finally:
            for p in (path, out_path):
                if os.path.isfile(p):
                    os.unlink(p)

    def test_cli_missing_arg(self) -> None:
        result = subprocess.run(
            ["python3", str(_SCRIPTS_DIR / "extract_pdf_metadata.py")],
            capture_output=True,
            text=True,
            timeout=10,
        )
        self.assertNotEqual(result.returncode, 0)


# ---------------------------------------------------------------------------
# Runner
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    unittest.main()
