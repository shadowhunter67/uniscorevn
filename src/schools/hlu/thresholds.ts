import type { SubjectId } from '../../core/subjects';

/**
 * HLU 2026 (Khóa 51) — dữ liệu tính Điểm xét tuyển phương thức xét kết quả thi tốt nghiệp THPT.
 *
 * Nguồn:
 * - Ngưỡng bảo đảm chất lượng đầu vào: Thông báo 1010/TB-ĐHLHN (08/07/2026) —
 *   `sources.ts:hlu-quality-threshold-2026` — 20,0/30 (tổng thô 3 môn, KV3, không nhân hệ số,
 *   không tính điểm cộng), áp dụng CHUNG mọi tổ hợp, mọi chương trình lĩnh vực pháp luật.
 * - Độ chênh điểm giữa các tổ hợp + quy tắc quy đổi: Thông báo 1029/TB-ĐHLHN (10/07/2026) —
 *   `sources.ts:hlu-combo-delta-2026`. Tổ hợp gốc = D01. Điểm quy đổi về D01 = tổng thô 3 môn −
 *   độ chênh của tổ hợp.
 * - Điểm trúng tuyển theo tổ hợp gốc D01: Quyết định 1623/QĐ-ĐHLHN (10/08/2026) —
 *   `sources.ts:hlu-cutoff-2026`. "Điểm trúng tuyển theo thang điểm 30 đã bao gồm điểm cộng,
 *   điểm ưu tiên (nếu có)".
 * - Chính sách ưu tiên: Quy chế tuyển sinh HLU (QĐ 633/QĐ-ĐHLHN, 26/03/2026) —
 *   `sources.ts:hlu-quyche-2026`, Điều 7 (xem `priority.ts`).
 */
export const HLU_BASE_COMBO = 'D01';
export const HLU_THPT_MIN_THRESHOLD_30 = 20;
export const HLU_MAX_SCORE_30 = 30;

/** Tổ hợp HLU dùng được (mọi môn có trong `SubjectId`) → 3 môn. D02-D06 (ngoại ngữ Nga/Pháp/
 * Trung/Đức/Nhật) không model được. */
export const HLU_COMBOS: Readonly<Record<string, readonly [SubjectId, SubjectId, SubjectId]>> = {
  D01: ['literature', 'math', 'english'],
  A00: ['math', 'physics', 'chemistry'],
  A01: ['math', 'physics', 'english'],
  C00: ['literature', 'history', 'geography'],
};

/** Độ chênh điểm của tổ hợp so với tổ hợp gốc D01 (Thông báo 1029, mục 1). Điểm quy đổi về D01 =
 * tổng thô − độ chênh. */
export const HLU_COMBO_DELTA_TO_D01: Readonly<Record<string, number>> = {
  D01: 0,
  A00: 1.48,
  A01: 0.26,
  C00: 0,
};

export interface HluProgram {
  programId: string;
  name: string;
  /** Điểm trúng tuyển 2026 theo tổ hợp gốc D01 (thang 30, đã gồm điểm cộng/ưu tiên). */
  cutoffD01_30: number;
}

export const HLU_PROGRAMS: readonly HluProgram[] = [
  { programId: 'luat', name: 'Luật', cutoffD01_30: 24.12 },
  { programId: 'luat-kinh-te', name: 'Luật Kinh tế', cutoffD01_30: 25.95 },
  { programId: 'luat-thuong-mai-quoc-te', name: 'Luật Thương mại quốc tế', cutoffD01_30: 24.22 },
  { programId: 'ngon-ngu-anh', name: 'Ngôn ngữ Anh', cutoffD01_30: 23.09 },
  { programId: 'luat-dak-lak', name: 'Luật (đào tạo tại Phân hiệu Đắk Lắk)', cutoffD01_30: 20.0 },
];

export const HLU_PROGRAM_BY_ID: ReadonlyMap<string, HluProgram> = new Map(HLU_PROGRAMS.map((p) => [p.programId, p]));
