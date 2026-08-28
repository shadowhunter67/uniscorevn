import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { nluKnowledgeGaps } from './knowledgeGaps';

export const nluAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'nlu-thpt-exam-2026',
    schoolId: 'nlu',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh sử dụng điểm thi tốt nghiệp THPT 2026 (trừ Giáo dục mầm non, Sư phạm kỹ thuật nông nghiệp)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: nluKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ Điểm xét tuyển (exact), phương thức thi TN THPT. Bảng ngưỡng 53 mã xét
   * tuyển trích nguyên văn `sources.ts:nlu-threshold-2026` (KV3, tổng thô, không phân biệt tổ
   * hợp). ĐXT = tổng thô 3 môn + điểm ưu tiên (Điều 7 TT 06/2026, judgment call — `priority.ts`).
   * Ngưỡng ĐKXT so với TỔNG THÔ (đúng câu chữ "áp dụng cho thí sinh khu vực 3, không ưu tiên").
   * Ngoài phạm vi: Giáo dục Mầm non, Sư phạm Kỹ thuật nông nghiệp (ngưỡng riêng Bộ GD&ĐT).
   * KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'nlu-thpt-exam-exact-2026',
    schoolId: 'nlu',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển theo mã ngành (trừ Giáo dục Mầm non, SP Kỹ thuật nông nghiệp)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 53 mã xét tuyển NLU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
