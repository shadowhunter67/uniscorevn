import { round2 } from '../../core/round2';

/**
 * Công thức xét THPT HCE 2026 (Trường Đại học Kinh tế, Đại học Huế) — Thông tin tuyển sinh 2026
 * (PDF gốc, mục 2, `hce-hueuni-ttts-2026`): "Điểm xét tuyển = (M1×H1+M2×H2+M3×H3)/(H1+H2+H3)×3 +
 * Điểm cộng + Điểm ưu tiên". Bảng tổ hợp môn của Trường Đại học Kinh tế không nêu hệ số môn nào
 * (khác Kiến trúc/Giáo dục Thể chất có "Toán×1,5"/"Năng khiếu×2" ghi rõ trong tên tổ hợp) — hệ số
 * H1=H2=H3=1, công thức rút gọn về tổng thô 3 môn.
 */
export interface HceThreeSubjectInput {
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
}

export function calculateHceThptRawScore(input: HceThreeSubjectInput): number {
  return round2(input.subject1Score + input.subject2Score + input.subject3Score);
}

/** Điểm xét tuyển cuối = điểm học lực (raw) + điểm cộng (tùy chọn, mặc định 0 — xem Phụ lục 2 cho
 * bảng thành tích TC1-TC12, chưa mô hình hoá; caller có thể tự cung cấp nếu đã tính) + điểm ưu tiên,
 * làm tròn 2 chữ số thập phân, thang 30 (mục 2 Thông tin tuyển sinh 2026). */
export function calculateHceThptFinalScore(input: { raw30: number; priority30: number; bonus30?: number }): number {
  return round2(Math.min(30, input.raw30 + (input.bonus30 ?? 0) + input.priority30));
}
