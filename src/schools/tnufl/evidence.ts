import type { SourcedRule } from '../../core/evidence';

export const tnuflExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (nhánh xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Bài đăng hệ thống Đại học Thái Nguyên (tnu.edu.vn) trình bày điểm chuẩn thang 30 không hệ số cho phương thức xét kết quả thi TN THPT.',
  evidence: [
    {
      sourceId: 'tnufl-cutoff-2026',
      location: 'Trường Ngoại ngữ - Đại học Thái Nguyên công bố điểm chuẩn trúng tuyển đại học năm 2026 (tnu.edu.vn).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
} satisfies SourcedRule<string>;

export const tnuflFieldThresholdEvidence = {
  ruleId: 'tnufl-field-threshold-2026',
  evidence: [
    {
      sourceId: 'tnufl-cutoff-2026',
      location: 'Trường Ngoại ngữ - Đại học Thái Nguyên công bố điểm chuẩn trúng tuyển đại học năm 2026 — 5 ngành, đọc text prose trực tiếp.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
