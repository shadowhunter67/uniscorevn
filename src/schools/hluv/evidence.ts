import type { SourcedRule } from '../../core/evidence';

export const hluvExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2025, mã phương thức 100) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Nguồn tổng hợp trích công thức tự công bố: "Điểm xét tuyển = Tổng điểm 3 môn trong tổ hợp xét tuyển + Điểm ưu tiên". Mức điểm ưu tiên cụ thể không được trường công bố riêng — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'hluv-combination-2025',
      location: 'Trường Đại Học Hoa Lư — Đề án tuyển sinh, mục công thức tính điểm xét tuyển — Hướng nghiệp HOCMAI.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const hluvFieldThresholdEvidence = {
  ruleId: 'hluv-field-threshold-2025',
  evidence: [
    {
      sourceId: 'hluv-threshold-2025',
      location: 'Thông báo mức điểm trúng tuyển đại học chính quy năm 2025 (Hội đồng tuyển sinh, 22/8/2025) — ảnh chụp nguyên văn, đọc bằng vision.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'hluv-combination-secondary-2025',
      location: 'Cross-check độc lập qua Báo Hà Tĩnh — khớp TUYỆT ĐỐI 8/8 ngành theo điểm chuẩn, bổ sung tổ hợp Sư phạm Lịch sử - Địa lý.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
