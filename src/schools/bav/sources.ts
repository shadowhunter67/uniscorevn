import type { AdmissionSource } from '../../core/sourceRegistry';

export const bavSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'bav-threshold-2026',
    publisher: 'Học viện Ngân hàng (BAV, mã trường NHH)',
    title:
      'Thông báo Về ngưỡng đảm bảo chất lượng đầu vào và cách thức quy đổi tương đương điểm trúng tuyển giữa các phương thức xét tuyển đại học chính quy năm 2026 tại Học viện Ngân hàng (Số 3508/TB-HVNH, 07/07/2026)',
    url: 'https://hvnh.edu.vn/hvnh/vi/thong-tin-tuyen-sinh/nguong-dam-bao-chat-luong-dau-vao-va-cach-thuc-quy-doi-tuong-duong-diem-trung-tuyen-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-4024.html',
    accessedAt: '2026-08-29',
    publishedAt: '2026-07-07',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tin embed PDF scan (EPSON Scan, 4 trang) qua iframe pdfviewer — đã tải trực tiếp file PDF (curl, HTTP 200) và đọc bằng vision (pdftotext trả 0 dòng do file scan ảnh). Nội dung: (1) Ngưỡng PTXT4 (thi TN THPT 2026) tính trên tổng điểm 3 môn theo tổ hợp tối ưu nhất/mã xét tuyển, NHÂN ĐÔI điểm môn chính, quy đổi thang 30, cộng điểm quy đổi chứng chỉ + điểm cộng + điểm ưu tiên (nếu có): chuẩn/chất lượng cao = 21,50/30; liên kết đào tạo quốc tế = 19,00/30; lĩnh vực Pháp luật chờ ngưỡng Bộ GD&ĐT công bố (chưa có số). (2) 8 tổ hợp: A00, A01, D01, D07, D09, D14, C00, C03, tổ hợp gốc D01; chênh lệch điểm TRÚNG TUYỂN giữa tổ hợp (không phải ngưỡng đăng ký): A01/D07/D09/D14 = D01; A00 = D01+0,5; C00/C03 = D01-0,5 (KHÔNG áp cho ngưỡng đăng ký ở mục 1, chỉ áp khi so sánh điểm trúng tuyển giữa tổ hợp — chưa model, xem knowledgeGaps).',
  },
  {
    id: 'bav-admission-info-2026',
    publisher: 'Học viện Ngân hàng (BAV, mã trường NHH)',
    title: 'Thông tin tuyển sinh năm 2026 (ban hành theo Quyết định số 2028/QĐ-HVNH ngày 31/3/2026)',
    url: 'https://hvnh.edu.vn/ttkt/vi/bantinhvnh/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-cua-hoc-vien-ngan-hang-ban-hanh-theo-quyet-dinh-2028qdhvnh-ngay-31-thang-3-nam-2026-8193.html',
    accessedAt: '2026-08-29',
    publishedAt: '2026-03-31',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF 34 trang (ABBYY FineReader OCR, tagged) đã tải trực tiếp (curl, HTTP 200); pdftotext chạy được nhưng dấu tiếng Việt bị hỏng (giống trường hợp AOF) — đã đọc lại các trang bảng bằng vision (trang 9-11: bảng đầy đủ 45 mã xét tuyển với mã ngành, tên chương trình, chỉ tiêu 2026, 4 tổ hợp xét tuyển + môn chính mỗi tổ hợp; trang 12-13: quy định điểm cộng/điểm xét và chính sách ưu tiên). Xác nhận: môn chính = Toán cho toàn bộ 42/45 mã xét tuyển dùng tổ hợp A00/A01/D01/D07/D09; 3 mã lĩnh vực Pháp luật (LAW01/LAW03/LAW04) dùng tổ hợp C00/C03/D01/D14 với môn chính = Văn (không đưa vào bảng thresholds.ts vì ngưỡng riêng chưa công bố). Mục "7.1 Chính sách ưu tiên chung" nêu RÕ công thức giảm điểm ưu tiên: "Điểm ưu tiên = [(30 – Tổng điểm đạt được)/7,5] × Mức điểm ưu tiên quy định" áp dụng khi tổng điểm (đã gồm điểm cộng, thang 30) ≥ 22,50 — khớp công thức chuẩn quốc gia (Điều 7 Thông tư 06/2026/TT-BGDĐT), chỉ MỨC điểm ưu tiên cụ thể theo KV/ĐT dẫn chiếu quy chế tuyển sinh hiện hành (không liệt kê lại bằng số trong văn bản này). Mục "Điểm cộng và điểm xét": tổng điểm cộng (điểm thưởng + điểm xét thưởng + điểm khuyến khích) không vượt quá 3,0 điểm, KHÔNG có bảng quy đổi cụ thể trong phạm vi đã đọc — chưa model (`knowledgeGaps.ts`). Trang 17-20 công bố bảng tuyển sinh 2 năm gần nhất (2024) chỉ mang tính minh hoạ lịch sử, không dùng làm căn cứ cho công thức 2026 (2024 cho thấy chỉ chương trình CLC nhân hệ số 2 Toán, nhưng bảng mã ngành 2026 xác nhận môn chính áp dụng cho MỌI mã, kể cả chuẩn — khác 2024).',
  },
];
