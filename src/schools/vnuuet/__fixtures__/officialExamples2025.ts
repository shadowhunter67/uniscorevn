import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { VnuuetThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `vnuuet-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành và việc ĐÃ
 * CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call, `priority.ts`) —
 * expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const vnuuetThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: VnuuetThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'vnuuet-2025-exact-agriculture-tech-pass-no-priority',
    schoolId: 'vnuuet',
    methodId: 'vnuuet-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnuuet-threshold-2025',
    sourceNote: 'Điểm chuẩn Công nghệ nông nghiệp (CN10) = 22,00/30, ngành thấp nhất trường, tổ hợp B00 nằm trong danh sách công bố.',
    derivation: `
      Tổ hợp B00 (Toán 7,5 + Hóa 7,5 + Sinh 7,5) = 22,50/30 (tổng thô) >= 22,00 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 22,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7.5, chemistry: 7.5, biology: 7.5 } } },
      context: { fieldCode: 'CN10', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, raw30: 22.5, finalScore30: 22.5 },
  },
  {
    id: 'vnuuet-2025-exact-cntt-fail',
    schoolId: 'vnuuet',
    methodId: 'vnuuet-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnuuet-threshold-2025',
    sourceNote: 'Điểm chuẩn Công nghệ thông tin (CN1) = 28,19/30, ngành cao nhất trường.',
    derivation: `
      Tổ hợp A00 (Toán 8,5 + Lý 8,5 + Hóa 8,5) = 25,50/30 (tổng thô) < 28,19 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 25,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.5, physics: 8.5, chemistry: 8.5 } } },
      context: { fieldCode: 'CN1', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, raw30: 25.5, finalScore30: 25.5 },
  },
  {
    id: 'vnuuet-2025-exact-computer-science-priority-reduction',
    schoolId: 'vnuuet',
    methodId: 'vnuuet-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'vnuuet-threshold-2025',
    sourceNote: 'Điểm chuẩn Khoa học máy tính (CN8) = 27,86/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 9,5 + Văn 9,25 + Anh 9,25) = 28,00/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 28,00 >= 22,5 -> CÓ giảm: ĐUT = [(30-28,00)/7,5] x 0,75 = 0,20.
      Tổng = 28,00 + 0,20 = 28,20/30 >= 27,86 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9.5, literature: 9.25, english: 9.25 } }, priority: { region: 'KV1' } },
      context: { fieldCode: 'CN8', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 28, finalScore30: 28.2 },
  },
];
