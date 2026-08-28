import { round2 } from '../../core/round2';

/**
 * UED 2026 — Điểm ưu tiên khu vực/đối tượng, phương thức thi TN THPT. Ảnh chính thức "ĐIỂM NGƯỠNG
 * ĐẦU VÀO ĐẠI HỌC CHÍNH QUY NĂM 2026 THEO ĐIỂM THI THPT" (tuyensinh.ued.udn.vn, tải trực tiếp qua
 * curl, đọc qua vision 2026-08-28) mục GHI CHÚ tự trích nguyên văn: "Ngưỡng đầu vào là tổng điểm 3
 * môn thi tốt nghiệp THPT theo tổ hợp xét tuyển CỘNG VỚI điểm ưu tiên khu vực, đối tượng." — đây là
 * TUYÊN BỐ TRỰC TIẾP của UED (không phải judgment call cho việc CÓ cộng điểm ưu tiên hay không).
 * Mức điểm ưu tiên KV/ĐT cụ thể KHÔNG được UED in lại thành bảng riêng — dùng mức chuẩn toàn quốc
 * làm judgment call (cùng tiền lệ `schools/ltvuni`, `schools/pntu`, `schools/uhd`, `schools/thanhdo`):
 * KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; đối tượng nhóm 1 (01-04) 2,0 / nhóm 2 (05-07) 1,0;
 * giảm tuyến tính khi tổng thô (thang 30) >= 22,5.
 */
export const UEDUDN_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const UEDUDN_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const UEDUDN_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UEDUDN_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUedudnStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? UEDUDN_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? UEDUDN_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateUedudnEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < UEDUDN_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / UEDUDN_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
