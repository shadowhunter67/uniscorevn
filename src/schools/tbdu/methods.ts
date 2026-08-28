import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tbduKnowledgeGaps } from './knowledgeGaps';

export const tbduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tbdu-thpt-exam-2026',
    schoolId: 'tbdu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tbduKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), phương thức thi TN THPT, nhóm ngành thường (TRỪ Luật/Luật
   * kinh tế — điều kiện 3-lựa-chọn riêng, xem `tbdu-law-group-conditions-not-modeled`). Trích
   * nguyên văn trang chính thức (`evidence.ts:tbduThptExamExactThresholdEvidence`): ngưỡng 15/30,
   * nguồn im lặng về việc đã gồm ưu tiên → so TỔNG THÔ. Điểm ưu tiên judgment call Điều 7 TT
   * 06/2026 (`priority.ts`) chỉ cho ĐXT hiển thị tham khảo. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'tbdu-thpt-exam-exact-2026',
    schoolId: 'tbdu',
    name: 'Xét kết quả thi TN THPT — Điểm xét (nhóm ngành thường, trừ Luật/Luật kinh tế)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành TBDU thuộc nhóm ngành thường (ngoài Luật/Luật kinh tế)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
