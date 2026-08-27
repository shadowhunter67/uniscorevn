import { round2 } from '../../core/round2';

/**
 * Điểm ưu tiên khu vực/đối tượng — bài hướng dẫn "Đối tượng ưu tiên, điểm ưu tiên theo quy chế
 * tuyển sinh đại học năm 2026" tự đăng trên tuyensinh.nctu.edu.vn (11/03/2026,
 * `nctu-priority-guide-2026`), trích dẫn khoản 4 Điều 7 Thông tư 06/2026/TT-BGDĐT: bảng đầy đủ
 * KV1=0,75/KV2-NT=0,50/KV2=0,25/KV3=0, UT1=2,00/UT2=1,00, kèm công thức giảm điểm ưu tiên khi tổng
 * ≥22,50/30. Đây là bài hướng dẫn chung (không phải văn bản thông báo riêng của trường) nhưng đăng
 * trực tiếp trên domain chính thức tuyensinh.nctu.edu.vn nên vẫn coi là nguồn tự công bố.
 */
export const NCTU_PRIORITY_REGION_POINTS_30: Record<string, number> = {
  KV1: 0.75,
  'KV2-NT': 0.5,
  KV2: 0.25,
  KV3: 0,
};

export const NCTU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = {
  UT1: 2,
  UT2: 1,
};

export function lookupNctuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (region ? (NCTU_PRIORITY_REGION_POINTS_30[region] ?? 0) : 0) + (category ? (NCTU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0) : 0);
}

/** ĐUT = MĐUT nếu tổng điểm <22,5/30; nếu ≥22,5: ĐUT=[(30-tổng)/7,5]×MĐUT. */
export function calculateNctuPriority30(input: { academicScore30: number; standardPriority30: number }) {
  if (input.standardPriority30 === 0) return { effectivePriority30: 0, reduced: false };
  const cappedTotal = Math.min(30, input.academicScore30);
  if (cappedTotal < 22.5) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - cappedTotal) / 7.5) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
