/** HUCE 2026 — narrow exact branch (THPT-exam method), quoting the official per-program threshold
 * table (PDF 227/TB-HDTSDH, `sources.ts:huce-threshold-conversion-2026`). The notice does not state
 * a formula or whether the published floor already includes priority points, so the exact branch
 * compares the raw 3-subject total against the threshold (conservative default) and applies Dieu 7
 * TT 06/2026 as a judgment call only for the informational reference score. */
export const huceThptExamExactThresholdEvidence = {
  ruleId: 'huce-thpt-exam-exact-threshold-2026',
  evidence: [
    {
      sourceId: 'huce-threshold-conversion-2026',
      location: 'PDF 227/TB-HDTSDH, per-program THPT-exam threshold column (thang 30).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
