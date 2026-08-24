import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hduKnowledgeGaps } from './knowledgeGaps';

export const hduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hdu-thpt-exam-2026',
    schoolId: 'hdu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (PT1)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành Luật/Luật Kinh tế'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hduKnowledgeGaps,
  },
];
