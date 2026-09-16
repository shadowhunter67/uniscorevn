import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { siuKnowledgeGaps } from './knowledgeGaps';

export const siuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'siu-thpt-exam-2026',
    schoolId: 'siu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: siuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), phương thức thi TN THPT, nhóm ngành thường (TRỪ Luật kinh
   * tế — ngưỡng riêng chưa công bố số cụ thể, xem `siu-law-economics-threshold-unknown`). Trích
   * nguyên văn `evidence.ts`: ngưỡng 15/30, nguồn im lặng về việc đã gồm ưu tiên → so TỔNG THÔ.
   * Điểm ưu tiên chỉ hiển thị tham khảo. KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'siu-thpt-exam-exact-2026',
    schoolId: 'siu',
    name: 'Xét kết quả thi TN THPT — Điểm xét (nhóm ngành thường, trừ Luật kinh tế)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một ngành SIU thuộc nhóm ngành thường (ngoài Luật kinh tế)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
