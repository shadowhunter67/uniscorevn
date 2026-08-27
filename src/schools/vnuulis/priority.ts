import { round2 } from '../../core/round2';

/**
 * VNU-ULIS 2026 điểm ưu tiên khu vực/đối tượng, thang 30 — trích nguyên văn từ thông báo tuyển
 * sinh chính thức `vnuulis-admission-notice-2026` (https://ulis.vnu.edu.vn/tbtsdh26/):
 * "Khu vực 1 (KV1): 0,75 điểm; Khu vực 2 nông thôn (KV2-NT): 0,5 điểm; Khu vực 2 (KV2): 0,25 điểm;
 * Khu vực 3 (KV3): không được tính điểm ưu tiên" và "Nhóm đối tượng UT1 (01-04): 2,0 điểm; Nhóm
 * đối tượng UT2 (05-07): 1,0 điểm". Trần: "Tổng điểm cộng và điểm ưu tiên: không vượt quá 10% mức
 * điểm tối đa của thang điểm 30 (tối đa 3.0 điểm)".
 *
 * Công thức giảm khi thí sinh đạt tổng điểm từ 22,5 trở lên: thông báo ULIS ghi "được xác định
 * theo quy định của Bộ GD&ĐT tại Quy chế tuyển sinh đại học hiện hành" — tức Điều 7 Thông tư
 * 08/2022/TT-BGDĐT (còn hiệu lực 2026): ĐUT = [(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên.
 * Công thức này được in nguyên văn trên trang tuyển sinh của Trường ĐH Luật cùng hệ ĐHQGHN
 * (`vnulaw`), xác nhận cách áp dụng chung trong hệ.
 */
export const VNUULIS_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const VNUULIS_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const VNUULIS_PRIORITY_BONUS_CAP_30 = 3;
export const VNUULIS_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VNUULIS_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVnuulisStandardPriority30(region: string | undefined, category: string | undefined): number {
  const raw =
    (region ? VNUULIS_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VNUULIS_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
  return Math.min(VNUULIS_PRIORITY_BONUS_CAP_30, raw);
}

/**
 * ĐUT hiệu dụng. Nếu điểm học lực (đã quy đổi /30, chưa cộng ưu tiên) < 22,5: giữ nguyên mức ưu
 * tiên. Nếu ≥ 22,5: ĐUT = [(30 − điểm học lực)/7,5] × mức ưu tiên, làm tròn 2 chữ số.
 * (Phương thức thi THPT của ULIS không có điểm khuyến khích/thưởng nên "Tổng điểm đạt được" trong
 * công thức Bộ chính là điểm học lực đã quy đổi.)
 */
export function calculateVnuulisEffectivePriority30(input: { academicScore30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.academicScore30);
  if (pivot < VNUULIS_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / VNUULIS_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
