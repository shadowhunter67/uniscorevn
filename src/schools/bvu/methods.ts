import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { bvuKnowledgeGaps } from './knowledgeGaps';

export const bvuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'bvu-transcript-2026',
    schoolId: 'bvu',
    name: 'Transcript (học bạ) admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using grade-12 academic transcript results'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: bvuKnowledgeGaps,
  },
];
