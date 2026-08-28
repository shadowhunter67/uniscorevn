import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const huceKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'huce-subject-combinations-not-runtime-mapped',
    label: 'HUCE 2026 subject-combination scope is not yet mapped per program in runtime.',
    status: 'incomplete',
    impact: 'The evaluator can check published thresholds for a supplied program and combination, but cannot validate that the selected combination is allowed for that program.',
    sourceId: 'huce-admission-info-2026',
  },
  {
    id: 'huce-bonus-priority-not-modeled',
    label:
      'The exact branch (evaluateHuceThptExamExactAdmission) computes a reference score with priority applied as a judgment call (Dieu 7 TT 06/2026, `priority.ts`) since HUCE does not publish its own priority table, but this is informational only and NOT used for the threshold check itself. HUCE-specific bonus points are still not modeled at all.',
    status: 'incomplete',
    impact: 'method-out-of-scope',
    sourceId: 'huce-threshold-conversion-2026',
  },
];
