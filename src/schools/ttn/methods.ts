import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ttnKnowledgeGaps } from './knowledgeGaps';

export const ttnAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ttn-thpt-exam-2026',
    schoolId: 'ttn',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ttnKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức 100 (xét thi TN THPT). Bảng ngưỡng theo
   * nhóm mã xét tuyển trích nguyên văn Thông báo mức điểm nhận hồ sơ 2026
   * (`sources.ts:ttn-threshold-notice-2026`, mục 1.2 + 3.1): Y khoa 22 / Giáo viên 20 / Điều
   * dưỡng - KTXN y học 18 / còn lại 15. Công thức ĐXT = tổng thô 3 môn + điểm ưu tiên là judgment
   * call theo quy chế (Điều 7 TT 06/2026, `priority.ts`) — thông báo không in công thức tường
   * minh (cùng tiền lệ `schools/ctu`). Đủ điều kiện xét tuyển ⟺ ĐXT ≥ ngưỡng nhóm.
   * Phạm vi: nhóm medicine/teacher/nursingMedtech/standard qua phương thức 100. Ngoài phạm vi:
   * Giáo dục Mầm non / Giáo dục Thể chất (chỉ phương thức 405 — năng khiếu). KHÔNG gắn
   * `knowledgeGaps`.
   */
  {
    id: 'ttn-thpt-exam-exact-2026',
    schoolId: 'ttn',
    name: 'Xét kết quả thi TN THPT (Phương thức 100) — Điểm xét tuyển theo nhóm ngưỡng (trừ ngành năng khiếu)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một mã xét tuyển TTN qua phương thức 100 (ngoài Giáo dục Mầm non, Giáo dục Thể chất)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
