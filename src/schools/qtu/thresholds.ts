/**
 * QTU 2026 — ngưỡng phương thức thi TN THPT (mã ngành theo bảng công bố điểm chuẩn
 * `sources.ts:qtu-cutoff-notice-2026`). Điều dưỡng (ngành sức khỏe, floor riêng theo quy định
 * ngành) khác biệt hẳn 10 ngành còn lại (ngưỡng chung 15/30).
 */
export type QtuThresholdGroup = 'nursing' | 'standard';

export const QTU_THPT_EXAM_THRESHOLD_30: Record<QtuThresholdGroup, number> = {
  nursing: 18,
  standard: 15,
};

export const QTU_THRESHOLD_GROUP_LABELS: Record<QtuThresholdGroup, string> = {
  nursing: 'Điều dưỡng (7720301)',
  standard: '10 ngành còn lại (Y tế công cộng, Kế toán, Tài chính-Ngân hàng, CNKT Xây dựng, Ngôn ngữ Anh, Fintech, QT Khách sạn-Nhà hàng, QTKD, QT Dịch vụ Du lịch-Lữ hành, CNTT — ngưỡng chung 15/30)',
};
