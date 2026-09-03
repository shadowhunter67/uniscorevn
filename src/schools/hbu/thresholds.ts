/**
 * HBU (Trường Đại học Hòa Bình, mã trường ETU) 2025 — điểm chuẩn trúng tuyển (nhánh xét kết quả thi
 * TN THPT, thang 30, không hệ số, ĐÃ bao gồm điểm ưu tiên theo xác nhận trực tiếp của nguồn) cho
 * 18/21 ngành đại học chính quy (`sources.ts:hbu-threshold-2025` + cross-check `hbu-threshold-
 * secondary-2025`). Tổ hợp môn theo ngành lấy từ ảnh CHÍNH CHỦ "THÔNG TIN TUYỂN SINH CÁC NGÀNH"
 * (`sources.ts:hbu-combination-2025`).
 *
 * Loại trừ 3/21 ngành: Thiết kế đồ họa/nội thất/thời trang (tổ hợp năng khiếu V00-V03, môn "Vẽ"
 * không có SubjectId — legend gốc còn thiếu định nghĩa V02/V03). Ngành Ngôn ngữ Trung Quốc chỉ giữ
 * 3/4 tổ hợp công bố (C00/C19/D14) — loại D65 (Văn/Sử/Tiếng Trung, không có SubjectId Tiếng Trung).
 */
export interface HbuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

const HEALTH_COMBINATIONS = ['A00', 'A11', 'B00', 'D07'] as const;
const IT_AUTO_COMBINATIONS = ['A00', 'A01', 'A02', 'A10'] as const;
const BIZ_COMBINATIONS = ['A00', 'A01', 'A10', 'C01'] as const;
const LAW_COMBINATIONS = ['C00', 'C03', 'C19', 'D14'] as const;
const TOURISM_COMBINATIONS = ['C00', 'C04', 'C20', 'D15'] as const;
const ENGLISH_COMBINATIONS = ['D01', 'D14', 'D15', 'D66'] as const;
// Ngôn ngữ Trung Quốc: bảng gốc còn D65 (Văn/Sử/Tiếng Trung) — loại vì thiếu SubjectId Tiếng Trung.
const CHINESE_COMBINATIONS = ['C00', 'C19', 'D14'] as const;
const MEDIA_COMBINATIONS = ['C01', 'C04', 'C14', 'D01'] as const;

export const HBU_FIELD_THRESHOLDS_2025: readonly HbuFieldThreshold[] = [
  { code: '7720101', name: 'Y khoa', threshold30: 20.5, combinationIds: HEALTH_COMBINATIONS },
  { code: '7720115', name: 'Y học Cổ truyền', threshold30: 19.0, combinationIds: HEALTH_COMBINATIONS },
  { code: '7720201', name: 'Dược học', threshold30: 19.0, combinationIds: HEALTH_COMBINATIONS },
  { code: '7720301', name: 'Điều dưỡng', threshold30: 17.0, combinationIds: HEALTH_COMBINATIONS },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15.0, combinationIds: IT_AUTO_COMBINATIONS },
  { code: '7520130', name: 'Kỹ thuật ô tô', threshold30: 15.0, combinationIds: IT_AUTO_COMBINATIONS },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15.0, combinationIds: BIZ_COMBINATIONS },
  { code: '7340122', name: 'Thương mại điện tử', threshold30: 15.0, combinationIds: BIZ_COMBINATIONS },
  { code: '7510605', name: 'Logistics & Quản lý chuỗi cung ứng', threshold30: 15.0, combinationIds: BIZ_COMBINATIONS },
  { code: '7340301', name: 'Kế toán', threshold30: 15.0, combinationIds: BIZ_COMBINATIONS },
  { code: '7340201', name: 'Tài chính Ngân hàng', threshold30: 15.0, combinationIds: BIZ_COMBINATIONS },
  { code: '7380107', name: 'Luật kinh tế', threshold30: 15.0, combinationIds: LAW_COMBINATIONS },
  { code: '7810103', name: 'Quản trị dịch vụ Du lịch và Lữ hành', threshold30: 15.0, combinationIds: TOURISM_COMBINATIONS },
  { code: '7810201', name: 'Quản trị khách sạn', threshold30: 15.0, combinationIds: TOURISM_COMBINATIONS },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 15.0, combinationIds: ENGLISH_COMBINATIONS },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', threshold30: 15.0, combinationIds: CHINESE_COMBINATIONS },
  { code: '7320108', name: 'Quan hệ công chúng', threshold30: 15.0, combinationIds: TOURISM_COMBINATIONS },
  { code: '7320104', name: 'Truyền thông đa phương tiện', threshold30: 15.0, combinationIds: MEDIA_COMBINATIONS },
] as const;

export type HbuFieldCode = (typeof HBU_FIELD_THRESHOLDS_2025)[number]['code'];

export const HBU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HbuFieldThreshold> = new Map(
  HBU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
