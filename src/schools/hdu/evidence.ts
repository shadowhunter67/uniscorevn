export const hduThptExamThresholdEvidence = {
  ruleId: 'hdu-thpt-exam-threshold-2026',
  evidence: [
    { sourceId: 'hdu-admission-2026', location: 'Ngưỡng ngành Luật/Luật Kinh tế, thông tin tuyển sinh 2026', verification: 'verified' as const, effectiveYear: 2026 },
  ],
};

export const hduLawThresholdEvidence = {
  ruleId: 'hdu-law-threshold-2026',
  evidence: [
    {
      sourceId: 'hdu-admission-2026',
      location:
        'Mục 6.1: "Riêng ngành Luật, Luật kinh tế có tổng điểm trung bình chung 3 môn thuộc tổ hợp xét tuyển đạt từ 18.0 điểm trở lên (không bao gồm điểm ưu tiên và khu vực) và điểm thi môn Ngữ văn đạt 6.0 điểm trở lên"',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const hduFormulaEvidence = {
  ruleId: 'hdu-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'hdu-admission-2026',
      location:
        'Mục 7.5.b: "Tổng điểm thí sinh đạt được = Tổng điểm thi (A) + Điểm khuyến khích (B)" (kẹp trần 30); nếu (A+B) > 22,5: ĐƯT(C) = [(30 − A − B)/7,5] × (ĐUT KV + ĐUT ĐT); Điểm xét tuyển = Tổng điểm thí sinh đạt được + ĐƯT(C). Worked example: A=25,25, B=3 → ĐXT=28,60',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const hduPriorityEvidence = {
  ruleId: 'hdu-priority-2026',
  evidence: [
    {
      sourceId: 'hdu-admission-2026',
      location: 'Mục 7.1: "Điểm ưu tiên khu vực, đối tượng: Thực hiện theo quy định của Bộ GDĐT" — bảng mức KV/ĐT theo Điều 7 Thông tư 06/2026/TT-BGDĐT (worked example dùng KV2-NT 0,5 + ĐT06 1,0)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
