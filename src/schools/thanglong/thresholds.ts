/**
 * Trường Đại học Thăng Long (TLU-HN) 2025 — điểm trúng tuyển đại học chính quy đợt 1, phương thức 1
 * (xét kết quả thi TN THPT 2025), công bố tại Thông báo số 25082205/TB-ĐHTL ngày 22/8/2025 (Hội
 * đồng tuyển sinh, PDF gốc — `sources.ts:thanglong-threshold-2025`). Bảng gốc chỉ công bố MỘT mức
 * điểm/ngành theo "tổ hợp gốc" (`combos.ts`); các tổ hợp khác trong cùng nhóm quy đổi theo mức
 * chênh lệch tại Thông báo số 25072301/TB-ĐHTL ngày 23/7/2025 (`sources.ts:thanglong-combo-delta-2025`).
 *
 * Loại trừ 2 ngành Thanh nhạc (7210205) và Thiết kế đồ hoạ (7210403) — Nhóm 4, xét bằng phương thức
 * học bạ kết hợp thi năng khiếu, KHÔNG có mức chênh lệch quy đổi công bố và dùng tổ hợp năng khiếu
 * không có SubjectId tương ứng — xem `knowledgeGaps.ts`.
 */
export type ThanglongGroup = 1 | 2 | 3;

export interface ThanglongFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  /** Nhóm tổ hợp quy đổi — tra chênh lệch điểm theo tổ hợp cụ thể tại `combos.ts`. */
  group: ThanglongGroup;
}

export const THANGLONG_FIELD_THRESHOLDS_2025: readonly ThanglongFieldThreshold[] = [
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 19.7, group: 2 },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', threshold30: 21.2, group: 2 },
  { code: '7220209', name: 'Ngôn ngữ Nhật', threshold30: 16, group: 2 },
  { code: '7220210', name: 'Ngôn ngữ Hàn Quốc', threshold30: 19.3, group: 2 },
  { code: '7310106', name: 'Kinh tế quốc tế', threshold30: 20.6, group: 1 },
  { code: '7310630', name: 'Việt Nam học', threshold30: 21.88, group: 2 },
  { code: '7320104', name: 'Truyền thông đa phương tiện', threshold30: 23.75, group: 2 },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 20.2, group: 1 },
  { code: '7340115', name: 'Marketing', threshold30: 22.2, group: 1 },
  { code: '7340122', name: 'Thương mại điện tử', threshold30: 22.5, group: 1 },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 19.5, group: 1 },
  { code: '7340301', name: 'Kế toán', threshold30: 19.78, group: 1 },
  { code: '7380107', name: 'Luật kinh tế', threshold30: 22.3, group: 2 },
  { code: '7480101', name: 'Khoa học máy tính', threshold30: 16, group: 1 },
  { code: '7480102', name: 'Mạng máy tính và truyền thông dữ liệu', threshold30: 16, group: 1 },
  { code: '7480104', name: 'Hệ thống thông tin', threshold30: 16, group: 1 },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 17, group: 1 },
  { code: '7480207', name: 'Trí tuệ nhân tạo', threshold30: 17, group: 1 },
  { code: '7510605', name: 'Logistics và Quản lý chuỗi cung ứng', threshold30: 21.4, group: 1 },
  { code: '7720301', name: 'Điều dưỡng', threshold30: 19.55, group: 3 },
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 20.15, group: 1 },
  { code: '7810201', name: 'Quản trị khách sạn', threshold30: 20.15, group: 1 },
] as const;

export type ThanglongFieldCode = (typeof THANGLONG_FIELD_THRESHOLDS_2025)[number]['code'];

export const THANGLONG_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, ThanglongFieldThreshold> = new Map(
  THANGLONG_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
