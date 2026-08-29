import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
import { hnmuKnowledgeGaps } from './knowledgeGaps';

export const hnmuAdmissionMethods: AdmissionMethodDescriptor[] = [
  {
    id: 'hnmu-thpt-exam-2026',
    schoolId: 'hnmu',
    name: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT năm 2026',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: false },
    knowledgeGaps: hnmuKnowledgeGaps,
  },
  /**
   * Thông báo ngưỡng HNMU 2026 (cross-checked qua 2 báo chí chính thống) công bố TRỰC TIẾP ngưỡng
   * theo NHÓM NGÀNH (giáo viên/GDTC/pháp luật/khác) và xác nhận rõ ngưỡng là tổng thô 3 môn, áp
   * dụng thí sinh khu vực 3, không tính điểm cộng — nhánh exact so trực tiếp tổng thô với ngưỡng
   * nhóm ngành, không cộng điểm ưu tiên (theo tiền lệ `schools/hmu`, wording gần giống hệt).
   */
  {
    id: 'hnmu-thpt-exam-exact-2026',
    schoolId: 'hnmu',
    name: 'Xét điểm thi TN THPT — kiểm tra ngưỡng đảm bảo chất lượng đầu vào theo nhóm ngành',
    year: 2026,
    applicantTypes: ['Thí sinh tốt nghiệp THPT 2026, khu vực 3, xét theo 1 trong 4 nhóm ngành HNMU'],
    capabilities: { eligibility: true, scoreConversion: false, bonus: false, priority: false, exactCalculator: true },
  },
];
