import { round2 } from '../../core/round2';

/**
 * Công thức xét THPT HUL 2026 (Trường Đại học Luật, Đại học Huế) — Thông tin tuyển sinh 2026 (PDF
 * gốc, mục 2, `hul-hueuni-ttts-2026`): "Điểm xét tuyển = (M1×H1+M2×H2+M3×H3)/(H1+H2+H3)×3 + Điểm
 * cộng + Điểm ưu tiên". Bảng tổ hợp môn của Trường Đại học Luật không nêu hệ số môn nào — hệ số
 * H1=H2=H3=1, công thức rút gọn về tổng thô 3 môn. Lưu ý: môn Toán hoặc môn Ngữ văn trong tổ hợp
 * phải đạt tối thiểu 6/10 điểm (điều kiện phụ, chưa kiểm tra ở module này).
 */
export interface HulThreeSubjectInput {
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
}

export function calculateHulThptRawScore(input: HulThreeSubjectInput): number {
  return round2(input.subject1Score + input.subject2Score + input.subject3Score);
}

/** Điểm xét tuyển cuối = điểm học lực (raw) + điểm cộng (tùy chọn, mặc định 0) + điểm ưu tiên, làm
 * tròn 2 chữ số thập phân, thang 30. */
export function calculateHulThptFinalScore(input: { raw30: number; priority30: number; bonus30?: number }): number {
  return round2(Math.min(30, input.raw30 + (input.bonus30 ?? 0) + input.priority30));
}
