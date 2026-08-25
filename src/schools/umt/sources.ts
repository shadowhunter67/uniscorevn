import type { AdmissionSource } from '../../core/sourceRegistry';

export const umtSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'umt-threshold-2026',
    publisher: 'Báo Giáo dục và Thời đại (dẫn thông báo chính thức UMT)',
    title: 'Trường Đại học Quản lý và Công nghệ TPHCM công bố điểm sàn xét tuyển',
    url: 'https://giaoducthoidai.vn/truong-dai-hoc-quan-ly-va-cong-nghe-tphcm-cong-bo-diem-san-xet-tuyen-post784293.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-08',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'umt-threshold-2026-crosscheck',
    publisher: 'Báo Tuổi Trẻ (dẫn thông báo chính thức UMT)',
    title: 'Điểm sàn Trường đại học Quản lý và Công nghệ TP.HCM từ 15 đến 18',
    url: 'https://tuoitre.vn/diem-san-truong-dai-hoc-quan-ly-va-cong-nghe-tphcm-tu-15-den-18-100260708110440422.htm',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-08',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
