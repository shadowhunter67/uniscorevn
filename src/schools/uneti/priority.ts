import { round2 } from '../../core/round2';

/**
 * UNETI 2026 — Thông tin tuyển sinh 2026 ghi "UT: Điểm ưu tiên khu vực và điểm ưu tiên đối tượng
 * theo Quy chế tuyển sinh của Bộ GD&ĐT" (không in lại bảng mức trong văn bản). Các mức dưới đây
 * KHÔNG phải suy đoán: công cụ tính điểm CHÍNH CHỦ dkxt.uneti.edu.vn/tinh-diem
 * (`sources.ts:uneti-tohop-dkxt-2026`) cài đặt trực tiếp KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25;
 * KV3 = 0; nhóm đối tượng 1 (DT1-DT4) = 2; nhóm đối tượng 2 (DT5-DT7) = 1 — trùng khớp Điều 7
 * Thông tư 06/2026/TT-BGDĐT (`sources.ts:uneti-priority-national-2026`).
 *
 * Công thức giảm dần cũng lấy nguyên văn từ công cụ chính chủ:
 *   `utBonus = preUT > 22.5 ? ((30 - preUT) / 7.5) * totalUT : totalUT`
 * và trần `Math.min(30, preUT + utBonus)`. Điểm dùng làm mốc giảm là ĐIỂM TỔ HỢP ĐÃ NHÂN HỆ SỐ
 * (preUT), không phải tổng thô 3 môn.
 */
export const UNETI_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const UNETI_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const UNETI_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UNETI_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUnetiStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? UNETI_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? UNETI_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateUnetiEffectivePriority30(input: { weightedTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.weightedTotal30);
  if (pivot <= UNETI_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / UNETI_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
