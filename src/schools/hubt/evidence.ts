export const hubtThptExamThresholdEvidence = {
  ruleId: 'hubt-thpt-exam-threshold-2026',
  evidence: [
    { sourceId: 'hubt-admission-portal-2026', location: 'Trang tuyển sinh chính thức HUBT 2026', verification: 'verified' as const, effectiveYear: 2026 },
  ],
};

/** HUBT 2026 — nhánh exact, trích nguyên văn `hubt.edu.vn/tuyen-sinh` (mục "1. Xét tuyển bằng điểm
 * thi tốt nghiệp THPT 2026"): "Điểm xét tuyển = Tổng điểm 3 môn tổ hợp + Điểm ưu tiên + Điểm cộng
 * ... Đối với đa số ngành học, ngưỡng đảm bảo chất lượng đầu vào từ 15 điểm trở lên." */
export const hubtThptExamExactFormulaEvidence = {
  ruleId: 'hubt-thpt-exam-exact-formula-2026',
  evidence: [
    {
      sourceId: 'hubt-admission-portal-2026',
      location:
        '"Điểm xét tuyển = Tổng điểm 3 môn tổ hợp + Điểm ưu tiên + Điểm cộng. Đối với đa số ngành học, ngưỡng đảm bảo chất lượng đầu vào từ 15 điểm trở lên." — áp dụng ngành đại trà, trừ nhóm sức khoẻ (Y khoa/Dược/Răng-Hàm-Mặt/Điều dưỡng, điều kiện học lực + ngưỡng riêng).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
