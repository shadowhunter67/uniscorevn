import { round2 } from '../../core/round2';

/**
 * UTM 2026 — Điểm ưu tiên khu vực/đối tượng cho phương thức xét điểm thi tốt nghiệp THPT.
 *
 * Thông báo ngưỡng đầu vào UTM (`sources.ts:utm-threshold-2026`) chỉ công bố mức điểm sàn ("Các
 * ngành đào tạo: từ 15 điểm") — KHÔNG nhắc tới điểm ưu tiên khu vực/đối tượng theo hướng nào (không
 * loại trừ trực tiếp như Đại Nam, cũng không xác nhận cộng vào). Áp đúng Quy chế tuyển sinh đại học
 * hiện hành (Điều 7 Thông tư 08/2022/TT-BGDĐT còn hiệu lực 2026, giữ nguyên ở Thông tư 06/2026):
 * KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0 ; nhóm ưu tiên 1 (ĐT 01-04) 2,0 ; nhóm ưu tiên 2 (ĐT
 * 05-07) 1,0 ; và điểm ưu tiên giảm tuyến tính khi tổng điểm (thang 30, chưa ưu tiên) đạt ≥ 22,5:
 * ĐUT = [(30 − tổng)/7,5] × Mức ưu tiên. Cùng judgment call đã áp dụng ở `schools/ctu`,
 * `schools/utc`, `schools/ptit`, `schools/hub`, `schools/tgu`.
 */
export const UTM_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const UTM_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const UTM_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UTM_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUtmStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? UTM_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? UTM_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateUtmEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < UTM_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / UTM_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
