import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { apdKnowledgeGaps } from './knowledgeGaps';

export const apdAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'apd-thpt-exam-2026',
    schoolId: 'apd',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: apdKnowledgeGaps,
  },
];
