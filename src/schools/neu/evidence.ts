import type { SourcedRule } from '../../core/evidence';
import { NEU_EQUIVALENCE_BANDS, NEU_THPT_THRESHOLD_30 } from './equivalence';

export const neuThresholdEvidence = {
  value: NEU_THPT_THRESHOLD_30,
  evidence: [
    {
      sourceId: 'neu-threshold-equivalence-2026',
      location: 'Notice 1613 page 1, section 1: threshold 22.0/30 for A00, A01, D01, D07.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-21',
    },
  ],
} satisfies SourcedRule<number>;

export const neuEquivalenceBandEvidence = {
  value: NEU_EQUIVALENCE_BANDS,
  evidence: [
    {
      sourceId: 'neu-threshold-equivalence-2026',
      location: 'Notice 1613 page 2, section 3: equivalent admitted-score bands for THPT, HSA, SAT, V-ACT, and TSA.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-21',
    },
  ],
} satisfies SourcedRule<typeof NEU_EQUIVALENCE_BANDS>;

export const neuThptExamExactEvidence = {
  ruleId: 'neu-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'neu-admission-info-2026',
      location: 'Trang 3, mục 2.2: "ĐHKTQD sử dụng 04 tổ hợp xét tuyển là A00, A01, D01, D07, các môn trong tổ hợp là hệ số 1." Trang 9, mục 7.1: công thức điểm ưu tiên.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
    {
      sourceId: 'neu-cutoff-2026',
      location: 'Thông báo 1890/TB-ĐHKTQD, bảng điểm chuẩn 42/88 mã ngành chuẩn (thang 30).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};

