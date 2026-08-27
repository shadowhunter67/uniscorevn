import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng của Đại học Huế — nguồn: `huaf-hueuni-ttts-2026`, mục V.2.a
 * "Điểm ưu tiên" + Bảng 1 (thang điểm 30): KV1=0,75; KV2-NT=0,50; KV2=0,25; KV3=0; Đối tượng
 * 01–04=2,0; Đối tượng 05–07=1,0. Đại học Huế tự công bố đầy đủ kèm công thức giảm điểm ưu tiên.
 * Cùng bộ quy tắc với `schools/hce` / `schools/hul` / `schools/husc`.
 */
export const HUAF_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const HUAF_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupHuafStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (HUAF_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (HUAF_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

/** "Đối với thang điểm 30: Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên" —
 * áp dụng khi tổng điểm (đã gồm điểm cộng) đạt từ 22,5/30. */
export function calculateHuafPriority30(input: { academicScore30: number; standardPriority30: number }) {
  if (input.standardPriority30 === 0) return { effectivePriority30: 0, reduced: false };
  const cappedTotal = Math.min(30, input.academicScore30);
  if (cappedTotal < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - cappedTotal) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
