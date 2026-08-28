import { round2 } from '../../core/round2';

/**
 * APD 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức xét kết quả thi TN THPT. Thông báo
 * 180/TB-HVCSPT (02/07/2026, "Về ngưỡng đảm bảo chất lượng và phương án quy đổi mức điểm chuẩn
 * tương đương giữa các phương thức tuyển sinh đại học chính quy năm 2026", `apd-threshold-notice-180-2026`,
 * PDF chính thức đọc trực tiếp qua vision) trích nguyên văn: "Mức điểm ngưỡng đảm bảo chất lượng
 * của tất cả các phương thức xét tuyển bao gồm cả điểm cộng, điểm ưu tiên đối tượng, khu vực (nếu
 * có)" — nghĩa là điểm ưu tiên CỘNG vào tổng điểm trước khi so với ngưỡng theo cơ sở đào tạo,
 * không chỉ hiển thị tham khảo. Thông báo không in lại bảng mức điểm ưu tiên cụ thể (chỉ khẳng
 * định nguyên tắc trên) và không công bố điểm cộng cụ thể cho 2026 — model điểm cộng = 0 (chưa có
 * căn cứ số liệu, xem knowledgeGaps).
 * Mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call), cùng tiền lệ `schools/hcmue`,
 * `schools/ctump`, `schools/vnua`, `schools/pntu`, `schools/uhd`: KV1 0,75 / KV2-NT 0,5 / KV2 0,25
 * / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0 / nhóm ưu tiên 2 (ĐT 05-07) 1,0; giảm tuyến tính khi tổng
 * điểm (thang 30, chưa ưu tiên) đạt ≥ 22,5 theo Điều 7 Thông tư 08/2022/TT-BGDĐT (còn hiệu lực
 * 2026 qua TT 06/2025 sửa đổi).
 */
export const APD_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const APD_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const APD_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const APD_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupApdStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? APD_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? APD_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateApdEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < APD_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / APD_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
