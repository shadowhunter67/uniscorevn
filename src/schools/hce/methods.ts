import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hceKnowledgeGaps } from './knowledgeGaps';

export const hceAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hce-thpt-exam-2026',
    schoolId: 'hce',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hceKnowledgeGaps,
  },
];
