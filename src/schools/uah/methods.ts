import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uahKnowledgeGaps } from './knowledgeGaps';

export const uahAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uah-thpt-exam-2026',
    schoolId: 'uah',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: uahKnowledgeGaps,
  },
];
