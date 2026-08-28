import type { AdmissionSource } from '../../core/sourceRegistry';

export const uhdSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'uhd-threshold-2026',
    publisher: 'Trường Đại học Hải Dương',
    title: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào tuyển sinh năm 2026',
    url: 'https://uhd.edu.vn/tin-tuc/tuyen-sinh-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'uhd-threshold-2026-crosscheck-1',
    publisher: 'Tạp chí điện tử Giáo dục Việt Nam (dẫn thông báo chính thức UHD)',
    title: 'Trường Đại học Hải Dương thông báo điểm sàn xét tuyển dao động từ 15-20 điểm',
    url: 'https://giaoduc.net.vn/truong-dai-hoc-hai-duong-thong-bao-diem-san-xet-tuyen-dao-dong-tu-15-20-diem-post261304.gd',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'uhd-threshold-2026-crosscheck-2',
    publisher: 'Vietjack (dẫn thông báo chính thức UHD)',
    title: 'Đại học Hải Dương thông báo ngưỡng nhận hồ sơ xét tuyển năm 2026',
    url: 'https://khoahoc.vietjack.com/bai-viet/9549/dai-hoc-hai-duong-thong-bao-nguong-nhan-ho-so-xet-tuyen-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'uhd-quyet-dinh-289-2026',
    publisher: 'Trường Đại học Hải Dương',
    title: 'Quyết định 289/QĐ-ĐHHD (02/04/2026) - Thông tin tuyển sinh năm 2026',
    url: 'https://uhd.edu.vn/tin-tuc/thong-tin-tuyen-sinh-nam-2026-postrLJ9g9Q3ANsYWpaprpzY',
    accessedAt: '2026-08-28',
    publishedAt: '2026-04-02',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];

/**
 * `uhd-quyet-dinh-289-2026` (PDF chính thức UHD, bản scan, đọc trực tiếp qua vision từng trang -
 * không phải secondary): trang 4 công thức Điểm xét tuyển = Môn1+Môn2+Môn3+Điểm UT (PT100, thi TN
 * THPT) và tương tự cho PT200 (học bạ). Mục 5.2: "Điểm cộng: Nhà trường không áp dụng". Mục 5.3:
 * ngưỡng sàn nhận hồ sơ 15,00/30 cho nhóm ngành ngoài Sư phạm/Giáo dục thể chất. Mục 5.5.d: áp
 * dụng điểm ưu tiên khu vực/đối tượng thống nhất, đồng bộ quy định Bộ GD&ĐT (không tự công bố bảng
 * mức điểm riêng). Nhóm ngành Sư phạm dẫn chiếu ngưỡng do Bộ GD&ĐT quyết định hàng năm (không phải
 * số cố định do UHD tự quy định) - ngoài phạm vi model của batch này.
 */
