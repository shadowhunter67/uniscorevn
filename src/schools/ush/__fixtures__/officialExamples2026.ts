import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { UshEvaluationContext } from '../evaluate';

/**
 * Tier C — Quyết định 58/QĐ-TDTTHCM không có worked example công khai cho công thức điểm ưu tiên,
 * nhưng công bố ĐẦY ĐỦ ngưỡng đầu vào (mục 3.2.b, thô, KHÔNG cộng ưu tiên) và công thức ĐXT/công
 * thức giảm dần điểm ưu tiên (mục 2.1, mục 9), trong 1 văn bản chính thức (`ush-quyetdinh-58-2026`,
 * verified, đọc trực tiếp qua vision). Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc
 * (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1 (01-04)
 * 2,0 / nhóm 2 (05-07) 1,0.
 */
export const ushThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: UshEvaluationContext },
  { eligible: boolean; rawScore30: number; dxt30: number }
>[] = [
  {
    id: 'ush-2026-standard-pass-with-priority',
    schoolId: 'ush',
    methodId: 'ush-thpt-plus-talent-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ush-quyetdinh-58-2026',
    sourceNote: 'Ngưỡng đầu vào 15,00/30 + năng khiếu ≥5,00/10 (mục 3.2.b, thô, không cộng ưu tiên); ĐXT tham khảo cộng thêm ưu tiên KV1+UT2 = 1,75 [chuẩn toàn quốc, judgment call].',
    derivation: `
      Tổ hợp T00 (Toán, Sinh học, Năng khiếu TDTT): Toán 6 + Sinh 6 = 12,00; năng khiếu = 5,00.
      Tổng thô = 12,00 + 5,00 = 17,00/30 >= ngưỡng 15,00, đồng thời năng khiếu 5,00 >= 5,00 -> đạt ngưỡng đầu vào.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 17,00 < 22,5 -> không giảm.
      ĐXT (tham khảo) = 17,00 + 1,75 = 18,75/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, biology: 6 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { pairId: 'T00', talentScore10: 5 },
    },
    expected: { eligible: true, rawScore30: 17, dxt30: 18.75 },
  },
  {
    id: 'ush-2026-fail-total-below-threshold-despite-high-talent',
    schoolId: 'ush',
    methodId: 'ush-thpt-plus-talent-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ush-quyetdinh-58-2026',
    sourceNote: 'Ngưỡng đầu vào yêu cầu ĐỒNG THỜI tổng thô ≥15,00 VÀ năng khiếu ≥5,00 — thiếu 1 trong 2 điều kiện đều KHÔNG đạt.',
    derivation: `
      Tổ hợp T00: Toán 3 + Sinh 3 = 6,00; năng khiếu = 6,00.
      Tổng thô = 6,00 + 6,00 = 12,00/30 < ngưỡng 15,00 -> chưa đạt (dù năng khiếu riêng 6,00 >= 5,00).
    `,
    input: {
      profile: { thpt: { scores: { math: 3, biology: 3 } } },
      context: { pairId: 'T00', talentScore10: 6 },
    },
    expected: { eligible: false, rawScore30: 12, dxt30: 12 },
  },
  {
    id: 'ush-2026-priority-reduction-pass',
    schoolId: 'ush',
    methodId: 'ush-thpt-plus-talent-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'ush-quyetdinh-58-2026',
    sourceNote: 'Tổng thô cao (≥22,5) -> ĐXT tham khảo áp dụng công thức giảm dần (mục 9, khớp khung Điều 7 quốc gia).',
    derivation: `
      Tổ hợp T00: Toán 9 + Sinh 9 = 18,00; năng khiếu = 9,00.
      Tổng thô = 18,00 + 9,00 = 27,00/30 >= ngưỡng 15,00, năng khiếu 9,00 >= 5,00 -> đạt ngưỡng đầu vào.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 27,00 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 27,00)/7,5] × 2,75 = (3/7,5) × 2,75 = 0,4 × 2,75 = 1,10.
      ĐXT (tham khảo) = 27,00 + 1,10 = 28,10/30.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, biology: 9 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { pairId: 'T00', talentScore10: 9 },
    },
    expected: { eligible: true, rawScore30: 27, dxt30: 28.1 },
  },
];
