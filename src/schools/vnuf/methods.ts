import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vnufKnowledgeGaps } from './knowledgeGaps';

export const vnufAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vnuf-thpt-exam-2026',
    schoolId: 'vnuf',
    name: 'THPT exam admission baseline',
    year: 2026,
    applicantTypes: ['Candidates using 2026 high-school graduation exam scores'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vnufKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính Điểm xét tuyển (exact), phương thức thi TN THPT (mã 100). Ngưỡng 15/30 đồng
   * nhất, trích nguyên văn `evidence.ts`. Nguồn nói RÕ ngưỡng không tính ưu tiên → so TỔNG THÔ,
   * điểm ưu tiên chỉ hiển thị tham khảo. KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'vnuf-thpt-exam-exact-2026',
    schoolId: 'vnuf',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào VNUF (tổ hợp thường, không gồm 2 ngành tổ hợp năng khiếu)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
