import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HustSource {
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

export const hustSources: HustSource[] = [
  {
    id: 'hust-threshold-2026',
    publisher: 'Đại học Bách khoa Hà Nội (HUST)',
    title:
      'Thông cáo báo chí về độ lệch giữa các tổ hợp xét tuyển, bảng quy đổi điểm chuẩn và dự báo mức điểm trúng tuyển vào các ngành của Đại học Bách khoa Hà Nội năm 2026',
    url: 'https://ts.hust.edu.vn/tin-tuc/thong-cao-bao-chi-ve-do-lech-giua-cac-to-hop-xet-tuyen-bang-quy-doi-diem-chuan-va-du-bao-muc-diem-trung-tuyen-vao-cac-nganh-cua-dai-hoc-bach-khoa-ha-noi-nam-2026',
    accessedAt: '2026-08-29',
    publishedAt: '2026-07-03',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức ts.hust.edu.vn (đọc trực tiếp qua curl 2026-08-29). Ảnh "Ngưỡng đảm bảo chất lượng" (https://ts.hust.edu.vn/storage/app/public/posts/July2026/b7.jpg, đọc bằng vision) công bố ngưỡng đảm bảo chất lượng đầu vào 2026 theo 2 khối nhóm ngành cho Điểm thi TN THPT (thang 30): Khối nhóm ngành Kỹ thuật >= 20,0 ; Khối nhóm ngành Kinh tế, Giáo dục, Ngoại ngữ >= 19,5. Ngưỡng công bố theo KHỐI NHÓM NGÀNH (2 nhóm), KHÔNG theo từng chương trình/mã ngành cụ thể trong số 68 chương trình đào tạo — bảng ánh xạ chương trình -> khối nhóm ngành chưa tìm được nguồn HUST tự công bố dạng bảng, nên KHÔNG mô hình hoá chọn ngành cụ thể. Trang không đề cập điểm ưu tiên khu vực/đối tượng hay điểm cộng cho phương thức thi TN THPT trong nội dung đọc được.',
  },
  {
    id: 'hust-formula-official-2025',
    publisher: 'Đại học Bách khoa Hà Nội (HUST) — ts.hust.edu.vn',
    title: 'Điểm chuẩn cao nhất ĐH Bách khoa Hà Nội 2025: 29,39 điểm THPT (tương đương 93,96 điểm XTTN và 86,97 điểm TSA)',
    url: 'https://ts.hust.edu.vn/tin-tuc/diem-chuan-cao-nhat-dh-bach-khoa-ha-noi-2025-29-39-diem-thpt-tuong-duong-93-96-diem-xttn-va-86-97-diem-tsa',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Trang chính thức ts.hust.edu.vn (đọc trực tiếp qua curl 2026-09-03) — nêu NGUYÊN VĂN công thức Điểm xét (ĐX) áp dụng cho điểm chuẩn 2025: (a) tổ hợp KHÔNG có môn chính = tổng 3 môn + điểm ưu tiên; (b) tổ hợp CÓ môn chính = [(3 môn + môn chính) x 3/4] + điểm ưu tiên; (c) tổ hợp K01 = [(Toán x3 + Văn x1 + Lý/Hóa/Sinh/Tin x2) x 1/2] + điểm ưu tiên; (d)/(e) áp dụng cho ĐGTD/XTTN (không mô hình hoá). Footnote dẫn Thông tư 08/2022 + 06/2025/TT-BGDĐT cho điểm ưu tiên đối tượng/khu vực (không nêu giá trị cụ thể). Xác nhận trực tiếp mức điểm chuẩn cao nhất 29,39 (IT-E10) và điểm TSA/XTTN tương đương — khớp với bảng đầy đủ ở `hust-threshold-2025`.',
  },
  {
    id: 'hust-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Đại học Bách khoa Hà Nội)',
    title: 'Điểm chuẩn Đại Học Bách Khoa Hà Nội 2025 chính xác',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-bach-khoa-ha-noi-BKA.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn đầy đủ 65/65 chương trình đào tạo, nhánh xét kết quả thi TN THPT, MỖI chương trình liệt kê 1-2 nhóm tổ hợp kèm ghi chú "Môn chính: Toán"/"Môn chính: Ngoại ngữ" khi công thức (b) áp dụng — khớp đúng với công thức (a)/(b) đọc trực tiếp từ `hust-formula-official-2025`. Dải điểm chuẩn 19,00 (TROY-BA, tổ hợp D01) đến 29,39 (IT-E10, tổ hợp A00/A01) — khớp TUYỆT ĐỐI với 4 mức top/bottom mà báo chí (vnexpress/nhandan/chinhphu.vn) đều dẫn lại. Tổ hợp gốc dùng A00/A01/A02/B00/D01/D07 (đã có taxonomy) + B03/C01/C02 (đã có) + X02 (Toán/Văn/Tin — THÊM MỚI batch này) + D04/D26/D28/D29/K01 (dùng ngoại ngữ Trung/Đức/Nhật/Pháp hoặc cấu trúc trọng số 4-môn — KHÔNG mô hình hoá, cùng tiền lệ HAUI/HDIU).',
  },
  {
    id: 'hust-threshold-secondary-2025',
    publisher: 'VnExpress (tường thuật thông báo chính thức Đại học Bách khoa Hà Nội)',
    title: 'Điểm chuẩn Đại học Bách khoa Hà Nội (HUST) 2025 chính xác nhất',
    url: 'https://vnexpress.net/diem-chuan-dai-hoc-bach-khoa-ha-noi-hust-2025-chinh-xac-nhat-4928933.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `hust-threshold-2025` (tuyensinh247) — xác nhận đúng mức cao nhất 29,39 (IT-E10, Khoa học dữ liệu và Trí tuệ nhân tạo CT tiên tiến), 29,19 (IT1, Khoa học Máy tính), 28,48 (EE2, Kỹ thuật Điều khiển - Tự động hoá) và mức thấp nhất 19,00 (TROY-BA, Quản trị kinh doanh hợp tác ĐH Troy) — khớp TUYỆT ĐỐI 4/4 mức đối chiếu được (nhandan.vn và chinhphu.vn cùng dẫn đúng các số này).',
  },
];
