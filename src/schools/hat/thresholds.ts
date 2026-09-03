/**
 * HAT (Trường Du lịch - Đại học Huế) 2025 — điểm chuẩn 7/7 ngành đại học chính quy, nhánh xét kết
 * quả thi TN THPT, công bố 22/08/2025. Nguồn chính tuyensinh247 (`sources.ts:hat-threshold-2025`),
 * cross-check TUYỆT ĐỐI qua Báo Hà Tĩnh (`hat-threshold-secondary-2025`, khớp từng tổ hợp) và
 * Sforum/CellphoneS (`hat-threshold-tertiary-2025`) — 3 nguồn độc lập khớp tuyệt đối 7/7 ngành.
 *
 * Mỗi ngành công bố NHIỀU tổ hợp nhưng CHỈ 1 mức điểm chuẩn chung (giống HUMP/VNU-UET/HUNRE).
 * tuyensinh247 trích nguyên văn: "Điểm chuẩn dưới đây là tổng điểm các môn xét tuyển + điểm ưu
 * tiên nếu có" — xác nhận TRỰC TIẾP điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không
 * được trường công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng
 * (`priority.ts`).
 */
export interface HatFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

const TOURISM_GROUP = ['A00', 'C00', 'C14', 'C19', 'D01', 'D10', 'X01', 'X70'] as const;
const E_TOURISM_GROUP = ['A00', 'A01', 'C14', 'D01', 'D10', 'X01', 'X02'] as const;

export const HAT_FIELD_THRESHOLDS_2025: readonly HatFieldThreshold[] = [
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 19.5, combinationIds: TOURISM_GROUP },
  { code: '7810101', name: 'Du lịch', threshold30: 19.5, combinationIds: TOURISM_GROUP },
  { code: '7810102', name: 'Du lịch điện tử', threshold30: 15, combinationIds: E_TOURISM_GROUP },
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 19.75, combinationIds: TOURISM_GROUP },
  { code: '7810104', name: 'Quản trị du lịch và khách sạn', threshold30: 21.5, combinationIds: TOURISM_GROUP },
  { code: '7810201', name: 'Quản trị khách sạn', threshold30: 18.5, combinationIds: TOURISM_GROUP },
  { code: '7810202', name: 'Quản trị nhà hàng và dịch vụ ăn uống', threshold30: 16.75, combinationIds: TOURISM_GROUP },
] as const;

export type HatFieldCode = (typeof HAT_FIELD_THRESHOLDS_2025)[number]['code'];

export const HAT_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HatFieldThreshold> = new Map(
  HAT_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
