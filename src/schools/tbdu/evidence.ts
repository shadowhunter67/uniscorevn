/** TBDU 2026 — điểm sàn phương thức thi TN THPT (nhóm ngành thường), trích nguyên văn trang chính
 * thức (xem `sources.ts:tbdu-admission-info-2026`): "ngưỡng chung 15,0/30 (tổng 3 môn thi TN THPT
 * theo tổ hợp xét tuyển)" — nguồn im lặng về việc ngưỡng đã gồm điểm ưu tiên hay chưa, khác với
 * ngành Luật/Luật kinh tế (điều kiện (a) "đã gồm ưu tiên" ≥20,0/30, ngoài phạm vi nhánh exact này —
 * xem `knowledgeGaps.ts:tbdu-law-group-conditions-not-modeled`). */
export const tbduThptExamExactThresholdEvidence = {
  ruleId: 'tbdu-thpt-exam-exact-threshold-2026',
  evidence: [
    {
      sourceId: 'tbdu-admission-info-2026',
      location: 'Ngưỡng chung phương thức thi TN THPT 2026 (nhóm ngành thường): tổng 3 môn ≥ 15,0/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
