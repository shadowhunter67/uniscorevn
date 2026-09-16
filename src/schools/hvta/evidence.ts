/** HVTA 2026 — điều kiện xét tuyển ngành Luật, thi TN THPT. Trích Thông tin tuyển sinh 2026 mục
 * II.1: điều kiện (2) "Tổng điểm xét tuyển tối thiểu đạt 60% điểm đánh giá tối đa của thang điểm.
 * Điểm môn Toán và Ngữ văn, hoặc Toán, hoặc Ngữ văn trong tổ hợp xét tuyển đạt tối thiểu là 06 điểm
 * trên thang điểm 10" (Chuẩn chương trình đào tạo lĩnh vực Pháp luật, QĐ 678/QĐ-BGDĐT); điều kiện
 * (3) tổng 3 môn thi TN THPT tối thiểu 15,00/30 — cả hai phải thỏa mãn đồng thời nên ngưỡng thực tế
 * = max(60%×30, 15,00) = 18,00/30. */
export const hvtaThptExamThresholdEvidence = {
  ruleId: 'hvta-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'hvta-admission-info-2026',
      location:
        'Mục II.1, điều kiện (2) — "Tổng điểm xét tuyển tối thiểu đạt 60% điểm đánh giá tối đa của thang điểm... Điểm môn Toán và Ngữ văn, hoặc Toán, hoặc Ngữ văn... tối thiểu 06 điểm trên thang điểm 10"; điều kiện (3) — tổng 3 môn thi TN THPT tối thiểu 15,00/30. Mục 5.d — 4 tổ hợp A00/A01/C00/D01.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
