import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { mduKnowledgeGaps } from './knowledgeGaps';

export const mduAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'mdu-thpt-exam-2026',
    schoolId: 'mdu',
    name: 'Xet ket qua thi tot nghiep THPT nam 2026',
    year: 2026,
    applicantTypes: ['Thi sinh xet tuyen bang ket qua thi tot nghiep THPT nam 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: mduKnowledgeGaps,
  },
  {
    id: 'mdu-thpt-exam-exact-2026',
    schoolId: 'mdu',
    name: 'Xet ket qua thi TN THPT - nguong diem chuan theo nganh',
    year: 2026,
    applicantTypes: ['Thi sinh xet ket qua thi TN THPT 2026 vao cac nganh MDU/MIT trong pham vi exact (tru Duoc hoc, Luat kinh te)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
