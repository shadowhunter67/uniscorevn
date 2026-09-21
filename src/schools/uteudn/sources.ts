import type { AdmissionSource } from '../../core/sourceRegistry';

export const uteudnSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'uteudn-udn-system-notice-2026',
    publisher: 'Đại học Đà Nẵng (ĐHĐN)',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-11',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo hệ thống ĐHĐN xác nhận UTE là cơ sở đào tạo thành viên, liệt kê website tuyển sinh chính thức và nguyên tắc xét tuyển chung (điểm xét tuyển, điểm cộng, điểm ưu tiên do CSĐT quy định riêng); ngưỡng/phương thức chi tiết công bố tại trang của từng CSĐT.',
  },
  {
    id: 'uteudn-admission-info-2026',
    publisher: 'UTE - Đại học Đà Nẵng',
    title: 'UTE - Trang tuyển sinh chính thức',
    url: 'https://tuyensinh.ute.udn.vn/',
    accessedAt: '2026-08-24',
    
    sourceType: 'official-admission',
    verification: 'official-source-available',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'URL chính thức của UTE được xác nhận còn hoạt động qua thông báo tuyển sinh hệ thống ĐHĐN 2026 (mã trường DSK); trang chủ trả về cấu trúc SPA nên chưa trích xuất được toàn văn thông báo ngưỡng/phương thức riêng trong đợt research này.',
  },
  {
    id: 'uteudn-nguong-dau-vao-2026',
    publisher: 'UTE - Đại học Đà Nẵng',
    title: 'Điểm ngưỡng đầu vào đại học chính quy năm 2026 (bảng ảnh)',
    url: 'https://tuyensinh.ute.udn.vn/ChuyenMuc/Diem-nguong-dau-vao-dai-hoc-chinh-quy-nam-2026_16482.html',
    accessedAt: '2026-09-21',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bảng ảnh chính thức đọc ở độ phân giải gốc: ngưỡng đảm bảo chất lượng đầu vào 25 ngành/chuyên ngành (15-20/30) + ghi chú: SPKT-CNTT = tổng 3 môn THPT (không hệ số) cộng ưu tiên KV/ĐT; các ngành còn lại = Điểm xét tuyển; Thiết kế vi mạch bán dẫn theo top 25% tổ hợp và top 20% điểm Toán toàn quốc.',
  },
  {
    id: 'uteudn-xet-tuyen-ket-hop-2026',
    publisher: 'UTE - Đại học Đà Nẵng',
    title: 'Thông tin đăng ký xét tuyển vào đại học hệ chính quy năm 2026 kết hợp điểm thi THPT và học bạ',
    url: 'https://tuyensinh.ute.udn.vn/ChuyenMuc/Thong-tin-dang-ky-xet-tuyen-vao-dai-hoc-he-chinh-quy-nam-2026-ket-hop-diem-thi-THPT-va-hoc-ba_16462.html',
    accessedAt: '2026-09-21',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      '7 ảnh chính thức: bảng tổ hợp/hệ số THPT-học bạ theo ngành (0,7/0,3; CNTT và Thiết kế vi mạch 1/0; độ lệch giữa tổ hợp bằng nhau) và công thức ĐXT = ĐiểmTHPT*Hệ số THPT + ĐiểmHB*Hệ số HB + Điểm cộng + Điểm ưu tiên KV/ĐT (HB = TB chung 3 năm lớp 10-11-12 từng môn, làm tròn 2 số lẻ; ví dụ 23,00*0,7 + 20,50*0,3 + 0 + 0,5 = 22,75).',
  },
  {
    id: 'uteudn-quality-threshold-2026',
    publisher: 'Trang tuyển sinh VNUK - Đại học Đà Nẵng (tổng hợp liên trường)',
    title: 'Điểm sàn các trường đại học công lập tại Đà Nẵng năm 2026',
    url: 'https://tuyensinh.vnuk.udn.vn/diem-san-cac-truong-dai-hoc-cong-lap-tai-da-nang-nam-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-13',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài tổng hợp trên trang tuyển sinh chính thức của VNUK (một CSĐT thành viên ĐHĐN) đối chiếu ngưỡng đảm bảo chất lượng đầu vào 2026 đã công bố của các CSĐT thành viên ĐHĐN, bao gồm UTE. Dùng verification cross-checked vì đây là nguồn tổng hợp lại thông báo gốc của từng trường, không phải thông báo gốc trực tiếp của UTE.',
  },
];
