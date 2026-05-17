/**
 * schema-validator.mjs — Zod validators for torque-specs data schemas.
 *
 * Two schemas:
 *  1. Canonical row (h22-torques.jsonl) — one row per fastener after consensus.
 *  2. Per-invocation response record (responses/<manual>/<page>/*.json).
 *
 * Also exports enrichment and rejection helpers for the validation pipeline.
 *
 * No API calls. Pure validation + enrichment.
 */

import { z } from "zod";

// ===========================================================================
// Lubrication normalizer — maps vision-model free-text to valid enum values
// ===========================================================================

/**
 * Normalize a lubrication value to one of the valid enum entries.
 * Vision models return things like "grease", "anti-seize", "sealant:liquid gasket",
 * etc. This function maps them to the closest valid value.
 *
 * @param {unknown} raw
 * @returns {string | null}
 */
export function normalizeLubrication(raw) {
  if (raw === null || raw === undefined) return "dry";
  const s = String(raw).trim().toLowerCase();
  if (!s) return "dry";

  // Exact matches first
  if (s === "dry") return "dry";
  if (s === "oiled") return "oiled";
  if (s === "loctite") return "loctite";

  // sealant:<spec> patterns — strip extra text, keep the spec code
  if (s.startsWith("sealant:")) {
    const spec = s.replace(/^sealant:\s*/, "");
    // If it's just descriptive text without a part number, fall back to oiled
    // Match: "liquid", "liquid-gasket", "gasket" as standalone descriptors
    if (
      /^(liquid(-gasket)?\s*(to\s*)?(bolt\s*threads|block\s*mating\s*surface)?|p\/n\s*\d)/.test(
        spec,
      )
    )
      return "oiled";
    return "sealant:" + spec;
  }

  // Common mappings
  if (/^grease/.test(s)) return "oiled";
  if (/^anti-seiz|^antiseiz|^anti seize/.test(s)) return "oiled";
  if (/^threadlock/.test(s)) return "loctite";

  // If nothing matched, default to dry
  return "dry";
}

// ===========================================================================
// Envelope unwrapper — detects wrapper objects and extracts inner arrays
// ===========================================================================

/**
 * Detect if a parsed response is wrapped in an envelope object
 * (e.g. { fasteners: [...] }, { analysis, findings, output: [...] },
 * { data: [...] }, { results: [...] }).
 *
 * Returns the inner array if found, or the original row if it looks like
 * a canonical row already.
 *
 * @param {unknown} row
 * @returns {unknown | unknown[]}
 */
export function unwrapEnvelope(row) {
  if (!row || typeof row !== "object" || Array.isArray(row)) return row;

  const keys = Object.keys(row);

  // Already looks like a canonical row — has required fields
  const canonicalKeys = [
    "id",
    "source",
    "system",
    "assembly",
    "fastener_name",
    "thread",
    "qty",
    "role",
    "torque",
    "oem",
  ];
  const canonicalCount = canonicalKeys.filter((k) => k in row).length;
  if (canonicalCount >= 6) return row; // likely already a canonical row

  // Envelope keys ordered by specificity: more specific/fastener-oriented keys first
  // so we don't accidentally extract an empty "output" when "fasteners_found" has data.
  const envelopeKeys = [
    "fasteners_found",
    "extracted_fasteners",
    "fasteners",
    "data",
    "results",
    "extracted",
    "items",
    "rows",
    "output",
    "findings",
  ];
  for (const ek of envelopeKeys) {
    if (ek in row && Array.isArray(row[ek])) {
      return row[ek];
    }
  }

  // No envelope detected; return as-is
  return row;
}

// ===========================================================================
// Field-name normalizer — handles common vision-model naming variations
// ===========================================================================

/**
 * Normalize field names from vision-model output to match the canonical schema.
 * Maps aliases like "fastener" -> "fastener_name", "manual" at top level into source,
 * etc.
 *
 * @param {unknown} row
 * @returns {Record<string, unknown>}
 */
export function normalizeFieldNames(row) {
  if (!row || typeof row !== "object") return {};

  /** @type {Record<string, unknown>} */
  const out = {};

  for (const [key, val] of Object.entries(row)) {
    switch (key) {
      case "fastener":
      case "fastener_name":
        out.fastener_name = val;
        break;
      case "manual":
        // Top-level "manual" goes into source.manual
        out.source = { ...(out.source || {}), manual: val };
        break;
      case "page":
        out.source = { ...(out.source || {}), page: val };
        break;
      case "figure":
        out.source = { ...(out.source || {}), figure: val };
        break;
      case "trans":
        out.applies_to = { ...(out.applies_to || {}), trans: val };
        break;
      case "trim":
        out.applies_to = { ...(out.applies_to || {}), trim: val };
        break;
      case "my":
        out.applies_to = { ...(out.applies_to || {}), my: val };
        break;
      case "engine_codes":
        out.applies_to = { ...(out.applies_to || {}), engine_codes: val };
        break;
      case "applies":
        out.applies_to = { ...(out.applies_to || {}), ...val };
        break;
      case "nominal_mm":
        out.thread = { ...(out.thread || {}), nominal_mm: val };
        break;
      case "pitch_mm":
        out.thread = { ...(out.thread || {}), pitch_mm: val };
        break;
      case "length_mm":
        out.thread = { ...(out.thread || {}), length_mm: val };
        break;
      case "grade":
        out.thread = { ...(out.thread || {}), grade: val };
        break;
      case "torque_value":
        // Some models use torque_value instead of steps
        out.torque = { ...(out.torque || {}), steps: [{ pass: 1, nm: val }] };
        break;
      case "unit":
        // Unit hint — ignore for now, units are already in the step
        break;
      default:
        out[key] = val;
        break;
    }
  }

  return out;
}

// ===========================================================================
// Coercion helpers
// ===========================================================================

/**
 * Coerce page value to a positive integer.
 * Vision models sometimes return page as a string ("6617") or float (6617.0).
 * They also sometimes use chapter-page notation like "5-4" (chapter 5, page 4).
 * Returns 0 if no valid page can be extracted.
 *
 * @param {unknown} raw
 * @returns {number}
 */
export function coercePage(raw) {
  if (raw === null || raw === undefined) return 0;

  // Handle numeric input first (before string parsing)
  const n = Number(raw);
  if (Number.isFinite(n)) {
    if (n > 0) return Math.floor(n);
    return 0; // zero or negative page numbers are invalid
  }

  const s = String(raw).trim();
  if (!s) return 0;

  // Try direct numeric parse
  const direct = Number(s);
  if (Number.isFinite(direct) && direct > 0) return Math.floor(direct);

  // Chapter-page notation like "5-4" → extract last segment
  const parts = s
    .split(/[-–—]/)
    .map((p) => p.trim())
    .filter(Boolean);
  for (let i = parts.length - 1; i >= 0; i--) {
    const candidate = Number(parts[i]);
    if (Number.isFinite(candidate) && candidate > 0)
      return Math.floor(candidate);
  }

  return 0;
}

// ===========================================================================
// Shared enums
// ===========================================================================

const VALID_MANUALS = /** @type {const} */ (["BB6", "OBD1"]);
const VALID_SYSTEMS = /** @type {const} */ ([
  "engine",
  "drivetrain",
  "chassis",
  "body",
  "electrical",
]);
const VALID_ROLES = /** @type {const} */ ([
  "tty-stretch",
  "cap-screw",
  "flange-bolt",
  "stud-and-nut",
  "self-locking-nut",
  "castellated-nut",
  "banjo-bolt",
  "sealing-plug",
  "wheel-lug",
  "caliper-guide",
  "bracket-mount",
  "clip-or-clamp",
  "other",
]);
const VALID_LUBRICATIONS = /** @type {const} */ (["dry", "oiled", "loctite"]);
const VALID_CONSENSUS_STRATEGIES = /** @type {const} */ ([
  "majority-vote-torque-nm",
  "unanimous",
  "single-source",
  "manual",
]);
const VALID_CONFIDENCES = /** @type {const} */ (["high", "medium", "low"]);

// ===========================================================================
// Torque step schema
// ===========================================================================

const TorqueStepSchema = z
  .object({
    pass: z.number().int().positive(),
    nm: z
      .number()
      .nullable()
      .optional()
      .refine((v) => v === null || v === undefined || v >= 0, {
        message: "nm must be non-negative",
      }),
    kgfm: z
      .number()
      .nullable()
      .optional()
      .refine((v) => v === null || v === undefined || v >= 0, {
        message: "kgfm must be non-negative",
      }),
    lbft: z
      .number()
      .nullable()
      .optional()
      .refine((v) => v === null || v === undefined || v >= 0, {
        message: "lbft must be non-negative",
      }),
    angle_deg: z.number().nullable().optional(),
  })
  .refine(
    (data) => {
      // At least one torque unit or angle must be present
      const hasTorque = data.nm !== null && data.nm !== undefined;
      const hasKgFm = data.kgfm !== null && data.kgfm !== undefined;
      const hasLbFt = data.lbft !== null && data.lbft !== undefined;
      const hasAngle = data.angle_deg !== null && data.angle_deg !== undefined;
      return hasTorque || hasKgFm || hasLbFt || hasAngle;
    },
    { message: "at least one of nm/kgfm/lbft/angle_deg must be set" },
  );

// ===========================================================================
// Canonical row schema
// ===========================================================================

const CanonicalRowSchema = z.object({
  id: z.string().min(1),
  source: z.object({
    manual: z.enum(VALID_MANUALS),
    page: z.number().int().positive(),
    figure: z.string().nullable().optional(),
  }),
  applies_to: z
    .object({
      trans: z.enum(["A/T", "M/T", "both"]).optional(),
      trim: z.enum(["base", "SH", "all"]).optional(),
      my: z.string().optional(),
      engine_codes: z.array(z.string()).optional(),
    })
    .optional(),
  system: z.enum(VALID_SYSTEMS),
  assembly: z.string().min(1),
  fastener_name: z.string().min(1),
  thread: z.object({
    nominal_mm: z.number().nullable().optional(),
    pitch_mm: z.number().nullable().optional(),
    length_mm: z.number().nullable().optional(),
    grade: z.string().nullable().optional(),
  }),
  qty: z.number().int().positive(),
  role: z.enum(VALID_ROLES),
  torque: z.object({
    steps: z.array(TorqueStepSchema).min(1),
    sequence_ref: z.string().nullable().optional(),
  }),
  lubrication: z
    .enum(VALID_LUBRICATIONS)
    .or(z.string().startsWith("sealant:"))
    .optional(),
  reusable: z.boolean().nullable().optional(),
  reuse_conditions: z.string().nullable().optional(),
  honda_part_number: z.string().nullable().optional(),
  tty: z
    .object({
      stretch_max_mm: z.number().nullable().optional(),
      pre_stretch_mm: z.number().nullable().optional(),
    })
    .optional(),
  special_tool: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  confidence: z.enum(VALID_CONFIDENCES).optional(),
  corroboration: z
    .object({
      consensus_strategy: z.enum(VALID_CONSENSUS_STRATEGIES),
      agreeing_invocations: z
        .array(
          z.object({
            model_id: z.string(),
            run: z.string(),
            temperature: z.number(),
            response_path: z.string(),
          }),
        )
        .optional(),
      disagreeing_invocations: z
        .array(
          z.object({
            model_id: z.string(),
            run: z.string(),
            temperature: z.number(),
            response_path: z.string(),
            their_torque_nm: z.number().optional(),
          }),
        )
        .optional(),
      vote_strength: z.number().min(0).max(1).optional(),
      intra_model_consistency: z
        .record(z.string(), z.number().nullable().optional())
        .optional(),
      single_source: z.boolean().optional(),
    })
    .optional(),
  conflict_group_id: z.string().nullable().optional(),
  oem: z.boolean(),
  meta: z.record(z.unknown()).optional(),
});

// ===========================================================================
// Per-invocation record schema
// ===========================================================================

const InvocationRecordSchema = z.object({
  invocation_id: z.string().min(1),
  manual: z.enum(VALID_MANUALS),
  page: z.number().int().positive(),
  model_id: z.string().min(1),
  provider: z.string().min(1),
  model: z.string().min(1),
  run: z.string().min(1),
  temperature: z.number(),
  seed: z.number().int(),
  prompt_version: z.string().min(1),
  prompt_hash: z.string().min(1),
  image_hash: z.string().min(1),
  cache_key: z.string().min(1),
  timestamp_start: z.string().min(1),
  timestamp_end: z.string().min(1),
  latency_ms: z.number().optional(),
  tokens: z
    .object({
      input: z.number().int().nonnegative(),
      output: z.number().int().nonnegative(),
    })
    .optional(),
  cost_usd: z.number().nonnegative().optional(),
  request: z.record(z.unknown()),
  response_raw: z.string(),
  response_parsed: z.array(z.any()).nullable().optional(),
  parse_error: z.string().nullable().optional(),
});

// ===========================================================================
// Flat row (canonical row enriched with invocation_id)
// ===========================================================================

const FlatRowSchema = CanonicalRowSchema.extend({
  invocation_id: z.string().min(1),
});

// ===========================================================================
// Reject record
// ===========================================================================

const RejectRecordSchema = z.object({
  invocation_record: z.record(z.unknown()),
  validation_errors: z.array(z.string()),
  rejected_rows: z.array(
    z.object({
      index: z.number().int(),
      errors: z.array(z.string()),
    }),
  ),
});

// ===========================================================================
// Summary stats
// ===========================================================================

const SummaryStatsSchema = z.object({
  total_invocations: z.number().int().nonnegative(),
  total_flat_rows: z.number().int().nonnegative(),
  total_rejects: z.number().int().nonnegative(),
  per_model_row_count: z.record(z.string(), z.number().int().nonnegative()),
  confidence_distribution: z.record(z.string(), z.number().int().nonnegative()),
});

// ===========================================================================
// Validation result type
// ===========================================================================

/**
 * @typedef {{ success: true; data: unknown } | { success: false; error: string }} ValidationResult
 */

// ===========================================================================
// Public API
// ===========================================================================

/**
 * Validate a canonical torque row against the full schema.
 * @param {unknown} row
 * @returns {{ success: boolean; data?: unknown; error?: string }}
 */
/**
 * Preprocess a raw vision-model output row before Zod validation.
 *
 * Handles:
 *  1. Unwrapping envelope objects ({ fasteners: [...] }, { analysis, output: [...] }, etc.)
 *  2. Normalizing field-name aliases (fastener -> fastener_name, etc.)
 *  3. Coercing types (string page -> number, null lubrication -> "dry")
 *  4. Normalizing lubrication values (grease -> oiled, anti-seize -> oiled)
 *
 * @param {unknown} raw
 * @returns {{ success: boolean; data?: Record<string, unknown>; error?: string }}
 */
export function enrichAndNormalizeRow(raw) {
  if (!raw || typeof raw !== "object") {
    return { success: false, error: "input is not an object" };
  }

  /** @type {Record<string, unknown>} */
  let row = /** @type {Record<string, unknown>} */ (raw);

  // Step 1: Unwrap envelope
  const unwrapped = unwrapEnvelope(row);
  if (Array.isArray(unwrapped)) {
    // Envelope contained an array; take the first item if it looks like a row
    if (unwrapped.length === 0) {
      return { success: false, error: "envelope contained empty array" };
    }
    const first = unwrapped[0];
    if (first && typeof first === "object") {
      row = /** @type {Record<string, unknown>} */ (first);
    } else {
      return { success: false, error: "envelope first item is not an object" };
    }
  }

  // Step 2: Normalize field names
  row = normalizeFieldNames(row);

  // Step 3: Ensure source object exists
  if (!row.source || typeof row.source !== "object") {
    row.source = {};
  }

  // Step 4: Coerce source.page string -> number
  /** @type {Record<string, unknown>} */
  const src = row.source;
  src.page = coercePage(src.page);

  // Step 5: Null -> default for enum fields
  if (row.lubrication === null || row.lubrication === undefined) {
    row.lubrication = "dry";
  }
  if (row.confidence === null || row.confidence === undefined) {
    row.confidence = "high";
  }
  if (row.reusable === null || row.reusable === undefined) {
    row.reusable = true;
  }

  // Step 6: Normalize lubrication value
  if (row.lubrication !== null && row.lubrication !== undefined) {
    const normalized = normalizeLubrication(row.lubrication);
    row.lubrication = normalized;
  }

  // Step 7: Normalize system — some models omit it or use wrong values
  if (row.system === null || row.system === undefined) {
    // Default to "engine" as most torque specs are engine-related
    row.system = "engine";
  }

  // Step 8: Coerce null → undefined in nested objects so Zod .optional() accepts them
  // Vision models often return null instead of omitting optional fields.
  if (row.applies_to && typeof row.applies_to === "object") {
    for (const k of Object.keys(row.applies_to)) {
      if (row.applies_to[k] === null) delete row.applies_to[k];
    }
  }
  if (row.thread && typeof row.thread === "object") {
    for (const k of Object.keys(row.thread)) {
      if (row.thread[k] === null) delete row.thread[k];
    }
  }
  // tty can be null (not just its properties) — convert to empty object
  if (row.tty === null || row.tty === undefined) {
    row.tty = {};
  } else if (typeof row.tty === "object") {
    for (const k of Object.keys(row.tty)) {
      if (row.tty[k] === null) delete row.tty[k];
    }
  }
  if (row.source && typeof row.source === "object") {
    for (const k of Object.keys(row.source)) {
      if (row.source[k] === null) delete row.source[k];
    }
  }
  if (row.corroboration && typeof row.corroboration === "object") {
    for (const k of Object.keys(row.corroboration)) {
      if (row.corroboration[k] === null) delete row.corroboration[k];
    }
  }

  return { success: true, data: row };
}

/**
 * Validate a canonical torque row against the full schema.
 * Runs enrichment/normalization first, then Zod parse.
 *
 * @param {unknown} row
 * @returns {{ success: boolean; data?: unknown; error?: string }}
 */
export function validateCanonicalRow(row) {
  // Preprocess before Zod validation
  const enriched = enrichAndNormalizeRow(row);
  if (!enriched.success) {
    return { success: false, error: `enrichment failed: ${enriched.error}` };
  }

  try {
    const parsed = CanonicalRowSchema.parse(enriched.data);
    return { success: true, data: parsed };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        error: err.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; "),
      };
    }
    return { success: false, error: String(err) };
  }
}

/**
 * Validate a per-invocation response record.
 * @param {unknown} record
 * @returns {{ success: boolean; data?: unknown; error?: string }}
 */
export function validateInvocationRecord(record) {
  try {
    const parsed = InvocationRecordSchema.parse(record);
    return { success: true, data: parsed };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        error: err.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; "),
      };
    }
    return { success: false, error: String(err) };
  }
}

/**
 * Validate a flat row (canonical row + invocation_id provenance).
 * @param {unknown} row
 * @returns {{ success: boolean; data?: unknown; error?: string }}
 */
export function validateFlatRow(row) {
  try {
    const parsed = FlatRowSchema.parse(row);
    return { success: true, data: parsed };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        error: err.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; "),
      };
    }
    return { success: false, error: String(err) };
  }
}

/**
 * Validate a reject record.
 * @param {unknown} record
 * @returns {{ success: boolean; data?: unknown; error?: string }}
 */
export function validateRejectRecord(record) {
  try {
    const parsed = RejectRecordSchema.parse(record);
    return { success: true, data: parsed };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        error: err.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; "),
      };
    }
    return { success: false, error: String(err) };
  }
}

/**
 * Validate summary stats.
 * @param {unknown} stats
 * @returns {{ success: boolean; data?: unknown; error?: string }}
 */
export function validateSummaryStats(stats) {
  try {
    const parsed = SummaryStatsSchema.parse(stats);
    return { success: true, data: parsed };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        error: err.issues
          .map((i) => `${i.path.join(".")}: ${i.message}`)
          .join("; "),
      };
    }
    return { success: false, error: String(err) };
  }
}

/**
 * Run final schema validation on every response_parsed array within an
 * invocation record. Returns flat rows (valid) and rejects (invalid).
 *
 * Enriches each valid row with `invocation_id` from the parent record.
 *
 * @param {unknown} invocationRecord
 * @returns {{ flatRows: unknown[]; rejects: Array<{index: number; errors: string[]}> }}
 */
export function validateInvocationParsedRows(invocationRecord) {
  const validated = validateInvocationRecord(invocationRecord);
  if (!validated.success) {
    return { flatRows: [], rejects: [] };
  }

  const record = /** @type {z.infer<typeof InvocationRecordSchema>} */ (
    validated.data
  );
  const parsed = record.response_parsed;

  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    return { flatRows: [], rejects: [] };
  }

  const flatRows = [];
  const rejects = [];

  for (let i = 0; i < parsed.length; i++) {
    const result = validateCanonicalRow(parsed[i]);
    if (result.success) {
      /** @type {Record<string, unknown>} */ (result.data).invocation_id =
        record.invocation_id;
      flatRows.push(result.data);
    } else {
      rejects.push({ index: i, errors: [result.error] });
    }
  }

  return { flatRows, rejects };
}

// ===========================================================================
// Exports for testing
// ===========================================================================

export {
  CanonicalRowSchema,
  InvocationRecordSchema,
  FlatRowSchema,
  RejectRecordSchema,
  SummaryStatsSchema,
  VALID_MANUALS,
  VALID_SYSTEMS,
  VALID_ROLES,
  VALID_LUBRICATIONS,
  VALID_CONSENSUS_STRATEGIES,
  VALID_CONFIDENCES,
  TorqueStepSchema,
};

// Enrichment/preprocessor exports
// Enrichment/preprocessor exports (already exported above as named functions)
