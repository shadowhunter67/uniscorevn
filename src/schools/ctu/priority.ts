import { round2 } from '../../core/round2';

/**
 * CTU 2026 — Điểm ưu tiên khu vực/đối tượng cho phương thức xét điểm thi tốt nghiệp THPT.
 *
 * Thông báo ngưỡng đầu vào CTU (`sources.ts:ctu-quality-threshold-2026`, footnote [2]) chỉ nêu
 * "Điểm ưu tiên bao gồm: Khu vực tuyển sinh và Đối tượng ưu tiên" — KHÔNG in bảng số riêng và
 * KHÔNG có điểm cộng thành tích cho phương thức thi THPT. Áp dụng đúng Quy chế tuyển sinh đại học
 * hiện hành (Điều 7 Thông tư 08/2022/TT-BGDĐT còn hiệu lực 2026, giữ nguyên ở dự thảo/Thông tư
 * 06/2026): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0 ; nhóm ưu tiên 1 (ĐT 01-04) 2,0 ; nhóm ưu
 * tiên 2 (ĐT 05-07) 1,0 ; và điểm ưu tiên giảm tuyến tính khi tổng điểm (thang 30, chưa ưu tiên)
 * đạt ≥ 22,5: ĐUT = [(30 − tổng)/7,5] × Mức ưu tiên. Cùng judgment call đã áp dụng ở
 * `schools/utc`, `schools/ptit`, `schools/hub`.
 */
export const CTU_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const CTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const CTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const CTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupCtuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? CTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? CTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateCtuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < CTU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / CTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
