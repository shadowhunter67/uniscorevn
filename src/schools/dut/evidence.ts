import type { SourcedRule } from '../../core/evidence';

export const dutExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Bảng "Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026" (ts.udn.vn) ghi rõ "(1) Điểm chuẩn của tất cả các ngành, chuyên ngành quy về thang điểm 30"; mọi dòng DUT trong bảng ghi phương thức "Xét điểm thi THPT" (không phải phương thức kết hợp).',
  evidence: [
    {
      sourceId: 'dut-cutoff-2026',
      location: 'Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026 (ts.udn.vn), mục I "TRƯỜNG ĐẠI HỌC BÁCH KHOA".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
} satisfies SourcedRule<string>;

export const dutFieldThresholdEvidence = {
  ruleId: 'dut-field-threshold-2026',
  evidence: [
    {
      sourceId: 'dut-cutoff-2026',
      location: 'Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026 — bảng đầy đủ 49 ngành/chuyên ngành DUT, đọc text HTML trực tiếp.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
