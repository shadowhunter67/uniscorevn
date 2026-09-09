import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface EpuSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

export const epuSources: EpuSource[] = [
  {
    id: 'epu-thongtin-tuyensinh-466-2026',
    publisher: 'Trường Đại học Điện lực (EPU, mã trường DDL) — Bộ Công Thương',
    title: 'Thông báo số 466/TB-ĐHĐL (26/02/2026) — Thông tin tuyển sinh năm 2026 (hình thức đào tạo Chính quy)',
    url: 'https://itc.epu.edu.vn/core/contentspace/assets/83933ede-7dfd-46f0-b42f-c4d5ac096525.pdf',
    accessedAt: '2026-09-09',
    publishedAt: '2026-02-26',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF scan gốc 11 trang (HP Scan, có con dấu đỏ của Trường Đại học Điện lực), đính kèm trực tiếp bài "Trường Đại học Điện lực thông tin tuyển sinh năm 2026" trên cổng chính chủ epu.edu.vn (post/ia0Df.html) — tải trực tiếp từ CDN nội bộ itc.epu.edu.vn và đọc bằng vision (không có text layer). Mục II.2.3 "Phương thức 3: Xét tuyển dựa vào kết quả của thí sinh trong kỳ thi tốt nghiệp THPT năm 2026" ghi nguyên văn cách tính: "Sử dụng kết quả điểm trong kỳ thi tốt nghiệp THPT năm 2026 của 3 môn theo tổ hợp xét tuyển và điểm ưu tiên (nếu có)". Mục II.4.1 "Số lượng tuyển sinh (dự kiến)" (trang 4-5) liệt kê đủ 38 mã xét tuyển kèm tổ hợp xét tuyển (THXT) riêng cho từng phương thức theo nhóm ngành. Mục II.2.1 nêu rõ điểm ưu tiên "áp dụng theo Quy chế tuyển sinh trình độ đại học hiện hành của Bộ GD&ĐT" (không có bảng mức riêng của trường) và "Các thí sinh đã tốt nghiệp từ năm 2024 trở về trước không được cộng điểm ưu tiên".',
  },
  {
    id: 'epu-diemtrungtuyen-3020-2026',
    publisher: 'Trường Đại học Điện lực (EPU) — Hội đồng tuyển sinh năm 2026',
    title: 'Thông báo số 3020/TB-ĐHĐL (09/8/2026) — V/v điểm trúng tuyển đại học chính quy năm 2026',
    url: 'https://epu.edu.vn/post/diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026-J1QaE.html',
    accessedAt: '2026-09-09',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF scan gốc 3 trang có con dấu đỏ, đính kèm bài đăng chính chủ epu.edu.vn ngày 09/8/2026 (tải trực tiếp từ itc.epu.edu.vn/core/contentspace/assets/2a4217e7-71e7-4537-853c-4a5c136b4c3e, đọc bằng vision). Căn cứ Thông tư 06/2026/TT-BGDĐT, Thông báo 466/TB-ĐHĐL và Biên bản họp 3019/BB-ĐHĐL (08/8/2026) của Hội đồng tuyển sinh. Mục 1 công bố điểm trúng tuyển "theo phương thức xét tuyển dựa trên điểm thi tốt nghiệp THPT năm 2026" cho ĐỦ 38/38 mã xét tuyển (16,00–24,60/30) — bảng STT 1-38 với 3 cột Mã xét tuyển / Tên ngành / Điểm trúng tuyển, không phân biệt theo tổ hợp.',
  },
  {
    id: 'epu-priority-national-2026',
    publisher: 'Bộ Giáo dục và Đào tạo',
    title: 'Thông tư 06/2026/TT-BGDĐT — Quy chế tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng, Điều 7 (Chính sách ưu tiên trong tuyển sinh)',
    url: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/06-bgddt.pdf',
    accessedAt: '2026-09-09',
    publishedAt: '2026-02-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Khung điểm ưu tiên quốc gia được Thông báo 466/TB-ĐHĐL dẫn chiếu ("theo Quy chế tuyển sinh trình độ đại học hiện hành của Bộ GD&ĐT") thay cho bảng riêng của trường — judgment call cùng tiền lệ HVU/HBU/VTTU/DLA/PVU/HTU/TUMP/NAEM. Điều 7: KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25; KV3 = 0; UT1 (đối tượng 01-03) = 2,00; UT2 (đối tượng 04-06) = 1,00 (thang 30); khoản 4 quy định công thức giảm "Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên quy định" khi tổng điểm đạt từ 22,50/30 trở lên.',
  },
];
