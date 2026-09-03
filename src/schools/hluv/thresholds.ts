/**
 * HLUV (Trường Đại học Hoa Lư) 2025 — điểm trúng tuyển 8/9 ngành đại học chính quy (loại trừ Giáo
 * dục Mầm non — tổ hợp năng khiếu M00/M05/M07/M11 không có SubjectId tương ứng), nhánh xét kết quả
 * thi TN THPT (mã phương thức 100), công bố 22/08/2025. Nguồn chính là ảnh chụp nguyên văn thông
 * báo gốc (`sources.ts:hluv-threshold-2025`, đọc bằng vision), cross-check TUYỆT ĐỐI qua Báo Hà
 * Tĩnh (`hluv-combination-secondary-2025`). Tổ hợp môn theo ngành lấy từ Hướng nghiệp HOCMAI
 * (`sources.ts:hluv-combination-2025`) + Báo Hà Tĩnh cho ngành Sư phạm Lịch sử - Địa lý.
 *
 * 4 ngành (Kế toán, Quản trị kinh doanh, Du lịch, Công nghệ thông tin) công bố phương thức "Xét
 * theo kết quả thi TN THPT HOẶC kết quả học THPT" với CÙNG 1 mức điểm — module này chỉ áp dụng
 * nhánh thi TN THPT.
 */
export interface HluvFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const HLUV_FIELD_THRESHOLDS_2025: readonly HluvFieldThreshold[] = [
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 23, combinationIds: ['C01', 'C03', 'C04', 'D01'] },
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 24.02, combinationIds: ['A00', 'A01', 'A02', 'X06'] },
  { code: '7140247', name: 'Sư phạm Khoa học tự nhiên', threshold30: 20.1, combinationIds: ['A00', 'A01', 'A02', 'X06'] },
  { code: '7140249', name: 'Sư phạm Lịch sử - Địa lý', threshold30: 27.07, combinationIds: ['C00', 'C03', 'D14', 'X70'] },
  { code: '7340301', name: 'Kế toán', threshold30: 16, combinationIds: ['C01', 'C03', 'C04', 'D01'] },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 16, combinationIds: ['C01', 'C03', 'C04', 'D01'] },
  { code: '7810101', name: 'Du lịch', threshold30: 18, combinationIds: ['C01', 'C03', 'C04', 'D01', 'X01'] },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 16, combinationIds: ['A00', 'A01', 'D01', 'X02'] },
] as const;

export type HluvFieldCode = (typeof HLUV_FIELD_THRESHOLDS_2025)[number]['code'];

export const HLUV_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HluvFieldThreshold> = new Map(
  HLUV_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
