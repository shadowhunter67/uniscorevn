import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dluKnowledgeGaps } from './knowledgeGaps';

export const dluAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dlu-thpt-exam-2026',
    schoolId: 'dlu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dluKnowledgeGaps,
  },
];
