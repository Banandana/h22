#!/usr/bin/env node
/**
 * bakeoff-runner.mjs — Run T-418b bake-off across selected pages.
 *
 * Runs the extraction pipeline on a fixed set of 10 pages with the default matrix,
 * collecting per-page metrics (latency, cost, row count, parse success).
 *
 * Usage:
 *   node scripts/bakeoff-runner.mjs
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Config ─────────────────────────────────────────────────────────────────

const BAKEOFF_PAGES = [166, 493, 495, 677, 707, 769, 781, 816, 866, 896];

const MODEL_IDS = ["together.kimi-k2-6-fp4", "together.qwen3-vl-235b"];

// ─── Helpers ────────────────────────────────────────────────────────────────

function loadJSON(relPath) {
  return JSON.parse(readFileSync(join(ROOT, relPath), "utf-8"));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ─── Model check ────────────────────────────────────────────────────────────

async function checkModelAvailability(modelId) {
  const models = loadJSON("research/raw-data/torque-specs/models.json");
  const modelInfo = models[modelId];
  if (!modelInfo)
    return { available: false, reason: `Unknown model: ${modelId}` };

  if (modelInfo.provider === "together") {
    const apiKey = process.env.TOGETHER_API_KEY;
    if (!apiKey)
      return { available: false, reason: "TOGETHER_API_KEY not set" };

    // Quick smoke test: send a text-only request to verify the key works
    try {
      const res = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: modelInfo.model,
          messages: [{ role: "user", content: "hi" }],
          max_tokens: 5,
          temperature: 0,
          chat_template_kwargs: { enable_thinking: false },
        }),
      });
      if (!res.ok) {
        const errText = await res.text();
        return {
          available: false,
          reason: `HTTP ${res.status}: ${errText.slice(0, 200)}`,
        };
      }
      const data = await res.json();
      if (data.choices && data.choices.length > 0) {
        return { available: true };
      }
      return { available: false, reason: "No choices in response" };
    } catch (err) {
      return { available: false, reason: err.message };
    }
  }

  if (modelInfo.provider === "anthropic") {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey)
      return { available: false, reason: "ANTHROPIC_API_KEY not set" };
    return { available: true };
  }

  return {
    available: false,
    reason: `Unknown provider: ${modelInfo.provider}`,
  };
}

// ─── Run extraction for one page + model ────────────────────────────────────

async function runExtraction(pageNum, modelId) {
  const startTime = Date.now();
  const models = loadJSON("research/raw-data/torque-specs/models.json");
  const modelInfo = models[modelId];

  // Find page image — prefer page-NNN.png (real manual pages) over pNNN-MMM (nav links)
  const imagesDir = join(ROOT, "bb6_ocr", "images");
  let imagePath = null;
  let imageBytes = null;

  // Primary: page-{page}.png (real manual pages, 100KB+)
  const singlePage = join(imagesDir, `page-${pageNum}.png`);
  if (existsSync(singlePage)) {
    const size = readFileSync(singlePage).length;
    if (size >= 50000) {
      imagePath = singlePage;
    }
  }

  // Fallback: p{page}-*.png (multi-page OCR renders, if page-NNN not available or too small)
  if (!imagePath) {
    const entries = existsSync(imagesDir) ? readdirSync(imagesDir) : [];
    const match = entries.find(
      (f) => f.startsWith(`p${pageNum}-`) && f.endsWith(".png"),
    );
    if (match) {
      imagePath = join(imagesDir, match);
    }
  }

  if (!imagePath) {
    return {
      pageNum,
      modelId,
      error: `No image found for page ${pageNum}`,
      latencyMs: 0,
      rows: 0,
      parseOk: false,
      costUsd: 0,
      inputTokens: 0,
      outputTokens: 0,
    };
  }

  imageBytes = readFileSync(imagePath);
  const base64Image = imageBytes.toString("base64");

  // Build prompt
  const promptText = readFileSync(
    join(ROOT, "scripts/prompts/extract-torques-v1.md"),
    "utf-8",
  );
  const userPrompt = promptText.replace("{page}", String(pageNum));

  // Make API call
  let content = "";
  let inputTokens = 0;
  let outputTokens = 0;
  let apiError = null;

  try {
    let requestBody;
    if (modelInfo.provider === "together") {
      requestBody = {
        model: modelInfo.model,
        messages: [
          {
            role: "system",
            content:
              "You are an expert automotive technician extracting torque specifications from Honda service manual pages. Output valid JSON only.",
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: { url: `data:image/png;base64,${base64Image}` },
              },
              { type: "text", text: userPrompt },
            ],
          },
        ],
        max_tokens: 8192,
        temperature: 0,
        seed: 42,
        response_format: { type: "json_object" },
        chat_template_kwargs: { enable_thinking: false },
      };

      const res = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOGETHER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText.slice(0, 300)}`);
      }

      const data = await res.json();
      const choice = data.choices?.[0]?.message || {};
      content = choice.content || "";
      const usage = data.usage || {};
      inputTokens = usage.prompt_tokens ?? 0;
      outputTokens = usage.completion_tokens ?? 0;
    } else if (modelInfo.provider === "anthropic") {
      requestBody = {
        model: modelInfo.model,
        max_tokens: 8192,
        temperature: 0,
        system:
          "You are an expert automotive technician extracting torque specifications from Honda service manual pages. Output valid JSON only.",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/png",
                  data: base64Image,
                },
              },
              { type: "text", text: userPrompt },
            ],
          },
        ],
      };

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText.slice(0, 300)}`);
      }

      const data = await res.json();
      const textBlock = data.content?.find((c) => c.type === "text");
      content = textBlock?.text || "";
      const usage = data.usage || {};
      inputTokens = usage.input_tokens ?? 0;
      outputTokens = usage.output_tokens ?? 0;
    }
  } catch (err) {
    apiError = err.message;
  }

  const latencyMs = Date.now() - startTime;

  // Parse response
  let rows = [];
  let parseError = null;
  let parseOk = false;

  try {
    const parsed = JSON.parse(content);
    rows = Array.isArray(parsed) ? parsed : [parsed];
    parseOk = true;
  } catch {
    // Try markdown code block
    const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        rows = Array.isArray(parsed) ? parsed : [parsed];
        parseOk = true;
      } catch (e) {
        parseError = e.message;
      }
    } else {
      parseError = `Failed to parse JSON response (${content.slice(0, 100)}...)`;
    }
  }

  // Estimate cost
  let costUsd = 0;
  if (modelInfo.provider === "together" && outputTokens > 0) {
    const inputPerM = modelInfo.input_per_M_usd || 0;
    const outputPerM = modelInfo.output_per_M_usd || 0;
    costUsd =
      (inputTokens / 1_000_000) * inputPerM +
      (outputTokens / 1_000_000) * outputPerM;
  }

  return {
    pageNum,
    modelId,
    error: apiError,
    latencyMs,
    rows: rows.length,
    parseOk,
    parseError,
    costUsd,
    inputTokens,
    outputTokens,
    rawContent: content.slice(0, 500), // first 500 chars for debugging
  };
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("=== T-418b Bake-off Runner ===");
  console.log(`Pages: ${BAKEOFF_PAGES.join(", ")}`);
  console.log(`Models: ${MODEL_IDS.join(", ")}`);
  console.log(`Total invocations: ${BAKEOFF_PAGES.length * MODEL_IDS.length}`);
  console.log("==============================\n");

  // Check model availability
  const modelStatuses = {};
  for (const modelId of MODEL_IDS) {
    console.log(`Checking ${modelId}...`);
    const status = await checkModelAvailability(modelId);
    modelStatuses[modelId] = status;
    console.log(
      `  → ${status.available ? "AVAILABLE" : "UNAVAILABLE: " + status.reason}`,
    );
    console.log("");
  }

  // Run extraction
  const results = [];
  let totalCost = 0;
  let totalPages = 0;
  let totalRows = 0;
  let totalLatency = 0;

  for (const pageNum of BAKEOFF_PAGES) {
    console.log(`--- Page ${pageNum} ---`);
    for (const modelId of MODEL_IDS) {
      if (!modelStatuses[modelId].available) {
        console.log(`  [skip] ${modelId}: ${modelStatuses[modelId].reason}`);
        results.push({
          pageNum,
          modelId,
          skipped: true,
          skipReason: modelStatuses[modelId].reason,
        });
        continue;
      }

      console.log(`  [run] ${modelId}...`);
      const result = await runExtraction(pageNum, modelId);
      results.push(result);

      if (result.error) {
        console.log(`  [error] ${modelId}: ${result.error.slice(0, 100)}`);
      } else {
        console.log(
          `  [done] ${modelId}: ${result.rows} rows, ${result.latencyMs}ms, $${result.costUsd.toFixed(4)}, parse=${result.parseOk ? "OK" : "FAIL"}`,
        );
      }

      totalCost += result.costUsd;
      totalRows += result.rows;
      totalLatency += result.latencyMs;
      totalPages++;
    }
  }

  // Summary
  console.log("\n==============================");
  console.log("=== BAKE-OFF SUMMARY ===");
  console.log(`Pages attempted: ${totalPages}`);
  console.log(`Total rows extracted: ${totalRows}`);
  console.log(`Total latency: ${(totalLatency / 1000).toFixed(1)}s`);
  console.log(`Total estimated cost: $${totalCost.toFixed(4)}`);
  console.log(
    `Spend cap ($1.00): ${totalCost <= 1.0 ? "WITHIN CAP ✓" : "EXCEEDED ✗"}`,
  );

  // Per-model summary
  console.log("\n--- Per-model breakdown ---");
  for (const modelId of MODEL_IDS) {
    const modelResults = results.filter((r) => r.modelId === modelId);
    const successful = modelResults.filter((r) => !r.skipped && !r.error);
    const failed = modelResults.filter((r) => r.error);
    const skipped = modelResults.filter((r) => r.skipped);
    const totalModelRows = successful.reduce((sum, r) => sum + r.rows, 0);
    const avgLatency =
      successful.length > 0
        ? successful.reduce((sum, r) => sum + r.latencyMs, 0) /
          successful.length
        : 0;
    const avgRows =
      successful.length > 0 ? totalModelRows / successful.length : 0;
    const parseSuccessRate =
      successful.length > 0
        ? successful.filter((r) => r.parseOk).length / successful.length
        : 0;

    console.log(`\n${modelId}:`);
    console.log(
      `  Invocations: ${modelResults.length} (${skipped.length} skipped, ${successful.length} succeeded, ${failed.length} failed)`,
    );
    console.log(`  Total rows: ${totalModelRows}`);
    console.log(`  Avg rows/page: ${avgRows.toFixed(1)}`);
    console.log(`  Avg latency: ${(avgLatency / 1000).toFixed(1)}s`);
    console.log(
      `  Parse success rate: ${(parseSuccessRate * 100).toFixed(0)}%`,
    );
    if (failed.length > 0) {
      console.log(`  Errors:`);
      for (const f of failed) {
        console.log(`    - Page ${f.pageNum}: ${f.error?.slice(0, 100)}`);
      }
    }
  }

  // Per-page summary
  console.log("\n--- Per-page summary ---");
  for (const pageNum of BAKEOFF_PAGES) {
    const pageResults = results.filter((r) => r.pageNum === pageNum);
    const successful = pageResults.filter((r) => !r.skipped && !r.error);
    const pageRows = successful.reduce((sum, r) => sum + r.rows, 0);
    const pageLatency = successful.reduce((sum, r) => sum + r.latencyMs, 0);
    console.log(
      `  Page ${pageNum}: ${pageRows} rows, ${pageLatency}ms, ${successful.length}/${pageResults.length} models succeeded`,
    );
  }

  // Save results
  const outputPath = join(
    ROOT,
    "research/raw-data/torque-specs/bakeoff-results.json",
  );
  writeFileSync(
    outputPath,
    JSON.stringify(
      {
        timestamp: new Date().toISOString(),
        pages: BAKEOFF_PAGES,
        models: MODEL_IDS,
        modelStatuses,
        results,
        summary: {
          totalPages,
          totalRows,
          totalLatency,
          totalCost,
          withinSpendCap: totalCost <= 1.0,
        },
      },
      null,
      2,
    ),
  );
  console.log(`\nResults saved to ${outputPath}`);
}

main().catch((err) => {
  console.error("FATAL:", err.message);
  console.error(err.stack);
  process.exit(1);
});
