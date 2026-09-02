import type { SourcedRule } from '../../core/evidence';

export const aofExactFormulaEvidence2025 = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025, phương thức 3) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận TRỰC TIẾP điểm chuẩn công bố = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'aof-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành/chương trình, Học viện Tài chính 2025 (Báo Hà Tĩnh, cross-check tuyensinh247).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const aofFieldThresholdEvidence2025 = {
  ruleId: 'aof-field-threshold-2025',
  evidence: [
    {
      sourceId: 'aof-threshold-2025',
      location: 'Điểm chuẩn theo ngành/chương trình — nhánh thi TN THPT 2025, phương thức 3 (thang 30, đã gồm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'aof-threshold-secondary-2025',
      location: 'Cross-check độc lập qua tuyensinh247 — khớp TUYỆT ĐỐI toàn bộ 34/34 ngành/chương trình đã mô hình hoá.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
