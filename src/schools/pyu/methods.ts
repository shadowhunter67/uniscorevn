import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { pyuKnowledgeGaps } from './knowledgeGaps';

export const pyuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'pyu-thpt-exam-2026',
    schoolId: 'pyu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh sử dụng điểm thi tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: pyuKnowledgeGaps,
  },
];
