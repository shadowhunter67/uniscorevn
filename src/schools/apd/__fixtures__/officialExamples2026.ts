import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { ApdThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — Thông báo 180/TB-HVCSPT không có worked example công khai cho công thức điểm ưu tiên,
 * nhưng công bố ĐẦY ĐỦ 3 ngưỡng theo cơ sở đào tạo + nguyên tắc "ngưỡng đã bao gồm điểm cộng, điểm
 * ưu tiên đối tượng, khu vực (nếu có)" trong 1 văn bản chính thức (`apd-threshold-notice-180-2026`,
 * verified, đọc trực tiếp qua vision). Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc
 * (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1 (01-04)
 * 2,0 / nhóm 2 (05-07) 1,0.
 */
export const apdThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: ApdThptExamExactEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'apd-2026-bacninh-pass-at-floor',
    schoolId: 'apd',
    methodId: 'apd-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'apd-threshold-notice-180-2026',
    sourceNote: 'Phân hiệu Bắc Ninh: ngưỡng 16,00/30; thí sinh khu vực 3, không đối tượng ưu tiên -> điểm ưu tiên = 0.',
    derivation: `
      Tổng thô 3 môn tổ hợp A00 (Toán 6 + Lý 5 + Hóa 5) = 16,00/30.
      Không điểm ưu tiên (KV3) -> tổng dùng để so ngưỡng = 16,00/30 >= ngưỡng 16,00 (Bắc Ninh) -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } }, priority: { region: 'KV3' } },
      context: { campusId: 'bacninh', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 16, total30: 16 },
  },
  {
    id: 'apd-2026-hanoi-fail-below-floor-with-priority',
    schoolId: 'apd',
    methodId: 'apd-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'apd-threshold-notice-180-2026',
    sourceNote: 'Trụ sở chính Hà Nội: ngưỡng 19,00/30; chứng minh điểm ưu tiên CỘNG vào tổng thô nhưng vẫn không đủ ngưỡng cao hơn.',
    derivation: `
      Tổng thô 3 môn tổ hợp A00 (Toán 5 + Lý 5 + Hóa 5) = 15,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 15 < 22,5 -> không giảm.
      Tổng dùng để so ngưỡng = 15,00 + 1,75 = 16,75/30 < ngưỡng 19,00 (Hà Nội) -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { campusId: 'hanoi', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, rawScore30: 15, total30: 16.75 },
  },
  {
    id: 'apd-2026-hanoi-priority-reduction-pass',
    schoolId: 'apd',
    methodId: 'apd-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'apd-threshold-notice-180-2026',
    sourceNote: 'Trụ sở chính Hà Nội: ngưỡng 19,00/30; tổng thô cao (≥22,5) -> áp dụng công thức giảm dần theo khung điểm ưu tiên quốc gia.',
    derivation: `
      Tổng thô 3 môn tổ hợp A00 (Toán 9 + Lý 8 + Hóa 8) = 25,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 25 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 25) / 7,5] × 2,75 = (5/7,5) × 2,75 = 0,6667 × 2,75 = 1,8333 -> round2 = 1,83.
      Tổng dùng để so ngưỡng = 25,00 + 1,83 = 26,83/30 >= ngưỡng 19,00 (Hà Nội) -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, physics: 8, chemistry: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { campusId: 'hanoi', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 25, total30: 26.83 },
  },
];
