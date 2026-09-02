import type { SourcedRule } from '../../core/evidence';

export const vnuhusExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận TRỰC TIẾP điểm chuẩn công bố = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'vnuhus-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành, Trường Đại học Khoa học Tự nhiên - ĐHQGHN 2025 (tuyensinh247, cross-check Daibieunhandan.vn).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const vnuhusFieldThresholdEvidence = {
  ruleId: 'vnuhus-field-threshold-2025',
  evidence: [
    {
      sourceId: 'vnuhus-threshold-2025',
      location: 'Điểm chuẩn theo ngành — nhánh thi TN THPT (thang 30, đã gồm ưu tiên, giống nhau giữa mọi tổ hợp trong 1 ngành).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'vnuhus-threshold-secondary-2025',
      location: 'Cross-check độc lập — dải điểm 20,5-26 khớp.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
