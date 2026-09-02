import type { SourcedRule } from '../../core/evidence';

export const hdiuExactFormulaEvidence = {
  value:
    'Điểm xét (Phương thức 100 — xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, làm tròn đến 0,25) + điểm ưu tiên khu vực/đối tượng — nguồn xác nhận TRỰC TIẾP điểm ưu tiên được CỘNG vào tổng trước khi so với ngưỡng đảm bảo chất lượng đầu vào theo ngành. Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'hdiu-admission-info-2025',
      location: 'Quyết định 129/QĐ-ĐHĐD, trang 2, mục "2.1. Phương thức 100" và "Ngưỡng đảm bảo chất lượng đầu vào".',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const hdiuFieldThresholdEvidence = {
  ruleId: 'hdiu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'hdiu-threshold-2025',
      location: 'Bảng "Điểm sàn xét thi tốt nghiệp THPT 2025" theo ngành.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
