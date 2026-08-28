/** BDU 2026 — Điểm sàn phương thức thi TN THPT, trích nguyên văn trang chính thức
 * (`sources.ts:bdu-admission-2026`): mục 2 "ĐIỂM XÉT TUYỂN" — "Tất cả các ngành: ≥ 15 điểm"
 * (standard, nguồn im lặng về ưu tiên); Luật/Luật kinh tế và Dược học, phương thức thi TN THPT:
 * "Có tổng điểm theo tổ hợp xét tuyển đạt từ 20,0 điểm trở lên (được cộng điểm ưu tiên)". */
export const bduThptExamExactThresholdEvidence = {
  ruleId: 'bdu-thpt-exam-exact-threshold-2026',
  evidence: [
    {
      sourceId: 'bdu-admission-2026',
      location: '"Tất cả các ngành: ≥ 15 điểm" (nhóm standard).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
    {
      sourceId: 'bdu-admission-2026',
      location:
        'Luật, Luật kinh tế và Dược học — phương thức xét tuyển dựa trên kết quả kỳ thi tốt nghiệp THPT năm 2026: "Có tổng điểm theo tổ hợp xét tuyển đạt từ 20,0 điểm trở lên (được cộng điểm ưu tiên)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
