import { round2 } from '../../core/round2';

/**
 * SGU 2026 — Điểm ưu tiên (ĐƯT), trích nguyên văn mục 4.4 Thông báo 1098/TB-HĐTS
 * (`sources.ts:sgu-quality-threshold-2026`): "Điểm ưu tiên (ĐƯT) ... bao gồm điểm ưu tiên đối
 * tượng và điểm ưu tiên khu vực theo Điều 7 Quy chế tuyển sinh": (ĐTHGXT+ĐC) < 22,5 → ĐƯT = MĐƯT;
 * (ĐTHGXT+ĐC) ≥ 22,5 → ĐƯT = [(30 − ĐTHGXT − ĐC)/7,5] × MĐƯT. MĐƯT (mức điểm ưu tiên) theo Điều 7
 * Quy chế tuyển sinh hiện hành (KV1 0,75/KV2-NT 0,5/KV2 0,25/KV3 0; ưu tiên nhóm 1 2,0/nhóm 2 1,0)
 * — trích dẫn quy định quốc gia, KHÔNG phải judgment call riêng của SGU.
 */
export const SGU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const SGU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const SGU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const SGU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupSguStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? SGU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? SGU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

/** `dthgxtPlusDc30` = ĐTHGXT + ĐC (nhánh exact scope ĐC = 0, nên = ĐTHGXT/tổng thô). */
export function calculateSguEffectivePriority30(input: { dthgxtPlusDc30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.dthgxtPlusDc30);
  if (pivot < SGU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / SGU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
