export const humgThptExamThresholdEvidence = {
  ruleId: 'humg-thpt-exam-threshold-2026',
  evidence: [
    { sourceId: 'humg-admission-2026', location: 'Thông báo ngưỡng điểm xét tuyển đợt 1 hệ đại học 2026, mục 7106', verification: 'verified' as const, effectiveYear: 2026 },
  ],
};

export const humgProgramThresholdEvidence = {
  ruleId: 'humg-program-threshold-2026',
  evidence: [
    {
      sourceId: 'humg-admission-2026',
      location:
        'Thông báo ngưỡng đợt 1 năm 2026, Bảng 1 "Ngưỡng đảm bảo chất lượng đầu vào theo phương thức xét kết quả thi THPT" — cột "Điểm nhận hồ sơ" (thang 30) cho toàn bộ 53 mã xét tuyển',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const humgFormulaEvidence = {
  ruleId: 'humg-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'humg-admission-2026',
      location:
        'Thông báo ngưỡng đợt 1 năm 2026, "Ghi chú: Công thức tính điểm xét" — "Điểm Xét = Min[(Môn 1 + Môn 2 + Môn 3) + Điểm Cộng, 30] + Điểm ưu tiên"',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const humgPriorityEvidence = {
  ruleId: 'humg-priority-2026',
  evidence: [
    {
      sourceId: 'humg-admission-2026',
      location:
        'Thông báo ngưỡng đợt 1 năm 2026 — "Điểm ưu tiên (tổng điểm đạt được theo tổ hợp ≥ 22.5) = [(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên; Mức điểm ưu tiên gồm: Khu vực, Đối tượng chính sách ưu tiên" (bảng mức KV/ĐT áp theo Điều 7 Thông tư 08/2022/TT-BGDĐT)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const humgBonusEvidence = {
  ruleId: 'humg-bonus-2026',
  evidence: [
    {
      sourceId: 'humg-admission-2026',
      location:
        'Thông báo ngưỡng đợt 1 năm 2026, mục 3 "Hướng dẫn cộng điểm thưởng, điểm xét thưởng, điểm khuyến khích" (Quyết định số 674/QĐ-MĐC ngày 10/4/2026): giải HSG QG nhất/nhì/ba 3,0/2,5/2,0; KHKT QG nhất/nhì/ba 1,5/1,0/0,5; HSG tỉnh nhất/nhì/ba 1,5/1,0/0,5; chứng chỉ ngoại ngữ bậc 6/5/4 tối đa 1,50/1,25/1,00; SAT/ACT/A-Level ≤ 1,50',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
