import { round2 } from '../../core/round2';

/**
 * HAUI 2026 — Điểm ưu tiên khu vực/đối tượng cho phương thức xét điểm thi tốt nghiệp THPT (phương
 * thức 3). "Ngưỡng đảm bảo chất lượng đầu vào" (`sources.ts:haui-threshold-2026`) công bố bảng
 * ngưỡng theo ngành nhưng KHÔNG nhắc tới điểm ưu tiên khu vực/đối tượng ở mục phương thức 3 (khác
 * mục phương thức 2/4/5, nơi công thức có "+ Điểm ưu tiên (nếu có)" tường minh) — nguồn im lặng,
 * không loại trừ cũng không xác nhận cộng vào cho mục này. Áp đúng Quy chế tuyển sinh đại học hiện
 * hành (Điều 7 Thông tư 08/2022/TT-BGDĐT còn hiệu lực 2026, giữ nguyên ở Thông tư 06/2026): KV1
 * 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0 ; nhóm ưu tiên 1 (ĐT 01-04) 2,0 ; nhóm ưu tiên 2 (ĐT 05-07)
 * 1,0 ; và điểm ưu tiên giảm tuyến tính khi tổng điểm (thang 30, chưa ưu tiên) đạt ≥ 22,5: ĐUT =
 * [(30 − tổng)/7,5] × Mức ưu tiên. Cùng judgment call đã áp dụng ở `schools/ctu`, `schools/utc`,
 * `schools/utm`, `schools/ptit`, `schools/hub`, `schools/tgu`, `schools/utt`.
 */
export const HAUI_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const HAUI_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const HAUI_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HAUI_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHauiStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HAUI_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HAUI_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHauiEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HAUI_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / HAUI_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
