export const utcThptExamThresholdEvidence = {
  ruleId: 'utc-thpt-exam-threshold-2026',
  evidence: [{ sourceId: 'utc-quality-threshold-2026', location: 'Ngưỡng đầu vào/điểm sàn thi TN THPT 2026', verification: 'verified' as const, effectiveYear: 2026 }],
};

export const utcFormulaEvidence = {
  ruleId: 'utc-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'utc-admission-info-2026',
      location:
        'Công thức phương thức xét thi TN THPT — "(Điểm thi môn Toán x 2 + điểm thi hai môn còn lại trong tổ hợp) x 3/4 ..." (các ngành, trừ Ngôn ngữ Anh); ngành Ngôn ngữ Anh không nhân hệ số',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const utcBonusEvidence = {
  ruleId: 'utc-bonus-2026',
  evidence: [
    {
      sourceId: 'utc-admission-info-2026',
      location: 'Bảng điểm cộng đề án UTC — giải HSG tỉnh nhất/nhì/ba = 1,00/0,75/0,50; IELTS 5.0→0,5 / 5.5→0,75 / 6.0→1,0 / 6.5→1,25 / ≥7.0→1,5',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const utcPriorityEvidence = {
  ruleId: 'utc-priority-2026',
  evidence: [
    {
      sourceId: 'utc-admission-info-2026',
      location: 'Điểm ưu tiên "theo quy chế tuyển sinh hiện hành" (Điều 7 Thông tư 08/2022/TT-BGDĐT): bảng KV/ĐT + công thức giảm khi tổng ≥ 22,5',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const utcProgramThresholdEvidence = {
  ruleId: 'utc-program-threshold-2026',
  evidence: [
    {
      sourceId: 'utc-quality-threshold-2026',
      location: 'Bảng ngưỡng đảm bảo chất lượng đầu vào theo ngành (07/7/2026) — Hà Nội 16-21/30, Phân hiệu TP.HCM 16-20/30',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
