import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { TvuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `tvu-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành và việc ĐÃ
 * CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call, `priority.ts`) —
 * expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const tvuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: TvuThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'tvu-2025-exact-nursing-pass-no-priority',
    schoolId: 'tvu',
    methodId: 'tvu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'tvu-threshold-2025',
    sourceNote: 'Điểm chuẩn Điều dưỡng (7720301) = 17,25/30, tổ hợp B08 (Toán/Sinh/Anh) trong danh sách công bố.',
    derivation: `
      Tổ hợp B08 (Toán 6,0 + Sinh 6,0 + Anh 5,75) = 17,75/30 (tổng thô) >= 17,25 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 17,75/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, biology: 6, english: 5.75 } } },
      context: { fieldCode: '7720301', subjectContext: { combinationId: 'B08', subjects: ['math', 'biology', 'english'] } },
    },
    expected: { eligible: true, raw30: 17.75, finalScore30: 17.75 },
  },
  {
    id: 'tvu-2025-exact-medicine-fail',
    schoolId: 'tvu',
    methodId: 'tvu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'tvu-threshold-2025',
    sourceNote: 'Điểm chuẩn Y khoa (7720101) = 21,25/30.',
    derivation: `
      Tổ hợp B00 (Toán 6,5 + Hóa 6,5 + Sinh 6,5) = 19,50/30 (tổng thô) < 21,25 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 19,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 6.5, chemistry: 6.5, biology: 6.5 } } },
      context: { fieldCode: '7720101', subjectContext: { combinationId: 'B00', subjects: ['math', 'chemistry', 'biology'] } },
    },
    expected: { eligible: false, raw30: 19.5, finalScore30: 19.5 },
  },
  {
    id: 'tvu-2025-exact-pharmacy-priority-reduction',
    schoolId: 'tvu',
    methodId: 'tvu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'tvu-threshold-2025',
    sourceNote: 'Điểm chuẩn Dược học (7720201) = 19,00/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp A00 (Toán 6,25 + Lý 6,0 + Hóa 6,25) = 18,50/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 18,50 < 22,5 -> KHÔNG giảm: ĐUT = 0,75.
      Tổng = 18,50 + 0,75 = 19,25/30 >= 19,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 6.25, physics: 6, chemistry: 6.25 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7720201', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 18.5, finalScore30: 19.25 },
  },
];
