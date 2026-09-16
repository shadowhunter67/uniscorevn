/** Intracom University (INU) 2026 — ngưỡng điểm xét tuyển (`sources.ts:intracom-threshold-notice-2026`). */
export type IntracomThresholdGroup = 'lawEconomics' | 'standard';

export const INTRACOM_THPT_EXAM_THRESHOLD_30: Record<IntracomThresholdGroup, number> = {
  lawEconomics: 20,
  standard: 15,
};

export const INTRACOM_THRESHOLD_GROUP_LABELS: Record<IntracomThresholdGroup, string> = {
  lawEconomics: 'Luật Kinh tế',
  standard: '12 ngành còn lại (Quản trị kinh doanh, Tài chính-Ngân hàng, Kế toán, Kỹ thuật điện, Kỹ thuật xây dựng, Công nghệ thông tin, Kỹ thuật cơ khí, Kiến trúc, Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Du lịch, Quản trị khách sạn, Quản lý dự án)',
};
