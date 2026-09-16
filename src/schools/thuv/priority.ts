import { round2 } from '../../core/round2';

/**
 * THUV 2026 — Điểm ưu tiên khu vực/đối tượng. Quyết định 260306/001/QĐ-THUV mục 2.2 chỉ nói "ƯT:
 * Điểm ưu tiên của thí sinh được hưởng theo khu vực theo quy định của Bộ GD&ĐT (nếu có)" — KHÔNG
 * in bảng mức cụ thể ⇒ áp Điều 7 Thông tư 06/2026/TT-BGDĐT (judgment call, cùng tiền lệ `schools/umt`).
 */
export const THUV_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const THUV_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const THUV_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const THUV_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupThuvStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? THUV_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? THUV_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateThuvEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < THUV_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / THUV_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
