import type { AdmissionSource } from '../../core/sourceRegistry';

export const dueudnSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
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
    lifecycle: { effectiveYear: 2026, status: 'superseded', supersededBy: 'dueudn-cutoff-2026' },
    note:
      'Bài tổng hợp trên trang tuyển sinh chính thức của VNUK (một CSĐT thành viên ĐHĐN) đối chiếu ngưỡng đảm bảo chất lượng đầu vào 2026 đã công bố của các CSĐT thành viên ĐHĐN, bao gồm DUE. Dùng verification cross-checked vì đây là nguồn tổng hợp lại thông báo gốc của từng trường, không phải thông báo gốc trực tiếp của DUE. Bị thay thế bởi điểm chuẩn trúng tuyển chính thức theo NGÀNH `dueudn-cutoff-2026` — giữ lại làm nguồn lịch sử điểm sàn (trước kỳ thi).',
  },
  {
    id: 'dueudn-cutoff-2026',
    publisher: 'Đại học Đà Nẵng (Ban Đào tạo & Đảm bảo chất lượng giáo dục)',
    title: 'Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/diemchuan/19567',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính chủ hệ thống Đại học Đà Nẵng (ts.udn.vn) — bảng HTML text thật, gộp điểm chuẩn trúng tuyển 2026 của TẤT CẢ CSĐT thành viên ĐHĐN trong 1 trang. Mục II (mã trường DDQ) = TRƯỜNG ĐẠI HỌC KINH TẾ (DUE), 36 mã xét tuyển chia 2 nhóm: "ST - Tiêu chuẩn" (19 mã, phương thức "Xét điểm thi THPT" thuần) và "PR/GB/EL" (17 mã, phương thức "Xét kết hợp HB + tiếng Anh", KHÔNG mô hình hoá — công thức trọng số khác, cần chứng chỉ tiếng Anh quốc tế). Module này CHỈ dùng 19 mã "ST". KHÔNG có cột tổ hợp môn xét tuyển — người dùng tự chọn tổ hợp, xem `knowledgeGaps.ts`.',
  },
];
