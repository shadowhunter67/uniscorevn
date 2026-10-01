import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vaaKnowledgeGaps } from './knowledgeGaps';

export const vaaAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vaa-thpt-exam-exact-2026',
    schoolId: 'vaa',
    name: 'Phương thức 1 — Xét điểm thi TN THPT 2026 — Điểm trúng tuyển theo mã xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét điểm thi TN THPT 2026, chọn 1 trong 36 mã xét tuyển của VAA'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: vaaKnowledgeGaps,
  },
  {
    id: 'vaa-transcript-exact-2026',
    schoolId: 'vaa',
    name: 'Phương thức 2 — Xét học bạ 03 năm THPT — Điểm trúng tuyển theo mã xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét học bạ THPT (điểm trung bình cả năm lớp 10, 11, 12), chọn 1 trong 36 mã xét tuyển của VAA'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: true, exactCalculator: true },
    knowledgeGaps: vaaKnowledgeGaps,
  },
];
