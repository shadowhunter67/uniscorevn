import type { AdmissionSource } from '../../core/sourceRegistry';

export const hucSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'huc-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Trường Đại học Văn hóa Hà Nội)',
    title: 'Điểm chuẩn Trường Đại Học Văn Hóa Hà Nội 2025 chính xác',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-van-hoa-ha-noi-VHH.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-23',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn phương thức xét kết quả thi TN THPT, trích nguyên văn ghi chú của trang: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (xác nhận TRỰC TIẾP đã cộng ưu tiên, cùng câu mẫu dùng cho VNU-UET/VNU-HUS/VNU-USSH trên cùng hệ thống). Bảng điểm chuẩn (thang 30, 20/21 ngành, MỖI ngành có 3 nhóm mức theo tổ hợp: D01 riêng; nhóm {C03,C04,D14,D15,X01,X78} 1 mức chung; nhóm {C00,X70} 1 mức chung cao nhất) — cross-checked TUYỆT ĐỐI qua baohatinh.vn (`huc-threshold-secondary-2025`) cho toàn bộ 20/20 ngành. Ngành Sáng tác văn học (mã 7220110) KHÔNG có trong bảng nhánh thi TN THPT — không modeled. Mã ngành dùng mã ngành đào tạo của trường (một số có hậu tố A/B/C/D cho chuyên ngành trong cùng mã gốc).',
  },
  {
    id: 'huc-threshold-secondary-2025',
    publisher: 'Báo Hà Tĩnh (đăng lại/tổng hợp thông báo chính thức Trường Đại học Văn hóa Hà Nội)',
    title: 'Điểm chuẩn Trường Đại Học Văn Hóa Hà Nội 2025 – Theo ngành và tổ hợp xét tuyển',
    url: 'https://baohatinh.vn/cong-cu/diem-chuan/vhh-truong-dai-hoc-van-hoa-ha-noi',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-23',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `huc-threshold-2025` (tuyensinh247) — bảng đầy đủ theo mã ngành x TỪNG tổ hợp riêng lẻ (không gộp nhóm), khớp TUYỆT ĐỐI toàn bộ 20/20 ngành đã mô hình hoá (từng cặp ngành/tổ hợp: D01, C03, C04, D14, D15, X01, C00 đều khớp chính xác từng số). Trang tuyển sinh chính thức (tuyensinh.huc.edu.vn) render bằng JS (SPA) — không đọc được text trực tiếp qua công cụ fetch/curl thông thường; xaydungchinhsach.chinhphu.vn xác nhận có thông báo chính thức nhưng bảng chi tiết vẫn ở dạng ẢNH. Dùng 2 nguồn báo đăng lại dạng text (cùng kỹ thuật cross-check đã áp dụng cho VNU-UET/HUS/USSH/QBU) để vượt qua rào cản SPA + ảnh.',
  },
  {
    id: 'huc-official-portal-2025',
    publisher: 'Cổng Thông tin điện tử Chính phủ (xaydungchinhsach.chinhphu.vn, đăng lại thông báo chính thức Trường Đại học Văn hóa Hà Nội)',
    title: 'Điểm chuẩn Trường Đại học Văn hóa Hà Nội năm 2025',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-van-hoa-ha-noi-nam-2025-119250823153300407.htm',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-23',
    sourceType: 'government',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Trang xác nhận đã đăng thông báo điểm chuẩn chính thức của trường nhưng bảng số liệu chi tiết chỉ hiển thị dạng ẢNH, không trích xuất được bằng text extraction thông thường. KHÔNG dùng làm nguồn số liệu chính, chỉ liệt kê để tham chiếu — trường trước đây từng bị đánh giá "chưa research được" vì trang tuyển sinh chính thức là SPA render bằng JS; batch này retry thành công qua 2 nguồn báo đăng lại dạng text độc lập thay vì trang gốc.',
  },
];
