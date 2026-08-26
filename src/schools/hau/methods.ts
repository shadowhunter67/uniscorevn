import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hauKnowledgeGaps } from './knowledgeGaps';

export const hauAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hau-thpt-exam-2026',
    schoolId: 'hau',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành không yêu cầu năng khiếu)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hauKnowledgeGaps,
  },
];
