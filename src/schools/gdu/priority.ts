import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng — Đề án tuyển sinh 2026 (Số 01/2026/DA-GDU, 18/03/2026, mục 7
 * "Chính sách ưu tiên chung"): "GDU áp dụng chính sách ưu tiên chung theo Điều 7 Quy chế tuyển sinh
 * của Bộ GDĐT theo khu vực và theo đối tượng" — GDU TỰ CÔNG BỐ trực tiếp mức điểm khu vực (KV1=0.75,
 * KV2-NT=0.5, KV2=0.25, KV3=0) và công thức giảm điểm ưu tiên khi tổng điểm ≥22.5/30, nên
 * `verification: 'verified'` (không phải cross-checked như các trường chỉ ngầm định dùng chuẩn quốc
 * gia). Mức điểm ưu tiên đối tượng (UT1/UT2) không có số cụ thể trong Đề án — dùng mức chuẩn quốc gia
 * Điều 7 (UT1=2, UT2=1), cross-checked với các trường khác trong repo (`evidence.ts:gduPriorityEvidence`).
 */
export const GDU_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const GDU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupGduStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (GDU_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (GDU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

/** ĐUT = MĐUT nếu tổng điểm <22,5/30; nếu ≥22,5: ĐUT=[(30-tổng)/7,5]×MĐUT — công thức verbatim mục 7
 * Đề án tuyển sinh 2026. */
export function calculateGduPriority30(input: { academicScore30: number; standardPriority30: number }) {
  if (input.standardPriority30 === 0) return { effectivePriority30: 0, reduced: false };
  const cappedTotal = Math.min(30, input.academicScore30);
  if (cappedTotal < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - cappedTotal) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
