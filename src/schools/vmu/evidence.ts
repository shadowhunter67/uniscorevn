export const vmuThptExamThresholdEvidence = {
  ruleId: 'vmu-thpt-exam-threshold-2026',
  evidence: [
    { sourceId: 'vmu-admission-2026', location: 'Ngưỡng đảm bảo chất lượng đầu vào PT1 2026 theo khối ngành', verification: 'verified' as const, effectiveYear: 2026 },
  ],
};

export const vmuFormulaEvidence = {
  ruleId: 'vmu-pt1-formula-2026',
  evidence: [
    {
      sourceId: 'vmu-admission-2026',
      location:
        'Thông báo 1329/TB-ĐHHHVN ngày 04/6/2026, mục 2.2.1 (Phương thức 1): "Điểm xét tuyển (ĐXT) = Tổng điểm các môn thi trong tổ hợp xét tuyển + điểm ưu tiên (nếu có)" — tổng thô 3 môn, không hệ số, không điểm cộng',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const vmuBaselineThresholdEvidence = {
  ruleId: 'vmu-pt1-baseline-threshold-2026',
  evidence: [
    {
      sourceId: 'vmu-admission-2026',
      location:
        'Thông báo 1329/TB-ĐHHHVN, mục 2.1: "Có tổng điểm 03 môn thi ... theo tổ hợp xét tuyển ... đạt tối thiểu 15,00 điểm theo thang điểm 30" — ngưỡng sàn chung cho mọi phương thức/ngành',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const vmuPriorityEvidence = {
  ruleId: 'vmu-priority-2026',
  evidence: [
    {
      sourceId: 'vmu-admission-2026',
      location:
        'Thông báo 1329/TB-ĐHHHVN: PT1 "+ điểm ưu tiên (nếu có)" theo quy chế tuyển sinh hiện hành của Bộ GDĐT (Thông tư 06/2026/TT-BGDĐT) — bảng mức KV/ĐT và công thức giảm ≥ 22,5 áp theo Điều 7 quy chế',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
