/**
 * Ngưỡng đầu vào PYU 2026 (Trường Đại học Phú Yên), theo bài Báo Tuổi Trẻ (10/07/2026, cơ quan báo
 * chí nhà nước, đối chiếu vì cổng chính thức không trích được text), phương thức xét kết quả thi TN
 * THPT 2026. 2 nhóm:
 *
 * - `tierSuPham`: 6 ngành sư phạm (Giáo dục mầm non, Giáo dục tiểu học, Sư phạm toán học, Sư phạm
 *   ngữ văn, Sư phạm tiếng Anh, Sư phạm khoa học tự nhiên) — 20/30.
 * - `tierChung`: 5 ngành còn lại (Ngôn ngữ Anh, Quản trị kinh doanh, Công nghệ thông tin, Nông
 *   nghiệp, Du lịch) — 15/30.
 */
export type PyuProgramGroup = 'tierSuPham' | 'tierChung';

const GROUP_LABELS: Record<PyuProgramGroup, string> = {
  tierSuPham: 'Giáo dục mầm non, Giáo dục tiểu học, Sư phạm toán học, Sư phạm ngữ văn, Sư phạm tiếng Anh, Sư phạm khoa học tự nhiên',
  tierChung: 'Ngôn ngữ Anh, Quản trị kinh doanh, Công nghệ thông tin, Nông nghiệp, Du lịch',
};

export const PYU_THPT_EXAM_THRESHOLD_30: Record<PyuProgramGroup, number> = {
  tierSuPham: 20,
  tierChung: 15,
};

export interface PyuEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkPyuThptExamThreshold(totalScore30: number, group: PyuProgramGroup): PyuEligibilityResult {
  const threshold = PYU_THPT_EXAM_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển, CHƯA cộng điểm ưu tiên, ≥ ${threshold} (thang 30) — áp dụng nhóm ngành: ${GROUP_LABELS[group]}.`,
  };
}

export { GROUP_LABELS as PYU_PROGRAM_GROUP_LABELS };
