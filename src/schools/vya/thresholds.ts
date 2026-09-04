/**
 * VYA (Học viện Thanh thiếu niên Việt Nam, mã trường HTN) 2026 — điểm trúng tuyển CHÍNH THỨC tại
 * Hà Nội (mục 1, Thông báo 162/TB-HVTTNVN 19/8/2026, `sources.ts:vya-cutoff-2026`) cho 9/9 ngành
 * đại học chính quy, cả 2 phương thức: mã 100 (xét kết quả thi TN THPT 2026) và mã 200 (xét học
 * bạ lớp 10/11/12) — Luật/Quan hệ Công chúng KHÔNG xét phương thức 200 (nguồn ghi "Không xét"),
 * chỉ có `threshold100`. Tổ hợp môn theo Quyết định 218/QĐ-HVTTNVN mục 4.2 (`sources.ts:vya-
 * thong-tin-tuyen-sinh-2026`). KHÔNG mô hình hoá Phân hiệu TP.HCM (chỉ tiêu/ngưỡng riêng, xem
 * knowledgeGaps.ts).
 */
export interface VyaFieldThreshold {
  code: string;
  name: string;
  threshold100: number;
  /** undefined = phương thức 200 (học bạ) không được trường xét cho ngành này ("Không xét"). */
  threshold200?: number;
  combinationIds: readonly string[];
}

const SOCIAL_COMBINATIONS = ['C00', 'X74', 'D01', 'X21', 'D10'] as const;
const LAW_COMBINATIONS = ['D01', 'C00', 'X74', 'A00', 'D10'] as const;
const TECH_ECON_COMBINATIONS = ['D01', 'A00', 'X21', 'D10', 'A04'] as const;

export const VYA_FIELD_THRESHOLDS_2026: readonly VyaFieldThreshold[] = [
  { code: '7310101', name: 'Kinh tế', threshold100: 18.5, threshold200: 19, combinationIds: TECH_ECON_COMBINATIONS },
  { code: '7310202', name: 'Xây dựng Đảng và Chính quyền nhà nước', threshold100: 21, threshold200: 23, combinationIds: SOCIAL_COMBINATIONS },
  { code: '7310205', name: 'Quản lý nhà nước', threshold100: 21, threshold200: 23, combinationIds: SOCIAL_COMBINATIONS },
  { code: '7310401', name: 'Tâm lý học', threshold100: 22, threshold200: 23.7, combinationIds: SOCIAL_COMBINATIONS },
  { code: '7320108', name: 'Quan hệ công chúng', threshold100: 20, combinationIds: SOCIAL_COMBINATIONS },
  { code: '7380101', name: 'Luật', threshold100: 20, combinationIds: LAW_COMBINATIONS },
  { code: '7480201', name: 'Công nghệ thông tin', threshold100: 17, threshold200: 18, combinationIds: TECH_ECON_COMBINATIONS },
  { code: '7760101', name: 'Công tác xã hội', threshold100: 21, threshold200: 23, combinationIds: SOCIAL_COMBINATIONS },
  { code: '7760102', name: 'Công tác Thanh thiếu niên', threshold100: 20, threshold200: 21.5, combinationIds: SOCIAL_COMBINATIONS },
] as const;

export type VyaFieldCode = (typeof VYA_FIELD_THRESHOLDS_2026)[number]['code'];

export const VYA_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VyaFieldThreshold> = new Map(
  VYA_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
