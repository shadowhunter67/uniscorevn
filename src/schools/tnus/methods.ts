import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tnusKnowledgeGaps } from './knowledgeGaps';

export const tnusAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tnus-thpt-exam-2026',
    schoolId: 'tnus',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tnusKnowledgeGaps,
  },
  /**
   * Nhánh HẸP so Điểm xét tuyển (tổng thô 3 môn + ưu tiên) với điểm chuẩn thật theo mã xét tuyển
   * đã chọn (40/40 mã, xem `thresholds.ts`). Công thức trích nguyên văn `sources.ts:tnus-threshold-2026`.
   * KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'tnus-thpt-exam-exact-2026',
    schoolId: 'tnus',
    name: 'Xét kết quả thi TN THPT — so điểm chuẩn theo mã xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 39 mã xét tuyển TNUS (trừ Ngôn ngữ Anh định hướng giảng dạy)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
