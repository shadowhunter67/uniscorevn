import type { AdmissionSource } from '../../core/sourceRegistry';

export const hluSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'hlu-admission-portal-2026',
    publisher: 'Trường Đại học Luật Hà Nội - Cổng thông tin tuyển sinh',
    title: 'Cổng tuyển sinh đại học chính quy năm 2026 (Khóa 51)',
    url: 'https://tuyensinh.hlu.edu.vn/tsnews/details/30532',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hlu-quality-threshold-2026',
    publisher: 'Trường Đại học Luật Hà Nội',
    title:
      'Thông báo số 1010/TB-ĐHLHN về việc xác định ngưỡng bảo đảm chất lượng đầu vào trong tuyển sinh trình độ đại học hình thức đào tạo chính quy năm 2026 (Khóa 51)',
    url: 'https://tuyensinh.hlu.edu.vn/Images/Post/files/TB1010_B%C4%90CL%C4%90V_K51_2026.pdf',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
