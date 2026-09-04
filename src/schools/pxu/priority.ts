import { round2 } from '../../core/round2';

/**
 * PXU 2026 — mục 5.3 "Điểm ưu tiên" (Thông tin tuyển sinh năm 2026, Số 041/TB-PXU, trang 9,
 * `sources.ts:pxu-thongbao-041-2026`): "Thí sinh được hưởng chính sách ưu tiên khu vực, đối tượng
 * được quy định tại Quy chế tuyển sinh đại học hiện hành cho tất cả các ngành đào tạo" + "Điểm ưu
 * tiên (khu vực, đối tượng) giảm dần từ mức 22,5 điểm để đảm bảo tổng điểm xét tuyển không vượt quá
 * điểm tối đa của thang điểm 30", kèm "Bảng điểm ưu tiên" TỰ CÔNG BỐ (KV1 = 0,75; KV2 nông thôn =
 * 0,5; KV2 = 0,25; KV3 = 0; Đối tượng 01-04 = 2,0; Đối tượng 05-07 = 1,0) và công thức giảm dần
 * (trang 10): "Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên" khi tổng điểm
 * (quy đổi thang 10/môn, tối đa 3 môn = 30) đạt từ 22,50 trở lên. Đây là nguồn CHÍNH CHỦ trực tiếp
 * (không phải judgment call), trùng khớp khung điểm ưu tiên quốc gia hiện hành vì Số 041/TB-PXU lặp
 * lại nguyên văn quy định của Quy chế tuyển sinh đại học, cao đẳng hiện hành của Bộ GD&ĐT.
 */
export const PXU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const PXU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const PXU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const PXU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupPxuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? PXU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) + (category ? PXU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0);
}

export function calculatePxuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < PXU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / PXU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
