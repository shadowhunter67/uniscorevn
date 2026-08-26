import type { AdmissionSource } from '../../core/sourceRegistry';

export const vwaSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'vwa-quality-threshold-2026',
    publisher: 'Học viện Phụ nữ Việt Nam',
    title: 'Thông báo 96/TB-HVPNVN: Học viện Phụ nữ Việt Nam công bố ngưỡng điểm xét tuyển đại học năm 2026',
    url: 'https://tuyensinh.hvpnvn.edu.vn/thong-bao/tuyen-sinh-dai-hoc/hoc-vien-phu-nu-viet-nam-cong-bo-nguong-diem-xet-tuyen-dai-hoc-nam-2026-phu-hop-pho-diem-mo-rong-co-hoi-cho-thi-sinh/',
    accessedAt: '2026-08-25',
    publishedAt: '2026-07-07',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
