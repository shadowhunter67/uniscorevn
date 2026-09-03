import type { SourcedRule } from '../../core/evidence';

export const naemExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức xét kết quả thi TN THPT 2025, mã phương thức 100) = tổng thô 3 môn theo tổ hợp (thang 30, không hệ số) + Điểm ưu tiên khu vực/đối tượng, làm tròn 2 chữ số thập phân. Nguồn chính thức "Xét tuyển sử dụng kết quả thi tốt nghiệp THPT (Phương thức 100)" (naem.edu.vn): "Điểm xét tuyển (làm tròn đến 2 chữ số thập phân) = M1 + M2 + M3 + Điểm ưu tiên (nếu có)" và công thức giảm dần "Điểm ưu tiên = [(30 - Tổng điểm đạt được)/7,5] x Mức điểm ưu tiên" — không có bảng điểm cộng/khuyến khích riêng.',
  evidence: [
    {
      sourceId: 'naem-thongtin-2025',
      location: 'Thông tin tuyển sinh đại học chính quy năm 2025, bảng "Ngành đào tạo — Mã ngành — Chỉ tiêu — Tổ hợp xét tuyển" — naem.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'naem-priority-formula-2025',
      location: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT (Phương thức 100) — naem.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const naemFieldThresholdEvidence = {
  ruleId: 'naem-field-threshold-2025',
  evidence: [
    {
      sourceId: 'naem-threshold-2025',
      location: 'Thông báo Điểm trúng tuyển đại học chính quy năm 2025 vào Học viện Quản lý Giáo dục (22/8/2025) — naem.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'naem-thongtin-2025',
      location: 'Thông tin tuyển sinh đại học chính quy năm 2025, bảng ngành/mã ngành/tổ hợp xét tuyển — naem.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
