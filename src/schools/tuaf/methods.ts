import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { tuafKnowledgeGaps } from './knowledgeGaps';

export const tuafAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'tuaf-thpt-exam-2026',
    schoolId: 'tuaf',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: tuafKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức thi TN THPT. Trích nguyên văn Thông báo
   * 727/TB-ĐHNL (`sources.ts:tuaf-thpt-threshold-2026`, mục II.2.1):
   * "Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + điểm ƯT (nếu có)". Điểm ƯT theo Điều
   * 7 Thông tư 06/2026/TT-BGDĐT (`priority.ts`). Ngưỡng điểm xét tuyển 16/30 áp dụng đồng nhất
   * cho tất cả 23 ngành đại học chính quy đợt 1 — ĐXT ≥ 16 ⇒ đủ điều kiện xét tuyển.
   * KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'tuaf-thpt-exam-exact-2026',
    schoolId: 'tuaf',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển (ngưỡng 16/30 đồng nhất mọi ngành, đợt 1)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành đại học chính quy TUAF đợt 1'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
