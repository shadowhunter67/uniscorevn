import type { SourcedRule } from '../../core/evidence';

export const thanhdoThptExactFormulaEvidence = {
  value:
    'Điểm trúng tuyển = tổng điểm 3 bài thi/môn thi trong tổ hợp xét tuyển, thang 30, không nhân hệ số, không tính điểm cộng',
  evidence: [
    {
      sourceId: 'thanhdo-cutoff-2026',
      location: 'thanhdo.edu.vn, bài "Trường Đại học Thành Đô chính thức công bố điểm chuẩn... năm 2026"',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;

export const thanhdoNoBonusPointsEvidence = {
  value: 'Điểm chuẩn công bố "không tính điểm cộng" — ThanhDo không công bố điểm cộng nào cho phương thức thi TN THPT 2026',
  evidence: [
    {
      sourceId: 'thanhdo-cutoff-2026',
      location: 'thanhdo.edu.vn, bài "Trường Đại học Thành Đô chính thức công bố điểm chuẩn... năm 2026"',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
