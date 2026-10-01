import type { SourcedRule } from '../../core/evidence';

export const vnuvjuExactFormulaEvidence = {
  value:
    'Điểm xét (Phương thức 100, thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp (thang 30, không hệ số, không chênh lệch giữa các tổ hợp) + điểm ưu tiên khu vực/đối tượng (nếu có). Nguồn chính thức công bố nguyên văn: "Theo phương thức xét tuyển kết quả thi tốt nghiệp THPT năm 2026, không có độ chênh lệch điểm chuẩn giữa các tổ hợp".',
  evidence: [
    {
      sourceId: 'vnuvju-notice-2026',
      location: 'Trường Đại học Việt Nhật - ĐHQGHN — Thông tin tuyển sinh đại học chính quy năm 2026, mục 2.2 (Phương thức 100), 3.3.2 (điểm ưu tiên) và 3.3.3 (độ chênh lệch điểm chuẩn giữa các tổ hợp).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
  ],
} satisfies SourcedRule<string>;

export const vnuvjuFieldThresholdEvidence = {
  ruleId: 'vnuvju-field-threshold-2026',
  evidence: [
    {
      sourceId: 'vnuvju-cutoff-vnu-2026',
      location: 'Đại học Quốc gia Hà Nội — Điểm chuẩn (điểm trúng tuyển) đại học chính quy năm 2026, mục "Trường Đại học Việt Nhật" (vnu.edu.vn, đăng 09/08/2026).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
    {
      sourceId: 'vnuvju-notice-2026',
      location: 'Trường Đại học Việt Nhật - ĐHQGHN — Thông tin tuyển sinh đại học chính quy năm 2026, mục 3.5 "Tổ hợp môn xét tuyển theo phương thức xét kết quả thi tốt nghiệp THPT năm 2026".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
  ],
};
