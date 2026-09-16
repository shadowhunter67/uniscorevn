/** DNTU 2026 — điểm chuẩn trúng tuyển thật, phương thức thi TN THPT (`sources.ts:dntu-cutoff-notice-2026`). */
export type DntuThresholdGroup = 'nursingMedtech' | 'standard';

export const DNTU_THPT_EXAM_THRESHOLD_30: Record<DntuThresholdGroup, number> = {
  nursingMedtech: 18,
  standard: 15,
};

export const DNTU_THRESHOLD_GROUP_LABELS: Record<DntuThresholdGroup, string> = {
  nursingMedtech: 'Điều dưỡng, Xét nghiệm y học',
  standard: '20 ngành còn lại (ngưỡng chung 15/30)',
};
