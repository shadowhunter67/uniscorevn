import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vmuKnowledgeGaps } from './knowledgeGaps';

export const vmuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vmu-thpt-exam-2026',
    schoolId: 'vmu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (PT1)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vmuKnowledgeGaps,
  },
];
