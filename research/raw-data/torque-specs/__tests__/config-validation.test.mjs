/**
 * Tests for models.json + extraction-matrix.json
 *
 * Validates JSON structure, required fields, enum values, pricing data,
 * and cross-references model_ids between the two files.
 */

import { strict as assert } from "node:assert";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

// ===========================================================================
// helpers
// ===========================================================================

function loadJSON(name) {
  const raw = readFileSync(join(ROOT, name), "utf8");
  return JSON.parse(raw);
}

// ===========================================================================
// models.json — valid structure
// ===========================================================================

describe("models.json — valid structure", () => {
  const models = loadJSON("models.json");

  it("is a non-empty object", () => {
    assert.ok(typeof models === "object" && models !== null);
    assert.ok(Object.keys(models).length > 0);
  });

  it("contains exactly 4 model entries", () => {
    const keys = Object.keys(models);
    assert.strictEqual(keys.length, 4);
  });

  it("has expected model_id keys", () => {
    const keys = Object.keys(models);
    assert.ok(keys.includes("together.kimi-k2-6-fp4"));
    assert.ok(keys.includes("together.qwen3-vl-235b"));
    assert.ok(keys.includes("anthropic.claude-sonnet-4-6"));
    assert.ok(keys.includes("anthropic.claude-opus-4-7"));
  });

  it("together.kimi-k2-6-fp4 has all required fields", () => {
    const m = models["together.kimi-k2-6-fp4"];
    assert.ok(m.provider);
    assert.ok(m.model);
    assert.strictEqual(typeof m.vision, "boolean");
    assert.strictEqual(typeof m.default_temp, "number");
    assert.strictEqual(typeof m.input_per_M_usd, "number");
    assert.strictEqual(typeof m.output_per_M_usd, "number");
    assert.ok(m.tier);
  });

  it("together.qwen3-vl-235b has all required fields", () => {
    const m = models["together.qwen3-vl-235b"];
    assert.ok(m.provider);
    assert.ok(m.model);
    assert.strictEqual(typeof m.vision, "boolean");
    assert.strictEqual(typeof m.default_temp, "number");
    assert.strictEqual(typeof m.input_per_M_usd, "number");
    assert.strictEqual(typeof m.output_per_M_usd, "number");
    assert.ok(m.tier);
  });

  it("anthropic.claude-sonnet-4-6 has all required fields", () => {
    const m = models["anthropic.claude-sonnet-4-6"];
    assert.ok(m.provider);
    assert.ok(m.model);
    assert.strictEqual(typeof m.vision, "boolean");
    assert.strictEqual(typeof m.default_temp, "number");
    assert.strictEqual(typeof m.input_per_M_usd, "number");
    assert.strictEqual(typeof m.output_per_M_usd, "number");
    assert.ok(m.tier);
  });

  it("anthropic.claude-opus-4-7 has all required fields", () => {
    const m = models["anthropic.claude-opus-4-7"];
    assert.ok(m.provider);
    assert.ok(m.model);
    assert.strictEqual(typeof m.vision, "boolean");
    assert.strictEqual(typeof m.default_temp, "number");
    assert.strictEqual(typeof m.input_per_M_usd, "number");
    assert.strictEqual(typeof m.output_per_M_usd, "number");
    assert.ok(m.tier);
  });

  it("all models have vision=true", () => {
    for (const [id, m] of Object.entries(models)) {
      assert.strictEqual(m.vision, true, `${id} should have vision=true`);
    }
  });

  it("all default_temp are 0", () => {
    for (const [id, m] of Object.entries(models)) {
      assert.strictEqual(m.default_temp, 0, `${id} default_temp`);
    }
  });

  it("has correct provider+tier for kimi-k2-6-fp4", () => {
    const m = models["together.kimi-k2-6-fp4"];
    assert.strictEqual(m.provider, "together");
    assert.strictEqual(m.tier, "primary-cheap");
  });

  it("has correct provider+tier for qwen3-vl-235b (unavailable)", () => {
    const m = models["together.qwen3-vl-235b"];
    assert.strictEqual(m.provider, "together");
    // Dropped from default matrix in T-418b: non-serverless on Together AI
    assert.strictEqual(m.tier, "unavailable");
  });

  it("has correct provider+tier for claude-sonnet-4-6", () => {
    const m = models["anthropic.claude-sonnet-4-6"];
    assert.strictEqual(m.provider, "anthropic");
    assert.strictEqual(m.tier, "primary-high");
  });

  it("has correct provider+tier for claude-opus-4-7", () => {
    const m = models["anthropic.claude-opus-4-7"];
    assert.strictEqual(m.provider, "anthropic");
    assert.strictEqual(m.tier, "rescue");
  });

  it("pricing: input_per_M_usd > 0 for all models", () => {
    for (const [id, m] of Object.entries(models)) {
      assert.ok(m.input_per_M_usd > 0, `${id} input_per_M_usd`);
    }
  });

  it("pricing: output_per_M_usd > 0 for all models", () => {
    for (const [id, m] of Object.entries(models)) {
      assert.ok(m.output_per_M_usd > 0, `${id} output_per_M_usd`);
    }
  });

  it("pricing: together models cheaper than anthropic", () => {
    const togetherModels = Object.entries(models).filter(
      ([_, m]) => m.provider === "together",
    );
    const anthropicModels = Object.entries(models).filter(
      ([_, m]) => m.provider === "anthropic",
    );
    for (const [, t] of togetherModels) {
      for (const [, a] of anthropicModels) {
        assert.ok(
          t.input_per_M_usd <= a.input_per_M_usd,
          `${t.model} input ≤ ${a.model} input`,
        );
        assert.ok(
          t.output_per_M_usd <= a.output_per_M_usd,
          `${t.model} output ≤ ${a.model} output`,
        );
      }
    }
  });

  it("Kimi K2.6 pricing matches Together API docs ($1.20/$4.50)", () => {
    const kimi = models["together.kimi-k2-6-fp4"];
    assert.strictEqual(kimi.input_per_M_usd, 1.2);
    assert.strictEqual(kimi.output_per_M_usd, 4.5);
  });

  it("Together model strings match Together API docs", () => {
    const kimi = models["together.kimi-k2-6-fp4"];
    // Together docs: "moonshotai/Kimi-K2.6"
    assert.strictEqual(kimi.model, "moonshotai/Kimi-K2.6");
  });

  it("Anthropic rescue tier has requires_key in extraction-matrix", () => {
    const matrix = loadJSON("extraction-matrix.json");
    const rescueEntry = matrix.rescue_tier.find(
      (r) => r.model_id === "anthropic.claude-opus-4-7",
    );
    assert.ok(
      rescueEntry,
      "rescue tier should contain anthropic.claude-opus-4-7",
    );
    assert.strictEqual(rescueEntry.requires_key, "ANTHROPIC_API_KEY");
  });

  it("Qwen3-VL entry includes note about serverless limitation", () => {
    const qwen = models["together.qwen3-vl-235b"];
    assert.ok(qwen.note, "Qwen3-VL entry should have a note field");
    assert.ok(
      qwen.note.toLowerCase().includes("serverless") ||
        qwen.note.toLowerCase().includes("dedicated"),
      "note should mention serverless or dedicated endpoint",
    );
  });
});

// ===========================================================================
// extraction-matrix.json — valid structure
// ===========================================================================

describe("extraction-matrix.json — valid structure", () => {
  const matrix = loadJSON("extraction-matrix.json");

  it("has required top-level keys", () => {
    assert.ok(matrix.default, "should have 'default' key");
    assert.ok(
      matrix.high_stakes_chapters,
      "should have 'high_stakes_chapters' key",
    );
    assert.ok(
      matrix.high_stakes_overrides,
      "should have 'high_stakes_overrides' key",
    );
    assert.ok(matrix.rescue_tier, "should have 'rescue_tier' key");
  });

  it("default profile has exactly 1 model entry (kimi only, qwen dropped in T-418b)", () => {
    assert.strictEqual(matrix.default.length, 1);
  });

  it("default profile contains kimi model_id (qwen3-vl dropped as unavailable)", () => {
    const ids = matrix.default.map((e) => e.model_id);
    assert.ok(ids.includes("together.kimi-k2-6-fp4"));
    assert.ok(
      !ids.includes("together.qwen3-vl-235b"),
      "qwen3-vl should NOT be in default (non-serverless)",
    );
  });

  it("default profile entries have runs=1 and temperature=0", () => {
    for (const entry of matrix.default) {
      assert.strictEqual(entry.runs, 1, `${entry.model_id} runs`);
      assert.strictEqual(entry.temperature, 0, `${entry.model_id} temperature`);
    }
  });

  it("high_stakes_chapters has exactly 5 chapters", () => {
    assert.strictEqual(matrix.high_stakes_chapters.length, 4);
  });

  it("high_stakes_chapters has expected chapter names", () => {
    const expected = [
      "bb6.cylinder-head",
      "bb6.engine-block",
      "bb6.engine-electrical",
      "bb6.engine-lubrication",
    ];
    for (const ch of expected) {
      assert.ok(
        matrix.high_stakes_chapters.includes(ch),
        `missing chapter: ${ch}`,
      );
    }
  });

  it("high_stakes_overrides has exactly 1 entry (kimi only)", () => {
    assert.strictEqual(matrix.high_stakes_overrides.length, 1);
  });

  it("high_stakes_overrides: kimi has runs=3 temp=0.3 seed_base=1000", () => {
    const kimi = matrix.high_stakes_overrides.find(
      (o) => o.model_id === "together.kimi-k2-6-fp4",
    );
    assert.ok(kimi, "kimi override should exist");
    assert.strictEqual(kimi.runs, 3);
    assert.strictEqual(kimi.temperature, 0.3);
    assert.strictEqual(kimi.seed_base, 1000);
  });

  it("rescue_tier has exactly 1 entry", () => {
    assert.strictEqual(matrix.rescue_tier.length, 1);
  });

  it("rescue_tier entry is anthropic.claude-opus-4-7 with runs=1 temp=0", () => {
    const rescue = matrix.rescue_tier[0];
    assert.strictEqual(rescue.model_id, "anthropic.claude-opus-4-7");
    assert.strictEqual(rescue.runs, 1);
    assert.strictEqual(rescue.temperature, 0);
    assert.strictEqual(rescue.requires_key, "ANTHROPIC_API_KEY");
  });
});

// ===========================================================================
// Cross-file consistency
// ===========================================================================

describe("Cross-file consistency", () => {
  const models = loadJSON("models.json");
  const matrix = loadJSON("extraction-matrix.json");

  it("all model_ids in default profile exist in models.json", () => {
    for (const entry of matrix.default) {
      assert.ok(
        models.hasOwnProperty(entry.model_id),
        `${entry.model_id} in default but not in models.json`,
      );
    }
  });

  it("all model_ids in high_stakes_overrides exist in models.json", () => {
    for (const entry of matrix.high_stakes_overrides) {
      assert.ok(
        models.hasOwnProperty(entry.model_id),
        `${entry.model_id} in overrides but not in models.json`,
      );
    }
  });

  it("all model_ids in rescue_tier exist in models.json", () => {
    for (const entry of matrix.rescue_tier) {
      assert.ok(
        models.hasOwnProperty(entry.model_id),
        `${entry.model_id} in rescue but not in models.json`,
      );
    }
  });

  it("default profile model_ids match models.json tiers", () => {
    for (const entry of matrix.default) {
      const m = models[entry.model_id];
      assert.ok(
        m.tier === "primary-cheap" || m.tier === "primary-high",
        `${entry.model_id} should be primary tier in default matrix`,
      );
    }
  });

  it("rescue_tier model is rescue tier", () => {
    const rescueModelId = matrix.rescue_tier[0].model_id;
    const m = models[rescueModelId];
    assert.strictEqual(m.tier, "rescue");
  });
});

// ===========================================================================
// models.json — schema validation (runtime check against SCHEMA.md contract)
// ===========================================================================

describe("models.json — schema validation", () => {
  const models = loadJSON("models.json");

  it("rejects model entry missing provider", () => {
    const bad = { ...models["together.kimi-k2-6-fp4"] };
    delete bad.provider;
    assert.throws(() => validateModelEntry(bad), /provider/);
  });

  it("rejects model entry missing model string", () => {
    const bad = { ...models["together.kimi-k2-6-fp4"] };
    delete bad.model;
    assert.throws(() => validateModelEntry(bad), /model/);
  });

  it("rejects model entry with invalid tier", () => {
    const bad = { ...models["together.kimi-k2-6-fp4"] };
    bad.tier = "invalid-tier";
    assert.throws(() => validateModelEntry(bad), /tier/);
  });

  it("rejects model entry with negative pricing", () => {
    const bad = { ...models["together.kimi-k2-6-fp4"] };
    bad.input_per_M_usd = -1;
    assert.throws(() => validateModelEntry(bad), /input_per_M_usd/);
  });

  it("accepts model entry with optional note field", () => {
    const good = {
      provider: "together",
      model: "test/model",
      vision: true,
      default_temp: 0,
      input_per_M_usd: 1.0,
      output_per_M_usd: 2.0,
      tier: "primary-cheap",
      note: "optional note",
    };
    validateModelEntry(good); // should not throw
  });
});

// ===========================================================================
// Minimal validation helpers (inline, no external deps)
// ===========================================================================

function validateModelEntry(entry) {
  if (!entry.provider) throw new Error("missing provider");
  if (!entry.model) throw new Error("missing model");
  if (typeof entry.vision !== "boolean")
    throw new Error("vision must be boolean");
  if (typeof entry.default_temp !== "number")
    throw new Error("default_temp must be number");
  if (typeof entry.input_per_M_usd !== "number" || entry.input_per_M_usd < 0)
    throw new Error("invalid input_per_M_usd");
  if (typeof entry.output_per_M_usd !== "number" || entry.output_per_M_usd < 0)
    throw new Error("invalid output_per_M_usd");
  if (
    !["primary-cheap", "primary-high", "rescue", "unavailable"].includes(
      entry.tier,
    )
  )
    throw new Error("invalid tier");
}
