import { round2 } from '../../core/round2';

/**
 * FBU 2026 — Điểm ưu tiên khu vực/đối tượng (Phương thức 1, mã 100, xét kết quả thi TN THPT).
 * Quyết định 99/QĐ-ĐHTNH (05/03/2026, "Thông tin tuyển sinh năm 2026", `fbu-qd99-2026`, PDF chính
 * thức FBU, đọc trực tiếp qua vision) mục 2.1.2 công bố công thức:
 * "Điểm xét tuyển = [((Điểm môn 1 × 2) + Điểm môn 2 + Điểm môn 3)/4] × 3 + ĐKK(nếu có) +
 * ĐXT(nếu có) + ĐƯT(nếu có)" — ĐƯT (điểm ưu tiên) CỘNG vào tổng trước khi so ngưỡng. Cùng mục:
 * "ĐƯT: điểm ưu tiên khu vực, đối tượng theo Quy chế tuyển sinh hiện hành. Nếu Điểm xét tuyển >
 * 22,5 thì ĐƯT giảm dần theo công thức: ĐƯT = [(30 – Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên
 * khu vực, đối tượng." Mục 7 (trang cuối) xác nhận "Áp dụng chính sách ưu tiên chung theo Quy chế
 * tuyển sinh đại học năm 2026 của Bộ GD&ĐT và của Trường" — tức khung điểm ưu tiên quốc gia (Điều 7
 * Thông tư 06/2026/TT-BGDĐT).
 *
 * Mức điểm ưu tiên KV/ĐT cụ thể KHÔNG được FBU in lại thành bảng riêng trong văn bản này — dùng
 * mức chuẩn toàn quốc như judgment call, cùng tiền lệ `schools/hcmue`, `schools/ctump`,
 * `schools/vnua`, `schools/pntu`, `schools/apd`, `schools/tbu`, `schools/uhd`: KV1 0,75 / KV2-NT
 * 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0 / nhóm ưu tiên 2 (ĐT 05-07) 1,0.
 */
export const FBU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const FBU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const FBU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const FBU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupFbuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? FBU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? FBU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateFbuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < FBU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / FBU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
