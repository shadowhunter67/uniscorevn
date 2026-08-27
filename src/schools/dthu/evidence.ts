/** DThU 2026 — công thức Ngưỡng đầu vào (NĐV) phương thức thi TN THPT (PT100), trích nguyên văn
 * Thông báo điểm sàn 09/07/2026 mục 1.3: NĐV = tổng thô 3 môn tổ hợp + điểm ưu tiên (KV + đối
 * tượng), làm tròn 2 chữ số. Điểm ưu tiên theo Điều 7 Thông tư 06/2026/TT-BGDĐT + công thức giảm
 * ≥ 22,5 (nguyên văn). */
export const dthuThptExamFormulaEvidence = {
  ruleId: 'dthu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'dthu-quality-threshold-2026',
      location:
        'Mục 1.3 — "NĐV = (Điểm môn 1 + Điểm môn 2 + Điểm Môn 3) + điểm ưu tiên (KV + đối tượng)", làm tròn đến hai chữ số thập phân. "Điểm ưu tiên = [(30 – Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên quy định tại khoản 1, 2 Điều 7 của Thông tư 06/2026/TT-BGDĐT".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-27',
    },
  ],
};

/** Ngưỡng đầu vào theo nhóm ngành (mục 1.1/1.2), thí sinh KV3, so với NĐV (đã gồm điểm ưu tiên). */
export const dthuThptExamThresholdEvidence = {
  ruleId: 'dthu-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'dthu-quality-threshold-2026',
      location:
        'Mục 1.1 — đào tạo giáo viên trình độ đại học: 20,0/30. Mục 1.2 — ngành không sư phạm: NĐV ≥ 15,0/30; lĩnh vực pháp luật: 20,0/30. (Đều KV3, tất cả tổ hợp, không tính điểm cộng.)',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-27',
    },
  ],
};
