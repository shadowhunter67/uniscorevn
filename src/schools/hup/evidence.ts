export const hupThptExamThresholdEvidence = {
  ruleId: 'hup-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'hup-threshold-notice-2026',
      location: 'Thông báo Ngưỡng đầu vào và quy đổi tương đương điểm trúng tuyển 2026, mục PT4 — Dược học 22,00 / Hoá dược 20,00 / Hoá học 19,00 / CNSH 19,00 (khu vực 3, không cộng điểm)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const hupFormulaEvidence = {
  ruleId: 'hup-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'hup-admission-2026',
      location: 'Công thức PT4 — "ĐXT = M1 + M2 + M3 + ĐKK (nếu có) + ĐƯT quy đổi (nếu có)"; tổng thô 3 môn thi TN THPT, không hệ số; kẹp trần 30',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const hupBonusEvidence = {
  ruleId: 'hup-bonus-2026',
  evidence: [
    {
      sourceId: 'hup-admission-2026',
      location: 'Bảng điểm cộng khuyến khích — IELTS 5.5/6.0/6.5/7.0/7.5/≥8.0 → 0,25/0,50/0,75/1,00/1,25/1,50; giải HSG tỉnh Ba/Nhì/Nhất 0,5/1,0/1,25, QG khuyến khích 1,5; "tối đa 03 (ba) điểm cộng khuyến khích"',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const hupPriorityEvidence = {
  ruleId: 'hup-priority-2026',
  evidence: [
    {
      sourceId: 'hup-admission-2026',
      location: 'ĐƯT "được quy đổi theo quy định của Bộ GDĐT" (Điều 7 Thông tư 08/2022/TT-BGDĐT): bảng KV/ĐT + công thức giảm khi tổng ≥ 22,5',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
