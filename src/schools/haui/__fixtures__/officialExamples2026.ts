import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HauiThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `haui-threshold-2026` công bố bảng ngưỡng theo mã xét tuyển (Tier B ingredient,
 * `thresholds.ts`) nhưng im lặng về điểm ưu tiên KV/ĐT ở mục phương thức 3 => điểm ưu tiên dùng
 * judgment call chuẩn quốc gia (`priority.ts`) — expected tính TAY (không gọi calculator) nên xếp
 * Tier C, có `derivation`.
 */
export const hauiThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HauiThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'haui-2026-exact-cntt-threshold-pass',
    schoolId: 'haui',
    methodId: 'haui-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'haui-threshold-2026',
    sourceNote: 'Ngành Công nghệ thông tin (7480201) có mức điểm điều kiện đăng ký xét tuyển cao nhất bảng: 20,00/30.',
    derivation: `
      Tổ hợp A00 (Toán 7 + Vật lí 7 + Hóa 6,5) = 20,50/30 (tổng thô) >= 20,00 -> đạt.
      Điểm ưu tiên chuẩn KV1 = 0,75 (tổng thô 20,50 < 22,5 -> không giảm).
      Điểm xét tuyển = 20,50 + 0,75 = 21,25/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, physics: 7, chemistry: 6.5 } }, priority: { region: 'KV1' } },
      context: { programCode: '7480201', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 20.5, finalScore30: 21.25 },
  },
  {
    id: 'haui-2026-exact-ketoan-threshold-fail-below',
    schoolId: 'haui',
    methodId: 'haui-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'haui-threshold-2026',
    sourceNote: 'Ngành Kế toán (7340301) có mức điểm điều kiện đăng ký xét tuyển 17,00/30 — thí sinh không khai ưu tiên, tổng thô dưới ngưỡng.',
    derivation: `
      Tổ hợp A01 (Toán 5 + Vật lí 5 + Anh 5,5) = 15,50/30 (tổng thô) < 17,00 -> chưa đạt.
      Không khai khu vực/đối tượng ưu tiên -> điểm ưu tiên = 0.
      Điểm xét tuyển = 15,50 + 0 = 15,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, english: 5.5 } } },
      context: { programCode: '7340301', subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] } },
    },
    expected: { eligible: false, raw30: 15.5, finalScore30: 15.5 },
  },
  {
    id: 'haui-2026-exact-priority-reduction-above-22-5',
    schoolId: 'haui',
    methodId: 'haui-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'haui-threshold-2026',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceNote: 'Ngành Ngôn ngữ Anh (7220201, mức điểm 18,00/30) — áp công thức giảm điểm ưu tiên chuẩn quốc gia khi tổng thô >= 22,5.',
    derivation: `
      Tổ hợp D01 (Toán 8 + Văn 8 + Anh 8) = 24,00/30 (tổng thô) >= 18,00 -> đạt.
      Điểm ưu tiên chuẩn KV1 = 0,75; tổng thô 24,00 >= 22,5 -> giảm: ĐUT = ((30-24)/7,5) x 0,75 = 0,6.
      Điểm xét tuyển = 24,00 + 0,6 = 24,60/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, literature: 8, english: 8 } }, priority: { region: 'KV1' } },
      context: { programCode: '7220201', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: true, raw30: 24, finalScore30: 24.6 },
  },
];
