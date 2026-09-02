import type { SourcedRule } from '../../core/evidence';

export const tvuExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận TRỰC TIẾP điểm chuẩn công bố = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có". Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'tvu-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành, Trường Đại học Trà Vinh 2025 (FPTShop, cross-check Sforum/CellphoneS khối Y Dược).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const tvuFieldThresholdEvidence = {
  ruleId: 'tvu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'tvu-threshold-2025',
      location: 'Điểm chuẩn theo ngành khối sức khỏe — nhánh thi TN THPT (thang 30, đã gồm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'tvu-threshold-secondary-2025',
      location: 'Cross-check độc lập — cùng số liệu 5/5 ngành khối sức khỏe.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'tvu-admission-scheme-2026',
      location: 'Bảng mã ngành → tổ hợp xét tuyển (đề án tuyển sinh).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-02',
    },
  ],
};
