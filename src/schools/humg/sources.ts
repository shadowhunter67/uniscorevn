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
 * Thông báo chính thức có bảng ngưỡng THPT đầy đủ khoảng 53 chương trình (15-21/30 theo thang 30)
 * kèm mã ngành. Do trích xuất tự động (không đọc được ảnh/bảng đầy đủ), chỉ xác nhận chắc chắn
 * được tên ngành tiếng Việt + mã ngành cho 7 chương trình trong HUMG_PROGRAM_THRESHOLDS_2026; các
 * chương trình còn lại KHÔNG được nhập để tránh sai lệch, xem humgKnowledgeGaps.
 */
