import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface CtuSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

/**
 * Nguồn đã xác minh cho Đại học Cần Thơ (CTU, mã trường TCT) 2026 — đọc trực tiếp qua browser
 * thật, domain chính thức `tuyensinh.ctu.edu.vn`.
 */
export const ctuSources: CtuSource[] = [
  {
    id: 'ctu-quality-threshold-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Cần Thơ (CTU, mã trường TCT)',
    title: 'Ngưỡng đầu vào đại học chính quy năm 2026',
    url: 'https://tuyensinh.ctu.edu.vn/84-thong-tin-tuyen-sinh/1140-thong-bao-nguong-dam-bao-chat-luong-dau-vao-dai-hoc-chinh-quy-nam-2026.html',
    accessedAt: '2026-08-21',
    publishedAt: '2026-07-08',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo chính thức đọc trực tiếp qua browser thật (không phải nguồn thứ cấp/tổng hợp). Căn cứ Biên bản số 2165/BB-ĐHCT-HĐTS (08/7/2026), Quyết định 1961/QĐ-BGDĐT và 1963/QĐ-BGDĐT (07/7/2026), Thông báo số 2178/TB-ĐHCT (08/7/2026) và Thông báo số 2232/TB-ĐHCT (13/7/2026). Nội dung: (1) điều kiện 1 áp dụng chung mọi ngành/phương thức — tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển ≥15,0 điểm (thang 30); (2) điều kiện 2 tùy ngành/phương thức — mục 2.2.1 (thi TN THPT, mọi ngành) dẫn chiếu điểm sàn CHI TIẾT THEO MÃ XÉT TUYỂN trong phụ lục PDF riêng (ảnh scan, không đọc được — `ctu-per-major-threshold-pdf-unparsed`); mục 2.2.3 (pháp luật, học bạ/V-SAT) và 2.2.4 (sư phạm trừ GDTC, học bạ/V-SAT) có đường thay thế qua học lực lớp 12 + tổng điểm thi TN THPT/điểm xét tốt nghiệp THPT, đọc được trực tiếp từ văn bản; mục 2.2.3 còn kèm điều kiện tổ hợp môn (Văn/Toán+Văn) NHƯNG ghi rõ dùng "điểm V-SAT/Học bạ quy đổi" — cần bảng quy đổi riêng (`ctu-law-combo-conversion-unparsed`). Điều kiện 2.2.2 (học bạ/V-SAT, ngành thường) và 2.2.5 (GDTC) không model trong batch này (ngoài phạm vi + công thức riêng GDTC).',
  },
  {
    id: 'ctu-appendix-threshold-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Cần Thơ (CTU, mã trường TCT)',
    title: 'Phụ lục — Điểm sàn đăng ký xét tuyển vào đại học chính quy năm 2026',
    url: 'https://tuyensinh.ctu.edu.vn/images/upload/TT_TS/2026/Phu-luc-TB_Nguong-bao-dam-chat-luong-dau-vao-dai-hoc-chinh-quy-nam-2026.pdf',
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Phụ lục PDF 9 trang (ảnh scan, không có text layer) đính kèm thông báo `ctu-quality-threshold-2026` (nút "XEM TẠI ĐÂY"). Đọc bằng OCR 2026-08-27 (poppler `pdftoppm` render 200dpi → đọc bằng vision). Nội dung: bảng "ĐIỂM SÀN ĐĂNG KÝ XÉT TUYỂN VÀO ĐẠI HỌC CHÍNH QUY NĂM 2026" theo từng mã xét tuyển (thang 30, so với TỔNG 3 MÔN THÔ theo tổ hợp — điều kiện 2, mục 2.2.1): nhóm ngành đào tạo giáo viên 20 (Giáo dục Mầm non 20 + năng khiếu, Giáo dục Thể chất 19 + năng khiếu); nhóm pháp luật 20 + điều kiện tổ hợp (C00: Ngữ văn ≥ 6,0; tổ hợp khác: Toán + Ngữ văn ≥ 12,0); các ngành còn lại 15-16 (riêng mã 7480106 Thiết kế vi mạch bán dẫn: 22,75 + Toán ≥ 7,5, xác định theo phổ điểm môn Toán do Bộ GD&ĐT công bố). Căn cứ Thông báo số 2178/TB-ĐHCT (08/7/2026) và Thông báo số 2232/TB-ĐHCT (13/7/2026). Danh mục tổ hợp (Ghi chú 6) đầy đủ trong phụ lục.',
  },
  {
    id: 'ctu-hocba-conversion-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Cần Thơ (CTU, mã trường TCT)',
    title: 'Bảng quy đổi điểm Học bạ năm 2026',
    url: 'https://tuyensinh.ctu.edu.vn/chuong-trinh-dai-tra/177-thong-tin/1161-thong-bao-bang-quy-doi-diem-hoc-ba-nam-2026.html',
    accessedAt: '2026-08-21',
    sourceType: 'official-school',
    verification: 'incomplete',
    note: 'Chỉ ghi nhận sự tồn tại của trang — chưa đọc/parse bảng số liệu trong batch này (xem `ctu-per-major-threshold-pdf-unparsed`/`ctu-law-combo-conversion-unparsed`).',
  },
  {
    id: 'ctu-vsat-conversion-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Cần Thơ (CTU, mã trường TCT)',
    title: 'Bảng quy đổi điểm V-SAT năm 2026',
    url: 'https://tuyensinh.ctu.edu.vn/chuong-trinh-dai-tra/177-thong-tin/1159-thong-bao-bang-quy-doi-diem-v-sat-nam-2026.html',
    accessedAt: '2026-08-21',
    sourceType: 'official-school',
    verification: 'incomplete',
    note: 'Chỉ ghi nhận sự tồn tại của trang — chưa đọc/parse bảng số liệu trong batch này (xem `ctu-per-major-threshold-pdf-unparsed`/`ctu-law-combo-conversion-unparsed`).',
  },
];
