/**
 * Test fixtures for schema-validator tests.
 *
 * Provides minimal valid examples and variations for every schema type.
 */

// ===========================================================================
// Canonical row — minimal valid
// ===========================================================================

export const VALID_CANONICAL_ROW = {
  id: "BB6-p136-cylhead-headbolt",
  source: { manual: "BB6", page: 136, figure: null },
  system: "engine",
  assembly: "cylinder-head",
  fastener_name: "Cylinder head bolt",
  thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
  qty: 10,
  role: "tty-stretch",
  torque: {
    steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }],
    sequence_ref: null,
  },
  lubrication: "dry",
  reusable: false,
  oem: true,
};

// ===========================================================================
// Canonical row — with corroboration block
// ===========================================================================

export const VALID_CANONICAL_ROW_WITH_CORROBORATION = {
  ...VALID_CANONICAL_ROW,
  corroboration: {
    consensus_strategy: "majority-vote-torque-nm",
    agreeing_invocations: [
      { model_id: "together.kimi-k2-6-fp4", run: "r1", temperature: 0, response_path: "responses/bb6/136/together__kimi__r1.json" },
    ],
    disagreeing_invocations: [],
    vote_strength: 1.0,
    intra_model_consistency: {},
    single_source: true,
  },
};

// ===========================================================================
// Per-invocation record — minimal valid (one parsed row)
// ===========================================================================

export const VALID_INVOCATION_RECORD = {
  invocation_id: "together.kimi-k2-6-fp4.r1.2026-05-15T22-03-11Z",
  manual: "BB6",
  page: 136,
  model_id: "together.kimi-k2-6-fp4",
  provider: "together",
  model: "moonshotai/Kimi-K2.6-FP4",
  run: "r1",
  temperature: 0,
  seed: 42,
  prompt_version: "v1",
  prompt_hash: "sha256:abc123",
  image_hash: "sha256:def456",
  cache_key: "sha256:ghi789",
  timestamp_start: "2026-05-15T22-03-11.234Z",
  timestamp_end: "2026-05-15T22-03-13.891Z",
  latency_ms: 2657,
  tokens: { input: 1487, output: 612 },
  cost_usd: 0.00454,
  request: { model: "moonshotai/Kimi-K2.6-FP4", messages: [] },
  response_raw: '{"rows": [{}]}',
  response_parsed: [
    {
      id: "BB6-p136-cylhead-headbolt",
      source: { manual: "BB6", page: 136, figure: null },
      system: "engine",
      assembly: "cylinder-head",
      fastener_name: "Cylinder head bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
      qty: 10,
      role: "tty-stretch",
      torque: { steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }] },
      lubrication: "dry",
      reusable: false,
      oem: true,
    },
  ],
  parse_error: null,
};

// ===========================================================================
// Per-invocation record — full (with parsed rows)
// ===========================================================================

export const FULL_INVOCATION_RECORD = {
  ...VALID_INVOCATION_RECORD,
  response_parsed: [
    {
      id: "BB6-p136-cylhead-headbolt",
      source: { manual: "BB6", page: 136, figure: "Fig 3-1" },
      system: "engine",
      assembly: "cylinder-head",
      fastener_name: "Cylinder head bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: 35, grade: "12.9" },
      qty: 10,
      role: "tty-stretch",
      torque: {
        steps: [
          { pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null },
          { pass: 2, nm: null, kgfm: null, lbft: null, angle_deg: 90 },
        ],
        sequence_ref: "BB6 p.136 fig.2",
      },
      lubrication: "oiled",
      reusable: false,
      oem: true,
    },
  ],
};

// ===========================================================================
// Per-invocation record — missing manual (invalid)
// ===========================================================================

export const INVALID_INVOCATION_RECORD_MISSING_MANUAL = {
  ...VALID_INVOCATION_RECORD,
  manual: undefined,
};

// ===========================================================================
// Per-invocation record — empty response_parsed
// ===========================================================================

export const INVOCATION_EMPTY_PARSED = {
  ...VALID_INVOCATION_RECORD,
  response_parsed: [],
};

// ===========================================================================
// Per-invocation record — null response_parsed
// ===========================================================================

export const INVOCATION_NULL_PARSED = {
  ...VALID_INVOCATION_RECORD,
  response_parsed: null,
};

// ===========================================================================
// Per-invocation record — with parse_error
// ===========================================================================

export const INVOCATION_WITH_PARSE_ERROR = {
  ...VALID_INVOCATION_RECORD,
  response_parsed: [],
  parse_error: "Failed to parse JSON response: unexpected token",
};

// ===========================================================================
// Per-invocation record — multi-row parsed
// ===========================================================================

export const VALID_INVOCATION_MULTI_ROWS = {
  ...VALID_INVOCATION_RECORD,
  invocation_id: "together.qwen3-vl-235b.r1.2026-05-15T22-03-11Z",
  model_id: "together.qwen3-vl-235b",
  response_parsed: [
    {
      id: "BB6-p136-cylhead-headbolt",
      source: { manual: "BB6", page: 136 },
      system: "engine",
      assembly: "cylinder-head",
      fastener_name: "Cylinder head bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
      qty: 10,
      role: "tty-stretch",
      torque: { steps: [{ pass: 1, nm: 39, kgfm: 4.0, lbft: 29, angle_deg: null }] },
      lubrication: "dry",
      reusable: false,
      oem: true,
    },
    {
      id: "BB6-p136-valvecover-bolt",
      source: { manual: "BB6", page: 136 },
      system: "engine",
      assembly: "valve-cover",
      fastener_name: "Valve cover bolt",
      thread: { nominal_mm: 8, pitch_mm: 1.25, length_mm: null, grade: null },
      qty: 12,
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 9, kgfm: 0.9, lbft: 7, angle_deg: null }] },
      lubrication: "dry",
      reusable: true,
      oem: true,
    },
  ],
};

// ===========================================================================
// Per-invocation record — mixed valid/invalid rows
// ===========================================================================

export const INVOCATION_MIXED_ROWS = {
  ...VALID_INVOCATION_RECORD,
  response_parsed: [
    // Valid row
    {
      id: "BB6-p136-good",
      source: { manual: "BB6", page: 136 },
      system: "engine",
      assembly: "test",
      fastener_name: "Test bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
      qty: 1,
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 30, kgfm: 3.0, lbft: 22, angle_deg: null }] },
      lubrication: "dry",
      reusable: true,
      oem: true,
    },
    // Invalid row — missing required fields that enrichment cannot fill
    {
      id: "BB6-p136-bad",
      source: { manual: "BB6", page: 136 },
      system: "engine",
      assembly: "test",
      fastener_name: "Bad bolt",
      thread: { nominal_mm: 10, pitch_mm: 1.25, length_mm: null, grade: null },
      qty: -1, // negative qty is invalid
      role: "cap-screw",
      torque: { steps: [{ pass: 1, nm: 30, kgfm: 3.0, lbft: 22, angle_deg: null }] },
      lubrication: "dry",
      reusable: true,
      oem: true,
    },
    // Another valid row
    {
      id: "BB6-p136-good2",
      source: { manual: "BB6", page: 136 },
      system: "drivetrain",
      assembly: "test2",
      fastener_name: "Test bolt 2",
      thread: { nominal_mm: 12, pitch_mm: 1.75, length_mm: null, grade: null },
      qty: 4,
      role: "flange-bolt",
      torque: { steps: [{ pass: 1, nm: 50, kgfm: 5.1, lbft: 37, angle_deg: null }] },
      lubrication: "oiled",
      reusable: true,
      oem: true,
    },
  ],
};
