import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { QnamuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `qnamu-threshold-2025`/`qnamu-threshold-secondary-2025` xác nhận trực tiếp bảng
 * điểm chuẩn theo ngành x tổ hợp, và `qnamu-formula-2025` xác nhận trực tiếp công thức ĐXT + công
 * thức giảm dần điểm ưu tiên (khớp khung quốc gia), nhưng GIÁ TRỊ điểm ưu tiên CƠ BẢN theo KV/ĐT
 * dùng khung quốc gia (judgment call, `priority.ts`) — expected tính TAY (không gọi calculator)
 * nên xếp Tier C, có `derivation`.
 */
export const qnamuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: QnamuThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'qnamu-2025-exact-natural-science-education-pass-no-priority',
    schoolId: 'qnamu',
    methodId: 'qnamu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'qnamu-threshold-2025',
    sourceNote: 'Điểm chuẩn Sư phạm Khoa học tự nhiên (7140247), tổ hợp D07 = 22,30/30 — mức thấp nhất đã mô hình hoá.',
    derivation: `
      Tổ hợp D07 (Toán 7,5 + Hóa 7,5 + Anh 7,4) = 22,40/30 (tổng thô) >= 22,30 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 22,40/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7.5, chemistry: 7.5, english: 7.4 } } },
      context: { fieldCode: '7140247', subjectContext: { combinationId: 'D07', subjects: ['math', 'chemistry', 'english'] } },
    },
    expected: { eligible: true, raw30: 22.4, finalScore30: 22.4 },
  },
  {
    id: 'qnamu-2025-exact-english-education-fail',
    schoolId: 'qnamu',
    methodId: 'qnamu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'qnamu-threshold-2025',
    sourceNote: 'Điểm chuẩn Sư phạm Tiếng Anh (7140231), tổ hợp D15 = 25,68/30 — mức cao nhất đã mô hình hoá.',
    derivation: `
      Tổ hợp D15 (Văn 8,0 + Địa 8,0 + Anh 8,0) = 24,00/30 (tổng thô) < 25,68 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 24,00/30.
    `,
    input: {
      profile: { thpt: { scores: { literature: 8, geography: 8, english: 8 } } },
      context: { fieldCode: '7140231', subjectContext: { combinationId: 'D15', subjects: ['literature', 'geography', 'english'] } },
    },
    expected: { eligible: false, raw30: 24, finalScore30: 24 },
  },
  {
    id: 'qnamu-2025-exact-primary-education-priority-reduction',
    schoolId: 'qnamu',
    methodId: 'qnamu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (công thức xác nhận trực tiếp từ nguồn trường, tổng thô >= 22,5)',
    sourceId: 'qnamu-threshold-2025',
    sourceNote: 'Điểm chuẩn Giáo dục Tiểu học (7140202), tổ hợp C00 = 26,27/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp C00 (Văn 8,65 + Sử 8,65 + Địa 8,65) = 25,95/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 25,95 >= 22,5 -> CÓ giảm: ĐUT = [(30-25,95)/7,5] x 0,75 = 0,41.
      Tổng = 25,95 + 0,41 = 26,36/30 >= 26,27 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { literature: 8.65, history: 8.65, geography: 8.65 } }, priority: { region: 'KV1' } },
      context: { fieldCode: '7140202', subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] } },
    },
    expected: { eligible: true, raw30: 25.95, finalScore30: 26.36 },
  },
];
