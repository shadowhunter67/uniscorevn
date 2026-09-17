import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { vuiKnowledgeGaps } from './knowledgeGaps';

export const vuiAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'vui-thpt-exam-2026',
    schoolId: 'vui',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: vuiKnowledgeGaps,
  },
  /**
   * Nhánh HẸP kiểm tra ngưỡng điểm chuẩn (exact), phương thức thi TN THPT. Ngưỡng 15/30 đồng nhất
   * 18 ngành (điểm chuẩn trúng tuyển thật, Thông báo 121/ĐHCNVT). Nguồn im lặng về việc gồm ưu
   * tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo. KHÔNG gắn `knowledgeGaps`.
   */
  {
    id: 'vui-thpt-exam-exact-2026',
    schoolId: 'vui',
    name: 'Xét kết quả thi TN THPT — kiểm tra ngưỡng điểm chuẩn',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 18 ngành VUI'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
