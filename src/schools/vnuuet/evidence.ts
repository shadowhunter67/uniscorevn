import type { SourcedRule } from '../../core/evidence';

export const vnuuetExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận TRỰC TIẾP điểm chuẩn công bố = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'vnuuet-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành, Trường Đại học Công nghệ - ĐHQGHN 2025 (tuyensinh247, cross-check VnExpress).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const vnuuetFieldThresholdEvidence = {
  ruleId: 'vnuuet-field-threshold-2025',
  evidence: [
    {
      sourceId: 'vnuuet-threshold-2025',
      location: 'Điểm chuẩn theo ngành — nhánh thi TN THPT (thang 30, đã gồm ưu tiên, giống nhau giữa mọi tổ hợp trong 1 ngành).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'vnuuet-threshold-secondary-2025',
      location: 'Cross-check độc lập — dải điểm 22,14-28,19 khớp (chênh 0,01 điểm thấp nhất do làm tròn khác nguồn).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
