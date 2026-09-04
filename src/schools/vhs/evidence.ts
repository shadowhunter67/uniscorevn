import type { SourcedRule } from '../../core/evidence';

export const vhsExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (mã phương thức 100 — xét kết quả thi TN THPT 2026, thang 30, không hệ số) = tổng điểm 3 bài thi/môn thi theo thang điểm 10 của tổ hợp xét tuyển + điểm ưu tiên đối tượng/khu vực (bảng mức + công thức giảm TỰ CÔNG BỐ của trường), làm tròn đến 2 chữ số thập phân.',
  evidence: [
    {
      sourceId: 'vhs-admission-scheme-2026',
      location: 'Thông báo 34/TB-ĐHVHHCM (04/02/2026) — mục 3 "Quy tắc quy đổi tương đương ngưỡng đầu vào và điểm trúng tuyển" (trang 2).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'vhs-priority-2026',
      location: 'Thông báo 34/TB-ĐHVHHCM (04/02/2026) — mục 7.1 "Chính sách ưu tiên theo đối tượng và ưu tiên theo khu vực" (trang 10-11).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
} satisfies SourcedRule<string>;

export const vhsFieldThresholdEvidence = {
  ruleId: 'vhs-field-threshold-2026',
  evidence: [
    {
      sourceId: 'vhs-threshold-2026',
      location: 'Thông báo 207/TB-ĐHVHHCM (10/8/2026) — "Về việc công nhận điểm trúng tuyển trình độ đại học hệ chính quy Đợt 1 năm 2026", ký tên + đóng dấu Hiệu trưởng Lâm Nhân.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'vhs-admission-scheme-2026',
      location: 'Thông báo 34/TB-ĐHVHHCM — mục 4 (trang 3-8), bảng Mã ngành / Tổ hợp xét tuyển.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
};
