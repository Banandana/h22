import { describe, it, expect } from "vitest";
import { runConsensusPass } from "../../src/torque-consensus/consensus.js";
import type { FlatRow } from "../../src/torque-consensus/types.js";

/** Helper: create a minimal flat row */
function makeFlatRow(overrides: Partial<FlatRow> = {}): FlatRow {
  return {
    id: `row-${Math.random().toString(36).slice(2, 8)}`,
    invocation_id: overrides.invocation_id ?? `inv-1`,
    manual: overrides.manual ?? "BB6",
    page: overrides.page ?? 6617,
    system: overrides.system ?? "engine",
    assembly: overrides.assembly ?? "cylinder-head",
    fastener_name: overrides.fastener_name ?? "Cylinder head bolt",
    thread_nominal_mm: overrides.thread_nominal_mm ?? 10,
    thread_pitch_mm: overrides.thread_pitch_mm ?? 1.25,
    thread_length_mm: overrides.thread_length_mm ?? null,
    thread_grade: overrides.thread_grade ?? null,
    qty: overrides.qty ?? 10,
    role: overrides.role ?? "tty-stretch",
    torque_nm: overrides.torque_nm ?? 39,
    torque_steps:
      overrides.torque_steps ?? [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }],
    torque_sequence_ref: overrides.torque_sequence_ref ?? null,
    lubrication: overrides.lubrication ?? "oiled",
    reusable: overrides.reusable ?? false,
    reuse_conditions: overrides.reuse_conditions ?? null,
    honda_part_number: overrides.honda_part_number ?? null,
    tty_stretch_max_mm: overrides.tty_stretch_max_mm ?? null,
    tty_pre_stretch_mm: overrides.tty_pre_stretch_mm ?? null,
    special_tool: overrides.special_tool ?? null,
    notes: overrides.notes ?? null,
    confidence: overrides.confidence ?? "high",
    oem: overrides.oem ?? true,
    meta: overrides.meta ?? {},
  };
}

describe("runConsensusPass", () => {
  describe("unanimous agreement", () => {
    it("two models agree on same torque -> consensus row with unanimous strategy", () => {
      const rows: FlatRow[] = [
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 39,
        }),
        makeFlatRow({
          invocation_id: "inv-qwen-r1",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 39,
        }),
      ];

      const { consensusRows, disputedRows, report } = runConsensusPass(rows);

      expect(disputedRows.length).toBe(0);
      expect(consensusRows.length).toBe(1);
      expect(consensusRows[0].corroboration.consensus_strategy).toBe("unanimous");
      expect(consensusRows[0].corroboration.agreeing_invocations.length).toBe(2);
      expect(consensusRows[0].corroboration.disagreeing_invocations.length).toBe(0);
      expect(consensusRows[0].corroboration.vote_strength).toBeCloseTo(1.0);
      expect(consensusRows[0].corroboration.single_source).toBe(false);
      expect(report.summary.total_consensus).toBe(1);
      expect(report.summary.total_disputed).toBe(0);
    });
  });

  describe("majority vote", () => {
    it("3 models: 2 agree, 1 disagrees -> majority wins", () => {
      const rows: FlatRow[] = [
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi-r1.json" },
          torque_nm: 39,
        }),
        makeFlatRow({
          invocation_id: "inv-kimi-r2",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r2", temperature: 0.3, response_path: "responses/bb6/6617/kimi-r2.json" },
          torque_nm: 39,
        }),
        makeFlatRow({
          invocation_id: "inv-qwen-r1",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 44,
        }),
      ];

      const { consensusRows, disputedRows } = runConsensusPass(rows);

      expect(consensusRows.length).toBe(1);
      expect(consensusRows[0].corroboration.consensus_strategy).toBe("majority-vote-torque-nm");
      expect(consensusRows[0].corroboration.agreeing_invocations.length).toBe(2);
      expect(consensusRows[0].corroboration.disagreeing_invocations.length).toBe(1);
      expect(consensusRows[0].corroboration.disagreeing_invocations[0].their_torque_nm).toBe(44);
      expect(consensusRows[0].corroboration.vote_strength).toBeCloseTo(2 / 3);
      expect(disputedRows.length).toBe(0);
    });
  });

  describe("tied vote (no majority)", () => {
    it("2 models disagree -> disputed row", () => {
      const rows: FlatRow[] = [
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 39,
        }),
        makeFlatRow({
          invocation_id: "inv-qwen-r1",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 44,
        }),
      ];

      const { consensusRows, disputedRows } = runConsensusPass(rows);

      expect(consensusRows.length).toBe(0);
      expect(disputedRows.length).toBe(1);
      expect(disputedRows[0].candidates.length).toBe(2);
      expect(disputedRows[0].vote_strength).toBeCloseTo(0.5);
    });
  });

  describe("single source", () => {
    it("only one invocation produces this fastener -> single-source consensus", () => {
      const rows: FlatRow[] = [
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 33,
        }),
      ];

      const { consensusRows, disputedRows } = runConsensusPass(rows);

      expect(consensusRows.length).toBe(1);
      expect(consensusRows[0].corroboration.consensus_strategy).toBe("single-source");
      expect(consensusRows[0].corroboration.single_source).toBe(true);
      expect(consensusRows[0].corroboration.vote_strength).toBeCloseTo(1.0);
      expect(disputedRows.length).toBe(0);
    });
  });

  describe("disagreement within rounding tolerance", () => {
    it("39 vs 40 Nm cluster together (within 2 N·m tolerance)", () => {
      const rows: FlatRow[] = [
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 39,
        }),
        makeFlatRow({
          invocation_id: "inv-qwen-r1",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 40,
        }),
      ];

      const { consensusRows, disputedRows } = runConsensusPass(rows);

      // 39 vs 40 is within 2 N·m tolerance, so they cluster together
      expect(consensusRows.length).toBe(1);
      expect(consensusRows[0].corroboration.consensus_strategy).toBe("unanimous");
      expect(disputedRows.length).toBe(0);
    });

    it("39 vs 44 Nm do NOT cluster together (>2 N·m and >5%)", () => {
      const rows: FlatRow[] = [
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 39,
        }),
        makeFlatRow({
          invocation_id: "inv-qwen-r1",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 44,
        }),
      ];

      const { consensusRows, disputedRows } = runConsensusPass(rows);

      expect(consensusRows.length).toBe(0);
      expect(disputedRows.length).toBe(1);
    });
  });

  describe("multiple fasteners on same page", () => {
    it("handles different assemblies correctly", () => {
      const rows: FlatRow[] = [
        // Head bolts - both models agree
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          assembly: "cylinder-head",
          fastener_name: "Cylinder head bolt",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 39,
        }),
        makeFlatRow({
          invocation_id: "inv-qwen-r1",
          assembly: "cylinder-head",
          fastener_name: "Cylinder head bolt",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 39,
        }),
        // Main caps - models disagree
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          assembly: "main-bearings",
          fastener_name: "Main bearing cap bolt",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 43,
        }),
        makeFlatRow({
          invocation_id: "inv-qwen-r1",
          assembly: "main-bearings",
          fastener_name: "Main bearing cap bolt",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 48,
        }),
      ];

      const { consensusRows, disputedRows } = runConsensusPass(rows);

      expect(consensusRows.length).toBe(1); // head bolts
      expect(consensusRows[0].assembly).toBe("cylinder-head");
      expect(disputedRows.length).toBe(1); // main caps
      expect(disputedRows[0].assembly).toBe("main-bearings");
    });
  });

  describe("multi-pass torque", () => {
    it("preserves multi-step torque sequence in consensus row", () => {
      const rows: FlatRow[] = [
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 39,
          torque_steps: [
            { pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null },
            { pass: 2, nm: null, kgfm: null, lbft: null, angle_deg: 90 },
          ],
        }),
        makeFlatRow({
          invocation_id: "inv-qwen-r1",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 39,
          torque_steps: [
            { pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null },
            { pass: 2, nm: null, kgfm: null, lbft: null, angle_deg: 90 },
          ],
        }),
      ];

      const { consensusRows } = runConsensusPass(rows);

      expect(consensusRows.length).toBe(1);
      expect(consensusRows[0].torque.steps.length).toBe(2);
      expect(consensusRows[0].torque.steps[1].angle_deg).toBe(90);
    });
  });

  describe("cross-page grouping", () => {
    it("groups rows by page correctly", () => {
      const rows: FlatRow[] = [
        // Page 6617 - head bolts, agree
        makeFlatRow({
          page: 6617,
          invocation_id: "inv-kimi-r1",
          assembly: "cylinder-head",
          fastener_name: "Cylinder head bolt",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 39,
        }),
        makeFlatRow({
          page: 6617,
          invocation_id: "inv-qwen-r1",
          assembly: "cylinder-head",
          fastener_name: "Cylinder head bolt",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 39,
        }),
        // Page 6620 - main caps, disagree
        makeFlatRow({
          page: 6620,
          invocation_id: "inv-kimi-r1",
          assembly: "main-bearings",
          fastener_name: "Main bearing cap bolt",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6620/kimi.json" },
          torque_nm: 43,
        }),
        makeFlatRow({
          page: 6620,
          invocation_id: "inv-qwen-r1",
          assembly: "main-bearings",
          fastener_name: "Main bearing cap bolt",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6620/qwen.json" },
          torque_nm: 50,
        }),
      ];

      const { consensusRows, disputedRows, report } = runConsensusPass(rows);

      expect(consensusRows.length).toBe(1);
      expect(consensusRows[0].source.page).toBe(6617);
      expect(disputedRows.length).toBe(1);
      expect(disputedRows[0].page).toBe(6620);
      expect(report.pages.length).toBe(2);
    });
  });

  describe("empty input", () => {
    it("returns empty results with no errors", () => {
      const { consensusRows, disputedRows, report } = runConsensusPass([]);

      expect(consensusRows.length).toBe(0);
      expect(disputedRows.length).toBe(0);
      expect(report.summary.total_pages).toBe(0);
      expect(report.summary.total_consensus).toBe(0);
      expect(report.summary.total_disputed).toBe(0);
    });
  });

  describe("report structure", () => {
    it("produces valid ConsensusReport with summary and pages", () => {
      const rows: FlatRow[] = [
        makeFlatRow({
          invocation_id: "inv-kimi-r1",
          meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
          torque_nm: 39,
        }),
        makeFlatRow({
          invocation_id: "inv-qwen-r1",
          meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
          torque_nm: 39,
        }),
      ];

      const { report } = runConsensusPass(rows);

      expect(report.summary).toMatchObject({
        total_pages: 1,
        total_fasteners: 1,
        total_consensus: 1,
        total_disputed: 0,
        avg_vote_strength: expect.any(Number),
        models_contributing: expect.any(Array),
      });

      expect(report.pages.length).toBe(1);
      expect(report.pages[0]).toMatchObject({
        page: 6617,
        manual: "BB6",
        total_fasteners: 1,
        consensus_count: 1,
        disputed_count: 0,
        avg_vote_strength: expect.any(Number),
        models_contributing: expect.any(Array),
      });
    });
  });
});
