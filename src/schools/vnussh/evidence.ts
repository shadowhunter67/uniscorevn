import type { SourcedRule } from '../../core/evidence';

export const vnusshExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận TRỰC TIẾP điểm chuẩn công bố = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'vnussh-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành x tổ hợp, Trường Đại học Khoa học Xã hội và Nhân văn - ĐHQGHN 2025 (tuyensinh247, cross-check VietnamNet).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const vnusshFieldThresholdEvidence = {
  ruleId: 'vnussh-field-threshold-2025',
  evidence: [
    {
      sourceId: 'vnussh-threshold-2025',
      location: 'Điểm chuẩn theo ngành x tổ hợp — nhánh thi TN THPT (thang 30, đã gồm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'vnussh-threshold-secondary-2025',
      location: 'Cross-check độc lập — khớp ngành cao nhất (Tâm lý học, tổ hợp C00, 29,00) và số lượng 28-29 ngành tuyển sinh.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
