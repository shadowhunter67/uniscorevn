import type { AdmissionSource } from '../../core/sourceRegistry';

export const uflsudnSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'uflsudn-udn-system-notice-2026',
    publisher: 'Đại học Đà Nẵng (ĐHĐN)',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-11',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo hệ thống ĐHĐN xác nhận UFLS là cơ sở đào tạo thành viên, liệt kê website tuyển sinh chính thức và nguyên tắc xét tuyển chung (điểm xét tuyển, điểm cộng, điểm ưu tiên do CSĐT quy định riêng); ngưỡng/phương thức chi tiết công bố tại trang của từng CSĐT.',
  },
  {
    id: 'uflsudn-admission-info-2026',
    publisher: 'UFLS - Đại học Đà Nẵng',
    title: 'UFLS - Thông tin tuyển sinh năm 2026 (bản FINAL)',
    url: 'https://tuyensinh.ufl.udn.vn/wp-content/uploads/2026/06/2026.06.02-Thong-tin-tuyen-sinh-nam-2026-FINAL.pdf',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-02',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã tải và đọc trực tiếp file PDF chính thức ngày 2026-08-24: xác nhận UFLS (mã trường DDF) có 2 phương thức (xét tuyển thẳng theo quy chế; xét tuyển kết hợp điểm học bạ THPT và điểm thi TN THPT), và nêu rõ mỗi ngành có MỘT mức ngưỡng đầu vào chung áp dụng cho mọi tổ hợp, được công bố riêng theo kế hoạch Bộ GDĐT (không nằm trong chính file này).',
  },
  {
    id: 'uflsudn-quality-threshold-2026',
    publisher: 'Trang tuyển sinh VNUK - Đại học Đà Nẵng (tổng hợp liên trường)',
    title: 'Điểm sàn các trường đại học công lập tại Đà Nẵng năm 2026',
    url: 'https://tuyensinh.vnuk.udn.vn/diem-san-cac-truong-dai-hoc-cong-lap-tai-da-nang-nam-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-13',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài tổng hợp trên trang tuyển sinh chính thức của VNUK (một CSĐT thành viên ĐHĐN) đối chiếu ngưỡng đảm bảo chất lượng đầu vào 2026 đã công bố của các CSĐT thành viên ĐHĐN, bao gồm UFLS. Dùng verification cross-checked vì đây là nguồn tổng hợp lại thông báo gốc của từng trường, không phải thông báo gốc trực tiếp của UFLS.',
  },
];
