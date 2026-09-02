import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HunreThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `hunre-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành và việc ĐÃ
 * CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call, `priority.ts`) —
 * expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const hunreThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HunreThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'hunre-2025-exact-water-resources-pass-no-priority',
    schoolId: 'hunre',
    methodId: 'hunre-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hunre-threshold-2025',
    sourceNote: 'Điểm chuẩn Quản lý tài nguyên nước (7850198) = 15,00/30, mức sàn thấp nhất trường (chung với 8 ngành khác).',
    derivation: `
      Tổ hợp D01 (Toán 5 + Văn 5 + Anh 5) = 15,00/30 (tổng thô) >= 15,00 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 15,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, literature: 5, english: 5 } } },
      context: { fieldCode: '7850198', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 15, finalScore30: 15 },
  },
  {
    id: 'hunre-2025-exact-marketing-fail',
    schoolId: 'hunre',
    methodId: 'hunre-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hunre-threshold-2025',
    sourceNote: 'Điểm chuẩn Marketing (7340115) = 26,65/30, ngành cao nhất trường.',
    derivation: `
      Tổ hợp D01 (Toán 8,5 + Văn 8,5 + Anh 8,5) = 25,50/30 (tổng thô) < 26,65 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 25,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.5, literature: 8.5, english: 8.5 } } },
      context: { fieldCode: '7340115', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, raw30: 25.5, finalScore30: 25.5 },
  },
  {
    id: 'hunre-2025-exact-it-priority-reduction',
    schoolId: 'hunre',
    methodId: 'hunre-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'hunre-threshold-2025',
    sourceNote: 'Điểm chuẩn Công nghệ thông tin (7480201) = 24,35/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 8 + Văn 7,8 + Anh 8) = 23,80/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 23,80 >= 22,5 -> CÓ giảm: ĐUT = [(30-23,80)/7,5] x 0,75 = 0,62.
      Tổng = 23,80 + 0,62 = 24,42/30 >= 24,35 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 7.8, english: 8 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7480201', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 23.8, finalScore30: 24.42 },
  },
];
