/** TUU 2026 — điểm chuẩn thật theo ngành (ảnh thông báo chính chủ chữ ký + con dấu) + công thức
 * ĐXT = tổng 3 môn + điểm ưu tiên (điểm ưu tiên dùng judgment call khung quốc gia, xem
 * `priority.ts`). */
export const tuuThptExamExactEvidence = {
  ruleId: 'tuu-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'tuu-cutoff-2026',
      location: 'Bảng "Điểm Trúng tuyển theo phương thức" — cột "Kết quả thi tốt nghiệp THPT" theo mã ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
    {
      sourceId: 'tuu-admission-info-2026',
      location:
        'Phương thức thi TN THPT (mã 100), mục "Điều kiện xét tuyển": tổng điểm 3 môn theo tổ hợp xét tuyển, đạt tối thiểu 15,00/30. Công thức "ĐXT = M1+M2+M3+Điểm cộng+Điểm ưu tiên" trích từ mục phương thức chị em (học bạ/ĐGNL) trong cùng đề án.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};
