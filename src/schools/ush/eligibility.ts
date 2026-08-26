import type { SubjectId } from '../../core/subjects';

/**
 * Ngưỡng đầu vào USH 2026 (Trường Đại học Thể dục Thể thao TP.HCM), Thông báo 10/TB-TDTTHCM
 * (05/03/2026, đọc trực tiếp từ PDF đính kèm). Áp dụng cho 3 ngành: Huấn luyện thể thao (7810302),
 * Quản lý thể dục thể thao (7810301), Y sinh học thể dục thể thao (7729001) — Phương thức 1 (mã
 * 405, xét kết quả thi TN THPT). KHÔNG áp dụng cho Giáo dục thể chất (ngưỡng riêng, không nêu số).
 */
export interface UshSubjectPair {
  id: string;
  label: string;
  subjects: readonly [SubjectId, SubjectId];
}

export const USH_SUBJECT_PAIRS: readonly UshSubjectPair[] = [
  { id: 'T00', label: 'T00 (Toán, Sinh học, Năng khiếu TDTT)', subjects: ['math', 'biology'] },
  { id: 'T01', label: 'T01 (Toán, Ngữ văn, Năng khiếu TDTT)', subjects: ['math', 'literature'] },
  { id: 'T04', label: 'T04 (Toán, Vật lí, Năng khiếu TDTT)', subjects: ['math', 'physics'] },
  { id: 'T06', label: 'T06 (Toán, Địa lí, Năng khiếu TDTT)', subjects: ['math', 'geography'] },
];

export const USH_TOTAL_THRESHOLD_30 = 15;
export const USH_TALENT_MIN_10 = 5;
export const USH_TALENT_MAX_10 = 10;

export interface UshEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkUshThreshold(culturalTotal: number, talentScore10: number): UshEligibilityResult {
  const total30 = culturalTotal + talentScore10;
  const pass = total30 >= USH_TOTAL_THRESHOLD_30 && talentScore10 >= USH_TALENT_MIN_10;
  return {
    pass,
    requiredText: `Tổng điểm 2 môn văn hóa + điểm năng khiếu TDTT ≥ ${USH_TOTAL_THRESHOLD_30} (thang 30), ĐỒNG THỜI điểm năng khiếu TDTT riêng ≥ ${USH_TALENT_MIN_10} (thang 10). Áp dụng: Huấn luyện thể thao, Quản lý thể dục thể thao, Y sinh học thể dục thể thao.`,
  };
}
