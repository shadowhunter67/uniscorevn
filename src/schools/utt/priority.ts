import { round2 } from '../../core/round2';

/**
 * UTT 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức xét điểm thi TN THPT.
 *
 * Thông báo ngưỡng UTT (`sources.ts:utt-threshold-2026`) công bố công thức TRỰC TIẾP: "Điểm xét
 * tuyển theo phương thức xét tuyển bằng kết quả thi THPT năm 2026 = Tổng điểm 03 môn thi theo tổ
 * hợp xét tuyển + Điểm Ưu tiên (Khu vực, Đối tượng)" và ghi rõ "Điểm sàn nêu trên đã bao gồm cả
 * điểm thưởng (nếu có) và điểm ưu tiên khu vực, đối tượng (nếu có)" — tức điểm ưu tiên ĐƯỢC cộng
 * vào tổng trước khi so với ngưỡng (khác CTU/UTM — không cần judgment call cho VẾ SO SÁNH). Tuy
 * nhiên nguồn KHÔNG in bảng mức điểm KV/ĐT cụ thể — áp đúng Quy chế tuyển sinh đại học hiện hành
 * (Điều 7 Thông tư 08/2022/TT-BGDĐT còn hiệu lực 2026): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0 ;
 * nhóm ưu tiên 1 (ĐT 01-04) 2,0 ; nhóm ưu tiên 2 (ĐT 05-07) 1,0 ; giảm tuyến tính khi tổng (thang
 * 30, chưa ưu tiên) đạt ≥ 22,5: ĐUT = [(30 − tổng)/7,5] × Mức ưu tiên — judgment call CHO GIÁ TRỊ
 * BẢNG, cùng tiền lệ `schools/ctu`/`schools/utc`/`schools/utm`/`schools/ptit`/`schools/hub`.
 */
export const UTT_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const UTT_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export const UTT_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UTT_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUttStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? UTT_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? UTT_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateUttEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < UTT_PRIORITY_REDUCTION_THRESHOLD_30) {
    return { effectivePriority30: input.standardPriority30, reduced: false };
  }
  const effectivePriority30 = Math.max(
    0,
    round2(((30 - pivot) / UTT_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30)
  );
  return { effectivePriority30, reduced: true };
}
