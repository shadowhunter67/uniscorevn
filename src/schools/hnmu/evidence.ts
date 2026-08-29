import type { SourcedRule } from '../../core/evidence';

export const hnmuThptExactFormulaEvidence = {
  value:
    'Ngưỡng đảm bảo chất lượng đầu vào (phương thức thi TN THPT) = tổng điểm thô 3 môn/bài thi theo tổ hợp xét tuyển (thang 30, không nhân hệ số, không tính điểm cộng — xác nhận trực tiếp), so với ngưỡng theo nhóm ngành, áp dụng thí sinh khu vực 3.',
  evidence: [
    {
      sourceId: 'hnmu-threshold-2026',
      location:
        'Thông báo ngưỡng đảm bảo chất lượng đầu vào HNMU 2026, trích dẫn qua báo chí chính thống (giadinh.suckhoedoisong.vn, vietnamnet.vn): "đối với thí sinh ở khu vực 3 có mức điểm tối thiểu (không nhân hệ số) của tất cả các tổ hợp gồm 3 bài thi/môn thi theo thang điểm 30, không tính điểm cộng".',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-30',
    },
  ],
} satisfies SourcedRule<string>;

export const hnmuGroupThresholdEvidence = {
  ruleId: 'hnmu-group-threshold-2026',
  evidence: [
    {
      sourceId: 'hnmu-threshold-2026',
      location: 'Bảng ngưỡng đảm bảo chất lượng đầu vào theo nhóm ngành, thi TN THPT 2026 (thang 30, thí sinh KV3).',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-30',
    },
  ],
};
