import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { UttThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `utt-threshold-2026` công bố TRỰC TIẾP công thức (ĐXT = tổng 3 môn + điểm ưu
 * tiên) và bảng ngưỡng theo mã xét tuyển (Tier B ingredient, `thresholds.ts`), nhưng không in bảng
 * giá trị KV/ĐT cụ thể => điểm ưu tiên dùng judgment call chuẩn quốc gia (`priority.ts`) — expected
 * tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const uttThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: UttThptExamExactEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'utt-2026-exact-cntt-threshold-pass',
    schoolId: 'utt',
    methodId: 'utt-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'utt-threshold-2026',
    sourceNote: 'Ngành Công nghệ thông tin (GTADCTT2) có ngưỡng 20/30 (đã gồm điểm ưu tiên theo nguồn); dùng điểm ưu tiên KV1 chuẩn quốc gia.',
    derivation: `
      Tổ hợp A00 (Toán 7 + Vật lí 6 + Hóa 6,5) = 19,50/30 (tổng thô).
      Điểm ưu tiên chuẩn KV1 = 0,75 (tổng thô 19,50 < 22,5 -> không giảm).
      Điểm xét tuyển = 19,50 + 0,75 = 20,25/30 >= ngưỡng ngành CNTT 20,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 7, physics: 6, chemistry: 6.5 } }, priority: { region: 'KV1' } },
      context: { programCode: 'GTADCTT2', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 19.5, finalScore30: 20.25 },
  },
  {
    id: 'utt-2026-exact-standard-threshold-fail-below-15',
    schoolId: 'utt',
    methodId: 'utt-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'utt-threshold-2026',
    sourceNote: 'Ngành Kế toán doanh nghiệp (GTADCKT2) có ngưỡng 15/30 (đã gồm điểm ưu tiên) — không khai ưu tiên -> điểm ưu tiên = 0.',
    derivation: `
      Tổ hợp A00 (Toán 4 + Vật lí 5 + Hóa 5) = 14,00/30.
      Không khai khu vực/đối tượng ưu tiên -> điểm ưu tiên = 0.
      Điểm xét tuyển = 14,00 + 0 = 14,00/30 < ngưỡng 15,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 4, physics: 5, chemistry: 5 } } },
      context: { programCode: 'GTADCKT2', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, raw30: 14, finalScore30: 14 },
  },
  {
    id: 'utt-2026-exact-priority-reduction-above-22-5',
    schoolId: 'utt',
    methodId: 'utt-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'utt-threshold-2026',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceNote: 'Ngành Đường sắt tốc độ cao (GTADCHS2, ngưỡng 18/30) — áp công thức giảm điểm ưu tiên chuẩn quốc gia khi tổng thô >= 22,5.',
    derivation: `
      Tổ hợp A00 (Toán 9 + Vật lí 9 + Hóa 6) = 24,00/30 (tổng thô) >= 15,00.
      Điểm ưu tiên chuẩn KV1 = 0,75; tổng thô 24,00 >= 22,5 -> giảm: ĐUT = ((30-24)/7,5) x 0,75 = 0,6.
      Điểm xét tuyển = 24,00 + 0,6 = 24,60/30 >= ngưỡng ngành 18,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, physics: 9, chemistry: 6 } }, priority: { region: 'KV1' } },
      context: { programCode: 'GTADCHS2', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 24, finalScore30: 24.6 },
  },
];
