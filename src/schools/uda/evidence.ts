/** UDA 2026 — Điểm sàn phương thức thi TN THPT (mã 100), trích nguyên văn trang chính thức
 * (xem `sources.ts:uda-threshold-2026`): "Đối với tất cả các ngành đào tạo, trừ khối ngành Sức
 * khỏe và Pháp luật, điểm sàn xét tuyển là tổng điểm thi 3 môn tốt nghiệp THPT đạt ≥ 15 điểm,
 * KHÔNG BAO GỒM điểm ưu tiên và điểm cộng." */
export const udaThptExamExactThresholdEvidence = {
  ruleId: 'uda-thpt-exam-exact-threshold-2026',
  evidence: [
    {
      sourceId: 'uda-threshold-2026',
      location:
        '"Đối với tất cả các ngành đào tạo, trừ khối ngành Sức khỏe và Pháp luật, điểm sàn xét tuyển là tổng điểm thi 3 môn tốt nghiệp THPT đạt ≥ 15 điểm, không bao gồm điểm ưu tiên và điểm cộng."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
