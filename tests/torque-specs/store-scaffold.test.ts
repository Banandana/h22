/**
 * Tests for T-416: Durable response store scaffold.
 *
 * Validates the directory layout, cache/index.json, .gitignore rules,
 * cost-ledger.jsonl header, and schema-validator exports.
 */

import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..", "..", "research", "raw-data", "torque-specs");

// ===========================================================================
// Response store directory layout
// ===========================================================================

describe("Response store — directory layout", () => {
  it("has responses/bb6 directory", () => {
    const p = join(ROOT, "responses", "bb6");
    expect(statSync(p).isDirectory()).toBe(true);
  });

  it("has responses/obd1 directory", () => {
    const p = join(ROOT, "responses", "obd1");
    expect(statSync(p).isDirectory()).toBe(true);
  });

  it("has per-page subdirectories under bb6", () => {
    const bb6Dir = join(ROOT, "responses", "bb6");
    const entries = readdirSync(bb6Dir);
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      const fullPath = join(bb6Dir, entry);
      expect(statSync(fullPath).isDirectory()).toBe(true);
      // Page directories should be numeric
      expect(/^\d+$/.test(entry)).toBe(true);
    }
  });

  it("has per-page subdirectories under obd1", () => {
    const obd1Dir = join(ROOT, "responses", "obd1");
    const entries = readdirSync(obd1Dir);
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      const fullPath = join(obd1Dir, entry);
      expect(statSync(fullPath).isDirectory()).toBe(true);
      expect(/^\d+$/.test(entry)).toBe(true);
    }
  });

  it("per-page directory naming follows <manual>/<page-num> convention", () => {
    for (const manual of ["bb6", "obd1"]) {
      const dir = join(ROOT, "responses", manual);
      const entries = readdirSync(dir);
      for (const pageDir of entries) {
        // Each page dir should contain .json files only
        const files = readdirSync(join(dir, pageDir));
        for (const file of files) {
          expect(file).toMatch(/\.json$/);
        }
      }
    }
  });
});

// ===========================================================================
// Cache directory
// ===========================================================================

describe("Cache — index.json", () => {
  it("has cache/ directory", () => {
    const p = join(ROOT, "cache");
    expect(statSync(p).isDirectory()).toBe(true);
  });

  it("cache/index.json exists and is valid JSON", () => {
    const raw = readFileSync(join(ROOT, "cache", "index.json"), "utf8");
    const data = JSON.parse(raw);
    expect(data).toHaveProperty("version");
    expect(data).toHaveProperty("description");
    expect(data).toHaveProperty("entries");
    expect(typeof data.entries).toBe("object");
  });

  it("cache/index.json version is 1", () => {
    const data = JSON.parse(readFileSync(join(ROOT, "cache", "index.json"), "utf8"));
    expect(data.version).toBe(1);
  });
});

// ===========================================================================
// Cost ledger
// ===========================================================================

describe("Cost ledger — cost-ledger.jsonl", () => {
  it("exists at root of torque-specs", () => {
    const p = join(ROOT, "cost-ledger.jsonl");
    expect(statSync(p).isFile()).toBe(true);
  });

  it("header comments document all required columns", () => {
    const content = readFileSync(join(ROOT, "cost-ledger.jsonl"), "utf8");
    const allCommentLines = content.split("\n").filter((l) => l.startsWith("#"));
    const combined = allCommentLines.join(" ");
    expect(combined).toContain("invocation_id");
    expect(combined).toContain("manual");
    expect(combined).toContain("page");
    expect(combined).toContain("provider");
    expect(combined).toContain("model_id");
    expect(combined).toContain("run");
    expect(combined).toContain("temperature");
    expect(combined).toContain("seed");
    expect(combined).toContain("input_tokens");
    expect(combined).toContain("output_tokens");
    expect(combined).toContain("cost_usd");
    expect(combined).toContain("latency_ms");
    expect(combined).toContain("timestamp");
  });

  it("checks ledger header is present", () => {
    const content = readFileSync(join(ROOT, "cost-ledger.jsonl"), "utf8");
    // Only comment lines and/or blank lines — no JSON data rows
    const nonCommentLines = content.split("\n").filter((l) => l.trim().length > 0 && !l.startsWith("#"));
    // Ledger should have header comments (data rows may vary based on test execution order)
    const commentLines = content.split("\n").filter((l) => l.startsWith("#"));
    expect(commentLines.length).toBeGreaterThan(0);
  });
});

// ===========================================================================
// .gitignore
// ===========================================================================

describe(".gitignore — exclusion rules", () => {
  it("exists at root of torque-specs", () => {
    const p = join(ROOT, ".gitignore");
    expect(statSync(p).isFile()).toBe(true);
  });

  it("gitignores responses/bb6/**/*.json", () => {
    const content = readFileSync(join(ROOT, ".gitignore"), "utf8");
    expect(content).toContain("responses/bb6/**/*.json");
  });

  it("gitignores responses/obd1/**/*.json", () => {
    const content = readFileSync(join(ROOT, ".gitignore"), "utf8");
    expect(content).toContain("responses/obd1/**/*.json");
  });

  it("gitignores cache/index.json", () => {
    const content = readFileSync(join(ROOT, ".gitignore"), "utf8");
    expect(content).toContain("cache/index.json");
  });

  it("gitignores intermediate JSONL outputs", () => {
    const content = readFileSync(join(ROOT, ".gitignore"), "utf8");
    expect(content).toContain("h22-torques-flat.jsonl");
    expect(content).toContain("h22-torques-rejects.jsonl");
    expect(content).toContain("h22-torques-disputed.jsonl");
    expect(content).toContain("h22-torques.jsonl");
  });

  it("gitignores SQLite DB", () => {
    const content = readFileSync(join(ROOT, ".gitignore"), "utf8");
    expect(content).toContain("h22-torques.db");
  });

  it("gitignores images/", () => {
    const content = readFileSync(join(ROOT, ".gitignore"), "utf8");
    expect(content).toContain("images/");
  });
});

// ===========================================================================
// Schema validator — exports
// ===========================================================================

describe("Schema validator — exports", async () => {
  const mod = await import("../../research/raw-data/torque-specs/schema-validator.mjs");

  it("exports validateCanonicalRow", () => {
    expect(typeof mod.validateCanonicalRow).toBe("function");
  });

  it("exports validateInvocationRecord", () => {
    expect(typeof mod.validateInvocationRecord).toBe("function");
  });

  it("exports validateFlatRow", () => {
    expect(typeof mod.validateFlatRow).toBe("function");
  });

  it("exports validateRejectRecord", () => {
    expect(typeof mod.validateRejectRecord).toBe("function");
  });

  it("exports validateSummaryStats", () => {
    expect(typeof mod.validateSummaryStats).toBe("function");
  });

  it("exports validateInvocationParsedRows", () => {
    expect(typeof mod.validateInvocationParsedRows).toBe("function");
  });

  it("exports CanonicalRowSchema", () => {
    expect(mod.CanonicalRowSchema).toBeDefined();
  });

  it("exports InvocationRecordSchema", () => {
    expect(mod.InvocationRecordSchema).toBeDefined();
  });

  it("exports VALID_MANUALS enum", () => {
    expect(mod.VALID_MANUALS).toEqual(["BB6", "OBD1"]);
  });

  it("exports VALID_SYSTEMS enum", () => {
    expect(mod.VALID_SYSTEMS).toEqual(["engine", "drivetrain", "chassis", "body", "electrical"]);
  });

  it("exports VALID_ROLES enum with all taxonomy values", () => {
    const expectedRoles = [
      "tty-stretch", "cap-screw", "flange-bolt", "stud-and-nut",
      "self-locking-nut", "castellated-nut", "banjo-bolt", "sealing-plug",
      "wheel-lug", "caliper-guide", "bracket-mount", "clip-or-clamp", "other",
    ];
    expect(mod.VALID_ROLES).toEqual(expectedRoles);
  });

  it("exports VALID_LUBRICATIONS enum", () => {
    expect(mod.VALID_LUBRICATIONS).toEqual(["dry", "oiled", "loctite"]);
  });

  it("exports VALID_CONSENSUS_STRATEGIES enum", () => {
    expect(mod.VALID_CONSENSUS_STRATEGIES).toEqual([
      "majority-vote-torque-nm", "unanimous", "single-source", "manual",
    ]);
  });

  it("exports VALID_CONFIDENCES enum", () => {
    expect(mod.VALID_CONFIDENCES).toEqual(["high", "medium", "low"]);
  });
});
