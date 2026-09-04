import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HvuSource {
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
 * Trường Đại học Hùng Vương (HVU, mã trường THV, Phú Thọ — KHÁC "DHV" = Trường Đại học Hùng Vương
 * TP.HCM). Quyết định 226/QĐ-ĐHHV (09/03/2026) công bố qua Google Drive nhúng trên hvu.edu.vn — tải
 * trực tiếp file PDF (15 trang, có chữ ký/con dấu) thay vì chỉ đọc preview. Điểm chuẩn đợt 1 năm 2026
 * lấy từ 2 nguồn báo ĐỘC LẬP tường thuật thông báo chính thức của Hội đồng tuyển sinh trường (báo Phú
 * Thọ — cơ quan báo chí tỉnh, và Giáo dục & Thời đại — báo của Bộ GD&ĐT), khớp tuyệt đối cho 8 ngành có
 * số liệu chính xác (không làm tròn nhóm).
 */
export const hvuSources: HvuSource[] = [
  {
    id: 'hvu-admission-scheme-2026',
    publisher: 'Trường Đại học Hùng Vương (Phú Thọ) — Hiệu trưởng Đỗ Khắc Thanh',
    title: 'Quyết định 226/QĐ-ĐHHV — Thông tin tuyển sinh đại học hệ chính quy năm 2026',
    url: 'https://www.hvu.edu.vn/tin-tuc/thong-tin-tuyen-sinh-nam-2026/1773029218.hvu',
    accessedAt: '2026-09-04',
    publishedAt: '2026-03-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tin nhúng link Google Drive tới file PDF gốc có chữ ký/con dấu (Quyết định số 226/QĐ-ĐHHV ngày 09/3/2026, "Thông tin tuyển sinh đại học năm 2026") — tải trực tiếp và đọc đầy đủ 15 trang bằng vision. Mục 4 (trang 5-10) liệt kê Mã ngành / Tổ hợp xét tuyển cho cả 27 ngành đào tạo chính quy 2026, trong đó 7 ngành mô hình hoá trong module này (Sư phạm Toán học 7140209: A00/D01/X06/X25; Sư phạm Ngữ văn 7140217: C00/D14/X70/X74; Sư phạm Lịch sử-Địa lí 7140249: C00/D14/X70/X74; Sư phạm Khoa học tự nhiên 7140247: A00/A01/B00/X14; Giáo dục Tiểu học 7140202: C01/C03/D01/X01; Sư phạm Tiếng Anh 7140231: D01/D14/D15/X78; Tâm lý học 7310401: C00/D01/X70/X74) đều dùng thang điểm 30, KHÔNG nhân hệ số (khác nhóm ngành năng khiếu Giáo dục Mầm non/Giáo dục Thể chất/Sư phạm Âm nhạc/Sư phạm Mỹ thuật dùng thang 40, không mô hình hoá — xem knowledgeGaps.ts). Mục 5.2 nêu rõ trường "không tính điểm cộng (điểm thưởng, điểm xét thưởng, điểm khuyến khích) đối với thí sinh có thành tích đặc biệt, thí sinh có chứng chỉ ngoại ngữ...", và điểm ưu tiên khu vực/đối tượng áp dụng "theo quy định của Quy chế tuyển sinh hiện hành" (không có bảng riêng của trường — dùng khung quốc gia, xem priority.ts). Mục 3.1.1/3.1.4 xác nhận ngưỡng đảm bảo chất lượng đầu vào cho phương thức TS01 (xét kết quả thi TN THPT 2026) "được xác định SAU KHI có kết quả thi tốt nghiệp THPT năm 2026" — tức PDF này (ký 09/3/2026, trước kỳ thi) chưa tự chứa điểm chuẩn/ngưỡng cuối cùng; điểm chuẩn thực tế lấy từ `hvu-threshold-2026` (công bố sau kỳ thi, tháng 8/2026).',
  },
  {
    id: 'hvu-threshold-2026',
    publisher: 'Báo Phú Thọ (Báo và Phát thanh, Truyền hình Phú Thọ — cơ quan báo chí của tỉnh, nơi trường trực thuộc)',
    title: 'Trường Đại học Hùng Vương công bố điểm trúng tuyển đợt 1 năm 2026: Ngành Sư phạm dẫn đầu, khẳng định vị thế trung tâm đào tạo chất lượng cao',
    url: 'https://baophutho.vn/truong-dai-hoc-hung-vuong-cong-bo-diem-trung-tuyen-dot-1-nam-2026-nganh-su-pham-dan-dau-khang-dinh-vi-the-trung-tam-dao-tao-chat-luong-cao-259355.htm',
    accessedAt: '2026-09-04',
    publishedAt: '2026-08-09',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài đăng 19h00 09/08/2026, tường thuật trực tiếp thông báo của "Hội đồng tuyển sinh Trường Đại học Hùng Vương" công bố điểm trúng tuyển đại học hệ chính quy đợt 1 năm 2026 (thang 30, đã bao gồm điểm ưu tiên KV/ĐT theo suy luận chuẩn — điểm trúng tuyển luôn là điểm xét tuyển thực tế của thí sinh cuối danh sách, vốn đã cộng ưu tiên, cùng cách hiểu áp dụng cho HBU/VTTU). Trích nguyên văn 8 mức chính xác không làm tròn nhóm: Sư phạm Toán học 26.500; Sư phạm Ngữ văn 26.267; Sư phạm Lịch sử - Địa lí 26.142; Sư phạm Khoa học tự nhiên 25.760; Giáo dục Tiểu học 25.643; Giáo dục Mầm non 25.400 (không mô hình hoá — năng khiếu); Sư phạm Tiếng Anh 25.200; Tâm lý học 22.630. Bài báo GHI RÕ 5 ngành khác (Ngôn ngữ Anh, Thú y, Công nghệ thông tin, Khoa học cây trồng, Chăn nuôi) CHƯA có điểm chuẩn đợt 1 chốt — trường "dự kiến sẽ tiếp tục tổ chức tuyển bổ sung" — nên KHÔNG mô hình hoá các ngành này (thiếu điểm chuẩn xác định).',
  },
  {
    id: 'hvu-threshold-secondary-2026',
    publisher: 'Báo Giáo dục & Thời đại (báo của Bộ Giáo dục và Đào tạo)',
    title: 'Trường Đại học Hùng Vương công bố điểm chuẩn đợt 1 năm 2026',
    url: 'https://giaoducthoidai.vn/truong-dai-hoc-hung-vuong-cong-bo-diem-chuan-dot-1-nam-2026-post787679.html',
    accessedAt: '2026-09-04',
    publishedAt: '2026-08-09',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cross-check ĐỘC LẬP với `hvu-threshold-2026` — cùng ngày đăng, khớp TUYỆT ĐỐI cả 7 mức điểm của các ngành thang 30 mô hình hoá trong module này (26.5 / 26.267 / 26.142 / 25.76 / 25.643 / 25.2 / 22.63). Bài này gộp nhóm các ngành điểm thấp hơn (17-20 điểm) theo khoảng làm tròn — KHÔNG dùng phần đó (không đủ độ chính xác cho ngành ngoài sư phạm/Tâm lý học), chỉ dùng 7 mức chính xác trùng khớp tuyệt đối với nguồn chính.',
  },
  {
    id: 'hvu-priority-national-2026',
    publisher: 'Bộ Giáo dục và Đào tạo',
    title: 'Thông tư 06/2026/TT-BGDĐT — Quy chế tuyển sinh các ngành đào tạo trình độ đại học và ngành Giáo dục Mầm non trình độ cao đẳng, Điều 7 (Chính sách ưu tiên trong tuyển sinh)',
    url: 'https://datafiles.chinhphu.vn/cpp/files/vbpq/2026/3/06-bgddt.pdf',
    accessedAt: '2026-09-04',
    publishedAt: '2026-02-15',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Văn bản pháp quy quốc gia (thay thế Thông tư 08/2022 + 06/2025), tải trực tiếp PDF gốc (32 trang) từ Cổng thông tin Chính phủ. Điều 7: mức điểm ưu tiên KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25; KV3 = 0 (thang 30, không hệ số); UT1 (đối tượng 01-03) = 2,00; UT2 (đối tượng 04-06) = 1,00; thí sinh nhiều diện chỉ hưởng mức cao nhất. Khoản 4: thí sinh đạt tổng điểm từ 22,50 trở lên (thang 30) áp dụng công thức giảm "Điểm ưu tiên = [(30 − Tổng điểm đạt được)/7,50] × Mức điểm ưu tiên quy định". GIỐNG HỆT giá trị/công thức Thông tư 06/2025 đã dùng cho HBU/VTTU/DLA/PVU/HTU/TUMP/NAEM — Điều 7 của Thông tư 2026 không thay đổi so với 2025 (chỉ thay đổi ở các điều khoản khác như điểm cộng tối đa 3 điểm, đối tượng dự thi mở rộng...).',
  },
];
