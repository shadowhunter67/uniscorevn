import type { SourcedRule } from '../../core/evidence';

export const vaaExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (Phương thức 1, thi TN THPT 2026) = (Điểm môn thứ nhất x 3 + Điểm môn thứ hai x 2 + Điểm môn thứ ba) / 2 + Điểm cộng + Điểm ưu tiên, thang 30, làm tròn 2 chữ số thập phân; môn thứ nhất/hai/ba theo nhóm mã THXT của ngành (TA01/TA02/DT01/DT02).',
  evidence: [
    {
      sourceId: 'vaa-notice-2026',
      location: 'Học viện Hàng không Việt Nam — Thông tin tuyển sinh đại học chính quy năm 2026, mục 2.2.1 (công thức PT1), 2.4 (điểm ưu tiên) và 4.1 (nhóm mã tổ hợp xét tuyển).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
  ],
} satisfies SourcedRule<string>;

export const vaaFieldThresholdEvidence = {
  ruleId: 'vaa-field-threshold-2026',
  evidence: [
    {
      sourceId: 'vaa-cutoff-2026',
      location: 'Học viện Hàng không Việt Nam — Điểm trúng tuyển đại học chính quy 2026, cột "THPT (thang 30)" theo mã xét tuyển (đăng 09/08/2026).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
    {
      sourceId: 'vaa-notice-2026',
      location: 'Học viện Hàng không Việt Nam — Thông tin tuyển sinh đại học chính quy năm 2026, mục 4.2 (nhóm THXT từng mã xét tuyển).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
  ],
};
