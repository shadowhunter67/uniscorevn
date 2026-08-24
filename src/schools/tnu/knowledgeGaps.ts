import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tnuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tnu-member-school-threshold-table-not-imported',
    label: 'TNU is a multi-member system; only the system-wide common baseline and the highest-known program-category floors are modeled, not each member school/branch campus own published thresholds.',
    status: 'official-but-unparsed',
    sourceId: 'tnu-threshold-notice-2026',
    scoreAffecting: true,
    knownData: ['Common baseline: 16.00/30', 'Teacher-training: 18.00-22.50/30', 'Medicine/Dentistry: 22.00-23.00/30', 'Semiconductor technology: 22.50/30 (Math >= 7.50)', 'Law: 20.00/30'],
    impact: 'The runtime can rule out totals below 16/30, but cannot conclude eligibility for totals between 16/30 and the highest published program-category floor without a selected member school/program.',
  },
  {
    id: 'tnu-vsat-conversion-not-modeled',
    label: 'TNU 2026 publishes a percentile/linear-interpolation rule converting its own V-SAT computer-based assessment scores to equivalent THPT scores; this conversion is not implemented.',
    status: 'official-but-unparsed',
    sourceId: 'tnu-threshold-notice-2026',
  },
];
