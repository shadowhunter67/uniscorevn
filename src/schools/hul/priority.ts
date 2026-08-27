import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng — Thông tin tuyển sinh 2026 (PDF gốc, mục V.2 "Điểm ưu tiên, điểm
 * cộng", Bảng 1, `hul-hueuni-ttts-2026`): KV1=0,75; KV2-NT=0,50; KV2=0,25; KV3=0; Đối tượng 01-04
 * (UT1)=2,0; Đối tượng 05-07 (UT2)=1,0 (thang 30). Đại học Huế TỰ CÔNG BỐ đầy đủ, kèm công thức
 * giảm điểm ưu tiên khi tổng ≥22,5/30.
 */
export const HUL_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const HUL_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupHulStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (HUL_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (HUL_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

/** ĐUT = MĐUT nếu tổng điểm <22,5/30; nếu ≥22,5: ĐUT=[(30-tổng)/7,5]×MĐUT. */
export function calculateHulPriority30(input: { academicScore30: number; standardPriority30: number }) {
  if (input.standardPriority30 === 0) return { effectivePriority30: 0, reduced: false };
  const cappedTotal = Math.min(30, input.academicScore30);
  if (cappedTotal < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - cappedTotal) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
