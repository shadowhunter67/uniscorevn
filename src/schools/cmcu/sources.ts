import type { AdmissionSource } from '../../core/sourceRegistry';

export const cmcuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'cmcu-threshold-2026',
    publisher: 'Trường Đại học CMC',
    title: 'Thông báo điểm sàn nộp hồ sơ xét tuyển Trường Đại học CMC và quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026',
    url: 'https://cmcu.edu.vn/thong-bao-diem-san-nop-ho-so-xet-tuyen-truong-dai-hoc-cmc-va-quy-doi-diem-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-nam-2026/',
    accessedAt: '2026-08-30',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã fetch trực tiếp trang chính thức cmcu.edu.vn (curl 2026-08-30, HTTP 200) — trang tin tuyển sinh, đăng 10/07/2026. Bảng ngưỡng chính là ẢNH WEBP nhúng trực tiếp trong bài (Thong-bao-diem-san-nop-ho-so-xet-tuyen-Truong-Dai-hoc-CMC-2026.webp, tải trực tiếp qua curl HTTP 200, đọc bằng vision, chữ rõ không cần OCR — KHÁC batch trước (2026-08-24, xem finalCatalog.ts research note cũ) chỉ tìm được trang "điểm chuẩn" với bảng ảnh khác không trích xuất được). Bảng "Điểm sàn theo các phương thức xét tuyển năm 2026" liệt kê 9 dòng lĩnh vực/ngành, cột "Tổ hợp" nêu công thức "Toán x 2 + 2 môn bất kỳ" (8/9 dòng) hoặc "Toán x 2 + Lý + môn bất kỳ hoặc Toán x 2 + Hóa + môn bất kỳ" (Điện tử-Viễn thông) hoặc "Toán x 2 + 2 môn bất kỳ hoặc Văn x 2 + 2 môn bất kỳ" (Truyền thông Đa phương tiện), 3 cột điểm sàn theo phương thức (thi TN THPT thang 40; học tập THPT thang 40; CMC-TEST thang 80) — chỉ dùng cột thi TN THPT trong batch này. Ghi chú cuối bảng (nguyên văn): "Thí sinh lựa chọn môn bất kỳ trong danh sách sau: Toán, Ngữ văn, Vật lí, Hoá học, Sinh học, Ngoại ngữ, Địa lí, Lịch sử, Giáo dục kinh tế - pháp luật, Tin học, Công nghệ." Trang KHÔNG nhắc tới điểm ưu tiên khu vực/đối tượng theo hướng nào — áp judgment call chuẩn quốc gia cho nhánh exact, quy đổi ×4/3 sang thang 40 (xem `priority.ts`, cùng tiền lệ `schools/ajc`). Điểm sàn theo ngành (thi TN THPT, thang 40): Điện tử-Viễn thông/Trí tuệ Nhân tạo/An ninh mạng = 22; Khoa học Máy tính/CNTT/Kỹ thuật Phần mềm/Logistics/Truyền thông Đa phương tiện = 21; Các ngành còn lại = 20.',
  },
];
