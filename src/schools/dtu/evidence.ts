/** DTU 2026 — công thức Điểm xét tuyển phương thức thi TN THPT, trích nguyên văn trang tuyển sinh
 * chính thức duytan.edu.vn, mục V.1.a: "Đối với các ngành chung: Điểm Xét tuyển = Điểm thi môn 1
 * + Điểm thi môn 2 + Điểm thi môn 3 + Điểm cộng + Điểm ưu tiên (theo khu vực và đối tượng)". Mục
 * V.1.b: ngưỡng 15,00/30 áp dụng mọi ngành trừ lĩnh vực pháp luật/sức khỏe (điều kiện riêng, ngoài
 * phạm vi) và Kiến trúc/Thanh nhạc (năng khiếu, ngoài phạm vi). */
export const dtuThptExamFormulaEvidence = {
  ruleId: 'dtu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'dtu-admission-info-2026',
      location:
        'Mục V.1.a — "Đối với các ngành chung: Điểm Xét tuyển = Điểm thi môn 1 + Điểm thi môn 2 + Điểm thi môn 3 + Điểm cộng + Điểm ưu tiên (theo khu vực và đối tượng)". Mục V.1.b — "tổng điểm 03 môn thi... đạt tối thiểu 15,00 điểm theo thang điểm 30" (mọi ngành trừ lĩnh vực pháp luật/sức khỏe, có điều kiện riêng).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
