import { round2 } from '../../core/round2';

/**
 * HCA 2025/2026 — Điểm ưu tiên khu vực/đối tượng, phương thức thi TN THPT (thang điểm 30). KHÁC
 * tiền lệ đa số trường trong campaign này (nơi trường không tự công bố bảng riêng, phải dùng
 * judgment call theo khung quốc gia) — HCA TỰ CÔNG BỐ bảng mức điểm ưu tiên và công thức giảm dần
 * NGUYÊN VĂN trong "Phụ lục 4: Cách tính điểm ưu tiên" của chính tài liệu 639-QĐ/HVCB
 * (`sources.ts:hca-de-an-2026`, trang 27-29) — giá trị trùng khung quốc gia hiện hành (Thông tư
 * 06/2026/TT-BGDĐT dẫn chiếu ở phần căn cứ ban hành) nhưng đây là con số HCA tự in trong văn bản
 * của trường, không phải suy luận judgment call.
 */
export const HCA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const HCA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const HCA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const HCA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupHcaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? HCA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? HCA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

/**
 * Phụ lục 4, mục 3: "Điểm ưu tiên đối với thí sinh đạt tổng điểm từ 22,5 điểm trở lên (đối với các
 * phương thức xét tuyển theo thang điểm 30): Điểm ưu tiên = [(30 - Tổng điểm đạt được)/7,5] × Mức
 * điểm cộng ưu tiên quy định." `rawTotal30` ở đây là M1+M2+M3 (tổng thô 3 môn, CHƯA cộng điểm
 * khuyến khích/ưu tiên) — đúng nguyên văn "Tổng điểm đạt được" của Phụ lục 4.
 */
export function calculateHcaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < HCA_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / HCA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
