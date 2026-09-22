import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dpdKnowledgeGaps } from './knowledgeGaps';

export const dpdAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dpd-thpt-exam-2026',
    schoolId: 'dpd',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026 (mã 100/405)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dpdKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính Điểm xét tuyển (exact), 14/39 chương trình đào tạo đã có điểm chuẩn thật (xem
   * `thresholds.ts`). Công thức + điểm ưu tiên trích nguyên văn chính chủ, KHÔNG judgment call.
   * KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'dpd-thpt-exam-exact-2026',
    schoolId: 'dpd',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển theo chương trình đào tạo',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 14 chương trình đào tạo DPD đã có điểm chuẩn công bố'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
