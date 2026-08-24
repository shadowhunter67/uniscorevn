import type { AdmissionSource } from '../../core/sourceRegistry';

export const hueeduSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'hueedu-admission-methods-2026',
    publisher: 'Trường Đại học Sư phạm, Đại học Huế',
    title: 'Các phương thức tuyển sinh đại học hệ chính quy năm 2026',
    url: 'https://tuyensinh.dhsphue.edu.vn/Modules/Tintuc/front_detail_news.aspx?idmenu=135&idnews=1282',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hueedu-admission-info-2026',
    publisher: 'Trường Đại học Sư phạm, Đại học Huế',
    title: 'Thông tin tuyển sinh đại học hệ chính quy năm 2026',
    url: 'https://tuyensinh.dhsphue.edu.vn/Modules/Tintuc/front_detail_news.aspx?idmenu=135&idnews=1285',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hueedu-hueu-threshold-appendix-2026',
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
