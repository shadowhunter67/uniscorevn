import type { AdmissionSource } from '../../core/sourceRegistry';

export const aofSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'aof-threshold-2026',
    publisher: 'Học viện Tài chính (AOF)',
    title: 'Thông tin tuyển sinh đại học năm 2026 (ban hành theo Quyết định số 695/QĐ-HVTC ngày 29/05/2026, cập nhật tháng 6/2026)',
    url: 'https://hvtc.edu.vn/Uploads/files/T6-2026/3_TTTS%20DHCQ%20NAM%202026%20-%20BAN%20CAP%20NHAT.pdf',
    accessedAt: '2026-08-29',
    publishedAt: '2026-05-29',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã tải trực tiếp file PDF chính thức từ hvtc.edu.vn (curl 2026-08-29, HTTP 200) và đọc qua pdftotext — font PDF gốc bị lỗi encoding dấu tiếng Việt (mất dấu, ví dụ "điểm" -> "im") nhưng số liệu/mã tổ hợp/ký hiệu vẫn đọc được nguyên vẹn. Mục "3. Quy tắc quy đổi độ lệch điểm ngưỡng đầu vào và điểm trúng tuyển giữa các tổ hợp, phương thức tuyển sinh": ngưỡng đầu vào (thang 30, phương thức 3 - thi TN THPT) công bố THEO CƠ SỞ/LOẠI CHƯƠNG TRÌNH (không phải theo từng mã ngành cụ thể): Miền Bắc (trụ sở Hà Nội) — chương trình chuẩn/LKT cấp bằng DDP (Dual Degree Programme) >= 19 điểm; chương trình LKT với ĐH Toulon (Cộng hoà Pháp) >= 17 điểm; chương trình chất lượng cao (CLC định hướng chứng chỉ quốc tế) >= 20 điểm. Miền Nam (Phân hiệu TP.HCM) >= 16 điểm. Phân hiệu Hưng Yên >= 16 điểm (ghi chú: áp dụng sau khi có Quyết định cấp phép đào tạo của Bộ GD&ĐT). Riêng ngành Luật, chương trình Luật kinh doanh có thêm điều kiện điểm thi TN THPT 2026 môn Toán >= 6 điểm. Bảng ánh xạ từng mã ngành/chương trình cụ thể -> nhóm cơ sở/loại chương trình nằm rải rác trong bảng chỉ tiêu tuyển sinh (mục 4, không có cột "ngưỡng" riêng đi kèm) — CHƯA trích xuất đầy đủ trong batch này (`knowledgeGaps.ts`), nên nhánh runtime chỉ kiểm tra được ngưỡng dạng dải (16-20), không xác định chính xác nhóm theo từng ngành. Công thức Điểm xét tuyển các phương thức 1/2/4 công bố tường minh có "+ Điểm ưu tiên (Nếu có)"; mục phương thức 3 không lặp lại công thức chi tiết trong đoạn đọc được nhưng theo cấu trúc chung của toàn bộ thông báo (PT1/PT2/PT4 đều same-structure) và quy định ngưỡng "thang điểm 30" cho PT3, suy luận hợp lý là PT3 cũng gồm điểm ưu tiên — KHÔNG đủ chắc chắn để coi là "nguồn xác nhận trực tiếp" nên chưa áp dụng judgment call điểm ưu tiên cụ thể trong module lần này, chỉ dừng ở kiểm tra ngưỡng thô.',
  },
];
