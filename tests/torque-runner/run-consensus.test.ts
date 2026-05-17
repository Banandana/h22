import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { writeFileSync, readFileSync, unlinkSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const FIXTURES_DIR = resolve(__dirname, "../fixtures");
const OUTPUT_DIR = resolve(FIXTURES_DIR, "output");

/** Helper: write a flat JSONL file and return its path */
function writeFlatRows(rows: unknown[], filename: string): string {
  const filePath = resolve(FIXTURES_DIR, filename);
  writeFileSync(filePath, rows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");
  return filePath;
}

/** Helper: clean up output files */
function cleanupOutput(): void {
  for (const file of ["h22-torques.jsonl", "h22-torques-disputed.jsonl", "consensus-report.md"]) {
    const p = resolve(OUTPUT_DIR, file);
    if (existsSync(p)) unlinkSync(p);
  }
}

describe("run-consensus.ts runner", () => {
  beforeEach(() => {
    if (!existsSync(FIXTURES_DIR)) {
      const fs = require("node:fs");
      fs.mkdirSync(FIXTURES_DIR, { recursive: true });
    }
    if (!existsSync(OUTPUT_DIR)) {
      const fs = require("node:fs");
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }
  });

  afterEach(() => {
    cleanupOutput();
    // Clean up fixture files
    for (const f of ["test-flat.jsonl", "empty-flat.jsonl", "multi-page-flat.jsonl"]) {
      const p = resolve(FIXTURES_DIR, f);
      if (existsSync(p)) unlinkSync(p);
    }
  });

  it("exits non-zero when input file not found", () => {
    const result = spawnSync(
      "tsx",
      [
        resolve(__dirname, "../../src/torque-runner/run-consensus.ts"),
        "--input",
        "/nonexistent/path/flat.jsonl",
        "--output-dir",
        OUTPUT_DIR,
      ],
      { encoding: "utf-8", timeout: 10000 }
    );

    expect(result.status).toBe(1);
    expect(result.stderr).toContain("Error: input file not found");
  });

  it("writes empty output files when input is empty", () => {
    writeFileSync(resolve(FIXTURES_DIR, "empty-flat.jsonl"), "", "utf-8");

    const result = spawnSync(
      "tsx",
      [
        resolve(__dirname, "../../src/torque-runner/run-consensus.ts"),
        "--input",
        resolve(FIXTURES_DIR, "empty-flat.jsonl"),
        "--output-dir",
        OUTPUT_DIR,
      ],
      { encoding: "utf-8", timeout: 10000 }
    );

    expect(result.status).toBe(0);
    expect(existsSync(resolve(OUTPUT_DIR, "h22-torques.jsonl"))).toBe(true);
    expect(existsSync(resolve(OUTPUT_DIR, "h22-torques-disputed.jsonl"))).toBe(true);
    expect(existsSync(resolve(OUTPUT_DIR, "consensus-report.md"))).toBe(true);
  });

  it("produces valid output files from synthetic data", () => {
    const rows = [
      {
        id: "row-1",
        invocation_id: "inv-kimi-r1",
        manual: "BB6" as const,
        page: 6617,
        system: "engine",
        assembly: "cylinder-head",
        fastener_name: "Cylinder head bolt",
        thread_nominal_mm: 10,
        thread_pitch_mm: 1.25,
        thread_length_mm: null,
        thread_grade: null,
        qty: 10,
        role: "tty-stretch",
        torque_nm: 39,
        torque_steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }],
        torque_sequence_ref: null,
        lubrication: "oiled",
        reusable: false,
        reuse_conditions: null,
        honda_part_number: null,
        tty_stretch_max_mm: null,
        tty_pre_stretch_mm: null,
        special_tool: null,
        notes: null,
        confidence: "high",
        oem: true,
        meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
      },
      {
        id: "row-2",
        invocation_id: "inv-qwen-r1",
        manual: "BB6" as const,
        page: 6617,
        system: "engine",
        assembly: "cylinder-head",
        fastener_name: "Cylinder head bolt",
        thread_nominal_mm: 10,
        thread_pitch_mm: 1.25,
        thread_length_mm: null,
        thread_grade: null,
        qty: 10,
        role: "tty-stretch",
        torque_nm: 39,
        torque_steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }],
        torque_sequence_ref: null,
        lubrication: "oiled",
        reusable: false,
        reuse_conditions: null,
        honda_part_number: null,
        tty_stretch_max_mm: null,
        tty_pre_stretch_mm: null,
        special_tool: null,
        notes: null,
        confidence: "high",
        oem: true,
        meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
      },
    ];

    writeFileSync(resolve(FIXTURES_DIR, "test-flat.jsonl"), rows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");

    const result = spawnSync(
      "tsx",
      [
        resolve(__dirname, "../../src/torque-runner/run-consensus.ts"),
        "--input",
        resolve(FIXTURES_DIR, "test-flat.jsonl"),
        "--output-dir",
        OUTPUT_DIR,
      ],
      { encoding: "utf-8", timeout: 10000 }
    );

    expect(result.status).toBe(0);

    // Verify h22-torques.jsonl has content
    const torquesContent = readFileSync(resolve(OUTPUT_DIR, "h22-torques.jsonl"), "utf-8");
    const torquesLines = torquesContent.trim().split("\n").filter((l) => l.trim());
    expect(torquesLines.length).toBeGreaterThan(0);

    // Verify each line is valid JSON with required fields
    for (const line of torquesLines) {
      const row = JSON.parse(line);
      expect(row.id).toBeDefined();
      expect(row.source).toBeDefined();
      expect(row.corroboration).toBeDefined();
      expect(row.corroboration.agreeing_invocations).toBeDefined();
      expect(row.corroboration.disagreeing_invocations).toBeDefined();
      expect(row.corroboration.vote_strength).toBeDefined();
      expect(row.corroboration.single_source).toBeDefined();
    }

    // Verify consensus-report.md has content
    const reportContent = readFileSync(resolve(OUTPUT_DIR, "consensus-report.md"), "utf-8");
    expect(reportContent).toContain("# Consensus Report");
    expect(reportContent).toContain("## Summary");
  });

  it("handles multi-page input correctly", () => {
    const rows = [
      // Page 6617 - agree
      {
        id: "row-1", invocation_id: "inv-kimi-r1", manual: "BB6" as const, page: 6617,
        system: "engine", assembly: "cylinder-head", fastener_name: "Cylinder head bolt",
        thread_nominal_mm: 10, thread_pitch_mm: 1.25, thread_length_mm: null, thread_grade: null,
        qty: 10, role: "tty-stretch", torque_nm: 39,
        torque_steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }],
        torque_sequence_ref: null, lubrication: "oiled", reusable: false, reuse_conditions: null,
        honda_part_number: null, tty_stretch_max_mm: null, tty_pre_stretch_mm: null,
        special_tool: null, notes: null, confidence: "high", oem: true,
        meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6617/kimi.json" },
      },
      {
        id: "row-2", invocation_id: "inv-qwen-r1", manual: "BB6" as const, page: 6617,
        system: "engine", assembly: "cylinder-head", fastener_name: "Cylinder head bolt",
        thread_nominal_mm: 10, thread_pitch_mm: 1.25, thread_length_mm: null, thread_grade: null,
        qty: 10, role: "tty-stretch", torque_nm: 39,
        torque_steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }],
        torque_sequence_ref: null, lubrication: "oiled", reusable: false, reuse_conditions: null,
        honda_part_number: null, tty_stretch_max_mm: null, tty_pre_stretch_mm: null,
        special_tool: null, notes: null, confidence: "high", oem: true,
        meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6617/qwen.json" },
      },
      // Page 6620 - disagree
      {
        id: "row-3", invocation_id: "inv-kimi-r1", manual: "BB6" as const, page: 6620,
        system: "engine", assembly: "main-bearings", fastener_name: "Main bearing cap bolt",
        thread_nominal_mm: 12, thread_pitch_mm: 1.75, thread_length_mm: null, thread_grade: null,
        qty: 5, role: "tty-stretch", torque_nm: 43,
        torque_steps: [{ pass: 1, nm: 43, kgfm: 4.4, lbft: 32, angle_deg: null }],
        torque_sequence_ref: null, lubrication: "oiled", reusable: false, reuse_conditions: null,
        honda_part_number: null, tty_stretch_max_mm: null, tty_pre_stretch_mm: null,
        special_tool: null, notes: null, confidence: "high", oem: true,
        meta: { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/6620/kimi.json" },
      },
      {
        id: "row-4", invocation_id: "inv-qwen-r1", manual: "BB6" as const, page: 6620,
        system: "engine", assembly: "main-bearings", fastener_name: "Main bearing cap bolt",
        thread_nominal_mm: 12, thread_pitch_mm: 1.75, thread_length_mm: null, thread_grade: null,
        qty: 5, role: "tty-stretch", torque_nm: 50,
        torque_steps: [{ pass: 1, nm: 50, kgfm: 5.1, lbft: 37, angle_deg: null }],
        torque_sequence_ref: null, lubrication: "oiled", reusable: false, reuse_conditions: null,
        honda_part_number: null, tty_stretch_max_mm: null, tty_pre_stretch_mm: null,
        special_tool: null, notes: null, confidence: "high", oem: true,
        meta: { model_id: "together.qwen3-vl-235b", run: "r1", temperature: 0, response_path: "responses/bb6/6620/qwen.json" },
      },
    ];

    writeFileSync(resolve(FIXTURES_DIR, "multi-page-flat.jsonl"), rows.map((r) => JSON.stringify(r)).join("\n") + "\n", "utf-8");

    const result = spawnSync(
      "tsx",
      [
        resolve(__dirname, "../../src/torque-runner/run-consensus.ts"),
        "--input",
        resolve(FIXTURES_DIR, "multi-page-flat.jsonl"),
        "--output-dir",
        OUTPUT_DIR,
      ],
      { encoding: "utf-8", timeout: 10000 }
    );

    expect(result.status).toBe(0);

    const reportContent = readFileSync(resolve(OUTPUT_DIR, "consensus-report.md"), "utf-8");
    expect(reportContent).toContain("Total pages processed | 2");
    expect(reportContent).toContain("Consensus rows emitted | 1");
    expect(reportContent).toContain("Disputed rows | 1");
  });
});
