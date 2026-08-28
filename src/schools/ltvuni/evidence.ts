import type { SourcedRule } from '../../core/evidence';

export const ltvuniThptExactFormulaEvidence = {
  value: 'Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + điểm ƯT (nếu có)',
  evidence: [
    {
      sourceId: 'ltvuni-quality-threshold-2026',
      location: 'Thông báo 269/TB-ĐHLTV, mục B.1.a (trang 4, công thức điểm xét tuyển phương thức 100)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;

export const ltvuniNoBonusPointsEvidence = {
  value: 'Ngưỡng xét tuyển theo ngành (bảng A.1.b) không tính điểm cộng; LTVUni không công bố điểm cộng nào cho phương thức 100 (2026)',
  evidence: [
    {
      sourceId: 'ltvuni-quality-threshold-2026',
      location: 'Thông báo 269/TB-ĐHLTV, mục A.1.b (trang 1)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
