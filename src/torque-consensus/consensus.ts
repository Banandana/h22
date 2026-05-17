import type {
  FlatRow,
  TorqueRow,
  DisputedRow,
  CorroborationBlock,
  InvocationRef,
  DisagreeingInvocationRef,
  CandidateEntry,
  PageConsensusStats,
  ConsensusReport,
  ReportSummary,
} from "./types.js";

/**
 * Compute tolerance threshold for torque clustering.
 * Two values cluster together if |a - b| <= max(2, 0.05 * |a|).
 */
function torqueTolerance(torqueNm: number): number {
  return Math.max(2, 0.05 * Math.abs(torqueNm));
}

/**
 * Check if two torque values are within tolerance of each other.
 */
function withinTolerance(a: number, b: number): boolean {
  const tol = torqueTolerance(Math.min(a, b));
  return Math.abs(a - b) <= tol;
}

/**
 * Cluster flat rows by torque value within tolerance.
 * Returns clusters where each cluster contains rows with similar torque values.
 */
function clusterByTorque(rows: { torqueNm: number | null; row: FlatRow }[]): {
  torqueNm: number;
  rows: FlatRow[];
}[] {
  const clusters: { torqueNm: number; rows: FlatRow[] }[] = [];

  for (const { torqueNm, row } of rows) {
    if (torqueNm === null) continue;

    let placed = false;
    for (const cluster of clusters) {
      if (withinTolerance(cluster.torqueNm, torqueNm)) {
        cluster.rows.push(row);
        // Update cluster center to average
        cluster.torqueNm =
          (cluster.torqueNm * (cluster.rows.length - 1) + torqueNm) /
          cluster.rows.length;
        placed = true;
        break;
      }
    }

    if (!placed) {
      clusters.push({ torqueNm, rows: [row] });
    }
  }

  return clusters;
}

/**
 * Group flat rows by page.
 */
function groupByPage(rows: FlatRow[]): Map<string, FlatRow[]> {
  const pageMap = new Map<string, FlatRow[]>();

  for (const row of rows) {
    const key = `${row.manual}-${row.page}`;
    if (!pageMap.has(key)) {
      pageMap.set(key, []);
    }
    pageMap.get(key)!.push(row);
  }

  return pageMap;
}

/**
 * Group flat rows by (assembly, fastener_name, thread_nominal_mm, thread_pitch_mm).
 */
function groupByKey(rows: FlatRow[]): Map<string, FlatRow[]> {
  const keyMap = new Map<string, FlatRow[]>();

  for (const row of rows) {
    const key = [
      row.assembly,
      row.fastener_name,
      row.thread_nominal_mm ?? "null",
      row.thread_pitch_mm ?? "null",
    ].join("|");
    if (!keyMap.has(key)) {
      keyMap.set(key, []);
    }
    keyMap.get(key)!.push(row);
  }

  return keyMap;
}

/**
 * Build corroboration block for a consensus row.
 */
function buildCorroboration(
  agreeingRows: FlatRow[],
  disagreeingRows: FlatRow[],
  totalInvocations: number,
  singleSource: boolean
): CorroborationBlock {
  const agreeingInvocations: InvocationRef[] = agreeingRows.map((r) => ({
    model_id: r.meta.model_id as string ?? "unknown",
    run: r.meta.run as string ?? "r1",
    temperature: (r.meta.temperature as number) ?? 0,
    response_path: r.meta.response_path as string ?? "",
  }));

  const disagreeingInvocations: DisagreeingInvocationRef[] = disagreeingRows.map(
    (r) => ({
      model_id: r.meta.model_id as string ?? "unknown",
      run: r.meta.run as string ?? "r1",
      temperature: (r.meta.temperature as number) ?? 0,
      response_path: r.meta.response_path as string ?? "",
      their_torque_nm: r.torque_nm ?? 0,
    })
  );

  const voteStrength =
    totalInvocations > 0 ? agreeingRows.length / totalInvocations : 1;

  let consensusStrategy: CorroborationBlock["consensus_strategy"];
  if (singleSource) {
    consensusStrategy = "single-source";
  } else if (disagreeingRows.length === 0 && agreeingRows.length === totalInvocations) {
    consensusStrategy = "unanimous";
  } else {
    consensusStrategy = "majority-vote-torque-nm";
  }

  return {
    consensus_strategy: consensusStrategy,
    agreeing_invocations: agreeingInvocations,
    disagreeing_invocations: disagreeingInvocations,
    vote_strength: Math.round(voteStrength * 1000) / 1000,
    intra_model_consistency: {},
    single_source: singleSource,
  };
}

/**
 * Run consensus pass on flat rows.
 *
 * For each page, groups rows by (assembly, fastener_name, thread),
 * clusters by torque value, picks majority cluster, emits consensus
 * or disputed row accordingly.
 */
export function runConsensusPass(flatRows: FlatRow[]): {
  consensusRows: TorqueRow[];
  disputedRows: DisputedRow[];
  report: ConsensusReport;
} {
  const pageMap = groupByPage(flatRows);
  const consensusRows: TorqueRow[] = [];
  const disputedRows: DisputedRow[] = [];
  const pageStats: PageConsensusStats[] = [];

  let singleSourceCount = 0;

  for (const [pageKey, pageRows] of pageMap) {
    const [manualStr, pageStr] = pageKey.split("-");
    const manual = manualStr as "BB6" | "OBD1";
    const page = parseInt(pageStr, 10);

    // Count total unique invocations on this page
    const invocationIds = new Set(pageRows.map((r) => r.invocation_id));
    const totalInvocations = invocationIds.size;

    // Collect all contributing model IDs
    const contributingModels = new Set(
      pageRows.map((r) => (r.meta.model_id as string) ?? "unknown")
    );

    // Group by fastener key
    const keyMap = groupByKey(pageRows);

    let consensusCount = 0;
    let disputedCount = 0;
    let totalVoteStrength = 0;

    for (const [key, fastenerRows] of keyMap) {
      // Extract torque values and cluster
      const torqueData = fastenerRows.map((r) => ({
        torqueNm: r.torque_nm,
        row: r,
      }));

      const clusters = clusterByTorque(torqueData);

      if (clusters.length === 0) {
        // No valid torque values - skip
        continue;
      }

      // Find largest cluster (majority)
      clusters.sort((a, b) => b.rows.length - a.rows.length);
      const winner = clusters[0];
      const loserClusters = clusters.slice(1);

      // All rows not in winner cluster
      const loserRowIds = new Set<string>();
      for (const lc of loserClusters) {
        for (const r of lc.rows) {
          loserRowIds.add(r.id);
        }
      }

      const winningRows = winner.rows.filter((r) => !loserRowIds.has(r.id));
      const losingRows = fastenerRows.filter((r) => loserRowIds.has(r.id));

      // Check if majority reached (>50% of total invocations)
      const isMajority = winningRows.length > totalInvocations / 2;
      const isSingleSource = totalInvocations === 1;

      // Generate stable ID from key
      const idParts = [manual, String(page), ...key.split("|")].join("-");
      const hashInput = idParts;
      let hash = 0;
      for (let i = 0; i < hashInput.length; i++) {
        const char = hashInput.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0;
      }
      const id = `consensus-${Math.abs(hash).toString(16).padStart(8, "0")}`;

      const firstWinningRow = winningRows[0];

      if (isMajority || isSingleSource) {
        // Emit consensus row
        const corroboration = buildCorroboration(
          winningRows,
          losingRows,
          totalInvocations,
          isSingleSource
        );

        const consensusRow: TorqueRow = {
          id,
          source: {
            manual,
            page,
            figure: null,
          },
          applies_to: {
            trans: (firstWinningRow.meta.trans as "A/T" | "M/T" | "both") ?? "both",
            trim: (firstWinningRow.meta.trim as "base" | "SH" | "all") ?? "all",
            my: (firstWinningRow.meta.my as string) ?? "all",
            engine_codes:
              (firstWinningRow.meta.engine_codes as string[]) ?? [],
          },
          system: firstWinningRow.system as TorqueRow["system"],
          assembly: firstWinningRow.assembly,
          fastener_name: firstWinningRow.fastener_name,
          thread: {
            nominal_mm: firstWinningRow.thread_nominal_mm,
            pitch_mm: firstWinningRow.thread_pitch_mm,
            length_mm: firstWinningRow.thread_length_mm,
            grade: firstWinningRow.thread_grade,
          },
          qty: firstWinningRow.qty,
          role: firstWinningRow.role,
          torque: {
            steps: winningRows[0].torque_steps,
            sequence_ref: winningRows[0].torque_sequence_ref,
          },
          lubrication: firstWinningRow.lubrication,
          reusable: firstWinningRow.reusable,
          reuse_conditions: firstWinningRow.reuse_conditions,
          honda_part_number: firstWinningRow.honda_part_number,
          tty: {
            stretch_max_mm: firstWinningRow.tty_stretch_max_mm,
            pre_stretch_mm: firstWinningRow.tty_pre_stretch_mm,
          },
          special_tool: firstWinningRow.special_tool,
          notes: firstWinningRow.notes,
          confidence: firstWinningRow.confidence,
          corroboration,
          conflict_group_id: null,
          oem: firstWinningRow.oem,
          meta: firstWinningRow.meta,
        };

        consensusRows.push(consensusRow);
        consensusCount++;
        totalVoteStrength += corroboration.vote_strength;
      } else {
        // No majority - emit disputed row
        const candidates: CandidateEntry[] = [];

        for (const r of winningRows) {
          candidates.push({
            model_id: (r.meta.model_id as string) ?? "unknown",
            run: (r.meta.run as string) ?? "r1",
            temperature: (r.meta.temperature as number) ?? 0,
            response_path: (r.meta.response_path as string) ?? "",
            torque_nm: r.torque_nm ?? 0,
          });
        }

        for (const r of losingRows) {
          candidates.push({
            model_id: (r.meta.model_id as string) ?? "unknown",
            run: (r.meta.run as string) ?? "r1",
            temperature: (r.meta.temperature as number) ?? 0,
            response_path: (r.meta.response_path as string) ?? "",
            torque_nm: r.torque_nm ?? 0,
          });
        }

        const voteStrength = winningRows.length / totalInvocations;

        const disputedRow: DisputedRow = {
          id,
          manual,
          page,
          assembly: firstWinningRow.assembly,
          fastener_name: firstWinningRow.fastener_name,
          thread_nominal_mm: firstWinningRow.thread_nominal_mm,
          thread_pitch_mm: firstWinningRow.thread_pitch_mm,
          candidates,
          total_invocations: totalInvocations,
          vote_strength: Math.round(voteStrength * 1000) / 1000,
          acknowledged: false,
          unresolved: false,
        };

        disputedRows.push(disputedRow);
        disputedCount++;
      }
    }

    const avgVoteStrength =
      consensusCount > 0
        ? Math.round((totalVoteStrength / consensusCount) * 1000) / 1000
        : 0;

    if (consensusCount > 0 || disputedCount > 0) {
      pageStats.push({
        page,
        manual,
        total_fasteners: keyMap.size,
        consensus_count: consensusCount,
        disputed_count: disputedCount,
        single_source_count: singleSourceCount,
        avg_vote_strength: avgVoteStrength,
        models_contributing: Array.from(contributingModels),
      });
    }
  }

  // Build summary
  const allModels = new Set<string>();
  for (const ps of pageStats) {
    for (const m of ps.models_contributing) {
      allModels.add(m);
    }
  }

  const totalVoteStrengthSum = pageStats.reduce(
    (sum, ps) => sum + ps.avg_vote_strength * ps.consensus_count,
    0
  );
  const totalConsensus = pageStats.reduce(
    (sum, ps) => sum + ps.consensus_count,
    0
  );
  const overallAvgVoteStrength =
    totalConsensus > 0
      ? Math.round((totalVoteStrengthSum / totalConsensus) * 1000) / 1000
      : 0;

  const summary: ReportSummary = {
    total_pages: pageStats.length,
    total_fasteners: pageStats.reduce((sum, ps) => sum + ps.total_fasteners, 0),
    total_consensus: totalConsensus,
    total_disputed: disputedRows.length,
    total_single_source: singleSourceCount,
    avg_vote_strength: overallAvgVoteStrength,
    models_contributing: Array.from(allModels).sort(),
  };

  const report: ConsensusReport = {
    summary,
    pages: pageStats.sort((a, b) => {
      if (a.manual !== b.manual) return a.manual.localeCompare(b.manual);
      return a.page - b.page;
    }),
  };

  return { consensusRows, disputedRows, report };
}
