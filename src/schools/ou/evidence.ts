export const ouThptExamThresholdEvidence = {
  ruleId: 'ou-thpt-exam-threshold-2026',
  evidence: [{ sourceId: 'ou-quality-threshold-2026', location: 'Ngưỡng đầu vào/điểm sàn thi TN THPT 2026', verification: 'verified' as const, effectiveYear: 2026 }],
};

/** OU 2026 — nhánh exact, trích nguyên văn Phụ lục "Ngưỡng đảm bảo chất lượng đầu vào..." (phương
 * thức thi TN THPT), phạm vi 37 mã chương trình chuẩn. */
export const ouThptExamExactThresholdEvidence = {
  ruleId: 'ou-thpt-exam-exact-threshold-2026',
  evidence: [
    {
      sourceId: 'ou-quality-threshold-2026',
      location:
        'Phụ lục: "Ngưỡng bảo đảm chất lượng đầu vào được xác định như sau: Tổng điểm 3 bài thi/môn thi theo thang điểm 30, không nhân hệ số, không tính cộng điểm cộng, điểm ưu tiên." — bảng 37 mã chương trình chuẩn, ngưỡng 15,00-17,00/30 tùy mã.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
