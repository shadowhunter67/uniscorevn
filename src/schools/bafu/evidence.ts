/** BAFU 2026 — công thức ĐXT Phương thức 2 (thi TN THPT), trích nguyên văn "Thông tin tuyển sinh
 * năm 2026": "ĐXT = ĐM1 + ĐM2 + ĐM3 + ĐƯT". Ngưỡng đầu vào 15,0/30 ghi rõ CHƯA gồm điểm ưu tiên. */
export const bafuThptExamFormulaEvidence = {
  ruleId: 'bafu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'bafu-admission-info-2026',
      location:
        'Công thức PT2 — "ĐXT = ĐM1 + ĐM2 + ĐM3 + ĐƯT"; công thức giảm ưu tiên "ĐƯT = [(30 − tổng điểm)/7,5] × mức điểm ưu tiên" khi tổng ≥22,5/30; ngưỡng PT2 "chưa gồm điểm ưu tiên" = 15,0/30, đồng nhất 20 ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
