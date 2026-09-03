import { round2 } from '../../core/round2';

/**
 * TUMP 2025 — mục 4.3 "Điểm ưu tiên" của `sources.ts:tump-thongtin-2025` dẫn chiếu chính sách ưu
 * tiên khu vực/đối tượng theo quy chế tuyển sinh hiện hành của Bộ GD&ĐT (mục 6: Văn bản hợp nhất số
 * 02/VBHN-BGDĐT ngày 02/4/2025) — trường KHÔNG tự công bố bảng mức điểm riêng (khác trường hợp
 * CTUET có Phụ lục II/III riêng). Dùng khung quốc gia làm judgment call cho GIÁ TRỊ bảng, cùng tiền
 * lệ TUEBA/PVU/HUST/DNU (xem `knowledgeGaps.ts`). Công thức giảm dần cho thí sinh tổng điểm từ
 * 22,5/30 trở lên LẤY NGUYÊN VĂN từ mục 4.3: "Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5] ×
 * (Mức điểm ưu tiên)" — cùng công thức quốc gia CTUET/TUEBA/DNU đã dùng.
 */
export const TUMP_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TUMP_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TUMP_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TUMP_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTumpStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? TUMP_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? TUMP_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateTumpEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TUMP_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TUMP_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
