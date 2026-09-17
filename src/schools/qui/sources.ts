import type { AdmissionSource } from '../../core/sourceRegistry';

export const quiSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'qui-threshold-notice-2026',
    publisher: 'Trường Đại học Công nghiệp Quảng Ninh (QUI, mã trường DDM)',
    title: 'Thông báo ngưỡng đảm bảo chất lượng và bảng quy đổi điểm tương đương giữa các phương thức xét tuyển đại học chính quy năm 2026',
    url: 'https://tuyensinh.qui.edu.vn/tuyen-sinh-dai-hoc/thong-bao-nguong-dam-bao-chat-luong-va-bang-quy-doi-diem-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-1117.html',
    accessedAt: '2026-09-17',
    publishedAt: '2026-07-12',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đọc qua chrome-devtools (trang nukeviet render đủ text, không cần OCR). Bảng "1. Ngưỡng đảm bảo chất lượng đầu vào" đầy đủ 12 mã ngành, cột "Theo kết quả điểm thi tốt nghiệp THPT 2026" = 15 ĐỒNG NHẤT cho TẤT CẢ 12 ngành. Trang này KHÔNG có bảng điểm chuẩn trúng tuyển thật (bài viết riêng "Thông báo điểm chuẩn trúng tuyển đợt 1 năm 2026" bị lỗi/thiếu nội dung — mục "1. Điểm trúng tuyển theo từng ngành" trống hoàn toàn khi kiểm tra qua chrome-devtools). Không có công thức ĐXT hay ghi chú về việc gồm điểm ưu tiên hay chưa → so RAW (judgment call, tiền lệ TBDU/BAFU khi im lặng). Đây là điểm SÀN (ngưỡng nhận hồ sơ), không phải điểm chuẩn trúng tuyển cuối cùng.',
  },
];
