import type { AdmissionSource } from '../../core/sourceRegistry';

export const hubtSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'hubt-admission-portal-2026',
    publisher: 'Trường Đại học Kinh doanh và Công nghệ Hà Nội',
    title: 'Tuyển sinh - Trường Đại học Kinh doanh và Công nghệ Hà Nội',
    url: 'https://hubt.edu.vn/tuyen-sinh',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Công bố 4 phương thức xét tuyển 2026 (điểm thi TN THPT, học bạ THPT, TSA/HSA, năng khiếu kết hợp). Ngưỡng chung phương thức điểm thi TN THPT: 15,0/30 cho ngành đại trà; ngành sức khoẻ có điều kiện kép học lực + điểm cao hơn.',
  },
];
