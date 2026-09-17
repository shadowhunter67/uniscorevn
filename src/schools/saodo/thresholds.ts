/** SDU 2026 — điểm chuẩn trúng tuyển thật, phương thức thi TN THPT (`sources.ts:saodo-cutoff-notice-2026`).
 * 2 ngành sư phạm (Sư phạm Tiếng Trung Quốc 26,18 / Sư phạm công nghệ 23,50) loại khỏi phạm vi. */
export type SaodoThresholdGroup = 'law' | 'standard';

export const SAODO_THPT_EXAM_THRESHOLD_30: Record<SaodoThresholdGroup, number> = {
  law: 20,
  standard: 15,
};

export const SAODO_THRESHOLD_GROUP_LABELS: Record<SaodoThresholdGroup, string> = {
  law: 'Luật (7380101)',
  standard: '18 ngành còn lại (ngoài Luật và 2 ngành sư phạm)',
};
