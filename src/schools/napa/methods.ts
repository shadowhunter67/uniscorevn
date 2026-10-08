import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { napaKnowledgeGaps } from './knowledgeGaps';

export const napaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'napa-thpt-exam-d01-exact-2026',
    schoolId: 'napa',
    name: 'Xet kết quả thi tốt nghiệp THPT 2026 - tổ hợp gốc D01',
    year: 2026,
    applicantTypes: ['Thi sinh xét kết quả thi tốt nghiệp THPT 2026 vao các ma xét tuyển NAPA đã công bố theo tổ hợp gốc D01'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: napaKnowledgeGaps,
  },
];
