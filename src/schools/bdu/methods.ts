import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { bduKnowledgeGaps } from './knowledgeGaps';

export const bduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'bdu-thpt-exam-2026',
    schoolId: 'bdu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: bduKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), phương thức thi TN THPT, 2 nhóm: `standard` (đa số ngành,
   * ngưỡng 15/30, nguồn im lặng về ưu tiên → so TỔNG THÔ) và `lawOrPharmacy` (Luật/Luật kinh
   * tế/Dược học, ngưỡng 20/30 "được cộng điểm ưu tiên" → so ĐXT). Trích nguyên văn
   * (`evidence.ts:bduThptExamExactThresholdEvidence`). Điểm ưu tiên judgment call Điều 7 TT
   * 06/2026 (`priority.ts` — trường không công bố bảng riêng). KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'bdu-thpt-exam-exact-2026',
    schoolId: 'bdu',
    name: 'Xét kết quả thi TN THPT — Điểm xét (đa số ngành, hoặc Luật/Luật kinh tế/Dược học)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào BDU, nhóm ngành thường hoặc Luật/Luật kinh tế/Dược học'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
