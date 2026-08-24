import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hubtKnowledgeGaps } from './knowledgeGaps';

export const hubtAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hubt-thpt-exam-2026',
    schoolId: 'hubt',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, ngành đào tạo đại trà'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hubtKnowledgeGaps,
  },
];
