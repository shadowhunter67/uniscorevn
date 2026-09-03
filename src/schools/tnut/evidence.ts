import type { SourcedRule } from '../../core/evidence';

export const tnutExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức xét kết quả thi TN THPT 2025) = tổng thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng (khung quốc gia hiện hành). Nguồn chính thức "Hướng dẫn xét tuyển Đại học năm 2025" (tnut.edu.vn) mục 1.2.1 xác nhận công thức và "Điểm trúng tuyển giữa các tổ hợp là tương đương nhau" (đồng thời tương đương giữa các phương thức, mục 1.2.3) — điểm trúng tuyển chính thức (`tnut-threshold-2025`) đã bao gồm điểm ưu tiên.',
  evidence: [
    {
      sourceId: 'tnut-huongdan-2025',
      location: 'Hướng dẫn xét tuyển Đại học năm 2025, mục I.1.2.1 (Theo điểm thi tốt nghiệp THPT năm 2025) — tnut.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const tnutFieldThresholdEvidence = {
  ruleId: 'tnut-field-threshold-2025',
  evidence: [
    {
      sourceId: 'tnut-threshold-2025',
      location: 'Thông báo 818/TB-ĐHKTCN (22/8/2025), bảng "Điểm trúng tuyển đại học chính quy năm 2025 (đợt 1)" — tnut.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'tnut-nganh-chitieu-2025',
      location: '"Ngành và chỉ tiêu tuyển sinh năm 2025" — bảng tên ngành/mã ngành/mã xét tuyển và đoạn liệt kê tổ hợp theo ngành (tnut.edu.vn).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
