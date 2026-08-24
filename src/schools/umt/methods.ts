import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { umtKnowledgeGaps } from './knowledgeGaps';

export const umtAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'umt-thpt-exam-2026',
    schoolId: 'umt',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: umtKnowledgeGaps,
  },
];
