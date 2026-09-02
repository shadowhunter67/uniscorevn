import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HucThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `huc-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành + tổ hợp và
 * việc ĐÃ CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call, `priority.ts`)
 * — expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const hucThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HucThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'huc-2025-exact-tour-guide-pass-no-priority',
    schoolId: 'huc',
    methodId: 'huc-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'huc-threshold-2025',
    sourceNote: 'Điểm chuẩn Hướng dẫn du lịch quốc tế (7810101C), tổ hợp D01 = 22,80/30, ngành thấp nhất trường.',
    derivation: `
      Tổ hợp D01 (Toán 7,5 + Văn 7,7 + Anh 7,6) = 22,80/30 (tổng thô) >= 22,80 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 22,80/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7.5, literature: 7.7, english: 7.6 } } },
      context: { fieldCode: '7810101C', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 22.8, finalScore30: 22.8 },
  },
  {
    id: 'huc-2025-exact-event-organization-fail',
    schoolId: 'huc',
    methodId: 'huc-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'huc-threshold-2025',
    sourceNote: 'Điểm chuẩn Tổ chức sự kiện văn hóa (7229042D), tổ hợp C00 = 27,55/30, mức cao nhất trường.',
    derivation: `
      Tổ hợp C00 (Văn 8 + Sử 8 + Địa 8) = 24,00/30 (tổng thô) < 27,55 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 24,00/30.
    `,
    input: {
      profile: { thpt: { scores: { literature: 8, history: 8, geography: 8 } } },
      context: { fieldCode: '7229042D', subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] } },
    },
    expected: { eligible: false, raw30: 24, finalScore30: 24 },
  },
  {
    id: 'huc-2025-exact-law-priority-reduction',
    schoolId: 'huc',
    methodId: 'huc-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'huc-threshold-2025',
    sourceNote: 'Điểm chuẩn Luật (7380101), tổ hợp D01 = 24,81/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 8 + Văn 8,1 + Anh 8) = 24,10/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 24,10 >= 22,5 -> CÓ giảm: ĐUT = [(30-24,10)/7,5] x 0,75 = 0,59.
      Tổng = 24,10 + 0,59 = 24,69/30 < 24,81 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 8.1, english: 8 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7380101', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, raw30: 24.1, finalScore30: 24.69 },
  },
];
