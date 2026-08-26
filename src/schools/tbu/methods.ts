import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tbuKnowledgeGaps } from './knowledgeGaps';

export const tbuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tbu-thpt-exam-2026',
    schoolId: 'tbu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (ngưỡng nhận hồ sơ)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tbuKnowledgeGaps,
  },
];
