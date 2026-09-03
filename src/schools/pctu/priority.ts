import { round2 } from '../../core/round2';

/**
 * PCTU 2025 — nguồn (`sources.ts:pctu-admission-info-2025`) công bố formula "Điểm xét tuyển = ĐM1 +
 * ĐM2 + ĐM3 + Điểm ƯT", với "Điểm ƯT: là điểm ưu tiên khu vực và ưu tiên đối tượng, được xác định
 * theo Quy chế tuyển sinh hiện hành" — xác nhận TRỰC TIẾP có cộng ưu tiên vào Điểm xét, nhưng KHÔNG
 * công bố mức cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành (Điều
 * 7 Thông tư 06/2025/TT-BGDĐT) làm judgment call cho GIÁ TRỊ bảng (cùng khung áp dụng cho HUC/HUST).
 */
export const PCTU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const PCTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const PCTU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const PCTU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupPctuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? PCTU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? PCTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculatePctuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < PCTU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / PCTU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
