/**
 * DSU (Trường Đại học Thể dục thể thao Đà Nẵng, mã trường TTD) 2025 — điểm trúng tuyển đại học
 * chính quy, Phương thức mã 100 ("Xét kết quả điểm thi tốt nghiệp THPT", chỉ áp dụng cho ngành Quản
 * lý TDTT — 7810301). Nguồn: Quyết định số 1088/QĐ-TDTTĐN-HĐTS ngày 22/8/2025 (`sources.ts:dsu-qd1088-diemchuan-2025`,
 * bảng "Mức điểm chuẩn trúng tuyển", cột "Xét điểm thi THPT (mã 100)") + Thông báo số 247/TB-TDTTĐN
 * ngày 07/3/2025 (`sources.ts:dsu-tb247-tuyensinh-2025`, mục 5 "Tổ hợp xét tuyển" — tổ hợp B03/C14
 * cho phương thức 100 của ngành Quản lý TDTT).
 *
 * Trường có 3 ngành (Quản lý TDTT — 7810301; Huấn luyện thể thao — 7810302; Giáo dục thể chất —
 * 7140206) nhưng CHỈ ngành Quản lý TDTT có phương thức 100 (thuần điểm thi THPT, không cần điểm thi
 * năng khiếu TDTT) — 2 ngành còn lại BẮT BUỘC điểm thi năng khiếu (phương thức 405/406, chưa mô hình
 * hoá — xem `knowledgeGaps.ts`). Phạm vi module này CHỈ tính phương thức 100 của Quản lý TDTT.
 */
export interface DsuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn Quyết định 1088/QĐ-TDTTĐN-HĐTS. */
  name: string;
  /** Điểm trúng tuyển chính thức năm 2025, phương thức 100 (thang 30, đã bao gồm điểm ưu tiên). */
  threshold30: number;
  /** Tổ hợp xét tuyển công bố cho phương thức 100 của ngành này (Thông báo 247/TB-TDTTĐN, mục 5). */
  combinationIds: readonly string[];
}

export const DSU_FIELD_THRESHOLDS_2025: readonly DsuFieldThreshold[] = [
  { code: '7810301', name: 'Quản lý TDTT', threshold30: 21.5, combinationIds: ['B03', 'C14'] },
] as const;

export type DsuFieldCode = (typeof DSU_FIELD_THRESHOLDS_2025)[number]['code'];

export const DSU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, DsuFieldThreshold> = new Map(
  DSU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
