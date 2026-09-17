/** QUI 2026 — ngưỡng đảm bảo chất lượng đầu vào phương thức thi TN THPT, bảng đầy đủ 12 mã ngành,
 * cột "Theo kết quả điểm thi tốt nghiệp THPT 2026" = 15 đồng nhất. */
export const quiThptExamThresholdEvidence = {
  ruleId: 'qui-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'qui-threshold-notice-2026',
      location: 'Mục 1 (Ngưỡng đảm bảo chất lượng đầu vào), bảng 12 mã ngành — cột "Theo kết quả điểm thi tốt nghiệp THPT 2026" = 15/30 đồng nhất.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-17',
    },
  ],
};
