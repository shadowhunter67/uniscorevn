import { round2 } from '../../core/round2';

/**
 * DNU 2025 — mục 7 "Chính sách ưu tiên" của `sources.ts:dnu-thongtin-2025` chỉ dẫn chiếu tới khung
 * điểm ưu tiên quốc gia hiện hành (Phụ lục I/II, Thông tư 08/2022/TT-BGDĐT, sửa đổi bởi Thông tư
 * 06/2025/TT-BGDĐT) — trường KHÔNG tự công bố bảng mức điểm riêng (khác trường hợp CTUET có Phụ
 * lục II/III riêng). Dùng khung quốc gia làm judgment call cho GIÁ TRỊ bảng, cùng tiền lệ TUEBA/
 * PVU/HUST (xem `knowledgeGaps.ts`). Công thức giảm dần cho thí sinh tổng điểm từ 22,5/30 trở lên
 * theo Điều 7 Thông tư 06/2025/TT-BGDĐT — cùng công thức quốc gia CTUET/TUEBA đã dùng.
 */
export const DNU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const DNU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const DNU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DNU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDnuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? DNU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? DNU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateDnuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DNU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / DNU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
