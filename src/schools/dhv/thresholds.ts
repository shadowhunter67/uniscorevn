/**
 * DHV (Trường Đại học Hùng Vương TP.HCM, mã trường DHV) 2026 — điểm chuẩn trúng tuyển 23/23 mã xét
 * tuyển, nhánh xét kết quả thi TN THPT 2026, đọc trực tiếp từ ảnh "Trường Đại học Hùng Vương TP. Hồ
 * Chí Minh công bố điểm chuẩn trúng tuyển Đại học chính quy 2026" đăng CHÍNH CHỦ trên dhv.edu.vn
 * (`sources.ts:dhv-cutoff-2026`) — đọc bằng vision (chrome-devtools screenshot ảnh gốc 1024x1024,
 * không qua bài viết tóm tắt). Cột "Thi TN THPT" (thang 30, không hệ số) — module này KHÔNG dùng cột
 * "Học tập THPT" (học bạ) và "ĐGNL ĐHQG HCM".
 *
 * DHV KHÔNG công bố tổ hợp môn xét tuyển riêng cho từng ngành trong nguồn đã đọc được (mô hình cũ
 * cũng không giới hạn tổ hợp) — người dùng tự chọn tổ hợp 3 môn bất kỳ, chỉ ngành/mã xét tuyển quyết
 * định điểm chuẩn áp dụng, xem `knowledgeGaps.ts`.
 */
export interface DhvFieldThreshold {
  code: string;
  /** Tên mã xét tuyển đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
}

export const DHV_FIELD_THRESHOLDS_2026: readonly DhvFieldThreshold[] = [
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 15 },
  { code: '722020101', name: 'Giảng dạy Tiếng Anh', threshold30: 15 },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', threshold30: 15 },
  { code: '7220209', name: 'Ngôn ngữ Nhật', threshold30: 15 },
  { code: '7220210', name: 'Ngôn ngữ Hàn Quốc', threshold30: 15 },
  { code: '7310106', name: 'Kinh tế quốc tế', threshold30: 15 },
  { code: '7310401', name: 'Tâm lý học', threshold30: 20 },
  { code: '7340101', name: 'Quản trị Kinh doanh', threshold30: 15 },
  { code: '734010101', name: 'Quản trị logistics', threshold30: 15 },
  { code: '7340115', name: 'Marketing', threshold30: 15 },
  { code: '734011501', name: 'Truyền thông và Quan hệ công chúng', threshold30: 15 },
  { code: '7340122', name: 'Thương mại điện tử', threshold30: 15 },
  { code: '7340201', name: 'Tài chính Ngân hàng', threshold30: 15 },
  { code: '7340205', name: 'Công nghệ tài chính', threshold30: 15 },
  { code: '7340301', name: 'Kế Toán', threshold30: 15 },
  { code: '7380101', name: 'Luật', threshold30: 20 },
  { code: '7380107', name: 'Luật kinh tế', threshold30: 20 },
  { code: '7480106', name: 'Kỹ thuật máy tính', threshold30: 15 },
  { code: '7480107', name: 'Trí tuệ nhân tạo', threshold30: 15 },
  { code: '7480201', name: 'Công nghệ Thông tin', threshold30: 15 },
  { code: '7720802', name: 'Quản lý Bệnh viện', threshold30: 15 },
  { code: '7810103', name: 'Quản trị Dịch vụ Du lịch và Lữ hành', threshold30: 15 },
  { code: '7810201', name: 'Quản trị Khách sạn', threshold30: 15 },
] as const;

export type DhvFieldCode = (typeof DHV_FIELD_THRESHOLDS_2026)[number]['code'];

export const DHV_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, DhvFieldThreshold> = new Map(
  DHV_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
