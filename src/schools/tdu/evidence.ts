/** TDU 2026 — Phương thức 1 (thi TN THPT 2026), trích nguyên văn Thông báo 725/TB-ĐHTĐ (mục bảng
 * ngưỡng, cột "Phương thức 1"): 24 mã ngành ngoài Dược học/Điều dưỡng/Luật/Luật kinh tế/Luật quốc
 * tế có ngưỡng đầu vào 15,0/30. */
export const tduThptExamExactThresholdEvidence = {
  ruleId: 'tdu-thpt-exam-exact-threshold-2026',
  evidence: [
    {
      sourceId: 'tdu-quality-threshold-2026',
      location:
        'Bảng ngưỡng, cột "Phương thức 1: Xét điểm thi THPT năm 2026 (30)" — 24/29 mã ngành (ngoài Dược học, Điều dưỡng, Luật kinh tế, Luật, Luật Quốc tế) đều ghi ngưỡng 15.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
