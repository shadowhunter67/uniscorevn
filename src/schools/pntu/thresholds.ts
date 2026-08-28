import type { SubjectId } from '../../core/subjects';

export type PntuProgramId =
  | '7720101'
  | '7720115'
  | '7720201'
  | '7720301'
  | '7720302'
  | '7720401'
  | '7720501'
  | '7720601'
  | '7720602'
  | '7720603'
  | '7720609'
  | '7720610'
  | '7720701'
  | '7310401';

export interface PntuProgramThreshold {
  programId: PntuProgramId;
  programName: string;
  thptMin30: number;
  /** Các tổ hợp môn được xét (mã tổ hợp truyền thống — subject id map ở `PNTU_COMBINATION_SUBJECTS`). */
  combinationIds: readonly string[];
}

/**
 * Ngưỡng đảm bảo chất lượng đầu vào 2026 (điểm sàn, phương thức 100 — thi TN THPT), TOÀN BỘ 14
 * ngành/chương trình của Trường Đại học Y khoa Phạm Ngọc Thạch. Thông báo gốc (`pntu-threshold-notice-2026`,
 * công bố 10/07/2026) chỉ có dạng ảnh trên cổng trường — bảng dưới đối chiếu chéo ĐỘC LẬP 2 nguồn
 * báo chí (VnExpress + Giáo dục & Thời đại, cùng ngày 10/07/2026) khớp tuyệt đối cả điểm số lẫn tổ
 * hợp môn, và mã ngành + tổ hợp môn xét tuyển khớp với danh mục ngành trong Quyết định
 * 671/QĐ-TĐHYKPNT (14/02/2026, `pntu-admission-2026`, nguồn chính thức đọc trực tiếp) — dùng
 * verification 'cross-checked' (không phải 'verified' vì bảng điểm số cụ thể chưa tự đọc được từ
 * ảnh gốc). Tâm lý học (7310401) là ngành mới mở sau Quyết định 671, mã ngành lấy từ báo chí.
 */
export const PNTU_PROGRAM_THRESHOLDS_2026: readonly PntuProgramThreshold[] = [
  { programId: '7720101', programName: 'Y khoa', thptMin30: 22.5, combinationIds: ['B00'] },
  { programId: '7720501', programName: 'Răng - Hàm - Mặt', thptMin30: 22.5, combinationIds: ['B00'] },
  { programId: '7720201', programName: 'Dược học', thptMin30: 20.5, combinationIds: ['B00', 'A00', 'D07'] },
  { programId: '7720115', programName: 'Y học cổ truyền', thptMin30: 20, combinationIds: ['B00', 'B08', 'A01', 'D01'] },
  { programId: '7720301', programName: 'Điều dưỡng', thptMin30: 18, combinationIds: ['B00', 'B03', 'B08'] },
  { programId: '7720302', programName: 'Hộ sinh', thptMin30: 18, combinationIds: ['B00', 'B03', 'B08'] },
  { programId: '7720601', programName: 'Kỹ thuật xét nghiệm y học', thptMin30: 18, combinationIds: ['B00'] },
  { programId: '7720602', programName: 'Kỹ thuật hình ảnh y học', thptMin30: 18, combinationIds: ['B00', 'A00'] },
  { programId: '7720603', programName: 'Kỹ thuật phục hồi chức năng', thptMin30: 18, combinationIds: ['B00', 'A00', 'A01'] },
  { programId: '7720401', programName: 'Dinh dưỡng', thptMin30: 17, combinationIds: ['B00', 'A00'] },
  { programId: '7720609', programName: 'Khúc xạ nhãn khoa', thptMin30: 17, combinationIds: ['B00', 'A00', 'A01', 'D07'] },
  { programId: '7720610', programName: 'Kỹ thuật gây mê hồi sức', thptMin30: 17, combinationIds: ['B00', 'B03', 'B08'] },
  { programId: '7720701', programName: 'Y tế công cộng', thptMin30: 16, combinationIds: ['B00', 'B03', 'B08', 'A00'] },
  { programId: '7310401', programName: 'Tâm lý học', thptMin30: 15.5, combinationIds: ['B00', 'B03', 'B08', 'D01'] },
];

/** Tổ hợp môn theo mã truyền thống -> `SubjectId[]` (Toán bắt buộc theo mục 4 của Quyết định 671). */
export const PNTU_COMBINATION_SUBJECTS: Record<string, readonly SubjectId[]> = {
  B00: ['math', 'chemistry', 'biology'],
  B03: ['math', 'literature', 'biology'],
  B08: ['math', 'english', 'biology'],
  A00: ['math', 'physics', 'chemistry'],
  A01: ['math', 'physics', 'english'],
  D01: ['literature', 'math', 'english'],
  D07: ['math', 'chemistry', 'english'],
};

export function getPntuProgramThreshold(programId?: string): PntuProgramThreshold | undefined {
  return PNTU_PROGRAM_THRESHOLDS_2026.find((threshold) => threshold.programId === programId);
}
