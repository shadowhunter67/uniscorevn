import { round2 } from '../../core/round2';

/**
 * HANU 2026 — Điểm ưu tiên khu vực/đối tượng, thang 40. Nguồn (`hanu-cutoff-2026` ghi chú) xác
 * nhận điểm trúng tuyển "đã bao gồm điểm cộng (nếu có), điểm ưu tiên khu vực và đối tượng theo quy
 * định hiện hành" nhưng không in bảng mức điểm cụ thể trên thang 40. HANU không tự công bố khác đi
 * khung điểm ưu tiên quốc gia (Thông tư 06/2026/TT-BGDĐT, Điều 7, định nghĩa trên thang 30) — dùng
 * mức chuẩn toàn quốc như judgment call, quy đổi sang thang 40 bằng hệ số 4/3, cùng tiền lệ đã áp
 * dụng cho `schools/ajc` (trường hợp thang 40 tương tự, nhóm Báo chí - Xuất bản).
 */
export const HANU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HANU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HANU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HANU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHanuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HANU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HANU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

/** `rawTotal40` là tổng điểm xét tuyển thô (đã nhân hệ số, đã quy đổi 50→40) trên thang 40. Công
 * thức giảm dần theo khung quốc gia áp trên thang 30 tương đương (×30/40) trước khi so mốc 22,5,
 * điểm ưu tiên hiệu lực trả về THEO THANG 30 — nhân 4/3 để quy sang thang 40 ở `evaluate.ts`. */
export function calculateHanuEffectivePriority30(input: { rawTotal40: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const rawTotal30Equivalent = (input.rawTotal40 * 30) / 40;
  const pivot = Math.min(30, rawTotal30Equivalent);
  if (pivot < HANU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HANU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
