export const mduThptExamExactEvidence = {
  ruleId: 'mdu-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'mdu-admission-methods-2026',
      location:
        'Official MIT Uni. 2026 admissions page, Method 1: THPT exam results; 3-subject combination must include Math or Literature and total score must be at least 15/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-26',
    },
    {
      sourceId: 'mdu-cutoff-summary-2026',
      location:
        '2026 cutoff table: THPT exam admission thresholds are 15/30 for the modeled programs; Pharmacy is 19 and Economic Law is 18 but both are intentionally out of exact scope.',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-26',
    },
  ],
};
