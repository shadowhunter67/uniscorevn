import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ttnKnowledgeGaps } from './knowledgeGaps';

export const ttnAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ttn-thpt-exam-2026',
    schoolId: 'ttn',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ttnKnowledgeGaps,
  },
];
