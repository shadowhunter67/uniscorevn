import type { AdmissionSource } from '../../core/sourceRegistry';

export const qnamuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'qnamu-threshold-2025',
    publisher: 'Trangedu.com (tường thuật thông báo chính thức Trường Đại học Quảng Nam)',
    title: 'Thông tin tuyển sinh Trường Đại học Quảng Nam',
    url: 'https://trangedu.com/truong/dai-hoc-quang-nam/',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn đầy đủ theo TỪNG NGÀNH x TỪNG TỔ HỢP (nhánh xét điểm thi TN THPT 2025), kèm mã ngành. Batch này dùng 8 ngành sư phạm/xã hội — LOẠI TRỪ Giáo dục Mầm non (tổ hợp năng khiếu M00/M01/M02/M03 chưa xác minh) và LOẠI TRỪ Ngôn ngữ Anh/Việt Nam học/Quản trị kinh doanh/Công nghệ thông tin/Bảo vệ thực vật — các ngành này CÙNG hiển thị điểm chuẩn "14" (một số ngành để trống ở nguồn cross-check) — xác nhận qua vietjack.com đây là MỨC NHẬN HỒ SƠ (điểm sàn 14-19 tùy ngành), KHÔNG PHẢI điểm trúng tuyển chính thức, nên không đủ tin cậy để mô hình hoá.',
  },
  {
    id: 'qnamu-threshold-secondary-2025',
    publisher: 'Sforum / CellphoneS (tường thuật thông báo chính thức Trường Đại học Quảng Nam)',
    title: 'Điểm chuẩn Đại học Quảng Nam 2025',
    url: 'https://cellphones.com.vn/sforum/diem-chuan-dai-hoc-quang-nam-2025',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `qnamu-threshold-2025` (trangedu) — khớp số liệu TUYỆT ĐỐI cho toàn bộ 29 cặp ngành/tổ hợp đã mô hình hoá, thêm 2 tổ hợp Sư phạm Toán (D01=23,5; X01=24) trangedu không liệt kê nhưng không mâu thuẫn. Cùng xác nhận 5 ngành Ngôn ngữ Anh/Việt Nam học/Quản trị kinh doanh/Công nghệ thông tin/Bảo vệ thực vật KHÔNG có số liệu điểm chuẩn thật (trống hoặc chỉ "14").',
  },
  {
    id: 'qnamu-formula-2025',
    publisher: 'Vietjack.com (tổng hợp điểm chuẩn tuyển sinh, trích đề án tuyển sinh trường)',
    title: 'Điểm chuẩn Đại học Quảng Nam QNU 2026 (2025, 2024, ...)',
    url: 'https://vietjack.com/diem-chuan-dai-hoc/dai-hoc-quang-nam.jsp',
    accessedAt: '2026-09-02',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Trích nguyên văn công thức: "Điểm trúng tuyển là tổng điểm 3 môn theo tổ hợp xét tuyển (không nhân hệ số) và điểm ưu tiên" và "Điểm ưu tiên quy đổi = [(30 - tổng điểm 3 môn)/7,5] x Tổng điểm ưu tiên thông thường", "Điểm ưu tiên quy đổi áp dụng với thí sinh đạt tổng điểm 3 môn từ 22,5 điểm trở lên" — XÁC NHẬN TRỰC TIẾP (a) không nhân hệ số, (b) điểm chuẩn công bố ĐÃ bao hàm điểm ưu tiên, (c) công thức giảm dần điểm ưu tiên KHỚP TUYỆT ĐỐI với khung quốc gia (ngưỡng 22,5, số chia 7,5) đã dùng cho QNU/QBU — không cần suy diễn riêng cho QNamU. Cũng xác nhận bảng "14-19 điểm" ở nhiều ngành là mức nhận hồ sơ, không phải điểm trúng tuyển.',
  },
];
