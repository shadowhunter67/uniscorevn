import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng — Thông tin tuyển sinh 2026 (PDF chính thức UEF), mục "7. Chính
 * sách ưu tiên: a) Điểm ưu tiên theo khu vực, đối tượng" (Quyết định 202/QĐ-UEF, 26/02/2026, căn cứ
 * Điều 7 quy chế tuyển sinh của Trường): KV1=0,75; KV2-NT=0,50; KV2=0,25; KV3=0 và mục "4." (điểm ưu
 * tiên đối tượng UT1=2,00/UT2=1,00, công thức giảm điểm ưu tiên khi tổng ≥22,50/30) — UEF TỰ CÔNG BỐ
 * đầy đủ bảng số (kể cả bảng tổng hợp khu vực×đối tượng), nên `verification: 'verified'`.
 */
export const UEF_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const UEF_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupUefStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (UEF_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (UEF_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

/** ĐUT = MĐUT nếu tổng điểm <22,5/30; nếu ≥22,5: ĐUT=[(30-tổng)/7,5]×MĐUT — công thức verbatim mục 4
 * (áp dụng chung cho phương thức 100/200, thang 30). */
export function calculateUefPriority30(input: { academicScore30: number; standardPriority30: number }) {
  if (input.standardPriority30 === 0) return { effectivePriority30: 0, reduced: false };
  const cappedTotal = Math.min(30, input.academicScore30);
  if (cappedTotal < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - cappedTotal) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
