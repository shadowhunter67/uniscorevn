import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { aofKnowledgeGaps } from './knowledgeGaps';

export const aofAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'aof-thpt-exam-2026',
    schoolId: 'aof',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (phương thức 3)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: aofKnowledgeGaps,
  },
];
