import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { TluThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `tlu-threshold-2025` xác nhận trực tiếp bảng điểm chuẩn PT1 theo ngành (điểm
 * chuẩn trúng tuyển thực tế, không phải điểm sàn), nhưng điểm ưu tiên dùng GIÁ TRỊ bảng theo khung
 * quốc gia (judgment call, `priority.ts`) — expected tính TAY (không gọi calculator) nên xếp Tier
 * C, có `derivation`.
 */
export const tluThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: TluThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'tlu-2025-exact-tla107-pass-no-priority',
    schoolId: 'tlu',
    methodId: 'tlu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'tlu-threshold-2025',
    sourceNote: 'Điểm chuẩn Kỹ thuật cấp thoát nước (TLA107) PT1 = 18,00/30.',
    derivation: `
      Tổ hợp A00 (Toán 6,5 + Lý 6,0 + Hóa 6,0) = 18,50/30 (tổng thô) >= 18,00 -> đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 18,50/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 6.5, physics: 6, chemistry: 6 } } },
      context: { fieldCode: 'TLA107', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 18.5, finalScore30: 18.5 },
  },
  {
    id: 'tlu-2025-exact-tla106-fail',
    schoolId: 'tlu',
    methodId: 'tlu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    sourceId: 'tlu-threshold-2025',
    sourceNote: 'Điểm chuẩn Công nghệ thông tin (TLA106) PT1 = 23,23/30.',
    derivation: `
      Tổ hợp A01 (Toán 7,0 + Lý 7,0 + Anh 7,0) = 21,00/30 (tổng thô) < 23,23 -> chưa đạt.
      Không khai ưu tiên -> điểm ưu tiên = 0. Tổng = 21,00/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, physics: 7, english: 7 } } },
      context: { fieldCode: 'TLA106', subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] } },
    },
    expected: { eligible: false, raw30: 21, finalScore30: 21 },
  },
  {
    id: 'tlu-2025-exact-tla301-priority-reduction',
    schoolId: 'tlu',
    methodId: 'tlu-thpt-exam-exact-2025',
    year: 2025,
    tier: 'C',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceId: 'tlu-threshold-2025',
    sourceNote: 'Điểm chuẩn Luật (TLA301) PT1 = 25,17/30, thí sinh điểm cao có ưu tiên KV1.',
    derivation: `
      Tổ hợp D01 (Toán 8,25 + Văn 8,0 + Anh 8,0) = 24,25/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75; 24,25 >= 22,5 -> giảm: ĐUT = ((30-24,25)/7,5) × 0,75 = 0,575 -> round2 = 0,58.
      Tổng = 24,25 + 0,58 = 24,83/30 < 25,17 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 8.25, literature: 8, english: 8 } }, priority: { region: 'KV1' } },
      context: { fieldCode: 'TLA301', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] } },
    },
    expected: { eligible: false, raw30: 24.25, finalScore30: 24.83 },
  },
];
