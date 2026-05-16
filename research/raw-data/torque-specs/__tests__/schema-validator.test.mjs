/**
 * Tests for schema-validator.mjs
 *
 * Covers canonical row validation, per-invocation record validation,
 * flat row enrichment, reject detection, and summary stats.
 */

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import {
  validateCanonicalRow,
  validateInvocationRecord,
  validateFlatRow,
  validateRejectRecord,
  validateSummaryStats,
  validateInvocationParsedRows,
} from "../schema-validator.mjs";
import * as fixtures from "./test-data.js";

// ===========================================================================
// Canonical row — valid inputs
// ===========================================================================

describe("validateCanonicalRow — valid", () => {
  it("accepts minimal valid row", () => {
    const r = validateCanonicalRow(fixtures.VALID_CANONICAL_ROW);
    assert.strictEqual(r.success, true);
  });

  it("accepts row with corroboration block", () => {
    const r = validateCanonicalRow(fixtures.VALID_CANONICAL_ROW_WITH_CORROBORATION);
    assert.strictEqual(r.success, true);
  });

  it("accepts OBD1 manual", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, source: { manual: "OBD1", page: 1205 } };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts all system enums", () => {
    for (const sys of ["engine", "drivetrain", "chassis", "body", "electrical"]) {
      assert.strictEqual(validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, system: sys }).success, true);
    }
  });

  it("accepts all role enums", () => {
    for (const role of [
      "tty-stretch", "cap-screw", "flange-bolt", "stud-and-nut",
      "self-locking-nut", "castellated-nut", "banjo-bolt", "sealing-plug",
      "wheel-lug", "caliper-guide", "bracket-mount", "clip-or-clamp", "other",
    ]) {
      assert.strictEqual(validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, role }).success, true);
    }
  });

  it("accepts multi-pass torque steps", () => {
    const row = {
      ...fixtures.VALID_CANONICAL_ROW,
      torque: {
        steps: [
          { pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null },
          { pass: 2, nm: null, kgfm: null, lbft: null, angle_deg: 90 },
          { pass: 3, nm: null, kgfm: null, lbft: null, angle_deg: 90 },
        ],
      },
    };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with full optional fields", () => {
    const row = {
      ...fixtures.VALID_CANONICAL_ROW,
      applies_to: { trans: "both", trim: "all", my: "all" },
      lubrication: "oiled",
      reusable: false,
      reuse_conditions: null,
      honda_part_number: "90012-PT0-000",
      tty: { stretch_max_mm: 0.5, pre_stretch_mm: 0.1 },
      special_tool: "07JAB-001020A",
      notes: "Replace if length > X mm",
      confidence: "high",
      oem: true,
      meta: { extra_field: "value" },
    };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts ARP aftermarket row (oem: false)", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, oem: false, meta: { arp_pn: "ARP-134-1001" } };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with all thread values populated", () => {
    const row = {
      ...fixtures.VALID_CANONICAL_ROW,
      thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: 35, grade: "12.9" },
    };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with null thread values", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, thread: { nominal_mm: null, pitch_mm: null, length_mm: null, grade: null } };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with figure reference", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, source: { manual: "BB6", page: 6617, figure: "Fig 7-12" } };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with sequence_ref", () => {
    const row = {
      ...fixtures.VALID_CANONICAL_ROW,
      torque: { steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }], sequence_ref: "BB6 p.6617 fig.2" },
    };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with conflict_group_id", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, conflict_group_id: "cg-cylhead-bolt-001" };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with engine_codes array", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, applies_to: { engine_codes: ["H22A4", "H22A1"] } };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with empty meta object", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, meta: {} };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with complex meta", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, meta: { custom: { field: "value" }, tags: [1, 2] } };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with single-source corroboration", () => {
    const row = {
      ...fixtures.VALID_CANONICAL_ROW,
      corroboration: {
        consensus_strategy: "single-source",
        agreeing_invocations: [],
        disagreeing_invocations: [],
        vote_strength: 1.0,
        intra_model_consistency: {},
        single_source: true,
      },
    };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with unanimous corroboration", () => {
    const row = {
      ...fixtures.VALID_CANONICAL_ROW,
      corroboration: {
        consensus_strategy: "unanimous",
        agreeing_invocations: [
          { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/together__kimi__r1.json" },
          { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/together__qwen__r1.json" },
        ],
        disagreeing_invocations: [],
        vote_strength: 1.0,
        intra_model_consistency: {},
        single_source: false,
      },
    };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with disagreement corroboration", () => {
    const row = {
      ...fixtures.VALID_CANONICAL_ROW,
      corroboration: {
        consensus_strategy: "majority-vote-torque-nm",
        agreeing_invocations: [{ model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "resp.json" }],
        disagreeing_invocations: [{ model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "resp.json", their_torque_nm: 44 }],
        vote_strength: 0.5,
        intra_model_consistency: {},
        single_source: false,
      },
    };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with intra_model_consistency", () => {
    const row = {
      ...fixtures.VALID_CANONICAL_ROW,
      corroboration: {
        consensus_strategy: "majority-vote-torque-nm",
        agreeing_invocations: [],
        disagreeing_invocations: [],
        vote_strength: 0.667,
        intra_model_consistency: { "together.kimi-k2-6-fp4": 1.0, "together.qwen3-vl-235b": 0.5 },
        single_source: false,
      },
    };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with dry lubrication", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, lubrication: "dry" };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with loctite lubrication", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, lubrication: "loctite" };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with sealant lubrication", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, lubrication: "sealant:RTF1403" };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with reusable conditions", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, reusable: true, reuse_conditions: "Clean threads and measure length" };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with null notes", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, notes: null };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with null special_tool", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, special_tool: null };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with null honda_part_number", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, honda_part_number: null };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with null conflict_group_id", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, conflict_group_id: null };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with null figure", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, source: { manual: "BB6", page: 6617, figure: null } };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with null sequence_ref", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, torque: { steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }], sequence_ref: null } };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with undefined optional fields", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, applies_to: undefined, corroboration: undefined, meta: undefined };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with numeric id", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, id: "12345" };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with very large qty", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, qty: 9999 };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with high-stakes corroboration strategy", () => {
    const row = {
      ...fixtures.VALID_CANONICAL_ROW,
      corroboration: {
        consensus_strategy: "manual",
        agreeing_invocations: [],
        disagreeing_invocations: [],
      },
    };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });

  it("accepts row with other role and meta.role_note", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW, role: "other", meta: { role_note: "custom fastener type" } };
    assert.strictEqual(validateCanonicalRow(row).success, true);
  });
});

// ===========================================================================
// Canonical row — invalid inputs
// ===========================================================================

describe("validateCanonicalRow — invalid", () => {
  it("rejects missing system field", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW };
    delete row.system;
    const r = validateCanonicalRow(row);
    assert.strictEqual(r.success, false);
    assert.ok(r.error.includes("system"));
  });

  it("rejects invalid role enum", () => {
    const r = validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, role: "not-a-real-role" });
    assert.strictEqual(r.success, false);
    assert.ok(r.error.includes("role"));
  });

  it("rejects negative torque step nm", () => {
    const r = validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, torque: { steps: [{ pass: 1, nm: -5, kgfm: -0.5, lbft: -4, angle_deg: null }] } });
    assert.strictEqual(r.success, false);
    assert.ok(r.error.includes("nm"));
  });

  it("rejects zero qty", () => {
    const r = validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, qty: 0 });
    assert.strictEqual(r.success, false);
  });

  it("rejects negative qty", () => {
    const r = validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, qty: -1 });
    assert.strictEqual(r.success, false);
  });

  it("rejects non-object input", () => {
    assert.strictEqual(validateCanonicalRow("not an object").success, false);
  });

  it("rejects null input", () => {
    assert.strictEqual(validateCanonicalRow(null).success, false);
  });

  it("rejects missing id", () => {
    const row = { ...fixtures.VALID_CANONICAL_ROW };
    delete row.id;
    assert.strictEqual(validateCanonicalRow(row).success, false);
  });

  it("rejects non-string id", () => {
    const r = validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, id: 12345 });
    assert.strictEqual(r.success, false);
  });

  it("rejects non-boolean oem", () => {
    const r = validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, oem: "true" });
    assert.strictEqual(r.success, false);
  });

  it("rejects invalid manual enum", () => {
    const r = validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, source: { manual: "INVALID", page: 1205 } });
    assert.strictEqual(r.success, false);
  });

  it("rejects invalid consensus_strategy", () => {
    const r = validateCanonicalRow({
      ...fixtures.VALID_CANONICAL_ROW,
      corroboration: { consensus_strategy: "invalid-strategy", agreeing_invocations: [], disagreeing_invocations: [] },
    });
    assert.strictEqual(r.success, false);
  });

  it("rejects vote_strength > 1", () => {
    const r = validateCanonicalRow({
      ...fixtures.VALID_CANONICAL_ROW,
      corroboration: { consensus_strategy: "majority-vote-torque-nm", agreeing_invocations: [], disagreeing_invocations: [], vote_strength: 1.5 },
    });
    assert.strictEqual(r.success, false);
  });

  it("rejects vote_strength < 0", () => {
    const r = validateCanonicalRow({
      ...fixtures.VALID_CANONICAL_ROW,
      corroboration: { consensus_strategy: "majority-vote-torque-nm", agreeing_invocations: [], disagreeing_invocations: [], vote_strength: -0.1 },
    });
    assert.strictEqual(r.success, false);
  });

  it("rejects non-string thread grade", () => {
    const r = validateCanonicalRow({ ...fixtures.VALID_CANONICAL_ROW, thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: 12.9 } });
    assert.strictEqual(r.success, false);
  });

  it("rejects missing required fields", () => {
    const r = validateCanonicalRow({ id: "bad" });
    assert.strictEqual(r.success, false);
  });
});

// ===========================================================================
// Per-invocation record validation
// ===========================================================================

describe("validateInvocationRecord", () => {
  it("accepts minimal valid record", () => {
    const r = validateInvocationRecord(fixtures.VALID_INVOCATION_RECORD);
    assert.strictEqual(r.success, true);
  });

  it("accepts record with all optional fields", () => {
    const r = validateInvocationRecord(fixtures.FULL_INVOCATION_RECORD);
    assert.strictEqual(r.success, true);
  });

  it("rejects record missing manual field", () => {
    const r = validateInvocationRecord(fixtures.INVALID_INVOCATION_RECORD_MISSING_MANUAL);
    assert.strictEqual(r.success, false);
    assert.ok(r.error.includes("manual"));
  });

  it("rejects record with invalid manual enum", () => {
    const bad = { ...fixtures.VALID_INVOCATION_RECORD, manual: "INVALID" };
    const r = validateInvocationRecord(bad);
    assert.strictEqual(r.success, false);
    assert.ok(r.error.includes("manual"));
  });

  it("accepts record with empty response_parsed", () => {
    const r = validateInvocationRecord(fixtures.INVOCATION_EMPTY_PARSED);
    assert.strictEqual(r.success, true);
  });

  it("accepts record with parse_error", () => {
    const r = validateInvocationRecord(fixtures.INVOCATION_WITH_PARSE_ERROR);
    assert.strictEqual(r.success, true);
  });

  it("rejects non-object input", () => {
    assert.strictEqual(validateInvocationRecord("not an object").success, false);
  });
});

// ===========================================================================
// Flat row validation
// ===========================================================================

describe("validateFlatRow", () => {
  it("accepts flat row with invocation_id", () => {
    const flatRow = { ...fixtures.VALID_CANONICAL_ROW, invocation_id: "together.kimi-k2-6-fp4.r1.2026-05-15T22-03-11Z" };
    const r = validateFlatRow(flatRow);
    assert.strictEqual(r.success, true);
  });

  it("rejects flat row missing invocation_id", () => {
    const r = validateFlatRow(fixtures.VALID_CANONICAL_ROW);
    assert.strictEqual(r.success, false);
    assert.ok(r.error.includes("invocation_id"));
  });
});

// ===========================================================================
// Reject record validation
// ===========================================================================

describe("validateRejectRecord", () => {
  it("accepts valid reject record", () => {
    const rec = {
      invocation_record: fixtures.VALID_INVOCATION_RECORD,
      validation_errors: ["missing field: system"],
      rejected_rows: [{ index: 0, errors: ["system: required"] }],
    };
    const r = validateRejectRecord(rec);
    assert.strictEqual(r.success, true);
  });

  it("rejects malformed reject record", () => {
    assert.strictEqual(validateRejectRecord({ invalid: true }).success, false);
  });
});

// ===========================================================================
// Summary stats validation
// ===========================================================================

describe("validateSummaryStats", () => {
  it("accepts valid summary stats", () => {
    const stats = {
      total_invocations: 10,
      total_flat_rows: 50,
      total_rejects: 2,
      per_model_row_count: { "together.kimi-k2-6-fp4": 30, "together.qwen3-vl-235b": 20 },
      confidence_distribution: { high: 40, medium: 5, low: 3, unknown: 2 },
    };
    const r = validateSummaryStats(stats);
    assert.strictEqual(r.success, true);
  });

  it("rejects summary stats with negative counts", () => {
    const stats = {
      total_invocations: -1,
      total_flat_rows: 0,
      total_rejects: 0,
      per_model_row_count: {},
      confidence_distribution: { high: 0, medium: 0, low: 0, unknown: 0 },
    };
    const r = validateSummaryStats(stats);
    assert.strictEqual(r.success, false);
  });
});

// ===========================================================================
// validateInvocationParsedRows — enrichment + rejection
// ===========================================================================

describe("validateInvocationParsedRows", () => {
  it("returns flat rows for valid invocation", () => {
    const { flatRows, rejects } = validateInvocationParsedRows(fixtures.VALID_INVOCATION_RECORD);
    assert.strictEqual(flatRows.length, 1);
    assert.strictEqual(rejects.length, 0);
    assert.strictEqual(flatRows[0].invocation_id, fixtures.VALID_INVOCATION_RECORD.invocation_id);
  });

  it("returns multiple flat rows for multi-row invocation", () => {
    const { flatRows, rejects } = validateInvocationParsedRows(fixtures.VALID_INVOCATION_MULTI_ROWS);
    assert.strictEqual(flatRows.length, 2);
    assert.strictEqual(rejects.length, 0);
  });

  it("returns empty arrays for empty response_parsed", () => {
    const { flatRows, rejects } = validateInvocationParsedRows(fixtures.INVOCATION_EMPTY_PARSED);
    assert.strictEqual(flatRows.length, 0);
    assert.strictEqual(rejects.length, 0);
  });

  it("returns empty arrays for null response_parsed", () => {
    const { flatRows, rejects } = validateInvocationParsedRows(fixtures.INVOCATION_NULL_PARSED);
    assert.strictEqual(flatRows.length, 0);
    assert.strictEqual(rejects.length, 0);
  });

  it("returns empty arrays for parse_error invocation", () => {
    const { flatRows, rejects } = validateInvocationParsedRows(fixtures.INVOCATION_WITH_PARSE_ERROR);
    assert.strictEqual(flatRows.length, 0);
    assert.strictEqual(rejects.length, 0);
  });

  it("separates valid and invalid rows from mixed invocation", () => {
    const { flatRows, rejects } = validateInvocationParsedRows(fixtures.INVOCATION_MIXED_ROWS);
    assert.strictEqual(flatRows.length, 2); // first and third rows are valid
    assert.strictEqual(rejects.length, 1); // second row is invalid
    assert.ok(rejects[0].errors.some((e) => e.includes("system")));
  });

  it("enriches each flat row with invocation_id", () => {
    const { flatRows } = validateInvocationParsedRows(fixtures.VALID_INVOCATION_MULTI_ROWS);
    for (const row of flatRows) {
      assert.ok(row.invocation_id.startsWith("together.qwen3-vl-235b"));
    }
  });
});
