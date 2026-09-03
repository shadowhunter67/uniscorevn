import type { SourcedRule } from '../../core/evidence';

export const dumtpExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức 1 — xét kết quả thi TN THPT 2025, mã phương thức 100) = tổng thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng (khung quốc gia hiện hành, giảm dần từ 22,5/30). Nguồn chính thức "Thông tin tuyển sinh đại học năm 2025" (ydn.edu.vn) mục 3.2 xác nhận "điểm trúng tuyển ... theo thang điểm 30 cho tất cả các tổ hợp xét tuyển" (không có hệ số/trọng số riêng cho PT1, khác PT3 học bạ có hệ số quy đổi riêng) và mục 5.2 xác nhận công thức giảm điểm ưu tiên; điểm trúng tuyển chính thức (`dumtp-threshold-2025`) đã bao gồm điểm ưu tiên.',
  evidence: [
    {
      sourceId: 'dumtp-dean-2025',
      location: 'Thông tin tuyển sinh đại học năm 2025, mục II.3.2 và mục II.5.2 — ydn.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const dumtpFieldThresholdEvidence = {
  ruleId: 'dumtp-field-threshold-2025',
  evidence: [
    {
      sourceId: 'dumtp-threshold-2025',
      location: 'Quyết định 625/QĐ-ĐHKTYDĐN (22/8/2025), Điều 1 — bảng "Điểm trúng tuyển theo thang điểm 30" — ydn.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'dumtp-dean-2025',
      location: 'Thông tin tuyển sinh đại học năm 2025, mục II.5.1 — bảng tổ hợp xét tuyển (4 tổ hợp áp dụng cho mọi ngành) — ydn.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
