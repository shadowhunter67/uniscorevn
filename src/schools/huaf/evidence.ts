export const huafTranscriptThresholdEvidence = {
  ruleId: 'huaf-transcript-thpt-corequisite-threshold-2026',
  evidence: [
    {
      sourceId: 'huaf-official-admission-info-2026',
      location: 'Mục 3.3 Phương thức 3 - Xét tuyển sử dụng kết quả học tập cấp THPT',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const huafThptProgramThresholdEvidence = {
  ruleId: 'huaf-thpt-program-threshold-2026',
  evidence: [
    {
      sourceId: 'huaf-hueu-threshold-appendix-2026',
      location:
        'Phụ lục 1, mục IV. TRƯỜNG ĐẠI HỌC NÔNG LÂM - Mã trường DHL: 19 mã ngành xét điểm thi TN THPT, ngưỡng 15,00/30 (13 ngành), 16,00/30 (CN kỹ thuật cơ khí, CN thực phẩm, Chăn nuôi), 17,00/30 (Kỹ thuật cơ điện tử, Thú y). Khu vực 3, không tính điểm cộng (Ghi chú 1)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const huafFormulaEvidence = {
  ruleId: 'huaf-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'huaf-hueuni-ttts-2026',
      location:
        'Phần Phương thức xét tuyển, mục 2 (Xét tuyển sử dụng kết quả thi tốt nghiệp THPT, "áp dụng cho tất cả các ngành đào tạo của Đại học Huế"): "Điểm xét tuyển = (M1×H1 + M2×H2 + M3×H3)/(H1+H2+H3) × 3 + Điểm cộng + Điểm ưu tiên"; tổ hợp DHL không nhân hệ số (H=1); làm tròn 2 chữ số thập phân, thang 30',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const huafPriorityEvidence = {
  ruleId: 'huaf-priority-2026',
  evidence: [
    {
      sourceId: 'huaf-hueuni-ttts-2026',
      location:
        'Mục V.2.a (Điểm ưu tiên) + Bảng 1: KV1 0,75 / KV2-NT 0,50 / KV2 0,25 / KV3 0; Đối tượng 01-04 = 2,0; Đối tượng 05-07 = 1,0; công thức giảm [(30 − Tổng điểm)/7,50] × Mức khi tổng ≥ 22,5',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
