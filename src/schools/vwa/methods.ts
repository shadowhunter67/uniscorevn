import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vwaKnowledgeGaps } from './knowledgeGaps';

export const vwaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vwa-thpt-exam-2026',
    schoolId: 'vwa',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vwaKnowledgeGaps,
  },
  {
    id: 'vwa-transcript-2026',
    schoolId: 'vwa',
    name: 'Xét tuyển học bạ THPT (điểm trung bình 6 học kỳ) năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vwaKnowledgeGaps,
  },
];
