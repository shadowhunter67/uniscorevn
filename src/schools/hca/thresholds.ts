/**
 * HCA (Học viện Cán bộ Thành phố Hồ Chí Minh, mã trường HVC) 2025 — phương thức 1 (mã phương thức
 * 100, xét kết quả thi TN THPT 2025). 5/5 ngành đại học chính quy của Học viện đều có phương thức
 * này (không có ngành nào bị loại trừ — khác BMTU). Tổ hợp môn theo Thông báo 09-TB/HĐTS-HVCB
 * (19/6/2025, `sources.ts:hca-notice-09-2025`) — LƯU Ý: bộ tổ hợp năm 2025 khác bộ tổ hợp năm 2026
 * (639-QĐ/HVCB bổ sung thêm A07/D07/D09/D15/X01 cho 2026) nên dùng đúng bản 2025, không lấy nhầm
 * bản 2026. Điểm chuẩn (điểm trúng tuyển) 2025 lấy từ bảng "Thông tin về tuyển sinh chính quy của
 * năm 2024 và năm 2025" (mục 11, `sources.ts:hca-de-an-2026`) — do chính Học viện tự công bố lại
 * trong tài liệu năm sau, cross-check khớp với `sources.ts:hca-threshold-2025` (Cổng TTĐT Chính
 * phủ + FPT Shop, 23/8/2025).
 */
export interface HcaMajorThreshold {
  code: string;
  name: string;
  /** Điểm trúng tuyển 2025 (phương thức 100 — thi TN THPT), thang 30. */
  threshold30: number;
  /** Mã tổ hợp môn 2025 áp dụng cho ngành này (map vào `COMMON_SUBJECT_COMBINATIONS`). */
  combinationIds: readonly string[];
}

export const HCA_MAJOR_THRESHOLDS_2025: readonly HcaMajorThreshold[] = [
  { code: '7380101', name: 'Luật', threshold30: 24, combinationIds: ['A00', 'A01', 'C00', 'C03', 'C04', 'D01'] },
  { code: '7310205', name: 'Quản lý nhà nước', threshold30: 23.5, combinationIds: ['A00', 'A01', 'C00', 'C03', 'C04', 'D01'] },
  { code: '7310202', name: 'Xây dựng Đảng và Chính quyền nhà nước', threshold30: 23.25, combinationIds: ['A01', 'C00', 'C03', 'C04', 'C14', 'D01'] },
  { code: '7310201', name: 'Chính trị học', threshold30: 22.5, combinationIds: ['A01', 'C00', 'C03', 'C04', 'C14', 'D01'] },
  { code: '7760101', name: 'Công tác xã hội', threshold30: 22.5, combinationIds: ['A01', 'C00', 'C03', 'C04', 'C14', 'D01', 'D14'] },
] as const;

export type HcaMajorCode = (typeof HCA_MAJOR_THRESHOLDS_2025)[number]['code'];

export const HCA_MAJOR_THRESHOLD_BY_CODE: ReadonlyMap<string, HcaMajorThreshold> = new Map(
  HCA_MAJOR_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
