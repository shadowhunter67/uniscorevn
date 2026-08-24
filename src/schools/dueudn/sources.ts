import type { AdmissionSource } from '../../core/sourceRegistry';

export const dueudnSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'dueudn-udn-system-notice-2026',
    publisher: 'Đại học Đà Nẵng (ĐHĐN)',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-11',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo hệ thống ĐHĐN xác nhận DUE là cơ sở đào tạo thành viên, liệt kê website tuyển sinh chính thức và nguyên tắc xét tuyển chung (điểm xét tuyển, điểm cộng, điểm ưu tiên do CSĐT quy định riêng); ngưỡng/phương thức chi tiết công bố tại trang của từng CSĐT.',
  },
  {
    id: 'dueudn-admission-info-2026',
    publisher: 'DUE - Đại học Đà Nẵng',
    title: 'DUE - Trang tuyển sinh chính thức',
    url: 'http://due.udn.vn',
    accessedAt: '2026-08-24',
    
    sourceType: 'official-admission',
    verification: 'official-source-available',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'URL chính thức của DUE được xác nhận còn hoạt động qua thông báo tuyển sinh hệ thống ĐHĐN 2026 (mã trường DDQ); chưa fetch được toàn văn thông báo ngưỡng/phương thức riêng của DUE trong đợt research này (trang chủ trả về cấu trúc SPA, thông báo con trả 404 khi truy vấn trực tiếp).',
  },
  {
    id: 'dueudn-quality-threshold-2026',
    publisher: 'Trang tuyển sinh VNUK - Đại học Đà Nẵng (tổng hợp liên trường)',
    title: 'Điểm sàn các trường đại học công lập tại Đà Nẵng năm 2026',
    url: 'https://tuyensinh.vnuk.udn.vn/diem-san-cac-truong-dai-hoc-cong-lap-tai-da-nang-nam-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-13',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài tổng hợp trên trang tuyển sinh chính thức của VNUK (một CSĐT thành viên ĐHĐN) đối chiếu ngưỡng đảm bảo chất lượng đầu vào 2026 đã công bố của các CSĐT thành viên ĐHĐN, bao gồm DUE. Dùng verification cross-checked vì đây là nguồn tổng hợp lại thông báo gốc của từng trường, không phải thông báo gốc trực tiếp của DUE.',
  },
];
