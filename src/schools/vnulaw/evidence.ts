import type { SourcedRule } from '../../core/evidence';

export const vnulawExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức 100, thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng. Bảng điểm chuẩn (Cổng TTĐT Chính phủ, đăng lại thông báo VNU-Luật) ghi rõ "Điểm trúng tuyển đã bao gồm điểm ưu tiên theo đối tượng và khu vực".',
  evidence: [
    {
      sourceId: 'vnulaw-cutoff-2026',
      location: 'Điểm chuẩn Đại học Quốc gia Hà Nội 2026 (xaydungchinhsach.chinhphu.vn, 09/8/2026), mục Trường Đại học Luật.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
} satisfies SourcedRule<string>;

export const vnulawFieldThresholdEvidence = {
  ruleId: 'vnulaw-field-threshold-2026',
  evidence: [
    {
      sourceId: 'vnulaw-cutoff-2026',
      location: 'Điểm chuẩn Đại học Quốc gia Hà Nội 2026 — 3/3 ngành VNU-Luật, đọc trực tiếp.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
