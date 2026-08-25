import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { thanhdoKnowledgeGaps } from './knowledgeGaps';

export const thanhdoAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'thanhdo-thpt-exam-2026',
    schoolId: 'thanhdo',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: thanhdoKnowledgeGaps,
  },
];
