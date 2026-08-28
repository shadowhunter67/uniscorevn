import { round2 } from '../../core/round2';

/**
 * VNU-UMP 2026 — Điểm ưu tiên khu vực/đối tượng (phương thức thi TN THPT, 96% chỉ tiêu). Trang
 * tuyển sinh chính thức (`vnuump-admission-notice-2026`) công bố công thức: "điểm xét tuyển được
 * xác định bằng tổng điểm các môn thi trong tổ hợp xét tuyển theo kết quả kỳ thi tốt nghiệp THPT
 * cộng điểm cộng và điểm ưu tiên đối tượng/khu vực (nếu có)" và xác nhận rõ mức điểm ưu tiên "theo
 * Điều 7 của Quy chế tuyển sinh đại học của Bộ GD&ĐT" — tức khung điểm ưu tiên QUỐC GIA (Điều 7
 * Thông tư 06/2026/TT-BGDĐT), không phải khung riêng của trường.
 *
 * VNU-UMP không tự in lại bảng mức điểm ưu tiên KV/ĐT bằng số cụ thể trong 2 văn bản đã đọc được
 * (chỉ dẫn chiếu Điều 7 Bộ GD&ĐT) — dùng mức chuẩn toàn quốc như judgment call, cùng tiền lệ
 * `schools/hcmue`, `schools/ctump`, `schools/vnua`, `schools/pntu`, `schools/apd`, `schools/tbu`,
 * `schools/uhd`, `schools/fbu`, `schools/ush`: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu
 * tiên 1 (ĐT 01-04) 2,0 / nhóm ưu tiên 2 (ĐT 05-07) 1,0; giảm tuyến tính khi tổng thô (thang 30)
 * ≥ 22,5 (Điều 7 khoản 4 quốc gia).
 */
export const VNUUMP_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VNUUMP_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VNUUMP_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VNUUMP_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVnuumpStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? VNUUMP_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VNUUMP_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateVnuumpEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VNUUMP_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / VNUUMP_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
