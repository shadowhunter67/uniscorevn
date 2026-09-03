import { round2 } from '../../core/round2';

/**
 * NAEM 2025 — `sources.ts:naem-priority-formula-2025` ghi rõ công thức "Điểm ưu tiên = [(30 - Tổng
 * điểm đạt được)/7,5] x Mức điểm ưu tiên" — trùng công thức giảm dần quốc gia (Điều 7 Thông tư
 * 08/2022/TT-BGDĐT sửa đổi bởi Thông tư 06/2025/TT-BGDĐT), áp dụng khi tổng điểm đạt được (thang
 * 30) từ 22,5 trở lên. Học viện KHÔNG tự công bố bảng "Mức điểm ưu tiên" theo khu vực/đối tượng cụ
 * thể — dùng khung quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng, cùng tiền lệ DNU/TUEBA/
 * PVU/HUST (xem `knowledgeGaps.ts`).
 */
export const NAEM_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const NAEM_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const NAEM_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const NAEM_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupNaemStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? NAEM_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? NAEM_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateNaemEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < NAEM_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / NAEM_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
