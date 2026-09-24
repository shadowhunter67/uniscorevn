import type { AdmissionSource } from '../../core/sourceRegistry';

/**
 * Trường Đại học Phạm Văn Đồng (PDU, mã trường DPQ, Quảng Ngãi) — cổng tuyển sinh chính thức
 * tuyensinh.pdu.edu.vn (WordPress, fetch HTML thường được, không cần trình duyệt thật). 2 PDF gốc
 * đính kèm bài viết chính thức: (1) "Thông tin tuyển sinh năm 2026" (Quyết định 131/QĐ-ĐHPVĐ,
 * 23/4/2026) — công thức Tổng điểm xét tuyển + điểm ưu tiên + bảng tổ hợp môn theo ngành; (2)
 * "Thông báo điểm trúng tuyển đợt 1" (Số 997/TB-ĐHPVĐ, 10/8/2026, có chữ ký Hiệu trưởng + con dấu
 * đỏ) — điểm chuẩn thật theo mã ngành, cột "Kết quả thi tốt nghiệp THPT 2026".
 */
export const pduSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'pdu-identity-2026',
    publisher: 'Trường Đại học Phạm Văn Đồng',
    title: 'Trang chủ chính thức Trường Đại học Phạm Văn Đồng',
    url: 'https://www.pdu.edu.vn/',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Xác nhận danh tính: trường đại học công lập, mã trường tuyển sinh DPQ, trụ sở 509 Phan Đình Phùng, phường Cẩm Thành, tỉnh Quảng Ngãi.',
  },
  {
    id: 'pdu-scheme-2026',
    publisher: 'Trường Đại học Phạm Văn Đồng (Hội đồng tuyển sinh)',
    title: 'Thông tin tuyển sinh năm 2026 (Chính quy) — ban hành kèm Quyết định số 131/QĐ-ĐHPVĐ ngày 23/4/2026',
    url: 'https://tuyensinh.pdu.edu.vn/thong-tin-tuyen-sinh-nam-2026/',
    accessedAt: '2026-09-22',
    publishedAt: '2026-04-24',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc "PDU_Thong-tin-tuyen-sinh-CQ-2026.pdf" (tải trực tiếp qua link download WordPress, đọc text layer bằng pdftotext + vision cho bảng). Mục 6.c công bố nguyên văn: "Công thức tính tổng điểm xét tuyển: Tổng điểm xét tuyển = M1 + M2 + M3 + Tổng điểm ưu tiên" (M1,M2,M3 là điểm 3 bài thi THPT 2026 theo tổ hợp, bậc đại học). Điểm ưu tiên: "Đối với thí sinh đạt tổng điểm từ 22,5 trở lên (quy về thang điểm 10 và tổng điểm 3 môn tối đa là 30)... Tổng điểm ưu tiên = [(30 - Tổng điểm đạt được)/7,5] x Mức điểm ưu tiên quy định", "Điểm ưu tiên bao gồm: điểm ưu tiên khu vực + điểm ưu tiên đối tượng" — mức điểm cụ thể dẫn chiếu Phụ lục I, II Thông tư 06/2026/TT-BGDĐT (không tự in lại bảng, không phải judgment call). Mục "4. Số lượng tuyển sinh" (trang 5-6 PDF, đọc bằng vision) liệt kê đủ 14 chương trình/mã ngành với tổ hợp môn Phương thức 1 (thi TN THPT) — dùng để map SubjectId qua `core/subjects.ts`. Ngành Giáo dục Mầm non (51140201, cao đẳng) dùng tổ hợp M01 (Ngữ văn + Năng khiếu 1 + Năng khiếu 2)/M09 (Toán + NK1 + NK2) — môn năng khiếu không có SubjectId tương ứng, KHÔNG mô hình hoá (khác cấp đào tạo, xem knowledgeGaps.ts).',
  },
  {
    id: 'pdu-cutoff-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Phạm Văn Đồng',
    title: 'Thông báo điểm trúng tuyển đợt 1, Kỳ tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng hệ chính quy năm 2026 — Số 997/TB-ĐHPVĐ',
    url: 'https://tuyensinh.pdu.edu.vn/thong-bao-diem-trung-tuyen-dot-1-ky-tuyen-sinh-nam-2026/',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc "Thongbao_DiemTrungTuyen_DotChinhThuc_2026.pdf" (tải trực tiếp, có chữ ký Hiệu trưởng Trần Đình Thám + con dấu đỏ "TRƯỜNG ĐẠI HỌC PHẠM VĂN ĐỒNG", đọc bằng vision). Cột "Kết quả thi tốt nghiệp THPT 2026" (thang 30) theo mã ngành: 7140202 Giáo dục Tiểu học 22,30; 7140209 Sư phạm Toán học 21,60; 7140210 Sư phạm Tin học 20,00; 7140211 Sư phạm Vật lý 21,60; 7140212 Sư phạm Hoá học 21,85; 7140217 Sư phạm Ngữ văn 22,10; 7140231 Sư phạm Tiếng Anh 21,30; 7140247 Sư phạm Khoa học Tự nhiên 21,80; 7340101 Quản trị kinh doanh 15,0; 7340115 Marketing 15,0; 7480201 Công nghệ thông tin 15,0; 7510201 Công nghệ kỹ thuật cơ khí 15,0; 7520114 Kỹ thuật cơ điện tử 15,0. Ngành 51140201 Giáo dục Mầm non (cao đẳng) 23,24 — KHÔNG mô hình hoá (tổ hợp năng khiếu, khác cấp đào tạo).',
  },
];
