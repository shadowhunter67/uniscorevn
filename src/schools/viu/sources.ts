import type { AdmissionSource } from '../../core/sourceRegistry';

export const viuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'viu-threshold-notice-2026',
    publisher: 'Trường Đại học Công nghiệp Việt - Hưng (VIU, mã trường VHD)',
    title: 'Thông báo số 234/TB-ĐHVH — Công bố ngưỡng đảm bảo chất lượng đầu vào hệ đại học chính quy K50, năm 2026',
    url: 'https://viu.edu.vn/tuyen-sinh/thong-bao-nguong-dam-bao-chat-luong-dau-vao-he-dai-hoc-chinh-quy-k50-nam-2026-113542.html',
    accessedAt: '2026-09-17',
    publishedAt: '2026-07-01',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Nội dung là ẢNH scan nhúng trong trang (curl không trích được text) — đọc bằng vision qua 3 ảnh gốc độ phân giải cao (media.viu.edu.vn/.../ds-1/2/3-...jpg, tìm qua chrome-devtools evaluate_script quét toàn bộ <img src>). Bảng "1. Điểm sàn xét tuyển" đầy đủ 21 mã ngành, cột "Điểm thi tốt nghiệp THPT năm 2026 (Mã 100)" = 15,0/30 ĐỒNG NHẤT cho TẤT CẢ 21 ngành, không phân biệt nhóm. Đây là điểm SÀN (ngưỡng nhận hồ sơ), không phải điểm chuẩn trúng tuyển cuối cùng. Không có công thức ĐXT hay ghi chú về việc gồm điểm ưu tiên hay chưa → so RAW (judgment call, tiền lệ TBDU/BAFU khi im lặng). Tổ hợp: nhiều tổ hợp riêng theo từng ngành (khối A/C/D/X, ~26 tổ hợp) — model theo tập tổ hợp CHUNG nằm trong taxonomy hiện có, không ràng buộc theo ngành cụ thể vì ngưỡng đồng nhất toàn trường.',
  },
];
