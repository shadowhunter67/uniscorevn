import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dainamKnowledgeGaps } from './knowledgeGaps';

export const dainamAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dainam-thpt-exam-2026',
    schoolId: 'dainam',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành đào tạo đại trà'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dainamKnowledgeGaps,
  },
];
