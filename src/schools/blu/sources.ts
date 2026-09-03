import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface BluSource {
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
 * Trường Đại học Bạc Liêu (BLU, mã trường DBL) — cổng tuyển sinh chính thức tuyensinh.blu.edu.vn là
 * SPA (React/Vue render phía client) — nội dung text không fetch được qua WebFetch thường, nhưng
 * chrome-devtools (render đầy đủ DOM + đọc PDF/ảnh đính kèm bằng vision) lấy được toàn bộ dữ liệu:
 * (1) văn bản THÔNG BÁO số 47/TB-ĐHBL ký ngày 10/7/2026 công bố ngưỡng đảm bảo chất lượng đầu vào
 * (PDF gốc, `viewer.html?file=...pdf` nhúng PDF.js, tải trực tiếp và đọc bằng vision); (2) trang
 * "Ngành, tổ hợp và số lượng tuyển sinh" (HTML/React table, đọc qua accessibility snapshot — không
 * phải ảnh) liệt kê đủ 15 ngành/mã ngành/tổ hợp môn xét tuyển; (3) trang "Chính sách ưu tiên trong
 * tuyển sinh" (HTML) công bố nguyên văn công thức điểm ưu tiên; (4) ẢNH "ĐIỂM CHUẨN TRÚNG TUYỂN NĂM
 * 2026" đính kèm Thông báo ngày 10/8/2026 (căn cứ Quyết định số 426/QĐ-ĐHBL cùng ngày của Hiệu
 * trưởng) — điểm chuẩn CHÍNH THỨC đợt 1 theo từng ngành, đọc bằng vision.
 */
export const bluSources: BluSource[] = [
  {
    id: 'blu-cutoff-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Bạc Liêu',
    title:
      'Thông báo công bố điểm chuẩn trúng tuyển các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng đợt 1 năm 2026 (căn cứ Quyết định số 426/QĐ-ĐHBL ngày 10/8/2026 của Hiệu trưởng)',
    url: 'https://tuyensinh.blu.edu.vn/thong-bao-cong-bo-diem-chuan-trung-tuyen-cac-nganh-dao-tao-trinh-do-dai-hoc-va-nganh-giao-duc-mam-non-trinh-do-cao-dang-dot-1-nam-2026-11292',
    accessedAt: '2026-09-03',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ảnh "ĐIỂM CHUẨN TRÚNG TUYỂN NĂM 2026" đính kèm bài viết (đọc trực tiếp bằng vision), cột "Xét kết quả thi TNTHPT/ kết hợp điểm thi NK" (thang 30, phương thức 100/405): 7140202 Giáo dục Tiểu học 23,13; 7140209 Sư phạm Toán học 24,66; 7140212 Sư phạm Hóa học 23,60; 7140213 Sư phạm Sinh học 22,60; 7220101 Tiếng Việt và Văn hóa Việt Nam 15,0; 7220201 Ngôn ngữ Anh 15,0; 7340101 Quản trị kinh doanh 15,0; 7340201 Tài chính – Ngân hàng 15,0; 7340301 Kế toán 15,0; 7440301 Khoa học môi trường 15,0; 7480201 Công nghệ thông tin 15,0; 7620105 Chăn nuôi 15,0; 7620112 Bảo vệ thực vật 15,0; 7620301 Nuôi trồng thủy sản 15,0. Ngành Giáo dục Mầm non (51140201, trình độ cao đẳng, tổ hợp năng khiếu M00) điểm chuẩn 18,61 — KHÔNG mô hình hoá (khác trình độ đào tạo + tổ hợp năng khiếu không có SubjectId, xem `knowledgeGaps.ts`).',
  },
  {
    id: 'blu-combination-2026',
    publisher: 'Trường Đại học Bạc Liêu (Hội đồng tuyển sinh)',
    title: 'Ngành, tổ hợp và số lượng tuyển sinh năm 2026',
    url: 'https://tuyensinh.blu.edu.vn/tuyensinh/nganh-to-hop-va-so-luong-tuyen-sinh-11145',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bảng "Tổ hợp môn theo phương thức xét tuyển năm 2026" (HTML, đọc qua accessibility snapshot đầy đủ — không qua ảnh): 7140202 Giáo dục Tiểu học B03/C01/C02/C03/C04/D01; 7140209 Sư phạm Toán học A00/A01/A02/B00/C01/C02/D01; 7140212 Sư phạm Hóa học A00/B00/C02/C08/D07; 7140213 Sư phạm Sinh học A02/B00/B03/B08/C08; 7340101 Quản trị kinh doanh, 7340201 Tài chính – Ngân hàng, 7340301 Kế toán (cùng tổ hợp) A00/A01/B03/C01/C02/C03/C04/D01/X01; 7440301 Khoa học môi trường, 7620105 Chăn nuôi, 7620112 Bảo vệ thực vật, 7620301 Nuôi trồng thủy sản (cùng tổ hợp) B00/B03/B08/C01/C02/C03/C04/D01/X04; 7480201 Công nghệ thông tin A00/A01/B03/C01/C02/C03/C04/D01/X02; 7220101 Tiếng Việt và Văn hóa Việt Nam B03/C00/C01/C02/C03/C04/D01; 7220201 Ngôn ngữ Anh D01/D11/D12/D13/D14/D15/X78/X79. Tổ hợp X04 (Toán, Ngữ văn, Công nghệ nông nghiệp) KHÔNG có SubjectId tương ứng trong hệ thống — loại khỏi 4 ngành có dùng (còn 8/9 tổ hợp mỗi ngành), xem `knowledgeGaps.ts`. Kèm bảng "Bảng tổ hợp môn năm 2026" tra cứu mã tổ hợp → tên môn thành phần.',
  },
  {
    id: 'blu-priority-2026',
    publisher: 'Trường Đại học Bạc Liêu (Hội đồng tuyển sinh)',
    title: 'Chính sách ưu tiên trong tuyển sinh năm 2026',
    url: 'https://tuyensinh.blu.edu.vn/tuyensinh/chinh-sach-uu-tien-trong-tuyen-sinh-11146',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Công bố nguyên văn công thức: "Mức điểm ưu tiên = Mức điểm ưu tiên khu vực + Mức điểm ưu tiên đối tượng". Ví dụ minh hoạ nguyên văn của trường xác nhận mức KV1 = 0,75 và mức nhóm đối tượng ưu tiên 2 = 1,00 (khớp khung quốc gia hiện hành, Thông tư 06/2025/TT-BGDĐT): "Thí sinh thuộc khu vực 1, đối tượng ưu tiên 05 (nhóm đối tượng ưu tiên 2)... Mức điểm ưu tiên = 0,75 + 1,00 = 1,75 điểm". Công thức giảm dần cho thí sinh đạt tổng điểm từ 22,50/30 trở lên, công bố nguyên văn: "Điểm ưu tiên = [(30 – Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên".',
  },
  {
    id: 'blu-threshold-floor-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Bạc Liêu',
    title: 'Thông báo số 47/TB-ĐHBL — Công bố ngưỡng đảm bảo chất lượng đầu vào năm 2026',
    url: 'https://tuyensinh.blu.edu.vn/cong-bo-nguong-dam-bao-chat-luong-dau-vao-nam-2026-11286',
    accessedAt: '2026-09-03',
    publishedAt: '2026-07-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc có chữ ký/con dấu (nhúng PDF.js viewer trong trang, tải trực tiếp và đọc bằng vision), Số 47/TB-ĐHBL, Cà Mau ngày 10/7/2026. Bảng ngưỡng đầu vào (điểm sàn nộp hồ sơ, KHÔNG phải điểm chuẩn trúng tuyển — dùng để đối chiếu, không dùng làm threshold runtime vì đã có điểm chuẩn thật ở `blu-cutoff-2026`) khớp với ngành/mã ngành trong `blu-combination-2026`.',
  },
];
