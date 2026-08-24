import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ttnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ttn-program-threshold-table-not-imported',
    label: 'TTN 2026 threshold table by program/major group has not been fully imported; only the common baseline and the highest-known program floors are modeled.',
    status: 'official-but-unparsed',
    sourceId: 'ttn-threshold-notice-2026',
    scoreAffecting: true,
    knownData: ['Common baseline: 15.00/30', 'Medicine: 22/30', 'Teacher-training programs: 20/30', 'Nursing / Medical Laboratory Technology: 18/30'],
    impact: 'The runtime can rule out totals below 15/30, but cannot conclude eligibility for totals between 15/30 and the highest published program floor without a selected program.',
  },
  {
    id: 'ttn-alternative-methods-not-modeled',
    label: 'TTN 2026 also allows transcript (PT200) and VNU aptitude-test (PT402) admission, plus a combined-aptitude route (PT405) with its own core-subject minimum; only the THPT exam route (PT100) is modeled.',
    status: 'official-but-unparsed',
    sourceId: 'ttn-threshold-notice-2026',
  },
  {
    id: 'ttn-program-catalog-pdf-unparsed',
    label: 'The full TTN 2026 admission information PDF (programs, quotas, subject combinations) is a scanned/binary layout that could not be text-extracted.',
    status: 'official-but-unparsed',
    sourceId: 'ttn-admission-notice-2026',
  },
];
