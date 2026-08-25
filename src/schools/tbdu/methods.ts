import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tbduKnowledgeGaps } from './knowledgeGaps';

export const tbduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tbdu-thpt-exam-2026',
    schoolId: 'tbdu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tbduKnowledgeGaps,
  },
];
