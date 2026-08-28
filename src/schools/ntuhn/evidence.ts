/** NTU-HN 2026 — điểm sàn phương thức thi TN THPT, trích nguyên văn Thông báo 29/06/2026: 15/30,
 * đồng nhất cả 11 ngành. Công thức ĐXT = tổng thô 3 môn + điểm ưu tiên là judgment call (thông
 * báo không in công thức tường minh), theo Điều 7 TT 06/2026 — cùng tiền lệ `schools/ctu`. */
export const ntuhnThptExamFormulaEvidence = {
  ruleId: 'ntuhn-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'ntuhn-threshold-notice-2026',
      location: 'Bảng mục 1 — điểm sàn phương thức "Phương thức điểm thi" = 15 (thang 30), đồng nhất cho cả 11 ngành đào tạo.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
