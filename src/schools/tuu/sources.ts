import type { AdmissionSource } from '../../core/sourceRegistry';

export const tuuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'tuu-identity-2026',
    publisher: 'Trường Đại học Công đoàn (TUU/LDA)',
    title: 'Trang chủ chính thức Trường Đại học Công đoàn',
    url: 'http://www.dhcd.edu.vn/',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Xác nhận danh tính: trường trực thuộc Tổng Liên đoàn Lao động Việt Nam, trụ sở 169 Tây Sơn, Kim Liên, Hà Nội, thương hiệu tuyển sinh LDA. Đào tạo 25 ngành/chương trình.',
  },
  {
    id: 'tuu-cutoff-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Công đoàn',
    title: 'Thông báo điểm trúng tuyển đại học hệ chính quy, đợt 1 năm 2026',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-cong-doan-2026-119260811100437761.htm',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-10',
    sourceType: 'official-republication',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cổng TTĐT Chính phủ đăng lại 2 ảnh thông báo chính chủ (Số ..../TB-ĐHCĐ, 10/8/2026, có chữ ký PGS.TS. Lê Mạnh Hùng — Hiệu trưởng + con dấu trường, đọc bằng vision). Bảng liệt kê đủ 25/25 ngành, mã ngành, điểm trúng tuyển cho 3 cột phương thức (Kết quả thi tốt nghiệp THPT / Kết quả học tập cấp THPT / Kết quả đánh giá năng lực SPT-ĐHSPHN). Batch này chỉ dùng cột "Kết quả thi tốt nghiệp THPT".',
  },
  {
    id: 'tuu-admission-info-2026',
    publisher: 'Trường Đại học Công đoàn (qua mirror diemthi.tuyensinh247.com)',
    title: 'Đề án tuyển sinh Trường Đại Học Công Đoàn 2026 — công thức + điều kiện + tổ hợp môn',
    url: 'https://diemthi.tuyensinh247.com/de-an-tuyen-sinh/dai-hoc-cong-doan-LDA.html',
    accessedAt: '2026-09-22',
    sourceType: 'official-republication',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Mirror trích nguyên văn Đề án tuyển sinh chính chủ (link Google Drive gốc trên dhcd.edu.vn không tải được trực tiếp — 404). Phương thức xét kết quả thi TN THPT (mã 100), mục "Điều kiện xét tuyển": "tổng điểm 03 môn thi... theo tổ hợp xét tuyển... đạt tối thiểu 15,00 điểm theo thang điểm 30" + "1. Ngưỡng đầu vào" (điều kiện riêng Luật/Luật kinh tế: Toán,Văn ≥6 mỗi môn, tổng ≥18; Ngôn ngữ Anh/QTKD-IPOP: Tiếng Anh ≥7,0) + "2. Điểm cộng" (giải HSG cấp tỉnh/TP, không mô hình hoá). Mục riêng cho PT200 (học bạ)/PT402 (ĐGNL) trong CÙNG đề án nêu rõ công thức "ĐXT = M1+M2+M3+Điểm cộng (nếu có)+Điểm ưu tiên" — mục PT100 không lặp lại công thức này (chỉ nêu ngưỡng+điều kiện+điểm cộng) nhưng KHÔNG có tuyên bố loại trừ điểm ưu tiên (khác cách DHHP tuyên bố rõ "không tính điểm cộng" cho ngưỡng của họ) — áp dụng judgment call khung quốc gia (TT 06/2026) cho điểm ưu tiên PT100, cùng tiền lệ `schools/hanu`/`schools/thanhdo`. Tổ hợp môn 22/22 tổ hợp cho 25 ngành, khớp đối chiếu độc lập với ảnh VnExpress (i1-vnexpress.vnecdn.net, 28/3/2026, cd1-cd4.jpg) — trùng khớp tuyệt đối.',
  },
];
