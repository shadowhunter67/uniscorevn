import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hauiKnowledgeGaps } from './knowledgeGaps';

export const hauiAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'haui-thpt-exam-2026',
    schoolId: 'haui',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (phương thức 3)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hauiKnowledgeGaps,
  },
  /**
   * Nhánh exact — "Ngưỡng đảm bảo chất lượng đầu vào..." (đọc trực tiếp qua curl 2026-08-29) công
   * bố bảng ngưỡng ĐẦY ĐỦ 72 mã xét tuyển (`thresholds.ts`) cho phương thức 3. Nguồn im lặng về
   * điểm ưu tiên khu vực/đối tượng ở mục này => áp judgment call chuẩn quốc gia (`priority.ts`) khi
   * hiển thị Điểm xét tuyển — `priority: true` phản ánh đúng đây là judgment call, không phải
   * trường tự công bố bảng; ngưỡng so với TỔNG THÔ (không cộng ưu tiên).
   */
  {
    id: 'haui-thpt-exam-exact-2026',
    schoolId: 'haui',
    name: 'Xét điểm thi TN THPT — Điểm xét tuyển theo mã xét tuyển (phương thức 3)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, xét theo một mã xét tuyển HAUI cụ thể'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
