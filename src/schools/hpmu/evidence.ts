import type { SourcedRule } from '../../core/evidence';

export const hpmuExactFormulaEvidence = {
  value:
    'Điểm xét (nhánh xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn xác nhận TRỰC TIẾP điểm chuẩn công bố ĐÃ CỘNG điểm ưu tiên và điểm thưởng. Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'hpmu-threshold-2025',
      location: 'Bảng điểm chuẩn theo ngành, Trường Đại học Y Dược Hải Phòng 2025 (VietNamNet, cross-check Công lý).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const hpmuFieldThresholdEvidence = {
  ruleId: 'hpmu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'hpmu-threshold-2025',
      location: 'Điểm chuẩn theo ngành — nhánh thi TN THPT (đã quy đổi tương đương, đã gồm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
    {
      sourceId: 'hpmu-threshold-secondary-2025',
      location: 'Cross-check độc lập — cùng số liệu.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
