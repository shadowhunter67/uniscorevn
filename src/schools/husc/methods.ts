import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { huscKnowledgeGaps } from './knowledgeGaps';

export const huscAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'husc-thpt-exam-2026',
    schoolId: 'husc',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huscKnowledgeGaps,
  },
];
