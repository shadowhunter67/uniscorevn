import { round2 } from '../../core/round2';

/**
 * UTE-ĐN 2026 — công thức ĐXT có "Điểm ưu tiên khu vực, đối tượng" thực hiện theo Quy chế tuyển sinh
 * (ảnh công thức ĐXT, ví dụ ưu tiên KV 0,5). UTE không tự công bố lại bảng mức ⇒ áp mức và công thức giảm
 * dần chuẩn của Quy chế hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT), cùng bảng với DAV/VGU/HVTA.
 */
export const UTE_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const UTE_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const UTE_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UTE_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUteStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? UTE_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? UTE_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateUteEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < UTE_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / UTE_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
