import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tnuKnowledgeGaps } from './knowledgeGaps';

export const tnuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tnu-thpt-exam-2026',
    schoolId: 'tnu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tnuKnowledgeGaps,
  },
];
