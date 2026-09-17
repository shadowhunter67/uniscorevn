import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { quiKnowledgeGaps } from './knowledgeGaps';

export const quiAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'qui-thpt-exam-2026',
    schoolId: 'qui',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: quiKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), phương thức thi TN THPT. Trích nguyên văn `evidence.ts`:
   * ngưỡng 15/30, nguồn im lặng về việc đã gồm ưu tiên → so TỔNG THÔ. Điểm ưu tiên chỉ hiển thị
   * tham khảo. KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'qui-thpt-exam-exact-2026',
    schoolId: 'qui',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 12 ngành QUI'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
