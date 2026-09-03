import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VttuSource {
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
 * Trường Đại học Võ Trường Toản (VTTU, mã trường VTT, Cần Thơ — trước là Hậu Giang) — cổng
 * vttu.edu.vn dùng WordPress, bài viết chính "Điểm chuẩn đảm bảo chất lượng đầu vào và quy tắc quy
 * đổi điểm tương đương xét tuyển đại học hệ chính quy năm 2025" trình bày toàn bộ nội dung (công thức
 * chung, bảng quy đổi bách phân vị, ngành/tổ hợp/chỉ tiêu) dưới dạng ẢNH nhúng trực tiếp từ WordPress
 * media library (`vttu.edu.vn/wp-content/uploads/...`), không phải text/HTML. WebFetch chỉ lấy được
 * caption/text điều hướng, không đọc được nội dung ảnh; curl trực tiếp tới URL ảnh bị chặn 403
 * (hotlink protection theo Referer) — dùng chrome-devtools (điều hướng thẳng trong trình duyệt, nơi
 * Referer hợp lệ) để tải ảnh gốc rồi đọc bằng vision.
 */
export const vttuSources: VttuSource[] = [
  {
    id: 'vttu-threshold-2025',
    publisher: 'Trường Đại học Võ Trường Toản (Hội đồng tuyển sinh)',
    title: 'Điểm chuẩn đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm tương đương xét tuyển đại học hệ chính quy năm 2025',
    url: 'https://vttu.edu.vn/diem-chuan-dam-bao-chat-luong-dau-vao-va-quy-tac-quy-doi-diem-tuong-duong-xet-tuyen-dai-hoc-he-chinh-quy-nam-2025/',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Ảnh "CÔNG BỐ MỨC ĐIỂM NHẬN HỒ SƠ XÉT TUYỂN" (`vttu.edu.vn/wp-content/uploads/2025/07/bai-15.jpg`, độ phân giải gốc 2000x2633, đọc bằng vision qua chrome-devtools — curl trực tiếp bị 403 do hotlink protection). Mức điểm nhận hồ sơ (thang 30, nhánh xét kết quả thi TN THPT/THPT quốc gia) theo 9 ngành: Y khoa 20,5; Răng - Hàm - Mặt 20,5; Dược học 19,0; Luật 18,0; Công nghệ thông tin 15,0; Quản trị kinh doanh 15,0; Tài chính - Ngân hàng 15,0; Kế toán 15,0; Công nghệ Kỹ thuật ô tô 15,0. Trường tự gọi đây là "mức điểm nhận hồ sơ xét tuyển", KHÔNG dùng cụm "điểm chuẩn trúng tuyển" — với trường tư thục không cạnh tranh, ngưỡng này là mức nhận hồ sơ và đồng thời là mức trúng tuyển trên thực tế (khớp nguyên văn với cross-check thứ cấp `vttu-formula-crosscheck-2025`). Chú thích cuối ảnh xác nhận đây là ngưỡng của "phương thức xét tuyển theo điểm thi tốt nghiệp THPT" (phân biệt với nhánh học bạ mô tả ở cuối trang, KHÔNG mô hình hoá trong module này).',
  },
  {
    id: 'vttu-combination-2025',
    publisher: 'Trường Đại học Võ Trường Toản (Hội đồng tuyển sinh)',
    title: 'Điểm chuẩn đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm tương đương xét tuyển đại học hệ chính quy năm 2025',
    url: 'https://vttu.edu.vn/diem-chuan-dam-bao-chat-luong-dau-vao-va-quy-tac-quy-doi-diem-tuong-duong-xet-tuyen-dai-hoc-he-chinh-quy-nam-2025/',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Ảnh bảng "NGÀNH TUYỂN SINH, HỌC PHÍ" (`.../2025/05/trang-1-1024x1024.jpg`) + accordion "PHƯƠNG THỨC TUYỂN SINH" 2 ảnh (`.../2025/05/1-1-1024x611.jpg`, `.../2025/05/2-4-1024x559.jpg`, đọc bằng vision), năm 2025, liệt kê Mã xét tuyển / Tên ngành / Tổ hợp xét tuyển (ghi rõ mã tổ hợp quốc gia) / Chỉ tiêu cho toàn bộ 9 ngành đại học chính quy: 7720101 Y khoa (B00,B03,D08,A00,A02,D01 — 1149 chỉ tiêu), 7720501 Răng-Hàm-Mặt (cùng 6 tổ hợp — 600 chỉ tiêu), 7720201 Dược học (cùng 6 tổ hợp — 40 chỉ tiêu), 7480201 Công nghệ thông tin (A00,A02,D01 — 30), 7380101 Luật (A00,A02,D01 — 30), 7340101 Quản trị kinh doanh (A00,A02,D01 — 50), 7340201 Tài chính-Ngân hàng (A00,A02,D01 — 50), 7340301 Kế toán (A00,A02,D01 — 50), 7510205 Công nghệ Kỹ thuật ô tô (A00,A02,D01 — 102). Cả 6 mã tổ hợp quốc gia dùng để ánh xạ (B00/B03/D08/A00/A02/D01) đã có sẵn trong `src/core/subjects.ts` từ các batch trước — không cần thêm SubjectId hay combo mới cho VTTU.',
  },
  {
    id: 'vttu-formula-2025',
    publisher: 'Trường Đại học Võ Trường Toản (Hội đồng tuyển sinh)',
    title: 'Điểm chuẩn đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm tương đương xét tuyển đại học hệ chính quy năm 2025',
    url: 'https://vttu.edu.vn/diem-chuan-dam-bao-chat-luong-dau-vao-va-quy-tac-quy-doi-diem-tuong-duong-xet-tuyen-dai-hoc-he-chinh-quy-nam-2025/',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Ảnh accordion "HƯỚNG DẪN QUY ĐỔI TƯƠNG ĐƯƠNG GIỮA CÁC PHƯƠNG THỨC" (`.../2025/07/artboard-2-1.jpg`, đọc bằng vision) trích nguyên văn công thức mục 2 "Quy đổi điểm phương thức xét học bạ sang điểm thi tốt nghiệp THPT": "Điểm xét tuyển = Đ1 + Đ2 + Đ3 + ĐƯT" trong đó "Đ1/Đ2/Đ3 là điểm số sau quy đổi của môn xét tuyển 1/2/3" và "ĐƯT là điểm ưu tiên khu vực và điểm ưu tiên đối tượng của thí sinh". Với nhánh xét trực tiếp kết quả thi TN THPT (mã 100/101, không quy đổi), Đ1/Đ2/Đ3 chính là điểm thi thô 3 môn theo tổ hợp — công thức thu gọn thành tổng 3 môn + điểm ưu tiên KV/ĐT, khớp cách trình bày thang 30 không hệ số của ảnh mức điểm nhận hồ sơ (`vttu-threshold-2025`). Ảnh accordion "NGÀNH TUYỂN SINH, HỌC PHÍ" xác nhận năm học 2025-2026 (nhất quán với năm áp dụng 2025 của toàn bộ nguồn).',
  },
  {
    id: 'vttu-formula-crosscheck-2025',
    publisher: 'FPT Shop / CellphoneS (thứ cấp)',
    title: 'Điểm chuẩn Đại học Võ Trường Toản 2025 có cao không? Cập nhật thông tin mới nhất',
    url: 'https://fptshop.com.vn/tin-tuc/danh-gia/diem-chuan-dai-hoc-vo-truong-toan-2025-187904',
    accessedAt: '2026-09-03',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Nguồn THỨ CẤP — cross-check độc lập cho mức điểm 2025 theo khối ngành: "Y khoa và Răng Hàm Mặt cùng có mức chuẩn 20.5 điểm, ngành Dược học lấy 19 điểm... các ngành thuộc khối kinh tế và công nghệ... chủ yếu giữ ở mức 15 điểm... trên thang điểm 30" — khớp hoàn toàn với ảnh CHÍNH CHỦ `vttu-threshold-2025`. Không phải nguồn duy nhất cho threshold/tổ hợp (2 nguồn đó đều chính chủ).',
  },
];
