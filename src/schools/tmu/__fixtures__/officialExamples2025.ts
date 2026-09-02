import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { TmuThptExamEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `tmu-threshold-2025` xác nhận trực tiếp công thức và ngưỡng DUY NHẤT (20/30, đã
 * gồm điểm ưu tiên), nhưng điểm ưu tiên dùng GIÁ TRỊ bảng theo khung quốc gia (judgment call,
 * `priority.ts`) — expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const tmuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: TmuThptExamEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'tmu-2025-exact-flat-threshold-pass-no-priority',
    schoolId: 'tmu',
    methodId: 'tmu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'tmu-threshold-2025',
    sourceNote: 'Ngưỡng duy nhất 20/30, mọi ngành/tổ hợp.',
    derivation: `
      Tổ hợp D01 (Toán 7 + Văn 7 + Anh 7) = 21,00/30 (tổng thô) >= 20,00 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 21,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, literature: 7, english: 7 } } },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 21, finalScore30: 21 },
  },
  {
    id: 'tmu-2025-exact-flat-threshold-fail',
    schoolId: 'tmu',
    methodId: 'tmu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'tmu-threshold-2025',
    sourceNote: 'Ngưỡng duy nhất 20/30, mọi ngành/tổ hợp.',
    derivation: `
      Tổ hợp A00 (Toán 5 + Lý 5 + Hóa 5) = 15,00/30 (tổng thô) < 20,00 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 15,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, raw30: 15, finalScore30: 15 },
  },
  {
    id: 'tmu-2025-exact-priority-reduction',
    schoolId: 'tmu',
    methodId: 'tmu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'tmu-threshold-2025',
    sourceNote: 'Ngưỡng duy nhất 20/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 8 + Văn 8 + Anh 8) = 24,00/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 24,00 >= 22,5 -> giảm: ĐUT = ((30-24)/7,5) × 0,75 = 0,6.
      Tổng = 24,00 + 0,6 = 24,60/30 >= 20,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 8, english: 8 } }, priority: { region: 'KV1' } },
      context: { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 24, finalScore30: 24.6 },
  },
];
