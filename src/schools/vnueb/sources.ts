import type { AdmissionSource } from '../../core/sourceRegistry';

export const vnuebSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vnueb-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Trường Đại học Kinh tế - ĐHQGHN)',
    title: 'Điểm chuẩn Trường Đại Học Kinh Tế – Đại Học Quốc Gia Hà Nội 2025',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-kinh-te-dai-hoc-quoc-gia-ha-noi-QHE.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn phương thức 100 (xét kết quả thi TN THPT), trích nguyên văn ghi chú của trang: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (xác nhận TRỰC TIẾP đã cộng ưu tiên). 6/6 ngành đại học chính quy dùng chung tổ hợp D01, A01, D09, D10, C01, C03, C04, X01. Bảng điểm chuẩn: Kinh tế quốc tế 25,72; Quản trị kinh doanh 24,93; Tài chính - Ngân hàng 24,25; Kinh tế 24,30; Kế toán 24,20; Kinh tế phát triển 24,20 (thang 30). Cột "Điểm Toán" đi kèm mỗi ngành (vd Kế toán 7,25) là tiêu chí phụ khi bằng điểm chuẩn, không phải điều kiện bắt buộc.',
  },
  {
    id: 'vnueb-threshold-secondary-2025',
    publisher: 'Sforum / CellphoneS (tường thuật thông báo chính thức Trường Đại học Kinh tế - ĐHQGHN)',
    title: 'QHE - Điểm chuẩn Trường đại học Kinh tế - ĐHQGHN năm 2025',
    url: 'https://cellphones.com.vn/sforum/diem-chuan-dai-hoc-kinh-te-dhqghn-2025',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `vnueb-threshold-2025` (tuyensinh247) — khớp số liệu Kinh tế 24,30, Kinh tế quốc tế 25,72, Quản trị kinh doanh 24,93, Tài chính - Ngân hàng 24,25, Kế toán 24,20, và cùng tập tổ hợp D01/A01/C01/C03/C04/X01. Nguồn gốc chính thức (tuyensinhdaihoc.ueb.edu.vn) trả HTTP 403 khi truy cập trực tiếp trong lần research này — dùng kỹ thuật cross-check 2 nguồn báo khi không có bản gốc đọc được trực tiếp (cùng tiền lệ HPMU/HMU/HNMU).',
  },
  {
    id: 'vnueb-official-portal-2026',
    publisher: 'Trường Đại học Kinh tế - ĐHQGHN',
    title: 'VNU-UEB undergraduate admission portal',
    url: 'https://tuyensinhdaihoc.ueb.edu.vn/',
    accessedAt: '2026-08-22',
    sourceType: 'government',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Cổng tuyển sinh chính thức của trường — trả HTTP 403 khi WebFetch truy cập trực tiếp trong lần research 2026-09-02. KHÔNG dùng làm nguồn số liệu chính, chỉ liệt kê để tham chiếu.',
  },
];
