import { round2 } from '../../core/round2';

/**
 * FPFU 2026 (Trường Đại học Phòng cháy Chữa cháy, hệ dân sự) — Điểm ưu tiên khu vực/đối tượng,
 * phương thức xét kết quả thi TN THPT (4 tổ hợp A00/A01/D07/D01). Điểm ưu tiên hệ dân sự thực hiện
 * theo Điều 7 Thông tư số 06/2026/TT-BGDĐT ngày 15/02/2026 của Bộ Giáo dục và Đào tạo (dẫn chiếu
 * trực tiếp trên trang tuyển sinh chính thức daihocpccc.bocongan.gov.vn/?p=210262, xác nhận qua
 * kết quả tra cứu — trang gốc không fetch trực tiếp được từ môi trường mạng research này, xem
 * `fpfu-primary-source-unverified` trong knowledgeGaps). Điểm ưu tiên khu vực CHỈ áp dụng cho thí
 * sinh tốt nghiệp THPT năm 2026 hoặc 2025 (không áp dụng cho thí sinh tốt nghiệp từ 2024 trở về
 * trước) — hệ dân sự tuyển thí sinh tốt nghiệp năm hiện hành nên điều kiện này coi như luôn thoả.
 * Mức điểm ưu tiên KV/ĐT cụ thể là mức chuẩn toàn quốc (judgment call, cùng tiền lệ `schools/uhd`,
 * `schools/hcmue`, `schools/ltvuni`): KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1
 * (ĐT 01-04) 2,0 / nhóm ưu tiên 2 (ĐT 05-07) 1,0; giảm tuyến tính khi tổng thô (thang 30) ≥ 22,5.
 */
export const FPFU_PRIORITY_REGION_POINTS_30: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
export const FPFU_PRIORITY_CATEGORY_POINTS_30: Record<string, number> = { UT1: 2, UT2: 1 };
export const FPFU_PRIORITY_REDUCTION_THRESHOLD_30 = 22.5;
export const FPFU_PRIORITY_REDUCTION_DIVISOR_30 = 7.5;

export function lookupFpfuStandardPriority30(region: string | undefined, category: string | undefined): number {
  return (
    (region ? FPFU_PRIORITY_REGION_POINTS_30[region] ?? 0 : 0) +
    (category ? FPFU_PRIORITY_CATEGORY_POINTS_30[category] ?? 0 : 0)
  );
}

export function calculateFpfuEffectivePriority30(input: { rawTotal30: number; standardPriority30: number }): {
  effectivePriority30: number;
  reduced: boolean;
} {
  if (input.standardPriority30 <= 0) return { effectivePriority30: 0, reduced: false };
  const pivot = Math.min(30, input.rawTotal30);
  if (pivot < FPFU_PRIORITY_REDUCTION_THRESHOLD_30) return { effectivePriority30: input.standardPriority30, reduced: false };
  const effectivePriority30 = Math.max(0, round2(((30 - pivot) / FPFU_PRIORITY_REDUCTION_DIVISOR_30) * input.standardPriority30));
  return { effectivePriority30, reduced: true };
}
