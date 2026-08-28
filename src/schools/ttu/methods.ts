import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ttuKnowledgeGaps } from './knowledgeGaps';

export const ttuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ttu-thpt-exam-2026',
    schoolId: 'ttu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ttuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức thi TN THPT. Ngưỡng theo nhóm ngành
   * trích nguyên văn thông báo điểm sàn chính thức 09/07/2026
   * (`sources.ts:ttu-floor-score-2026`): khối kỹ thuật/công nghệ/kinh tế/ngôn ngữ 15, Điều
   * dưỡng/KTXN y học 18, Luật 20. Công thức ĐXT = tổng thô 3 môn + điểm ưu tiên là judgment call
   * (Điều 7 TT 06/2026, `priority.ts`) — thông báo không in công thức tường minh.
   * Ngoài phạm vi: ngành Y khoa (điều kiện kép Toán+Lý+Hóa/Toán+Hóa+Anh ≥22 VÀ Sinh TB≥6,5, cấu
   * trúc khác các nhóm còn lại). KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'ttu-thpt-exam-exact-2026',
    schoolId: 'ttu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển theo nhóm ngành (trừ Y khoa)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành TTU ngoài Y khoa'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
