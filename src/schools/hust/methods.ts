import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hustKnowledgeGaps } from './knowledgeGaps';

export const hustAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hust-thpt-exam-2026',
    schoolId: 'hust',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hustKnowledgeGaps,
  },
];
