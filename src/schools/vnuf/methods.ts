import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnufKnowledgeGaps } from './knowledgeGaps';

export const vnufAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuf-thpt-exam-2026',
    schoolId: 'vnuf',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnufKnowledgeGaps,
  },
];
