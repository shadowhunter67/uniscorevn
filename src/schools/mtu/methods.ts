import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { mtuKnowledgeGaps } from './knowledgeGaps';

export const mtuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'mtu-thpt-exam-2026',
    schoolId: 'mtu',
    name: 'Xét tuyển dựa vào kết quả kỳ thi tốt nghiệp THPT năm 2026 (Phương thức 1, mã 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: mtuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), Phương thức 1. Điều kiện điểm (boilerplate chuẩn): tổng
   * thô 3 môn ≥15/30, đồng nhất 28 ngành. Công thức ĐXT nguyên văn PDF "Phương thức tuyển sinh năm
   * 2026": ĐXT = tổng 3 môn + ưu tiên + điểm cộng — so RAW với ngưỡng (điều kiện tách biệt công
   * thức, judgment call giữ RAW), ĐXT vẫn trả về `score` tham khảo. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'mtu-thpt-exam-exact-2026',
    schoolId: 'mtu',
    name: 'Xét kết quả thi TN THPT (PT1) — Điểm xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 28 ngành MTU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
