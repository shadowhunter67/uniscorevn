import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { utmKnowledgeGaps } from './knowledgeGaps';

export const utmAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'utm-thpt-exam-2026',
    schoolId: 'utm',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (không gồm Luật/Luật kinh tế)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: utmKnowledgeGaps,
  },
];
