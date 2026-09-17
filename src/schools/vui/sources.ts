import type { AdmissionSource } from '../../core/sourceRegistry';

export const vuiSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vui-cutoff-notice-2026',
    publisher: 'Trường Đại học Công nghiệp Việt Trì (VUI)',
    title: 'Thông báo số 121/ĐHCNVT về điểm trúng tuyển đại học chính quy đợt 1 năm 2026',
    url: 'https://congthuong.vn/truong-dai-hoc-cong-nghiep-viet-tri-cong-bo-diem-chuan-2026-468558.html',
    accessedAt: '2026-09-17',
    publishedAt: '2026-07-09',
    sourceType: 'government',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức vui.edu.vn không tìm được bài đăng riêng cho điểm chuẩn 2026 (mục "Tra cứu điểm trúng tuyển" trên site có bảng nhưng KHÔNG có dữ liệu — tbody rỗng khi kiểm tra qua chrome-devtools). Dùng congthuong.vn (Bộ Công Thương — cơ quan chủ quản trực tiếp của VUI, không phải báo chí độc lập) làm nguồn, trích dẫn đúng số văn bản "Thông báo số 121/ĐHCNVT ngày 9/7/2026": "18 ngành đào tạo của trường cùng có mức điểm trúng tuyển 15 điểm" — "Điểm trúng tuyển là điểm đã quy đổi về thang 30, lấy điểm thi tốt nghiệp THPT làm điểm gốc." Không nói rõ đã gồm điểm ưu tiên hay chưa → so RAW (judgment call, tiền lệ TBDU/BAFU khi im lặng). Đây là điểm chuẩn TRÚNG TUYỂN thật, đồng nhất cả 18 ngành, không phải ngưỡng nhận hồ sơ.',
  },
];
