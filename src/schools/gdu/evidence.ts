export const gduThptExamThresholdEvidence = {
  ruleId: 'gdu-thpt-exam-threshold-2026',
  evidence: [
    { sourceId: 'gdu-quality-threshold-2026', location: 'Thông báo điểm sàn xét tuyển 2026, giadinh.edu.vn', verification: 'verified' as const, effectiveYear: 2026 },
  ],
};

/** Công thức điểm học lực (tổng thô 3 môn, thang 30, không hệ số) — mục 4-5 Đề án tuyển sinh 2026. */
export const gduFormulaEvidence = {
  ruleId: 'gdu-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'gdu-de-an-tuyen-sinh-2026',
      location: 'Mục 4 (Ngành/chương trình và chỉ tiêu tuyển sinh) + mục 5.1 (Điểm xét tuyển theo thang điểm 30, không tiêu chí phụ)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

/** Chính sách ưu tiên khu vực/đối tượng theo Điều 7 Quy chế tuyển sinh Bộ GDĐT — mục 7 Đề án tuyển
 * sinh 2026 (tự công bố trực tiếp mức điểm khu vực + công thức giảm điểm ưu tiên). */
export const gduPriorityEvidence = {
  ruleId: 'gdu-priority-2026',
  evidence: [
    {
      sourceId: 'gdu-de-an-tuyen-sinh-2026',
      location: 'Mục 7 (Chính sách ưu tiên chung)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
