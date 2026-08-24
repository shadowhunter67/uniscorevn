import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dtuKnowledgeGaps } from './knowledgeGaps';

export const dtuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dtu-thpt-exam-2026',
    schoolId: 'dtu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dtuKnowledgeGaps,
  },
];
