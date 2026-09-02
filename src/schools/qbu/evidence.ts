import type { SourcedRule } from '../../core/evidence';

export const qbuExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận toàn bộ 15 ngành QBU không nhân hệ số ("xét 3 môn thi (không nhân hệ số)") và điểm chuẩn công bố ứng với thí sinh khu vực 3 (điểm ưu tiên = 0, "Điểm này không tính điểm cộng ưu tiên") — tương đương mức ĐXT tối thiểu = tổng thô + điểm ưu tiên. Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'qbu-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành x tổ hợp, Trường Đại học Quảng Bình 2025 (Tuyensinh247, cross-check Taro.edu.vn/FPTShop/Sforum/Navigates).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const qbuFieldThresholdEvidence = {
  ruleId: 'qbu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'qbu-threshold-2025',
      location: 'Điểm chuẩn theo ngành x tổ hợp — nhánh thi TN THPT (thang 30, mức KV3 = ĐXT tối thiểu).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'qbu-threshold-secondary-2025',
      location: 'Cross-check độc lập — khớp số liệu tuyệt đối cho toàn bộ 72 cặp ngành/tổ hợp đã mô hình hoá.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
