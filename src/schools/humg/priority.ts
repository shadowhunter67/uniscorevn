import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng HUMG 2026. Nguồn `humg-admission-2026` chỉ nêu:
 *   "Mức điểm ưu tiên gồm: Khu vực, Đối tượng chính sách ưu tiên"
 *   "Điểm ưu tiên (đối với thí sinh có tổng điểm đạt được theo tổ hợp ≥ 22.5)
 *      = [(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên"
 * KHÔNG in bảng mức KV/ĐT ⇒ dùng đúng Quy chế tuyển sinh hiện hành (Điều 7 Thông tư
 * 08/2022/TT-BGDĐT còn hiệu lực 2026): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1
 * (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0. Cùng judgment call như `schools/utc` /
 * `schools/hup` / `schools/vnuulis`. Công thức giảm điểm ưu tiên (≥ 22,5) được HUMG in nguyên văn.
 */
export const HUMG_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const HUMG_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupHumgStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (HUMG_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (HUMG_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

/** Pivot = "Tổng điểm đạt được theo tổ hợp" = tổng thô 3 môn (không gồm điểm cộng, theo đúng câu
 * chữ nguồn). Giảm khi pivot ≥ 22,5/30. */
export function calculateHumgPriority30(input: { thptTotal30: number; standardPriority30: number }) {
  if (input.standardPriority30 === 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.thptTotal30);
  if (pivot < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
