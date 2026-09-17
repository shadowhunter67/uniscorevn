/** TKS 2026 — điểm chuẩn trúng tuyển thật (Thông báo 283/TB-T2-ĐT), "đã bao gồm điểm ưu tiên", và
 * bảng độ lệch tổ hợp (Phụ lục II, Thông báo 254/TB-T2-ĐT) để quy đổi tổ hợp bất kỳ về D01. */
export const tksThptExamFormulaEvidence = {
  ruleId: 'tks-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'tks-cutoff-notice-2026',
      location: 'Điểm chuẩn trúng tuyển (đã bao gồm điểm ưu tiên): Luật 23,40 (Trụ sở chính) / 22,80 (Phân hiệu TP.HCM), Luật kinh tế 23,90, Ngôn ngữ Anh 21,50.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-17',
    },
    {
      sourceId: 'tks-conversion-table-2026',
      location: 'Phụ lục II — Độ chênh lệch tổ hợp so với D01: A00 +1,45; C01/C02/C03/C04 +0,8; D15 −0,88; A01/D07/D09/D14 = 0.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-17',
    },
  ],
};
