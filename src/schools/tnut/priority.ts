import { round2 } from '../../core/round2';

/**
 * TNUT 2025 — mục 1.2.1 của `sources.ts:tnut-huongdan-2025` định nghĩa "điểm ƯT là điểm ưu tiên khu
 * vực, đối tượng (nếu có) và được tính theo quy chế tuyển sinh hiện hành" — trường KHÔNG tự công bố
 * bảng mức điểm riêng (khác trường hợp CTUET có Phụ lục II/III riêng). Dùng khung quốc gia làm
 * judgment call cho GIÁ TRỊ bảng, cùng tiền lệ TUEBA/PVU/HUST/DNU/TUMP (xem `knowledgeGaps.ts`).
 * Công thức giảm dần cho thí sinh tổng điểm từ 22,5/30 trở lên theo Điều 7 Thông tư 06/2025/TT-BGDĐT
 * (Văn bản hợp nhất 02/VBHN-BGDĐT) — cùng công thức quốc gia CTUET/TUEBA/DNU/TUMP đã dùng.
 */
export const TNUT_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TNUT_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TNUT_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TNUT_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTnutStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? TNUT_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? TNUT_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateTnutEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TNUT_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TNUT_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
