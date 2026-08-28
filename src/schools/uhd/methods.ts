import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { uhdKnowledgeGaps } from './knowledgeGaps';

export const uhdAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'uhd-thpt-exam-2026',
    schoolId: 'uhd',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026 (nhóm ngành Kinh tế/Kỹ thuật/KHXH&NV)',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: uhdKnowledgeGaps,
  },
  /**
   * Nhánh exact — nhóm ngành Kinh tế/Kỹ thuật/KHXH&NV (không gồm Sư phạm, Giáo dục thể chất - vẫn
   * ngoài phạm vi, xem knowledgeGaps). Quyết định 289/QĐ-ĐHHD trang 4 xác nhận công thức Điểm xét
   * tuyển = Môn1+Môn2+Môn3+Điểm UT (điểm ưu tiên CỘNG vào tổng trước khi so ngưỡng); mục 5.2 xác
   * nhận trường KHÔNG áp dụng điểm cộng năm 2026 (đóng khoảng trống, không phải thiếu dữ liệu).
   */
  {
    id: 'uhd-thpt-exam-exact-2026',
    schoolId: 'uhd',
    name: 'Xét kết quả thi TN THPT — Ngưỡng đảm bảo chất lượng đầu vào (nhóm ngành Kinh tế/Kỹ thuật/KHXH&NV)',
    year: 2026,
    applicantTypes: ['Thí sinh xét kết quả thi TN THPT 2026 vào UHD (nhóm ngành ngoài Sư phạm/Giáo dục thể chất)'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: true, exactCalculator: true },
  },
];
