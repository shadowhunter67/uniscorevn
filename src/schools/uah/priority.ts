import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng — Thông báo số 391/TB-HĐTS (27/03/2026), mục 6 "Chính sách ưu tiên
 * trong tuyển sinh" (KV1=0,75; KV2-NT=0,50; KV2=0,25; KV3=0, tự công bố trực tiếp) và mục 7 (UT1=2,00;
 * UT2=1,00 + công thức giảm điểm ưu tiên khi tổng điểm ≥22,50/30) — UAH TỰ CÔNG BỐ đầy đủ, nên
 * `verification: 'verified'`.
 */
export const UAH_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const UAH_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupUahStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (UAH_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (UAH_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

/** ĐUT = MĐUT nếu tổng điểm <22,5/30; nếu ≥22,5: ĐUT=[(30-tổng)/7,5]×MĐUT — công thức verbatim mục 7
 * Thông báo 391/TB-HĐTS. */
export function calculateUahPriority30(input: { academicScore30: number; standardPriority30: number }) {
  if (input.standardPriority30 === 0) return { effectivePriority30: 0, reduced: false };
  const cappedTotal = Math.min(30, input.academicScore30);
  if (cappedTotal < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - cappedTotal) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
