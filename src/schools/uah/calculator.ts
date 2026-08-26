import { round2 } from '../../core/round2';

/**
 * Công thức xét THPT UAH 2026, khối A/C/D (không có môn năng khiếu) — Thông báo số 391/TB-HĐTS
 * (27/03/2026), mục 4.2 Phương thức 2: "Đối với các ngành khối A, C, D: Điểm xét tuyển = (Điểm thi
 * THPT môn Toán + Điểm thi THPT môn 2 + Điểm thi THPT môn 3) + Điểm cộng + Điểm ưu tiên." — không có
 * hệ số môn nào (khác khối V/H có hệ số Toán×1,5 hoặc môn năng khiếu×2, ngoài phạm vi module này).
 */
export interface UahThreeSubjectInput {
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
}

export function calculateUahThptRawScore(input: UahThreeSubjectInput): number {
  return round2(input.subject1Score + input.subject2Score + input.subject3Score);
}

/** Điểm xét tuyển cuối = điểm học lực (raw) + điểm cộng + điểm ưu tiên (mục 4.2 Thông báo
 * 391/TB-HĐTS). UAH không công bố trần cứng 30 trong công thức này (khác GDU/UFM), nhưng thang điểm
 * xét tuyển toàn hệ thống là 30 nên vẫn kẹp trần 30 theo cùng quy ước các trường khác trong repo. */
export function calculateUahThptFinalScore(input: { raw30: number; priority30: number; bonus30?: number }): number {
  return round2(Math.min(30, input.raw30 + input.priority30 + (input.bonus30 ?? 0)));
}
