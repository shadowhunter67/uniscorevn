import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dluKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dlu-program-threshold-table-not-imported',
    label: 'DLU 2026 threshold table by program/major group has not been fully imported; only group-level bands from press coverage are modeled.',
    status: 'official-but-unparsed',
    sourceId: 'dlu-threshold-press-2026',
    scoreAffecting: true,
    knownData: [
      'Social sciences group: 16/30',
      'Engineering/Technology group: 17-18/30',
      'Law: 18/30 (also requires Class 12 full-year English transcript average >= 7)',
      'Teacher-training (Math, Vietnamese Literature, English, Primary Education): 21/30 (transcript route not used for these majors)',
      'Nuclear engineering: Math and Physics THPT exam scores >= 6.5 each',
    ],
    impact: 'The runtime can rule out totals below 16/30, but cannot conclude eligibility for totals between 16/30 and the highest published group floor (21/30) without a selected program, and cannot check subject-specific conditions (English transcript for Law, Math/Physics minimums for Nuclear Engineering).',
  },
  {
    id: 'dlu-primary-source-blocked',
    label: 'The official DLU admission site (dlu.edu.vn / tuyensinh.dlu.edu.vn) could not be fetched directly (TLS/WAF handshake failure); thresholds are cross-checked from two independent state-run news outlets (Tuoi Tre, Thanh Nien) reporting the official 2026 notice content.',
    status: 'official-but-unparsed',
    sourceId: 'dlu-threshold-press-2026',
    impact: 'Numbers are cross-checked across two independent secondary sources but have not been directly verified against the primary DLU notice text/PDF.',
  },
  {
    id: 'dlu-alternative-methods-not-modeled',
    label: 'DLU 2026 also allows a national aptitude-test (VNU-HCM ability assessment) admission route with its own score bands (e.g. 675/675 for pedagogy, 560 for engineering/technology, 530 for social sciences); only the THPT exam route is modeled.',
    status: 'official-but-unparsed',
    sourceId: 'dlu-threshold-press-2026',
  },
];
