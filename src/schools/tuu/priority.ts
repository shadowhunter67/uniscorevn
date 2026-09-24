import { round2 } from '../../core/round2';

/** TUU 2026 — Điểm ưu tiên khu vực/đối tượng. Đề án tuyển sinh chính chủ (`tuu-admission-info-2026`)
 * nêu công thức "ĐXT = M1+M2+M3+Điểm cộng (nếu có)+Điểm ưu tiên" cho các phương thức chị em (học
 * bạ/ĐGNL) trong CÙNG đề án; mục phương thức thi TN THPT không lặp lại công thức này nhưng cũng
 * KHÔNG có tuyên bố loại trừ điểm ưu tiên — áp dụng judgment call theo khung quốc gia (Điều 7 TT
 * 06/2026/TT-BGDĐT), cùng tiền lệ đã dùng ở `schools/hanu`/`schools/thanhdo` khi nguồn im lặng đúng
 * điểm này (không phải nguồn mơ hồ toàn bộ công thức, như trường hợp NTU đã loại). */
export const TUU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TUU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TUU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TUU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTuuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? TUU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? TUU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateTuuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TUU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / TUU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
