import { round2 } from '../../core/round2';

/**
 * HMTU 2026 — Thông tin tuyển sinh chỉ khai thành phần "ƯT: Điểm ưu tiên (nếu có)" trong công thức
 * và dẫn chiếu Quy chế tuyển sinh hiện hành của Bộ GD&ĐT, không in bảng mức. Dùng Điều 7 Thông tư
 * 06/2026/TT-BGDĐT (`sources.ts:hmtu-priority-national-2026`) — judgment call cùng tiền lệ
 * VUTM/HUPH/ULSA/EPU/HVU.
 *
 * Mốc giảm 22,50 áp cho ĐIỂM ĐÃ QUY VỀ THANG 30, tức giá trị (2×Toán + B + C) × 3/4, vì đó mới là
 * "tổng điểm đạt được" theo thang xét tuyển của trường.
 */
export const HMTU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HMTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HMTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HMTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHmtuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? HMTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HMTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateHmtuEffectivePriority30(input: { converted30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.converted30);
  if (pivot < HMTU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HMTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
