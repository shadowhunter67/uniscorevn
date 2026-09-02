import type { AdmissionSource } from '../../core/sourceRegistry';

export const vnuhusSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vnuhus-threshold-2025',
    publisher: 'Tuyensinh247 (tường thuật thông báo chính thức Trường Đại học Khoa học Tự nhiên - ĐHQGHN)',
    title: 'Điểm chuẩn Trường Đại Học Khoa Học Tự Nhiên Hà Nội 2025',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-khoa-hoc-tu-nhien-dai-hoc-quoc-gia-ha-noi-QHT.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn phương thức xét kết quả thi TN THPT, trích nguyên văn ghi chú của trang: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu tiên nếu có" (xác nhận TRỰC TIẾP đã cộng ưu tiên, cùng câu mẫu dùng cho VNU-UET/VNU-UED/VNU-UEB trên cùng hệ thống). Bảng điểm chuẩn (thang 30, 28 ngành): Khoa học dữ liệu 26,00; Toán học 25,90; Khoa học máy tính và thông tin 25,35; Công nghệ Bán dẫn 25,55; Toán tin 25,50; Kỹ thuật điện tử và tin học 24,57; Vật lý học 24,65; Khoa học vật liệu 24,20; Địa lý tự nhiên 23,95; Hoá học 23,90; Hoá dược 23,70; Công nghệ kỹ thuật hoá học 23,45; Khoa học thông tin địa không gian 23,50; Công nghệ kỹ thuật hạt nhân 23,50; Khí tượng và khí hậu học 22,80; Khoa học và công nghệ thực phẩm 22,80; Quản lý phát triển đô thị và bất động sản 22,90; Quản lý tài nguyên và môi trường 22,20; Công nghệ sinh học 22,05; Địa chất học 22,05; Quản lý đất đai 22,27; Công nghệ kỹ thuật môi trường 21,55; Hải dương học 21,50; Môi trường, sức khỏe và an toàn 21,20; Tài nguyên và môi trường nước 21,10; Khoa học môi trường 21,25; Sinh dược học 20,10; Sinh học 20,05. Mã ngành dùng mã xét tuyển chính thức trường (QHT01-QHT99, đăng lại từ đề án tuyển sinh).',
  },
  {
    id: 'vnuhus-threshold-secondary-2025',
    publisher: 'Đại biểu Nhân dân (tường thuật thông báo chính thức Trường Đại học Khoa học Tự nhiên - ĐHQGHN)',
    title: 'Điểm chuẩn Trường Đại học Khoa học tự nhiên - ĐH Quốc gia Hà Nội dao động từ 20,5 - 26 điểm',
    url: 'https://daibieunhandan.vn/diem-chuan-truong-dai-hoc-khoa-hoc-tu-nhien-dh-quoc-gia-ha-noi-dao-dong-tu-20-5-26-diem-10384291.html',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `vnuhus-threshold-2025` (tuyensinh247) — khớp dải điểm 20,5-26 (thấp nhất Sinh học 20,05, cao nhất Khoa học dữ liệu 26,00), khớp số lượng 28 ngành. Nguồn gốc chính thức (chinhphu.vn, hus.vnu.edu.vn) trả bảng dạng ẢNH khi truy cập trực tiếp — dùng kỹ thuật cross-check 2 nguồn báo (cùng tiền lệ VNU-UET/VNU-UED/HPMU/VNU-UEB).',
  },
  {
    id: 'vnuhus-official-portal-2025',
    publisher: 'Cổng Thông tin điện tử Chính phủ (xaydungchinhsach.chinhphu.vn, đăng lại thông báo chính thức Trường Đại học Khoa học Tự nhiên - ĐHQGHN)',
    title: 'Điểm chuẩn Trường Đại học Khoa học Tự nhiên (HUS), ĐHQG Hà Nội năm 2025',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-khoa-hoc-tu-nhien-hus-dhqg-ha-noi-nam-2925-119250822173424001.htm',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'government',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Trang xác nhận đã đăng thông báo điểm chuẩn chính thức của trường ("điểm trúng tuyển quy về thang điểm 30") nhưng bảng số liệu chi tiết chỉ hiển thị dạng ẢNH, không trích xuất được bằng text extraction thông thường. KHÔNG dùng làm nguồn số liệu chính, chỉ liệt kê để tham chiếu.',
  },
];
