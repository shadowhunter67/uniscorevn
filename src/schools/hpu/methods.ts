import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hpuKnowledgeGaps } from './knowledgeGaps';

export const hpuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hpu-thpt-exam-2026',
    schoolId: 'hpu',
    name: 'Xét kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hpuKnowledgeGaps,
  },
  /**
   * Nhánh HẸP kiểm tra ngưỡng điểm chuẩn theo mã ngành (exact), phương thức thi TN THPT. Ngưỡng
   * theo `thresholds.ts` (bảng 7 mã ngành, điểm chuẩn trúng tuyển thật đã công bố 13/8/2026).
   * Nguồn im lặng về việc gồm ưu tiên hay chưa → so RAW, điểm ưu tiên chỉ hiển thị tham khảo.
   * KHÔNG gắn `knowledgeGaps` ở descriptor này.
   */
  {
    id: 'hpu-thpt-exam-exact-2026',
    schoolId: 'hpu',
    name: 'Xét kết quả thi TN THPT — kiểm tra ngưỡng điểm chuẩn theo mã ngành',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào một trong 7 mã ngành HPU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
