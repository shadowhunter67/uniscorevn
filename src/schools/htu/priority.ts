import { round2 } from '../../core/round2';

/**
 * HTU 2025 — `sources.ts:htu-dean-2025` mục 5 chỉ nêu công thức GIẢM điểm ưu tiên cho thí sinh đạt
 * từ 22,5/30 trở lên (trích nguyên văn Văn bản hợp nhất 02/VBHN-BGDĐT), KHÔNG tự công bố bảng mức
 * điểm ưu tiên khu vực/đối tượng cụ thể. Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment
 * call cho GIÁ TRỊ bảng, cùng tiền lệ TNUT/TUEBA/PVU/HUST/DNU/TUMP (xem `knowledgeGaps.ts`). Công
 * thức giảm dần theo Điều 7 Thông tư 06/2025/TT-BGDĐT (Văn bản hợp nhất 02/VBHN-BGDĐT) — cùng công
 * thức quốc gia mà TNUT/CTUET/TUEBA/DNU/TUMP đã dùng.
 */
export const HTU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHtuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? HTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateHtuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HTU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
