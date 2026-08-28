import type { SourcedRule } from '../../core/evidence';

export const fbuThptExactFormulaEvidence = {
  value:
    'Điểm xét tuyển = [((Điểm môn 1 × 2) + Điểm môn 2 + Điểm môn 3)/4] × 3 + ĐKK(nếu có) + ĐXT(nếu có) + ĐƯT(nếu có), tối đa 30 điểm',
  evidence: [
    {
      sourceId: 'fbu-qd99-2026',
      location: 'Quyết định 99/QĐ-ĐHTNH, mục 2.1.2 (công thức điểm xét tuyển PT1) và mục 7 (áp dụng chính sách ưu tiên theo Quy chế Bộ GD&ĐT và của Trường)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
