import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HdiuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `hdiu-admission-info-2025` xác nhận trực tiếp công thức (tổng thô, làm tròn 0,25,
 * + điểm ưu tiên) và `hdiu-threshold-2025` công bố ngưỡng theo ngành (Tier B ingredient,
 * `thresholds.ts`), nhưng điểm ưu tiên dùng GIÁ TRỊ bảng theo khung quốc gia (judgment call,
 * `priority.ts`) — expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const hdiuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HdiuThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'hdiu-2025-exact-nursing-threshold-fail-with-priority',
    schoolId: 'hdiu',
    methodId: 'hdiu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hdiu-threshold-2025',
    sourceNote: 'Ngành Điều dưỡng, ngưỡng 17,00/30 (đã gồm điểm ưu tiên).',
    derivation: `
      Tổ hợp D07 (Toán 5 + Hóa 5 + Anh 5) = 15,00/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75 (15,00 < 22,5 -> không giảm).
      Tổng = 15,00 + 0,75 = 15,75/30 < 17,00 -> chưa đạt ngưỡng.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, chemistry: 5, english: 5 } }, priority: { region: 'KV1' } },
      context: { fieldId: 'nursing', subjectContext: { combinationId: 'D07', subjects: ['math', 'chemistry', 'english'] } },
    },
    expected: { eligible: false, raw30: 15, finalScore30: 15.75 },
  },
  {
    id: 'hdiu-2025-exact-accounting-threshold-pass-no-priority',
    schoolId: 'hdiu',
    methodId: 'hdiu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hdiu-threshold-2025',
    sourceNote: 'Ngành Kế toán, ngưỡng 14,00/30 (nhóm ngành khác).',
    derivation: `
      Tổ hợp D01 (Toán 5 + Văn 4 + Anh 5,5) = 14,50/30 (tổng thô, đã tròn 0,25) >= 14,00 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 14,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, literature: 4, english: 5.5 } } },
      context: { fieldId: 'accounting', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 14.5, finalScore30: 14.5 },
  },
  {
    id: 'hdiu-2025-exact-law-economics-priority-reduction',
    schoolId: 'hdiu',
    methodId: 'hdiu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'hdiu-threshold-2025',
    sourceNote: 'Ngành Luật kinh tế, ngưỡng 18,00/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 8 + Văn 8 + Anh 8) = 24,00/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 24,00 >= 22,5 -> giảm: ĐUT = ((30-24)/7,5) × 0,75 = 0,6.
      Tổng = 24,00 + 0,6 = 24,60/30 >= 18,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 8, english: 8 } }, priority: { region: 'KV1' } },
      context: { fieldId: 'law-economics', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 24, finalScore30: 24.6 },
  },
];
