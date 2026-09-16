/**
 * HPU2 (Trường Đại học Sư phạm Hà Nội 2) 2026 — điểm chuẩn trúng tuyển 25/25 ngành, nhánh xét kết
 * quả thi TN THPT 2026, đọc từ Cổng Thông tin điện tử Chính phủ (xaydungchinhsach.chinhphu.vn, đăng
 * lại thông báo điểm chuẩn chính thức của trường, 10/8/2026) — đối chiếu khớp giá trị mẫu (Sư phạm
 * Toán học 27,51) với VnExpress độc lập (`sources.ts:hpu2-cutoff-2026`).
 *
 * HPU2 KHÔNG công bố tổ hợp môn xét tuyển riêng theo từng ngành trong nguồn đã đọc được (mô hình cũ
 * cũng không giới hạn tổ hợp cho nhóm 3-môn chuẩn) — người dùng tự chọn tổ hợp 3 môn bất kỳ. Không mô
 * hình hoá Giáo dục Thể chất/Giáo dục Mầm non/Quản lý thể thao (tổ hợp 2 môn + năng khiếu, không phải
 * 3-môn chuẩn), xem `knowledgeGaps.ts`.
 */
export interface Hpu2FieldThreshold {
  code: string;
  /** Tên chương trình đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
}

export const HPU2_FIELD_THRESHOLDS_2026: readonly Hpu2FieldThreshold[] = [
  // I. Các chương trình đào tạo cử nhân sư phạm
  { code: '7140201', name: 'Giáo dục Mầm non', threshold30: 24.98 },
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 26.73 },
  { code: '7140204', name: 'Giáo dục Công dân', threshold30: 24.6 },
  { code: '7140206', name: 'Giáo dục Thể chất', threshold30: 24.79 },
  { code: '7140208', name: 'Giáo dục Quốc phòng - An ninh', threshold30: 25.33 },
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 27.51 },
  { code: '7140210', name: 'Sư phạm Tin học', threshold30: 24.75 },
  { code: '7140211', name: 'Sư phạm Vật lý', threshold30: 26.38 },
  { code: '7140212', name: 'Sư phạm Hóa học', threshold30: 26.62 },
  { code: '7140213', name: 'Sư phạm Sinh học', threshold30: 25.25 },
  { code: '7140217', name: 'Sư phạm Ngữ văn', threshold30: 27.2 },
  { code: '7140218', name: 'Sư phạm Lịch sử', threshold30: 27.15 },
  { code: '7140231', name: 'Sư phạm Tiếng Anh', threshold30: 27.43 },
  { code: '7140247', name: 'Sư phạm Khoa học tự nhiên', threshold30: 25.57 },
  { code: '7140249', name: 'Sư phạm Lịch sử - Địa lý', threshold30: 26.88 },
  // II. Các chương trình đào tạo cử nhân ngoài sư phạm
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 25.28 },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', threshold30: 23.48 },
  { code: '7310403', name: 'Tâm lý học giáo dục', threshold30: 16.35 },
  { code: '7310630', name: 'Việt Nam học', threshold30: 22.0 },
  { code: '7420201', name: 'Công nghệ sinh học', threshold30: 16.0 },
  { code: '7440122', name: 'Khoa học vật liệu', threshold30: 23.23 },
  { code: '7460112', name: 'Toán ứng dụng', threshold30: 17.5 },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 21.56 },
  { code: '7520301', name: 'Kĩ thuật hóa học', threshold30: 15.6 },
  { code: '7810301', name: 'Quản lý thể dục thể thao', threshold30: 23.18 },
] as const;

export type Hpu2FieldCode = (typeof HPU2_FIELD_THRESHOLDS_2026)[number]['code'];

export const HPU2_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, Hpu2FieldThreshold> = new Map(
  HPU2_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
