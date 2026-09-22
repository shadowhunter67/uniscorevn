import type { AdmissionSource } from '../../core/sourceRegistry';

export const dpdSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'dpd-identity-2026',
    publisher: 'Trường Đại học Phương Đông (UPD)',
    title: 'Trang chủ chính thức Trường Đại học Phương Đông',
    url: 'https://phuongdong.edu.vn/',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Xác nhận danh tính: thành lập 1994, một trong những trường đại học dân lập đầu tiên của Việt Nam, trụ sở 171 Trung Kính, Yên Hòa, Cầu Giấy, Hà Nội. Mã trường tuyển sinh DPD, thương hiệu hiện tại "UPD". KHÁC Trường Cao đẳng Phương Đông Đà Nẵng (`cdpd`, đã có trong danh mục) — 2 thực thể độc lập, cấp học khác nhau.',
  },
  {
    id: 'dpd-cutoff-2026',
    publisher: 'Trường Đại học Phương Đông (UPD)',
    title: 'Trường ĐH Phương Đông thông báo điểm chuẩn năm 2026',
    url: 'https://giaoduc.net.vn/truong-dh-phuong-dong-thong-bao-diem-chuan-nam-2026-post262001.gd',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-10',
    sourceType: 'official-republication',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Báo Giáo dục Việt Nam đăng lại nguyên văn thông báo + infographic điểm chuẩn chính chủ (logo/thương hiệu UPD, đọc bằng chrome-devtools screenshot + vision, ảnh gốc .avif không đọc trực tiếp được). Công thức trích nguyên văn: "Điểm trúng tuyển là tổng điểm 3 môn theo tổ hợp xét tuyển (không nhân hệ số, điểm mỗi môn phải lớn hơn 1 điểm; điểm HAS và TSA được quy đổi theo quy định của trường), làm tròn đến 02 chữ số thập phân, cộng điểm ưu tiên đối tượng, khu vực theo quy định của Bộ Giáo dục và Đào tạo." Infographic liệt kê 14 chương trình đào tạo (8 nhóm ngành) với điểm chuẩn theo 4 phương thức — chỉ dùng cột "Điểm thi tốt nghiệp THPT" (mã 100/405). Nguồn KHÔNG có mã ngành/mã xét tuyển kèm theo — dùng slug tên chương trình làm khoá (xem `thresholds.ts`). Trường có tổng ~39 chương trình đào tạo (6 khoa) — infographic chỉ phủ 14/39, các chương trình còn lại (vd Ngôn ngữ Anh, Ngôn ngữ Trung, Kiến trúc...) chưa có điểm chuẩn thật trong nguồn đã đọc.',
  },
];
