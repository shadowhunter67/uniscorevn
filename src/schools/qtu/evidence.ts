/** QTU 2026 — công thức ĐXT phương thức thi TN THPT, trích nguyên văn đề án tuyển sinh mục 4.2:
 * "Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên (nếu có)". Ngưỡng theo
 * bảng điểm chuẩn: Điều dưỡng 18,0/30, 10 ngành còn lại 15,0/30. */
export const qtuThptExamFormulaEvidence = {
  ruleId: 'qtu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'qtu-admission-scheme-2026',
      location: 'Mục 4.2 — "Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên (nếu có)"; Mục 5 — công thức giảm ưu tiên khi tổng ≥22,5/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
    {
      sourceId: 'qtu-cutoff-notice-2026',
      location: 'Bảng điểm chuẩn phương thức "Điểm kỳ thi TN THPT 2026": Điều dưỡng 18,0/30, 10 ngành còn lại 15,0/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
