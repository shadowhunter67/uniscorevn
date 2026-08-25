import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tnusKnowledgeGaps } from './knowledgeGaps';

export const tnusAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tnus-thpt-exam-2026',
    schoolId: 'tnus',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tnusKnowledgeGaps,
  },
];
