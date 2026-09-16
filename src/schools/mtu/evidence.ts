/** MTU 2026 — điều kiện điểm PT1 (thi TN THPT): "tổng điểm 03 môn thi... đạt tối thiểu 15,00 điểm
 * theo thang điểm 30". Công thức ĐXT (PDF "Phương thức tuyển sinh năm 2026"): "Điểm xét tuyển =
 * Điểm thi THPT môn 1 + Điểm thi THPT môn 2 + Điểm thi THPT môn 3 + Điểm ưu tiên (nếu có) + Điểm
 * cộng (nếu có)". */
export const mtuThptExamThresholdEvidence = {
  ruleId: 'mtu-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'mtu-admission-info-2026',
      location:
        '"Thí sinh có tổng điểm 03 môn thi kỳ thi tốt nghiệp THPT... đạt tối thiểu 15,00 điểm theo thang điểm 30"; công thức PT1 — "Điểm xét tuyển = Điểm thi THPT môn 1 + Điểm thi THPT môn 2 + Điểm thi THPT môn 3 + Điểm ưu tiên (nếu có) + Điểm cộng (nếu có)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-16',
    },
  ],
};
