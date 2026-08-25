import type { AdmissionSource } from '../../core/sourceRegistry';

export const uttSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'utt-threshold-2026',
    publisher: 'BNews (TTXVN, dẫn thông báo chính thức UTT)',
    title: 'Đại học Công nghệ Giao thông Vận tải công bố điểm sàn xét tuyển năm 2026',
    url: 'https://bnews.vn/dai-hoc-cong-nghe-giao-thong-van-tai-cong-bo-diem-san-xet-tuyen-nam-2026/428962.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-08',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'utt-threshold-2026-crosscheck',
    publisher: 'Tạp chí điện tử Giáo dục Việt Nam (dẫn thông báo chính thức UTT)',
    title: 'Trường Đại học Công nghệ Giao thông Vận tải công bố điểm sàn năm 2026 từ 15-20 điểm',
    url: 'https://giaoduc.net.vn/truong-dai-hoc-cong-nghe-giao-thong-van-tai-cong-bo-diem-san-nam-2026-tu-15-20-diem-post261230.gd',
    accessedAt: '2026-08-24',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
