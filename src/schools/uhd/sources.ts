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
];
