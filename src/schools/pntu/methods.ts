import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { pntuKnowledgeGaps } from './knowledgeGaps';

export const pntuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'pntu-thpt-exam-2026',
    schoolId: 'pntu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (mã phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: pntuKnowledgeGaps,
  },
];
