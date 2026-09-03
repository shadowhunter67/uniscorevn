import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface DlaSource {
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
 * Trường Đại học Kinh tế Công nghiệp Long An (DLA, mã trường DLA) — cổng tuyển sinh chính thức
 * tuyensinh.daihoclongan.edu.vn dùng template kiểu Joomla cũ; WebFetch (chuyển HTML -> markdown) lấy
 * được text điều hướng/mô tả nhưng KHÔNG lấy được nội dung 2 bảng quan trọng nhất — cả điểm chuẩn lẫn
 * tổ hợp môn đều được trường đăng dưới dạng ẢNH nhúng từ Google Drive (`lh3.googleusercontent.com/
 * d/<id>`), không phải text/HTML table. Dùng chrome-devtools (điều hướng thẳng tới URL ảnh gốc, độ
 * phân giải đầy đủ 1080x1350 và 1528x1281) + đọc bằng vision để lấy toàn bộ số liệu.
 */
export const dlaSources: DlaSource[] = [
  {
    id: 'dla-cutoff-2026',
    publisher: 'Trường Đại học Kinh tế Công nghiệp Long An (Hội đồng tuyển sinh)',
    title: 'DLA chính thức công bố điểm chuẩn đại học năm 2026',
    url: 'https://tuyensinh.daihoclongan.edu.vn/tin-tuc-tuyen-sinh/750-dla-chinh-thuc-cong-bo-diem-chuan-dai-hoc-nam-2026.html',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ảnh "CÔNG BỐ ĐIỂM CHUẨN TRÚNG TUYỂN ĐẠI HỌC CHÍNH QUY 2026" (mã trường DLA, nhúng Google Drive lh3.googleusercontent.com/d/10mar8LXRs5KTXPss5zOqvgM58MlTdT9b, độ phân giải 1080x1350, đọc bằng vision). Bảng "Điểm chuẩn trúng tuyển" 3 cột (Điểm Học bạ / Điểm THPT / Điểm ĐGNL ĐHQG TP.HCM) theo 9 ngành, cột "Điểm THPT" (thang 30, dùng cho module này): 1 Kế toán 15; 2 Quản trị kinh doanh 15; 3 Marketing 15; 4 Tài chính - Ngân hàng 15; 5 Luật Kinh tế (*) 20; 6 Công nghệ thông tin 15; 7 Công nghệ Kỹ thuật Xây dựng 15; 8 Ngôn ngữ Anh 15; 9 Quản trị dịch vụ du lịch và lữ hành 15. Ghi chú (*) nguyên văn: "Riêng ngành Luật Kinh tế xét bằng bảng điểm Học bạ hoặc điểm ĐGNL, thí sinh phải có KQHT lớp 12 đạt loại Tốt trở lên và điểm thi THPT (3 môn) tối thiểu 18 điểm HOẶC điểm xét tốt nghiệp tối thiểu 8,5. Áp dụng với thí sinh tốt nghiệp từ 2026." — điều kiện này CHỈ áp dụng nhánh học bạ/ĐGNL, không ảnh hưởng cột "Điểm THPT" mà module này dùng.',
  },
  {
    id: 'dla-combination-2026',
    publisher: 'Trường Đại học Kinh tế Công nghiệp Long An (Hội đồng tuyển sinh)',
    title: 'Trường Đại học Kinh tế Công nghiệp Long An (DLA) công bố các phương thức tuyển sinh năm 2026',
    url: 'https://tuyensinh.daihoclongan.edu.vn/tin-tuc-tuyen-sinh/742-truong-dai-hoc-kinh-te-cong-nghiep-long-an-dla-cong-bo-cac-phuong-thuc-tuyen-sinh-nam-2026.html',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ảnh bảng "NGÀNH / MÃ NGÀNH / TỔ HỢP MÔN" (nhúng Google Drive lh3.googleusercontent.com/d/1Upo-hxM4u8eeUU6pcpvLo42f9PioLfXU, độ phân giải 1528x1281, đọc bằng vision), năm 2026, không ghi rõ mã tổ hợp quốc gia (chỉ liệt kê tên môn) nên tự ánh xạ theo taxonomy SubjectId sẵn có: Nhóm 7 ngành QTKD(7340101)/MARKETING(7340115)/TCNH(7340201)/KẾ TOÁN(7340301)/LUẬT KT(7380107)/CNTT(7480201)/CNKT XD(7510103) dùng chung 6 tổ hợp — Ngữ văn+Toán+Tiếng Anh (D01), Ngữ văn+Toán+Lịch sử (C03), Ngữ văn+Toán+Địa lí (C04), Toán+Ngữ văn+Vật lí (C01), Toán+Ngữ văn+Tin học (X02), Toán+Ngữ văn+GDKT&PL (C14). Nhóm 2 ngành NNA/Ngôn ngữ Anh(7220201) và DU LỊCH/Quản trị dịch vụ du lịch và lữ hành(7810103) dùng chung 6 tổ hợp khác — Ngữ văn+Toán+Tiếng Anh (D01), Toán+Lịch sử+Tiếng Anh (D09), Toán+Ngữ văn+GDKT&PL (C14), Ngữ văn+Lịch sử+Tiếng Anh (D14), Ngữ văn+Địa lí+Tiếng Anh (D15), Ngữ văn+Lịch sử+Địa lí (C00). Toàn bộ 12 mã tổ hợp quốc gia dùng để ánh xạ (D01/C03/C04/C01/X02/C14/D09/D14/D15/C00) đã có sẵn trong `src/core/subjects.ts` từ các batch trước (HAUI/BAV/HDIU/HUST/VNU-UED) — không cần thêm SubjectId hay combo mới cho DLA.',
  },
  {
    id: 'dla-formula-crosscheck-2026',
    publisher: 'tuyensinh247.com (thứ cấp)',
    title: 'Cách tính điểm xét tuyển Đại học Kinh tế Công nghiệp Long An - DLA',
    url: 'https://diemthi.tuyensinh247.com/tin/cach-tinh-diem-xet-tuyen-dai-hoc-kinh-te-cong-nghiep-long-an-dla-137.html',
    accessedAt: '2026-09-03',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Nguồn THỨ CẤP (không phải chính chủ) — trang chuyên đề của tuyensinh247.com dành riêng cho DLA, trích nguyên văn công thức trường công bố cho phương thức xét điểm thi TN THPT: "Điểm xét tuyển = Tổng điểm thi THPT của tổ hợp 3 môn + Điểm ưu tiên". Bài viết ghi năm 2025 nhưng công thức không đổi khác giữa các năm ở trường này (không có thành phần hệ số/nhân đôi môn chính, khớp với cách trình bày cột điểm chuẩn thang 30 không hệ số của ảnh "CÔNG BỐ ĐIỂM CHUẨN..." 2026) — dùng làm cross-check bổ sung cho công thức, KHÔNG phải nguồn duy nhất cho threshold/tổ hợp (2 nguồn đó đều chính chủ, xem `dla-cutoff-2026`/`dla-combination-2026`).',
  },
  {
    id: 'dla-priority-note-2026',
    publisher: 'Trường Đại học Kinh tế Công nghiệp Long An (Hội đồng tuyển sinh)',
    title: 'Điểm cộng chi tiết cho thí sinh đạt 22,5 điểm trở lên',
    url: 'https://tuyensinh.daihoclongan.edu.vn/tin-tuc-tuyen-sinh/660-diem-cong-chi-tiet-cho-thi-sinh-dat-225-diem-tro-len.html',
    accessedAt: '2026-09-03',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2023, status: 'current' },
    note:
      'Bài viết CHÍNH CHỦ của DLA nhưng chỉ diễn giải lại quy định GIẢM DẦN điểm ưu tiên của Bộ GD&ĐT áp dụng từ 2023 cho thí sinh đạt tổng điểm từ 22,5/30 trở lên (không phải bảng mức điểm ưu tiên riêng của trường theo khu vực/đối tượng): "Mức điểm ưu tiên thí sinh được hưởng = [(30 - tổng điểm đạt được)/7,5] x tổng điểm ưu tiên được xác định thông thường". Ví dụ minh hoạ dùng đúng các mức khung quốc gia hiện hành (KV1 = 0,75 ở mốc 22,5 điểm). DLA KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng riêng — dùng khung quốc gia hiện hành làm judgment call (`priority.ts`), cùng tiền lệ DNU/TUEBA/PVU/HTU/TUMP.',
  },
];
