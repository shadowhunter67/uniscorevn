import type { SourcedRule } from '../../core/evidence';

export const vnuhsbExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (Phương thức 100, thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng (nếu có). Nguồn chính thức công bố nguyên văn: "Điểm thi tốt nghiệp THPT là tổng điểm 3 môn thuộc tổ hợp xét tuyển (đã cộng điểm ưu tiên theo khu vực và đối tượng nếu có)".',
  evidence: [
    {
      sourceId: 'vnuhsb-notice-2026',
      location: 'Trường Quản trị và Kinh doanh - ĐHQGHN (HSB) — Thông tin tuyển sinh Đại học năm 2026 (hsb.edu.vn), mục Phương thức 100.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-28',
    },
  ],
} satisfies SourcedRule<string>;

export const vnuhsbFieldThresholdEvidence = {
  ruleId: 'vnuhsb-field-threshold-2026',
  evidence: [
    {
      sourceId: 'vnuhsb-cutoff-vnu-2026',
      location: 'Đại học Quốc gia Hà Nội — Điểm chuẩn (điểm trúng tuyển) đại học chính quy năm 2026, mục 11 "Trường Quản trị và Kinh doanh" (vnu.edu.vn, đăng 09/08/2026).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-28',
    },
    {
      sourceId: 'vnuhsb-notice-2026',
      location: 'Trường Quản trị và Kinh doanh - ĐHQGHN (HSB) — Thông tin tuyển sinh Đại học năm 2026, mục "Tổ hợp xét tuyển theo ngành đào tạo".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-28',
    },
  ],
};
