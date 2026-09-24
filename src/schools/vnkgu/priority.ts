import { round2 } from '../../core/round2';

/** VNKGU 2026 — Điểm ưu tiên khu vực (KVTS)/đối tượng (ĐTƯT), trang "Điểm cộng và điểm Ưu tiên
 * trong tuyển sinh" (`vnkgu-priority-2026`) công bố ĐẦY ĐỦ bảng số (không phải judgment call/khung
 * quốc gia thay thế): KV1 = 0,75; KV2-NT = 0,50; KV2 = 0,25; KV3 = 0; nhóm đối tượng 01/02/03 = 2,00;
 * nhóm 04/05/06 = 1,00 — khớp khung quốc gia hiện hành (TT 06/2026/TT-BGDĐT). Công thức giảm dần
 * cho thí sinh đạt tổng điểm từ 22,5/30 trở lên trích nguyên văn kèm bảng ví dụ minh hoạ đầy đủ. */
export const VNKGU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VNKGU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VNKGU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VNKGU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVnkguStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? VNKGU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? VNKGU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateVnkguEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VNKGU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / VNKGU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
