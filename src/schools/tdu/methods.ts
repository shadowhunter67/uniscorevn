import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tduKnowledgeGaps } from './knowledgeGaps';

export const tduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tdu-thpt-exam-2026',
    schoolId: 'tdu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tduKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), Phương thức 1 (thi TN THPT 2026), phạm vi 24/29 mã
   * ngành ngoài Dược học/Điều dưỡng/Luật/Luật kinh tế/Luật quốc tế (5 mã có điều kiện phụ học lực
   * cho thí sinh tốt nghiệp trước 2025 — ngoài phạm vi, xem `sources.ts`). Trích nguyên văn Thông
   * báo 725/TB-ĐHTĐ (`evidence.ts:tduThptExamExactThresholdEvidence`): ngưỡng phẳng 15,0/30. Thông
   * báo không lặp lại công thức "ĐXT = ... + điểm ưu tiên" cho PT1 → judgment call Điều 7 TT
   * 06/2026 (`priority.ts`), so TỔNG THÔ với ngưỡng. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'tdu-thpt-exam-exact-2026',
    schoolId: 'tdu',
    name: 'Xét kết quả thi TN THPT (Phương thức 1) — Điểm xét tuyển ("các ngành khác", trừ Dược/Điều dưỡng/Luật)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành TDU ngoài Dược học, Điều dưỡng, Luật, Luật kinh tế và Luật quốc tế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
