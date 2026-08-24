import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnuulisKnowledgeGaps } from './knowledgeGaps';

export type VnuulisMethodId = 'vnuulis-thpt-exam-2026' | 'vnuulis-hsa-2026' | 'vnuulis-transcript-2026';

export const vnuulisAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuulis-thpt-exam-2026',
    schoolId: 'vnuulis',
    name: 'THPT exam threshold eligibility (language subject coefficient 2)',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuulisKnowledgeGaps,
  },
  {
    id: 'vnuulis-hsa-2026',
    schoolId: 'vnuulis',
    name: 'VNU HSA aptitude-test threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using VNU-Hanoi HSA aptitude-test scores'],
    capabilities: { eligibility: false, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuulisKnowledgeGaps,
  },
  {
    id: 'vnuulis-transcript-2026',
    schoolId: 'vnuulis',
    name: 'Transcript-based threshold eligibility (international-partnership programs only)',
    year: 2026,
    applicantTypes: ['Candidates applying to international-partnership programs using academic transcripts'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnuulisKnowledgeGaps,
  },
];
