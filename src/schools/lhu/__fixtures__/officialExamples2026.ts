import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { LhuThptExamEvaluationContext } from '../evaluate';

/**
 * Tier C — nguồn `lhu-threshold-2026` công bố TRỰC TIẾP con số ngưỡng "Điểm môn 1 + Điểm môn 2 +
 * Điểm môn 3 ≥ 15 điểm" (Tier B ingredient) nhưng im lặng về điểm ưu tiên khu vực/đối tượng =>
 * nhánh exact cộng điểm ưu tiên theo judgment call chuẩn quốc gia (Điều 7 Thông tư 06/2026/TT-
 * BGDĐT, `priority.ts`) — expected tính TAY (không gọi calculator) nên xếp Tier C, có `derivation`.
 */
export const lhuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: LhuThptExamEvaluationContext },
  { eligible: boolean; raw30: number; finalScore30: number }
>[] = [
  {
    id: 'lhu-2026-exact-threshold-pass-no-priority',
    schoolId: 'lhu',
    methodId: 'lhu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'lhu-threshold-2026',
    sourceNote: 'Ngưỡng công bố trực tiếp "Điểm môn 1 + Điểm môn 2 + Điểm môn 3 ≥ 15 điểm"; không khai điểm ưu tiên -> điểm ưu tiên = 0.',
    derivation: `
      Tổ hợp A00 (Toán 5 + Vật lí 5 + Hóa 5) = 15,00/30.
      Không khai khu vực/đối tượng ưu tiên -> điểm ưu tiên chuẩn quốc gia = 0.
      Điểm xét tuyển = 15,00 + 0 = 15,00/30 >= ngưỡng 15,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 15, finalScore30: 15 },
  },
  {
    id: 'lhu-2026-exact-threshold-fail-below-15',
    schoolId: 'lhu',
    methodId: 'lhu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'lhu-threshold-2026',
    sourceNote: 'Tổng điểm thô dưới ngưỡng 15,00/30 công bố trực tiếp -> không đạt, dù có điểm ưu tiên (ngưỡng so với tổng thô theo đúng văn bản).',
    derivation: `
      Tổ hợp A00 (Toán 4 + Vật lí 5 + Hóa 5) = 14,00/30 (tổng thô).
      Ngưỡng so với TỔNG THÔ (đúng văn bản) -> 14,00 < 15,00 -> chưa đạt.
      Điểm ưu tiên KV1 (0,75) + UT2 (1,0) = 1,75; vì tổng thô 14,00 < 22,5 nên không giảm trừ.
      Điểm xét tuyển = 14,00 + 1,75 = 15,75/30 (hiển thị), nhưng vẫn ineligible vì ngưỡng so với tổng thô.
    `,
    input: {
      profile: { thpt: { scores: { math: 4, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, raw30: 14, finalScore30: 15.75 },
  },
  {
    id: 'lhu-2026-exact-priority-reduction-above-22-5',
    schoolId: 'lhu',
    methodId: 'lhu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'lhu-threshold-2026',
    boundaryNote: 'priority reduction threshold (judgment call chuẩn quốc gia, tổng thô >= 22,5)',
    sourceNote: 'Áp dụng công thức giảm điểm ưu tiên chuẩn quốc gia khi tổng thô >= 22,5 (Điều 7 Thông tư 06/2026/TT-BGDĐT).',
    derivation: `
      Tổ hợp A00 (Toán 9 + Vật lí 9 + Hóa 6) = 24,00/30 (tổng thô) >= 15,00 -> đạt ngưỡng.
      Điểm ưu tiên chuẩn KV1 = 0,75; tổng thô 24,00 >= 22,5 -> giảm: ĐUT = ((30-24)/7,5) x 0,75 = 0,6.
      Điểm xét tuyển = 24,00 + 0,6 = 24,60/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, physics: 9, chemistry: 6 } }, priority: { region: 'KV1' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, raw30: 24, finalScore30: 24.6 },
  },
];
