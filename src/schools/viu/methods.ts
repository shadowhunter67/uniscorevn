import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { viuKnowledgeGaps } from './knowledgeGaps';

export const viuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'viu-thpt-exam-2026',
    schoolId: 'viu',
    name: 'Xét tuyển dựa vào kết quả kỳ thi tốt nghiệp THPT năm 2026 (Mã 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: viuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), Mã 100. Trích nguyên văn `evidence.ts`: điểm sàn 15/30,
   * nguồn im lặng về việc đã gồm ưu tiên → so RAW. Điểm ưu tiên chỉ hiển thị tham khảo. KHÔNG gắn
   * `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'viu-thpt-exam-exact-2026',
    schoolId: 'viu',
    name: 'Xét kết quả thi TN THPT (Mã 100) — Điểm xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 21 ngành VIU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
