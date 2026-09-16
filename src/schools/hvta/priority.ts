import { round2 } from '../../core/round2';

/**
 * HVTA 2026 — Điểm ưu tiên khu vực/đối tượng, CHỈ hiển thị tham khảo (không dùng để so ngưỡng —
 * nguồn không nói rõ ngưỡng 18,0/30 đã gồm ưu tiên hay chưa, judgment call giữ RAW cho phần so
 * ngưỡng, cùng tiền lệ `schools/tbdu`). Mục 5.b PDF chỉ nói "Điểm cộng ưu tiên theo khu vực; Điểm
 * cộng ưu tiên theo đối tượng chính sách thực hiện theo quy định của Quy chế tuyển sinh" — không in
 * bảng mức cụ thể ⇒ áp Điều 7 Thông tư 06/2026/TT-BGDĐT.
 */
export const HVTA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HVTA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HVTA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HVTA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHvtaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? HVTA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? HVTA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateHvtaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HVTA_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HVTA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
