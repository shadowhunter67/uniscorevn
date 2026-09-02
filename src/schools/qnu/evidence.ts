import type { SourcedRule } from '../../core/evidence';

export const qnuExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn trích nguyên văn công thức "ĐXT = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên" — điểm chuẩn công bố là mức ĐXT tối thiểu trúng tuyển. Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'qnu-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành, Trường Đại học Quy Nhơn 2025 (trangedu.com, cross-check Sforum/CellphoneS).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const qnuFieldThresholdEvidence = {
  ruleId: 'qnu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'qnu-threshold-2025',
      location: 'Điểm chuẩn theo ngành khối sư phạm/giáo dục — nhánh thi TN THPT (thang 30, đã gồm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'qnu-threshold-secondary-2025',
      location: 'Cross-check độc lập — khớp số liệu 9/10 ngành đã mô hình hoá.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
