import type { AdmissionSource } from '../../core/sourceRegistry';

export const pntuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'pntu-admission-2026',
    publisher: 'Trường Đại học Y khoa Phạm Ngọc Thạch',
    title: 'Quyết định 671/QĐ-TĐHYKPNT: Thông tin tuyển sinh đại học năm 2026',
    url: 'https://pnt.edu.vn/Resources/Docs/SubDomain/pqldt/Tuyen%20sinh%20Dai%20hoc/TS2026/QD_BanHanh_ThongTin_TuyenSinh_DHCQ_TS2026(Full)-PDFs.pdf',
    accessedAt: '2026-08-28',
    publishedAt: '2026-02-14',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'File PDF gốc (đính kèm Quyết định 671/QĐ-TĐHYKPNT 14/02/2026) trích xuất được bằng pdftotext (không phải ảnh) 2026-08-28: xác nhận 2 phương thức (100: thi TN THPT, 301: xét tuyển thẳng), danh mục 13 ngành + mã ngành + tổ hợp môn xét tuyển (mục 4), nguyên tắc điểm ưu tiên + công thức giảm dần trích nguyên văn (mục 5.2), xác nhận "Trường không áp dụng điểm thưởng trong tuyển sinh năm 2026" (mục 5.2), và nguyên tắc tổng điểm xét tuyển = tổng 3 môn + điểm cộng (nếu có) + điểm ưu tiên (nếu có) so với ngưỡng đầu vào (mục 6). Ngành Tâm lý học (7310401, mở sau ngày ký quyết định) không có trong danh mục PDF này.',
  },
  {
    id: 'pntu-threshold-notice-2026',
    publisher: 'Trường Đại học Y khoa Phạm Ngọc Thạch',
    title: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) tuyển sinh đại học chính quy năm 2026',
    url: 'https://pqldt.pnt.edu.vn/vi/tuyen-sinh-dai-hoc',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo chính thức công bố ngày 10/07/2026, ngưỡng dao động 15,5-22,5/30 (khu vực 3, tổng 3 môn không nhân hệ số). Bảng đầy đủ trên cổng trường ở dạng ảnh, không trích xuất tự động được — toàn bộ 14 ngành đối chiếu chéo ĐỘC LẬP 2 nguồn báo chí cùng ngày 10/07/2026 (`pntu-vnexpress-threshold-2026`, `pntu-gdtd-threshold-2026`), khớp tuyệt đối cả điểm số lẫn tổ hợp môn với danh mục ngành/tổ hợp trong `pntu-admission-2026`.',
  },
  {
    id: 'pntu-vnexpress-threshold-2026',
    publisher: 'VnExpress',
    title: 'Điểm sàn Đại học Y khoa Phạm Ngọc Thạch tăng, cao nhất 22,5',
    url: 'https://vnexpress.net/diem-san-dai-hoc-y-khoa-pham-ngoc-thach-tang-cao-nhat-22-5-5095755.html',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-10',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Báo chí cross-check độc lập #1 — liệt kê đủ 14 ngành, điểm sàn, và tổ hợp môn theo mã ngành; dùng để đối chiếu chéo `pntu-threshold-notice-2026` (ảnh gốc chưa tự đọc được).',
  },
  {
    id: 'pntu-gdtd-threshold-2026',
    publisher: 'Báo Giáo dục & Thời đại',
    title: 'Trường Đại học Y khoa Phạm Ngọc Thạch công bố điểm sàn 2026, cao nhất 22,5 điểm',
    url: 'https://giaoducthoidai.vn/truong-dai-hoc-y-khoa-pham-ngoc-thach-cong-bo-diem-san-2026-cao-nhat-225-diem-post784548.html',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-10',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Báo chí cross-check độc lập #2 — liệt kê đủ 14 ngành + mã ngành + điểm sàn, khớp tuyệt đối với `pntu-vnexpress-threshold-2026`.',
  },
];
