import type { AdmissionSource } from '../../core/sourceRegistry';

export const gduSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'gdu-quality-threshold-2026',
    publisher: 'Trường Đại học Gia Định',
    title: 'Trường Đại học Gia Định công bố điểm sàn xét tuyển năm 2026',
    url: 'https://giadinh.edu.vn/truong-dai-hoc-gia-dinh-cong-bo-diem-san-xet-tuyen-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'gdu-admission-methods-2026',
    publisher: 'Trường Đại học Gia Định',
    title: 'Trường Đại học Gia Định công bố 05 phương thức tuyển sinh đại học chính quy năm 2026',
    url: 'https://giadinh.edu.vn/truong-dai-hoc-gia-dinh-cong-bo-05-phuong-thuc-tuyen-sinh-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'gdu-de-an-tuyen-sinh-2026',
    publisher: 'Trường Đại học Gia Định',
    title: 'Đề án tuyển sinh năm 2026 (Số 01/2026/DA-GDU, ký 18/03/2026) — Thông tin tuyển sinh năm 2026 (Hình thức đào tạo: Đại học chính quy)',
    url: 'https://giadinh.edu.vn/gt-ck-de-an-tuyen-sinh',
    accessedAt: '2026-08-26',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
