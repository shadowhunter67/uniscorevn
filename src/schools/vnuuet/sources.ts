import type { AdmissionSource } from '../../core/sourceRegistry';

export const vnuuetSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vnuuet-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Trường Đại học Công nghệ - ĐHQGHN)',
    title: 'Điểm chuẩn Trường Đại Học Công Nghệ – Đại Học Quốc Gia Hà Nội 2025',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-cong-nghe-dai-hoc-quoc-gia-ha-noi-QHI.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn phương thức xét kết quả thi TN THPT, trích nguyên văn ghi chú của trang: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (xác nhận TRỰC TIẾP đã cộng ưu tiên, cùng câu mẫu dùng cho VNU-UED/VNU-UEB trên cùng hệ thống). Bảng điểm chuẩn (thang 30, 20 ngành): Công nghệ thông tin 28,19; Khoa học máy tính 27,86; Kỹ thuật điều khiển và tự động hoá 27,90; Trí tuệ nhân tạo 27,75; Khoa học dữ liệu 27,38; Kỹ thuật máy tính 27,00; Mạng máy tính và truyền thông dữ liệu 26,73; Công nghệ kỹ thuật cơ điện tử 26,73; Công nghệ kỹ thuật điện tử - Viễn thông 26,63; Hệ thống thông tin 26,38; Cơ kỹ thuật 26,15; Kỹ thuật Robot 26,00; Công nghệ vật liệu 25,60; Vật lý kỹ thuật 25,20; Kỹ thuật năng lượng 24,87; Thiết kế công nghiệp và Đồ hoạ 24,20; Công nghệ hàng không vũ trụ 23,96; Công nghệ kỹ thuật xây dựng 22,25; Công nghệ sinh học 22,13; Công nghệ nông nghiệp 22,00. Tổ hợp công bố cho MỖI ngành: A00/A01/X06/X26/D01 (Công nghệ nông nghiệp và Công nghệ sinh học có thêm B00) — X06/X26 (có môn Tin học) CHƯA có trong taxonomy môn dùng chung của app nên chỉ mô hình hoá A00/A01/D01(+B00), không ảnh hưởng điểm chuẩn vì điểm chuẩn giống nhau giữa mọi tổ hợp trong 1 ngành.',
  },
  {
    id: 'vnuuet-threshold-secondary-2025',
    publisher: 'VnExpress (tường thuật thông báo chính thức Trường Đại học Công nghệ - ĐHQGHN)',
    title: 'Điểm chuẩn Đại học Công nghệ (UET) 2025 mới nhất',
    url: 'https://vnexpress.net/diem-chuan-dai-hoc-cong-nghe-uet-2025-moi-nhat-4930248.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `vnuuet-threshold-2025` (tuyensinh247) — khớp dải điểm 22,14-28,19 (thấp nhất Công nghệ sinh học/Công nghệ nông nghiệp quanh 22, cao nhất Công nghệ thông tin 28,19), khớp ghi chú trường tự công bố 20 ngành. Nguồn gốc chính thức (tuyensinh.uet.vnu.edu.vn) trả bảng dạng ẢNH khi truy cập trực tiếp — dùng kỹ thuật cross-check 2 nguồn báo (cùng tiền lệ VNU-UED/HPMU/VNU-UEB).',
  },
  {
    id: 'vnuuet-official-portal-2025',
    publisher: 'Cổng Thông tin điện tử Chính phủ (xaydungchinhsach.chinhphu.vn, đăng lại thông báo chính thức Trường Đại học Công nghệ - ĐHQGHN)',
    title: 'Điểm chuẩn Trường Đại học Công nghệ, ĐHQG Hà Nội năm 2025',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-cong-nghe-dhqg-ha-noi-nam-2025-119250822151451285.htm',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'government',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Trang xác nhận đã đăng thông báo điểm chuẩn chính thức của trường và trích nguyên văn "Điểm trúng tuyển (điểm chuẩn) của một ngành là như nhau giữa các tổ hợp xét tuyển" (căn cứ cho quyết định KHÔNG phân biệt threshold theo tổ hợp trong `thresholds.ts`) — nhưng bảng số liệu chi tiết chỉ hiển thị dạng ẢNH, không trích xuất được bằng text extraction thông thường. KHÔNG dùng làm nguồn số liệu chính, chỉ liệt kê để tham chiếu công thức.',
  },
  {
    id: 'vnuuet-code-mapping-2025',
    publisher: 'Trangedu.com (đăng lại đề án tuyển sinh Trường Đại học Công nghệ - ĐHQGHN)',
    title: 'Thông tin tuyển sinh trường Đại học Công nghệ - ĐHQGHN',
    url: 'https://trangedu.com/truong/dai-hoc-cong-nghe-dhqg-hn/',
    accessedAt: '2026-09-02',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Chỉ dùng để lấy mã ngành xét tuyển nội bộ trường (CN1-CN21) ánh xạ 1:1 với tên ngành — KHÔNG dùng cho số liệu điểm chuẩn (bảng điểm ở nguồn này không có ngày công bố rõ, có thể lệch năm).',
  },
];
