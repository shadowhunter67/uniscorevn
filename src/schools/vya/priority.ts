import { round2 } from '../../core/round2';

/**
 * VYA 2026 — Điều 7 Quy chế tuyển sinh của Học viện (Quyết định 261/QĐ-HVTTNVN, 30/3/2026) TỰ
 * TRÍCH NGUYÊN VĂN bảng mức điểm ưu tiên khu vực/đối tượng trong chính văn bản của trường (không
 * chỉ dẫn chiếu "theo quy định hiện hành" như đa số trường khác trong campaign) — GIÁ TRỊ trùng
 * khớp Thông tư 06/2026/TT-BGDĐT mà văn bản trích dẫn làm căn cứ, cùng tiền lệ VHS.
 */
export const VYA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VYA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VYA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VYA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVyaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? VYA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? VYA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateVyaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VYA_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / VYA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
