import type { AdmissionSource } from '../../core/sourceRegistry';

export const vnuedSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vnued-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Trường Đại học Giáo dục - ĐHQGHN)',
    title: 'Điểm chuẩn Trường Đại Học Giáo Dục - ĐHQG Hà Nội 2025',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-giao-duc-dai-hoc-quoc-gia-ha-noi-QHS.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn phương thức 100 (xét kết quả thi TN THPT), trích nguyên văn ghi chú của trang: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (xác nhận TRỰC TIẾP đã cộng ưu tiên, cùng câu mẫu dùng cho VNU-UEB trên cùng trang). Bảng điểm chuẩn (thang 30): Sư phạm Lịch sử - Địa lý 29,84 (A07,C00); Sư phạm Lịch sử 28,99 (A07,C00,C03,D09,D14); Giáo dục Tiểu học 28,60 (A00,B00,C00,D01,C14); Sư phạm Toán học 28,57 (A00,B00,B03,C01,C02,D01); Sư phạm Ngữ văn 28,45 (C00,C03,C04,D01,D14,D15); Sư phạm Vật lí 28,00 (A00,A01,A02,C01); Giáo dục Mầm non 27,80 (A00,B00,C00,D01,C14); Sư phạm Hoá học 27,74 (A00,B00,C02,D07); Sư phạm Khoa học Tự nhiên 25,58 (A00,A02,B00); Sư phạm Sinh học 25,37 (A02,B00,B03,B08); và nhóm "Khoa học giáo dục và khác" 25,57 (A00,A01,B00,C00,D01,C14, KHÔNG mô hình hoá — gộp nhiều chuyên ngành nhỏ, không rõ 1 mã ngành cụ thể).',
  },
  {
    id: 'vnued-threshold-secondary-2025',
    publisher: 'VnExpress (tường thuật thông báo chính thức Trường Đại học Giáo dục - ĐHQGHN)',
    title: 'Điểm chuẩn Đại học Giáo dục (UEd) 2025 chính xác nhất',
    url: 'https://vnexpress.net/diem-chuan-dai-hoc-giao-duc-ued-2025-chinh-xac-nhat-4930396.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-23',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `vnued-threshold-2025` (tuyensinh247) — khớp dải điểm 25,37-29,84, khớp ngành cao nhất (Sư phạm Lịch sử - Địa lý 29,84) và ngành thấp nhất (nhóm khoa học giáo dục quanh 25,37-25,57). Nguồn gốc chính thức (education.vnu.edu.vn) trả bảng dạng ẢNH khi truy cập trực tiếp — dùng kỹ thuật cross-check 2 nguồn báo (cùng tiền lệ HPMU/VNU-UEB).',
  },
  {
    id: 'vnued-official-portal-2025',
    publisher: 'Trường Đại học Giáo dục - ĐHQGHN',
    title: 'Điểm chuẩn trúng tuyển vào đại học chính quy năm 2025 của Trường Đại học Giáo dục - ĐHQGHN',
    url: 'https://education.vnu.edu.vn/tuyen-sinh/dai-hoc-chinh-quy/diem-chuan-trung-tuyen-vao-dai-hoc-chinh-quy-nam-2025-cua-truong-dai-hoc-giao-duc-dhqghn/',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'government',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note: 'Trang xác nhận đã đăng thông báo điểm chuẩn chính thức của trường nhưng bảng số liệu chỉ hiển thị dạng ẢNH — không trích xuất được bằng text extraction thông thường. KHÔNG dùng làm nguồn số liệu chính, chỉ liệt kê để tham chiếu.',
  },
];
