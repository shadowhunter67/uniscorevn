/**
 * DUE (Trường Đại học Kinh tế - Đại học Đà Nẵng, mã trường DDQ) 2026 — điểm chuẩn trúng tuyển 19/36
 * mã xét tuyển, nhánh xét kết quả thi TN THPT 2026 THUẦN (chương trình "ST - Tiêu chuẩn"), đọc trực
 * tiếp từ trang chính chủ hệ thống Đại học Đà Nẵng (ts.udn.vn, `sources.ts:dueudn-cutoff-2026`) —
 * bảng HTML text thật (không cần vision).
 *
 * DUE công bố 36 mã xét tuyển theo 2 nhóm phương thức: "ST - Tiêu chuẩn" (Xét điểm thi THPT thuần,
 * thang 30 không hệ số) và "PR/GB/EL" (Xét kết hợp Học bạ + chứng chỉ Tiếng Anh quốc tế — công thức
 * trọng số khác, KHÔNG mô hình hoá). Module này CHỈ dùng 19 mã "ST".
 *
 * DUE KHÔNG công bố tổ hợp môn xét tuyển riêng theo từng mã trong bảng này — module chấp nhận bất kỳ
 * tổ hợp 3 môn nào người dùng chọn, cùng cách xử lý DHV/HPU2/DUT, xem `knowledgeGaps.ts`.
 */
export interface DueudnFieldThreshold {
  code: string;
  /** Tên mã xét tuyển đúng nguyên văn bảng điểm chuẩn (chương trình ST - Tiêu chuẩn). */
  name: string;
  threshold30: number;
}

export const DUEUDN_FIELD_THRESHOLDS_2026: readonly DueudnFieldThreshold[] = [
  { code: '7310101ST', name: 'Kinh tế - Chương trình Kinh tế (ST - Tiêu chuẩn)', threshold30: 20.0 },
  { code: '7310107ST', name: 'Thống kê kinh tế - Chương trình Thống kê kinh tế (ST - Tiêu chuẩn)', threshold30: 19.25 },
  { code: '7310205ST', name: 'Quản lý nhà nước - Chương trình Quản lý nhà nước (ST - Tiêu chuẩn)', threshold30: 19.0 },
  { code: '7340101ST', name: 'Quản trị kinh doanh - Chương trình Quản trị kinh doanh (ST - Tiêu chuẩn)', threshold30: 22.0 },
  { code: '7340115ST', name: 'Marketing - Chương trình Marketing (ST - Tiêu chuẩn)', threshold30: 22.25 },
  { code: '7340120ST', name: 'Kinh doanh quốc tế - Chương trình Kinh doanh quốc tế (ST - Tiêu chuẩn)', threshold30: 25.0 },
  { code: '7340121ST', name: 'Kinh doanh thương mại - Chương trình Kinh doanh thương mại (ST - Tiêu chuẩn)', threshold30: 22.0 },
  { code: '7340122ST', name: 'Thương mại điện tử - Chương trình Thương mại điện tử (ST - Tiêu chuẩn)', threshold30: 23.0 },
  { code: '7340201ST', name: 'Tài chính - Ngân hàng - Chương trình Tài chính - Ngân hàng (ST - Tiêu chuẩn)', threshold30: 20.5 },
  { code: '7340205ST', name: 'Công nghệ tài chính - Chương trình Công nghệ tài chính (ST - Tiêu chuẩn)', threshold30: 21.5 },
  { code: '7340301ST', name: 'Kế toán - Chương trình Kế toán (ST - Tiêu chuẩn)', threshold30: 20.75 },
  { code: '7340302ST', name: 'Kiểm toán - Chương trình Kiểm toán (ST - Tiêu chuẩn)', threshold30: 21.5 },
  { code: '7340404ST', name: 'Quản trị nhân lực - Chương trình Quản trị nguồn nhân lực (ST - Tiêu chuẩn)', threshold30: 21.0 },
  { code: '7340405ST', name: 'Hệ thống thông tin quản lý - Chương trình Hệ thống thông tin quản lý (ST - Tiêu chuẩn)', threshold30: 19.5 },
  { code: '7380101ST', name: 'Luật - Chương trình Luật (ST - Tiêu chuẩn)', threshold30: 20.0 },
  { code: '7380107ST', name: 'Luật kinh tế - Chương trình Luật Kinh tế (ST - Tiêu chuẩn)', threshold30: 20.0 },
  { code: '7460108ST', name: 'Khoa học dữ liệu - Chương trình Khoa học dữ liệu (ST - Tiêu chuẩn)', threshold30: 21.0 },
  { code: '7810103ST', name: 'Quản trị dịch vụ du lịch và lữ hành - Chương trình Quản trị dịch vụ du lịch và lữ hành (ST - Tiêu chuẩn)', threshold30: 20.5 },
  { code: '7810201ST', name: 'Quản trị khách sạn - Chương trình Quản trị khách sạn (ST - Tiêu chuẩn)', threshold30: 19.75 },
] as const;

export type DueudnFieldCode = (typeof DUEUDN_FIELD_THRESHOLDS_2026)[number]['code'];

export const DUEUDN_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, DueudnFieldThreshold> = new Map(
  DUEUDN_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
