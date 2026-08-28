/**
 * Ngưỡng đảm bảo chất lượng đầu vào APD 2026 (phương thức xét kết quả thi TN THPT), theo TỪNG CƠ
 * SỞ ĐÀO TẠO — Thông báo 180/TB-HVCSPT (02/07/2026, `apd-threshold-notice-180-2026`) áp dụng đồng
 * nhất cho mọi tổ hợp/ngành trong cùng 1 cơ sở (không phân biệt theo ngành/tổ hợp).
 */
export type ApdCampusId = 'hanoi' | 'bacninh' | 'danang';

export const APD_CAMPUS_LABELS: Record<ApdCampusId, string> = {
  hanoi: 'Trụ sở chính (Hà Nội, mã HCP)',
  bacninh: 'Phân hiệu Bắc Ninh (mã HCK)',
  danang: 'Phân hiệu Đà Nẵng (mã HCD)',
};

export const APD_CAMPUS_THRESHOLD_30: Record<ApdCampusId, number> = {
  hanoi: 19,
  bacninh: 16,
  danang: 16,
};
