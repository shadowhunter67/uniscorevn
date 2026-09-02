import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { QnuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `qnu-threshold-2025`/`qnu-threshold-secondary-2025` xác nhận trực tiếp bảng điểm
 * chuẩn theo ngành và công thức ĐXT có cộng ưu tiên, nhưng GIÁ TRỊ điểm ưu tiên dùng khung quốc
 * gia (judgment call, `priority.ts`) — expected tính TAY (không gọi calculator) nên xếp Tier C,
 * có `derivation`.
 */
export const qnuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: QnuThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'qnu-2025-exact-english-education-pass-no-priority',
    schoolId: 'qnu',
    methodId: 'qnu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'qnu-threshold-2025',
    sourceNote: 'Điểm chuẩn Sư phạm Tiếng Anh (7140231) = 23,59/30, tổ hợp D01 duy nhất đã xác minh.',
    derivation: `
      Tổ hợp D01 (Toán 8,0 + Văn 8,0 + Anh 7,6) = 23,60/30 (tổng thô) >= 23,59 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 23,60/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 8, english: 7.6 } } },
      context: { fieldCode: '7140231', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 23.6, finalScore30: 23.6 },
  },
  {
    id: 'qnu-2025-exact-history-education-fail',
    schoolId: 'qnu',
    methodId: 'qnu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'qnu-threshold-2025',
    sourceNote: 'Điểm chuẩn Sư phạm Lịch sử (7140218) = 27,21/30, ngành cao nhất trong 10 ngành đã mô hình hoá.',
    derivation: `
      Tổ hợp C03 (Văn 8,5 + Toán 8,5 + Sử 8,5) = 25,50/30 (tổng thô) < 27,21 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 25,50/30.
    `,
    input: {
      profile: { thpt: { scores: { literature: 8.5, math: 8.5, history: 8.5 } } },
      context: { fieldCode: '7140218', subjectContext: { combinationId: 'C03', subjects: ['literature', 'math', 'history'] } },
    },
    expected: { eligible: false, raw30: 25.5, finalScore30: 25.5 },
  },
  {
    id: 'qnu-2025-exact-physics-education-priority-reduction',
    schoolId: 'qnu',
    methodId: 'qnu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'qnu-threshold-2025',
    sourceNote: 'Điểm chuẩn Sư phạm Vật lý (7140211) = 24,40/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp A00 (Toán 7,75 + Lý 7,75 + Hóa 8,0) = 23,50/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 23,50 >= 22,5 -> CÓ giảm: ĐUT = [(30-23,50)/7,5] x 0,75 = 0,65.
      Tổng = 23,50 + 0,65 = 24,15/30 < 24,40 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 7.75, physics: 7.75, chemistry: 8 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7140211', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, raw30: 23.5, finalScore30: 24.15 },
  },
];
