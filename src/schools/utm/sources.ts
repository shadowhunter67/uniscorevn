import type { AdmissionSource } from '../../core/sourceRegistry';

export const utmSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'utm-threshold-2026',
    publisher: 'Trường Đại học Công nghệ và Quản lý Hữu Nghị',
    title: 'Trường Đại học Công nghệ và Quản lý Hữu Nghị công bố ngưỡng đảm bảo chất lượng đầu vào đại học chính quy năm 2026',
    url: 'https://utm.edu.vn/truong-dai-hoc-cong-nghe-va-quan-ly-huu-nghi-cong-bo-nguong-dam-bao-chat-luong-dau-vao-dai-hoc-chinh-quy-nam-2026-1132.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'official-source-available',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
