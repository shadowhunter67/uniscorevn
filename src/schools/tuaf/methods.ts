import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tuafKnowledgeGaps } from './knowledgeGaps';

export const tuafAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tuaf-thpt-exam-2026',
    schoolId: 'tuaf',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tuafKnowledgeGaps,
  },
];
