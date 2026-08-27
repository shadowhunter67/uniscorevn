export const hueeduExactProgramThresholdEvidence = {
  ruleId: 'hueedu-exact-program-threshold-2026',
  evidence: [
    {
      sourceId: 'hueedu-hueu-threshold-appendix-2026',
      location:
        'Phụ lục 1, mục VI. TRƯỜNG ĐẠI HỌC SƯ PHẠM - Mã trường DHS: Tâm lý học giáo dục (7310403) 16,00/30; Hệ thống thông tin (7480104) 16,00/30. Khu vực 3, tổng 3 môn thang 30, không tính điểm cộng (Ghi chú 1). Hai ngành này không thuộc khối đào tạo giáo viên nên không áp Ghi chú 2 (Điều 9 Thông tư 06/2026/TT-BGDĐT)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const hueeduFormulaEvidence = {
  ruleId: 'hueedu-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'hueedu-hueuni-ttts-2026',
      location:
        'Phần Phương thức xét tuyển, mục 2 (Xét tuyển sử dụng kết quả thi tốt nghiệp THPT): "Điểm xét tuyển = (M1×H1 + M2×H2 + M3×H3)/(H1+H2+H3) × 3 + Điểm cộng + Điểm ưu tiên"; tổ hợp 2 ngành trong phạm vi không nhân hệ số; làm tròn 2 chữ số thập phân, thang 30',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const hueeduPriorityEvidence = {
  ruleId: 'hueedu-priority-2026',
  evidence: [
    {
      sourceId: 'hueedu-hueuni-ttts-2026',
      location:
        'Mục V.2.a (Điểm ưu tiên) + Bảng 1: KV1 0,75 / KV2-NT 0,50 / KV2 0,25 / KV3 0; Đối tượng 01-04 = 2,0; Đối tượng 05-07 = 1,0; công thức giảm [(30 − Tổng điểm)/7,50] × Mức khi tổng ≥ 22,5',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
