import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { dntuKnowledgeGaps } from './knowledgeGaps';

export const dntuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'dntu-thpt-exam-2026',
    schoolId: 'dntu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: dntuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), phương thức thi TN THPT. Ngưỡng theo nhóm ngành
   * (`thresholds.ts`): Điều dưỡng/Xét nghiệm y học 18/30, còn lại 15/30 — điểm chuẩn TRÚNG TUYỂN
   * thật đã công bố 09/8/2026. Nguồn im lặng về việc gồm ưu tiên hay chưa → so RAW, điểm ưu tiên
   * chỉ hiển thị tham khảo. KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'dntu-thpt-exam-exact-2026',
    schoolId: 'dntu',
    name: 'Xét kết quả thi TN THPT — kiểm tra ngưỡng điểm chuẩn',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 22 ngành DNTU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
