import type { SourcedRule } from '../../core/evidence';

export const ctuetExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức xét kết quả thi TN THPT 2025, mã xét tuyển 100) = (Điểm thi TN THPT môn 1 + môn 2 + môn 3 theo tổ hợp) + Điểm ưu tiên khu vực/đối tượng + điểm cộng (thành tích đặc biệt, mặc định 0 — không có bảng cụ thể). Nguồn chính thức "Thông tin tuyển sinh năm 2025" (ctuet.edu.vn) trích nguyên văn mục 3.2.1: "Điểm xét tuyển = (Điểm thi TN THPT môn 1 + Điểm thi TN THPT môn 2 + Điểm thi TN THPT môn 3) + Điểm ưu tiên + điểm cộng". Quy chế tuyển sinh (Quyết định 396/QĐ-ĐHKTCN) Điều 2.7/2.9 xác nhận điểm dùng để so với điểm trúng tuyển đã tính cả điểm ưu tiên; Điều 7.5 + Phụ lục II/III công bố công thức và mức điểm ưu tiên cụ thể.',
  evidence: [
    {
      sourceId: 'ctuet-thongtin-2025',
      location: 'Thông tin tuyển sinh năm 2025, mục 3.2.1 (Điểm xét tuyển theo Phương thức 1) — ctuet.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'ctuet-quyche-2025',
      location: 'Quy chế tuyển sinh đại học (Quyết định 396/QĐ-ĐHKTCN, 29/4/2025), Điều 2.7, 2.9, 7.5, Phụ lục II, Phụ lục III — ctuet.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const ctuetFieldThresholdEvidence = {
  ruleId: 'ctuet-field-threshold-2025',
  evidence: [
    {
      sourceId: 'ctuet-threshold-2025',
      location: 'Thông báo 79/TB-ĐHKTCN (22/8/2025), bảng "Điểm trúng tuyển đại học chính quy năm 2025" cột "KQ thi TN THPT" — tuyensinh.ctuet.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'ctuet-thongtin-2025',
      location: 'Thông tin tuyển sinh năm 2025, mục 4.2 (Chỉ tiêu tuyển sinh — mã ngành, tổ hợp xét tuyển) — ctuet.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
