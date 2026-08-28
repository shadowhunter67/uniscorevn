import type { SourcedRule } from '../../core/evidence';

export const vnuumpThptExactFormulaEvidence = {
  value: 'Điểm xét tuyển = Tổng điểm 3 môn thi TN THPT (không nhân hệ số) + Điểm cộng (không tính vào ngưỡng) + Điểm ưu tiên khu vực/đối tượng (nếu có)',
  evidence: [
    {
      sourceId: 'vnuump-admission-notice-2026',
      location: 'Trang tuyển sinh 2026 (công thức điểm xét tuyển, dẫn chiếu Điều 7 Quy chế tuyển sinh của Bộ GD&ĐT)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
    {
      sourceId: 'vnuump-thongbao-2468-2026',
      location: 'Thông báo 2468/TB-ĐHYD, mục 1 (bảng ngưỡng theo ngành, mức "không nhân hệ số, không tính điểm cộng" cho thí sinh khu vực 3)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
} satisfies SourcedRule<string>;
