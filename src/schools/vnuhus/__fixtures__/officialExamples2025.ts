import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { VnuhusThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `vnuhus-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành và việc ĐÃ
 * CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call, `priority.ts`) —
 * expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const vnuhusThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: VnuhusThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'vnuhus-2025-exact-biology-pass-no-priority',
    schoolId: 'vnuhus',
    methodId: 'vnuhus-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnuhus-threshold-2025',
    sourceNote: 'Điểm chuẩn Sinh học (QHT08) = 20,05/30, ngành thấp nhất trường, tổ hợp B08 (Toán/Sinh/Anh) nằm trong danh sách công bố.',
    derivation: `
      Tổ hợp B08 (Toán 7 + Sinh 6,5 + Anh 6,6) = 20,10/30 (tổng thô) >= 20,05 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 20,10/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, biology: 6.5, english: 6.6 } } },
      context: { fieldCode: 'QHT08', subjectContext: { combinationId: 'B08', subjects: ['math', 'biology', 'english'] } },
    },
    expected: { eligible: true, raw30: 20.1, finalScore30: 20.1 },
  },
  {
    id: 'vnuhus-2025-exact-data-science-fail',
    schoolId: 'vnuhus',
    methodId: 'vnuhus-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnuhus-threshold-2025',
    sourceNote: 'Điểm chuẩn Khoa học dữ liệu (QHT93) = 26,00/30, ngành cao nhất trường.',
    derivation: `
      Tổ hợp A00 (Toán 8,5 + Lý 8,5 + Hóa 8,5) = 25,50/30 (tổng thô) < 26,00 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 25,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.5, physics: 8.5, chemistry: 8.5 } } },
      context: { fieldCode: 'QHT93', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, raw30: 25.5, finalScore30: 25.5 },
  },
  {
    id: 'vnuhus-2025-exact-chemistry-priority-reduction',
    schoolId: 'vnuhus',
    methodId: 'vnuhus-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'vnuhus-threshold-2025',
    sourceNote: 'Điểm chuẩn Hoá học (QHT06) = 23,90/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp A00 (Toán 8 + Lý 7,8 + Hóa 8) = 23,80/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 23,80 >= 22,5 -> CÓ giảm: ĐUT = [(30-23,80)/7,5] x 0,75 = 0,62.
      Tổng = 23,80 + 0,62 = 24,42/30 >= 23,90 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, physics: 7.8, chemistry: 8 } }, priority: { region: 'KV1' } },
      context: { fieldCode: 'QHT06', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 23.8, finalScore30: 24.42 },
  },
];
