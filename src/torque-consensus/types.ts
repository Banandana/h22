// Canonical row schema for h22-torques.jsonl (consensus rows)
export interface TorqueRow {
  id: string;
  source: {
    manual: "BB6" | "OBD1";
    page: number;
    figure: string | null;
  };
  applies_to: {
    trans: "A/T" | "M/T" | "both";
    trim: "base" | "SH" | "all";
    my: string;
    engine_codes: string[];
  };
  system: "engine" | "drivetrain" | "chassis" | "body" | "electrical";
  assembly: string;
  fastener_name: string;
  thread: {
    nominal_mm: number | null;
    pitch_mm: number | null;
    length_mm: number | null;
    grade: string | null;
  };
  qty: number;
  role: string;
  torque: {
    steps: TorqueStep[];
    sequence_ref: string | null;
  };
  lubrication: string | null;
  reusable: boolean | null;
  reuse_conditions: string | null;
  honda_part_number: string | null;
  tty: {
    stretch_max_mm: number | null;
    pre_stretch_mm: number | null;
  };
  special_tool: string | null;
  notes: string | null;
  confidence: "high" | "medium" | "low";
  corroboration: CorroborationBlock;
  conflict_group_id: string | null;
  oem: boolean;
  meta: Record<string, unknown>;
}

export interface TorqueStep {
  pass: number;
  nm: number | null;
  kgfm: number | null;
  lbft: number | null;
  angle_deg: number | null;
}

export interface CorroborationBlock {
  consensus_strategy: "majority-vote-torque-nm" | "unanimous" | "single-source" | "manual";
  agreeing_invocations: InvocationRef[];
  disagreeing_invocations: DisagreeingInvocationRef[];
  vote_strength: number;
  intra_model_consistency: Record<string, number | null>;
  single_source: boolean;
}

export interface InvocationRef {
  model_id: string;
  run: string;
  temperature: number;
  response_path: string;
}

export interface DisagreeingInvocationRef extends InvocationRef {
  their_torque_nm: number;
}

// Flat row from T-423: one row per (invocation × fastener)
export interface FlatRow {
  id: string;
  invocation_id: string;
  manual: "BB6" | "OBD1";
  page: number;
  system: string;
  assembly: string;
  fastener_name: string;
  thread_nominal_mm: number | null;
  thread_pitch_mm: number | null;
  thread_length_mm: number | null;
  thread_grade: string | null;
  qty: number;
  role: string;
  torque_nm: number | null; // first-pass torque in N·m
  torque_steps: TorqueStep[];
  torque_sequence_ref: string | null;
  lubrication: string | null;
  reusable: boolean | null;
  reuse_conditions: string | null;
  honda_part_number: string | null;
  tty_stretch_max_mm: number | null;
  tty_pre_stretch_mm: number | null;
  special_tool: string | null;
  notes: string | null;
  confidence: "high" | "medium" | "low";
  oem: boolean;
  meta: Record<string, unknown>;
}

// Disputed row: fastener group where no majority was reached
export interface DisputedRow {
  id: string;
  manual: "BB6" | "OBD1";
  page: number;
  assembly: string;
  fastener_name: string;
  thread_nominal_mm: number | null;
  thread_pitch_mm: number | null;
  candidates: CandidateEntry[];
  total_invocations: number;
  vote_strength: number;
  acknowledged: boolean;
  unresolved: boolean;
}

export interface CandidateEntry {
  model_id: string;
  run: string;
  temperature: number;
  response_path: string;
  torque_nm: number;
}

// Consensus report metadata
export interface PageConsensusStats {
  page: number;
  manual: "BB6" | "OBD1";
  total_fasteners: number;
  consensus_count: number;
  disputed_count: number;
  single_source_count: number;
  avg_vote_strength: number;
  models_contributing: string[];
}

export interface ConsensusReport {
  summary: ReportSummary;
  pages: PageConsensusStats[];
}

export interface ReportSummary {
  total_pages: number;
  total_fasteners: number;
  total_consensus: number;
  total_disputed: number;
  total_single_source: number;
  avg_vote_strength: number;
  models_contributing: string[];
}
