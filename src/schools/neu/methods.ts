import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { neuKnowledgeGaps } from './knowledgeGaps';

export const neuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'neu-equivalence-2026',
    schoolId: 'neu',
    name: 'Admission threshold and equivalent-score band checker',
    year: 2026,
    applicantTypes: ['Candidates comparing THPT/HSA/SAT/V-ACT/TSA against NEU 2026 equivalence bands'],
    capabilities: { eligibility: true, scoreConversion: true, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: neuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP (PTXT5 — thi TN THPT thuần, 42/88 mã ngành CHUẨN, KHÔNG gồm tiên tiến/chất lượng
   * cao/POHE/xét kết hợp). Công thức + điểm ưu tiên trích nguyên văn chính chủ (không judgment
   * call, xem `priority.ts`/`evidence.ts`). KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'neu-thpt-exam-exact-2026',
    schoolId: 'neu',
    name: 'Xét kết quả thi TN THPT (PTXT5) — Điểm xét tuyển theo mã ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 42 mã ngành chuẩn NEU (tổ hợp A00/A01/D01/D07, hệ số 1)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];

