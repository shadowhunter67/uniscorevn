import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uttKnowledgeGaps } from './knowledgeGaps';

export const uttAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'utt-thpt-exam-2026',
    schoolId: 'utt',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: uttKnowledgeGaps,
  },
];
