/**
 * Trường Đại học Trà Vinh (TVU) 2025 — điểm chuẩn 5/47+ ngành đại học chính quy (KHỐI NGÀNH SỨC
 * KHỎE), nhánh xét điểm thi TN THPT, công bố 22/08/2025. Nguồn chính: FPTShop
 * (`sources.ts:tvu-threshold-2025`, bảng đầy đủ 47 ngành + mã ngành), cross-check khối Y Dược qua
 * Sforum/CellphoneS (`tvu-threshold-secondary-2025`, khớp cả 5 ngành + tổ hợp). Tổ hợp theo đề án
 * tuyển sinh (`tvu-admission-scheme-2026`, tuyensinh247 — trường xác nhận dùng chung phương án tổ
 * hợp với năm trước).
 *
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không
 * được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.
 *
 * CHỈ mô hình hoá 5 ngành khối sức khỏe (Y khoa, Răng-Hàm-Mặt, Dược học, Điều dưỡng, Kỹ thuật xét
 * nghiệm y học) — tổ hợp dùng đều là A00/B00/B08 (đã có sẵn trong `SubjectId`/
 * `COMMON_SUBJECT_COMBINATIONS`, không cần thêm tổ hợp mới). 42 ngành còn lại của trường dùng
 * nhiều tổ hợp lạ (D04/D06/D14/D15/D84/X01/X03/X06/X23/X25/X26/X27/X58/X70/X78/X79/X91...) chưa
 * xác minh đủ tin cậy — CHƯA mô hình hoá (xem `knowledgeGaps.ts`).
 */
export interface TvuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  /** Điểm chuẩn 2025 (thang 30, ĐÃ gồm điểm ưu tiên) — nhánh thi TN THPT. */
  threshold30: number;
  /** Tổ hợp môn xét tuyển áp dụng cho ngành này (mã tổ hợp quốc gia). */
  combinationIds: readonly string[];
}

export const TVU_FIELD_THRESHOLDS_2025 = [
  { code: '7720601', name: 'Kỹ thuật xét nghiệm y học', threshold30: 21.5, combinationIds: ['A00', 'B00'] },
  { code: '7720101', name: 'Y khoa', threshold30: 21.25, combinationIds: ['B00', 'B08'] },
  { code: '7720501', name: 'Răng - Hàm - Mặt', threshold30: 20.75, combinationIds: ['B00', 'B08'] },
  { code: '7720201', name: 'Dược học', threshold30: 19, combinationIds: ['A00', 'B00'] },
  { code: '7720301', name: 'Điều dưỡng', threshold30: 17.25, combinationIds: ['B00', 'B08'] },
] as const satisfies readonly TvuFieldThreshold[];

export type TvuFieldCode = (typeof TVU_FIELD_THRESHOLDS_2025)[number]['code'];

export const TVU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, TvuFieldThreshold> = new Map(
  TVU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
