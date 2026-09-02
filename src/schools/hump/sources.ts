import type { AdmissionSource } from '../../core/sourceRegistry';

export const humpSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hump-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Trường Đại học Y - Dược, Đại học Huế)',
    title: 'Điểm chuẩn Trường Đại Học Y Dược Huế 2025 chính xác',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-y-duoc-hue-DHY.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn phương thức xét kết quả thi TN THPT, trích nguyên văn ghi chú của trang: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (xác nhận TRỰC TIẾP đã cộng ưu tiên). Bảng điểm chuẩn (thang 30, 11 ngành, mỗi ngành 1 mức chung mọi tổ hợp): Y khoa 25,17 (B00,B08,D07); Răng - Hàm - Mặt 24,40 (B00,B08,D07); Dược học 21,25 (A00,B00,D07); Y học cổ truyền 19,60 (B00,B08,D07); Kỹ thuật hình ảnh y học 19,00 (A00,B00,B08,D07); Kỹ thuật xét nghiệm y học 17,25 (B00,B08,D07); Y học dự phòng, Điều dưỡng, Hộ sinh, Dinh dưỡng, Y tế công cộng đều 17,00 (B00,B08,D07). Mã ngành đối chiếu qua baohatinh.vn (đăng lại nguyên bảng có cột mã ngành, series 772xxxx chuẩn quốc gia).',
  },
  {
    id: 'hump-threshold-secondary-2025',
    publisher: 'Báo Hà Tĩnh (đăng lại/tổng hợp thông báo chính thức Trường Đại học Y - Dược, Đại học Huế)',
    title: 'Điểm chuẩn Trường Đại Học Y Dược Huế 2025 – Theo ngành và tổ hợp xét tuyển',
    url: 'https://baohatinh.vn/cong-cu/diem-chuan/dhy-truong-dai-hoc-y-duoc-hue',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `hump-threshold-2025` (tuyensinh247) — bảng đầy đủ theo mã ngành x TỪNG tổ hợp riêng lẻ (không gộp), khớp TUYỆT ĐỐI 10/11 ngành (thiếu riêng dòng Y khoa trong bảng thu thập được từ nguồn này, nhưng không có dòng nào mâu thuẫn). Nguồn gốc chính thức (huemed-univ.edu.vn, dhu.edu.vn) chưa fetch trực tiếp được trong batch này — dùng 2 nguồn báo đăng lại dạng text khớp nhau (cùng kỹ thuật cross-check HUC/VNU-UET/HUS/USSH).',
  },
];
