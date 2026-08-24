import type { SourcedRule } from '../../core/evidence';

/** Ngưỡng đầu vào theo phương thức thi TN THPT (thang 30, điểm thô — không cần quy đổi). */
export const eiuThptExamThresholdEvidence = {
  value: 15,
  evidence: [
    {
      sourceId: 'eiu-admission-scheme-2026',
      location:
        '"Điều kiện chung: Thí sinh có tổng điểm 03 môn thi kỳ thi tốt nghiệp THPT năm 2026 theo tổ hợp xét tuyển đạt tối thiểu 15,00 điểm theo thang điểm 30."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-24',
    },
  ],
} satisfies SourcedRule<number>;

/** Ngưỡng đầu vào theo phương thức học bạ (thang 30 — điểm trung bình chung 6 học kỳ lớp 10/11/12
 * của 3 môn tổ hợp). */
export const eiuTranscriptThresholdEvidence = {
  value: 18,
  evidence: [
    {
      sourceId: 'eiu-admission-scheme-2026',
      location:
        '"Điều kiện chung: Thí sinh có tổng điểm trung bình chung học bạ 6 kỳ (lớp 10, 11 và 12) của 3 môn học theo tổ hợp xét tuyển đạt tối thiểu 18,00 điểm theo thang điểm 30."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-24',
    },
  ],
} satisfies SourcedRule<number>;

/** Ngưỡng đầu vào theo phương thức ĐGNL ĐHQG-HCM (thang 1200, điểm thô — khớp trực tiếp
 * `ApplicantProfile.exams.vact.total`). */
export const eiuVactThresholdEvidence = {
  value: 600,
  evidence: [
    {
      sourceId: 'eiu-admission-scheme-2026',
      location:
        '"Điều kiện chung: Thí sinh có điểm thi ĐGNL ĐHQG-HCM năm 2026 đạt tối thiểu 600 điểm theo thang điểm 1200."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-24',
    },
  ],
} satisfies SourcedRule<number>;

/** Điều kiện kết hợp riêng cho thí sinh tốt nghiệp THPT 2026 dùng phương thức học bạ/ĐGNL. */
export const eiu2026GraduateCombinedConditionEvidence = {
  value: 15,
  evidence: [
    {
      sourceId: 'eiu-admission-scheme-2026',
      location:
        '"Đối với thí sinh tốt nghiệp từ năm 2026, thí sinh phải có tổng điểm 03 môn thi kỳ thi tốt nghiệp THPT theo tổ hợp xét tuyển (hoặc sử dụng điểm thi môn Toán, Văn và một môn khác) đạt tối thiểu 15,00 điểm theo thang điểm 30" (câu giống nhau ở cả phương thức học bạ và ĐGNL ĐHQG-HCM).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-24',
    },
  ],
} satisfies SourcedRule<number>;
