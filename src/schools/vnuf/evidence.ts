/** VNUF 2026 — nguồn xét tuyển đầu vào áp dụng cho MỌI phương thức: tổng 3 môn thi TN THPT theo
 * tổ hợp ≥ 15,00/30 (không tính ưu tiên/điểm cộng); điểm trúng tuyển (điểm chuẩn) thực tế công bố
 * 13/8/2026 xác nhận đúng bằng 15,00 cho toàn bộ mã ngành có cột "Điểm thi tốt nghiệp THPT". */
export const vnufThptExamExactEvidence = {
  ruleId: 'vnuf-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'vnuf-threshold-2026',
      location:
        'Mục I (Nguồn xét tuyển đầu vào): "tổng điểm 03 môn thi tốt nghiệp THPT theo tổ hợp xét tuyển của ngành... đạt tối thiểu 15,00 điểm theo thang điểm 30 (không tính điểm ưu tiên, điểm cộng)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
    {
      sourceId: 'vnuf-cutoff-2026',
      location: 'Bảng điểm trúng tuyển (điểm chuẩn) đợt 1 — cột "Điểm thi tốt nghiệp THPT" = 15,00 đồng nhất, cả 3 cơ sở đào tạo.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};
