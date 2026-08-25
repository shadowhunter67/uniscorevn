import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tnuflKnowledgeGaps } from './knowledgeGaps';

export const tnuflAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tnufl-thpt-exam-2026',
    schoolId: 'tnufl',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tnuflKnowledgeGaps,
  },
];
