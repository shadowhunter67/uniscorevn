/**
 * Trường Đại học Y - Dược, Đại học Huế (HUMP) 2025 — điểm chuẩn 11/11 ngành đại học chính quy,
 * nhánh xét điểm thi TN THPT, công bố 22/08/2025. Nguồn chính: tuyensinh247
 * (`sources.ts:hump-threshold-2025`, bảng đầy đủ theo ngành + tổ hợp), cross-check TUYỆT ĐỐI qua
 * Báo Hà Tĩnh (`hump-threshold-secondary-2025`, khớp 10/11 ngành theo TỪNG tổ hợp — chỉ thiếu
 * ngành Y khoa trong bảng cross-check nhưng không mâu thuẫn với bất kỳ ngành nào khác).
 *
 * Mỗi ngành công bố NHIỀU tổ hợp nhưng CHỈ 1 mức điểm chuẩn chung (giống VNU-UET/VNU-HUS/HUNRE,
 * KHÁC HPMU/QBU) — cả 2 nguồn xác nhận cùng 1 mức/ngành áp dụng cho mọi tổ hợp trong ngành đó.
 *
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không
 * được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.
 *
 * Mã ngành dùng mã ngành đào tạo chuẩn quốc gia (Bộ GD&ĐT, series 772xxxx — nhóm sức khỏe), xác
 * nhận qua baohatinh.vn (đăng lại nguyên bảng có cột mã ngành). Tổ hợp áp dụng A00/B00/B08/D07 —
 * đã có sẵn trong taxonomy môn dùng chung, không cần thêm.
 */
export interface HumpFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const HUMP_FIELD_THRESHOLDS_2025 = [
  { code: '7720101', name: 'Y khoa', threshold30: 25.17, combinationIds: ['B00', 'B08', 'D07'] },
  { code: '7720501', name: 'Răng - Hàm - Mặt', threshold30: 24.4, combinationIds: ['B00', 'B08', 'D07'] },
  { code: '7720201', name: 'Dược học', threshold30: 21.25, combinationIds: ['A00', 'B00', 'D07'] },
  { code: '7720115', name: 'Y học cổ truyền', threshold30: 19.6, combinationIds: ['B00', 'B08', 'D07'] },
  { code: '7720602', name: 'Kỹ thuật hình ảnh y học', threshold30: 19, combinationIds: ['A00', 'B00', 'B08', 'D07'] },
  { code: '7720601', name: 'Kỹ thuật xét nghiệm y học', threshold30: 17.25, combinationIds: ['B00', 'B08', 'D07'] },
  { code: '7720110', name: 'Y học dự phòng', threshold30: 17, combinationIds: ['B00', 'B08', 'D07'] },
  { code: '7720301', name: 'Điều dưỡng', threshold30: 17, combinationIds: ['B00', 'B08', 'D07'] },
  { code: '7720302', name: 'Hộ sinh', threshold30: 17, combinationIds: ['B00', 'B08', 'D07'] },
  { code: '7720401', name: 'Dinh dưỡng', threshold30: 17, combinationIds: ['B00', 'B08', 'D07'] },
  { code: '7720701', name: 'Y tế công cộng', threshold30: 17, combinationIds: ['B00', 'B08', 'D07'] },
] as const satisfies readonly HumpFieldThreshold[];

export type HumpFieldCode = (typeof HUMP_FIELD_THRESHOLDS_2025)[number]['code'];

export const HUMP_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HumpFieldThreshold> = new Map(
  HUMP_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
