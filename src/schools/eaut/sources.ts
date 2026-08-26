import type { AdmissionSource } from '../../core/sourceRegistry';

export const eautSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'eaut-admission-methods-2026',
    publisher: 'Trường Đại học Công nghệ Đông Á',
    title: 'Trường ĐH Công nghệ Đông Á công bố 4 phương thức tuyển sinh năm 2026',
    url: 'https://eaut.edu.vn/tin-tuc/truong-dh-cong-nghe-dong-a-cong-bo-phuong-thuc-tuyen-sinh-nam-2026/',
    accessedAt: '2026-08-25',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'eaut-admission-methods-2026-crosscheck',
    publisher: 'Congluan.vn (Hội Nhà báo Việt Nam)',
    title: 'Trường ĐH Công nghệ Đông Á công bố 4 phương thức tuyển sinh năm 2026',
    url: 'https://congluan.vn/truong-dh-cong-nghe-dong-a-cong-bo-4-phuong-thuc-tuyen-sinh-nam-2026-post350724.html',
    accessedAt: '2026-08-25',
    publishedAt: '2026-06-21',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
