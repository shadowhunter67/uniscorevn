import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnuumpKnowledgeGaps } from './knowledgeGaps';

export const vnuumpAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuump-thpt-exam-2026',
    schoolId: 'vnuump',
    name: 'THPT exam admission baseline (Phuong thuc 2 - 96% chi tieu)',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuumpKnowledgeGaps,
  },
];
