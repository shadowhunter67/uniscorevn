import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { huafKnowledgeGaps } from './knowledgeGaps';

export const huafAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'huaf-transcript-2026',
    schoolId: 'huaf',
    name: 'Xét tuyển sử dụng kết quả học tập cấp THPT (học bạ)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT từ năm 2026, xét tuyển bằng học bạ'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huafKnowledgeGaps,
  },
];
