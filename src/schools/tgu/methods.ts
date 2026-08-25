import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tguKnowledgeGaps } from './knowledgeGaps';

export const tguAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tgu-thpt-exam-2026',
    schoolId: 'tgu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tguKnowledgeGaps,
  },
];
