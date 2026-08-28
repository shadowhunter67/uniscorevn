import type { AdmissionSource } from '../../core/sourceRegistry';

export const hnueSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hnue-quality-threshold-2026',
    publisher: 'Trường Đại học Sư phạm Hà Nội',
    title: 'Ngưỡng bảo đảm chất lượng đầu vào năm 2026',
    url: 'https://tuyensinh.hnue.edu.vn/thong-bao/667',
    accessedAt: '2026-08-22',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hnue-spt-conversion-2026',
    publisher: 'Trường Đại học Sư phạm Hà Nội',
    title: 'Thông báo về Quy đổi điểm PT2, SPT2026',
    url: 'https://tuyensinh.hnue.edu.vn/thong-bao',
    accessedAt: '2026-08-22',
    publishedAt: '2026-07-06',
    sourceType: 'official-admission',
    verification: 'incomplete',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hnue-threshold-crosscheck-chinhphu-2026',
    publisher: 'Báo Điện tử Chính phủ (Cổng TTĐT Chính phủ)',
    title: 'Điểm sàn Trường Đại học Sư phạm Hà Nội năm 2026',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-san-truong-dai-hoc-su-pham-ha-noi-nam-2026-119260711093929798.htm',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-11',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cross-check research 2026-08-28: xác nhận lại nội dung `hnue-quality-threshold-2026` — ngưỡng "không nhân hệ số" và "không tính điểm cộng" cho khu vực 3, và liệt kê một vài mốc theo ngành (đa số ngành sư phạm 21,0-24,0; GDTC/SP Âm nhạc-Mỹ thuật 19,0; CNTT/Toán ứng dụng-Khoa học dữ liệu 20,0) nhưng KHÔNG phải bảng đầy đủ machine-readable cho toàn bộ ngành — trang gốc `tuyensinh.hnue.edu.vn/thong-bao/667` và `hnue.edu.vn/tin-tuc/11317/...` vẫn trả 403 khi fetch trực tiếp lần thử 2026-08-28. Chưa đủ để nhập bảng ngưỡng đầy đủ theo ngành (xem `hnue-program-threshold-table-not-imported`).',
  },
];
