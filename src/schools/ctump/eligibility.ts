/**
 * Ngưỡng đầu vào CTUMP 2026 (Trường Đại học Y Dược Cần Thơ), Thông báo 197/TB-ĐHYDCT (09/07/2026),
 * phương thức xét kết quả thi TN THPT 2026 (mục II.1, đọc trực tiếp từ file PDF đính kèm bài đăng
 * chính thức — không phải tổng hợp bên thứ ba). 4 nhóm ngành theo đúng bảng công bố:
 *
 * - `tier22`: Y khoa (7720101), Răng hàm mặt (7720501) — tổ hợp B00.
 * - `tier20`: Y học cổ truyền (7720115, B00), Dược học (7720201, A00/B00/B08/D07).
 * - `tier18`: Y học dự phòng (7720110), Điều dưỡng (7720301), Hộ sinh (7720302), Kỹ thuật Xét
 *   nghiệm y học (7720601) — A00/B00/B08/D07; Kỹ thuật Hình ảnh y học (7720602) — A00/B00/X06;
 *   Kỹ thuật Phục hồi chức năng (7720603) — A00/B00/B08/D07.
 * - `tier15`: Dinh dưỡng (7720401, A00/B00/B08/D07), Y tế công cộng (7720701, B00/C00/D01), Kỹ
 *   thuật Y sinh (7520212, A00/B00/X06), Tâm lý học (7310401, B00/C00/D01).
 *
 * Ngành Y khoa tiếng Anh (7720101E, phương thức 5 riêng) KHÔNG nằm trong bảng này.
 */
export type CtumpProgramGroup = 'tier22' | 'tier20' | 'tier18' | 'tier15';

const GROUP_LABELS: Record<CtumpProgramGroup, string> = {
  tier22: 'Y khoa, Răng hàm mặt',
  tier20: 'Y học cổ truyền, Dược học',
  tier18: 'Y học dự phòng, Điều dưỡng, Hộ sinh, Kỹ thuật Xét nghiệm y học, Kỹ thuật Hình ảnh y học, Kỹ thuật Phục hồi chức năng',
  tier15: 'Dinh dưỡng, Y tế công cộng, Kỹ thuật Y sinh, Tâm lý học',
};

export const CTUMP_THPT_EXAM_THRESHOLD_30: Record<CtumpProgramGroup, number> = {
  tier22: 22,
  tier20: 20,
  tier18: 18,
  tier15: 15,
};

export interface CtumpEligibilityResult {
  pass: boolean;
  requiredText: string;
}

/** Mức điểm tối thiểu xét tuyển đợt 1 — CHÚ Ý: theo mục II.1 TB 197/TB-ĐHYDCT, mức điểm này đã
 * BAO GỒM điểm ưu tiên khu vực/đối tượng. Runtime hiện chỉ cộng điểm thô 3 môn (chưa cộng ưu tiên
 * — xem `ctump-priority-not-modeled`), nên kết quả 'ineligible' sát ngưỡng có thể đổi thành
 * 'eligible' nếu thí sinh có điểm ưu tiên. */
export function checkCtumpThptExamThreshold(totalScore30: number, group: CtumpProgramGroup): CtumpEligibilityResult {
  const threshold = CTUMP_THPT_EXAM_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển, CHƯA cộng điểm ưu tiên, ≥ ${threshold} (thang 30) — áp dụng nhóm ngành: ${GROUP_LABELS[group]}.`,
  };
}

export { GROUP_LABELS as CTUMP_PROGRAM_GROUP_LABELS };
