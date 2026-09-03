import type { SourcedRule } from '../../core/evidence';

export const hatExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận TRỰC TIẾP điểm chuẩn công bố = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". Mức điểm ưu tiên cụ thể không được trường (hay Đại học Huế) công bố riêng — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'hat-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành, Trường Du lịch - Đại học Huế 2025 (tuyensinh247).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const hatFieldThresholdEvidence = {
  ruleId: 'hat-field-threshold-2025',
  evidence: [
    {
      sourceId: 'hat-threshold-2025',
      location: 'Điểm chuẩn theo ngành — nhánh thi TN THPT (thang 30, đã gồm ưu tiên, giống nhau giữa mọi tổ hợp trong 1 ngành).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'hat-threshold-secondary-2025',
      location: 'Cross-check độc lập qua Báo Hà Tĩnh — khớp TUYỆT ĐỐI 7/7 ngành theo TỪNG tổ hợp.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'hat-threshold-tertiary-2025',
      location: 'Cross-check độc lập thứ 3 qua Sforum/CellphoneS — khớp TUYỆT ĐỐI 7/7 mức điểm theo ngành.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
