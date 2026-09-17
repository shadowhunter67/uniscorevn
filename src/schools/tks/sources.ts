import type { AdmissionSource } from '../../core/sourceRegistry';

export const tksSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'tks-cutoff-notice-2026',
    publisher: 'Trường Đại học Kiểm sát Hà Nội (TKS)',
    title: 'Thông báo số 283/TB-T2-ĐT về việc công bố điểm chuẩn trúng tuyển đại học chính quy năm 2026',
    url: 'https://tuyensinh.kiemsat.edu.vn/thong-bao-diem-chuan-xet-tuyen-dai-hoc-2026.html',
    accessedAt: '2026-09-17',
    publishedAt: '2026-08-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải file PDF qua Google Drive folder công khai liên kết trên trang (tuyensinh.kiemsat.edu.vn), đọc bằng vision. Điểm chuẩn TRÚNG TUYỂN thật, ghi rõ "đã bao gồm điểm ưu tiên". Ngành Luật (chuyên ngành Kiểm sát) có cutoff riêng theo KHU VỰC + GIỚI TÍNH (Nam/Nữ Miền Bắc/Miền Nam: 25.65/26.32/23.72/24.60) — LOẠI khỏi phạm vi vì ApplicantProfile không có trường giới tính. Chỉ model nhóm "Luật, Luật kinh tế, Ngôn ngữ Anh" (không phân biệt giới tính): Trụ sở chính — Luật 23.40, Luật kinh tế 23.90, Ngôn ngữ Anh 21.50; Phân hiệu TP.HCM — Luật 22.80.',
  },
  {
    id: 'tks-conversion-table-2026',
    publisher: 'Trường Đại học Kiểm sát Hà Nội (TKS)',
    title: 'Phụ lục II — Bảng quy đổi điểm tương đương giữa các phương thức xét tuyển ngành Luật, ngành Luật kinh tế, ngành Ngôn ngữ Anh năm 2026',
    url: 'https://tuyensinh.kiemsat.edu.vn/quy-tac-quy-doi-diem-va-nguong-dau-vao-tuyen-sinh-dai-hoc-nam-2026.html',
    accessedAt: '2026-09-17',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Phụ lục II (Thông báo 254/TB-T2-ĐT, 10/7/2026), tải qua cùng Google Drive folder công khai. Bảng "Độ chênh lệch giữa các tổ hợp xét tuyển so với tổ hợp gốc" (tổ hợp gốc D01, thang 30): A00 +1,45; C01/C02/C03/C04 +0,8; D15 −0,88; A01/D07/D09/D14 = 0. Dùng để quy đổi điểm thô tổ hợp bất kỳ về "điểm quy đổi D01" trước khi so điểm chuẩn.',
  },
];
