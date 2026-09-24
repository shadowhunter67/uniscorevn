import type { AdmissionSource } from '../../core/sourceRegistry';

/**
 * Trường Đại học Khánh Hòa (UKH, mã trường UKH) — cổng chính thức ukh.edu.vn/tuyensinh (DotNetNuke
 * CMS, HTML fetch được, nội dung bài viết nhúng qua Google Drive PDF preview iframe — tải trực tiếp
 * file Drive qua `drive.google.com/uc?export=download&id=...` rồi đọc bằng pdftotext -enc UTF-8 +
 * vision cho bảng).
 */
export const ukhSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'ukh-identity-2026',
    publisher: 'Trường Đại học Khánh Hòa',
    title: 'Trang chủ chính thức Trường Đại học Khánh Hòa',
    url: 'https://ukh.edu.vn/vi-vn/',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Xác nhận danh tính: trường đại học công lập trực thuộc UBND tỉnh Khánh Hòa, mã trường tuyển sinh UKH, 2 cơ sở tại TP Nha Trang.',
  },
  {
    id: 'ukh-scheme-2026',
    publisher: 'Trường Đại học Khánh Hòa (Hội đồng tuyển sinh)',
    title: 'Thông tin tuyển sinh năm 2026 (cập nhật) — Trường Đại học Khánh Hòa',
    url: 'https://ukh.edu.vn/tuyensinh/vi-vn/chi-tiet-tin/id/6346/THONG-TIN-TUYEN-SINH-NAM-2026-(CAP-NHAT)',
    accessedAt: '2026-09-22',
    publishedAt: '2026-07-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 29 trang nhúng qua Google Drive iframe (tải trực tiếp qua uc?export=download, đọc bằng pdftotext -enc UTF-8). Mục "3. Điểm cộng": "Điểm cộng tối đa là 3,00 điểm vào TỔNG ĐIỂM 3 MÔN xét tuyển theo thang điểm 30" — xác nhận nền tảng là tổng thô 3 môn không nhân hệ số, thang 30 (điểm cộng thành tích là phần CỘNG THÊM, KHÔNG mô hình hoá — xem knowledgeGaps.ts). Mục "5. Điểm ưu tiên" dẫn Phụ lục IV: bảng điểm ưu tiên khu vực (KV1=0,75; KV2-NT=0,50; KV2=0,25; KV3=0) và đối tượng chính sách (Nhóm 1=2,00; Nhóm 2=1,00) — khớp khung quốc gia hiện hành. Mục "2. Số lượng tuyển sinh cập nhật" (trang 5-11) liệt kê đủ 21 mã xét tuyển với tổ hợp môn Phương thức 1 (thi TN THPT)/2 (học bạ) — dùng để map SubjectId. 3 mã tổ hợp D04/D45/D65 (có môn Tiếng Trung) không có SubjectId tương ứng trong hệ thống — loại khỏi các ngành có dùng (7220204 Ngôn ngữ Trung Quốc còn 4/7 tổ hợp; 7310630/7229030/7229040/7229020 còn 8/9 tổ hợp mỗi ngành).',
  },
  {
    id: 'ukh-cutoff-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Khánh Hòa',
    title: 'Thông báo điểm trúng tuyển đại học chính quy đợt 1 năm 2026 — Số 07/TB-HĐTS',
    url: 'https://ukh.edu.vn/tuyensinh/vi-vn/chi-tiet-tin/id/6394/Thong-bao-diem-trung-tuyen-dot-1-cac-nganh-dao-tao-trinh-do-dai-hoc-chinh-quy,-nam-2026',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 2 trang nhúng qua Google Drive iframe (tải trực tiếp, có chữ ký TS. Phan Phiến — Chủ tịch HĐTS + con dấu đỏ "TRƯỜNG ĐẠI HỌC KHÁNH HÒA", đọc bằng vision). Cột "Điểm thi tốt nghiệp THPT năm 2026" (thang 30) theo mã xét tuyển, đủ 21 ngành: 7140217 Sư phạm Ngữ văn 24,17; 7140249 Sư phạm Lịch sử - Địa lý 24,73; 7140231 Sư phạm Tiếng Anh 24,38; 7140209 Sư phạm Toán học 24,88; 7140202 Giáo dục Tiểu học 24,61; 7140211 Sư phạm Vật lý 23,25; 7140247 Sư phạm Khoa học tự nhiên 22,99; 7420203 Sinh học ứng dụng 15,00; 7440112 Hóa học 15,00; 7340101 Quản trị kinh doanh 15,00; 7810201 Quản trị khách sạn 15,00; 7810101 Du lịch 15,00; 7810103 Quản trị dịch vụ du lịch và lữ hành 15,00; 7310630 Việt Nam học 15,00; 7229030 Văn học 18,80; 7229040 Văn hóa học 15,00; 7220201 Ngôn ngữ Anh 15,00; 7229020 Ngôn ngữ học 15,00; 7220204 Ngôn ngữ Trung Quốc 18,25; 7320104 Truyền thông đa phương tiện 19,02; 7340115 Marketing 15,00. Ghi chú 1 nguyên văn: "Thí sinh trúng tuyển khi có điểm xét tuyển lớn hơn hoặc bằng điểm trúng tuyển" — dùng đúng thuật ngữ quốc gia "điểm xét tuyển" (ĐXT, đã gồm điểm ưu tiên theo Điều 5 TT 06/2026/TT-BGDĐT), khớp cách các trường khác trong hệ thống (DPD/PDU/BLU) đã xác nhận.',
  },
];
