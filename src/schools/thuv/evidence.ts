/** THUV 2026 — công thức ĐXT phương thức 2 (thi TN THPT), trích nguyên văn Quyết định
 * 260306/001/QĐ-THUV mục 2.2: "Điểm xét tuyển (ĐXT) = Đ1 + Đ2 + Đ3 + ƯT + KK". Điểm chuẩn trúng
 * tuyển 18,0/30 đồng nhất 4 ngành, trích Thông báo 260809/001/TB-THUV (09/8/2026). */
export const thuvThptExamFormulaEvidence = {
  ruleId: 'thuv-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'thuv-admission-info-2026',
      location: 'Mục 2.2 — "Điểm xét tuyển (ĐXT) = Đ1 + Đ2 + Đ3 + ƯT + KK"; bảng ngành/tổ hợp mục 2.2.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
    {
      sourceId: 'thuv-cutoff-notice-2026',
      location: 'Bảng điểm chuẩn trúng tuyển — Phương thức "Xét điểm thi tốt nghiệp THPT 2026" = 18,0/30, đồng nhất 4 ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
