import type { AdmissionSource } from '../../core/sourceRegistry';

export const udaSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'uda-threshold-2026',
    publisher: 'Trường Đại học Đông Á',
    title: 'Trường Đại học Đông Á công bố điểm sàn xét tuyển Đại học chính quy đợt 1 năm 2026',
    url: 'https://donga.edu.vn/tuyensinh/ts-chi-tiet/truong-dai-hoc-dong-a-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-dot-1-nam-2026-44346',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
