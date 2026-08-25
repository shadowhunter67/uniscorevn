import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vaaKnowledgeGaps } from './knowledgeGaps';

export const vaaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vaa-thpt-exam-2026',
    schoolId: 'vaa',
    name: 'THPT exam score floor (gate for transcript/ĐGNL methods)',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vaaKnowledgeGaps,
  },
];
