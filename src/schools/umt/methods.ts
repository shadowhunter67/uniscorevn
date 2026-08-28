import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { umtKnowledgeGaps } from './knowledgeGaps';

export const umtAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'umt-thpt-exam-2026',
    schoolId: 'umt',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: umtKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact) cho thí sinh KHÔNG điểm cộng. Trích nguyên văn
   * Thông báo 57/2026/TB-UMT (`sources.ts:umt-threshold-notice-2026`, mục 1): "Điểm ngưỡng ĐBCLĐV
   * = Điểm quy đổi thang 30 + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)" ⇒ với thí sinh không
   * điểm cộng, ĐXT = tổng thô 3 môn + điểm ưu tiên. Điểm ưu tiên theo Điều 7 TT 06/2026 (judgment
   * call, `priority.ts`). Ngưỡng PT01 = 15/30, đồng nhất 10 ngành. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'umt-thpt-exam-exact-2026',
    schoolId: 'umt',
    name: 'Xét kết quả thi TN THPT (PT01) — Điểm xét tuyển (ngưỡng 15/30 đồng nhất, không điểm cộng)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 10 ngành UMT, không có điểm cộng thành tích'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
