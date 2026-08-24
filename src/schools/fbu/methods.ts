import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { fbuKnowledgeGaps } from './knowledgeGaps';

export const fbuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'fbu-thpt-exam-2026',
    schoolId: 'fbu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: fbuKnowledgeGaps,
  },
];
