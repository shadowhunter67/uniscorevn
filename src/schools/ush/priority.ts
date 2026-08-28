import { round2 } from '../../core/round2';

/**
 * USH 2026 — Điểm ưu tiên khu vực/đối tượng (Phương thức 1, mã 405, xét kết quả thi TN THPT).
 * Quyết định 58/QĐ-TDTTHCM (06/03/2026, "Thông tin tuyển sinh năm 2026", `ush-quyetdinh-58-2026`,
 * PDF chính thức USH, đọc trực tiếp qua vision) mục 2.1 công bố công thức:
 * "ĐXT = ĐVH1 + ĐVH2 + ĐNK + Điểm ưu tiên + Điểm cộng (nếu có)" — Điểm ưu tiên CỘNG vào ĐXT (điểm
 * xét tuyển, dùng để xếp hạng cạnh tranh). Mục 9 công bố riêng "Điểm ưu tiên: Đối với thí sinh đạt
 * tổng điểm từ 22,50 trở lên ... Điểm ưu tiên = [(30 - Tổng điểm đạt được)/7,50] × Mức điểm ưu
 * tiên" và mục 7.1 xác nhận "Chế độ ưu tiên theo khu vực và đối tượng: Thực hiện theo Điều 7 Quy
 * chế tuyển sinh trình độ đại học của Trường Đại học Thể dục thể thao Thành phố Hồ Chí Minh".
 *
 * QUAN TRỌNG: "ĐXT" (điểm xét tuyển, đã gồm ưu tiên) KHÁC "ngưỡng đầu vào" (mục 3.2 — ngưỡng đầu
 * vào là tổng thô 2 môn văn hóa + năng khiếu, KHÔNG cộng ưu tiên/điểm cộng, xem `eligibility.ts`).
 * Điểm ưu tiên ở đây chỉ cộng vào ĐXT (dùng để xếp hạng cạnh tranh/hiển thị tham khảo), KHÔNG làm
 * thay đổi kết quả đạt/chưa đạt ngưỡng đầu vào.
 *
 * Mức điểm ưu tiên KV/ĐT cụ thể KHÔNG được USH in lại thành bảng riêng trong văn bản này (chỉ dẫn
 * chiếu "Điều 7 Quy chế tuyển sinh trình độ đại học của Trường") — dùng mức chuẩn toàn quốc như
 * judgment call, cùng tiền lệ `schools/hcmue`, `schools/ctump`, `schools/vnua`, `schools/pntu`,
 * `schools/apd`, `schools/tbu`, `schools/uhd`, `schools/fbu`: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 /
 * KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0 / nhóm ưu tiên 2 (ĐT 05-07) 1,0.
 */
export const USH_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const USH_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const USH_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const USH_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUshStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? USH_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? USH_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateUshEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < USH_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / USH_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
