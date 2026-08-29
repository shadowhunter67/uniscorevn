import { round2 } from '../../core/round2';

/**
 * CMCU 2026 — Điểm ưu tiên khu vực/đối tượng cho phương thức xét điểm thi tốt nghiệp THPT (thang
 * 40, môn chính nhân hệ số 2). Thông báo điểm sàn CMCU (`sources.ts:cmcu-threshold-2026`) hoàn
 * toàn im lặng về điểm ưu tiên khu vực/đối tượng — áp khung quốc gia hiện hành (Điều 7 Thông tư
 * 06/2026/TT-BGDĐT, judgment call), quy đổi sang thang 40 bằng hệ số ×4/3 (cùng cách CMCU tự nhân
 * hệ số 2 môn chính — tức thang 40 = thang 30 × 4/3), cùng tiền lệ `schools/ajc` (trường hợp nhóm
 * ngành hệ số 2/thang 40 của AJC).
 */
export const CMCU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const CMCU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const CMCU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const CMCU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupCmcuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? CMCU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? CMCU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

/**
 * `raw40` là tổng thô của thí sinh trên thang 40 (môn chính x2 + 2 môn bất kỳ). Công thức giảm dần
 * điểm ưu tiên theo khung quốc gia áp dụng trên thang 30 tương đương (×30/40), sau đó điểm ưu tiên
 * hiệu lực được quy đổi ngược về thang 40 (×4/3) để cộng vào điểm xét tuyển hiển thị.
 */
export function calculateCmcuEffectivePriority40(input: { raw40: number; standardPriority30: number }): {
  effectivePriority40: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority40: 0, reduced: false };
  const raw30Equivalent = (input.raw40 * 30) / 40;
  const pivot = Math.min(30, raw30Equivalent);
  if (pivot < CMCU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority40: round2(input.standardPriority30 * (4 / 3)), reduced: false };
  }
  const effectivePriority30 = Math.max(0, ((30 - pivot) / CMCU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30);
  return { effectivePriority40: round2(effectivePriority30 * (4 / 3)), reduced: true };
}
