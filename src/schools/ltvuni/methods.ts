import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { ltvuniKnowledgeGaps } from './knowledgeGaps';

export const ltvuniAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'ltvuni-thpt-exam-2026',
    schoolId: 'ltvuni',
    name: 'Xét tuyển theo kết quả thi tốt nghiệp THPT năm 2026 (Phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: ltvuniKnowledgeGaps,
  },
  /**
   * Nhánh exact — Thông báo 269/TB-ĐHLTV (đọc trực tiếp qua vision) xác nhận đầy đủ: công thức
   * Điểm xét tuyển = Môn1+Môn2+Môn3+điểm ƯT (mục B.1.a, trang 4), ngưỡng theo 11/11 ngành (mục
   * A.1.b, trang 1-2), và không có điểm cộng nào cho phương thức 100.
   */
  {
    id: 'ltvuni-thpt-exam-exact-2026',
    schoolId: 'ltvuni',
    name: 'Xét kết quả thi TN THPT — Điểm xét tuyển đầy đủ (Phương thức 100)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, xét theo điểm thi TN THPT'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
