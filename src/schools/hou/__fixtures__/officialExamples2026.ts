import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HouThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `hou-threshold-2026` công bố ngưỡng theo ngành (Tier B ingredient, `thresholds.ts`)
 * và xác nhận trực tiếp công thức (tổng thô + điểm ưu tiên), nhưng điểm ưu tiên dùng GIÁ TRỊ bảng
 * theo khung quốc gia (judgment call, `priority.ts`) — expected tính TAY (không gọi calculator)
 * nên xếp Tier C, có `derivation`.
 */
export const houThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HouThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'hou-2026-exact-it-threshold-pass-with-priority',
    schoolId: 'hou',
    methodId: 'hou-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'hou-threshold-2026',
    sourceNote: 'Ngành Công nghệ thông tin, ngưỡng 19,00/30 (đã gồm điểm ưu tiên).',
    derivation: `
      Tổ hợp A00 (Toán 6 + Vật lí 6 + Hóa 6) = 18,00/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75 (18,00 < 22,5 -> không giảm).
      Tổng = 18,00 + 0,75 = 18,75/30 < 19,00 -> chưa đạt ngưỡng.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } }, priority: { region: 'KV1' } },
      context: { fieldId: 'information-technology', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, raw30: 18, finalScore30: 18.75 },
  },
  {
    id: 'hou-2026-exact-accounting-threshold-pass-no-priority',
    schoolId: 'hou',
    methodId: 'hou-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'hou-threshold-2026',
    sourceNote: 'Ngành Kế toán, ngưỡng 18,50/30.',
    derivation: `
      Tổ hợp D01 (Toán 7 + Văn 6 + Anh 6) = 19,00/30 (tổng thô) >= 18,50 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 19,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, literature: 6, english: 6 } } },
      context: { fieldId: 'accounting', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 19, finalScore30: 19 },
  },
  {
    id: 'hou-2026-exact-law-priority-reduction',
    schoolId: 'hou',
    methodId: 'hou-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'hou-threshold-2026',
    sourceNote: 'Ngành Luật, ngưỡng 20,00/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 8 + Văn 8 + Anh 8) = 24,00/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 24,00 >= 22,5 -> giảm: ĐUT = ((30-24)/7,5) × 0,75 = 0,6.
      Tổng = 24,00 + 0,6 = 24,60/30 >= 20,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 8, english: 8 } }, priority: { region: 'KV1' } },
      context: { fieldId: 'law', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 24, finalScore30: 24.6 },
  },
];
