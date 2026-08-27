import type { AdmissionSource } from '../../core/sourceRegistry';

export const hluSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hlu-admission-portal-2026',
    publisher: 'Trường Đại học Luật Hà Nội - Cổng thông tin tuyển sinh',
    title: 'Cổng tuyển sinh đại học chính quy năm 2026 (Khóa 51)',
    url: 'https://tuyensinh.hlu.edu.vn/tsnews/details/30532',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hlu-quality-threshold-2026',
    publisher: 'Trường Đại học Luật Hà Nội',
    title:
      'Thông báo số 1010/TB-ĐHLHN về việc xác định ngưỡng bảo đảm chất lượng đầu vào trong tuyển sinh trình độ đại học hình thức đào tạo chính quy năm 2026 (Khóa 51)',
    url: 'https://tuyensinh.hlu.edu.vn/Images/Post/files/TB1010_B%C4%90CL%C4%90V_K51_2026.pdf',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'hlu-quyche-2026',
    publisher: 'Trường Đại học Luật Hà Nội',
    title: 'Quy chế tuyển sinh trình độ đại học của Trường Đại học Luật Hà Nội (Quyết định 633/QĐ-ĐHLHN, 26/03/2026)',
    url: 'https://tuyensinh.hlu.edu.vn/Images/Post/files/QD633_Quy%20che%CC%82%CC%81%20tuye%CC%82%CC%89n%20sinh%20HLU_2026.pdf',
    accessedAt: '2026-08-27',
    publishedAt: '2026-03-26',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF ảnh scan 22 trang, đọc bằng OCR (poppler render + vision) 2026-08-27. Điều 6 (phương thức xét tuyển): điểm cộng ≤ 10% mức tối đa (≤ 3,0 với thang 30); không thí sinh nào có điểm xét (gồm điểm cộng, điểm ưu tiên) vượt 30. Điều 7 (chính sách ưu tiên): mức KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm ưu tiên 1 (ĐT 01-04) 2,0 / nhóm 2 (ĐT 05-07) 1,0; công thức giảm khi tổng ≥ 22,5: Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,5] × Mức ưu tiên.',
  },
  {
    id: 'hlu-combo-delta-2026',
    publisher: 'Trường Đại học Luật Hà Nội',
    title:
      'Thông báo số 1029/TB-ĐHLHN về việc xác định quy tắc quy đổi tương đương điểm trúng tuyển trình độ đại học hình thức chính quy năm 2026 (Khóa 51)',
    url: 'https://tuyensinh.hlu.edu.vn/Images/Post/files/Tuyensinh/DHCQ/K51/TB%201029%20ve%CC%82%CC%80%20Quy%20%C4%91o%CC%82%CC%89i%20tu%CC%9Bo%CC%9Bng%20%C4%91u%CC%9Bo%CC%9Bng.pdf',
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF 2 trang, đọc bằng OCR 2026-08-27. Mục 1 — độ chênh điểm giữa các tổ hợp so với tổ hợp gốc D01: A00 +1,48; A01 +0,26; C00, D02, D03, D04, D05, D06 = 0. Điểm quy đổi về D01 = tổng thô 3 môn − độ chênh của tổ hợp. Mục 2 — quy đổi học bạ ↔ THPT (piecewise linear y = a + (x−m)/(n−m)·(b−a), 3 khoảng điểm) — ngoài phạm vi phương thức thi THPT.',
  },
  {
    id: 'hlu-cutoff-2026',
    publisher: 'Trường Đại học Luật Hà Nội',
    title: 'Bảng điểm trúng tuyển trình độ đại học hình thức đào tạo chính quy năm 2026 (Khóa 51) theo tổ hợp gốc D01 (Quyết định 1623/QĐ-ĐHLHN, 10/08/2026)',
    url: 'https://tuyensinh.hlu.edu.vn/Images/Post/files/Tuyensinh/DHCQ/K51/BD%20DTT%20K51.pdf',
    accessedAt: '2026-08-27',
    publishedAt: '2026-08-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF 1 trang, đọc bằng OCR 2026-08-27. Điểm trúng tuyển theo tổ hợp gốc D01 (thang 30, đã gồm điểm cộng, điểm ưu tiên nếu có): Luật 24,12 · Luật Kinh tế 25,95 · Luật Thương mại quốc tế 24,22 · Ngôn ngữ Anh 23,09 · Luật (Phân hiệu Đắk Lắk) 20,00.',
  },
];
