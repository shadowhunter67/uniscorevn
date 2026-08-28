/** UMT 2026 — điểm ngưỡng ĐBCLĐV phương thức PT01 (thi TN THPT), trích nguyên văn Thông báo
 * 57/2026/TB-UMT: "Điểm ngưỡng ĐBCLĐV = Điểm quy đổi thang 30 + Điểm cộng (nếu có) + Điểm ưu tiên
 * (nếu có)"; PT01 ngưỡng 15/30, đồng nhất 10 ngành. */
export const umtThptExamFormulaEvidence = {
  ruleId: 'umt-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'umt-threshold-notice-2026',
      location:
        'Mục 1 — "Điểm ngưỡng ĐBCLĐV = Điểm quy đổi thang 30 + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)". Mục 2 — bảng PT01 (thi TN THPT) = 15/30, đồng nhất cả 10 ngành đào tạo.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
