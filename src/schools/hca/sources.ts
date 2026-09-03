import type { AdmissionSource } from '../../core/sourceRegistry';

export const hcaSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'hca-notice-09-2025',
    publisher: 'Học viện Cán bộ Thành phố Hồ Chí Minh (mã trường HVC) — bản PDF gốc có chữ ký/con dấu, lưu trữ lại trên tuyensinh247.com',
    title: 'Thông báo số 09-TB/HĐTS-HVCB (19/6/2025) — Về tiếp nhận thông tin xét tuyển đại học hệ chính quy năm 2025',
    url: 'https://images.tuyensinh247.com/picture/2025/0620/hoc-vien-can-bo-tphcm_1.pdf',
    accessedAt: '2026-09-03',
    publishedAt: '2025-06-19',
    sourceType: 'official-republication',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
  },
  {
    id: 'hca-de-an-2026',
    publisher: 'Học viện Cán bộ Thành phố Hồ Chí Minh (mã trường HVC) — bản PDF gốc có chữ ký/con dấu (Quyết định 639-QĐ/HVCB), lưu trữ lại trên tuyensinh247.com',
    title: 'Quyết định số 639-QĐ/HVCB (22/5/2026) — Thông tin tuyển sinh trình độ đại học hệ chính quy năm 2026 (kèm bảng điểm trúng tuyển 2024-2025 tại mục 11, và công thức/bảng điểm cộng khuyến khích/điểm ưu tiên áp dụng liên tục qua các năm)',
    url: 'https://cdn.tuyensinh247.com/picture/2026/0618/639-687-qd-hvcb-12062026074819848-yd4tlk4ipv4-1.pdf',
    accessedAt: '2026-09-03',
    publishedAt: '2026-05-22',
    sourceType: 'official-republication',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hca-threshold-2025',
    publisher: 'Cổng thông tin điện tử Chính phủ (chinhphu.vn) — đưa tin đối chiếu chéo với báo FPT Shop, khớp bảng điểm trúng tuyển 2025 công bố lại trong mục 11 tài liệu 639-QĐ/HVCB (2026)',
    title: 'Điểm chuẩn Học viện Cán bộ TPHCM 2025',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-hoc-vien-can-bo-tphcm-2025-119250823091527247.htm',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-23',
    sourceType: 'government',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2025, status: 'current' },
  },
];
