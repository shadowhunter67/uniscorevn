import { round2 } from '../../core/round2';

/**
 * MKU 2026 — trường KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng riêng trong Quyết định
 * điểm chuẩn/thông báo tuyển sinh đã đọc được (chỉ nêu điều kiện sàn "tổng điểm 3 môn + điểm ưu tiên
 * khu vực/đối tượng phải đạt từ 13 điểm trở lên", không phải bảng mức). Dùng khung điểm ưu tiên quốc
 * gia hiện hành (Điều 7/8 Quy chế tuyển sinh, Thông tư 06/2026/TT-BGDĐT mà chính Quyết định 3018/QĐ-
 * ĐHCL dẫn chiếu ở phần căn cứ ban hành) làm judgment call cho GIÁ TRỊ bảng, cùng tiền lệ DLA/BMTU/
 * DNU/TUEBA/PVU/HTU/TUMP/NAEM.
 */
export const MKU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const MKU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const MKU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const MKU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupMkuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? MKU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? MKU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateMkuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < MKU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / MKU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
