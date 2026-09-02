import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HpmuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `hpmu-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành và việc ĐÃ
 * CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call, `priority.ts`) —
 * expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const hpmuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HpmuThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'hpmu-2025-exact-preventive-medicine-pass-no-priority',
    schoolId: 'hpmu',
    methodId: 'hpmu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hpmu-threshold-2025',
    sourceNote: 'Điểm chuẩn Y học dự phòng (7720110) = 19,35/30.',
    derivation: `
      Tổ hợp B00 (Toán 6,75 + Hóa 6,5 + Sinh 6,25) = 19,50/30 (tổng thô) >= 19,35 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 19,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 6.75, chemistry: 6.5, biology: 6.25 } } },
      context: { fieldCode: '7720110', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: true, raw30: 19.5, finalScore30: 19.5 },
  },
  {
    id: 'hpmu-2025-exact-medicine-fail',
    schoolId: 'hpmu',
    methodId: 'hpmu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hpmu-threshold-2025',
    sourceNote: 'Điểm chuẩn Y khoa (7720101) = 25,33/30.',
    derivation: `
      Tổ hợp B00 (Toán 8,0 + Hóa 8,0 + Sinh 8,0) = 24,00/30 (tổng thô) < 25,33 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 24,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, chemistry: 8, biology: 8 } } },
      context: { fieldCode: '7720101', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: false, raw30: 24, finalScore30: 24 },
  },
  {
    id: 'hpmu-2025-exact-nursing-priority-reduction',
    schoolId: 'hpmu',
    methodId: 'hpmu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'hpmu-threshold-2025',
    sourceNote: 'Điểm chuẩn Điều dưỡng (7720301) = 22,22/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D08 (Toán 7,5 + Sinh 7,25 + Anh 7,25) = 22,00/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 22,00 < 22,5 -> KHÔNG giảm: ĐUT = 0,75.
      Tổng = 22,00 + 0,75 = 22,75/30 >= 22,22 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 7.5, biology: 7.25, english: 7.25 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7720301', subjectContext: { combinationId: 'D08', subjects: ['math', 'biology', 'english'] } },
    },
    expected: { eligible: true, raw30: 22, finalScore30: 22.75 },
  },
];
