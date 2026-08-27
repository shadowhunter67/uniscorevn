import type { AdmissionSource } from '../../core/sourceRegistry';

export const hueeduSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
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
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Mục VI (mã trường DHS). Trong phạm vi exact: Tâm lý học giáo dục (7310403) 16,00/30; Hệ thống thông tin (7480104) 16,00/30 — 2 ngành ngoài đào tạo giáo viên, không điều kiện phụ.',
  },
  {
    id: 'hueedu-hueuni-ttts-2026',
    publisher: 'Đại học Huế',
    title: 'THÔNG TIN TUYỂN SINH ĐẠI HỌC HỆ CHÍNH QUY NĂM 2026 (77 trang, Quyết định 630/QĐ-HĐTSĐH ngày 29/04/2026)',
    url: 'https://tuyensinh.hueuni.edu.vn/News/Detail/thong-tin-tuyen-sinh-dai-hoc-cao-dang-he-chinh-quy-nam-2026-cua-dai-hoc-hue_20260501150542',
    accessedAt: '2026-08-27',
    publishedAt: '2026-04-29',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Văn bản tuyển sinh chung toàn Đại học Huế. Trích: mục 2 phần Phương thức xét tuyển - công thức Điểm xét tuyển; mục V.2.a + Bảng 1 - bảng điểm ưu tiên KV/ĐT + công thức giảm khi tổng ≥ 22,5.',
  },
];
