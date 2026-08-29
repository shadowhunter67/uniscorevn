import { round2 } from '../../core/round2';

/**
 * Phenikaa 2026 — Điểm ưu tiên khu vực/đối tượng cho phương thức xét kết quả thi TN THPT, áp dụng
 * cho các lĩnh vực/ngành KHÔNG PHẢI 2 CTĐT tài năng (2 CTĐT tài năng loại trừ tuyệt đối điểm ưu
 * tiên — xem `evaluate.ts`, không dùng module này). Nguồn im lặng về mức điểm ưu tiên cụ thể cho
 * các ngành còn lại — dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT, judgment
 * call, cùng tiền lệ `schools/haui`, `schools/ctu`, `schools/utc`).
 */
export const PHENIKAA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const PHENIKAA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const PHENIKAA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const PHENIKAA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupPhenikaaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? PHENIKAA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? PHENIKAA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculatePhenikaaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < PHENIKAA_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / PHENIKAA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
