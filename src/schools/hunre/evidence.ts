import type { SourcedRule } from '../../core/evidence';

export const hunreExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận TRỰC TIẾP điểm chuẩn công bố "đã bao gồm điểm ưu tiên (nếu có)". Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'hunre-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành, Trường Đại học Tài nguyên và Môi trường Hà Nội 2025 (Viettelstore, cross-check Giaoduc.net.vn).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const hunreFieldThresholdEvidence = {
  ruleId: 'hunre-field-threshold-2025',
  evidence: [
    {
      sourceId: 'hunre-threshold-2025',
      location: 'Điểm chuẩn theo ngành — nhánh thi TN THPT (thang 30, đã gồm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'hunre-threshold-secondary-2025',
      location: 'Cross-check độc lập — dải điểm 15-26,65 khớp tuyệt đối, khớp ngành cao nhất (Marketing).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
