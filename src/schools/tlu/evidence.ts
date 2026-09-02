import type { SourcedRule } from '../../core/evidence';

export const tluExactFormulaEvidence = {
  value:
    'Điểm xét (PT1 — xét kết quả thi TN THPT 2025) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (thang 10/môn, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Điểm chuẩn PT1 công bố theo ngành (`tlu-threshold-2025`) là điểm chuẩn trúng tuyển thực tế, áp dụng quy ước chuẩn quốc gia là ĐÃ CỘNG điểm ưu tiên (trường không phủ nhận, không tuyên bố riêng). Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'tlu-threshold-2025',
      location: 'Bảng điểm chuẩn PT1 theo ngành, Trường Đại học Thủy lợi 2025 (đăng lại trên Cổng TTĐT Chính phủ).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
} satisfies SourcedRule<string>;

export const tluFieldThresholdEvidence = {
  ruleId: 'tlu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'tlu-threshold-2025',
      location: 'Cột PT1 — điểm chuẩn xét điểm thi TN THPT 2025 theo ngành.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-02',
    },
  ],
};
