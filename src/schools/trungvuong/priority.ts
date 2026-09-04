import { round2 } from '../../core/round2';

/**
 * TVUni 2025 — mục 7 "Chính sách ưu tiên" của `sources.ts:trungvuong-thongbao-387-2025` chỉ ghi
 * "Theo quy chế tuyển sinh của Bộ Giáo dục và Đào tạo" — trường KHÔNG tự công bố bảng mức điểm ưu
 * tiên khu vực/đối tượng riêng (khác trường hợp CTUET/HCA/VYA có Phụ lục riêng). Dùng khung điểm ưu
 * tiên quốc gia hiện hành (Thông tư 08/2022/TT-BGDĐT, sửa đổi bởi Thông tư 06/2025/TT-BGDĐT) làm
 * judgment call cho cả GIÁ TRỊ bảng và công thức giảm dần, cùng tiền lệ DNU/TUEBA/PVU/HUST (xem
 * `knowledgeGaps.ts`).
 */
export const TRUNGVUONG_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const TRUNGVUONG_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const TRUNGVUONG_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const TRUNGVUONG_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupTrungVuongStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? TRUNGVUONG_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? TRUNGVUONG_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateTrungVuongEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < TRUNGVUONG_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / TRUNGVUONG_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
