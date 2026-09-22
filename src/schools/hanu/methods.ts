import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hanuKnowledgeGaps } from './knowledgeGaps';

export const hanuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hanu-thpt-exam-2026',
    schoolId: 'hanu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (mã 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hanuKnowledgeGaps,
  },
  /**
   * Nhánh exact — Điểm xét tuyển = (Toán hoặc Văn ×2 + Ngoại ngữ ×2 + môn còn lại ×1) × 40/50 +
   * điểm ưu tiên (quy đổi ×4/3), so với điểm chuẩn thật theo mã ngành (29/30 mã, xem
   * `thresholds.ts`). Chỉ áp dụng tổ hợp dùng tiếng Anh làm Ngoại ngữ — xem `knowledgeGaps.ts`.
   * KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'hanu-thpt-exam-exact-2026',
    schoolId: 'hanu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển theo mã ngành (thang 40)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 29 mã ngành HANU, tổ hợp dùng tiếng Anh làm Ngoại ngữ'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
