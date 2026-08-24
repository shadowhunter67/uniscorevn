import type { AdmissionSource } from '../../core/sourceRegistry';

export const hceSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'hce-admission-methods-2026',
    publisher: 'Cổng thông tin tuyển sinh Trường Đại học Kinh tế, Đại học Huế',
    title: '5 phương thức tuyển sinh năm 2026',
    url: 'https://tuyensinh.hce.edu.vn/5-phuong-thuc-tuyen-sinh-nam-2026/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hce-threshold-2026',
    publisher: 'Trường Đại học Kinh tế, Đại học Huế',
    title: 'Điểm sàn xét tuyển đại học năm 2026',
    url: 'https://tuyensinh.hce.edu.vn/diem-san-xet-tuyen-dai-hoc-nam-2026/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hce-hueu-threshold-appendix-2026',
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
