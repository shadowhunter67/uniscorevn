import type { AdmissionSource } from '../../core/sourceRegistry';

export const dthuSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'dthu-quality-threshold-2026',
    publisher: 'Trường Đại học Đồng Tháp - Hội đồng tuyển sinh',
    title: 'Thông báo ngưỡng bảo đảm chất lượng đầu vào đại học, cao đẳng chính quy theo phương thức kết quả thi tốt nghiệp THPT năm 2026 và các điều kiện đăng ký xét tuyển',
    url: 'https://tuyensinh.dthu.edu.vn/thong-bao-nguong-bao-dam-chat-luong-dau-vao-dai-hoc-cao-dang-chinh-quy-theo-phuong-thuc-ket-qua-thi-tot-nghiep-thpt-nam-2026-va-cac-dieu-kien-dang-ky-072818.html',
    accessedAt: '2026-08-25',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
