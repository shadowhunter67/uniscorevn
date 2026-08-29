import { round2 } from '../../core/round2';

/**
 * BAV 2026 — Điểm ưu tiên khu vực/đối tượng cho PTXT4 (xét điểm thi TN THPT). "Thông tin tuyển
 * sinh năm 2026" (`sources.ts:bav-admission-info-2026`, mục 7.1 "Chính sách ưu tiên chung") công bố
 * TRỰC TIẾP công thức giảm điểm ưu tiên — không phải judgment call cho phần công thức:
 *   "Điểm ưu tiên đối với thí sinh đạt tổng điểm từ 22,50 trở lên (khi quy đổi về điểm theo thang 10
 *   và theo tổng điểm 3 môn tối đa là 30) được làm tròn đến hàng phần trăm và xác định theo công
 *   thức: Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên quy định (Tổng điểm đạt
 *   được đã bao gồm điểm cộng và CHƯA tính điểm ưu tiên)."
 * Văn bản dẫn chiếu "chính sách ưu tiên chung theo quy chế tuyển sinh hiện hành" cho MỨC điểm ưu
 * tiên cụ thể theo khu vực/đối tượng (không liệt lại bằng số) — dùng đúng khung quốc gia hiện hành
 * (Điều 7 Thông tư 06/2026/TT-BGDĐT, giữ nguyên giá trị so với Thông tư 08/2022): KV1 0,75 / KV2-NT
 * 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0; nhóm ưu tiên 2 (ĐT 05-07) 1,0 — cùng judgment
 * call cho GIÁ TRỊ bảng đã áp ở `schools/haui`, `schools/ctu`, `schools/utc`, `schools/utm` v.v.
 */
export const BAV_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const BAV_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const BAV_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const BAV_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupBavStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? BAV_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? BAV_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateBavEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < BAV_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / BAV_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
