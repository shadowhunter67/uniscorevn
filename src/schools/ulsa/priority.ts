import { round2 } from '../../core/round2';

/**
 * ULSA 2026 — trường KHÔNG in lại bảng mức điểm ưu tiên khu vực/đối tượng trong thông tin tuyển
 * sinh; mục 3 chỉ ghi "Các chính sách ưu tiên trong tuyển sinh thực hiện theo Quy chế tuyển sinh
 * trình độ đại học ban hành tại Quyết định số 783/QĐ-ĐHLĐXH ngày 11/4/2025 của Hiệu trưởng"
 * (`sources.ts:ulsa-thongtin-tuyensinh-2026`) — quy chế nội bộ triển khai khung của Bộ GD&ĐT. Dùng
 * Điều 7 Thông tư 06/2026/TT-BGDĐT (`sources.ts:ulsa-priority-national-2026`) — judgment call cùng
 * tiền lệ EPU/HVU/HBU/VTTU/DLA/PVU/HTU/TUMP/NAEM.
 */
export const ULSA_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const ULSA_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const ULSA_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const ULSA_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUlsaStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? ULSA_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? ULSA_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateUlsaEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < ULSA_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / ULSA_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
