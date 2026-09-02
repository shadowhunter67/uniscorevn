import { round2 } from '../../core/round2';

/**
 * QNU 2025 — nguồn (`sources.ts:qnu-threshold-2025`/`qnu-threshold-secondary-2025`) trích công
 * thức "ĐXT = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + Điểm ưu tiên" — điểm chuẩn công bố là mức ĐXT
 * tối thiểu trúng tuyển nên ĐÃ bao hàm điểm ưu tiên theo định nghĩa công thức (không cần judgment
 * call cho việc CÓ áp dụng, giống VNU-UEB/VNU-UED/TVU/HPMU). Mức điểm ưu tiên cụ thể theo KV/ĐT
 * KHÔNG được trường công bố riêng — dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2025/TT-
 * BGDĐT) làm judgment call cho GIÁ TRỊ bảng.
 */
export const QNU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const QNU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const QNU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const QNU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupQnuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? QNU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? QNU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateQnuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < QNU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / QNU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
