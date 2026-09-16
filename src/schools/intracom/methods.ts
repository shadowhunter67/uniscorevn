import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { intracomKnowledgeGaps } from './knowledgeGaps';

export const intracomAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'intracom-thpt-exam-2026',
    schoolId: 'intracom',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: intracomKnowledgeGaps,
  },
  /**
   * Nhánh HẸP tính đủ điểm xét (exact), phương thức thi TN THPT. Ngưỡng theo nhóm ngành
   * (`thresholds.ts`): Luật Kinh tế 20/30, 12 ngành còn lại 15/30. Nguồn im lặng về việc gồm ưu
   * tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'intracom-thpt-exam-exact-2026',
    schoolId: 'intracom',
    name: 'Xét kết quả thi TN THPT — kiểm tra ngưỡng điểm xét tuyển',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 13 ngành Intracom University'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
