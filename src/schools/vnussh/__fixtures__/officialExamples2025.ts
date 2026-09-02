import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { VnusshThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `vnussh-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn theo ngành + tổ hợp và
 * việc ĐÃ CỘNG ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc gia (judgment call, `priority.ts`)
 * — expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const vnusshThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: VnusshThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'vnussh-2025-exact-japan-studies-pass-no-priority',
    schoolId: 'vnussh',
    methodId: 'vnussh-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnussh-threshold-2025',
    sourceNote: 'Điểm chuẩn Nhật Bản học (QHX14), tổ hợp D01 = 21,75/30, ngành thấp nhất trường.',
    derivation: `
      Tổ hợp D01 (Toán 7,5 + Văn 7,5 + Anh 7) = 22,00/30 (tổng thô) >= 21,75 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 22,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7.5, literature: 7.5, english: 7 } } },
      context: { fieldCode: 'QHX14', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 22, finalScore30: 22 },
  },
  {
    id: 'vnussh-2025-exact-psychology-fail',
    schoolId: 'vnussh',
    methodId: 'vnussh-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'vnussh-threshold-2025',
    sourceNote: 'Điểm chuẩn Tâm lý học (QHX21), tổ hợp C00 = 29,00/30, mức cao nhất trường.',
    derivation: `
      Tổ hợp C00 (Văn 8,5 + Sử 8,5 + Địa 8,5) = 25,50/30 (tổng thô) < 29,00 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 25,50/30.
    `,
    input: {
      profile: { thpt: { scores: { literature: 8.5, history: 8.5, geography: 8.5 } } },
      context: { fieldCode: 'QHX21', subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] } },
    },
    expected: { eligible: false, raw30: 25.5, finalScore30: 25.5 },
  },
  {
    id: 'vnussh-2025-exact-history-priority-reduction',
    schoolId: 'vnussh',
    methodId: 'vnussh-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'vnussh-threshold-2025',
    sourceNote: 'Điểm chuẩn Lịch sử (QHX10), tổ hợp D01 = 25,80/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 8,5 + Văn 8,5 + Anh 8,5) = 25,50/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 25,50 >= 22,5 -> CÓ giảm: ĐUT = [(30-25,50)/7,5] x 0,75 = 0,45.
      Tổng = 25,50 + 0,45 = 25,95/30 >= 25,80 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.5, literature: 8.5, english: 8.5 } }, priority: { region: 'KV1' } },
      context: { fieldCode: 'QHX10', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 25.5, finalScore30: 25.95 },
  },
];
