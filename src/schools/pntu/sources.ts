import type { AdmissionSource } from '../../core/sourceRegistry';

export const pntuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'pntu-admission-2026',
    publisher: 'Trường Đại học Y khoa Phạm Ngọc Thạch',
    title: 'Thông tin tuyển sinh đại học năm 2026',
    url: 'https://pqldt.pnt.edu.vn/vi/tuyen-sinh-dai-hoc/thong-tin-tuyen-sinh-dai-hoc-nam-2026',
    accessedAt: '2026-08-24',
    publishedAt: '2026-02-14',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức (theo Quyết định số 671/QĐ-TĐHYKPNT ngày 14/02/2026) xác nhận 2 phương thức (100: thi TN THPT, 301: xét tuyển thẳng) và 2.166 chỉ tiêu; nội dung chi tiết nằm trong file PDF đính kèm không trích xuất được tự động.',
  },
  {
    id: 'pntu-threshold-notice-2026',
    publisher: 'Trường Đại học Y khoa Phạm Ngọc Thạch',
    title: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) tuyển sinh đại học chính quy năm 2026',
    url: 'https://pqldt.pnt.edu.vn/vi/tuyen-sinh-dai-hoc',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'official-source-available',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo chính thức công bố ngày 10/07/2026, ngưỡng dao động 15,5-22,5/30 (khu vực 3, tổng 3 môn không nhân hệ số). Bảng đầy đủ trên cổng trường không trích xuất tự động được (PDF/ảnh); 3 ngành dưới đây đối chiếu chéo với báo Thanh Niên (thanhnien.vn, 10/07/2026) xác nhận số liệu khớp: Y khoa 22.5/30, Răng-Hàm-Mặt 22.5/30, Tâm lý học 15.5/30 (ngành mới mở).',
  },
];
