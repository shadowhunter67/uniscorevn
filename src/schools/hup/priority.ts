import { round2 } from '../../core/round2';

/**
 * HUP 2026 — Điểm ưu tiên khu vực/đối tượng (ĐƯT quy đổi). Nguồn: "Thông tin tuyển sinh đại học
 * năm 2026" (`sources.ts:hup-admission-2026`) — "được quy đổi theo quy định của Bộ GDĐT" (trang
 * không in bảng KV/ĐT và công thức giảm).
 *
 * Dùng đúng Quy chế tuyển sinh đại học hiện hành (Điều 7 Thông tư 08/2022/TT-BGDĐT còn hiệu lực
 * 2026): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0 ; nhóm ưu tiên 1 (ĐT 01-04) 2,0 ; nhóm ưu tiên 2
 * (ĐT 05-07) 1,0 ; ĐƯT giảm khi tổng ≥ 22,5: ĐƯT = [(30 − (ĐHL + ĐKK))/7,5] × Mức điểm ưu tiên.
 * (Cùng judgment call như `schools/vnuulis` / `schools/vnulaw` / `schools/utc`.)
 *
 * LƯU Ý ngành Dược học: thông báo ngưỡng ghi rõ điều kiện đầu vào ngành Dược học "tính tổng điểm 3
 * môn thi TN THPT ... không cộng điểm ưu tiên khu vực, đối tượng" — evaluator kiểm tra ngưỡng bằng
 * điểm học lực thô (không ưu tiên) cho MỌI ngành nên điều kiện này tự thoả; ĐƯT vẫn được cộng vào
 * ĐXT cuối để xếp hạng.
 */
export const HUP_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const HUP_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const HUP_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HUP_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHupStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HUP_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HUP_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHupEffectivePriority30(input: { academicPlusBonus30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.academicPlusBonus30);
  if (pivot < HUP_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / HUP_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
