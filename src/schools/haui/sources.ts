import type { AdmissionSource } from '../../core/sourceRegistry';

export const hauiSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'haui-threshold-2026',
    publisher: 'Trường Đại học Công nghiệp Hà Nội (HAUI)',
    title:
      'Ngưỡng đảm bảo chất lượng đầu vào và Quy tắc quy đổi điểm xét tuyển, điểm trúng tuyển của các phương thức xét tuyển đại học chính quy năm 2026',
    url: 'https://www.haui.edu.vn/vn/tin-tuc/nguong-dam-bao-chat-luong-dau-vao-va-quy-tac-quy-doi-diem-xet-tuyen-diem-trung-tuyen-cua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026/68002',
    accessedAt: '2026-08-29',
    publishedAt: '2026-07-06',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã fetch trực tiếp trang chính thức (curl 2026-08-29, HTTP 200, User-Agent trình duyệt thật). Đăng 16:03 06/07/2026, căn cứ Thông tư 06/2026/TT-BGDĐT, Quyết định 356/QĐ-ĐHCN và 865/QĐ-ĐHCN. Mục "I.1. Ngưỡng đảm bảo chất lượng đầu vào phương thức 3 - Xét tuyển dựa trên kết quả thi tốt nghiệp THPT năm 2026" công bố bảng ĐẦY ĐỦ 72 mã xét tuyển (mã ngành, tên ngành/chương trình, tổ hợp xét tuyển, mức điểm điều kiện đăng ký xét tuyển) — đã nhập đủ vào `thresholds.ts`. Mã 74801081 (Vi mạch bán dẫn) ghi "dự kiến* ≥ 18,00", mức chính thức chờ hướng dẫn Bộ GD&ĐT. Mục phương thức 3 KHÔNG nhắc điểm ưu tiên khu vực/đối tượng (khác mục phương thức 2/4/5, nơi công thức ghi rõ "+ Điểm ưu tiên (nếu có)") — áp judgment call chuẩn quốc gia cho điểm ưu tiên khi hiển thị Điểm xét tuyển (`priority.ts`), ngưỡng so với TỔNG THÔ (không cộng ưu tiên). Trang KHÔNG có điểm cộng thành tích cho phương thức 3. Nguồn cũng công bố công thức phương thức 2 (học sinh giỏi/chứng chỉ quốc tế kết hợp học bạ), 4 (ĐGNL ĐHQGHN/HSA), 5 (ĐGTD HUST/TSA) với quy đổi 1:1 sang phương thức 3 — CHƯA chuẩn hoá các phương thức này vào runtime (`knowledgeGaps.ts`).',
  },
];
