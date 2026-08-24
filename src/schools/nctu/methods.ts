import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { nctuKnowledgeGaps } from './knowledgeGaps';

export const nctuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'nctu-thpt-exam-2026',
    schoolId: 'nctu',
    name: 'Xet tuyen theo ket qua thi tot nghiep THPT nam 2026',
    year: 2026,
    applicantTypes: ['Thi sinh su dung diem thi tot nghiep THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: nctuKnowledgeGaps,
  },
];
