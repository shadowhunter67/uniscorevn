import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uhdKnowledgeGaps } from './knowledgeGaps';

export const uhdAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uhd-thpt-exam-2026',
    schoolId: 'uhd',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành Kinh tế/Kỹ thuật/KHXH&NV)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: uhdKnowledgeGaps,
  },
];
