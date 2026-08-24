import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hupKnowledgeGaps } from './knowledgeGaps';

export const hupAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hup-thpt-exam-2026',
    schoolId: 'hup',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (PT4)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hupKnowledgeGaps,
  },
];
