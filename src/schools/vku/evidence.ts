export const vkuThptExamThresholdEvidence = {
  ruleId: 'vku-thpt-exam-threshold-2026',
  evidence: [{ sourceId: 'vku-quality-threshold-2026', location: 'Ngưỡng đầu vào/điểm sàn thi TN THPT 2026', verification: 'cross-checked' as const, effectiveYear: 2026 }],
};

/** Công thức Phương thức 2 (xét tuyển kết hợp) — Mục 2.2.c của PDF thông tin tuyển sinh 2026. */
export const vkuCombinedFormulaEvidence = {
  ruleId: 'vku-combined-formula-2026',
  evidence: [
    {
      sourceId: 'vku-admission-info-2026',
      location:
        'Mục 2.2.c — "Điểm xét tuyển = Điểm học bạ * 60% + Điểm thi TN THPT* 40% + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)"; điểm học bạ = tổng 3 môn (TB cả năm lớp 10/11/12), điểm thi = tổng 3 môn, cả hai quy về thang 30; ĐXT làm tròn 2 chữ số, kẹp trần 30',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

/** Điểm cộng — Phụ lục II của PDF thông tin tuyển sinh 2026. */
export const vkuBonusEvidence = {
  ruleId: 'vku-bonus-2026',
  evidence: [
    {
      sourceId: 'vku-admission-info-2026',
      location:
        'Phụ lục II, nhóm "Điểm khuyến khích" — SAT ≥1200 / ACT ≥26 = 1,25; IELTS 5.0=0,5 / 5.5=0,75 / 6.0=1,0 / 6.5=1,25 / ≥7.0=1,5. Trần tổng điểm cộng: "không vượt quá 03 điểm theo thang điểm 30" (Mục 5.2)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

/** Điểm ưu tiên + công thức giảm — Mục 5.2.b của PDF thông tin tuyển sinh 2026. */
export const vkuPriorityEvidence = {
  ruleId: 'vku-priority-2026',
  evidence: [
    {
      sourceId: 'vku-admission-info-2026',
      location:
        'Mục 5.2.b — điểm ưu tiên theo Thông tư 06/2026/TT-BGDĐT (15/02/2026); "Điểm ưu tiên = [(30 - (Điểm quy đổi + Điểm cộng))/7,5] x Mức điểm ưu tiên theo quy định" khi tổng điểm từ 22,50 trở lên',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
