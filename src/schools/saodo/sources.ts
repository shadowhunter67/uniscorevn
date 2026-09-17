import type { AdmissionSource } from '../../core/sourceRegistry';

export const saodoSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'saodo-cutoff-notice-2026',
    publisher: 'Trường Đại học Sao Đỏ (SDU)',
    title: 'Thông báo điểm trúng tuyển và danh sách thí sinh trúng tuyển đại học chính quy năm 2026',
    url: 'https://saodo.edu.vn/vi/news/tin-tuyen-sinh/truong-dai-hoc-sao-do-thong-bao-diem-trung-tuyen-va-danh-sach-thi-sinh-trung-tuyen-dai-hoc-chinh-quy-nam-2026-2933.html',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bảng điểm chuẩn là ẢNH nhúng (không phải text HTML — curl/WebFetch không trích được, phải dùng chrome-devtools chụp ảnh rồi đọc bằng vision). Bảng "I. ĐIỂM CHUẨN TRÚNG TUYỂN" đầy đủ 21 mã ngành, cột "Theo kết quả điểm thi tốt nghiệp THPT 2026": 19 mã ngành = 15,00/30 (Công nghệ kỹ thuật ô tô/điện-điện tử/cơ khí, CNTT, Công nghệ dệt may, Kỹ thuật điều khiển-tự động hóa, Kỹ thuật cơ điện tử, Trí tuệ nhân tạo, Toán ứng dụng, Kế toán, QTKD, Kinh tế số, Logistics, Thương mại điện tử, Tài chính-Ngân hàng, QT dịch vụ du lịch-lữ hành, Ngôn ngữ Anh, Ngôn ngữ Trung Quốc); Luật (7380101) = 20,00/30; Sư phạm Tiếng Trung Quốc = 26,18/30 và Sư phạm công nghệ = 23,50/30 (2 ngành sư phạm loại khỏi phạm vi — điểm bất thường cao, khả năng có điều kiện phụ/năng khiếu chưa xác nhận). Không có công thức ĐXT hay ghi chú về việc gồm điểm ưu tiên hay chưa trên trang → so RAW (judgment call, tiền lệ TBDU/BAFU khi im lặng). Đây là điểm chuẩn TRÚNG TUYỂN thật, không phải ngưỡng nhận hồ sơ.',
  },
];
