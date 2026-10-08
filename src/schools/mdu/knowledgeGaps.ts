import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const mduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'mdu-health-law-programs-not-modeled',
    label: 'MDU/MIT exact scope excludes Pharmacy and Economic Law.',
    status: 'official-but-unparsed',
    note:
      'Pharmacy belongs to the health-profession field and Economic Law belongs to the legal field; both cần carry ministry-level thresholds or auxiliary conditions. They are kept out of exact scope until the full official rule is modeled.',
    impact: 'Applicants to Pharmacy or Economic Law are returned as partial/unknown instead of being assigned a potentially incomplete threshold.',
    sourceId: 'mdu-cutoff-summary-2026',
    scoreAffecting: true,
  },
  {
    id: 'mdu-priority-judgment-call',
    label: 'Priority points use the national framework as a judgment call.',
    status: 'official-but-unparsed',
    note:
      'The official MIT admissions page confirms the THPT 3-subject floor but does not publish a school-specific priority table for this branch. UniScoreVN displays the national priority calculation as reference and compares raw score to the 15/30 threshold.',
    impact: 'Eligibility is based on raw THPT total; priority is shown in the score for transparency only.',
    sourceId: 'mdu-admission-methods-2026',
    scoreAffecting: false,
  },
  {
    id: 'mdu-other-methods-not-modeled',
    label: 'Other MDU/MIT 2026 methods are not modeled.',
    status: 'official-but-unparsed',
    note:
      'The school also publishes transcript, V-ACT, and direct admission pathways. This module only models the THPT exam branch.',
    impact: 'Applicants using non-THPT pathways need a separate calculator.',
    sourceId: 'mdu-admission-methods-2026',
    scoreAffecting: false,
  },
];
