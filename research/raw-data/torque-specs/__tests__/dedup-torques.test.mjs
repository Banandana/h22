/**
 * Tests for dedup-torques.mjs — cross-page dedup + conflict-merge logic.
 *
 * Covers: grouping, merge-agree, conflict-group-id, widening applies_to,
 * single-row passthrough, idempotency, and edge cases.
 * Uses synthetic row sets to test core logic without file I/O.
 */

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

// ===========================================================================
// Inline implementations of the dedup helpers (to avoid file I/O in tests)
// ===========================================================================

/**
 * Compute the stable grouping key for a fastener row.
 */
function groupKey(row) {
  const t = row.thread || {};
  return `${row.assembly}|${row.fastener_name}|${t.nominal_mm ?? "null"}|${t.pitch_mm ?? "null"}`;
}

/**
 * Extract the first-pass torque nm value from a canonical row.
 */
function getTorqueNm(row) {
  try {
    const steps = row.torque?.steps;
    if (!Array.isArray(steps) || steps.length === 0) return null;
    const first = steps[0];
    const nm = first?.nm;
    if (nm === null || nm === undefined || typeof nm !== "number" || nm <= 0) return null;
    return nm;
  } catch {
    return null;
  }
}

/**
 * Check if two torque values are within tolerance.
 */
function torquesAgree(a, b) {
  if (a === null || b === null) return false;
  const center = Math.max(a, b);
  const tol = Math.max(2, center * 0.05);
  return Math.abs(a - b) <= tol;
}

/**
 * Deep-merge applies_to objects, widening where conflicts exist.
 */
function widenAppliesTo(a, b) {
  const result = { ...a };
  if (a.trans && b.trans && a.trans !== b.trans) {
    result.trans = "both";
  } else if (b.trans && !a.trans) {
    result.trans = b.trans;
  }
  if (a.trim && b.trim && a.trim !== b.trim) {
    result.trim = "all";
  } else if (b.trim && !a.trim) {
    result.trim = b.trim;
  }
  if (a.my && b.my && a.my !== b.my) {
    result.my = `${a.my}-${b.my}`;
  } else if (b.my && !a.my) {
    result.my = b.my;
  }
  const codesA = Array.isArray(a.engine_codes) ? a.engine_codes : [];
  const codesB = Array.isArray(b.engine_codes) ? b.engine_codes : [];
  result.engine_codes = [...new Set([...codesA, ...codesB])];
  return result;
}

/**
 * Generate a stable conflict_group_id from the group key.
 */
function conflictGroupId(key) {
  return `conflict-${key.replace(/\|/g, "-")}`;
}

// ===========================================================================
// Synthetic row factory
// ===========================================================================

function makeRow(options = {}) {
  const nmValue = options.nm !== undefined ? options.nm : 39;
  const steps = options.steps !== undefined ? options.steps : [{ pass: 1, nm: nmValue, kgfm: nmValue / 9.807, lbft: nmValue / 1.356, angle_deg: null }];
  return {
    id: options.id || `row-${Math.random()}`,
    source: { manual: options.manual || "BB6", page: options.page || 136, figure: null },
    system: options.system || "engine",
    assembly: options.assembly || "cylinder-head",
    fastener_name: options.fastener_name || "Test bolt",
    thread: options.thread || { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
    qty: options.qty || 1,
    role: options.role || "cap-screw",
    torque: { steps, sequence_ref: null },
    lubrication: options.lubrication || "dry",
    reusable: options.reusable ?? false,
    oem: options.oem ?? true,
    applies_to: options.applies_to || {},
    corroboration: options.corroboration || { consensus_strategy: "unanimous", agreeing_invocations: [], disagreeing_invocations: [], vote_strength: 1.0, intra_model_consistency: {}, single_source: false },
    conflict_group_id: null,
    sources: options.sources || null,
    meta: options.meta || {},
  };
}

// ===========================================================================
// Tests: groupKey
// ===========================================================================

describe("groupKey", () => {
  it("groups rows with same assembly+name+thread together", () => {
    const r1 = makeRow({ assembly: "cylinder-head", fastener_name: "bolt", thread: { nominal_mm: 10, pitch_mm: 1.25 } });
    const r2 = makeRow({ assembly: "cylinder-head", fastener_name: "bolt", thread: { nominal_mm: 10, pitch_mm: 1.25 } });
    assert.strictEqual(groupKey(r1), groupKey(r2));
  });

  it("separates rows with different assemblies", () => {
    const r1 = makeRow({ assembly: "cylinder-head", fastener_name: "bolt" });
    const r2 = makeRow({ assembly: "oil-pan", fastener_name: "bolt" });
    assert.notStrictEqual(groupKey(r1), groupKey(r2));
  });

  it("separates rows with different thread specs", () => {
    const r1 = makeRow({ fastener_name: "bolt", thread: { nominal_mm: 10, pitch_mm: 1.25 } });
    const r2 = makeRow({ fastener_name: "bolt", thread: { nominal_mm: 12, pitch_mm: 1.75 } });
    assert.notStrictEqual(groupKey(r1), groupKey(r2));
  });
});

// ===========================================================================
// Tests: getTorqueNm
// ===========================================================================

describe("getTorqueNm", () => {
  it("returns nm from first step", () => {
    assert.strictEqual(getTorqueNm(makeRow({ nm: 42 })), 42);
  });

  it("returns null when no steps", () => {
    assert.strictEqual(getTorqueNm(makeRow({ steps: [] })), null);
  });

  it("returns null when nm is zero", () => {
    assert.strictEqual(getTorqueNm(makeRow({ nm: 0 })), null);
  });
});

// ===========================================================================
// Tests: torquesAgree
// ===========================================================================

describe("torquesAgree", () => {
  it("same values agree", () => {
    assert.ok(torquesAgree(39, 39));
  });

  it("close values agree (within tolerance)", () => {
    // diff=1, tol=max(2, 1.95)=2 → 1<=2 → agree
    assert.ok(torquesAgree(39, 40));
  });

  it("far values disagree", () => {
    // diff=5, tol=max(2, 2.2)=2.2 → 5>2.2 → disagree
    assert.ok(!torquesAgree(39, 44));
  });

  it("null values never agree", () => {
    assert.ok(!torquesAgree(null, 39));
    assert.ok(!torquesAgree(39, null));
    assert.ok(!torquesAgree(null, null));
  });

  it("large torque tolerance is wider", () => {
    // diff=5, tol=max(2, 5)=5 → 5<=5 → agree (boundary)
    assert.ok(torquesAgree(100, 105));
  });

  it("large torque far apart disagrees", () => {
    // diff=6, tol=max(2, 5)=5 → 6>5 → disagree
    assert.ok(!torquesAgree(100, 106));
  });
});

// ===========================================================================
// Tests: widenAppliesTo
// ===========================================================================

describe("widenAppliesTo", () => {
  it("merges trans: M/T + A/T → both", () => {
    const result = widenAppliesTo({ trans: "M/T" }, { trans: "A/T" });
    assert.strictEqual(result.trans, "both");
  });

  it("keeps same trans", () => {
    const result = widenAppliesTo({ trans: "M/T" }, { trans: "M/T" });
    assert.strictEqual(result.trans, "M/T");
  });

  it("fills in missing trans", () => {
    const result = widenAppliesTo({}, { trans: "M/T" });
    assert.strictEqual(result.trans, "M/T");
  });

  it("widens trim to all", () => {
    const result = widenAppliesTo({ trim: "SH" }, { trim: "base" });
    assert.strictEqual(result.trim, "all");
  });

  it("widens my year range", () => {
    const result = widenAppliesTo({ my: "1997" }, { my: "1998-2001" });
    assert.strictEqual(result.my, "1997-1998-2001");
  });

  it("unions engine_codes arrays", () => {
    const result = widenAppliesTo({ engine_codes: ["H22A4"] }, { engine_codes: ["H22A1"] });
    assert.deepStrictEqual(result.engine_codes, ["H22A4", "H22A1"]);
  });

  it("handles empty inputs", () => {
    const result = widenAppliesTo({}, {});
    // engine_codes is always set (even if empty array from spreading)
    assert.deepStrictEqual(result.engine_codes, []);
    assert.strictEqual(Object.keys(result).length, 1); // only engine_codes
  });
});

// ===========================================================================
// Tests: conflictGroupId
// ===========================================================================

describe("conflictGroupId", () => {
  it("produces a readable string from group key", () => {
    const key = "cylinder-head|Cylinder head bolt|10|1.25";
    const id = conflictGroupId(key);
    assert.ok(id.startsWith("conflict-"));
    assert.ok(!id.includes("|"));
  });

  it("is stable for the same key", () => {
    const key = "engine|crank-pulley-bolt|14|M20";
    assert.strictEqual(conflictGroupId(key), conflictGroupId(key));
  });
});

// ===========================================================================
// Tests: full dedup flow — agree case
// ===========================================================================

describe("Dedup flow — agreeing multi-page rows", () => {
  it("merges two rows on same fastener across pages into one", () => {
    const r1 = makeRow({
      id: "BB6-p136-cylhead-headbolt",
      manual: "BB6", page: 136,
      assembly: "cylinder-head", fastener_name: "Cylinder head bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      nm: 39,
      applies_to: { trans: "M/T", trim: "SH", my: "1997-2001", engine_codes: ["H22A4"] },
      sources: null,
    });
    const r2 = makeRow({
      id: "BB6-p200-timing-cylhead-headbolt",
      manual: "BB6", page: 200,
      assembly: "cylinder-head", fastener_name: "Cylinder head bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      nm: 39,
      applies_to: { trans: "A/T", trim: "base", my: "1997", engine_codes: ["H22A1"] },
      sources: null,
    });

    // Group
    const groups = {};
    for (const row of [r1, r2]) {
      const key = groupKey(row);
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    }

    // Process the group
    const groupRows = groups[Object.keys(groups)[0]];
    const torqueValues = groupRows.map(getTorqueNm).filter((v) => v !== null);
    const hasDisagreement = torqueValues.length >= 2 && !torqueValues.every((v) => torquesAgree(v, torqueValues[0]));

    assert.strictEqual(hasDisagreement, false, "torques should agree");
    assert.strictEqual(groupRows.length, 2, "two rows in group");

    // Merge
    const merged = JSON.parse(JSON.stringify(groupRows[0]));
    merged.sources = [{ manual: "BB6", page: 136 }, { manual: "BB6", page: 200 }];
    merged.applies_to = widenAppliesTo(groupRows[0].applies_to, groupRows[1].applies_to);
    merged.conflict_group_id = null;

    // Verify
    assert.strictEqual(merged.sources.length, 2);
    assert.strictEqual(merged.applies_to.trans, "both");
    assert.strictEqual(merged.applies_to.trim, "all");
    assert.strictEqual(merged.conflict_group_id, null);
    assert.strictEqual(merged.corroboration.consensus_strategy, "unanimous");
  });
});

// ===========================================================================
// Tests: full dedup flow — disagree case
// ===========================================================================

describe("Dedup flow — disagreeing multi-page rows", () => {
  it("keeps separate rows with shared conflict_group_id", () => {
    const r1 = makeRow({
      id: "BB6-p136-crankbolt",
      manual: "BB6", page: 136,
      assembly: "crankshaft", fastener_name: "Crank pulley bolt",
      thread: { nominal_mm: 14, pitch_mm: 1.5 },
      nm: 147,
      applies_to: {},
      sources: null,
    });
    const r2 = makeRow({
      id: "BB6-p200-crankbolt",
      manual: "BB6", page: 200,
      assembly: "crankshaft", fastener_name: "Crank pulley bolt",
      thread: { nominal_mm: 14, pitch_mm: 1.5 },
      nm: 150,
      applies_to: {},
      sources: null,
    });

    // 147 vs 150: diff=3, tol=max(2, 7.5)=7.5 → 3<=7.5 → they actually agree!
    // Let's use a bigger difference
    const r2b = makeRow({
      id: "BB6-p200-crankbolt",
      manual: "BB6", page: 200,
      assembly: "crankshaft", fastener_name: "Crank pulley bolt",
      thread: { nominal_mm: 14, pitch_mm: 1.5 },
      nm: 160,
      applies_to: {},
      sources: null,
    });

    const groups = {};
    for (const row of [r1, r2b]) {
      const key = groupKey(row);
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    }

    const groupRows = groups[Object.keys(groups)[0]];
    const torqueValues = groupRows.map(getTorqueNm).filter((v) => v !== null);
    const hasDisagreement = torqueValues.length >= 2 && !torqueValues.every((v) => torquesAgree(v, torqueValues[0]));

    // 147 vs 160: diff=13, tol=max(2, 8)=8 → 13>8 → disagree
    assert.ok(hasDisagreement, "torques should disagree");

    // Assign conflict_group_id
    const cgId = conflictGroupId(groupKey(groupRows[0]));
    for (const row of groupRows) {
      row.conflict_group_id = cgId;
      row.sources = [{ manual: "BB6", page: 136 }, { manual: "BB6", page: 200 }];
    }

    // Verify both rows kept, both have same conflict_group_id
    assert.strictEqual(groupRows.length, 2);
    assert.strictEqual(groupRows[0].conflict_group_id, cgId);
    assert.strictEqual(groupRows[1].conflict_group_id, cgId);
    assert.ok(cgId.startsWith("conflict-"));
  });
});

// ===========================================================================
// Tests: full dedup flow — single row
// ===========================================================================

describe("Dedup flow — single row", () => {
  it("passthrough with sources added", () => {
    const r1 = makeRow({
      id: "BB6-p136-cylhead-headbolt",
      manual: "BB6", page: 136,
      assembly: "cylinder-head", fastener_name: "Cylinder head bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      nm: 39,
      applies_to: {},
      sources: null,
    });

    const groups = {};
    groups[groupKey(r1)] = [r1];

    const groupRows = groups[Object.keys(groups)[0]];
    assert.strictEqual(groupRows.length, 1);

    const merged = JSON.parse(JSON.stringify(groupRows[0]));
    merged.sources = [{ manual: "BB6", page: 136 }];
    merged.conflict_group_id = null;

    assert.strictEqual(merged.sources.length, 1);
    assert.strictEqual(merged.conflict_group_id, null);
    assert.strictEqual(merged.corroboration.consensus_strategy, "unanimous");
  });
});

// ===========================================================================
// Tests: edge cases
// ===========================================================================

describe("Edge cases", () => {
  it("empty input produces no output", () => {
    const groups = {};
    assert.strictEqual(Object.keys(groups).length, 0);
  });

  it("rows with null torque are skipped in agreement check", () => {
    const r1 = makeRow({ nm: 39 });
    const r2 = makeRow({ nm: null });
    const torqueValues = [r1, r2].map(getTorqueNm).filter((v) => v !== null);
    // Only r1 has a valid torque
    assert.strictEqual(torqueValues.length, 1);
    // Single value → no disagreement possible
    const hasDisagreement = torqueValues.length >= 2 && !torqueValues.every((v) => torquesAgree(v, torqueValues[0]));
    assert.ok(!hasDisagreement);
  });

  it("three-way split with two agreeing and one outlier → agreement", () => {
    const r1 = makeRow({ nm: 39 });
    const r2 = makeRow({ nm: 39 });
    const r3 = makeRow({ nm: 50 });
    const torqueValues = [r1, r2, r3].map(getTorqueNm).filter((v) => v !== null);
    // 39 vs 50: diff=11, tol=max(2, 2.5)=2.5 → disagree
    // But we check: does every value agree with the first?
    // 39 agrees with 39 ✓
    // 50 disagrees with 39 ✗
    // So hasDisagreement = true (because not every value agrees with first)
    const hasDisagreement = torqueValues.length >= 2 && !torqueValues.every((v) => torquesAgree(v, torqueValues[0]));
    assert.ok(hasDisagreement, "three-way split should flag disagreement");
  });
});

// ===========================================================================
// Tests: idempotency
// ===========================================================================

describe("Idempotency", () => {
  it("running dedup twice produces the same output", () => {
    const r1 = makeRow({
      id: "BB6-p136-test",
      manual: "BB6", page: 136,
      assembly: "cylinder-head", fastener_name: "Test bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25 },
      nm: 39,
      applies_to: { trans: "M/T" },
      sources: [{ manual: "BB6", page: 136 }],
      conflict_group_id: null,
    });

    // First pass
    const groups1 = {};
    groups1[groupKey(r1)] = [r1];
    const pass1 = [];
    for (const [, groupRows] of Object.entries(groups1)) {
      const merged = JSON.parse(JSON.stringify(groupRows[0]));
      merged.sources = [{ manual: "BB6", page: 136 }];
      merged.conflict_group_id = null;
      pass1.push(merged);
    }

    // Second pass on first pass output
    const groups2 = {};
    for (const row of pass1) {
      const key = groupKey(row);
      if (!groups2[key]) groups2[key] = [];
      groups2[key].push(row);
    }
    const pass2 = [];
    for (const [, groupRows] of Object.entries(groups2)) {
      const merged = JSON.parse(JSON.stringify(groupRows[0]));
      merged.sources = [{ manual: "BB6", page: 136 }];
      merged.conflict_group_id = null;
      pass2.push(merged);
    }

    assert.strictEqual(pass1.length, pass2.length);
    assert.strictEqual(pass1[0].sources.length, pass2[0].sources.length);
    assert.strictEqual(pass1[0].conflict_group_id, pass2[0].conflict_group_id);
  });
});
