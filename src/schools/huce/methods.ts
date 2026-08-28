import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { huceKnowledgeGaps } from './knowledgeGaps';

export const huceAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'huce-thpt-exam-2026',
    schoolId: 'huce',
    name: 'THPT exam threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huceKnowledgeGaps,
  },
  {
    id: 'huce-transcript-2026',
    schoolId: 'huce',
    name: 'Academic transcript threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using high-school academic records'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huceKnowledgeGaps,
  },
  {
    id: 'huce-tsa-2026',
    schoolId: 'huce',
    name: 'TSA threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using HUST thinking assessment scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huceKnowledgeGaps,
  },
  {
    id: 'huce-spt-2026',
    schoolId: 'huce',
    name: 'SPT threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using pedagogical assessment scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huceKnowledgeGaps,
  },
  {
    id: 'huce-vsat-2026',
    schoolId: 'huce',
    name: 'V-SAT threshold eligibility',
    year: 2026,
    applicantTypes: ['Candidates using V-SAT scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: huceKnowledgeGaps,
  },
  /**
   * Narrow exact branch, THPT-exam method only, covering all 51 programs already in
   * `thresholds.ts` (OCR'd from the official per-program table). The notice does not state a
   * formula, so eligibility compares the raw 3-subject total to the published threshold; priority
   * points are a documented judgment call (Dieu 7 TT 06/2026, `priority.ts`) applied only to the
   * informational reference score. No `knowledgeGaps` attached.
   */
  {
    id: 'huce-thpt-exam-exact-2026',
    schoolId: 'huce',
    name: 'THPT exam admission score',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores for a specific HUCE program/campus'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
