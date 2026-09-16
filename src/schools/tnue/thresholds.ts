/**
 * TNUE (Trường Đại học Sư phạm - Đại học Thái Nguyên) 2026 — điểm chuẩn trúng tuyển 19/22 ngành,
 * nhánh xét kết quả thi TN THPT 2026, đọc trực tiếp từ trang chính chủ tuyensinh.tnue.edu.vn (HTML
 * text thật, không cần vision) — "Thông báo điểm trúng tuyển đại học chính quy năm 2026" (09/8/2026,
 * `sources.ts:tnue-cutoff-2026`).
 *
 * Trang gốc ghi CHÍNH XÁC 1 "tổ hợp gốc" cho mỗi ngành (không phải danh sách nhiều tổ hợp như đa số
 * trường khác) — module này CHỈ chấp nhận đúng tổ hợp đó cho mỗi ngành, không suy rộng ra tổ hợp
 * khác. Loại 3 ngành dùng tổ hợp năng khiếu không có SubjectId tương ứng: Giáo dục Thể chất (T01),
 * Sư phạm Âm nhạc (N01), Huấn luyện thể thao (T11) — xem `knowledgeGaps.ts`.
 */
export interface TnueFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
  /** Tổ hợp gốc DUY NHẤT công bố cho ngành này. */
  combinationId: string;
}

export const TNUE_FIELD_THRESHOLDS_2026: readonly TnueFieldThreshold[] = [
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 27.13, combinationId: 'A00' },
  { code: '7140218', name: 'Sư phạm Lịch sử', threshold30: 26.79, combinationId: 'C00' },
  { code: '7140211', name: 'Sư phạm Vật lý', threshold30: 26.73, combinationId: 'A00' },
  { code: '7140217', name: 'Sư phạm Ngữ văn', threshold30: 26.63, combinationId: 'C00' },
  { code: '7140219', name: 'Sư phạm Địa lý', threshold30: 26.63, combinationId: 'C00' },
  { code: '7140249', name: 'Sư phạm Lịch sử - Địa lý', threshold30: 26.33, combinationId: 'C00' },
  { code: '7140212', name: 'Sư phạm Hoá học', threshold30: 26.13, combinationId: 'A00' },
  { code: '7140231', name: 'Sư phạm Tiếng Anh', threshold30: 25.8, combinationId: 'D01' },
  { code: '7140247', name: 'Sư phạm Khoa học tự nhiên', threshold30: 25.13, combinationId: 'B00' },
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 24.95, combinationId: 'D01' },
  { code: '7140213', name: 'Sư phạm Sinh học', threshold30: 24.85, combinationId: 'B00' },
  { code: '7140210', name: 'Sư phạm Tin học', threshold30: 24.69, combinationId: 'A00' },
  { code: '7140205', name: 'Giáo dục Chính trị', threshold30: 24.63, combinationId: 'X74' },
  { code: '7140201', name: 'Giáo dục Mầm non', threshold30: 24.33, combinationId: 'D01' },
  { code: '7140204', name: 'Giáo dục Công dân', threshold30: 24.22, combinationId: 'X74' },
  { code: '7140101', name: 'Giáo dục học', threshold30: 24.58, combinationId: 'C00' },
  { code: '7310403', name: 'Tâm lý học giáo dục', threshold30: 24.23, combinationId: 'C00' },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 22.88, combinationId: 'D01' },
  { code: '7420203', name: 'Sinh học ứng dụng', threshold30: 17.35, combinationId: 'B00' },
] as const;

export type TnueFieldCode = (typeof TNUE_FIELD_THRESHOLDS_2026)[number]['code'];

export const TNUE_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, TnueFieldThreshold> = new Map(
  TNUE_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
