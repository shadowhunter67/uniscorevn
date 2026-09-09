import { round2 } from '../../core/round2';

/**
 * EPU 2026 — trường KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng riêng. Thông báo
 * 466/TB-ĐHĐL (mục II.2.1, `sources.ts:epu-thongtin-tuyensinh-466-2026`) chỉ ghi: "(Đối tượng ưu
 * tiên và khu vực ưu tiên áp dụng theo Quy chế tuyển sinh trình độ đại học hiện hành của Bộ GD&ĐT;
 * Các thí sinh đã tốt nghiệp từ năm 2024 trở về trước không được cộng điểm ưu tiên)". Dùng khung
 * quốc gia Điều 7 Thông tư 06/2026/TT-BGDĐT (`sources.ts:epu-priority-national-2026`) — judgment
 * call cùng tiền lệ HVU/HBU/VTTU/DLA/PVU/HTU/TUMP/NAEM.
 *
 * Điều kiện "tốt nghiệp từ 2024 trở về trước không được cộng điểm ưu tiên" KHÔNG mô hình hoá được
 * (hồ sơ dùng chung `ApplicantProfile` không có trường năm tốt nghiệp) — xem
 * `knowledgeGaps.ts:epu-graduation-year-priority-gate-not-modeled`.
 */
export const EPU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const EPU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const EPU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const EPU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupEpuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? EPU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? EPU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculateEpuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < EPU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / EPU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
