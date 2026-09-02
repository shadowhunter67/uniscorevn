import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { VnuedThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `vnued-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành + tổ hợp và
 * việc ĐÃ CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call,
 * `priority.ts`) — expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const vnuedThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: VnuedThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'vnued-2025-exact-biology-pass-no-priority',
    schoolId: 'vnued',
    methodId: 'vnued-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnued-threshold-2025',
    sourceNote: 'Điểm chuẩn Sư phạm Sinh học (7140213) = 25,37/30, tổ hợp B08 (Toán/Sinh/Anh) nằm trong danh sách công bố.',
    derivation: `
      Tổ hợp B08 (Toán 8,5 + Sinh 8,5 + Anh 8,5) = 25,50/30 (tổng thô) >= 25,37 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 25,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.5, biology: 8.5, english: 8.5 } } },
      context: { fieldCode: '7140213', subjectContext: { combinationId: 'B08', subjects: ['math', 'biology', 'english'] } },
    },
    expected: { eligible: true, raw30: 25.5, finalScore30: 25.5 },
  },
  {
    id: 'vnued-2025-exact-history-geography-fail',
    schoolId: 'vnued',
    methodId: 'vnued-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnued-threshold-2025',
    sourceNote: 'Điểm chuẩn Sư phạm Lịch sử - Địa lý (7140249) = 29,84/30, ngành cao nhất trường.',
    derivation: `
      Tổ hợp A07 (Toán 8,5 + Sử 8,5 + Địa 8,5) = 25,50/30 (tổng thô) < 29,84 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 25,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.5, history: 8.5, geography: 8.5 } } },
      context: { fieldCode: '7140249', subjectContext: { combinationId: 'A07', subjects: ['math', 'history', 'geography'] } },
    },
    expected: { eligible: false, raw30: 25.5, finalScore30: 25.5 },
  },
  {
    id: 'vnued-2025-exact-primary-education-priority-reduction',
    schoolId: 'vnued',
    methodId: 'vnued-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'vnued-threshold-2025',
    sourceNote: 'Điểm chuẩn Giáo dục Tiểu học (7140202) = 28,60/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 9,5 + Văn 9,25 + Anh 9,25) = 28,00/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 28,00 >= 22,5 -> CÓ giảm: ĐUT = [(30-28,00)/7,5] x 0,75 = 0,20.
      Tổng = 28,00 + 0,20 = 28,20/30 < 28,60 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9.5, literature: 9.25, english: 9.25 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7140202', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, raw30: 28, finalScore30: 28.2 },
  },
];
