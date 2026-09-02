import { round2 } from '../../core/round2';

/**
 * QNamU 2025 — nguồn (`sources.ts:qnamu-formula-2025`, Vietjack.com trích đề án tuyển sinh trường)
 * trích nguyên văn: "Điểm ưu tiên quy đổi = [(30 - tổng điểm 3 môn)/7,5] x Tổng điểm ưu tiên thông
 * thường", "Điểm ưu tiên quy đổi áp dụng với thí sinh đạt tổng điểm 3 môn từ 22,5 điểm trở lên" —
 * KHỚP TUYỆT ĐỐI với khung quốc gia (Điều 7 Thông tư 06/2025/TT-BGDĐT) đã dùng cho QNU/QBU, nên cơ
 * chế giảm dần (ngưỡng 22,5, số chia 7,5) là XÁC NHẬN TRỰC TIẾP từ nguồn trường, không phải judgment
 * call. Mức điểm ưu tiên CƠ BẢN theo KV/ĐT (trước khi giảm dần) KHÔNG được trường công bố riêng —
 * dùng khung quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng.
 */
export const QNAMU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const QNAMU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const QNAMU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const QNAMU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupQnamuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? QNAMU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? QNAMU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateQnamuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < QNAMU_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / QNAMU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
