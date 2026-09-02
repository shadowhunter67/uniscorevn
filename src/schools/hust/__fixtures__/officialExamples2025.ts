import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HustThptExamExactEvaluationContext2025 } from '../evaluate';

/**
 * Tier C — nguồn `hust-threshold-2025` (tuyensinh247, cross-check `hust-threshold-secondary-2025`)
 * xác nhận trực tiếp bảng điểm chuẩn theo chương trình + tổ hợp, và `hust-formula-official-2025`
 * (ts.hust.edu.vn) xác nhận trực tiếp công thức Điểm xét (a)/(b), NHƯNG giá trị điểm ưu tiên KV/ĐT
 * dùng khung quốc gia (judgment call, `priority2025.ts`) — expected tính TAY (không gọi calculator)
 * nên xếp Tier C, có `derivation`.
 */
export const hustThptExamExactGoldenCases2025: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HustThptExamExactEvaluationContext2025 },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'hust-2025-exact-it-e10-pass-weighted-no-priority',
    schoolId: 'hust',
    methodId: 'hust-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hust-threshold-2025',
    sourceNote: 'Điểm chuẩn Khoa học dữ liệu và Trí tuệ nhân tạo (CT tiên tiến), tổ hợp A00, Môn chính Toán = 29,39/30 — mức cao nhất trường.',
    derivation: `
      Tổ hợp A00 (Toán 10 + Lý 9,8 + Hóa 9,6) = 29,40/30 (tổng thô).
      Có môn chính Toán -> ĐX = [(29,40 + 10) x 3/4] = (39,40 x 0,75) = 29,55.
      Không khai ưu tiên -> điểm ưu tiên = 0. ĐX cuối = 29,55/30 >= 29,39 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 10, physics: 9.8, chemistry: 9.6 } } },
      context: { fieldCode: 'khoa-hoc-du-lieu-va-tri-tue-nhan-tao-ct-tien-tien', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 29.4, finalScore30: 29.55 },
  },
  {
    id: 'hust-2025-exact-troy-ba-fail-unweighted',
    schoolId: 'hust',
    methodId: 'hust-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'hust-threshold-2025',
    sourceNote: 'Điểm chuẩn Quản trị kinh doanh - hợp tác ĐH Troy (Hoa Kỳ), tổ hợp D01 (không môn chính) = 19,00/30 — mức thấp nhất trường.',
    derivation: `
      Tổ hợp D01 (Toán 5 + Văn 6 + Anh 5) = 16,00/30 (tổng thô).
      KHÔNG có môn chính -> ĐX = tổng thô = 16,00.
      Không khai ưu tiên -> điểm ưu tiên = 0. ĐX cuối = 16,00/30 < 19,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, literature: 6, english: 5 } } },
      context: { fieldCode: 'quan-tri-kinh-doanh-hop-tac-voi-dh-troy-hoa-ky', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, raw30: 16, finalScore30: 16 },
  },
  {
    id: 'hust-2025-exact-ky-thuat-dien-priority-reduction',
    schoolId: 'hust',
    methodId: 'hust-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5) áp trên tổng thô, KHÔNG áp trên ĐX đã nhân hệ số',
    sourceId: 'hust-threshold-2025',
    sourceNote: 'Điểm chuẩn Kỹ thuật Điện, tổ hợp A00, Môn chính Toán = 27,55/30, thí sinh có ưu tiên KV1.',
    derivation: `
      Tổ hợp A00 (Toán 8 + Lý 8,5 + Hóa 8) = 24,50/30 (tổng thô).
      Có môn chính Toán -> ĐX = [(24,50 + 8) x 3/4] = (32,50 x 0,75) = 24,375 -> làm tròn 24,38.
      Điểm ưu tiên chuẩn KV1 = 0,75; tổng thô 24,50 >= 22,5 -> CÓ giảm: ĐUT = [(30-24,50)/7,5] x 0,75 = 0,55.
      ĐX cuối = 24,38 + 0,55 = 24,93/30 < 27,55 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8, physics: 8.5, chemistry: 8 } }, priority: { region: 'KV1' } },
      context: { fieldCode: 'ky-thuat-dien', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, raw30: 24.5, finalScore30: 24.93 },
  },
];
