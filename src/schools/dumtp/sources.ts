import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface DumtpSource {
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

export const dumtpSources: DumtpSource[] = [
  {
    id: 'dumtp-threshold-2025',
    publisher: 'Trường Đại học Kỹ thuật Y - Dược Đà Nẵng (mã trường YDN, ydn.edu.vn, tên miền chính chủ)',
    title: 'Quyết định số 625/QĐ-ĐHKTYDĐN ngày 22/8/2025 — Về việc công bố điểm trúng tuyển vào đại học chính quy năm 2025',
    url: 'https://ydn.edu.vn/news-posts/dumpt-admission/dai-hoc-081c/quyet-dinh-ve-viec-cong-bo-diem-trung-tuyen-vao-dai-hoc-chinh-quy-nam-2025-a6fe',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Văn bản 2 trang, chữ ký Hiệu trưởng (Lê Thị Thúy) + con dấu Trường Đại học Kỹ thuật Y - Dược Đà Nẵng, PDF gắn trực tiếp trên trang tin ydn.edu.vn (qua Google Drive, không qua bên thứ ba tổng hợp). Điều 1 công bố điểm trúng tuyển thang 30 cho 7 ngành (9 mã tính cả 3 chuyên ngành Điều dưỡng): Y khoa 22,85; Dược học 19,00; Điều dưỡng đa khoa 20,50; Điều dưỡng nha khoa 20,50; Điều dưỡng gây mê hồi sức 20,70; Kỹ thuật xét nghiệm y học 20,85; Kỹ thuật hình ảnh y học 20,20; Kỹ thuật phục hồi chức năng 21,10; Y tế công cộng 15,00. Điều 2 nêu điều kiện phụ khi bằng điểm (phương thức 100: ưu tiên điểm môn Toán rồi thứ tự nguyện vọng) — module KHÔNG mô hình hoá điều kiện phụ này (không có input "thứ tự nguyện vọng" trong hệ thống, xem `knowledgeGaps.ts`).',
  },
  {
    id: 'dumtp-dean-2025',
    publisher: 'Trường Đại học Kỹ thuật Y - Dược Đà Nẵng (ydn.edu.vn, tên miền chính chủ)',
    title: 'Quyết định 2xx/QĐ-ĐHKTYDĐN — Thông tin tuyển sinh đại học năm 2025',
    url: 'https://ydn.edu.vn/news-posts/dumpt-admission/dai-hoc-081c/thong-tin-tuyen-sinh-dai-hoc-2025--tuong-ung-voi-de-an-tuyen-sinh-cua-cac-nam--bf6e',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Đề án tuyển sinh 2025 dạng PDF (28 trang, text đọc được qua pdftotext dù dấu tiếng Việt bị lỗi encode một phần — vẫn xác định được nội dung), công bố trực tiếp trên ydn.edu.vn qua Google Drive. Mục II.2 liệt kê 4 phương thức: PT1 (mã 100, thi TN THPT), PT2 (mã 409, thi TN THPT kết hợp IELTS — chỉ áp dụng tổ hợp có Tiếng Anh B08/D07), PT3 (mã 200, học bạ, chỉ áp dụng 5/9 mã ngành không cấp chứng chỉ hành nghề trực tiếp), PT4 (mã 301, tuyển thẳng). Mục 5.1 (bảng "Tổ hợp xét tuyển"): "Nhà trường xét tuyển tất cả các ngành với 4 tổ hợp xét tuyển A00 (Toán-Lý-Hóa), B00 (Toán-Hóa-Sinh), B08 (Toán-Sinh-Anh), D07 (Toán-Hóa-Anh)" — ÁP DỤNG ĐỒNG NHẤT cho toàn bộ 9 mã ngành/chuyên ngành, không phân biệt theo ngành. Mục 5.2 "Điểm cộng": "Thí sinh được cộng điểm ưu tiên theo Quy chế tuyển sinh hiện hành của Nhà trường. Ngoài điểm ưu tiên, Nhà trường không tính điểm cộng." — và công thức giảm điểm ưu tiên cho thí sinh đạt tổng điểm từ 22,5/30 trở lên: "Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên quy định" — GIỐNG HỆT công thức quốc gia (Văn bản hợp nhất 02/VBHN-BGDĐT) đã dùng ở CTUET/TNUT/HTU/DNU/TUMP. Mục 3.2: "Điểm trúng tuyển là điểm xét tuyển thấp nhất mà thí sinh được xét trúng tuyển cho ngành đào tạo theo thang điểm 30 cho TẤT CẢ các tổ hợp xét tuyển" — xác nhận ngưỡng ở `dumtp-threshold-2025` áp dụng như nhau cho cả 4 tổ hợp của mỗi ngành. Tài liệu KHÔNG phát biểu lại công thức cộng-đơn-giản (tổng 3 môn không hệ số) cho riêng PT1 bằng một câu tường minh — công thức có hệ số quy đổi (mục 5, "Cách tính điểm xét tuyển đối với các phương thức xét kết quả học tập cấp THPT") chỉ áp dụng cho PT3 (học bạ); PT1 được suy ra là tổng thô 3 môn thi (không hệ số, thang 30 cho mọi tổ hợp) từ mục 3.2 + không có đoạn nào nêu hệ số/trọng số riêng cho PT1.',
  },
];
