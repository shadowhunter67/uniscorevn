/**
 * TTU 2026 (Trường Đại học Tân Tạo) — điểm sàn ĐKXT phương thức thi TN THPT theo nhóm ngành.
 * Nguồn: `sources.ts:ttu-floor-score-2026` (Công bố điểm sàn chính thức, 09/07/2026).
 */
export type TtuThresholdGroup = 'standard' | 'nursingMedtech' | 'law';

export const TTU_THPT_EXAM_THRESHOLD_30: Record<TtuThresholdGroup, number> = {
  standard: 15,
  nursingMedtech: 18,
  law: 20,
};

export const TTU_THRESHOLD_GROUP_LABELS: Record<TtuThresholdGroup, string> = {
  standard: 'khối kỹ thuật, công nghệ, kinh tế, ngôn ngữ',
  nursingMedtech: 'Điều dưỡng, Kỹ thuật Xét nghiệm Y học',
  law: 'Luật, Luật Kinh tế',
};
