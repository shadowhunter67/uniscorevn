import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { usthKnowledgeGaps } from './knowledgeGaps';

export const usthAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'usth-thpt-exam-2026',
    schoolId: 'usth',
    name: 'Xét tuyển dựa trên kết quả thi tốt nghiệp THPT (Phương thức 4)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: usthKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính Điểm xét tuyển (exact), Phương thức 4 (mã 100). Công thức + ngưỡng theo mã
   * ngành, trích nguyên văn `evidence.ts`. Nguồn nói RÕ điểm ưu tiên nằm trong Điểm xét tuyển →
   * so ĐXT (không phải tổng thô). KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'usth-thpt-exam-exact-2026',
    schoolId: 'usth',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển theo mã ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 16 mã ngành USTH (trừ Kỹ thuật Hàng không và các chương trình song bằng)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
