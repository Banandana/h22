import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import {
  readFileSync,
  writeFileSync,
  unlinkSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { join } from "node:path";

// ── test fixtures ──────────────────────────────────────────────────────────

const TMP = join(process.cwd(), "tmp-render-test");

function mkFixture() {
  mkdirSync(TMP, { recursive: true });

  const oemRows = [
    {
      id: "BB6-p136-cylhead-headbolt",
      source: { manual: "BB6", page: 136, figure: null },
      system: "engine",
      assembly: "cylinder-head",
      fastener_name: "Cylinder head bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
      qty: 10,
      role: "tty-stretch",
      torque: {
        steps: [
          { pass: 1, nm: 39, kgfm: 4, lbft: 29, angle_deg: null },
          { pass: 2, nm: null, kgfm: null, lbft: null, angle_deg: 90 },
        ],
        sequence_ref: "fig.2",
      },
      lubrication: "dry",
      reusable: false,
      honda_part_number: "90005-PCB-003",
      notes: "Torque in sequence",
      confidence: "high",
      corroboration: {
        consensus_strategy: "unanimous",
        agreeing_invocations: [],
        disagreeing_invocations: [],
        vote_strength: 1,
        intra_model_consistency: {},
        single_source: false,
      },
      conflict_group_id: null,
      oem: true,
      applies_to: {},
      meta: {},
    },
    {
      id: "BB6-p137-maincap-bolt",
      source: { manual: "BB6", page: 137, figure: null },
      system: "engine",
      assembly: "main-bearing-cap",
      fastener_name: "Main bearing cap bolt",
      thread: { nominal_mm: 11, pitch_mm: 1.5, length_mm: null, grade: "8.8" },
      qty: 10,
      role: "tty-stretch",
      torque: {
        steps: [{ pass: 1, nm: 73, kgfm: 7.4, lbft: 54, angle_deg: 90 }],
        sequence_ref: "criss-cross",
      },
      lubrication: "oiled",
      reusable: false,
      honda_part_number: "90011-PC0-003",
      notes: null,
      confidence: "high",
      corroboration: {
        consensus_strategy: "majority-vote-torque-nm",
        agreeing_invocations: [],
        disagreeing_invocations: [],
        vote_strength: 0.667,
        intra_model_consistency: {},
        single_source: false,
      },
      conflict_group_id: null,
      oem: true,
      applies_to: {},
      meta: {},
    },
    // Cross-page conflict row
    {
      id: "BB6-p200-crankpulley-bolt",
      source: { manual: "BB6", page: 200, figure: null },
      system: "drivetrain",
      assembly: "flywheel",
      fastener_name: "Crankshaft pulley bolt",
      thread: { nominal_mm: 12, pitch_mm: 1.25, length_mm: null, grade: null },
      qty: 1,
      role: "cap-screw",
      torque: {
        steps: [{ pass: 1, nm: 180, kgfm: 18.4, lbft: 133, angle_deg: null }],
        sequence_ref: null,
      },
      lubrication: "dry",
      reusable: true,
      honda_part_number: null,
      notes: null,
      confidence: "medium",
      corroboration: {
        consensus_strategy: "single-source",
        agreeing_invocations: [],
        disagreeing_invocations: [],
        vote_strength: 1,
        intra_model_consistency: {},
        single_source: true,
      },
      conflict_group_id: "cg-001",
      oem: true,
      applies_to: {},
      meta: {},
    },
  ];

  const arpRows = [
    {
      id: "ARP-h22-headstud",
      source: { manual: "ARP", page: null },
      applies_to: {
        trans: "both",
        trim: "all",
        my: "all",
        engine_codes: ["H22A"],
      },
      system: "engine",
      assembly: "cylinder-head",
      fastener_name: "ARP cylinder head stud",
      thread: {
        nominal_mm: 12,
        pitch_mm: 1.75,
        length_mm: null,
        grade: "ARP 8740",
      },
      qty: 10,
      role: "tty-stretch",
      torque: {
        steps: [{ pass: 1, nm: 122, kgfm: 12.4, lbft: 90, angle_deg: null }],
        sequence_ref: "OEM seq",
      },
      lubrication: "arp-ultra-torque",
      reusable: true,
      reuse_conditions: null,
      honda_part_number: null,
      tty: { stretch_max_mm: null, pre_stretch_mm: null },
      special_tool: null,
      notes: "ARP 208-4304",
      confidence: "high",
      oem: false,
      corroboration: {
        consensus_strategy: "single-source",
        agreeing_invocations: [],
        disagreeing_invocations: [],
        vote_strength: 1,
        intra_model_consistency: {},
        single_source: true,
      },
      conflict_group_id: null,
      meta: {
        arp_pn: "208-4304",
        arp_kit_name: "H22 head stud kit",
        arp_material: "8740 Chrome Moly",
        arp_tensile_psi: 200000,
        arp_url: "https://arp-bolts.com/kit/208-4304",
        arp_includes: "studs, washers, nuts, lube",
      },
    },
  ];

  writeFileSync(
    join(TMP, "h22-torques.jsonl"),
    oemRows.map((r) => JSON.stringify(r)).join("\n") + "\n",
  );
  writeFileSync(
    join(TMP, "h22-torques-arp.jsonl"),
    arpRows.map((r) => JSON.stringify(r)).join("\n") + "\n",
  );

  return { oemRows, arpRows };
}

function cleanup() {
  try {
    rmSync(TMP, { recursive: true, force: true });
  } catch {
    // ignore
  }
}

before(() => mkFixture());
after(() => cleanup());

// ── tests ──────────────────────────────────────────────────────────────────

describe("render-torque-index.mjs", () => {
  test("exits cleanly and writes both output files", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output");
    mkdirSync(outDir, { recursive: true });

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const locPath = join(outDir, "torque-by-location.md");
    const fasPath = join(outDir, "torque-by-fastener.md");
    assert.ok(
      readFileSync(locPath, "utf8").length > 0,
      "location file non-empty",
    );
    assert.ok(
      readFileSync(fasPath, "utf8").length > 0,
      "fastener file non-empty",
    );
  });

  test("torque-by-location.md has correct heading structure", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output2");
    mkdirSync(outDir, { recursive: true });

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const locMd = readFileSync(join(outDir, "torque-by-location.md"), "utf8");

    // Should have system headings
    assert.ok(
      locMd.includes("## Engine"),
      "should have Engine section heading",
    );
    assert.ok(
      locMd.includes("## Drivetrain"),
      "should have Drivetrain section heading",
    );
    // Assembly sub-heading
    assert.ok(
      locMd.includes("### Cylinder Head") ||
        locMd.includes("### cylinder head"),
      "should have assembly heading",
    );
    // ARP subsection
    assert.ok(
      locMd.includes("Aftermarket Equivalents (ARP)") ||
        locMd.includes("Aftermarket"),
      "should have ARP aftermarket section",
    );
  });

  test("torque-by-location.md includes vote badges", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output3");
    mkdirSync(outDir, { recursive: true });

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const locMd = readFileSync(join(outDir, "torque-by-location.md"), "utf8");

    // Row with vote_strength=1 → should show [100%] or [1×]
    // Row with vote_strength=0.667 → should show [67%]
    // Single-source row → should show [1×]
    assert.ok(
      /\[\d+%]/.test(locMd) || /\[1×\]/.test(locMd),
      "should contain vote badges",
    );
  });

  test("torque-by-location.md shows conflict callout for conflict_group_id rows", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output4");
    mkdirSync(outDir, { recursive: true });

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const locMd = readFileSync(join(outDir, "torque-by-location.md"), "utf8");

    assert.ok(
      locMd.includes("⚠") && locMd.includes("conflict"),
      "should show conflict callout for conflict_group_id rows",
    );
    assert.ok(
      locMd.includes("cg-001"),
      "should reference the conflict group id",
    );
  });

  test("torque-by-fastener.md groups by (thread, role)", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output5");
    mkdirSync(outDir, { recursive: true });

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const fasMd = readFileSync(join(outDir, "torque-by-fastener.md"), "utf8");

    // Should have sections for each (thread, role) group
    // M10x1.25_tty-stretch, M11x1.5_tty-stretch, M12x1.25_cap-screw, M12x1.75_tty-stretch
    assert.ok(
      /## M\d+ × \d+\.\d+ —/.test(fasMd),
      "should have thread-based section headings",
    );
    // Should mention tty-stretch (rendered as "tty stretch" with spaces)
    assert.ok(
      fasMd.includes("tty stretch") ||
        fasMd.includes("tty-stretch") ||
        fasMd.includes("TTY Stretch"),
      "should reference role names",
    );
  });

  test("torque-by-fastener.md includes ARP subsection", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output6");
    mkdirSync(outDir, { recursive: true });

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const fasMd = readFileSync(join(outDir, "torque-by-fastener.md"), "utf8");

    assert.ok(
      fasMd.includes("Aftermarket") && fasMd.includes("ARP"),
      "should have ARP aftermarket section in fastener view",
    );
    assert.ok(fasMd.includes("208-4304"), "should include ARP part number");
  });

  test("handles empty JSONL inputs gracefully", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output7");
    mkdirSync(outDir, { recursive: true });

    // Write empty files
    writeFileSync(join(TMP, "empty-oem.jsonl"), "");
    writeFileSync(join(TMP, "empty-arp.jsonl"), "");

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "empty-oem.jsonl")} ` +
        `--arp ${join(TMP, "empty-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const locMd = readFileSync(join(outDir, "torque-by-location.md"), "utf8");
    const fasMd = readFileSync(join(outDir, "torque-by-fastener.md"), "utf8");

    assert.ok(locMd.length > 0, "location md should exist even with no data");
    assert.ok(fasMd.length > 0, "fastener md should exist even with no data");
    // Should still have headers
    assert.ok(locMd.includes("# Torque Specifications by Location"));
    assert.ok(fasMd.includes("# Torque Specifications by Fastener"));
  });

  test("idempotent: running twice produces same output", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output8");
    mkdirSync(outDir, { recursive: true });

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const locFirst = readFileSync(
      join(outDir, "torque-by-location.md"),
      "utf8",
    );
    const fasFirst = readFileSync(
      join(outDir, "torque-by-fastener.md"),
      "utf8",
    );

    // Run again
    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const locSecond = readFileSync(
      join(outDir, "torque-by-location.md"),
      "utf8",
    );
    const fasSecond = readFileSync(
      join(outDir, "torque-by-fastener.md"),
      "utf8",
    );

    assert.strictEqual(
      locFirst,
      locSecond,
      "location md should be identical on re-run",
    );
    assert.strictEqual(
      fasFirst,
      fasSecond,
      "fastener md should be identical on re-run",
    );
  });

  test("renders multi-pass torque steps correctly", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output9");
    mkdirSync(outDir, { recursive: true });

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const locMd = readFileSync(join(outDir, "torque-by-location.md"), "utf8");

    // The cylinder head bolt has 2 passes: 39 N·m + 90°
    assert.ok(
      locMd.includes("Pass 1") && locMd.includes("Pass 2"),
      "should render multi-pass torque steps",
    );
    assert.ok(locMd.includes("90°"), "should show angle degrees");
    assert.ok(locMd.includes("39 N·m"), "should show first pass torque");
  });

  test("vote badge logic: single-source shows 1×, high vote shows percentage", async () => {
    const { execSync } = await import("node:child_process");
    const outDir = join(TMP, "output10");
    mkdirSync(outDir, { recursive: true });

    execSync(
      `node ${join(process.cwd(), "scripts", "render-torque-index.mjs")} ` +
        `--torques ${join(TMP, "h22-torques.jsonl")} ` +
        `--arp ${join(TMP, "h22-torques-arp.jsonl")} ` +
        `--out-dir ${outDir}`,
      { stdio: "pipe" },
    );

    const locMd = readFileSync(join(outDir, "torque-by-location.md"), "utf8");

    // crankpulley-bolt has single_source=true → should show [1×]
    assert.ok(
      locMd.includes("[1×]"),
      "single-source row should show [1×] badge",
    );
    // maincap-bolt has vote_strength=0.667 → should show [67%]
    assert.ok(
      locMd.includes("[67%]") || locMd.includes("[66%]"),
      "low-vote row should show percentage badge",
    );
  });
});
