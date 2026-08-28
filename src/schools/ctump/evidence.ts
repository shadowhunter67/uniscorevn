import type { SourcedRule } from '../../core/evidence';

export const ctumpThptExamThresholdEvidence = {
  value: { tiers: 4, groups: '14 ngành/tổ hợp, mục II.1' },
  evidence: [
    {
      sourceId: 'ctump-quality-threshold-2026',
      location: 'Thông báo 197/TB-ĐHYDCT, mục II.1 (bảng 4 mức điểm nhận hồ sơ đợt 1)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-25',
    },
  ],
} satisfies SourcedRule<{ tiers: number; groups: string }>;

export const ctumpPriorityReductionFormulaEvidence = {
  value: 'Điểm ưu tiên = [(30 – Tổng điểm)/7,50] × Mức điểm ưu tiên quy định, áp dụng khi tổng điểm ≥ 22,5/30',
  evidence: [
    {
      sourceId: 'ctump-quality-threshold-2026',
      location: 'Thông báo 197/TB-ĐHYDCT, mục II.1 (công thức giảm dần điểm ưu tiên)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-25',
    },
  ],
} satisfies SourcedRule<string>;
