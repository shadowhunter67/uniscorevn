import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vguKnowledgeGaps } from './knowledgeGaps';

export const vguAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vgu-thpt-exam-2026',
    schoolId: 'vgu',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vguKnowledgeGaps,
  },
];
