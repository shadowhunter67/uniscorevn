import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { eautKnowledgeGaps } from './knowledgeGaps';

export const eautAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'eaut-transcript-2026',
    schoolId: 'eaut',
    name: 'Xét tuyển học bạ THPT (điểm trung bình 6 học kỳ) kèm điều kiện điểm thi tốt nghiệp THPT 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: eautKnowledgeGaps,
  },
];
