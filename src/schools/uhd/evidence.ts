import type { SourcedRule } from '../../core/evidence';

export const uhdThptExactFormulaEvidence = {
  value: 'Điểm xét tuyển = Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm UT (điểm ưu tiên)',
  evidence: [
    {
      sourceId: 'uhd-quyet-dinh-289-2026',
      location: 'Quyết định 289/QĐ-ĐHHD, trang 4 (công thức điểm xét tuyển PT100) và mục 5.5.d (áp dụng điểm ưu tiên theo quy định Bộ GD&ĐT)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;

export const uhdNoBonusPointsEvidence = {
  value: 'Điểm cộng: Nhà trường không áp dụng (2026)',
  evidence: [
    {
      sourceId: 'uhd-quyet-dinh-289-2026',
      location: 'Quyết định 289/QĐ-ĐHHD, mục 5.2',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
