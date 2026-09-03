import { round2 } from '../../core/round2';

/**
 * TLU-HN 2025 — Thông báo điểm trúng tuyển và Thông báo quy tắc quy đổi (`sources.ts`) không công
 * bố mức điểm ưu tiên KV/ĐT riêng của trường — dùng khung điểm ưu tiên quốc gia hiện hành (Điều 7
 * Thông tư 06/2025/TT-BGDĐT) làm judgment call cho GIÁ TRỊ bảng, cùng tiền lệ `schools/hluv`,
 * `schools/hump`, `schools/hat`. (Một nguồn tổng hợp độc lập trích đúng các mức KV1=0,75/KV2-NT=0,5/
 * KV2=0,25/UT1=2/UT2=1 — khớp khung quốc gia, không phải số riêng của trường.)
 */
export const THANGLONG_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const THANGLONG_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const THANGLONG_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const THANGLONG_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupThanglongStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? THANGLONG_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? THANGLONG_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateThanglongEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < THANGLONG_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / THANGLONG_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
