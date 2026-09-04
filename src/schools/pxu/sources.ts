import type { AdmissionSource } from '../../core/sourceRegistry';

export const pxuSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'pxu-thongbao-041-2026',
    publisher: 'Trường Đại học Phú Xuân (PXU) — Hội đồng Tuyển sinh năm 2026',
    title: 'Thông tin tuyển sinh năm 2026 (Số 041/TB-PXU, ngày 19/3/2026), hình thức đào tạo Chính quy',
    url: 'https://pxu.edu.vn/api/files/migrated/2026/05/Thong-tin-tuyen-sinh-chinh-quy-nam-2026-4.pdf',
    accessedAt: '2026-09-04',
    publishedAt: '2026-03-19',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'pxu-diemtrungtuyen-2026',
    publisher: 'Trường Đại học Phú Xuân (PXU) — Hội đồng Tuyển sinh',
    title: 'PXU công bố điểm trúng tuyển đại học chính quy năm 2026 (bảng ảnh đính kèm bài đăng, 16/8/2026)',
    url: 'https://pxu.edu.vn/news/diem-trung-tuyen-dai-hoc-phu-xuan-2026',
    accessedAt: '2026-09-04',
    publishedAt: '2026-08-16',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
