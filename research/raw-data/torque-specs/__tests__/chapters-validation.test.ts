/**
 * Tests for chapters.json — chapter-to-page-range mapping.
 *
 * Validates JSON structure, required fields, enum values, page range
 * consistency, and cross-references against the manual PDF page counts.
 */

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

// Expected BB6 manual total pages (from pdfinfo)
const BB6_TOTAL_PAGES = 1376;
// Expected OBD1 manual total pages (from pdfinfo)
const OBD1_TOTAL_PAGES = 1408;

// Valid system values per SCHEMA.md role taxonomy
const VALID_SYSTEMS = new Set(["engine", "drivetrain", "chassis", "body"]);

// Valid chapter entries
type ChapterEntry = {
  id: string;
  chapter_name: string;
  system: string;
  page_start: number;
  page_end: number;
};

type ChaptersData = {
  BB6: ChapterEntry[];
  OBD1: ChapterEntry[];
};

function loadChapters(): ChaptersData {
  const raw = readFileSync(join(ROOT, "chapters.json"), "utf8");
  return JSON.parse(raw);
}

// ===========================================================================
// chapters.json — valid structure
// ===========================================================================

describe("chapters.json — valid structure", () => {
  const chapters = loadChapters();

  it("has exactly two top-level keys: BB6 and OBD1", () => {
    const keys = Object.keys(chapters);
    expect(keys).toHaveLength(2);
    expect(keys).toContain("BB6");
    expect(keys).toContain("OBD1");
  });

  it("BB6 is a non-empty array", () => {
    expect(Array.isArray(chapters.BB6)).toBe(true);
    expect(chapters.BB6.length).toBeGreaterThan(0);
  });

  it("OBD1 is a non-empty array", () => {
    expect(Array.isArray(chapters.OBD1)).toBe(true);
    expect(chapters.OBD1.length).toBeGreaterThan(0);
  });
});

// ===========================================================================
// chapters.json — chapter entry schema
// ===========================================================================

describe("chapters.json — chapter entry schema", () => {
  const chapters = loadChapters();

  function validateChapter(ch: ChapterEntry, manual: string): void {
    const prefix = `${manual}/${ch.id}`;
    expect(typeof ch.id).toBe("string");
    expect(ch.id.length).toBeGreaterThan(0);
    expect(typeof ch.chapter_name).toBe("string");
    expect(ch.chapter_name.length).toBeGreaterThan(0);
    expect(VALID_SYSTEMS.has(ch.system)).toBe(true);
    expect(Number.isInteger(ch.page_start)).toBe(true);
    expect(ch.page_start).toBeGreaterThanOrEqual(1);
    expect(Number.isInteger(ch.page_end)).toBe(true);
    expect(ch.page_end).toBeGreaterThanOrEqual(ch.page_start);
  }

  it("all BB6 chapters have valid schema", () => {
    for (const ch of chapters.BB6) {
      validateChapter(ch, "BB6");
    }
  });

  it("all OBD1 chapters have valid schema", () => {
    for (const ch of chapters.OBD1) {
      validateChapter(ch, "OBD1");
    }
  });
});

// ===========================================================================
// BB6 — mechanical chapters only
// ===========================================================================

describe("chapters.json — BB6 mechanical chapters", () => {
  const chapters = loadChapters();

  it("includes engine system chapters", () => {
    const engineChapters = chapters.BB6.filter((c) => c.system === "engine");
    expect(engineChapters.length).toBeGreaterThanOrEqual(3);
    const names = engineChapters.map((c) => c.id);
    expect(names.some((n) => n.includes("engine"))).toBe(true);
  });

  it("includes drivetrain system chapters", () => {
    const dtChapters = chapters.BB6.filter((c) => c.system === "drivetrain");
    expect(dtChapters.length).toBeGreaterThanOrEqual(2);
  });

  it("includes chassis system chapters", () => {
    const chassisChapters = chapters.BB6.filter((c) => c.system === "chassis");
    expect(chassisChapters.length).toBeGreaterThanOrEqual(2);
  });

  it("includes body/HVAC system chapters", () => {
    const bodyChapters = chapters.BB6.filter((c) => c.system === "body");
    expect(bodyChapters.length).toBeGreaterThanOrEqual(1);
  });

  it("does not include pure-wiring chapters", () => {
    for (const ch of chapters.BB6) {
      expect(ch.chapter_name.toLowerCase()).not.toContain("pure-wiring");
      expect(ch.chapter_name.toLowerCase()).not.toContain("wiring-diagram-only");
    }
  });

  it("page ranges are within BB6 manual bounds (1–1376)", () => {
    for (const ch of chapters.BB6) {
      expect(ch.page_start).toBeGreaterThanOrEqual(1);
      expect(ch.page_end).toBeLessThanOrEqual(BB6_TOTAL_PAGES);
    }
  });

  it("has at least 10 chapters", () => {
    expect(chapters.BB6.length).toBeGreaterThanOrEqual(10);
  });
});

// ===========================================================================
// OBD1 — engine chapters only
// ===========================================================================

describe("chapters.json — OBD1 engine chapters", () => {
  const chapters = loadChapters();

  it("all OBD1 chapters are engine system", () => {
    for (const ch of chapters.OBD1) {
      expect(ch.system).toBe("engine");
    }
  });

  it("includes Engine chapter", () => {
    const ids = chapters.OBD1.map((c) => c.id);
    expect(ids.some((n) => n.includes("engine") && !n.includes("emission"))).toBe(true);
  });

  it("includes Cooling chapter", () => {
    const ids = chapters.OBD1.map((c) => c.id);
    expect(ids.some((n) => n.includes("cooling"))).toBe(true);
  });

  it("includes Fuel and Emissions chapter", () => {
    const ids = chapters.OBD1.map((c) => c.id);
    expect(ids.some((n) => n.includes("fuel") || n.includes("emission"))).toBe(true);
  });

  it("page ranges are within OBD1 manual bounds (1–1408)", () => {
    for (const ch of chapters.OBD1) {
      expect(ch.page_start).toBeGreaterThanOrEqual(1);
      expect(ch.page_end).toBeLessThanOrEqual(OBD1_TOTAL_PAGES);
    }
  });

  it("has at least 3 chapters", () => {
    expect(chapters.OBD1.length).toBeGreaterThanOrEqual(3);
  });
});

// ===========================================================================
// Page range consistency
// ===========================================================================

describe("chapters.json — page range consistency", () => {
  const chapters = loadChapters();

  it("no overlapping page ranges within BB6", () => {
    const bb6 = [...chapters.BB6].sort((a, b) => a.page_start - b.page_start);
    for (let i = 0; i < bb6.length - 1; i++) {
      const curr = bb6[i];
      const next = bb6[i + 1];
      expect(curr.page_end).toBeLessThan(next.page_start);
    }
  });

  it("no overlapping page ranges within OBD1", () => {
    const obd1 = [...chapters.OBD1].sort((a, b) => a.page_start - b.page_start);
    for (let i = 0; i < obd1.length - 1; i++) {
      const curr = obd1[i];
      const next = obd1[i + 1];
      expect(curr.page_end).toBeLessThan(next.page_start);
    }
  });

  it("all page_start values are unique within each manual", () => {
    const bb6Starts = chapters.BB6.map((c) => c.page_start);
    const obd1Starts = chapters.OBD1.map((c) => c.page_start);
    expect(bb6Starts.length).toBe(new Set(bb6Starts).size);
    expect(obd1Starts.length).toBe(new Set(obd1Starts).size);
  });

  it("chapter IDs are unique within each manual", () => {
    const bb6Ids = chapters.BB6.map((c) => c.id);
    const obd1Ids = chapters.OBD1.map((c) => c.id);
    expect(bb6Ids.length).toBe(new Set(bb6Ids).size);
    expect(obd1Ids.length).toBe(new Set(obd1Ids).size);
  });
});

// ===========================================================================
// ID naming conventions
// ===========================================================================

describe("chapters.json — ID naming conventions", () => {
  const chapters = loadChapters();

  it("BB6 chapter IDs follow {manual}.{chapter} pattern", () => {
    for (const ch of chapters.BB6) {
      expect(/^bb6\.[a-z0-9-]+$/.test(ch.id)).toBe(true);
    }
  });

  it("OBD1 chapter IDs follow {manual}.{chapter} pattern", () => {
    for (const ch of chapters.OBD1) {
      expect(/^obd1\.[a-z0-9-]+$/.test(ch.id)).toBe(true);
    }
  });
});
