import type { AdmissionSource } from '../../core/sourceRegistry';

export const bafuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'bafu-admission-info-2026',
    publisher: 'Trường Đại học Nông - Lâm Bắc Giang (BAFU)',
    title: 'Thông tin tuyển sinh năm 2026 (cập nhật 02/03/2026)',
    url: 'https://bafu.edu.vn/home/attachments/article/4581/tbtscapnhat2026.pdf',
    accessedAt: '2026-09-16',
    publishedAt: '2026-03-02',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đọc qua WebFetch (trang HTML bafu.edu.vn/home/tin-tuc/dao-tao-tuyen-sinh/4581-..., không phải PDF scan). 20 ngành, 1.500 chỉ tiêu. Công thức Phương thức 2 (thi TN THPT) NGUYÊN VĂN: "ĐXT = ĐM1 + ĐM2 + ĐM3 + ĐƯT". Điểm ưu tiên: "ĐƯT = [(30 − tổng điểm)/7,5] × mức điểm ưu tiên" khi tổng ≥22,5/30 (công thức giảm chuẩn TT06/2026). Ngưỡng đầu vào PT2 ghi RÕ "CHƯA GỒM ĐIỂM ƯU TIÊN": từ 15,0/30 trở lên, đồng nhất cả 20 ngành (PT3 ĐGTD ≥11, PT4 học bạ ≥18 — không model). Tổ hợp môn khác nhau theo ngành (ví dụ Kế toán: A00/A01/A07/B03/C01/C02/C03/C04/D01/D04/D30/X01/X02/X04/X70/X74) — không có bảng đầy đủ theo từng ngành, model theo tổ hợp CHUNG có trong taxonomy hiện có (A00/A01/A02/B00/A07/B03/C01/C02/C03/C04/D01/X01/X02), không ràng buộc theo ngành cụ thể vì ngưỡng đồng nhất toàn trường.',
  },
];
