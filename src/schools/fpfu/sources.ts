import type { AdmissionSource } from '../../core/sourceRegistry';

export const fpfuSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'fpfu-official-notice-2026',
    publisher: 'Trường Đại học Phòng cháy Chữa cháy',
    title: 'Thông tin tuyển sinh năm 2026 đại học ngoài ngành Công an (hệ dân sự)',
    url: 'https://daihocpccc.bocongan.gov.vn/?p=210262',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'fpfu-quality-threshold-2026',
    publisher: 'Báo Dân Trí / VietNamNet (báo nhà nước, đưa tin ngưỡng điểm hệ dân sự)',
    title: 'Một trường Công an lấy 15 điểm hệ dân sự, tuyển 250 chỉ tiêu',
    url: 'https://dantri.com.vn/giao-duc/mot-truong-cong-an-lay-15-diem-he-dan-su-tuyen-250-chi-tieu-20260811130931364.htm',
    accessedAt: '2026-08-24',
    publishedAt: '2026-08-11',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
