import { round2 } from '../../core/round2';

/**
 * TLU 2025 — nguồn (`sources.ts:tlu-threshold-2025`) đăng lại điểm chuẩn PT1 (xét điểm thi TN THPT)
 * theo ngành nhưng KHÔNG có tuyên bố riêng của trường về việc điểm chuẩn đã cộng điểm ưu tiên khu
 * vực/đối tượng hay chưa. Theo định nghĩa "điểm xét tuyển" tại khung quy chế tuyển sinh hiện hành
 * (Thông tư 06/2025/TT-BGDĐT), điểm chuẩn công bố cho phương thức xét điểm thi TN THPT LUÔN LÀ điểm
 * xét tuyển ĐÃ CỘNG điểm ưu tiên (ưu tiên được cộng trước khi so với ngưỡng/điểm chuẩn) — đây là quy
 * ước chuẩn quốc gia, không phải judgment call riêng cho từng trường (cùng cách xử lý mặc định khi
 * trường không phủ nhận rõ ràng, tiền lệ `schools/tmu`, `schools/hdiu`). Mức điểm ưu tiên cụ thể
 * KHÔNG được TLU tự công bố — dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2025/TT-BGDĐT) làm
 * judgment call cho GIÁ TRỊ bảng, cùng tiền lệ `schools/hou`, `schools/phenikaa`, `schools/haui`,
 * `schools/tmu`, `schools/hdiu`.
 */
export const TLU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TLU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TLU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TLU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTluStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? TLU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? TLU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateTluEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TLU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / TLU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
