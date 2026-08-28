import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tguKnowledgeGaps } from './knowledgeGaps';

export const tguAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tgu-thpt-exam-2026',
    schoolId: 'tgu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tguKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), Phương thức 1 (thi TN THPT), "các ngành khác" (trừ
   * Luật — điều kiện học lực riêng; trừ Giáo dục Mầm non — năng khiếu). Trích nguyên văn Đề án
   * tuyển sinh (`sources.ts:tgu-admission-scheme-2026`, mục 3.1.1): ĐXT ≥ 15,0/30 + điểm môn Toán
   * hoặc Ngữ văn ≥ 1/3 ĐXT. Công thức ĐXT = tổng thô 3 môn + điểm ưu tiên là judgment call (Điều
   * 7 TT 06/2026, `priority.ts`) — đề án không lặp lại công thức cho phương thức này. KHÔNG gắn
   * `knowledgeGaps`.
   */
  {
    id: 'tgu-thpt-exam-exact-2026',
    schoolId: 'tgu',
    name: 'Xét kết quả thi TN THPT (Phương thức 1) — Điểm xét tuyển ("các ngành khác", trừ Luật/GD Mầm non)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành TGU ngoài Luật và Giáo dục Mầm non'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
