export const vinhuniThptExamThresholdEvidence = {
  ruleId: 'vinhuni-thpt-exam-threshold-2026',
  evidence: [{ sourceId: 'vinhuni-quality-threshold-conversion-2026', location: 'Ngưỡng đầu vào/điểm sàn thi TN THPT 2026', verification: 'verified' as const, effectiveYear: 2026 }],
};

export const vinhuniProgramThresholdEvidence = {
  ruleId: 'vinhuni-program-threshold-2026',
  evidence: [
    {
      sourceId: 'vinhuni-quality-threshold-conversion-2026',
      location:
        'Phụ lục 1 (nguongdbcl2026.pdf) — bảng ngưỡng đảm bảo chất lượng đầu vào Phương thức 100 theo từng mã ngành xét tuyển (thang 30): nhóm đào tạo giáo viên 21-23; nhóm ngoài giáo viên 15-20 tùy ngành',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const vinhuniFormulaEvidence = {
  ruleId: 'vinhuni-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'vinhuni-quality-threshold-conversion-2026',
      location:
        'Mục I.1: "Điểm xét tuyển = [Điểm thi + Điểm thưởng (nếu có)] + Điểm ưu tiên (nếu có)"; điểm các môn không nhân hệ số; làm tròn 2 chữ số thập phân. Điều kiện đăng ký: tổng 3 môn (đã gồm điểm ưu tiên) đạt ngưỡng và không có môn nào ≤ 1,0',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const vinhuniPriorityEvidence = {
  ruleId: 'vinhuni-priority-2026',
  evidence: [
    {
      sourceId: 'vinhuni-quality-threshold-conversion-2026',
      location:
        'Mục I.1: "Điểm ưu tiên (nếu có)" theo quy định — bảng mức KV/ĐT và công thức giảm ≥ 22,5 áp theo Điều 7 Thông tư 06/2026/TT-BGDĐT',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
