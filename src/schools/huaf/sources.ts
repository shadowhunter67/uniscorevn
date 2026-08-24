import type { AdmissionSource } from '../../core/sourceRegistry';

export const huafSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'huaf-official-admission-info-2026',
    publisher: 'Cổng thông tin tuyển sinh Trường Đại học Nông Lâm, Đại học Huế',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026 của Trường Đại học Nông Lâm, Đại học Huế',
    url: 'https://tuyensinh.huaf.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2025-cua-truong-dai-hoc-nong-lam-dai-hoc-hue-chinh-thuc-2/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-05-22',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
