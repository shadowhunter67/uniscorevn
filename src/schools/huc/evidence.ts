import type { SourcedRule } from '../../core/evidence';

export const hucExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận TRỰC TIẾP điểm chuẩn công bố = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'huc-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành x nhóm tổ hợp, Trường Đại học Văn hóa Hà Nội 2025 (tuyensinh247, cross-check VietnamNet).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const hucFieldThresholdEvidence = {
  ruleId: 'huc-field-threshold-2025',
  evidence: [
    {
      sourceId: 'huc-threshold-2025',
      location: 'Điểm chuẩn theo ngành x nhóm tổ hợp — nhánh thi TN THPT (thang 30, đã gồm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'huc-threshold-secondary-2025',
      location: 'Cross-check độc lập qua Báo Hà Tĩnh — khớp TUYỆT ĐỐI toàn bộ 20/20 ngành x tổ hợp đã mô hình hoá.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
