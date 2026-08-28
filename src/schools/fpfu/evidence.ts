export const fpfuThptExamThresholdEvidence = {
  ruleId: 'fpfu-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'fpfu-quality-threshold-2026',
      location: 'Báo Dân Trí và VietNamNet, đối chiếu độc lập cùng một con số (2026-08-11)',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
    },
  ],
};

/**
 * FPFU 2026 (hệ dân sự) — công thức Điểm xét tuyển = Môn1+Môn2+Môn3+Điểm ưu tiên (điểm ưu tiên
 * khu vực/đối tượng theo quy định của Bộ GD&ĐT, Điều 7 Thông tư 06/2026/TT-BGDĐT). Trang gốc
 * daihocpccc.bocongan.gov.vn/?p=210262 không fetch trực tiếp được (DNS bị chặn trong môi trường
 * research), nhưng nội dung được xác nhận độc lập qua 2 lượt tra cứu riêng biệt (cùng khớp chi
 * tiết cụ thể: mốc thời gian nộp hồ sơ, "trường không cộng điểm ưu tiên đối với phương thức xét
 * học bạ") — xem `fpfu-primary-source-unverified` trong knowledgeGaps.
 */
export const fpfuThptExactFormulaEvidence = {
  value: 'Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + điểm ưu tiên (nếu có, theo quy định Bộ GD&ĐT, Điều 7 TT 06/2026/TT-BGDĐT)',
  evidence: [
    {
      sourceId: 'fpfu-official-notice-2026',
      location: 'Trang tuyển sinh 2026 hệ dân sự (?p=210262) — xác nhận qua 2 lượt tra cứu độc lập, chưa fetch trực tiếp được',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-28',
    },
  ],
};
