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
  {
    id: 'fbu-qd99-2026',
    publisher: 'Trường Đại học Tài chính - Ngân hàng Hà Nội',
    title: 'Quyết định 99/QĐ-ĐHTNH (05/03/2026): Thông tin tuyển sinh đại học năm 2026',
    url: 'https://vienngonngunuocngoai.fbu.edu.vn/wp-content/uploads/2026/05/QD-so.-99.-Vv-Ban-hanh-Thong-tin-tuyen-sinh-trinh-do-dai-hoc-nam-2026-cua-truong-DH-Tai-chinh-Ngan-hang-Ha-Noi_0001-1.pdf',
    accessedAt: '2026-08-28',
    publishedAt: '2026-03-05',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];

/**
 * `fbu-qd99-2026` (PDF chính thức FBU, đọc trực tiếp qua vision — không phải secondary): mục 2.1.2
 * công thức Điểm xét tuyển PT1 = [((Điểm môn 1 × 2) + Điểm môn 2 + Điểm môn 3)/4] × 3 + ĐKK(nếu
 * có) + ĐXT(nếu có) + ĐƯT(nếu có), tối đa 30, tổng điểm cộng tối đa 3,0. Mục 6.1.1: điểm xét tuyển
 * từ 17,0/30 trở lên (mọi ngành trừ Luật kinh tế - ngưỡng riêng 60% thang điểm + điều kiện môn
 * Toán). Mục 7: áp dụng chính sách ưu tiên chung theo Quy chế tuyển sinh đại học 2026 của Bộ GD&ĐT
 * và của Trường (không tự công bố bảng mức điểm ưu tiên riêng).
 */
