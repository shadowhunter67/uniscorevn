import { round2 } from '../../core/round2';

/**
 * Công thức xét THPT của Đại học Huế, áp dụng cho Trường Đại học Sư phạm (mã trường DHS). Nguồn:
 * "Thông tin tuyển sinh đại học hệ chính quy năm 2026 của Đại học Huế" (`hueedu-hueuni-ttts-2026`),
 * phần Phương thức xét tuyển, mục 2 ("áp dụng cho tất cả các ngành đào tạo của Đại học Huế"):
 *
 *   Điểm xét tuyển = (M1×H1 + M2×H2 + M3×H3)/(H1+H2+H3) × 3 + Điểm cộng + Điểm ưu tiên
 *
 * Tổ hợp của 2 ngành ngoài đào tạo giáo viên trong phạm vi (Tâm lý học giáo dục, Hệ thống thông
 * tin) không nhân hệ số ⇒ tổng thô 3 môn. Làm tròn 02 chữ số thập phân, thang 30.
 */
export interface HueeduThreeSubjectInput {
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
}

export function calculateHueeduThptRawScore(input: HueeduThreeSubjectInput): number {
  return round2(input.subject1Score + input.subject2Score + input.subject3Score);
}

export function calculateHueeduThptFinalScore(input: { raw30: number; priority30: number; bonus30?: number }): number {
  return round2(Math.min(30, input.raw30 + (input.bonus30 ?? 0) + input.priority30));
}
