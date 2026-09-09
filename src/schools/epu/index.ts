import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { epuAdmissionMethods } from './methods';

export const epuModule: SchoolModule = {
  id: 'epu',
  name: 'Trường Đại học Điện lực',
  shortName: 'EPU',
  about:
    'Trường đại học công lập trực thuộc Bộ Công Thương (mã trường DDL, trụ sở 235 Hoàng Quốc Việt, phường Nghĩa Đô, Hà Nội; 4 cơ sở đào tạo). Tuyển sinh 38 mã ngành đại học chính quy năm 2026 thuộc các khối kỹ thuật điện - tự động hoá - năng lượng, công nghệ thông tin, cơ khí - ô tô, kinh tế - quản trị, luật kinh tế và ngôn ngữ Anh. KHÁC "Trường Cao đẳng Điện lực TP.HCM" (HEPC) cũng có trong danh mục.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'EPU 2026 (Phương thức 3 — xét kết quả thi TN THPT): điểm trúng tuyển CHÍNH THỨC theo NGÀNH cho ĐỦ 38/38 mã xét tuyển (16,00–24,60/30) từ Thông báo số 3020/TB-ĐHĐL ngày 09/8/2026 (`sources.ts:epu-diemtrungtuyen-3020-2026` — PDF scan gốc có con dấu, đính kèm bài đăng chính chủ epu.edu.vn, đọc bằng vision). Công thức + tổ hợp môn theo từng khối ngành lấy CHÍNH CHỦ từ Thông báo số 466/TB-ĐHĐL ngày 26/02/2026 "Thông tin tuyển sinh năm 2026" (`sources.ts:epu-thongtin-tuyensinh-466-2026` — PDF scan gốc 11 trang, mục II.2.3 ghi rõ "Sử dụng kết quả điểm trong kỳ thi tốt nghiệp THPT năm 2026 của 3 môn theo tổ hợp xét tuyển và điểm ưu tiên (nếu có)", thang 30 không hệ số). Điểm ưu tiên dùng khung quốc gia hiện hành (Điều 7 Thông tư 06/2026/TT-BGDĐT) vì trường chỉ dẫn chiếu Quy chế của Bộ GD&ĐT, không tự công bố bảng mức riêng (judgment call, cùng tiền lệ HVU/HBU/VTTU/DLA/PVU). CHƯA mô hình hoá: Phương thức 1 (học bạ) và Phương thức 2 (chứng chỉ tiếng Anh quốc tế + học bạ) — công thức đã đọc đủ nhưng trường KHÔNG công bố điểm trúng tuyển tương ứng; nhánh thay điểm tiếng Anh bằng IELTS/TOEFL trong chính Phương thức 3 (bảng quy đổi đã đọc, chưa wired); tổ hợp X56 của ngành Toán tin (chưa có trong danh mục tổ hợp dùng chung, nguồn không chú giải thành phần môn); và điều kiện "tốt nghiệp từ 2024 trở về trước không được cộng điểm ưu tiên" (hồ sơ dùng chung không có trường năm tốt nghiệp) — xem `knowledgeGaps.ts`.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(epuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 466/TB-ĐHĐL (26/02/2026) — Thông tin tuyển sinh năm 2026',
      url: 'https://epu.edu.vn/post/ia0Df.html',
      type: 'official-institution',
      checkedAt: '2026-09-09',
    },
    {
      title: 'Thông báo số 3020/TB-ĐHĐL (09/8/2026) — Điểm trúng tuyển đại học chính quy năm 2026',
      url: 'https://epu.edu.vn/post/diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-J1QaE.html',
      type: 'official-institution',
      checkedAt: '2026-09-09',
    },
  ],
};
