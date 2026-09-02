import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { VnuebThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `vnueb-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành và việc ĐÃ
 * CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call, `priority.ts`) —
 * expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const vnuebThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: VnuebThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'vnueb-2025-exact-development-economics-pass-no-priority',
    schoolId: 'vnueb',
    methodId: 'vnueb-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnueb-threshold-2025',
    sourceNote: 'Điểm chuẩn Kinh tế phát triển (7310105) = 24,20/30.',
    derivation: `
      Tổ hợp A01 (Toán 8,25 + Lý 8,0 + Anh 8,0) = 24,25/30 (tổng thô) >= 24,20 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 24,25/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.25, physics: 8, english: 8 } } },
      context: { fieldCode: '7310105', subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] } },
    },
    expected: { eligible: true, raw30: 24.25, finalScore30: 24.25 },
  },
  {
    id: 'vnueb-2025-exact-international-economics-fail',
    schoolId: 'vnueb',
    methodId: 'vnueb-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnueb-threshold-2025',
    sourceNote: 'Điểm chuẩn Kinh tế quốc tế (7310106) = 25,72/30.',
    derivation: `
      Tổ hợp D01 (Toán 8,0 + Văn 8,0 + Anh 8,0) = 24,00/30 (tổng thô) < 25,72 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 24,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 8, english: 8 } } },
      context: { fieldCode: '7310106', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, raw30: 24, finalScore30: 24 },
  },
  {
    id: 'vnueb-2025-exact-accounting-priority-reduction',
    schoolId: 'vnueb',
    methodId: 'vnueb-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'vnueb-threshold-2025',
    sourceNote: 'Điểm chuẩn Kế toán (7340301) = 24,20/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 8,0 + Văn 7,75 + Anh 7,75) = 23,50/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 23,50 >= 22,5 -> CÓ giảm: ĐUT = [(30-23,50)/7,5] x 0,75 = 0,65.
      Tổng = 23,50 + 0,65 = 24,15/30 < 24,20 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 7.75, english: 7.75 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7340301', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, raw30: 23.5, finalScore30: 24.15 },
  },
];
