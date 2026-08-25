import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tnueKnowledgeGaps } from './knowledgeGaps';

export const tnueAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tnue-thpt-exam-2026',
    schoolId: 'tnue',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tnueKnowledgeGaps,
  },
];
