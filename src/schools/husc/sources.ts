import type { AdmissionSource } from '../../core/sourceRegistry';

export const huscSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'husc-admission-methods-2026',
    publisher: 'Trang thông tin tuyển sinh Trường Đại học Khoa học, Đại học Huế',
    title: 'Các phương thức tuyển sinh đại học hệ chính quy năm 2026',
    url: 'https://tuyensinh.husc.edu.vn/baiviet.php?name=intro',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'husc-threshold-2026',
    publisher: 'Trường Đại học Khoa học, Đại học Huế',
    title: 'Ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) tuyển sinh đại học hệ chính quy năm 2026 (Thông báo số 42/TB-HĐTSĐH)',
    url: 'https://tuyensinh.husc.edu.vn/thongbao.php?id=77',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'husc-hueu-threshold-appendix-2026',
    publisher: 'Đại học Huế (Hội đồng tuyển sinh)',
    title: 'Phụ lục 1 - Ngưỡng đảm bảo chất lượng đầu vào đối với các chương trình đào tạo đại học hệ chính quy của Đại học Huế năm 2026 (kèm Thông báo số 42/TB-HĐTSĐH ngày 10/7/2026)',
    url: 'https://tuyensinh.hueuni.edu.vn/News/Download/10676',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
