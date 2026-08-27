export const huscThptThresholdEvidence = {
  ruleId: 'husc-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'husc-threshold-2026',
      location: 'Thông báo 42/TB-HĐTSĐH ngày 10/07/2026 - Ngưỡng đảm bảo chất lượng đầu vào',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const huscExactProgramThresholdEvidence = {
  ruleId: 'husc-exact-program-threshold-2026',
  evidence: [
    {
      sourceId: 'husc-hueu-threshold-appendix-2026',
      location:
        'Phụ lục 1, mục VII. TRƯỜNG ĐẠI HỌC KHOA HỌC - Mã trường DHT: 26 mã ngành xét bằng điểm thi TN THPT đều ở mức 15,00/30 (không nhân hệ số, khu vực 3, không tính điểm cộng - Ghi chú 1); loại trừ 7440102SC / 7510302IC (22,75 + nhóm 20% Toán) và 7580101 Kiến trúc (thi năng khiếu)',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const huscFormulaEvidence = {
  ruleId: 'husc-thpt-formula-2026',
  evidence: [
    {
      sourceId: 'husc-hueuni-ttts-2026',
      location:
        'Phần Phương thức xét tuyển, mục 2 (Xét tuyển sử dụng kết quả thi tốt nghiệp THPT): "Điểm xét tuyển = (M1×H1 + M2×H2 + M3×H3)/(H1+H2+H3) × 3 + Điểm cộng + Điểm ưu tiên"; tổ hợp DHT không nhân hệ số (H=1); làm tròn 2 chữ số thập phân, thang 30',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};

export const huscPriorityEvidence = {
  ruleId: 'husc-priority-2026',
  evidence: [
    {
      sourceId: 'husc-hueuni-ttts-2026',
      location:
        'Mục V.2.a (Điểm ưu tiên) + Bảng 1 (Bảng điểm ưu tiên, thang 30): KV1 0,75 / KV2-NT 0,50 / KV2 0,25 / KV3 0; Đối tượng 01-04 = 2,0; Đối tượng 05-07 = 1,0; công thức giảm [(30 − Tổng điểm)/7,50] × Mức khi tổng ≥ 22,5',
      verification: 'verified' as const,
      effectiveYear: 2026,
    },
  ],
};
