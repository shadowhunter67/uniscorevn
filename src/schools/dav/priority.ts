import { round2 } from '../../core/round2';

/**
 * DAV 2026 — Điểm ưu tiên khu vực/đối tượng. Thông tin tuyển sinh mục 2.4.2: "điểm ưu tiên theo đối
 * tượng và theo khu vực, được xác định theo Quy chế tuyển sinh hiện hành" ⇒ mức cơ bản theo Điều 7
 * Thông tư 06/2026/TT-BGDĐT (cùng bảng mức với HVTA). Thí sinh đạt tổng điểm đạt được ≥ 22,5/30 thì
 * ưu tiên giảm dần: [(30 − tổng điểm đạt được)/7,5] × mức ưu tiên (nguyên văn PDF).
 */
export const DAV_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const DAV_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const DAV_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DAV_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDavStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? DAV_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? DAV_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateDavEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DAV_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / DAV_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
