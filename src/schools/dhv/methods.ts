import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dhvKnowledgeGaps } from './knowledgeGaps';

export const dhvAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dhv-thpt-exam-2026',
    schoolId: 'dhv',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh sử dụng điểm thi tốt nghiệp THPT 2026 (trừ nhóm ngành Luật, Tâm lý học)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dhvKnowledgeGaps,
  },
];
