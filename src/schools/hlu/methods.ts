import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hluKnowledgeGaps } from './knowledgeGaps';

export const hluAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hlu-thpt-exam-2026',
    schoolId: 'hlu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, khu vực 3'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hluKnowledgeGaps,
  },
];
