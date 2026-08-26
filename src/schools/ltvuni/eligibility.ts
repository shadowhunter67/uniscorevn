/**
 * Ngưỡng đầu vào LTVUni 2026 (Trường Đại học Lương Thế Vinh), Thông báo 269/TB-ĐHLTV
 * (09/07/2026), phương thức 100 (xét điểm thi TN THPT 2026) — đọc trực tiếp từ file PDF đính kèm
 * bài đăng chính thức, đủ 11/11 ngành đào tạo.
 *
 * - `traditionalMedicine`: Y học cổ truyền (7720115) — 20,0/30.
 * - `rehabilitation`: Kỹ thuật phục hồi chức năng (7720603) — 18,0/30.
 * - `standard`: 9 ngành còn lại (Ngôn ngữ Anh, Kế toán, Tài chính - Ngân hàng, Quản trị kinh
 *   doanh, CNTT, Công nghệ kỹ thuật điện điện tử, Kỹ thuật xây dựng (+công trình giao thông),
 *   Thú y) — 15,0/30.
 */
export type LtvuniProgramGroup = 'traditionalMedicine' | 'rehabilitation' | 'standard';

const GROUP_LABELS: Record<LtvuniProgramGroup, string> = {
  traditionalMedicine: 'Y học cổ truyền',
  rehabilitation: 'Kỹ thuật phục hồi chức năng',
  standard: 'Ngôn ngữ Anh, Kế toán, Tài chính - Ngân hàng, Quản trị kinh doanh, Công nghệ thông tin, Công nghệ kỹ thuật điện - điện tử, Kỹ thuật xây dựng, Kỹ thuật xây dựng công trình giao thông, Thú y',
};

export const LTVUNI_THPT_EXAM_THRESHOLD_30: Record<LtvuniProgramGroup, number> = {
  traditionalMedicine: 20,
  rehabilitation: 18,
  standard: 15,
};

export interface LtvuniEligibilityResult {
  pass: boolean;
  requiredText: string;
}

/** Điểm xét tuyển = Điểm môn 1 + môn 2 + môn 3 + điểm ưu tiên (nếu có). Runtime hiện chỉ cộng
 * điểm thô 3 môn — xem `ltvuni-priority-not-modeled`. */
export function checkLtvuniThptExamThreshold(totalScore30: number, group: LtvuniProgramGroup): LtvuniEligibilityResult {
  const threshold = LTVUNI_THPT_EXAM_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển, CHƯA cộng điểm ưu tiên, ≥ ${threshold} (thang 30) — áp dụng ngành: ${GROUP_LABELS[group]}.`,
  };
}

export { GROUP_LABELS as LTVUNI_PROGRAM_GROUP_LABELS };
