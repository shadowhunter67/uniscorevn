import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tduKnowledgeGaps } from './knowledgeGaps';

export const tduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tdu-thpt-exam-2026',
    schoolId: 'tdu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tduKnowledgeGaps,
  },
];
