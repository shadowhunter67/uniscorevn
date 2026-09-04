import { round2 } from '../../core/round2';

/**
 * DSU 2025 — Điều 7 "Chính sách ưu tiên trong tuyển sinh" của Quy chế tuyển sinh đại học (ban hành
 * kèm Quyết định 577/QĐ-TDTTĐN ngày 12/5/2025, `sources.ts:dsu-quyche-577-2025`) TỰ CÔNG BỐ trực
 * tiếp bảng mức điểm ưu tiên khu vực (Phụ lục 1) và đối tượng (Phụ lục 2), cùng công thức giảm dần
 * khi tổng điểm đạt từ 22,5/30 trở lên (Điều 7 khoản 3-4) — đây là nguồn CHÍNH CHỦ trực tiếp, KHÔNG
 * phải judgment call (khác tiền lệ TVUni/DNU/TUEBA/PVU/HUST nơi trường không tự công bố số riêng).
 * Giá trị trùng khớp khung điểm ưu tiên quốc gia hiện hành (Thông tư 08/2022/TT-BGDĐT, sửa đổi bởi
 * Thông tư 06/2025/TT-BGDĐT) vì Điều 7 dẫn chiếu và lặp lại nguyên văn quy định quốc gia.
 */
export const DSU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const DSU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const DSU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const DSU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupDsuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? DSU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? DSU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateDsuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < DSU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / DSU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
