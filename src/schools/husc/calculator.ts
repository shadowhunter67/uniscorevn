import { round2 } from '../../core/round2';

/**
 * Công thức xét THPT của Đại học Huế (áp dụng cho tất cả trường thành viên, trong đó có Trường
 * Đại học Khoa học — mã trường DHT). Nguồn: "Thông tin tuyển sinh đại học hệ chính quy năm 2026
 * của Đại học Huế" (PDF 77 trang, `husc-hueuni-ttts-2026`), phần Phương thức xét tuyển, mục 2
 * "Xét tuyển sử dụng kết quả thi tốt nghiệp trung học phổ thông":
 *
 *   Điểm xét tuyển = (M1×H1 + M2×H2 + M3×H3)/(H1+H2+H3) × 3 + Điểm cộng + Điểm ưu tiên
 *
 * Các tổ hợp xét tuyển của Trường Đại học Khoa học không ghi hệ số môn nào (khác các tổ hợp có
 * môn năng khiếu ×2 của ngành Kiến trúc) ⇒ H1=H2=H3=1, công thức rút gọn về tổng thô 3 môn. Điểm
 * xét tuyển làm tròn 02 chữ số thập phân, thang điểm 30.
 */
export interface HuscThreeSubjectInput {
  subject1Score: number;
  subject2Score: number;
  subject3Score: number;
}

export function calculateHuscThptRawScore(input: HuscThreeSubjectInput): number {
  return round2(input.subject1Score + input.subject2Score + input.subject3Score);
}

/** Điểm xét tuyển cuối = điểm học lực (raw) + điểm cộng (tùy chọn, mặc định 0 — Phụ lục 2 bảng
 * tiêu chí thành tích điểm cộng, tối đa 3,0/30, chưa mô hình hoá; caller tự cung cấp nếu đã tính)
 * + điểm ưu tiên, làm tròn 2 chữ số thập phân, kẹp trần 30. */
export function calculateHuscThptFinalScore(input: { raw30: number; priority30: number; bonus30?: number }): number {
  return round2(Math.min(30, input.raw30 + (input.bonus30 ?? 0) + input.priority30));
}
