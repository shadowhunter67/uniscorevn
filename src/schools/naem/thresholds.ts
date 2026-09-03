/**
 * NAEM (Học viện Quản lý giáo dục) 2025 — điểm trúng tuyển đại học chính quy, phương thức xét kết
 * quả thi TN THPT (mã phương thức 100). Nguồn `sources.ts:naem-threshold-2025` (Thông báo điểm
 * trúng tuyển 22/8/2025) công bố MỘT mức điểm áp dụng chung cho cả ngành — không tách theo tổ hợp.
 * Tổ hợp xét tuyển của phương thức 100 theo từng ngành lấy từ `sources.ts:naem-thongtin-2025`
 * (bảng "Ngành đào tạo — Mã ngành — Chỉ tiêu — Tổ hợp xét tuyển", dùng chung cho mọi phương thức).
 * Cả 7/7 ngành đại học chính quy của Học viện đều có phương thức 100.
 */
export interface NaemFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  /** Điểm trúng tuyển 2025 (thang 30), nguồn `sources.ts:naem-threshold-2025`. */
  threshold30: number;
  /** Tổ hợp xét tuyển công bố cho ngành này (dùng chung cho mọi phương thức), `sources.ts:naem-thongtin-2025`. */
  combinationIds: readonly string[];
}

export const NAEM_FIELD_THRESHOLDS_2025: readonly NaemFieldThreshold[] = [
  { code: '7140114', name: 'Quản lý giáo dục', threshold30: 24.68, combinationIds: ['A00', 'A01', 'C00', 'D01', 'X70', 'X74'] },
  { code: '7310403', name: 'Tâm lý học giáo dục', threshold30: 24.87, combinationIds: ['A00', 'B00', 'C00', 'D01', 'X70', 'X74'] },
  { code: '7340406', name: 'Quản trị văn phòng', threshold30: 24.38, combinationIds: ['A00', 'A01', 'C00', 'D01', 'X70', 'X74'] },
  { code: '7140101', name: 'Giáo dục học (Giáo dục trẻ rối loạn phát triển)', threshold30: 24.83, combinationIds: ['A00', 'B00', 'C00', 'D01', 'X70', 'X74'] },
  { code: '7310101', name: 'Kinh tế', threshold30: 21.4625, combinationIds: ['A00', 'A01', 'D01', 'D10', 'X25', 'X26'] },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 25.5, combinationIds: ['A01', 'D01', 'D10', 'D14', 'X78', 'X25'] },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15, combinationIds: ['A00', 'A01', 'D01', 'D10', 'X26', 'X06'] },
] as const;

export type NaemFieldCode = (typeof NAEM_FIELD_THRESHOLDS_2025)[number]['code'];

export const NAEM_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, NaemFieldThreshold> = new Map(
  NAEM_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
