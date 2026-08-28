import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { PntuThptExamExactEvaluationContext } from '../evaluate';

/**
 * Tier C — Quyết định 671/QĐ-TĐHYKPNT không có worked example công khai cho công thức điểm ưu
 * tiên, nhưng công bố ĐẦY ĐỦ nguyên tắc + công thức giảm dần (mục 5.2) trong 1 văn bản chính thức
 * (`pntu-admission-2026`, verified). Ngưỡng theo ngành (`pntu-threshold-notice-2026`) là
 * cross-checked (đối chiếu chéo 2 báo độc lập, không phải đọc trực tiếp ảnh gốc). Mức điểm ưu
 * tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, xem `priority.ts`): KV1 0,75 / KV2-NT
 * 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0.
 */
export const pntuThptExamExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: PntuThptExamExactEvaluationContext },
  { eligible: boolean; rawScore30: number; total30: number }
>[] = [
  {
    id: 'pntu-2026-tamlyhoc-pass-with-priority',
    schoolId: 'pntu',
    methodId: 'pntu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'pntu-threshold-notice-2026',
    sourceNote: 'Tâm lý học (7310401) = 15,5/30 [cross-checked, VnExpress+GD&TĐ 10/07/2026]; mức ưu tiên KV1+UT2 = 1,75 [judgment call, chuẩn toàn quốc].',
    derivation: `
      Tổng thô 3 môn tổ hợp B00 (Toán 5 + Hóa 5 + Sinh 5) = 15,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT2 (1,0) = 1,75; tổng thô 15 < 22,5 -> KHÔNG giảm.
      Tổng dùng để so ngưỡng = 15,00 + 1,75 = 16,75/30 >= ngưỡng 15,50 -> đạt.
    `,
    boundaryNote: 'Chứng minh PNTU cộng điểm ưu tiên vào tổng thô trước khi so ngưỡng (mục 6, khác cách hiển thị tham khảo của HCMUE/VNUA).',
    input: {
      profile: { thpt: { scores: { math: 5, chemistry: 5, biology: 5 } }, priority: { region: 'KV1', category: 'UT2' } },
      context: { programId: '7310401', combinationId: 'B00' },
    },
    expected: { eligible: true, rawScore30: 15, total30: 16.75 },
  },
  {
    id: 'pntu-2026-ykhoa-priority-reduction-pass',
    schoolId: 'pntu',
    methodId: 'pntu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'pntu-threshold-notice-2026',
    sourceNote: 'Y khoa (7720101) = 22,5/30 [cross-checked, VnExpress+GD&TĐ 10/07/2026]; mức ưu tiên KV1+UT1 = 2,75, giảm tuyến tính vì tổng thô ≥ 22,5 [công thức trích nguyên văn mục 5.2].',
    derivation: `
      Tổng thô 3 môn tổ hợp B00 (Toán 9 + Hóa 8 + Sinh 8) = 25,00/30.
      Mức ưu tiên chuẩn = KV1 (0,75) + UT1 (2,0) = 2,75; tổng thô 25 >= 22,5 -> áp dụng giảm:
        Điểm ưu tiên hiệu lực = [(30 - 25) / 7,5] × 2,75 = (5/7,5) × 2,75 = 0,6667 × 2,75 = 1,83 (round2).
      Tổng dùng để so ngưỡng = 25,00 + 1,83 = 26,83/30 >= ngưỡng 22,50 -> đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 9, chemistry: 8, biology: 8 } }, priority: { region: 'KV1', category: 'UT1' } },
      context: { programId: '7720101', combinationId: 'B00' },
    },
    expected: { eligible: true, rawScore30: 25, total30: 26.83 },
  },
  {
    id: 'pntu-2026-ytecongcong-fail-no-priority',
    schoolId: 'pntu',
    methodId: 'pntu-thpt-exam-exact-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'pntu-threshold-notice-2026',
    sourceNote: 'Y tế công cộng (7720701) = 16/30 [cross-checked, VnExpress+GD&TĐ 10/07/2026]; thí sinh khu vực 3, không thuộc đối tượng ưu tiên -> điểm ưu tiên = 0.',
    derivation: `
      Tổng thô 3 môn tổ hợp B00 (Toán 4 + Hóa 4 + Sinh 4) = 12,00/30.
      Không có điểm ưu tiên (KV3, không đối tượng ưu tiên) -> tổng = 12,00/30 < ngưỡng 16,00 -> chưa đạt.
    `,
    input: {
      profile: { thpt: { scores: { math: 4, chemistry: 4, biology: 4 } }, priority: { region: 'KV3' } },
      context: { programId: '7720701', combinationId: 'B00' },
    },
    expected: { eligible: false, rawScore30: 12, total30: 12 },
  },
];
