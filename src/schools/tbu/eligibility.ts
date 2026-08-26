/**
 * Ngưỡng đầu vào TBU 2026 (Trường Đại học Thái Bình), bài đăng chính thức tbu.edu.vn (08/07/2026),
 * phương thức xét kết quả thi TN THPT 2026 — đây là NGƯỠNG NHẬN HỒ SƠ (điều kiện tối thiểu), khác
 * "điểm trúng tuyển" (công thức A+B+C, chưa công bố chi tiết A/B/C là gì — xem knowledgeGaps.ts).
 *
 * - `law`: ngành Luật — 18,0/30.
 * - `standard`: các ngành còn lại — 15,0/30.
 */
export type TbuProgramGroup = 'law' | 'standard';

const GROUP_LABELS: Record<TbuProgramGroup, string> = {
  law: 'ngành Luật',
  standard: 'các ngành khác (trừ Luật)',
};

export const TBU_THPT_EXAM_THRESHOLD_30: Record<TbuProgramGroup, number> = { law: 18, standard: 15 };

export interface TbuEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkTbuThptExamThreshold(totalScore30: number, group: TbuProgramGroup): TbuEligibilityResult {
  const threshold = TBU_THPT_EXAM_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển ≥ ${threshold} (thang 30) — áp dụng ${GROUP_LABELS[group]}. Đây là ngưỡng nhận hồ sơ, KHÔNG PHẢI điểm trúng tuyển cuối cùng.`,
  };
}

export { GROUP_LABELS as TBU_PROGRAM_GROUP_LABELS };
