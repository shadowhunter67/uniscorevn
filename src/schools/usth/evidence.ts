/** USTH 2026 — công thức (Quyết định 171/QĐ-ĐHKHCN, trang 8: "Điểm xét tuyển bằng tổng điểm 3 môn
 * trong tổ hợp xét tuyển... và điểm ưu tiên, điểm khuyến khích (nếu có)") + bảng điểm chuẩn thật
 * theo mã ngành, phương thức 100 (thi TN THPT), `sources.ts`. */
export const usthThptExamExactEvidence = {
  ruleId: 'usth-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'usth-scheme-2026',
      location: 'Trang 8, mục 2.4 (Phương thức 4): "Điểm xét tuyển bằng tổng điểm 3 môn trong tổ hợp xét tuyển theo quy định của từng ngành đào tạo và điểm ưu tiên, điểm khuyến khích (nếu có)", thang 30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
    {
      sourceId: 'usth-cutoff-2026',
      location: 'Bảng điểm chuẩn 2026 theo mã ngành, phương thức xét tuyển dựa trên kết quả thi tốt nghiệp THPT (thang 30).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};
