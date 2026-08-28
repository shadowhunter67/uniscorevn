import { round2 } from '../../core/round2';

/**
 * UFLS 2026 — Điểm ưu tiên khu vực/đối tượng. Thông tin tuyển sinh năm 2026 (bản FINAL 02/6/2026,
 * PDF chính thức đọc trực tiếp qua pdftotext, `uflsudn-admission-info-2026`) mục 5.2 xác nhận:
 * "Điểm ưu tiên: Theo quy định trong 'Quy chế tuyển sinh các ngành đào tạo trình độ đại học và
 * ngành Giáo dục Mầm non trình độ cao đẳng' ban hành theo Thông tư 06/2026/TT-BGDĐT ngày
 * 15/02/2026" + công thức giảm dần khi tổng điểm quy đổi ≥ 22,50/30: "Điểm ưu tiên = [(30 −
 * (điểm quy đổi + điểm cộng))/7,5] × Mức điểm ưu tiên theo quy định". Ảnh "Ngưỡng đầu vào xét
 * tuyển đại học chính quy năm 2026" (`uflsudn-quality-threshold-2026`, đọc qua vision) xác nhận
 * riêng cho 4 ngành đào tạo giáo viên (Sư phạm tiếng Anh/Pháp/Trung Quốc/Hàn Quốc): "ngưỡng đầu
 * vào là tổng điểm 3 môn xét tuyển theo điểm thi THPT CỘNG với điểm ưu tiên khu vực, đối tượng"
 * (KHÔNG cộng điểm cộng ở bước so ngưỡng này, dù trường có bảng điểm cộng riêng cho hồ sơ khác).
 * Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, cùng tiền lệ `schools/uhd`,
 * `schools/ltvuni`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0 /
 * nhóm ưu tiên 2 (ĐT 05-07) 1,0; giảm tuyến tính khi tổng thô (thang 30) ≥ 22,5.
 */
export const UFLSUDN_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const UFLSUDN_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const UFLSUDN_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const UFLSUDN_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupUflsudnStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? UFLSUDN_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? UFLSUDN_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateUflsudnEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < UFLSUDN_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / UFLSUDN_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
