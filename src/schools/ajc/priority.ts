import { round2 } from '../../core/round2';

/**
 * AJC 2026 — Điểm ưu tiên khu vực/đối tượng (Phương thức 3, xét kết quả thi TN THPT). Công thức
 * điểm xét tuyển đã xác nhận qua đối chiếu chéo nhiều nguồn (tuyensinh247, khớp knowledgeGaps đã
 * ghi từ ajc-admission-2026):
 * - Nhóm ngành 1 (có môn nhân hệ số 2, thang 40 — vd Báo chí-Xuất bản): Điểm xét tuyển = Tổng điểm
 *   3 môn sau khi nhân hệ số + [(Điểm cộng + Điểm ưu tiên)×4/3].
 * - Nhóm ngành 2/3/4 (không hệ số, thang 30): Điểm xét tuyển = Tổng điểm 3 môn + Điểm cộng + Điểm
 *   ưu tiên.
 *
 * AJC không tự công bố công khai (ở các trang đã đọc được — PDF Thông báo 293/TB-HVBCTT-ĐT trỏ
 * host nội bộ ajc-app:1002, không truy cập công khai) bảng mức điểm ưu tiên KV/ĐT bằng số cụ thể,
 * cũng không dẫn chiếu rõ ràng "Điều 7 Bộ GD&ĐT" như VNU-UMP/UHD/FBU — nhưng mọi trường ĐH VN đều
 * bắt buộc áp dụng khung điểm ưu tiên quốc gia (Thông tư 06/2026/TT-BGDĐT, Điều 7) trừ khi tự công
 * bố khác đi (AJC không có tuyên bố khác). Dùng mức chuẩn toàn quốc như judgment call, cùng tiền lệ
 * `schools/hcmue`, `schools/ctump`, `schools/vnua`, `schools/pntu`, `schools/apd`, `schools/tbu`,
 * `schools/uhd`, `schools/fbu`, `schools/ush`, `schools/vnuump`: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 /
 * KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0 / nhóm ưu tiên 2 (ĐT 05-07) 1,0; giảm tuyến tính khi tổng
 * điểm thang 30 (thang 40 quy đổi tương đương x0,75) đạt ≥ 22,5/30.
 */
export const AJC_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const AJC_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const AJC_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const AJC_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupAjcStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? AJC_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? AJC_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

/**
 * `rawTotalOnScale` là tổng thô của thí sinh trên đúng thang điểm của nhóm ngành (30 hoặc 40).
 * Công thức giảm dần được xác định theo khung quốc gia trên thang 30 — quy đổi thang 40 về thang
 * 30 tương đương (×30/40) trước khi so điểm mốc 22,5, rồi trả điểm ưu tiên hiệu lực THEO THANG 30
 * (chưa nhân hệ số 4/3 của nhóm hệ số — hệ số 4/3 áp dụng ở bước cộng vào điểm xét tuyển, xem
 * `evaluate.ts`).
 */
export function calculateAjcEffectivePriority30(input: { rawTotalOnScale: number; scale: 30 | 40; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const rawTotal30Equivalent = input.scale === 40 ? (input.rawTotalOnScale * 30) / 40 : input.rawTotalOnScale;
  const pivot = Math.min(30, rawTotal30Equivalent);
  if (pivot < AJC_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / AJC_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
