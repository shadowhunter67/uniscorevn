import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng của Đại học Huế — nguồn: "Thông tin tuyển sinh đại học hệ chính
 * quy năm 2026 của Đại học Huế" (`husc-hueuni-ttts-2026`), mục V.2.a "Điểm ưu tiên" + Bảng 1
 * "Bảng điểm ưu tiên" (thang điểm 30): KV1=0,75; KV2 nông thôn (KV2-NT)=0,50; KV2=0,25; KV3=0
 * (không được tính); Đối tượng 01–04 (nhóm ưu tiên 1)=2,0; Đối tượng 05–07 (nhóm ưu tiên 2)=1,0.
 * Đại học Huế TỰ CÔNG BỐ đầy đủ bảng này kèm công thức giảm điểm ưu tiên, nên `verification:
 * 'verified'`. Cùng bộ quy tắc với `schools/hce` và `schools/hul`.
 */
export const HUSC_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const HUSC_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupHuscStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (HUSC_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (HUSC_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

/**
 * "Điểm ưu tiên (khu vực, đối tượng) giảm dần từ mức 22,5 điểm ... Đối với thang điểm 30: Điểm ưu
 * tiên = [(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên" — trích verbatim mục V.2.a. Áp
 * dụng khi tổng điểm (đã gồm điểm cộng) đạt từ 22,5/30.
 */
export function calculateHuscPriority30(input: { academicScore30: number; standardPriority30: number }) {
  if (input.standardPriority30 === 0) return { effectivePriority30: 0, reduced: false };
  const cappedTotal = Math.min(30, input.academicScore30);
  if (cappedTotal < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - cappedTotal) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
