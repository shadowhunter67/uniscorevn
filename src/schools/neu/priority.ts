import { round2 } from '../../core/round2';

/** NEU 2026 — Điểm ưu tiên khu vực/đối tượng, trích NGUYÊN VĂN mục 7.1 Thông tin tuyển sinh 2026
 * (Quyết định 289/QĐ-ĐHKTQD): KV1=0,75; KV2-NT=0,5; KV2=0,25; KV3=0; nhóm ƯT1 (đối tượng 01-04)=2,00;
 * nhóm ƯT2 (đối tượng 05-06)=1,00. "Điểm ưu tiên = Điểm ưu tiên khu vực (nếu có) + Điểm ưu tiên đối
 * tượng (nếu có)". Với thí sinh tổng điểm ≥ 22,5/30: "Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5]
 * × Mức điểm ưu tiên quy định". KHÔNG phải judgment call — công thức chính chủ, không suy đoán. */
export const NEU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const NEU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const NEU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const NEU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupNeuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? NEU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? NEU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateNeuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < NEU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / NEU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
