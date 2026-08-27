import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng VMU 2026 (PT1). Thông báo 1329/TB-ĐHHHVN chỉ ghi "+ điểm ưu tiên
 * (nếu có)" và dẫn chiếu "quy chế tuyển sinh hiện hành của Bộ GDĐT" (Thông tư 06/2026/TT-BGDĐT).
 * ⇒ dùng đúng Điều 7 quy chế hiện hành: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1
 * (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0; điểm ưu tiên giảm tuyến tính khi tổng điểm (theo
 * tổ hợp) ≥ 22,5/30: ĐUT = [(30 − Tổng điểm)/7,5] × Mức. Cùng judgment call như `schools/utc` /
 * `schools/hup` / `schools/vnuulis` / `schools/humg`.
 */
export const VMU_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const VMU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupVmuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (VMU_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (VMU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

export function calculateVmuPriority30(input: { thptTotal30: number; standardPriority30: number }) {
  if (input.standardPriority30 === 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.thptTotal30);
  if (pivot < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
