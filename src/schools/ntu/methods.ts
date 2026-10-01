import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ntuKnowledgeGaps } from './knowledgeGaps';

export const ntuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ntu-thpt-exam-exact-2026',
    schoolId: 'ntu',
    name: 'Xét điểm thi TN THPT 2026 (thang 40) — Điểm trúng tuyển theo chương trình và tổ hợp',
    year: 2026,
    applicantTypes: ['Thí sinh xét điểm thi TN THPT 2026, chọn 1 trong 53 chương trình của NTU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: ntuKnowledgeGaps,
  },
];
