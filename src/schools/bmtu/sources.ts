import type { AdmissionSource } from '../../core/sourceRegistry';

export const bmtuSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'bmtu-dean-2026',
    publisher: 'Trường Đại học Y Dược Buôn Ma Thuột (mã trường BMU, bmu.edu.vn, tên miền chính chủ)',
    title: 'Quyết định số 396/QĐ-YDBMT (12/6/2026) — Đề án/Thông tin tuyển sinh đại học chính quy năm 2026 (cập nhật)',
    url: 'https://bmu.edu.vn/de-an-tuyen-sinh',
    accessedAt: '2026-09-03',
    publishedAt: '2026-06-12',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'bmtu-threshold-2026',
    publisher: 'Trường Đại học Y Dược Buôn Ma Thuột (bmu.edu.vn) — công bố qua Báo Thanh Niên (báo nhà nước, đưa tin trực tiếp thông báo điểm chuẩn 2026 của trường ngày 10/8/2026)',
    title: 'Điểm chuẩn Trường ĐH Y dược Buôn Ma Thuột 2026 (Y khoa cao nhất)',
    url: 'https://thanhnien.vn/diem-chuan-truong-dh-y-duoc-buon-ma-thuot-y-khoa-cao-nhat-185260810152809417.htm',
    accessedAt: '2026-09-03',
    publishedAt: '2026-08-10',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
