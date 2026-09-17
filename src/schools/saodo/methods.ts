import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { saodoKnowledgeGaps } from './knowledgeGaps';

export const saodoAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'saodo-thpt-exam-2026',
    schoolId: 'saodo',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: saodoKnowledgeGaps,
  },
  /**
   * Nhánh HẸP kiểm tra ngưỡng điểm chuẩn theo nhóm ngành (exact), phương thức thi TN THPT. Ngưỡng
   * theo `thresholds.ts` (Luật 20/30, còn lại 15/30 — điểm chuẩn trúng tuyển thật đã công bố
   * 10/8/2026). Nguồn im lặng về việc gồm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị
   * tham khảo. KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'saodo-thpt-exam-exact-2026',
    schoolId: 'saodo',
    name: 'Xét kết quả thi TN THPT — kiểm tra ngưỡng điểm chuẩn',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 19 ngành SDU (ngoài 2 ngành sư phạm)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
