import { round2 } from '../../core/round2';

/**
 * VNUA 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức xét kết quả thi TN THPT. Thông báo
 * tuyển sinh chính thức (`vnua-admission-notice-2026`) KHÔNG in bảng số điểm ưu tiên riêng, nhưng
 * tự trích nguyên văn 2 quy tắc xác nhận đúng khung điểm ưu tiên toàn quốc (Điều 7 TT 06/2026):
 *   "Điểm ưu tiên theo khu vực và theo đối tượng thực hiện theo quy định của Bộ GD&ĐT: Mức chênh
 *   lệch điểm trúng tuyển giữa các nhóm đối tượng là 1,0 điểm và giữa các khu vực kế tiếp là 0,25
 *   điểm." và công thức giảm dần: "Điểm ưu tiên = [(30 - Tổng điểm đạt được)/7,5] x Mức điểm ưu
 *   tiên quy định" (áp dụng khi tổng điểm ≥ 22,5/30).
 * Giá trị tuyệt đối từng mức (KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; ĐT nhóm 1 2,0 / nhóm 2
 * 1,0) khớp đúng mức chênh lệch trên — dùng làm mức chuẩn toàn quốc (judgment call, cùng tiền lệ
 * `schools/hcmue`, `schools/ctump`, `schools/tbdu`, `schools/ctu`, `schools/huce`).
 *
 * Ngưỡng đầu vào công bố riêng (`vnua-threshold-notice-2026`, bảng tb1.jpg) IM LẶNG về việc đã
 * gồm điểm ưu tiên hay chưa — so TỔNG THÔ với ngưỡng (judgment call, cùng tiền lệ HCMUE); điểm ưu
 * tiên chỉ hiển thị ĐXT tham khảo, KHÔNG dùng để so ngưỡng.
 */
export const VNUA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const VNUA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const VNUA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const VNUA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupVnuaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? VNUA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? VNUA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateVnuaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < VNUA_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / VNUA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
