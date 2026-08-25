import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnulawKnowledgeGaps } from './knowledgeGaps';

export const vnulawAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnulaw-thpt-exam-2026',
    schoolId: 'vnulaw',
    name: 'THPT exam admission baseline (Phuong thuc 100)',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnulawKnowledgeGaps,
  },
];
