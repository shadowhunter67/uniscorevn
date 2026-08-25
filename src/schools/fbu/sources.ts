import type { AdmissionSource } from '../../core/sourceRegistry';

export const fbuSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'fbu-admission-notice-2026',
    publisher: 'Trường Đại học Tài chính - Ngân hàng Hà Nội',
    title: 'Thông báo công bố thông tin tuyển sinh đại học chính quy năm 2026 (Thông báo số 99/TB-ĐHTCNH)',
    url: 'https://vienngonngunuocngoai.fbu.edu.vn/thong-bao-cong-bo-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-05-30',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'fbu-quality-threshold-2026',
    publisher: 'Báo Dân Việt / Báo Tiền Phong (báo chí nhà nước, trích phát biểu Phó Hiệu trưởng FBU)',
    title: 'Dự báo điểm chuẩn và ngành hot ở Trường Đại học Tài chính - Ngân hàng Hà Nội 2026',
    url: 'https://danviet.vn/lanh-dao-truong-dai-hoc-tai-chinh-ngan-hang-ha-noi-du-bao-diem-chuan-va-nganh-hot-nam-2026-d1440933.html',
    accessedAt: '2026-08-24',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
