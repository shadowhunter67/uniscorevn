import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { udaKnowledgeGaps } from './knowledgeGaps';

export const udaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uda-thpt-exam-2026',
    schoolId: 'uda',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành thường)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: udaKnowledgeGaps,
  },
];
