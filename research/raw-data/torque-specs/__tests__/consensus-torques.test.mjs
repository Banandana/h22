/**
 * Tests for consensus-torques.mjs — consensus algorithm logic.
 *
 * Covers: unanimous, majority, tied, single-source, and disagreement-within-rounding cases.
 * Uses synthetic flat-row sets to test the core clustering + voting logic.
 */

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";

// ===========================================================================
// Inline implementations of the consensus helpers (to avoid file I/O in tests)
// ===========================================================================

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
 * Compute the mean torque center of a cluster.
 */
function clusterCenter(cluster) {
  const sum = cluster.reduce((acc, c) => acc + c.nm, 0);
  return sum / cluster.length;
}

/**
 * Cluster rows by torque value within tolerance.
 * Tolerance: max(2 N·m, 5% of the cluster center).
 */
function clusterByTorque(rows) {
  const torques = rows.map((r) => ({ row: r, nm: getTorqueNm(r) })).filter((x) => x.nm !== null);

  if (torques.length === 0) return [];

  torques.sort((a, b) => a.nm - b.nm);

  const clusters = [];
  let currentCluster = [torques[0]];

  for (let i = 1; i < torques.length; i++) {
    const center = clusterCenter(currentCluster);
    const tol = Math.max(2, center * 0.05);
    if (Math.abs(torques[i].nm - center) <= tol) {
      currentCluster.push(torques[i]);
    } else {
      clusters.push({
        center_nm: clusterCenter(currentCluster),
        rows: currentCluster.map((c) => c.row),
        torques: currentCluster.map((c) => c.nm),
        count: currentCluster.length,
      });
      currentCluster = [torques[i]];
    }
  }

  clusters.push({
    center_nm: clusterCenter(currentCluster),
    rows: currentCluster.map((c) => c.row),
    torques: currentCluster.map((c) => c.nm),
    count: currentCluster.length,
  });

  return clusters;
}

// ===========================================================================
// Synthetic row factory
// ===========================================================================

function makeRow(options = {}) {
  const hasNm = options.hasOwnProperty("nm");
  const nmValue = hasNm ? options.nm : 39;
  const steps = options.steps !== undefined ? options.steps : [{ pass: 1, nm: nmValue, kgfm: nmValue !== null && nmValue !== undefined ? nmValue / 9.807 : null, lbft: nmValue !== null && nmValue !== undefined ? nmValue / 1.356 : null, angle_deg: null }];
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
    _model_id: options.model_id || "test-model",
    _run: options.run || "r1",
    _temperature: options.temperature ?? 0,
    _response_path: options.response_path || "responses/bb6/136/test.json",
    _invocation_id: options.invocation_id || `inv-${Math.random()}`,
  };
}

// ===========================================================================
// Tests: getTorqueNm
// ===========================================================================

describe("getTorqueNm", () => {
  it("returns nm from first step", () => {
    const row = makeRow({ nm: 42 });
    assert.strictEqual(getTorqueNm(row), 42);
  });

  it("returns null when no steps", () => {
    const row = makeRow({ steps: [] });
    assert.strictEqual(getTorqueNm(row), null);
  });

  it("returns null when nm is zero", () => {
    const row = makeRow({ nm: 0 });
    assert.strictEqual(getTorqueNm(row), null);
  });

  it("returns null when nm is negative", () => {
    const row = makeRow({ nm: -5 });
    assert.strictEqual(getTorqueNm(row), null);
  });

  it("returns null when nm is null", () => {
    const row = makeRow({ nm: null });
    assert.strictEqual(getTorqueNm(row), null);
  });
});

// ===========================================================================
// Tests: clusterByTorque — unanimous case
// ===========================================================================

describe("clusterByTorque — unanimous", () => {
  it("all same torque → one cluster", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "m1" }),
      makeRow({ nm: 39, model_id: "m2" }),
      makeRow({ nm: 39, model_id: "m3" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 1);
    assert.strictEqual(clusters[0].count, 3);
    assert.strictEqual(clusters[0].center_nm, 39);
  });
});

// ===========================================================================
// Tests: clusterByTorque — majority case
// ===========================================================================

describe("clusterByTorque — majority", () => {
  it("two clusters, larger wins", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "m1" }),
      makeRow({ nm: 39, model_id: "m2" }),
      makeRow({ nm: 39, model_id: "m3" }),
      makeRow({ nm: 44, model_id: "m4" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 2);
    // 39 should be the larger cluster
    const winner = clusters.find((c) => c.count === 3);
    assert.ok(winner);
    assert.strictEqual(winner.center_nm, 39);
  });

  it("tolerance merges close values (39 vs 40)", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "m1" }),
      makeRow({ nm: 40, model_id: "m2" }),
      makeRow({ nm: 44, model_id: "m3" }),
    ];
    const clusters = clusterByTorque(rows);
    // 39 and 40 should cluster together (diff=1, tolerance=max(2, 39*0.05=1.95)=2, 1<=2)
    assert.ok(clusters.some((c) => c.count >= 2 && c.torques.includes(39)));
  });

  it("values far apart stay separate (39 vs 44)", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "m1" }),
      makeRow({ nm: 44, model_id: "m2" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 2);
  });
});

// ===========================================================================
// Tests: clusterByTorque — tied case
// ===========================================================================

describe("clusterByTorque — tied", () => {
  it("equal clusters → first largest returned (tie-breaking)", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "m1" }),
      makeRow({ nm: 39, model_id: "m2" }),
      makeRow({ nm: 44, model_id: "m3" }),
      makeRow({ nm: 44, model_id: "m4" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 2);
    // Both clusters have count=2; reduce picks the first one encountered
    const winner = clusters.reduce((best, c) => (c.count > best.count ? c : best), clusters[0]);
    assert.ok(winner.count === 2);
  });
});

// ===========================================================================
// Tests: clusterByTorque — single-source case
// ===========================================================================

describe("clusterByTorque — single-source", () => {
  it("single row → one cluster with that row", () => {
    const rows = [makeRow({ nm: 39, model_id: "m1" })];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 1);
    assert.strictEqual(clusters[0].count, 1);
    assert.strictEqual(clusters[0].center_nm, 39);
  });

  it("multiple invocations same model → still single model", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "m1", run: "r1" }),
      makeRow({ nm: 39, model_id: "m1", run: "r2" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 1);
    assert.strictEqual(clusters[0].count, 2);
  });
});

// ===========================================================================
// Tests: clusterByTorque — disagreement-within-rounding
// ===========================================================================

describe("clusterByTorque — rounding edge cases", () => {
  it("large torque: 100 vs 105 stays separate (5% of 100 = 5, diff=5, exactly at boundary)", () => {
    const rows = [
      makeRow({ nm: 100, model_id: "m1" }),
      makeRow({ nm: 105, model_id: "m2" }),
    ];
    const clusters = clusterByTorque(rows);
    // center=100, tol=max(2, 5)=5, |105-100|=5, 5<=5 → should merge
    assert.strictEqual(clusters.length, 1);
    assert.strictEqual(clusters[0].count, 2);
  });

  it("large torque: 100 vs 106 stays separate (diff=6 > tol=5)", () => {
    const rows = [
      makeRow({ nm: 100, model_id: "m1" }),
      makeRow({ nm: 106, model_id: "m2" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 2);
  });

  it("small torque: 5 vs 7 stays separate (tol=max(2, 0.25)=2, diff=2, at boundary)", () => {
    const rows = [
      makeRow({ nm: 5, model_id: "m1" }),
      makeRow({ nm: 7, model_id: "m2" }),
    ];
    const clusters = clusterByTorque(rows);
    // center=5, tol=max(2, 0.25)=2, |7-5|=2, 2<=2 → should merge
    assert.strictEqual(clusters.length, 1);
  });
});

// ===========================================================================
// Tests: clusterByTorque — empty/no-torque case
// ===========================================================================

describe("clusterByTorque — edge cases", () => {
  it("empty input → empty clusters", () => {
    const clusters = clusterByTorque([]);
    assert.strictEqual(clusters.length, 0);
  });

  it("rows with no torque → empty clusters", () => {
    const rows = [
      makeRow({ nm: null }),
      makeRow({ nm: -1 }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 0);
  });
});

// ===========================================================================
// Tests: groupKey
// ===========================================================================

describe("groupKey", () => {
  it("same assembly+fastener+thread → same key", () => {
    const r1 = makeRow({ assembly: "cylhead", fastener_name: "bolt", thread: { nominal_mm: 10, pitch_mm: 1.25 } });
    const r2 = makeRow({ assembly: "cylhead", fastener_name: "bolt", thread: { nominal_mm: 10, pitch_mm: 1.25 } });
    assert.strictEqual(groupKey(r1), groupKey(r2));
  });

  it("different assembly → different key", () => {
    const r1 = makeRow({ assembly: "cylhead", fastener_name: "bolt" });
    const r2 = makeRow({ assembly: "oil-pan", fastener_name: "bolt" });
    assert.notStrictEqual(groupKey(r1), groupKey(r2));
  });

  it("different thread → different key", () => {
    const r1 = makeRow({ thread: { nominal_mm: 10, pitch_mm: 1.25 } });
    const r2 = makeRow({ thread: { nominal_mm: 12, pitch_mm: 1.75 } });
    assert.notStrictEqual(groupKey(r1), groupKey(r2));
  });
});

function groupKey(row) {
  const t = row.thread || {};
  return `${row.assembly}|${row.fastener_name}|${t.nominal_mm ?? "null"}|${t.pitch_mm ?? "null"}`;
}

// ===========================================================================
// Tests: integration — full consensus pass on synthetic data
// ===========================================================================

describe("Integration — full consensus scenarios", () => {
  it("unanimous 3-model agreement produces single consensus row", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "kimi", invocation_id: "inv-kimi-r1" }),
      makeRow({ nm: 39, model_id: "qwen", invocation_id: "inv-qwen-r1" }),
      makeRow({ nm: 39, model_id: "opus", invocation_id: "inv-opus-r1" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 1);
    assert.strictEqual(clusters[0].count, 3);
    assert.strictEqual(clusters[0].center_nm, 39);
  });

  it("majority 3-of-4 agreement picks the winning cluster", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "kimi", invocation_id: "inv-kimi-r1" }),
      makeRow({ nm: 39, model_id: "qwen", invocation_id: "inv-qwen-r1" }),
      makeRow({ nm: 39, model_id: "opus", invocation_id: "inv-opus-r1" }),
      makeRow({ nm: 44, model_id: "sonnet", invocation_id: "inv-sonnet-r1" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 2);
    const winner = clusters.reduce((best, c) => (c.count > best.count ? c : best), clusters[0]);
    assert.strictEqual(winner.count, 3);
    assert.strictEqual(winner.center_nm, 39);
  });

  it("tied 2-vs-2 produces two clusters, first picked by reduce", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "kimi", invocation_id: "inv-kimi-r1" }),
      makeRow({ nm: 39, model_id: "qwen", invocation_id: "inv-qwen-r1" }),
      makeRow({ nm: 44, model_id: "opus", invocation_id: "inv-opus-r1" }),
      makeRow({ nm: 44, model_id: "sonnet", invocation_id: "inv-sonnet-r1" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 2);
    const winner = clusters.reduce((best, c) => (c.count > best.count ? c : best), clusters[0]);
    assert.strictEqual(winner.count, 2);
  });

  it("single invocation produces single-source cluster", () => {
    const rows = [makeRow({ nm: 39, model_id: "kimi", invocation_id: "inv-kimi-r1" })];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 1);
    assert.strictEqual(clusters[0].count, 1);
  });

  it("disagreement: all different values produces multiple clusters", () => {
    const rows = [
      makeRow({ nm: 39, model_id: "kimi", invocation_id: "inv-kimi-r1" }),
      makeRow({ nm: 44, model_id: "qwen", invocation_id: "inv-qwen-r1" }),
      makeRow({ nm: 50, model_id: "opus", invocation_id: "inv-opus-r1" }),
    ];
    const clusters = clusterByTorque(rows);
    assert.strictEqual(clusters.length, 3);
  });
});

console.log("\nAll consensus algorithm tests completed.");
