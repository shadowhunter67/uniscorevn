/**
 * Trường Đại học Kinh tế - ĐHQGHN (VNU-UEB) 2025 — điểm chuẩn 6/6 ngành đại học chính quy, nhánh
 * xét điểm thi TN THPT, công bố 22/08/2025. Cross-check 2 nguồn thứ cấp độc lập (tuyensinh247
 * `sources.ts:vnueb-threshold-2025`, cellphones/Sforum `sources.ts:vnueb-threshold-secondary-2025`)
 * — cả 2 khớp số liệu 5/6 ngành xuất hiện ở cả 2 bài (nguồn gốc chính thức trên
 * tuyensinhdaihoc.ueb.edu.vn trả 403 khi truy cập trực tiếp, dùng cross-check báo chí thay thế,
 * cùng tiền lệ HPMU/HMU/HNMU).
 *
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên (không cần judgment call cho
 * việc CÓ áp dụng). Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung quốc gia hiện
 * hành làm judgment call cho giá trị bảng (`priority.ts`).
 *
 * Cả 6/6 ngành đại học chính quy dùng chung 8 tổ hợp: D01, A01, D09, D10, C01, C03, C04, X01
 * (nguồn `sources.ts:vnueb-threshold-2025`).
 *
 * Tiêu chí phụ khi bằng điểm: một số ngành ưu tiên thí sinh có điểm Toán cao hơn (vd Kế toán ≥
 * 7,25) — CHƯA mô hình hoá (chỉ là tiêu chí phụ khi hoà điểm, không phải ngưỡng điều kiện bắt
 * buộc, xem `knowledgeGaps.ts`).
 */
export interface VnuebFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  /** Điểm chuẩn 2025 (thang 30, ĐÃ gồm điểm ưu tiên) — nhánh thi TN THPT. */
  threshold30: number;
}

/** Cả 6 ngành đều dùng chung tập tổ hợp này (nguồn `vnueb-threshold-2025`). */
export const VNUEB_COMBINATION_IDS: readonly string[] = ['D01', 'A01', 'D09', 'D10', 'C01', 'C03', 'C04', 'X01'];

export const VNUEB_FIELD_THRESHOLDS_2025 = [
  { code: '7310106', name: 'Kinh tế quốc tế', threshold30: 25.72 },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 24.93 },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 24.25 },
  { code: '7310101', name: 'Kinh tế', threshold30: 24.3 },
  { code: '7340301', name: 'Kế toán', threshold30: 24.2 },
  { code: '7310105', name: 'Kinh tế phát triển', threshold30: 24.2 },
] as const satisfies readonly VnuebFieldThreshold[];

export type VnuebFieldCode = (typeof VNUEB_FIELD_THRESHOLDS_2025)[number]['code'];

export const VNUEB_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnuebFieldThreshold> = new Map(
  VNUEB_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
