import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HumpThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `hump-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành và việc ĐÃ
 * CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call, `priority.ts`) —
 * expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const humpThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HumpThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'hump-2025-exact-nursing-pass-no-priority',
    schoolId: 'hump',
    methodId: 'hump-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hump-threshold-2025',
    sourceNote: 'Điểm chuẩn Điều dưỡng (7720301) = 17,00/30, mức sàn thấp nhất trường (chung với 4 ngành khác).',
    derivation: `
      Tổ hợp B00 (Toán 6 + Hóa 5,5 + Sinh 5,5) = 17,00/30 (tổng thô) >= 17,00 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 17,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, chemistry: 5.5, biology: 5.5 } } },
      context: { fieldCode: '7720301', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, raw30: 17, finalScore30: 17 },
  },
  {
    id: 'hump-2025-exact-medicine-fail',
    schoolId: 'hump',
    methodId: 'hump-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hump-threshold-2025',
    sourceNote: 'Điểm chuẩn Y khoa (7720101) = 25,17/30, ngành cao nhất trường.',
    derivation: `
      Tổ hợp B00 (Toán 8,5 + Hóa 8,5 + Sinh 8,5) = 25,50/30 (tổng thô) >= 25,17 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.5, chemistry: 8.5, biology: 8.5 } } },
      context: { fieldCode: '7720101', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, raw30: 25.5, finalScore30: 25.5 },
  },
  {
    id: 'hump-2025-exact-pharmacy-priority-reduction',
    schoolId: 'hump',
    methodId: 'hump-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'hump-threshold-2025',
    sourceNote: 'Điểm chuẩn Dược học (7720201) = 21,25/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp A00 (Toán 8 + Lý 7,7 + Hóa 8) = 23,70/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 23,70 >= 22,5 -> CÓ giảm: ĐUT = [(30-23,70)/7,5] x 0,75 = 0,63.
      Tổng = 23,70 + 0,63 = 24,33/30 >= 21,25 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, physics: 7.7, chemistry: 8 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7720201', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 23.7, finalScore30: 24.33 },
  },
];
