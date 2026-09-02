import { round2 } from '../../core/round2';

/**
 * HDIU 2025 — nguồn (`sources.ts:hdiu-admission-info-2025`) xác nhận TRỰC TIẾP điểm ưu tiên khu
 * vực/đối tượng ĐƯỢC CỘNG vào tổng điểm trước khi so với ngưỡng đảm bảo chất lượng đầu vào
 * ("Điểm xét tuyển ... cộng với điểm ưu tiên/khuyến khích đối tượng, khu vực"; "Ngưỡng đảm bảo
 * chất lượng đầu vào: ... gồm cả điểm ưu tiên/khuyến khích theo khu vực ..."), nhưng KHÔNG công bố
 * mức điểm ưu tiên cụ thể cho từng khu vực/đối tượng — dùng khung quốc gia hiện hành (Điều 7 Thông
 * tư 08/2022/TT-BGDĐT, judgment call cho GIÁ TRỊ bảng, không phải cho việc CÓ áp dụng điểm ưu tiên
 * hay không) — cùng tiền lệ `schools/hou`, `schools/phenikaa`, `schools/haui`, `schools/ctu`.
 */
export const HDIU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HDIU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HDIU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HDIU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHdiuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HDIU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HDIU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHdiuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HDIU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HDIU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
