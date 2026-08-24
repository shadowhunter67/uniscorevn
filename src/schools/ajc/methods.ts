import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ajcKnowledgeGaps } from './knowledgeGaps';

export const ajcAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ajc-thpt-exam-2026',
    schoolId: 'ajc',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ajcKnowledgeGaps,
  },
];
