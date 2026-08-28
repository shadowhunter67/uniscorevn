import { round2 } from '../../core/round2';

/**
 * ThanhDo 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức thi TN THPT. Trang chính thức
 * thanhdo.edu.vn (bài công bố điểm chuẩn 2026, `thanhdo-cutoff-2026`) tự trích: "Mức điểm trúng
 * tuyển... được xác định theo tổng điểm của 03 bài thi/môn thi trong tổ hợp xét tuyển, theo thang
 * điểm 30, không nhân hệ số, không tính điểm cộng" — CHỈ loại trừ điểm cộng (school-specific bonus,
 * vd IELTS/giải thưởng), KHÔNG đề cập điểm ưu tiên khu vực/đối tượng (mandatory theo Thông tư
 * 06/2026/TT-BGDĐT, áp dụng cho mọi trường ĐH công lập/tư thục xét theo kết quả thi TN THPT trừ khi
 * có tuyên bố khác — văn bản ThanhDo im lặng đúng 1 điểm này trong khi xác nhận đầy đủ công thức +
 * bảng ngưỡng 14/14 ngành). Judgment call: áp dụng mức chuẩn toàn quốc (cùng tiền lệ
 * `schools/ltvuni`, `schools/pntu`, `schools/uhd`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; đối
 * tượng nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0; giảm tuyến tính khi tổng thô (thang 30) >= 22,5.
 */
export const THANHDO_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const THANHDO_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const THANHDO_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const THANHDO_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupThanhdoStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? THANHDO_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? THANHDO_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateThanhdoEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < THANHDO_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / THANHDO_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
