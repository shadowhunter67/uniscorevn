import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface ThanglongSource {
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

/**
 * Cả 2 thông báo gốc đăng trên thanglong.edu.vn dưới dạng embed Google Drive PDF (Drupal iframe,
 * `<iframe src="https://drive.google.com/file/d/…/preview">`) — trang HTML không có text; tải PDF
 * gốc qua link embed và đọc trực tiếp bằng vision (có chữ ký + con dấu Hội đồng tuyển sinh).
 */
export const thanglongSources: ThanglongSource[] = [
  {
    id: 'thanglong-threshold-2025',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Thăng Long',
    title: 'Thông báo số 25082205/TB-ĐHTL — Điểm trúng tuyển đại học chính quy đợt 1 năm 2025',
    url: 'https://thanglong.edu.vn/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-dot-1-nam-2025-21465.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'PDF gốc (2 trang, chữ ký TS. Trương Nhật Hoa + con dấu trường, tải qua embed Google Drive của trang thông báo, đọc bằng vision): "Số: 25082205/TB-ĐHTL, Hà Nội, ngày 22 tháng 8 năm 2025 — THÔNG BÁO Điểm trúng tuyển đại học chính quy đợt 1 năm 2025". Bảng 24 ngành/mã ngành, cột "Điểm trúng tuyển (Thang điểm 30)": Thanh nhạc 7210205 18,00; Thiết kế đồ hoạ 7210403 20,00; Ngôn ngữ Anh 7220201 19,70; Ngôn ngữ Trung Quốc 7220204 21,20; Ngôn ngữ Nhật 7220209 16,00; Ngôn ngữ Hàn Quốc 7220210 19,30; Kinh tế quốc tế 7310106 20,60; Việt Nam học 7310630 21,88; Truyền thông đa phương tiện 7320104 23,75; Quản trị kinh doanh 7340101 20,20; Marketing 7340115 22,20; Thương mại điện tử 7340122 22,50; Tài chính - Ngân hàng 7340201 19,50; Kế toán 7340301 19,78; Luật kinh tế 7380107 22,30; Khoa học máy tính 7480101 16,00; Mạng máy tính và truyền thông dữ liệu 7480102 16,00; Hệ thống thông tin 7480104 16,00; Công nghệ thông tin 7480201 17,00; Trí tuệ nhân tạo 7480207 17,00; Logistics và Quản lý chuỗi cung ứng 7510605 21,40; Điều dưỡng 7720301 19,55; Quản trị dịch vụ du lịch và lữ hành 7810103 20,15; Quản trị khách sạn 7810201 20,15. Ghi chú cuối bảng: "Điểm trúng tuyển trên được tính theo tổ hợp gốc, các tổ hợp và phương thức xét tuyển khác thí sinh tra cứu bằng quy đổi theo Thông báo số 25072301/TB-ĐHTL" (xem `thanglong-combo-delta-2025`). Căn cứ pháp lý nêu trong văn bản: Thông tư 02/VBHN-BGDĐT (02/4/2025), Thông báo 25072203/TB-ĐHTL (22/7/2025, ngưỡng đảm bảo chất lượng đầu vào), Quyết định 25072301/QĐ-ĐHTL (23/7/2025, quy tắc quy đổi).',
  },
  {
    id: 'thanglong-combo-delta-2025',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Thăng Long',
    title: 'Thông báo số 25072301/TB-ĐHTL — Quy tắc quy đổi tương đương mức điểm giữa các tổ hợp và phương thức xét tuyển đại học chính quy năm 2025',
    url: 'https://thanglong.edu.vn/thong-bao-quy-tac-quy-doi-tuong-duong-muc-diem-giua-cac-to-hop-va-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2025-21442.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-07-23',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'PDF gốc (4 trang, chữ ký TS. Trương Nhật Hoa + con dấu trường, tải qua embed Google Drive của trang thông báo, đọc bằng vision): "Số: 25072301/TB-ĐHTL, Hà Nội, ngày 23 tháng 7 năm 2025". Chia ngành thành 4 nhóm theo tổ hợp gốc — Nhóm 1 (gốc A00): Kinh tế quốc tế, Quản trị kinh doanh, Marketing, Thương mại điện tử, Tài chính - Ngân hàng, Kế toán, Logistics và Quản lý chuỗi cung ứng, Khoa học máy tính, Mạng máy tính và truyền thông dữ liệu, Hệ thống thông tin, Công nghệ thông tin, Trí tuệ nhân tạo, Quản trị dịch vụ du lịch và lữ hành, Quản trị khách sạn; Nhóm 2 (gốc D01): Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Ngôn ngữ Nhật, Ngôn ngữ Hàn Quốc, Việt Nam học, Truyền thông đa phương tiện, Luật kinh tế; Nhóm 3 (gốc B00): Điều dưỡng; Nhóm 4 (không có tổ hợp gốc, không quy đổi): Thanh nhạc, Thiết kế đồ hoạ. Bảng "Mức chênh lệch điểm so với tổ hợp gốc": Nhóm 1 — A07/X01/X06/X25/X26: 0; A01/D01/D07/D09/D10: -1,0. Nhóm 2 — C00/X70/X74: +2,0; C03/C04/D14/D15/X01/X78: +1,0; D04/D06/DD2: 0. Nhóm 3 — A00/B03/C02: +1,0; B08/D07: 0. Nhóm 4: không có chênh lệch (chỉ 1 phương thức duy nhất). Mục 2 quy đổi tương đương giữa 5 phương thức xét tuyển (chứng chỉ ngoại ngữ quốc tế, HSA/TSA/SPT, học bạ, học bạ+năng khiếu) — module này chỉ dùng Mục 1 (quy đổi tổ hợp) cho phương thức 1 (thi TN THPT).',
  },
];
