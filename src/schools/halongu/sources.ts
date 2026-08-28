import type { AdmissionSource } from '../../core/sourceRegistry';

export const halonguSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'halongu-quality-threshold-2026',
    publisher: 'Trường Đại học Hạ Long',
    title: 'Thông tin tuyển sinh trình độ đại học chính quy năm 2026',
    url: 'https://uhl.edu.vn/TuyensinhHeDaihoc_8699.htm',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'halongu-admission-methods-2026',
    publisher: 'Trường Đại học Hạ Long',
    title: 'Phương thức tuyển sinh năm 2026',
    url: 'https://uhl.edu.vn/Phuongthuctuyensinh_5000.htm',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'halongu-formula-2026',
    publisher: 'Trường Đại học Hạ Long',
    title: 'Cách tính điểm xét tuyển tuyển sinh năm 2026',
    url: 'https://uhl.edu.vn/CACHTINHDIEMXETTUYENTUYENSINHNAM_11210.htm',
    accessedAt: '2026-08-28',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
