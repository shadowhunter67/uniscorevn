/**
 * Ngưỡng đầu vào DTHU 2026 (Trường Đại học Đồng Tháp), Thông báo ngày 09/07/2026 (Phụ lục I),
 * phương thức PT100 (xét kết quả thi TN THPT 2026) — đọc trực tiếp từ file PDF đính kèm bài đăng
 * chính thức, đủ 59/59 ngành có mã ngành/tổ hợp/NĐV. Chỉ model 3 nhóm dùng tổ hợp môn văn hóa
 * chuẩn (không có môn năng khiếu):
 *
 * - `teacherTraining`: 16/21 ngành sư phạm (trừ Giáo dục Mầm non CĐ/ĐH, Giáo dục Thể chất, Sư
 *   phạm Âm nhạc, Sư phạm Mỹ thuật — 5 ngành này dùng tổ hợp có môn năng khiếu, KHÔNG model) —
 *   20,0/30.
 * - `standard`: 36/38 ngành không sư phạm, trừ Luật và Huấn luyện Thể thao (dùng tổ hợp NK
 *   TDTT) — 15,0/30.
 * - `law`: Luật (7380101) — 20,0/30, kèm điều kiện phụ CHƯA model (xem knowledgeGaps.ts).
 */
export type DthuProgramGroup = 'teacherTraining' | 'standard' | 'law';

const GROUP_LABELS: Record<DthuProgramGroup, string> = {
  teacherTraining: '16 ngành sư phạm dùng tổ hợp văn hóa chuẩn (trừ Mầm non/GDTC/SP Âm nhạc/SP Mỹ thuật)',
  standard: '36 ngành không sư phạm, không năng khiếu (trừ Luật, Huấn luyện Thể thao)',
  law: 'Luật (7380101)',
};

export const DTHU_THPT_EXAM_THRESHOLD_30: Record<DthuProgramGroup, number> = {
  teacherTraining: 20,
  standard: 15,
  law: 20,
};

export interface DthuEligibilityResult {
  pass: boolean;
  requiredText: string;
}

/** NĐV = tổng điểm 3 môn thi TN THPT (thang 30) + điểm ưu tiên khu vực/đối tượng. Runtime hiện
 * chỉ cộng điểm thô 3 môn — xem `dthu-priority-not-modeled`. */
export function checkDthuThptExamThreshold(totalScore30: number, group: DthuProgramGroup): DthuEligibilityResult {
  const threshold = DTHU_THPT_EXAM_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển, CHƯA cộng điểm ưu tiên, ≥ ${threshold} (thang 30) — áp dụng ${GROUP_LABELS[group]}.`,
  };
}

/** Nhóm dùng được cho nhánh exact (loại `law` — điều kiện phụ về học lực chưa model). */
export type DthuExactGroup = 'teacherTraining' | 'standard';

/** NĐV = round2(tổng thô 3 môn + điểm ưu tiên hiệu dụng). Trích mục 1.3 Thông báo điểm sàn. */
export function calculateDthuThptExamScore30(rawTotal30: number, effectivePriority30: number): number {
  return Math.round((rawTotal30 + effectivePriority30) * 100) / 100;
}

export { GROUP_LABELS as DTHU_PROGRAM_GROUP_LABELS };
