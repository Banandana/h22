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
// Shared enums
// ===========================================================================

const VALID_MANUALS = /** @type {const} */ (["BB6", "OBD1"]);
const VALID_SYSTEMS = /** @type {const} */ (["engine", "drivetrain", "chassis", "body", "electrical"]);
const VALID_ROLES = /** @type {const} */ ([
  "tty-stretch", "cap-screw", "flange-bolt", "stud-and-nut",
  "self-locking-nut", "castellated-nut", "banjo-bolt", "sealing-plug",
  "wheel-lug", "caliper-guide", "bracket-mount", "clip-or-clamp", "other",
]);
const VALID_LUBRICATIONS = /** @type {const} */ (["dry", "oiled", "loctite"]);
const VALID_CONSENSUS_STRATEGIES = /** @type {const} */ (
  ["majority-vote-torque-nm", "unanimous", "single-source", "manual"]
);
const VALID_CONFIDENCES = /** @type {const} */ (["high", "medium", "low"]);

// ===========================================================================
// Torque step schema
// ===========================================================================

const TorqueStepSchema = z.object({
  pass: z.number().int().positive(),
  nm: z.number().nullable().optional().refine(
    (v) => v === null || v === undefined || v >= 0,
    { message: "nm must be non-negative" },
  ),
  kgfm: z.number().nullable().optional().refine(
    (v) => v === null || v === undefined || v >= 0,
    { message: "kgfm must be non-negative" },
  ),
  lbft: z.number().nullable().optional().refine(
    (v) => v === null || v === undefined || v >= 0,
    { message: "lbft must be non-negative" },
  ),
  angle_deg: z.number().nullable().optional(),
}).refine((data) => {
  // At least one torque unit or angle must be present
  const hasTorque = data.nm !== null && data.nm !== undefined;
  const hasKgFm = data.kgfm !== null && data.kgfm !== undefined;
  const hasLbFt = data.lbft !== null && data.lbft !== undefined;
  const hasAngle = data.angle_deg !== null && data.angle_deg !== undefined;
  return hasTorque || hasKgFm || hasLbFt || hasAngle;
}, { message: "at least one of nm/kgfm/lbft/angle_deg must be set" });

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
  applies_to: z.object({
    trans: z.enum(["A/T", "M/T", "both"]).optional(),
    trim: z.enum(["base", "SH", "all"]).optional(),
    my: z.string().optional(),
    engine_codes: z.array(z.string()).optional(),
  }).optional(),
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
  lubrication: z.enum(VALID_LUBRICATIONS).or(z.string().startsWith("sealant:")).optional(),
  reusable: z.boolean().nullable().optional(),
  reuse_conditions: z.string().nullable().optional(),
  honda_part_number: z.string().nullable().optional(),
  tty: z.object({
    stretch_max_mm: z.number().nullable().optional(),
    pre_stretch_mm: z.number().nullable().optional(),
  }).optional(),
  special_tool: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  confidence: z.enum(VALID_CONFIDENCES).optional(),
  corroboration: z.object({
    consensus_strategy: z.enum(VALID_CONSENSUS_STRATEGIES),
    agreeing_invocations: z.array(z.object({
      model_id: z.string(),
      run: z.string(),
      temperature: z.number(),
      response_path: z.string(),
    })).optional(),
    disagreeing_invocations: z.array(z.object({
      model_id: z.string(),
      run: z.string(),
      temperature: z.number(),
      response_path: z.string(),
      their_torque_nm: z.number().optional(),
    })).optional(),
    vote_strength: z.number().min(0).max(1).optional(),
    intra_model_consistency: z.record(z.string(), z.number().nullable().optional()).optional(),
    single_source: z.boolean().optional(),
  }).optional(),
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
  tokens: z.object({
    input: z.number().int().nonnegative(),
    output: z.number().int().nonnegative(),
  }).optional(),
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
  rejected_rows: z.array(z.object({
    index: z.number().int(),
    errors: z.array(z.string()),
  })),
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
export function validateCanonicalRow(row) {
  try {
    const parsed = CanonicalRowSchema.parse(row);
    return { success: true, data: parsed };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return { success: false, error: err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
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
      return { success: false, error: err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
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
      return { success: false, error: err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
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
      return { success: false, error: err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
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
      return { success: false, error: err.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") };
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

  const record = /** @type {z.infer<typeof InvocationRecordSchema>} */ (validated.data);
  const parsed = record.response_parsed;

  if (!parsed || !Array.isArray(parsed) || parsed.length === 0) {
    return { flatRows: [], rejects: [] };
  }

  const flatRows = [];
  const rejects = [];

  for (let i = 0; i < parsed.length; i++) {
    const result = validateCanonicalRow(parsed[i]);
    if (result.success) {
      /** @type {Record<string, unknown>} */ (result.data).invocation_id = record.invocation_id;
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
