import type { AdmissionSource } from '../../core/sourceRegistry';

export const ltvuniSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'ltvuni-quality-threshold-2026',
    publisher: 'Trường Đại học Lương Thế Vinh - Hội đồng tuyển sinh',
    title: 'Thông báo 269/TB-ĐHLTV: Ngưỡng đảm bảo chất lượng, độ chênh giữa các tổ hợp xét tuyển theo phương thức xét điểm thi THPT và bảng quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026',
    url: 'https://ltvu.edu.vn/Thong-Bao/191/Thong-bao-Nguong-dam-bao-chat-luong-do-chenh-giua-cac-to-hop-xet-tuyen-theo-phuong-thuc-xet-diem-thi-THPT-va-bang-quy-doi-diem-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-nam-2026-NTB',
    accessedAt: '2026-08-25',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
