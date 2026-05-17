/**
 * Tests for schema enrichment preprocessor (enrichAndNormalizeRow).
 *
 * Covers envelope unwrapping, field-name normalization, type coercion,
 * null→default handling, and lubrication normalization.
 */

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  enrichAndNormalizeRow,
  unwrapEnvelope,
  normalizeFieldNames,
  coercePage,
  normalizeLubrication,
} from "../schema-validator.mjs";

// ===========================================================================
// unwrapEnvelope — envelope detection
// ===========================================================================

describe("unwrapEnvelope", () => {
  it("returns row as-is when it looks like a canonical row", () => {
    const row = {
      id: "test",
      source: { manual: "BB6", page: 1 },
      system: "engine",
      assembly: "test",
      fastener_name: "bolt",
      thread: {},
      qty: 1,
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 10 }] },
      oem: true,
    };
    const result = unwrapEnvelope(row);
    assert.strictEqual(result, row);
  });

  it("unwraps { fasteners: [...] } envelope", () => {
    const wrapped = { fasteners: [{ id: "f1" }, { id: "f2" }] };
    const result = unwrapEnvelope(wrapped);
    assert.ok(Array.isArray(result));
    assert.strictEqual(result.length, 2);
    assert.strictEqual(result[0].id, "f1");
  });

  it("unwraps { analysis, findings, output: [...] } envelope", () => {
    const wrapped = { analysis: "text", findings: [], output: [{ id: "f1" }] };
    const result = unwrapEnvelope(wrapped);
    assert.ok(Array.isArray(result));
    assert.strictEqual(result[0].id, "f1");
  });

  it("unwraps { data: [...] } envelope", () => {
    const wrapped = { data: [{ id: "d1" }] };
    const result = unwrapEnvelope(wrapped);
    assert.ok(Array.isArray(result));
    assert.strictEqual(result[0].id, "d1");
  });

  it("unwraps { results: [...] } envelope", () => {
    const wrapped = { results: [{ id: "r1" }] };
    const result = unwrapEnvelope(wrapped);
    assert.ok(Array.isArray(result));
    assert.strictEqual(result[0].id, "r1");
  });

  it("unwraps { extracted: [...] } envelope", () => {
    const wrapped = { extracted: [{ id: "e1" }] };
    const result = unwrapEnvelope(wrapped);
    assert.ok(Array.isArray(result));
    assert.strictEqual(result[0].id, "e1");
  });

  it("unwraps { fasteners_found, output, reasoning } envelope", () => {
    const wrapped = {
      fasteners_found: [{ id: "ff1" }],
      output: [],
      reasoning: "...",
    };
    const result = unwrapEnvelope(wrapped);
    assert.ok(Array.isArray(result));
    assert.strictEqual(result[0].id, "ff1");
  });

  it("returns empty array for { fasteners: [] }", () => {
    const wrapped = { fasteners: [] };
    const result = unwrapEnvelope(wrapped);
    assert.ok(Array.isArray(result));
    assert.strictEqual(result.length, 0);
  });

  it("returns non-array values as-is", () => {
    assert.strictEqual(unwrapEnvelope("string"), "string");
    assert.strictEqual(unwrapEnvelope(42), 42);
    assert.strictEqual(unwrapEnvelope(null), null);
    assert.strictEqual(unwrapEnvelope(undefined), undefined);
  });
});

// ===========================================================================
// normalizeFieldNames — alias mapping
// ===========================================================================

describe("normalizeFieldNames", () => {
  it("maps fastener -> fastener_name", () => {
    const row = { fastener: "Test bolt" };
    const result = normalizeFieldNames(row);
    assert.strictEqual(result.fastener_name, "Test bolt");
    assert.ok(!("fastener" in result));
  });

  it("moves top-level manual into source.manual", () => {
    const row = { manual: "OBD1", page: 1200 };
    const result = normalizeFieldNames(row);
    assert.deepStrictEqual(result.source, { manual: "OBD1", page: 1200 });
    assert.ok(!("manual" in result));
    assert.ok(!("page" in result));
  });

  it("handles applies_to aliases (trans, trim, my)", () => {
    const row = { trans: "M/T", trim: "SH", my: "1997" };
    const result = normalizeFieldNames(row);
    assert.deepStrictEqual(result.applies_to, {
      trans: "M/T",
      trim: "SH",
      my: "1997",
    });
  });

  it("handles thread field aliases", () => {
    const row = { nominal_mm: 10, pitch_mm: 1.25, grade: "12.9" };
    const result = normalizeFieldNames(row);
    assert.deepStrictEqual(result.thread, {
      nominal_mm: 10,
      pitch_mm: 1.25,
      grade: "12.9",
    });
  });

  it("preserves unknown fields as-is", () => {
    const row = { foo: "bar", baz: 42 };
    const result = normalizeFieldNames(row);
    assert.strictEqual(result.foo, "bar");
    assert.strictEqual(result.baz, 42);
  });

  it("handles torque_value alias", () => {
    const row = { torque_value: 39 };
    const result = normalizeFieldNames(row);
    assert.deepStrictEqual(result.torque, { steps: [{ pass: 1, nm: 39 }] });
  });
});

// ===========================================================================
// coercePage — string/float → int
// ===========================================================================

describe("coercePage", () => {
  it("passes through valid integers", () => {
    assert.strictEqual(coercePage(136), 136);
  });

  it("converts string numbers to integers", () => {
    assert.strictEqual(coercePage("136"), 136);
  });

  it("converts floats to floor", () => {
    assert.strictEqual(coercePage(136.7), 136);
  });

  it("returns 0 for null/undefined", () => {
    assert.strictEqual(coercePage(null), 0);
    assert.strictEqual(coercePage(undefined), 0);
  });

  it("returns 0 for non-numeric strings", () => {
    assert.strictEqual(coercePage("abc"), 0);
  });

  it("returns 0 for negative numbers", () => {
    assert.strictEqual(coercePage(-5), 0);
  });
});

// ===========================================================================
// normalizeLubrication — free-text → valid enum
// ===========================================================================

describe("normalizeLubrication", () => {
  it("passes through valid enum values", () => {
    assert.strictEqual(normalizeLubrication("dry"), "dry");
    assert.strictEqual(normalizeLubrication("oiled"), "oiled");
    assert.strictEqual(normalizeLubrication("loctite"), "loctite");
  });

  it("normalizes grease -> oiled", () => {
    assert.strictEqual(normalizeLubrication("grease"), "oiled");
  });

  it("normalizes anti-seize -> oiled", () => {
    assert.strictEqual(normalizeLubrication("anti-seize"), "oiled");
    assert.strictEqual(normalizeLubrication("Anti-Seize Compound"), "oiled");
  });

  it("normalizes sealant: patterns", () => {
    assert.strictEqual(normalizeLubrication("sealant:liquid gasket"), "oiled");
    assert.strictEqual(
      normalizeLubrication("sealant:Noxrust 124B"),
      "sealant:noxrust 124b",
    );
    assert.strictEqual(
      normalizeLubrication("sealant:RTF1403"),
      "sealant:rtf1403",
    );
    assert.strictEqual(normalizeLubrication("sealant:liquid-gasket"), "oiled");
    assert.strictEqual(normalizeLubrication("sealant:P/N 08718-0001"), "oiled");
  });

  it("defaults null/undefined/empty to dry", () => {
    assert.strictEqual(normalizeLubrication(null), "dry");
    assert.strictEqual(normalizeLubrication(undefined), "dry");
    assert.strictEqual(normalizeLubrication(""), "dry");
  });

  it("normalizes threadlock -> loctite", () => {
    assert.strictEqual(normalizeLubrication("threadlocker"), "loctite");
  });
});

// ===========================================================================
// enrichAndNormalizeRow — full pipeline
// ===========================================================================

describe("enrichAndNormalizeRow", () => {
  it("rejects non-object input", () => {
    const r = enrichAndNormalizeRow("string");
    assert.strictEqual(r.success, false);
    assert.ok(r.error.includes("not an object"));
  });

  it("rejects null input", () => {
    const r = enrichAndNormalizeRow(null);
    assert.strictEqual(r.success, false);
  });

  it("unwraps { fasteners: [...] } and takes first item", () => {
    const raw = {
      fasteners: [
        {
          id: "BB6-p1-test",
          source: { manual: "BB6", page: "100" },
          system: "engine",
          assembly: "test",
          fastener_name: "bolt",
          thread: { nominal_mm: 10, pitch_mm: 1.25 },
          qty: 1,
          role: "cap-screw",
          torque: { steps: [{ pass: 1, nm: 30 }] },
          oem: true,
        },
      ],
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.id, "BB6-p1-test");
    assert.strictEqual(r.data.source.page, 100); // coerced to number
  });

  it("coerces string page to number", () => {
    const raw = {
      id: "t1",
      source: { manual: "BB6", page: "6617" },
      system: "engine",
      assembly: "a",
      fastener_name: "b",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      qty: 1,
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 30 }] },
      oem: true,
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(typeof r.data.source.page, "number");
    assert.strictEqual(r.data.source.page, 6617);
  });

  it("defaults null lubrication to dry", () => {
    const raw = {
      id: "t1",
      source: { manual: "BB6", page: 1 },
      system: "engine",
      assembly: "a",
      fastener_name: "b",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      qty: 1,
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 30 }] },
      lubrication: null,
      oem: true,
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.lubrication, "dry");
  });

  it("defaults missing confidence to high", () => {
    const raw = {
      id: "t1",
      source: { manual: "BB6", page: 1 },
      system: "engine",
      assembly: "a",
      fastener_name: "b",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      qty: 1,
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 30 }] },
      oem: true,
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.confidence, "high");
  });

  it("normalizes grease lubrication to oiled", () => {
    const raw = {
      id: "t1",
      source: { manual: "BB6", page: 1 },
      system: "engine",
      assembly: "a",
      fastener_name: "b",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      qty: 1,
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 30 }] },
      lubrication: "grease",
      oem: true,
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.lubrication, "oiled");
  });

  it("defaults missing system to engine", () => {
    const raw = {
      id: "t1",
      source: { manual: "BB6", page: 1 },
      assembly: "a",
      fastener_name: "b",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      qty: 1,
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 30 }] },
      oem: true,
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.system, "engine");
  });

  it("unwraps { analysis, findings, output: [...] } envelope", () => {
    const raw = {
      analysis: "some text",
      findings: [],
      output: [
        {
          id: "BB6-p1-out",
          source: { manual: "BB6", page: "200" },
          system: "chassis",
          assembly: "brake",
          fastener_name: "caliper bolt",
          thread: { nominal_mm: 12, pitch_mm: 1.75 },
          qty: 2,
          role: "caliper-guide",
          torque: { steps: [{ pass: 1, nm: 45 }] },
          oem: true,
        },
      ],
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.id, "BB6-p1-out");
    assert.strictEqual(r.data.source.page, 200);
  });

  it("unwraps { data: [...] } envelope", () => {
    const raw = {
      data: [
        {
          id: "BB6-p1-data",
          source: { manual: "BB6", page: "300" },
          system: "body",
          assembly: "door",
          fastener_name: "hinge bolt",
          thread: { nominal_mm: 8, pitch_mm: 1.25 },
          qty: 4,
          role: "cap-screw",
          torque: { steps: [{ pass: 1, nm: 15 }] },
          oem: true,
        },
      ],
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.id, "BB6-p1-data");
    assert.strictEqual(r.data.source.page, 300);
  });

  it("unwraps { fasteners_found, output, reasoning } envelope", () => {
    const raw = {
      fasteners_found: [
        {
          id: "BB6-p1-ff",
          source: { manual: "BB6", page: "400" },
          system: "drivetrain",
          assembly: "axle",
          fastener_name: "axle nut",
          thread: { nominal_mm: 22, pitch_mm: 1.5 },
          qty: 1,
          role: "castellated-nut",
          torque: { steps: [{ pass: 1, nm: 180, angle_deg: 90 }] },
          oem: true,
        },
      ],
      output: [],
      reasoning: "...",
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.id, "BB6-p1-ff");
  });

  it("handles { fasteners: [] } envelope (empty array)", () => {
    const raw = { fasteners: [] };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, false);
    assert.ok(r.error.includes("empty"));
  });

  it("passes through already-valid canonical rows without modification", () => {
    const raw = {
      id: "BB6-p136-cylhead-headbolt",
      source: { manual: "BB6", page: 136, figure: null },
      system: "engine",
      assembly: "cylinder-head",
      fastener_name: "Cylinder head bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
      qty: 10,
      role: "tty-stretch",
      torque: {
        steps: [{ pass: 1, nm: 39, kgfm: 4, lbft: 29, angle_deg: null }],
      },
      lubrication: "dry",
      reusable: false,
      oem: true,
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.id, "BB6-p136-cylhead-headbolt");
    assert.strictEqual(r.data.source.page, 136);
  });

  it("normalizes { analysis, conclusion, findings } envelope with no array", () => {
    const raw = {
      analysis: "no data on this page",
      conclusion: "none found",
      findings: [],
    };
    const r = enrichAndNormalizeRow(raw);
    // findings is an empty array, so unwrap returns [] -> error
    assert.strictEqual(r.success, false);
  });

  it("handles { extracted_fasteners } envelope", () => {
    const raw = {
      extracted_fasteners: [
        {
          id: "BB6-p1-ef",
          source: { manual: "BB6", page: "500" },
          system: "electrical",
          assembly: "alternator",
          fastener_name: "mounting bolt",
          thread: { nominal_mm: 8, pitch_mm: 1.25 },
          qty: 2,
          role: "bracket-mount",
          torque: { steps: [{ pass: 1, nm: 12 }] },
          oem: true,
        },
      ],
    };
    const r = enrichAndNormalizeRow(raw);
    assert.strictEqual(r.success, true);
    assert.strictEqual(r.data.id, "BB6-p1-ef");
  });
});

// ===========================================================================
// Integration: enrich + validate end-to-end on real reject shapes
// ===========================================================================

describe("enrich + validate integration — real reject shapes", () => {
  it("recovers a { fasteners: [] } rejection (empty envelope)", () => {
    // This one should still fail — empty envelope has no data to recover
    const raw = { fasteners: [] };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, false);
  });

  it("recovers an { analysis, findings, output: [...] } rejection", () => {
    const raw = {
      analysis: "This page contains torque specs.",
      findings: [],
      output: [
        {
          id: "BB6-p2051-bolt",
          source: { manual: "BB6", page: "2051" },
          system: "body",
          assembly: "dashboard",
          fastener_name: "Dashboard bolt",
          thread: { nominal_mm: 6, pitch_mm: 1.0 },
          qty: 1,
          role: "cap-screw",
          torque: { steps: [{ pass: 1, nm: 5 }] },
          lubrication: "dry",
          oem: true,
        },
      ],
    };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, true);
    assert.strictEqual(enriched.data.id, "BB6-p2051-bolt");
    assert.strictEqual(enriched.data.source.page, 2051);
  });

  it("recovers a { data: [...] } rejection", () => {
    const raw = {
      data: [
        {
          id: "BB6-p100-bolt",
          source: { manual: "BB6", page: "100" },
          system: "engine",
          assembly: "oil-pan",
          fastener_name: "Oil pan bolt",
          thread: { nominal_mm: 10, pitch_mm: 1.25 },
          qty: 14,
          role: "cap-screw",
          torque: { steps: [{ pass: 1, nm: 12 }] },
          lubrication: null,
          oem: true,
        },
      ],
    };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, true);
    assert.strictEqual(enriched.data.lubrication, "dry"); // null -> dry
  });

  it("recovers a { analysis, fasteners } rejection", () => {
    const raw = {
      analysis: "Page shows seat bolts.",
      fasteners: [
        {
          id: "BB6-p2054-seat",
          source: { manual: "BB6", page: "2054" },
          system: "body",
          assembly: "seat",
          fastener_name: "Seat track bolt",
          thread: { nominal_mm: 10, pitch_mm: 1.25 },
          qty: 4,
          role: "cap-screw",
          torque: { steps: [{ pass: 1, nm: 34 }] },
          lubrication: "grease",
          oem: true,
        },
      ],
    };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, true);
    assert.strictEqual(enriched.data.lubrication, "oiled"); // grease -> oiled
  });

  it("recovers a { analysis, conclusion, findings } rejection (findings is empty array)", () => {
    const raw = { analysis: "no data", conclusion: "none", findings: [] };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, false);
  });

  it("recovers a { extracted } rejection", () => {
    const raw = {
      extracted: [
        {
          id: "BB6-p300-bolt",
          source: { manual: "BB6", page: "300" },
          system: "chassis",
          assembly: "subframe",
          fastener_name: "Subframe bolt",
          thread: { nominal_mm: 14, pitch_mm: 1.5 },
          qty: 4,
          role: "tty-stretch",
          torque: { steps: [{ pass: 1, nm: 95, angle_deg: 90 }] },
          lubrication: "oiled",
          oem: true,
        },
      ],
    };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, true);
    assert.strictEqual(enriched.data.id, "BB6-p300-bolt");
  });

  it("recovers a { results } rejection", () => {
    const raw = {
      results: [
        {
          id: "BB6-p400-bolt",
          source: { manual: "BB6", page: "400" },
          system: "engine",
          assembly: "exhaust",
          fastener_name: "Exhaust manifold stud nut",
          thread: { nominal_mm: 12, pitch_mm: 1.25 },
          qty: 4,
          role: "stud-and-nut",
          torque: { steps: [{ pass: 1, nm: 29 }] },
          lubrication: "dry",
          oem: true,
        },
      ],
    };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, true);
    assert.strictEqual(enriched.data.id, "BB6-p400-bolt");
  });

  it("recovers a row with string page and null lubrication", () => {
    const raw = {
      id: "BB6-p999-bolt",
      source: { manual: "BB6", page: "999" },
      system: "engine",
      assembly: "water-pump",
      fastener_name: "Water pump bolt",
      thread: { nominal_mm: 8, pitch_mm: 1.25 },
      qty: 6,
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 8 }] },
      lubrication: null,
      confidence: null,
      reusable: null,
      oem: true,
    };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, true);
    assert.strictEqual(enriched.data.source.page, 999);
    assert.strictEqual(enriched.data.lubrication, "dry");
    assert.strictEqual(enriched.data.confidence, "high");
    assert.strictEqual(enriched.data.reusable, true);
  });

  it("recovers a row with field name aliases (fastener, manual, page at top level)", () => {
    const raw = {
      fastener: "Cam cap bolt",
      manual: "OBD1",
      page: "1500",
      system: "engine",
      assembly: "cam-cap",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      qty: 5,
      role: "tty-stretch",
      torque: { steps: [{ pass: 1, nm: 30 }] },
      lubrication: "loctite",
      oem: true,
    };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, true);
    assert.strictEqual(enriched.data.fastener_name, "Cam cap bolt");
    assert.strictEqual(enriched.data.source.manual, "OBD1");
    assert.strictEqual(enriched.data.source.page, 1500);
  });

  it("recovers a row with sealant lubrication variant", () => {
    const raw = {
      id: "BB6-p500-bolt",
      source: { manual: "BB6", page: "500" },
      system: "engine",
      assembly: "oil-pan",
      fastener_name: "Oil pan drain plug",
      thread: { nominal_mm: 14, pitch_mm: 1.5 },
      qty: 1,
      role: "sealing-plug",
      torque: { steps: [{ pass: 1, nm: 40 }] },
      lubrication: "sealant:liquid gasket to bolt threads",
      oem: true,
    };
    const enriched = enrichAndNormalizeRow(raw);
    assert.strictEqual(enriched.success, true);
    // liquid gasket -> descriptive, maps to oiled
    assert.strictEqual(enriched.data.lubrication, "oiled");
  });
});
