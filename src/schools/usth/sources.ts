import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface UsthSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

export const usthSources: UsthSource[] = [
  {
    id: 'usth-scheme-2026',
    publisher: 'Trường Đại học Khoa học và Công nghệ Hà Nội (USTH)',
    title: 'Quyết định 171/QĐ-ĐHKHCN (11/3/2026) ban hành Thông tin tuyển sinh trình độ đại học năm 2026',
    url: 'https://usth.edu.vn/wp-content/uploads/2026/05/171.pdf',
    accessedAt: '2026-09-22',
    publishedAt: '2026-03-11',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF chính chủ, ký/đóng dấu Hiệu trưởng. Trang 8 (mục 2.4, Phương thức 4 - mã 100): công thức "Điểm xét tuyển bằng tổng điểm 3 môn trong tổ hợp xét tuyển theo quy định của từng ngành đào tạo và điểm ưu tiên, điểm khuyến khích (nếu có)"; "Điểm trúng tuyển giữa các tổ hợp xét tuyển của cùng phương thức và cùng ngành/chương trình là bằng nhau" (8 tổ hợp không chênh lệch).',
  },
  {
    id: 'usth-threshold-2026',
    publisher: 'Trường Đại học Khoa học và Công nghệ Hà Nội (USTH)',
    title: 'USTH công bố bảng quy đổi điểm giữa các phương thức xét tuyển và ngưỡng đảm bảo chất lượng đầu vào năm 2026',
    url: 'https://tuyensinh.usth.edu.vn/usth-cong-bo-bang-quy-doi-diem-giua-cac-phuong-thuc-xet-tuyen-va-nguong-dam-bao-chat-luong-dau-vao-nam-2026-3955/',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính chủ tuyensinh.usth.edu.vn, bảng đầy đủ ngưỡng đảm bảo chất lượng đầu vào theo mã ngành, cột riêng cho phương thức PT4 (thang 30) — 16/17 ngành xét PT4 = 19,00, trừ Y khoa 19,5, Dược 20,0, Vi mạch bán dẫn 23,0. Kỹ thuật Hàng không và các chương trình song bằng không xét PT4.',
  },
  {
    id: 'usth-cutoff-2026',
    publisher: 'Trường Đại học Khoa học và Công nghệ Hà Nội (USTH)',
    title: 'USTH công bố điểm chuẩn năm 2026',
    url: 'https://tuyensinh.usth.edu.vn/usth-cong-bo-diem-chuan-nam-2026-4045',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-11',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính chủ, bảng điểm chuẩn thật (không phải ngưỡng sàn) dạng HTML text (không phải ảnh) theo mã ngành, gồm cả chương trình PT4 (thang 30, 16 ngành) và song bằng (thang 100, không dùng trong runtime này).',
  },
];
