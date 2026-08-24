import type { AdmissionSource } from '../../core/sourceRegistry';

export const vkuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vku-udn-system-notice-2026',
    publisher: 'Đại học Đà Nẵng (ĐHĐN)',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-11',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo hệ thống ĐHĐN xác nhận VKU là cơ sở đào tạo thành viên, liệt kê website tuyển sinh chính thức và nguyên tắc xét tuyển chung (điểm xét tuyển, điểm cộng, điểm ưu tiên do CSĐT quy định riêng); ngưỡng/phương thức chi tiết công bố tại trang của từng CSĐT.',
  },
  {
    id: 'vku-admission-info-2026',
    publisher: 'VKU - Đại học Đà Nẵng',
    title: 'VKU - Thông tin tuyển sinh năm 2026 (cập nhật 09/4/2026)',
    url: 'https://ts.udn.vn/files/2026/2026_4_10_48_48_174_3.vku_-_thong_tin_tuyen_sinh_cap_nhat_09.4.pdf',
    accessedAt: '2026-08-24',
    publishedAt: '2026-04-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã tải và đọc trực tiếp file PDF chính thức ngày 2026-08-24: xác nhận VKU có phương thức 2 - xét tuyển kết hợp với công thức "Điểm xét tuyển = Điểm học bạ x 60% + Điểm thi TN THPT x 40% + điểm cộng + điểm ưu tiên" trên thang 30, cùng danh mục ngành/tổ hợp môn cụ thể (A00, A01, C00, D01, D07, D09, D10, D66, X06, X26, X78...) và phương thức 3 dùng điểm ĐGNL ĐHQG TP.HCM (trọng số công bố sau theo kế hoạch Bộ GDĐT).',
  },
  {
    id: 'vku-quality-threshold-2026',
    publisher: 'Trang tuyển sinh VNUK - Đại học Đà Nẵng (tổng hợp liên trường)',
    title: 'Điểm sàn các trường đại học công lập tại Đà Nẵng năm 2026',
    url: 'https://tuyensinh.vnuk.udn.vn/diem-san-cac-truong-dai-hoc-cong-lap-tai-da-nang-nam-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-13',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài tổng hợp trên trang tuyển sinh chính thức của VNUK (một CSĐT thành viên ĐHĐN) đối chiếu ngưỡng đảm bảo chất lượng đầu vào 2026 đã công bố của các CSĐT thành viên ĐHĐN, bao gồm VKU. Dùng verification cross-checked vì đây là nguồn tổng hợp lại thông báo gốc của từng trường, không phải thông báo gốc trực tiếp của VKU.',
  },
];
