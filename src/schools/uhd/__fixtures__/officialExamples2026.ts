import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { ThresholdOnlyEvaluationContext } from '../../thptThresholdOnly';

/**
 * Tier C — Quyết định 289/QĐ-ĐHHD không có worked example công khai cho công thức điểm ưu tiên,
 * nhưng công bố ĐẦY ĐỦ công thức Điểm xét tuyển = Môn1+Môn2+Môn3+Điểm UT (trang 4) + ngưỡng sàn
 * 15,00/30 (mục 5.3) + xác nhận KHÔNG áp dụng điểm cộng (mục 5.2) trong 1 văn bản chính thức
 * (`uhd-quyet-dinh-289-2026`, verified, đọc trực tiếp qua vision). Mức điểm ưu tiên KV/ĐT cụ thể
 * là mức chuẩn toàn quốc (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 /
 * KV3 0; ĐT nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const uhdThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: ThresholdOnlyEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'uhd-2026-kv3-pass-no-priority',
    schoolId: 'uhd',
    methodId: 'uhd-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'uhd-quyet-dinh-289-2026',
    sourceNote: 'Ngưỡng sàn 15,00/30 (mục 5.3); thí sinh khu vực 3, không đối tượng ưu tiên -> điểm ưu tiên = 0.',
    derivation: `
      Tổng thô 3 môn tổ hợp A00 (Toán 5 + Lý 5 + Hóa 5) = 15,00/30.
      Không điểm ưu tiên (KV3) -> tổng dùng để so ngưỡng = 15,00/30 >= ngưỡng 15,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } }, priority: { region: 'KV3' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 15, total30: 15 },
  },
  {
    id: 'uhd-2026-below-floor-with-priority-still-fails',
    schoolId: 'uhd',
    methodId: 'uhd-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'uhd-quyet-dinh-289-2026',
    sourceNote: 'Chứng minh điểm ưu tiên CỘNG vào tổng thô trước khi so ngưỡng (trang 4 công thức) nhưng tổng thô quá thấp vẫn không đủ ngưỡng.',
    derivation: `
      Tổng thô 3 môn tổ hợp A00 (Toán 4 + Lý 4 + Hóa 4) = 12,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 12 < 22,5 -> không giảm.
      Tổng dùng để so ngưỡng = 12,00 + 1,75 = 13,75/30 < ngưỡng 15,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: false, rawScore30: 12, total30: 13.75 },
  },
  {
    id: 'uhd-2026-priority-reduction-pass',
    schoolId: 'uhd',
    methodId: 'uhd-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'uhd-quyet-dinh-289-2026',
    sourceNote: 'Tổng thô cao (≥22,5) -> áp dụng công thức giảm dần theo khung điểm ưu tiên quốc gia (mục 5.5.d dẫn chiếu quy định Bộ GD&ĐT).',
    derivation: `
      Tổng thô 3 môn tổ hợp A00 (Toán 9 + Lý 9 + Hóa 8) = 26,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 26 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 26) / 7,5] × 2,75 = (4/7,5) × 2,75 = 0,5333 × 2,75 = 1,4667 -> round2 = 1,47.
      Tổng dùng để so ngưỡng = 26,00 + 1,47 = 27,47/30 >= ngưỡng 15,00 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, physics: 9, chemistry: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } },
    },
    expected: { eligible: true, rawScore30: 26, total30: 27.47 },
  },
];
