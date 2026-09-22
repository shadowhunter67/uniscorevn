import type { AdmissionSource } from '../../core/sourceRegistry';

export const vhuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vhu-identity-2026',
    publisher: 'Trường Đại học Văn Hiến (VHU)',
    title: 'Trang chủ chính thức Trường Đại học Văn Hiến',
    url: 'https://vhu.edu.vn/',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Xác nhận danh tính: trường đại học tư thục tại TP.HCM, cổng tuyển sinh tuyensinh.vhu.edu.vn, mã trường DVH.',
  },
  {
    id: 'vhu-threshold-2026',
    publisher: 'Trường Đại học Văn Hiến (VHU) — Hội đồng tuyển sinh',
    title: 'Điểm sàn Trường Đại học Văn Hiến (DVH) 2026',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-san-truong-dai-hoc-van-hien-dvh-2026-119260705090153055.htm',
    accessedAt: '2026-09-22',
    publishedAt: '2026-07-05',
    sourceType: 'official-republication',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cổng TTĐT Chính phủ đăng lại nguyên văn thông báo điểm sàn chính chủ VHU (HTML text). Nêu RÕ: "Điểm xét tuyển theo kết quả thi tốt nghiệp THPT 2026 áp dụng cho thí sinh thuộc khu vực 3, không hưởng ưu tiên theo đối tượng, chưa bao gồm điểm cộng" — 15,00 chung, Luật/Luật kinh tế 18,00 (sàn; điểm chuẩn thật sau đó là 20,00, xem `vhu-cutoff-2026`), Điều dưỡng 16,50 (sàn; điểm chuẩn thật 18,00). Ngành Thanh nhạc/Piano/Đạo diễn/Công nghệ điện ảnh-truyền hình dùng tổ hợp năng khiếu/kỳ thi riêng — ngoài phạm vi.',
  },
  {
    id: 'vhu-cutoff-2026',
    publisher: 'Trường Đại học Văn Hiến (VHU) — Hội đồng tuyển sinh',
    title: 'Trường Đại học Văn Hiến công bố điểm chuẩn đại học chính quy đợt 1 năm 2026',
    url: 'https://giaoduc.net.vn/truong-dai-hoc-van-hien-cong-bo-diem-chuan-dai-hoc-chinh-quy-dot-1-nam-2026-post262034.gd',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-10',
    sourceType: 'official-republication',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Báo Giáo dục Việt Nam đăng lại nguyên văn thông báo điểm chuẩn chính chủ VHU, bảng HTML text đầy đủ 43 mã ngành với cột "Theo KQ Thi TN THPT" (thang 30): 15,00 phần lớn ngành; Luật/Luật kinh tế 20,00; Điều dưỡng 18,00; Thanh nhạc/Piano 17,00 (năng khiếu, ngoài phạm vi). Không có câu chữ về điểm ưu tiên trong bài này — dùng định nghĩa RAW đã xác nhận ở `vhu-threshold-2026` (cùng số liệu sàn/chuẩn trùng khớp phần lớn ngành, xác nhận nhất quán).',
  },
];
