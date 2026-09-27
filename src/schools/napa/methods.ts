import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { napaKnowledgeGaps } from './knowledgeGaps';

export const napaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'napa-thpt-exam-d01-exact-2026',
    schoolId: 'napa',
    name: 'Xet ket qua thi tot nghiep THPT 2026 - to hop goc D01',
    year: 2026,
    applicantTypes: ['Thi sinh xet ket qua thi tot nghiep THPT 2026 vao cac ma xet tuyen NAPA da cong bo theo to hop goc D01'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: napaKnowledgeGaps,
  },
];
