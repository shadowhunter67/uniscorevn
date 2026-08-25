import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { halonguKnowledgeGaps } from './knowledgeGaps';

export const halonguAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'halongu-thpt-exam-2026',
    schoolId: 'halongu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành ngoài sư phạm)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, nhóm ngành ngoài sư phạm'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: halonguKnowledgeGaps,
  },
];
