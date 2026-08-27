import type { AdmissionSource } from '../../core/sourceRegistry';

export const humgSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'humg-admission-2026',
    publisher: 'Trường Đại học Mỏ - Địa chất',
    title: 'Thông báo ngưỡng điểm xét tuyển đợt 1 hệ đại học năm 2026',
    url: 'https://ts.humg.edu.vn/tuyen-sinh/Pages/Thong-tin-tuyen-sinh.aspx?ItemID=7106',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-04',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];

/**
 * Thông báo chính thức (đọc trực tiếp trang HTML 04/07/2026) chứa đầy đủ: Bảng 1 ngưỡng theo 53
 * mã xét tuyển (15-21/30); công thức "Điểm Xét = Min[(Môn 1 + Môn 2 + Môn 3) + Điểm Cộng, 30] +
 * Điểm ưu tiên"; công thức giảm điểm ưu tiên khi tổng tổ hợp ≥ 22,5; mục 3 hướng dẫn điểm cộng
 * (QĐ 674/QĐ-MĐC); bảng tổ hợp và bảng ngành-tổ hợp. Toàn bộ 53 mã đã nhập vào
 * HUMG_PROGRAM_THRESHOLDS_2026 (`thresholds.ts`).
 */
