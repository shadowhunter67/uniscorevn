import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { humgKnowledgeGaps } from './knowledgeGaps';

export const humgAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'humg-thpt-exam-2026',
    schoolId: 'humg',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: humgKnowledgeGaps,
  },
];
