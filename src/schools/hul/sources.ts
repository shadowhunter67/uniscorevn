import type { AdmissionSource } from '../../core/sourceRegistry';

export const hulSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'hul-admission-methods-2026',
    publisher: 'Cổng thông tin tuyển sinh Trường Đại học Luật, Đại học Huế',
    title: 'Các phương thức tuyển sinh và tổ hợp xét tuyển vào Trường Đại học Luật, Đại học Huế năm 2026',
    url: 'https://tuyensinh.hul.edu.vn/News/Detail/cac-phuong-thuc-tuyen-sinh-va-to-hop-xet-tuyen-vao-truong-dai-hoc-luat-dai-hoc-hue-nam-2026_20260227210356',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hul-threshold-2026',
    publisher: 'Trường Đại học Luật, Đại học Huế',
    title: 'Ngưỡng đảm bảo chất lượng đầu vào và điểm chuẩn năm 2026',
    url: 'https://hul.edu.vn/vi/news/detail/nguong-dam-bao-chat-luong-dau-vao-va-diem-chuan-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hul-hueu-threshold-appendix-2026',
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
