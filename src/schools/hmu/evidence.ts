import type { SourcedRule } from '../../core/evidence';

export const hmuThptExactFormulaEvidence = {
  value:
    'Ngưỡng đảm bảo chất lượng đầu vào (phương thức thi TN THPT) = tổng điểm thô 3 môn thi theo tổ hợp xét tuyển (thang 30, không nhân hệ số, không cộng điểm ưu tiên/điểm khuyến khích), so với ngưỡng theo ngành.',
  evidence: [
    {
      sourceId: 'hmu-threshold-2026',
      location:
        'Thông báo số 3142/TB-ĐHYHN (10/07/2026), trích dẫn qua nhiều báo chí chính thống: "mức điểm này áp dụng đối với thí sinh khu vực 3, tính cho tổng điểm tối thiểu của 3 bài thi/môn thi không nhân hệ số, không tính điểm cộng ưu tiên".',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
} satisfies SourcedRule<string>;

export const hmuPerMajorThresholdEvidence = {
  ruleId: 'hmu-per-major-threshold-2026',
  evidence: [
    {
      sourceId: 'hmu-threshold-2026',
      location: 'Bảng ngưỡng đảm bảo chất lượng đầu vào theo ngành 2026 — 20 mã ngành (15 ngành cơ sở Hà Nội + 5 ngành/chương trình Phân hiệu Thanh Hoá), điểm sàn 17,0-24,0/30.',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
};
