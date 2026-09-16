import type { SourcedRule } from '../../core/evidence';

export const dueudnExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026, chương trình "ST - Tiêu chuẩn") = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Bảng "Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026" (ts.udn.vn) ghi rõ "(1) Điểm chuẩn của tất cả các ngành, chuyên ngành quy về thang điểm 30"; các mã "ST" của DUE ghi phương thức "Xét điểm thi THPT" (không phải phương thức kết hợp Học bạ + Tiếng Anh của các mã PR/GB/EL).',
  evidence: [
    {
      sourceId: 'dueudn-cutoff-2026',
      location: 'Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026 (ts.udn.vn), mục II "TRƯỜNG ĐẠI HỌC KINH TẾ", các mã "ST".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
} satisfies SourcedRule<string>;

export const dueudnFieldThresholdEvidence = {
  ruleId: 'dueudn-field-threshold-2026',
  evidence: [
    {
      sourceId: 'dueudn-cutoff-2026',
      location: 'Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026 — 19/36 mã xét tuyển DUE (chương trình ST - Tiêu chuẩn), đọc text HTML trực tiếp.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
