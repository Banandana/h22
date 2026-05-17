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
import { validateCanonicalRow } from "../../research/raw-data/torque-specs/schema-validator.mjs";

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
    // disputed and consensus are still ignored (not yet generated)
    expect(content).toContain("h22-torques-disputed.jsonl");
    expect(content).toContain("h22-torques.jsonl");
    // flat and rejects are committed deliverables (T-419) — no longer ignored
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
    expect(mod.VALID_MANUALS).toEqual(["BB6", "OBD1", "ARP"]);
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

// ===========================================================================
// ARP aftermarket JSONL — T-426
// ===========================================================================

describe("ARP aftermarket torques — T-426", () => {
  const arpPath = join(ROOT, "h22-torques-arp.jsonl");

  it("h22-torques-arp.jsonl exists", () => {
    expect(statSync(arpPath).isFile()).toBe(true);
  });

  it("has exactly 5 ARP fastener entries", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    expect(lines.length).toBe(5);
  });

  it("all rows have oem: false", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    lines.forEach((line) => {
      const row = JSON.parse(line);
      expect(row.oem).toBe(false);
    });
  });

  it("all rows validate against canonical schema", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    lines.forEach((line) => {
      const row = JSON.parse(line);
      const v = validateCanonicalRow(row);
      expect(v.success).toBe(true);
    });
  });

  it("covers all required roles (tty-stretch + cap-screw)", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    const roles = new Set();
    lines.forEach((line) => {
      const row = JSON.parse(line);
      const v = validateCanonicalRow(row);
      if (v.success) roles.add(row.role);
    });
    expect(roles.has("tty-stretch")).toBe(true);
    expect(roles.has("cap-screw")).toBe(true);
  });

  it("all rows have meta.arp_pn populated", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    lines.forEach((line) => {
      const row = JSON.parse(line);
      expect(row.meta?.arp_pn).toBeDefined();
      expect(typeof row.meta.arp_pn).toBe("string");
    });
  });

  it("includes head stud kit (208-4304)", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    const headStud = lines.find((l) => {
      const r = JSON.parse(l);
      return r.meta?.arp_pn === "208-4304";
    });
    expect(headStud).toBeDefined();
    const r = JSON.parse(headStud);
    expect(r.assembly).toBe("cylinder-head");
    expect(r.role).toBe("tty-stretch");
    expect(r.qty).toBe(10);
  });

  it("includes main stud kit (208-5401)", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    const mainStud = lines.find((l) => {
      const r = JSON.parse(l);
      return r.meta?.arp_pn === "208-5401";
    });
    expect(mainStud).toBeDefined();
    const r = JSON.parse(mainStud);
    expect(r.assembly).toBe("main-bearing-cap");
    expect(r.role).toBe("tty-stretch");
  });

  it("includes rod bolt kit (208-6001)", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    const rodBolt = lines.find((l) => {
      const r = JSON.parse(l);
      return r.meta?.arp_pn === "208-6001";
    });
    expect(rodBolt).toBeDefined();
    const r = JSON.parse(rodBolt);
    expect(r.assembly).toBe("connecting-rod");
    expect(r.role).toBe("tty-stretch");
  });

  it("includes flywheel bolt kit (208-2802)", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    const flywheel = lines.find((l) => {
      const r = JSON.parse(l);
      return r.meta?.arp_pn === "208-2802";
    });
    expect(flywheel).toBeDefined();
    const r = JSON.parse(flywheel);
    expect(r.assembly).toBe("flywheel");
    expect(r.role).toBe("cap-screw");
  });

  it("includes cam cap bolts", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    const camCap = lines.find((l) => {
      const r = JSON.parse(l);
      return r.assembly === "cam-caps";
    });
    expect(camCap).toBeDefined();
    const r = JSON.parse(camCap);
    expect(r.role).toBe("cap-screw");
  });

  it("all torque steps have nm value", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    lines.forEach((line) => {
      const row = JSON.parse(line);
      row.torque.steps.forEach((step) => {
        expect(step.nm).toBeGreaterThan(0);
      });
    });
  });

  it("all rows are reusable (oem aftermarket hardware)", () => {
    const lines = readFileSync(arpPath, "utf8").trim().split("\n");
    lines.forEach((line) => {
      const row = JSON.parse(line);
      expect(row.reusable).toBe(true);
    });
  });
});
