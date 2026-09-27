import type { SourcedRule } from '../../core/evidence';

export const vnuisExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm ưu tiên khu vực/đối tượng (Điểm cộng thành tích KHÔNG mô hình hoá). Nguồn chính thức công bố nguyên văn: "Điểm xét tuyển = Tổng điểm 03 môn + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)".',
  evidence: [
    {
      sourceId: 'vnuis-notice-2026',
      location: 'Trường Quốc tế - Đại học Quốc gia Hà Nội — Thông tin tuyển sinh đại học năm 2026 (is.vnu.edu.vn), mục 3 "Xác định điểm xét tuyển" và mục 4 "Điểm cộng, điểm ưu tiên".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-27',
    },
  ],
} satisfies SourcedRule<string>;

export const vnuisFieldThresholdEvidence = {
  ruleId: 'vnuis-field-threshold-2026',
  evidence: [
    {
      sourceId: 'vnuis-cutoff-vnu-2026',
      location: 'Đại học Quốc gia Hà Nội — Điểm chuẩn (điểm trúng tuyển) đại học chính quy năm 2026, mục 10 "Trường Quốc tế" (vnu.edu.vn, đăng 09/08/2026).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-27',
    },
    {
      sourceId: 'vnuis-notice-2026',
      location: 'Trường Quốc tế - Đại học Quốc gia Hà Nội — Thông tin tuyển sinh đại học năm 2026, Bảng 4 "Tổ hợp xét tuyển vào Trường Quốc tế năm 2026" (tổ hợp môn theo từng chương trình).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-27',
    },
  ],
};
